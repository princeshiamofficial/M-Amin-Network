"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import AdminNavbar from "@/components/AdminNavbar";

interface Plan {
  speed: string;
  price: number;
  name: string;
  category: "home" | "gaming" | "corporate";
  tagline: string;
  features: string[];
  popular?: boolean;
}

export default function AdminPackagesPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Package list state
  const [plans, setPlans] = useState<Plan[]>([]);
  
  // Form states for creating/editing packages
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlanIndex, setEditingPlanIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    speed: string;
    price: string;
    category: "home" | "gaming" | "corporate";
    tagline: string;
    features: string;
    popular: boolean;
  }>({
    name: "",
    speed: "",
    price: "",
    category: "home",
    tagline: "",
    features: "",
    popular: false,
  });

  const defaultPlans: Plan[] = [
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

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("m_amin_admin_authenticated");
      if (auth !== "true") {
        router.push("/admin");
      } else {
        setIsAuthenticated(true);
        loadPackages();
      }
    }
  }, [router]);

  const loadPackages = () => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("m_amin_packages_list");
    if (saved) {
      setPlans(JSON.parse(saved));
    } else {
      localStorage.setItem("m_amin_packages_list", JSON.stringify(defaultPlans));
      setPlans(defaultPlans);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("m_amin_admin_authenticated");
    router.push("/admin");
  };

  const resetDatabase = () => {
    if (confirm("Reset to default seeded broadband plans?")) {
      localStorage.setItem("m_amin_packages_list", JSON.stringify(defaultPlans));
      setPlans(defaultPlans);
      alert("Packages reset to default.");
    }
  };

  const openAddModal = () => {
    setEditingPlanIndex(null);
    setFormData({
      name: "",
      speed: "",
      price: "",
      category: "home",
      tagline: "",
      features: "",
      popular: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (index: number) => {
    const plan = plans[index];
    setEditingPlanIndex(index);
    setFormData({
      name: plan.name,
      speed: plan.speed,
      price: plan.price.toString(),
      category: plan.category,
      tagline: plan.tagline,
      features: plan.features.join("\n"),
      popular: plan.popular || false,
    });
    setIsModalOpen(true);
  };

  const deletePlan = (index: number) => {
    if (confirm("Are you sure you want to delete this broadband package?")) {
      const updated = plans.filter((_, idx) => idx !== index);
      setPlans(updated);
      localStorage.setItem("m_amin_packages_list", JSON.stringify(updated));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const preparedPlan: Plan = {
      name: formData.name.trim(),
      speed: formData.speed.trim(),
      price: Number(formData.price),
      category: formData.category,
      tagline: formData.tagline.trim(),
      features: formData.features
        .split("\n")
        .map((f) => f.trim())
        .filter((f) => f.length > 0),
      popular: formData.popular,
    };

    let updated: Plan[];
    if (editingPlanIndex !== null) {
      updated = plans.map((p, idx) => (idx === editingPlanIndex ? preparedPlan : p));
    } else {
      updated = [...plans, preparedPlan];
    }

    setPlans(updated);
    localStorage.setItem("m_amin_packages_list", JSON.stringify(updated));
    setIsModalOpen(false);
    alert(editingPlanIndex !== null ? "Package updated successfully!" : "Package added successfully!");
  };

  if (!mounted || !isAuthenticated) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white text-slate-650">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-sm tracking-widest text-slate-500">LOADING SECURE ACCESS CONTROL...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen -mt-24 bg-white text-slate-800 flex overflow-hidden">
      {/* Sidebar container wrapper for floating arrow toggle */}
      <div className="relative flex-shrink-0">
        {/* We set activeTab="Packages" to correctly highlight "Packages" page */}
        <AdminSidebar
          activeTab="Packages"
          setActiveTab={(tab) => {
            if (tab === "Overview") {
              router.push("/admin/dashboard");
            } else {
              // Store active tab locally and redirect to dashboard to open it
              sessionStorage.setItem("m_amin_active_tab_redirect", tab);
              router.push("/admin/dashboard");
            }
          }}
          onSignOut={handleLogout}
          isCollapsed={isSidebarCollapsed}
        />
        
        {/* Floating Arrow Toggle Button */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          className="absolute top-20 right-0 translate-x-1/2 z-50 w-6 h-6 rounded-full bg-[#071120] border border-[#1e293b]/70 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer shadow-lg shadow-black/35 hover:bg-[#0c1e35] transition-all"
        >
          {isSidebarCollapsed ? (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      {/* Main Dynamic View Content Pane */}
      <main className="flex-1 h-screen flex flex-col bg-slate-50/40 overflow-hidden">
        {/* Reusable Admin Top Navbar Component */}
        <AdminNavbar
          activeTab="Packages"
          onResetDatabase={resetDatabase}
          onSignOut={handleLogout}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Scrollable content container */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#f8fafc]">
          <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Broadband Package Catalog Manager (CMS)</h2>
                <p className="text-xs text-slate-500 mt-1">Add, update, or remove consumer packages. Edits automatically sync to the public packages page.</p>
              </div>
              <button
                onClick={openAddModal}
                className="px-5 py-3 bg-brand-blue hover:opacity-95 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-md"
              >
                + Add Package Plan
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                    <th className="pb-3">Plan Details</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Tagline</th>
                    <th className="pb-3">Features Count</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {plans.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-450">No plans configured. Seed using navbar button.</td>
                    </tr>
                  ) : (
                    plans.map((p, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-slate-850 text-sm">{p.name}</span>
                            {p.popular && (
                              <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-amber-500/15 border border-amber-500/20 text-amber-600 uppercase">Popular</span>
                            )}
                          </div>
                          <span className="text-[10px] text-brand-blue font-mono font-bold block mt-0.5">{p.speed} Speed</span>
                        </td>
                        <td className="py-3.5 capitalize font-semibold text-slate-650">{p.category}</td>
                        <td className="py-3.5 text-slate-500 max-w-xs truncate">{p.tagline}</td>
                        <td className="py-3.5 font-bold text-slate-700">{p.features.length} Features</td>
                        <td className="py-3.5 font-black text-emerald-600 text-sm">৳{p.price}/mo</td>
                        <td className="py-3.5 text-right space-x-2">
                          <button
                            onClick={() => openEditModal(idx)}
                            className="px-2.5 py-1 bg-brand-blue/10 hover:bg-brand-blue/20 border border-brand-blue/20 text-brand-blue rounded-lg font-bold text-[10px] cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deletePlan(idx)}
                            className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-655 rounded-lg font-bold text-[10px] cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#070b19]/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-[24px] border border-slate-200 shadow-2xl p-6 sm:p-8 max-w-md w-full relative z-10 text-left space-y-4">
            <div>
              <h3 className="text-[#111113] font-black text-lg">{editingPlanIndex !== null ? "Edit Plan Details" : "Create New Package"}</h3>
              <p className="text-slate-500 text-[11px] mt-0.5">Define speeds, pricing, and specific custom marketing tags.</p>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Plan Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Speed Range</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 30 Mbps"
                    value={formData.speed}
                    onChange={(e) => setFormData({ ...formData, speed: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Monthly Fee (BDT)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Plan Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue cursor-pointer"
                  >
                    <option value="home">Home Broadband</option>
                    <option value="gaming">Gaming Optimized</option>
                    <option value="corporate">Corporate Splice</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Tagline / Pitch</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ultimate speed for smart homes"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Features List (One feature per line)</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Unlimited Bandwidth&#10;24/7 Phone Support Helpline"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id="popular_chk"
                  checked={formData.popular}
                  onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                  className="w-4 h-4 text-brand-blue border-slate-350 rounded focus:ring-brand-blue cursor-pointer"
                />
                <label htmlFor="popular_chk" className="text-slate-855 font-bold select-none cursor-pointer">Mark as Popular Plan</label>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-500 rounded-xl font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-blue text-white rounded-xl font-bold hover:opacity-95 cursor-pointer shadow-md"
                >
                  {editingPlanIndex !== null ? "Save Changes" : "Create Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
