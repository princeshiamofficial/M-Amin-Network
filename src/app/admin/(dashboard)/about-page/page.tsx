"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import * as Lucide from "lucide-react";

export interface Credential {
  keyEn: string;
  keyBn: string;
  valEn: string;
  valBn: string;
}

export interface InfraCard {
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  iconName: string;
}

export interface AboutContentFull {
  headerTitleEn: string;
  headerTitleBn: string;
  headerDescEn: string;
  headerDescBn: string;
  
  missionTitleEn: string;
  missionTitleBn: string;
  missionP1En: string;
  missionP1Bn: string;
  missionP2En: string;
  missionP2Bn: string;
  
  credTitleEn: string;
  credTitleBn: string;
  credentials: Credential[];
  
  infraTitleEn: string;
  infraTitleBn: string;
  infraDescEn: string;
  infraDescBn: string;
  infraCards: InfraCard[];
  
  integrityTitleEn: string;
  integrityTitleBn: string;
  integrityDescEn: string;
  integrityDescBn: string;
  btn1En: string;
  btn1Bn: string;
  btn2En: string;
  btn2Bn: string;
}

export const defaultAboutContentFull: AboutContentFull = {
  headerTitleEn: "About ",
  headerTitleBn: "আমাদের ",
  headerDescEn: "Discover our history, network infrastructure capabilities, and why we are South Keraniganj's most trusted broadband provider.",
  headerDescBn: "আমাদের ইতিহাস, নেটওয়ার্ক অবকাঠামোর সক্ষমতা এবং কেন আমরা দক্ষিণ কেরানীগঞ্জের সবচেয়ে বিশ্বস্ত ব্রডব্যান্ড প্রদানকারী তা জানুন।",
  
  missionTitleEn: "Our Mission",
  missionTitleBn: "আমাদের লক্ষ্য",
  missionP1En: "At M Amin Network, we believe high-speed, reliable internet is no longer a luxury—it is an essential utility for education, commerce, and communication. Since our inception, we have dedicated ourselves to bridging the digital divide in South Keraniganj by deploying pure, 100% optical fiber connections (FTTH) direct to homes and businesses.",
  missionP1Bn: "এম আমিন নেটওয়ার্কে আমরা বিশ্বাস করি উচ্চগতির ও নির্ভরযোগ্য ইন্টারনেট আর কোনো বিলাসিতা নয়—এটি শিক্ষা, ব্যবসা ও যোগাযোগের জন্য একটি অপরিহার্য সেবা। শুরু থেকেই আমরা দক্ষিণ কেরানীগঞ্জে শতভাগ অপটিক্যাল ফাইবার সংযোগ (FTTH) স্থাপনের মাধ্যমে ডিজিটাল ব্যবধান দূর করতে কাজ করে যাচ্ছি।",
  missionP2En: "Operating our own Autonomous System Number (AS150164), we peer directly with major local and global content exchanges. This infrastructure gives our subscribers latency-free access to remote work resources, streaming caches (Google GGC, Facebook FNA, Netflix OCA), and multiplayer gaming servers.",
  missionP2Bn: "আমাদের নিজস্ব স্বায়ত্তশাসিত সিস্টেম নম্বর (AS150164) পরিচালনা করে আমরা সরাসরি বড় লোকাল ও বৈশ্বিক কন্টেন্ট এক্সচেঞ্জের সাথে যুক্ত হয়েছি। এই অবকাঠামো আমাদের গ্রাহকদের রিমোট কাজ, স্ট্রিমিং ক্যাশ এবং মাল্টিপ্লেয়ার গেমিং সার্ভারে লেটেন্সি-মুক্ত অ্যাক্সেস প্রদান করে।",
  
  credTitleEn: "Key Credentials",
  credTitleBn: "মূল প্রমাণপত্র",
  credentials: [
    { keyEn: "License Authority", keyBn: "লাইসেন্স কর্তৃপক্ষ", valEn: "BTRC Bangladesh", valBn: "বিটিআরসি বাংলাদেশ" },
    { keyEn: "ISP Association Membership", keyBn: "আইএসপি অ্যাসোসিয়েশন সদস্যপদ", valEn: "ISPAB Active Member", valBn: "আইএসপিএবি সক্রিয় সদস্য" },
    { keyEn: "Autonomous System (ASN)", keyBn: "স্বায়ত্তশাসিত সিস্টেম (ASN)", valEn: "AS150164", valBn: "AS150164" },
    { keyEn: "Service Coverage", keyBn: "পরিষেবা এলাকা", valEn: "South Keraniganj, Dhaka", valBn: "দক্ষিণ কেরানীগঞ্জ, ঢাকা" },
    { keyEn: "Line Configuration", keyBn: "লাইন কনফিগারেশন", valEn: "100% Fiber (FTTH)", valBn: "১০০% ফাইবার (FTTH)" }
  ],
  
  infraTitleEn: "Infrastructure Powerhouse",
  infraTitleBn: "অবকাঠামোগত শক্তি",
  infraDescEn: "We leverage modern networking standards to maintain steady throughput, routing, and uptime.",
  infraDescBn: "আমরা অবিচ্ছিন্ন থ্রুপুট, রাউটিং এবং আপটাইম বজায় রাখতে আধুনিক নেটওয়ার্কিং স্ট্যান্ডার্ড ব্যবহার করি।",
  infraCards: [
    {
      titleEn: "BGP Multi-Homing Routing", titleBn: "বিজিপি মাল্টি-হোমিং রাউটিং",
      descEn: "By operating our own BGP network (AS150164), we peer with multiple major upstream Tier-1 network gateways. In the event of a fiber outage from one upstream gateway, our router automatically re-routes packets instantly.",
      descBn: "আমাদের নিজস্ব বিজিপি নেটওয়ার্ক (AS150164) পরিচালনা করে আমরা একাধিক আপস্ট্রিম টিয়ার-১ গেটওয়ের সাথে যুক্ত হয়েছি। কোনো একটি গেটওয়েতে বিভ্রাট দেখা দিলে আমাদের রাউটার তাৎক্ষণিকভাবে স্বয়ংক্রিয়ভাবে পথ পরিবর্তন করে।",
      iconName: "Network"
    },
    {
      titleEn: "Local Exchange Peering", titleBn: "লোকাল এক্সচেঞ্জ পিয়ারিং",
      descEn: "We route directly to Bangladesh Internet Exchange (BDIX) and various local hosting centers. Subscribing to M Amin Network gives you access of up to 100 Mbps to local databases, FTP streaming archives, and live TV portals.",
      descBn: "আমরা সরাসরি বাংলাদেশ ইন্টারনেট এক্সচেঞ্জ (BDIX) এবং বিভিন্ন লোকাল হোস্টিং সেন্টারে ট্রাফিক রাউট করি। এম আমিন নেটওয়ার্কে সাবস্ক্রাইব করলে আপনি লোকাল ডাটাবেস ও এফটিপিতে ১০০ এমবিপিএস পর্যন্ত স্পিড পাবেন।",
      iconName: "Database"
    },
    {
      titleEn: "24/7 On-Field Dispatch", titleBn: "২৪/৭ অন-ফিল্ড ডিসপ্যাচ",
      descEn: "Unlike major centralized ISPs, our support center is localized right inside South Keraniganj. Our field crews, splicing engineers, and technical support assistants are situated nearby to provide instant physical repair service.",
      descBn: "আমাদের সাপোর্ট সেন্টার দক্ষিণ কেরানীগঞ্জের ভেতরেই অবস্থিত। আমাদের অন-ফিল্ড টিম ও টেকনিশিয়ানরা যেকোনো শারীরিক ত্রুটি দ্রুত মেরামতের জন্য সবসময় প্রস্তুত থাকে।",
      iconName: "Wrench"
    }
  ],
  
  integrityTitleEn: "Our Integrity Guarantee",
  integrityTitleBn: "আমাদের সততার নিশ্চয়তা",
  integrityDescEn: "We adhere strictly to the guidelines and standards set forth by the Bangladesh Telecommunication Regulatory Commission (BTRC). We guarantee that you will receive the minimum committed bandwidth speeds as defined in your contract, with no hidden fair usage policies (FUP) or caps.",
  integrityDescBn: "আমরা বাংলাদেশ টেলিযোগাযোগ নিয়ন্ত্রণ কমিশন (বিটিআরসি)-এর গাইডলাইন কঠোরভাবে মেনে চলি। আমরা গ্যারান্টি দিচ্ছি যে আপনার চুক্তিতে নির্ধারিত গতি আপনি পাবেন, কোনো লুকানো ফেয়ার ইউজেজ পলিসি (FUP) বা ক্যাপ থাকবে না।",
  btn1En: "Explore Packages",
  btn1Bn: "প্যাকেজ সমূহ দেখুন",
  btn2En: "Support Center",
  btn2Bn: "সহায়তা কেন্দ্র"
};

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
  const [activeTab, setActiveTab] = useState("header");

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    const s = localStorage.getItem("m_amin_about_content_full");
    if (s) {
      try { setContent(JSON.parse(s)); } catch { /* ignore */ }
    } else {
      localStorage.setItem("m_amin_about_content_full", JSON.stringify(defaultAboutContentFull));
    }
  }, [router]);

  const save = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    localStorage.setItem("m_amin_about_content_full", JSON.stringify(content));
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
          <p className="text-sm text-slate-500 mt-0.5">Manage all text and translations for the About page.</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-lg">
              <Lucide.CheckCircle2 className="w-3.5 h-3.5" /> Saved!
            </span>
          )}
          <button onClick={save} className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all cursor-pointer shadow-md shadow-blue-500/25 active:scale-[0.98]">
            <Lucide.Save className="w-4 h-4" /> Save Content
          </button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-slate-200 pb-2">
        {["header", "mission", "credentials", "infrastructure", "integrity"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors capitalize ${activeTab === tab ? "bg-slate-800 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
        {activeTab === "header" && (
          <div className="space-y-6">
            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Header Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Title (English)</label>
                <input type="text" value={content.headerTitleEn} onChange={e => updateField("headerTitleEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Title (Bangla)</label>
                <input type="text" value={content.headerTitleBn} onChange={e => updateField("headerTitleBn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Description (English)</label>
                <textarea rows={2} value={content.headerDescEn} onChange={e => updateField("headerDescEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Description (Bangla)</label>
                <textarea rows={2} value={content.headerDescBn} onChange={e => updateField("headerDescBn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "mission" && (
          <div className="space-y-6">
            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Mission Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Title (English)</label>
                <input type="text" value={content.missionTitleEn} onChange={e => updateField("missionTitleEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Title (Bangla)</label>
                <input type="text" value={content.missionTitleBn} onChange={e => updateField("missionTitleBn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Paragraph 1 (English)</label>
                <textarea rows={4} value={content.missionP1En} onChange={e => updateField("missionP1En", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Paragraph 1 (Bangla)</label>
                <textarea rows={4} value={content.missionP1Bn} onChange={e => updateField("missionP1Bn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Paragraph 2 (English)</label>
                <textarea rows={4} value={content.missionP2En} onChange={e => updateField("missionP2En", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Paragraph 2 (Bangla)</label>
                <textarea rows={4} value={content.missionP2Bn} onChange={e => updateField("missionP2Bn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "credentials" && (
          <div className="space-y-6">
            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Credentials Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Title (English)</label>
                <input type="text" value={content.credTitleEn} onChange={e => updateField("credTitleEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Title (Bangla)</label>
                <input type="text" value={content.credTitleBn} onChange={e => updateField("credTitleBn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
            </div>
            
            <div className="space-y-3">
              {content.credentials.map((cred, i) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex gap-3 items-center">
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    <input type="text" placeholder="Key EN" value={cred.keyEn} onChange={e => { const c = [...content.credentials]; c[i].keyEn = e.target.value; updateField("credentials", c); }} className="px-3 py-2 text-xs border rounded-lg w-full" />
                    <input type="text" placeholder="Value EN" value={cred.valEn} onChange={e => { const c = [...content.credentials]; c[i].valEn = e.target.value; updateField("credentials", c); }} className="px-3 py-2 text-xs border rounded-lg w-full" />
                    <input type="text" placeholder="Key BN" value={cred.keyBn} onChange={e => { const c = [...content.credentials]; c[i].keyBn = e.target.value; updateField("credentials", c); }} className="px-3 py-2 text-xs border rounded-lg w-full" />
                    <input type="text" placeholder="Value BN" value={cred.valBn} onChange={e => { const c = [...content.credentials]; c[i].valBn = e.target.value; updateField("credentials", c); }} className="px-3 py-2 text-xs border rounded-lg w-full" />
                  </div>
                  <button onClick={() => updateField("credentials", content.credentials.filter((_, idx) => idx !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Lucide.X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button onClick={() => updateField("credentials", [...content.credentials, { keyEn: "", keyBn: "", valEn: "", valBn: "" }])} className="px-4 py-2 text-xs font-bold text-brand-blue bg-blue-50 hover:bg-blue-100 rounded-lg">
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
                <input type="text" value={content.infraTitleEn} onChange={e => updateField("infraTitleEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Title (Bangla)</label>
                <input type="text" value={content.infraTitleBn} onChange={e => updateField("infraTitleBn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Description (English)</label>
                <textarea rows={2} value={content.infraDescEn} onChange={e => updateField("infraDescEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Description (Bangla)</label>
                <textarea rows={2} value={content.infraDescBn} onChange={e => updateField("infraDescBn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
            </div>

            <div className="space-y-4">
              {content.infraCards.map((card, i) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex gap-4 items-start">
                  <IconPicker value={card.iconName} onChange={v => { const c = [...content.infraCards]; c[i].iconName = v; updateField("infraCards", c); }} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
                    <input type="text" placeholder="Title EN" value={card.titleEn} onChange={e => { const c = [...content.infraCards]; c[i].titleEn = e.target.value; updateField("infraCards", c); }} className="px-3 py-2 text-xs border rounded-lg w-full" />
                    <input type="text" placeholder="Title BN" value={card.titleBn} onChange={e => { const c = [...content.infraCards]; c[i].titleBn = e.target.value; updateField("infraCards", c); }} className="px-3 py-2 text-xs border rounded-lg w-full" />
                    <textarea rows={2} placeholder="Desc EN" value={card.descEn} onChange={e => { const c = [...content.infraCards]; c[i].descEn = e.target.value; updateField("infraCards", c); }} className="px-3 py-2 text-xs border rounded-lg w-full" />
                    <textarea rows={2} placeholder="Desc BN" value={card.descBn} onChange={e => { const c = [...content.infraCards]; c[i].descBn = e.target.value; updateField("infraCards", c); }} className="px-3 py-2 text-xs border rounded-lg w-full" />
                  </div>
                  <button onClick={() => updateField("infraCards", content.infraCards.filter((_, idx) => idx !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Lucide.X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button onClick={() => updateField("infraCards", [...content.infraCards, { titleEn: "", titleBn: "", descEn: "", descBn: "", iconName: "Network" }])} className="px-4 py-2 text-xs font-bold text-brand-blue bg-blue-50 hover:bg-blue-100 rounded-lg">
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
                <input type="text" value={content.integrityTitleEn} onChange={e => updateField("integrityTitleEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Title (Bangla)</label>
                <input type="text" value={content.integrityTitleBn} onChange={e => updateField("integrityTitleBn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Description (English)</label>
                <textarea rows={3} value={content.integrityDescEn} onChange={e => updateField("integrityDescEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Description (Bangla)</label>
                <textarea rows={3} value={content.integrityDescBn} onChange={e => updateField("integrityDescBn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Primary Button (English)</label>
                <input type="text" value={content.btn1En} onChange={e => updateField("btn1En", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Primary Button (Bangla)</label>
                <input type="text" value={content.btn1Bn} onChange={e => updateField("btn1Bn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Secondary Button (English)</label>
                <input type="text" value={content.btn2En} onChange={e => updateField("btn2En", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Secondary Button (Bangla)</label>
                <input type="text" value={content.btn2Bn} onChange={e => updateField("btn2Bn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
