import React from 'react';
import { ShieldAlert, Info, CreditCard, ExternalLink, FileCheck } from 'lucide-react';

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-white/5 bg-zinc-900/60 p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
        
        {/* Header */}
        <div className="mb-8 border-b border-white/10 pb-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-500">
            <ShieldAlert className="h-3.5 w-3.5" /> Legal Notice
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl text-white">
            Legal & Project Disclaimer
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Welcome to <strong className="text-white">ShopNest</strong>. This application is an engineered full-stack e-commerce project built strictly for demonstration, portfolio, and educational purposes.
          </p>
        </div>

        {/* Disclaimer Points */}
        <div className="space-y-6 text-zinc-400">
          
          {/* Section 1 */}
          <div className="rounded-xl border border-white/5 bg-zinc-900/40 p-5 transition-colors hover:border-orange-500/20">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold text-orange-500">
              <Info className="h-5 w-5 text-orange-500" />
              1. Demonstration & Product Catalog
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              All items, descriptions, stock counts, and prices displayed across ShopNest are mock demonstration data. Product imagery and assets are sourced for illustrative design representation and do not constitute actual physical inventory available for commercial purchase.
            </p>
          </div>

          {/* Section 2 */}
          <div className="rounded-xl border border-white/5 bg-zinc-900/40 p-5 transition-colors hover:border-orange-500/20">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold text-orange-500">
              <CreditCard className="h-5 w-5 text-orange-500" />
              2. Payments & Financial Transactions
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              No real-world financial transactions or actual credit/debit charges are processed on this platform. The checkout workflows operate exclusively via sandbox/test payment gateway environments (e.g., Razorpay Test Mode) with simulated credentials.
            </p>
          </div>

          {/* Section 3 */}
          <div className="rounded-xl border border-white/5 bg-zinc-900/40 p-5 transition-colors hover:border-orange-500/20">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold text-orange-500">
              <ExternalLink className="h-5 w-5 text-orange-500" />
              3. External Resources & Third-Party Links
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              This site may include external links, social platforms, or API endpoints. ShopNest is not responsible for the availability, privacy practices, or content of third-party platforms outside this repository environment.
            </p>
          </div>

          {/* Section 4 */}
          <div className="rounded-xl border border-white/5 bg-zinc-900/40 p-5 transition-colors hover:border-orange-500/20">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold text-orange-500">
              <FileCheck className="h-5 w-5 text-orange-500" />
              4. Limitation of Liability
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              The project is provided on an "as-is" basis without express or implied commercial warranties. By navigating and interacting with this platform, you acknowledge that it is a developer demonstration showcase.
            </p>
          </div>

        </div>

        {/* Footer Note */}
        <p className="mt-8 border-t border-white/5 pt-6 text-center text-xs italic text-zinc-500">
          By continuing to explore ShopNest, you acknowledge and agree to the terms outlined in this project disclaimer.
        </p>

      </div>
    </div>
  );
};

export default Disclaimer;