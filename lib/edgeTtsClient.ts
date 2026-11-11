import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';
import dns from 'dns';

// Optimize DNS lookup to prevent Windows IPv6 connection timeouts (up to 6x faster)
try {
  dns.setDefaultResultOrder('ipv4first');
} catch {}

export interface TTSOptions {
  voice?: 'ur-PK-AsadNeural' | 'ur-PK-UzmaNeural' | 'male' | 'female' | string;
  rate?: string;
  pitch?: string;
}

const VOICE_MAP: Record<string, string> = {
  'asad': 'ur-PK-AsadNeural',
  'uzma': 'ur-PK-UzmaNeural',
  'male': 'ur-PK-AsadNeural',
  'female': 'ur-PK-UzmaNeural',
  'ur-PK-AsadNeural': 'ur-PK-AsadNeural',
  'ur-PK-UzmaNeural': 'ur-PK-UzmaNeural',
};

const PYTHON_SERVICE_URL = process.env.PYTHON_TTS_URL || 'http://127.0.0.1:5050/tts';

// In-Memory Audio Cache to serve repeat greetings/phrases in 0.05ms
const audioCache = new Map<string, Buffer>();
const MAX_CACHE_SIZE = 120;

// Reusable warm client instances for minimal WebSocket handshake latency
const warmClients: Record<string, any> = {};

async function getWarmNodeClient(voice: string) {
  if (!warmClients[voice]) {
    // @ts-ignore
    const { MsEdgeTTS, OUTPUT_FORMAT } = await import('msedge-tts');
    const tts = new MsEdgeTTS();
    await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    warmClients[voice] = tts;
  }
  return warmClients[voice];
}

/**
 * High-speed native in-process Node.js Edge-TTS engine (Warm WebSocket connection, lowest latency)
 */
async function callDirectNodeTTS(text: string, voice: string): Promise<Buffer> {
  const client = await getWarmNodeClient(voice);
  const { audioStream } = client.toStream(text);
  const chunks: Buffer[] = [];
  return new Promise<Buffer>((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Node Edge-TTS timeout')), 9000);
    audioStream.on('data', (c: Buffer) => chunks.push(c));
    audioStream.on('end', () => {
      clearTimeout(timeout);
      resolve(Buffer.concat(chunks));
    });
    audioStream.on('error', (err: any) => {
      clearTimeout(timeout);
      // Reset warm client if socket error occurred
      delete warmClients[voice];
      reject(err);
    });
  });
}

/**
 * Fast HTTP call to Python edge-tts FastAPI microservice (if running)
 */
async function callPythonMicroservice(text: string, voice: string, rate = '+0%', pitch = '+0Hz'): Promise<Buffer | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500); // 2.5s quick timeout

    const res = await fetch(PYTHON_SERVICE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice, rate, pitch }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (res.ok) {
      const arrayBuffer = await res.arrayBuffer();
      return Buffer.from(arrayBuffer);
    }
  } catch {
    // Microservice not running or timed out; fall through
  }
  return null;
}

/**
 * Fallback: Execute Python CLI directly via child_process
 */
async function callPythonProcess(text: string, voice: string): Promise<Buffer> {
  const scriptPath = path.join(process.cwd(), 'python_tts', 'generate_tts.py');
  const tempOutputFile = path.join(os.tmpdir(), `urdu_tts_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.mp3`);

  const pythonExecutables = [
    path.join(os.homedir(), 'AppData', 'Local', 'Programs', 'Python', 'Python312', 'python.exe'),
    'python',
    'py',
    'python3'
  ];

  let lastError: Error | null = null;

  for (const pyExe of pythonExecutables) {
    try {
      const buffer = await new Promise<Buffer>((resolve, reject) => {
        const child = spawn(pyExe, [
          scriptPath,
          '--text', text,
          '--voice', voice,
          '--out', tempOutputFile
        ], {
          windowsHide: true,
          timeout: 10000
        });

        let stderr = '';
        child.stderr.on('data', (d) => stderr += d.toString());

        child.on('error', (err) => {
          reject(err);
        });

        child.on('close', (code) => {
          if (code === 0 && fs.existsSync(tempOutputFile)) {
            try {
              const fileData = fs.readFileSync(tempOutputFile);
              try { fs.unlinkSync(tempOutputFile); } catch {}
              resolve(fileData);
            } catch (readErr) {
              reject(readErr);
            }
          } else {
            try { if (fs.existsSync(tempOutputFile)) fs.unlinkSync(tempOutputFile); } catch {}
            reject(new Error(`Python process exited with code ${code}. Stderr: ${stderr}`));
          }
        });
      });

      if (buffer && buffer.length > 0) {
        return buffer;
      }
    } catch (e: any) {
      lastError = e;
    }
  }

  throw lastError || new Error('Failed to execute Python edge-tts script.');
}

