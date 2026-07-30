"use client";
import { toast } from "sonner";

import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { confirmAction } from "@/lib/confirmHelper";
import { useRouter } from "next/navigation";
import { useAdminSecurity } from "@/hooks/useAdminSecurity";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {
  Zap,
  Search,
  Plus,
  Star,
  Pencil,
  Trash2,
  MoreVertical
} from "lucide-react";

interface Plan {
  speed: string;
  price: number;
  name: string;
  category: "home" | "gaming" | "corporate";
  tagline: string;
  popular?: boolean;
  features: string[];
}

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

export default function AdminPackagesPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const { canAdd, canEdit, canDelete } = useAdminSecurity();
  const allowAdd = canAdd("/admin/packages");
  const allowEdit = canEdit("/admin/packages");
  const allowDelete = canDelete("/admin/packages");

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

  const loadPackages = React.useCallback(() => {
    if (typeof window === "undefined") return;
    getSetting("packages_list").then(saved => {
      if (saved) {
        setPackages(saved as any);
      } else {
        setSetting("packages_list", defaultPackages as any);
        setPackages(defaultPackages);
      }
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);
      if (typeof window !== "undefined") {
        const auth = sessionStorage.getItem("admin_authenticated");
        if (auth !== "true") {
          router.push("/admin");
        } else {
          setIsAuthenticated(true);
          loadPackages();
        }
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [router, loadPackages]);

  // Listen to database reset event triggered from the parent layout
  useEffect(() => {
    const handleReset = async () => {
      if (typeof window !== "undefined") {
        setSetting("packages_list", defaultPackages as any);
        setPackages(defaultPackages);
      }
    };
    window.addEventListener("reset_db", handleReset);
    return () => window.removeEventListener("reset_db", handleReset);
  }, []);

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
      price: String(p.price),
      category: p.category,
      tagline: p.tagline,
      features: p.features.join("\n"),
      popular: !!p.popular,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window === "undefined") return;

    const parsedPlan: Plan = {
      name: formData.name,
      speed: formData.speed,
      price: Number(formData.price) || 0,
      category: formData.category,
      tagline: formData.tagline,
      features: formData.features.split("\n").filter((f) => f.trim().length > 0),
      popular: formData.popular,
    };

    let updated: Plan[];
    if (editingPlanName) {
      updated = packages.map((p) => (p.name === editingPlanName ? parsedPlan : p));
    } else {
      if (packages.some((p) => p.name.toLowerCase() === parsedPlan.name.toLowerCase())) {
        toast("A package with this name already exists!");
        return;
      }
      updated = [...packages, parsedPlan];
    }

    setPackages(updated);
    setSetting("packages_list", updated as any);
    setIsModalOpen(false);
    toast(editingPlanName ? "Package updated successfully!" : "New package created successfully!");
  };

  const handleDelete = async (name: string) => {
    if (await confirmAction(`Are you sure you want to delete package "${name}"?`)) {
      const updated = packages.filter((p) => p.name !== name);
      setPackages(updated);
      setSetting("packages_list", updated as any);
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
      <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-6">
        {/* Filters and search + Add button */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
          <div className="flex-1 max-w-sm relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search package name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue focus:bg-white placeholder-slate-400 transition-all"
            />
          </div>
          {allowAdd && (
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2.5 bg-brand-blue hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md inline-flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Package</span>
            </button>
          )}
        </div>

        {/* Packages Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Bandwidth Speed</TableHead>
                <TableHead>Monthly Charge</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Tagline</TableHead>
                <TableHead>Homepage Popular</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-slate-400">No broadband packages found.</TableCell>
                </TableRow>
              ) : (
                [...packages]
                  .reverse()
                  .filter((p) =>
                    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.category.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((p) => (
                    <TableRow key={p.name}>
                      <TableCell className="font-extrabold text-slate-900">{p.name}</TableCell>
                      <TableCell className="font-semibold text-slate-900">
                        <span className="bg-blue-50/70 text-brand-blue border border-blue-100/50 rounded-lg px-2.5 py-1 font-bold inline-flex items-center gap-1">
                          <Zap className="w-3 h-3 fill-blue-500 text-blue-500" />
                          {p.speed}
                        </span>
                      </TableCell>
                      <TableCell className="font-extrabold text-[13px] text-emerald-650">৳{p.price} BDT</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          p.category === "home"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : p.category === "gaming"
                            ? "bg-violet-50 text-violet-700 border-violet-100"
                            : "bg-blue-50 text-blue-700 border-blue-100"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            p.category === "home"
                              ? "bg-emerald-500"
                              : p.category === "gaming"
                              ? "bg-violet-500"
                              : "bg-blue-500"
                          }`} />
                          <span className="capitalize">{p.category}</span>
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-500 max-w-xs truncate">{p.tagline}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          p.popular
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-slate-50/50 text-slate-400 border-slate-100/70"
                        }`}>
                          <Star className={`w-3 h-3 ${p.popular ? "fill-amber-500 text-amber-500" : "text-slate-400"}`} />
                          <span>{p.popular ? "Popular" : "Standard"}</span>
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {(allowEdit || allowDelete) && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="inline-flex items-center justify-center p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700 transition-colors cursor-pointer outline-none">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-32 bg-white border border-slate-200 rounded-xl shadow-xl py-1">
                              {allowEdit && (
                                <DropdownMenuItem
                                  onClick={() => handleOpenEditModal(p)}
                                  className="px-3 py-2 text-xs font-bold text-brand-blue hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                  <span>Edit Plan</span>
                                </DropdownMenuItem>
                              )}
                              {allowDelete && (
                                <DropdownMenuItem
                                  onClick={() => handleDelete(p.name)}
                                  className="px-3 py-2 text-xs font-bold text-red-650 hover:bg-red-50 cursor-pointer flex items-center gap-2"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add / Edit Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
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
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as "home" | "gaming" | "corporate" })}
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
                  Mark as Popular
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

