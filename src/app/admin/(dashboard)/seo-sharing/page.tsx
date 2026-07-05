"use client";
import React, { useState, useEffect } from "react";
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
    const saved = localStorage.getItem("m_amin_seo_settings");
    if (saved) {
      setSeoSettings(JSON.parse(saved));
    } else {
      localStorage.setItem("m_amin_seo_settings", JSON.stringify(defaultSEOSettings));
      setSeoSettings(defaultSEOSettings);
    }
  }, [router]);

  const saveSEOSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("m_amin_seo_settings", JSON.stringify(seoSettings));
    alert("SEO details saved successfully!");
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Meta Tags &amp; Search Visibility Settings</h2>
        <p className="text-xs text-slate-500 mt-1">Configure keywords, titles, and site description variables to optimize SEO ranking.</p>
      </div>
      <form onSubmit={saveSEOSettings} className="space-y-4 max-w-lg">
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
            rows={3}
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
          className="px-5 py-3 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md"
        >
          Save SEO Details
        </button>
      </form>
    </div>
  );
}
