import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {  
  Mail, 
  Shield, 
  LogOut, 
  Package, 
  ShoppingBag, 
  Loader2, 
  Calendar, 
  IndianRupee 
} from 'lucide-react';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchMyOrders = async () => {
      try {
        const res = await fetch('/api/orders/myorders', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          if (res.status === 401) {
            logout();
            navigate('/login');
          }
          setOrders([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, [user, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400';
      case 'Shipped':
        return 'border-blue-500/30 bg-blue-500/10 text-blue-400';
      case 'Cancelled':
        return 'border-red-500/30 bg-red-500/10 text-red-400';
      default:
        return 'border-amber-500/30 bg-amber-500/10 text-amber-400';
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-10">
        
        {/* Profile Card Header */}
        <section className="relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/60 p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
          {/* Background Glow */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* User Info Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-xl font-bold text-orange-500">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {user.name}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-orange-400">
                    <Shield className="h-3 w-3" />
                    {user.role}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-sm text-zinc-400 sm:flex-row sm:gap-6 pt-2">
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-zinc-500" />
                  {user.email}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <div>
              <button
                onClick={handleLogout}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-400 transition-all duration-300 hover:border-red-500 hover:bg-red-500/20 hover:-translate-y-0.5 sm:w-auto"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </section>

        {/* Orders Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2.5">
              <Package className="h-6 w-6 text-orange-500" />
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                Order History
              </h2>
            </div>
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
              {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
            </span>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-zinc-900/30 py-16 text-zinc-400">
              <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
              <p className="mt-3 text-sm font-medium">Fetching your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 py-16 px-4 text-center">
              <Package className="h-12 w-12 text-zinc-600 mb-3" />
              <h3 className="text-lg font-semibold text-zinc-200">No orders placed yet</h3>
              <p className="mt-1 max-w-sm text-sm text-zinc-500">
                You haven't purchased anything yet. Explore our catalog and grab your favorite gear!
              </p>
              <Link
                to="/shop"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:bg-orange-600 hover:-translate-y-0.5"
              >
                <ShoppingBag className="h-4 w-4" />
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="group flex flex-col justify-between gap-4 rounded-xl border border-white/5 bg-zinc-900/40 p-5 transition-all duration-300 hover:border-orange-500/30 hover:bg-zinc-900/80 sm:flex-row sm:items-center sm:p-6"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Order #
                      </span>
                      <span className="font-mono text-sm font-medium text-zinc-200">
                        {order._id}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                        {new Date(order.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>

                      <span>•</span>

                      <span className="flex items-center gap-1 font-semibold text-emerald-400">
                        <IndianRupee className="h-3.5 w-3.5" />
                        {order.totalAmount?.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center sm:justify-end">
                    <span
                      className={`inline-flex items-center rounded-full border px-3.5 py-1 text-xs font-semibold tracking-wide ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {order.status || 'Processing'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default Profile;