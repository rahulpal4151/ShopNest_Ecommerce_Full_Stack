import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { ShoppingBag, ChevronRight, Loader2, AlertCircle } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        
        if (res.ok && data && (data._id || data.name)) {
          setProduct(data);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Fetch product error:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: 1
      }));
      alert('Successfully added to your cart!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center py-24 text-orange-500">
        <Loader2 className="h-10 w-10 animate-spin mb-4" />
        <p className="text-lg font-medium tracking-wide">Loading Product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center py-24 text-red-500">
        <AlertCircle className="h-12 w-12 mb-3" />
        <p className="text-xl font-bold">Product Not Found</p>
        <Link to="/shop" className="mt-4 text-sm font-semibold text-zinc-400 hover:text-white underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-10 text-white sm:px-6 lg:px-12">
      <div className="mx-auto max-w-6xl">
        
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-[0.9rem] text-zinc-500">
          <Link to="/" className="text-orange-500 transition-colors hover:underline">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/shop" className="text-orange-500 transition-colors hover:underline">Shop</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span>{product.category || 'Electronics'}</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-zinc-200 truncate">{product.name}</span>
        </nav>

        {/* Product Detail Card Container */}
        <div className="grid grid-cols-1 items-center gap-10 rounded-[20px] border border-white/[0.07] bg-[#141418] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.45)] sm:p-[35px] min-[900px]:grid-cols-[420px_1fr]">
          
          {/* Left Side: Compact Framed Image Container */}
          <div className="flex h-[420px] w-full items-center justify-center overflow-hidden rounded-[16px] border border-white/[0.06] bg-[radial-gradient(circle,#27272a_0%,#18181b_100%)] p-6">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="max-h-full max-w-full object-contain [filter:drop-shadow(0_10px_20px_rgba(0,0,0,0.5))] transition-transform duration-300 hover:scale-105" 
            />
          </div>

          {/* Right Side: Information Block */}
          <div className="flex flex-col justify-center text-left">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-[2.5rem] leading-tight mb-4">
              {product.name}
            </h1>

            <p className="text-[2rem] font-bold text-orange-500 mb-6">
              ₹{product.price ? Number(product.price).toFixed(2) : '0.00'}
            </p>

            {/* Description Box */}
            <div className="mb-8 rounded-xl border border-white/5 bg-zinc-900/40 p-5">
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-300">
                Product Description
              </h4>
              <p className="text-[1.1rem] leading-[1.7] text-zinc-400">
                {product.description || 'No description available for this product.'}
              </p>
            </div>

            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[1.05rem] font-semibold text-white shadow-lg transition-all duration-300 ${
                product.stock > 0
                  ? 'bg-orange-500 shadow-orange-500/20 hover:bg-orange-600 hover:shadow-orange-500/35 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5 shadow-none'
              }`}
            >
              <ShoppingBag className="h-5 w-5" />
              {product.stock > 0 ? 'Add to Shopping Cart' : 'Out of Stock'}
            </button>
            
            {/* Stock Indicator */}
            <div className="mt-4 flex items-center gap-2 text-sm font-medium">
              <span className={`inline-block h-2.5 w-2.5 rounded-full ${product.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
              <span className={product.stock > 0 ? 'text-emerald-400' : 'text-red-400'}>
                {product.stock > 0 
                  ? `In Stock (${product.stock} units available)` 
                  : 'Temporarily Out of Stock'}
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetail;