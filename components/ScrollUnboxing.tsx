'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

export default function ScrollUnboxing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [soundEnabled] = useState(false);
  const [speedMode] = useState<'fast' | 'turbo'>('fast');
  const [progress, setProgress] = useState(0);
  const [stageLabel, setStageLabel] = useState('Stage 1: Sealed & Interlocked Handle');
  const [, setCanvasLoaded] = useState(false);

  // Performance throttling refs
  const currentLabelRef = useRef('Stage 1: Sealed & Interlocked Handle');
  const lastProgressRef = useRef(0);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastSoundTimeRef = useRef(0);

  // Images Ref
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // --- 1. Sound Synth ---
  const playPaperRustle = useCallback((intensity = 0.5) => {
    if (!soundEnabled) return;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const now = performance.now();
    if (now - lastSoundTimeRef.current < 65) return;
    lastSoundTimeRef.current = now;

    try {
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let last = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.04 * white) / 1.04;
        data[i] = last * 3.5;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200 + Math.random() * 400;
      filter.Q.value = 1.8;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.015 * intensity, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch {}
  }, [soundEnabled]);

  // Core Canvas Drawing Function
  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const p = currentProgressRef.current;
    const w = canvas.width;
    const h = canvas.height;

    // Studio background
    const grad = ctx.createRadialGradient(w / 2, h * 0.45, 80, w / 2, h * 0.5, Math.max(w, h) * 0.65);
    grad.addColorStop(0, '#faf7f2');
    grad.addColorStop(1, '#eae3d5');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    const images = imagesRef.current;
    if (images.length > 0 && images[0]?.complete) {
      const total = images.length - 1;
      const pos = p * total;
      const base = Math.floor(pos);
      const next = Math.min(base + 1, total);
      const alphaRaw = pos - base;
      const alpha = alphaRaw * alphaRaw * (3 - 2 * alphaRaw);

      const imgA = images[base];
      const imgB = images[next];

      const zoom = 1.0 + p * 0.045;
      const panY = -p * 15;

      const imgRatio = (imgA.naturalWidth || 4) / (imgA.naturalHeight || 3);
      const canvasRatio = w / h;

      let drawW: number, drawH: number;
      if (canvasRatio > imgRatio) {
        drawH = h * 0.86 * zoom;
        drawW = drawH * imgRatio;
      } else {
        drawW = w * 1.25 * zoom;
        drawH = drawW / imgRatio;
      }

      const drawX = (w - drawW) / 2;
      const drawY = (h - drawH) / 2 + panY;

      // Tabletop shadow
      ctx.save();
      const shadowWidth = drawW * 0.75;
      const shadowHeight = 28 * zoom;
      const shadowX = w / 2;
      const shadowY = drawY + drawH * 0.88;
      const shadowGrad = ctx.createRadialGradient(shadowX, shadowY, 10, shadowX, shadowY, shadowWidth / 2);
      shadowGrad.addColorStop(0, 'rgba(70, 50, 30, 0.22)');
      shadowGrad.addColorStop(1, 'rgba(70, 50, 30, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(shadowX, shadowY, shadowWidth / 2, shadowHeight / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw Frame A
      ctx.drawImage(imgA, drawX, drawY, drawW, drawH);

      // Cross-fade Frame B
      if (alpha > 0.001 && imgB && imgB.complete) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.drawImage(imgB, drawX, drawY, drawW, drawH);
        ctx.restore();
      }

      // Interior glow
      if (p > 0.65) {
        const glowIntensity = Math.min(1, (p - 0.65) / 0.35);
        ctx.save();
        const glowX = w / 2;
        const glowY = drawY + drawH * 0.38;
        const glowRadius = drawW * 0.35;
        const interiorGlow = ctx.createRadialGradient(glowX, glowY, 10, glowX, glowY, glowRadius);
        interiorGlow.addColorStop(0, `rgba(255, 215, 0, ${0.28 * glowIntensity})`);
        interiorGlow.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.fillStyle = interiorGlow;
        ctx.beginPath();
        ctx.arc(glowX, glowY, glowRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  }, []);

  // Snappy Animation Loop
  const requestTick = useCallback(() => {
    if (animationFrameRef.current !== null) return;

    const tick = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0004) {
        currentProgressRef.current += diff * 0.45;
        drawFrame();
        animationFrameRef.current = requestAnimationFrame(tick);
      } else {
        currentProgressRef.current = targetProgressRef.current;
        drawFrame();
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(tick);
  }, [drawFrame]);

  // --- 2. Canvas Engine Setup ---
  useEffect(() => {
    const framePaths = [
      '/assets/frame_0.jpg',
      '/assets/frame_1.jpg',
      '/assets/frame_2.jpg',
      '/assets/frame_3.jpg',
      '/assets/frame_4.jpg',
    ];

    let loadedCount = 0;
    imagesRef.current = [];

    framePaths.forEach((src, idx) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === framePaths.length) {
          setCanvasLoaded(true);
        }
        requestTick();
      };
      img.src = src;
      imagesRef.current[idx] = img;
    });

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas || !canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.parentElement.clientWidth * dpr;
      canvas.height = canvas.parentElement.clientHeight * dpr;
      drawFrame();
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [drawFrame, requestTick]);

  // --- 3. Scroll Tracking ---
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalTravel = el.offsetHeight - window.innerHeight;
      if (totalTravel <= 0) return;

      const p = Math.max(0, Math.min(1, -rect.top / totalTravel));
      targetProgressRef.current = p;

      // Throttle React state progress updates
      if (Math.abs(p - lastProgressRef.current) > 0.02) {
        lastProgressRef.current = p;
        setProgress(p);
      }

      // Label update only when stage actually changes
      let newLabel = 'Stage 1: Sealed & Interlocked Handle';
      if (p < 0.20) newLabel = 'Stage 1: Sealed & Interlocked Handle';
      else if (p < 0.45) newLabel = 'Stage 2: Unlocking Handle Tabs';
      else if (p < 0.70) newLabel = 'Stage 3: Flaps V-Angle Unfolding';
      else if (p < 0.90) newLabel = 'Stage 4: Wide Gable Expansion';
      else newLabel = 'Stage 5: Fully Open & Product Revealed';

      if (newLabel !== currentLabelRef.current) {
        currentLabelRef.current = newLabel;
        setStageLabel(newLabel);
      }

      playPaperRustle(0.5);
      requestTick();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [playPaperRustle, requestTick]);

  const containerHeightClass = speedMode === 'turbo' ? 'h-[110vh] sm:h-[135vh]' : 'h-[120vh] sm:h-[175vh]';

  return (
    <section ref={containerRef} id="unboxing-section" className={`relative ${containerHeightClass} bg-[#eae5dc] transition-all`}>
      <div className="sticky top-14 sm:top-0 left-0 w-full h-[calc(100vh-56px)] sm:h-screen overflow-hidden flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%,#faf8f5_0%,#eae4d8_100%)]">
        
        {/* Top HUD Status Bar */}
        <div className="hidden sm:flex absolute top-16 sm:top-24 left-3 right-3 sm:left-4 sm:right-4 max-w-6xl mx-auto items-center justify-between pointer-events-none z-20">
          
          {/* Status Label */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/90 backdrop-blur-md border border-white/50 shadow-xs pointer-events-auto max-w-[70vw] sm:max-w-none truncate">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b] shrink-0"></span>
            <span className="text-[11px] sm:text-xs font-bold text-stone-900 tracking-tight truncate">{stageLabel}</span>
          </div>

          {/* Quick HUD Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
            <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-white/50 shadow-xs flex flex-col items-end">
              <span className="font-mono text-xs sm:text-sm font-extrabold text-amber-900 leading-none">
                {Math.round(progress * 100)}%
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold text-stone-500 tracking-wider">UNBOXED</span>
            </div>
          </div>

        </div>

        {/* Realistic High-Res Canvas */}
        <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-0">
          <canvas ref={canvasRef} className="w-full h-full object-contain will-change-transform" />
        </div>

        {/* Floating Annotations */}
        {progress < 0.25 && (
          <div className="hidden sm:block absolute bottom-16 sm:bottom-auto sm:top-[32%] left-3 right-3 sm:left-14 sm:right-auto sm:max-w-xs p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/50 shadow-xl transition-all animate-fade-in pointer-events-none z-20">
            <span className="text-[9px] sm:text-[10px] font-mono font-bold text-amber-700 tracking-wider uppercase">01 / SEALED</span>
            <h4 className="font-extrabold text-stone-900 text-xs sm:text-sm mt-0.5">Interlocking Gable Handle</h4>
            <p className="text-[11px] sm:text-xs text-stone-600 mt-1">Die-cut handle tabs lock securely without adhesive tape. 450 GSM eco-kraft.</p>
          </div>
        )}

        {progress > 0.75 && (
          <div className="hidden sm:block absolute bottom-16 sm:bottom-28 left-3 right-3 sm:left-auto sm:right-14 sm:max-w-xs p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/50 shadow-xl transition-all animate-fade-in pointer-events-none z-20">
            <span className="text-[9px] sm:text-[10px] font-mono font-bold text-amber-700 tracking-wider uppercase">04 / REVEAL</span>
            <h4 className="font-extrabold text-stone-900 text-xs sm:text-sm mt-0.5">Golden Interior Reveal</h4>
            <p className="text-[11px] sm:text-xs text-stone-600 mt-1">Gable flaps rest fully open to reveal the product inside under warm ambient light.</p>
          </div>
        )}

      </div>
    </section>
  );
}
