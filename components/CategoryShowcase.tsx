'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CATEGORIES_LIST, PACKAGING_PRODUCTS, PackagingProduct } from '@/data/categories';
import { getStoredProducts } from '@/lib/adminStore';
import CategoryModal from './CategoryModal';
import { 
  Bookmark, 
  Plus, 
  ArrowUpRight, 
  ChevronRight, 
  Check, 
  Download, 
  Eye, 
  Sparkles,
  Layers,
  ChevronDown,
  Loader2
} from 'lucide-react';

// Unsplash-style filter tags matching user's reference UI
const GALLERY_TAGS = [
  { 
    id: 'all', 
    label: 'All Packaging', 
    title: 'Custom Packaging Showcase', 
    subtitle: 'Factory-direct bespoke printed boxes, rigid gift packaging, food cartons, and mailers.' 
  },
  { 
    id: 'food-bakery', 
    label: 'Food & Bakery', 
    title: 'Food & Bakery Boxes', 
    subtitle: 'Custom frozen food, cake, burger, cereal, sandwich, and takeout food packaging.' 
  },
  { 
    id: 'cosmetics', 
    label: 'Cosmetics & Beauty', 
    title: 'Cosmetics & Beauty Boxes', 
    subtitle: 'Custom soap, lipstick, perfume, serum, and eyelash boxes.' 
  },
  { 
    id: 'apparel', 
    label: 'Apparel & Fashion', 
    title: 'Apparel & Fashion Packaging', 
    subtitle: 'Custom t-shirt, shoe, tie, belt, and luxury apparel packaging.' 
  },
  { 
    id: 'rigid-luxury', 
    label: 'Rigid Luxury & Gift', 
    title: 'Rigid Luxury & Gift Boxes', 
    subtitle: 'Handcrafted rigid setup boxes, slide drawer boxes, flip-top boxes, and foam inserts.' 
  },
  { 
    id: 'shipping-mailers', 
    label: 'Mailers & Shipping', 
    title: 'Mailers & Shipping Boxes', 
    subtitle: 'Roll-end corrugated mailer boxes, master shipping cartons, and retail display packaging.' 
  },
  { 
    id: 'mylar-bags', 
    label: 'Mylar Bags & Pouches', 
    title: 'Mylar Barrier Bags & Pouches', 
    subtitle: 'Smell-proof, holographic, vacuum seal, and food-grade barrier pouches.' 
  },
  { 
    id: 'custom-boxes', 
    label: 'Retail & Display', 
    title: 'Custom Retail & Display Boxes', 
    subtitle: 'Pyramid boxes, cube boxes, counter displays, and holiday gift packaging.' 
  },
  { 
    id: 'open-box', 
    label: 'Dual-Angle View', 
    title: 'Open Box 3D View', 
    subtitle: 'Interactive dual-angle views showcasing inside dielines, compartments, and unboxing reveals.' 
  },
];

