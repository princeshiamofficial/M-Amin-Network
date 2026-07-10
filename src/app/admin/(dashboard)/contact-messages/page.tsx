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
import { MoreVertical, Trash2, Check, Reply } from "lucide-react";

interface ContactMessage {
  id: string; name: string; email: string; phone: string;
  subject: string; message: string; date: string;
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
      if (saved) { setMessages(saved as any); }
      else { setSetting("contact_messages", defaultMessages as any); setMessages(defaultMessages); }
    });
  }, [router]);

  const updateStatus = (id: string, status: "Read" | "Replied") => {
    const updated = messages.map(m => m.id === id ? { ...m, status } : m);
    setMessages(updated);
    setSetting("contact_messages", updated as any);
  };

  const deleteMessage = async (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    setSetting("contact_messages", updated as any);
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">Time</th>
              <th className="pb-3">Name</th>
              <th className="pb-3">Phone</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Subject</th>
              <th className="pb-3">Message</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {messages.length === 0 ? (
              <tr><td colSpan={8} className="py-8 text-center text-slate-400">No contact messages received.</td></tr>
            ) : (
              messages.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 text-slate-500 font-mono text-[11px] whitespace-nowrap">{m.date}</td>
                  <td className="py-3.5 font-extrabold text-slate-800">{m.name}</td>
                  <td className="py-3.5 font-mono text-slate-600 text-xs">{m.phone}</td>
                  <td className="py-3.5 text-slate-600 font-mono text-xs">{m.email}</td>
                  <td className="py-3.5 font-semibold text-brand-blue">{m.subject}</td>
                  <td className="py-3.5 max-w-xs truncate text-slate-600" title={m.message}>{m.message}</td>
                  <td className="py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase whitespace-nowrap ${
                      m.status === "Replied" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" :
                      m.status === "Read" ? "bg-blue-500/10 text-blue-600 border border-blue-500/20" :
                      "bg-amber-400/10 text-amber-600 border border-amber-400/20 animate-pulse"
                    }`}>
                      {m.status || "Unread"}
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
                        {(!m.status || m.status === "Unread") && (
                          <DropdownMenuItem
                            onClick={() => updateStatus(m.id, "Read")}
                            className="px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 cursor-pointer flex items-center gap-2"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Mark Read</span>
                          </DropdownMenuItem>
                        )}
                        {m.status !== "Replied" && (
                          <DropdownMenuItem
                            onClick={() => updateStatus(m.id, "Replied")}
                            className="px-3 py-2 text-xs font-bold text-emerald-650 hover:bg-emerald-50 cursor-pointer flex items-center gap-2"
                          >
                            <Reply className="w-3.5 h-3.5" />
                            <span>Mark Replied</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => deleteMessage(m.id)}
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

