import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ShoppingBag } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#18181b] shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-500/40 hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)]">
      
      {/* Image Wrapper */}
      <div className="product-card-image relative h-[230px] w-full overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-950 p-4 sm:h-[250px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(249,115,22,0.12),transparent_65%)]" />
        <img
          src={product.imageUrl}
          alt={product.name}
          className="relative h-full w-full rounded-xl object-contain transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/80 backdrop-blur-md">
          Featured
        </span>
      </div>

      {/* Product Info */}
      <div className="relative z-[2] flex flex-1 flex-col justify-between p-5 text-left">
        <h3 className="mb-1 line-clamp-1 text-lg font-semibold text-white">
          {product.name}
        </h3>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">{product.category || 'Everyday essentials'}</p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
          <span className="text-xl font-bold text-orange-400">
            ₹{Number(product.price).toFixed(2)}
          </span>

          <Link
            to={`/products/${product._id}`}
            className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-2 text-sm font-semibold text-zinc-200 transition-all duration-200 hover:bg-orange-500 hover:text-white"
          >
            <ShoppingBag className="h-4 w-4" />
            Discover
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;