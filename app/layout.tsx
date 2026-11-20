import React, { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import AIAgentConsultant from "@/components/AIAgentConsultant";
import MobileBottomNav from "@/components/MobileBottomNav";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});



export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0c0a09",
};

export const metadata: Metadata = {
  title: "Executive Packs | Custom Packaging Manufacturer",
  description: "Factory-direct custom packaging: Home & Kitchen boxes, E-commerce mailers, Heavy-duty cartons, Jars & Bottles, Wooden baskets, and ThermoCool insulation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="antialiased selection:bg-amber-100 selection:text-amber-900" suppressHydrationWarning>
        {children}
        {/* Global Floating WhatsApp Support Button (Above Mobile Nav) */}
        <WhatsAppButton />
        {/* Global Voice & Chat AI Packaging Consultant Agent (Above Mobile Nav) */}
        <Suspense fallback={null}>
          <AIAgentConsultant />
        </Suspense>
        {/* Native App-Style Bottom Navigation for Mobile Devices */}
        <MobileBottomNav />
      </body>
    </html>
  );
}
