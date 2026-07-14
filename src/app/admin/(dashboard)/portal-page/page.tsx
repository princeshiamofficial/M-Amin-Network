"use client";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import * as Lucide from "lucide-react";

export interface PortalPageContent {
  str1En: string; str1Bn: string;
  str2En: string; str2Bn: string;
  str3En: string; str3Bn: string;
  str4En: string; str4Bn: string;
  str5En: string; str5Bn: string;
  str6En: string; str6Bn: string;
  str7En: string; str7Bn: string;
  str8En: string; str8Bn: string;
  str9En: string; str9Bn: string;
  str10En: string; str10Bn: string;
  str11En: string; str11Bn: string;
  str12En: string; str12Bn: string;
  str13En: string; str13Bn: string;
  str14En: string; str14Bn: string;
  str15En: string; str15Bn: string;
  str16En: string; str16Bn: string;
  str17En: string; str17Bn: string;
  str18En: string; str18Bn: string;
  str19En: string; str19Bn: string;
  str20En: string; str20Bn: string;
  str21En: string; str21Bn: string;
  str22En: string; str22Bn: string;
  str23En: string; str23Bn: string;
  str24En: string; str24Bn: string;
  str25En: string; str25Bn: string;
  str26En: string; str26Bn: string;
  str27En: string; str27Bn: string;
  str28En: string; str28Bn: string;
  str29En: string; str29Bn: string;
  str30En: string; str30Bn: string;
  str31En: string; str31Bn: string;
  str32En: string; str32Bn: string;
  str33En: string; str33Bn: string;
  str34En: string; str34Bn: string;
  str35En: string; str35Bn: string;
  str36En: string; str36Bn: string;
  str37En: string; str37Bn: string;
  str38En: string; str38Bn: string;
  str39En: string; str39Bn: string;
  str40En: string; str40Bn: string;
  str41En: string; str41Bn: string;
  str42En: string; str42Bn: string;
  str43En: string; str43Bn: string;
  str44En: string; str44Bn: string;
  str45En: string; str45Bn: string;
  str46En: string; str46Bn: string;
  str47En: string; str47Bn: string;
  str48En: string; str48Bn: string;
  str49En: string; str49Bn: string;
  str50En: string; str50Bn: string;
  str51En: string; str51Bn: string;
  str52En: string; str52Bn: string;
  str53En: string; str53Bn: string;
  str54En: string; str54Bn: string;
  str55En: string; str55Bn: string;
  str56En: string; str56Bn: string;
  str57En: string; str57Bn: string;
}


