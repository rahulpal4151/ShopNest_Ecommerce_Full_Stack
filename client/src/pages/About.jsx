import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Headphones, 
  Sparkles,  
  Award, 
  RefreshCcw, 
  Lock 
} from 'lucide-react';

const About = () => {


  const values = [
    {
      icon: <Award className="h-6 w-6 text-orange-500" />,
      title: "Authenticity Guaranteed",
      desc: "Every item in our collection goes through rigorous quality checks before reaching your doorstep."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-orange-500" />,
      title: "Customer-First Experience",
      desc: "From smooth browsing to instant checkout, we build features that keep your convenience at center stage."
    },
    {
      icon: <RefreshCcw className="h-6 w-6 text-orange-500" />,
      title: "Hassle-Free Returns",
      desc: "Not satisfied with your order? Our straightforward return and exchange policies protect your purchase."
    },
    {
      icon: <Lock className="h-6 w-6 text-orange-500" />,
      title: "Secure Shopping",
      desc: "Industry-standard SSL encryption and trusted gateways safeguard your payment and personal data."
    }
  ];

  const founders = [
    {
      name: "Rahul Pal",
      role: "Co-Founder & Chief Technology Officer",
      image: "/rahul.jpg",
      fallback: "/dp.jpg",
      bio: "Leading full-stack architecture, performance optimization, and reliable infrastructure.",
      linkedin: "https://linkedin.com",
      twitter: "https://x.com/the_rahulpal"
    },
    {
      name: "Shivansh Vasu",
      role: "Co-Founder & Chief Product Officer",
      image: "/dp.jpg",
      fallback: "/dp.jpg",
      bio: "Driving modern user experiences, product strategy, and scalable consumer solutions.",
      linkedin: "https://www.linkedin.com/in/theshivanshvasu",
      twitter: "https://x.com/theshivanshvasu"
    }
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-16">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/40 p-8 sm:p-14 text-center backdrop-blur-md">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-56 w-56 rounded-full bg-orange-500/15 blur-3xl pointer-events-none" />

          <span className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-orange-500">
            Our Story & Mission
          </span>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Redefining Modern <span className="text-orange-500">Online Retail</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base sm:text-lg leading-relaxed text-zinc-400">
            Founded with a commitment to simplify shopping, <strong className="text-white">ShopNest</strong> curates premium, reliable lifestyle essentials under one unified platform. We bridge the gap between premium design, accessible pricing, and instant logistics.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:bg-orange-600 hover:-translate-y-0.5"
            >
              <ShoppingBag className="h-4 w-4" /> Start Shopping
            </Link>
          </div>
        </section>


        {/* Brand Core Pillars */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-white">Why Trust ShopNest</h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400">Built on trust, speed, and continuous customer satisfaction.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div 
                key={i} 
                className="group rounded-2xl border border-white/5 bg-zinc-900/40 p-6 transition-all duration-300 hover:border-orange-500/30 hover:bg-zinc-900/80 hover:-translate-y-1"
              >
                <div className="mb-4 inline-block rounded-xl bg-orange-500/10 p-3">
                  {v.icon}
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-orange-500 transition-colors">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership / Founders */}
        <section className="rounded-3xl border border-white/5 bg-zinc-900/30 p-8 sm:p-12">
          <div className="text-center mb-10">
            <span className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-orange-500">
              The Minds Behind ShopNest
            </span>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Executive Leadership</h2>
            <p className="mt-2 text-sm text-zinc-400">Passionate engineers and entrepreneurs committed to building the future of commerce.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {founders.map((founder, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center rounded-2xl border border-white/5 bg-zinc-900/60 p-8 text-center transition-all duration-300 hover:border-orange-500/30 hover:bg-zinc-900/90"
              >
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="h-32 w-32 rounded-full border-4 border-orange-500 object-cover shadow-[0_4px_25px_rgba(249,115,22,0.35)]"
                  onError={(e) => { e.target.src = founder.fallback; }}
                />
                
                <h3 className="mt-5 text-xl font-bold text-white">{founder.name}</h3>
                <p className="mt-1 text-sm font-medium text-orange-500">{founder.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{founder.bio}</p>

                <div className="mt-6 flex items-center gap-3">
                  <a 
                    href={founder.linkedin} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/40 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400 transition-all hover:bg-blue-500/20 hover:border-blue-500"
                  >
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </a>

                  <a 
                    href={founder.twitter} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-zinc-800/80 px-3 py-1.5 text-xs font-medium text-white transition-all hover:border-zinc-500 hover:bg-zinc-700"
                  >
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    X (Twitter)
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Badges */}
        <section className="border-t border-white/5 pt-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
            <div className="flex flex-col items-center">
              <Truck className="h-7 w-7 text-orange-500 mb-2" />
              <h4 className="text-sm font-semibold text-white">Express Delivery</h4>
              <p className="text-xs text-zinc-400 mt-1">Dispatched within 24 hours</p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-7 w-7 text-orange-500 mb-2" />
              <h4 className="text-sm font-semibold text-white">100% Authentic</h4>
              <p className="text-xs text-zinc-400 mt-1">Direct from manufacturers</p>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCcw className="h-7 w-7 text-orange-500 mb-2" />
              <h4 className="text-sm font-semibold text-white">Easy Returns</h4>
              <p className="text-xs text-zinc-400 mt-1">7-day replacement guarantee</p>
            </div>
            <div className="flex flex-col items-center">
              <Headphones className="h-7 w-7 text-orange-500 mb-2" />
              <h4 className="text-sm font-semibold text-white">24/7 Helpline</h4>
              <p className="text-xs text-zinc-400 mt-1">Instant chat & call support</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;