"use client";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import * as Lucide from "lucide-react";

export interface SupportPageContent {
  str1En: string;  str2En: string;  str3En: string;  str4En: string;  str5En: string;  str6En: string;  str7En: string;  str8En: string;  str9En: string;  str10En: string;  str11En: string;  str12En: string;  str13En: string;  str14En: string;  str15En: string;  str16En: string;  str17En: string;  str18En: string;  str19En: string;  str20En: string;  str21En: string;  str22En: string;  str23En: string;  str24En: string;  str25En: string;  str26En: string;  str27En: string;  str28En: string;  str29En: string;  str30En: string;  str31En: string;  str32En: string;  str33En: string;  str34En: string;  str35En: string;  str36En: string;  str37En: string;  str38En: string;  str39En: string;  str40En: string;  str41En: string;  str42En: string;  str43En: string;  str44En: string;  str45En: string;  str46En: string;  str47En: string;  str48En: string;  str49En: string;  str50En: string;  str51En: string;  str52En: string;  str53En: string;  str54En: string;  str55En: string;}


export const defaultSupportPageContent: SupportPageContent = {
  str1En: "Speed Drop / Sluggish Internet",
  str2En: "Frequent Disconnections",
  str3En: "Billing / Invoice Query",
  str4En: "Physical Cable / Fiber line broken",
  str5En: "Other / Configuration support",
  str6En: "How can I pay my M Amin Network monthly broadband bill?",
  str7En: "You can pay your bill securely online via our Quick Pay portal using bKash, Nagad, Rocket, or Visa/Mastercard. You can also pay by visiting our office in Kadomtoli, or request a cash collection representative (for specific packages).",
  str8En: "What should I do if my internet connection is slow?",
  str9En: "First, reboot your optical ONU (small black box) and Wi-Fi router by turning them off for 30 seconds. Check if there are background downloads running on other devices. You can also run our diagnostics test above to inspect the status of your fiber line signal.",
  str10En: "Can I request a Static Public IP for server hosting or gaming?",
  str11En: "",
  str12En: "What does the AS150164 BGP network mean for my connection?",
  str13En: "Having our own Autonomous System (AS150164) and Border Gateway Protocol routing means we have direct routing lines to international gateways. In case of an upstream fiber cut, our network automatically switches to backup routing paths, guaranteeing uninterrupted uptime.",
  str14En: "How long does it take to repair a broken physical fiber cable?",
  str15En: "Our South Keraniganj field maintenance team operates 24/7. Physical line breaks caused by construction or weather are typically patched and re-spliced within 2 to 4 hours from the ticket report time.",
  str16En: "Querying BGP AS150164 routing tables...",
  str17En: "Peering with localized gateway nodes...",
  str18En: "Analyzing optical signal strength (SFP Power)...",
  str19En: "Pinging customer optical network terminal (ONT)...",
  str20En: "ONT Offline: Fiber signal strength is perfect (-18.5 dBm), but customer router is disconnected. Please check if your router is powered on and the blue/green fiber patch cord is plugged in securely.",
  str21En: "ONT Online: Connection Excellent! RX Optical Power: -19.2 dBm (Signal healthy). Network Ping: 2.1ms to gateway. Current Package speed allocated: 30 Mbps Gamer Pack. No traffic restrictions.",
  str22En: "Smart Diagnostics & ",
  str23En: "Support Center",
  str24En: "Troubleshoot your fiber line instantly using our automated link ping analyzer or submit a support ticket directly to our localized Keraniganj support engineers.",
  str25En: "Self Diagnostics",
  str26En: "Fiber Link Diagnostics",
  str27En: "Enter your Client ID to run automated routing and power tests. (Tip: Try entering ",
  str28En: " to test offline scenario)",
  str29En: "Test Link",
  str30En: "DIAGNOSTIC TERMINAL",
  str31En: "Measuring metrics...",
  str32En: "LINK EXCELLENT",
  str33En: "CONNECTION ISSUE DETECTED",
  str34En: "Support Ticket",
  str35En: "Submit Connectivity Issue",
  str36En: "Describe your issue and register a physical support ticket. Our team resolves all network line issues within 2-4 hours.",
  str37En: "Client ID (Required)",
  str38En: "Full Name",
  str39En: "Phone Number",
  str40En: "Issue Category",
  str41En: "Describe the problem",
  str42En: "Explain what lights are blinking on your router or when the problem started...",
  str43En: "Registering Ticket...",
  str44En: "Submit Ticket",
  str45En: "Ticket Created!",
  str46En: "We have successfully registered your support request.",
  str47En: "Ticket Reference",
  str48En: "Client ID",
  str49En: "Issue Type",
  str50En: "Assigned Queue",
  str51En: "Keraniganj Field Team",
  str52En: "A support coordinator is reviewing your details. In case a line splicing survey is required, a field worker will carry out inspection within 2 hours.",
  str53En: "Create Another Ticket",
  str54En: "Frequently Asked Questions",
  str55En: "Get immediate answers to standard broadband setup queries",
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
      if (s) setContent({ ...defaultSupportPageContent, ...(s as SupportPageContent) });
      else setSetting("support_page_content", defaultSupportPageContent as unknown as Record<string, unknown>);
    });
  }, [router]);

  const save = async () => {
    // Mirror all English values to Bangla for browser translator
    for (let i = 1; i <= 55; i++) {
      const enKey = `str${i}En` as keyof SupportPageContent;
      const bnKey = `str${i}Bn` as keyof SupportPageContent;
      if (bnKey in content) (content as unknown as Record<string, string>)[bnKey] = (content as unknown as Record<string, string>)[enKey];
    }
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 2</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str2En} onChange={e => updateField("str2En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 4</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str4En} onChange={e => updateField("str4En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 6</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str6En} onChange={e => updateField("str6En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 8</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str8En} onChange={e => updateField("str8En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 10</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str10En} onChange={e => updateField("str10En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 12</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str12En} onChange={e => updateField("str12En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 14</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str14En} onChange={e => updateField("str14En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 16</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str16En} onChange={e => updateField("str16En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 18</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str18En} onChange={e => updateField("str18En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 20</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str20En} onChange={e => updateField("str20En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 22</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str22En} onChange={e => updateField("str22En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 24</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str24En} onChange={e => updateField("str24En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 26</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str26En} onChange={e => updateField("str26En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 28</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str28En} onChange={e => updateField("str28En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 30</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str30En} onChange={e => updateField("str30En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 32</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str32En} onChange={e => updateField("str32En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 34</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str34En} onChange={e => updateField("str34En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 36</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str36En} onChange={e => updateField("str36En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 38</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str38En} onChange={e => updateField("str38En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 40</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str40En} onChange={e => updateField("str40En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 42</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str42En} onChange={e => updateField("str42En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 44</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str44En} onChange={e => updateField("str44En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 46</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str46En} onChange={e => updateField("str46En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 48</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str48En} onChange={e => updateField("str48En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 50</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str50En} onChange={e => updateField("str50En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 52</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str52En} onChange={e => updateField("str52En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text Block 54</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">English Text</label>
                <input type="text" value={content.str54En} onChange={e => updateField("str54En", e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-brand-blue outline-none" />
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
            </div>
          </div>

      </div>
    </div>
  );
}

