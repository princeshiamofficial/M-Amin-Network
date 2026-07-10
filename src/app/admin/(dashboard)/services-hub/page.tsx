"use client";
import { toast } from "sonner";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import * as Lucide from "lucide-react";

interface ServiceCard {
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  badgeEn: string;
  badgeBn: string;
  iconName: string;
}

const AVAILABLE_ICONS = [
  { value: "Home", label: "Home" },
  { value: "Building2", label: "Corporate" },
  { value: "Briefcase", label: "Business" },
  { value: "Shield", label: "Security / DNS" },
  { value: "Wifi", label: "Wireless" },
  { value: "Zap", label: "Speed" },
  { value: "Server", label: "FTP Server" },
  { value: "Globe", label: "Global WAN" },
  { value: "Gamepad2", label: "Gaming" },
  { value: "Cpu", label: "Routing" },
  { value: "Network", label: "Fiber Backbone" },
  { value: "Cloud", label: "BDIX Cloud" },
  { value: "Tv", label: "IPTV" },
  { value: "Database", label: "Cache" },
  { value: "Gauge", label: "Speed Test" },
  { value: "Lock", label: "Enterprise Lock" },
  { value: "Phone", label: "Support Phone" },
  { value: "Headphones", label: "Headset Support" },
  { value: "Activity", label: "Low Latency" },
  { value: "Download", label: "Download Speed" },
  { value: "Upload", label: "Upload Speed" },
  { value: "HeartHandshake", label: "Trusted Partner" }
];

const defaultServices: ServiceCard[] = [
  {
    titleEn: "Home Internet (FTTH)",
    titleBn: "হোম ইন্টারনেট (FTTH)",
    descEn: "Uncapped, buffer-free fiber direct to your home. Enjoy seamless 4K streaming, home automation, and smooth remote learning.",
    descBn: "আনক্যাপড ও বাফার-মুক্ত ফাইবার সরাসরি আপনার বাসায়। উপভোগ করুন সিমলেস ৪কে স্ট্রিমিং ও রিমোট লার্নিং।",
    badgeEn: "Popular",
    badgeBn: "জনপ্রিয়",
    iconName: "Home"
  },
  {
    titleEn: "Corporate Leased Line",
    titleBn: "কর্পোরেট লিজড লাইন",
    descEn: "1:1 symmetric dedicated bandwidth with 99.9% uptime SLA guarantee, static IP allocation, and 24/7 priority enterprise support.",
    descBn: "৯৯.৯% আপটাইম এসএলএ গ্যারান্টি, স্ট্যাটিক আইপি এবং ২৪/৭ কর্পোরেট সাপোর্ট সহ সিমেট্রিক ব্যান্ডউইথ।",
    badgeEn: "SLA Guaranteed",
    badgeBn: "এসএলএ সমর্থিত",
    iconName: "Building2"
  },
  {
    titleEn: "SME & SOHO Connect",
    titleBn: "এসএমই ও সোহো কানেক্ট",
    descEn: "Symmetric internet connections tailored for businesses, shops, and startups. Secure connectivity with backup links.",
    descBn: "ব্যবসা, দোকান ও স্টার্টআপের জন্য সিমেট্রিক ইন্টারনেট সংযোগ। ব্যাকআপ লিংক সহ নিরাপদ কানেক্টিভিটি।",
    badgeEn: "Optimized",
    badgeBn: "অপ্টিমাইজড",
    iconName: "Briefcase"
  },
  {
    titleEn: "Safe DNS & Smart Cache",
    titleBn: "সেফ ডিএনএস ও স্মার্ট ক্যাশ",
    descEn: "Family-safe DNS configurations, automated gaming cache, BDIX optimization, and localized FTP movie and TV caches.",
    descBn: "ফ্যামিলি-সেফ ডিএনএস কনফিগারেশন, গেমিং ক্যাশ, BDIX অপ্টিমাইজেশান এবং লোকাল এফটিপি।",
    badgeEn: "Included",
    badgeBn: "অন্তর্ভুক্ত",
    iconName: "Shield"
  }
];

