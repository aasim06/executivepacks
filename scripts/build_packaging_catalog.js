const fs = require('fs');

const extracted = JSON.parse(fs.readFileSync('scripts/all_extracted_cards.json', 'utf8'));

// Helper to slugify
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Generate smart metadata based on title and category
function generateMetadata(title, rawCategory) {
  const lower = title.toLowerCase();
  
  let category = 'custom-boxes';
  let categoryLabel = 'Retail & Custom Boxes';
  let badge = 'Custom Printed';
  let badgeColor = 'bg-stone-100 text-stone-800 border-stone-300';
  let moq = 250;
  let startingPrice = '$0.45 / unit';
  let materials = ['350 GSM Bleached SBS Cardstock', 'Eco-Friendly Soy Inks', 'Matte / Gloss Coating'];
  let features = ['Custom die-cut sizing', 'CMYK full color printing', 'Flat shipping for low freight cost'];
  let standardDim = '200mm × 150mm × 80mm';

  if (lower.includes('food') || lower.includes('cereal') || lower.includes('burger') || lower.includes('sandwich') || lower.includes('cake') || lower.includes('pie') || lower.includes('donut') || lower.includes('pizza') || lower.includes('candy') || lower.includes('chocolate') || lower.includes('bakery') || lower.includes('coffee') || lower.includes('ice cream') || lower.includes('lollipop')) {
    category = 'food-bakery';
    categoryLabel = 'Food & Bakery';
    badge = '100% Food-Grade Certified';
    badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    moq = 250;
    startingPrice = '$0.38 / unit';
    materials = ['Food-Grade Virgin Kraft', 'Grease-Resistant Inner Barrier', 'Non-Toxic Soy Inks'];
    features = ['FDA approved food-safe barrier', 'Oil & moisture resistant', 'Easy-assembly crash lock base'];
    standardDim = lower.includes('pizza') ? '320mm × 320mm × 45mm' : lower.includes('cake') ? '250mm × 250mm × 150mm' : '220mm × 140mm × 90mm';
  } else if (lower.includes('cosmetic') || lower.includes('soap') || lower.includes('lip') || lower.includes('eyelash') || lower.includes('bath bomb') || lower.includes('perfume') || lower.includes('serum') || lower.includes('beard oil')) {
    category = 'cosmetics';
    categoryLabel = 'Cosmetics & Beauty';
    badge = 'Luxury Retail Grade';
    badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';
    moq = 200;
    startingPrice = '$0.48 / unit';
    materials = ['380 GSM Ivory Board / SBS', 'Metallic Foil Accent', 'Soft-Touch Velvet Lamination'];
    features = ['Scratch-resistant velvet matte', 'Gold / Silver hot foil stamping', 'Embossed / Debossed logo ready'];
    standardDim = lower.includes('lipstick') || lower.includes('lip balm') ? '25mm × 25mm × 80mm' : lower.includes('perfume') ? '75mm × 75mm × 140mm' : '100mm × 70mm × 40mm';
  } else if (lower.includes('apparel') || lower.includes('shirt') || lower.includes('tie') || lower.includes('socks') || lower.includes('lingerie') || lower.includes('belt') || lower.includes('shoe') || lower.includes('sunglasses')) {
    category = 'apparel';
    categoryLabel = 'Apparel & Fashion';
    badge = 'Premium Fashion Grade';
    badgeColor = 'bg-indigo-100 text-indigo-800 border-indigo-300';
    moq = 150;
    startingPrice = '$0.85 / unit';
    materials = ['450 GSM Heavy Duplex / Kraft Board', 'Anti-Scuff Lamination', 'Tissue Paper Lining'];
    features = ['Two-piece lid & base setup', 'High-end apparel presentation', 'Sturdy structural sidewalls'];
    standardDim = lower.includes('shoe') ? '340mm × 200mm × 120mm' : lower.includes('shirt') ? '360mm × 260mm × 60mm' : '180mm × 120mm × 60mm';
  } else if (lower.includes('rigid') || lower.includes('gift') || lower.includes('presentation') || lower.includes('slide') || lower.includes('flip') || lower.includes('setup')) {
    category = 'rigid-luxury';
    categoryLabel = 'Rigid Luxury & Gift';
    badge = '1400 GSM Handcrafted Rigid';
    badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
    moq = 100;
    startingPrice = '$1.65 / unit';
    materials = ['1400 GSM Heavy Greyboard Core', 'Art Paper / Specialty Linen Wrap', 'Precision Cut EVA Foam Insert'];
    features = ['Rigid non-collapsible build', 'Magnetic snap / Ribbon pull tab', 'Bespoke custom die-cut cavity'];
    standardDim = '260mm × 180mm × 70mm';
  } else if (lower.includes('mailer') || lower.includes('shipping') || lower.includes('corrugated')) {
    category = 'shipping-mailers';
    categoryLabel = 'Shipping & Mailers';
    badge = 'Drop-Tested Corrugated (32 ECT)';
    badgeColor = 'bg-blue-100 text-blue-800 border-blue-300';
    moq = 100;
    startingPrice = '$0.65 / unit';
    materials = ['E-Flute / B-Flute Corrugated Board', 'Kraft / Bleached White Top Liner', 'Crush-Resistant Fluting'];
    features = ['Roll-end tuck-front design', 'Double-wall crush protection', 'Inside & outside CMYK printing'];
    standardDim = '300mm × 220mm × 80mm';
  } else if (lower.includes('mylar') || lower.includes('bag') || lower.includes('pouch') || lower.includes('vacuum') || lower.includes('ziplock')) {
    category = 'mylar-bags';
    categoryLabel = 'Mylar Barrier Pouches';
    badge = 'Airtight Smell-Proof Barrier';
    badgeColor = 'bg-purple-100 text-purple-800 border-purple-300';
    moq = 500;
    startingPrice = '$0.22 / unit';
    materials = ['Multi-Layer Aluminum Foil / PET / PE', 'Matte Holographic Finish', 'Heavy-Duty Resealable Zipper'];
    features = ['100% smell-proof & moisture barrier', 'Heat-sealable tear notch', 'Holographic / Spot UV metallic options'];
    standardDim = '100mm (W) × 150mm (H) + 30mm Bottom Gusset';
  } else if (lower.includes('kraft')) {
    category = 'shipping-mailers';
    categoryLabel = 'Eco Kraft Boxes';
    badge = '100% Recycled Kraft';
    badgeColor = 'bg-stone-200 text-stone-900 border-stone-400';
    moq = 200;
    startingPrice = '$0.42 / unit';
    materials = ['100% Recycled Brown Kraft', 'Organic Water-Based Inks'];
    features = ['Biodegradable & compostable', 'Rustic organic aesthetic', 'High tensile tear resistance'];
    standardDim = '200mm × 150mm × 70mm';
  }

  const cleanName = title.replace(/^Custom\s+/i, '');
  const tagline = `Wholesale custom manufactured ${cleanName.toLowerCase()} with bespoke finishes and tailored branding.`;
  const description = `Engineered for brand impact and transit durability. Custom manufactured to your exact product dimensions with premium offset printing, protective coating, and factory-direct pricing.`;

  const unitP = parseFloat(startingPrice.replace(/[^0-9.]/g, '')) || 0.50;

  return {
    category,
    categoryLabel,
    tagline,
    description,
    badge,
    badgeColor,
    moq,
    startingPrice,
    leadTime: '5-7 Business Days',
    materials,
    features,
    dimensions: {
      standard: standardDim,
      customizable: true
    },
    pricingTiers: [
      { qty: `${moq} pcs`, unitPrice: `$${(unitP * 1.8).toFixed(2)}` },
      { qty: `${moq * 4} pcs`, unitPrice: `$${(unitP * 1.3).toFixed(2)}`, savings: '28% OFF' },
      { qty: `${moq * 10} pcs`, unitPrice: `$${(unitP * 1.1).toFixed(2)}`, savings: '39% OFF' },
      { qty: `${moq * 20}+ pcs`, unitPrice: startingPrice.split(' ')[0], savings: '52% OFF' }
    ]
  };
}

