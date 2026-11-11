import asyncio
import io
import os
import sys
from typing import Optional
from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import edge_tts
import uvicorn

app = FastAPI(
    title="Urdu Edge-TTS Microservice",
    description="High-performance async Urdu Text-to-Speech microservice using Microsoft Edge Neural voices (ur-PK-AsadNeural & ur-PK-UzmaNeural)",
    version="1.0.0"
)

# Enable CORS for local Next.js / Node.js backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

VOICE_MAP = {
    "asad": "ur-PK-AsadNeural",
    "uzma": "ur-PK-UzmaNeural",
    "male": "ur-PK-AsadNeural",
    "female": "ur-PK-UzmaNeural",
    "ur-PK-AsadNeural": "ur-PK-AsadNeural",
    "ur-PK-UzmaNeural": "ur-PK-UzmaNeural",
}

DEFAULT_VOICE = "ur-PK-AsadNeural"

class TTSRequest(BaseModel):
    text: str
    voice: Optional[str] = DEFAULT_VOICE
    rate: Optional[str] = "+0%"
    pitch: Optional[str] = "+0Hz"

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "Executive Packs Urdu Edge-TTS Microservice",
        "default_voice": DEFAULT_VOICE,
        "supported_voices": [
            {"id": "ur-PK-AsadNeural", "name": "Asad (Pakistani Urdu Male)", "gender": "Male"},
            {"id": "ur-PK-UzmaNeural", "name": "Uzma (Pakistani Urdu Female)", "gender": "Female"}
        ]
    }

@app.get("/voices")
async def get_voices():
    return {
        "voices": [
            {"id": "ur-PK-AsadNeural", "name": "Asad (Male)", "locale": "ur-PK"},
            {"id": "ur-PK-UzmaNeural", "name": "Uzma (Female)", "locale": "ur-PK"}
        ]
    }

@app.post("/tts")
@app.post("/generate")
@app.post("/api/tts/generate")
async def generate_speech(payload: TTSRequest):
    text = payload.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Text cannot be empty.")

    # Resolve voice identifier
    voice_key = payload.voice.lower() if payload.voice else "asad"
    voice = VOICE_MAP.get(voice_key, VOICE_MAP.get(payload.voice, DEFAULT_VOICE))

    try:
        communicate = edge_tts.Communicate(
            text=text,
            voice=voice,
            rate=payload.rate or "+0%",
            pitch=payload.pitch or "+0Hz"
        )

        audio_buffer = bytearray()
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                audio_buffer.extend(chunk["data"])

        if not audio_buffer:
            raise HTTPException(status_code=500, detail="No audio data was generated from TTS engine.")

        return Response(
            content=bytes(audio_buffer),
            media_type="audio/mpeg",
            headers={
                "Content-Type": "audio/mpeg",
                "Content-Disposition": f'inline; filename="urdu_speech_{voice}.mp3"',
                "Cache-Control": "public, max-age=86400",
                "X-Generated-By": "edge-tts",
                "X-Voice-Used": voice
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TTS synthesis error: {str(e)}")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5050))
    print(f"Starting Urdu Edge-TTS Microservice on http://127.0.0.1:{port}")
    uvicorn.run("tts_service:app", host="127.0.0.1", port=port, log_level="info")
