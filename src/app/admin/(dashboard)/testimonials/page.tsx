"use client";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import * as Lucide from "lucide-react";

interface Testimonial {
  id: string;
  author: string;
  role: string;
  text: string;
  rating: number;
  isPublished: boolean;
}

const defaultTestimonials: Testimonial[] = [
  { id: "1", author: "Mehan Ahmed", role: "Local Freelance Web Developer", text: "As a developer, I need constant SSH connections and Git pushes. M Amin Network gives me rock-solid uptime. Their low-latency routing to GitHub and Vercel has boosted my workflow tremendously. Easily the best ISP in Kadomtoli!", rating: 5, isPublished: true },
  { id: "2", author: "Kamrul Hasan", role: "Proprietor, Hasan Trading, Aganagar", text: "We upgraded our shop's POS and billing terminals to M Amin Network's corporate dedicated plan. Uptime is outstanding and we haven't experienced a single transaction outage. Highly recommended for corporate connections.", rating: 5, isPublished: true },
];

function ActionMenu({ t, onToggle, onEdit, onDelete }: { t: Testimonial, onToggle: () => void, onEdit: () => void, onDelete: () => void }) {
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
            {t.isPublished ? <Lucide.EyeOff className="w-3.5 h-3.5" /> : <Lucide.Eye className="w-3.5 h-3.5" />}
            {t.isPublished ? "Hide" : "Publish"}
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

export default function TestimonialsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<Testimonial>>({ rating: 5 });

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    getSetting("testimonials").then(saved => {
      if (saved && (saved as Testimonial[]).length > 0) {
        setTestimonials(saved as Testimonial[]);
      } else {
        setSetting("testimonials", defaultTestimonials as Testimonial[]);
        setTestimonials(defaultTestimonials);
      }
    });
  }, [router]);

  const saveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTestimonial.author || !currentTestimonial.text) return;

    let updated;
    if (isEditing && currentTestimonial.id) {
      updated = testimonials.map(t => 
        t.id === currentTestimonial.id ? { ...t, ...currentTestimonial } as Testimonial : t
      );
    } else {
      updated = [
        ...testimonials, 
        { 
          ...currentTestimonial, 
          id: Date.now().toString(), 
          rating: currentTestimonial.rating || 5, 
          isPublished: true 
        } as Testimonial
      ];
    }
    
    setTestimonials(updated);
    setSetting("testimonials", updated as Testimonial[]);
    setCurrentTestimonial({ rating: 5 });
    setIsEditing(false);
  };

  const editTestimonial = (t: Testimonial) => {
    setCurrentTestimonial(t);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setCurrentTestimonial({ rating: 5 });
    setIsEditing(false);
  };

  const togglePublish = (id: string) => {
    const updated = testimonials.map((t) =>
      t.id === id ? { ...t, isPublished: !t.isPublished } : t
    );
    setTestimonials(updated);
    setSetting("testimonials", updated as Testimonial[]);
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    const updated = testimonials.filter((t) => t.id !== id);
    setTestimonials(updated);
    setSetting("testimonials", updated as Testimonial[]);
  };

  if (!auth) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Manage Customer Testimonials</h2>
          <p className="text-sm text-slate-500 mt-0.5">Add, edit, review feedback, toggle display status, or delete client reviews.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
        <h3 className="text-sm font-bold text-slate-800 mb-4">{isEditing ? "Edit Testimonial" : "Add New Testimonial"}</h3>
        <form onSubmit={saveTestimonial} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">Customer Name</label>
            <input
              type="text"
              required
              value={currentTestimonial.author || ""}
              onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, author: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
              placeholder="e.g. Mehan Ahmed"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">Role / Location</label>
            <input
              type="text"
              required
              value={currentTestimonial.role || ""}
              onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, role: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
              placeholder="e.g. Local Freelance Web Developer"
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-bold text-slate-700 block">Review Text</label>
            <textarea
              required
              rows={3}
              value={currentTestimonial.text || ""}
              onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, text: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue resize-none"
              placeholder="Enter the customer's review..."
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">Rating (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              required
              value={currentTestimonial.rating || 5}
              onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, rating: parseInt(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
            />
          </div>
          
          <div className="md:col-span-2 flex items-center gap-3 mt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-brand-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-md active:scale-95"
            >
              {isEditing ? "Update Testimonial" : "Add Testimonial"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all active:scale-95"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
        <div className="overflow-visible min-h-[180px]">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                <th className="pb-3">Author Details</th>
                <th className="pb-3">Rating</th>
                <th className="pb-3">Review Feedback Text</th>
                <th className="pb-3">Home Display</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {testimonials.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 pr-4">
                    <span className="font-extrabold text-slate-800 block">{t.author}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{t.role}</span>
                  </td>
                  <td className="py-3.5 pr-4 font-bold text-amber-500">{"★".repeat(t.rating)}</td>
                  <td className="py-3.5 pr-4 text-slate-600 max-w-sm truncate">{t.text}</td>
                  <td className="py-3.5 pr-4">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      t.isPublished ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-slate-100 text-slate-500 border border-slate-200"
                    }`}>{t.isPublished ? "Published" : "Hidden"}</span>
                  </td>
                  <td className="py-3.5 text-right relative whitespace-nowrap">
                    <ActionMenu 
                      t={t} 
                      onToggle={() => togglePublish(t.id)} 
                      onEdit={() => editTestimonial(t)} 
                      onDelete={() => deleteTestimonial(t.id)} 
                    />
                  </td>
                </tr>
              ))}
              {testimonials.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400 font-medium">No testimonials found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

