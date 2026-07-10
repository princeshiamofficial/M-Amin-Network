"use client";
import React, { useState, useEffect } from "react";
import { setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import * as Lucide from "lucide-react";

export interface PhoneEntry {
  labelEn: string;
  labelBn: string;
  number: string;
}

export interface ContactContentFull {
  tagEn: string; tagBn: string;
  titleEn: string; titleBn: string;
  highlightEn: string; highlightBn: string;
  descEn: string; descBn: string;
  
  infoTitleEn: string; infoTitleBn: string;
  
  officeTitleEn: string; officeTitleBn: string;
  officeL1En: string; officeL1Bn: string;
  officeL2En: string; officeL2Bn: string;

  phoneTitleEn: string; phoneTitleBn: string;
  phones: PhoneEntry[];

  emailTitleEn: string; emailTitleBn: string;
  emailGenLabelEn: string; emailGenLabelBn: string;
  emailGenAddr: string;
  emailOpsLabelEn: string; emailOpsLabelBn: string;
  emailOpsAddr: string;

  mapEmbedUrl: string;

  formTitleEn: string; formTitleBn: string;
  formDescEn: string; formDescBn: string;
}

export const defaultContactContent: ContactContentFull = {
  tagEn: "Get In Touch", tagBn: "যোগাযোগ করুন",
  titleEn: "Contact ", titleBn: "আমাদের সাথে ",
  highlightEn: "Our Team", highlightBn: "যোগাযোগ",
  descEn: "Have questions about coverage feasibility, pricing discounts, or corporate dedicated connections? Reach out to us directly or fill out the query form.",
  descBn: "সংযোগের সম্ভাব্যতা যাচাই, বিশেষ ছাড় বা কর্পোরেট ডেডিকেটেড ইন্টারনেট সম্পর্কে কোনো জিজ্ঞাসা আছে? সরাসরি যোগাযোগ করুন অথবা নিচের ফর্মটি পূরণ করুন।",
  
  infoTitleEn: "Contact Information", infoTitleBn: "যোগাযোগের তথ্য",
  
  officeTitleEn: "Corporate Office", officeTitleBn: "প্রধান কার্যালয়",
  officeL1En: "House No. 68, Kadomtoli, Aganagar,", officeL1Bn: "বাসা নং ৬৮, কদমতলী, আগানগর,",
  officeL2En: "South Keraniganj, Dhaka-1310, Bangladesh.", officeL2Bn: "দক্ষিণ কেরানীগঞ্জ, ঢাকা-১৩১০, বাংলাদেশ।",

  phoneTitleEn: "Telephone Hotlines", phoneTitleBn: "হটলাইন নম্বরসমূহ",
  phones: [
    { labelEn: "Residential Support:", labelBn: "গ্রাহক সেবা:", number: "+880 1707-009267" },
    { labelEn: "Corporate Desk:", labelBn: "কর্পোরেট ডেস্ক:", number: "+880 1707-009267" }
  ],

  emailTitleEn: "Email Correspondence", emailTitleBn: "ইমেইল যোগাযোগ",
  emailGenLabelEn: "General Queries:", emailGenLabelBn: "সাধারণ জিজ্ঞাসা:",
  emailGenAddr: "info@m-aminnetwork.com",
  emailOpsLabelEn: "Network Ops:", emailOpsLabelBn: "নেটওয়ার্ক অপস:",
  emailOpsAddr: "mibappy00@gmail.com",

  mapEmbedUrl: "https://maps.google.com/maps?q=M%20Amin%20Network,%20Dhaka&t=&z=16&ie=UTF8&iwloc=&output=embed",

  formTitleEn: "Send an Inquiry", formTitleBn: "অনুসন্ধান জানান",
  formDescEn: "Fill out the form below and our operations support manager will follow up with you.",
  formDescBn: "নিচের ফর্মটি পূরণ করুন এবং আমাদের অপারেশন ম্যানেজার আপনার সাথে যোগাযোগ করবেন।"
};

export default function ContactPageAdmin() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [content, setContent] = useState<ContactContentFull>(defaultContactContent);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("header");

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    const s = localStorage.getItem("m_amin_contact_content_full");
    if (s) {
      try { 
        const parsed = JSON.parse(s);
        // Migration for older schema to phones array
        if (!parsed.phones && parsed.phoneResNum) {
          parsed.phones = [
            { labelEn: parsed.phoneResLabelEn || "Residential Support:", labelBn: parsed.phoneResLabelBn || "গ্রাহক সেবা:", number: parsed.phoneResNum },
            { labelEn: parsed.phoneCorpLabelEn || "Corporate Desk:", labelBn: parsed.phoneCorpLabelBn || "কর্পোরেট ডেস্ক:", number: parsed.phoneCorpNum || "" }
          ];
        }
        setContent(parsed); 
      } catch { /* ignore */ }
    } else {
      setSetting("m_amin_contact_content_full", defaultContactContent as unknown);
    }
  }, [router]);

  const save = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSetting("m_amin_contact_content_full", content as unknown);
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
        {["header", "office", "phone", "email", "map & form"].map((tab) => (
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
                <label className="text-xs font-bold text-slate-700">Tag (English)</label>
                <input type="text" value={content.tagEn} onChange={e => updateField("tagEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Tag (Bangla)</label>
                <input type="text" value={content.tagBn} onChange={e => updateField("tagBn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Title (English)</label>
                <input type="text" value={content.titleEn} onChange={e => updateField("titleEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Title (Bangla)</label>
                <input type="text" value={content.titleBn} onChange={e => updateField("titleBn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Highlight Text (English)</label>
                <input type="text" value={content.highlightEn} onChange={e => updateField("highlightEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Highlight Text (Bangla)</label>
                <input type="text" value={content.highlightBn} onChange={e => updateField("highlightBn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Description (English)</label>
                <textarea rows={2} value={content.descEn} onChange={e => updateField("descEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Description (Bangla)</label>
                <textarea rows={2} value={content.descBn} onChange={e => updateField("descBn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "office" && (
          <div className="space-y-6">
            <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Office Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Block Title (English)</label>
                <input type="text" value={content.infoTitleEn} onChange={e => updateField("infoTitleEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Block Title (Bangla)</label>
                <input type="text" value={content.infoTitleBn} onChange={e => updateField("infoTitleBn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Office Title (English)</label>
                <input type="text" value={content.officeTitleEn} onChange={e => updateField("officeTitleEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Office Title (Bangla)</label>
                <input type="text" value={content.officeTitleBn} onChange={e => updateField("officeTitleBn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Line 1 (English)</label>
                <input type="text" value={content.officeL1En} onChange={e => updateField("officeL1En", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Line 1 (Bangla)</label>
                <input type="text" value={content.officeL1Bn} onChange={e => updateField("officeL1Bn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Line 2 (English)</label>
                <input type="text" value={content.officeL2En} onChange={e => updateField("officeL2En", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Line 2 (Bangla)</label>
                <input type="text" value={content.officeL2Bn} onChange={e => updateField("officeL2Bn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
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
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Block Title (Bangla)</label>
                <input type="text" value={content.phoneTitleBn} onChange={e => updateField("phoneTitleBn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
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
              <button onClick={() => updateField("phones", [...(content.phones || []), { labelEn: "", labelBn: "", number: "" }] as unknown as PhoneEntry[])} className="px-4 py-2 text-xs font-bold text-brand-blue bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer">
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
                <label className="text-xs font-bold text-slate-700">Title (Bangla)</label>
                <input type="text" value={content.emailTitleBn} onChange={e => updateField("emailTitleBn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">General Label (EN)</label>
                <input type="text" value={content.emailGenLabelEn} onChange={e => updateField("emailGenLabelEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">General Label (BN)</label>
                <input type="text" value={content.emailGenLabelBn} onChange={e => updateField("emailGenLabelBn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">General Email</label>
                <input type="text" value={content.emailGenAddr} onChange={e => updateField("emailGenAddr", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-mono" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Ops Label (EN)</label>
                <input type="text" value={content.emailOpsLabelEn} onChange={e => updateField("emailOpsLabelEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Ops Label (BN)</label>
                <input type="text" value={content.emailOpsLabelBn} onChange={e => updateField("emailOpsLabelBn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
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
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Form Title (Bangla)</label>
                <input type="text" value={content.formTitleBn} onChange={e => updateField("formTitleBn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Form Description (English)</label>
                <textarea rows={2} value={content.formDescEn} onChange={e => updateField("formDescEn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Form Description (Bangla)</label>
                <textarea rows={2} value={content.formDescBn} onChange={e => updateField("formDescBn", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
