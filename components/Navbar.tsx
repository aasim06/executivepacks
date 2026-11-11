'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Layers, ShieldCheck, Menu, X, ArrowUpRight, Phone } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-300 text-[11px] py-1.5 px-4 text-center font-semibold border-b border-stone-800 tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>From Impact to Intact • 42 Years of Excellence (Est. 1984) • No Minimum Order Limit • Pakistan Nationwide</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-stone-400 font-medium">
            <span>FSC® Certified</span>
            <span>•</span>
            <span>ISO 9001:2015</span>
            <span>•</span>
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Free Dieline Mockup
            </span>
          </div>
        </div>
      </div>

      {/* Main Sleek Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#faf8f5]/85 backdrop-blur-xl border-b border-stone-200/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo - Pure Typography, No 3D / Icon Box */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group hover:opacity-90 transition" title="Executive Packs Home">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-stone-900 uppercase whitespace-nowrap">
              EXECUTIVE <span className="text-amber-800">PACKS</span>
            </span>
            <span className="hidden sm:inline-block text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-100/90 text-amber-900 border border-amber-200 uppercase">
              B2B
            </span>
          </Link>

          {/* Desktop Nav Links - Guaranteed Single Line (whitespace-nowrap) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] font-bold text-stone-700">
            <a 
              href="/about" 
              className="px-3 py-1.5 rounded-lg hover:text-amber-800 hover:bg-stone-100/80 transition whitespace-nowrap"
            >
              About Us
            </a>

            <a 
              href="#unboxing-section" 
              className="px-3 py-1.5 rounded-lg hover:text-amber-800 hover:bg-stone-100/80 transition flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Scroll Unboxing</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </a>
            
            <a 
              href="#categories-section" 
              className="px-3 py-1.5 rounded-lg hover:text-amber-800 hover:bg-stone-100/80 transition whitespace-nowrap"
            >
              6 Categories
            </a>

            <a 
              href="#customizer-section" 
              className="px-3 py-1.5 rounded-lg hover:text-amber-800 hover:bg-stone-100/80 transition whitespace-nowrap"
            >
              Mockup Studio
            </a>

            <a 
              href="#quote-section" 
              className="px-3 py-1.5 rounded-lg hover:text-amber-800 hover:bg-stone-100/80 transition whitespace-nowrap"
            >
              Wholesale Pricing
            </a>

            <a 
              href="/contact" 
              className="px-3 py-1.5 rounded-lg hover:text-amber-800 hover:bg-stone-100/80 transition whitespace-nowrap text-amber-900 font-extrabold"
            >
              Contact & Map
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="tel:+18005723872"
              className="hidden xl:inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 px-2.5 py-1.5 transition"
            >
              <Phone className="w-3.5 h-3.5 text-amber-700" />
              <span>Sales: (800) 572-3872</span>
            </a>

            <a
              href="/order"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-stone-900 text-white font-bold text-xs hover:bg-amber-800 transition shadow-sm whitespace-nowrap"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Order Sample Kit ($15)</span>
            </a>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#faf8f5] border-b border-stone-200 px-4 pt-3 pb-5 space-y-2 text-sm font-bold shadow-lg animate-fade-in">
            <a
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-stone-800 hover:bg-amber-50 hover:text-amber-900 transition"
            >
              About Us (42 Years of Excellence)
            </a>
            <a
              href="#unboxing-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-stone-800 hover:bg-amber-50 hover:text-amber-900 transition"
            >
              Scroll Unboxing Live
            </a>
            <a
              href="#categories-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-stone-800 hover:bg-amber-50 hover:text-amber-900 transition"
            >
              6 Product Categories
            </a>
            <a
              href="#customizer-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-stone-800 hover:bg-amber-50 hover:text-amber-900 transition"
            >
              Mockup Studio
            </a>
            <a
              href="#quote-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-stone-800 hover:bg-amber-50 hover:text-amber-900 transition"
            >
              Wholesale Pricing Calculator
            </a>
            <a
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-amber-900 bg-amber-50 hover:bg-amber-100 font-bold transition"
            >
              Contact & Google Map Location
            </a>
            <div className="pt-2 border-t border-stone-200">
              <a
                href="/order"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-full bg-stone-900 text-white text-xs font-bold text-center block shadow-sm"
              >
                Order Physical Sample Kit ($15)
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
