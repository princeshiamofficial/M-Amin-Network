"use client";

import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
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
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  Trash2,
  MoreVertical,
  Search,
  Pencil,
  X,
  Users,
  UserCheck,
  UserX,
  UserPlus,
  Loader2,
  HelpCircle,
  Wifi,
  DollarSign
} from "lucide-react";

interface Subscriber {
  id: string;
  name: string;
  phone: string;
  address: string;
  planName: string;
  status: "Active" | "Suspended";
  userId?: string;
  password?: string;
}

interface PackageItem {
  id: string;
  name: string;
  speed: string;
  price: number;
}

const defaultSubscribers: Subscriber[] = [
  { id: "SUB-88293", name: "Mehan Ahmed", phone: "01707009267", address: "Kadomtoli, South Keraniganj", planName: "50 Mbps Premium", status: "Active", userId: "man-9988", password: "password123" },
  { id: "SUB-19402", name: "Sheikh Nabil", phone: "01928492049", address: "Aganagar Central, Dhaka", planName: "30 Mbps Gamer Pack", status: "Active", userId: "man-5432", password: "password123" },
  { id: "SUB-22839", name: "Nasrin Sultana", phone: "01819284920", address: "Bashundhara R/A, South Keraniganj", planName: "100 Mbps SOHO Dedicated", status: "Active", userId: "man-1122", password: "password123" },
];

const fallbackPackages = [
  "10 Mbps Home Basic",
  "20 Mbps Home Standard",
  "30 Mbps Gamer Pack",
  "50 Mbps Premium",
  "100 Mbps SOHO Dedicated",
  "Corporate Link Dedicated"
];

