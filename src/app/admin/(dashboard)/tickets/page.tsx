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
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2, UserCheck, CheckCircle, HelpCircle, Plus, X } from "lucide-react";

interface Ticket {
  id: string;
  clientId: string;
  name: string;
  phone: string;
  category: string;
  desc: string;
  date: string;
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
  const [showAddTicket, setShowAddTicket] = useState(false);
  const [newTicket, setNewTicket] = useState({ clientId: "", name: "", phone: "", category: "Hardware", desc: "" });

  const filteredTickets = tickets.filter(t => statusFilter === "All" || t.status === statusFilter);

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) { router.replace("/admin"); return; }
    setAuth(true);
    getSetting("tickets").then(saved => {
      if (saved && Array.isArray(saved) && saved.length > 0) {
        setTickets(saved as any);
      } else {
        setSetting("tickets", defaultTickets as any);
        setTickets(defaultTickets);
      }
    });
  }, [router]);

  const updateStatus = (id: string, status: "Assigned" | "Resolved") => {
    const updated = tickets.map(t => t.id === id ? { ...t, status } : t);
    setTickets(updated);
    setSetting("tickets", updated as any);
    toast.success(`Ticket status updated to ${status}.`);
  };

  const deleteTicket = async (id: string) => {
    const confirmed = window.customConfirm
      ? await window.customConfirm("Are you sure you want to permanently delete this support ticket?")
      : confirm("Delete this ticket?");

    if (!confirmed) return;

    const updated = tickets.filter(t => t.id !== id);
    setTickets(updated);
    setSetting("tickets", updated as any);
    toast.success("Support ticket deleted successfully.");
  };

  const handleAddTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.name || !newTicket.phone || !newTicket.desc) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const ticket: Ticket = {
      id: `TCK-${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      clientId: newTicket.clientId || "N/A",
      name: newTicket.name,
      phone: newTicket.phone,
      category: newTicket.category,
      desc: newTicket.desc,
      date: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }),
      status: "Open"
    };

    const updated = [ticket, ...tickets];
    setTickets(updated);
    setSetting("tickets", updated as any);
    setShowAddTicket(false);
    setNewTicket({ clientId: "", name: "", phone: "", category: "Hardware", desc: "" });
    toast.success("Ticket added successfully.");
  };

  if (!auth) return null;

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-slate-100 pb-px gap-4 select-none">
        <div className="flex gap-6 overflow-x-auto select-none">
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
        <button
          onClick={() => setShowAddTicket(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all mb-3 sm:mb-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Ticket</span>
        </button>
      </div>

      <div className="overflow-x-auto border border-slate-200/60 rounded-xl bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/75 border-b border-slate-200/60">
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-4 pl-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client ID</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Topic</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Details</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date-Time</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</TableHead>
              <TableHead className="py-4 pr-4 text-xs font-bold text-slate-500 text-right uppercase tracking-wider">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <HelpCircle className="w-8 h-8 text-slate-300" />
                    <span className="text-xs font-semibold">No tickets found.</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredTickets.map((t) => (
                <TableRow key={t.id} className="hover:bg-slate-50/40 transition-colors border-b border-slate-100 last:border-0 text-slate-800">
                  <TableCell className="py-3.5 pl-4 font-semibold text-indigo-600 font-mono text-[11px]">{t.clientId || "N/A"}</TableCell>
                  <TableCell className="py-3.5 font-extrabold text-slate-900">{t.name}</TableCell>
                  <TableCell className="py-3.5 font-bold font-mono text-slate-650 text-[11px]">{t.phone}</TableCell>
                  <TableCell className="py-3.5 font-bold text-indigo-650 text-xs">
                    <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md">
                      {t.category}
                    </span>
                  </TableCell>
                  <TableCell className="py-3.5 max-w-xs truncate text-slate-600 text-xs" title={t.desc}>{t.desc}</TableCell>
                  <TableCell className="py-3.5 text-slate-500 font-mono text-[11px] whitespace-nowrap">{t.date}</TableCell>
                  <TableCell className="py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border leading-none ${
                      t.status === "Resolved" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                      t.status === "Assigned" ? "bg-blue-50 text-blue-700 border-blue-100" :
                      "bg-amber-50 text-amber-700 border-amber-100 animate-pulse"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        t.status === "Resolved" ? "bg-emerald-500" :
                        t.status === "Assigned" ? "bg-blue-500" : "bg-amber-500 animate-pulse"
                      }`} />
                      <span>{t.status}</span>
                    </span>
                  </TableCell>
                  <TableCell className="py-3.5 pr-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="inline-flex items-center justify-center p-1.5 hover:bg-slate-100/75 active:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer outline-none">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50">
                        {t.status === "Open" && (
                          <DropdownMenuItem
                            onClick={() => updateStatus(t.id, "Assigned")}
                            className="px-3 py-2 text-xs font-bold text-blue-650 hover:bg-blue-50 cursor-pointer flex items-center gap-2"
                          >
                            <UserCheck className="w-3.5 h-3.5 text-blue-500" />
                            <span>Assign Team</span>
                          </DropdownMenuItem>
                        )}
                        {t.status !== "Resolved" && (
                          <DropdownMenuItem
                            onClick={() => updateStatus(t.id, "Resolved")}
                            className="px-3 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 cursor-pointer flex items-center gap-2"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Resolve</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => deleteTicket(t.id)}
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

      {/* Add Ticket Modal */}
      {showAddTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">Add New Ticket</h2>
              <button 
                onClick={() => setShowAddTicket(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddTicket} className="p-5 overflow-y-auto space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Client ID (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. SUB-12345"
                  value={newTicket.clientId}
                  onChange={e => setNewTicket({...newTicket, clientId: e.target.value})}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Client Name"
                  value={newTicket.name}
                  onChange={e => setNewTicket({...newTicket, name: e.target.value})}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Phone <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Phone Number"
                  value={newTicket.phone}
                  onChange={e => setNewTicket({...newTicket, phone: e.target.value})}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Topic / Category</label>
                <select
                  value={newTicket.category}
                  onChange={e => setNewTicket({...newTicket, category: e.target.value})}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white"
                >
                  <option value="Hardware">Hardware</option>
                  <option value="Speed Issue">Speed Issue</option>
                  <option value="Billing">Billing</option>
                  <option value="Connection Drop">Connection Drop</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Details <span className="text-red-500">*</span></label>
                <textarea
                  required
                  placeholder="Describe the issue..."
                  value={newTicket.desc}
                  onChange={e => setNewTicket({...newTicket, desc: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddTicket(false)}
                  className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
