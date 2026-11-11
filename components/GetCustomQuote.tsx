'use client';

import React, { useState } from 'react';
import { 
  Send, 
  Upload, 
  CheckCircle2, 
  Sparkles, 
  X, 
  ShieldCheck, 
  Loader2 
} from 'lucide-react';

interface QuoteProps {
  defaultProductName?: string;
  className?: string;
}

export default function GetCustomQuote({ defaultProductName = 'Custom Packaging Box', className = '' }: QuoteProps) {
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [length, setLength] = useState('');
  const [depth, setDepth] = useState('');
  const [width, setWidth] = useState('');
  const [unit, setUnit] = useState('Inches');
  const [productName, setProductName] = useState(defaultProductName);
  const [material, setMaterial] = useState('Virgin Eco Kraft');
  const [thickness, setThickness] = useState('16pt / 350 GSM');
  const [colors, setColors] = useState('4 Color CMYK');
  const [turnaround, setTurnaround] = useState('Standard (6-8 Business Days)');
  const [quantity, setQuantity] = useState('500');
  const [message, setMessage] = useState('');
  const [artworkFile, setArtworkFile] = useState<{ name: string; size: string } | null>(null);

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('Artwork file size must be less than 5MB.');
        return;
      }
      setArtworkFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      });
      setErrorMessage('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim() || !phone.trim() || !quantity) {
      setErrorMessage('Please fill in all required fields (Name, Email, Phone, Quantity).');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Save quote in localStorage
      if (typeof window !== 'undefined') {
        try {
          const quotes = JSON.parse(localStorage.getItem('executive_b2b_quotes_v1') || '[]');
          const newQuote = {
            id: `QT-${Date.now()}`,
            name,
            email,
            phone,
            zipCode,
            dimensions: `${length || 'Custom'} × ${width || 'Custom'} × ${depth || 'Custom'} ${unit}`,
            productName: productName || defaultProductName,
            material,
            thickness,
            colors,
            turnaround,
            quantity: Number(quantity) || 500,
            message,
            artwork: artworkFile?.name || 'No file attached',
            date: new Date().toISOString(),
          };
          localStorage.setItem('executive_b2b_quotes_v1', JSON.stringify([newQuote, ...quotes]));
        } catch (err) {
          console.error('Failed to save quote inquiry:', err);
        }
      }

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div className={`bg-[#12233f] text-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-blue-950/60 overflow-hidden ${className}`}>
      
      {/* Header */}
      <div className="pb-3.5 mb-4 border-b border-blue-900/60 flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-white">
            Get Custom Quote
          </h3>
          <p className="text-[11px] text-blue-200/70 mt-0.5">
            Instant factory pricing & free 1:1 CAD dieline proof
          </p>
        </div>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
      </div>

      {isSuccess ? (
        <div className="py-8 text-center space-y-3 animate-fade-in">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-base font-bold text-white">Quote Request Received!</h4>
          <p className="text-xs text-blue-200/80 max-w-xs mx-auto leading-relaxed">
            Thank you, <strong className="text-white">{name}</strong>. Our packaging estimation team has received your specs for <strong className="text-amber-300">{productName}</strong> and will email you an official quote within 2 hours.
          </p>
          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setName('');
              setEmail('');
              setMessage('');
              setArtworkFile(null);
            }}
            className="mt-3 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition"
          >
            Submit Another Quote
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          
          {errorMessage && (
            <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-semibold">
              ⚠️ {errorMessage}
            </div>
          )}

          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200 block mb-1">
                Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full px-3 py-2 rounded-lg bg-white text-stone-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-stone-400"
              />
            </div>

            <div>
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200 block mb-1">
                Email <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3 py-2 rounded-lg bg-white text-stone-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-stone-400"
              />
            </div>
          </div>

          {/* Row 2: Phone & Zip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200 block mb-1">
                Phone Number <span className="text-rose-400">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3 py-2 rounded-lg bg-white text-stone-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-stone-400"
              />
            </div>

            <div>
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200 block mb-1">
                Zip / Postal Code <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Postal Code"
                className="w-full px-3 py-2 rounded-lg bg-white text-stone-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-stone-400"
              />
            </div>
          </div>

          {/* Row 3: Dimensions (Length x Depth x Width) */}
          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200 block mb-1">
              Box Dimensions (L × W × D) <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="Length"
                className="w-full px-2.5 py-2 rounded-lg bg-white text-stone-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-stone-400"
              />
              <input
                type="text"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="Width"
                className="w-full px-2.5 py-2 rounded-lg bg-white text-stone-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-stone-400"
              />
              <input
                type="text"
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                placeholder="Depth"
                className="w-full px-2.5 py-2 rounded-lg bg-white text-stone-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-stone-400"
              />
            </div>
          </div>

          {/* Row 4: Units & Product Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200 block mb-1">
                Units <span className="text-rose-400">*</span>
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white text-stone-900 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              >
                <option value="Inches">Inches</option>
                <option value="mm">Millimeters (mm)</option>
                <option value="cm">Centimeters (cm)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200 block mb-1">
                Product Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Product Name"
                className="w-full px-3 py-2 rounded-lg bg-white text-stone-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Row 5: Material & Thickness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200 block mb-1">
                Select Material
              </label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white text-stone-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              >
                <option value="Virgin Eco Kraft">Virgin Eco Kraft</option>
                <option value="SBS Bleached Paperboard">SBS Bleached Paperboard</option>
                <option value="Rigid Setup Greyboard">Rigid Setup Greyboard</option>
                <option value="Corrugated E-Flute">Corrugated E-Flute</option>
                <option value="Corrugated B-Flute (Heavy Duty)">Corrugated B-Flute (Heavy Duty)</option>
                <option value="Metallic Foilboard">Metallic Foilboard</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200 block mb-1">
                Card Thickness
              </label>
              <select
                value={thickness}
                onChange={(e) => setThickness(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white text-stone-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              >
                <option value="12pt / 280 GSM">12pt / 280 GSM</option>
                <option value="14pt / 300 GSM">14pt / 300 GSM</option>
                <option value="16pt / 350 GSM">16pt / 350 GSM (Standard)</option>
                <option value="18pt / 400 GSM">18pt / 400 GSM</option>
                <option value="24pt / 450 GSM">24pt / 450 GSM (Heavy)</option>
                <option value="1.5mm Luxury Rigid">1.5mm Luxury Rigid</option>
                <option value="2.0mm Heavyweight Rigid">2.0mm Heavyweight Rigid</option>
              </select>
            </div>
          </div>

          {/* Row 6: Color & Turnaround */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200 block mb-1">
                Color Options
              </label>
              <select
                value={colors}
                onChange={(e) => setColors(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white text-stone-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              >
                <option value="4 Color CMYK">Full Color CMYK (1-Sided)</option>
                <option value="CMYK Inside & Outside">CMYK Inside & Outside (2-Sided)</option>
                <option value="CMYK + Gold Foil">CMYK + Gold Foil Stamp</option>
                <option value="1 Color Black Ink">1 Color Eco Black Ink</option>
                <option value="No Printing (Plain)">Plain / Blank (No Printing)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200 block mb-1">
                Turn Around Time
              </label>
              <select
                value={turnaround}
                onChange={(e) => setTurnaround(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white text-stone-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              >
                <option value="Standard (6-8 Business Days)">Standard (6-8 Business Days)</option>
                <option value="Rush Production (3-5 Business Days)">Rush Production (3-5 Business Days)</option>
              </select>
            </div>
          </div>

          {/* Row 7: Artwork Upload */}
          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200 block mb-1">
              Upload Your Artwork (PNG, PDF, JPG, Max 5MB)
            </label>
            <div className="relative">
              <label className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/10 border border-white/20 hover:border-amber-400 cursor-pointer transition text-xs">
                <span className="text-blue-100 truncate text-[11px]">
                  {artworkFile ? `✓ ${artworkFile.name} (${artworkFile.size})` : 'Choose File / Drop artwork here'}
                </span>
                <Upload className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-2" />
                <input
                  type="file"
                  accept="image/*,.pdf,.ai,.psd"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Row 8: Quantity */}
          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200 block mb-1">
              Quantity (Minimum 250 pcs) <span className="text-rose-400">*</span>
            </label>
            <input
              type="number"
              min={250}
              step={50}
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 500"
              className="w-full px-3 py-2 rounded-lg bg-white text-stone-900 text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Row 9: Message */}
          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200 block mb-1">
              Message / Specific Requirements
            </label>
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter special die-cut shapes, inserts, or packaging notes..."
              className="w-full px-3 py-2 rounded-lg bg-white text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-stone-400 resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Calculating Factory Estimate...</span>
              </>
            ) : (
              <>
                <span>Submit Quote Request</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>

        </form>
      )}

      {/* Trust reassurance badge */}
      <div className="mt-3.5 pt-3 border-t border-blue-900/60 flex items-center justify-center gap-1.5 text-[10px] text-blue-200/70">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>100% Price Match Guarantee • Free Digital Proof</span>
      </div>

    </div>
  );
}
