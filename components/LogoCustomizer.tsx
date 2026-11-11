'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Sparkles, Move, RotateCw, ZoomIn, Sliders, Check, Layers, Image as ImageIcon, ChevronDown } from 'lucide-react';

const PRESET_BOXES = [
  {
    id: 'gable-box',
    name: 'Gable Carry Box',
    image: '/assets/reference-box.jpg',
    category: 'Home & Kitchen',
    defaultPos: { x: 0.52, y: 0.62 },
    defaultScale: 0.38,
    defaultAngle: -5,
  },
  {
    id: 'kraft-mailer',
    name: 'Roll-End Kraft Mailer',
    image: '/assets/frame_1.jpg',
    category: 'E-Commerce',
    defaultPos: { x: 0.50, y: 0.50 },
    defaultScale: 0.35,
    defaultAngle: 0,
  },
  {
    id: 'black-mailer',
    name: 'Luxury Obsidian Black Box',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80',
    category: 'Luxury Fashion',
    defaultPos: { x: 0.50, y: 0.45 },
    defaultScale: 0.32,
    defaultAngle: 0,
  },
  {
    id: 'master-carton',
    name: 'Heavy-Duty Master Carton',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    category: 'Cartons & Logistics',
    defaultPos: { x: 0.50, y: 0.55 },
    defaultScale: 0.36,
    defaultAngle: 0,
  },
  {
    id: 'wooden-crate',
    name: 'Artisan Solid Pine Crate',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80',
    category: 'Wooden Hampers',
    defaultPos: { x: 0.50, y: 0.50 },
    defaultScale: 0.34,
    defaultAngle: 0,
  },
];

