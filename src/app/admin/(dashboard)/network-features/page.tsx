"use client";
import { toast } from "sonner";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import * as Lucide from "lucide-react";

interface NetworkFeature {
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  iconName: string;
}

const AVAILABLE_ICONS = [
  { value: "Zap", label: "Lightning" },
  { value: "Wifi", label: "Wireless" },
  { value: "Gamepad2", label: "Gaming" },
  { value: "LifeBuoy", label: "Support SLA" },
  { value: "Cloud", label: "BDIX & Cloud" },
  { value: "Building2", label: "Corporate" },
  { value: "Server", label: "FTP Server" },
  { value: "Activity", label: "Low Latency" },
  { value: "Shield", label: "Security" },
  { value: "Cpu", label: "High Speed Routing" },
  { value: "Globe", label: "Global WAN" },
  { value: "Download", label: "Downloads" },
  { value: "Upload", label: "Symmetric Speed" },
  { value: "PhoneCall", label: "Hotline Support" },
  { value: "Clock", label: "24/7 Service" },
  { value: "Network", label: "Fiber Backbone" },
  { value: "Radio", label: "Radio Link" },
  { value: "Cable", label: "Fiber Cable" },
  { value: "Tv", label: "IPTV Access" },
  { value: "Database", label: "Cache Database" },
  { value: "Gauge", label: "Speed Gauge" },
  { value: "HeartHandshake", label: "Trusted Partner" }
];

const defaultFeatures: NetworkFeature[] = [
  {
    titleEn: "100% Fiber Optic (FTTH)",
    titleBn: "১০০% ফাইবার অপটিক (FTTH)",
    descEn: "Pure optical fiber direct to your home. No copper line degradation, providing immune connectivity to atmospheric interference and electrical storms.",
    descBn: "সরাসরি আপনার বাসায় বিশুদ্ধ অপটিক্যাল ফাইবার। কোনো তামার তারের অবনতি নেই, যা বায়ুমণ্ডলীয় হস্তক্ষেপ ও বজ্রপাত থেকে নিরাপদ সংযোগ প্রদান করে।",
    iconName: "Zap"
  },
  {
    titleEn: "Dedicated BGP Routing",
    titleBn: "ডেডিকেটেড বিজিপি রাউটিং",
    descEn: "Operating AS150164 enables smart routing policies. We peer directly with BDIX, GGC (Google), SNA (Facebook), and major localized content delivery caches.",
    descBn: "AS150164 পরিচালনা আমাদের স্মার্ট রাউটিং পলিসি সক্ষম করে। আমরা সরাসরি BDIX, GGC (গুগল), SNA (ফেসবুক) এবং প্রধান লোকাল ক্যাশ সার্ভারের সাথে যুক্ত।",
    iconName: "Wifi"
  },
  {
    titleEn: "Low-Ping Gamer Optimizations",
    titleBn: "লো-পিং গেমার অপ্টিমাইজেশান",
    descEn: "Specialized low-latency paths to Southeast Asia and European servers (PUBG, Free Fire, CS2, Valorant). Zero packet loss, steady pings, and jitter control.",
    descBn: "দক্ষিণ-পূর্ব এশিয়া ও ইউরোপীয় সার্ভারে বিশেষায়িত লো-লেটেন্সি পাথ (PUBG, Free Fire, CS2, Valorant)। শূন্য প্যাকেট লস, স্থির পিং এবং জিটার কন্ট্রোল।",
    iconName: "Gamepad2"
  },
  {
    titleEn: "24/7 Priority SLA Support",
    titleBn: "২৪/৭ অগ্রাধিকার SLA সাপোর্ট",
    descEn: "No waiting for hours. Our localized support hub in South Keraniganj ensures our field technicians are dispatched to your home or office in record time.",
    descBn: "ঘণ্টার পর ঘণ্টা অপেক্ষা করতে হবে না। দক্ষিণ কেরানীগঞ্জে আমাদের লোকাল সাপোর্ট হাব নিশ্চিত করে যে আমাদের টেকনিশিয়ানরা রেকর্ড সময়ে আপনার বাসা বা অফিসে পৌঁছে যাবে।",
    iconName: "LifeBuoy"
  },
  {
    titleEn: "BDIX & Local FTP Access",
    titleBn: "BDIX ও লোকাল এফটিপি অ্যাক্সেস",
    descEn: "Get unlimited speeds of up to 100 Mbps to localized Bangladesh Internet Exchange (BDIX) resources, local FTP server movies, live TV, and games caches.",
    descBn: "বাংলাদেশ ইন্টারনেট এক্সচেঞ্জ (BDIX) রিসোর্স, লোকাল এফটিপি মুভি, লাইভ টিভি এবং গেম ক্যাশে ১০০ এমবিপিএস পর্যন্ত আনলিমিটেড স্পিড পান।",
    iconName: "Cloud"
  },
  {
    titleEn: "Corporate Dedicated Backup",
    titleBn: "কর্পোরেট ডেডিকেটেড ব্যাকআপ",
    descEn: "Dual backbones with auto-failover, ensuring continuous SLA-backed business operations. Static IPs, multi-router protocols, and direct client portal support.",
    descBn: "অটো-ফেইলওভার সহ ডুয়াল ব্যাকবোন, যা অব্যাহত SLA-সমর্থিত ব্যবসায়িক কার্যক্রম নিশ্চিত করে। স্ট্যাটিক আইপি এবং ডিরেক্ট ক্লায়েন্ট সাপোর্ট।",
    iconName: "Building2"
  }
];

