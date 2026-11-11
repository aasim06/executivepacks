'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, 
  Sparkles, 
  ShieldCheck, 
  Menu, 
  X, 
  Phone, 
  ArrowRight,
  UtensilsCrossed,
  Cake,
  Gift,
  Package,
  Crown,
  Gem,
  Droplet,
  ShoppingBag,
  Shirt,
  Mail,
  Truck,
  Layers,
  HeartPulse,
  Cpu,
  Sparkle,
  Grid,
  Archive,
  Shapes,
  Box,
  Eye,
  BookOpen,
  Newspaper,
  Tag,
  Heart,
  CreditCard,
  FileText,
  BadgeCheck,
  CheckCircle2
} from 'lucide-react';

// ==========================================
// 1. CUSTOM PACKAGING MENU DATA (Image 1)
// ==========================================
const CUSTOM_PACKAGING_ITEMS = [
  // Red-boxed / highlighted by client
  {
    name: 'Custom Food Packaging',
    category: 'food-bakery',
    productId: 'custom-frozen-food-boxes',
    icon: UtensilsCrossed,
    isFeatured: true,
    badgeText: 'Featured',
  },
  {
    name: 'Custom Bakery Boxes',
    category: 'food-bakery',
    productId: 'custom-cake-boxes',
    icon: Cake,
    isFeatured: true,
    badgeText: 'Popular',
  },
  {
    name: 'Custom Cosmetic Boxes',
    category: 'cosmetics',
    productId: 'custom-lipstick-boxes',
    icon: Sparkles,
    isFeatured: true,
    badgeText: 'Featured',
  },
  {
    name: 'Custom Perfume Boxes',
    category: 'cosmetics',
    productId: 'custom-perfume-boxes',
    icon: Droplet,
    isFeatured: true,
    badgeText: 'Popular',
  },
  {
    name: 'Custom Rigid Boxes',
    category: 'rigid-luxury',
    productId: 'custom-rigid-setup-boxes',
    icon: Package,
    isFeatured: true,
    badgeText: 'Luxury',
  },
  {
    name: 'Custom Luxury Packaging',
    category: 'rigid-luxury',
    productId: 'custom-presentation-boxes',
    icon: Crown,
    isFeatured: true,
    badgeText: 'Premium',
  },
  {
    name: 'Custom Jewellery Packaging',
    category: 'rigid-luxury',
    productId: 'custom-rigid-slide-boxes',
    icon: Gem,
    isFeatured: true,
    badgeText: 'High-End',
  },
  {
    name: 'Custom Gift Boxes',
    category: 'rigid-luxury',
    productId: 'custom-rigid-gift-boxes',
    icon: Gift,
    isFeatured: true,
    badgeText: 'Bestseller',
  },
  {
    name: 'Custom Printed Boxes',
    category: 'all',
    productId: 'custom-kraft-boxes',
    icon: Box,
    isFeatured: true,
    badgeText: 'Wholesale',
  },

  // Additional categories from Image 1
  {
    name: 'Custom Retail Boxes',
    category: 'custom-boxes',
    productId: 'custom-display-boxes',
    icon: ShoppingBag,
  },
  {
    name: 'Custom Apparel Boxes',
    category: 'apparel',
    productId: 'custom-t-shirt-boxes',
    icon: Shirt,
  },
  {
    name: 'Custom Mailer Packaging',
    category: 'shipping-mailers',
    productId: 'custom-mailer-boxes',
    icon: Mail,
  },
  {
    name: 'Custom Cereal Packaging',
    category: 'food-bakery',
    productId: 'custom-cereal-boxes',
    icon: Box,
  },
  {
    name: 'Custom Shipping Packaging',
    category: 'shipping-mailers',
    productId: 'custom-corrugated-boxes',
    icon: Truck,
  },
  {
    name: 'Custom Metalized Boxes',
    category: 'rigid-luxury',
    productId: 'custom-presentation-boxes',
    icon: Layers,
  },
  {
    name: 'Custom Pharma Packaging',
    category: 'custom-boxes',
    productId: 'custom-soap-boxes',
    icon: HeartPulse,
  },
  {
    name: 'Custom Electronics Packaging',
    category: 'custom-boxes',
    productId: 'custom-two-piece-rigid-boxes',
    icon: Cpu,
  },
  {
    name: 'Custom Soap Packaging',
    category: 'cosmetics',
    productId: 'custom-soap-boxes',
    icon: Sparkle,
  },
  {
    name: 'Custom Packaging Inserts',
    category: 'rigid-luxury',
    productId: 'custom-rigid-boxes-with-inserts',
    icon: Grid,
  },
];

