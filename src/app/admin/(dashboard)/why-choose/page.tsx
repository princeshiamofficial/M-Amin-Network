"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import * as Lucide from "lucide-react";

interface NetworkFeature {
  id: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  iconName: string;
  _sort_order: number;
}

function ActionMenu({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const trigRef = React.useRef<HTMLButtonElement>(null);
  const popRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const calcPos = React.useCallback(() => {
    if (!trigRef.current) return;
    const r = trigRef.current.getBoundingClientRect();
    const popW = 144, popH = 90;
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

export default function WhyChoosePage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [lang, setLang] = useState<"EN" | "BN">("EN");

  const [isEditing, setIsEditing] = useState(false);
  const [currentFeature, setCurrentFeature] = useState<Partial<NetworkFeature>>({ _sort_order: 0 });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [ordered, setOrdered] = useState<NetworkFeature[]>([]);

  // --- Drag-and-drop state (same pattern as dashboard quick actions) ---
  const orderedRef = useRef<NetworkFeature[]>([]);
  useEffect(() => { orderedRef.current = ordered; }, [ordered]);

  const ignoreNextClickRef = useRef<boolean>(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const pointerDragRef = useRef<{
    id: string;
    pointerId: number;
    startX: number;
    startY: number;
    moved: boolean;
  } | null>(null);
  const reorderedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    getSetting("network_features").then(saved => {
      if (Array.isArray(saved)) {
        const list = (saved as NetworkFeature[]).sort((a, b) => a._sort_order - b._sort_order);
        setOrdered(list);
      } else {
        setOrdered([]);
      }
    });
  }, [router]);

  const openNewForm = () => {
    setCurrentFeature({ _sort_order: ordered.length, iconName: "Zap" });
    setIsEditing(false);
    setIsFormOpen(true);
  };

  const persistOrdered = (list: NetworkFeature[]) => {
    const withOrder = list.map((f, i) => ({ ...f, _sort_order: i }));
    setOrdered(withOrder);
    setSetting("network_features", withOrder);
  };

  const saveFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentFeature.titleEn || !currentFeature.descEn) return;

    let updated: NetworkFeature[];
    if (isEditing && currentFeature.id) {
      updated = ordered.map(f =>
        f.id === currentFeature.id ? { ...f, ...currentFeature } as NetworkFeature : f
      );
    } else {
      updated = [
        ...ordered,
        {
          ...currentFeature,
          id: `nf-${Date.now()}`,
          titleEn: currentFeature.titleEn || "",
          titleBn: currentFeature.titleBn || "",
          descEn: currentFeature.descEn || "",
          descBn: currentFeature.descBn || "",
          iconName: currentFeature.iconName || "Zap",
          _sort_order: currentFeature._sort_order ?? ordered.length,
        } as NetworkFeature
      ];
    }

    persistOrdered(updated);
    setCurrentFeature({ _sort_order: 0, iconName: "Zap" });
    setIsEditing(false);
    setIsFormOpen(false);
  };

  const editFeature = (f: NetworkFeature) => {
    setCurrentFeature({ ...f });
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const cancelEdit = () => {
    setCurrentFeature({ _sort_order: 0, iconName: "Zap" });
    setIsEditing(false);
    setIsFormOpen(false);
  };

  const deleteFeature = async (id: string) => {
    if (!confirm("Are you sure you want to delete this feature?")) return;
    const updated = ordered.filter((f) => f.id !== id);
    persistOrdered(updated);
  };

  // --- Drag-and-drop handlers ---
  const getFeatureIdFromPoint = useCallback((clientX: number, clientY: number) => {
    const element = document.elementFromPoint(clientX, clientY);
    if (!(element instanceof Element)) return null;
    return element.closest<HTMLElement>("[data-feature-id]")?.dataset.featureId ?? null;
  }, []);

  const reorderFeature = useCallback((draggedId: string, targetId: string) => {
    if (draggedId === targetId) return;
    const currentList = orderedRef.current;
    const draggedIdx = currentList.findIndex(item => item.id === draggedId);
    const targetIdx = currentList.findIndex(item => item.id === targetId);
    if (draggedIdx === -1 || targetIdx === -1) return;
    const newList = [...currentList];
    const [draggedItem] = newList.splice(draggedIdx, 1);
    newList.splice(targetIdx, 0, draggedItem);
    orderedRef.current = newList;
    reorderedRef.current = true;
    setOrdered(newList);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLLIElement>, id: string) => {
    if (e.button !== 0) return;
    const target = e.target;
    if (target instanceof Element && target.closest("button, a, input, textarea, select")) return;
    pointerDragRef.current = {
      id,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      moved: false,
    };
    reorderedRef.current = false;
    ignoreNextClickRef.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLLIElement>) => {
    const dragState = pointerDragRef.current;
    if (!dragState || dragState.pointerId !== e.pointerId) return;
    const distance = Math.hypot(e.clientX - dragState.startX, e.clientY - dragState.startY);
    if (!dragState.moved && distance < 6) return;
    if (!dragState.moved) {
      dragState.moved = true;
      ignoreNextClickRef.current = true;
      setDraggingId(dragState.id);
    }
    const targetId = getFeatureIdFromPoint(e.clientX, e.clientY);
    setHoveredId(targetId && targetId !== dragState.id ? targetId : null);
    if (targetId) {
      reorderFeature(dragState.id, targetId);
    }
  }, [getFeatureIdFromPoint, reorderFeature]);

  const finishPointerDrag = useCallback(async (e: React.PointerEvent<HTMLLIElement>) => {
    const dragState = pointerDragRef.current;
    if (!dragState || dragState.pointerId !== e.pointerId) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    pointerDragRef.current = null;
    setHoveredId(null);
    setDraggingId(null);
    if (dragState.moved && reorderedRef.current) {
      const withOrder = orderedRef.current.map((f, i) => ({ ...f, _sort_order: i }));
      orderedRef.current = withOrder;
      setOrdered(withOrder);
      await setSetting("network_features", withOrder);
    }
    reorderedRef.current = false;
  }, []);

  if (!auth) return null;

  const AVAILABLE_ICONS = [
    "Zap", "Wifi", "Gamepad2", "LifeBuoy", "Cloud", "Building2",
    "Server", "Shield", "Globe", "Headphones", "Monitor", "Router",
    "Network", "Signal", "Activity", "Lock", "Cpu", "Database",
    "Mail", "Phone", "MessageSquare", "Users", "Clock", "CheckCircle",
    "AlertCircle", "Info", "HelpCircle", "Star", "Heart", "ThumbsUp",
    "Award", "TrendingUp", "BarChart3"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 ml-auto">
          <div className="inline-flex rounded-xl border border-slate-200 overflow-hidden">
            <button
              onClick={() => setLang("EN")}
              className={`px-3 py-2 text-xs font-bold transition-colors cursor-pointer ${lang === "EN" ? "bg-brand-blue text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}
            >
              English
            </button>
            <button
              onClick={() => setLang("BN")}
              className={`px-3 py-2 text-xs font-bold transition-colors cursor-pointer ${lang === "BN" ? "bg-brand-blue text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}
            >
              Bangla
            </button>
          </div>
          <button
            onClick={openNewForm}
            className="px-4 py-2.5 bg-brand-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <Lucide.Plus className="w-4 h-4" /> Add Feature
          </button>
        </div>
      </div>

      {mounted && isFormOpen && createPortal(
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-[9999] flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={cancelEdit}
              className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <Lucide.X className="w-4 h-4" />
            </button>
            <h3 className="text-sm font-extrabold text-slate-800 mb-4">{isEditing ? "Edit Feature" : "Add New Feature"}</h3>
            <form onSubmit={saveFeature} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Title (English)</label>
                <input
                  type="text"
                  required
                  value={currentFeature.titleEn || ""}
                  onChange={(e) => setCurrentFeature({ ...currentFeature, titleEn: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                  placeholder="e.g. 100% Fiber Optic (FTTH)"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Title (Bangla)</label>
                <input
                  type="text"
                  required
                  value={currentFeature.titleBn || ""}
                  onChange={(e) => setCurrentFeature({ ...currentFeature, titleBn: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                  placeholder="e.g. ১০০% ফাইবার অপটিক (FTTH)"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700 block">Description (English)</label>
                <textarea
                  required
                  rows={3}
                  value={currentFeature.descEn || ""}
                  onChange={(e) => setCurrentFeature({ ...currentFeature, descEn: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue resize-none"
                  placeholder="Describe this feature in English..."
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700 block">Description (Bangla)</label>
                <textarea
                  required
                  rows={3}
                  value={currentFeature.descBn || ""}
                  onChange={(e) => setCurrentFeature({ ...currentFeature, descBn: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue resize-none"
                  placeholder="Describe this feature in Bangla..."
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700 block">Icon</label>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-3 border border-slate-200 rounded-xl bg-slate-50/50 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {AVAILABLE_ICONS.map((icon) => {
                    const IconComp = (Lucide as unknown as Record<string, React.ElementType>)[icon] || Lucide.Zap;
                    const isSelected = (currentFeature.iconName || "Zap") === icon;
                    return (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setCurrentFeature({ ...currentFeature, iconName: icon })}
                        className={`p-2 rounded-lg transition-all cursor-pointer ${isSelected ? "bg-brand-blue text-white shadow-md scale-105" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100 hover:text-slate-700"}`}
                        title={icon}
                      >
                        <IconComp className="h-5 w-5" />
                      </button>
                    );
                  })}
                </div>
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
                  {isEditing ? "Update Feature" : "Add Feature"}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ overflow: "anchor" as React.CSSProperties["overflow"] }}>
        {ordered.map((f) => {
          const IconComp = (Lucide as unknown as Record<string, React.ElementType>)[f.iconName] || Lucide.Zap;
          const title = lang === "EN" ? f.titleEn : f.titleBn;
          const desc = lang === "EN" ? f.descEn : f.descBn;
          const isDragging = draggingId === f.id;
          const isHovered = hoveredId === f.id;
          return (
            <li
              key={f.id}
              data-feature-id={f.id}
              onPointerDown={(e) => handlePointerDown(e, f.id)}
              onPointerMove={handlePointerMove}
              onPointerUp={finishPointerDrag}
              onPointerCancel={finishPointerDrag}
              onClick={() => {
                if (ignoreNextClickRef.current) {
                  ignoreNextClickRef.current = false;
                }
              }}
              className={`flex items-start gap-4 rounded-2xl border bg-white p-5 transition-all duration-200 select-none touch-none ${
                isDragging
                  ? "opacity-40 border-dashed border-slate-300 bg-slate-50 scale-95 cursor-grabbing shadow-none"
                  : isHovered
                  ? "border-brand-cyan/50 ring-2 ring-brand-cyan/15 shadow-md scale-[1.02] cursor-grabbing"
                  : "border-slate-200 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing"
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center border border-brand-cyan/15 shrink-0">
                <IconComp className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">{title}</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{desc}</p>
              </div>
              <div className="flex flex-col items-center justify-between shrink-0 self-stretch py-0.5">
                <div className="cursor-grab active:cursor-grabbing p-1.5 text-slate-400" tabIndex={0}>
                  <Lucide.GripVertical className="w-4 h-4" />
                </div>
                <ActionMenu
                  onEdit={() => editFeature(f)}
                  onDelete={() => deleteFeature(f.id)}
                />
              </div>
            </li>
          );
        })}
        {ordered.length === 0 && (
          <li className="col-span-full py-16 text-center text-slate-400 font-semibold text-sm border border-dashed border-slate-200 rounded-2xl bg-white">
            No features found. Click &quot;Add Feature&quot; to create one.
          </li>
        )}
      </ul>
    </div>
  );
}
