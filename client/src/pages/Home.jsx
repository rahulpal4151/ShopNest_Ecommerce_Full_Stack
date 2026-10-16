import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ShoppingBag, ArrowRight, Loader2, Sparkles, ShieldCheck, Truck } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(data?.message || 'Products are unavailable. Check the backend and database connection.');
        }
        setProducts(Array.isArray(data) ? data.slice(0, 4) : []);
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-8 text-white sm:px-6 sm:py-12 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-12 sm:space-y-16">
        
        {/* Hero Banner */}
        <section className="home-hero relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-900 via-[#18181b] to-[#21160f] px-6 py-12 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <div className="pointer-events-none absolute -right-20 -top-28 -z-10 h-96 w-96 rounded-full bg-orange-500/20 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-40 left-1/3 -z-10 h-80 w-80 rounded-full bg-amber-300/10 blur-[90px]" />
          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-300">
                <Sparkles className="h-4 w-4" /> Thoughtfully picked for you
              </span>

              <h1 className="mt-7 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Find your next <span className="text-orange-400">favourite</span> thing.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
                Good finds, great prices, and a little something for every part of your day. Your next discovery starts here.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-400 hover:shadow-orange-500/40"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Explore the shop
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-zinc-200">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" /> Secure checkout
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="absolute inset-6 rounded-full bg-orange-500/20 blur-3xl" />
              <div className="home-feature-art relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-sm sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">The ShopNest edit</p>
                    <p className="mt-1 text-lg font-bold text-white">Little upgrades. Big joy.</p>
                  </div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30">
                    <ShoppingBag className="h-5 w-5" />
                  </span>
                </div>
                <div className="home-feature-gradient my-6 flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-orange-300 via-orange-500 to-rose-600 sm:h-56">
                  <div className="flex h-36 w-36 -rotate-6 items-center justify-center rounded-[2rem] border border-white/30 bg-white/20 shadow-2xl backdrop-blur-md sm:h-44 sm:w-44">
                    <ShoppingBag className="h-20 w-20 text-white drop-shadow-lg sm:h-24 sm:w-24" strokeWidth={1.2} />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">Your next great find</p>
                    <p className="mt-1 text-sm text-zinc-400">Browse the collection</p>
                  </div>
                  <Link to="/shop" aria-label="Browse the collection" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-orange-400 hover:bg-orange-500">
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-4 hidden items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/90 px-4 py-3 shadow-xl sm:flex">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400"><Truck className="h-5 w-5" /></span>
                <div><p className="text-sm font-semibold text-white">Easy checkout</p><p className="text-xs text-zinc-400">A smooth shopping experience</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="space-y-7">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange-400">
                A few good picks
              </span>
              <h2 className="mb-0 mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Made for your shortlist
              </h2>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 px-4 py-2.5 text-sm font-semibold text-zinc-200 transition-colors hover:border-orange-500/50 hover:text-orange-400 sm:self-auto"
            >
              Browse all products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] py-20 text-zinc-400">
              <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
              <p className="mt-4 text-sm font-medium">Loading featured picks...</p>
            </div>
          ) : error ? (
            <div role="alert" className="rounded-2xl border border-red-900/50 bg-red-950/20 px-5 py-8 text-center text-red-300">
              {error}
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 py-16 text-center text-zinc-500">
              No featured products available at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default Home;
