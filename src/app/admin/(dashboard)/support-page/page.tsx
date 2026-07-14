"use client";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import * as Lucide from "lucide-react";

export interface SupportPageContent {
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
}


export const defaultSupportPageContent: SupportPageContent = {
  str1En: "Speed Drop / Sluggish Internet", str1Bn: "ধীরগতির ইন্টারনেট / স্পিড কম",
  str2En: "Frequent Disconnections", str2Bn: "বারবার ডিসকানেক্ট হওয়া",
  str3En: "Billing / Invoice Query", str3Bn: "বিল বা চালান সংক্রান্ত জিজ্ঞাসা",
  str4En: "Physical Cable / Fiber line broken", str4Bn: "ফাইবার অপটিক তার কেটে যাওয়া",
  str5En: "Other / Configuration support", str5Bn: "অন্যান্য / রাউটার কনফিগারেশন সাপোর্ট",
  str6En: "How can I pay my M Amin Network monthly broadband bill?", str6Bn: "আমি কীভাবে আমার এম আমিন নেটওয়ার্কের মাসিক ব্রডব্যান্ড বিল পরিশোধ করতে পারি?",
  str7En: "You can pay your bill securely online via our Quick Pay portal using bKash, Nagad, Rocket, or Visa/Mastercard. You can also pay by visiting our office in Kadomtoli, or request a cash collection representative (for specific packages).", str7Bn: "আপনি বিকাশ, নগদ, রকেট বা ভিসা/মাস্টারকার্ড ব্যবহার করে আমাদের কুইক পে পোর্টালের মাধ্যমে নিরাপদে অনলাইনে বিল পরিশোধ করতে পারেন। কদমতলীতে আমাদের অফিসে এসেও বিল দিতে পারেন অথবা ক্যাশ কালেকশন প্রতিনিধির অনুরোধ করতে পারেন।",
  str8En: "What should I do if my internet connection is slow?", str8Bn: "আমার ইন্টারনেট সংযোগ ধীরগতির হলে আমার কী করা উচিত?",
  str9En: "First, reboot your optical ONU (small black box) and Wi-Fi router by turning them off for 30 seconds. Check if there are background downloads running on other devices. You can also run our diagnostics test above to inspect the status of your fiber line signal.", str9Bn: "প্রথমে আপনার অপটিক্যাল ওএনইউ (ছোট কালো বক্স) এবং ওয়াই-ফাই রাউটারটি ৩০ সেকেন্ডের জন্য বন্ধ করে পুনরায় চালু করুন। অন্যান্য ডিভাইসে ব্যাকগ্রাউন্ড ডাউনলোড চলছে কিনা তা পরীক্ষা করুন। লাইন সিগন্যাল পরীক্ষা করতে উপরে আমাদের ডায়াগনস্টিকস টেস্ট চালাতে পারেন।",
  str10En: "Can I request a Static Public IP for server hosting or gaming?", str10Bn: "আমি কি সার্ভার হোস্টিং বা গেমিংয়ের জন্য স্ট্যাটিক পাবলিক আইপির জন্য অনুরোধ করতে পারি?",
  str11En: "Yes! Static Public IP addresses are available. They are included free of charge with all Gamer Professional, Gamer Champion, and Corporate Dedicated packages. For home packages, you can purchase a static IP for a nominal charge of ৳150/month. Contact support to activate.", str11Bn: "হ্যাঁ! স্ট্যাটিক পাবলিক আইপি উপলব্ধ রয়েছে। এটি আমাদের গেমার ও কর্পোরেট প্যাকেজগুলোর সাথে বিনামূল্যে দেওয়া হয়। হোম প্যাকেজের জন্য প্রতি মাসে মাত্র ৳১৫০ ফি দিয়ে আপনি এটি সচল করতে পারেন।",
  str12En: "What does the AS150164 BGP network mean for my connection?", str12Bn: "AS150164 বিজিপি নেটওয়ার্ক আমার সংযোগের জন্য কী সুবিধা নিয়ে আসে?",
  str13En: "Having our own Autonomous System (AS150164) and Border Gateway Protocol routing means we have direct routing lines to international gateways. In case of an upstream fiber cut, our network automatically switches to backup routing paths, guaranteeing uninterrupted uptime.", str13Bn: "আমাদের নিজস্ব স্বায়ত্তশাসিত সিস্টেম (AS150164) and বিজিপি রাউটিং থাকার মানে হলো আন্তর্জাতিক গেটওয়ের সাথে আমাদের সরাসরি রুট রয়েছে। মূল লাইনে ত্রুটি দেখা দিলে আমাদের নেটওয়ার্ক ব্যাকআপ পাথে স্যুইচ করে গ্রাহকের নিরবচ্ছিন্ন সংযোগ নিশ্চিত করে।",
  str14En: "How long does it take to repair a broken physical fiber cable?", str14Bn: "একটি কাটা ফাইবার ক্যাবল মেরামত করতে কত সময় লাগে?",
  str15En: "Our South Keraniganj field maintenance team operates 24/7. Physical line breaks caused by construction or weather are typically patched and re-spliced within 2 to 4 hours from the ticket report time.", str15Bn: "আমাদের দক্ষিণ কেরানীগঞ্জের ফিল্ড টিম ২৪/৭ নিয়োজিত রয়েছে। ঝড়-বৃষ্টি বা উন্নয়ন কাজের কারণে ক্যাবল কেটে গেলে অভিযোগ পাওয়ার ২ থেকে ৪ ঘণ্টার মধ্যে তা মেরামত সম্পন্ন করা হয়।",
  str16En: "Querying BGP AS150164 routing tables...", str16Bn: "BGP AS150164 রাউটিং টেবিল অনুসন্ধান করা হচ্ছে...",
  str17En: "Peering with localized gateway nodes...", str17Bn: "স্থানীয় গেটওয়ে নোড সংযোগ করা হচ্ছে...",
  str18En: "Analyzing optical signal strength (SFP Power)...", str18Bn: "অপটিক্যাল সিগন্যাল পাওয়ার বিশ্লেষণ করা হচ্ছে...",
  str19En: "Pinging customer optical network terminal (ONT)...", str19Bn: "গ্রাহকের ওএনইউ (ONT) পিং করা হচ্ছে...",
  str20En: "ONT Offline: Fiber signal strength is perfect (-18.5 dBm), but customer router is disconnected. Please check if your router is powered on and the blue/green fiber patch cord is plugged in securely.", str20Bn: "ওএনইউ অফলাইন: ফাইবার সিগন্যাল মান ঠিক আছে (-১৮.৫ dBm), কিন্তু আপনার রাউটারটি সংযুক্ত নেই। অনুগ্রহ করে রাউটারের পাওয়ার এবং নীল/সবুজ প্যাচ কর্ডটি ঠিকঠাক লাগানো আছে কিনা চেক করুন।",
  str21En: "ONT Online: Connection Excellent! RX Optical Power: -19.2 dBm (Signal healthy). Network Ping: 2.1ms to gateway. Current Package speed allocated: 30 Mbps Gamer Pack. No traffic restrictions.", str21Bn: "ওএনইউ অনলাইন: সংযোগ চমৎকার! অপটিক্যাল পাওয়ার: -১৯.২ dBm (স্বাস্থ্যকর)। গেটওয়ে পিং: ২.১ মিলি-сеকেন্ড। বরাদ্দকৃত প্যাকেজ স্পিড: ৩০ এমবিপিএস গেমার প্যাক। কোনো ট্রাফিক সীমাবদ্ধতা নেই।",
  str22En: "Smart Diagnostics & ", str22Bn: "স্মার্ট ডায়াগনস্টিকস ও ",
  str23En: "Support Center", str23Bn: "সহায়তা কেন্দ্র",
  str24En: "Troubleshoot your fiber line instantly using our automated link ping analyzer or submit a support ticket directly to our localized Keraniganj support engineers.", str24Bn: "আমাদের স্বয়ংক্রিয় বিশ্লেষকের মাধ্যমে আপনার ফাইবার লাইন তাৎক্ষণিকভাবে পরীক্ষা করুন অথবা সরাসরি আমাদের কদমতলী অফিসের সাপোর্ট ইঞ্জিনিয়ারদের কাছে টিকিট দাখিল করুন।",
  str25En: "Self Diagnostics", str25Bn: "স্বয়ংক্রিয় রোগনির্ণয়",
  str26En: "Fiber Link Diagnostics", str26Bn: "ফাইবার লাইন ডায়াগনস্টিকস",
  str27En: "Enter your Client ID to run automated routing and power tests. (Tip: Try entering ", str27Bn: "স্বয়ংক্রিয় পরীক্ষার জন্য আপনার ক্লায়েন্ট আইডি লিখুন। (পরীক্ষার জন্য ",
  str28En: " to test offline scenario)", str28Bn: " লিখতে পারেন)",
  str29En: "Test Link", str29Bn: "পরীক্ষা করুন",
  str30En: "DIAGNOSTIC TERMINAL", str30Bn: "ডায়াগনস্টিক টার্মিনাল",
  str31En: "Measuring metrics...", str31Bn: "মেট্রিক্স পরিমাপ করা হচ্ছে...",
  str32En: "LINK EXCELLENT", str32Bn: "সংযোগ চমৎকার",
  str33En: "CONNECTION ISSUE DETECTED", str33Bn: "সংযোগের সমস্যা সনাক্ত হয়েছে",
  str34En: "Support Ticket", str34Bn: "সহায়তা টিকিট",
  str35En: "Submit Connectivity Issue", str35Bn: "সংযোগের সমস্যা জানান",
  str36En: "Describe your issue and register a physical support ticket. Our team resolves all network line issues within 2-4 hours.", str36Bn: "আপনার সমস্যা বর্ণনা করে টিকিট বুক করুন। আমাদের টিম ২-৪ ঘণ্টার মধ্যে সমস্ত ফাইবার লাইন মেরামত সম্পন্ন করে থাকে।",
  str37En: "Client ID (Required)", str37Bn: "ক্লায়েন্ট আইডি (আবশ্যক)",
  str38En: "Full Name", str38Bn: "আপনার নাম",
  str39En: "Phone Number", str39Bn: "মোবাইল নম্বর",
  str40En: "Issue Category", str40Bn: "সমস্যার ধরন",
  str41En: "Describe the problem", str41Bn: "সমস্যার বিবরণ লিখুন",
  str42En: "Explain what lights are blinking on your router or when the problem started...", str42Bn: "আপনার রাউটারে কী লাইট জ্বলছে বা সমস্যাটি কখন শুরু হয়েছে তা লিখুন...",
  str43En: "Registering Ticket...", str43Bn: "টিকিট নিবন্ধিত করা হচ্ছে...",
  str44En: "Submit Ticket", str44Bn: "টিকিট জমা দিন",
  str45En: "Ticket Created!", str45Bn: "টিকিট তৈরি হয়েছে!",
  str46En: "We have successfully registered your support request.", str46Bn: "আমরা সফলভাবে আপনার সহায়তার অনুরোধটি নথিভুক্ত করেছি।",
  str47En: "Ticket Reference", str47Bn: "টিকিট রেফারেন্স নম্বর",
  str48En: "Client ID", str48Bn: "ক্লায়েন্ট আইডি",
  str49En: "Issue Type", str49Bn: "সমস্যার ধরন",
  str50En: "Assigned Queue", str50Bn: "নির্ধারিত কর্মীদল",
  str51En: "Keraniganj Field Team", str51Bn: "কেরানীগঞ্জ ফিল্ড টিম",
  str52En: "A support coordinator is reviewing your details. In case a line splicing survey is required, a field worker will carry out inspection within 2 hours.", str52Bn: "একজন কর্মকর্তা আপনার টিকিটটি পর্যালোচনা করছেন। যদি লাইন মেরামতের প্রয়োজন হয়, তবে ২ ঘণ্টার মধ্যে একজন কর্মী আপনার ঠিকানায় উপস্থিত হবেন।",
  str53En: "Create Another Ticket", str53Bn: "আরেকটি টিকিট খুলুন",
  str54En: "Frequently Asked Questions", str54Bn: "সাধারণ জিজ্ঞাসা (FAQ)",
  str55En: "Get immediate answers to standard broadband setup queries", str55Bn: "ব্রডব্যান্ড সংযোগ ও সাধারণ জিজ্ঞাসাগুলোর তাৎক্ষণিক উত্তর",
};



export default function SupportPageAdmin() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [content, setContent] = useState<SupportPageContent>(defaultSupportPageContent);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    getSetting("support_page_content").then(s => {
      if (s) setContent(s as unknown as SupportPageContent);
      else setSetting("support_page_content", defaultSupportPageContent as unknown as Record<string, unknown>);
    });
  }, [router]);

  const save = async () => {
    setSetting("support_page_content", content as unknown as Record<string, unknown>);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateField = <K extends keyof SupportPageContent>(key: K, val: SupportPageContent[K]) => {
    setContent({ ...content, [key]: val });
  };

  if (!auth) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Support & FAQ Page Content</h1>
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

      </div>
    </div>
  );
}

