import { B2BOrder, CustomerInquiry, PlatformConfig, AIAgentConfig } from '@/types/admin';
import { PACKAGING_PRODUCTS, PackagingProduct } from '@/data/categories';

export const INITIAL_ORDERS: B2BOrder[] = [
  {
    id: 'EP-2026-89104',
    createdAt: '2026-11-08 18:30',
    company: 'Karachi Confectionery & Bakers Ltd',
    contactName: 'Tariq Mehmood',
    email: 'tariq@karachibakers.com.pk',
    phone: '+92 321 8847291',
    shippingAddress: 'Plot 42, Korangi Industrial Area',
    city: 'Karachi',
    country: 'Pakistan',
    productId: 'gable-takeout-box',
    productName: 'Auto-Bottom Gable Carry Box',
    quantity: 5000,
    dimensions: '240mm (L) × 150mm (W) × 220mm (H)',
    finish: 'goldfoil',
    unitPrice: 0.46,
    totalAmount: 2300,
    status: 'In Production',
    paymentStatus: '50% Advance Confirmed',
    artworkName: 'karachi_bakers_crest_gold.svg',
    notes: 'Urgent catering delivery batch. Food-grade inner barrier required.',
  },
  {
    id: 'EP-2026-87412',
    createdAt: '2026-11-08 14:15',
    company: 'Lahore Luxury Apparel Co',
    contactName: 'Hamza Farooq',
    email: 'h.farooq@lahoreapparel.com',
    phone: '+92 300 4529103',
    shippingAddress: 'MM Alam Road, Gulberg III',
    city: 'Lahore',
    country: 'Pakistan',
    productId: 'corrugated-mailer-box',
    productName: 'Roll-End Kraft Mailer Box',
    quantity: 2500,
    dimensions: '320mm × 240mm × 80mm',
    finish: 'black',
    unitPrice: 0.58,
    totalAmount: 1450,
    status: 'Pending CAD Proof',
    paymentStatus: '50% Advance Confirmed',
    artworkName: 'brand_monogram_black.ai',
    notes: 'Awaiting client confirmation on 1:1 dieline fold line proof.',
  },
  {
    id: 'EP-2026-85119',
    createdAt: '2026-11-07 11:20',
    company: 'Capital Organic Farms & Hampers',
    contactName: 'Saima Khan',
    email: 'orders@capitalfarms.pk',
    phone: '+92 333 5192840',
    shippingAddress: 'Sector F-7/2, Street 18',
    city: 'Islamabad',
    country: 'Pakistan',
    productId: 'artisan-pine-crate',
    productName: 'Artisan Solid Pine Crate',
    quantity: 250,
    dimensions: '350mm × 250mm × 140mm',
    finish: 'kraft',
    unitPrice: 4.80,
    totalAmount: 1200,
    status: 'Dispatched',
    paymentStatus: 'Paid in Full',
    artworkName: 'organic_farms_laser_burn.png',
    notes: 'Dry fruit gift hampers for diplomatic corporate gifting.',
  },
  {
    id: 'EP-2026-82901',
    createdAt: '2026-11-06 09:40',
    company: 'National Cold Chain Pharma',
    contactName: 'Dr. Zulfiqar Ali',
    email: 'procurement@nationalpharma.org',
    phone: '+92 345 9012384',
    shippingAddress: 'Westridge Industrial Estate',
    city: 'Rawalpindi',
    country: 'Pakistan',
    productId: 'thermocool-box',
    productName: 'ThermoCool EPS Insulation Box',
    quantity: 1000,
    dimensions: '400mm × 300mm × 260mm',
    finish: 'white',
    unitPrice: 2.70,
    totalAmount: 2700,
    status: 'Delivered',
    paymentStatus: 'Paid in Full',
    notes: 'Inspected upon delivery: -20C cold barrier seal certified.',
  },
  {
    id: 'EP-2026-81045',
    createdAt: '2026-11-05 16:05',
    company: 'Oud & Amber Attar Studio',
    contactName: 'Bilal Siddiqui',
    email: 'bilal@oudstudio.ae',
    phone: '+92 301 7728194',
    shippingAddress: 'Clifton Block 4',
    city: 'Karachi',
    country: 'Pakistan',
    productId: 'rigid-cylinder-tube',
    productName: 'Rigid Cylinder Tube with Foam Insert',
    quantity: 500,
    dimensions: '85mm (Dia) × 160mm (H)',
    finish: 'goldfoil',
    unitPrice: 1.65,
    totalAmount: 825,
    status: 'In Production',
    paymentStatus: '50% Advance Confirmed',
    artworkName: 'gold_crest_cylinder.pdf',
    notes: 'High-density EVA foam cutout custom tailored for 100ml perfume bottle.',
  },
];

