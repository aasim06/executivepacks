'use client';

import React, { useState } from 'react';
import { Calculator, Sparkles, Download, CheckCircle, ArrowRight, ShieldCheck, Ruler } from 'lucide-react';

const CATEGORY_BASE_RATES: Record<string, { name: string; baseRate: number; baseWeight: number }> = {
  'home-kitchen': { name: 'Home & Kitchen Gable Box', baseRate: 0.45, baseWeight: 450 },
  'ecommerce': { name: 'E-Commerce Corrugated Mailer', baseRate: 0.65, baseWeight: 500 },
  'cartons': { name: 'Heavy-Duty 5-Ply Shipping Carton', baseRate: 1.20, baseWeight: 850 },
  'jars-bottles': { name: 'Rigid Cylinder Tube with Foam', baseRate: 1.35, baseWeight: 1200 },
  'wooden': { name: 'Artisan Solid Pine Crate', baseRate: 4.80, baseWeight: 3200 },
  'thermocool': { name: 'ThermoCool EPS Thermal Box', baseRate: 2.70, baseWeight: 1400 },
};

export default function LivePriceCalculator() {
  const [selectedCat, setSelectedCat] = useState<string>('ecommerce');
  const [length, setLength] = useState<number>(280);
  const [width, setWidth] = useState<number>(190);
  const [height, setHeight] = useState<number>(90);
  const [quantity, setQuantity] = useState<number>(1000);
  const [printFinish, setPrintFinish] = useState<'plain' | '1color' | 'fullcmyk' | 'goldfoil'>('fullcmyk');

  // Pricing Algorithm
  const catData = CATEGORY_BASE_RATES[selectedCat] || CATEGORY_BASE_RATES['ecommerce'];
  
  // Dimensional surface area multiplier relative to base standard (250x150x100)
  const baseArea = 250 * 150 + 2 * (250 * 100 + 150 * 100);
  const currentArea = length * width + 2 * (length * height + width * height);
  const areaFactor = Math.max(0.65, Math.min(2.8, currentArea / baseArea));

  // Volume discount curve
  let discount = 0;
  if (quantity >= 500) discount = 0.22;
  if (quantity >= 1000) discount = 0.36;
  if (quantity >= 2500) discount = 0.48;
  if (quantity >= 5000) discount = 0.58;
  if (quantity >= 10000) discount = 0.66;

  // Print finish markup
  const finishMultiplier = {
    plain: 0.85,
    '1color': 1.0,
    fullcmyk: 1.22,
    goldfoil: 1.55,
  }[printFinish];

  const rawUnitPrice = catData.baseRate * areaFactor * finishMultiplier;
  const unitPrice = Math.max(0.28, rawUnitPrice * (1 - discount));
  const totalPrice = unitPrice * quantity;
  const regularTotal = rawUnitPrice * quantity;
  const totalSavings = regularTotal - totalPrice;

  return (
    <section id="quote-section" className="py-10 sm:py-24 bg-[#f5efe4] border-t border-stone-300/80 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-900 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 shadow-xs">
            <Calculator className="w-3.5 h-3.5 text-amber-700" /> B2B Instant Estimator
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight">
            Live Dimensional & Volume Pricing
          </h2>
          <p className="text-xs sm:text-base text-stone-600 mt-2 sm:mt-3 font-medium px-2">
            Select a category, drag dimensions, and watch wholesale factory unit prices update live with bulk tier discounts.
          </p>
        </div>

        {/* Main Interactive Calculator Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Sliders & Controls (7 cols) */}
          <div className="p-4 sm:p-8 lg:p-10 lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-200">
            <div>
              
              {/* 1. Category Switcher */}
              <div className="mb-6 sm:mb-8">
                <label className="text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                  1. Select Packaging Category:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
                  {Object.entries(CATEGORY_BASE_RATES).map(([key, item]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCat(key)}
                      className={`px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl text-xs font-bold text-left transition border active:scale-95 ${
                        selectedCat === key
                          ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      <span className="block truncate">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Custom Dimensions Sliders */}
              <div className="mb-6 sm:mb-8 p-3.5 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/90">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] sm:text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-amber-700" /> Dimensions (L × W × H):
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs font-extrabold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                    {length}×{width}×{height} mm
                  </span>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {/* Length */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-stone-600 mb-1">
                      <span>Length: {length} mm</span>
                      <span className="text-stone-400">100 - 800 mm</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="800"
                      step="10"
                      value={length}
                      onChange={(e) => setLength(Number(e.target.value))}
                      className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-700"
                    />
                  </div>

                  {/* Width */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-stone-600 mb-1">
                      <span>Width: {width} mm</span>
                      <span className="text-stone-400">80 - 600 mm</span>
                    </div>
                    <input
                      type="range"
                      min="80"
                      max="600"
                      step="10"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-700"
                    />
                  </div>

                  {/* Height */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-stone-600 mb-1">
                      <span>Height: {height} mm</span>
                      <span className="text-stone-400">50 - 500 mm</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="500"
                      step="5"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-700"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Quantity Slider */}
              <div className="mb-6 sm:mb-8">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider">
                    3. Order Quantity:
                  </label>
                  <span className="font-mono text-xs sm:text-sm font-extrabold text-stone-900 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
                    {quantity.toLocaleString()} pcs
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                />
                <div className="flex justify-between text-[10px] sm:text-[11px] font-semibold text-stone-500 mt-1">
                  <span>100 (Sample)</span>
                  <span>1,000 (-36%)</span>
                  <span>5,000 (-58%)</span>
                  <span>10,000+ (-66%)</span>
                </div>
              </div>

              {/* 4. Print Finish Selector */}
              <div>
                <label className="text-[11px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                  4. Branding & Surface Finish:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                  {[
                    { id: 'plain', label: 'Plain Kraft', desc: 'No Print' },
                    { id: '1color', label: '1-Color Stamp', desc: 'Eco Ink' },
                    { id: 'fullcmyk', label: 'Full CMYK', desc: 'Photographic' },
                    { id: 'goldfoil', label: 'Gold Hot Foil', desc: 'Luxury Finish' },
                  ].map((fin) => (
                    <button
                      key={fin.id}
                      onClick={() => setPrintFinish(fin.id as any)}
                      className={`p-2.5 sm:p-3 rounded-xl text-left border transition active:scale-95 ${
                        printFinish === fin.id
                          ? 'border-amber-700 bg-amber-50/60 shadow-xs'
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                      }`}
                    >
                      <span className="block text-xs font-bold text-stone-900">{fin.label}</span>
                      <span className="block text-[9px] sm:text-[10px] text-stone-500 font-medium">{fin.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Live Instant Quote Summary (5 cols) */}
          <div className="p-5 sm:p-8 lg:p-10 lg:col-span-5 bg-gradient-to-b from-stone-900 to-stone-950 text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Direct Factory Quotation
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                  Live Rate
                </span>
              </div>

              {/* Highlight Unit Price */}
              <div className="my-8">
                <span className="text-xs font-semibold text-stone-400 block mb-1">Estimated Unit Price:</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-4xl sm:text-5xl font-black text-white">
                    ${unitPrice.toFixed(2)}
                  </span>
                  <span className="text-sm font-bold text-stone-400">/ box</span>
                </div>
                {discount > 0 && (
                  <span className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/80">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tier Discount Applied: {(discount * 100).toFixed(0)}% OFF</span>
                  </span>
                )}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-3 py-5 border-y border-stone-800 text-xs font-medium">
                <div className="flex justify-between text-stone-300">
                  <span>Selected Model</span>
                  <span className="font-bold text-white text-right truncate max-w-[180px]">{catData.name}</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Custom Dimensions</span>
                  <span className="font-mono font-bold text-white">{length} × {width} × {height} mm</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Total Quantity</span>
                  <span className="font-mono font-bold text-white">{quantity.toLocaleString()} pcs</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Wholesale Bulk Savings</span>
                    <span className="font-mono font-bold">-${totalSavings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-stone-800/60">
                  <span>Estimated Total Order</span>
                  <span className="font-mono text-amber-400 text-base">${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="mt-5 space-y-1.5 text-[11px] text-stone-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Free digital dieline proof before mass production</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Standard 5–8 business days dispatch time</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-8 space-y-3">
              <a
                href="/order"
                className="w-full py-4 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs uppercase tracking-wider text-center transition flex items-center justify-center gap-2 shadow-lg shadow-amber-600/30"
              >
                <span>Lock In Rate & Proceed to Order</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#sample-kit"
                className="w-full py-3 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs text-center transition border border-stone-700 block"
              >
                Order Pre-Production Physical Sample ($15)
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
