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
import { MoreVertical, Trash2, Search, CheckCircle } from "lucide-react";

interface Complaint {
  id: string; clientId: string; name: string; phone: string;
  category: string; desc: string; date: string;
  status: "Pending" | "Investigating" | "Resolved";
}

const defaultComplaints: Complaint[] = [
  { id: "CMP-88239-1102", clientId: "SUB-88293", name: "Mehan Ahmed", phone: "01707009267", category: "Billing Dispute", desc: "Charged double for the standard premium plan subscription this month without notice.", date: "7/2/2026, 1:44 PM", status: "Pending" },
  { id: "CMP-38492-9903", clientId: "SUB-19402", name: "Sheikh Nabil", phone: "01928492049", category: "Frequent Disconnections", desc: "Fiber optic connection drops out every 10 minutes in Kadomtoli area.", date: "7/2/2026, 4:50 PM", status: "Investigating" },
];

export default function ComplaintsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) { router.replace("/admin"); return; }
    setAuth(true);
    getSetting("m_amin_complaints").then(saved => {
      if (saved) { setComplaints(saved as Complaint[]); }
      else { setSetting("m_amin_complaints", defaultComplaints as Complaint[]); setComplaints(defaultComplaints); }
    });
  }, [router]);

  const updateStatus = (id: string, status: "Investigating" | "Resolved") => {
    const updated = complaints.map(c => c.id === id ? { ...c, status } : c);
    setComplaints(updated); setSetting("m_amin_complaints", updated as Complaint[]);
  };

  const deleteComplaint = async (id: string) => {
    if (!confirm("Delete this complaint?")) return;
    const updated = complaints.filter(c => c.id !== id);
    setComplaints(updated); setSetting("m_amin_complaints", updated as Complaint[]);
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">Complainant</th>
              <th className="pb-3">Phone</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Description Details</th>
              <th className="pb-3">Date Filed</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {complaints.length === 0 ? (
              <tr><td colSpan={7} className="py-8 text-center text-slate-500">No active complaints found.</td></tr>
            ) : (
              complaints.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5">
                    <span className="font-extrabold text-slate-800 block">{c.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{c.clientId}</span>
                  </td>
                  <td className="py-3.5 font-mono">{c.phone}</td>
                  <td className="py-3.5 font-semibold text-brand-blue">{c.category}</td>
                  <td className="py-3.5 max-w-xs truncate text-slate-600" title={c.desc}>{c.desc}</td>
                  <td className="py-3.5 text-slate-500 font-mono text-[11px] whitespace-nowrap">{c.date}</td>
                  <td className="py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase whitespace-nowrap ${
                      c.status === "Resolved" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" :
                      c.status === "Investigating" ? "bg-blue-500/10 text-blue-600 border border-blue-500/20" :
                      "bg-amber-400/10 text-amber-600 border border-amber-400/20 animate-pulse"
                    }`}>
                      {c.status}
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
                        {c.status === "Pending" && (
                          <DropdownMenuItem
                            onClick={() => updateStatus(c.id, "Investigating")}
                            className="px-3 py-2 text-xs font-bold text-blue-650 hover:bg-blue-50 cursor-pointer flex items-center gap-2"
                          >
                            <Search className="w-3.5 h-3.5" />
                            <span>Investigate</span>
                          </DropdownMenuItem>
                        )}
                        {c.status !== "Resolved" && (
                          <DropdownMenuItem
                            onClick={() => updateStatus(c.id, "Resolved")}
                            className="px-3 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 cursor-pointer flex items-center gap-2"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Resolve</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => deleteComplaint(c.id)}
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
