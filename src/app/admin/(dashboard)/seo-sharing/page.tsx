"use client";
import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";

interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}

const defaultSEOSettings: SEOSettings = {
  metaTitle: "M Amin Network - Leading ISP in Keraniganj",
  metaDescription: "High-speed fiber internet solutions tailored for homes and businesses across Southern Keraniganj.",
  keywords: "internet, broadband, fiber, keraniganj, isp, m-amin",
};

export default function SEOSharingPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [seoSettings, setSeoSettings] = useState<SEOSettings>(defaultSEOSettings);

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    getSetting("m_amin_seo_settings").then(saved => {
      if (saved) {
        setSeoSettings(saved as any);
      } else {
        setSetting("m_amin_seo_settings", defaultSEOSettings as any);
        setSeoSettings(defaultSEOSettings);
      }
    });
  }, [router]);

  const saveSEOSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetting("m_amin_seo_settings", seoSettings as any);
    toast("SEO details saved successfully!");
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Meta Tags &amp; Search Visibility Settings</h2>
        <p className="text-xs text-slate-500 mt-1">Configure keywords, titles, and site description variables to optimize SEO ranking.</p>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        <form onSubmit={saveSEOSettings} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">Meta Page Title</label>
            <input
              type="text"
              value={seoSettings.metaTitle}
              onChange={(e) => setSeoSettings({ ...seoSettings, metaTitle: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">Meta Description String</label>
            <textarea
              rows={4}
              value={seoSettings.metaDescription}
              onChange={(e) => setSeoSettings({ ...seoSettings, metaDescription: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue resize-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">Default Keywords (Comma Separated)</label>
            <input
              type="text"
              value={seoSettings.keywords}
              onChange={(e) => setSeoSettings({ ...seoSettings, keywords: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md transition-opacity"
          >
            Save SEO Details
          </button>
        </form>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-800">Google Search Preview</h3>
          
          <div className="max-w-[600px] bg-white p-4 sm:p-5 rounded-xl shadow-[0_2px_5px_rgba(0,0,0,0.05)] border border-slate-200/60">
            <div className="flex items-center gap-3 mb-2 cursor-pointer">
              <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                <div className="w-full h-full bg-brand-blue flex items-center justify-center text-white font-bold text-[10px]">
                  M
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] text-[#202124] leading-tight">M Amin Network</span>
                <span className="text-[12px] text-[#4d5156] leading-tight flex items-center gap-1">
                  https://www.m-amin.com 
                  <span className="text-[10px] mt-0.5">▼</span>
                </span>
              </div>
            </div>
            <div className="text-[20px] text-[#1a0dab] hover:underline cursor-pointer leading-snug mb-1 truncate">
              {seoSettings.metaTitle || "Your Page Title"}
            </div>
            <div className="text-[14px] text-[#4d5156] line-clamp-2 leading-[1.58]">
              {seoSettings.metaDescription || "Your page description will appear here. Make it compelling to encourage users to click."}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            * This is a mockup of how your page might appear in Google search results. Actual appearance may vary.
          </p>
        </div>
      </div>
    </div>
  );
}
