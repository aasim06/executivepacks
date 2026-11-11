'use client';

import React, { useState, useMemo, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PACKAGING_PRODUCTS, PackagingProduct } from '@/data/categories';
import { getStoredProducts } from '@/lib/adminStore';
import { 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  Upload, 
  FileText, 
  Ruler, 
  Clock, 
  Sparkles, 
  Check, 
  X,
  Printer,
  ChevronDown
} from 'lucide-react';

function OrderContent() {
  const searchParams = useSearchParams();
  const initialProductId = searchParams.get('productId') || 'gable-takeout-box';
  const [allProducts, setAllProducts] = useState<PackagingProduct[]>(PACKAGING_PRODUCTS);

  // Find product or fallback to first
  const [selectedProduct, setSelectedProduct] = useState<PackagingProduct>(() => {
    return PACKAGING_PRODUCTS.find(p => p.id === initialProductId) || PACKAGING_PRODUCTS[0];
  });

  // Load latest stored products from Admin
  useEffect(() => {
    const prods = getStoredProducts();
    if (prods && prods.length > 0) {
      setAllProducts(prods);
      const match = prods.find(p => p.id === initialProductId);
      if (match) {
        setSelectedProduct(match);
        setQuantity(match.moq || 500);
        setDimensions(match.dimensions?.standard || 'Custom Standard Proof');
      }
    }
  }, [initialProductId]);

  // Step 1: Specs & Customization
  const [quantity, setQuantity] = useState<number>(selectedProduct.moq || 500);
  const [dimensions, setDimensions] = useState(selectedProduct.dimensions?.standard || 'Custom Standard Proof');
  const [finish, setFinish] = useState<'kraft' | 'black' | 'white' | 'goldfoil'>('kraft');
  const [artworkFile, setArtworkFile] = useState<{ name: string; size: string; preview: string } | null>(null);

  // Step 2: Customer / Business Info
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('United States');

  // Order Processing States
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStepText, setProcessStepText] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Switch product
  const handleProductChange = (prodId: string) => {
    const prod = allProducts.find(p => p.id === prodId) || PACKAGING_PRODUCTS.find(p => p.id === prodId);
    if (prod) {
      setSelectedProduct(prod);
      setQuantity(prod.moq || 500);
      setDimensions(prod.dimensions?.standard || 'Custom Standard Proof');
    }
  };

  // Handle Artwork Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setArtworkFile({
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          preview: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Price Calculation Engine
  const { unitPrice, subtotal, finishCost, discountPct, totalAmount } = useMemo(() => {
    // Base rate from product startingPrice (e.g. '$0.42 / unit' -> 0.42)
    const baseUnit = parseFloat(selectedProduct.startingPrice.replace(/[^0-9.]/g, '')) || 0.50;

    // Volume discount based on quantity
    let disc = 0;
    if (quantity >= selectedProduct.moq * 4) disc = 0.35;
    else if (quantity >= selectedProduct.moq * 2) disc = 0.20;
    else if (quantity >= selectedProduct.moq * 1.5) disc = 0.10;

    // Finish cost add-on
    let fAddon = 0;
    if (finish === 'black') fAddon = 0.08;
    if (finish === 'white') fAddon = 0.05;
    if (finish === 'goldfoil') fAddon = 0.18;

    const finalUnitPrice = Math.max(0.15, (baseUnit * (1 - disc)) + fAddon);
    const sub = finalUnitPrice * quantity;
    const fTotal = fAddon * quantity;

    return {
      unitPrice: finalUnitPrice,
      subtotal: sub,
      finishCost: fTotal,
      discountPct: Math.round(disc * 100),
      totalAmount: sub,
    };
  }, [selectedProduct, quantity, finish]);

  // Process Order Handler
  const handleProcessOrder = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    // Form Validations
    if (!name.trim()) {
      setErrorMessage('Please enter your contact name to place the manufacturing order.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid business email address for production dieline proof.');
      return;
    }

    // Begin processing sequence
    setIsProcessing(true);
    setProcessStepText('Validating structural CAD specs & dimensions...');

    setTimeout(() => {
      setProcessStepText('Generating factory order requisition & invoice...');
    }, 800);

    setTimeout(() => {
      setProcessStepText('Allocating factory raw materials & scheduling production batch...');
    }, 1600);

    setTimeout(() => {
      const generatedOrderId = `EP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setIsProcessing(false);
      setOrderId(generatedOrderId);
      setOrderComplete(true);

      // Save order into shared Admin Store
      if (typeof window !== 'undefined') {
        try {
          const storedOrders = localStorage.getItem('executive_b2b_orders_v1');
          const currentOrders = storedOrders ? JSON.parse(storedOrders) : [];
          const newOrderRecord = {
            id: generatedOrderId,
            createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
            company: company.trim() || `${name.trim()}'s Business`,
            contactName: name.trim(),
            email: email.trim(),
            phone: phone.trim() || 'N/A',
            shippingAddress: address.trim() || 'Direct Doorstep Logistics',
            city: city.trim() || 'Karachi',
            country: country.trim() || 'Pakistan',
            productId: selectedProduct.id,
            productName: selectedProduct.name,
            quantity: quantity,
            dimensions: dimensions,
            finish: finish,
            unitPrice: unitPrice,
            totalAmount: Math.round(totalAmount),
            status: 'Pending CAD Proof',
            paymentStatus: '50% Advance Confirmed',
            artworkName: artworkFile?.name || 'Standard Factory Print',
            notes: 'Placed via online B2B direct checkout.',
          };
          localStorage.setItem('executive_b2b_orders_v1', JSON.stringify([newOrderRecord, ...currentOrders]));
        } catch (e) {
          console.error('Failed to sync order to admin store:', e);
        }
      }
    }, 2400);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 pb-24">
      
      {/* Top Checkout Header */}
      <header className="sticky top-0 z-40 bg-[#faf8f5]/90 backdrop-blur-xl border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <a 
              href="/" 
              className="inline-flex items-center gap-1 text-xs font-bold text-stone-600 hover:text-stone-900 transition p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg hover:bg-stone-200/60"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden xs:inline sm:inline">Back</span>
            </a>
            <div className="h-4 w-px bg-stone-300 hidden sm:block"></div>
            <a href="/" className="font-extrabold text-sm sm:text-base tracking-tight text-stone-900 uppercase">
              EXECUTIVE <span className="text-amber-800">PACKS</span>
              <span className="hidden sm:inline-block ml-1.5 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                B2B ORDER
              </span>
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-stone-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Direct Manufacturer Guarantee</span>
            </div>

            {/* Quick Top Proceed Button */}
            <button
              type="button"
              onClick={() => handleProcessOrder()}
              disabled={isProcessing}
              className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-stone-900 hover:bg-amber-800 text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-1.5"
            >
              <span>Confirm Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* Title & Product Switcher Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Direct-from-Factory Manufacturing Order</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Order Specs & Customization Details
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Configure your packaging dimensions, quantity, finish, enter delivery details, and click proceed to place your factory batch.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Product Switcher Dropdown */}
            <div className="relative">
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                Switch Product Line:
              </label>
              <div className="relative">
                <select
                  value={selectedProduct.id}
                  onChange={(e) => handleProductChange(e.target.value)}
                  className="appearance-none bg-white border border-stone-300 rounded-xl px-4 py-2.5 pr-10 text-xs font-bold text-stone-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-800 cursor-pointer"
                >
                  {allProducts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.categoryLabel})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-stone-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-between animate-fade-in">
            <span>⚠️ {errorMessage}</span>
            <button onClick={() => setErrorMessage('')} className="text-rose-500 hover:text-rose-800">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Form Layout: 2 Columns */}
        <form onSubmit={(e) => handleProcessOrder(e)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLUMNS: Specs, Customization & Shipping Information */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* SECTION 1: Product Specs & Customization */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-stone-100">
                <span className="w-7 h-7 rounded-full bg-stone-900 text-white font-mono text-xs font-black flex items-center justify-center">
                  1
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-stone-900">
                    Product Specifications & Dimensions
                  </h3>
                  <p className="text-xs text-stone-500">
                    {selectedProduct.name} • {selectedProduct.categoryLabel}
                  </p>
                </div>
              </div>

              {/* Quantity Selector with Tier Pricing */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Order Quantity (Minimum: {selectedProduct.moq} pcs):
                  </label>
                  <span className="font-mono text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    ${unitPrice.toFixed(2)} / unit
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                  {[
                    selectedProduct.moq,
                    selectedProduct.moq * 2,
                    selectedProduct.moq * 4,
                    selectedProduct.moq * 10,
                  ].map((qtyVal) => (
                    <button
                      key={qtyVal}
                      type="button"
                      onClick={() => setQuantity(qtyVal)}
                      className={`p-3 rounded-xl border text-center transition ${
                        quantity === qtyVal
                          ? 'border-stone-900 bg-stone-900 text-white font-black shadow-sm'
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 font-bold'
                      }`}
                    >
                      <span className="block text-sm">{qtyVal.toLocaleString()}</span>
                      <span className="block text-[10px] opacity-75">pcs</span>
                    </button>
                  ))}
                </div>

                {/* Custom Quantity Input */}
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs font-semibold text-stone-500">Or custom quantity:</span>
                  <input
                    type="number"
                    min={selectedProduct.moq}
                    step={50}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(selectedProduct.moq, Number(e.target.value)))}
                    className="w-32 px-3 py-1.5 rounded-lg border border-stone-300 font-mono text-xs font-bold text-stone-900 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                  />
                  <span className="text-xs text-stone-500">pcs</span>
                </div>
              </div>

              {/* Custom Dimensions */}
              <div className="mb-6">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">
                  Box Dimensions (Standard or Custom):
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Ruler className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      placeholder="e.g. 240mm (L) × 150mm (W) × 220mm (H)"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700 bg-stone-50 focus:bg-white"
                    />
                  </div>
                </div>
                <span className="text-[11px] text-stone-500 mt-1 block">
                  Standard factory die-cut: <span className="font-semibold text-stone-700">{selectedProduct.dimensions.standard}</span>
                </span>
              </div>

              {/* Surface Finish Selector */}
              <div className="mb-6">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2.5">
                  Cardboard & Surface Finish:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'kraft', name: 'Raw Eco Kraft', extra: 'Included' },
                    { id: 'black', name: 'Obsidian Black', extra: '+$0.08 /pc' },
                    { id: 'white', name: 'Bleached White', extra: '+$0.05 /pc' },
                    { id: 'goldfoil', name: 'Gold Hot Foil', extra: '+$0.18 /pc' },
                  ].map((fin) => (
                    <button
                      key={fin.id}
                      type="button"
                      onClick={() => setFinish(fin.id as any)}
                      className={`p-3 rounded-xl border text-left transition ${
                        finish === fin.id
                          ? 'border-amber-800 bg-amber-50/70 shadow-sm'
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                      }`}
                    >
                      <span className="block text-xs font-bold text-stone-900">{fin.name}</span>
                      <span className="block text-[10px] text-stone-500 mt-0.5">{fin.extra}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Artwork / Logo */}
              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">
                  Upload Custom Artwork / Brand Logo:
                </label>
                <div className="border-2 border-dashed border-stone-300 rounded-2xl p-4 text-center hover:border-amber-700 transition bg-stone-50/60">
                  {artworkFile ? (
                    <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-stone-200">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={artworkFile.preview} alt="Artwork" className="w-10 h-10 object-cover rounded-lg border border-stone-200" />
                        <div className="text-left">
                          <span className="text-xs font-bold text-stone-900 block truncate max-w-xs">{artworkFile.name}</span>
                          <span className="text-[10px] text-stone-500">{artworkFile.size} • Attached</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setArtworkFile(null)}
                        className="text-stone-400 hover:text-stone-700 p-1 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block py-3">
                      <Upload className="w-6 h-6 text-stone-400 mx-auto mb-1.5" />
                      <span className="text-xs font-bold text-amber-800 hover:underline block">
                        Click to upload packaging artwork or logo
                      </span>
                      <span className="text-[10px] text-stone-500 block mt-0.5">
                        Accepts PNG, JPG, SVG, AI, PDF (Up to 25MB) • Dieline aligned
                      </span>
                      <input
                        type="file"
                        accept="image/*,.pdf,.ai,.svg"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

            </div>

            {/* SECTION 2: Shipping & Business Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-stone-100">
                <span className="w-7 h-7 rounded-full bg-stone-900 text-white font-mono text-xs font-black flex items-center justify-center">
                  2
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-stone-900">
                    Shipping & Factory Delivery Information
                  </h3>
                  <p className="text-xs text-stone-500">
                    Enter your contact and dispatch address details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1">Contact Person Name *:</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-900 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1">Business Email Address *:</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-900 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1">Company / Brand Name:</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Artisan Goods LLC"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-900 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1">Phone Number:</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-900 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-stone-600 block mb-1">Delivery Street Address:</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Warehouse / Receiving Dock Address"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-900 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1">City / State:</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City, State"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-900 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1">Postal / Zip Code:</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Zip Code"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-900 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                  />
                </div>
              </div>

              {/* Direct Form Proceed Action Button */}
              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free CAD Dieline Proof before mass manufacturing</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-stone-900 hover:bg-amber-800 text-white font-extrabold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <span>Processing Order...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceed & Place Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

          {/* RIGHT 5 COLUMNS: Sticky Order Summary & Action Button */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            
            {/* Summary Box */}
            <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-stone-800">
              <h3 className="text-base font-extrabold uppercase tracking-wider text-amber-400 mb-4 pb-3 border-b border-stone-800 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-[10px] font-mono text-stone-400 font-normal">FACTORY BATCH</span>
              </h3>

              {/* Product Mini Preview */}
              <div className="flex gap-4 items-center pb-5 border-b border-stone-800">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-800 shrink-0 border border-stone-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white leading-tight">
                    {selectedProduct.name}
                  </h4>
                  <span className="text-[11px] text-stone-400 block mt-0.5">
                    {quantity.toLocaleString()} units • {selectedProduct.categoryLabel}
                  </span>
                  <span className="text-[10px] text-amber-400 font-semibold block mt-0.5">
                    Finish: {finish.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Specs Breakdown */}
              <div className="py-4 space-y-2.5 text-xs border-b border-stone-800 font-medium">
                <div className="flex justify-between text-stone-300">
                  <span>Unit Rate</span>
                  <span className="font-mono text-white font-bold">${unitPrice.toFixed(2)} / pc</span>
                </div>

                <div className="flex justify-between text-stone-300">
                  <span>Quantity</span>
                  <span className="font-mono text-white font-bold">{quantity.toLocaleString()} pcs</span>
                </div>

                {discountPct > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Volume Discount Savings</span>
                    <span>-{discountPct}% OFF</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-300">
                  <span>Digital CAD Dieline Proof</span>
                  <span className="text-emerald-400 font-bold">FREE ($75 value)</span>
                </div>

                <div className="flex justify-between text-stone-300">
                  <span>Factory Freight Shipping</span>
                  <span className="text-emerald-400 font-bold">FREE (Orders &gt; $200)</span>
                </div>

                <div className="flex justify-between text-stone-300">
                  <span>Production Lead Time</span>
                  <span className="font-semibold text-stone-200">{selectedProduct.leadTime}</span>
                </div>
              </div>

              {/* Total Payable */}
              <div className="pt-4 pb-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-extrabold text-stone-300 uppercase">Total Estimate:</span>
                  <div className="text-right">
                    <span className="font-mono text-3xl font-black text-amber-400">
                      ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-stone-400 block">USD • All manufacturing taxes included</span>
                  </div>
                </div>
              </div>

              {/* Process Order CTA Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-full bg-amber-600 hover:bg-amber-500 disabled:bg-stone-700 text-white font-extrabold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-600/30 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>{processStepText}</span>
                  </>
                ) : (
                  <>
                    <span>Proceed & Place Order (${totalAmount.toFixed(2)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="mt-4 text-center">
                <span className="text-[11px] text-stone-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Quality Match Guarantee & Fast Dispatch</span>
                </span>
              </div>
            </div>

            {/* Trust Certifications Card */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 text-xs text-stone-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-stone-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pre-Production Proof Guarantee</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Before physical production starts, our engineers will email you a 1:1 CAD dieline proof for final sign-off.
              </p>
            </div>

          </div>

        </form>

      </main>

      {/* SUCCESS MODAL & INVOICE RECEIPT */}
      {orderComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 sm:p-8 text-center">
            
            {/* Green Success Badge */}
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Manufacturing Order Placed
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-3">
              Order #{orderId} Placed Successfully!
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mt-2 leading-relaxed">
              Thank you, <strong className="text-stone-900">{name}</strong>. Your packaging manufacturing requisition has been placed into our automated production queue.
            </p>

            {/* Receipt Summary Card */}
            <div className="my-6 p-5 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs space-y-2.5">
              <div className="flex justify-between">
                <span className="text-stone-500">Packaging Item:</span>
                <span className="font-bold text-stone-900">{selectedProduct.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Quantity:</span>
                <span className="font-mono font-bold text-stone-900">{quantity.toLocaleString()} pcs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Dimensions:</span>
                <span className="font-mono font-bold text-stone-900">{dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Order Method:</span>
                <span className="font-mono font-bold text-stone-900">
                  Official Wholesale Purchase Order / Invoice
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 font-bold">
                <span className="text-stone-700">Estimated Total Value:</span>
                <span className="font-mono text-base text-amber-900">
                  ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-stone-500 pt-1">
                <span>Estimated Factory Dispatch:</span>
                <span className="font-semibold text-emerald-700">5-7 Business Days</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-stone-300 text-stone-800 text-xs font-bold hover:bg-stone-100 transition shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official PO / Receipt</span>
              </button>

              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-stone-900 hover:bg-amber-900 text-white text-xs font-bold transition shadow-md"
              >
                <span>Back to Executive Packs</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-stone-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-bold text-stone-600">Loading Order Processing Engine...</p>
        </div>
      </div>
    }>
      <OrderContent />
    </Suspense>
  );
}
