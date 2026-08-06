"use client";

import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import { useAdminSecurity } from "@/hooks/useAdminSecurity";
import { DatePicker } from "@/components/ui/DatePicker";
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
import { MoreVertical, Trash2, Receipt, PlusCircle, X } from "lucide-react";

interface Payment {
  id: string;
  clientId: string;
  name: string;
  phone: string;
  planName: string;
  speed: string;
  amount: number;
  gateway: string;
  method?: string;
  date: string;
  status?: string;
  dueDate?: string;
  paidDate?: string;
}

const defaultPayments: Payment[] = [
  { id: "TXN-88291", clientId: "SUB-88293", name: "Mehan Ahmed", phone: "01707009267", planName: "Home Premium", speed: "50 Mbps", amount: 1200, gateway: "bKash", date: "7/1/2026, 10:15 AM", dueDate: "05 July 2026", paidDate: "7/1/2026, 10:15 AM" },
  { id: "TXN-19401", clientId: "SUB-19402", name: "Sheikh Nabil", phone: "01928492049", planName: "Gamer Pack", speed: "30 Mbps", amount: 900, gateway: "Nagad", date: "7/1/2026, 2:30 PM", dueDate: "05 July 2026", paidDate: "7/1/2026, 2:30 PM" },
];

export default function BillsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);

  const { canAdd, canDelete } = useAdminSecurity();
  const allowAdd = canAdd("/admin/bills");
  const allowDelete = canDelete("/admin/bills");

  const [subscribers, setSubscribers] = useState<Record<string, unknown>[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBillDate, setSelectedBillDate] = useState<Date | undefined>(new Date());
  const [selectedSubscriberId, setSelectedSubscriberId] = useState("");
  const [formData, setFormData] = useState({
    clientId: "",
    name: "",
    phone: "",
    planName: "",
    speed: "",
    amount: 1000,
    gateway: "bKash",
    status: "Success",
    date: "",
  });

  useEffect(() => {
    getSetting("subscribers").then(saved => {
      if (saved && Array.isArray(saved)) {
        setSubscribers(saved as Record<string, unknown>[]);
      }
    });
  }, []);

  const handleSelectSubscriber = (subId: string) => {
    setSelectedSubscriberId(subId);
    if (subId === "custom") {
      setFormData(prev => ({
        ...prev,
        clientId: `SUB-${Math.floor(10000 + Math.random() * 90000)}`,
        name: "",
        phone: "",
        planName: "",
        speed: "",
        amount: 1000
      }));
      return;
    }
    const match = subscribers.find(s => s.id === subId);
    if (match) {
      let plan = (match.planName as string) || "";
      let speed = "50 Mbps";
      if (plan.includes("Mbps")) {
        const parts = plan.split(" ");
        speed = parts.slice(0, 2).join(" ");
        plan = parts.slice(2).join(" ");
      }
      setFormData(prev => ({
        ...prev,
        clientId: (match.id as string) || "",
        name: (match.name as string) || "",
        phone: (match.phone as string) || "",
        planName: plan || (match.planName as string) || "",
        speed: speed,
        amount: plan.toLowerCase().includes("corporate") ? 5000 : 
                plan.toLowerCase().includes("100 mbps") ? 2500 :
                plan.toLowerCase().includes("50 mbps") ? 1200 :
                plan.toLowerCase().includes("30 mbps") ? 900 :
                plan.toLowerCase().includes("20 mbps") ? 700 : 500
      }));
    }
  };

  const handleSaveBill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Please fill in the client name and phone number.");
      return;
    }

    const finalDateStr = selectedBillDate ? selectedBillDate.toLocaleString() : new Date().toLocaleString();
    const finalDueDateStr = selectedBillDate 
      ? "05 " + selectedBillDate.toLocaleString('en-US', { month: 'long', year: 'numeric' }) 
      : "05 " + new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });

    const newBill: Payment = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      clientId: formData.clientId || `SUB-${Math.floor(10000 + Math.random() * 90000)}`,
      name: formData.name,
      phone: formData.phone,
      planName: formData.planName,
      speed: formData.speed || "50 Mbps",
      amount: Number(formData.amount),
      gateway: formData.gateway,
      date: finalDateStr,
      status: formData.status,
      dueDate: finalDueDateStr,
      paidDate: formData.status === "Success" ? finalDateStr : ""
    };

    const updated = [newBill, ...payments];
    setPayments(updated);
    await setSetting("payments", updated);
    toast.success("Manual billing transaction log recorded successfully.");
    setIsModalOpen(false);
    setSelectedSubscriberId("");
  };

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) { router.replace("/admin"); return; }
    setAuth(true);
    getSetting("payments").then(saved => {
      if (saved && Array.isArray(saved) && saved.length > 0) {
        setPayments(saved as Payment[]);
      } else {
        setSetting("payments", defaultPayments as Payment[]);
        setPayments(defaultPayments);
      }
    });
  }, [router]);

  const deletePayment = async (id: string) => {
    const confirmed = window.customConfirm
      ? await window.customConfirm("Are you sure you want to delete this payment log permanently?")
      : confirm("Delete this billing log?");

    if (!confirmed) return;

    const updated = payments.filter(p => p.id !== id);
    setPayments(updated);
    setSetting("payments", updated as Payment[]);
    toast.success("Billing transaction log deleted successfully.");
  };

  if (!auth) return null;

  return (
    <div className="space-y-6">
      <div className="border border-slate-200 bg-white rounded-lg shadow-sm">
        {/* Sticky Header block inside the card */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-100 p-5 rounded-t-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-bold text-slate-900">Billing Transactions</h2>
            <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
              {allowAdd && (
                <button
                  onClick={() => {
                    setFormData({
                      clientId: `SUB-${Math.floor(10000 + Math.random() * 90000)}`,
                      name: "",
                      phone: "",
                      planName: "",
                      speed: "",
                      amount: 1000,
                      gateway: "bKash",
                      status: "Success",
                      date: new Date().toLocaleString(),
                    });
                    setSelectedSubscriberId("");
                    setSelectedBillDate(new Date());
                    setIsModalOpen(true);
                  }}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#f97316] px-4 text-xs font-extrabold text-white hover:bg-[#ea580c] transition-all cursor-pointer shadow-sm active:scale-95 animate-fade-in"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Manual Bill</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/75 border-b border-slate-200/60">
              <TableRow className="hover:bg-transparent">
                <TableHead className="py-4 pl-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client ID</TableHead>
                <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</TableHead>
                <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</TableHead>
                <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</TableHead>
                <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Method</TableHead>
                <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Due Date</TableHead>
                <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Paid Date</TableHead>
                <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">TXN ID</TableHead>
                <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</TableHead>
                <TableHead className="py-4 pr-4 text-xs font-bold text-slate-500 text-right uppercase tracking-wider">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Receipt className="w-8 h-8 text-slate-300" />
                      <span className="text-xs font-semibold">No payment transaction records found.</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                payments.map((p) => (
                  <TableRow key={p.id} className="hover:bg-slate-50/40 transition-colors border-b border-slate-100 last:border-0 text-slate-800">
                    <TableCell className="py-3.5 pl-4 font-semibold text-slate-700 font-mono text-[11px]">{p.clientId || "N/A"}</TableCell>
                    <TableCell className="py-3.5 font-extrabold text-slate-900">{p.name}</TableCell>
                    <TableCell className="py-3.5 font-bold font-mono text-slate-600 text-[11px]">{p.phone}</TableCell>
                    <TableCell className="py-3.5 font-black text-emerald-600 text-[11px]">৳{p.amount.toLocaleString()} BDT</TableCell>
                    <TableCell className="py-3.5 font-extrabold text-slate-700 uppercase text-[10px]">
                      <span className={`px-2 py-0.5 rounded border ${
                        (p.gateway || p.method || "bKash").toLowerCase() === "bkash" ? "bg-pink-50 border-pink-100 text-pink-700" :
                        (p.gateway || p.method || "bKash").toLowerCase() === "nagad" ? "bg-orange-50 border-orange-100 text-orange-700" :
                        "bg-slate-50 border-slate-100 text-slate-700"
                      }`}>
                        {p.gateway || p.method || "bKash"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5 text-slate-600 font-mono text-xs whitespace-nowrap">
                      {p.dueDate || (() => {
                        try {
                          const parts = p.date.split("/");
                          const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                          const mIndex = parseInt(parts[0], 10) - 1;
                          const year = parts[2].split(",")[0].trim();
                          return `05 ${monthNames[mIndex]} ${year}`;
                        } catch {
                          return "05 July 2026";
                        }
                      })()}
                    </TableCell>
                    <TableCell className="py-3.5 text-slate-500 font-mono text-[11px] whitespace-nowrap">{p.paidDate || p.date}</TableCell>
                    <TableCell className="py-3.5 font-bold font-mono text-brand-blue text-[11px]">{p.id}</TableCell>
                    <TableCell className="py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase ${
                        (p.status || "Success").toLowerCase() === "success" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                          : (p.status || "").toLowerCase() === "failed"
                          ? "bg-red-50 text-red-700 border-red-100"
                          : "bg-amber-50 text-amber-700 border-amber-100"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          (p.status || "Success").toLowerCase() === "success" 
                            ? "bg-emerald-500" 
                            : (p.status || "").toLowerCase() === "failed"
                            ? "bg-red-500"
                            : "bg-amber-500"
                        }`} />
                        <span>{p.status || "Success"}</span>
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5 pr-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button 
                            disabled={!allowDelete}
                            className="inline-flex items-center justify-center p-1.5 hover:bg-slate-100/75 active:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer outline-none"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32 bg-white border border-slate-200 rounded-xl shadow-xl py-1">
                          <DropdownMenuItem
                            onClick={() => deletePayment(p.id)}
                            className="px-3 py-2 text-xs font-bold text-red-650 hover:bg-red-50 cursor-pointer flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-550" />
                            <span>Wipe Log</span>
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

      {/* Modal Dialog Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-100 shadow-2xl rounded-3xl p-6 sm:p-7 max-w-lg w-full space-y-5 text-left relative my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 transition-colors p-1.5 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5">
              <h3 className="text-slate-900 font-extrabold text-lg uppercase tracking-wider">Record Manual Bill</h3>
              <p className="text-xs text-slate-500 font-medium">Record a manual transaction payment log for audit history.</p>
            </div>

            <form onSubmit={handleSaveBill} className="space-y-4 pt-2">
              {/* Link Subscriber Select */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Link Subscriber</label>
                <select
                  value={selectedSubscriberId}
                  onChange={(e) => handleSelectSubscriber(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-orange-500 font-medium transition-all"
                >
                  <option value="">-- Choose Existing Subscriber --</option>
                  {subscribers.map((s: Record<string, unknown>) => (
                    <option key={String(s.id)} value={String(s.id)}>
                      {String(s.name)} ({String(s.id)}) - {String(s.planName)}
                    </option>
                  ))}
                  <option value="custom">-- Custom Unlisted Client --</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Client ID</label>
                  <input
                    type="text"
                    required
                    value={formData.clientId}
                    onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-855 focus:outline-none focus:border-orange-500 font-mono transition-all"
                    placeholder="e.g. SUB-88293"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Gateway / Method</label>
                  <select
                    value={formData.gateway}
                    onChange={(e) => setFormData({ ...formData, gateway: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-orange-500 font-medium transition-all"
                  >
                    <option value="bKash">bKash</option>
                    <option value="Nagad">Nagad</option>
                    <option value="Rocket">Rocket</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Card">Card Payment</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Client Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-855 focus:outline-none focus:border-orange-500 font-semibold transition-all"
                    placeholder="e.g. Mehan Ahmed"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-855 focus:outline-none focus:border-orange-500 font-mono transition-all"
                    placeholder="e.g. 01707009267"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Plan Name / Package</label>
                  <input
                    type="text"
                    required
                    value={formData.planName}
                    onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-855 focus:outline-none focus:border-orange-500 font-medium transition-all"
                    placeholder="e.g. Gamer Pack"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Connection Speed</label>
                  <input
                    type="text"
                    required
                    value={formData.speed}
                    onChange={(e) => setFormData({ ...formData, speed: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-855 focus:outline-none focus:border-orange-500 font-medium transition-all"
                    placeholder="e.g. 30 Mbps"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Bill Amount (BDT)</label>
                  <input
                    type="number"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-855 focus:outline-none focus:border-orange-500 font-black transition-all"
                    placeholder="e.g. 1200"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Transaction Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-orange-500 font-bold transition-all"
                  >
                    <option value="Success">Success</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Date recorded</label>
                <DatePicker
                  selected={selectedBillDate}
                  onSelect={(date) => setSelectedBillDate(date)}
                  position="top"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm shadow-orange-200"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