// ─── Portal Icon Picker ────────────────────────────────────────────────────────
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
        className="group w-12 h-12 rounded-xl border-2 border-slate-200 hover:border-blue-400 bg-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95">
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

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function ServicesHubPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [services, setServices] = useState<ServiceCard[]>(defaultServices);
  const [saved, setSaved] = useState(false);

  const blank: ServiceCard = { titleEn: "", titleBn: "", descEn: "", descBn: "", badgeEn: "", badgeBn: "", iconName: "Wifi" };
  const [newSvc, setNewSvc] = useState<ServiceCard>(blank);

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) { router.replace("/admin"); return; }
    setAuth(true);
    getSetting("m_amin_service_cards").then(s => {
      if (s) setServices(s as ServiceCard[]);
      else setSetting("m_amin_service_cards", defaultServices as ServiceCard[]);
    });
  }, [router]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetting("m_amin_service_cards", services as ServiceCard[]);
    setSaved(true); setTimeout(() => setSaved(false), 3000);
  };

  const moveUp = (i: number) => {
    if (i === 0) return;
    const u = [...services]; [u[i], u[i - 1]] = [u[i - 1], u[i]]; setServices(u);
  };
  const moveDown = (i: number) => {
    if (i === services.length - 1) return;
    const u = [...services]; [u[i], u[i + 1]] = [u[i + 1], u[i]]; setServices(u);
  };
  const change = (idx: number, f: keyof ServiceCard, v: string) => {
    const u = [...services]; u[idx] = { ...u[idx], [f]: v }; setServices(u);
  };
  const del = (idx: number) => {
    if (!confirm("Delete this service card?")) return;
    setServices(services.filter((_, i) => i !== idx));
  };
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSvc.titleEn.trim() || !newSvc.descEn.trim()) { toast("Fill in at least English title and description."); return; }
    setServices([...services, newSvc]);
    setNewSvc(blank);
  };

  if (!auth) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Services Hub</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage the <span className="font-semibold text-slate-700">&ldquo;Tailored Connectivity For Everyone&rdquo;</span> service cards on the homepage.</p>
        </div>
        {saved && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-lg">
            <Lucide.CheckCircle2 className="w-3.5 h-3.5" /> Saved!
          </span>
        )}
      </div>

      <form onSubmit={save} className="space-y-4">
        {/* Cards list */}
        {services.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400">
            <Lucide.LayoutGrid className="w-8 h-8 mb-2 opacity-40" />
            <p className="text-sm font-medium">No service cards yet</p>
          </div>
        ) : (
          services.map((svc, idx) => {
            const SvcIcon = (Lucide as unknown as Record<string, React.ElementType>)[svc.iconName] || Lucide.HelpCircle;
            return (
              <div key={idx} className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all">
                <div className="flex gap-4 items-start">
                  {/* Icon + order */}
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <IconPicker value={svc.iconName} onChange={(v) => change(idx, "iconName", v)} />
                    <div className="flex gap-1">
                      <button type="button" onClick={() => moveUp(idx)} disabled={idx === 0}
                        className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${idx === 0 ? "border-slate-100 text-slate-200 cursor-not-allowed" : "border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 cursor-pointer"}`} title="Move Up">
                        <Lucide.ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" onClick={() => moveDown(idx)} disabled={idx === services.length - 1}
                        className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${idx === services.length - 1 ? "border-slate-100 text-slate-200 cursor-not-allowed" : "border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 cursor-pointer"}`} title="Move Down">
                        <Lucide.ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span> English Title</label>
                      <input type="text" value={svc.titleEn} onChange={e => change(idx, "titleEn", e.target.value)} required
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block"></span> Bangla Title</label>
                      <input type="text" value={svc.titleBn} onChange={e => change(idx, "titleBn", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span> English Description</label>
                      <textarea value={svc.descEn} rows={3} onChange={e => change(idx, "descEn", e.target.value)} required
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none transition-all resize-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block"></span> Bangla Description</label>
                      <textarea value={svc.descBn} rows={3} onChange={e => change(idx, "descBn", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none transition-all resize-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block"></span> Badge (English)</label>
                      <input type="text" value={svc.badgeEn} onChange={e => change(idx, "badgeEn", e.target.value)} placeholder="e.g. Popular"
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block"></span> Badge (Bangla)</label>
                      <input type="text" value={svc.badgeBn} onChange={e => change(idx, "badgeBn", e.target.value)} placeholder="e.g. জনপ্রিয়"
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none transition-all" />
                    </div>
                  </div>

                  {/* Delete */}
                  <button type="button" onClick={() => del(idx)}
                    className="shrink-0 w-8 h-8 rounded-lg border border-slate-100 text-slate-300 hover:bg-red-50 hover:border-red-200 hover:text-red-500 flex items-center justify-center transition-all cursor-pointer opacity-0 group-hover:opacity-100" title="Delete">
                    <Lucide.X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Preview strip */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center">
                    <SvcIcon className="w-3.5 h-3.5 text-cyan-500" />
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium truncate">{svc.titleEn || "Untitled service"}</span>
                  {svc.badgeEn && <span className="ml-1 px-1.5 py-0.5 bg-cyan-50 border border-cyan-100 rounded text-[9px] font-bold text-cyan-600 uppercase tracking-wider">{svc.badgeEn}</span>}
                  <span className="ml-auto text-[10px] font-mono text-slate-300">#{idx + 1}</span>
                </div>
              </div>
            );
          })
        )}

        {/* Quick Add */}
        <div className="bg-gradient-to-br from-slate-50 to-white border-2 border-dashed border-slate-200 hover:border-blue-300 rounded-2xl p-5 space-y-4 transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-blue-500 flex items-center justify-center shadow-sm"><Lucide.Plus className="w-4 h-4 text-white" /></div>
            <div><p className="text-xs font-bold text-slate-800">Add Service Card</p><p className="text-[10px] text-slate-400">Fill fields then click append</p></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(["titleEn", "titleBn", "descEn", "descBn", "badgeEn", "badgeBn"] as (keyof ServiceCard)[]).map(f => {
              const isBn = f.endsWith("Bn");
              const isDesc = f.startsWith("desc");
              const isBadge = f.startsWith("badge");
              const labels: Record<string, string> = { titleEn: "English Title", titleBn: "Bangla Title", descEn: "English Description", descBn: "Bangla Description", badgeEn: "Badge (English)", badgeBn: "Badge (Bangla)" };
              const dots: Record<string, string> = { titleEn: "bg-blue-400", titleBn: "bg-orange-400", descEn: "bg-blue-400", descBn: "bg-orange-400", badgeEn: "bg-purple-400", badgeBn: "bg-purple-400" };
              return (
                <div key={f} className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${dots[f]} inline-block`}></span>{labels[f]}
                  </label>
                  {isDesc ? (
                    <textarea value={newSvc[f] as string} rows={3} onChange={e => setNewSvc({ ...newSvc, [f]: e.target.value })}
                      placeholder={isBn ? "বাংলায় লিখুন..." : "Enter description..."}
                      className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-400 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none transition-all resize-none" />
                  ) : (
                    <input type="text" value={newSvc[f] as string} onChange={e => setNewSvc({ ...newSvc, [f]: e.target.value })}
                      placeholder={isBadge ? (isBn ? "e.g. জনপ্রিয়" : "e.g. Popular") : (isBn ? "বাংলায় লিখুন..." : "Enter English...")}
                      className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-400 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none transition-all" />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Icon</label>
              <IconPicker value={newSvc.iconName} onChange={v => setNewSvc({ ...newSvc, iconName: v })} />
            </div>
            <button type="button" onClick={add}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-sm active:scale-[0.97]">
              <Lucide.Plus className="w-4 h-4" /> Append Card
            </button>
          </div>
        </div>

        {/* Save */}
        <div className="flex items-center gap-3 pt-1">
          <button type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all cursor-pointer shadow-md shadow-blue-500/25 active:scale-[0.98]">
            <Lucide.Save className="w-4 h-4" /> Save Configurations
          </button>
          {saved && <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1"><Lucide.CheckCircle2 className="w-3.5 h-3.5" /> Changes saved!</span>}
        </div>
      </form>
    </div>
  );
}
