import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';
import { LockKeyhole, MapPin, ShieldCheck } from 'lucide-react';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '', street: '', city: '', postalCode: '', country: ''
  });

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handlePayment = async () => {
    try {
      const orderRes = await fetch('/api/payment/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice })
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        const fallback = window.confirm("Razorpay keys unconfigured on backend. Use Student Bypass Mode to place test order?");
        if (fallback) {
          return bypassPayment();
        } else {
          return alert("Payment failed to initialize");
        }
      }

      const options = {
        key: 'rzp_test_dummykey123',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ShopNest',
        description: 'Test Transaction',
        order_id: orderData.id,
        handler: async function (response) {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
          });
          if (verifyRes.ok) {
            const saveOrderRes = await fetch('/api/orders', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
              },
              body: JSON.stringify({
                items: cartItems,
                totalAmount: totalPrice,
                address,
                paymentId: response.razorpay_payment_id
              })
            });

            if (saveOrderRes.ok) {
              dispatch(clearCart());
              navigate('/ordersuccess');
            } else {
              alert('Order saving failed');
            }
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: address.fullName,
          email: user?.email,
          contact: '9999999999'
        },
        theme: {
          color: '#f97316'
        }
      };
      
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
    }
  };

  const bypassPayment = async () => {
    const saveOrderRes = await fetch('/api/orders', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify({
        items: cartItems,
        totalAmount: totalPrice,
        address,
        paymentId: 'bypass_txn_' + Date.now()
      })
    });
    if (saveOrderRes.ok) {
      dispatch(clearCart());
      navigate('/ordersuccess');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first");
      navigate('/login');
      return;
    }
    handlePayment();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090b] p-4 py-10 text-white sm:p-8">
      <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-[#18181b] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <div className="border-b border-white/10 bg-gradient-to-r from-orange-500/10 via-transparent to-transparent p-6 sm:p-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400">
            <MapPin className="h-6 w-6" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-400">Almost yours</p>
          <h2 className="mb-0 mt-2 text-3xl font-bold tracking-tight text-white">Checkout</h2>
          <p className="mt-2 text-sm text-zinc-400">Add your delivery details to finish your order.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6 sm:p-8">
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-zinc-300">
            Shipping address
          </h3>

          <div className="flex flex-col gap-3.5">
            <input
              type="text"
              placeholder="Full Name"
              required
              value={address.fullName}
              onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
              className="w-full rounded-xl border border-[#27272a] bg-[#09090b] px-4 py-3.5 text-white placeholder:text-zinc-500 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
            />
            <input
              type="text"
              placeholder="Street"
              required
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              className="w-full rounded-xl border border-[#27272a] bg-[#09090b] px-4 py-3.5 text-white placeholder:text-zinc-500 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="City"
                required
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="w-full rounded-xl border border-[#27272a] bg-[#09090b] px-4 py-3.5 text-white placeholder:text-zinc-500 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
              />
              <input
                type="text"
                placeholder="Postal Code"
                required
                value={address.postalCode}
                onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                className="w-full rounded-xl border border-[#27272a] bg-[#09090b] px-4 py-3.5 text-white placeholder:text-zinc-500 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
              />
            </div>

            <input
              type="text"
              placeholder="Country"
              required
              value={address.country}
              onChange={(e) => setAddress({ ...address, country: e.target.value })}
              className="w-full rounded-xl border border-[#27272a] bg-[#09090b] px-4 py-3.5 text-white placeholder:text-zinc-500 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
            />
          </div>

          <div className="mt-1 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
            <div>
              <span className="mb-1 flex items-center gap-1.5 text-xs font-medium text-zinc-400"><LockKeyhole className="h-3.5 w-3.5" /> Secure total</span>
              <span className="text-2xl font-bold text-white">₹{totalPrice.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-400 active:translate-y-0"
            >
              <ShieldCheck className="h-4 w-4" />
              Pay securely
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;