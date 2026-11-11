import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Award, 
  History, 
  UtensilsCrossed, 
  PackageCheck, 
  Sparkles, 
  Truck, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Factory,
  Check,
  Phone,
  Mail
} from 'lucide-react';

export const metadata = {
  title: 'About Us | Executive Packs - 42 Years of Packaging Engineering (Est. 1984)',
  description: 'Executive Packs (Est. 1984 as R.A Publishers) - 42 years of packaging manufacturing excellence. Slogan: From Impact to Intact. Fast food range boxes, custom mailers, and nationwide Pakistan delivery with No MOQ limits.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-stone-900 selection:bg-amber-200 selection:text-amber-900">
      <Navbar />

      {/* Hero Header Section */}
      <section className="bg-stone-950 text-white pt-16 pb-20 border-b border-stone-800 relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            
            {/* Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>42 Years of Excellence (1984 – 2026)</span>
            </div>

            {/* Main Brand Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4">
              From Impact to Intact.
            </h1>

            {/* Slogan Description */}
            <p className="text-base sm:text-lg text-stone-400 leading-relaxed font-medium mb-8">
              Originated in <strong className="text-white">1984 under R.A Publishers</strong> and evolving into <strong className="text-amber-400">EXECUTIVE PACKS</strong>, we have spent over four decades perfecting precision packaging engineering for fast food chains, retail e-commerce, and industrial enterprises across Pakistan.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-6 border-t border-stone-800">
              <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800">
                <span className="block text-2xl sm:text-3xl font-black text-amber-400 font-mono">42+</span>
                <span className="text-xs text-stone-400 font-medium">Years in Packaging</span>
              </div>
              <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800">
                <span className="block text-2xl sm:text-3xl font-black text-white font-mono">1984</span>
                <span className="text-xs text-stone-400 font-medium">Founded Heritage</span>
              </div>
              <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800">
                <span className="block text-2xl sm:text-3xl font-black text-emerald-400 font-mono">0 MOQ</span>
                <span className="text-xs text-stone-400 font-medium">No Minimum Order Limit</span>
              </div>
              <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800">
                <span className="block text-2xl sm:text-3xl font-black text-blue-400 font-mono">100%</span>
                <span className="text-xs text-stone-400 font-medium">Nationwide Pakistan</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Heritage & Journey Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Text (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">
                <History className="w-4 h-4 text-amber-700" />
                <span>Our Heritage & Origin</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
                Four Decades of Crafting Packaging That Protects Your Brand.
              </h2>

              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                The journey began in <strong>1984 as R.A Publishers</strong>, initially setting the benchmark in high-grade commercial paper conversion, precision die-cutting, and print production in Lahore. Over the past <strong>42 continuous years</strong>, that print and manufacturing mastery transformed into <strong>EXECUTIVE PACKS</strong>.
              </p>

              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                Our core manufacturing reputation was forged by supplying complete packaging ranges for <strong>fast-food brands and restaurant chains</strong> (including prominent international models such as Dixy Chicken). From grease-resistant burger cartons and fried chicken buckets to lock-bottom gable takeaway carriers, we engineered solutions that ensure piping-hot food reaches consumers intact.
              </p>

              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
                <h3 className="font-bold text-sm text-amber-950 mb-1 flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-amber-700" />
                  Specialized Fast-Food Packaging Line
                </h3>
                <p className="text-xs text-amber-900/90 leading-relaxed">
                  Food-grade, virgin kraft paperboard certified for direct contact. Designed with air-vent micro-perforations to prevent sogginess, greaseproof inner coating, and self-locking bottom dielines that assemble in under 3 seconds.
                </p>
              </div>

              {/* No MOQ Callout */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>No Minimum Order Quantity (No MOQ Limits)</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Whether you are an emerging cloud kitchen testing 100 boxes or an established franchise ordering 50,000 units monthly, Executive Packs provides the same factory-direct attention, CAD dieline assistance, and precision finishing.
                </p>
              </div>
            </div>

            {/* Visual Highlight Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="p-6 rounded-3xl bg-stone-900 text-white shadow-xl space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block font-bold">
                  Core Manufacturing Capabilities
                </span>

                <ul className="space-y-3.5 text-xs text-stone-300 font-medium">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>6-Color UV Offset Printing:</strong> High-definition branding with metallic spot foil stamping and debossed logos.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Food-Grade Greaseproof Coating:</strong> Biodegradable barrier coating resisting oil, butter, and moisture.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Corrugated E-Commerce Shippers:</strong> 3-ply and 5-ply flute combinations engineered for crush resistance.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>ThermoCool Cold-Chain:</strong> EPS insulation for chilled perishable food shipments across Pakistan.</span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-stone-400">Kasur Road Facility</span>
                  <Link href="/contact" className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1">
                    Visit Factory <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Plant Location Info */}
              <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                  <MapPin className="w-4 h-4 text-amber-700" />
                  <span>Manufacturing Plant & Sample Room</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  21 km Plot No.54, Kasur Rd, Asif Town, Lahore, Punjab 54440, Pakistan.
                </p>
                <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-stone-500">
                  <span>GPS: 31°24&apos;11.2&quot;N 74°21&apos;29.3&quot;E</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* The 4 Principles of "From Impact to Intact" */}
      <section className="py-16 bg-white border-t border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800 block mb-2">
              Our Promise
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              What &ldquo;From Impact to Intact&rdquo; Means
            </h2>
            <p className="text-sm text-stone-500 font-medium mt-2">
              Every package leaving our Lahore press is engineered to withstand rough transit, heat, and drops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#faf8f5] border border-stone-200/80 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
                01
              </div>
              <h3 className="text-base font-bold text-stone-900">Structural Compression Shield</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Engineered ECT (Edge Crush Test) liners that protect delicate fast food, fragile glass dropper bottles, and luxury goods from pallet stacking pressure.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#faf8f5] border border-stone-200/80 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
                02
              </div>
              <h3 className="text-base font-bold text-stone-900">Zero Leakage & Thermal Defense</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Fold-over interlocking corners without bottom adhesive gaps prevent grease leakage in food boxes and maintain internal thermal stability.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#faf8f5] border border-stone-200/80 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
                03
              </div>
              <h3 className="text-base font-bold text-stone-900">Sensory Unboxing Experience</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Crisp creasing lines that pop open with an audible snap, luxury soft-touch lamination, and pristine unboxing aesthetics that turn consumers into repeat buyers.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-16 bg-[#faf8f5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-stone-950 text-white rounded-3xl p-8 sm:p-12 border border-stone-800 space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
              Ready to Upgrade Your Packaging?
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Order a physical sample box kit to test our paperboard quality in person, or get in touch directly via WhatsApp or email for instant CAD dielines and quotations.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/order"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition shadow-sm"
              >
                <span>Order Physical Sample Kit ($15)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold transition border border-stone-700"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Contact & Factory Location</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
