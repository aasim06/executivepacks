import { PackagingProduct } from '@/data/categories';

export interface B2BOrder {
  id: string;
  createdAt: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
  country: string;
  productId: string;
  productName: string;
  quantity: number;
  dimensions: string;
  finish: 'kraft' | 'black' | 'white' | 'goldfoil';
  unitPrice: number;
  totalAmount: number;
  status: 'Pending CAD Proof' | 'In Production' | 'Dispatched' | 'Delivered' | 'Cancelled';
  paymentStatus: '50% Advance Confirmed' | 'Paid in Full' | 'Sample Kit ($15)';
  artworkName?: string;
  artworkPreview?: string;
  notes?: string;
}

export interface CustomerInquiry {
  id: string;
  date: string;
  clientName: string;
  company: string;
  phone: string;
  email: string;
  boxCategory: string;
  quantityNeeded: string;
  status: 'New' | 'Quote Sent' | 'Follow Up' | 'Closed';
  notes: string;
}

export interface PlatformConfig {
  companyName: string;
  brandTagline: string;
  salesPhone: string;
  whatsappNumber: string;
  supportEmail: string;
  factoryAddress: string;
  sampleKitPrice: number;
  turnaroundDays: string;
  announcementNotice: string;
}

export interface AIAgentConfig {
  agentName: string;
  tone: 'professional' | 'friendly-bilingual' | 'direct-engineer';
  leadTimeNotice: string;
  moqRule: number;
  customPromoText: string;
  enableVoice: boolean;
}
