'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Building2, MapPin } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Fatima Malik',
    role: 'Founder',
    company: 'Bloom Skincare',
    location: 'Karachi',
    avatar: 'FM',
    avatarBg: 'bg-pink-100 text-pink-700',
    stars: 5,
    badge: 'Cosmetic Packaging Client',
    quote:
      'Executive Packs transformed our brand identity. The magnetic flip boxes they made for our serums feel genuinely luxurious — customers actually comment on the unboxing experience. Turn-around was 5 days, which is incredible for custom print work.',
    tags: ['Magnetic Boxes', 'Spot UV Finish', '500 Units'],
  },
  {
    id: 2,
    name: 'Ahmed Raza',
    role: 'Operations Manager',
    company: 'FoodExpress PK',
    location: 'Lahore',
    avatar: 'AR',
    avatarBg: 'bg-amber-100 text-amber-800',
    stars: 5,
    badge: 'Food & Retail Client',
    quote:
      'We order over 20,000 burger and sandwich boxes monthly. Executive Packs consistently delivers on quality and schedule. The food-grade coating on their boxes is certified and the print never bleeds — something our last vendor could never guarantee.',
    tags: ['Food-Grade Boxes', 'Monthly Bulk Order', 'CMYK Print'],
  },
  {
    id: 3,
    name: 'Zara Khan',
    role: 'Co-Founder',
    company: 'Oud & Attar Studio',
    location: 'Islamabad',
    avatar: 'ZK',
    avatarBg: 'bg-purple-100 text-purple-700',
    stars: 5,
    badge: 'Luxury Gifting Client',
    quote:
      'We launched a limited Eid collection and needed 300 premium rigid gift boxes in 6 days. Most vendors said impossible. Executive Packs not only delivered on time but added gold foil stamping that looked better than our original design spec. Absolutely recommend.',
    tags: ['Rigid Gift Boxes', 'Gold Foil Stamp', 'Rush Order'],
  },
  {
    id: 4,
    name: 'Bilal Siddiqui',
    role: 'CEO',
    company: 'TechDrop PK',
    location: 'Karachi',
    avatar: 'BS',
    avatarBg: 'bg-blue-100 text-blue-700',
    stars: 5,
    badge: 'E-Commerce Mailers Client',
    quote:
      'As an online store with 1,500+ monthly orders, packaging integrity is everything. We switched to Executive Packs corrugated mailer boxes 8 months ago — zero damage reports since then. The B-flute construction is genuinely crush-proof.',
    tags: ['Mailer Boxes', 'B-Flute Corrugated', '1,500+ Orders/Month'],
  },
  {
    id: 5,
    name: 'Hina Tariq',
    role: 'Brand Manager',
    company: 'Casa Living',
    location: 'Lahore',
    avatar: 'HT',
    avatarBg: 'bg-emerald-100 text-emerald-700',
    stars: 5,
    badge: 'Home & Kitchen Client',
    quote:
      'Casa Living uses Executive Packs for all our candle and home décor packaging. The eco-kraft boxes with matte lamination give our brand a premium yet sustainable feel. Our retail partners in Dubai also love the finish quality.',
    tags: ['Kraft Eco Boxes', 'Matte Lamination', 'Export Quality'],
  },
  {
    id: 6,
    name: 'Usman Ghani',
    role: 'Procurement Head',
    company: 'PharmaChain Ltd.',
    location: 'Karachi',
    avatar: 'UG',
    avatarBg: 'bg-rose-100 text-rose-700',
    stars: 5,
    badge: 'Medical Packaging Client',
    quote:
      'Pharmaceutical packaging requires strict dimensional accuracy and tamper-evidence features. Executive Packs understood our compliance requirements from day one and delivered cartons with correct glue lines, die-cut precision, and batch-code printing. Very professional team.',
    tags: ['Pharma Cartons', 'Tamper-Evident', 'Batch Printing'],
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const goTo = (idx: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIdx(idx);
    setTimeout(() => setIsAnimating(false), 380);
  };

  const prev = () => goTo((activeIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => goTo((activeIdx + 1) % TESTIMONIALS.length);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const start = () => {
      autoTimerRef.current = setTimeout(() => {
        setActiveIdx((i) => (i + 1) % TESTIMONIALS.length);
        start();
      }, 5000);
    };
    start();
    return () => { if (autoTimerRef.current) clearTimeout(autoTimerRef.current); };
  }, [activeIdx]);

  // Scroll-reveal for header
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const active = TESTIMONIALS[activeIdx];

  return (
    <section
      id="testimonials-section"
      ref={sectionRef}
      className="w-full bg-stone-950 py-20 sm:py-28 overflow-hidden relative"
    >
      {/* Subtle radial amber glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,181,27,0.09)_0%,transparent_65%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-black uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Client Voices
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-3">
            Trusted by{' '}
            <span className="text-amber-400">5,000+</span> Brands
          </h2>
          <p className="text-sm sm:text-base text-stone-400 max-w-xl mx-auto leading-relaxed font-medium">
            From boutique skincare startups to nationwide food chains — here's what our clients say.
          </p>
        </div>

        {/* ── Aggregate Rating Bar ── */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900 border border-stone-800">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
            </div>
            <span className="text-white font-black text-sm">4.9</span>
            <span className="text-stone-500 text-xs font-medium">/ 5.0</span>
          </div>
          <div className="text-stone-400 text-xs font-medium">Based on 340+ verified orders</div>
        </div>

        {/* ── Main Featured Testimonial Card ── */}
        <div className="max-w-3xl mx-auto mb-10">
          <div
            className="relative bg-stone-900 border border-stone-800 rounded-3xl p-7 sm:p-10 shadow-2xl"
            style={{
              opacity: isAnimating ? 0.6 : 1,
              transform: isAnimating ? 'scale(0.98)' : 'scale(1)',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
            }}
          >
            {/* Quote Mark */}
            <Quote className="absolute top-7 right-8 w-10 h-10 text-amber-500/20 sm:w-14 sm:h-14" />

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[10px] font-black uppercase tracking-wider mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              {active.badge}
            </div>

            {/* Quote Text */}
            <blockquote className="text-sm sm:text-lg text-stone-100 leading-relaxed font-medium mb-7 relative z-10">
              "{active.quote}"
            </blockquote>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {active.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-400 border border-stone-700 font-mono font-semibold">
                  {tag}
                </span>
              ))}
            </div>

            {/* Author Info */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-black text-sm sm:text-base ${active.avatarBg} border border-white/10`}>
                  {active.avatar}
                </div>
                <div>
                  <div className="font-black text-white text-sm">{active.name}</div>
                  <div className="text-stone-400 text-xs font-medium flex items-center gap-1 flex-wrap">
                    <span>{active.role}</span>
                    <span className="text-stone-700">·</span>
                    <Building2 className="w-3 h-3" />
                    <span>{active.company}</span>
                    <span className="text-stone-700">·</span>
                    <MapPin className="w-3 h-3" />
                    <span>{active.location}</span>
                  </div>
                </div>
              </div>
              <StarRow count={active.stars} />
            </div>
          </div>
        </div>

        {/* ── Navigation Controls ── */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-900 border border-stone-700 text-stone-300 hover:bg-amber-500 hover:text-stone-900 hover:border-amber-500 flex items-center justify-center transition-colors shadow-md"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-1.5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIdx
                    ? 'w-6 h-2 bg-amber-400'
                    : 'w-2 h-2 bg-stone-700 hover:bg-stone-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-900 border border-stone-700 text-stone-300 hover:bg-amber-500 hover:text-stone-900 hover:border-amber-500 flex items-center justify-center transition-colors shadow-md"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* ── Thumbnail Scroll Grid (All 6 Reviews at a Glance) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => goTo(i)}
              className={`text-left p-3 rounded-2xl border transition-all duration-300 group ${
                i === activeIdx
                  ? 'bg-amber-500/10 border-amber-500/40 shadow-lg shadow-amber-500/10'
                  : 'bg-stone-900 border-stone-800 hover:border-stone-600'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-[11px] ${t.avatarBg}`}>
                  {t.avatar}
                </div>
                <div>
                  <div className={`text-[11px] font-black leading-tight ${i === activeIdx ? 'text-amber-300' : 'text-stone-300'}`}>
                    {t.name.split(' ')[0]}
                  </div>
                  <div className="text-[9px] text-stone-600 font-medium truncate max-w-[70px]">{t.company}</div>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(j => (
                  <Star key={j} className={`w-2.5 h-2.5 ${i === activeIdx ? 'fill-amber-400 text-amber-400' : 'fill-stone-600 text-stone-600'}`} />
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* ── Closing Trust CTA ── */}
        <div className="text-center mt-14">
          <p className="text-stone-500 text-sm font-medium mb-4">
            Join 5,000+ satisfied brands. No MOQ. Factory-direct. Fast delivery.
          </p>
          <a
            href="#quote-section"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FFB51B] hover:bg-amber-400 text-stone-900 font-black text-sm transition-colors shadow-[0_0_24px_rgba(255,181,27,0.3)] hover:shadow-[0_0_32px_rgba(255,181,27,0.5)]"
          >
            Get Your Free Quote Today
          </a>
        </div>

      </div>
    </section>
  );
}
