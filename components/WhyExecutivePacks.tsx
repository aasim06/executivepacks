'use client';

import React, { useEffect, useRef } from 'react';
import { Factory, ShieldCheck, Leaf, Truck, ArrowRight, Sparkles } from 'lucide-react';

const PILLARS = [
  {
    icon: Factory,
    title: 'Factory-Direct Manufacturing',
    desc: 'No middlemen, no markups. We manufacture in-house from raw corrugated sheets to finished printed boxes — giving you factory pricing with studio-grade quality.',
    color: 'text-amber-600',
    iconBg: 'bg-amber-100',
    badge: 'Direct Pricing',
    border: 'border-stone-200/80 hover:border-amber-400',
  },
  {
    icon: ShieldCheck,
    title: '100% Quality Guaranteed',
    desc: 'Every order goes through strict GSM grammage checks, colour delta-E print verification, and crush-resistance testing before it leaves our floor.',
    color: 'text-blue-600',
    iconBg: 'bg-blue-100',
    badge: 'Lab Tested',
    border: 'border-stone-200/80 hover:border-blue-400',
  },
  {
    icon: Leaf,
    title: 'Sustainable by Design',
    desc: 'FSC-certified boards, water-based inks, and 100% recyclable packaging options — because premium packaging should not cost the planet.',
    color: 'text-emerald-600',
    iconBg: 'bg-emerald-100',
    badge: 'Eco-Friendly',
    border: 'border-stone-200/80 hover:border-emerald-400',
  },
  {
    icon: Truck,
    title: 'Nationwide Same-Week Delivery',
    desc: 'Karachi, Lahore, Islamabad, Peshawar — we ship across Pakistan with real-time tracking. Express 4–5 day turnaround available on all box types.',
    color: 'text-purple-600',
    iconBg: 'bg-purple-100',
    badge: 'Express 4-5 Days',
    border: 'border-stone-200/80 hover:border-purple-400',
  },
];

export default function WhyExecutivePacks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.12 }
    );

    cardRefs.current.forEach((el) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="why-executive-packs" 
      ref={sectionRef} 
      className="py-16 sm:py-24 bg-gradient-to-b from-[#f5efe4] to-[#faf8f5] border-t border-stone-300/60 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div 
          ref={(el) => { cardRefs.current[0] = el; }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-950 text-[11px] font-black uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Why Executive Packs</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-3">
            The 4 Pillars We Stand On
          </h2>

          <p className="text-xs sm:text-base text-stone-600 max-w-2xl mx-auto font-medium leading-relaxed">
            From single bespoke batches to 100,000+ industrial runs — here is what sets Executive Packs apart in Pakistani packaging manufacturing.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {PILLARS.map((p, idx) => (
            <div
              key={p.title}
              ref={(el) => { cardRefs.current[idx + 1] = el; }}
              className={`p-6 sm:p-7 rounded-2xl bg-white border ${p.border} shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group`}
            >
              <div>
                {/* Top Icon & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl ${p.iconBg} flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}>
                    <p.icon className={`w-6 h-6 ${p.color}`} />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200">
                    {p.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-black text-stone-900 mb-2 leading-snug group-hover:text-amber-800 transition-colors">
                  {p.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                  {p.desc}
                </p>
              </div>

              {/* Bottom Subtle Bar */}
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold text-stone-400 group-hover:text-amber-700 transition-colors">
                <span>Core Guarantee</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
