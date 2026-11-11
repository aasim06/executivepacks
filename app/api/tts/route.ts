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

    // Determine voice: defaults to ur-PK-AsadNeural (Male) with option for ur-PK-UzmaNeural (Female)
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
    console.error('Edge-TTS Synthesis Error in /api/tts:', error);
    return NextResponse.json(
      { 
        error: 'Edge-TTS synthesis failed', 
        details: error?.message || String(error),
        fallback: 'Use browser native SpeechSynthesis (ur-PK)'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    engine: 'Microsoft Edge Neural Text-to-Speech (edge-tts)',
    supportedVoices: [
      { id: 'ur-PK-AsadNeural', name: 'Asad (Pakistani Urdu Male - Default)', gender: 'Male', locale: 'ur-PK' },
      { id: 'ur-PK-UzmaNeural', name: 'Uzma (Pakistani Urdu Female)', gender: 'Female', locale: 'ur-PK' }
    ]
  });
}
