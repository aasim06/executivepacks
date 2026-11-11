'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink, 
  Copy, 
  Check, 
  Send, 
  Navigation, 
  Building2, 
  ShieldCheck,
  ArrowLeft,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Home & Kitchen Boxes',
    quantity: '1,000 pcs',
    message: ''
  });

  const googleMapsUrl = "https://maps.google.com/maps?q=31.4031178%2C74.3581428&z=17&hl=en";
  const coordinates = "31°24'11.2\"N 74°21'29.3\"E (31.4031178, 74.3581428)";

  const handleCopyCoordinates = () => {
    navigator.clipboard.writeText("31.4031178, 74.3581428");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: 'Home & Kitchen Boxes',
        quantity: '1,000 pcs',
        message: ''
      });
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] text-stone-900 selection:bg-amber-200 selection:text-amber-900">
      <Navbar />

      {/* Top Banner Header */}
      <section className="bg-stone-950 text-white pt-14 pb-16 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-400 mb-4">
            <Link href="/" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
            </Link>
            <span className="text-stone-600">/</span>
            <span>Contact & Location</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-[11px] font-mono text-emerald-400 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>From Impact to Intact • Est. 1984 (42 Years) • Lahore Industrial Zone</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
                Contact & Factory Location
              </h1>
              <p className="mt-3 text-stone-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                Direct manufacturing facility, live CAD proof reviews, sample showroom visits, and high-volume packaging production consultations.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Contact Cards & Form (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Address & GPS Card */}
              <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-7 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-800">
                    <MapPin className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800">Physical Address</span>
                    <h3 className="text-base font-bold text-stone-900">Manufacturing Facility & Headquarters</h3>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-stone-600 font-medium">
                  <p className="text-stone-800 font-semibold leading-relaxed">
                    21 km Plot No.54, Kasur Rd, Asif Town,<br />
                    Lahore, Punjab 54440, Pakistan.
                  </p>
                  
                  {/* GPS Coordinates Bar */}
                  <div className="p-3 rounded-2xl bg-[#faf8f5] border border-stone-200 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-mono font-bold text-stone-400 block">GPS Coordinates:</span>
                      <span className="font-mono text-xs font-bold text-stone-800 truncate block">
                        31°24&apos;11.2&quot;N 74°21&apos;29.3&quot;E
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyCoordinates}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 hover:bg-stone-50 text-[11px] font-bold text-stone-700 transition flex items-center gap-1 shrink-0 shadow-xs"
                      title="Copy GPS coordinates"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-stone-500" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Direct Action Link to Maps */}
                <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1 underline underline-offset-2"
                  >
                    View exact pin on Google Maps <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-[11px] text-stone-400 font-mono">17z Precision</span>
                </div>
              </div>

              {/* Quick Communication Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* WhatsApp */}
                <a
                  href="https://wa.me/923001234567?text=Hello%20Executive%20Packs!%20I%20would%20like%20to%20visit%20your%20factory%20or%20inquire%20about%20packaging."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 hover:bg-emerald-100/60 transition group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800">Fast Response</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950 mb-0.5">WhatsApp Direct</h4>
                    <p className="text-xs font-bold text-emerald-700 group-hover:underline font-mono">
                      +92 (300) 123-4567
                    </p>
                  </div>
                </a>

                {/* Phone Hotline */}
                <a
                  href="tel:+18005723872"
                  className="p-5 rounded-2xl bg-white border border-stone-200 hover:bg-stone-50 transition group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">Sales Desk</span>
                    <Phone className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-900" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 mb-0.5">Toll-Free Hotline</h4>
                    <p className="text-xs font-bold text-amber-800 font-mono">
                      (800) 572-3872
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:executivepacks@gmail.com"
                  className="p-5 rounded-2xl bg-white border border-stone-200 hover:bg-stone-50 transition group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">CAD & Quotations</span>
                    <Mail className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-900" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 mb-0.5">Official Email</h4>
                    <p className="text-xs font-medium text-stone-600 truncate group-hover:text-stone-900">
                      executivepacks@gmail.com
                    </p>
                  </div>
                </a>

                {/* Operating Hours */}
                <div className="p-5 rounded-2xl bg-[#faf8f5] border border-stone-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">Facility Hours</span>
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 mb-0.5">Mon – Sat</h4>
                    <p className="text-[11px] font-medium text-stone-600">
                      9:00 AM – 7:00 PM (PKT)
                    </p>
                  </div>
                </div>

              </div>

              {/* Quick Inquiry / Message Form */}
              <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-7 shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-4 h-4 text-amber-700" />
                  <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
                    Send a Factory Inquiry
                  </h3>
                </div>

                {formSubmitted ? (
                  <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-in fade-in">
                    <Check className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <h4 className="text-sm font-bold text-emerald-900">Inquiry Dispatched!</h4>
                    <p className="text-xs text-emerald-700 mt-1">
                      Our engineering production team will respond with a CAD dieline and price quote within 2 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Asif Munir"
                        className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs font-medium bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="client@company.com"
                          className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs font-medium bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">Phone / WhatsApp</label>
                        <input
                          type="text"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+92 300 0000000"
                          className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs font-medium bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">Packaging Project Details</label>
                      <textarea
                        rows={3}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your packaging dimensions, box style, and expected quantity..."
                        className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs font-medium bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-amber-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-amber-400" />
                      <span>Dispatch Inquiry to Factory Desk</span>
                    </button>
                  </form>
                )}
              </div>

            </div>

            {/* Right Column: Google Maps Interactive Embed & Live Hub (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Map Card */}
              <div className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-sm">
                
                {/* Map Header Bar */}
                <div className="p-4 sm:p-5 bg-stone-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></span>
                    <div>
                      <h3 className="text-sm font-bold text-white leading-none">
                        Interactive Google Satellite & Street Map
                      </h3>
                      <p className="text-[11px] text-stone-400 font-mono mt-1">
                        Coordinates: 31.40312° N, 74.358139° E • Lahore Unit
                      </p>
                    </div>
                  </div>

                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-white text-xs font-bold transition self-start sm:self-auto shrink-0"
                  >
                    <span>Full Map View</span>
                    <ExternalLink className="w-3 h-3 text-amber-400" />
                  </a>
                </div>

                {/* Google Maps iFrame */}
                <div className="relative w-full h-[450px] sm:h-[540px] bg-stone-100">
                  <iframe
                    title="Executive Packs Google Map Location"
                    src="https://maps.google.com/maps?q=31.4031178,74.3581428&hl=en&z=17&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />

                  {/* Corner Badge */}
                  <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-md text-xs font-bold text-stone-900">
                    <MapPin className="w-4 h-4 text-rose-600 fill-rose-500" />
                    <span>Exact Pin: 31°24&apos;11.2&quot;N 74°21&apos;29.3&quot;E</span>
                  </div>
                </div>

                {/* Map Bottom Bar with Driving Directions & Quick Actions */}
                <div className="p-4 sm:p-5 bg-[#faf8f5] border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-stone-600">
                    <span className="font-bold text-stone-900">Visiting for proof approval?</span>
                    <p className="text-[11px] text-stone-500">Please contact our team ahead of time to arrange CAD dieline review.</p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=31.40312,74.358139`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition shadow-xs"
                    >
                      <Navigation className="w-3.5 h-3.5 text-amber-400" />
                      <span>Get Directions</span>
                    </a>

                    <a
                      href="https://wa.me/923001234567?text=Hello%20Executive%20Packs!%20I%20am%20coming%20to%20your%20factory%20location%20at%2031.40312,74.358139."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                    >
                      <span>Notify via WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* Factory Credentials & Facility Snapshot */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-amber-700 shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold text-stone-900">Heidelberg Offset</h5>
                    <p className="text-[10px] text-stone-500">6-Color UV High-Speed Press</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold text-stone-900">ISO 9001:2015</h5>
                    <p className="text-[10px] text-stone-500">Quality Certified Manufacturing</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-700 shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold text-stone-900">Fast Turnaround</h5>
                    <p className="text-[10px] text-stone-500">5-7 Days Dispatch Guarantee</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
