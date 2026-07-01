"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MorphCarousel } from "@/components/lightswind-pro/morph-carousel";

interface Plan {
  speed: number;
  price: number;
  type: string;
  features: string[];
  popular?: boolean;
}

export default function Home() {
  const [speedSlider, setSpeedSlider] = useState(2); // index of default package (30 Mbps)
  const [coverageSearch, setCoverageSearch] = useState("");
  const [coverageResult, setCoverageResult] = useState<string | null>(null);

  const coverageAreas = [
    "Kadomtoli",
    "Aganagar",
    "Chunkutia",
    "Zinjira",
    "Kaliganj",
    "Telghat",
    "Kholamura",
    "East Aganagar",
    "Char Kaliganj",
    "Doleshwar",
  ];

  const packages: Plan[] = [
    {
      speed: 10,
      price: 500,
      type: "Home Starter",
      features: [
        "Buffer-free YouTube & Facebook",
        "Unlimited Data Usage",
        "Ideal for 2-3 Devices",
        "24/7 Phone Support",
        "Shared Bandwidth",
      ],
    },
    {
      speed: 20,
      price: 800,
      type: "Home Standard",
      features: [
        "Super-fast FTP & Torrenting",
        "Seamless Full HD Streaming",
        "Ideal for 4-6 Devices",
        "Priority Customer Support",
        "Public IP on request",
      ],
    },
    {
      speed: 30,
      price: 1000,
      type: "Super Gamer",
      popular: true,
      features: [
        "Low-Ping Gamer Routing",
        "Free BDIX & Local FTP Access",
        "Ideal for 7-10 Devices",
        "4K UHD Support",
        "24/7 Dedicated Support Hotline",
      ],
    },
    {
      speed: 50,
      price: 1500,
      type: "Ultra Power",
      features: [
        "Dedicated Speed Allocation",
        "Extremely Low Latency BGP Routing",
        "Best for heavy downloaders & Work From Home",
        "Static Public IP Included",
        "Priority SLA < 1 Hour",
      ],
    },
    {
      speed: 100,
      price: 2500,
      type: "SOHO Premium",
      features: [
        "Symmetric 1:1 Dedicated Bandwidth",
        "Multi-Homing Routing (AS150164)",
        "Perfect for small offices & Content Creators",
        "Premium SLA < 30 mins Support",
        "Dual-WAN Failover Support",
      ],
    },
  ];

  const handleCoverageSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverageSearch.trim()) {
      setCoverageResult(null);
      return;
    }
    const matched = coverageAreas.some(
      (area) => area.toLowerCase().includes(coverageSearch.toLowerCase())
    );
    if (matched) {
      setCoverageResult(`Yes! We have high-speed optical fiber coverage in "${coverageSearch}".`);
    } else {
      setCoverageResult(
        `Coverage is currently limited in "${coverageSearch}". Contact us to request feasibility check!`
      );
    }
  };

  const selectedPlan = packages[speedSlider];

  return (
    <div className="flex flex-col gap-20 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-10 pb-16">
        {/* Morph Carousel Background Animation */}
        <div className="absolute inset-0 w-full h-full opacity-[0.18] z-0 pointer-events-none">
          <MorphCarousel />
        </div>
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-cyan/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-brand-blue/15 blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col gap-6 animate-fade-in-up">
            <div className="inline-flex self-center lg:self-start items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-semibold tracking-wider uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-ping" />
              BTRC Licensed Broadband Provider
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Blazing Fast Fiber <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue text-glow">
                Internet in Keraniganj
              </span>
            </h1>

            <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              M Amin Network (ASN: AS150164) is South Keraniganj&apos;s leading ISP. We provide high-speed, SLA-backed, stable internet with dedicated routing to gaming, streaming, and FTP servers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
              <Link
                href="/packages"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark font-bold hover:opacity-90 transition-opacity shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                View Pricing Packages
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/coverage"
                className="px-8 py-4 rounded-xl bg-brand-card hover:bg-brand-border/60 border border-brand-border text-white font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Check Coverage Area
              </Link>
            </div>

            {/* Quick Coverage Form */}
            <div className="mt-8 p-5 glass-panel rounded-2xl border-brand-border/60 max-w-md mx-auto lg:mx-0 text-left">
              <h4 className="text-sm font-semibold text-white mb-2">Check availability in your area:</h4>
              <form onSubmit={handleCoverageSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Kadomtoli, Aganagar"
                  value={coverageSearch}
                  onChange={(e) => setCoverageSearch(e.target.value)}
                  className="bg-brand-dark border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan flex-grow"
                />
                <button
                  type="submit"
                  className="bg-brand-blue text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-blue/90 transition-colors"
                >
                  Check
                </button>
              </form>
              {coverageResult && (
                <p
                  className={`text-xs mt-3 font-semibold ${
                    coverageResult.startsWith("Yes") ? "text-emerald-400" : "text-amber-400"
                  }`}
                >
                  {coverageResult}
                </p>
              )}
            </div>
          </div>

          {/* Interactive Hero Visual */}
          <div className="lg:col-span-5 flex flex-col justify-center animate-fade-in-up">
            <div className="relative p-8 rounded-3xl bg-brand-card/60 border border-brand-border/80 shadow-2xl overflow-hidden glass-panel">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-2xl" />
              
              <div className="flex items-center justify-between border-b border-brand-border pb-6 mb-6">
                <div>
                  <h3 className="text-white font-bold text-lg">Speed Configurator</h3>
                  <p className="text-xs text-slate-400">Drag to change bandwidth requirements</p>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded bg-brand-blue/15 text-brand-cyan font-mono border border-brand-cyan/20">
                  AS150164 BGP
                </span>
              </div>

              {/* Central Speed Ring */}
              <div className="flex flex-col items-center justify-center py-6">
                <div className="relative w-44 h-44 rounded-full border-4 border-dashed border-brand-border flex flex-col items-center justify-center shadow-[0_0_40px_rgba(0,114,255,0.05)]">
                  <div className="absolute inset-2 rounded-full bg-brand-dark flex flex-col items-center justify-center">
                    <span className="text-5xl font-black text-white text-glow-blue leading-none">
                      {selectedPlan.speed}
                    </span>
                    <span className="text-brand-cyan text-xs font-bold tracking-widest mt-1">
                      MBPS
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-brand-cyan/30 animate-pulse-slow" />
                </div>
                <span className="text-brand-cyan text-sm font-semibold mt-4 tracking-wider uppercase">
                  {selectedPlan.type}
                </span>
              </div>

              {/* Slider */}
              <div className="mb-6 mt-4">
                <input
                  type="range"
                  min="0"
                  max={packages.length - 1}
                  value={speedSlider}
                  onChange={(e) => setSpeedSlider(Number(e.target.value))}
                  className="w-full h-2 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-cyan focus:outline-none"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-2">
                  <span>10 Mbps</span>
                  <span>20 Mbps</span>
                  <span>30 Mbps</span>
                  <span>50 Mbps</span>
                  <span>100 Mbps</span>
                </div>
              </div>

              {/* Dynamic Price */}
              <div className="flex items-center justify-between bg-brand-dark/60 border border-brand-border/60 rounded-2xl p-4">
                <div>
                  <span className="text-xs text-slate-400 block">Monthly Price</span>
                  <span className="text-xl font-bold text-white font-mono">৳{selectedPlan.price} BDT</span>
                </div>
                <Link
                  href={`/packages?plan=${selectedPlan.speed}`}
                  className="bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark text-sm font-extrabold px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Order Plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { metric: "99.9%", title: "Guaranteed Uptime", desc: "Redundant upstream connections", glow: "text-glow" },
            { metric: "10k+", title: "Active Clients", desc: "Trusted by homes & businesses", glow: "text-glow" },
            { metric: "10 Gbps+", title: "BGP Capacity", desc: "AS150164 network backbone", glow: "text-glow" },
            { metric: "< 30 Min", title: "Support Response", desc: "Expert technical field support", glow: "text-glow" },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-brand-card/40 border border-brand-border/40 text-center glass-panel"
            >
              <h3 className={`text-3xl sm:text-4xl font-extrabold text-brand-cyan mb-2 ${stat.glow}`}>
                {stat.metric}
              </h3>
              <h4 className="text-white font-bold text-sm sm:text-base tracking-wide">{stat.title}</h4>
              <p className="text-xs text-slate-400 mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Network Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-brand-cyan uppercase mb-3">Core Infrastructure</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Why Choose M Amin Network?
          </h3>
          <p className="text-slate-400 mt-4">
            We operate our own BGP autonomous system routing (AS150164) directly peering with all major exchanges to guarantee absolute lowest latency for gaming, VoIP, and video calling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "100% Fiber Optic (FTTH)",
              desc: "Pure optical fiber direct to your home. No copper line degradation, providing immune connectivity to atmospheric interference and electrical storms.",
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
            },
            {
              title: "Dedicated BGP Routing",
              desc: "Operating AS150164 enables smart routing policies. We peer directly with BDIX, GGC (Google), SNA (Facebook), and major localized content delivery caches.",
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a10.5 10.5 0 0114.14 0M1.414 7.05a16.5 16.5 0 0121.172 0" />
                </svg>
              ),
            },
            {
              title: "Low-Ping Gamer Optimizations",
              desc: "Specialized low-latency paths to Southeast Asia and European servers (PUBG, Free Fire, CS2, Valorant). Zero packet loss, steady pings, and jitter control.",
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              ),
            },
            {
              title: "24/7 Priority SLA Support",
              desc: "No waiting for hours. Our localized support hub in South Keraniganj ensures our field technicians are dispatched to your home or office in record time.",
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ),
            },
            {
              title: "BDIX & Local FTP Access",
              desc: "Get unlimited speeds of up to 100 Mbps to localized Bangladesh Internet Exchange (BDIX) resources, local FTP server movies, live TV, and games caches.",
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              ),
            },
            {
              title: "Corporate Dedicated Backup",
              desc: "Dual backbones with auto-failover, ensuring continuous SLA-backed business operations. Static IPs, multi-router protocols, and direct client portal support.",
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              ),
            },
          ].map((feat, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-brand-card/50 border border-brand-border/60 glass-panel glass-panel-hover flex flex-col gap-4 text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-blue/20 text-brand-cyan flex items-center justify-center border border-brand-cyan/20">
                {feat.icon}
              </div>
              <h4 className="text-lg font-bold text-white tracking-wide">{feat.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Review Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <h2 className="text-xs font-bold tracking-widest text-brand-cyan uppercase mb-3">Testimonials</h2>
        <h3 className="text-3xl font-extrabold text-white mb-12">What Our Customers in Keraniganj Say</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {[
            {
              name: "Tanvir Ahmed",
              role: "Local Freelance Web Developer",
              comment:
                "As a developer, I need constant SSH connections and Git pushes. M Amin Network gives me rock-solid uptime. Their low-latency routing to GitHub and Vercel has boosted my workflow tremendously. Easily the best ISP in Kadomtoli!",
              rating: 5,
            },
            {
              name: "Kamrul Hasan",
              role: "Proprietor, Hasan Trading, Aganagar",
              comment:
                "We upgraded our shop's POS and billing terminals to M Amin Network's corporate dedicated plan. Uptime is outstanding and we haven't experienced a single transaction outage. Highly recommended for corporate connections.",
              rating: 5,
            },
          ].map((test, i) => (
            <div key={i} className="p-8 rounded-2xl bg-brand-card/40 border border-brand-border/40 glass-panel flex flex-col justify-between">
              <p className="text-slate-300 italic leading-relaxed text-sm">&ldquo;{test.comment}&rdquo;</p>
              <div className="mt-6 flex items-center justify-between border-t border-brand-border/40 pt-4">
                <div>
                  <h4 className="text-white font-bold text-sm">{test.name}</h4>
                  <p className="text-xs text-brand-cyan">{test.role}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: test.rating }).map((_, starIdx) => (
                    <svg
                      key={starIdx}
                      className="w-4 h-4 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-12 rounded-3xl bg-gradient-to-r from-brand-blue/30 via-brand-dark to-brand-cyan/20 border border-brand-border/80 text-center relative overflow-hidden glass-panel">
          <div className="absolute inset-0 bg-brand-blue/5 animate-pulse-slow pointer-events-none" />
          <h3 className="text-3xl font-extrabold text-white mb-4">Ready to Experience True High-Speed Internet?</h3>
          <p className="text-slate-300 max-w-xl mx-auto mb-8 text-sm sm:text-base">
            Get in touch with our team today and enjoy free installation with selected annual subscription plans. Connection within 24 hours guaranteed!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/packages"
              className="bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark px-8 py-4 rounded-xl text-base font-bold shadow-lg shadow-brand-blue/20 hover:opacity-90 transition-opacity cursor-pointer"
            >
              Get Connected Now
            </Link>
            <a
              href="tel:+8801707009267"
              className="bg-brand-card hover:bg-brand-border/60 border border-brand-border text-white px-8 py-4 rounded-xl text-base font-bold transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call +8801707009267
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
