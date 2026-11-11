import { NextRequest, NextResponse } from 'next/server';
import { synthesizeUrduSpeech } from '@/lib/edgeTtsClient';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { text, voice, gender, rate, pitch } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text is required for TTS synthesis' }, { status: 400 });
    }

    let selectedVoice = voice;
    if (!selectedVoice && gender) {
      selectedVoice = gender === 'female' ? 'ur-PK-UzmaNeural' : 'ur-PK-AsadNeural';
    }

    const { audio, voiceUsed } = await synthesizeUrduSpeech(text, {
      voice: selectedVoice,
      rate,
      pitch
    });

    return new NextResponse(new Uint8Array(audio), {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audio.byteLength.toString(),
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'X-TTS-Engine': 'edge-tts-python',
        'X-Voice-Used': voiceUsed,
      },
    });
  } catch (error: any) {
    console.error('Edge-TTS Synthesis Error in /api/tts/generate:', error);
    return NextResponse.json(
      { 
        error: 'Edge-TTS synthesis failed', 
        details: error?.message || String(error)
      },
      { status: 500 }
    );
  }
}
