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
  MoreVertical,
  FolderKanban,
  FolderPlus,
  X
} from "lucide-react";

export interface PackageCategory {
  id: string;
  name: string;
}

export const defaultCategories: PackageCategory[] = [
  { id: "home", name: "Home Internet" },
  { id: "gaming", name: "Gamer Packs" },
  { id: "corporate", name: "Corporate Dedicated" },
];

interface Plan {
  speed: string;
  price: number;
  name: string;
  category: string;
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

  // Category state
  const [categories, setCategories] = useState<PackageCategory[]>(defaultCategories);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<PackageCategory | null>(null);
  const [catNameInput, setCatNameInput] = useState("");

  // Package state
  const [packages, setPackages] = useState<Plan[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Package modal forms state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlanName, setEditingPlanName] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    speed: "",
    price: "",
    category: "home",
    tagline: "",
    features: "",
    popular: false,
  });

  const loadCategories = React.useCallback(() => {
    if (typeof window === "undefined") return;
    getSetting("package_categories").then(saved => {
      if (Array.isArray(saved) && saved.length > 0) {
        setCategories(saved as PackageCategory[]);
      } else {
        setSetting("package_categories", defaultCategories as unknown as Record<string, unknown>[]);
        setCategories(defaultCategories);
      }
    });
  }, []);

  const loadPackages = React.useCallback(() => {
    if (typeof window === "undefined") return;
    getSetting("packages_list").then(saved => {
      if (saved) {
        setPackages(saved as unknown as Plan[]);
      } else {
        setSetting("packages_list", defaultPackages as unknown as Record<string, unknown>[]);
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
          loadCategories();
          loadPackages();
        }
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [router, loadPackages, loadCategories]);

  // Listen to database reset event triggered from the parent layout
  useEffect(() => {
    const handleReset = async () => {
      if (typeof window !== "undefined") {
        setSetting("package_categories", defaultCategories as unknown as Record<string, unknown>[]);
        setCategories(defaultCategories);
        setSetting("packages_list", defaultPackages as unknown as Record<string, unknown>[]);
        setPackages(defaultPackages);
      }
    };
    window.addEventListener("reset_db", handleReset);
    return () => window.removeEventListener("reset_db", handleReset);
  }, []);

  // Category handlers
  const handleOpenAddCategoryModal = () => {
    setEditingCat(null);
    setCatNameInput("");
    setIsCatModalOpen(true);
  };

  const handleOpenEditCategoryModal = (cat: PackageCategory) => {
    setEditingCat(cat);
    setCatNameInput(cat.name);
    setIsCatModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = catNameInput.trim();
    if (!trimmed) {
      toast("Category name cannot be empty.");
      return;
    }

    let updated: PackageCategory[];
    if (editingCat) {
      updated = categories.map((c) => (c.id === editingCat.id ? { ...c, name: trimmed } : c));
      toast(`Category "${trimmed}" updated successfully!`);
    } else {
      const generatedId = trimmed
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      const finalId = generatedId || `cat-${Date.now()}`;

      if (categories.some((c) => c.id === finalId)) {
        toast("A category with this name already exists!");
        return;
      }
      updated = [...categories, { id: finalId, name: trimmed }];
      toast(`New category "${trimmed}" added successfully!`);
    }

    setCategories(updated);
    setSetting("package_categories", updated as unknown as Record<string, unknown>[]);
    setIsCatModalOpen(false);
    setCatNameInput("");
    setEditingCat(null);
  };

  const handleDeleteCategory = async (cat: PackageCategory) => {
    if (categories.length <= 1) {
      toast("At least one category is required.");
      return;
    }

    const confirmText = `Are you sure you want to delete category "${cat.name}"? Packages in this category will be moved to default category.`;
    if (await confirmAction(confirmText)) {
      const fallbackId = categories.find((c) => c.id !== cat.id)?.id || "home";
      const updatedCats = categories.filter((c) => c.id !== cat.id);
      const updatedPkgs = packages.map((p) => (p.category === cat.id ? { ...p, category: fallbackId } : p));

      setCategories(updatedCats);
      setPackages(updatedPkgs);
      setSetting("package_categories", updatedCats as unknown as Record<string, unknown>[]);
      setSetting("packages_list", updatedPkgs as unknown as Record<string, unknown>[]);
      toast(`Category "${cat.name}" deleted successfully.`);
    }
  };

  // Package handlers
  const handleOpenAddModal = () => {
    setEditingPlanName(null);
    setFormData({
      name: "",
      speed: "",
      price: "",
      category: categories[0]?.id || "home",
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
    setSetting("packages_list", updated as unknown as Record<string, unknown>[]);
    setIsModalOpen(false);
    toast(editingPlanName ? "Package updated successfully!" : "New package created successfully!");
  };

  const handleDelete = async (name: string) => {
    if (await confirmAction(`Are you sure you want to delete package "${name}"?`)) {
      const updated = packages.filter((p) => p.name !== name);
      setPackages(updated);
      setSetting("packages_list", updated as unknown as Record<string, unknown>[]);
    }
  };

  const handleTogglePopular = (planName: string) => {
    if (!allowEdit) {
      toast.error("You don't have permission to edit packages.");
      return;
    }
    const updated = packages.map((pkg) => {
      if (pkg.name === planName) {
        const newPopularStatus = !pkg.popular;
        toast.success(`"${pkg.name}" is now marked as ${newPopularStatus ? "Popular" : "Standard"}`);
        return { ...pkg, popular: newPopularStatus };
      }
      return pkg;
    });
    setPackages(updated);
    setSetting("packages_list", updated as unknown as Record<string, unknown>[]);
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
      {/* Category Management Bar */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-brand-blue" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">Package Categories ({categories.length})</h3>
          </div>
          {allowAdd && (
            <button
              type="button"
              onClick={handleOpenAddCategoryModal}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <FolderPlus className="w-3.5 h-3.5 text-brand-blue" />
              <span>Add Category</span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-bold"
            >
              <span>{cat.name}</span>
              {(allowEdit || allowDelete) && (
                <div className="flex items-center gap-1 ml-1 border-l border-slate-200 pl-1.5">
                  {allowEdit && (
                    <button
                      type="button"
                      onClick={() => handleOpenEditCategoryModal(cat)}
                      className="p-1 text-slate-500 hover:text-brand-blue transition-colors cursor-pointer"
                      title="Edit Category"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                  )}
                  {allowDelete && (
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat)}
                      className="p-1 text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
                      title="Delete Category"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

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
                <TableHead>Popular</TableHead>
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
                  .filter((p) => {
                    const catObj = categories.find((c) => c.id === p.category);
                    const catName = catObj ? catObj.name : p.category;
                    return (
                      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      catName.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                  })
                  .map((p) => {
                    const catObj = categories.find((c) => c.id === p.category);
                    const catDisplayName = catObj ? catObj.name : p.category;

                    return (
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
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-blue-50 text-blue-700 border-blue-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <span>{catDisplayName}</span>
                          </span>
                        </TableCell>
                        <TableCell className="text-slate-500 max-w-xs truncate">{p.tagline}</TableCell>
                        <TableCell>
                          <button
                            type="button"
                            disabled={!allowEdit}
                            onClick={() => handleTogglePopular(p.name)}
                            title={p.popular ? "Click to set as Standard" : "Click to set as Popular"}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                              p.popular
                                ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 shadow-xs"
                                : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-700"
                            }`}
                          >
                            <Star className={`w-3 h-3 ${p.popular ? "fill-amber-500 text-amber-500" : "text-slate-400"}`} />
                            <span>{p.popular ? "Popular" : "Standard"}</span>
                          </button>
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
                    );
                  })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add / Edit Category Modal */}
      {isCatModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-slate-900 font-extrabold text-sm uppercase tracking-wider">
                {editingCat ? "Edit Category Name" : "Add Package Category"}
              </h3>
              <button
                type="button"
                onClick={() => setIsCatModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div className="space-y-1">
                <label className="text-slate-700 font-bold text-xs block">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gamer Packs"
                  value={catNameInput}
                  onChange={(e) => setCatNameInput(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCatModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md"
                >
                  {editingCat ? "Save Category" : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Package Modal Overlay */}
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
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
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