// ─── Portal-based Icon Picker ──────────────────────────────────────────────────
interface IconPickerProps {
  value: string;
  onChange: (val: string) => void;
}

function IconPicker({ value, onChange }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const popW = 272;
    const popH = 210; // approx max height
    const margin = 12;

    // Horizontal: clamp so it doesn't overflow left or right
    const idealLeft = rect.left + rect.width / 2 - popW / 2;
    const left = Math.max(margin, Math.min(idealLeft, window.innerWidth - popW - margin));

    // Vertical: flip above if not enough space below
    const spaceBelow = window.innerHeight - rect.bottom;
    const openAbove = spaceBelow < popH + margin;

    setPopoverStyle({
      position: "fixed",
      top: openAbove ? rect.top - popH - 8 : rect.bottom + 8,
      left,
      width: popW,
      zIndex: 9999,
    });
  }, []);

  const openPicker = () => {
    updatePosition();
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!triggerRef.current?.contains(t) && !popoverRef.current?.contains(t)) {
        setIsOpen(false);
      }
    };
    const handleScroll = () => { updatePosition(); };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen, updatePosition]);

  const SelectedIcon = (Lucide as unknown as Record<string, React.ElementType>)[value] || Lucide.HelpCircle;

  return (
    <>
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={openPicker}
        title="Click to pick an icon"
        className="group w-12 h-12 rounded-xl border-2 border-slate-200 hover:border-blue-400 bg-white flex items-center justify-center transition-all duration-150 cursor-pointer shadow-sm active:scale-95"
      >
        <SelectedIcon className="w-5 h-5 text-blue-500 group-hover:text-blue-600 transition-colors" />
      </button>

      {/* Portal Popover */}
      {mounted && isOpen && createPortal(
        <div
          ref={popoverRef}
          style={popoverStyle}
          className="rounded-2xl bg-white border border-slate-200 shadow-2xl p-3 grid grid-cols-5 gap-2 max-h-52 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {AVAILABLE_ICONS.map((opt) => {
            const IconComponent = (Lucide as unknown as Record<string, React.ElementType>)[opt.value] || Lucide.HelpCircle;
            const isSelected = value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                title={opt.label}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-100 cursor-pointer border ${
                  isSelected
                    ? "bg-blue-500 border-blue-500 text-white shadow-md scale-105"
                    : "bg-slate-50 hover:bg-blue-50 border-slate-100 hover:border-blue-200 text-slate-500 hover:text-blue-600"
                }`}
              >
                <IconComponent className="w-4.5 h-4.5" />
              </button>
            );
          })}
        </div>,
        document.body
      )}
    </>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function NetworkFeaturesPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [features, setFeatures] = useState<NetworkFeature[]>(defaultFeatures);
  const [saved, setSaved] = useState(false);

  const [newFeature, setNewFeature] = useState<NetworkFeature>({
    titleEn: "",
    titleBn: "",
    descEn: "",
    descBn: "",
    iconName: "Zap"
  });

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    getSetting("m_amin_network_features").then(s => {
      if (s) setFeatures(s as any);
      else setSetting("m_amin_network_features", defaultFeatures as any);
    });
  }, [router]);

  const saveConfigurations = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetting("m_amin_network_features", features as any);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const moveUp = (i: number) => {
    if (i === 0) return;
    const u = [...features];
    [u[i], u[i - 1]] = [u[i - 1], u[i]];
    setFeatures(u);
  };

  const moveDown = (i: number) => {
    if (i === features.length - 1) return;
    const u = [...features];
    [u[i], u[i + 1]] = [u[i + 1], u[i]];
    setFeatures(u);
  };

  const handleFieldChange = (idx: number, field: keyof NetworkFeature, val: string) => {
    const u = [...features];
    u[idx] = { ...u[idx], [field]: val };
    setFeatures(u);
  };

  const deleteFeature = (idx: number) => {
    if (!confirm("Delete this feature card?")) return;
    setFeatures(features.filter((_, i) => i !== idx));
  };

  const addNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeature.titleEn.trim() || !newFeature.titleBn.trim() || !newFeature.descEn.trim() || !newFeature.descBn.trim()) {
      toast("Please fill in all fields.");
      return;
    }
    setFeatures([...features, newFeature]);
    setNewFeature({ titleEn: "", titleBn: "", descEn: "", descBn: "", iconName: "Zap" });
  };

  if (!auth) return null;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Network Features</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage the <span className="font-semibold text-slate-700">&ldquo;Why Choose M Amin?&rdquo;</span> feature cards shown on the homepage.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {saved && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-lg animate-in fade-in duration-300">
              <Lucide.CheckCircle2 className="w-3.5 h-3.5" /> Saved!
            </span>
          )}
        </div>
      </div>

      <form onSubmit={saveConfigurations} className="space-y-5">

        {/* Feature Cards — Modern card list (no table) */}
        <div className="space-y-3">
          {features.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400">
              <Lucide.LayoutGrid className="w-8 h-8 mb-2 opacity-40" />
              <p className="text-sm font-medium">No features yet</p>
              <p className="text-xs mt-0.5">Use the form below to add your first feature card</p>
            </div>
          ) : (
            features.map((feat, idx) => {
              const FeatIcon = (Lucide as unknown as Record<string, React.ElementType>)[feat.iconName] || Lucide.HelpCircle;
              return (
                <div key={idx} className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200">
                  <div className="flex gap-4 items-start">

                    {/* Icon picker */}
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <IconPicker
                        value={feat.iconName}
                        onChange={(val) => handleFieldChange(idx, "iconName", val)}
                      />
                      {/* Reorder arrows below icon */}
                      <div className="flex gap-1">
                        <button type="button" onClick={() => moveUp(idx)} disabled={idx === 0}
                          className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${idx === 0 ? "border-slate-100 text-slate-200 cursor-not-allowed" : "border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 cursor-pointer"}`}
                          title="Move Up">
                          <Lucide.ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button type="button" onClick={() => moveDown(idx)} disabled={idx === features.length - 1}
                          className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${idx === features.length - 1 ? "border-slate-100 text-slate-200 cursor-not-allowed" : "border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 cursor-pointer"}`}
                          title="Move Down">
                          <Lucide.ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Fields */}
                    <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Titles */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span> English Title
                        </label>
                        <input type="text" value={feat.titleEn}
                          onChange={(e) => handleFieldChange(idx, "titleEn", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none transition-all"
                          required />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block"></span> Bangla Title
                        </label>
                        <input type="text" value={feat.titleBn}
                          onChange={(e) => handleFieldChange(idx, "titleBn", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none transition-all"
                          required />
                      </div>
                      {/* Descriptions */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span> English Description
                        </label>
                        <textarea value={feat.descEn} rows={3}
                          onChange={(e) => handleFieldChange(idx, "descEn", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none transition-all resize-none"
                          required />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block"></span> Bangla Description
                        </label>
                        <textarea value={feat.descBn} rows={3}
                          onChange={(e) => handleFieldChange(idx, "descBn", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-400 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none transition-all resize-none"
                          required />
                      </div>
                    </div>

                    {/* Delete button */}
                    <button type="button" onClick={() => deleteFeature(idx)}
                      className="shrink-0 w-8 h-8 rounded-lg border border-slate-100 text-slate-300 hover:bg-red-50 hover:border-red-200 hover:text-red-500 flex items-center justify-center transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                      title="Delete">
                      <Lucide.X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Preview strip */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                      <FeatIcon className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium truncate">{feat.titleEn || "Untitled feature"}</span>
                    <span className="ml-auto text-[10px] font-mono text-slate-300">#{idx + 1}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Quick Add */}
        <div className="bg-gradient-to-br from-slate-50 to-white border-2 border-dashed border-slate-200 hover:border-blue-300 rounded-2xl p-5 space-y-4 transition-colors duration-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-blue-500 flex items-center justify-center shadow-sm">
              <Lucide.Plus className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Add Feature Card</p>
              <p className="text-[10px] text-slate-400">Fill all fields then click append</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span> English Title
              </label>
              <input type="text" value={newFeature.titleEn}
                onChange={(e) => setNewFeature({ ...newFeature, titleEn: e.target.value })}
                className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-400 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none transition-all"
                placeholder="e.g. Gig-Speed Network" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block"></span> Bangla Title
              </label>
              <input type="text" value={newFeature.titleBn}
                onChange={(e) => setNewFeature({ ...newFeature, titleBn: e.target.value })}
                className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-400 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none transition-all"
                placeholder="e.g. গিগ-স্পিড নেটওয়ার্ক" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span> English Description
              </label>
              <textarea value={newFeature.descEn} rows={3}
                onChange={(e) => setNewFeature({ ...newFeature, descEn: e.target.value })}
                className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-400 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none transition-all resize-none"
                placeholder="Enter English description..." />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block"></span> Bangla Description
              </label>
              <textarea value={newFeature.descBn} rows={3}
                onChange={(e) => setNewFeature({ ...newFeature, descBn: e.target.value })}
                className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-400 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none transition-all resize-none"
                placeholder="Enter Bangla description..." />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Icon</label>
              <IconPicker
                value={newFeature.iconName}
                onChange={(val) => setNewFeature({ ...newFeature, iconName: val })}
              />
            </div>
            <button type="button" onClick={addNewItem}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-900 active:bg-black text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-sm active:scale-[0.97]">
              <Lucide.Plus className="w-4 h-4" /> Append Feature
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-3 pt-1">
          <button type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl text-sm transition-all cursor-pointer shadow-md shadow-blue-500/25 active:scale-[0.98]">
            <Lucide.Save className="w-4 h-4" /> Save Configurations
          </button>
          {saved && (
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <Lucide.CheckCircle2 className="w-3.5 h-3.5" /> Changes saved successfully!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
