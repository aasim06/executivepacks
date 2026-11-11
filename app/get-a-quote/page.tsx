import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomQuoteStudio from '@/components/CustomQuoteStudio';
import { 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Truck, 
  FileText,
  BadgeCheck,
  PhoneCall
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'B2B Custom Packaging Quote Studio | Executive Packs Wholesale',
  description: 'Configure and request an enterprise-grade bespoke packaging quote. Choose custom dieline dimensions, FSC board grades, luxury embellishments, and volume wholesale tiers with instant CAD proofing.',
  keywords: [
    'custom packaging quote',
    'wholesale box pricing',
    'custom boxes quote studio',
    'dieline CAD proof',
    'rigid luxury packaging quote',
    'corrugated mailer wholesale'
  ],
};

export default function GetAQuotePage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-16 sm:pb-24">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-stone-500 mb-6 font-medium">
          <Link href="/" className="hover:text-stone-900 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-900 font-bold">Industrial B2B Quotation Studio</span>
        </nav>

        {/* Studio Hero Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm mb-10 sm:mb-12">
          <div className="max-w-4xl space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100/90 text-amber-900 text-xs font-bold border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-800" />
              <span>Direct Manufacturer Pricing • Zero Broker Markups</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Bespoke Industrial Packaging <br className="hidden sm:inline" />
              <span className="text-amber-800">Quotation Studio</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
              Configure your box architecture, exact millimeter or inch dieline measurements, FSC-certified board calipers, and luxury surface embellishments. Get real-time volume tier discounts and dispatch for rapid engineering approval.
            </p>

            {/* Quality assurance bar */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Free 1:1 CAD Dieline Proof</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-200/80">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <span>2-Hour Engineering Review</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-200/80">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ISO 9001:2015 Certified</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-200/80">
                <Truck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Free Doorstep Delivery</span>
              </div>
            </div>

          </div>
        </div>

        {/* Full-width High-End Quote Studio Component */}
        <CustomQuoteStudio 
          initialProduct="Custom Manufactured Packaging Box" 
          initialCategory="Industrial B2B Packaging"
          className="mb-16 sm:mb-20"
        />

        {/* Assurance & Help Banner */}
        <div className="rounded-3xl bg-stone-900 text-white p-6 sm:p-10 border border-stone-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-stone-800 px-3 py-1 rounded-full border border-stone-700 inline-block">
              HUMAN PACKAGING ENGINEERS ON STANDBY
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Have complex dielines or custom structural inserts?
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 max-w-xl">
              Our packaging engineers in Kasur Road, Lahore can review your CAD files directly, calculate tensile load tolerances, and provide tailored physical press proofs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <a
              href="https://wa.me/923001234567?text=Hi%20Executive%20Packs,%20I%20need%20custom%20engineering%20consultation%20for%20my%20packaging%20dielines."
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition text-center shadow-md flex items-center justify-center gap-2"
            >
              <span>WhatsApp Engineer</span>
            </a>
            <Link
              href="/order"
              className="py-3 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs uppercase tracking-wider transition text-center border border-white/20"
            >
              Order Sample Kit ($15)
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
