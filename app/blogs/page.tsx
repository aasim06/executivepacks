'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  BookOpen, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Package, 
  Calendar,
  CheckCircle2
} from 'lucide-react';

const BLOG_ARTICLES = [
  {
    id: 'ultimate-guide-custom-food-packaging',
    title: 'The Ultimate Guide to Custom Food Packaging: Safety, Materials & Branding',
    category: 'Food & Beverage',
    readTime: '6 min read',
    date: 'November 2026',
    image: 'https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Printed-Frozen-Food-Boxes.webp',
    excerpt: 'Discover why food-grade barrier coatings, non-toxic soy inks, and FSC-certified virgin kraft are critical for takeout, bakery, and frozen food brands.',
    highlights: ['Food-Grade Virgin Kraft vs Recycled', 'Grease & Moisture Barrier Liners', 'FDA & Halal Food Packaging Compliance'],
  },
  {
    id: 'kraft-vs-sbs-paperboard',
    title: 'Kraft vs Bleached SBS Paperboard: Which Material Suits Your Custom Box?',
    category: 'Materials & Engineering',
    readTime: '5 min read',
    date: 'October 2026',
    image: 'https://customboxesmarket.co.uk/wp-content/uploads/2023/12/kraft-boxes-wholesale.webp',
    excerpt: 'A comprehensive technical comparison between raw eco brown kraft and ultra-white SBS virgin paperboard for cosmetic, retail, and luxury packaging.',
    highlights: ['Burst Strength & GSM Comparison', 'Offset Color Fidelity & Foil Hot Stamping', 'Eco Sustainability & Recyclability'],
  },
  {
    id: 'offset-vs-digital-printing-guide',
    title: 'Offset vs Digital Printing for Packaging: Cost, Quality & Minimums',
    category: 'Printing Technology',
    readTime: '7 min read',
    date: 'October 2026',
    image: 'https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Lipstick-Boxes.webp',
    excerpt: 'When to choose HP Indigo Digital printing for short runs versus Heidelberg CMYK Offset printing for high-volume wholesale packaging runs.',
    highlights: ['Per-Unit Cost Curves at 250 vs 10,000 units', 'Metallic Foil & Spot UV Lamination', 'Color Matching & Pantones'],
  },
  {
    id: 'luxury-rigid-setup-boxes-dieline',
    title: 'Anatomy of a Luxury Rigid Setup Box: Greyboard, Inserts & Finishes',
    category: 'Luxury Packaging',
    readTime: '8 min read',
    date: 'September 2026',
    image: 'https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Rigid-Boxes-Wholesale.webp',
    excerpt: 'How leading perfumes, watches, and jewelry brands engineer magnetic closure rigid setup boxes with custom high-density EVA foam inserts.',
    highlights: ['1.5mm - 3.0mm Chipboard Structure', 'Magnetic Flap Closures & Velvet Inlays', 'Embossing, Debossing & Soft-Touch Matte'],
  },
  {
    id: 'ecommerce-subscription-mailers',
    title: 'Designing E-Commerce Subscription Mailers That Survive Transit',
    category: 'E-Commerce Logistics',
    readTime: '5 min read',
    date: 'August 2026',
    image: 'https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Mailer-Boxes-Wholesale.webp',
    excerpt: 'Roll-end tuck-front (RETF) corrugated mailer boxes provide optimal unboxing excitement while eliminating courier damage during parcel transit.',
    highlights: ['E-Flute vs B-Flute Structural Rigidity', 'Inside-Out Dual-Sided Printing', 'Self-Locking Dust Flaps & Peel-and-Seal'],
  },
  {
    id: 'reducing-packaging-costs-wholesale',
    title: '5 Proven Ways to Reduce B2B Packaging Production Costs by 30%',
    category: 'Factory Pricing',
    readTime: '6 min read',
    date: 'July 2026',
    image: 'https://customboxesmarket.co.uk/wp-content/uploads/2023/12/Custom-Printed-Cake-Boxes.webp',
    excerpt: 'Smart dieline nesting, standard board sheet optimization, and seasonal bulk ordering tips direct from our manufacturing production floor.',
    highlights: ['Dieline Nesting on Sheet Layouts', 'Standard vs Custom Tooling Dies', 'Volume Tier Price Scaling'],
  },
];

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/90 text-amber-900 text-xs font-bold mb-3 border border-amber-200">
            <BookOpen className="w-3.5 h-3.5 text-amber-800" />
            <span>Executive Packs Packaging Knowledge Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Packaging Engineering, Materials & Printing Insights
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-4 leading-relaxed">
            Expert guides, material comparisons, dieline structural analysis, and factory printing specifications from our 42+ years of manufacturing experience.
          </p>
        </div>

        {/* Featured Article Card */}
        <div className="mb-12 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm hover:shadow-md transition">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 relative aspect-16/10 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={BLOG_ARTICLES[0].image} 
                alt={BLOG_ARTICLES[0].title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-stone-900 text-white text-[11px] font-bold shadow-md">
                Featured Guide
              </span>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-3 text-xs text-stone-500 font-medium">
                <span className="text-amber-800 font-bold uppercase tracking-wider">{BLOG_ARTICLES[0].category}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {BLOG_ARTICLES[0].readTime}</span>
                <span>•</span>
                <span>{BLOG_ARTICLES[0].date}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 leading-snug">
                {BLOG_ARTICLES[0].title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {BLOG_ARTICLES[0].excerpt}
              </p>
              <div className="space-y-2 pt-2">
                {BLOG_ARTICLES[0].highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-stone-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/order"
                  className="px-6 py-3 rounded-full bg-stone-900 hover:bg-amber-800 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-sm"
                >
                  <span>Request Custom Dieline Proof</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BLOG_ARTICLES.slice(1).map((article) => (
            <div 
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-md transition flex flex-col"
            >
              <div className="relative aspect-16/10 bg-stone-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/95 text-stone-900 text-[10px] font-bold border border-stone-200 shadow-xs">
                  {article.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 font-medium mb-2">
                    <Clock className="w-3 h-3 text-stone-400" />
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-stone-900 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <Link
                    href={`/order`}
                    className="text-xs font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1 group"
                  >
                    <span>Get Wholesale Quote</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                  </Link>
                  <span className="text-[10px] font-mono text-stone-400">EXECUTIVE B2B</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
