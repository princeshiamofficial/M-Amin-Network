"use client";

import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import { confirmAction } from "@/lib/confirmHelper";
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
import { MoreVertical, Trash2, Search, CheckCircle, AlertOctagon } from "lucide-react";

interface Complaint {
  id: string;
  clientId: string;
  name: string;
  phone: string;
  category: string;
  desc: string;
  date: string;
  status: "Pending" | "Investigating" | "Resolved";
}

type ComplaintStatus = Complaint["status"];

const defaultComplaints: Complaint[] = [
  { id: "CMP-88239-1102", clientId: "SUB-88293", name: "Mehan Ahmed", phone: "01707009267", category: "Billing Dispute", desc: "Charged double for the standard premium plan subscription this month without notice.", date: "7/2/2026, 1:44 PM", status: "Pending" },
  { id: "CMP-38492-9903", clientId: "SUB-19402", name: "Sheikh Nabil", phone: "01928492049", category: "Frequent Disconnections", desc: "Fiber optic connection drops out every 10 minutes in Kadomtoli area.", date: "7/2/2026, 4:50 PM", status: "Investigating" },
];

export default function ComplaintsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const { canEdit } = useAdminSecurity();
  const allowEdit = canEdit("/admin/complaints");

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) { router.replace("/admin"); return; }
    setAuth(true);
    getSetting("complaints").then(saved => {
      if (saved && Array.isArray(saved) && saved.length > 0) {
        setComplaints(saved as Complaint[]);
      } else {
        setSetting("complaints", defaultComplaints as Complaint[]);
        setComplaints(defaultComplaints);
      }
    });
  }, [router]);

  const updateStatus = (id: string, status: ComplaintStatus) => {
    if (!allowEdit) {
      toast.error("You do not have permission to update complaint status.");
      return;
    }

    const updated = complaints.map(c => c.id === id ? { ...c, status } : c);
    setComplaints(updated);
    setSetting("complaints", updated as Complaint[]);
    toast.success(`Complaint status updated to ${status}.`);
  };

  const deleteComplaint = async (id: string) => {
    const confirmed = await confirmAction("Delete this complaint?");
    if (!confirmed) return;

    const updated = complaints.filter(c => c.id !== id);
    setComplaints(updated);
    setSetting("complaints", updated as Complaint[]);
    toast.success("Complaint record deleted successfully.");
  };

  if (!auth) return null;

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto border border-slate-200/60 rounded-xl bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/75 border-b border-slate-200/60">
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-4 pl-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Complainant</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Description Details</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date Filed</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</TableHead>
              <TableHead className="py-4 pr-4 text-xs font-bold text-slate-500 text-right uppercase tracking-wider">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {complaints.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <AlertOctagon className="w-8 h-8 text-slate-300" />
                    <span className="text-xs font-semibold">No active complaints found.</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              complaints.map((c) => (
                <TableRow key={c.id} className="hover:bg-slate-50/40 transition-colors border-b border-slate-100 last:border-0 text-slate-800">
                  <TableCell className="py-3.5 pl-4">
                    <span className="font-extrabold text-slate-900 block leading-tight">{c.name || "N/A"}</span>
                    <span className="text-[10px] text-brand-blue font-bold font-mono block leading-tight">{c.id}</span>
                    <span className="text-[10px] text-slate-500 font-bold font-mono block leading-tight">Client: {c.clientId || "N/A"}</span>
                  </TableCell>
                  <TableCell className="py-3.5 font-bold font-mono text-slate-650 text-[11px]">{c.phone || "N/A"}</TableCell>
                  <TableCell className="py-3.5 font-bold text-indigo-650 text-xs">
                    <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md">
                      {c.category || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell className="py-3.5 max-w-xs truncate text-slate-650 text-xs" title={c.desc}>{c.desc || "N/A"}</TableCell>
                  <TableCell className="py-3.5 text-slate-500 font-mono text-[11px] whitespace-nowrap">{c.date || "N/A"}</TableCell>
                  <TableCell className="py-3.5">
                    {allowEdit ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border leading-none transition-colors hover:opacity-80 cursor-pointer outline-none ${
                            c.status === "Resolved" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                            c.status === "Investigating" ? "bg-blue-50 text-blue-700 border-blue-100" :
                            "bg-amber-50 text-amber-700 border-amber-100 animate-pulse"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              c.status === "Resolved" ? "bg-emerald-500" :
                              c.status === "Investigating" ? "bg-blue-500" : "bg-amber-500 animate-pulse"
                            }`} />
                            <span>{c.status}</span>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-36 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50">
                          <DropdownMenuItem
                            onClick={() => updateStatus(c.id, "Pending")}
                            className="px-3 py-2 text-xs font-bold text-amber-700 hover:bg-amber-50 cursor-pointer flex items-center gap-2"
                          >
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            <span>Pending</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateStatus(c.id, "Investigating")}
                            className="px-3 py-2 text-xs font-bold text-blue-650 hover:bg-blue-50 cursor-pointer flex items-center gap-2"
                          >
                            <Search className="w-3.5 h-3.5 text-blue-500" />
                            <span>Investigating</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateStatus(c.id, "Resolved")}
                            className="px-3 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 cursor-pointer flex items-center gap-2"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Resolved</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border leading-none ${
                        c.status === "Resolved" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                        c.status === "Investigating" ? "bg-blue-50 text-blue-700 border-blue-100" :
                        "bg-amber-50 text-amber-700 border-amber-100 animate-pulse"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          c.status === "Resolved" ? "bg-emerald-500" :
                          c.status === "Investigating" ? "bg-blue-500" : "bg-amber-500 animate-pulse"
                        }`} />
                        <span>{c.status}</span>
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="py-3.5 pr-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="inline-flex items-center justify-center p-1.5 hover:bg-slate-100/75 active:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer outline-none">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50">
                        {allowEdit && c.status === "Pending" && (
                          <DropdownMenuItem
                            onClick={() => updateStatus(c.id, "Investigating")}
                            className="px-3 py-2 text-xs font-bold text-blue-650 hover:bg-blue-50 cursor-pointer flex items-center gap-2"
                          >
                            <Search className="w-3.5 h-3.5 text-blue-500" />
                            <span>Investigate</span>
                          </DropdownMenuItem>
                        )}
                        {allowEdit && c.status !== "Resolved" && (
                          <DropdownMenuItem
                            onClick={() => updateStatus(c.id, "Resolved")}
                            className="px-3 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 cursor-pointer flex items-center gap-2"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Resolve</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => deleteComplaint(c.id)}
                          className="px-3 py-2 text-xs font-bold text-red-650 hover:bg-red-50 cursor-pointer flex items-center gap-2"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
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
