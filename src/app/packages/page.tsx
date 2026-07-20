"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { getSetting, setSetting, submitPackageRequestAction } from "@/actions/content";
import { defaultPageHeaders, PageHeaderData } from "@/app/admin/(dashboard)/page-headers/page";

interface Plan {
  speed: string;
  price: number;
  name: string;
  category: "home" | "gaming" | "corporate";
  tagline: string;
  features: string[];
  popular?: boolean;
}

function PackagesContent() {
  const searchParams = useSearchParams();
  const lang = useTranslation();
  const t = (en: string, bn: string) => (lang === "BN" ? bn : en);

  const [activeTab, setActiveTab] = useState<"home" | "gaming" | "corporate">("home");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const translateName = (n: string) => {
    if (n === "Home Basic") return "Home Basic";
    if (n === "Home Standard") return "Home Standard";
    if (n === "Home Elite") return "Home Elite";
    if (n === "Home Ultra") return "Home Ultra";
    if (n === "Gamer Starter") return "Gamer Starter";
    if (n === "Gamer Professional") return "Gamer Professional";
    if (n === "Gamer Champion") return "Gamer Champion";
    if (n === "Corporate SME") return "Corporate SME";
    if (n === "Corporate Medium") return "Corporate Medium";
    if (n === "Corporate Ultimate") return "Corporate Ultimate";
    return n;
  };

  const translateTagline = (tag: string) => {
    if (tag === "Great for casual browsing & SD streaming") return "Great for casual browsing & SD streaming";
    if (tag === "Perfect for families & HD streaming") return "Perfect for families & HD streaming";
    if (tag === "Most popular for smart homes") return "Most popular for smart homes";
    if (tag === "Ultimate speed for heavy downloaders") return "Ultimate speed for heavy downloaders";
    if (tag === "Optimized routing for gaming hobbyists") return "Optimized routing for gaming hobbyists";
    if (tag === "Best performance for competitive players") return "Best performance for competitive players";
    if (tag === "Ultra-low jitter & maximum throughput") return "Ultra-low jitter & maximum throughput";
    if (tag === "Symmetric bandwidth for small businesses") return "Symmetric bandwidth for small businesses";
    if (tag === "Powerful link for active office networks") return "Powerful link for active office networks";
    if (tag === "High-capacity bandwidth for heavy tasks") return "High-capacity bandwidth for heavy tasks";
    return tag;
  };

  const translateFeature = (f: string) => {
    if (f === "Unlimited Bandwidth") return "Unlimited Bandwidth";
    if (f === "Free Optical Fiber Router installation*") return "Free Optical Fiber Router installation*";
    if (f === "YouTube & Facebook cache sharing") return "YouTube & Facebook cache sharing";
    if (f === "24/7 Phone Support Helpline") return "24/7 Phone Support Helpline";
    if (f === "Local LAN speeds up to 50 Mbps") return "Local LAN speeds up to 50 Mbps";
    if (f === "Full HD buffer-free streaming") return "Full HD buffer-free streaming";
    if (f === "Multi-device connection (4-6 devices)") return "Multi-device connection (4-6 devices)";
    if (f === "Premium BDIX connectivity") return "Premium BDIX connectivity";
    if (f === "24/7 Chat & Ticket support") return "24/7 Chat & Ticket support";
    if (f === "Local LAN speeds up to 100 Mbps") return "Local LAN speeds up to 100 Mbps";
    if (f === "4K UHD Streaming capability") return "4K UHD Streaming capability";
    if (f === "High-priority local peers (100 Mbps)") return "High-priority local peers (100 Mbps)";
    if (f === "Ideal for smart home automation") return "Ideal for smart home automation";
    if (f === "Zero latency jitter control") return "Zero latency jitter control";
    if (f === "Free Public IP on request") return "Free Public IP on request";
    if (f === "Dedicated routing bandwidth") return "Dedicated routing bandwidth";
    if (f === "Best for remote work & file syncing") return "Best for remote work & file syncing";
    if (f === "Static IPv4 Address Included") return "Static IPv4 Address Included";
    if (f === "SLA support ticket < 2 hours") return "SLA support ticket < 2 hours";
    if (f === "Super high speed FTP access") return "Super high speed FTP access";
    if (f === "Special low-latency paths") return "Special low-latency paths";
    if (f === "Direct peer routing (AS150164)") return "Direct peer routing (AS150164)";
    if (f === "Zero packet loss guarantee") return "Zero packet loss guarantee";
    if (f === "Optimized for PUBG & FreeFire") return "Optimized for PUBG & FreeFire";
    if (f === "Dedicated 24/7 hotline support") return "Dedicated 24/7 hotline support";
    if (f === "Lowest Ping routing to SG/HK servers") return "Lowest Ping routing to SG/HK servers";
    if (f === "Ideal for streaming live gameplay") return "Ideal for streaming live gameplay";
    if (f === "Static IP for stable lobby matching") return "Static IP for stable lobby matching";
    if (f === "BDIX peers up to 100 Mbps") return "BDIX peers up to 100 Mbps";
    if (f === "Optimized for Steam, Epic Games, Valorant") return "Optimized for Steam, Epic Games, Valorant";
    if (f === "Ultra-low latency to Southeast Asia") return "Ultra-low latency to Southeast Asia";
    if (f === "Priority bandwidth allocation") return "Priority bandwidth allocation";
    if (f === "Dual-stack IPv4 & IPv6 routing") return "Dual-stack IPv4 & IPv6 routing";
    if (f === "No speed throttling, no cap") return "No speed throttling, no cap";
    if (f === "24/7 direct engineer support line") return "24/7 direct engineer support line";
    if (f === "1:1 Symmetric dedicated bandwidth") return "1:1 Symmetric dedicated bandwidth";
    if (f === "99.9% Uptime SLA Guarantee") return "99.9% Uptime SLA Guarantee";
    if (f === "1 Public IP Address Included") return "1 Public IP Address Included";
    if (f === "24/7 Dedicated account manager") return "24/7 Dedicated account manager";
    if (f === "4-hour resolution support SLA") return "4-hour resolution support SLA";
    if (f === "Dual-WAN router installation backup") return "Dual-WAN router installation backup";
    if (f === "2 Static Public IPs Included") return "2 Static Public IPs Included";
    if (f === "Peering with AS150164 BGP backbone") return "Peering with AS150164 BGP backbone";
    if (f === "2-hour support resolution SLA") return "2-hour support resolution SLA";
    if (f === "Redundant upstream connection routing") return "Redundant upstream connection routing";
    if (f === "Subnet of 4 Public IPs") return "Subnet of 4 Public IPs";
    if (f === "Direct fiber optic ring configuration") return "Direct fiber optic ring configuration";
    if (f === "1-hour support resolution SLA") return "1-hour support resolution SLA";
    return f;
  };
  
  // Order Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    area: "Kadomtoli",
    referralCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState("");

  const defaultPlans: Plan[] = [
    // Home Plans
    {
      speed: "10 Mbps",
      price: 500,
      name: "Home Basic",
      category: "home",
      tagline: "Great for casual browsing & SD streaming",
      features: [
        "Unlimited Bandwidth",
        "Free Optical Fiber Router installation*",
        "YouTube & Facebook cache sharing",
        "24/7 Phone Support Helpline",
        "Local LAN speeds up to 50 Mbps",
      ],
    },
    {
      speed: "20 Mbps",
      price: 800,
      name: "Home Standard",
      category: "home",
      tagline: "Perfect for families & HD streaming",
      features: [
        "Full HD buffer-free streaming",
        "Multi-device connection (4-6 devices)",
        "Premium BDIX connectivity",
        "24/7 Chat & Ticket support",
        "Local LAN speeds up to 100 Mbps",
      ],
    },
    {
      speed: "30 Mbps",
      price: 1000,
      name: "Home Elite",
      category: "home",
      tagline: "Most popular for smart homes",
      popular: true,
      features: [
        "4K UHD Streaming capability",
        "High-priority local peers (100 Mbps)",
        "Ideal for smart home automation",
        "Zero latency jitter control",
        "Free Public IP on request",
      ],
    },
    {
      speed: "50 Mbps",
      price: 1500,
      name: "Home Ultra",
      category: "home",
      tagline: "Ultimate speed for heavy downloaders",
      features: [
        "Dedicated routing bandwidth",
        "Best for remote work & file syncing",
        "Static IPv4 Address Included",
        "SLA support ticket < 2 hours",
        "Super high speed FTP access",
      ],
    },

    // Gaming Plans
    {
      speed: "25 Mbps",
      price: 950,
      name: "Gamer Starter",
      category: "gaming",
      tagline: "Optimized routing for gaming hobbyists",
      features: [
        "Special low-latency paths",
        "Direct peer routing (AS150164)",
        "Zero packet loss guarantee",
        "Optimized for PUBG & FreeFire",
        "Dedicated 24/7 hotline support",
      ],
    },
    {
      speed: "40 Mbps",
      price: 1250,
      name: "Gamer Professional",
      category: "gaming",
      tagline: "Best performance for competitive players",
      popular: true,
      features: [
        "Lowest Ping routing to SG/HK servers",
        "Ideal for streaming live gameplay",
        "Static IP for stable lobby matching",
        "BDIX peers up to 100 Mbps",
        "Optimized for Steam, Epic Games, Valorant",
      ],
    },
    {
      speed: "60 Mbps",
      price: 1800,
      name: "Gamer Champion",
      category: "gaming",
      tagline: "Ultra-low jitter & maximum throughput",
      features: [
        "Ultra-low latency to Southeast Asia",
        "Priority bandwidth allocation",
        "Dual-stack IPv4 & IPv6 routing",
        "No speed throttling, no cap",
        "24/7 direct engineer support line",
      ],
    },

    // Corporate Plans
    {
      speed: "10 Mbps",
      price: 5000,
      name: "Corporate SME",
      category: "corporate",
      tagline: "Symmetric bandwidth for small businesses",
      features: [
        "1:1 Symmetric dedicated bandwidth",
        "99.9% Uptime SLA Guarantee",
        "1 Public IP Address Included",
        "24/7 Dedicated account manager",
        "4-hour resolution support SLA",
      ],
    },
    {
      speed: "20 Mbps",
      price: 9000,
      name: "Corporate Medium",
      category: "corporate",
      tagline: "Powerful link for active office networks",
      features: [
        "1:1 Symmetric dedicated bandwidth",
        "Dual-WAN router installation backup",
        "2 Static Public IPs Included",
        "Peering with AS150164 BGP backbone",
        "2-hour support resolution SLA",
      ],
    },
    {
      speed: "50 Mbps",
      price: 20000,
      name: "Corporate Ultimate",
      category: "corporate",
      tagline: "High-capacity bandwidth for heavy tasks",
      popular: true,
      features: [
        "1:1 Symmetric dedicated bandwidth",
        "Redundant upstream connection routing",
        "Subnet of 4 Public IPs",
        "Direct fiber optic ring configuration",
        "1-hour support resolution SLA",
      ],
    },
  ];

  const [allPlans, setAllPlans] = useState<Plan[]>([]);
  const [headerData, setHeaderData] = useState<PageHeaderData>(defaultPageHeaders);
  useEffect(() => {
    if (typeof window !== "undefined") {
      getSetting("packages_list").then(saved => {
        if (saved) {
          setAllPlans(saved as Plan[]);
        } else {
          setSetting("packages_list", defaultPlans as Plan[]);
          setAllPlans(defaultPlans);
        }
      });
      getSetting("page_headers").then(saved => {
        if (saved) {
          setHeaderData(saved as PageHeaderData);
        }
      });
    }
  }, []);

  // Auto-select plan from url query parameter if available
  useEffect(() => {
    const planQuery = searchParams.get("plan");
    if (planQuery) {
      const parsedSpeed = parseInt(planQuery, 10);
      const matchedPlan = allPlans.find(
        (p) => parseInt(p.speed, 10) === parsedSpeed
      );
      if (matchedPlan) {
        setActiveTab(matchedPlan.category);
        setSelectedPlan(matchedPlan);
        setIsModalOpen(true);
      }
    }
  }, [searchParams]);

  const filteredPlans = allPlans.filter((p) => p.category === activeTab);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    setIsSubmitting(true);

    const result = await submitPackageRequestAction({
      name: formData.name,
      phone: formData.phone,
      email: formData.email || "N/A",
      zone: formData.area,
      price: selectedPlan.price,
      address: formData.address,
      planName: selectedPlan.name,
      speed: selectedPlan.speed,
      referralCode: formData.referralCode.trim() || "N/A",
    });

    if (result.success && result.id) {
      setIsSubmitting(false);
      setOrderSuccess(true);
      setOrderRef(result.id);
      return;
    }

    setIsSubmitting(false);
    alert("Could not submit request. Please try again.");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      area: "Kadomtoli",
      referralCode: "",
    });
    setOrderSuccess(false);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full grow relative text-left">
      {/* Full-width Header Hero Section with background asset */}
      <div className="relative w-full overflow-hidden bg-slate-950 py-16 border-b border-white/5">
        {/* Background video/image */}
        <div className="absolute inset-0 z-0">
          {headerData.packages_bg?.endsWith(".mp4") ? (
            <video
              autoPlay
              loop
              muted={true}
              playsInline
              className="w-full h-full object-cover opacity-50"
            >
              <source src={headerData.packages_bg} type="video/mp4" />
            </video>
          ) : (
            <div
              className="w-full h-full bg-cover bg-center opacity-50"
              style={{ backgroundImage: `url('${headerData.packages_bg}')` }}
            />
          )}
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        {/* Top Section Wrapper (Confined to max-w-7xl) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Background glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold text-white tracking-tight text-center w-full block">
              {t(headerData.packages_title_en, headerData.packages_title_bn ?? "")}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan to-brand-blue text-glow">
                {t(headerData.packages_title_highlight_en, headerData.packages_title_highlight_bn ?? "")}
              </span>
            </h1>
            <p className="text-slate-400 mt-4 text-sm sm:text-base text-center">
              {t(headerData.packages_subtitle_en, headerData.packages_subtitle_bn ?? "")}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Plan Grid & Tab Selectors (Truly Full Width White Background) */}
      <div className="bg-white py-16 border-t border-slate-200 text-slate-900 relative z-10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Selectors */}
          <div className="flex justify-center -mt-24 mb-24 relative z-20">
            <div className="inline-flex p-1 rounded-2xl bg-white border border-slate-200/80 shadow-xl">
              {[
                { id: "home", label: "Home Internet" },
                { id: "gaming", label: "Gamer Packs" },
                { id: "corporate", label: "Corporate Dedicated" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as "home" | "gaming" | "corporate")}
                  className={`px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "force-active-tab shadow-md relative z-10"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch">
            {filteredPlans.map((plan, i) => {
              const allFeatures = [
                t(`Speed: ${plan.speed}`, `গতি: ${plan.speed}`),
                ...plan.features,
              ];
              return (
                <div
                  key={i}
                  className={`relative w-full transition-all duration-300 hover:scale-[1.02] ${
                    plan.popular ? "lg:scale-105 z-20" : "z-10"
                  }`}
                >
                  {!!plan.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-[#0273b3] to-[#014c77] text-white text-xs font-black tracking-widest px-5 py-2 rounded-full shadow-[0_4px_12px_rgba(2,115,179,0.3)] border border-white/20 z-30 uppercase">
                      {"POPULAR"}
                    </span>
                  )}

                  <div className="overflow-hidden rounded-2xl bg-linear-to-b from-[#0273b3] to-[#015c90] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col justify-between w-full text-center relative border border-white/10 min-h-[460px] h-full hover:shadow-[0_15px_35px_rgba(2,115,179,0.25)] transition-shadow duration-300">
                    {/* Top Green Section */}
                    <div
                      className="bg-linear-to-br from-[#10b981] to-[#047857] pt-10 pb-12 px-6 flex flex-col items-center justify-center text-white select-none"
                      style={{ clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 88%)" }}
                    >
                      <h3 className="text-white text-xl font-extrabold uppercase tracking-wider">
                        {translateName(plan.name)}
                      </h3>
                      <p className="text-[10px] text-white/80 font-medium tracking-wide mb-2 text-center max-w-[240px] truncate">
                        {translateTagline(plan.tagline)}
                      </p>
                      <div className="flex items-baseline justify-center text-white">
                        <span className="text-3xl font-bold mr-0.5 opacity-90">৳</span>
                        <span className="text-5xl font-black font-sans tracking-tight leading-none">
                          {plan.price}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest ml-1.5 opacity-80">
                          /{"Monthly"}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Blue Section */}
                    <div className="pt-4 pb-8 px-6 sm:px-8 flex flex-col justify-between grow">
                      {/* Features List */}
                      <ul className="flex flex-col gap-3.5 text-left text-white/95 max-w-[280px] mx-auto mb-8 w-full">
                        {allFeatures.map((feat, featIdx) => (
                          <li key={featIdx} className="flex gap-3 items-center">
                            <div className="w-5 h-5 rounded-full border border-emerald-400/30 bg-emerald-500/20 text-[#d1fae5] shrink-0 flex items-center justify-center shadow-sm">
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="3.5"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium tracking-wide leading-tight">
                              {translateFeature(feat)}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* BUY NOW Button */}
                      <div className="mt-auto">
                        <button
                          onClick={() => {
                            setSelectedPlan(plan);
                            setIsModalOpen(true);
                          }}
                          className="mx-auto w-full max-w-[180px] py-3 bg-linear-to-r from-[#10b981] to-[#047857] hover:scale-[1.03] active:scale-[0.98] text-white text-xs font-black tracking-widest rounded-full transition-all duration-300 text-center block shadow-md hover:shadow-lg hover:shadow-emerald-500/10 uppercase cursor-pointer"
                        >
                          {"BUY NOW"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Order connection Modal */}
      {isModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-100 overflow-y-auto bg-slate-900/60 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="bg-white border border-slate-100 shadow-2xl rounded-3xl p-6 sm:p-8 max-w-lg w-full relative text-left">
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!orderSuccess ? (
              <form onSubmit={handleOrderSubmit} className="space-y-5 text-left">
                <div>
                  <h3 className="text-slate-900 font-bold text-xl">{"New Internet Connection"}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {"Complete this form to request optical fiber setup for"}{" "}
                    <span className="text-[#0072ff] font-bold">{translateName(selectedPlan.name)} ({selectedPlan.speed})</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 text-left">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{"Full Name"}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Mehan Ahmed"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0072ff] focus:ring-1 focus:ring-[#0072ff]/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{"Phone Number"}</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. 01707009267"
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0072ff] focus:ring-1 focus:ring-[#0072ff]/20"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{"Email Address"}</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={"optional"}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0072ff] focus:ring-1 focus:ring-[#0072ff]/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{"Coverage Zone"}</label>
                      <select
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#0072ff] focus:ring-1 focus:ring-[#0072ff]/20 cursor-pointer"
                      >
                        {coverageAreas.map((area) => (
                          <option key={area} value={area} className="bg-white text-slate-900">
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{"Monthly Pricing"}</label>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 font-mono flex items-center justify-between">
                        <span>{"Rate"}</span>
                        <span className="font-bold text-slate-900">৳{selectedPlan.price} BDT</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{"Refer / Promo Code"}</label>
                    <input
                      type="text"
                      name="referralCode"
                      value={formData.referralCode}
                      onChange={handleInputChange}
                      placeholder={"optional"}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0072ff] focus:ring-1 focus:ring-[#0072ff]/20"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{"Installation Address"}</label>
                    <textarea
                      name="address"
                      required
                      rows={3}
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g. House No. 25, Lane 3, Kadomtoli, South Keraniganj"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0072ff] focus:ring-1 focus:ring-[#0072ff]/20 resize-none font-sans"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 text-xs text-blue-700 leading-relaxed flex gap-2 text-left">
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>
                    {"Our field representative will contact you within 4 hours to verify feasibility and schedule installation. Connection setups take less than 24 hours."}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-linear-to-r from-brand-blue to-brand-cyan text-brand-dark py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:opacity-95 flex justify-center items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                      {"Processing Request..."}
                    </>
                  ) : (
                    "Submit Connection Request"
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-pulse">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h3 className="text-slate-900 font-extrabold text-2xl">{"Request Submitted!"}</h3>
                  <p className="text-sm text-slate-500">
                    {"Thank you, "} <span className="text-slate-700 font-bold">{formData.name}</span>. {"Your internet connection ticket has been successfully registered."}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-sm mx-auto font-mono text-left">
                  <div className="flex justify-between border-b border-slate-200/80 pb-2 mb-2 text-xs text-slate-500">
                    <span>{"Order Reference"}</span>
                    <span className="text-[#0072ff] font-bold">{orderRef}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-2 mb-2 text-xs text-slate-500">
                    <span>{"Selected Plan"}</span>
                    <span className="text-slate-800 font-bold">{translateName(selectedPlan.name)} ({selectedPlan.speed})</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{"Contact Phone"}</span>
                    <span className="text-slate-800 font-bold">{formData.phone}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                  {"A support representative will call you at your number shortly to coordinate fiber line routing and router installation. Please keep your phone active."}
                </p>

                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-sm font-bold transition-colors cursor-pointer"
                >
                  {"Close Window"}
                </button>
              </div>
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Packages() {
  return (
    <Suspense fallback={
      <div className="grow flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PackagesContent />
    </Suspense>
  );
}

