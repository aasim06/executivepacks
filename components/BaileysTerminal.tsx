'use client';

import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  Smartphone, 
  RefreshCw, 
  CheckCircle2, 
  Power, 
  Send, 
  Bot, 
  Radio, 
  Check, 
  AlertCircle,
  Copy,
  ExternalLink
} from 'lucide-react';

interface BaileysLog {
  id: string;
  timestamp: string;
  text: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface BaileysState {
  status: 'disconnected' | 'connecting' | 'connected';
  qr: string | null;
  rawQr: string | null;
  user: { id: string; name?: string } | null;
  autoReply: boolean;
  logs: BaileysLog[];
  lastActive: string;
}

interface BaileysTerminalProps {
  flashToast: (msg: string, type?: 'success' | 'info') => void;
}

export default function BaileysTerminal({ flashToast }: BaileysTerminalProps) {
  const [baileysState, setBaileysState] = useState<BaileysState>({
    status: 'disconnected',
    qr: null,
    rawQr: null,
    user: null,
    autoReply: true,
    logs: [],
    lastActive: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [recipientPhone, setRecipientPhone] = useState('03001234567');
  const [messageBody, setMessageBody] = useState('Assalam-o-Alaikum! Executive Packs factory se quotation and dieline proof update.');
  const [isSending, setIsSending] = useState(false);

  // Poll Baileys state every 2.5s
  useEffect(() => {
    let isMounted = true;

    const fetchState = async (autoStart = false) => {
      try {
        const res = await fetch(`/api/baileys${autoStart ? '?autoStart=true' : ''}`);
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted) {
          setBaileysState(data);
        }
      } catch {
        // silent
      }
    };

    fetchState(true); // auto-start socket to generate QR immediately

    const interval = setInterval(() => {
      fetchState(false);
    }, 2500);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleStart = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/baileys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'start' })
      });
      const data = await res.json();
      if (data.state) {
        setBaileysState(data.state);
        flashToast('Baileys WhatsApp socket launched! Generating fresh QR...');
      }
    } catch (e) {
      flashToast('Failed to start WhatsApp socket: ' + String(e), 'info');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    if (!confirm('Are you sure you want to log out and unlink this WhatsApp device?')) return;
    try {
      setIsLoading(true);
      const res = await fetch('/api/baileys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'disconnect' })
      });
      const data = await res.json();
      if (data.state) {
        setBaileysState(data.state);
        flashToast('WhatsApp device unlinked successfully.');
      }
    } catch (e) {
      flashToast('Failed to disconnect: ' + String(e), 'info');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAutoReply = async () => {
    try {
      const res = await fetch('/api/baileys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle_autoreply' })
      });
      const data = await res.json();
      if (data.state) {
        setBaileysState(data.state);
        flashToast(`Automated WhatsApp response is now ${data.autoReply ? 'ON' : 'OFF'}`);
      }
    } catch (e) {
      flashToast('Failed to toggle auto-reply: ' + String(e), 'info');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientPhone.trim() || !messageBody.trim()) {
      flashToast('Please enter both phone number and message.', 'info');
      return;
    }
    try {
      setIsSending(true);
      const res = await fetch('/api/baileys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send',
          to: recipientPhone,
          message: messageBody
        })
      });
      const data = await res.json();
      if (data.success) {
        flashToast(`Message sent successfully to ${recipientPhone}!`);
        if (data.state) setBaileysState(data.state);
      } else {
        flashToast(`Send failed: ${data.error || 'Unknown error'}`, 'info');
      }
    } catch (err) {
      flashToast(`Failed to send message: ${String(err)}`, 'info');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6 w-full">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800/80">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  WhatsApp Baileys Web Gateway
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                  v7 Multi-Device
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Scan QR code to authorize official WhatsApp session. Dispatch quotes, dieline dockets &amp; auto-replies.
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleToggleAutoReply}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              baileysState.autoReply
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white'
            }`}
            title="Toggle instant welcome auto-response for incoming customer messages"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Auto-Reply: {baileysState.autoReply ? 'ON' : 'OFF'}</span>
          </button>

          {baileysState.status === 'connected' ? (
            <button
              onClick={handleDisconnect}
              disabled={isLoading}
              className="px-3.5 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Power className="w-3.5 h-3.5" />
              <span>Disconnect Session</span>
            </button>
          ) : (
            <button
              onClick={handleStart}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-bold shadow-lg shadow-emerald-950 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{baileysState.status === 'connecting' ? 'Refresh QR Code' : 'Generate WhatsApp QR'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Status Ribbon */}
      <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className={`w-3 h-3 rounded-full ${
            baileysState.status === 'connected'
              ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]'
              : baileysState.status === 'connecting'
              ? 'bg-amber-400 animate-ping'
              : 'bg-stone-500'
          }`}></span>
          <div>
            <span className="font-bold text-white uppercase tracking-wider font-mono text-[11px]">
              Connection Status:
            </span>
            <span className={`ml-2 font-extrabold ${
              baileysState.status === 'connected'
                ? 'text-emerald-400'
                : baileysState.status === 'connecting'
                ? 'text-amber-400'
                : 'text-stone-400'
            }`}>
              {baileysState.status === 'connected'
                ? `Connected (Phone: +${baileysState.user?.id})`
                : baileysState.status === 'connecting'
                ? 'Awaiting QR Scan on Smartphone...'
                : 'Offline / Disconnected'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-stone-400 text-[11px] font-mono">
          <span>Transport: WebSocket</span>
          <span>•</span>
          <span>Auth: Multi-File</span>
          <span>•</span>
          <span>Session: PK-01</span>
        </div>
      </div>

      {/* Main 2-Column Split: QR Scanner Terminal & Quick Dispatcher */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: QR Scan Terminal or Connected Dashboard (6 cols) */}
        <div className="lg:col-span-6 bg-stone-900/70 border border-stone-800/80 rounded-3xl p-6 sm:p-8 text-center flex flex-col items-center justify-center min-h-[460px]">
          
          {baileysState.status === 'connected' ? (
            <div className="w-full space-y-6 py-6 animate-in fade-in">
              <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-2xl shadow-emerald-500/10">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>

              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Active WhatsApp Multi-Device Session
                </span>
                <h3 className="text-2xl font-black text-white pt-2">
                  +{baileysState.user?.id}
                </h3>
                <p className="text-xs text-stone-400">
                  {baileysState.user?.name || 'Executive Packs Manufacturing Official'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 text-left space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-stone-400">
                  <span>Device Protocol:</span>
                  <span className="text-emerald-400 font-bold">WhatsApp Web Companion</span>
                </div>
                <div className="flex items-center justify-between text-stone-400">
                  <span>Automatic Responses:</span>
                  <span className={baileysState.autoReply ? 'text-emerald-400' : 'text-stone-500'}>
                    {baileysState.autoReply ? 'Enabled (Active)' : 'Disabled'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-stone-400">
                  <span>Status:</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online &amp; Listening
                  </span>
                </div>
              </div>

              <button
                onClick={handleDisconnect}
                className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-rose-950/50 hover:text-rose-300 hover:border-rose-800/60 border border-stone-700 text-xs font-bold text-stone-300 transition cursor-pointer"
              >
                Log Out / Change Linked Phone
              </button>
            </div>
          ) : baileysState.status === 'connecting' && baileysState.qr ? (
            <div className="space-y-6 w-full animate-in fade-in">
              <div className="space-y-1 text-center">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Point Smartphone Camera Below
                </span>
                <h3 className="text-xl font-black text-white pt-2">
                  Scan WhatsApp Web QR Code
                </h3>
                <p className="text-xs text-stone-400 max-w-sm mx-auto">
                  Open WhatsApp on your phone, navigate to <strong>Linked Devices</strong>, and scan this QR code to link your account.
                </p>
              </div>

              {/* The QR Image */}
              <div className="relative inline-block mx-auto p-4 rounded-3xl bg-white shadow-2xl border-4 border-amber-500/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={baileysState.qr}
                  alt="Scan WhatsApp Baileys QR Code"
                  className="w-64 h-64 sm:w-72 sm:h-72 object-contain rounded-xl"
                />
              </div>

              {/* Instructions Steps */}
              <div className="grid grid-cols-3 gap-2 text-left max-w-md mx-auto pt-2">
                <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-[11px]">
                  <span className="text-amber-400 font-bold block mb-1">1. Open WhatsApp</span>
                  <span className="text-stone-400">Go to Settings &gt; Linked Devices.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-[11px]">
                  <span className="text-amber-400 font-bold block mb-1">2. Tap Link</span>
                  <span className="text-stone-400">Tap &ldquo;Link a Device&rdquo; button.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-[11px]">
                  <span className="text-amber-400 font-bold block mb-1">3. Scan QR</span>
                  <span className="text-stone-400">Aim camera at this box.</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleStart}
                  disabled={isLoading}
                  className="text-xs font-mono text-amber-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>QR not scanning? Click here to refresh</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5 py-10 max-w-sm mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-400 mx-auto">
                <Smartphone className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  No Active WhatsApp Session
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Click the button below to initialize the Baileys multi-device gateway and display your pairing QR code.
                </p>
              </div>
              <button
                onClick={handleStart}
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Launch Baileys &amp; Generate QR</span>
              </button>
            </div>
          )}

        </div>

        {/* Right Column: Direct Dispatcher & Message Testing (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Direct Dispatcher Form */}
          <div className="bg-stone-900/70 border border-stone-800/80 rounded-3xl p-6 sm:p-7 shadow-xl">
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-stone-800/80">
              <Send className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Send Message via Linked WhatsApp
              </h3>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5 font-mono">
                  Recipient WhatsApp Number (Pakistan or International)
                </label>
                <input
                  type="text"
                  required
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  placeholder="e.g. 03001234567 or 923001234567"
                  className="w-full bg-stone-950 border border-stone-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 font-mono"
                />
                <span className="text-[10px] text-stone-400 mt-1 block">
                  Local 03xx numbers are automatically formatted to Pakistan international format (+92).
                </span>
              </div>

              {/* Quick Template Chips */}
              <div>
                <label className="block text-[11px] font-bold text-stone-400 mb-1.5 uppercase font-mono">
                  Quick Presets:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setMessageBody(
                      'Assalam-o-Alaikum! Executive Packs se baat kar raha hoon. Aapka custom CAD dieline proof ready hai, review ke liye WhatsApp par share kar rahe hain.'
                    )}
                    className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-[11px] font-medium text-stone-300 border border-stone-700 cursor-pointer"
                  >
                    CAD Dieline Proof
                  </button>
                  <button
                    type="button"
                    onClick={() => setMessageBody(
                      'Assalam-o-Alaikum! Executive Packs factory se aapke 5,000 Gable Boxes ka formal wholesale rate $0.42/unit calculate ho gaya hai. Dispatch timeline 5 days hai.'
                    )}
                    className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-[11px] font-medium text-stone-300 border border-stone-700 cursor-pointer"
                  >
                    Wholesale Quote
                  </button>
                  <button
                    type="button"
                    onClick={() => setMessageBody(
                      'Dear Client, aapka Executive Packs physical sample box dispatch ho chuka hai. Tracking details shortly share kar di jayengi.'
                    )}
                    className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-[11px] font-medium text-stone-300 border border-stone-700 cursor-pointer"
                  >
                    Sample Box Dispatch
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5 font-mono">
                  Message Body
                </label>
                <textarea
                  rows={4}
                  required
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  placeholder="Type WhatsApp message here..."
                  className="w-full bg-stone-950 border border-stone-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending || baileysState.status !== 'connected'}
                className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 ${
                  baileysState.status === 'connected'
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950 cursor-pointer'
                    : 'bg-stone-800 text-stone-400 cursor-not-allowed border border-stone-700'
                }`}
              >
                {isSending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Transmitting via Baileys WebSocket...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>
                      {baileysState.status === 'connected'
                        ? 'Send Message via Official WhatsApp'
                        : 'Scan QR Code First to Send'}
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Auto-Responder Preview Card */}
          <div className="bg-stone-900/70 border border-stone-800/80 rounded-3xl p-5 text-xs text-stone-300 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-emerald-400" />
                Automated 24/7 Factory Responder
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                baileysState.autoReply 
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                  : 'bg-stone-800 text-stone-500'
              }`}>
                {baileysState.autoReply ? 'ACTIVE' : 'MUTED'}
              </span>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Jab koi naya customer aap ke connected WhatsApp number par message karega, to system foran Executive Packs ka official welcome message aur packaging catalog lines send kar dega.
            </p>
          </div>

        </div>

      </div>

      {/* Bottom: Real-Time Event Stream Terminal */}
      <div className="bg-stone-950 border border-stone-800/90 rounded-3xl p-6 shadow-2xl space-y-3 font-mono">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800/60">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-300">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Live Baileys WebSocket Event Console</span>
          </div>
          <span className="text-[10px] text-stone-400">
            Auto-logging real-time scans &amp; messages
          </span>
        </div>

        <div className="h-44 overflow-y-auto space-y-1.5 text-xs pr-2 scrollbar-thin">
          {baileysState.logs && baileysState.logs.length > 0 ? (
            baileysState.logs.map((log) => (
              <div key={log.id} className="flex items-start gap-2.5 py-0.5">
                <span className="text-stone-400 text-[11px] shrink-0 font-bold">
                  [{log.timestamp}]
                </span>
                <span className={`text-[11px] leading-tight ${
                  log.type === 'success'
                    ? 'text-emerald-400 font-semibold'
                    : log.type === 'error'
                    ? 'text-rose-400'
                    : log.type === 'warning'
                    ? 'text-amber-400'
                    : 'text-stone-300'
                }`}>
                  {log.text}
                </span>
              </div>
            ))
          ) : (
            <div className="text-stone-400 text-xs py-4 text-center">
              Listening for incoming socket events...
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
