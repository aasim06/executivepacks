import makeWASocket, { 
  useMultiFileAuthState, 
  DisconnectReason, 
  WASocket,
  proto
} from '@whiskeysockets/baileys';
import pino from 'pino';
import QRCode from 'qrcode';
import path from 'path';
import fs from 'fs';

export interface BaileysLog {
  id: string;
  timestamp: string;
  text: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface BaileysState {
  status: 'disconnected' | 'connecting' | 'connected';
  qr: string | null;
  rawQr: string | null;
  user: { id: string; name?: string } | null;
  autoReply: boolean;
  logs: BaileysLog[];
  lastActive: string;
}

interface GlobalBaileys {
  sock: WASocket | null;
  state: BaileysState;
  isStarting: boolean;
}

declare global {
  // eslint-disable-next-line no-var
  var __executivePacksBaileys: GlobalBaileys | undefined;
}

const AUTH_DIR = path.join(process.cwd(), 'baileys_auth_info');

function getGlobal(): GlobalBaileys {
  if (!globalThis.__executivePacksBaileys) {
    globalThis.__executivePacksBaileys = {
      sock: null,
      isStarting: false,
      state: {
        status: 'disconnected',
        qr: null,
        rawQr: null,
        user: null,
        autoReply: true,
        logs: [
          {
            id: 'init-1',
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
            text: 'Executive Packs WhatsApp Gateway initialized. Ready to generate QR.',
            type: 'info'
          }
        ],
        lastActive: new Date().toISOString()
      }
    };
  }
  return globalThis.__executivePacksBaileys;
}

function addLog(text: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') {
  const g = getGlobal();
  const newLog: BaileysLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
    text,
    type
  };
  g.state.logs = [newLog, ...g.state.logs.slice(0, 49)];
  g.state.lastActive = new Date().toISOString();
}

export async function getBaileysState(): Promise<BaileysState> {
  const g = getGlobal();
  return g.state;
}

export async function startBaileysSocket(): Promise<BaileysState> {
  const g = getGlobal();

  if (g.sock && g.state.status === 'connected') {
    return g.state;
  }

  if (g.isStarting) {
    return g.state;
  }

  g.isStarting = true;
  g.state.status = 'connecting';
  addLog('Initiating Baileys WhatsApp Web multi-device connection...', 'info');

  try {
    if (!fs.existsSync(AUTH_DIR)) {
      fs.mkdirSync(AUTH_DIR, { recursive: true });
    }

    const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);

    const sock = makeWASocket({
      auth: state,
      logger: pino({ level: 'silent' }),
      printQRInTerminal: false,
      browser: ['Executive Packs', 'Chrome', '1.0.0'],
      syncFullHistory: false,
      defaultQueryTimeoutMs: 60000
    });

    g.sock = sock;

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        g.state.rawQr = qr;
        try {
          const qrDataUrl = await QRCode.toDataURL(qr, {
            margin: 2,
            width: 320,
            color: {
              dark: '#1c1917',
              light: '#ffffff'
            }
          });
          g.state.qr = qrDataUrl;
          g.state.status = 'connecting';
          addLog('Fresh WhatsApp Web QR code generated. Awaiting smartphone camera scan...', 'warning');
        } catch (err) {
          addLog(`Failed to convert QR to image: ${String(err)}`, 'error');
        }
      }

      if (connection === 'open') {
        g.state.status = 'connected';
        g.state.qr = null;
        g.state.rawQr = null;
        const jid = sock.user?.id || '';
        const phone = jid.split(':')[0] || jid.split('@')[0];
        g.state.user = {
          id: phone,
          name: sock.user?.name || 'Executive Packs Factory Official'
        };
        addLog(`WhatsApp connected successfully! Linked number: +${phone}`, 'success');
      }

      if (connection === 'close') {
        const error = lastDisconnect?.error as { output?: { statusCode?: number } } | undefined;
        const statusCode = error?.output?.statusCode;
        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

        addLog(`Connection closed (${statusCode || 'unknown reason'}). Reconnect: ${shouldReconnect}`, 'warning');

        if (statusCode === DisconnectReason.loggedOut) {
          g.state.status = 'disconnected';
          g.state.user = null;
          g.state.qr = null;
          g.state.rawQr = null;
          g.sock = null;
          try {
            fs.rmSync(AUTH_DIR, { recursive: true, force: true });
          } catch {
            // ignore
          }
          addLog('Device was unlinked/logged out. Auth cache cleared.', 'info');
        } else if (shouldReconnect) {
          g.state.status = 'connecting';
          g.sock = null;
          g.isStarting = false;
          setTimeout(() => {
            startBaileysSocket().catch((e) => addLog(`Reconnect failed: ${e.message}`, 'error'));
          }, 3000);
        }
      }
    });

    // Auto-reply listener for incoming messages
    sock.ev.on('messages.upsert', async (m) => {
      try {
        if (!g.state.autoReply) return;
        const msg = m.messages[0];
        if (!msg || msg.key.fromMe) return;

        const senderJid = msg.key.remoteJid;
        if (!senderJid || senderJid.includes('@g.us')) return; // Ignore groups

        const messageText = 
          msg.message?.conversation || 
          msg.message?.extendedTextMessage?.text || 
          '';

        addLog(`Incoming inquiry from ${senderJid.split('@')[0]}: "${messageText.slice(0, 40)}..."`, 'info');

        const replyText = 
          `*Assalam-o-Alaikum!*\n\n` +
          `Thank you for contacting *Executive Packs* _(From Impact to Intact)_.\n` +
          `We have received your message regarding custom packaging.\n\n` +
          `📦 *Our Core Lines:*\n` +
          `• Fast-Food Greaseproof Boxes & Buckets\n` +
          `• E-Commerce Corrugated Mailers\n` +
          `• Rigid Bottle Cylinders & Luxury Wooden Crates\n` +
          `• ThermoCool Cold-Chain Insulation\n\n` +
          `🏭 *No Minimum Order Limit (No MOQ)*\n` +
          `Our engineering team at 21 km Kasur Rd, Lahore is reviewing your request and will provide CAD dieline proofs shortly.\n\n` +
          `_Executive Packs Automated Desk_`;

        await sock.sendMessage(senderJid, { text: replyText });
        addLog(`Dispatched automated welcome response to ${senderJid.split('@')[0]}`, 'success');
      } catch (err) {
        addLog(`Auto-reply error: ${String(err)}`, 'error');
      }
    });

  } catch (error) {
    g.state.status = 'disconnected';
    addLog(`Socket launch failed: ${String(error)}`, 'error');
  } finally {
    g.isStarting = false;
  }

  return g.state;
}

