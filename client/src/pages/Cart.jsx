import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, addToCart } from '../redux/cartSlice';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShoppingCart } from 'lucide-react';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty }));
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-5">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-7 w-7 text-orange-500" />
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-white">
              Shopping Cart
            </h1>
          </div>
          <span className="text-sm font-medium text-zinc-400">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 py-20 px-4 text-center">
            <ShoppingBag className="mb-4 h-14 w-14 text-zinc-600" />
            <h2 className="text-xl font-semibold text-zinc-200">Your cart is currently empty</h2>
            <p className="mt-2 max-w-sm text-sm text-zinc-500">
              Looks like you haven't added anything yet. Explore our store to find what you need!
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:bg-orange-600 hover:-translate-y-0.5"
            >
              <ShoppingBag className="h-4 w-4" />
              Go Shopping
            </Link>
          </div>
        ) : (
          /* Cart Layout */
          <div className="flex flex-col gap-10 lg:flex-row">
            
            {/* Left: Cart Items List */}
            <div className="flex flex-1 flex-col gap-5">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="group flex flex-col sm:flex-row items-center gap-6 rounded-2xl border border-white/5 bg-[#18181b] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:translate-x-1 hover:border-orange-500/20"
                >
                  <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-zinc-950">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between self-stretch text-left">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white line-clamp-1">{item.name}</h3>
                        <p className="mt-1 text-base font-bold text-orange-500">₹{item.price}</p>
                      </div>
                      <button
                        onClick={() => handleRemove(item.productId)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove
                      </button>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() => handleUpdateQty(item, item.qty - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-200 transition-all duration-200 hover:border-orange-500 hover:bg-orange-500 hover:text-white cursor-pointer"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-[24px] text-center text-base font-semibold text-white">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => handleUpdateQty(item, item.qty + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-200 transition-all duration-200 hover:border-orange-500 hover:bg-orange-500 hover:text-white cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Cart Summary Sidebar */}
            <div className="w-full lg:w-[380px]">
              <div className="sticky top-24 rounded-2xl border border-white/5 bg-[#18181b] p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                <h3 className="border-b border-white/10 pb-4 text-xl font-bold tracking-tight text-white">
                  Order Summary
                </h3>

                <div className="mt-6 space-y-3 text-sm text-zinc-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-zinc-200">₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="text-emerald-400">Free</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-4 text-lg font-bold text-white">
                    <span>Total Amount</span>
                    <span className="text-orange-500">₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:bg-orange-600 hover:shadow-orange-500/40 hover:-translate-y-0.5"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;