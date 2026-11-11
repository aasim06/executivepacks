'use client';

import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Heart, Sparkles, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-12 pb-28 sm:pt-20 sm:pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-stone-800/80">
          
          {/* Brand Info & 42 Years Heritage */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-2 hover:opacity-90 transition" title="Go to Home">
              <span className="font-extrabold text-xl tracking-tight text-white uppercase">
                EXECUTIVE <span className="text-amber-500">PACKS</span>
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">
                Est. 1984
              </span>
            </Link>

            {/* Official Slogan */}
            <p className="text-xs font-mono font-bold tracking-wider text-amber-400 uppercase mb-3">
              &ldquo;From Impact to Intact&rdquo;
            </p>

            <p className="text-sm text-stone-400 max-w-sm leading-relaxed mb-5">
              Founded in 1984 under R.A Publishers, continuing over 42 years of packaging engineering excellence as Executive Packs. Specializing in high-performance food-grade fast food ranges, custom corrugated mailers, and industrial packaging across Pakistan.
            </p>

            {/* Social Media Links Bar */}
            <div className="flex items-center gap-2.5 mb-6">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/executive-packs-abb04a27b/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 hover:bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white transition"
                title="Follow Executive Packs on LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@executivepacks123"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 hover:bg-stone-800 flex items-center justify-center text-stone-400 hover:text-rose-400 transition"
                title="Watch Executive Packs on YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 hover:bg-stone-800 flex items-center justify-center text-stone-400 hover:text-blue-400 transition"
                title="Follow Executive Packs on Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 hover:bg-stone-800 flex items-center justify-center text-stone-400 hover:text-pink-400 transition"
                title="Follow Executive Packs on Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>No Minimum Order Limit (No MOQ) • Nationwide Pakistan</span>
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Product Lines</h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-medium">
              <li><a href="#categories-section" className="hover:text-amber-400 transition">Fast Food & Bakery Boxes</a></li>
              <li><a href="#categories-section" className="hover:text-amber-400 transition">E-Commerce Mailers</a></li>
              <li><a href="#categories-section" className="hover:text-amber-400 transition">Heavy Carton Boxes</a></li>
              <li><a href="#categories-section" className="hover:text-amber-400 transition">Jars & Bottles Packaging</a></li>
              <li><a href="#categories-section" className="hover:text-amber-400 transition">Wooden Baskets & Crates</a></li>
              <li><a href="#categories-section" className="hover:text-amber-400 transition">ThermoCool Insulation</a></li>
            </ul>
          </div>

          {/* Engineering & Tools Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Company & Tools</h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-medium">
              <li>
                <Link href="/about" className="text-amber-400 hover:text-amber-300 font-bold transition flex items-center gap-1">
                  About Us (42 Years Legacy) <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li><Link href="/get-a-quote" className="hover:text-amber-400 transition">B2B Custom Quote Studio</Link></li>
              <li><a href="#unboxing-section" className="hover:text-amber-400 transition">Interactive Scroll Unboxing</a></li>
              <li><a href="#customizer-section" className="hover:text-amber-400 transition">Interactive Mockup Studio</a></li>
              <li><a href="#quote-section" className="hover:text-amber-400 transition">Wholesale Tier Calculator</a></li>
              <li><a href="/contact" className="hover:text-amber-400 transition">Factory Map & Directions</a></li>
              <li><a href="/admin" className="text-stone-500 hover:text-stone-300 transition text-[11px]">B2B Admin Console</a></li>
            </ul>
          </div>

          {/* Factory Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Factory & Inquiries</h4>
            <ul className="space-y-3 text-xs text-stone-400 font-medium">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <a 
                    href="https://maps.google.com/maps?q=31.4031178%2C74.3581428&z=17&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 transition underline underline-offset-2 block text-stone-300"
                    title="View factory on Google Maps"
                  >
                    21 km Plot No.54, Kasur Rd, Asif Town, Lahore, Punjab 54440, Pakistan
                  </a>
                  <a 
                    href="/contact" 
                    className="text-[10px] text-amber-500/90 hover:underline font-mono inline-block mt-0.5"
                  >
                    View Interactive Map & Directions →
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:executivepacks@gmail.com" className="hover:text-white transition">
                  executivepacks@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+18005723872" className="hover:text-white transition font-mono">
                  +1 (800) 572-3872
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <a 
                  href="https://wa.me/923001234567?text=Hello%20Executive%20Packs!%20I%20would%20like%20to%20inquire%20about%20custom%20packaging."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-bold"
                >
                  WhatsApp: +92 (300) 123-4567
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-medium">
          <p>© 1984 – 2026 Executive Packs Industries Ltd. All rights reserved. Slogan: &ldquo;From Impact to Intact&rdquo;.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/about" className="hover:text-amber-400 transition">
              About Us
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-amber-400 transition font-semibold text-stone-400">
              Contact & Google Map
            </Link>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:text-amber-400 transition underline underline-offset-2">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/order" className="hover:text-amber-400 transition">
              Order Sample Kit ($15)
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
