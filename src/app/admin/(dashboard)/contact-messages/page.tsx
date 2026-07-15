"use client";

import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
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
import { MoreVertical, Trash2, Check, Reply, Mail, MessageSquare, Send, X } from "lucide-react";

interface ContactComment {
  text: string;
  author: string;
  timestamp: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status?: "Unread" | "Read" | "Replied";
  comments?: ContactComment[];
}

type ContactMessageStatus = NonNullable<ContactMessage["status"]>;

const defaultMessages: ContactMessage[] = [
  { id: "MSG-10291", name: "Karim Hossain", email: "karim@example.com", phone: "01812345678", subject: "Peering Request", message: "Interested in peering with your AS150164 network for our SOHO setup.", date: "7/3/2026, 9:00 AM", status: "Unread" },
];

export default function ContactMessagesPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const { canEdit, username } = useAdminSecurity();
  const allowEdit = canEdit("/admin/contact-messages");

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) { router.replace("/admin"); return; }
    setAuth(true);
    getSetting("contact_messages").then(saved => {
      if (saved && Array.isArray(saved) && saved.length > 0) {
        setMessages(saved as ContactMessage[]);
      } else {
        setSetting("contact_messages", defaultMessages as unknown as Record<string, unknown>[]);
        setMessages(defaultMessages);
      }
    });
  }, [router]);

  const updateStatus = (id: string, status: ContactMessageStatus) => {
    if (!allowEdit) {
      toast.error("You do not have permission to update message status.");
      return;
    }

    const updated = messages.map(m => m.id === id ? { ...m, status } : m);
    setMessages(updated);
    setSetting("contact_messages", updated as unknown as Record<string, unknown>[]);
    toast.success(`Message status updated to ${status}.`);
  };

  const deleteMessage = async (id: string) => {
    const confirmed = window.customConfirm
      ? await window.customConfirm("Are you sure you want to permanently delete this contact query message?")
      : confirm("Delete this message?");

    if (!confirmed) return;

    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    setSetting("contact_messages", updated as unknown as Record<string, unknown>[]);
    toast.success("Contact message deleted successfully.");
  };

  const openCommentModal = (id: string) => {
    setActiveMessageId(id);
    setCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setCommentModalOpen(false);
    setActiveMessageId(null);
    setNewComment("");
  };

  const addComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allowEdit) {
      toast.error("You do not have permission to add comments.");
      return;
    }
    if (!activeMessageId || !newComment.trim()) return;

    const updated = messages.map((message) => {
      if (message.id !== activeMessageId) return message;
      const comments = message.comments || [];
      return {
        ...message,
        comments: [
          ...comments,
          {
            text: newComment.trim(),
            author: username || "Admin",
            timestamp: new Date().toLocaleString([], {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit"
            })
          }
        ]
      };
    });

    setMessages(updated);
    setSetting("contact_messages", updated as unknown as Record<string, unknown>[]);
    setNewComment("");
    toast.success("Comment added successfully.");
  };

  if (!auth) return null;

  const activeMessage = activeMessageId ? messages.find((message) => message.id === activeMessageId) : null;

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
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Comment</TableHead>
              <TableHead className="py-4 pr-4 text-xs font-bold text-slate-500 text-right uppercase tracking-wider">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="py-12 text-center text-slate-400">
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
                    {allowEdit ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border leading-none transition-colors hover:opacity-80 cursor-pointer outline-none ${
                            m.status === "Replied" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                            m.status === "Read" ? "bg-blue-50 text-blue-700 border-blue-100" :
                            "bg-amber-50 text-amber-700 border-amber-100 animate-pulse"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              m.status === "Replied" ? "bg-emerald-500" :
                              m.status === "Read" ? "bg-blue-500" : "bg-amber-500 animate-pulse"
                            }`} />
                            <span>{m.status || "Unread"}</span>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-36 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50">
                          <DropdownMenuItem
                            onClick={() => updateStatus(m.id, "Unread")}
                            className="px-3 py-2 text-xs font-bold text-amber-700 hover:bg-amber-50 cursor-pointer flex items-center gap-2"
                          >
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            <span>Unread</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateStatus(m.id, "Read")}
                            className="px-3 py-2 text-xs font-bold text-blue-650 hover:bg-blue-50 cursor-pointer flex items-center gap-2"
                          >
                            <Check className="w-3.5 h-3.5 text-blue-500" />
                            <span>Read</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateStatus(m.id, "Replied")}
                            className="px-3 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 cursor-pointer flex items-center gap-2"
                          >
                            <Reply className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Replied</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
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
                    )}
                  </TableCell>
                  <TableCell className="py-3.5">
                    <button
                      onClick={() => openCommentModal(m.id)}
                      className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-50/50 hover:bg-blue-50 rounded-lg text-xs text-brand-blue font-bold transition-colors border border-transparent hover:border-blue-100 cursor-pointer outline-none"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{m.comments?.length || 0}</span>
                    </button>
                  </TableCell>
                  <TableCell className="py-3.5 pr-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="inline-flex items-center justify-center p-1.5 hover:bg-slate-100/75 active:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer outline-none">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50">
                        {allowEdit && (!m.status || m.status === "Unread") && (
                          <DropdownMenuItem
                            onClick={() => updateStatus(m.id, "Read")}
                            className="px-3 py-2 text-xs font-bold text-blue-650 hover:bg-blue-50 cursor-pointer flex items-center gap-2"
                          >
                            <Check className="w-3.5 h-3.5 text-blue-500" />
                            <span>Mark Read</span>
                          </DropdownMenuItem>
                        )}
                        {allowEdit && m.status !== "Replied" && (
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

      {commentModalOpen && activeMessage && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh] border border-slate-200">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                <MessageSquare className="w-4 h-4 text-brand-blue" />
                Contact Message Comments
              </h3>
              <button
                onClick={closeCommentModal}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-200/50 cursor-pointer outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto bg-white space-y-4">
              {activeMessage.comments?.length ? (
                activeMessage.comments.map((comment, index) => (
                  <div key={`${comment.timestamp}-${index}`} className="bg-slate-50/80 border border-slate-100 rounded-xl p-3.5 text-sm shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2 text-xs gap-3">
                      <span className="font-bold text-slate-800">{comment.author}</span>
                      <span className="text-slate-400 font-mono text-[10px] whitespace-nowrap">{comment.timestamp}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-xs">{comment.text}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 flex flex-col items-center justify-center gap-2">
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <p className="text-slate-400 text-xs font-medium">No comments yet.</p>
                </div>
              )}
            </div>

            {allowEdit ? (
              <form onSubmit={addComment} className="p-4 border-t border-slate-100 bg-white flex gap-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="bg-linear-to-r from-brand-blue to-brand-cyan text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="p-4 border-t border-slate-100 bg-white text-xs font-semibold text-slate-400">
                You do not have permission to add comments.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
