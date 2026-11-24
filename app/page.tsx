import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryShowcase from '@/components/CategoryShowcase';
import Footer from '@/components/Footer';

// Code-split below-the-fold interactive modules
const LivePriceCalculator = dynamic(() => import('@/components/LivePriceCalculator'), {
  loading: () => (
    <div className="py-24 bg-[#f5efe4] flex items-center justify-center">
      <div className="text-xs font-mono font-bold text-stone-500 animate-pulse">Loading B2B Instant Estimator...</div>
    </div>
  ),
});

const LogoCustomizer = dynamic(() => import('@/components/LogoCustomizer'), {
  loading: () => (
    <div className="py-24 bg-stone-900 flex items-center justify-center">
      <div className="text-xs font-mono font-bold text-stone-400 animate-pulse">Loading 3D Customizer Studio...</div>
    </div>
  ),
});

const WhyExecutivePacks = dynamic(() => import('@/components/WhyExecutivePacks'), {
  loading: () => (
    <div className="py-24 bg-[#f5efe4] flex items-center justify-center">
      <div className="text-xs font-mono font-bold text-stone-400 animate-pulse">Loading Pillars...</div>
    </div>
  ),
});

const AboutSection = dynamic(() => import('@/components/AboutSection'), {
  loading: () => (
    <div className="py-24 bg-[#faf8f5] flex items-center justify-center">
      <div className="text-xs font-mono font-bold text-stone-400 animate-pulse">Loading About Section...</div>
    </div>
  ),
});

const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'), {
  loading: () => (
    <div className="py-24 bg-stone-950 flex items-center justify-center">
      <div className="text-xs font-mono font-bold text-stone-500 animate-pulse">Loading Testimonials...</div>
    </div>
  ),
});

export const metadata = {
  title: 'Executive Packs | Custom Packaging Manufacturer',
  description: 'Factory-direct custom packaging: Home & Kitchen boxes, E-commerce mailers, Heavy-duty cartons, Jars & Bottles, Wooden baskets, and ThermoCool insulation.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-stone-900 selection:bg-amber-200 selection:text-amber-900">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Hero Section (3D Master Unboxing + 4 Spotlight Boxes) */}
      <Suspense fallback={<div className="h-[100vh] bg-[#101014]" />}>
        <Hero />
      </Suspense>

      {/* 3. Industrial Categories Interactive Showcase (Browse 55+ Box Styles) */}
      <CategoryShowcase />

      {/* 4. Interactive Mockup Studio (Live Brand Logo Upload & 3D Stamper Studio) */}
      <LogoCustomizer />

      {/* 5. Live Dimensional & Wholesale Pricing Calculator */}
      <LivePriceCalculator />

      {/* 6. Why Executive Packs — The 4 Pillars We Stand On */}
      <Suspense fallback={<div className="py-24 bg-[#f5efe4]" />}>
        <WhyExecutivePacks />
      </Suspense>

      {/* 7. About Section — 42 Years Heritage, Trust, Stats & Timeline */}
      <Suspense fallback={<div className="py-24 bg-[#faf8f5]" />}>
        <AboutSection />
      </Suspense>

      {/* 8. Testimonials — 6 Client Reviews with Auto-Carousel */}
      <Suspense fallback={<div className="py-24 bg-stone-950" />}>
        <TestimonialsSection />
      </Suspense>

      {/* 9. Footer */}
      <Footer />
    </main>
  );
}
