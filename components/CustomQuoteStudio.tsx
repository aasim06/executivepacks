'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Ruler, 
  Clock, 
  Send, 
  FileText, 
  Printer, 
  ArrowRight,
  PackageCheck,
  Check,
  X,
  Plus,
  Minus,
  Crown,
  Box,
  Truck,
  Sparkle
} from 'lucide-react';

interface QuoteStudioProps {
  initialProduct?: string;
  initialCategory?: string;
  className?: string;
}

const BOX_STYLES = [
  { id: 'folding-carton', name: 'Straight-Tuck Carton', desc: 'Standard retail tuck packaging for food, beauty & electronics' },
  { id: 'auto-bottom', name: 'Auto-Lock Bottom Box', desc: 'Pre-glued 1-2-3 snap base for high-speed assembly & heavier weight' },
  { id: 'corrugated-mailer', name: 'Roll-End Mailer (RETF)', desc: 'Crush-resistant e-commerce subscription box with dust flaps' },
  { id: 'rigid-setup', name: 'Luxury Rigid Setup Box', desc: 'Dense 2mm chipboard with magnetic flap or slide drawer' },
  { id: 'gable-handle', name: 'Gable Handle Box', desc: 'Handle-top takeout & promotional gift carrier' },
  { id: 'counter-display', name: 'Counter POP Display', desc: 'Retail point-of-sale display tray with pop-up header' },
];

const BOARD_MATERIALS = [
  { 
    id: 'eco-kraft', 
    name: 'Virgin Eco Brown Kraft', 
    badge: '100% Recycled', 
    desc: 'Unbleached rustic brown kraft with high tensile tear strength.' 
  },
  { 
    id: 'sbs-bleached', 
    name: 'SBS Virgin Bleached Board', 
    badge: 'Ultra-White', 
    desc: 'Pure white coated paperboard engineered for razor-sharp CMYK printing.' 
  },
  { 
    id: 'corrugated-eflute', 
    name: 'Corrugated E/B-Flute', 
    badge: 'Crush-Proof', 
    desc: 'Fluted shock-absorbing core for parcels, mailers & heavy bottles.' 
  },
  { 
    id: 'rigid-greyboard', 
    name: 'Luxury Rigid Greyboard', 
    badge: 'High-End VIP', 
    desc: 'Dense 1.5mm - 2.5mm solid chipboard core wrapped in art paper.' 
  },
  { 
    id: 'metallic-foilboard', 
    name: 'Met-PET Foilboard', 
    badge: 'Mirror Sheen', 
    desc: 'Reflective silver, gold or holographic rainbow metallic backing.' 
  },
];

const THICKNESS_OPTIONS = [
  { label: '14pt / 300 GSM', sub: 'Lightweight Retail' },
  { label: '16pt / 350 GSM', sub: 'Industry Standard' },
  { label: '18pt / 400 GSM', sub: 'Heavy Duty Retail' },
  { label: '24pt / 450 GSM', sub: 'Double Thick Duplex' },
  { label: '1.5mm Rigid Core', sub: 'Setup Gift Box' },
  { label: '2.0mm Heavy Rigid', sub: 'Ultra-Luxury Core' },
];

const FINISH_EMBELLISHMENTS = [
  { id: 'cmyk-standard', name: 'Full CMYK Offset Print', extra: 'Included' },
  { id: 'soft-touch', name: 'Soft-Touch Velvet Matte', extra: '+$0.06/pc' },
  { id: 'gold-foil', name: 'Gold Hot Foil Stamping', extra: '+$0.14/pc' },
  { id: 'spot-uv', name: 'Raised Tactile Spot UV', extra: '+$0.09/pc' },
  { id: 'emboss', name: '3D Blind Embossing', extra: '+$0.11/pc' },
  { id: 'plain', name: 'Plain / Unprinted Kraft', extra: '-$0.05/pc' },
];

const QUANTITY_TIERS = [250, 500, 1000, 2500, 5000, 10000];

