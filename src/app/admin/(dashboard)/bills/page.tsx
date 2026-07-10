"use client";
import React, { useState, useEffect } from "react";
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
import { MoreVertical, Trash2 } from "lucide-react";

interface Payment {
  id: string; clientId: string; name: string; phone: string;
  planName: string; speed: string; amount: number; gateway: string; date: string;
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

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) { router.replace("/admin"); return; }
    setAuth(true);
    const saved = localStorage.getItem("m_amin_payments");
    setPayments(saved ? JSON.parse(saved) : defaultPayments);
  }, [router]);

  const deletePayment = (id: string) => {
    const updated = payments.filter(p => p.id !== id);
    setPayments(updated);
    localStorage.setItem("m_amin_payments", JSON.stringify(updated));
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-6">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Paid Date</TableHead>
              <TableHead>TXN ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="py-8 text-center text-slate-400">No payment transaction records found.</TableCell>
              </TableRow>
            ) : (
              payments.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-semibold text-slate-700 font-mono">{p.clientId || "N/A"}</TableCell>
                  <TableCell className="font-extrabold text-slate-800">{p.name}</TableCell>
                  <TableCell className="font-mono text-slate-600 text-xs">{p.phone}</TableCell>
                  <TableCell className="font-black text-emerald-600">৳{p.amount} BDT</TableCell>
                  <TableCell className="font-extrabold text-slate-700 uppercase">{p.gateway}</TableCell>
                  <TableCell className="text-slate-600 font-mono text-xs whitespace-nowrap">
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
                  <TableCell className="text-slate-500 font-mono text-[11px] whitespace-nowrap">{p.paidDate || p.date}</TableCell>
                  <TableCell className="font-bold font-mono text-brand-blue">{p.id}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase">
                      {p.status || "Success"}
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
                        <DropdownMenuItem
                          onClick={() => deletePayment(p.id)}
                          className="px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 cursor-pointer flex items-center gap-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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
  );
}
