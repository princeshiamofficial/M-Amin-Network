"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MorphCarousel } from "@/components/lightswind-pro/morph-carousel";
import { useTranslation } from "@/hooks/useTranslation";

interface Plan {
  speed: number;
  price: number;
  type: string;
  features: string[];
  popular?: boolean;
}

interface CountUpProps {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

function CountUp({ end, duration = 2000, decimals = 0, suffix = "", prefix = "" }: CountUpProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(progress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {suffix}
    </span>
  );
}

export default function Home() {
  const lang = useTranslation();
  const t = (en: string, bn: string) => (lang === "BN" ? bn : en);

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
      type: t("Home Starter", "হোম স্টার্টার"),
      features: [
        t("Buffer-free YouTube & Facebook", "বাফার-মুক্ত ইউটিউব ও ফেসবুক"),
        t("Unlimited Data Usage", "আনলিমিটেড ডাটা ব্যবহার"),
        t("Ideal for 2-3 Devices", "২-৩টি ডিভাইসের জন্য আদর্শ"),
        t("24/7 Phone Support", "২৪/৭ ফোন সাপোর্ট"),
        t("Shared Bandwidth", "শেয়ার্ড ব্যান্ডউইথ"),
      ],
    },
    {
      speed: 20,
      price: 800,
      type: t("Home Standard", "হোম স্ট্যান্ডার্ড"),
      features: [
        t("Super-fast FTP & Torrenting", "সুপার-ফাস্ট এফটিপি ও টরেন্টিং"),
        t("Seamless Full HD Streaming", "সিমলেস ফুল এইচডি স্ট্রিমিং"),
        t("Ideal for 4-6 Devices", "৪-৬টি ডিভাইসের জন্য আদর্শ"),
        t("Priority Customer Support", "অগ্রাধিকার গ্রাহক সহায়তা"),
        t("Public IP on request", "অনুরোধে পাবলিক আইপি"),
      ],
    },
    {
      speed: 30,
      price: 1000,
      type: t("Super Gamer", "সুপার গেমার"),
      popular: true,
      features: [
        t("Low-Ping Gamer Routing", "লো-পিং গেমার রাউটিং"),
        t("Free BDIX & Local FTP Access", "ফ্রি বিডিআইএক্স ও লোকাল এফটিপি অ্যাক্সেস"),
        t("Ideal for 7-10 Devices", "৭-১০টি ডিভাইসের জন্য আদর্শ"),
        t("4K UHD Support", "৪কে ইউএইচডি সাপোর্ট"),
        t("24/7 Dedicated Support Hotline", "২৪/৭ ডেডিকেটেড সাপোর্ট হটলাইন"),
      ],
    },
    {
      speed: 50,
      price: 1500,
      type: t("Ultra Power", "আল্ট্রা পাওয়ার"),
      features: [
        t("Dedicated Speed Allocation", "ডেডিকেটেড স্পিড অ্যালোকেশন"),
        t("Extremely Low Latency BGP Routing", "অত্যন্ত কম লেটেন্সি বিজিপি রাউটিং"),
        t("Best for heavy downloaders & Work From Home", "হেভি ডাউনলোডার এবং ওয়ার্ক ফ্রম হোমের জন্য সেরা"),
        t("Static Public IP Included", "স্ট্যাটিক পাবলিক আইপি অন্তর্ভুক্ত"),
        t("Priority SLA < 1 Hour", "অগ্রাধিকার এসএলএ < ১ ঘণ্টা"),
      ],
    },
    {
      speed: 100,
      price: 2500,
      type: t("SOHO Premium", "SOHO প্রিমিয়াম"),
      features: [
        t("Symmetric 1:1 Dedicated Bandwidth", "সিমেট্রিক ১:১ ডেডিকেটেড ব্যান্ডউইথ"),
        t("Multi-Homing Routing (AS150164)", "মাল্টি-হোমিং রাউটিং (AS150164)"),
        t("Perfect for small offices & Content Creators", "ছোট অফিস এবং কন্টেন্ট ক্রিয়েটরদের জন্য উপযুক্ত"),
        t("Premium SLA < 30 mins Support", "প্রিমিয়াম এসএলএ < ৩০ মিনিট সাপোর্ট"),
        t("Dual-WAN Failover Support", "ডুয়াল-ওয়্যান ফেইলওভার সাপোর্ট"),
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
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-10 pb-16 overflow-hidden">
        {/* Background Decorative Wrappers */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          {/* Morph Carousel Background Animation */}
          <div className="absolute inset-0 w-full h-full opacity-[0.8] transition-opacity duration-300">
            <MorphCarousel
              images={[
                "/28ca5e1d52c944ebfc4dd9f2b300980d.jpg",
                "/6c55d74de82b7eee7127c3e2d4939b1f.jpg",
                "/933503ea823535235e8159f65709292f.jpg",
                "/ea82d2834f062ee8d73d8b99aebe0d31.jpg",
              ]}
            />
          </div>
          {/* Theme-aware overlay for text readability contrast */}
          <div className="absolute inset-0 hero-overlay pointer-events-none" />
          {/* Glow Effects */}
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-cyan/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-brand-blue/15 blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col gap-6 animate-fade-in-up">
            <div className="inline-flex self-center lg:self-start items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-semibold tracking-wider uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-ping" />
              {t("BTRC Licensed Broadband Provider", "বিটিআরসি অনুমোদিত ব্রডব্যান্ড প্রোভাইডার")}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              {t("Blazing Fast Fiber", "দ্রুতগতির ফাইবার")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue text-glow">
                {t("Internet in Keraniganj", "ইন্টারনেট কেরানীগঞ্জে")}
              </span>
            </h1>

            <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t(
                "M Amin Network (AS150164) is South Keraniganj's leading ISP, offering high-speed, SLA-backed stable internet with dedicated routing.",
                "এম আমিন নেটওয়ার্ক (AS150164) দক্ষিণ কেরানীগঞ্জের শীর্ষস্থানীয় আইএসপি, যা ডেডিকেটেড রাউটিংসহ উচ্চগতির এবং স্থিতিশীল ইন্টারনেট প্রদান করে।"
              )}
            </p>

             <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mt-4">
              <Link
                href="/packages"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark text-sm font-extrabold hover:opacity-90 transition-opacity shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                {t("View Packages", "প্যাকেজ সমূহ দেখুন")}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/coverage"
                className="px-5 py-2.5 rounded-xl bg-brand-card hover:bg-brand-border/60 border border-brand-border text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Check Coverage
              </Link>
            </div>

            {/* Quick Coverage Form */}
            <div className="hidden mt-8 p-5 glass-panel rounded-2xl border-brand-border/60 max-w-md mx-auto lg:mx-0 text-left">
              <h4 className="text-sm font-semibold text-white mb-2">Check availability in your area:</h4>
              <form onSubmit={handleCoverageSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Kadomtoli, Aganagar"
                  value={coverageSearch}
                  onChange={(e) => setCoverageSearch(e.target.value)}
                  className="bg-brand-dark border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan flex-grow min-w-0"
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

          {/* Interactive Hero Visual (hidden visually, but kept in code) */}
          <div className="hidden">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-brand-card/60 border border-brand-border/80 shadow-2xl overflow-hidden glass-panel">
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

        {/* Trust Stats Metrics (moved into hero) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-5xl mx-auto lg:mx-0 animate-fade-in-up">
          {[
            { end: 99.9, decimals: 1, suffix: "%", title: "Guaranteed Uptime", desc: "Redundant upstream connections", glow: "text-glow" },
            { end: 2000, decimals: 0, suffix: "+", title: "Active Clients", desc: "Trusted by homes & businesses", glow: "text-glow" },
            { end: 10, decimals: 0, suffix: "+", title: "Cities Served", desc: "Across South Keraniganj", glow: "text-glow" },
            { end: 24, decimals: 0, suffix: "/7", title: "Support Response", desc: "Expert technical field support", glow: "text-glow" },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-3 sm:p-4 rounded-xl bg-brand-card/40 border border-brand-border/40 text-center glass-panel"
            >
              <h3 className={`text-2xl sm:text-3xl font-extrabold text-brand-cyan mb-1.5 ${stat.glow}`}>
                <CountUp end={stat.end} decimals={stat.decimals} suffix={stat.suffix} />
              </h3>
              <h4 className="text-white font-bold text-xs sm:text-sm tracking-wide">{t(stat.title, stat.title === "Guaranteed Uptime" ? "গ্যারান্টিড আপটাইম" : stat.title === "Active Clients" ? "সক্রিয় গ্রাহক" : stat.title === "Cities Served" ? "পরিষেবা এলাকা" : "সহায়তা প্রতিক্রিয়া")}</h4>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-1">{t(stat.desc, stat.desc === "Redundant upstream connections" ? "অতিরিক্ত আপস্ট্রিম সংযোগ" : stat.desc === "Trusted by homes & businesses" ? "বাসা ও ব্যবসার বিশ্বস্ত অংশীদার" : stat.desc === "Across South Keraniganj" ? "দক্ষিণ কেরানীগঞ্জ জুড়ে" : "দক্ষ টেকনিক্যাল ফিল্ড সাপোর্ট")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Network Features Section */}
      <section className="w-full bg-white py-16 relative overflow-hidden border-y border-slate-100 shadow-inner text-slate-900 -mt-20 -mb-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-3">{t("Core Infrastructure", "মূল অবকাঠামো")}</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {t("Why Choose M Amin Network?", "কেন এম আমিন নেটওয়ার্ক বেছে নেবেন?")}
            </h3>
            <p className="text-slate-600 mt-4 leading-relaxed">
              {t(
                "We operate our own BGP autonomous system routing (AS150164) directly peering with all major exchanges to guarantee absolute lowest latency for gaming, VoIP, and video calling.",
                "আমরা আমাদের নিজস্ব বিজিপি স্বায়ত্তশাসিত রাউটিং (AS150164) পরিচালনা করি এবং গেমিং, ভিওআইপি ও ভিডিও কলের জন্য সর্বনিম্ন লেটেন্সি নিশ্চিত করতে সরাসরি সমস্ত বড় এক্সচেঞ্জের সাথে যুক্ত হয়েছি।"
              )}
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
              className="p-8 rounded-3xl bg-slate-50 border border-slate-200/60 shadow-sm hover:shadow-md hover:border-brand-blue/20 hover:scale-[1.01] transition-all flex flex-col gap-4 text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/25">
                {feat.icon}
              </div>
              <h4 className="text-lg font-bold text-slate-900 tracking-wide">
                {t(feat.title, feat.title === "100% Fiber Optic (FTTH)" ? "১০০% ফাইবার অপটিক (FTTH)" : feat.title === "Dedicated BGP Routing" ? "ডেডিকেটেড বিজিপি রাউটিং" : feat.title === "Low-Ping Gamer Optimizations" ? "লো-পিং গেমার অপ্টিমাইজেশান" : feat.title === "24/7 Priority SLA Support" ? "২৪/৭ অগ্রাধিকার SLA সাপোর্ট" : feat.title === "BDIX & Local FTP Access" ? "BDIX ও লোকাল এফটিপি অ্যাক্সেস" : "কর্পোরেট ডেডিকেটেড ব্যাকআপ")}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t(feat.desc, feat.desc.startsWith("Pure") ? "সরাসরি আপনার বাসায় বিশুদ্ধ অপটিক্যাল ফাইবার। কোনো তামার তারের অবনতি নেই, যা বায়ুমণ্ডলীয় হস্তক্ষেপ ও বজ্রপাত থেকে নিরাপদ সংযোগ প্রদান করে।" : feat.desc.startsWith("Operating") ? "AS150164 পরিচালনা আমাদের স্মার্ট রাউটিং পলিসি সক্ষম করে। আমরা সরাসরি BDIX, GGC (গুগল), SNA (ফেসবুক) এবং প্রধান লোকাল ক্যাশ সার্ভারের সাথে যুক্ত।" : feat.desc.startsWith("Specialized") ? "দক্ষিণ-পূর্ব এশিয়া ও ইউরোপীয় সার্ভারে বিশেষায়িত লো-লেটেন্সি পাথ (PUBG, Free Fire, CS2, Valorant)। শূন্য প্যাকেট লস, স্থির পিং এবং জিটার কন্ট্রোল।" : feat.desc.startsWith("No waiting") ? "ঘণ্টার পর ঘণ্টা অপেক্ষা করতে হবে না। দক্ষিণ কেরানীগঞ্জে আমাদের লোকাল সাপোর্ট হাব নিশ্চিত করে যে আমাদের টেকনিশিয়ানরা রেকর্ড সময়ে আপনার বাসা বা অফিসে পৌঁছে যাবে।" : feat.desc.startsWith("Get unlimited") ? "বাংলাদেশ ইন্টারনেট এক্সচেঞ্জ (BDIX) রিসোর্স, লোকাল এফটিপি মুভি, লাইভ টিভি এবং গেম ক্যাশে ১০০ এমবিপিএস পর্যন্ত আনলিমিটেড স্পিড পান।" : "অটো-ফেইলওভার সহ ডুয়াল ব্যাকবোন, যা অব্যাহত SLA-সমর্থিত ব্যবসায়িক কার্যক্রম নিশ্চিত করে। স্ট্যাটিক আইপি এবং ডিরেক্ট ক্লায়েন্ট সাপোর্ট।")}
              </p>
            </div>
          ))}
        </div>
      </div>
      </section>

