import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';

const OrderSuccess = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#09090b] px-4 py-12 text-white sm:px-6">
      <div className="relative w-full max-w-[600px] overflow-hidden rounded-2xl border border-white/5 bg-[#18181b] p-8 sm:p-12 text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
        
        {/* Glow Background Effect */}
        <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-emerald-500/15 blur-3xl" />

        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
          <CheckCircle2 className="h-10 w-10 text-emerald-500" />
        </div>

        {/* Title */}
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-emerald-400 sm:text-4xl">
          Payment Successful!
        </h1>

        {/* Description */}
        <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg">
          Thank you for your order. We have securely received your payment and will process your shipment shortly.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            to="/shop"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:bg-orange-600 hover:-translate-y-0.5"
          >
            <ShoppingBag className="h-5 w-5" />
            Continue Shopping
          </Link>

          <Link
            to="/profile"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-800/80 px-6 py-3.5 text-base font-medium text-zinc-200 transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-700 hover:text-white"
          >
            View Orders
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;