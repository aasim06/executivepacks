import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ScrollUnboxing from '@/components/ScrollUnboxing';
import CategoryShowcase from '@/components/CategoryShowcase';
import LivePriceCalculator from '@/components/LivePriceCalculator';
import LogoCustomizer from '@/components/LogoCustomizer';
import Footer from '@/components/Footer';

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
      <Hero />

      {/* 3. The Core Scroll Unboxing Experience (Canvas & Three.js 3D) */}
      <ScrollUnboxing />

      {/* 4. Step 1: The 6 Industrial Categories Interactive Showcase (High-Res Unsplash Photography) */}
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
