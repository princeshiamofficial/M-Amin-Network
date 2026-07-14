"use client";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2, CheckCircle, XCircle } from "lucide-react";

interface PackageRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  zone: string;
  price: number;
  address: string;
  referralCode?: string;
  planName: string;
  speed: string;
  status: "Pending" | "Completed" | "Cancelled";
  date: string;
}

const defaultRequests: PackageRequest[] = [
  {
    id: "REQ-88293-1920",
    name: "Mehan Ahmed",
    phone: "01707009267",
    email: "mehan@mamin.net",
    zone: "Kadomtoli",
    price: 1250,
    address: "House No. 12, Road 4, Kadomtoli, South Keraniganj",
    planName: "Enterprise Splice",
    speed: "100 Mbps",
    status: "Pending",
    date: "7/5/2026, 11:34 AM"
  },
  {
    id: "REQ-19402-2849",
    name: "Kamrul Hasan",
    phone: "01812345678",
    email: "kamrul@gmail.com",
    zone: "Aganagar",
    price: 800,
    address: "Lane 2, Block A, Aganagar, South Keraniganj",
    planName: "Home Standard",
    speed: "20 Mbps",
    status: "Completed",
    date: "7/4/2026, 4:15 PM"
  }
];

export default function PackageRequestsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [requests, setRequests] = useState<PackageRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Completed" | "Cancelled">("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReq, setNewReq] = useState({ name: "", phone: "", zone: "", address: "", planName: "", speed: "", price: 0 });

  const filteredRequests = requests.filter(r => statusFilter === "All" || r.status === statusFilter);

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) { router.replace("/admin"); return; }
    setAuth(true);
    getSetting("package_requests").then(saved => {
      if (saved) { setRequests(saved as PackageRequest[]); }
      else {
        setSetting("package_requests", defaultRequests as PackageRequest[]);
        setRequests(defaultRequests);
      }
    });
  }, [router]);

  const updateStatus = (id: string, status: PackageRequest["status"]) => {
    const updated = requests.map(r => r.id === id ? { ...r, status } : r);
    setRequests(updated);
    setSetting("package_requests", updated as PackageRequest[]);
  };

  const deleteRequest = async (id: string) => {
    if (!confirm("Delete this request?")) return;
    const updated = requests.filter(r => r.id !== id);
    setRequests(updated);
    setSetting("package_requests", updated as PackageRequest[]);
  };

  const handleAddRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReq.name || !newReq.phone) return;
    const added: PackageRequest = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newReq.name,
      phone: newReq.phone,
      email: "N/A (Manual Entry)",
      zone: newReq.zone || "N/A",
      address: newReq.address || "N/A",
      planName: newReq.planName || "Manual Plan",
      speed: newReq.speed || "N/A",
      price: newReq.price || 0,
      status: "Pending",
      date: new Date().toLocaleString()
    };
    const updated = [added, ...requests];
    setRequests(updated);
    setSetting("package_requests", updated as PackageRequest[]);
    setNewReq({ name: "", phone: "", zone: "", address: "", planName: "", speed: "", price: 0 });
    setShowAddForm(false);
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      {/* Status Filter Tabs */}
      <div className="flex border-b border-slate-100 pb-px gap-6 overflow-x-auto select-none mb-2">
        {([
          { id: "All", label: "All Requests" },
          { id: "Pending", label: "Pending" },
          { id: "Completed", label: "Completed" },
          { id: "Cancelled", label: "Cancelled" }
        ] as const).map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id as typeof statusFilter)}
              className={`flex items-center gap-2 pb-3 text-xs font-bold transition-all relative border-b-2 cursor-pointer ${
                isActive
                  ? "text-brand-blue border-brand-blue"
                  : "text-slate-400 border-transparent hover:text-slate-600"
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                isActive ? "bg-brand-blue/10 text-brand-blue" : "bg-slate-100 text-slate-500"
              }`}>
                {tab.id === "All" ? requests.length : requests.filter(r => r.status === tab.id).length}
              </span>
            </button>
          );
        })}
      </div>
        <div className="flex justify-end pt-2">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-brand-blue text-white px-4 py-1.5 rounded-lg font-bold text-xs hover:bg-blue-700 transition-colors cursor-pointer"
          >
            {showAddForm ? "Cancel" : "Add Manual Request"}
          </button>
        </div>

      {showAddForm && (
        <form onSubmit={handleAddRequest} className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 mb-4">
          <h3 className="font-bold text-slate-800 text-sm">Add Customer Request</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Customer Name</label>
              <input required type="text" value={newReq.name} onChange={e => setNewReq({ ...newReq, name: e.target.value })} className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" placeholder="Name" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Phone</label>
              <input required type="text" value={newReq.phone} onChange={e => setNewReq({ ...newReq, phone: e.target.value })} className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" placeholder="Phone" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Plan Name</label>
              <input required type="text" value={newReq.planName} onChange={e => setNewReq({ ...newReq, planName: e.target.value })} className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg" placeholder="e.g. Home Basic" />
            </div>
          </div>
          <button type="submit" className="bg-brand-blue text-white px-5 py-2 rounded-lg font-bold text-xs hover:bg-blue-700 transition-colors cursor-pointer">
            Save Request
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">Name</th>
              <th className="pb-3">Phone</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Zone</th>
              <th className="pb-3">Price</th>
              <th className="pb-3">Refer / Promo</th>
              <th className="pb-3">Address</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-slate-400">
                  No package requests found.
                </td>
              </tr>
            ) : (
              filteredRequests.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5">
                    <span className="font-extrabold text-slate-800 block">{r.name}</span>
                    <span className="text-[9px] text-brand-blue font-mono">{r.planName} ({r.speed})</span>
                  </td>
                  <td className="py-3.5 font-mono text-slate-600">{r.phone}</td>
                  <td className="py-3.5 font-mono text-slate-550">{r.email}</td>
                  <td className="py-3.5 font-semibold text-slate-700">{r.zone}</td>
                  <td className="py-3.5 font-black text-emerald-600">৳{r.price} BDT</td>
                  <td className="py-3.5 font-mono text-slate-600">{r.referralCode || "N/A"}</td>
                  <td className="py-3.5 text-slate-650 max-w-xs truncate" title={r.address}>{r.address}</td>
                  <td className="py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase whitespace-nowrap ${
                      r.status === "Completed" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" :
                      r.status === "Cancelled" ? "bg-red-500/10 text-red-600 border border-red-500/20" :
                      "bg-amber-400/10 text-amber-600 border border-amber-400/20 animate-pulse"
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="inline-flex items-center justify-center p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700 transition-colors cursor-pointer outline-none">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50">
                        {r.status === "Pending" && (
                          <DropdownMenuItem
                            onClick={() => updateStatus(r.id, "Completed")}
                            className="px-3 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 cursor-pointer flex items-center gap-2"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Complete</span>
                          </DropdownMenuItem>
                        )}
                        {r.status === "Pending" && (
                          <DropdownMenuItem
                            onClick={() => updateStatus(r.id, "Cancelled")}
                            className="px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 cursor-pointer flex items-center gap-2"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Cancel</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => deleteRequest(r.id)}
                          className="px-3 py-2 text-xs font-bold text-red-650 hover:bg-red-50 cursor-pointer flex items-center gap-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

