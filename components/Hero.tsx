'use client';

import React from 'react';
import { ArrowDown, Sparkles, CheckCircle2, Shield, Factory, Truck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-[#faf8f5] via-[#f5efe4] to-[#ede5d8]">
      {/* Background Decorative Radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Slogan & Heritage Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-950 text-xs font-bold mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
          <span>From Impact to Intact • 42 Years of Excellence (Since 1984)</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-stone-900 tracking-tight leading-[1.08] max-w-5xl mx-auto mb-6">
          Custom Packaging That <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 bg-clip-text text-transparent">
            Elevates Unboxing
          </span> & Scales With You.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-stone-600 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
          From eco-kraft mailers and food-grade gable boxes to heavy-duty shipping cartons, bottle cylinders, wooden crates, and ThermoCool cold-chain insulation. Factory-direct with instant custom mockups.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <a
            href="#unboxing-section"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-stone-900 text-white font-bold text-sm hover:bg-amber-900 transition shadow-lg shadow-stone-900/20 group"
          >
            <span>Scroll Down to Unbox</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
          <a
            href="#categories-section"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-stone-900 border border-stone-300 font-bold text-sm hover:bg-stone-50 transition shadow-sm"
          >
            <span>Explore 6 Categories</span>
          </a>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-stone-300/60">
          <div className="flex items-center justify-center gap-2.5 text-xs font-bold text-stone-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>No Minimum Order (No MOQ)</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-xs font-bold text-stone-700">
            <Factory className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Factory-Direct Pricing</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-xs font-bold text-stone-700">
            <Truck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Fast 5-Day Production</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-xs font-bold text-stone-700">
            <Shield className="w-4 h-4 text-purple-600 shrink-0" />
            <span>100% Quality Guaranteed</span>
          </div>
        </div>

      </div>
    </section>
  );
}
