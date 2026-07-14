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
import { MoreVertical, Trash2, Check, Reply, Mail } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status?: "Unread" | "Read" | "Replied";
}

const defaultMessages: ContactMessage[] = [
  { id: "MSG-10291", name: "Karim Hossain", email: "karim@example.com", phone: "01812345678", subject: "Peering Request", message: "Interested in peering with your AS150164 network for our SOHO setup.", date: "7/3/2026, 9:00 AM", status: "Unread" },
];

export default function ContactMessagesPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) { router.replace("/admin"); return; }
    setAuth(true);
    getSetting("contact_messages").then(saved => {
      if (saved && Array.isArray(saved) && saved.length > 0) {
        setMessages(saved as any);
      } else {
        setSetting("contact_messages", defaultMessages as any);
        setMessages(defaultMessages);
      }
    });
  }, [router]);

  const updateStatus = (id: string, status: "Read" | "Replied") => {
    const updated = messages.map(m => m.id === id ? { ...m, status } : m);
    setMessages(updated);
    setSetting("contact_messages", updated as any);
    toast.success(`Message status updated to ${status}.`);
  };

  const deleteMessage = async (id: string) => {
    const confirmed = window.customConfirm
      ? await window.customConfirm("Are you sure you want to permanently delete this contact query message?")
      : confirm("Delete this message?");

    if (!confirmed) return;

    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    setSetting("contact_messages", updated as any);
    toast.success("Contact message deleted successfully.");
  };

  if (!auth) return null;

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto border border-slate-200/60 rounded-xl bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/75 border-b border-slate-200/60">
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-4 pl-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Time</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Subject</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Message</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</TableHead>
              <TableHead className="py-4 pr-4 text-xs font-bold text-slate-500 text-right uppercase tracking-wider">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Mail className="w-8 h-8 text-slate-300" />
                    <span className="text-xs font-semibold">No contact messages received.</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              messages.map((m) => (
                <TableRow key={m.id} className="hover:bg-slate-50/40 transition-colors border-b border-slate-100 last:border-0 text-slate-800">
                  <TableCell className="py-3.5 pl-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">{m.date}</TableCell>
                  <TableCell className="py-3.5 font-extrabold text-slate-900">{m.name}</TableCell>
                  <TableCell className="py-3.5 font-bold font-mono text-slate-655 text-[11px]">{m.phone}</TableCell>
                  <TableCell className="py-3.5 font-mono text-slate-500 text-[11px]">{m.email}</TableCell>
                  <TableCell className="py-3.5 font-bold text-indigo-650 text-xs">{m.subject}</TableCell>
                  <TableCell className="py-3.5 max-w-xs truncate text-slate-600 text-xs" title={m.message}>{m.message}</TableCell>
                  <TableCell className="py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border leading-none ${
                      m.status === "Replied" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                      m.status === "Read" ? "bg-blue-50 text-blue-700 border-blue-100" :
                      "bg-amber-50 text-amber-700 border-amber-100 animate-pulse"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        m.status === "Replied" ? "bg-emerald-500" :
                        m.status === "Read" ? "bg-blue-500" : "bg-amber-500 animate-pulse"
                      }`} />
                      <span>{m.status || "Unread"}</span>
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
                        {(!m.status || m.status === "Unread") && (
                          <DropdownMenuItem
                            onClick={() => updateStatus(m.id, "Read")}
                            className="px-3 py-2 text-xs font-bold text-blue-650 hover:bg-blue-50 cursor-pointer flex items-center gap-2"
                          >
                            <Check className="w-3.5 h-3.5 text-blue-500" />
                            <span>Mark Read</span>
                          </DropdownMenuItem>
                        )}
                        {m.status !== "Replied" && (
                          <DropdownMenuItem
                            onClick={() => updateStatus(m.id, "Replied")}
                            className="px-3 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 cursor-pointer flex items-center gap-2"
                          >
                            <Reply className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Mark Replied</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => deleteMessage(m.id)}
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
