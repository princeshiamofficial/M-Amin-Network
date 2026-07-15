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
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Check,
  X,
  Trash2,
  MessageSquare,
  Send
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
  comments?: { text: string; author: string; timestamp: string; }[];
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

const formatClaimDate = (date: string) => {
  if (!date) return "-";

  const parsedDate = new Date(date);
  if (!Number.isNaN(parsedDate.getTime())) {
    return parsedDate.toLocaleString([], {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  }

  return date.replace(/:(\d{2})(\s?(AM|PM))$/i, "$2");
};

export default function ApplicationsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [claims, setClaims] = useState<Claim[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "Pending" | "Approved" | "Cancelled">("all");

  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [activeClaimId, setActiveClaimId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("admin_token");
        if (!token) {
          router.replace("/admin");
        } else {
          setIsAuthenticated(true);
          getSetting("claims").then(saved => {
            if (saved) setClaims(saved as Claim[]);
            else setClaims(defaultClaims);
          });
          const adminUserStr = localStorage.getItem("admin_user");
          if (adminUserStr) {
            try {
              const u = JSON.parse(adminUserStr);
              if (u.username) setAdminName(u.username);
            } catch {}
          }
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [router]);

  const updateStatus = (id: string, status: "Pending" | "Approved" | "Cancelled") => {
    const updated = claims.map(c => c.id === id ? { ...c, status } : c);
    setClaims(updated);
    setSetting("claims", updated as unknown as Record<string, unknown>[]);
  };

  const deleteClaim = async (id: string) => {
    if (!confirm("Delete this application reservation?")) return;
    const updated = claims.filter(c => c.id !== id);
    setClaims(updated);
    setSetting("claims", updated as unknown as Record<string, unknown>[]);
  };

  const openCommentModal = (id: string) => {
    setActiveClaimId(id);
    setCommentModalOpen(true);
  };

  const addComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeClaimId || !newComment.trim()) return;
    const updated = claims.map(c => {
      if (c.id === activeClaimId) {
        const comments = c.comments || [];
        return {
          ...c,
          comments: [...comments, { text: newComment.trim(), author: adminName, timestamp: new Date().toLocaleString() }]
        };
      }
      return c;
    });
    setClaims(updated);
    setSetting("claims", updated as unknown as Record<string, unknown>[]);
    setNewComment("");
  };

  const deleteComment = (claimId: string, commentIndex: number) => {
    if (!confirm("Delete this comment?")) return;
    const updated = claims.map(c => {
      if (c.id === claimId) {
        const newComments = c.comments?.filter((_, i) => i !== commentIndex);
        return { ...c, comments: newComments };
      }
      return c;
    });
    setClaims(updated);
    setSetting("claims", updated as unknown as Record<string, unknown>[]);
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
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClaims.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="py-8 text-center text-slate-400">No applications found.</TableCell>
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
                  <TableCell className="font-mono text-slate-500 whitespace-nowrap">{formatClaimDate(c.date)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-colors hover:opacity-80 cursor-pointer outline-none ${
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
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-36 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50">
                        <DropdownMenuItem
                          onClick={() => updateStatus(c.id, "Pending")}
                          className="px-3 py-2 text-xs font-bold text-amber-700 hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                        >
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          <span>Pending</span>
                        </DropdownMenuItem>
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
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => openCommentModal(c.id)}
                      className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-50/50 hover:bg-blue-50 rounded-lg text-xs text-brand-blue font-bold transition-colors border border-transparent hover:border-blue-100 cursor-pointer outline-none"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{c.comments?.length || 0}</span>
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() => deleteClaim(c.id)}
                      className="inline-flex items-center justify-center p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-colors cursor-pointer outline-none"
                      title="Delete Application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Comments Modal */}
      {commentModalOpen && activeClaimId && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh] border border-slate-200">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                <MessageSquare className="w-4 h-4 text-brand-blue" />
                Application Comments
              </h3>
              <button
                onClick={() => setCommentModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-200/50 cursor-pointer outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto bg-white space-y-4">
              {claims.find(c => c.id === activeClaimId)?.comments?.length ? (
                claims.find(c => c.id === activeClaimId)?.comments?.map((comment, i) => (
                  <div key={i} className="bg-slate-50/80 border border-slate-100 rounded-xl p-3.5 text-sm shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-2 text-xs">
                      <span className="font-bold text-slate-800">{comment.author}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400 font-mono text-[10px]">{comment.timestamp}</span>
                        <button
                          onClick={() => deleteComment(activeClaimId, i)}
                          className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all cursor-pointer outline-none"
                          title="Delete comment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-xs">{comment.text}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 flex flex-col items-center justify-center gap-2">
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <p className="text-slate-400 text-xs font-medium">No comments yet. Start the conversation!</p>
                </div>
              )}
            </div>

            <form onSubmit={addComment} className="p-4 border-t border-slate-100 bg-white flex gap-2">
              <input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20 transition-all"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="bg-linear-to-r from-brand-blue to-brand-cyan text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

