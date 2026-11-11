'use client';

import React, { useState, useEffect } from 'react';
import { Home, Package, Calculator, Palette, ShoppingBag, Phone } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('home');

  // Track active section when scrolling
  useEffect(() => {
    if (pathname !== '/') return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const categoriesEl = document.getElementById('categories-section');
      const quoteEl = document.getElementById('quote-section');
      const customizerEl = document.getElementById('customizer-section');

      if (customizerEl && scrollPos >= customizerEl.offsetTop) {
        setActiveTab('studio');
      } else if (quoteEl && scrollPos >= quoteEl.offsetTop) {
        setActiveTab('calc');
      } else if (categoriesEl && scrollPos >= categoriesEl.offsetTop) {
        setActiveTab('boxes');
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const isOrder = pathname === '/order';

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-stone-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[max(env(safe-area-inset-bottom),8px)] pt-1.5 px-2"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        
        {/* 1. Home */}
        <Link
          href="/"
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-2xl transition-all duration-200 ${
            activeTab === 'home' && !isOrder
              ? 'text-amber-800 scale-105 font-bold'
              : 'text-stone-500 hover:text-stone-900 font-medium'
          }`}
        >
          <div className={`p-1 rounded-xl transition ${activeTab === 'home' && !isOrder ? 'bg-amber-100/80 text-amber-900' : ''}`}>
            <Home className="w-4 h-4" />
          </div>
          <span className="text-[10px] tracking-tight">Home</span>
        </Link>

        {/* 2. Boxes Catalog */}
        <a
          href="/#categories-section"
          onClick={() => setActiveTab('boxes')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-2xl transition-all duration-200 ${
            activeTab === 'boxes' && !isOrder
              ? 'text-amber-800 scale-105 font-bold'
              : 'text-stone-500 hover:text-stone-900 font-medium'
          }`}
        >
          <div className={`p-1 rounded-xl transition ${activeTab === 'boxes' && !isOrder ? 'bg-amber-100/80 text-amber-900' : ''}`}>
            <Package className="w-4 h-4" />
          </div>
          <span className="text-[10px] tracking-tight">Boxes</span>
        </a>

        {/* 3. Calculator */}
        <a
          href="/#quote-section"
          onClick={() => setActiveTab('calc')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-2xl transition-all duration-200 ${
            activeTab === 'calc' && !isOrder
              ? 'text-amber-800 scale-105 font-bold'
              : 'text-stone-500 hover:text-stone-900 font-medium'
          }`}
        >
          <div className={`p-1 rounded-xl transition ${activeTab === 'calc' && !isOrder ? 'bg-amber-100/80 text-amber-900' : ''}`}>
            <Calculator className="w-4 h-4" />
          </div>
          <span className="text-[10px] tracking-tight">Estimate</span>
        </a>

        {/* 4. Studio */}
        <a
          href="/#customizer-section"
          onClick={() => setActiveTab('studio')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-2xl transition-all duration-200 ${
            activeTab === 'studio' && !isOrder
              ? 'text-amber-800 scale-105 font-bold'
              : 'text-stone-500 hover:text-stone-900 font-medium'
          }`}
        >
          <div className={`p-1 rounded-xl transition ${activeTab === 'studio' && !isOrder ? 'bg-amber-100/80 text-amber-900' : ''}`}>
            <Palette className="w-4 h-4" />
          </div>
          <span className="text-[10px] tracking-tight">Studio</span>
        </a>

        {/* 5. Sample Kit Order */}
        <Link
          href="/order"
          onClick={() => setActiveTab('order')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-2xl transition-all duration-200 ${
            isOrder
              ? 'text-amber-800 scale-105 font-bold'
              : 'text-stone-500 hover:text-stone-900 font-medium'
          }`}
        >
          <div className={`relative p-1 rounded-xl transition ${isOrder ? 'bg-amber-100/80 text-amber-900' : ''}`}>
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
          </div>
          <span className="text-[10px] tracking-tight">Order</span>
        </Link>

      </div>
    </nav>
  );
}
