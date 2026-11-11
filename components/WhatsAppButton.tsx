'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function WhatsAppButton() {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Don't render customer floating button inside internal Admin Console
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  
  // WhatsApp Number & Pre-filled Message
  const whatsappNumber = '923001234567'; // Can be edited to client's exact number
  const message = encodeURIComponent('Hello Executive Packs! I would like to inquire about custom packaging boxes & wholesale quotation.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 group">
      
      {/* Tooltip / Speech Bubble on Hover/Touch */}
      <div 
        className={`hidden sm:flex flex-col items-start bg-white text-stone-900 rounded-2xl p-3.5 shadow-2xl border border-stone-200 transition-all duration-300 transform origin-bottom-right ${
          showTooltip ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{ minWidth: '220px' }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">Online Now</span>
        </div>
        <p className="text-xs font-bold text-stone-900 leading-snug">
          Need an instant packaging quote?
        </p>
        <p className="text-[11px] text-stone-500 mt-0.5">
          Chat directly with our packaging team on WhatsApp.
        </p>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        {/* Pulsing Green Rings */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none"></span>

        {/* WhatsApp Official SVG Logo */}
        <svg 
          viewBox="0 0 24 24" 
          className="w-7 h-7 fill-white relative z-10 transition-transform group-hover:rotate-6"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>

        {/* Small Active Badge Dot */}
        <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow-sm flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-white"></span>
        </span>
      </a>

    </div>
  );
}
