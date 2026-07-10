"use client";
import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";

interface SiteContent {
  siteTitle: string;
  hotline: string;
  supportEmail: string;
  address: string;
}

const defaultSiteContent: SiteContent = {
  siteTitle: "M Amin Network | Best Broadband ISP in South Keraniganj, Dhaka",
  hotline: "+880 1707-009267",
  supportEmail: "support@maminnetwork.com",
  address: "Kadomtoli, South Keraniganj, Dhaka, Bangladesh",
};

export default function SiteContentPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    getSetting("site_content").then(saved => {
      if (saved) {
        setSiteContent(saved as unknown as SiteContent);
      } else {
        setSetting("site_content", defaultSiteContent as unknown as Record<string, unknown>);
        setSiteContent(defaultSiteContent);
      }
    });
  }, [router]);

  const saveSiteContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetting("site_content", siteContent as unknown as Record<string, unknown>);
    toast("Global details saved successfully!");
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Site Contact &amp; Global Details</h2>
        <p className="text-xs text-slate-500 mt-1">Edit standard global contact information displayed across footer and portal headers.</p>
      </div>
      <form onSubmit={saveSiteContent} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Website Meta Title</label>
          <input
            type="text"
            value={siteContent.siteTitle || ""}
            onChange={(e) => setSiteContent({ ...siteContent, siteTitle: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Support Hotline Number</label>
          <input
            type="text"
            value={siteContent.hotline}
            onChange={(e) => setSiteContent({ ...siteContent, hotline: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Support Email Address</label>
          <input
            type="email"
            value={siteContent.supportEmail}
            onChange={(e) => setSiteContent({ ...siteContent, supportEmail: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">HQ Office Address</label>
          <textarea
            rows={2}
            value={siteContent.address}
            onChange={(e) => setSiteContent({ ...siteContent, address: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue resize-none"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-3 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md"
        >
          Save Global Details
        </button>
      </form>
    </div>
  );
}

