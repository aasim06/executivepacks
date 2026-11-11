'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { 
  Mic, 
  Volume2, 
  VolumeX, 
  X, 
  Send, 
  ArrowRight, 
  RotateCcw,
  Bot,
  Languages,
  Loader2,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  speechText?: string;
  options?: string[];
  recommendation?: {
    productId: string;
    productName: string;
    image: string;
    estimatedPrice: string;
    reason: string;
  };
}

export default function AIAgentConsultant() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [selectedUrduVoice, setSelectedUrduVoice] = useState<'ur-PK-AsadNeural' | 'ur-PK-UzmaNeural'>('ur-PK-AsadNeural');
  const [voiceAccent, setVoiceAccent] = useState<'desi' | 'global'>('desi');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [inputQuery, setInputQuery] = useState('');

  // Mic Recognition Language ('ur-PK' for Urdu, 'hi-IN' for Roman/Hindustani, 'en-US' for English)
  const [micLang, setMicLang] = useState<'ur-PK' | 'hi-IN' | 'en-US'>('ur-PK');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: 'السلام علیکم! ایگزیکٹو پیکس میں خوش آمدید۔ میں آپ کا AI پیکیجنگ اسسٹنٹ ہوں۔ آپ مجھ سے باکسز، کسٹم ڈائز اور ہول سیل فیکٹری ریٹس کے بارے میں لائیو پوچھ سکتے ہیں۔',
      speechText: 'السلام علیکم! ایگزیکٹو پیکس میں خوش آمدید۔ میں آپ کا اے آئی اسسٹنٹ ہوں۔ آپ مجھ سے پیکیجنگ میٹریل، کسٹم سائز، یا ہول سیل فیکٹری ریٹس کے بارے میں پوچھ سکتے ہیں۔',
      options: [
        'بیکری و کیک باکسز (Bakery Boxes)',
        'ای کامرس میلر باکسز (E-Commerce Mailers)',
        'پرفیوم و بوٹل ٹیوب (Perfume Tubes)',
        'شپنگ کارٹن باکسز (5-Ply Cartons)',
        'ہول سیل ڈسکاؤنٹ و فیکٹری ریٹ',
        'فزیکل سیمپل باکس ($15 Sample)',
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const silenceTimerRef = useRef<any>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSpeaking, isThinking]);

  // Load browser TTS voices reliably on mount
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        setAvailableVoices(v);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
  }, []);

  // Pick best natural voice based on user's preference
  const getBestVoice = () => {
    if (availableVoices.length === 0) return null;

    if (voiceAccent === 'desi') {
      // 1. Urdu Voice (e.g. Microsoft Asad, Uzma)
      const urdu = availableVoices.find(v => 
        v.lang.toLowerCase().startsWith('ur') || 
        v.name.toLowerCase().includes('asad') || 
        v.name.toLowerCase().includes('uzma') ||
        v.name.toLowerCase().includes('pakistan')
      );
      if (urdu) return urdu;

      // 2. Hindi Natural Voice (e.g. Microsoft Swara, Madhur, Google हिन्दी)
      const hindi = availableVoices.find(v => 
        v.lang.toLowerCase().startsWith('hi') || 
        v.name.toLowerCase().includes('swara') || 
        v.name.toLowerCase().includes('madhur') || 
        v.name.toLowerCase().includes('hindi')
      );
      if (hindi) return hindi;

      // 3. Indian English Natural Voice (e.g. Microsoft Neerja, Prabhat, Google English India)
      const indEng = availableVoices.find(v => 
        v.lang.toLowerCase() === 'en-in' || 
        v.name.toLowerCase().includes('india') || 
        v.name.toLowerCase().includes('neerja') || 
        v.name.toLowerCase().includes('prabhat')
      );
      if (indEng) return indEng;
    }

    // Global Natural / Neural English Voice
    const natural = availableVoices.find(v => 
      (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Jenny')) && 
      v.lang.toLowerCase().startsWith('en')
    );
    if (natural) return natural;

    return availableVoices.find(v => v.lang.toLowerCase().startsWith('en')) || availableVoices[0];
  };

  // Stop ongoing speech (both ElevenLabs audio and browser TTS)
  const stopAllSpeech = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // Text to Speech Engine (Speaks naturally using ElevenLabs AI Voice with browser fallback)
  const speakText = async (text: string, customSpeechText?: string) => {
    if (!voiceEnabled || typeof window === 'undefined') return;
    
    // Stop any ongoing speech
    stopAllSpeech();

    const textToSpeak = customSpeechText || text;
    const cleanText = textToSpeak
      .replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]/g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/#{1,6}\s+/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim();
    
    if (!cleanText) return;

    // 1. Edge-TTS Pakistani Urdu Neural Voice (ur-PK-AsadNeural or ur-PK-UzmaNeural) via /api/tts
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: cleanText,
          voice: selectedUrduVoice 
        }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        if (audioBlob.size > 200) {
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          currentAudioRef.current = audio;

          audio.onplay = () => {
            setIsSpeaking(true);
          };

          audio.onended = () => {
            setIsSpeaking(false);
            URL.revokeObjectURL(audioUrl);
            currentAudioRef.current = null;
          };

          audio.onerror = () => {
            setIsSpeaking(false);
            URL.revokeObjectURL(audioUrl);
            currentAudioRef.current = null;
          };

          await audio.play();
          return;
        }
      }
    } catch (err) {
      console.warn('Edge-TTS service unavailable, falling back to local speech:', err);
    }

    // 2. Secondary Fallback: Browser Web Speech API
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      const matchedVoice = getBestVoice();
      if (matchedVoice) {
        utterance.voice = matchedVoice;
        utterance.lang = matchedVoice.lang;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      setIsSpeaking(false);
    }
  };

  // Setup Speech Recognition (Mic Input)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = micLang;

        recognition.onresult = (event: any) => {
          let interim = '';
          let final = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final += event.results[i][0].transcript;
            } else {
              interim += event.results[i][0].transcript;
            }
          }

          const currentSpoken = (final || interim).trim();
          if (currentSpoken) {
            setInputQuery(currentSpoken);
          }

          // Smart auto-finalize: if user pauses speaking for 1000ms, stop mic to trigger instant response
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
          if (interim.trim() && !final.trim()) {
            silenceTimerRef.current = setTimeout(() => {
              if (recognitionRef.current) {
                try { recognitionRef.current.stop(); } catch {}
              }
            }, 1000);
          }

          if (final.trim()) {
            if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
            setIsListening(false);
            handleUserResponse(final.trim());
          }
        };

        recognition.onerror = () => {
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
          setIsListening(false);
        };
        recognition.onend = () => {
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [availableVoices, voiceAccent, micLang]);

  // Toggle Mic
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported in this browser. You can type or click options.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.lang = micLang;
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        setIsListening(false);
      }
    }
  };

  // Welcome speech when opened
  const handleOpenWidget = () => {
    setIsOpen(true);
    if (!hasGreeted) {
      setHasGreeted(true);
      speakText(
        messages[0].text,
        messages[0].speechText
      );
    }
  };

  // Reset conversation
  const handleReset = () => {
    stopAllSpeech();
    const welcomeMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'ai',
      text: 'السلام علیکم! میں ایگزیکٹو پیکس AI ہوں۔ آپ مجھ سے پیکیجنگ، پرائسنگ، کسٹم ڈائز یا ڈیلیوری کے بارے میں لائیو پوچھ سکتے ہیں۔',
      speechText: 'السلام علیکم! میں ایگزیکٹو پیکس اے آئی ہوں۔ آپ پیکیجنگ تفصیلات یا ڈائریکٹ فیکٹری ریٹس کے بارے میں پوچھ سکتے ہیں۔',
      options: [
        'بیکری و کیک باکسز',
        'ای کامرس میلر باکسز',
        'پرفیوم و بوٹل ٹیوب',
        'شپنگ کارٹن باکسز',
        'ہول سیل ڈسکاؤنٹ',
      ],
    };
    setMessages([welcomeMsg]);
    speakText(welcomeMsg.text, welcomeMsg.speechText);
  };

  // Live AI Response Handler (Communicates with /api/ai-agent)
  const handleUserResponse = async (text: string) => {
    if (!text.trim() || isThinking) return;

    // 1. Add User Message to Chat
    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text,
    };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    // Stop ongoing speech
    stopAllSpeech();

    try {
      // Build conversation history
      const history = messages.slice(-6).map(m => ({
        sender: m.sender,
        text: m.text,
      }));

      // Call Live Backend AI Route
      const res = await fetch('/api/ai-agent', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history,
        }),
      });

      const data = await res.json();
      setIsThinking(false);

      if (data && data.text) {
        // Smart dynamic follow-up options
        let dynamicOptions: string[] = [];
        const lower = text.toLowerCase();
        if (lower.includes('sample') || lower.includes('check')) {
          dynamicOptions = ['Order $15 Physical Sample Box', 'What is bulk volume discount?', 'Custom Dimensions'];
        } else if (lower.includes('price') || lower.includes('rate') || lower.includes('cost') || lower.includes('discount')) {
          dynamicOptions = ['Calculate for 1,000 pcs', 'Calculate for 5,000 pcs', 'Lead time & delivery days?'];
        } else if (data.recommendation) {
          dynamicOptions = ['Order Sample Box ($15)', 'Wholesale Tier Calculate Karein', 'Dusri packaging category dekhni hai'];
        } else {
          dynamicOptions = ['Wholesale Pricing', 'Delivery Lead Time', 'Order Sample Box ($15)', 'Custom Logo Finish'];
        }

        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: data.text,
          speechText: data.speech || data.text,
          recommendation: data.recommendation,
          options: dynamicOptions,
        };

        setMessages(prev => [...prev, aiMsg]);
        speakText(data.text, data.speech);
      }
    } catch (err) {
      setIsThinking(false);
      const fallbackMsg: Message = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: 'آپ کی بات سمجھ آگئی ہے! ایگزیکٹو پیکس براہ راست فیکٹری قیمت فراہم کرتا ہے۔ آپ کو کس سائز اور تعداد میں باکس چاہیے؟',
        speechText: 'آپ کی بات سمجھ آگئی ہے! ایگزیکٹو پیکس براہ راست فیکٹری ریٹ دیتا ہے۔ آپ کو کتنی مقدار میں باکس چاہیے؟',
        options: ['ہول سیل ریٹس', 'ڈیلیوری ٹائم', 'سیمپل باکس آرڈر'],
      };
      setMessages(prev => [...prev, fallbackMsg]);
      speakText(fallbackMsg.text, fallbackMsg.speechText);
    }
  };

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* Floating Trigger Button (Bottom Left) */}
      {!isOpen && (
        <button
          onClick={handleOpenWidget}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-4 py-3 bg-stone-900 text-white rounded-full shadow-2xl hover:bg-stone-800 transition transform hover:scale-105 group border border-stone-700"
          aria-label="Open Executive AI"
        >
          <div className="relative w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold shadow-md">
            <Bot className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-stone-900 animate-pulse"></span>
          </div>
          <div className="text-left">
            <span className="text-xs font-extrabold uppercase tracking-wider text-stone-100 block">
              Executive AI
            </span>
            <p className="text-[10px] text-stone-400 leading-tight">
              Online • Live Chat & Voice
            </p>
          </div>
        </button>
      )}

      {/* Main AI Agent Modal Window */}
      {isOpen && (
        <div className="fixed bottom-6 left-4 sm:left-6 z-50 w-[92vw] sm:w-[440px] max-h-[85vh] h-[620px] flex flex-col bg-white rounded-3xl shadow-2xl border border-stone-300 overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="bg-stone-900 text-white p-3.5 flex items-center justify-between border-b border-stone-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-md">
                <Bot className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-stone-900"></span>
              </div>
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Executive Packs AI
                </h3>
                <p className="text-[10px] text-stone-400">
                  {isSpeaking ? 'Speaking...' : isThinking ? 'Thinking...' : 'Online'}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1.5">
              {/* Urdu Edge-TTS Voice Toggle (Asad vs Uzma) */}
              <button
                onClick={() => {
                  const nextVoice = selectedUrduVoice === 'ur-PK-AsadNeural' ? 'ur-PK-UzmaNeural' : 'ur-PK-AsadNeural';
                  setSelectedUrduVoice(nextVoice);
                  stopAllSpeech();
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition border ${
                  selectedUrduVoice === 'ur-PK-AsadNeural'
                    ? 'bg-amber-950/80 text-amber-300 border-amber-700/80 hover:bg-amber-900'
                    : 'bg-purple-950/80 text-purple-300 border-purple-700/80 hover:bg-purple-900'
                }`}
                title="Toggle Pakistani Urdu Voice: Asad (Male) / Uzma (Female)"
              >
                <span>🎙️</span>
                <span>{selectedUrduVoice === 'ur-PK-AsadNeural' ? 'Asad (Male)' : 'Uzma (Female)'}</span>
              </button>

              {/* Voice Mute / Unmute */}
              <button
                onClick={() => {
                  if (voiceEnabled) {
                    stopAllSpeech();
                  }
                  setVoiceEnabled(!voiceEnabled);
                }}
                className={`p-1.5 rounded-lg transition ${voiceEnabled ? 'bg-amber-950 text-amber-400 hover:bg-amber-900' : 'text-stone-400 hover:bg-stone-800'}`}
                title={voiceEnabled ? 'Mute Voice' : 'Enable Voice'}
              >
                {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>

              {/* Reset Conversation */}
              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
                title="Restart Chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  stopAllSpeech();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
                title="Minimize Agent"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Sound Wave Animation (When AI is speaking with Edge-TTS) */}
          {isSpeaking && (
            <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span className="text-[10px] font-bold text-amber-800">
                  Speaking via {selectedUrduVoice === 'ur-PK-AsadNeural' ? 'Asad (Male Urdu)' : 'Uzma (Female Urdu)'}...
                </span>
              </div>
              <div className="flex items-center gap-1 h-3">
                <span className="w-1 bg-amber-600 rounded-full animate-bounce h-2"></span>
                <span className="w-1 bg-amber-600 rounded-full animate-bounce h-3 delay-75"></span>
                <span className="w-1 bg-amber-600 rounded-full animate-bounce h-1.5 delay-150"></span>
                <span className="w-1 bg-amber-600 rounded-full animate-bounce h-2.5 delay-100"></span>
              </div>
            </div>
          )}

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-stone-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-start gap-2 max-w-[88%]">
                  {msg.sender === 'ai' && (
                    <div className="w-6 h-6 rounded-lg bg-stone-900 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div>
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed font-medium shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-stone-900 text-white rounded-tr-none'
                          : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* AI Product Recommendation Card */}
                    {msg.recommendation && (
                      <div className="mt-2.5 p-3 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center gap-3 shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={msg.recommendation.image}
                          alt={msg.recommendation.productName}
                          className="w-14 h-14 rounded-xl object-cover border border-amber-200"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-amber-800">
                            Recommended Box Line
                          </span>
                          <h4 className="text-xs font-bold text-stone-900 truncate">
                            {msg.recommendation.productName}
                          </h4>
                          <p className="text-[10px] text-stone-600 line-clamp-1">
                            {msg.recommendation.reason}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] font-extrabold text-amber-900">
                              {msg.recommendation.estimatedPrice}
                            </span>
                            <a
                              href={`/order?product=${msg.recommendation.productId}`}
                              className="text-[10px] font-bold text-amber-800 hover:text-amber-900 flex items-center gap-0.5 underline"
                            >
                              Configure Order <ArrowRight className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Quick Options Chips */}
                    {msg.options && msg.options.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {msg.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleUserResponse(opt)}
                            className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white border border-stone-300 text-stone-700 hover:border-amber-700 hover:bg-amber-50 hover:text-amber-900 transition shadow-xs text-left"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Thinking / Processing Bubble */}
            {isThinking && (
              <div className="flex items-center gap-2 text-stone-500 text-xs py-1">
                <div className="w-6 h-6 rounded-lg bg-stone-900 text-white flex items-center justify-center shrink-0 text-[10px]">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white px-3.5 py-2 rounded-2xl border border-stone-200 flex items-center gap-2 shadow-sm">
                  <Loader2 className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                  <span className="text-xs font-medium text-stone-600">
                    Calculating packaging specifications...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Live Mic Listening Visual Banner */}
          {isListening && (
            <div className="px-4 py-2 bg-rose-50 border-t border-rose-200 flex items-center justify-between text-xs text-rose-800 shrink-0">
              <div className="flex items-center gap-2 truncate">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
                <span className="font-bold">Listening:</span>
                <span className="italic truncate text-rose-950 font-medium">
                  {inputQuery ? `"${inputQuery}"` : 'Bolain, main sun raha hoon...'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (recognitionRef.current) recognitionRef.current.stop();
                  setIsListening(false);
                  if (inputQuery.trim()) {
                    handleUserResponse(inputQuery);
                  }
                }}
                className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold hover:bg-rose-700 shrink-0 ml-2"
              >
                Send
              </button>
            </div>
          )}

          {/* Footer Input Bar */}
          <div className="p-3 bg-white border-t border-stone-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUserResponse(inputQuery);
              }}
              className="flex items-center gap-1.5"
            >
              {/* Mic Language Selector Pill */}
              <button
                type="button"
                onClick={() => {
                  const cycle: ('ur-PK' | 'hi-IN' | 'en-US')[] = ['ur-PK', 'hi-IN', 'en-US'];
                  const nextIdx = (cycle.indexOf(micLang) + 1) % cycle.length;
                  setMicLang(cycle[nextIdx]);
                }}
                className="px-1.5 py-1.5 rounded-lg text-[9px] font-extrabold uppercase bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition shrink-0"
                title="Click to switch mic language (Urdu, Roman Hindustani, or English)"
              >
                {micLang === 'ur-PK' ? 'اردو' : micLang === 'hi-IN' ? 'Roman' : 'EN'}
              </button>

              {/* Mic Speech Button */}
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2.5 rounded-full transition shrink-0 ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
                title={isListening ? 'Listening... click to stop' : 'Click to Speak via Mic'}
              >
                <Mic className="w-4 h-4" />
              </button>

              {/* Text Input */}
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={isListening ? 'Listening to your voice...' : 'Ask about packaging, custom sizes, MOQ, rates...'}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-900 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!inputQuery.trim() || isThinking}
                className="p-2.5 rounded-xl bg-stone-900 hover:bg-amber-800 disabled:opacity-40 text-white transition shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-stone-400 mt-1.5 px-1 font-medium">
              <span>Ask about perfume boxes, pricing, delivery, sample, or custom dimensions</span>
              <span>Executive Packs B2B</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
