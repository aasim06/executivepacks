import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  Cookie, 
  Server, 
  Share2, 
  Target, 
  EyeOff, 
  Globe2, 
  Database, 
  RefreshCw, 
  UserX, 
  ExternalLink, 
  Mail, 
  Phone,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Executive Packs & packit-pk.myshopify.com',
  description: 'Learn how personal and order information is collected, used, and protected at Executive Packs and packit-pk.myshopify.com.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-stone-900 selection:bg-amber-200 selection:text-amber-900">
      <Navbar />

      {/* Top Hero Section */}
      <section className="bg-stone-950 text-white pt-14 pb-16 border-b border-stone-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-400 mb-4">
            <Link href="/" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
            </Link>
            <span className="text-stone-600">/</span>
            <span>Legal Documentation</span>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-[11px] font-mono text-stone-300 mb-3">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>GDPR & E-Commerce Compliant</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
                Privacy Policy
              </h1>
              <p className="mt-3 text-stone-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from <span className="text-amber-400 font-semibold font-mono">packit-pk.myshopify.com</span> (the &ldquo;Site&rdquo;).
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Main Policy Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm p-6 sm:p-10 md:p-12 space-y-12">

            {/* 1. Personal Information We Collect */}
            <div className="border-b border-stone-100 pb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                  <Database className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  Personal Information We Collect
                </h2>
              </div>
              
              <div className="space-y-4 text-stone-700 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as <strong>&ldquo;Device Information&rdquo;</strong>.
                </p>

                <p className="font-semibold text-stone-900 pt-2">
                  We collect Device Information using the following technologies:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                  <div className="p-4 rounded-2xl bg-[#faf8f5] border border-stone-200/70">
                    <div className="flex items-center gap-2 mb-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                      <Cookie className="w-4 h-4 text-amber-700" />
                      <span>Cookies</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-normal">
                      Data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit{' '}
                      <a 
                        href="http://www.allaboutcookies.org" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-amber-800 font-semibold underline hover:text-amber-900 inline-flex items-center gap-0.5"
                      >
                        allaboutcookies.org <ExternalLink className="w-3 h-3" />
                      </a>.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#faf8f5] border border-stone-200/70">
                    <div className="flex items-center gap-2 mb-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                      <Server className="w-4 h-4 text-amber-700" />
                      <span>Log Files</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-normal">
                      Track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#faf8f5] border border-stone-200/70">
                    <div className="flex items-center gap-2 mb-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                      <Target className="w-4 h-4 text-amber-700" />
                      <span>Beacons & Pixels</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-normal">
                      &ldquo;Web beacons&rdquo;, &ldquo;tags&rdquo;, and &ldquo;pixels&rdquo; are electronic files used to record information about how you browse the Site.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                  <p className="font-semibold text-amber-950 mb-1">
                    Order Information:
                  </p>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    Additionally when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number. We refer to this information as <strong>&ldquo;Order Information&rdquo;</strong>.
                  </p>
                </div>

                <p className="text-xs font-mono font-medium text-stone-500 pt-2">
                  When we talk about &ldquo;Personal Information&rdquo; in this Privacy Policy, we are talking both about Device Information and Order Information.
                </p>
              </div>
            </div>

            {/* 2. How Do We Use Your Personal Information? */}
            <div className="border-b border-stone-100 pb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                  <FileText className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  How Do We Use Your Personal Information?
                </h2>
              </div>

              <div className="space-y-4 text-stone-700 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).
                </p>

                <p className="font-semibold text-stone-900">
                  Additionally, we use this Order Information to:
                </p>

                <ul className="space-y-2 pl-4 list-disc marker:text-amber-700 text-stone-700">
                  <li>Communicate with you;</li>
                  <li>Screen our orders for potential risk or fraud; and</li>
                  <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
                </ul>

                <p className="pt-2">
                  We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).
                </p>
              </div>
            </div>

            {/* 3. Sharing Your Personal Information */}
            <div className="border-b border-stone-100 pb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                  <Share2 className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  Sharing Your Personal Information
                </h2>
              </div>

              <div className="space-y-4 text-stone-700 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  We share your Personal Information with third parties to help us use your Personal Information, as described above.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 rounded-2xl bg-[#faf8f5] border border-stone-200">
                    <h3 className="font-bold text-sm text-stone-900 mb-1">Shopify Store Platform</h3>
                    <p className="text-xs text-stone-600 mb-3">
                      We use Shopify to power our online store. You can read more about how Shopify uses your Personal Information here:
                    </p>
                    <a
                      href="https://www.shopify.com/legal/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1 underline"
                    >
                      Shopify Privacy Policy <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#faf8f5] border border-stone-200">
                    <h3 className="font-bold text-sm text-stone-900 mb-1">Google Analytics</h3>
                    <p className="text-xs text-stone-600 mb-3">
                      We use Google Analytics to help us understand how our customers use the Site:
                    </p>
                    <div className="flex flex-col gap-1 text-xs">
                      <a
                        href="https://www.google.com/intl/en/policies/privacy/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1 underline"
                      >
                        Google Privacy Policy <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href="https://tools.google.com/dlpage/gaoptout"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-stone-700 hover:text-stone-950 inline-flex items-center gap-1 underline"
                      >
                        Opt-Out of Google Analytics <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                <p className="pt-2">
                  Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
                </p>
              </div>
            </div>

            {/* 4. Behavioural Advertising */}
            <div className="border-b border-stone-100 pb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                  <Target className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  Behavioural Advertising
                </h2>
              </div>

              <div className="space-y-4 text-stone-700 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For more information about how targeted advertising works, you can visit the Network Advertising Initiative&rsquo;s (&ldquo;NAI&rdquo;) educational page at{' '}
                  <a
                    href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-800 font-semibold underline hover:text-amber-900 inline-flex items-center gap-1"
                  >
                    networkadvertising.org <ExternalLink className="w-3 h-3" />
                  </a>.
                </p>

                <p className="font-semibold text-stone-900 pt-2">
                  You can opt out of targeted advertising by using the links below:
                </p>

                <div className="flex flex-wrap gap-2.5 pt-1">
                  <a
                    href="https://www.facebook.com/settings/?tab=ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition"
                  >
                    <span>Facebook Ad Settings</span>
                    <ExternalLink className="w-3 h-3 text-stone-500" />
                  </a>

                  <a
                    href="https://www.google.com/settings/ads/anonymous"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition"
                  >
                    <span>Google Ad Settings</span>
                    <ExternalLink className="w-3 h-3 text-stone-500" />
                  </a>

                  <a
                    href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition"
                  >
                    <span>Bing Ad Settings</span>
                    <ExternalLink className="w-3 h-3 text-stone-500" />
                  </a>

                  <a
                    href="http://optout.aboutads.info/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-200 transition"
                  >
                    <span>Digital Advertising Alliance (DAA) Portal</span>
                    <ExternalLink className="w-3 h-3 text-amber-700" />
                  </a>
                </div>
              </div>
            </div>

            {/* 5. Do Not Track */}
            <div className="border-b border-stone-100 pb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                  <EyeOff className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  Do Not Track
                </h2>
              </div>
              <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed">
                Please note that we do not alter our Site&rsquo;s data collection and use practices when we see a Do Not Track signal from your browser.
              </p>
            </div>

            {/* 6. Your Rights (European Residents) */}
            <div className="border-b border-stone-100 pb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                  <Globe2 className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  Your Rights
                </h2>
              </div>
              
              <div className="space-y-4 text-stone-700 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.
                </p>

                <p>
                  Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.
                </p>
              </div>
            </div>

            {/* 7. Data Retention */}
            <div className="border-b border-stone-100 pb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                  <Database className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  Data Retention
                </h2>
              </div>
              <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed">
                When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
              </p>
            </div>

            {/* 8. Changes */}
            <div className="border-b border-stone-100 pb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  Changes
                </h2>
              </div>
              <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed">
                We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
              </p>
            </div>

            {/* 9. Minors */}
            <div className="border-b border-stone-100 pb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                  <UserX className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  Minors
                </h2>
              </div>
              <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed">
                The Site is not intended for individuals under the age of 16.
              </p>
            </div>

            {/* 10. Contact Information Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-stone-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Questions About This Privacy Policy?
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 max-w-lg leading-relaxed">
                  For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail or directly through our official channels.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
                <a
                  href="mailto:executivepacks@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Inquiries</span>
                </a>

                <a
                  href="https://wa.me/923001234567?text=Hello%20Executive%20Packs!%20I%20have%20an%20inquiry%20regarding%20the%20Privacy%20Policy."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs transition border border-stone-700"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Support Line</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
