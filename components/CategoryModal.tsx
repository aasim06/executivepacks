'use client';

import React from 'react';
import { X, Check, ShieldCheck, Ruler, Clock, PackageCheck, Download, ArrowRight } from 'lucide-react';
import { PackagingProduct } from '@/data/categories';

interface ModalProps {
  product: PackagingProduct | null;
  onClose: () => void;
}

export default function CategoryModal({ product, onClose }: ModalProps) {
  const [selectedImage, setSelectedImage] = React.useState<string>(product?.image || '');

  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full sm:max-w-2xl max-h-[88vh] sm:max-h-[90vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 p-4 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Drag Handle Bar on Mobile */}
        <div className="w-12 h-1.5 rounded-full bg-stone-300 mx-auto mb-3 sm:hidden"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 sm:top-5 right-4 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Header */}
        <div className="mb-4 sm:mb-6 pr-8">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 flex-wrap">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
              {product.categoryLabel || 'Custom Packaging'}
            </span>
            <span className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border ${product.badgeColor || 'bg-amber-100 text-amber-800 border-amber-300'}`}>
              {product.badge || 'Factory Direct'}
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-snug">
            {product.name}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">{product.tagline || product.description}</p>
        </div>

        {/* Image Preview & Key Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-inner flex items-center justify-center shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedImage || product.image} alt={product.name} className="w-full h-full object-cover object-center transition-all duration-300" />
            </div>

            {/* Thumbnail switcher if hoverImage exists */}
            {product.hoverImage && product.hoverImage !== product.image && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedImage(product.image)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-semibold border transition ${
                    selectedImage === product.image
                      ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-xs'
                      : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  Front View
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedImage(product.hoverImage!)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-semibold border transition ${
                    selectedImage === product.hoverImage
                      ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-xs'
                      : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  Inside / Open View
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between space-y-4">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1">Standard Dimensions</span>
              <div className="flex items-center gap-2 font-mono font-bold text-stone-900 text-sm">
                <Ruler className="w-4 h-4 text-amber-700" />
                <span>{product.dimensions?.standard || 'Custom CAD Specification'}</span>
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold block mt-1">✓ 100% Custom Dimensions Available</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] font-bold text-stone-500 uppercase block">Min Order (MOQ)</span>
                <span className="text-base font-extrabold text-stone-900">{product.moq} pcs</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] font-bold text-stone-500 uppercase block">Production Time</span>
                <span className="text-base font-extrabold text-stone-900 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-500" /> {product.leadTime || '5-7 Business Days'}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60">
              <span className="text-[11px] font-bold text-amber-900 block mb-0.5">Direct Manufacturer Guarantee</span>
              <p className="text-[11px] text-amber-800">ISO 9001 certified box integrity test report included with every production batch.</p>
            </div>
          </div>
        </div>

        {/* Volume Pricing Tiers */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2.5">
            Tiered Wholesale Pricing (Factory Direct)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {(product.pricingTiers && product.pricingTiers.length > 0 
              ? product.pricingTiers 
              : [
                  { qty: '100 pcs', unitPrice: product.startingPrice || '$0.85' },
                  { qty: '500 pcs', unitPrice: '$0.55' },
                  { qty: '2,500 pcs', unitPrice: '$0.40' },
                ]
            ).map((tier, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center hover:border-amber-500 transition">
                <span className="text-xs font-semibold text-stone-600 block">{tier.qty}</span>
                <span className="text-base font-extrabold text-stone-900 block mt-0.5">{tier.unitPrice}</span>
                {tier.savings && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full inline-block mt-1">
                    {tier.savings}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Materials & Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div>
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Materials & Board Grade</h4>
            <ul className="space-y-1.5">
              {(product.materials && product.materials.length > 0 
                ? product.materials 
                : ['350 GSM SBS Virgin Paperboard', 'Recyclable Kraft Fluting']
              ).map((mat, i) => (
                <li key={i} className="text-xs font-semibold text-stone-700 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{mat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Key Engineering Features</h4>
            <ul className="space-y-1.5">
              {(product.features && product.features.length > 0
                ? product.features
                : ['Custom Die-Cut Structural Dieline', 'CMYK Offset + Metallic Foil Finish']
              ).map((feat, i) => (
                <li key={i} className="text-xs font-semibold text-stone-700 flex items-center gap-2">
                  <PackageCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-stone-200">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-stone-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">Free Sample Box with Bulk Orders</span>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <button 
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl sm:rounded-full border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-100 transition"
            >
              Close
            </button>
            <a
              href={`/order?productId=${product.id}`}
              className="w-full sm:w-auto py-3.5 px-6 rounded-xl sm:rounded-full bg-stone-900 hover:bg-amber-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-stone-900/10 transition active:scale-[0.98]"
            >
              <span>Configure & Order Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