export async function sendBaileysMessage(to: string, message: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const g = getGlobal();

  if (!g.sock || g.state.status !== 'connected') {
    return { success: false, error: 'WhatsApp is not connected. Please scan QR first.' };
  }

  try {
    let cleanNumber = to.replace(/[^0-9]/g, '');
    if (cleanNumber.startsWith('0')) {
      cleanNumber = '92' + cleanNumber.substring(1);
    }
    if (!cleanNumber.startsWith('92') && cleanNumber.length === 10) {
      cleanNumber = '92' + cleanNumber;
    }

    const jid = `${cleanNumber}@s.whatsapp.net`;
    const sent = await g.sock.sendMessage(jid, { text: message });
    
    addLog(`Sent manual WhatsApp message to +${cleanNumber}`, 'success');
    return { success: true, messageId: sent?.key?.id || undefined };
  } catch (err) {
    const errorMsg = String(err);
    addLog(`Failed to send message to ${to}: ${errorMsg}`, 'error');
    return { success: false, error: errorMsg };
  }
}

export async function disconnectBaileysSocket(): Promise<BaileysState> {
  const g = getGlobal();
  addLog('User requested WhatsApp session disconnect...', 'warning');

  try {
    if (g.sock) {
      await g.sock.logout();
      g.sock.end(undefined);
    }
  } catch {
    // ignore
  }

  g.sock = null;
  g.state.status = 'disconnected';
  g.state.user = null;
  g.state.qr = null;
  g.state.rawQr = null;

  try {
    if (fs.existsSync(AUTH_DIR)) {
      fs.rmSync(AUTH_DIR, { recursive: true, force: true });
    }
  } catch (err) {
    addLog(`Error clearing auth directory: ${String(err)}`, 'error');
  }

  addLog('WhatsApp session logged out and cleared.', 'info');
  return g.state;
}

export function toggleAutoReply(): boolean {
  const g = getGlobal();
  g.state.autoReply = !g.state.autoReply;
  addLog(`Automated customer responder turned ${g.state.autoReply ? 'ON' : 'OFF'}`, 'info');
  return g.state.autoReply;
}