/**
 * Automatically converts Roman Urdu text into authentic Urdu Script (اردو رسم الخط)
 */
async function ensureUrduScriptForTTS(text: string, voice: string): Promise<string> {
  const isUrduVoice = voice.toLowerCase().includes('ur-pk') || voice.toLowerCase().includes('asad') || voice.toLowerCase().includes('uzma');
  const hasUrduCharacters = /[\u0600-\u06FF]/.test(text);

  // If already contains Urdu script or isn't an Urdu voice, keep as-is (0ms)
  if (!isUrduVoice || hasUrduCharacters) {
    return text;
  }

  // Transliterate Roman Urdu to Urdu Script
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (apiKey) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2000);

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: 'Convert Roman Urdu text directly into clean, authentic Urdu script (اردو رسم الخط). Output ONLY the Urdu script without any markdown, explanations, or quotes.' }]
          },
          contents: [{ role: 'user', parts: [{ text }] }],
          generationConfig: { maxOutputTokens: 250, temperature: 0.1 }
        }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        const urdu = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (urdu && /[\u0600-\u06FF]/.test(urdu)) {
          return urdu;
        }
      }
    } catch (e) {
      // fallback to original if transliteration times out
    }
  }

  return text;
}

/**
 * Main synthesis entrypoint:
 * Instant In-Memory Cache -> Warm Native Node.js WebSocket -> Python Microservice -> Python CLI fallback
 */
export async function synthesizeUrduSpeech(text: string, options: TTSOptions = {}): Promise<{ audio: Buffer; voiceUsed: string }> {
  let cleanText = text
    .replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim();

  if (!cleanText) {
    throw new Error('Text to synthesize is empty.');
  }

  const voiceKey = (options.voice || 'ur-PK-AsadNeural').toLowerCase();
  const resolvedVoice = VOICE_MAP[voiceKey] || VOICE_MAP[options.voice || ''] || 'ur-PK-AsadNeural';

  // 1. Check in-memory audio cache for instantaneous response (<1ms)
  const cacheKey = `${resolvedVoice}:${cleanText}`;
  if (audioCache.has(cacheKey)) {
    return { audio: audioCache.get(cacheKey)!, voiceUsed: resolvedVoice };
  }

  // Ensure pure Urdu script so Edge-TTS pronounces words naturally
  cleanText = await ensureUrduScriptForTTS(cleanText, resolvedVoice);

  // Check cache again with resolved Urdu script
  const scriptCacheKey = `${resolvedVoice}:${cleanText}`;
  if (audioCache.has(scriptCacheKey)) {
    return { audio: audioCache.get(scriptCacheKey)!, voiceUsed: resolvedVoice };
  }

  let audioBuffer: Buffer | null = null;

  // 2. High-speed Warm Native Node.js Edge-TTS engine (fastest, in-process, ~1.2s - 2s)
  try {
    audioBuffer = await callDirectNodeTTS(cleanText, resolvedVoice);
  } catch (nodeErr) {
    // 3. Fallback to Python microservice over HTTP (if running)
    try {
      audioBuffer = await callPythonMicroservice(cleanText, resolvedVoice, options.rate, options.pitch);
    } catch {}

    // 4. Fallback to direct Python CLI process execution
    if (!audioBuffer) {
      try {
        audioBuffer = await callPythonProcess(cleanText, resolvedVoice);
      } catch (pyErr) {
        throw new Error(`All TTS engines failed: ${pyErr}`);
      }
    }
  }

  if (audioBuffer && audioBuffer.length > 0) {
    // Save to cache
    if (audioCache.size >= MAX_CACHE_SIZE) {
      const firstKey = audioCache.keys().next().value;
      if (firstKey) audioCache.delete(firstKey);
    }
    audioCache.set(cacheKey, audioBuffer);
    audioCache.set(scriptCacheKey, audioBuffer);

    return { audio: audioBuffer, voiceUsed: resolvedVoice };
  }

  throw new Error('No audio generated from any TTS engine.');
}
