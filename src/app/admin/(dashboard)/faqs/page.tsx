"use client";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import * as Lucide from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  isPublished: boolean;
}

const defaultFAQs: FAQ[] = [
  { id: "1", question: "How long does installation take?", answer: "Usually 2-4 hours after payment confirmation.", isPublished: true },
  { id: "2", question: "Is the router included?", answer: "No, you must purchase an optical router separately or bring your own.", isPublished: true },
];

function ActionMenu({ faq, onToggle, onEdit, onDelete }: { faq: FAQ, onToggle: () => void, onEdit: () => void, onDelete: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const trigRef = React.useRef<HTMLButtonElement>(null);
  const popRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const calcPos = React.useCallback(() => {
    if (!trigRef.current) return;
    const r = trigRef.current.getBoundingClientRect();
    const popW = 144, popH = 120;
    const left = r.left - popW + r.width;
    const spaceBelow = window.innerHeight - r.bottom;
    setStyle({ position: "fixed", top: spaceBelow < popH + 10 ? r.top - popH - 4 : r.bottom + 4, left, width: popW, zIndex: 99999 });
  }, []);

  const open = () => { calcPos(); setIsOpen(true); };

  useEffect(() => {
    if (!isOpen) return;
    const onOut = (e: MouseEvent) => {
      if (!trigRef.current?.contains(e.target as Node) && !popRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    const onScroll = () => calcPos();
    document.addEventListener("mousedown", onOut);
    window.addEventListener("scroll", onScroll, true);
    return () => { document.removeEventListener("mousedown", onOut); window.removeEventListener("scroll", onScroll, true); };
  }, [isOpen, calcPos]);

  return (
    <>
      <button ref={trigRef} onClick={isOpen ? () => setIsOpen(false) : open} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors cursor-pointer inline-flex">
        <Lucide.MoreVertical className="w-4 h-4" />
      </button>
      {mounted && isOpen && createPortal(
        <div ref={popRef} style={style} className="bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 overflow-hidden">
          <button onClick={() => { onToggle(); setIsOpen(false); }} className="w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-slate-50 text-slate-700 cursor-pointer flex items-center gap-2">
            {faq.isPublished ? <Lucide.EyeOff className="w-3.5 h-3.5" /> : <Lucide.Eye className="w-3.5 h-3.5" />}
            {faq.isPublished ? "Hide" : "Publish"}
          </button>
          <button onClick={() => { onEdit(); setIsOpen(false); }} className="w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-slate-50 text-brand-blue cursor-pointer flex items-center gap-2">
            <Lucide.Edit2 className="w-3.5 h-3.5" /> Edit
          </button>
          <button onClick={() => { onDelete(); setIsOpen(false); }} className="w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-red-50 text-red-600 cursor-pointer flex items-center gap-2">
            <Lucide.Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>,
        document.body
      )}
    </>
  );
}

export default function FAQsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<Partial<FAQ>>({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    getSetting("faqs").then(saved => {
      if (saved && (saved as FAQ[]).length > 0) {
        setFaqs(saved as FAQ[]);
      } else {
        setSetting("faqs", defaultFAQs as FAQ[]);
        setFaqs(defaultFAQs);
      }
    });
  }, [router]);

  const openNewForm = () => {
    setCurrentFaq({});
    setIsEditing(false);
    setIsFormOpen(true);
  };

  const saveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentFaq.question || !currentFaq.answer) return;

    let updated;
    if (isEditing && currentFaq.id) {
      updated = faqs.map(f => 
        f.id === currentFaq.id ? { ...f, ...currentFaq } as FAQ : f
      );
    } else {
      updated = [
        ...faqs, 
        { 
          ...currentFaq, 
          id: Date.now().toString(), 
          isPublished: true 
        } as FAQ
      ];
    }
    
    setFaqs(updated);
    setSetting("faqs", updated as FAQ[]);
    setCurrentFaq({});
    setIsEditing(false);
    setIsFormOpen(false);
  };

  const editFaq = (f: FAQ) => {
    setCurrentFaq(f);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const cancelEdit = () => {
    setCurrentFaq({});
    setIsEditing(false);
    setIsFormOpen(false);
  };

  const togglePublish = (id: string) => {
    const updated = faqs.map((f) =>
      f.id === id ? { ...f, isPublished: !f.isPublished } : f
    );
    setFaqs(updated);
    setSetting("faqs", updated as FAQ[]);
  };

  const deleteFAQ = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    const updated = faqs.filter((f) => f.id !== id);
    setFaqs(updated);
    setSetting("faqs", updated as FAQ[]);
  };

  if (!auth) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Manage Frequently Asked Questions</h2>
          <p className="text-sm text-slate-500 mt-0.5">Add, edit, review questions, toggle display status, or delete portal FAQs.</p>
        </div>
        <button
          onClick={openNewForm}
          className="px-4 py-2.5 bg-brand-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
        >
          <Lucide.Plus className="w-4 h-4" /> Add FAQ
        </button>
      </div>

      {mounted && isFormOpen && createPortal(
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-[9999] flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-6 max-w-xl w-full relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={cancelEdit} 
              className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <Lucide.X className="w-4 h-4" />
            </button>
            <h3 className="text-sm font-extrabold text-slate-800 mb-4">{isEditing ? "Edit FAQ" : "Add New FAQ"}</h3>
            <form onSubmit={saveFaq} className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Question</label>
                <input
                  type="text"
                  required
                  value={currentFaq.question || ""}
                  onChange={(e) => setCurrentFaq({ ...currentFaq, question: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                  placeholder="e.g. How long does installation take?"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Answer</label>
                <textarea
                  required
                  rows={3}
                  value={currentFaq.answer || ""}
                  onChange={(e) => setCurrentFaq({ ...currentFaq, answer: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue resize-none"
                  placeholder="Enter the answer..."
                />
              </div>
              
              <div className="flex items-center justify-end gap-3 mt-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all active:scale-95 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  {isEditing ? "Update FAQ" : "Add FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
        <div className="overflow-visible min-h-[180px]">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                <th className="pb-3">Question</th>
                <th className="pb-3">Answer Detail</th>
                <th className="pb-3">Home Display</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {faqs.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 pr-4 font-bold text-slate-800 max-w-xs">{f.question}</td>
                  <td className="py-3.5 pr-4 text-slate-600 max-w-md">{f.answer}</td>
                  <td className="py-3.5 pr-4">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      f.isPublished ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-slate-100 text-slate-500 border border-slate-200"
                    }`}>{f.isPublished ? "Published" : "Hidden"}</span>
                  </td>
                  <td className="py-3.5 text-right relative whitespace-nowrap">
                    <ActionMenu 
                      faq={f} 
                      onToggle={() => togglePublish(f.id)} 
                      onEdit={() => editFaq(f)} 
                      onDelete={() => deleteFAQ(f.id)} 
                    />
                  </td>
                </tr>
              ))}
              {faqs.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400 font-medium">No FAQs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

