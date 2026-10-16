import React from 'react';
import { RefreshCcw, CheckCircle2, Clock, Ban, Truck } from 'lucide-react';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-white/5 bg-zinc-900/60 p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
        
        {/* Header */}
        <div className="mb-8 border-b border-white/10 pb-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-500">
            <RefreshCcw className="h-3.5 w-3.5" /> Guarantee & Support
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl text-white">
            Return & Refund Policy
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            At ShopNest, we proudly stand behind the quality of our merchandise. If for any reason you are dissatisfied with your purchase, you may securely initiate a return within 30 days of receiving your order.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8 text-zinc-400">
          
          {/* Section 1 */}
          <div className="rounded-xl border border-white/5 bg-zinc-900/40 p-5 transition-colors hover:border-orange-500/20">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold text-orange-500">
              <CheckCircle2 className="h-5 w-5 text-orange-500" />
              1. Eligibility for Returns
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              To be eligible for a return, your item must be unused, in the same condition that you received it, and in its original packaging. A valid receipt or proof of purchase is strictly required to complete your process.
            </p>
          </div>

          {/* Section 2 */}
          <div className="rounded-xl border border-white/5 bg-zinc-900/40 p-5 transition-colors hover:border-orange-500/20">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold text-orange-500">
              <Clock className="h-5 w-5 text-orange-500" />
              2. Refund Processing
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed back to your original payment method within 5–7 business days.
            </p>
          </div>

          {/* Section 3 */}
          <div className="rounded-xl border border-white/5 bg-zinc-900/40 p-5 transition-colors hover:border-orange-500/20">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold text-orange-500">
              <Ban className="h-5 w-5 text-orange-500" />
              3. Non-Returnable Items
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              Certain types of goods are exempt from being returned, including perishable goods, downloadable software products, personalized items, and clearance sale products.
            </p>
          </div>

          {/* Section 4 */}
          <div className="rounded-xl border border-white/5 bg-zinc-900/40 p-5 transition-colors hover:border-orange-500/20">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold text-orange-500">
              <Truck className="h-5 w-5 text-orange-500" />
              4. Shipping & Logistics
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              You will be responsible for paying your own shipping costs for returning your item unless the return is due to our error (defective or damaged item). Shipping costs are non-refundable.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ReturnPolicy;