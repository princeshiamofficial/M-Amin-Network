"use client";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import * as Lucide from "lucide-react";

export interface PhoneEntry {
  labelEn: string;
  labelBn?: string;
  number: string;
}

export interface ContactContentFull {
  tagEn: string; tagBn?: string;
  titleEn: string; titleBn?: string;
  highlightEn: string; highlightBn?: string;
  descEn: string; descBn?: string;
  
  infoTitleEn: string; infoTitleBn?: string;
  
  officeTitleEn: string; officeTitleBn?: string;
  officeL1En: string; officeL1Bn?: string;
  officeL2En: string; officeL2Bn?: string;

  phoneTitleEn: string; phoneTitleBn?: string;
  phones: PhoneEntry[];

  emailTitleEn: string; emailTitleBn?: string;
  emailGenLabelEn: string; emailGenLabelBn?: string;
  emailGenAddr: string;
  emailOpsLabelEn: string; emailOpsLabelBn?: string;
  emailOpsAddr: string;

  mapEmbedUrl: string;

  formTitleEn: string; formTitleBn?: string;
  formDescEn: string; formDescBn?: string;
}

export const defaultContactContent: ContactContentFull = {
  tagEn: "Get In Touch",
  titleEn: "Contact ",
  highlightEn: "Our Team",
  descEn: "Have questions about coverage feasibility, pricing discounts, or corporate dedicated connections? Reach out to us directly or fill out the query form.",
  
  infoTitleEn: "Contact Information",
  
  officeTitleEn: "Corporate Office",
  officeL1En: "House No. 68, Kadomtoli, Aganagar,",
  officeL2En: "South Keraniganj, Dhaka-1310, Bangladesh.",

  phoneTitleEn: "Telephone Hotlines",
  phones: [
    { labelEn: "Residential Support:", number: "+880 1707-009267" },
    { labelEn: "Corporate Desk:", number: "+880 1707-009267" }
  ],

  emailTitleEn: "Email Correspondence",
  emailGenLabelEn: "General Queries:",
  emailGenAddr: "info@m-aminnetwork.com",
  emailOpsLabelEn: "Network Ops:",
  emailOpsAddr: "mibappy00@gmail.com",

  mapEmbedUrl: "https://maps.google.com/maps?q=M%20Amin%20Network,%20Dhaka&t=&z=16&ie=UTF8&iwloc=&output=embed",

  formTitleEn: "Send an Inquiry",
  formDescEn: "Fill out the form below and our operations support manager will follow up with you."
};