// ==========================================
// 2. BOX BY STYLE MENU DATA (Image 2)
// (Excluding CD Covers Packaging as marked with red ❌)
// ==========================================
const BOX_BY_STYLE_ITEMS = [
  {
    name: 'Custom Gable Packaging',
    desc: 'Handle-top takeout, bakery & gift carrier',
    productId: 'gable-takeout-box',
    icon: Archive,
    category: 'food-bakery',
  },
  {
    name: 'Bottom Closure',
    desc: 'Auto-lock bottom & 1-2-3 snap bottom security cartons',
    productId: 'custom-frozen-food-boxes',
    icon: Box,
    category: 'custom-boxes',
  },
  {
    name: 'Figure & Pattern Packaging',
    desc: 'Custom geometric cuts, pyramid, pillow & sleeve shapes',
    productId: 'custom-pyramid-boxes',
    icon: Shapes,
    category: 'custom-boxes',
  },
  {
    name: 'Fold & Assemble Packaging',
    desc: 'Roll-end tuck front, flat-packed assembly boxes',
    productId: 'custom-mailer-boxes',
    icon: Layers,
    category: 'shipping-mailers',
  },
  {
    name: 'Rectangular Boxes',
    desc: 'Standard straight-tuck & reverse-tuck product cartons',
    productId: 'custom-kraft-boxes',
    icon: Box,
    category: 'all',
  },
  {
    name: 'Showcase Exhibit Packaging',
    desc: 'Die-cut clear display windows & counter POP stands',
    productId: 'custom-display-boxes',
    icon: Eye,
    category: 'custom-boxes',
  },
  {
    name: 'Top Closure Packaging',
    desc: 'Friction-fit lid, flip-top & roll-over magnetic flaps',
    productId: 'custom-flip-top-boxes',
    icon: Package,
    category: 'rigid-luxury',
  },
  {
    name: 'Custom Mailer Packaging',
    desc: 'Heavy-duty corrugated e-commerce subscription box',
    productId: 'custom-mailer-boxes',
    icon: Mail,
    category: 'shipping-mailers',
  },
];

// ==========================================
// 3. CUSTOM PRINTING MENU DATA (Image 3)
// (Includes client's handwritten list + Stickers and Labels.
//  Excludes Custom Mylar Bags ❌ & Custom Printed Papers ❌)
// ==========================================
const CUSTOM_PRINTING_ITEMS = [
  {
    name: 'Albums',
    desc: 'Hardcover photo books, portfolio & presentation binders',
    icon: BookOpen,
    category: 'printing',
  },
  {
    name: 'Magazine Fashion',
    desc: 'Saddle-stitched & perfect-bound fashion catalogues & lookbooks',
    icon: Newspaper,
    category: 'printing',
  },
  {
    name: 'Inlays & Inserts',
    desc: 'Custom die-cut cardboard & high-density EVA foam inlays',
    icon: Grid,
    category: 'rigid-luxury',
  },
  {
    name: 'Tag Cards',
    desc: 'Apparel hang tags, merchandise header cards & price tags',
    icon: Tag,
    category: 'printing',
  },
  {
    name: 'Wedding Cards',
    desc: 'Luxury foil-stamped, embossed & laser-cut wedding suites',
    icon: Heart,
    category: 'printing',
  },
  {
    name: 'Visiting Cards',
    desc: 'Premium business cards, velvet touch lamination & raised foil',
    icon: CreditCard,
    category: 'printing',
  },
  {
    name: 'Letterhead & Stationery',
    desc: 'Corporate B2B letterheads, envelopes, folders & invoices',
    icon: FileText,
    category: 'printing',
  },
  {
    name: 'Stickers and Labels',
    desc: 'Waterproof vinyl roll labels, die-cut decals & product seals',
    icon: BadgeCheck,
    category: 'printing',
  },
];