export default function LogoCustomizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Box State
  const [selectedBoxId, setSelectedBoxId] = useState<string>('gable-box');
  const [customBoxUrl, setCustomBoxUrl] = useState<string | null>(null);

  // Logo State
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [brandText, setBrandText] = useState('EXECUTIVE PACKS');
  const [logoPos, setLogoPos] = useState({ x: 0.52, y: 0.62 }); // normalized 0 to 1
  const [logoScale, setLogoScale] = useState(0.38); // relative to canvas width
  const [logoRotation, setLogoRotation] = useState(-5); // degrees
  const [printFinish, setPrintFinish] = useState<'black-ink' | 'gold-foil' | 'white-ink' | 'original'>('black-ink');

  // Dragging interaction state
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Current active box image URL
  const currentBoxImage = customBoxUrl || PRESET_BOXES.find(b => b.id === selectedBoxId)?.image || PRESET_BOXES[0].image;

  // Draw on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const baseImg = new Image();
    baseImg.crossOrigin = 'anonymous';

    baseImg.onload = () => {
      // Set high resolution canvas dimensions matching container aspect
      const w = 1200;
      const h = 900;
      canvas.width = w;
      canvas.height = h;

      // Draw background box image
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(baseImg, 0, 0, w, h);

      // Draw Logo
      const drawLogoLayer = (imgToDraw: HTMLImageElement | null) => {
        ctx.save();
        const posX = logoPos.x * w;
        const posY = logoPos.y * h;

        ctx.translate(posX, posY);
        ctx.rotate((logoRotation * Math.PI) / 180);

        const targetW = w * logoScale;

        if (imgToDraw) {
          const ratio = imgToDraw.height / imgToDraw.width;
          const targetH = targetW * ratio;

          // Apply Print Finish Blend Modes
          if (printFinish === 'black-ink') {
            // Authentic flexo ink pressed into cardboard fibers
            ctx.globalCompositeOperation = 'multiply';
            ctx.globalAlpha = 0.92;
            ctx.filter = 'contrast(130%) brightness(85%)';
            ctx.drawImage(imgToDraw, -targetW / 2, -targetH / 2, targetW, targetH);
          } else if (printFinish === 'white-ink') {
            // Opaque white screen-print with slight edge bleed
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 0.95;
            ctx.filter = 'brightness(200%) drop-shadow(0 2px 4px rgba(0,0,0,0.15))';
            ctx.drawImage(imgToDraw, -targetW / 2, -targetH / 2, targetW, targetH);
          } else if (printFinish === 'gold-foil') {
            // Metallic Gold Hot Foil Stamping
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 1;
            ctx.shadowColor = 'rgba(217, 119, 6, 0.45)';
            ctx.shadowBlur = 10;
            ctx.drawImage(imgToDraw, -targetW / 2, -targetH / 2, targetW, targetH);

            // Shimmer overlay
            ctx.globalCompositeOperation = 'source-atop';
            const goldGrad = ctx.createLinearGradient(-targetW / 2, -targetH / 2, targetW / 2, targetH / 2);
            goldGrad.addColorStop(0, '#f59e0b');
            goldGrad.addColorStop(0.5, '#fef3c7');
            goldGrad.addColorStop(1, '#b45309');
            ctx.fillStyle = goldGrad;
            ctx.fillRect(-targetW / 2, -targetH / 2, targetW, targetH);
          } else {
            // Original Full Color
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 1;
            ctx.drawImage(imgToDraw, -targetW / 2, -targetH / 2, targetW, targetH);
          }

          // Active bounding box dashed indicator
          ctx.restore();
          ctx.save();
          ctx.translate(posX, posY);
          ctx.rotate((logoRotation * Math.PI) / 180);
          ctx.strokeStyle = 'rgba(217, 119, 6, 0.75)';
          ctx.lineWidth = 2;
          ctx.setLineDash([8, 4]);
          ctx.strokeRect(-targetW / 2 - 8, -targetH / 2 - 8, targetW + 16, targetH + 16);
          ctx.restore();

        } else {
          // Default Typography Monogram Stamp
          const stampW = targetW;
          const stampH = targetW * 0.52;

          ctx.save();
          if (printFinish === 'black-ink') {
            ctx.globalCompositeOperation = 'multiply';
            ctx.fillStyle = 'rgba(28, 25, 23, 0.88)';
            ctx.strokeStyle = 'rgba(28, 25, 23, 0.88)';
          } else if (printFinish === 'gold-foil') {
            ctx.fillStyle = '#b45309';
            ctx.strokeStyle = '#f59e0b';
            ctx.shadowColor = '#d97706';
            ctx.shadowBlur = 8;
          } else {
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#ffffff';
          }

          ctx.lineWidth = 4;
          ctx.setLineDash([12, 6]);
          ctx.strokeRect(-stampW / 2, -stampH / 2, stampW, stampH);

          ctx.font = `bold ${Math.round(stampW * 0.12)}px "Space Grotesk", sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(brandText.toUpperCase(), 0, -stampH * 0.1);

          ctx.font = `bold ${Math.round(stampW * 0.045)}px sans-serif`;
          ctx.letterSpacing = '2px';
          ctx.fillText('CUSTOM PACKAGING CERTIFIED', 0, stampH * 0.22);
          ctx.restore();

          // Selection border
          ctx.strokeStyle = 'rgba(217, 119, 6, 0.6)';
          ctx.lineWidth = 2;
          ctx.setLineDash([6, 3]);
          ctx.strokeRect(-stampW / 2 - 6, -stampH / 2 - 6, stampW + 12, stampH + 12);
        }

        ctx.restore();
      };

      if (logoUrl) {
        const logoImg = new Image();
        logoImg.crossOrigin = 'anonymous';
        logoImg.onload = () => drawLogoLayer(logoImg);
        logoImg.src = logoUrl;
      } else {
        drawLogoLayer(null);
      }
    };

    baseImg.src = currentBoxImage;
  }, [currentBoxImage, logoUrl, brandText, logoPos, logoScale, logoRotation, printFinish]);

  // Mouse & Touch Drag Handlers
  const handlePointerDown = (clientX: number, clientY: number) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: clientX, y: clientY };
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const dx = (clientX - dragStartRef.current.x) / rect.width;
    const dy = (clientY - dragStartRef.current.y) / rect.height;
    dragStartRef.current = { x: clientX, y: clientY };

    setLogoPos(prev => ({
      x: Math.max(0.1, Math.min(0.9, prev.x + dx)),
      y: Math.max(0.1, Math.min(0.9, prev.y + dy)),
    }));
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Upload Custom Box Photo
  const handleBoxUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCustomBoxUrl(ev.target?.result as string);
        setSelectedBoxId('custom');
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload Custom Logo
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setLogoUrl(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Download High-Res Mockup
  const handleDownloadMockup = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `executive-packs-mockup-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL('image/png', 1.0);
    link.click();
  };

  return (
    <section id="customizer-section" className="py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Interactive Mockup Studio
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight">
            See Your Logo Razor-Sharp on Real Packaging
          </h2>
          <p className="text-base sm:text-lg text-stone-600 mt-3 font-medium">
            Upload your packaging box or select a studio model below. Drop your logo, drag it to position, and preview authentic factory printing finishes.
          </p>
        </div>

        {/* 2-Column Mockup Workspace */}
        <div className="bg-[#faf8f5] rounded-3xl border border-stone-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Interactive Controls (5 cols) */}
          <div className="p-8 sm:p-10 lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-200 space-y-7">
            <div className="space-y-6">

              {/* Step 1: Select Box or Upload Custom Box */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    1. Select Packaging Box:
                  </label>
                  <label className="text-xs font-bold text-amber-800 hover:text-amber-900 cursor-pointer flex items-center gap-1">
                    <Upload className="w-3 h-3" />
                    <span>Upload Own Box</span>
                    <input type="file" accept="image/*" onChange={handleBoxUpload} className="hidden" />
                  </label>
                </div>

                {/* Clean Dropdown Selector */}
                <div className="relative">
                  <select
                    value={customBoxUrl ? 'custom' : selectedBoxId}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'custom') return;
                      const box = PRESET_BOXES.find(b => b.id === val);
                      if (box) {
                        setSelectedBoxId(box.id);
                        setCustomBoxUrl(null);
                        setLogoPos(box.defaultPos);
                        setLogoScale(box.defaultScale);
                        setLogoRotation(box.defaultAngle);
                      }
                    }}
                    className="w-full appearance-none bg-white border border-stone-300 hover:border-stone-400 focus:border-amber-700 rounded-xl px-4 py-3 text-xs font-bold text-stone-800 shadow-xs focus:outline-none transition pr-10 cursor-pointer"
                  >
                    {PRESET_BOXES.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} — ({b.category})
                      </option>
                    ))}
                    {customBoxUrl && <option value="custom">Uploaded Custom Box Photo</option>}
                  </select>
                  <ChevronDown className="w-4 h-4 text-stone-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Selected Active Box Compact Bar (Only shows the single chosen box) */}
                <div className="mt-2.5 flex items-center gap-3 p-2.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
                  <div className="w-12 h-10 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={currentBoxImage} 
                      alt="Selected Box" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-stone-900 truncate">
                      {customBoxUrl ? 'Custom Box Model' : (PRESET_BOXES.find(b => b.id === selectedBoxId)?.name || 'Packaging Box')}
                    </p>
                    <p className="text-[10px] text-stone-500 font-medium truncate">
                      {customBoxUrl ? 'User uploaded custom photo' : (PRESET_BOXES.find(b => b.id === selectedBoxId)?.category || 'Studio Model')}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                    Selected
                  </span>
                </div>
              </div>

              {/* Step 2: Upload Brand Logo */}
              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">
                  2. Upload Brand Logo (.PNG, .JPG, .SVG):
                </label>
                <div className="flex gap-2.5">
                  <label className="flex-1 flex items-center justify-center gap-2 p-3.5 rounded-xl border-2 border-dashed border-stone-300 hover:border-amber-700 bg-white cursor-pointer transition group">
                    <Upload className="w-4 h-4 text-stone-400 group-hover:text-amber-700" />
                    <span className="text-xs font-bold text-stone-800">
                      {logoUrl ? 'Change Uploaded Logo' : 'Choose Logo File'}
                    </span>
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>

                  {logoUrl && (
                    <button
                      onClick={() => setLogoUrl(null)}
                      className="px-3.5 py-2 text-xs font-bold text-stone-500 hover:text-red-600 bg-stone-100 rounded-xl"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {!logoUrl && (
                  <div className="mt-2.5">
                    <input
                      type="text"
                      value={brandText}
                      onChange={(e) => setBrandText(e.target.value)}
                      placeholder="Or enter brand name stamp..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 font-bold text-stone-900 text-xs focus:outline-none focus:border-amber-700"
                    />
                  </div>
                )}
              </div>

              {/* Step 3: Print Finish Selector */}
              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">
                  3. Realistic Print Finish:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'black-ink', label: 'Eco Black Ink', desc: 'Blends into fibers' },
                    { id: 'gold-foil', label: 'Gold Hot Foil', desc: 'Metallic shine' },
                    { id: 'white-ink', label: 'Opaque White', desc: 'Screenprint ink' },
                    { id: 'original', label: 'Full CMYK Color', desc: 'True photo color' },
                  ].map((fin) => (
                    <button
                      key={fin.id}
                      onClick={() => setPrintFinish(fin.id as any)}
                      className={`p-2.5 rounded-xl text-left border transition ${
                        printFinish === fin.id
                          ? 'border-amber-700 bg-amber-50/80 shadow-sm'
                          : 'border-stone-200 bg-white hover:bg-stone-50'
                      }`}
                    >
                      <span className="block text-xs font-bold text-stone-900">{fin.label}</span>
                      <span className="block text-[10px] text-stone-500">{fin.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Scale & Rotation Fine Sliders */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200/90 space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-stone-600 mb-1">
                    <span className="flex items-center gap-1"><ZoomIn className="w-3.5 h-3.5 text-stone-400" /> Logo Scale:</span>
                    <span className="font-mono font-bold text-stone-900">{Math.round(logoScale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.15"
                    max="0.65"
                    step="0.01"
                    value={logoScale}
                    onChange={(e) => setLogoScale(Number(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-700"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-stone-600 mb-1">
                    <span className="flex items-center gap-1"><RotateCw className="w-3.5 h-3.5 text-stone-400" /> Rotation Angle:</span>
                    <span className="font-mono font-bold text-stone-900">{logoRotation}°</span>
                  </div>
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    step="1"
                    value={logoRotation}
                    onChange={(e) => setLogoRotation(Number(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-700"
                  />
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-4">
              <button
                onClick={handleDownloadMockup}
                className="w-full py-3.5 rounded-full bg-stone-900 hover:bg-amber-800 text-white font-bold text-xs uppercase tracking-wider text-center transition flex items-center justify-center gap-2 shadow-md shadow-stone-900/15"
              >
                <Download className="w-4 h-4" />
                <span>Download Client Presentation Mockup (PNG)</span>
              </button>

              <a
                href="#quote-section"
                className="w-full py-3 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs text-center transition block"
              >
                Get Wholesale Quote For This Design →
              </a>
            </div>

          </div>

          {/* Right Column: High-Res Interactive Canvas (7 cols) */}
          <div className="p-6 sm:p-8 lg:col-span-7 flex flex-col items-center justify-center bg-stone-100 relative min-h-[500px]">
            
            {/* Top Instruction Pill */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-bold text-stone-600 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 z-20 shadow-sm pointer-events-none">
              <span className="flex items-center gap-1.5 text-amber-900">
                <Move className="w-3.5 h-3.5 text-amber-700" /> Click & Drag logo anywhere on the box to position
              </span>
              <span className="hidden sm:inline font-mono">1200 × 900 Ultra-Sharp Canvas</span>
            </div>

            {/* Canvas Container */}
            <div 
              className="relative w-full max-w-xl aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-stone-300 bg-white cursor-grab active:cursor-grabbing select-none"
              onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
              onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onTouchStart={(e) => handlePointerDown(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchMove={(e) => handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchEnd={handlePointerUp}
            >
              <canvas ref={canvasRef} className="w-full h-full object-cover" />
            </div>

            {/* Bottom Tip */}
            <div className="mt-4 text-center text-xs text-stone-500 font-medium flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Pro Tip: Use <strong className="text-stone-700">Eco Black Ink</strong> for corrugated boxes, or <strong className="text-stone-700">Gold Hot Foil</strong> for luxury gift unboxing.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
