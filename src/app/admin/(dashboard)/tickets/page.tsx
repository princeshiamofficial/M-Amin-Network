"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) { router.replace("/admin"); return; }
    setAuth(true);
    const saved = localStorage.getItem("m_amin_tickets");
    if (saved) setTickets(JSON.parse(saved));
    else { localStorage.setItem("m_amin_tickets", JSON.stringify(defaultTickets)); setTickets(defaultTickets); }
  }, [router]);

  const updateStatus = (id: string, status: "Assigned" | "Resolved") => {
    const updated = tickets.map(t => t.id === id ? { ...t, status } : t);
    setTickets(updated); localStorage.setItem("m_amin_tickets", JSON.stringify(updated));
  };
  const deleteTicket = (id: string) => {
    if (!confirm("Delete this ticket?")) return;
    const updated = tickets.filter(t => t.id !== id);
    setTickets(updated); localStorage.setItem("m_amin_tickets", JSON.stringify(updated));
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Technical Support Tickets</h2>
        <p className="text-xs text-slate-500 mt-1">Review customer reports, assign field teams, and log resolved support tickets.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">Client details</th>
              <th className="pb-3">Topic / Category</th>
              <th className="pb-3">Description</th>
              <th className="pb-3">Register Date</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tickets.length === 0 ? (
              <tr><td colSpan={6} className="py-8 text-center text-slate-400">No tickets found.</td></tr>
            ) : (
              tickets.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5"><span className="font-extrabold text-slate-800 block">{t.name}</span><span className="text-[10px] text-slate-500 font-mono">{t.phone}</span></td>
                  <td className="py-3.5 font-semibold text-brand-blue">{t.category}</td>
                  <td className="py-3.5 max-w-xs truncate text-slate-600">{t.desc}</td>
                  <td className="py-3.5 text-slate-500">{t.date}</td>
                  <td className="py-3.5"><span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${t.status === "Resolved" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : t.status === "Assigned" ? "bg-blue-500/10 text-blue-600 border border-blue-500/20" : "bg-amber-400/10 text-amber-600 border border-amber-400/20"}`}>{t.status}</span></td>
                  <td className="py-3.5 text-right space-x-2">
                    {t.status === "Open" && <button onClick={() => updateStatus(t.id, "Assigned")} className="px-2.5 py-1 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-600 rounded-lg font-bold text-[10px] cursor-pointer">Assign Team</button>}
                    {t.status !== "Resolved" && <button onClick={() => updateStatus(t.id, "Resolved")} className="px-2.5 py-1 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-600 rounded-lg font-bold text-[10px] cursor-pointer">Resolve</button>}
                    <button onClick={() => deleteTicket(t.id)} className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-600 rounded-lg font-bold text-[10px] cursor-pointer">Delete</button>
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
