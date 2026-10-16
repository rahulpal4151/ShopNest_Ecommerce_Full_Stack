import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#09090b] text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white tracking-tight">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-500">
                <ShoppingBag className="h-5 w-5" />
              </span>
              ShopNest<span className="text-orange-500">.</span>
            </Link>
            <p className="max-w-xs text-sm leading-6 text-zinc-400">
              Your modern destination for premium lifestyle, tech, and curated essentials built for performance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="transition-colors hover:text-orange-500">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="transition-colors hover:text-orange-500">All Products</Link>
              </li>
              <li>
                <Link to="/cart" className="transition-colors hover:text-orange-500">My Cart</Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Company & Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="transition-colors hover:text-orange-500">About Us</Link>
              </li>
              <li>
                <Link to="/return" className="transition-colors hover:text-orange-500">Return Policy</Link>
              </li>
              <li>
                <Link to="/disclaimer" className="transition-colors hover:text-orange-500">Legal Disclaimer</Link>
              </li>
            </ul>
          </div>

          {/* Trust Note */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Security & Trust</h4>
            <div className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 text-xs leading-relaxed text-zinc-400">
              <ShieldCheck className="h-5 w-5 flex-shrink-0 text-orange-500" />
              <span>Encrypted checkout powered by Razorpay sandbox network.</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs sm:flex-row">
          <p className="text-zinc-500">
            &copy; {new Date().getFullYear()} ShopNest. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-zinc-500">
            Crafted with <Heart className="h-3.5 w-3.5 fill-orange-500 text-orange-500" /> for modern web scale
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;