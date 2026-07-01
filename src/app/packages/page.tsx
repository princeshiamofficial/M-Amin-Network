"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

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
  
  // Order Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    area: "Kadomtoli",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState("");

  const allPlans: Plan[] = [
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

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSuccess(true);
      setOrderRef(`MAN-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      area: "Kadomtoli",
    });
    setOrderSuccess(false);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 flex-grow">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Flexible &amp; Premium{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue text-glow">
            Broadband Plans
          </span>
        </h1>
        <p className="text-slate-400 mt-4 text-sm sm:text-base">
          Choose from our diverse range of fiber optic broadband connections. All plans come with unlimited volume, high-speed peers, and 24/7 technical monitoring.
        </p>
      </div>

      {/* Tab Selectors */}
      <div className="flex justify-center mb-16">
        <div className="inline-flex p-1 rounded-2xl bg-brand-card/80 border border-brand-border">
          {[
            { id: "home", label: "Home Internet" },
            { id: "gaming", label: "Gamer Packs" },
            { id: "corporate", label: "Corporate Dedicated" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {filteredPlans.map((plan, i) => (
          <div
            key={i}
            className={`rounded-3xl border p-8 flex flex-col justify-between relative transition-all glass-panel ${
              plan.popular
                ? "border-brand-cyan bg-brand-card/90 shadow-[0_0_30px_rgba(0,240,255,0.1)] scale-105 md:scale-100 lg:scale-105 z-10"
                : "border-brand-border/60 bg-brand-card/50 hover:border-brand-blue/60"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark text-xs font-black tracking-widest px-4 py-1.5 rounded-full uppercase shadow">
                Most Popular
              </span>
            )}

            <div>
              <div className="mb-6">
                <h3 className="text-white text-xl font-bold">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{plan.tagline}</p>
              </div>

              {/* Speed Circular indicator */}
              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="text-5xl font-black text-white font-mono tracking-tight">
                  {plan.speed.split(" ")[0]}
                </span>
                <span className="text-brand-cyan font-bold text-lg">Mbps</span>
              </div>

              <div className="border-t border-brand-border/40 pt-6 mb-8">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-4">
                  What&apos;s Included
                </p>
                <ul className="space-y-3.5 text-sm text-slate-300">
                  {plan.features.map((feat, featIdx) => (
                    <li key={featIdx} className="flex gap-2.5 items-start">
                      <svg
                        className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-brand-border/40 pt-6 mt-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-400 font-semibold">Monthly Price</span>
                <span className="text-2xl font-bold text-white font-mono">
                  ৳{plan.price} BDT
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedPlan(plan);
                  setIsModalOpen(true);
                }}
                className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all cursor-pointer ${
                  plan.popular
                    ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark hover:opacity-95 shadow-lg shadow-brand-blue/15"
                    : "bg-brand-border hover:bg-brand-border/80 text-white border border-brand-border"
                }`}
              >
                Order Connection
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order connection Modal */}
      {isModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm">
          <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!orderSuccess ? (
              <form onSubmit={handleOrderSubmit} className="space-y-5">
                <div>
                  <h3 className="text-white font-bold text-xl">New Internet Connection</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Complete this form to request optical fiber setup for{" "}
                    <span className="text-brand-cyan font-bold">{selectedPlan.name} ({selectedPlan.speed})</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Tanvir Ahmed"
                      className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. 01707009267"
                        className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="optional"
                        className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Coverage Zone</label>
                      <select
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan cursor-pointer"
                      >
                        {coverageAreas.map((area) => (
                          <option key={area} value={area} className="bg-brand-card">
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Monthly Pricing</label>
                      <div className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-slate-300 font-mono flex items-center justify-between">
                        <span>Rate</span>
                        <span className="font-bold text-white">৳{selectedPlan.price} BDT</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Installation Address</label>
                    <textarea
                      name="address"
                      required
                      rows={3}
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g. House No. 25, Lane 3, Kadomtoli, South Keraniganj"
                      className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan resize-none"
                    />
                  </div>
                </div>

                <div className="bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl p-3.5 text-xs text-brand-cyan leading-relaxed flex gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>
                    Our field representative will contact you within 4 hours to verify feasibility and schedule installation. Connection setups take less than 24 hours.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:opacity-95 flex justify-center items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                      Processing Request...
                    </>
                  ) : (
                    "Submit Connection Request"
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 animate-pulse">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h3 className="text-white font-extrabold text-2xl">Request Submitted!</h3>
                  <p className="text-sm text-slate-400">
                    Thank you, <span className="text-slate-200 font-bold">{formData.name}</span>. Your internet connection ticket has been successfully registered.
                  </p>
                </div>

                <div className="bg-brand-dark border border-brand-border rounded-2xl p-5 max-w-sm mx-auto font-mono text-left">
                  <div className="flex justify-between border-b border-brand-border/40 pb-2 mb-2 text-xs text-slate-400">
                    <span>Order Reference</span>
                    <span className="text-brand-cyan font-bold">{orderRef}</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-border/40 pb-2 mb-2 text-xs text-slate-400">
                    <span>Selected Plan</span>
                    <span className="text-white font-bold">{selectedPlan.name} ({selectedPlan.speed})</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Contact Phone</span>
                    <span className="text-white font-bold">{formData.phone}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                  A support representative will call you at your number shortly to coordinate fiber line routing and router installation. Please keep your phone active.
                </p>

                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-xl bg-brand-border hover:bg-brand-border/80 text-white text-sm font-bold transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Packages() {
  return (
    <Suspense fallback={
      <div className="flex-grow flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PackagesContent />
    </Suspense>
  );
}