export default function CustomQuoteStudio({ 
  initialProduct = 'Custom Manufactured Packaging Box', 
  initialCategory = 'Custom Packaging', 
  className = '' 
}: QuoteStudioProps) {
  
  // Dimensions & Unit
  const [unit, setUnit] = useState<'inches' | 'mm' | 'cm'>('inches');
  const [length, setLength] = useState<string>('8.5');
  const [width, setWidth] = useState<string>('5.5');
  const [depth, setDepth] = useState<string>('3.0');

  // Specifications
  const [selectedStyle, setSelectedStyle] = useState<string>('corrugated-mailer');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('sbs-bleached');
  const [selectedThickness, setSelectedThickness] = useState<string>('16pt / 350 GSM');
  const [selectedFinish, setSelectedFinish] = useState<string>('cmyk-standard');
  const [quantity, setQuantity] = useState<number>(1000);
  const [turnaround, setTurnaround] = useState<'standard' | 'rush'>('standard');

  // Business / Contact Details
  const [fullName, setFullName] = useState<string>('');
  const [businessEmail, setBusinessEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [cityCountry, setCityCountry] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [artworkFile, setArtworkFile] = useState<{ name: string; size: string } | null>(null);

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [quoteId, setQuoteId] = useState<string>('');
  const [errorText, setErrorText] = useState<string>('');

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        setErrorText('File size exceeds 25MB limit.');
        return;
      }
      setArtworkFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      });
      setErrorText('');
    }
  };

  // Live Dynamic Price Estimation Engine
  const { estUnitPrice, estSubtotal, volumeSavings, savingsPct } = useMemo(() => {
    // Base rate
    let base = 0.65;
    if (selectedStyle === 'rigid-setup') base = 1.45;
    if (selectedStyle === 'counter-display') base = 1.10;
    if (selectedStyle === 'auto-bottom') base = 0.55;
    if (selectedStyle === 'folding-carton') base = 0.42;

    // Material adjustment
    if (selectedMaterial === 'rigid-greyboard') base += 0.55;
    if (selectedMaterial === 'metallic-foilboard') base += 0.28;
    if (selectedMaterial === 'corrugated-eflute') base += 0.15;

    // Finish addon
    if (selectedFinish === 'gold-foil') base += 0.14;
    if (selectedFinish === 'soft-touch') base += 0.06;
    if (selectedFinish === 'spot-uv') base += 0.09;
    if (selectedFinish === 'emboss') base += 0.11;
    if (selectedFinish === 'plain') base -= 0.05;

    // Dimensional factor
    const l = parseFloat(length) || 6;
    const w = parseFloat(width) || 4;
    const d = parseFloat(depth) || 2;
    // Normalize to standard volume
    const vol = unit === 'inches' ? l * w * d : (l * w * d) / 16.387;
    const sizeMultiplier = Math.max(0.7, Math.min(2.5, Math.pow(vol / 140, 0.4)));

    // Volume discount
    let disc = 0;
    if (quantity >= 10000) disc = 0.60;
    else if (quantity >= 5000) disc = 0.52;
    else if (quantity >= 2500) disc = 0.42;
    else if (quantity >= 1000) disc = 0.32;
    else if (quantity >= 500) disc = 0.18;

    const unitPrice = Math.max(0.18, base * sizeMultiplier * (1 - disc));
    const subtotal = unitPrice * quantity;
    const regularTotal = (base * sizeMultiplier) * quantity;
    const savings = Math.max(0, regularTotal - subtotal);

    return {
      estUnitPrice: unitPrice,
      estSubtotal: subtotal,
      volumeSavings: savings,
      savingsPct: Math.round(disc * 100),
    };
  }, [selectedStyle, selectedMaterial, selectedFinish, length, width, depth, unit, quantity]);

  // Form Submit Handler
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    if (!fullName.trim() || !businessEmail.trim() || !phone.trim()) {
      setErrorText('Please enter your Name, Email, and Phone / WhatsApp number.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `EP-QT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setQuoteId(generatedId);

      // Save to shared B2B quote database
      if (typeof window !== 'undefined') {
        try {
          const quotes = JSON.parse(localStorage.getItem('executive_b2b_quotes_v1') || '[]');
          const newRecord = {
            id: generatedId,
            createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
            name: fullName.trim(),
            company: company.trim() || `${fullName.trim()}'s Business`,
            email: businessEmail.trim(),
            phone: phone.trim(),
            cityCountry: cityCountry.trim() || 'Pakistan',
            productName: initialProduct,
            category: initialCategory,
            style: BOX_STYLES.find(s => s.id === selectedStyle)?.name || selectedStyle,
            material: BOARD_MATERIALS.find(m => m.id === selectedMaterial)?.name || selectedMaterial,
            thickness: selectedThickness,
            finish: FINISH_EMBELLISHMENTS.find(f => f.id === selectedFinish)?.name || selectedFinish,
            dimensions: `${length} × ${width} × ${depth} ${unit}`,
            quantity,
            turnaround: turnaround === 'rush' ? 'Rush (3-5 Days)' : 'Standard (6-8 Days)',
            estUnitPrice: estUnitPrice.toFixed(2),
            estTotalAmount: Math.round(estSubtotal),
            artworkName: artworkFile?.name || 'No file uploaded',
            message: message.trim() || 'Bespoke custom packaging inquiry.',
            status: 'Pending Engineering Review',
          };
          localStorage.setItem('executive_b2b_quotes_v1', JSON.stringify([newRecord, ...quotes]));
        } catch (err) {
          console.error('Failed to save quote inquiry:', err);
        }
      }

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <section id="custom-quote-studio" className={`relative rounded-3xl sm:rounded-[36px] bg-stone-900 text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-stone-800 overflow-hidden ${className}`}>
      
      {/* Background Ambient Glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Studio Header */}
      <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-14 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase border border-amber-500/30 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Industrial Packaging Quotation Studio</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          Request Instant Custom B2B Quotation
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 mt-3 max-w-2xl mx-auto leading-relaxed">
          Configure exact structural dimensions, certified sustainable board grades, luxury embellishments, and volume tiers. Our CAD engineers provide digital 3D dieline proofs within 2 hours.
        </p>
      </div>

      {isSuccess ? (
        /* SUCCESS CONFIRMATION RECEIPT */
        <div className="max-w-2xl mx-auto bg-stone-800/90 rounded-3xl p-6 sm:p-10 border border-stone-700 text-center space-y-4 animate-fade-in relative z-10 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>

          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            Quotation Requisition Confirmed
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Quote #{quoteId} Generated!
          </h3>

          <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-white">{fullName}</strong>. Your custom specification has been registered into our automated manufacturing calculation system.
          </p>

          {/* Receipt Specs Summary */}
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-700/80 text-left text-xs space-y-2 font-medium">
            <div className="flex justify-between text-stone-300">
              <span>Box Format:</span>
              <span className="font-bold text-white">{BOX_STYLES.find(s => s.id === selectedStyle)?.name}</span>
            </div>
            <div className="flex justify-between text-stone-300">
              <span>Board Grade:</span>
              <span className="font-bold text-white">{BOARD_MATERIALS.find(m => m.id === selectedMaterial)?.name}</span>
            </div>
            <div className="flex justify-between text-stone-300">
              <span>Custom Dimensions:</span>
              <span className="font-mono font-bold text-amber-400">{length} × {width} × {depth} {unit}</span>
            </div>
            <div className="flex justify-between text-stone-300">
              <span>Quantity:</span>
              <span className="font-mono font-bold text-white">{quantity.toLocaleString()} units</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-stone-700 text-sm font-bold text-white">
              <span>Estimated Value:</span>
              <span className="font-mono text-emerald-400">${Math.round(estSubtotal).toLocaleString()} USD</span>
            </div>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/923001234567?text=${encodeURIComponent(`Hello Executive Packs! I submitted Quote Requisition #${quoteId} for ${quantity} pcs of ${initialProduct}. Please share dieline proof.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20b858] text-white font-bold text-xs uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2"
            >
              <span>Confirm via WhatsApp Direct</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                setFullName('');
                setBusinessEmail('');
                setMessage('');
                setArtworkFile(null);
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-full border border-stone-600 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition"
            >
              Configure Another Box
            </button>
          </div>
        </div>
      ) : (
        /* MAIN INTERACTIVE STUDIO (2 Columns) */
        <form onSubmit={handleQuoteSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start relative z-10">
          
          {/* LEFT 7-8 COLUMNS: Interactive Specification Stages */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            
            {/* STAGE 1: Box Architecture & Style */}
            <div className="bg-stone-800/60 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-stone-700/80 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 font-mono text-xs font-black flex items-center justify-center">
                  1
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white">
                    Select Box Dieline Architecture
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    Choose folding mechanism, structural closure, and assembly format
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {BOX_STYLES.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-3.5 rounded-2xl text-left border transition relative active:scale-[0.98] ${
                      selectedStyle === style.id
                        ? 'border-amber-400 bg-amber-500/10 shadow-sm'
                        : 'border-stone-700/80 bg-stone-900/50 hover:bg-stone-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold ${selectedStyle === style.id ? 'text-amber-300' : 'text-stone-200'}`}>
                        {style.name}
                      </span>
                      {selectedStyle === style.id && (
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[10px] text-stone-400 line-clamp-1">
                      {style.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* STAGE 2: Custom Dimensions with Unit Toggles */}
            <div className="bg-stone-800/60 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-stone-700/80 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 font-mono text-xs font-black flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-white">
                      Enter Exact Dimensions (L × W × D)
                    </h3>
                    <p className="text-[11px] text-stone-400">
                      Standard or bespoke sizes tailored to your inner contents
                    </p>
                  </div>
                </div>

                {/* Unit Toggles */}
                <div className="flex p-0.5 rounded-xl bg-stone-900 border border-stone-700 text-xs font-bold">
                  {(['inches', 'mm', 'cm'] as const).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setUnit(u)}
                      className={`px-3 py-1 rounded-lg uppercase tracking-wider text-[10px] transition ${
                        unit === u
                          ? 'bg-amber-500 text-stone-950 font-extrabold shadow-xs'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3 Dimensional Numeric Inputs */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-stone-900/80 border border-stone-700">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Length (L)
                  </span>
                  <div className="flex items-center">
                    <input
                      type="number"
                      step={0.1}
                      min={1}
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full bg-transparent text-white font-mono text-base sm:text-lg font-black focus:outline-none"
                    />
                    <span className="text-[11px] text-stone-500 font-mono">{unit}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-stone-900/80 border border-stone-700">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Width (W)
                  </span>
                  <div className="flex items-center">
                    <input
                      type="number"
                      step={0.1}
                      min={1}
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full bg-transparent text-white font-mono text-base sm:text-lg font-black focus:outline-none"
                    />
                    <span className="text-[11px] text-stone-500 font-mono">{unit}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-stone-900/80 border border-stone-700">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Depth (D)
                  </span>
                  <div className="flex items-center">
                    <input
                      type="number"
                      step={0.1}
                      min={0.5}
                      value={depth}
                      onChange={(e) => setDepth(e.target.value)}
                      className="w-full bg-transparent text-white font-mono text-base sm:text-lg font-black focus:outline-none"
                    />
                    <span className="text-[11px] text-stone-500 font-mono">{unit}</span>
                  </div>
                </div>
              </div>

              <span className="text-[11px] text-stone-400 mt-2 block">
                Total Interior Volume: <strong className="text-white font-mono">{(parseFloat(length) * parseFloat(width) * parseFloat(depth) || 0).toFixed(1)} cu. {unit}</strong>
              </span>
            </div>

            {/* STAGE 3: Material & Board Grade */}
            <div className="bg-stone-800/60 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-stone-700/80 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 font-mono text-xs font-black flex items-center justify-center">
                  3
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white">
                    Certified Board Material & Thickness
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    Select FSC-certified sustainable cardstock & caliper ratings
                  </p>
                </div>
              </div>

              {/* Material Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                {BOARD_MATERIALS.map((mat) => (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => setSelectedMaterial(mat.id)}
                    className={`p-3 rounded-2xl text-left border transition relative active:scale-[0.98] ${
                      selectedMaterial === mat.id
                        ? 'border-amber-400 bg-amber-500/10 shadow-sm'
                        : 'border-stone-700/80 bg-stone-900/50 hover:bg-stone-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold ${selectedMaterial === mat.id ? 'text-amber-300' : 'text-stone-200'}`}>
                        {mat.name}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">
                        {mat.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-stone-400 line-clamp-1">
                      {mat.desc}
                    </p>
                  </button>
                ))}
              </div>

              {/* Caliper / Thickness Chips */}
              <div>
                <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                  Board Thickness / Weight:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {THICKNESS_OPTIONS.map((th) => (
                    <button
                      key={th.label}
                      type="button"
                      onClick={() => setSelectedThickness(th.label)}
                      className={`p-2.5 rounded-xl border text-left transition ${
                        selectedThickness === th.label
                          ? 'border-amber-400 bg-amber-500/15 text-white font-bold'
                          : 'border-stone-700/70 bg-stone-900/60 text-stone-300 hover:bg-stone-800'
                      }`}
                    >
                      <span className="block text-xs font-bold">{th.label}</span>
                      <span className="block text-[9px] text-stone-400">{th.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* STAGE 4: Printing & Luxury Embellishments */}
            <div className="bg-stone-800/60 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-stone-700/80 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 font-mono text-xs font-black flex items-center justify-center">
                  4
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white">
                    Printing & Luxury Finish Embellishments
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    High-definition Heidelberg CMYK offset, metallic hot foils & tactile varnishes
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {FINISH_EMBELLISHMENTS.map((fin) => (
                  <button
                    key={fin.id}
                    type="button"
                    onClick={() => setSelectedFinish(fin.id)}
                    className={`p-3 rounded-2xl text-left border transition ${
                      selectedFinish === fin.id
                        ? 'border-amber-400 bg-amber-500/15 text-white font-bold shadow-sm'
                        : 'border-stone-700/80 bg-stone-900/50 hover:bg-stone-700/50 text-stone-300'
                    }`}
                  >
                    <span className="block text-xs font-bold">{fin.name}</span>
                    <span className="block text-[10px] text-amber-400 font-mono mt-0.5">{fin.extra}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* STAGE 5: Quantity & Production Speed */}
            <div className="bg-stone-800/60 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-stone-700/80 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 font-mono text-xs font-black flex items-center justify-center">
                    5
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-white">
                      Manufacturing Batch Quantity
                    </h3>
                    <p className="text-[11px] text-stone-400">
                      Tier volume pricing scales down significantly at higher counts
                    </p>
                  </div>
                </div>
                {savingsPct > 0 && (
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    -{savingsPct}% Bulk Discount
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                {QUANTITY_TIERS.map((qty) => (
                  <button
                    key={qty}
                    type="button"
                    onClick={() => setQuantity(qty)}
                    className={`py-2.5 px-2 rounded-xl text-center border font-mono transition ${
                      quantity === qty
                        ? 'border-amber-400 bg-amber-500 text-stone-950 font-black shadow-md'
                        : 'border-stone-700 bg-stone-900/80 text-stone-300 hover:bg-stone-700'
                    }`}
                  >
                    <span className="block text-xs font-bold">{qty.toLocaleString()}</span>
                    <span className="block text-[9px] opacity-75">pcs</span>
                  </button>
                ))}
              </div>

              {/* Turnaround Speed */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs font-semibold text-stone-400">Production Speed:</span>
                <button
                  type="button"
                  onClick={() => setTurnaround('standard')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                    turnaround === 'standard'
                      ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                      : 'border-stone-700 bg-stone-900 text-stone-400'
                  }`}
                >
                  Standard (6-8 Business Days)
                </button>
                <button
                  type="button"
                  onClick={() => setTurnaround('rush')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                    turnaround === 'rush'
                      ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                      : 'border-stone-700 bg-stone-900 text-stone-400'
                  }`}
                >
                  ⚡ Rush Dispatch (3-5 Days)
                </button>
              </div>
            </div>

            {/* STAGE 6: Artwork Upload & Business Details */}
            <div className="bg-stone-800/60 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-stone-700/80 shadow-md space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 font-mono text-xs font-black flex items-center justify-center">
                  6
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white">
                    Artwork Upload & Contact Dispatch
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    Where should our engineering team email your official quote & CAD dieline proof?
                  </p>
                </div>
              </div>

              {/* Drag & Drop File Upload */}
              <label className="border-2 border-dashed border-stone-700 hover:border-amber-400 rounded-2xl p-4 text-center cursor-pointer transition block bg-stone-900/60">
                <Upload className="w-6 h-6 text-amber-400 mx-auto mb-1" />
                <span className="text-xs font-bold text-white block">
                  {artworkFile ? `✓ ${artworkFile.name} (${artworkFile.size}) Attached` : 'Click to Upload Packaging Logo or Dieline Artwork'}
                </span>
                <span className="text-[10px] text-stone-400 block mt-0.5">
                  Accepts PDF, AI, PSD, PNG, SVG (Up to 25MB) • Confidential NDA Protected
                </span>
                <input
                  type="file"
                  accept="image/*,.pdf,.ai,.psd,.svg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Asim Ameer"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-stone-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-stone-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 0000000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-stone-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Executive Goods Ltd"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-stone-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Special Dieline Notes / Packaging Requirements
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter special features such as custom die-cut windows, interior compartments, embossing locations..."
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-stone-500 resize-none"
                  ></textarea>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT 4-5 COLUMNS: Sticky Live Requisition Matrix & CTA */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-20 space-y-6">
            
            {/* Live Estimation Terminal */}
            <div className="bg-stone-800/90 rounded-3xl p-6 sm:p-7 border border-stone-700 shadow-2xl space-y-5">
              
              <div className="pb-3 border-b border-stone-700/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                    B2B SPECIFICATION MATRIX
                  </span>
                  <h4 className="text-sm font-extrabold text-white">
                    Live Factory Cost Estimate
                  </h4>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
              </div>

              {/* Active Box Pill */}
              <div className="p-3 rounded-2xl bg-stone-900/90 border border-stone-700 space-y-1">
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Target Box Model:</span>
                <span className="text-xs font-bold text-white block truncate">{initialProduct}</span>
                <span className="text-[11px] font-mono text-amber-400 block">
                  {length} × {width} × {depth} {unit} • {selectedThickness}
                </span>
              </div>

              {/* Price Calculation Numbers */}
              <div className="space-y-2.5 text-xs py-2 border-b border-stone-700/80 font-medium">
                <div className="flex justify-between text-stone-300">
                  <span>Estimated Unit Rate</span>
                  <span className="font-mono text-white font-bold text-sm">${estUnitPrice.toFixed(2)} / pc</span>
                </div>

                <div className="flex justify-between text-stone-300">
                  <span>Batch Quantity</span>
                  <span className="font-mono text-white font-bold">{quantity.toLocaleString()} pcs</span>
                </div>

                {volumeSavings > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Bulk Tier Savings</span>
                    <span className="font-mono">-${Math.round(volumeSavings).toLocaleString()} (-{savingsPct}%)</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-300">
                  <span>Digital CAD Proof</span>
                  <span className="text-emerald-400 font-bold">FREE ($75 value)</span>
                </div>

                <div className="flex justify-between text-stone-300">
                  <span>Turnaround Lead Time</span>
                  <span className="text-stone-200 font-semibold">
                    {turnaround === 'rush' ? '3-5 Business Days' : '6-8 Business Days'}
                  </span>
                </div>
              </div>

              {/* Grand Total Value */}
              <div>
                <span className="text-[11px] font-extrabold text-stone-400 uppercase tracking-wider block">
                  Estimated Batch Total:
                </span>
                <div className="flex items-baseline justify-between mt-0.5">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-amber-400">
                    ${Math.round(estSubtotal).toLocaleString()}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">USD • Taxes Included</span>
                </div>
              </div>

              {errorText && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold">
                  ⚠️ {errorText}
                </div>
              )}

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:bg-stone-700 text-stone-950 font-black text-xs uppercase tracking-wider transition shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>Computing Factory Requisition...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Quote Requisition</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {/* Trust Certifications */}
              <div className="space-y-1.5 pt-1 text-[11px] text-stone-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Free 1:1 CAD Dieline Proof before manufacturing</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>100% Price Match Guarantee on equal board specs</span>
                </div>
              </div>

            </div>

          </div>

        </form>
      )}

    </section>
  );
}
