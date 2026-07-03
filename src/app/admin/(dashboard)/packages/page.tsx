"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Plan {
  speed: string;
  price: number;
  name: string;
  category: "home" | "gaming" | "corporate";
  tagline: string;
  popular?: boolean;
  features: string[];
}

export default function AdminPackagesPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Package state
  const [packages, setPackages] = useState<Plan[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal forms state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlanName, setEditingPlanName] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    speed: "",
    price: "",
    category: "home" as "home" | "gaming" | "corporate",
    tagline: "",
    features: "",
    popular: false,
  });

  const defaultPackages: Plan[] = [
    // Home Plans
    {
      speed: "10 Mbps",
      price: 500,
      name: "Home Basic",
      category: "home",
      tagline: "Great for casual browsing & SD streaming",
      features: [
        "Unlimited Bandwidth",
        "Ideal for 1-2 concurrent users",
        "Standard latency SLA",
        "24/7 Phone support line",
      ],
    },
    {
      speed: "20 Mbps",
      price: 700,
      name: "Home Standard",
      category: "home",
      tagline: "Sleek speed for bufferless HD browsing",
      features: [
        "Buffer-free YouTube & Facebook cache",
        "Supports smart TV & 2-3 devices",
        "Stable fiber optic link routing",
        "24/7 Phone support line",
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
      price: 1200,
      name: "Gamer Starter",
      category: "gaming",
      tagline: "Low ping optimized connection",
      features: [
        "Dedicated gaming routing paths",
        "Low latency to Asia/Europe servers",
        "Free IPv6 subnet block delegation",
        "Buffer-free Discord voice channels",
      ],
    },
    {
      speed: "40 Mbps",
      price: 1800,
      name: "Gamer Pro",
      category: "gaming",
      tagline: "Zero packet loss gateway",
      popular: true,
      features: [
        "Real-time game packet prioritization",
        "Under 35ms ping to SEA servers",
        "Static IPv4 delegation included",
        "Super high speed steam cache access",
        "Prioritized support ticketing SLA",
      ],
    },
    {
      speed: "60 Mbps",
      price: 2500,
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
      name: "Corporate Business",
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

  // Listen to database reset event triggered from the parent layout
  useEffect(() => {
    const handleReset = () => {
      if (typeof window !== "undefined") {
        localStorage.setItem("m_amin_packages_list", JSON.stringify(defaultPackages));
        setPackages(defaultPackages);
      }
    };
    window.addEventListener("m_amin_reset_db", handleReset);
    return () => window.removeEventListener("m_amin_reset_db", handleReset);
  }, []);

  const loadPackages = () => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("m_amin_packages_list");
    if (saved) {
      setPackages(JSON.parse(saved));
    } else {
      localStorage.setItem("m_amin_packages_list", JSON.stringify(defaultPackages));
      setPackages(defaultPackages);
    }
  };

  const handleOpenAddModal = () => {
    setEditingPlanName(null);
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

  const handleOpenEditModal = (p: Plan) => {
    setEditingPlanName(p.name);
    setFormData({
      name: p.name,
      speed: p.speed,
      price: p.price.toString(),
      category: p.category,
      tagline: p.tagline,
      features: p.features.join("\n"),
      popular: p.popular || false,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedFeatures = formData.features
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const newPlan: Plan = {
      name: formData.name,
      speed: formData.speed,
      price: Number(formData.price),
      category: formData.category,
      tagline: formData.tagline,
      popular: formData.popular,
      features: formattedFeatures,
    };

    let updated: Plan[];
    if (editingPlanName) {
      updated = packages.map((p) => (p.name === editingPlanName ? newPlan : p));
    } else {
      updated = [...packages, newPlan];
    }

    setPackages(updated);
    localStorage.setItem("m_amin_packages_list", JSON.stringify(updated));
    setIsModalOpen(false);
    alert(editingPlanName ? "Package updated successfully!" : "New package created successfully!");
  };

  const handleDelete = (name: string) => {
    if (confirm(`Are you sure you want to delete package "${name}"?`)) {
      const updated = packages.filter((p) => p.name !== name);
      setPackages(updated);
      localStorage.setItem("m_amin_packages_list", JSON.stringify(updated));
    }
  };

  const resetDatabase = () => {
    if (confirm("Are you sure you want to reset packages to default seeded values?")) {
      localStorage.setItem("m_amin_packages_list", JSON.stringify(defaultPackages));
      setPackages(defaultPackages);
      alert("Packages list reset successfully!");
    }
  };

  if (!mounted || !isAuthenticated) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white text-slate-600">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-sm tracking-widest text-slate-500">LOADING SECURE ACCESS CONTROL...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Broadband Packages (CMS)</h2>
            <p className="text-xs text-slate-500 mt-1">Add, update, or remove connection plans. Synced with the public portal.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 bg-brand-blue hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              Add New Package
            </button>
            <button
              onClick={resetDatabase}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
            >
              Reset Default Packages
            </button>
          </div>
        </div>

        {/* Filters and search */}
        <div className="flex gap-3 max-w-sm">
          <input
            type="text"
            placeholder="Search package name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue placeholder-slate-400"
          />
        </div>

        {/* Packages Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                <th className="pb-3">Plan Name</th>
                <th className="pb-3">Bandwidth Speed</th>
                <th className="pb-3">Monthly Charge</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Tagline</th>
                <th className="pb-3">Homepage Popular</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {packages.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">No broadband packages found.</td>
                </tr>
              ) : (
                packages
                  .filter((p) =>
                    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.category.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((p) => (
                    <tr key={p.name} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 font-extrabold text-slate-900">{p.name}</td>
                      <td className="py-3.5 font-bold text-brand-blue">{p.speed}</td>
                      <td className="py-3.5 font-black text-emerald-650">৳{p.price} BDT</td>
                      <td className="py-3.5 uppercase font-semibold text-slate-600">{p.category}</td>
                      <td className="py-3.5 text-slate-500 max-w-xs truncate">{p.tagline}</td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          p.popular
                            ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}>
                          {p.popular ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="py-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="px-2.5 py-1 bg-brand-blue/15 hover:bg-brand-blue/25 border border-brand-blue/30 text-brand-blue rounded-lg font-bold text-[10px] cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.name)}
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

      {/* Add / Edit Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/90 rounded-[24px] max-w-md w-full p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
            <div>
              <h3 className="text-slate-900 font-extrabold text-base">
                {editingPlanName ? `Modify Package: ${editingPlanName}` : "Create New Connection Plan"}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Specify package bandwidth and cache routing tags below.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Plan Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Home Basic"
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
                <label htmlFor="popular_chk" className="text-slate-800 font-bold text-xs select-none cursor-pointer">
                  Mark as Popular / Feature on Homepage
                </label>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button
                  type="submit"
                  className="px-5 py-3.5 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md"
                >
                  {editingPlanName ? "Save Changes" : "Create Plan"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
