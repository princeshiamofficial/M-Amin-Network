"use client";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import * as Lucide from "lucide-react";

export interface BillPaymentPageContent {
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
}


export const defaultBillPaymentPageContent: BillPaymentPageContent = {
  str1En: "Home Standard", str1Bn: "হোম স্ট্যান্ডার্ড",
  str2En: "Gamer Professional", str2Bn: "গেমার প্রফেশনাল",
  str3En: "Home Elite", str3Bn: "হোম এলিট",
  str4En: "July", str4Bn: "জুলাই",
  str5En: "M. Amin Network Subscriber", str5Bn: "এম. আমিন নেটওয়ার্ক গ্রাহক",
  str6En: "Secure Online ", str6Bn: "নিরাপদ অনলাইন ",
  str7En: "Bill Payment", str7Bn: "বিল পরিশোধ",
  str8En: "Pay your monthly subscription invoices quickly and securely. Input your Client ID to lookup your active billing due and choose your preferred local payment gateway.", str8Bn: "আপনার মাসিক সাবস্ক্রিপশন ইনভয়েস দ্রুত ও নিরাপদে পরিশোধ করুন। আপনার ক্লায়েন্ট আইডি দিয়ে বিল চেক করুন এবং পছন্দের পেমেন্ট গেটওয়ে নির্বাচন করুন।",
  str9En: "Invoice lookup", str9Bn: "ইনভয়েস অনুসন্ধান",
  str10En: "Search Subscriber Account", str10Bn: "গ্রাহক অ্যাকাউন্ট অনুসন্ধান",
  str11En: "Enter your assigned subscriber Client ID (e.g. ", str11Bn: "আপনার দেওয়া ক্লায়েন্ট আইডি লিখুন (যেমন: ",
  str12En: "or", str12Bn: "অথবা",
  str13En: ") to fetch current invoices.", str13Bn: ") ইনভয়েস দেখতে।",
  str14En: "Client ID (Required)", str14Bn: "ক্লায়েন্ট আইডি (আবশ্যক)",
  str15En: "Registered Phone", str15Bn: "নিবন্ধিত মোবাইল",
  str16En: "Fetching Invoice Details...", str16Bn: "ইনভয়েস অনুসন্ধান করা হচ্ছে...",
  str17En: "Find Billing Details", str17Bn: "বিল সংক্রান্ত তথ্য দেখুন",
  str18En: "Client ID", str18Bn: "ক্লায়েন্ট আইডি",
  str19En: "Phone", str19Bn: "মোবাইল",
  str20En: "Change Account", str20Bn: "অ্যাকাউন্ট পরিবর্তন",
  str21En: "Assigned Plan", str21Bn: "নির্ধারিত প্ল্যান",
  str22En: "Monthly Rate", str22Bn: "মাসিক বিল",
  str23En: "Standard cycle", str23Bn: "স্ট্যান্ডার্ড সাইকেল",
  str24En: "Outstanding Due", str24Bn: "বকেয়া বিল",
  str25En: "Due by:", str25Bn: "পরিশোধের শেষ তারিখ:",
  str26En: "Select Online Payment Gateway", str26Bn: "পেমেন্ট গেটওয়ে নির্বাচন করুন",
  str27En: "Payments are processed through SSL encrypted gateways. Your active broadband profile will be automatically renewed and unblocked (if disabled) within 60 seconds of a successful transaction.", str27Bn: "পেমেন্টগুলো নিরাপদ SSL এনক্রিপ্ট করা গেটওয়ের মাধ্যমে সম্পন্ন করা হয়। সফল লেনদেনের ৬০ সেকেন্ডের মধ্যে আপনার ব্রডব্যান্ড সংযোগ অটো রিনিউ বা সচল হবে।",
  str28En: "Establishing Secure Gateway connection...", str28Bn: "নিরাপদ গেটওয়ে সংযোগ স্থাপন করা হচ্ছে...",
  str29En: "Pay ৳", str29Bn: "৳",
  str30En: "BDT Now", str30Bn: "BDT পরিশোধ করুন",
  str31En: "Account Paid in Full", str31Bn: "অ্যাকাউন্টে কোনো বকেয়া নেই",
  str32En: "There are no outstanding invoices or subscription dues currently registered under Client ID", str32Bn: "ক্লায়েন্ট আইডি",
  str33En: "currently registered.", str33Bn: "এর অধীনে বর্তমানে কোনো বকেয়া বিল বা চালান নেই।",
  str34En: "Next billing cycle begins on", str34Bn: "পরবর্তী বিলিং সাইকেল শুরু হবে",
  str35En: "Find Another Account", str35Bn: "অন্য অ্যাকাউন্ট অনুসন্ধান",
  str36En: "Bill Paid Successfully!", str36Bn: "বিল সফলভাবে পরিশোধিত হয়েছে!",
  str37En: "Payment confirmed for", str37Bn: "পরিশোধ নিশ্চিত করা হয়েছে: ",
  str38En: "Transaction ID", str38Bn: "লেনদেন আইডি (TxnID)",
  str39En: "Gateway Method", str39Bn: "পেমেন্ট মাধ্যম",
  str40En: "Amount Received", str40Bn: "গৃহীত পরিমাণ",
  str41En: "Account Status", str41Bn: "অ্যাকাউন্ট স্ট্যাটাস",
  str42En: "ACTIVE / RENEWED", str42Bn: "সচল / নবায়িত",
  str43En: "Done", str43Bn: "সম্পন্ন",
  str44En: "Download Receipt", str44Bn: "রসিদ ডাউনলোড",
};



export default function BillPaymentPageAdmin() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [content, setContent] = useState<BillPaymentPageContent>(defaultBillPaymentPageContent);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    getSetting("bill_payment_page_content").then(s => {
      if (s) setContent(s as any);
      else setSetting("bill_payment_page_content", defaultBillPaymentPageContent as any);
    });
  }, [router]);

  const save = async () => {
    setSetting("bill_payment_page_content", content as any);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateField = <K extends keyof BillPaymentPageContent>(key: K, val: BillPaymentPageContent[K]) => {
    setContent({ ...content, [key]: val });
  };

  if (!auth) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Bill Payment Page Content</h1>
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

      </div>
    </div>
  );
}

