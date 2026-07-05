"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ContactMessage {
  id: string; name: string; email: string; phone: string;
  subject: string; message: string; date: string;
}

const defaultMessages: ContactMessage[] = [
  { id: "MSG-10291", name: "Karim Hossain", email: "karim@example.com", phone: "01812345678", subject: "Peering Request", message: "Interested in peering with your AS150164 network for our SOHO setup.", date: "7/3/2026, 9:00 AM" },
];

export default function ContactMessagesPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) { router.replace("/admin"); return; }
    setAuth(true);
    const saved = localStorage.getItem("m_amin_contact_messages");
    if (saved) setMessages(JSON.parse(saved));
    else { localStorage.setItem("m_amin_contact_messages", JSON.stringify(defaultMessages)); setMessages(defaultMessages); }
  }, [router]);

  const deleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated); localStorage.setItem("m_amin_contact_messages", JSON.stringify(updated));
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Web Contact Form Inquiries</h2>
        <p className="text-xs text-slate-500 mt-1">Review contact/peering messages submitted by site users.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">Sender Details</th>
              <th className="pb-3">Subject</th>
              <th className="pb-3">Message Body</th>
              <th className="pb-3">Timestamp</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {messages.length === 0 ? (
              <tr><td colSpan={5} className="py-8 text-center text-slate-400">No contact messages received.</td></tr>
            ) : (
              messages.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5"><span className="font-extrabold text-slate-800 block">{m.name}</span><span className="text-[10px] text-slate-500 font-mono">{m.email} | {m.phone}</span></td>
                  <td className="py-3.5 font-semibold text-brand-blue">{m.subject}</td>
                  <td className="py-3.5 max-w-xs truncate text-slate-600">{m.message}</td>
                  <td className="py-3.5 text-slate-500">{m.date}</td>
                  <td className="py-3.5 text-right">
                    <button onClick={() => deleteMessage(m.id)} className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-600 rounded-lg font-bold text-[10px] cursor-pointer">Delete Message</button>
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