// ==========================================
// 4. PACKAGING MATERIALS MENU DATA
// ==========================================
const PACKAGING_MATERIALS_ITEMS = [
  {
    name: 'Recycled Eco Kraft Board',
    desc: '100% Recyclable virgin brown unbleached kraft paperboard',
    icon: Layers,
    badge: '100% Eco',
  },
  {
    name: 'Corrugated Fluting',
    desc: 'Single-wall E/B Flute & heavy-duty 5-ply double-wall cartons',
    icon: Package,
    badge: 'High Strength',
  },
  {
    name: 'Rigid Setup Greyboard',
    desc: '1.5mm - 3.0mm luxury dense chipboard for rigid setup boxes',
    icon: Box,
    badge: 'Luxury Grade',
  },
  {
    name: 'Bleached Virgin SBS Board',
    desc: 'Ultra-white coated ivory board for high-fidelity color printing',
    icon: Sparkles,
    badge: 'Vivid Print',
  },
  {
    name: 'Metallic Hot Foil & Foilboard',
    desc: 'Reflective gold, silver, copper & holographic hot stamp foil',
    icon: Crown,
    badge: 'Metallic',
  },
  {
    name: 'Clear Window PVC / PET Film',
    desc: 'Food-grade high-clarity transparent product display film',
    icon: Eye,
    badge: 'Clarity',
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'packaging' | 'style' | 'printing' | 'materials' | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<'packaging' | 'style' | 'printing' | 'materials' | null>(null);

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (name: 'packaging' | 'style' | 'printing' | 'materials') => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleItemClick = (category?: string, productId?: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);

    if (typeof window !== 'undefined') {
      if (productId) {
        window.dispatchEvent(new CustomEvent('open_product_modal', { detail: productId }));
      } else if (category) {
        window.dispatchEvent(new CustomEvent('select_packaging_category', { detail: category }));
      }
    }
  };

  // Close dropdown on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-300 text-[10px] sm:text-[11px] py-1.5 px-3 text-center font-semibold border-b border-stone-800 tracking-wide overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2 mx-auto sm:mx-0 truncate">
            <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="truncate">
              From Impact to Intact • 42 Yrs Excellence • No MOQ Limit • Pakistan Nationwide Delivery
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-stone-400 font-medium shrink-0">
            <span>FSC® Certified</span>
            <span>•</span>
            <span>ISO 9001:2015</span>
            <span>•</span>
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Free Dieline Mockup
            </span>
          </div>
        </div>
      </div>

      {/* Main Sleek Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#faf8f5]/95 backdrop-blur-xl border-b border-stone-200/90 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4 relative">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0 group hover:opacity-90 transition" title="Executive Packs Home">
            <span className="font-extrabold text-base sm:text-xl tracking-tight text-stone-900 uppercase whitespace-nowrap">
              EXECUTIVE <span className="text-amber-800">PACKS</span>
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-100/90 text-amber-900 border border-amber-200 uppercase">
              B2B
            </span>
          </Link>

          {/* Desktop Navigation Links with Interactive Dropdowns */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-[12px] xl:text-[13px] font-bold text-stone-700">
            
            {/* HOME */}
            <Link 
              href="/" 
              className="px-2.5 xl:px-3 py-1.5 rounded-lg hover:text-amber-800 hover:bg-stone-100/80 transition whitespace-nowrap uppercase tracking-wider"
            >
              Home
            </Link>

            {/* 1. CUSTOM PACKAGING (Mega Menu) */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('packaging')}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'packaging' ? null : 'packaging')}
                className={`px-2.5 xl:px-3 py-1.5 rounded-lg transition flex items-center gap-1 whitespace-nowrap uppercase tracking-wider ${
                  activeDropdown === 'packaging' ? 'text-amber-900 bg-amber-50/80' : 'hover:text-amber-800 hover:bg-stone-100/80'
                }`}
              >
                <span>Custom Packaging</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${
                  activeDropdown === 'packaging' ? 'rotate-180 text-amber-800' : ''
                }`} />
              </button>

              {/* Mega Dropdown Panel */}
              {activeDropdown === 'packaging' && (
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-[840px] max-w-[94vw] animate-fade-in"
                  onMouseEnter={() => handleMouseEnter('packaging')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 overflow-hidden">
                    
                    {/* Header inside Mega Dropdown */}
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 uppercase">
                            B2B Wholesale
                          </span>
                          <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
                            OUR PACKAGING YOUR BRANDING
                          </h3>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          High-impact bespoke packaging boxes custom manufactured for your industry.
                        </p>
                      </div>

                      <a
                        href="/#categories-section"
                        onClick={() => handleItemClick('all')}
                        className="text-xs font-bold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1 group shrink-0"
                      >
                        <span>View All 55+ Boxes</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                      </a>
                    </div>

                    {/* 3-Column Items Grid */}
                    <div className="grid grid-cols-3 gap-x-4 gap-y-2 max-h-[64vh] overflow-y-auto pr-1">
                      {CUSTOM_PACKAGING_ITEMS.map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                          <a
                            key={idx}
                            href="/#categories-section"
                            onClick={(e) => {
                              e.preventDefault();
                              handleItemClick(item.category, item.productId);
                            }}
                            className={`flex items-center justify-between p-2 rounded-xl transition group ${
                              item.isFeatured 
                                ? 'bg-amber-50/50 hover:bg-amber-100/70 border border-amber-200/60' 
                                : 'hover:bg-stone-50 border border-transparent'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition ${
                                item.isFeatured 
                                  ? 'bg-amber-600 text-white shadow-xs' 
                                  : 'bg-stone-100 text-stone-600 group-hover:bg-stone-200 group-hover:text-stone-900'
                              }`}>
                                <IconComponent className="w-3.5 h-3.5" />
                              </div>
                              <span className={`text-[12px] font-bold truncate transition ${
                                item.isFeatured 
                                  ? 'text-stone-900 group-hover:text-amber-900' 
                                  : 'text-stone-700 group-hover:text-stone-900'
                              }`}>
                                {item.name}
                              </span>
                            </div>

                            {item.isFeatured && (
                              <span className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-amber-200/90 text-amber-900 shrink-0 ml-1">
                                {item.badgeText}
                              </span>
                            )}
                          </a>
                        );
                      })}
                    </div>

                    {/* Bottom Prompt */}
                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Pre-production physical sample box available ($15) with fast delivery.</span>
                      </div>
                      <Link
                        href="/order"
                        onClick={() => setActiveDropdown(null)}
                        className="font-bold text-amber-800 hover:underline"
                      >
                        Direct Factory Order &rarr;
                      </Link>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* 2. BOX BY STYLE (Dropdown) */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('style')}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'style' ? null : 'style')}
                className={`px-2.5 xl:px-3 py-1.5 rounded-lg transition flex items-center gap-1 whitespace-nowrap uppercase tracking-wider ${
                  activeDropdown === 'style' ? 'text-amber-900 bg-amber-50/80' : 'hover:text-amber-800 hover:bg-stone-100/80'
                }`}
              >
                <span>Box By Style</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${
                  activeDropdown === 'style' ? 'rotate-180 text-amber-800' : ''
                }`} />
              </button>

              {/* Box By Style Dropdown Panel */}
              {activeDropdown === 'style' && (
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-[680px] max-w-[94vw] animate-fade-in"
                  onMouseEnter={() => handleMouseEnter('style')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 overflow-hidden">
                    <div className="pb-3 mb-3 border-b border-stone-100 flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider">
                          Structural Box Styles & Dielines
                        </h3>
                        <p className="text-[11px] text-stone-500">
                          Tailor folding mechanisms, closures, and structural rigidity for your products.
                        </p>
                      </div>
                      <span className="text-[10px] font-mono text-stone-400 font-bold">8 STYLES</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {BOX_BY_STYLE_ITEMS.map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                          <a
                            key={idx}
                            href="/#categories-section"
                            onClick={(e) => {
                              e.preventDefault();
                              handleItemClick(item.category, item.productId);
                            }}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-50/60 border border-stone-100 hover:border-amber-200 transition group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-stone-100 group-hover:bg-amber-600 group-hover:text-white text-stone-700 flex items-center justify-center shrink-0 transition">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-stone-900 group-hover:text-amber-900">
                                {item.name}
                              </h4>
                              <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. PACKAGING MATERIALS (Dropdown) */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('materials')}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'materials' ? null : 'materials')}
                className={`px-2.5 xl:px-3 py-1.5 rounded-lg transition flex items-center gap-1 whitespace-nowrap uppercase tracking-wider ${
                  activeDropdown === 'materials' ? 'text-amber-900 bg-amber-50/80' : 'hover:text-amber-800 hover:bg-stone-100/80'
                }`}
              >
                <span>Packaging Materials</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${
                  activeDropdown === 'materials' ? 'rotate-180 text-amber-800' : ''
                }`} />
              </button>

              {/* Packaging Materials Dropdown Panel */}
              {activeDropdown === 'materials' && (
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-[640px] max-w-[94vw] animate-fade-in"
                  onMouseEnter={() => handleMouseEnter('materials')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 overflow-hidden">
                    <div className="pb-3 mb-3 border-b border-stone-100 flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider">
                          FSC-Certified Board Grades & Finishes
                        </h3>
                        <p className="text-[11px] text-stone-500">
                          Virgin, recycled, and luxury cardstock materials engineered for weight and protection.
                        </p>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">100% ECO</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {PACKAGING_MATERIALS_ITEMS.map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                          <div
                            key={idx}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-stone-50 border border-stone-100 transition group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <h4 className="text-xs font-bold text-stone-900">
                                  {item.name}
                                </h4>
                                <span className="text-[8px] font-mono font-bold px-1.5 py-0.2 rounded bg-stone-200/80 text-stone-700">
                                  {item.badge}
                                </span>
                              </div>
                              <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. CUSTOM PRINTING (Dropdown - Image 3) */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('printing')}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'printing' ? null : 'printing')}
                className={`px-2.5 xl:px-3 py-1.5 rounded-lg transition flex items-center gap-1 whitespace-nowrap uppercase tracking-wider ${
                  activeDropdown === 'printing' ? 'text-amber-900 bg-amber-50/80' : 'hover:text-amber-800 hover:bg-stone-100/80'
                }`}
              >
                <span>Custom Printing</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${
                  activeDropdown === 'printing' ? 'rotate-180 text-amber-800' : ''
                }`} />
              </button>

              {/* Custom Printing Dropdown Panel */}
              {activeDropdown === 'printing' && (
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-[680px] max-w-[94vw] animate-fade-in"
                  onMouseEnter={() => handleMouseEnter('printing')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 overflow-hidden">
                    <div className="pb-3 mb-3 border-b border-stone-100 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-900 uppercase">
                            Digital Printing
                          </span>
                          <h3 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider">
                            Commercial & Custom Printing
                          </h3>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          High-resolution digital Indigo & Heidelberg CMYK offset commercial printing.
                        </p>
                      </div>
                      <Link
                        href="/order"
                        onClick={() => setActiveDropdown(null)}
                        className="text-xs font-bold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1"
                      >
                        <span>Print Quote &rarr;</span>
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {CUSTOM_PRINTING_ITEMS.map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                          <Link
                            key={idx}
                            href="/order"
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-50/60 border border-stone-100 hover:border-amber-200 transition group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-stone-100 group-hover:bg-amber-600 group-hover:text-white text-stone-700 flex items-center justify-center shrink-0 transition">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-stone-900 group-hover:text-amber-900">
                                {item.name}
                              </h4>
                              <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. BLOGS */}
            <Link 
              href="/blogs" 
              className="px-2.5 xl:px-3 py-1.5 rounded-lg hover:text-amber-800 hover:bg-stone-100/80 transition whitespace-nowrap uppercase tracking-wider"
            >
              Blogs
            </Link>

          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <a
              href="tel:+18005723872"
              className="hidden 2xl:inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 px-2 py-1.5 transition"
            >
              <Phone className="w-3.5 h-3.5 text-amber-700" />
              <span>(800) 572-3872</span>
            </a>

            <Link
              href="/order"
              className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-stone-900 text-white font-bold text-[11px] sm:text-xs hover:bg-amber-800 transition shadow-xs whitespace-nowrap"
            >
              <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
              <span className="hidden xs:inline sm:inline">Order Sample Kit ($15)</span>
              <span className="xs:hidden sm:hidden">Sample Kit</span>
            </Link>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Accordion Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#faf8f5] border-b border-stone-200 px-4 pt-3 pb-6 space-y-2 text-sm font-bold shadow-xl animate-fade-in max-h-[82vh] overflow-y-auto">
            
            {/* Home Link */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-stone-800 hover:bg-amber-50 hover:text-amber-900 transition"
            >
              Home
            </Link>

            {/* Accordion 1: Custom Packaging */}
            <div className="border border-stone-200 rounded-2xl bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileExpandedSection(mobileExpandedSection === 'packaging' ? null : 'packaging')}
                className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-extrabold text-stone-900 hover:bg-stone-50"
              >
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-amber-700" />
                  <span>CUSTOM PACKAGING (19)</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${
                  mobileExpandedSection === 'packaging' ? 'rotate-180' : ''
                }`} />
              </button>

              {mobileExpandedSection === 'packaging' && (
                <div className="p-2 border-t border-stone-100 bg-stone-50/60 grid grid-cols-1 gap-1">
                  {CUSTOM_PACKAGING_ITEMS.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <a
                        key={idx}
                        href="/#categories-section"
                        onClick={(e) => {
                          e.preventDefault();
                          handleItemClick(item.category, item.productId);
                        }}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-white text-xs font-semibold text-stone-700 transition"
                      >
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-3.5 h-3.5 text-stone-500" />
                          <span>{item.name}</span>
                        </div>
                        {item.isFeatured && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">
                            {item.badgeText}
                          </span>
                        )}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Accordion 2: Box By Style */}
            <div className="border border-stone-200 rounded-2xl bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileExpandedSection(mobileExpandedSection === 'style' ? null : 'style')}
                className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-extrabold text-stone-900 hover:bg-stone-50"
              >
                <div className="flex items-center gap-2">
                  <Archive className="w-4 h-4 text-amber-700" />
                  <span>BOX BY STYLE (8)</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${
                  mobileExpandedSection === 'style' ? 'rotate-180' : ''
                }`} />
              </button>

              {mobileExpandedSection === 'style' && (
                <div className="p-2 border-t border-stone-100 bg-stone-50/60 grid grid-cols-1 gap-1">
                  {BOX_BY_STYLE_ITEMS.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <a
                        key={idx}
                        href="/#categories-section"
                        onClick={(e) => {
                          e.preventDefault();
                          handleItemClick(item.category, item.productId);
                        }}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-white text-xs font-semibold text-stone-700 transition"
                      >
                        <IconComponent className="w-3.5 h-3.5 text-stone-500" />
                        <span>{item.name}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Accordion 3: Custom Printing */}
            <div className="border border-stone-200 rounded-2xl bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileExpandedSection(mobileExpandedSection === 'printing' ? null : 'printing')}
                className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-extrabold text-stone-900 hover:bg-stone-50"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-700" />
                  <span>CUSTOM PRINTING (8)</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${
                  mobileExpandedSection === 'printing' ? 'rotate-180' : ''
                }`} />
              </button>

              {mobileExpandedSection === 'printing' && (
                <div className="p-2 border-t border-stone-100 bg-stone-50/60 grid grid-cols-1 gap-1">
                  {CUSTOM_PRINTING_ITEMS.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={idx}
                        href="/order"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-white text-xs font-semibold text-stone-700 transition"
                      >
                        <IconComponent className="w-3.5 h-3.5 text-stone-500" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Accordion 4: Packaging Materials */}
            <div className="border border-stone-200 rounded-2xl bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileExpandedSection(mobileExpandedSection === 'materials' ? null : 'materials')}
                className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-extrabold text-stone-900 hover:bg-stone-50"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-700" />
                  <span>PACKAGING MATERIALS (6)</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${
                  mobileExpandedSection === 'materials' ? 'rotate-180' : ''
                }`} />
              </button>

              {mobileExpandedSection === 'materials' && (
                <div className="p-2 border-t border-stone-100 bg-stone-50/60 grid grid-cols-1 gap-1">
                  {PACKAGING_MATERIALS_ITEMS.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-white/70 text-xs font-semibold text-stone-700"
                      >
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-3.5 h-3.5 text-stone-500" />
                          <span>{item.name}</span>
                        </div>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                          {item.badge}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Direct Links */}
            <Link
              href="/blogs"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-stone-800 hover:bg-amber-50 hover:text-amber-900 transition"
            >
              Packaging Blogs & Guides
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-stone-800 hover:bg-amber-50 hover:text-amber-900 transition"
            >
              About Us (42 Years of Excellence)
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-amber-900 bg-amber-50 hover:bg-amber-100 font-bold transition"
            >
              Contact & Google Map Location
            </Link>

            <div className="pt-2 border-t border-stone-200">
              <Link
                href="/order"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-stone-900 text-white text-xs font-bold text-center block shadow-sm"
              >
                Order Physical Sample Kit ($15)
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
