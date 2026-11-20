import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ScrollUnboxing from '@/components/ScrollUnboxing';
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

export const metadata = {
  title: 'Executive Packs | Custom Packaging Manufacturer & Scroll Unboxing Engine',
  description: 'Factory-direct custom packaging: Home & Kitchen boxes, E-commerce mailers, Heavy-duty cartons, Jars & Bottles, Wooden baskets, and ThermoCool insulation.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-stone-900 selection:bg-amber-200 selection:text-amber-900">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Hero Section */}
      <Suspense fallback={<div className="h-[100vh] bg-[#101014]" />}>
        <Hero />
      </Suspense>

      {/* 3. The Core Scroll Unboxing Experience */}
      <ScrollUnboxing />

      {/* 4. Industrial Categories Interactive Showcase */}
      <CategoryShowcase />

      {/* 5. Live Dimensional & Wholesale Pricing Calculator */}
      <LivePriceCalculator />

      {/* 6. Live Brand Logo Upload & 3D Stamper Studio */}
      <LogoCustomizer />

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}
