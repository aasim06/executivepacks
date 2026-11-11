'use client';

import React from 'react';
import { ArrowDown, Sparkles, CheckCircle2, Shield, Factory, Truck } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative pt-6 pb-4 sm:pt-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-[#faf8f5] via-[#f5efe4] to-[#ede5d8]">
      {/* Background Decorative Radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Slogan & Heritage Pill */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-950 text-[11px] sm:text-xs font-bold mb-4 sm:mb-6 shadow-xs max-w-[92vw] truncate">
          <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse shrink-0"></span>
          <span className="truncate">From Impact to Intact • 42 Yrs Heritage (Est. 1984)</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-stone-900 tracking-tight leading-[1.12] sm:leading-[1.08] max-w-5xl mx-auto mb-4 sm:mb-6">
          Custom Packaging That <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 bg-clip-text text-transparent">
            Elevates Unboxing
          </span> & Scales With You.
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg md:text-xl text-stone-600 max-w-3xl mx-auto mb-6 sm:mb-10 leading-relaxed font-medium px-2">
          From food-grade cartons and custom mailers to rigid gift boxes, luxury cosmetic packaging, and high-strength shipping boxes. Factory-direct wholesale pricing across Pakistan.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-14 max-w-md sm:max-w-none mx-auto">
          <a
            href="#categories-section"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl sm:rounded-full bg-stone-900 text-white font-bold text-sm hover:bg-amber-900 transition shadow-lg shadow-stone-900/15 active:scale-98"
          >
            <span>Explore 55+ Custom Boxes</span>
            <ArrowDown className="w-4 h-4" />
          </a>
          <a
            href="#quote-section"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl sm:rounded-full bg-white text-stone-900 border border-stone-300 font-bold text-sm hover:bg-stone-50 transition shadow-xs active:scale-98"
          >
            <span>Instant Price Calculator</span>
          </a>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-4xl mx-auto pt-6 sm:pt-8 border-t border-stone-300/60">
          <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-white/60 sm:bg-transparent border sm:border-0 border-stone-200/80 text-[11px] sm:text-xs font-bold text-stone-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>No Minimum (No MOQ)</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-white/60 sm:bg-transparent border sm:border-0 border-stone-200/80 text-[11px] sm:text-xs font-bold text-stone-700">
            <Factory className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Factory Direct</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-white/60 sm:bg-transparent border sm:border-0 border-stone-200/80 text-[11px] sm:text-xs font-bold text-stone-700">
            <Truck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Fast 5-Day Delivery</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-white/60 sm:bg-transparent border sm:border-0 border-stone-200/80 text-[11px] sm:text-xs font-bold text-stone-700">
            <Shield className="w-4 h-4 text-purple-600 shrink-0" />
            <span>100% Quality Guaranteed</span>
          </div>
        </div>

      </div>
    </section>
  );
}
