#!/usr/bin/env python3
"""
Standalone CLI script to generate Urdu speech via edge-tts.
Can be executed directly from Node.js child_process.spawn.
Usage:
  python generate_tts.py --text "السلام علیکم" --voice "ur-PK-AsadNeural" --out "output.mp3"
  python generate_tts.py --text "السلام علیکم" --stdout
"""

import sys
import argparse
import asyncio
import edge_tts

VOICE_MAP = {
    "asad": "ur-PK-AsadNeural",
    "uzma": "ur-PK-UzmaNeural",
    "male": "ur-PK-AsadNeural",
    "female": "ur-PK-UzmaNeural",
    "ur-PK-AsadNeural": "ur-PK-AsadNeural",
    "ur-PK-UzmaNeural": "ur-PK-UzmaNeural",
}

async def run_tts(text: str, voice: str, output_path: str = None, use_stdout: bool = False):
    resolved_voice = VOICE_MAP.get(voice.lower(), VOICE_MAP.get(voice, "ur-PK-AsadNeural"))
    communicate = edge_tts.Communicate(text=text, voice=resolved_voice)
    
    if use_stdout:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                sys.stdout.buffer.write(chunk["data"])
        sys.stdout.buffer.flush()
    elif output_path:
        await communicate.save(output_path)
    else:
        # Fallback stdout
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                sys.stdout.buffer.write(chunk["data"])
        sys.stdout.buffer.flush()

def main():
    parser = argparse.ArgumentParser(description="Edge TTS Urdu Generator")
    parser.add_argument("--text", type=str, required=True, help="Urdu/Roman Urdu text to synthesize")
    parser.add_argument("--voice", type=str, default="ur-PK-AsadNeural", help="Voice: ur-PK-AsadNeural or ur-PK-UzmaNeural")
    parser.add_argument("--out", type=str, default="", help="Output mp3 file path (optional)")
    parser.add_argument("--stdout", action="store_true", help="Stream audio bytes directly to stdout")
    
    args = parser.parse_args()
    
    if not args.text or not args.text.strip():
        sys.stderr.write("Error: Text parameter is empty\n")
        sys.exit(1)

    asyncio.run(run_tts(
        text=args.text.strip(),
        voice=args.voice,
        output_path=args.out if args.out else None,
        use_stdout=args.stdout or not args.out
    ))

if __name__ == "__main__":
    main()
