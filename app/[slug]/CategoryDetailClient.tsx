'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryModal from '@/components/CategoryModal';
import GetCustomQuote from '@/components/GetCustomQuote';
import { CategoryMeta } from '@/data/categoriesMeta';
import { PackagingProduct } from '@/data/categories';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Ruler, 
  Clock, 
  Truck, 
  Layers, 
  ChevronRight,
  Package,
  CheckCircle2,
  PhoneCall,
  Sliders,
  Eye,
  Bookmark,
  Send
} from 'lucide-react';

interface ClientProps {
  isSingleProduct: boolean;
  categoryMeta?: CategoryMeta;
  products?: PackagingProduct[];
  product?: PackagingProduct;
  relatedProducts?: PackagingProduct[];
}

const FALLBACK_BOX_IMG = 'https://customboxesmarket.co.uk/wp-content/uploads/2023/12/kraft-boxes-wholesale.webp';

export default function CategoryDetailClient({
  isSingleProduct,
  categoryMeta,
  products = [],
  product,
  relatedProducts = [],
}: ClientProps) {
  const [activeModalProduct, setActiveModalProduct] = useState<PackagingProduct | null>(null);

  // If single product page view
  if (isSingleProduct && product) {
    return (
      <div className="min-h-screen bg-[#faf8f5] text-stone-900 pb-16">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-16 sm:pb-24">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-stone-500 mb-6 font-medium">
            <Link href="/" className="hover:text-stone-900 transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <Link href="/#categories-section" className="hover:text-stone-900 transition">Custom Packaging</Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-900 font-bold truncate">{product.name}</span>
          </nav>

          {/* Product Hero Grid with Sidebar Quote */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            
            {/* Left 7-8 cols: Images & Specs */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              
              <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-sm flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={product.image} 
                  alt={product.name}
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_BOX_IMG; }}
                  className="w-full h-full object-cover object-center"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-md">
                  IN STOCK
                </span>
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/95 text-stone-900 text-xs font-bold shadow-sm border border-stone-200">
                  {product.badge}
                </span>
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  {product.categoryLabel}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-2.5">
                  {product.name}
                </h1>
                <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Wholesale Pricing Tiers */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Tier Wholesale Pricing (Factory Direct)</span>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">MOQ: {product.moq} pcs</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(product.pricingTiers || [
                    { qty: `${product.moq} pcs`, unitPrice: product.startingPrice },
                    { qty: `${product.moq * 2} pcs`, unitPrice: `$${(parseFloat(product.startingPrice.replace(/[^0-9.]/g, '')) * 0.85).toFixed(2)}` },
                    { qty: `${product.moq * 4} pcs`, unitPrice: `$${(parseFloat(product.startingPrice.replace(/[^0-9.]/g, '')) * 0.70).toFixed(2)}` },
                    { qty: `${product.moq * 10} pcs`, unitPrice: `$${(parseFloat(product.startingPrice.replace(/[^0-9.]/g, '')) * 0.55).toFixed(2)}` },
                  ]).map((tier, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 text-center">
                      <span className="block text-xs font-bold text-stone-600">{tier.qty}</span>
                      <span className="block text-sm font-extrabold font-mono text-stone-900 mt-0.5">{tier.unitPrice}</span>
                      <span className="block text-[9px] text-emerald-600 font-semibold">Wholesale</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specs List */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-stone-200">
                  <span className="text-stone-500 block mb-1">Standard Dieline:</span>
                  <span className="font-bold text-stone-900 block">{product.dimensions?.standard || 'Custom 1:1 Proof'}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-stone-200">
                  <span className="text-stone-500 block mb-1">Production Lead Time:</span>
                  <span className="font-bold text-stone-900 block">{product.leadTime || '5-7 Business Days'}</span>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/order?productId=${product.id}`}
                  className="flex-1 py-3.5 px-6 rounded-full bg-stone-900 hover:bg-amber-800 text-white font-bold text-xs uppercase tracking-wider transition text-center shadow-md flex items-center justify-center gap-2"
                >
                  <span>Configure & Order Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => setActiveModalProduct(product)}
                  className="py-3.5 px-6 rounded-full border border-stone-300 text-stone-700 font-bold text-xs hover:bg-stone-100 transition text-center"
                >
                  View Full Specs Modal
                </button>
              </div>

            </div>

            {/* Right 4-5 cols: Get Custom Quote Sidebar */}
            <div className="lg:col-span-5 xl:col-span-4 sticky top-20">
              <GetCustomQuote defaultProductName={product.name} />
            </div>

          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="pt-10 border-t border-stone-200 mb-16">
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 mb-6">
                Related {product.categoryLabel} Packaging Boxes
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {relatedProducts.map(rel => (
                  <div key={rel.id} className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-md transition flex flex-col">
                    <div className="relative aspect-square bg-stone-100 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={rel.image} 
                        alt={rel.name} 
                        onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_BOX_IMG; }}
                        className="w-full h-full object-cover" 
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-bold">
                        IN STOCK
                      </span>
                    </div>
                    <div className="p-3.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-stone-900 line-clamp-1">{rel.name}</h3>
                        <span className="text-[11px] font-mono font-bold text-amber-900 mt-0.5 block">{rel.startingPrice}</span>
                      </div>
                      <Link
                        href={`/order?productId=${rel.id}`}
                        className="mt-3 w-full py-2 rounded-xl bg-stone-900 hover:bg-amber-800 text-white text-[11px] font-bold text-center block transition"
                      >
                        Order This Box
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

        <Footer />
        <CategoryModal product={activeModalProduct} onClose={() => setActiveModalProduct(null)} />
      </div>
    );
  }

  // Category Catalog View with Sidebar "Get Custom Quote" (Matching Image 1)
  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 pb-16">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-16 sm:pb-24">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-stone-500 mb-6 font-medium">
          <Link href="/" className="hover:text-stone-900 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link href="/#categories-section" className="hover:text-stone-900 transition">
            {categoryMeta?.group || 'Custom Packaging'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-900 font-bold truncate">{categoryMeta?.name}</span>
        </nav>

        {/* Hero Banner for Category */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 text-xs font-bold border border-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                <span>{categoryMeta?.group} • Wholesale Direct</span>
              </div>
              
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
                {categoryMeta?.h1}
              </h1>

              <p className="text-xs sm:text-base text-stone-600 leading-relaxed">
                {categoryMeta?.description}
              </p>

              {/* Highlights pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {categoryMeta?.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href="#quote-sidebar"
                  className="px-6 py-3.5 rounded-full bg-stone-900 hover:bg-amber-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-2"
                >
                  <span>Request Custom Dieline & Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#catalog-grid"
                  className="px-5 py-3.5 rounded-full border border-stone-300 text-stone-700 font-bold text-xs hover:bg-stone-100 transition"
                >
                  Browse {products.length} Box Models &darr;
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-inner flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={categoryMeta?.heroImage} 
                  alt={categoryMeta?.name}
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_BOX_IMG; }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
                  <span className="text-white text-xs font-bold drop-shadow">
                    ISO 9001:2015 & FSC® Certified Manufacturing
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Section Header: Box Models */}
        <div id="catalog-grid" className="scroll-mt-24 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              Featured {categoryMeta?.name} Box Models
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Select a packaging format to view structural specifications, starting pricing, and dieline proofs.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-stone-600 bg-stone-200/70 px-3 py-1 rounded-full shrink-0">
            {products.length} Products Found
          </span>
        </div>

        {/* 2-Column Layout matching Image 1: Products on Left + Sticky "Get Custom Quote" on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Products Grid (Matching Image 1) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {products.map((prod) => (
                <div 
                  key={prod.id}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-stone-100 overflow-hidden cursor-pointer" onClick={() => setActiveModalProduct(prod)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={prod.image} 
                      alt={prod.name}
                      onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_BOX_IMG; }}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Green "IN STOCK" Badge from Image 1 */}
                    <span className="absolute top-2.5 right-2.5 text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white shadow-xs uppercase tracking-wider">
                      IN STOCK
                    </span>

                    {/* Left Attribute Badge */}
                    <span className={`absolute top-2.5 left-2.5 text-[9px] font-bold px-2 py-0.5 rounded-full border shadow-xs ${prod.badgeColor || 'bg-white text-stone-900 border-stone-200'}`}>
                      {prod.badge}
                    </span>

                    {/* Quick View Pill */}
                    <div className="absolute inset-x-0 bottom-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-stone-900/90 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-xs shadow-sm flex items-center gap-1">
                        <Eye className="w-3 h-3" /> Quick Specs
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-xs sm:text-sm font-extrabold text-stone-900 leading-snug line-clamp-2">
                        {prod.name}
                      </h3>
                      <div className="flex items-baseline justify-between mt-1.5">
                        <span className="font-mono text-xs sm:text-sm font-black text-amber-900">
                          {prod.startingPrice}
                        </span>
                        <span className="text-[10px] text-stone-500 font-mono">
                          MOQ: {prod.moq} pcs
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-100 space-y-1.5">
                      <Link
                        href={`/order?productId=${prod.id}`}
                        className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-amber-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 shadow-xs"
                      >
                        <span>Configure & Order</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setActiveModalProduct(prod)}
                        className="w-full py-1.5 text-stone-600 hover:text-stone-900 text-[11px] font-semibold text-center block transition hover:bg-stone-50 rounded-lg"
                      >
                        View Dual-Angle Proof
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sticky "Get Custom Quote" Form (Matching Image 1) */}
          <div id="quote-sidebar" className="lg:col-span-5 xl:col-span-4 sticky top-20 scroll-mt-24">
            <GetCustomQuote defaultProductName={categoryMeta?.name} />
          </div>

        </div>

        {/* Manufacturing Materials Guide Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm mb-16">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
              Engineering & Material Standards
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              Materials Used in {categoryMeta?.name}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Every box is produced from sustainably harvested FSC-certified paperboard meeting rigorous commercial strength standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(categoryMeta?.materials || ['Virgin Kraft', 'SBS Bleached Paperboard', 'E-Flute Fluting', 'Rigid Greyboard']).map((mat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center mb-2.5">
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-stone-900">{mat}</h4>
                <p className="text-[11px] text-stone-500 mt-1">
                  Engineered for maximum rigidity, puncture resistance, and seamless ink adhesion.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner - Fixed duplicate custom title & Added generous bottom margin (mb-20 sm:mb-28) */}
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-stone-800 text-center space-y-4 mb-20 sm:mb-28">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-stone-800 px-3 py-1 rounded-full border border-stone-700">
            DIRECT MANUFACTURER GUARANTEE
          </span>
          
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight max-w-xl mx-auto">
            Ready to order {categoryMeta?.name?.toLowerCase().startsWith('custom') ? categoryMeta?.name : `custom ${categoryMeta?.name}`}?
          </h3>
          
          <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto">
            Receive a free 1:1 CAD dieline proof and digital 3D mockup before volume production begins.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              href="/order"
              className="px-8 py-3.5 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-600/30 flex items-center gap-2"
            >
              <span>Start Your Custom Order</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </main>

      <Footer />

      {/* Modal Popup for any active box */}
      <CategoryModal product={activeModalProduct} onClose={() => setActiveModalProduct(null)} />
    </div>
  );
}
