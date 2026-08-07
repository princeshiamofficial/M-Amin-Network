"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import * as Lucide from "lucide-react";
import {
  defaultAboutContentFull,
  type Credential,
  type InfraCard,
  type AboutContentFull,
} from "@/lib/about-content";

export { defaultAboutContentFull, type Credential, type InfraCard, type AboutContentFull };

const AVAILABLE_ICONS = [
  { value: "Network", label: "Network" },
  { value: "Database", label: "Database" },
  { value: "Wrench", label: "Repair" },
  { value: "ShieldCheck", label: "Security" },
  { value: "Zap", label: "Fast" },
  { value: "Server", label: "Server" },
  { value: "Activity", label: "Activity" },
  { value: "Cloud", label: "Cloud" },
  { value: "Globe", label: "Global" }
];

interface IconPickerProps { value: string; onChange: (v: string) => void; }
function IconPicker({ value, onChange }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const trigRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const calcPos = useCallback(() => {
    if (!trigRef.current) return;
    const r = trigRef.current.getBoundingClientRect();
    const popW = 272, popH = 216, m = 12;
    const left = Math.max(m, Math.min(r.left + r.width / 2 - popW / 2, window.innerWidth - popW - m));
    const spaceBelow = window.innerHeight - r.bottom;
    setStyle({ position: "fixed", top: spaceBelow < popH + m ? r.top - popH - 8 : r.bottom + 8, left, width: popW, zIndex: 9999 });
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

  const SelIcon = (Lucide as unknown as Record<string, React.ElementType>)[value] || Lucide.HelpCircle;
  return (
    <>
      <button ref={trigRef} type="button" onClick={open}
        className="group w-12 h-12 rounded-xl border-2 border-slate-200 hover:border-blue-400 bg-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 shrink-0">
        <SelIcon className="w-5 h-5 text-blue-500 group-hover:text-blue-600 transition-colors" />
      </button>
      {mounted && isOpen && createPortal(
        <div ref={popRef} style={style}
          className="rounded-2xl bg-white border border-slate-200 shadow-2xl p-3 grid grid-cols-5 gap-2 max-h-56 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {AVAILABLE_ICONS.map(opt => {
            const IC = (Lucide as unknown as Record<string, React.ElementType>)[opt.value] || Lucide.HelpCircle;
            const sel = value === opt.value;
            return (
              <button key={opt.value} type="button" title={opt.label}
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer border ${sel ? "bg-blue-500 border-blue-500 text-white shadow-md scale-105" : "bg-slate-50 hover:bg-blue-50 border-slate-100 hover:border-blue-200 text-slate-500 hover:text-blue-600"}`}>
                <IC className="w-4 h-4" />
              </button>
            );
          })}
        </div>, document.body
      )}
    </>
  );
}

export default function AboutPageAdmin() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [content, setContent] = useState<AboutContentFull>(defaultAboutContentFull);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [activeTab, setActiveTab] = useState("mission");

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    
    getSetting("about_content_full").then(saved => {
      if (saved) {
        const parsed = saved as unknown as AboutContentFull;
        setContent({
          ...defaultAboutContentFull,
          ...parsed,
          credentials: parsed.credentials || defaultAboutContentFull.credentials || [],
          infraCards: parsed.infraCards || defaultAboutContentFull.infraCards || []
        });
      } else {
        setSetting("about_content_full", defaultAboutContentFull as unknown as Record<string, unknown>);
        setContent(defaultAboutContentFull);
      }
    });
  }, [router]);

  const save = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const payload = {
      ...content,
      credentials: (content.credentials || []).map((c: Credential) => ({
        ...c,
        keyBn: c.keyEn,
        valBn: c.valEn,
      })),
      infraCards: (content.infraCards || []).map((c: InfraCard) => ({
        ...c,
        titleBn: c.titleEn,
        descBn: c.descEn,
      })),
    };
    setSaveError("");
    const success = await setSetting("about_content_full", payload as unknown as Record<string, unknown>);
    if (!success) {
      setSaveError("Session expired or save failed. Please log in again.");
      setTimeout(() => setSaveError(""), 5000);
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateField = (key: keyof AboutContentFull, val: string | Credential[] | InfraCard[]) => {
    setContent({ ...content, [key]: val });
  };

  if (!auth) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">About Page Content</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage all text and content for the About page.</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-lg">
              <Lucide.CheckCircle2 className="w-3.5 h-3.5" /> Saved!
            </span>
          )}
          {saveError && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-lg">
              {saveError}
            </span>
          )}
          <button onClick={save} className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all cursor-pointer shadow-md shadow-blue-500/25 active:scale-[0.98]">
            <Lucide.Save className="w-4 h-4" /> Save Content
          </button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-slate-200 pb-2">
        {["mission", "credentials", "infrastructure", "integrity"].map((tab: string) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors capitalize ${activeTab === tab ? "bg-slate-800 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">

        {activeTab === "mission" && (
          <div className="space-y-6">
            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Mission Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Title (English)</label>
                <input type="text" value={content.missionTitleEn} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("missionTitleEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Paragraph 1 (English)</label>
                <textarea rows={4} value={content.missionP1En} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateField("missionP1En", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Paragraph 2 (English)</label>
                <textarea rows={4} value={content.missionP2En} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateField("missionP2En", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "credentials" && (
          <div className="space-y-6">
            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Key Credentials Section</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Section Title (English)</label>
                <input type="text" value={content.credTitleEn} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("credTitleEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
            </div>
            
            <div className="space-y-3">
              {(content.credentials || []).map((cred: Credential, i: number) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex gap-3 items-center">
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    <input type="text" placeholder="Key (e.g. License Authority)" value={cred.keyEn} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { const c = [...(content.credentials || [])]; c[i].keyEn = e.target.value; updateField("credentials", c); }} className="px-3 py-2 text-xs border border-slate-200 rounded-lg w-full bg-white text-slate-800" />
                    <input type="text" placeholder="Value (e.g. BTRC Bangladesh)" value={cred.valEn} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { const c = [...(content.credentials || [])]; c[i].valEn = e.target.value; updateField("credentials", c); }} className="px-3 py-2 text-xs border border-slate-200 rounded-lg w-full bg-white text-slate-800" />
                  </div>
                  <button onClick={() => updateField("credentials", (content.credentials || []).filter((_: Credential, idx: number) => idx !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer">
                    <Lucide.X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button onClick={() => updateField("credentials", [...(content.credentials || []), { keyEn: "", valEn: "" }])} className="px-4 py-2 text-xs font-bold text-brand-blue bg-blue-50 hover:bg-blue-100 rounded-lg cursor-pointer">
                + Add Credential
              </button>
            </div>
          </div>
        )}

        {activeTab === "infrastructure" && (
          <div className="space-y-6">
            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Infrastructure Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Title (English)</label>
                <input type="text" value={content.infraTitleEn} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("infraTitleEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Description (English)</label>
                <textarea rows={2} value={content.infraDescEn} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateField("infraDescEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
            </div>

            <div className="space-y-4">
              {(content.infraCards || []).map((card: InfraCard, i: number) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex gap-4 items-start">
                  <IconPicker value={card.iconName} onChange={(v: string) => { const c = [...(content.infraCards || [])]; c[i].iconName = v; updateField("infraCards", c); }} />
                  <div className="grid grid-cols-1 gap-3 flex-1">
                    <input type="text" placeholder="Title (e.g. BGP Multi-Homing Routing)" value={card.titleEn} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { const c = [...(content.infraCards || [])]; c[i].titleEn = e.target.value; updateField("infraCards", c); }} className="px-3 py-2 text-xs border border-slate-200 rounded-lg w-full bg-white text-slate-800" />
                    <textarea rows={2} placeholder="Description..." value={card.descEn} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { const c = [...(content.infraCards || [])]; c[i].descEn = e.target.value; updateField("infraCards", c); }} className="px-3 py-2 text-xs border border-slate-200 rounded-lg w-full bg-white text-slate-800 resize-none" />
                  </div>
                  <button onClick={() => updateField("infraCards", (content.infraCards || []).filter((_: InfraCard, idx: number) => idx !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer">
                    <Lucide.X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button onClick={() => updateField("infraCards", [...(content.infraCards || []), { titleEn: "", descEn: "", iconName: "Network" }])} className="px-4 py-2 text-xs font-bold text-brand-blue bg-blue-50 hover:bg-blue-100 rounded-lg cursor-pointer">
                + Add Infrastructure Card
              </button>
            </div>
          </div>
        )}

        {activeTab === "integrity" && (
          <div className="space-y-6">
            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Integrity Guarantee Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Title (English)</label>
                <input type="text" value={content.integrityTitleEn} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("integrityTitleEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Description (English)</label>
                <textarea rows={3} value={content.integrityDescEn} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateField("integrityDescEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Primary Button (English)</label>
                <input type="text" value={content.btn1En} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("btn1En", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Secondary Button (English)</label>
                <input type="text" value={content.btn2En} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField("btn2En", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
