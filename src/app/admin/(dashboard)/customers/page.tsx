"use client";

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
  Plus,
  X
} from "lucide-react";

interface Subscriber {
  id: string;
  name: string;
  phone: string;
  address: string;
  planName: string;
  status: "Active" | "Suspended";
}

const defaultSubscribers: Subscriber[] = [
  { id: "SUB-88293", name: "Mehan Ahmed", phone: "01707009267", address: "Kadomtoli, South Keraniganj", planName: "50 Mbps Premium", status: "Active" },
  { id: "SUB-19402", name: "Sheikh Nabil", phone: "01928492049", address: "Aganagar Central, Dhaka", planName: "30 Mbps Gamer Pack", status: "Active" },
  { id: "SUB-22839", name: "Nasrin Sultana", phone: "01819284920", address: "Bashundhara R/A, South Keraniganj", planName: "100 Mbps SOHO Dedicated", status: "Active" },
];

const packagesList = [
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
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    planName: "30 Mbps Gamer Pack",
    status: "Active" as "Active" | "Suspended",
  });

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    getSetting("subscribers").then(saved => {
      if (saved) setSubscribers(saved as any);
      else setSubscribers(defaultSubscribers);
    });
  }, [router]);

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm("Are you sure you want to disconnect/delete this subscriber?")) return;
    const updated = subscribers.filter(s => s.id !== id);
    setSubscribers(updated);
    setSetting("subscribers", updated as any);
  };

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      phone: "",
      address: "",
      planName: "30 Mbps Gamer Pack",
      status: "Active",
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
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: Subscriber[];

    if (editingId) {
      // Edit existing
      updated = subscribers.map(s =>
        s.id === editingId ? { ...s, ...formData } : s
      );
    } else {
      // Create new
      const newSubId = `SUB-${Math.floor(10000 + Math.random() * 90000)}`;
      const newSub: Subscriber = {
        id: newSubId,
        ...formData
      };
      updated = [...subscribers, newSub];
    }

    setSubscribers(updated);
    setSetting("subscribers", updated as any);
    setIsModalOpen(false);
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
    setSetting("subscribers", updated as any);
  };

  if (!auth) return null;

  const filteredSubscribers = subscribers.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.phone.includes(searchTerm) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-6 text-slate-800">
      
      {/* Search and Filters Row */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <div className="flex-1 max-w-sm relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search subscriber name, phone or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue placeholder-slate-400 transition-all"
          />
        </div>
        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 bg-brand-blue hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md inline-flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Subscriber</span>
        </button>
      </div>

      {/* Table grid */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SL</TableHead>
              <TableHead>Client ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscribers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-slate-400">No active subscribers found.</TableCell>
              </TableRow>
            ) : (
              filteredSubscribers.map((u, idx) => (
                <TableRow key={u.id}>
                  <TableCell className="font-semibold text-slate-500 font-mono">{idx + 1}</TableCell>
                  <TableCell className="font-bold font-mono text-brand-blue">{u.id}</TableCell>
                  <TableCell className="font-extrabold text-slate-900">{u.name}</TableCell>
                  <TableCell className="font-mono text-slate-600">{u.phone}</TableCell>
                  <TableCell className="text-slate-600 text-xs max-w-xs">{u.address}</TableCell>
                  <TableCell className="font-semibold text-slate-650">{u.planName}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      u.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : "bg-red-50 text-red-700 border-red-100"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        u.status === "Active" ? "bg-emerald-500" : "bg-red-500"
                      }`} />
                      {u.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="inline-flex items-center justify-center p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700 transition-colors cursor-pointer outline-none">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36 bg-white border border-slate-200 rounded-xl shadow-xl py-1">
                        <DropdownMenuItem
                          onClick={() => handleOpenEditModal(u)}
                          className="px-3 py-2 text-xs font-bold text-brand-blue hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span>Edit Client</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => toggleStatus(u.id)}
                          className="px-3 py-2 text-xs font-bold text-slate-650 hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span>Toggle Status</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-100 my-1 h-px" />
                        <DropdownMenuItem
                          onClick={() => handleDeleteSubscriber(u.id)}
                          className="px-3 py-2 text-xs font-bold text-red-650 hover:bg-red-50 cursor-pointer flex items-center gap-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* ── ADD/EDIT SUBSCRIBER MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-slate-900 font-extrabold text-base">
                {editingId ? "Modify Subscriber" : "Register New Subscriber"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer p-1 rounded-lg hover:bg-slate-50">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Client Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Karim Hossain"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 01712345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Physical Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. House 12, Road 4, Kadomtoli"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Connection Plan</label>
                  <select
                    value={formData.planName}
                    onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue cursor-pointer"
                  >
                    {packagesList.map((pkg) => (
                      <option key={pkg} value={pkg}>{pkg}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Account Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "Active" | "Suspended" })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-650 rounded-xl font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-blue hover:opacity-95 text-white rounded-xl font-bold transition-all cursor-pointer"
                >
                  {editingId ? "Save Changes" : "Register Client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