export default function CategoryShowcase() {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [activeProduct, setActiveProduct] = useState<PackagingProduct | null>(null);
  const [products, setProducts] = useState<PackagingProduct[]>(PACKAGING_PRODUCTS);
  const [savedFavorites, setSavedFavorites] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const tagsScrollRef = useRef<HTMLDivElement>(null);

  // Sync products with Admin Panel local storage & cross-tab events
  useEffect(() => {
    const syncProducts = () => {
      const stored = getStoredProducts();
      if (stored && stored.length > 0) {
        setProducts(stored);
      }
    };

    syncProducts();
    window.addEventListener('storage', syncProducts);
    window.addEventListener('executive_catalog_updated', syncProducts);

    return () => {
      window.removeEventListener('storage', syncProducts);
      window.removeEventListener('executive_catalog_updated', syncProducts);
    };
  }, []);

  // Reset pagination count on category/tag change
  useEffect(() => {
    setVisibleCount(6);
  }, [selectedTag]);

  const flashToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleFavorite = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    const updated = { ...savedFavorites, [productId]: !savedFavorites[productId] };
    setSavedFavorites(updated);
    if (updated[productId]) {
      flashToast('Saved to your packaging collection!');
    } else {
      flashToast('Removed from saved collection.');
    }
  };

  // Scroll tags smoothly
  const scrollTagsRight = () => {
    if (tagsScrollRef.current) {
      tagsScrollRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };

  // Filter products by selected tag
  const filteredProducts = products.filter((prod) => {
    if (selectedTag === 'all' || selectedTag === 'boxes') return true;
    if (selectedTag === 'open-box') return !!prod.hoverImage && prod.hoverImage !== prod.image;
    if (selectedTag === 'food-bakery') return prod.category === 'food-bakery' || prod.category === 'home-kitchen';
    if (selectedTag === 'shipping-mailers') return prod.category === 'shipping-mailers' || prod.category === 'ecommerce' || prod.category === 'cartons';
    return prod.category === selectedTag;
  });

  // Slice for Load More pagination
  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setIsLoadingMore(false);
    }, 350);
  };

  const currentTagInfo = GALLERY_TAGS.find((t) => t.id === selectedTag) || {
    id: selectedTag,
    label: selectedTag,
    title: selectedTag,
    subtitle: 'Explore custom manufacturing specifications and direct wholesale pricing.',
  };

  return (
    <section id="categories-section" className="py-12 sm:py-16 bg-white border-t border-stone-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-950 text-white text-xs font-semibold shadow-2xl border border-stone-800 animate-in fade-in">
            <Check className="w-3.5 h-3.5 text-amber-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Header: Dynamic Unsplash / Editorial Gallery Style */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight transition-all duration-300">
              {currentTagInfo.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-medium transition-all duration-300">
              {currentTagInfo.subtitle}
            </p>
          </div>

          {/* Horizontal Pill Tags Toolbar with Scroll Chevron (Exact match to reference) */}
          <div className="relative flex items-center gap-2">
            <div 
              ref={tagsScrollRef}
              className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar flex-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {GALLERY_TAGS.map((tag) => {
                const isSelected = selectedTag === tag.id;
                return (
                  <button
                    key={tag.id}
                    onClick={() => setSelectedTag(tag.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition border shrink-0 ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 shadow-sm font-semibold'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400 hover:bg-stone-50'
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>

            {/* Right Scroll Arrow Button */}
            <button
              onClick={scrollTagsRight}
              className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-600 transition shrink-0 hidden sm:flex items-center justify-center shadow-xs"
              title="Scroll tags"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Masonry / Photo-Driven Gallery Grid (Unsplash Style) */}
        <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-4 space-y-4">
          {displayedProducts.map((product, index) => {
            const isFavorited = !!savedFavorites[product.id];
            
            // Staggered aspect ratio aesthetic for authentic editorial masonry
            const aspectClass = index % 5 === 0 
              ? 'aspect-[3/4]' 
              : index % 3 === 0 
              ? 'aspect-[4/5]' 
              : index % 2 === 0 
              ? 'aspect-[1/1]' 
              : 'aspect-[4/3]';

            return (
              <div
                key={product.id}
                onClick={() => setActiveProduct(product)}
                className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-stone-100 cursor-pointer shadow-xs hover:shadow-2xl transition-all duration-300"
              >
                {/* Image Container with Smooth Dual-Angle Hover Reveal */}
                <div className={`relative w-full ${aspectClass} overflow-hidden bg-stone-100`}>
                  {/* Primary Angle */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover object-center transition-all duration-500 ease-out ${
                      product.hoverImage && product.hoverImage !== product.image
                        ? 'group-hover:opacity-0 group-hover:scale-105'
                        : 'group-hover:scale-105'
                    }`}
                    loading="lazy"
                  />
                  {/* Hover Angle (Open / Inside View) */}
                  {product.hoverImage && product.hoverImage !== product.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.hoverImage}
                      alt={`${product.name} alternate view`}
                      className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
                      loading="lazy"
                    />
                  )}

                  {/* Dual Angle Pill */}
                  {product.hoverImage && product.hoverImage !== product.image && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white/90 font-medium flex items-center gap-1 opacity-80 group-hover:opacity-0 transition-opacity pointer-events-none">
                      <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                      <span>Hover for View</span>
                    </div>
                  )}
                </div>

                {/* Always visible subtle bottom badge on mobile */}
                <div className="sm:hidden p-3 bg-white border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-xs text-stone-900 truncate">{product.name}</h3>
                    <p className="text-[10px] text-stone-500">{product.startingPrice} • MOQ {product.moq}</p>
                  </div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                    View
                  </span>
                </div>

                {/* Desktop Hover Overlay (Authentic Unsplash style overlay) */}
                <div className="hidden sm:flex absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col justify-between p-4 z-20">
                  
                  {/* Top Bar on Hover */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/10">
                      {product.categoryLabel || 'Packaging'}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {/* Bookmark Icon */}
                      <button
                        onClick={(e) => toggleFavorite(e, product.id)}
                        className={`p-2 rounded-xl backdrop-blur-md transition ${
                          isFavorited 
                            ? 'bg-amber-500 text-stone-950 font-bold' 
                            : 'bg-white/80 hover:bg-white text-stone-800'
                        }`}
                        title="Save to Collection"
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>

                      {/* Add to Inquiry */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `/order?productId=${product.id}`;
                        }}
                        className="p-2 rounded-xl bg-white/80 hover:bg-white text-stone-800 backdrop-blur-md transition"
                        title="Configure This Box"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Bar on Hover */}
                  <div className="flex items-end justify-between gap-3 text-white">
                    <div className="min-w-0 flex-1">
                      <p className="font-extrabold text-sm sm:text-base leading-tight truncate drop-shadow-sm text-white">
                        {product.name}
                      </p>
                      <p className="text-stone-300 text-[11px] mt-0.5 truncate font-medium">
                        {product.tagline || product.description}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white/20 text-white backdrop-blur-md border border-white/15">
                          {product.startingPrice}
                        </span>
                        <span className="text-[10px] text-stone-300 font-mono">
                          MOQ: {product.moq} pcs
                        </span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => setActiveProduct(product)}
                      className="p-2 rounded-xl bg-white hover:bg-amber-400 text-stone-900 hover:text-stone-950 transition shadow-lg shrink-0"
                      title="Inspect Specifications & Pricing"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Full-Width Unsplash-Style Load More Button */}
        {visibleCount < filteredProducts.length && (
          <div className="mt-8 sm:mt-10 w-full">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="w-full py-3 sm:py-3.5 rounded-lg border border-stone-200 hover:border-stone-400 bg-white hover:bg-stone-50 text-stone-600 hover:text-stone-900 text-xs sm:text-sm font-medium transition-all duration-200 shadow-xs flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-stone-500" />
                  <span>Loading...</span>
                </>
              ) : (
                <span>Load more</span>
              )}
            </button>
          </div>
        )}

        {/* Showing All Footer Indicator */}
        {filteredProducts.length > 6 && visibleCount >= filteredProducts.length && (
          <div className="mt-8 flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-50 text-stone-500 text-xs font-medium border border-stone-200/60">
              <Check className="w-3.5 h-3.5 text-stone-400" />
              Showing all {filteredProducts.length} packaging specifications
            </span>
          </div>
        )}

        {/* Empty state if tag has no matches */}
        {filteredProducts.length === 0 && (
          <div className="py-16 text-center text-stone-500">
            <p className="text-sm font-semibold">No packaging formats found for this tag.</p>
            <button
              onClick={() => setSelectedTag('all')}
              className="mt-3 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold"
            >
              Show All Boxes
            </button>
          </div>
        )}

      </div>

      {/* Specification & Price Breakdown Modal */}
      <CategoryModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </section>
  );
}
