"use client";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as Lucide from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from "@/components/ui/table";

interface Testimonial {
  id: string;
  author: string;
  role: string;
  text: string;
  rating: number;
  isPublished: boolean;
  image?: string;
}

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
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<Testimonial>>({ image: "" });
  const [uploading, setUploading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Section heading state
  const [headingEn, setHeadingEn] = useState("What Our Customers Say");
  const [headingSaved, setHeadingSaved] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    getSetting("testimonials").then(saved => {
      if (Array.isArray(saved)) {
        setTestimonials(saved as Testimonial[]);
      } else {
        setTestimonials([]);
      }
    });
    getSetting("testimonials_content").then(saved => {
      if (saved) {
        const item = Array.isArray(saved) ? saved[0] : saved;
        if (item && typeof item === "object") {
          const s = item as Record<string, string>;
          if (s.headingEn) setHeadingEn(s.headingEn);
        }
      }
    });
  }, [router]);

  const saveHeading = async () => {
    const success = await setSetting("testimonials_content", { headingEn });
    if (success) {
      setHeadingSaved(true);
      toast.success("Section heading saved successfully!");
      setTimeout(() => setHeadingSaved(false), 3000);
    } else {
      toast.error("Failed to save to database. Please check admin login session.");
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-testimonial-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setCurrentTestimonial((prev) => ({ ...prev, image: data.url }));
      } else {
        alert(data.error || "Upload failed");
      }
    } catch {
      alert("Image upload error");
    } finally {
      setUploading(false);
    }
  };


  const saveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTestimonial.author?.trim()) {
      toast.error("Customer name is required.");
      return;
    }

    let updated: Testimonial[];
    const textVal = currentTestimonial.text?.trim() || "";
    if (isEditing && currentTestimonial.id) {
      updated = testimonials.map((t) =>
        t.id === currentTestimonial.id
          ? ({
              ...t,
              ...currentTestimonial,
              text: textVal,
              comment: textVal,
            } as Testimonial)
          : t
      );
    } else {
      updated = [
        ...testimonials,
        {
          id: Date.now().toString(),
          author: currentTestimonial.author?.trim() || "",
          role: currentTestimonial.role?.trim() || "",
          text: textVal,
          comment: textVal,
          rating: currentTestimonial.rating,
          image: currentTestimonial.image || "",
          isPublished: true,
        } as Testimonial,
      ];
    }

    setTestimonials(updated);
    const ok = await setSetting("testimonials", updated as Testimonial[]);
    if (ok) {
      toast.success(isEditing ? "Testimonial updated successfully!" : "Testimonial added successfully!");
    } else {
      toast.error("Failed to save to database. Please check admin login session.");
    }
    setCurrentTestimonial({ image: "" });
    setIsEditing(false);
    setIsRatingDropdownOpen(false);
    setIsFormOpen(false);
  };

  const openNewForm = () => {
    setCurrentTestimonial({ image: "" });
    setIsEditing(false);
    setIsRatingDropdownOpen(false);
    setIsFormOpen(true);
  };

  const editTestimonial = (t: Testimonial & { comment?: string }) => {
    setCurrentTestimonial({
      ...t,
      text: t.text !== undefined && t.text !== "" ? t.text : (t.comment && t.comment !== "The internet speeds are super stable. Bufferless 4K streaming and low latency during night peering works perfectly." ? t.comment : ""),
    });
    setIsEditing(true);
    setIsRatingDropdownOpen(false);
    setIsFormOpen(true);
  };

  const cancelEdit = () => {
    setCurrentTestimonial({ image: "" });
    setIsEditing(false);
    setIsRatingDropdownOpen(false);
    setIsFormOpen(false);
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
        <button
          onClick={openNewForm}
          className="px-4 py-2.5 bg-brand-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
        >
          <Lucide.Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {/* Section Title Editor */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">Section Title</h3>
            <p className="text-xs text-slate-500 mt-0.5">Edit the title displayed above customer testimonials on the homepage.</p>
          </div>
          <button
            onClick={saveHeading}
            className="px-4 py-2 bg-brand-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Lucide.Save className="w-3.5 h-3.5" />
            {headingSaved ? "Saved!" : "Save Heading"}
          </button>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Section Title</label>
          <input
            type="text"
            value={headingEn}
            onChange={(e) => setHeadingEn(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
            placeholder="e.g. What Our Customers Say"
          />
        </div>
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
            <h3 className="text-sm font-extrabold text-slate-800 mb-4">{isEditing ? "Edit Testimonial" : "Add New Testimonial"}</h3>
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
                <label className="text-xs font-bold text-slate-700 block">Avatar Image</label>
                <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-500 font-bold shrink-0 text-xs">
                    {currentTestimonial.image ? (
                      <Image src={currentTestimonial.image} alt="" width={48} height={48} className="w-full h-full object-cover" />
                    ) : (
                      "No Image"
                    )}
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-white file:text-slate-700 hover:file:bg-slate-100 cursor-pointer border border-slate-200/60 rounded-xl p-1 bg-white"
                    />
                    {uploading && <span className="text-[10px] text-slate-500 animate-pulse font-bold">Uploading...</span>}
                  </div>
                </div>
              </div>
              <div className="space-y-1 md:col-span-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 block">Review Text (Optional)</label>
                  <span className="text-[10px] text-slate-400 font-mono">{(currentTestimonial.text || "").length}/300</span>
                </div>
                <textarea
                  rows={3}
                  maxLength={300}
                  value={currentTestimonial.text || ""}
                  onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, text: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue resize-none"
                  placeholder="Enter the customer's review (optional)..."
                />
              </div>
              <div className="space-y-1 relative">
                <label className="text-xs font-bold text-slate-700 block">Rating (1-5) (Optional)</label>
                <button
                  type="button"
                  onClick={() => setIsRatingDropdownOpen(!isRatingDropdownOpen)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue cursor-pointer flex items-center justify-between transition-all hover:bg-slate-100/70"
                >
                  <div className="flex items-center gap-2 font-medium">
                    {currentTestimonial.rating ? (
                      <>
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Lucide.Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < (currentTestimonial.rating || 0) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-slate-800">{currentTestimonial.rating} Star{currentTestimonial.rating > 1 ? "s" : ""}</span>
                      </>
                    ) : (
                      <span className="text-slate-400 font-medium">No Rating (None)</span>
                    )}
                  </div>
                  <Lucide.ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isRatingDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isRatingDropdownOpen && (
                  <div className="absolute bottom-full left-0 right-0 mb-1.5 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-1.5 space-y-1 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentTestimonial({ ...currentTestimonial, rating: undefined });
                        setIsRatingDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                        !currentTestimonial.rating ? "bg-slate-100 text-slate-900 font-bold" : "hover:bg-slate-50 text-slate-600"
                      }`}
                    >
                      <span>No Rating (None)</span>
                      {!currentTestimonial.rating && <Lucide.Check className="w-3.5 h-3.5 text-brand-blue" />}
                    </button>

                    {[5, 4, 3, 2, 1].map((stars) => (
                      <button
                        key={stars}
                        type="button"
                        onClick={() => {
                          setCurrentTestimonial({ ...currentTestimonial, rating: stars });
                          setIsRatingDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                          currentTestimonial.rating === stars ? "bg-amber-50/80 text-slate-900 font-bold border border-amber-200/50" : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex text-amber-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Lucide.Star
                                key={i}
                                className={`w-3.5 h-3.5 ${i < stars ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
                              />
                            ))}
                          </div>
                          <span>{stars} Star{stars > 1 ? "s" : ""}</span>
                        </div>
                        {currentTestimonial.rating === stars && <Lucide.Check className="w-3.5 h-3.5 text-amber-500" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="md:col-span-2 flex items-center justify-end gap-3 mt-2 border-t border-slate-100 pt-3">
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
                  {isEditing ? "Update Testimonial" : "Add Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      <div className="overflow-x-auto border border-slate-200/60 rounded-xl bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/75 border-b border-slate-200/60">
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-4 pl-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Author Details</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rating</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Review Feedback Text</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Home Display</TableHead>
              <TableHead className="py-4 pr-4 text-xs font-bold text-slate-500 text-right uppercase tracking-wider">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((t) => (
              <TableRow key={t.id} className="hover:bg-slate-50/40 transition-colors border-b border-slate-100 last:border-0 text-slate-800">
                <TableCell className="py-3.5 pl-4 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 flex items-center justify-center">
                      {t.image ? (
                        <Image
                          src={t.image}
                          alt={t.author}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold bg-slate-100 text-xs">
                          {t.author.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-900 block leading-tight">{t.author}</span>
                      <span className="text-[10px] text-slate-550 font-mono">{t.role}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3.5 pr-4 font-bold text-amber-500 text-sm">{"★".repeat(t.rating)}</TableCell>
                <TableCell className="py-3.5 pr-4 text-slate-600 text-xs max-w-sm truncate" title={t.text}>{t.text}</TableCell>
                <TableCell className="py-3.5 pr-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border leading-none ${
                    t.isPublished ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-50 text-slate-500 border-slate-200"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${t.isPublished ? "bg-emerald-500" : "bg-slate-400"}`} />
                    <span>{t.isPublished ? "Published" : "Hidden"}</span>
                  </span>
                </TableCell>
                <TableCell className="py-3.5 pr-4 text-right relative whitespace-nowrap">
                  <ActionMenu 
                    t={t} 
                    onToggle={() => togglePublish(t.id)} 
                    onEdit={() => editTestimonial(t)} 
                    onDelete={() => deleteTestimonial(t.id)} 
                  />
                </TableCell>
              </TableRow>
            ))}
            {testimonials.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center text-slate-400 font-semibold">No testimonials found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