export const defaultPortalPageContent: PortalPageContent = {
  str1En: "Home Standard", str1Bn: "হোম স্ট্যান্ডার্ড",
  str2En: "Gamer Professional", str2Bn: "গেমার প্রফেশনাল",
  str3En: "Home Elite", str3Bn: "হোম এলিট",
  str4En: "Upgraded Pack", str4Bn: "আপগ্রেডকৃত প্যাক",
  str5En: "Active", str5Bn: "সচল",
  str6En: "Expired", str6Bn: "মেয়াদোত্তীর্ণ",
  str7En: "Suspended", str7Bn: "স্থগিত",
  str8En: "Days", str8Bn: "দিন",
  str9En: "Hours", str9Bn: "ঘণ্টা",
  str10En: "July", str10Bn: "জুলাই",
  str11En: "M. Amin Network Subscriber", str11Bn: "এম. আমিন নেটওয়ার্ক গ্রাহক",
  str12En: "Invalid Client ID. (Try 'MAN-5432' or 'MAN-9988')", str12Bn: "ভুল ক্লায়েন্ট আইডি। ('MAN-5432' বা 'MAN-9988' লিখুন)",
  str13En: "Client Self-Care", str13Bn: "গ্রাহক সেলফ-কেয়ার",
  str14En: "Enter your subscription credentials to manage your line", str14Bn: "আপনার সংযোগ পরিচালনা করতে আইডি ও পাসওয়ার্ড লিখুন",
  str15En: "Client ID", str15Bn: "ক্লায়েন্ট আইডি",
  str16En: "Portal Password", str16Bn: "পোর্টাল পাসওয়ার্ড",
  str17En: "Authenticating Subscriber...", str17Bn: "যাচাই করা হচ্ছে...",
  str18En: "Access Client Dashboard", str18Bn: "ড্যাশবোর্ডে প্রবেশ করুন",
  str19En: "Forget your password or looking for Client ID? Contact our support desk at +8801707009267", str19Bn: "পাসওয়ার্ড ভুলে গেছেন বা ক্লায়েন্ট আইডি খুঁজছেন? আমাদের সাপোর্ট ডেস্কে যোগাযোগ করুন: +৮৮০১৭০৭০০৯২৬৭",
  str20En: "Log Out", str20Bn: "লগ আউট",
  str21En: "Allocated Bandwidth", str21Bn: "বরাদ্দকৃত ব্যান্ডউইথ",
  str22En: "Speed Target", str22Bn: "স্পিড টার্গেট",
  str23En: "ONT Optical Power", str23Bn: "ওএনটি অপটিক্যাল পাওয়ার",
  str24En: "Healthy range: -15 to -25 dBm", str24Bn: "স্বাভাবিক সীমা: -১৫ থেকে -২৫ dBm",
  str25En: "Signal Status", str25Bn: "সিগন্যাল অবস্থা",
  str26En: "Line Connection Uptime", str26Bn: "সংযোগের আপটাইম",
  str27En: "BGP Auto-Re-routing enabled", str27Bn: "বিজিপি অটো-রি-রাউটিং সক্রিয়",
  str28En: "Uptime", str28Bn: "আপটাইম",
  str29En: "Billing Invoice Dues", str29Bn: "বকেয়া বিল ও ইনভয়েস",
  str30En: "Paid in Full", str30Bn: "সম্পূর্ণ পরিশোধিত",
  str31En: "Next cycle due:", str31Bn: "পরবর্তী বিলের তারিখ:",
  str32En: "Invoice status", str32Bn: "ইনভয়েস অবস্থা",
  str33En: "Real-Time Bandwidth Usage", str33Bn: "রিয়েল-টাইম ব্যান্ডউইথ ব্যবহার",
  str34En: "Live throughput graphs updating every 2 seconds", str34Bn: "প্রতি ২ সেকেন্ড পর পর গ্রাফ আপডেট হচ্ছে",
  str35En: "Download:", str35Bn: "ডাউনলোড:",
  str36En: "Upload:", str36Bn: "আপলোড:",
  str37En: "Peak Cap", str37Bn: "সর্বোচ্চ ক্যাপ",
  str38En: "Median", str38Bn: "গড়",
  str39En: "Idle", str39Bn: "নিষ্ক্রিয়",
  str40En: "Direct Peering: Google GGC, Facebook FNA, BDIX, Torrents Caches", str40Bn: "সরাসরি পিয়ারিং: গুগল জিজিসি, ফেসবুক এফএনএ, বিডিআইএক্স, টরেন্ট ক্যাশ",
  str41En: "AS150164 BGP Uplink", str41Bn: "AS150164 বিজিপি আপলিংক",
  str42En: "Payment Overdue", str42Bn: "বকেয়া পেমেন্ট",
  str43En: "An invoice of", str43Bn: "এই সাইকেলে আপনার",
  str44En: "remains unpaid for this cycle.", str44Bn: "বকেয়া রয়েছে যা এখনো পরিশোধ করা হয়নি।",
  str45En: "Quick Pay Bill", str45Bn: "দ্রুত বিল পরিশোধ",
  str46En: "Speed Upgrade Center", str46Bn: "স্পিড আপগ্রেড কেন্দ্র",
  str47En: "Select a target package speed to dynamically request line profile updates.", str47Bn: "সংযোগের গতি তাৎক্ষণিকভাবে বৃদ্ধি করতে কাঙ্ক্ষিত স্পিড নির্বাচন করুন।",
  str48En: "Choose Speed", str48Bn: "স্পিড নির্বাচন করুন",
  str49En: "30 Mbps Gamer (৳1000/mo)", str49Bn: "৩০ এমবিপিএস গেমার (৳১০০০/মাস)",
  str50En: "50 Mbps Ultra (৳1500/mo)", str50Bn: "৫০ এমবিপিএস আল্ট্রা (৳১৫০০/মাস)",
  str51En: "60 Mbps Gamer Pro (৳1800/mo)", str51Bn: "৬০ এমবিপিএস গেমার প্রো (৳১৮০০/মাস)",
  str52En: "100 Mbps SOHO (৳2500/mo)", str52Bn: "১০০ এমবিপিএস SOHO (৳২৫০০/মাস)",
  str53En: "Upgrading Port Speed...", str53Bn: "পোর্ট স্পিড আপগ্রেড করা হচ্ছে...",
  str54En: "Request Speed Upgrade", str54Bn: "আপগ্রেডের অনুরোধ দিন",
  str55En: "Port Speed Updated!", str55Bn: "পোর্ট স্পিড সফলভাবে বৃদ্ধি হয়েছে!",
  str56En: "Line speed successfully provisioned to", str56Bn: "সংযোগের গতি সফলভাবে বৃদ্ধি পেয়ে দাঁড়িয়েছে:",
  str57En: "OK", str57Bn: "ঠিক আছে",
};



