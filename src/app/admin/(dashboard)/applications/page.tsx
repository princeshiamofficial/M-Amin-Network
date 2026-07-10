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
  Search,
  Check,
  X,
  Trash2,
  MoreVertical
} from "lucide-react";

interface Claim {
  id: string;
  name: string;
  phone: string;
  address: string;
  promoCode: string;
  promoTitle: string;
  date: string;
  status: "Pending" | "Approved" | "Cancelled";
}

const defaultClaims: Claim[] = [
  {
    id: "CLM-72648-2849",
    name: "Mehan Ahmed",
    phone: "01707009267",
    address: "House 12, Road 4, Kadomtoli, South Keraniganj",
    promoCode: "ANNUAL10",
    promoTitle: "Pay 10 Months, Get 12",
    date: "7/2/2026, 11:34 AM",
    status: "Pending"
  },
  {
    id: "CLM-19472-8829",
    name: "Nasrin Sultana",
    phone: "01819284920",
    address: "Block C, Bashundhara R/A, South Keraniganj",
    promoCode: "FREEINSTALL2026",
    promoTitle: "Zero Installation Fee",
    date: "7/2/2026, 2:15 PM",
    status: "Approved"
  },
];

export default function ApplicationsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [claims, setClaims] = useState<Claim[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "Pending" | "Approved" | "Cancelled">("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("m_amin_admin_token");
        if (!token) {
          router.replace("/admin");
        } else {
          setIsAuthenticated(true);
          getSetting("m_amin_claims").then(saved => {
      if (saved) setClaims(saved as any);
      else setClaims(defaultClaims);
    });
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [router]);

  const updateStatus = (id: string, status: "Approved" | "Cancelled") => {
    const updated = claims.map(c => c.id === id ? { ...c, status } : c);
    setClaims(updated);
    setSetting("m_amin_claims", updated as any);
  };

  const deleteClaim = async (id: string) => {
    if (!confirm("Delete this application reservation?")) return;
    const updated = claims.filter(c => c.id !== id);
    setClaims(updated);
    setSetting("m_amin_claims", updated as any);
  };

  if (!mounted || !isAuthenticated) return null;

  const filteredClaims = claims.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === "all" || c.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-6 text-slate-800">
      
      {/* Controls Row */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <div className="flex-1 flex gap-3 max-w-xl">
          {/* Search bar */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue placeholder-slate-400 transition-all"
            />
          </div>
          {/* Filter select */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as "all" | "Pending" | "Approved" | "Cancelled")}
            className="bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-brand-blue cursor-pointer"
          >
            <option value="all">All Applications</option>
            <option value="Pending">Pending Verification</option>
            <option value="Approved">Approved / Active</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table grid */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SL</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Promo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClaims.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-slate-400">No applications found.</TableCell>
              </TableRow>
            ) : (
              filteredClaims.map((c, idx) => (
                <TableRow key={c.id}>
                  <TableCell className="font-semibold text-slate-500 font-mono">{idx + 1}</TableCell>
                  <TableCell className="font-extrabold text-slate-800">{c.name}</TableCell>
                  <TableCell className="font-mono text-slate-650">{c.phone}</TableCell>
                  <TableCell className="text-slate-600 text-xs max-w-xs">{c.address}</TableCell>
                  <TableCell className="font-semibold text-slate-600">{c.promoTitle || "General Link Booking"}</TableCell>
                  <TableCell>
                    {c.promoCode ? (
                      <span className="bg-blue-50/70 text-brand-blue border border-blue-100/50 rounded-lg px-2 py-0.5 font-bold text-[10px] inline-block">
                        {c.promoCode}
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      c.status === "Approved" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                      c.status === "Cancelled" ? "bg-slate-50 text-slate-500 border-slate-100" :
                      "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        c.status === "Approved" ? "bg-emerald-500" :
                        c.status === "Cancelled" ? "bg-slate-400" :
                        "bg-amber-500"
                      }`} />
                      {c.status === "Pending" ? "Verifying Address" : c.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="inline-flex items-center justify-center p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700 transition-colors cursor-pointer outline-none">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32 bg-white border border-slate-200 rounded-xl shadow-xl py-1">
                        {c.status === "Pending" && (
                          <>
                            <DropdownMenuItem
                              onClick={() => updateStatus(c.id, "Approved")}
                              className="px-3 py-2 text-xs font-bold text-emerald-600 hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Approve</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => updateStatus(c.id, "Cancelled")}
                              className="px-3 py-2 text-xs font-bold text-slate-650 hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Cancel</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-100 my-1 h-px" />
                          </>
                        )}
                        <DropdownMenuItem
                          onClick={() => deleteClaim(c.id)}
                          className="px-3 py-2 text-xs font-bold text-red-650 hover:bg-red-50 cursor-pointer flex items-center gap-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
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
  );
}
