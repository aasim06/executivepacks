import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryModal from '@/components/CategoryModal';
import { CATEGORIES_META } from '@/data/categoriesMeta';
import { PACKAGING_PRODUCTS, PackagingProduct } from '@/data/categories';
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
  Sliders
} from 'lucide-react';
import CategoryDetailClient from './CategoryDetailClient';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const meta = CATEGORIES_META[slug];
  
  if (!meta) {
    // Check if it's a product
    const prod = PACKAGING_PRODUCTS.find(p => p.id === slug);
    if (prod) {
      return {
        title: `${prod.name} Wholesale | Executive Packs`,
        description: prod.tagline || prod.description,
      };
    }
    return {
      title: 'Packaging Category | Executive Packs',
    };
  }

  return {
    title: meta.metaTitle,
    description: meta.metaDescription,
  };
}

export default async function DynamicCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const meta = CATEGORIES_META[slug];

  // If slug is not in CATEGORIES_META, check if it's a single product
  if (!meta) {
    const matchedProduct = PACKAGING_PRODUCTS.find(p => p.id === slug);
    if (matchedProduct) {
      // Find related products
      const related = PACKAGING_PRODUCTS.filter(p => p.category === matchedProduct.category && p.id !== matchedProduct.id).slice(0, 6);
      return (
        <CategoryDetailClient 
          isSingleProduct={true}
          product={matchedProduct}
          relatedProducts={related}
        />
      );
    }
    notFound();
  }

  // Filter matching products for this category
  let matchedProducts: PackagingProduct[] = [];

  if (meta.targetFilter === 'all') {
    matchedProducts = PACKAGING_PRODUCTS;
  } else if (meta.targetFilter === 'printing') {
    // For printing items, show related luxury / custom printed products
    matchedProducts = PACKAGING_PRODUCTS.filter(p => 
      p.category === 'rigid-luxury' || p.category === 'custom-boxes'
    ).slice(0, 8);
  } else {
    // Match by target category or keywords
    matchedProducts = PACKAGING_PRODUCTS.filter(p => {
      if (p.category === meta.targetFilter) return true;
      const lowerName = p.name.toLowerCase();
      return meta.keywords.some(k => lowerName.includes(k));
    });

    // If fewer than 4 items, supplement with category
    if (matchedProducts.length < 4) {
      const fallback = PACKAGING_PRODUCTS.filter(p => p.category === meta.targetFilter);
      matchedProducts = Array.from(new Set([...matchedProducts, ...fallback]));
    }
  }

  return (
    <CategoryDetailClient 
      isSingleProduct={false}
      categoryMeta={meta}
      products={matchedProducts}
    />
  );
}