export default function CustomersPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [packages, setPackages] = useState<string[]>([]);
  const [rawPackages, setRawPackages] = useState<PackageItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    planName: "30 Mbps Gamer Pack",
    status: "Active" as "Active" | "Suspended",
    userId: "",
    password: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);

    // Load subscribers
    getSetting("subscribers").then(saved => {
      if (saved && Array.isArray(saved) && saved.length > 0) setSubscribers(saved as Subscriber[]);
      else setSubscribers(defaultSubscribers);
    });

    // Load packages dynamically from database
    getSetting("packages_list").then(savedPkgs => {
      if (savedPkgs && Array.isArray(savedPkgs)) {
        setRawPackages(savedPkgs as PackageItem[]);
        const names = (savedPkgs as PackageItem[]).map(p => `${p.speed} ${p.name}`);
        // Combine dynamic and default fallback ones to prevent orphaned package selections
        const uniquePackages = Array.from(new Set([...names, ...fallbackPackages]));
        setPackages(uniquePackages);
      } else {
        setPackages(fallbackPackages);
      }
    });
  }, [router]);

  const handleDeleteSubscriber = async (id: string) => {
    const confirmed = window.customConfirm
      ? await window.customConfirm("Are you sure you want to disconnect and delete this subscriber profile?")
      : confirm("Are you sure you want to disconnect/delete this subscriber?");
    
    if (!confirmed) return;

    const updated = subscribers.filter(s => s.id !== id);
    setSubscribers(updated);
    setSetting("subscribers", updated as Subscriber[]);
    toast.success("Subscriber profile successfully disconnected.");
  };

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      phone: "",
      address: "",
      planName: packages[0] || "30 Mbps Gamer Pack",
      status: "Active",
      userId: "",
      password: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (sub: Subscriber) => {
    setEditingId(sub.id);
    setFormData({
      name: sub.name,
      phone: sub.phone,
      address: sub.address,
      planName: sub.planName,
      status: sub.status,
      userId: sub.userId || "",
      password: sub.password || "",
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = formData.name.trim();
    const trimmedPhone = formData.phone.trim();
    if (!trimmedName || !trimmedPhone) {
      toast.error("Please fill in both Name and Phone fields.");
      return;
    }

    setIsSaving(true);
    // Simulate server lag for premium feels
    setTimeout(() => {
      let updated: Subscriber[];

      if (editingId) {
        // Edit existing
        updated = subscribers.map(s =>
          s.id === editingId ? { ...s, ...formData, name: trimmedName, phone: trimmedPhone } : s
        );
      } else {
        // Create new
        const newSubId = `SUB-${Math.floor(10000 + Math.random() * 90000)}`;
        const newSub: Subscriber = {
          id: newSubId,
          ...formData,
          name: trimmedName,
          phone: trimmedPhone
        };
        updated = [...subscribers, newSub];
      }

      setSubscribers(updated);
      setSetting("subscribers", updated as Subscriber[]);
      setIsSaving(false);
      setIsModalOpen(false);
      toast.success(editingId ? "Subscriber profile updated successfully!" : "New subscriber registered successfully!");
    }, 600);
  };

  const toggleStatus = (id: string) => {
    const updated = subscribers.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === "Active" ? "Suspended" : "Active";
        return { ...s, status: nextStatus as "Active" | "Suspended" };
      }
      return s;
    });
    setSubscribers(updated);
    setSetting("subscribers", updated as Subscriber[]);
    toast.success("Subscriber status toggled successfully.");
  };

  if (!auth) return null;

  const filteredSubscribers = subscribers.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.phone.includes(searchTerm) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Statistics calculation
  const totalSubs = subscribers.length;
  const activeSubs = subscribers.filter(s => s.status === "Active").length;
  const suspendedSubs = subscribers.filter(s => s.status === "Suspended").length;

  // Approximate revenue helper
  const calculateRevenue = () => {
    let revenue = 0;
    subscribers.forEach(sub => {
      if (sub.status !== "Active") return;
      
      // Try to match plan name with rawPackages to get real price
      const matched = rawPackages.find(p => `${p.speed} ${p.name}` === sub.planName);
      if (matched) {
        revenue += matched.price;
      } else {
        // Fallbacks for seed data
        if (sub.planName.includes("10 Mbps")) revenue += 500;
        else if (sub.planName.includes("20 Mbps")) revenue += 800;
        else if (sub.planName.includes("30 Mbps")) revenue += 1000;
        else if (sub.planName.includes("50 Mbps")) revenue += 1250;
        else if (sub.planName.includes("100 Mbps")) revenue += 2500;
        else revenue += 1500; // Corporate/dedicated default
      }
    });
    return revenue;
  };

  const getPackageCharge = (planName: string) => {
    const matched = rawPackages.find(p => `${p.speed} ${p.name}` === planName);
    if (matched) return `৳ ${matched.price}`;
    
    // Fallbacks for seed data
    if (planName.includes("10 Mbps")) return "৳ 500";
    if (planName.includes("20 Mbps")) return "৳ 800";
    if (planName.includes("30 Mbps")) return "৳ 1000";
    if (planName.includes("50 Mbps")) return "৳ 1250";
    if (planName.includes("100 Mbps")) return "৳ 2500";
    return "৳ 1500";
  };

  return (
    <div className="space-y-6 text-slate-850 font-sans">
      


      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {/* Total Subscribers */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:p-5 shadow-xs flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <div className="space-y-0.5 sm:space-y-1 text-left min-w-0">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">Total Clients</span>
            <span className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight block truncate">{totalSubs}</span>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Active Subscribers */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:p-5 shadow-xs flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <div className="space-y-0.5 sm:space-y-1 text-left min-w-0">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">Active Connections</span>
            <span className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight block truncate">{activeSubs}</span>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 relative">
            <span className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500"></span>
            </span>
            <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Suspended Subscribers */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:p-5 shadow-xs flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <div className="space-y-0.5 sm:space-y-1 text-left min-w-0">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">Suspended Lines</span>
            <span className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight block truncate">{suspendedSubs}</span>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shrink-0">
            <UserX className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Est. Revenue */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:p-5 shadow-xs flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <div className="space-y-0.5 sm:space-y-1 text-left min-w-0">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">Monthly Est. Billings</span>
            <span className="text-sm sm:text-2xl font-black text-slate-850 tracking-tight block truncate">৳ {calculateRevenue().toLocaleString()} BDT</span>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
      </div>

      {/* Main Panel Table Container */}
      <div className="space-y-6">
        
        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
          <div className="flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search subscriber name, phone or client ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 placeholder-slate-400 transition-all font-medium"
            />
          </div>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-md shadow-indigo-500/10 inline-flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Subscriber</span>
          </button>
        </div>

        {/* Table Grid container */}
        <div className="overflow-x-auto border border-slate-200/60 rounded-xl bg-white shadow-sm">
          <Table>
            <TableHeader className="bg-slate-50/75 border-b border-slate-200/60">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider py-4 pl-5">SL</TableHead>
                <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider py-4">Client Name</TableHead>
                <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider py-4">Username</TableHead>
                <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider py-4">Password</TableHead>
                <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider py-4">Package</TableHead>
                <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider py-4">Charge</TableHead>
                <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider py-4">Status</TableHead>
                <TableHead className="text-xs font-bold text-slate-500 text-right uppercase tracking-wider py-4 pr-5">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscribers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <HelpCircle className="w-8 h-8 text-slate-300" />
                      <span className="text-xs font-semibold">No active subscribers found.</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubscribers.map((u, idx) => (
                  <TableRow key={u.id} className="group hover:bg-slate-50/40 transition-colors border-b border-slate-100 last:border-0 text-slate-800">
                    <TableCell className="py-4 pl-5 font-bold text-slate-400 font-mono text-[11px]">{idx + 1}</TableCell>
                    <TableCell className="py-4 text-left font-extrabold text-slate-900">
                      {u.name}
                    </TableCell>
                    <TableCell className="py-4 font-bold font-mono text-indigo-650 text-[11px]">{u.userId || "—"}</TableCell>
                    <TableCell className="py-4 font-mono text-slate-650 text-[11px]">{u.password || "—"}</TableCell>
                    <TableCell className="py-4">
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-slate-200/50">
                        <Wifi className="w-3 h-3 text-slate-500" />
                        <span>{u.planName}</span>
                      </span>
                    </TableCell>
                    <TableCell className="py-4 font-bold font-mono text-indigo-600 text-[11px]">{getPackageCharge(u.planName)}</TableCell>
                    <TableCell className="py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border leading-none ${
                        u.status === "Active"
                          ? "bg-emerald-50/70 text-emerald-700 border-emerald-100"
                          : "bg-rose-50/70 text-rose-700 border-rose-100"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          u.status === "Active" ? "bg-emerald-500" : "bg-rose-500 animate-pulse"
                        }`} />
                        <span>{u.status}</span>
                      </span>
                    </TableCell>
                    <TableCell className="py-4 pr-5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="inline-flex items-center justify-center w-7 h-7 hover:bg-slate-100/70 active:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer outline-none border border-transparent hover:border-slate-200/40">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-36 bg-white border border-slate-200 rounded-xl shadow-xl py-1 relative z-50">
                          <DropdownMenuItem
                            onClick={() => handleOpenEditModal(u)}
                            className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/30 cursor-pointer flex items-center gap-2"
                          >
                            <Pencil className="w-3.5 h-3.5 text-slate-400" />
                            <span>Edit Client</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => toggleStatus(u.id)}
                            className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/30 cursor-pointer flex items-center gap-2"
                          >
                            <Wifi className="w-3.5 h-3.5 text-slate-400" />
                            <span>Toggle Status</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-slate-100 my-1 h-px" />
                          <DropdownMenuItem
                            onClick={() => handleDeleteSubscriber(u.id)}
                            className="px-3 py-2 text-xs font-bold text-red-650 hover:bg-red-50 cursor-pointer flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-405" />
                            <span>Disconnect</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ── ADD/EDIT SUBSCRIBER MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-[9999] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-slate-100 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto text-left relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer w-7 h-7 rounded-full hover:bg-slate-50 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1 text-left">
              <h3 className="text-slate-900 font-extrabold text-sm uppercase tracking-wider">
                {editingId ? "Modify Subscriber Profile" : "Register New Subscriber"}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Set subscriber details, assign broadband plan speed, and toggle account access status.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Client Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Karim Hossain"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 placeholder-[#8c94a0] focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 01712345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 placeholder-[#8c94a0] focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>

               <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Physical Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. House 12, Road 4, Kadomtoli"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 placeholder-[#8c94a0] focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Portal User ID / Username</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. man-5432"
                    value={formData.userId}
                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 placeholder-[#8c94a0] focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all font-mono"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Portal Password</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. password123"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 placeholder-[#8c94a0] focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Connection Plan</label>
                  <div className="relative">
                    <select
                      value={formData.planName}
                      onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 cursor-pointer appearance-none pr-8"
                    >
                      {packages.map((pkg) => (
                        <option key={pkg} value={pkg}>{pkg}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Account Status</label>
                  <div className="relative">
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as "Active" | "Suspended" })}
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 cursor-pointer appearance-none pr-8"
                    >
                      <option value="Active">Active</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-extrabold text-slate-700 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl text-xs font-extrabold cursor-pointer transition-all shadow-md shadow-indigo-500/10 flex items-center justify-center gap-1.5"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingId ? "Save Changes" : "Register Client"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
