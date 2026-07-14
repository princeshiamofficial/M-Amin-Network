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
import { MoreVertical, Trash2, UserCheck, CheckCircle } from "lucide-react";

interface Ticket {
  id: string; clientId: string; name: string; phone: string;
  category: string; desc: string; date: string;
  status: "Open" | "Assigned" | "Resolved";
}

const defaultTickets: Ticket[] = [
  { id: "TCK-19482-9902", clientId: "SUB-88293", name: "Mehan Ahmed", phone: "01707009267", category: "Hardware", desc: "ONU device power indicator is red, no optical signal received.", date: "7/2/2026, 3:12 PM", status: "Open" },
  { id: "TCK-88392-1209", clientId: "SUB-19402", name: "Sheikh Nabil", phone: "01928492049", category: "Speed Issue", desc: "Getting only 10 Mbps on 30 Mbps Gamer Pack subscription.", date: "7/2/2026, 5:20 PM", status: "Assigned" },
];

export default function TicketsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [statusFilter, setStatusFilter] = useState<"All" | "Open" | "Assigned" | "Resolved">("All");

  const filteredTickets = tickets.filter(t => statusFilter === "All" || t.status === statusFilter);

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) { router.replace("/admin"); return; }
    setAuth(true);
    getSetting("tickets").then(saved => {
      if (saved) { setTickets(saved as any); }
      else { setSetting("tickets", defaultTickets as any); setTickets(defaultTickets); }
    });
  }, [router]);

  const updateStatus = (id: string, status: "Assigned" | "Resolved") => {
    const updated = tickets.map(t => t.id === id ? { ...t, status } : t);
    setTickets(updated); setSetting("tickets", updated as any);
  };
  const deleteTicket = async (id: string) => {
    if (!confirm("Delete this ticket?")) return;
    const updated = tickets.filter(t => t.id !== id);
    setTickets(updated); setSetting("tickets", updated as any);
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      {/* Status Filter Tabs */}
      <div className="flex border-b border-slate-100 pb-px gap-6 overflow-x-auto select-none mb-2">
        {([
          { id: "All", label: "All Tickets" },
          { id: "Open", label: "Open" },
          { id: "Assigned", label: "Assigned" },
          { id: "Resolved", label: "Resolved" }
        ] as const).map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
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
                {tab.id === "All" ? tickets.length : tickets.filter(t => t.status === tab.id).length}
              </span>
            </button>
          );
        })}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">Client ID</th>
              <th className="pb-3">Name</th>
              <th className="pb-3">Phone</th>
              <th className="pb-3">Topic</th>
              <th className="pb-3">Details</th>
              <th className="pb-3">Date-Time</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTickets.length === 0 ? (
              <tr><td colSpan={8} className="py-8 text-center text-slate-400">No tickets found.</td></tr>
            ) : (
              filteredTickets.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 font-semibold text-slate-700 font-mono">{t.clientId || "N/A"}</td>
                  <td className="py-3.5 font-extrabold text-slate-800">{t.name}</td>
                  <td className="py-3.5 font-mono text-slate-600 text-xs">{t.phone}</td>
                  <td className="py-3.5 font-semibold text-brand-blue">{t.category}</td>
                  <td className="py-3.5 max-w-xs truncate text-slate-600" title={t.desc}>{t.desc}</td>
                  <td className="py-3.5 text-slate-500 font-mono text-[11px] whitespace-nowrap">{t.date}</td>
                  <td className="py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${t.status === "Resolved" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : t.status === "Assigned" ? "bg-blue-500/10 text-blue-600 border border-blue-500/20" : "bg-amber-400/10 text-amber-600 border border-amber-400/20"}`}>
                      {t.status}
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
                        {t.status === "Open" && (
                          <DropdownMenuItem
                            onClick={() => updateStatus(t.id, "Assigned")}
                            className="px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 cursor-pointer flex items-center gap-2"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>Assign Team</span>
                          </DropdownMenuItem>
                        )}
                        {t.status !== "Resolved" && (
                          <DropdownMenuItem
                            onClick={() => updateStatus(t.id, "Resolved")}
                            className="px-3 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 cursor-pointer flex items-center gap-2"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Resolve</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => deleteTicket(t.id)}
                          className="px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 cursor-pointer flex items-center gap-2"
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