      {/* Services & Solutions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-brand-cyan uppercase mb-3">{t("Services & Solutions", "সেবা ও সমাধান")}</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t("Tailored Connectivity For Everyone", "সবার জন্য উপযুক্ত কানেক্টিভিটি")}
          </h3>
          <p className="text-slate-400 mt-4 leading-relaxed">
            {t(
              "From seamless home streaming and competitive gaming paths to dedicated enterprise fiber optic leased lines, we provide rock-solid internet solutions in Keraniganj.",
              "বাসাবাড়ির স্ট্রিমিং ও গেমিং পাথ থেকে শুরু করে ডেডিকেটেড এন্টারপ্রাইজ লিজড লাইন পর্যন্ত, আমরা কেরানীগঞ্জে নির্ভরযোগ্য ইন্টারনেট সেবা প্রদান করি।"
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Home Internet (FTTH)",
              desc: "Uncapped, buffer-free fiber direct to your home. Enjoy seamless 4K streaming, home automation, and smooth remote learning.",
              icon: (
                <svg className="w-5 h-5 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              ),
              badge: "Popular"
            },
            {
              title: "Corporate Leased Line",
              desc: "1:1 symmetric dedicated bandwidth with 99.9% uptime SLA guarantee, static IP allocation, and 24/7 priority enterprise support.",
              icon: (
                <svg className="w-5 h-5 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              ),
              badge: "SLA Guaranteed"
            },
            {
              title: "SME & SOHO Connect",
              desc: "Symmetric internet connections tailored for businesses, shops, and startups. Secure connectivity with backup links.",
              icon: (
                <svg className="w-5 h-5 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
              badge: "Optimized"
            },
            {
              title: "Safe DNS & Smart Cache",
              desc: "Family-safe DNS configurations, automated gaming cache, BDIX optimization, and localized FTP movie and TV caches.",
              icon: (
                <svg className="w-5 h-5 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              badge: "Included"
            }
          ].map((srv, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-brand-card/40 border border-brand-border/40 hover:border-brand-cyan/30 hover:scale-[1.01] transition-all flex flex-col gap-4 text-left relative overflow-hidden group glass-panel"
            >
              <div className="absolute top-0 right-0 p-2 text-[10px] font-black uppercase tracking-widest text-brand-cyan/70 bg-brand-cyan/5 rounded-bl-lg border-l border-b border-brand-cyan/10">
                {t(srv.badge, srv.badge === "Popular" ? "জনপ্রিয়" : srv.badge === "SLA Guaranteed" ? "এসএলএ সমর্থিত" : srv.badge === "Optimized" ? "অপ্টিমাইজড" : "অন্তর্ভুক্ত")}
              </div>
              <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/15 group-hover:bg-brand-cyan/20 group-hover:scale-105 transition-all duration-300">
                {srv.icon}
              </div>
              <h4 className="text-base font-bold text-white tracking-wide group-hover:text-brand-cyan transition-colors duration-300">
                {t(srv.title, srv.title === "Home Internet (FTTH)" ? "হোম ইন্টারনেট (FTTH)" : srv.title === "Corporate Leased Line" ? "কর্পোরেট লিজড লাইন" : srv.title === "SME & SOHO Connect" ? "এসএমই ও সোহো কানেক্ট" : "সেফ ডিএনএস ও স্মার্ট ক্যাশ")}
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {t(srv.desc, srv.desc.startsWith("Uncapped") ? "আনক্যাপড ও বাফার-মুক্ত ফাইবার সরাসরি আপনার বাসায়। উপভোগ করুন সিমলেস ৪কে স্ট্রিমিং ও রিমোট লার্নিং।" : srv.desc.startsWith("1:1") ? "৯৯.৯% আপটাইম এসএলএ গ্যারান্টি, স্ট্যাটিক আইপি এবং ২৪/৭ কর্পোরেট সাপোর্ট সহ সিমেট্রিক ব্যান্ডউইথ।" : srv.desc.startsWith("Symmetric") ? "ব্যবসা, দোকান ও স্টার্টআপের জন্য সিমেট্রিক ইন্টারনেট সংযোগ। ব্যাকআপ লিংক সহ নিরাপদ কানেক্টিভিটি।" : "ফ্যামিলি-সেফ ডিএনএস কনফিগারেশন, গেমিং ক্যাশ, BDIX অপ্টিমাইজেশান এবং লোকাল এফটিপি।")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Review Section */}
      <section className="w-full bg-white py-16 relative overflow-hidden border-y border-slate-100 shadow-inner text-slate-900 -mt-10 -mb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-xs font-bold tracking-widest text-brand-blue uppercase mb-3">{t("Testimonials", "টেস্টিমোনিয়াল")}</h2>
          <h3 className="text-3xl font-extrabold text-slate-900 mb-12">{t("What Our Customers in Keraniganj Say", "আমাদের গ্রাহকেরা যা বলছেন")}</h3>

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
              <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-sm hover:shadow-md hover:border-brand-blue/20 hover:scale-[1.01] transition-all flex flex-col justify-between">
                <p className="text-slate-600 italic leading-relaxed text-sm">
                  &ldquo;{t(test.comment, test.comment.startsWith("As a developer") ? "ডেভেলপার হিসেবে আমার সার্বক্ষণিক এসএসএইচ কানেকশন এবং গিট পুশ প্রয়োজন। এম আমিন নেটওয়ার্ক আমাকে দুর্দান্ত আপটাইম দেয়। গিটহাব ও ভার্সেলে তাদের লো-লেটেন্সি রাউটিং আমার কাজের গতি বহুগুণ বাড়িয়ে দিয়েছে। কদমতলীর সেরা আইএসপি!" : "আমরা আমাদের দোকানের পিওএস এবং বিলিং টার্মিনালগুলো এম আমিন নেটওয়ার্কের কর্পোরেট ডেডিকেটেড প্ল্যানে আপগ্রেড করেছি। আপটাইম চমৎকার এবং ট্রানজেকশনে কোনো সমস্যা হয়নি।")}&rdquo;
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-slate-200/60 pt-4">
                  <div>
                    <h4 className="text-slate-900 font-bold text-sm">{test.name}</h4>
                    <p className="text-xs text-brand-blue">
                      {t(test.role, test.role === "Local Freelance Web Developer" ? "লোকাল ফ্রিল্যান্স ওয়েব ডেভেলপার" : "মালিক, হাসান ট্রেডিং, আগানগর")}
                    </p>
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
        </div>
      </section>

