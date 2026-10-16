import React, { useEffect, useState } from 'react';
import { Search, Loader2, PackageOpen } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(data?.message || 'Products are unavailable. Check the backend and database connection.');
        }
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-10 sm:px-6 lg:px-12 text-white">
      <div className="mx-auto max-w-7xl">
        
        {/* Hero Banner */}
        <section className="relative mb-12 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 px-6 py-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.28)] sm:px-10 sm:py-16">
          {/* Top-right radial glow */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />

          <span className="relative z-10 inline-flex items-center rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-400">
            Curated for your everyday
          </span>
          <h1 className="relative z-10 mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find something <span className="text-orange-500">wonderful.</span>
          </h1>
          <p className="relative z-10 mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
            Browse the ShopNest collection of thoughtful essentials, everyday favourites, and things worth discovering.
          </p>

          {/* Search Bar Container */}
          <div className="relative mx-auto mt-8 max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search products by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search products by name"
              className="w-full rounded-2xl border border-white/10 bg-zinc-900/90 py-4 pl-12 pr-4 text-base text-zinc-100 placeholder-zinc-500 shadow-xl shadow-black/10 outline-none transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
            />
          </div>
        </section>

        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">All Products</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        {/* Loading / Product Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
            <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
            <p className="mt-4 text-sm font-medium">Fetching catalog...</p>
          </div>
        ) : error ? (
          <div role="alert" className="rounded-2xl border border-red-900/50 bg-red-950/20 py-8 text-center text-red-300">
            {error}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 py-16 text-center">
            <PackageOpen className="h-12 w-12 text-zinc-600 mb-3" />
            <h3 className="text-lg font-semibold text-zinc-300">No products found</h3>
            <p className="mt-1 text-sm text-zinc-500">Try checking your spelling or search with another keyword.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Shop;