export default function PortalPageAdmin() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [content, setContent] = useState<PortalPageContent>(defaultPortalPageContent);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    getSetting("portal_page_content").then(s => {
      if (s) setContent(s as unknown as PortalPageContent);
      else setSetting("portal_page_content", defaultPortalPageContent as unknown as Record<string, unknown>);
    });
  }, [router]);

  const save = async () => {
    setSetting("portal_page_content", content as unknown as Record<string, unknown>);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateField = <K extends keyof PortalPageContent>(key: K, val: PortalPageContent[K]) => {
    setContent({ ...content, [key]: val });
  };

  if (!auth) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Self-Care Portal Page Content</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage all static text content dynamically.</p>
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

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-4 max-h-[70vh] overflow-y-auto">
        
          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 1</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str1En} onChange={e => updateField("str1En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str1Bn} onChange={e => updateField("str1Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 2</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str2En} onChange={e => updateField("str2En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str2Bn} onChange={e => updateField("str2Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 3</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str3En} onChange={e => updateField("str3En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str3Bn} onChange={e => updateField("str3Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 4</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str4En} onChange={e => updateField("str4En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str4Bn} onChange={e => updateField("str4Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 5</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str5En} onChange={e => updateField("str5En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str5Bn} onChange={e => updateField("str5Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 6</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str6En} onChange={e => updateField("str6En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str6Bn} onChange={e => updateField("str6Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 7</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str7En} onChange={e => updateField("str7En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str7Bn} onChange={e => updateField("str7Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 8</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str8En} onChange={e => updateField("str8En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str8Bn} onChange={e => updateField("str8Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 9</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str9En} onChange={e => updateField("str9En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str9Bn} onChange={e => updateField("str9Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 10</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str10En} onChange={e => updateField("str10En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str10Bn} onChange={e => updateField("str10Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 11</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str11En} onChange={e => updateField("str11En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str11Bn} onChange={e => updateField("str11Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 12</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str12En} onChange={e => updateField("str12En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str12Bn} onChange={e => updateField("str12Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 13</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str13En} onChange={e => updateField("str13En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str13Bn} onChange={e => updateField("str13Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 14</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str14En} onChange={e => updateField("str14En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str14Bn} onChange={e => updateField("str14Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 15</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str15En} onChange={e => updateField("str15En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str15Bn} onChange={e => updateField("str15Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 16</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str16En} onChange={e => updateField("str16En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str16Bn} onChange={e => updateField("str16Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 17</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str17En} onChange={e => updateField("str17En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str17Bn} onChange={e => updateField("str17Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 18</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str18En} onChange={e => updateField("str18En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str18Bn} onChange={e => updateField("str18Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 19</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str19En} onChange={e => updateField("str19En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str19Bn} onChange={e => updateField("str19Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 20</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str20En} onChange={e => updateField("str20En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str20Bn} onChange={e => updateField("str20Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 21</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str21En} onChange={e => updateField("str21En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str21Bn} onChange={e => updateField("str21Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 22</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str22En} onChange={e => updateField("str22En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str22Bn} onChange={e => updateField("str22Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 23</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str23En} onChange={e => updateField("str23En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str23Bn} onChange={e => updateField("str23Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 24</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str24En} onChange={e => updateField("str24En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str24Bn} onChange={e => updateField("str24Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 25</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str25En} onChange={e => updateField("str25En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str25Bn} onChange={e => updateField("str25Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 26</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str26En} onChange={e => updateField("str26En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str26Bn} onChange={e => updateField("str26Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 27</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str27En} onChange={e => updateField("str27En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str27Bn} onChange={e => updateField("str27Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 28</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str28En} onChange={e => updateField("str28En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str28Bn} onChange={e => updateField("str28Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 29</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str29En} onChange={e => updateField("str29En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str29Bn} onChange={e => updateField("str29Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 30</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str30En} onChange={e => updateField("str30En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str30Bn} onChange={e => updateField("str30Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 31</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str31En} onChange={e => updateField("str31En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str31Bn} onChange={e => updateField("str31Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 32</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str32En} onChange={e => updateField("str32En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str32Bn} onChange={e => updateField("str32Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 33</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str33En} onChange={e => updateField("str33En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str33Bn} onChange={e => updateField("str33Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 34</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str34En} onChange={e => updateField("str34En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str34Bn} onChange={e => updateField("str34Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 35</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str35En} onChange={e => updateField("str35En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str35Bn} onChange={e => updateField("str35Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 36</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str36En} onChange={e => updateField("str36En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str36Bn} onChange={e => updateField("str36Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 37</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str37En} onChange={e => updateField("str37En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str37Bn} onChange={e => updateField("str37Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 38</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str38En} onChange={e => updateField("str38En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str38Bn} onChange={e => updateField("str38Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 39</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str39En} onChange={e => updateField("str39En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str39Bn} onChange={e => updateField("str39Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 40</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str40En} onChange={e => updateField("str40En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str40Bn} onChange={e => updateField("str40Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 41</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str41En} onChange={e => updateField("str41En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str41Bn} onChange={e => updateField("str41Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 42</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str42En} onChange={e => updateField("str42En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str42Bn} onChange={e => updateField("str42Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 43</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str43En} onChange={e => updateField("str43En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str43Bn} onChange={e => updateField("str43Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 44</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str44En} onChange={e => updateField("str44En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str44Bn} onChange={e => updateField("str44Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 45</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str45En} onChange={e => updateField("str45En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str45Bn} onChange={e => updateField("str45Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 46</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str46En} onChange={e => updateField("str46En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str46Bn} onChange={e => updateField("str46Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 47</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str47En} onChange={e => updateField("str47En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str47Bn} onChange={e => updateField("str47Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 48</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str48En} onChange={e => updateField("str48En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str48Bn} onChange={e => updateField("str48Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 49</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str49En} onChange={e => updateField("str49En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str49Bn} onChange={e => updateField("str49Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 50</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str50En} onChange={e => updateField("str50En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str50Bn} onChange={e => updateField("str50Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 51</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str51En} onChange={e => updateField("str51En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str51Bn} onChange={e => updateField("str51Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 52</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str52En} onChange={e => updateField("str52En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str52Bn} onChange={e => updateField("str52Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 53</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str53En} onChange={e => updateField("str53En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str53Bn} onChange={e => updateField("str53Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 54</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str54En} onChange={e => updateField("str54En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str54Bn} onChange={e => updateField("str54Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 55</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str55En} onChange={e => updateField("str55En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str55Bn} onChange={e => updateField("str55Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 56</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str56En} onChange={e => updateField("str56En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str56Bn} onChange={e => updateField("str56Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 57</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str57En} onChange={e => updateField("str57En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Bangla Text</label>
                <input type="text" value={content.str57Bn} onChange={e => updateField("str57Bn", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
              </div>
            </div>
          </div>

      </div>
    </div>
  );
}