export const INITIAL_INQUIRIES: CustomerInquiry[] = [
  {
    id: 'INQ-101',
    date: '2026-11-08',
    clientName: 'Rehan Qureshi',
    company: 'Qureshi Sweets & Bakers',
    phone: '+92 300 1192834',
    email: 'rehan@qureshisweets.com',
    boxCategory: 'Bakery & Cake Boxes',
    quantityNeeded: '10,000 pcs monthly',
    status: 'Quote Sent',
    notes: 'Wants grease-proof clear window boxes for mithai and cakes.',
  },
  {
    id: 'INQ-102',
    date: '2026-11-08',
    clientName: 'Ayesha Malik',
    company: 'Velvet Pret Wear',
    phone: '+92 321 4402918',
    email: 'ayesha@velvetpret.com',
    boxCategory: 'E-Commerce Mailers',
    quantityNeeded: '3,000 pcs',
    status: 'New',
    notes: 'Inquired via AI Agent about black foil stamped apparel boxes.',
  },
  {
    id: 'INQ-103',
    date: '2026-11-07',
    clientName: 'Salman Haider',
    company: 'Indus Valley Agro',
    phone: '+92 333 7712349',
    email: 'salman@indusagro.pk',
    boxCategory: 'Heavy Shipping Cartons',
    quantityNeeded: '500 export cartons',
    status: 'Follow Up',
    notes: 'Needs 5-ply double wall corrugated board drop-tested for freight cargo.',
  },
];

export const INITIAL_CONFIG: PlatformConfig = {
  companyName: 'Executive Packs',
  brandTagline: 'Industrial Custom Packaging Manufacturer',
  salesPhone: '+1 (800) 572-3872',
  whatsappNumber: '923001234567',
  supportEmail: 'orders@executivepacks.com',
  factoryAddress: 'Industrial Zone, Sector 7-A, EPZ / Export Hub',
  sampleKitPrice: 15,
  turnaroundDays: '5 to 7 Business Days',
  announcementNotice: 'Direct Factory Pricing • Minimum Order Starts at 50 pcs • Fast 5-Day Dispatch',
};

export const INITIAL_AI_CONFIG: AIAgentConfig = {
  agentName: 'Executive Packs AI',
  tone: 'professional',
  leadTimeNotice: '5 to 7 business days',
  moqRule: 50,
  customPromoText: 'Free 1:1 CAD dieline proof included with every wholesale order.',
  enableVoice: true,
};

// Storage keys
export const STORAGE_KEYS = {
  ORDERS: 'executive_b2b_orders_v1',
  PRODUCTS: 'executive_catalog_products_v2',
  INQUIRIES: 'executive_inquiries_v1',
  CONFIG: 'executive_platform_config_v1',
  AI_CONFIG: 'executive_ai_agent_config_v1',
};

export const CATEGORY_LABELS: Record<string, string> = {
  'food-bakery': 'Food & Bakery',
  'cosmetics': 'Cosmetics & Beauty',
  'apparel': 'Apparel & Fashion',
  'rigid-luxury': 'Rigid Luxury & Gift',
  'shipping-mailers': 'Mailers & Corrugated',
  'mylar-bags': 'Mylar Bags & Pouches',
  'custom-boxes': 'Retail & Custom Boxes',
  'home-kitchen': 'Home & Kitchen',
  'ecommerce': 'E-Commerce Mailers',
  'cartons': 'Heavy Carton Boxes',
  'jars-bottles': 'Jars & Bottles',
  'wooden': 'Wooden Baskets',
  'thermocool': 'ThermoCool Insulation',
};

export function getStoredProducts(): PackagingProduct[] {
  if (typeof window === 'undefined') return PACKAGING_PRODUCTS;
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load stored products:', e);
  }
  return PACKAGING_PRODUCTS;
}
