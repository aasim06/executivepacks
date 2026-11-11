'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Boxes, 
  Bot, 
  MessageSquare, 
  Settings, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Printer, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ArrowUpRight, 
  Save, 
  RefreshCw, 
  Eye, 
  X, 
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  ChevronDown,
  Layers,
  Send,
  Building,
  UserCheck,
  ArrowRight,
  QrCode,
  Download,
  Copy,
  Check,
  Kanban,
  FileText,
  SlidersHorizontal,
  ChevronRight,
  AlertCircle,
  TrendingUp,
  Activity,
  Factory,
  Bell,
  Calendar,
  DollarSign
} from 'lucide-react';
import BaileysTerminal from '@/components/BaileysTerminal';
import { B2BOrder, CustomerInquiry, PlatformConfig, AIAgentConfig } from '@/types/admin';
import { 
  INITIAL_ORDERS, 
  INITIAL_INQUIRIES, 
  INITIAL_CONFIG, 
  INITIAL_AI_CONFIG, 
  STORAGE_KEYS 
} from '@/lib/adminStore';
import { PACKAGING_PRODUCTS, PackagingProduct } from '@/data/categories';

export default function AdminDashboardPage() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'pipeline' | 'products' | 'ai-agent' | 'inquiries' | 'baileys' | 'settings'>('overview');
  const [currency, setCurrency] = useState<'PKR' | 'USD'>('PKR');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [saveBanner, setSaveBanner] = useState<string | null>(null);

  // Data States
  const [orders, setOrders] = useState<B2BOrder[]>(INITIAL_ORDERS);
  const [products, setProducts] = useState<PackagingProduct[]>(PACKAGING_PRODUCTS);
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(INITIAL_INQUIRIES);
  const [platformConfig, setPlatformConfig] = useState<PlatformConfig>(INITIAL_CONFIG);
  const [aiConfig, setAiConfig] = useState<AIAgentConfig>(INITIAL_AI_CONFIG);

  // Filter & Search States
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');
  const [orderCityFilter, setOrderCityFilter] = useState<string>('All');
  const [stageFilter, setStageFilter] = useState<string | null>(null);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  
  // Modals
  const [selectedOrderForInspect, setSelectedOrderForInspect] = useState<B2BOrder | null>(null);
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<PackagingProduct | null>(null);
  const [isAddingNewProduct, setIsAddingNewProduct] = useState(false);

  // Toast Banner Helper
  const flashToast = (msg: string) => {
    setSaveBanner(msg);
    setTimeout(() => setSaveBanner(null), 3500);
  };

  // Currency Converter (1 USD = 280 PKR for authentic Pakistani enterprise display)
  const formatCurrency = (usdAmount: number) => {
    if (currency === 'PKR') {
      const pkr = Math.round(usdAmount * 280);
      return `Rs. ${pkr.toLocaleString('en-PK')}`;
    }
    return `$${usdAmount.toLocaleString('en-US')}`;
  };

  // Load Persisted Data on Mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
      }

      const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedInquiries = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (savedInquiries) setInquiries(JSON.parse(savedInquiries));

      const savedConfig = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (savedConfig) setPlatformConfig(JSON.parse(savedConfig));

      const savedAIConfig = localStorage.getItem(STORAGE_KEYS.AI_CONFIG);
      if (savedAIConfig) setAiConfig(JSON.parse(savedAIConfig));
    } catch (e) {
      console.error('Error loading admin store from localStorage:', e);
    }
  }, []);

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    flashToast(`Copied ${text} to clipboard`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Order Status Updater
  const handleUpdateOrderStatus = (orderId: string, newStatus: B2BOrder['status']) => {
    const updated = orders.map(ord => ord.id === orderId ? { ...ord, status: newStatus } : ord);
    setOrders(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
    }
    if (selectedOrderForInspect && selectedOrderForInspect.id === orderId) {
      setSelectedOrderForInspect({ ...selectedOrderForInspect, status: newStatus });
    }
    flashToast(`Order #${orderId} moved to: ${newStatus}`);
  };

  // Delete Order
  const handleDeleteOrder = (orderId: string) => {
    if (!confirm(`Are you sure you want to delete order ${orderId}?`)) return;
    const updated = orders.filter(ord => ord.id !== orderId);
    setOrders(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
    }
    setSelectedOrderForInspect(null);
    flashToast(`Order ${orderId} removed from production ledger.`);
  };

  // Product Handlers
  const handleSaveProduct = (prodData: PackagingProduct) => {
    let updated: PackagingProduct[];
    if (isAddingNewProduct) {
      updated = [prodData, ...products];
    } else {
      updated = products.map(p => p.id === prodData.id ? prodData : p);
    }
    setProducts(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    }
    setShowEditProductModal(false);
    setEditingProduct(null);
    flashToast(`Product "${prodData.name}" saved in master catalog.`);
  };

  const handleDeleteProduct = (prodId: string) => {
    if (!confirm('Are you sure you want to remove this packaging line from the catalog?')) return;
    const updated = products.filter(p => p.id !== prodId);
    setProducts(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    }
    flashToast('Product removed from active catalog.');
  };

  // Platform & AI Config Handlers
  const handleSavePlatformConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(platformConfig));
    }
    flashToast('Plant & Platform settings updated successfully.');
  };

  const handleSaveAIConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.AI_CONFIG, JSON.stringify(aiConfig));
    }
    flashToast('AI Agent rules and knowledge base synced.');
  };

  const handleUpdateInquiryStatus = (inqId: string, newStatus: CustomerInquiry['status']) => {
    const updated = inquiries.map(inq => inq.id === inqId ? { ...inq, status: newStatus } : inq);
    setInquiries(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    }
    flashToast(`Lead status updated to: ${newStatus}`);
  };

  // Export Filtered Orders to CSV
  const handleExportCSV = () => {
    const headers = ['Order ID', 'Date', 'Company', 'Contact', 'Phone', 'City', 'Product Line', 'Quantity', 'Finish', 'Total (USD)', 'Status', 'Payment Status'];
    const rows = filteredOrders.map(o => [
      o.id,
      o.createdAt,
      `"${o.company.replace(/"/g, '""')}"`,
      `"${o.contactName.replace(/"/g, '""')}"`,
      o.phone,
      o.city,
      `"${o.productName.replace(/"/g, '""')}"`,
      o.quantity,
      o.finish,
      o.totalAmount,
      o.status,
      o.paymentStatus
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Executive_Packs_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    flashToast('Wholesale Orders CSV Exported Successfully');
  };

  // Computed KPIs
  const kpis = useMemo(() => {
    const totalRevenueUSD = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const inProductionCount = orders.filter(o => o.status === 'In Production').length;
    const pendingCADCount = orders.filter(o => o.status === 'Pending CAD Proof').length;
    const dispatchedCount = orders.filter(o => o.status === 'Dispatched' || o.status === 'Delivered').length;
    const totalPieces = orders.reduce((sum, o) => sum + (o.quantity || 0), 0);
    return {
      totalRevenueUSD,
      totalOrders: orders.length,
      inProductionCount,
      pendingCADCount,
      dispatchedCount,
      totalPieces
    };
  }, [orders]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter(ord => {
      const matchesSearch = 
        ord.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        ord.company.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        ord.contactName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        ord.productName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        ord.city.toLowerCase().includes(orderSearchQuery.toLowerCase());

      const matchesStatus = orderStatusFilter === 'All' || ord.status === orderStatusFilter;
      const matchesCity = orderCityFilter === 'All' || ord.city.toLowerCase() === orderCityFilter.toLowerCase();
      
      let matchesStage = true;
      if (stageFilter) {
        matchesStage = ord.status === stageFilter;
      }

      return matchesSearch && matchesStatus && matchesCity && matchesStage;
    });
  }, [orders, orderSearchQuery, orderStatusFilter, orderCityFilter, stageFilter]);

  // Production Stages Definition
  const PIPELINE_STAGES = [
    {
      step: '01',
      id: 'Pending CAD Proof',
      name: 'CAD Dieline & Proofing',
      subtitle: 'Laser Plotter & 1:1 Sample Approval',
      count: orders.filter(o => o.status === 'Pending CAD Proof').length,
      badgeColor: 'border-sky-500/30 text-sky-400 bg-sky-500/10',
      activeBorder: 'border-sky-500 ring-1 ring-sky-500/50'
    },
    {
      step: '02',
      id: 'Printing',
      name: 'Offset & Flexo Printing',
      subtitle: 'Heidelberg CMYK & Food-Safe Inks',
      count: 0,
      badgeColor: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10',
      activeBorder: 'border-indigo-500 ring-1 ring-indigo-500/50'
    },
    {
      step: '03',
      id: 'In Production',
      name: 'Die-Cutting & Creasing',
      subtitle: 'Bobst Platen Creaser Machine Run',
      count: orders.filter(o => o.status === 'In Production').length,
      badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
      activeBorder: 'border-amber-500 ring-1 ring-amber-500/50'
    },
    {
      step: '04',
      id: 'QC & Pack',
      name: 'QC Burst & Drop Test',
      subtitle: '32 ECT Testing & Bundle Shrink Wrap',
      count: 0,
      badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
      activeBorder: 'border-purple-500 ring-1 ring-purple-500/50'
    },
    {
      step: '05',
      id: 'Dispatched',
      name: 'Nationwide Freight',
      subtitle: 'TCS / Daewoo Cargo Freight Corridor',
      count: orders.filter(o => o.status === 'Dispatched' || o.status === 'Delivered').length,
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      activeBorder: 'border-emerald-500 ring-1 ring-emerald-500/50'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-zinc-100 flex flex-col md:flex-row font-sans selection:bg-amber-500/20 selection:text-amber-300">
      
      {/* Toast Notification */}
      {saveBanner && (
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 text-zinc-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-4 border border-zinc-700/80 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveBanner}</span>
        </div>
      )}

      {/* =========================================================================
          SIDEBAR NAVIGATION (PRECISION INDUSTRIAL DESIGN)
         ========================================================================= */}
      <aside className="w-full md:w-64 bg-[#111215] border-r border-zinc-800/80 p-4 sm:p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo & Corporate Brand */}
          <div className="pb-5 border-b border-zinc-800/70">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-black text-white shadow-lg shadow-amber-900/30 text-sm tracking-wider">
                EP
              </div>
              <div>
                <a href="/" className="font-extrabold text-sm tracking-tight text-white uppercase block leading-tight hover:text-amber-400 transition">
                  EXECUTIVE <span className="text-amber-500">PACKS</span>
                </a>
                <span className="text-[10px] font-mono text-zinc-400 font-semibold tracking-wider block mt-0.5">
                  Est. 1984 • Enterprise ERP
                </span>
              </div>
            </div>

            {/* Quick Live Status Pill */}
            <div className="mt-4 flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800/90 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-zinc-300 font-medium text-[10px]">Plant Unit 1 (Kasur Rd)</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase">ONLINE</span>
            </div>
          </div>

          {/* Back to Website Button */}
          <div className="py-3">
            <a 
              href="/"
              className="flex items-center justify-between text-xs text-zinc-400 hover:text-white px-3 py-2 rounded-xl hover:bg-zinc-850 bg-zinc-900/40 border border-zinc-800/50 transition group"
            >
              <div className="flex items-center gap-2">
                <ArrowLeft className="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-400 transition" />
                <span className="font-medium">Customer Storefront</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">3D Web</span>
            </a>
          </div>

          {/* Grouped Navigation Links */}
          <nav className="space-y-6 mt-2">
            
            {/* GROUP 1: CORE OPERATIONS */}
            <div>
              <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Operations & Batches
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => { setActiveTab('overview'); setStageFilter(null); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition text-left ${
                    activeTab === 'overview'
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold shadow-sm'
                      : 'text-zinc-400 hover:bg-zinc-850 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className={`w-4 h-4 ${activeTab === 'overview' ? 'text-amber-400' : 'text-zinc-400'}`} />
                    <span>Dashboard Overview</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition text-left ${
                    activeTab === 'orders'
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold shadow-sm'
                      : 'text-zinc-400 hover:bg-zinc-850 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ShoppingBag className={`w-4 h-4 ${activeTab === 'orders' ? 'text-amber-400' : 'text-zinc-400'}`} />
                    <span>Orders & Invoices</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-800 text-zinc-300">
                    {orders.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('pipeline')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition text-left ${
                    activeTab === 'pipeline'
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold shadow-sm'
                      : 'text-zinc-400 hover:bg-zinc-850 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Kanban className={`w-4 h-4 ${activeTab === 'pipeline' ? 'text-amber-400' : 'text-zinc-400'}`} />
                    <span>Production Pipeline</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                </button>
              </div>
            </div>

            {/* GROUP 2: INVENTORY & CATALOG */}
            <div>
              <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Catalog & Specs
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition text-left ${
                    activeTab === 'products'
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold shadow-sm'
                      : 'text-zinc-400 hover:bg-zinc-850 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Boxes className={`w-4 h-4 ${activeTab === 'products' ? 'text-amber-400' : 'text-zinc-400'}`} />
                    <span>Packaging Catalog</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-800 text-zinc-300">
                    {products.length}
                  </span>
                </button>
              </div>
            </div>

            {/* GROUP 3: CLIENT RELATIONS & WHATSAPP */}
            <div>
              <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Client Desk & AI
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition text-left ${
                    activeTab === 'inquiries'
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold shadow-sm'
                      : 'text-zinc-400 hover:bg-zinc-850 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className={`w-4 h-4 ${activeTab === 'inquiries' ? 'text-amber-400' : 'text-zinc-400'}`} />
                    <span>WhatsApp CRM Leads</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {inquiries.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('baileys')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition text-left ${
                    activeTab === 'baileys'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold shadow-sm'
                      : 'text-zinc-400 hover:bg-zinc-850 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <QrCode className={`w-4 h-4 ${activeTab === 'baileys' ? 'text-emerald-400' : 'text-zinc-400'}`} />
                    <span>WhatsApp Baileys QR</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    LIVE
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('ai-agent')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition text-left ${
                    activeTab === 'ai-agent'
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold shadow-sm'
                      : 'text-zinc-400 hover:bg-zinc-850 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Bot className={`w-4 h-4 ${activeTab === 'ai-agent' ? 'text-amber-400' : 'text-zinc-400'}`} />
                    <span>AI Agent Settings</span>
                  </div>
                </button>
              </div>
            </div>

            {/* GROUP 4: SETTINGS */}
            <div>
              <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Plant Config
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition text-left ${
                    activeTab === 'settings'
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold shadow-sm'
                      : 'text-zinc-400 hover:bg-zinc-850 hover:text-zinc-200'
                  }`}
                >
                  <Settings className={`w-4 h-4 ${activeTab === 'settings' ? 'text-amber-400' : 'text-zinc-400'}`} />
                  <span>Platform Settings</span>
                </button>
              </div>
            </div>

          </nav>
        </div>

        {/* Sidebar Footer: Plant Specs & Admin Profile */}
        <div className="pt-4 border-t border-zinc-800/70 space-y-3">
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60 text-[11px] space-y-1.5">
            <div className="flex items-center justify-between text-zinc-400 text-[10px] font-mono">
              <span>FACTORY CORRIDOR</span>
              <span className="text-amber-400 font-bold">21 KM KASUR RD</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-zinc-300">
              <span>Machines: 2x Bobst Die Cut</span>
              <span className="text-emerald-400 font-bold">Heidelberg 4C</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
            <div className="w-8 h-8 rounded-lg bg-amber-600/20 border border-amber-500/40 flex items-center justify-center font-bold text-xs text-amber-300">
              MA
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-zinc-100 truncate">Malik Asif</p>
              <p className="text-[10px] text-zinc-400 truncate">Plant Director • Ops Lead</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400" title="Shift Active"></span>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          MAIN APPLICATION WORKSPACE
         ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* =======================================================================
            TOP STICKY APPLICATION APP BAR (METICULOUS HEADER)
           ======================================================================= */}
        <header className="h-16 bg-[#111215]/90 border-b border-zinc-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sticky top-0 z-30 backdrop-blur-md">
          
          {/* Breadcrumb & Context */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 min-w-0">
            <Factory className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="font-semibold text-zinc-300 hidden sm:inline">Executive Packs ERP</span>
            <span className="text-zinc-600 hidden sm:inline">/</span>
            <span className="font-mono text-[11px] text-zinc-400 hidden md:inline">Plant 1 (Lahore)</span>
            <span className="text-zinc-600 hidden md:inline">/</span>
            <span className="font-bold text-white capitalize truncate">{activeTab.replace('-', ' ')}</span>
          </div>

          {/* Center / Right Control Panel */}
          <div className="flex items-center gap-3">
            
            {/* Currency Switcher (PKR vs USD) */}
            <div className="flex items-center p-0.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] font-mono">
              <button
                onClick={() => setCurrency('PKR')}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  currency === 'PKR' 
                    ? 'bg-amber-500 text-stone-950 shadow-sm' 
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Display in Pakistani Rupees (₨)"
              >
                PKR (Rs)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  currency === 'USD' 
                    ? 'bg-amber-500 text-stone-950 shadow-sm' 
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Display in US Dollars ($)"
              >
                USD ($)
              </button>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#141518] border border-zinc-700/80 shadow-2xl p-4 z-50 animate-in fade-in text-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <span className="font-bold text-white uppercase text-[10px] tracking-wider">Plant Alerts (3)</span>
                    <button onClick={() => setShowNotifications(false)} className="text-zinc-500 hover:text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="space-y-2.5">
                    <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
                      <p className="font-bold text-white text-[11px]">EP-2026-87412 • CAD Approved</p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">Lahore Luxury Apparel Co approved 1:1 dieline fold line proof.</p>
                      <span className="text-[9px] text-amber-400 font-mono mt-1 block">15 mins ago</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
                      <p className="font-bold text-white text-[11px]">WhatsApp Inquiry Captured</p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">Bakery client requested quote for 10,000 custom cake carry boxes.</p>
                      <span className="text-[9px] text-emerald-400 font-mono mt-1 block">1 hour ago</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
                      <p className="font-bold text-white text-[11px]">Baileys Gateway Synced</p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">Multi-Device socket connection active and listening for customer inquiries.</p>
                      <span className="text-[9px] text-zinc-500 font-mono mt-1 block">Plant Online</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Primary Action: New Manual Order */}
            <button
              onClick={() => setShowCreateOrderModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-extrabold flex items-center gap-1.5 transition shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Batch Order</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">

          {/* =========================================================================
              TAB 1: DASHBOARD OVERVIEW (METICULOUS INDUSTRIAL REFINEMENT)
             ========================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Top Banner & Quick Controls */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-zinc-800/60">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Manufacturing & Operations Hub
                    </h1>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      LIVE
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    Real-time plant floor monitoring, wholesale volume revenue, and active Pakistan freight dispatches.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleExportCSV}
                    className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-semibold flex items-center gap-1.5 transition"
                    title="Export all orders to CSV"
                  >
                    <Download className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Export Ledger</span>
                  </button>

                  <button
                    onClick={() => flashToast('Real-time factory metrics re-synchronized')}
                    className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition"
                    title="Refresh Data"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 4 ELEVATED INDUSTRIAL KPI METRICS CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Metric 1: Revenue Volume */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-[#16171b] to-[#121316] border border-zinc-800/90 shadow-sm relative overflow-hidden group hover:border-amber-500/30 transition">
                  <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold mb-2">
                    <span className="text-[11px] uppercase tracking-wider text-zinc-400">Gross Wholesale Volume</span>
                    <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-white tracking-tight">
                    {formatCurrency(kpis.totalRevenueUSD)}
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/60 text-[10px]">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>+18.4% vs last cycle</span>
                    </span>
                    <span className="text-zinc-500 font-mono">100% Direct Factory</span>
                  </div>
                </div>

                {/* Metric 2: Active Wholesale Batches */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-[#16171b] to-[#121316] border border-zinc-800/90 shadow-sm relative overflow-hidden group hover:border-sky-500/30 transition">
                  <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold mb-2">
                    <span className="text-[11px] uppercase tracking-wider text-zinc-400">Total Factory Batches</span>
                    <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                      <Boxes className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-white tracking-tight">
                    {kpis.totalOrders} Batches
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/60 text-[10px]">
                    <span className="text-sky-400 font-semibold">
                      {kpis.pendingCADCount} Awaiting CAD Proof
                    </span>
                    <span className="text-zinc-400 font-mono">{kpis.totalPieces.toLocaleString()} pcs</span>
                  </div>
                </div>

                {/* Metric 3: Machine Floor Capacity */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-[#16171b] to-[#121316] border border-zinc-800/90 shadow-sm relative overflow-hidden group hover:border-amber-500/30 transition">
                  <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold mb-2">
                    <span className="text-[11px] uppercase tracking-wider text-zinc-400">In Production Lines</span>
                    <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-amber-400 tracking-tight">
                    {kpis.inProductionCount} Batches
                  </div>
                  <div className="mt-2 pt-2 border-t border-zinc-800/60">
                    <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
                      <span>Floor Capacity: 74%</span>
                      <span className="text-emerald-400 font-semibold">On-Schedule (5-7d)</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '74%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Metric 4: Dispatched Logistics */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-[#16171b] to-[#121316] border border-zinc-800/90 shadow-sm relative overflow-hidden group hover:border-emerald-500/30 transition">
                  <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold mb-2">
                    <span className="text-[11px] uppercase tracking-wider text-zinc-400">Dispatched / Delivered</span>
                    <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <Truck className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-emerald-400 tracking-tight">
                    {kpis.dispatchedCount} Batches
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/60 text-[10px]">
                    <span className="text-emerald-400 font-semibold">TCS / Daewoo Cargo</span>
                    <span className="text-zinc-400 font-mono">Nationwide PK</span>
                  </div>
                </div>

              </div>

              {/* =====================================================================
                  CONNECTED INDUSTRIAL PRODUCTION PIPELINE TRACKER (STEPPER)
                 ===================================================================== */}
              <div className="p-5 rounded-2xl bg-[#141518] border border-zinc-800 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-amber-500" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                      Factory Production Pipeline Stepper
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                    <span>Click any stage below to filter production orders</span>
                    {stageFilter && (
                      <button
                        onClick={() => setStageFilter(null)}
                        className="text-amber-400 hover:underline font-bold ml-1"
                      >
                        (Clear Filter)
                      </button>
                    )}
                  </div>
                </div>

                {/* Connected Stepper Flow */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {PIPELINE_STAGES.map((stg, idx) => {
                    const isSelected = stageFilter === stg.id;
                    return (
                      <div
                        key={stg.step}
                        onClick={() => setStageFilter(stageFilter === stg.id ? null : stg.id)}
                        className={`p-3.5 rounded-xl border transition cursor-pointer relative flex flex-col justify-between ${
                          isSelected 
                            ? 'bg-amber-500/10 border-amber-500 shadow-md ring-1 ring-amber-500/40' 
                            : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono font-bold text-zinc-400">
                              STAGE {stg.step}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${stg.badgeColor}`}>
                              {stg.count} {stg.count === 1 ? 'Batch' : 'Batches'}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-white leading-snug">
                            {stg.name}
                          </h4>
                          <p className="text-[10px] text-zinc-400 mt-1 line-clamp-1">
                            {stg.subtitle}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px]">
                          <span className={stg.count > 0 ? 'text-amber-400 font-bold' : 'text-zinc-400'}>
                            {stg.count > 0 ? '● Active Batch' : 'Standby'}
                          </span>
                          <span className="text-zinc-400 font-mono">
                            {idx < 4 ? '➔' : '✓'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* =====================================================================
                  RECENT ORDERS & INVOICES (HIGHLY POLISHED TABLE)
                 ===================================================================== */}
              <div className="p-5 rounded-2xl bg-[#141518] border border-zinc-800 shadow-sm space-y-4">
                
                {/* Table Header & Controls Toolbar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                      Recent Wholesale Production Orders
                    </h3>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Showing {filteredOrders.length} active batch orders in factory ledger.
                    </p>
                  </div>

                  {/* Filters & Actions */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Search */}
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        value={orderSearchQuery}
                        onChange={(e) => setOrderSearchQuery(e.target.value)}
                        placeholder="Search ID, client, box..."
                        className="pl-8 pr-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 w-44 sm:w-56"
                      />
                    </div>

                    {/* Status filter buttons */}
                    <select
                      value={orderStatusFilter}
                      onChange={(e) => setOrderStatusFilter(e.target.value)}
                      className="px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-xs font-semibold text-zinc-300 focus:outline-none focus:border-amber-500"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Pending CAD Proof">Pending CAD</option>
                      <option value="In Production">In Production</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Delivered">Delivered</option>
                    </select>

                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 transition"
                    >
                      <span>Full Ledger</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Table Data */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
                        <th className="pb-3 pl-2">Job Ticket #</th>
                        <th className="pb-3">Client / Enterprise</th>
                        <th className="pb-3">Packaging Line & Material</th>
                        <th className="pb-3">Quantity</th>
                        <th className="pb-3">Wholesale Value</th>
                        <th className="pb-3">Manufacturing Status</th>
                        <th className="pb-3 text-right pr-2">Quick Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 font-medium">
                      {filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-zinc-850/60 transition group">
                          
                          {/* Order ID & Copy */}
                          <td className="py-3.5 pl-2 font-mono">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-amber-400">{ord.id}</span>
                              <button
                                onClick={() => handleCopy(ord.id, ord.id)}
                                className="text-zinc-500 hover:text-white p-1 rounded transition opacity-0 group-hover:opacity-100"
                                title="Copy Order ID"
                              >
                                {copiedId === ord.id ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                            <span className="text-[10px] text-zinc-400 block mt-0.5">{ord.createdAt}</span>
                          </td>

                          {/* Client & City */}
                          <td className="py-3.5">
                            <p className="font-bold text-white text-xs leading-snug">{ord.company}</p>
                            <div className="flex items-center gap-2 mt-0.5 text-[10px] text-zinc-400">
                              <span>{ord.contactName}</span>
                              <span>•</span>
                              <span className="flex items-center gap-0.5 text-zinc-300">
                                <MapPin className="w-2.5 h-2.5 text-amber-500" />
                                {ord.city}
                              </span>
                            </div>
                          </td>

                          {/* Product Line & Specs */}
                          <td className="py-3.5">
                            <p className="font-semibold text-zinc-200 text-xs">{ord.productName}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] text-zinc-400 font-mono">
                                {ord.dimensions}
                              </span>
                              <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300 font-bold">
                                {ord.finish}
                              </span>
                            </div>
                          </td>

                          {/* Quantity */}
                          <td className="py-3.5 font-mono">
                            <span className="font-bold text-white text-xs">{ord.quantity.toLocaleString()}</span>
                            <span className="text-zinc-500 text-[10px] ml-1">pcs</span>
                            <span className="text-[10px] text-zinc-400 block">@ ${ord.unitPrice.toFixed(2)}/u</span>
                          </td>

                          {/* Total Value */}
                          <td className="py-3.5">
                            <span className="font-extrabold text-white text-xs font-mono">
                              {formatCurrency(ord.totalAmount)}
                            </span>
                            <span className="text-[10px] text-emerald-400 block font-semibold">
                              {ord.paymentStatus}
                            </span>
                          </td>

                          {/* Status Badge */}
                          <td className="py-3.5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                              ord.status === 'In Production' 
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                              ord.status === 'Pending CAD Proof' 
                                ? 'bg-sky-500/10 text-sky-400 border-sky-500/30' :
                              ord.status === 'Dispatched' 
                                ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
                              'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            }`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                              <span>{ord.status}</span>
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 text-right pr-2">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Inspect Button */}
                              <button
                                onClick={() => setSelectedOrderForInspect(ord)}
                                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition"
                                title="Inspect Full Job Ticket & CAD Proof"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              {/* Direct WhatsApp Client Button */}
                              <a
                                href={`https://wa.me/${ord.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                  `Assalam-o-Alaikum ${ord.contactName}! Executive Packs factory ki taraf se aap ka Job Ticket #${ord.id} (${ord.quantity.toLocaleString()} pcs ${ord.productName}) status: "${ord.status}" hai. Delivery schedule & proofs ke liye hum hazir hain.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 border border-emerald-800/80 transition"
                                title="Send WhatsApp Update to Client"
                              >
                                <Send className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredOrders.length === 0 && (
                    <div className="text-center py-12 text-zinc-400 text-xs space-y-2">
                      <AlertCircle className="w-6 h-6 text-zinc-400 mx-auto" />
                      <p>No manufacturing orders match your filter criteria.</p>
                      <button
                        onClick={() => { setOrderSearchQuery(''); setOrderStatusFilter('All'); setStageFilter(null); }}
                        className="text-amber-400 underline font-bold"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* =========================================================================
              TAB 2: WHOLESALE ORDERS & LEDGER (DEDICATED FULL TAB)
             ========================================================================= */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-800/60">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Wholesale Orders & Commercial Invoices
                  </h1>
                  <p className="text-xs text-zinc-400 mt-1">
                    Manage CAD dieline tickets, print factory delivery challans, and communicate with corporate clients.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-bold flex items-center gap-2 transition"
                  >
                    <Download className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={() => setShowCreateOrderModal(true)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Manual Order</span>
                  </button>
                </div>
              </div>

              {/* Advanced Search & Filtering Toolbar */}
              <div className="p-4 rounded-2xl bg-[#141518] border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    placeholder="Search by ID, company, city, box..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-xs text-white focus:outline-none focus:border-amber-500 placeholder-zinc-500"
                  />
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  {['All', 'Pending CAD Proof', 'In Production', 'Dispatched', 'Delivered'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setOrderStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        orderStatusFilter === status
                          ? 'bg-amber-500 text-stone-950'
                          : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Orders Table */}
              <div className="p-5 rounded-2xl bg-[#141518] border border-zinc-800">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
                        <th className="pb-3 pl-2">Job Ticket #</th>
                        <th className="pb-3">Client & Location</th>
                        <th className="pb-3">Packaging Specifications</th>
                        <th className="pb-3">Quantity</th>
                        <th className="pb-3">Total Value</th>
                        <th className="pb-3">Live Status</th>
                        <th className="pb-3 text-right pr-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 font-medium">
                      {filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-zinc-850/60 transition">
                          <td className="py-3.5 pl-2 font-mono">
                            <span className="font-bold text-amber-400">{ord.id}</span>
                            <span className="text-[10px] text-zinc-400 block mt-0.5">{ord.createdAt}</span>
                          </td>
                          <td className="py-3.5">
                            <p className="font-bold text-white text-xs">{ord.company}</p>
                            <p className="text-[10px] text-zinc-400">{ord.contactName} • {ord.city}</p>
                          </td>
                          <td className="py-3.5">
                            <p className="text-zinc-200 font-semibold">{ord.productName}</p>
                            <p className="text-[10px] text-zinc-400 font-mono">
                              {ord.dimensions} • Finish: {ord.finish}
                            </p>
                          </td>
                          <td className="py-3.5 font-mono">
                            <span className="font-bold text-white">{ord.quantity.toLocaleString()} pcs</span>
                            <span className="text-[10px] text-zinc-400 block">${ord.unitPrice.toFixed(2)}/u</span>
                          </td>
                          <td className="py-3.5">
                            <span className="font-extrabold text-white font-mono text-xs">
                              {formatCurrency(ord.totalAmount)}
                            </span>
                            <span className="text-[10px] text-emerald-400 block font-semibold">{ord.paymentStatus}</span>
                          </td>
                          <td className="py-3.5">
                            <select
                              value={ord.status}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as any)}
                              className="bg-zinc-900 border border-zinc-700 text-[11px] font-bold text-zinc-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-amber-500"
                            >
                              <option value="Pending CAD Proof">Pending CAD Proof</option>
                              <option value="In Production">In Production</option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3.5 text-right pr-2">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedOrderForInspect(ord)}
                                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition"
                                title="Inspect Full Factory Challan"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteOrder(ord.id)}
                                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-950 text-zinc-400 hover:text-red-400 transition"
                                title="Delete Order"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* =========================================================================
              TAB 3: KANBAN PRODUCTION PIPELINE VIEW
             ========================================================================= */}
          {activeTab === 'pipeline' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-800/60">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Factory Floor Kanban Pipeline
                  </h1>
                  <p className="text-xs text-zinc-400 mt-1">
                    Visual batch flow from CAD Laser Plotter to Heidelberg Presses and TCS Nationwide Freight corridor.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400 font-mono">Heidelberg 4C + 2x Bobst Creasers Active</span>
                </div>
              </div>

              {/* Kanban Columns */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {/* Column 1: CAD Proofing */}
                <div className="p-4 rounded-2xl bg-[#141518] border border-zinc-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
                      <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                        1. CAD Dieline Proofing
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/10 text-sky-300 border border-sky-500/30">
                        {orders.filter(o => o.status === 'Pending CAD Proof').length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {orders.filter(o => o.status === 'Pending CAD Proof').map(ord => (
                        <div key={ord.id} className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 hover:border-sky-500/40 transition">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-amber-400">{ord.id}</span>
                            <span className="text-[10px] text-zinc-400">{ord.city}</span>
                          </div>
                          <p className="font-bold text-white text-xs leading-snug">{ord.company}</p>
                          <p className="text-[11px] text-zinc-300">{ord.productName}</p>
                          <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-2 border-t border-zinc-800">
                            <span>{ord.quantity.toLocaleString()} pcs</span>
                            <button
                              onClick={() => handleUpdateOrderStatus(ord.id, 'In Production')}
                              className="text-sky-400 hover:text-sky-300 font-bold"
                            >
                              Move to Press ➔
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Column 2: In Production */}
                <div className="p-4 rounded-2xl bg-[#141518] border border-zinc-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        2. Floor Production & Die-Cut
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        {orders.filter(o => o.status === 'In Production').length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {orders.filter(o => o.status === 'In Production').map(ord => (
                        <div key={ord.id} className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 hover:border-amber-500/40 transition">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-amber-400">{ord.id}</span>
                            <span className="text-[10px] text-zinc-400">{ord.city}</span>
                          </div>
                          <p className="font-bold text-white text-xs leading-snug">{ord.company}</p>
                          <p className="text-[11px] text-zinc-300">{ord.productName}</p>
                          <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-2 border-t border-zinc-800">
                            <span>{ord.quantity.toLocaleString()} pcs</span>
                            <button
                              onClick={() => handleUpdateOrderStatus(ord.id, 'Dispatched')}
                              className="text-amber-400 hover:text-amber-300 font-bold"
                            >
                              Move to Dispatch ➔
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Column 3: Dispatched Freight */}
                <div className="p-4 rounded-2xl bg-[#141518] border border-zinc-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                        3. Freight In-Transit
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                        {orders.filter(o => o.status === 'Dispatched').length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {orders.filter(o => o.status === 'Dispatched').map(ord => (
                        <div key={ord.id} className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 hover:border-purple-500/40 transition">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-amber-400">{ord.id}</span>
                            <span className="text-[10px] text-zinc-400">{ord.city}</span>
                          </div>
                          <p className="font-bold text-white text-xs leading-snug">{ord.company}</p>
                          <p className="text-[11px] text-zinc-300">{ord.productName}</p>
                          <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-2 border-t border-zinc-800">
                            <span>TCS Cargo</span>
                            <button
                              onClick={() => handleUpdateOrderStatus(ord.id, 'Delivered')}
                              className="text-purple-400 hover:text-purple-300 font-bold"
                            >
                              Mark Delivered ✓
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Column 4: Delivered */}
                <div className="p-4 rounded-2xl bg-[#141518] border border-zinc-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        4. Completed & Delivered
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                        {orders.filter(o => o.status === 'Delivered').length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {orders.filter(o => o.status === 'Delivered').map(ord => (
                        <div key={ord.id} className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-emerald-400">{ord.id}</span>
                            <span className="text-[10px] text-zinc-400">{ord.city}</span>
                          </div>
                          <p className="font-bold text-white text-xs leading-snug">{ord.company}</p>
                          <p className="text-[11px] text-zinc-300">{ord.productName}</p>
                          <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-2 border-t border-zinc-800">
                            <span className="text-emerald-400 font-semibold">100% Completed</span>
                            <button
                              onClick={() => setSelectedOrderForInspect(ord)}
                              className="text-zinc-400 hover:text-white"
                            >
                              Inspect
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* =========================================================================
              TAB 4: PACKAGING PRODUCTS CATALOG
             ========================================================================= */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-800/60">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Certified Packaging Lines Catalog
                  </h1>
                  <p className="text-xs text-zinc-400 mt-1">
                    Manage certified packaging lines, MOQ volume discounts, board materials, and images.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsAddingNewProduct(true);
                    setEditingProduct({
                      id: `pack-${Date.now()}`,
                      name: '',
                      category: 'ecommerce',
                      categoryLabel: 'E-Commerce Mailers',
                      tagline: '',
                      description: '',
                      image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1200&q=80',
                      badge: 'Drop-Tested 32 ECT',
                      badgeColor: 'bg-amber-100 text-amber-800',
                      moq: 250,
                      startingPrice: '$0.50 / unit',
                      leadTime: '5-7 Days',
                      materials: ['Corrugated Cardboard', 'Eco Soy Ink'],
                      features: ['Double-wall crush resistance', 'Easy fold assembly'],
                      dimensions: { standard: '300mm × 200mm × 100mm', customizable: true },
                      pricingTiers: [
                        { qty: '250 pcs', unitPrice: '$0.75' },
                        { qty: '1,000 pcs', unitPrice: '$0.50', savings: '33% OFF' },
                      ],
                    });
                    setShowEditProductModal(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 transition self-start sm:self-auto shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Packaging Line</span>
                </button>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((prod) => (
                  <div key={prod.id} className="rounded-2xl bg-[#141518] border border-zinc-800 overflow-hidden flex flex-col justify-between group hover:border-amber-500/30 transition shadow-sm">
                    <div>
                      {/* Product Image */}
                      <div className="relative h-44 bg-zinc-950 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-900/90 text-white backdrop-blur-sm border border-zinc-700">
                          {prod.categoryLabel}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-white text-sm line-clamp-1">{prod.name}</h3>
                          <span className="text-amber-400 font-black text-xs shrink-0">
                            {prod.startingPrice}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                          {prod.description}
                        </p>

                        <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 font-medium">
                          <span>MOQ: <strong className="text-white">{prod.moq} pcs</strong></span>
                          <span>Lead Time: <strong className="text-white">{prod.leadTime}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 bg-zinc-900/70 border-t border-zinc-800 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-400">ID: {prod.id}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setIsAddingNewProduct(false);
                            setEditingProduct({ ...prod });
                            setShowEditProductModal(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-200 transition flex items-center gap-1"
                        >
                          <Edit className="w-3 h-3 text-amber-500" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-950 text-zinc-400 hover:text-red-400 transition"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* =========================================================================
              TAB 5: WHATSAPP LEADS & CRM
             ========================================================================= */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-800/60">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    WhatsApp Customer Inquiries & CRM Leads
                  </h1>
                  <p className="text-xs text-zinc-400 mt-1">
                    Captured from AI Assistant, instant quote calculator, and direct buyer requests.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#141518] border border-zinc-800 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Client / Business</th>
                        <th className="pb-3">Contact</th>
                        <th className="pb-3">Packaging Interest</th>
                        <th className="pb-3">Volume</th>
                        <th className="pb-3">Lead Status</th>
                        <th className="pb-3 text-right">Direct Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 font-medium">
                      {inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-zinc-850/60 transition">
                          <td className="py-3.5 text-zinc-400 font-mono text-[10px]">{inq.date}</td>
                          <td className="py-3.5">
                            <p className="font-bold text-white text-xs">{inq.clientName}</p>
                            <p className="text-[10px] text-zinc-400">{inq.company}</p>
                          </td>
                          <td className="py-3.5 text-zinc-300">
                            <p className="font-mono">{inq.phone}</p>
                            <p className="text-[10px] text-zinc-400">{inq.email}</p>
                          </td>
                          <td className="py-3.5 text-zinc-200 font-semibold">{inq.boxCategory}</td>
                          <td className="py-3.5 text-amber-400 font-bold">{inq.quantityNeeded}</td>
                          <td className="py-3.5">
                            <select
                              value={inq.status}
                              onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
                              className="bg-zinc-900 border border-zinc-700 text-[11px] font-bold text-zinc-200 rounded-lg px-2 py-1 focus:outline-none focus:border-amber-500"
                            >
                              <option value="New">New</option>
                              <option value="Quote Sent">Quote Sent</option>
                              <option value="Follow Up">Follow Up</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                          <td className="py-3.5 text-right">
                            <a
                              href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Assalam-o-Alaikum ${inq.clientName}! Executive Packs (Est. 1984) ki taraf se aap ki packaging inquiry (${inq.boxCategory}) ke hawale se rabta kar rahe hain. Factory-direct wholesale pricing share kar dein?`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-sm"
                            >
                              <span>WhatsApp</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* =========================================================================
              TAB: WHATSAPP BAILEYS QR & REAL-TIME WEB GATEWAY
             ========================================================================= */}
          {activeTab === 'baileys' && (
            <div className="space-y-4">
              <BaileysTerminal flashToast={flashToast} />
            </div>
          )}

          {/* =========================================================================
              TAB: AI AGENT LIVE CONFIGURATION
             ========================================================================= */}
          {activeTab === 'ai-agent' && (
            <div className="space-y-6 max-w-4xl">
              
              <div className="pb-2 border-b border-zinc-800/60">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  AI Agent Configuration & Knowledge Base
                </h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Customize agent persona, lead time rules, MOQ thresholds, and bilingual speech parameters.
                </p>
              </div>

              <form onSubmit={handleSaveAIConfig} className="space-y-5">
                
                <div className="p-5 rounded-2xl bg-[#141518] border border-zinc-800 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
                    <Bot className="w-4 h-4 text-amber-500" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                      Agent Persona & Tone
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-400 block mb-1.5">
                        Agent Public Display Name
                      </label>
                      <input
                        type="text"
                        value={aiConfig.agentName}
                        onChange={(e) => setAiConfig({ ...aiConfig, agentName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-400 block mb-1.5">
                        Conversational Style
                      </label>
                      <select
                        value={aiConfig.tone}
                        onChange={(e) => setAiConfig({ ...aiConfig, tone: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
                      >
                        <option value="professional">Professional & Consultative</option>
                        <option value="friendly-bilingual">Friendly Bilingual (Roman Urdu + English)</option>
                        <option value="direct-engineer">Direct Wholesale Factory Engineer</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-400 block mb-1.5">
                        Production Lead Time Quoted
                      </label>
                      <input
                        type="text"
                        value={aiConfig.leadTimeNotice}
                        onChange={(e) => setAiConfig({ ...aiConfig, leadTimeNotice: e.target.value })}
                        placeholder="e.g. 5 to 7 business days"
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-400 block mb-1.5">
                        Default MOQ Threshold (Pieces)
                      </label>
                      <input
                        type="number"
                        value={aiConfig.moqRule}
                        onChange={(e) => setAiConfig({ ...aiConfig, moqRule: parseInt(e.target.value) || 50 })}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-400 block mb-1.5">
                      Active Business Offer / Promotion Notice
                    </label>
                    <textarea
                      rows={2}
                      value={aiConfig.customPromoText}
                      onChange={(e) => setAiConfig({ ...aiConfig, customPromoText: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#141518] border border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Google Gemini 3 Flash Core Active</h4>
                      <p className="text-[10px] text-zinc-400">Environment key loaded • Real-time bilingual reasoning active</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono font-bold">
                    CONNECTED
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-2 transition shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save AI Configuration</span>
                </button>
              </form>

            </div>
          )}

          {/* =========================================================================
              TAB: PLATFORM SETTINGS
             ========================================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl">
              
              <div className="pb-2 border-b border-zinc-800/60">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Platform & Corporate Settings
                </h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Configure official company contact channels, warehouse locations, and announcement bars.
                </p>
              </div>

              <form onSubmit={handleSavePlatformConfig} className="space-y-5">
                
                <div className="p-5 rounded-2xl bg-[#141518] border border-zinc-800 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
                    <Building className="w-4 h-4 text-amber-500" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                      Corporate Identity & Contact Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-400 block mb-1.5">
                        Brand / Company Name
                      </label>
                      <input
                        type="text"
                        value={platformConfig.companyName}
                        onChange={(e) => setPlatformConfig({ ...platformConfig, companyName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-400 block mb-1.5">
                        Brand Tagline / Slogan
                      </label>
                      <input
                        type="text"
                        value={platformConfig.brandTagline}
                        onChange={(e) => setPlatformConfig({ ...platformConfig, brandTagline: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-400 block mb-1.5">
                        Official WhatsApp Gateway Number
                      </label>
                      <input
                        type="text"
                        value={platformConfig.whatsappNumber}
                        onChange={(e) => setPlatformConfig({ ...platformConfig, whatsappNumber: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-400 block mb-1.5">
                        Sales Phone Helpline
                      </label>
                      <input
                        type="text"
                        value={platformConfig.salesPhone}
                        onChange={(e) => setPlatformConfig({ ...platformConfig, salesPhone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-400 block mb-1.5">
                        Physical Sample Kit Price ($)
                      </label>
                      <input
                        type="number"
                        value={platformConfig.sampleKitPrice}
                        onChange={(e) => setPlatformConfig({ ...platformConfig, sampleKitPrice: parseInt(e.target.value) || 15 })}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-400 block mb-1.5">
                      Factory & Logistics Hub Address
                    </label>
                    <input
                      type="text"
                      value={platformConfig.factoryAddress}
                      onChange={(e) => setPlatformConfig({ ...platformConfig, factoryAddress: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-2 transition shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Platform Settings</span>
                </button>
              </form>

            </div>
          )}

        </main>
      </div>

      {/* =========================================================================
          MODAL: INSPECT ORDER & OFFICIAL FACTORY JOB TICKET / DELIVERY CHALLAN
         ========================================================================= */}
      {selectedOrderForInspect && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#141518] border border-zinc-700/80 rounded-3xl max-w-2xl w-full p-6 text-zinc-100 shadow-2xl relative my-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-sm">
                  EP
                </div>
                <div>
                  <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider block">
                    Factory Job Ticket & Delivery Challan
                  </span>
                  <h3 className="text-base font-extrabold text-white">
                    Order #{selectedOrderForInspect.id}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrderForInspect(null)}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="py-4 space-y-4 text-xs">
              
              {/* Customer Info Box */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase block">Client / Enterprise</span>
                  <p className="font-bold text-white text-sm mt-0.5">{selectedOrderForInspect.company}</p>
                  <p className="text-zinc-300">{selectedOrderForInspect.contactName}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase block">Contact Channels</span>
                  <p className="text-zinc-300 mt-0.5">{selectedOrderForInspect.email}</p>
                  <p className="text-zinc-300 font-mono">{selectedOrderForInspect.phone}</p>
                </div>
                <div className="col-span-2 pt-2 border-t border-zinc-800">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase block">Shipping Logistics Corridor</span>
                  <p className="text-zinc-300">{selectedOrderForInspect.shippingAddress}, {selectedOrderForInspect.city}, {selectedOrderForInspect.country}</p>
                </div>
              </div>

              {/* Product Specifications */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{selectedOrderForInspect.productName}</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">
                    {selectedOrderForInspect.quantity.toLocaleString()} units
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-zinc-400 pt-2 border-t border-zinc-800">
                  <div>
                    <span className="block text-[10px] text-zinc-500">Dimensions:</span>
                    <span className="text-zinc-200 font-mono">{selectedOrderForInspect.dimensions}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-500">Surface Finish:</span>
                    <span className="text-zinc-200 capitalize">{selectedOrderForInspect.finish}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-500">Artwork File:</span>
                    <span className="text-zinc-200 truncate block">{selectedOrderForInspect.artworkName || 'Standard Die'}</span>
                  </div>
                </div>
              </div>

              {/* Financials & Status */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase block">Payment Terms</span>
                  <span className="text-xs font-bold text-emerald-400">{selectedOrderForInspect.paymentStatus}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase block">Total Contract Value</span>
                  <span className="text-lg font-black text-white font-mono">
                    {formatCurrency(selectedOrderForInspect.totalAmount)}
                  </span>
                </div>
              </div>

              {/* Status Update Control */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/60">
                <span className="font-bold text-zinc-300">Advance Stage in Factory:</span>
                <select
                  value={selectedOrderForInspect.status}
                  onChange={(e) => handleUpdateOrderStatus(selectedOrderForInspect.id, e.target.value as any)}
                  className="bg-zinc-900 border border-zinc-700 text-xs font-bold text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500"
                >
                  <option value="Pending CAD Proof">Pending CAD Proof</option>
                  <option value="In Production">In Production</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-2">
              <a
                href={`https://wa.me/${selectedOrderForInspect.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Assalam-o-Alaikum ${selectedOrderForInspect.contactName}! Executive Packs factory ki taraf se aap ka Job Ticket #${selectedOrderForInspect.id} (${selectedOrderForInspect.quantity.toLocaleString()} pcs ${selectedOrderForInspect.productName}) status update: "${selectedOrderForInspect.status}". Mazeed kisi inquiry ke liye hum hazir hain.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Notify Client on WhatsApp</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Print Job Slip</span>
                </button>
                <button
                  onClick={() => handleDeleteOrder(selectedOrderForInspect.id)}
                  className="px-3 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 text-xs font-bold transition"
                >
                  Delete
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: CREATE MANUAL ORDER
         ========================================================================= */}
      {showCreateOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#141518] border border-zinc-700/80 rounded-3xl max-w-xl w-full p-6 text-zinc-100 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider block">
                  New Production Batch
                </span>
                <h3 className="text-base font-extrabold text-white">Create Manual Wholesale Order</h3>
              </div>
              <button onClick={() => setShowCreateOrderModal(false)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const fd = new FormData(form);
                const qty = parseInt(fd.get('quantity') as string) || 1000;
                const unitPrice = parseFloat(fd.get('unitPrice') as string) || 0.50;
                const newOrder: B2BOrder = {
                  id: `EP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
                  createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
                  company: (fd.get('company') as string) || 'Client Enterprise',
                  contactName: (fd.get('contactName') as string) || 'Manager',
                  email: (fd.get('email') as string) || 'client@business.pk',
                  phone: (fd.get('phone') as string) || '+92 300 0000000',
                  shippingAddress: (fd.get('shippingAddress') as string) || 'Industrial Area Delivery',
                  city: (fd.get('city') as string) || 'Lahore',
                  country: 'Pakistan',
                  productId: (fd.get('productId') as string) || products[0].id,
                  productName: products.find(p => p.id === fd.get('productId'))?.name || products[0].name,
                  quantity: qty,
                  dimensions: (fd.get('dimensions') as string) || 'Standard 300×200×100mm',
                  finish: (fd.get('finish') as any) || 'kraft',
                  unitPrice: unitPrice,
                  totalAmount: Math.round(qty * unitPrice),
                  status: 'In Production',
                  paymentStatus: '50% Advance Confirmed',
                  artworkName: 'cad_dieline_spec.ai',
                };

                const updated = [newOrder, ...orders];
                setOrders(updated);
                if (typeof window !== 'undefined') {
                  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
                }
                setShowCreateOrderModal(false);
                flashToast(`Job Ticket #${newOrder.id} logged in production floor!`);
              }}
              className="space-y-4 pt-4 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-zinc-400 block mb-1">Company / Brand Name</label>
                  <input
                    name="company"
                    required
                    placeholder="e.g. Gourmet Foods Lahore"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-400 block mb-1">Contact Person</label>
                  <input
                    name="contactName"
                    required
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-zinc-400 block mb-1">WhatsApp / Phone</label>
                  <input
                    name="phone"
                    required
                    defaultValue="+92 300 "
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-400 block mb-1">Destination City</label>
                  <select
                    name="city"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Sialkot">Sialkot</option>
                    <option value="Multan">Multan</option>
                    <option value="Peshawar">Peshawar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400 block mb-1">Packaging Line</label>
                <select
                  name="productId"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white focus:outline-none focus:border-amber-500"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.categoryLabel})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-zinc-400 block mb-1">Quantity (pcs)</label>
                  <input
                    name="quantity"
                    type="number"
                    defaultValue={2500}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-400 block mb-1">Unit Price ($)</label>
                  <input
                    name="unitPrice"
                    type="number"
                    step="0.01"
                    defaultValue={0.55}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-400 block mb-1">Surface Finish</label>
                  <select
                    name="finish"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="kraft">Natural Kraft</option>
                    <option value="goldfoil">Gold Foil Stamped</option>
                    <option value="black">Matte Black</option>
                    <option value="white">Gloss White</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400 block mb-1">Delivery Address</label>
                <input
                  name="shippingAddress"
                  placeholder="Street / Industrial Plot address"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateOrderModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black shadow-sm"
                >
                  Dispatch to Floor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: EDIT PRODUCT LINE
         ========================================================================= */}
      {showEditProductModal && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-[#141518] border border-zinc-700/80 rounded-3xl max-w-xl w-full p-6 text-zinc-100 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <h3 className="text-base font-extrabold text-white">
                {isAddingNewProduct ? 'Add New Packaging Line' : `Edit: ${editingProduct.name}`}
              </h3>
              <button onClick={() => setShowEditProductModal(false)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveProduct(editingProduct);
              }}
              className="space-y-4 pt-4 text-xs"
            >
              <div>
                <label className="text-[11px] font-bold text-zinc-400 block mb-1">Product Title</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white font-semibold focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-zinc-400 block mb-1">Starting Price Display</label>
                  <input
                    type="text"
                    value={editingProduct.startingPrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, startingPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-400 block mb-1">Minimum Order Qty (pcs)</label>
                  <input
                    type="number"
                    value={editingProduct.moq}
                    onChange={(e) => setEditingProduct({ ...editingProduct, moq: parseInt(e.target.value) || 100 })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400 block mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400 block mb-1">High-Res Image URL</label>
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditProductModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black"
                >
                  Save to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
