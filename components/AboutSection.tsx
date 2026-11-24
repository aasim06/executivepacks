'use client';

import React, { useEffect, useRef } from 'react';
import {
  Award,
  Users,
  Package,
  Clock,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const STATS = [
  { value: '42+', label: 'Years of Heritage', icon: Award },
  { value: '5,000+', label: 'Brands Served', icon: Users },
  { value: '55+', label: 'Packaging Types', icon: Package },
  { value: '5 Days', label: 'Express Delivery', icon: Clock },
];

const TIMELINE = [
  { year: '1984', title: 'Founded as R.A Publishers', desc: 'Started as a printing & stationery house with deep roots in Karachi\'s industrial sector.' },
  { year: '1998', title: 'Corrugated Division Launched', desc: 'Expanded into full corrugated box manufacturing, serving food & retail clients across Pakistan.' },
  { year: '2010', title: 'Digital Printing & Custom Branding', desc: 'Invested in CMYK + spot UV digital printing presses — enabling small runs with high-resolution brand artwork.' },
  { year: '2019', title: 'Rigid & Luxury Packaging Line', desc: 'Added 1200 GSM greyboard rigid box production: magnetic flip, sleeve, and two-piece setup boxes for premium brands.' },
  { year: '2024', title: 'Executive Packs Brand Launch', desc: 'Rebranded as Executive Packs to serve e-commerce, cosmetics, and retail packaging with factory-direct B2B pricing.' },
];

export default function AboutSection() {
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
        el.style.transform = 'translateY(32px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full bg-[#faf8f5] py-20 sm:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div
          ref={(el) => { cardRefs.current[0] = el; }}
          className="text-center mb-14 sm:mb-18"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300/70 text-amber-900 text-[11px] font-black uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
            Our Story
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
            42 Years of Packaging{' '}
            <span className="relative inline-block text-amber-700">
              Excellence
              <svg className="absolute -bottom-1.5 left-0 w-full h-2.5 text-amber-500/60 pointer-events-none" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                <path d="M2 9C50 3 150 2 198 8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="text-sm sm:text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Founded in 1984 under R.A Publishers, we have grown into one of Pakistan's most trusted bespoke packaging manufacturers — serving everything from street-level food chains to global cosmetic brands.
          </p>
        </div>

        {/* ── Stats Row ── */}
        <div
          ref={(el) => { cardRefs.current[1] = el; }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <s.icon className="w-6 h-6 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-3xl sm:text-4xl font-black text-stone-900 leading-none mb-1">{s.value}</span>
              <span className="text-[11px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Two Column: Story + Timeline ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 sm:mb-20 items-start">

          {/* Left: Brand Story */}
          <div ref={(el) => { cardRefs.current[2] = el; }}>
            <div className="sticky top-24">
              <span className="text-xs font-black text-amber-700 uppercase tracking-widest font-mono mb-3 block">Who We Are</span>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight mb-4">
                Born in Karachi.<br />Built for Pakistan's Brands.
              </h3>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-4 font-medium">
                Executive Packs started as a family printing press and grew into a full-scale packaging manufacturer through decades of craft, investment, and customer trust. Today we operate state-of-the-art corrugated, rigid, and folding carton production lines under one roof.
              </p>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-6 font-medium">
                Whether you need 25 luxury rigid gift boxes for a skincare launch or 50,000 printed mailers for a nationwide e-commerce rollout — we scale with you, without compromising on print quality or structural integrity.
              </p>

              <ul className="space-y-2 mb-7">
                {[
                  'No Minimum Order Quantity (MOQ from 25 pcs)',
                  'Free design assistance & dieline templates',
                  'GSM-certified materials with test reports',
                  'Dedicated account manager per client',
                ].map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-sm text-stone-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#quote-section"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-stone-900 hover:bg-amber-800 text-white font-bold text-sm transition-colors shadow-md group"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right: Timeline */}
          <div ref={(el) => { cardRefs.current[3] = el; }}>
            <span className="text-xs font-black text-amber-700 uppercase tracking-widest font-mono mb-3 block">Our Journey</span>
            <div className="relative pl-6 border-l-2 border-amber-200 space-y-7">
              {TIMELINE.map((t, i) => (
                <div key={t.year} className="relative">
                  <span className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-amber-500 border-2 border-white shadow-sm" />
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-amber-700 font-mono bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">{t.year}</span>
                    <h4 className="font-black text-sm text-stone-900">{t.title}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-medium">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