export default function ContactPageAdmin() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [content, setContent] = useState<ContactContentFull>(defaultContactContent);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("office");

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);

    getSetting("contact_content_full").then((s) => {
      if (s) {
        const item = Array.isArray(s) ? s[0] : s;
        if (item && typeof item === "object") {
          const parsed = item as unknown as ContactContentFull;
          if (!parsed.phones && (parsed as unknown as Record<string, string>).phoneResNum) {
            const legacy = parsed as unknown as Record<string, string>;
            parsed.phones = [
              { labelEn: legacy.phoneResLabelEn || "Residential Support:", labelBn: legacy.phoneResLabelBn || "", number: legacy.phoneResNum },
              { labelEn: legacy.phoneCorpLabelEn || "Corporate Desk:", labelBn: legacy.phoneCorpLabelBn || "", number: legacy.phoneCorpNum || "" }
            ];
          }
          setContent(parsed);
        }
      } else {
        setSetting("contact_content_full", defaultContactContent as unknown as Record<string, unknown>);
      }
    });
  }, [router]);

  const save = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const nextContent = { ...content };
    const fields = Object.keys(nextContent) as (keyof ContactContentFull)[];
    fields.forEach(key => {
      if (key.endsWith("En")) {
        const bnKey = key.replace(/En$/, "Bn") as keyof ContactContentFull;
        if (bnKey in nextContent) (nextContent as Record<string, unknown>)[bnKey] = (nextContent as Record<string, unknown>)[key];
      }
    });
    if (Array.isArray(nextContent.phones)) {
      nextContent.phones = nextContent.phones.map(p => ({
        ...p,
        labelBn: p.labelEn
      }));
    }
    await setSetting("contact_content_full", nextContent as unknown as Record<string, unknown>);
    if (typeof window !== "undefined") {
      localStorage.setItem("contact_content_full", JSON.stringify(nextContent));
    }
    setContent(nextContent);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateField = <K extends keyof ContactContentFull>(key: K, val: ContactContentFull[K]) => {
    setContent({ ...content, [key]: val });
  };

  if (!auth) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Contact Page Content</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage all text and contact details for the Contact page.</p>
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
        {["office", "phone", "email", "map & form"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors capitalize ${activeTab === tab ? "bg-slate-800 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">

        {activeTab === "office" && (
          <div className="space-y-6">
            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Office Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Block Title (English)</label>
                <input type="text" value={content.infoTitleEn} onChange={e => updateField("infoTitleEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Office Title (English)</label>
                <input type="text" value={content.officeTitleEn} onChange={e => updateField("officeTitleEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Line 1 (English)</label>
                <input type="text" value={content.officeL1En} onChange={e => updateField("officeL1En", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Line 2 (English)</label>
                <input type="text" value={content.officeL2En} onChange={e => updateField("officeL2En", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              
            </div>
          </div>
        )}

        {activeTab === "phone" && (
          <div className="space-y-6">
            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Telephone Hotlines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Block Title (English)</label>
                <input type="text" value={content.phoneTitleEn} onChange={e => updateField("phoneTitleEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              
            </div>

            <div className="space-y-3">
              {content.phones?.map((phone, i) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex gap-3 items-center">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
                    <input type="text" placeholder="Label EN" value={phone.labelEn} onChange={e => { const c = [...(content.phones || [])]; c[i].labelEn = e.target.value; updateField("phones", c as unknown as PhoneEntry[]); }} className="px-3 py-2 text-xs border border-slate-200 rounded-lg w-full bg-white" />
                    <input type="text" placeholder="Label BN" value={phone.labelBn} onChange={e => { const c = [...(content.phones || [])]; c[i].labelBn = e.target.value; updateField("phones", c as unknown as PhoneEntry[]); }} className="px-3 py-2 text-xs border border-slate-200 rounded-lg w-full bg-white" />
                    <input type="text" placeholder="Phone Number" value={phone.number} onChange={e => { const c = [...(content.phones || [])]; c[i].number = e.target.value; updateField("phones", c as unknown as PhoneEntry[]); }} className="px-3 py-2 text-xs border border-slate-200 rounded-lg w-full bg-white font-mono" />
                  </div>
                  <button onClick={() => updateField("phones", (content.phones || []).filter((_, idx) => idx !== i) as unknown as PhoneEntry[])} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Lucide.X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button onClick={() => updateField("phones", [...(content.phones || []), { labelEn: "", number: "" }] as unknown as PhoneEntry[])} className="px-4 py-2 text-xs font-bold text-brand-blue bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer">
                + Add Phone Number
              </button>
            </div>
          </div>
        )}

        {activeTab === "email" && (
          <div className="space-y-6">
            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Email Addresses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Title (English)</label>
                <input type="text" value={content.emailTitleEn} onChange={e => updateField("emailTitleEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">General Label (EN)</label>
                <input type="text" value={content.emailGenLabelEn} onChange={e => updateField("emailGenLabelEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">General Email</label>
                <input type="text" value={content.emailGenAddr} onChange={e => updateField("emailGenAddr", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-mono" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Ops Label (EN)</label>
                <input type="text" value={content.emailOpsLabelEn} onChange={e => updateField("emailOpsLabelEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Ops Email</label>
                <input type="text" value={content.emailOpsAddr} onChange={e => updateField("emailOpsAddr", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-mono" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "map & form" && (
          <div className="space-y-6">
            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Map Embed & Contact Form Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Google Map Iframe Embed URL</label>
                <input type="text" value={content.mapEmbedUrl} onChange={e => updateField("mapEmbedUrl", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-mono" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Form Title (English)</label>
                <input type="text" value={content.formTitleEn} onChange={e => updateField("formTitleEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Form Description (English)</label>
                <textarea rows={2} value={content.formDescEn} onChange={e => updateField("formDescEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

