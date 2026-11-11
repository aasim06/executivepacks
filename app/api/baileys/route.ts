import { NextRequest, NextResponse } from 'next/server';
import { 
  getBaileysState, 
  startBaileysSocket, 
  sendBaileysMessage, 
  disconnectBaileysSocket,
  toggleAutoReply 
} from '@/lib/baileysManager';

// Mark route as dynamic Node.js runtime
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const autoStart = searchParams.get('autoStart');

    let state = await getBaileysState();

    // If requested and currently disconnected, kick off socket connection
    if (autoStart === 'true' && state.status === 'disconnected') {
      state = await startBaileysSocket();
    }

    return NextResponse.json(state);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch Baileys state', details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { action, to, message } = body;

    if (action === 'start') {
      const state = await startBaileysSocket();
      return NextResponse.json({ success: true, state });
    }

    if (action === 'disconnect') {
      const state = await disconnectBaileysSocket();
      return NextResponse.json({ success: true, state });
    }

    if (action === 'toggle_autoreply') {
      const enabled = toggleAutoReply();
      const state = await getBaileysState();
      return NextResponse.json({ success: true, autoReply: enabled, state });
    }

    if (action === 'send') {
      if (!to || !message) {
        return NextResponse.json(
          { success: false, error: 'Recipient number ("to") and "message" are required.' },
          { status: 400 }
        );
      }
      const result = await sendBaileysMessage(to, message);
      const state = await getBaileysState();
      return NextResponse.json({ ...result, state });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action provided.' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal Baileys API Error', details: String(error) },
      { status: 500 }
    );
  }
}