const products = extracted.map(item => {
  const id = slugify(item.title);
  const meta = generateMetadata(item.title, item.category);

  return {
    id,
    name: item.title,
    category: meta.category,
    categoryLabel: meta.categoryLabel,
    tagline: meta.tagline,
    description: meta.description,
    image: item.primaryImage,
    hoverImage: item.hoverImage || item.primaryImage,
    badge: meta.badge,
    badgeColor: meta.badgeColor,
    moq: meta.moq,
    startingPrice: meta.startingPrice,
    leadTime: meta.leadTime,
    materials: meta.materials,
    features: meta.features,
    dimensions: meta.dimensions,
    pricingTiers: meta.pricingTiers
  };
});

console.log('Built product list with length:', products.length);

// Generate TypeScript file
const fileContent = `export interface PackagingProduct {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  tagline: string;
  description: string;
  image: string;
  hoverImage?: string;
  badge: string;
  badgeColor: string;
  moq: number;
  startingPrice: string;
  leadTime: string;
  materials: string[];
  features: string[];
  dimensions: {
    standard: string;
    customizable: boolean;
  };
  pricingTiers: {
    qty: string;
    unitPrice: string;
    savings?: string;
  }[];
}

export const CATEGORIES_LIST = [
  { id: 'all', label: 'All Packaging' },
  { id: 'food-bakery', label: 'Food & Bakery' },
  { id: 'cosmetics', label: 'Cosmetics & Beauty' },
  { id: 'apparel', label: 'Apparel & Fashion' },
  { id: 'rigid-luxury', label: 'Rigid Luxury & Gift' },
  { id: 'shipping-mailers', label: 'Mailers & Corrugated' },
  { id: 'mylar-bags', label: 'Mylar Bags & Pouches' },
  { id: 'custom-boxes', label: 'Retail & Display' },
] as const;

export const PACKAGING_PRODUCTS: PackagingProduct[] = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync('data/categories.ts', fileContent, 'utf8');
console.log('Successfully written data/categories.ts');