      {/* CTA Box */}
      <section className="w-full bg-white py-16 relative overflow-hidden border-b border-slate-100 shadow-inner -mt-20 -mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-12 rounded-3xl bg-gradient-to-r from-slate-50 to-slate-100/80 border border-slate-200 text-center relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-brand-blue/5 animate-pulse-slow pointer-events-none" />
            <h3 className="text-3xl font-extrabold text-slate-900 mb-4">
              {t("Ready to Experience True High-Speed Internet?", "আপনি কি সত্যিকারের উচ্চগতির ইন্টারনেট উপভোগ করতে প্রস্তুত?")}
            </h3>
            <p className="text-slate-600 max-w-xl mx-auto mb-8 text-sm sm:text-base">
              {t(
                "Get in touch with our team today and enjoy free installation with selected annual subscription plans. Connection within 24 hours guaranteed!",
                "আজই আমাদের টিমের সাথে যোগাযোগ করুন এবং বার্ষিক সাবস্ক্রিপশনে ফ্রি ইনস্টলেশন উপভোগ করুন। ২৪ ঘণ্টার মধ্যে সংযোগের নিশ্চয়তা!"
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/packages"
                className="bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark px-8 py-4 rounded-xl text-base font-bold shadow-lg shadow-brand-blue/20 hover:opacity-90 transition-opacity cursor-pointer"
              >
                {t("Get Connected Now", "আজই সংযোগ নিন")}
              </Link>
              <a
                href="tel:+8801707009267"
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 hover:text-brand-blue px-8 py-4 rounded-xl text-base font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <svg className="w-5 h-5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {t("Call +8801707009267", "কল করুন +৮৮০১৭০৭০০৯২৬৭")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
