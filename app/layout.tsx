import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import AIAgentConsultant from "@/components/AIAgentConsultant";

export const metadata: Metadata = {
  title: "Executive Packs | Custom Packaging Manufacturer & Scroll Unboxing Engine",
  description: "Factory-direct custom packaging: Home & Kitchen boxes, E-commerce mailers, Heavy-duty cartons, Jars & Bottles, Wooden baskets, and ThermoCool insulation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        {/* Global Floating WhatsApp Support Button (Bottom-Right) */}
        <WhatsAppButton />
        {/* Global Voice & Chat AI Packaging Consultant Agent (Bottom-Left) */}
        <AIAgentConsultant />
      </body>
    </html>
  );
}
