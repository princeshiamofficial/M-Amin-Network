"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface FooterContent {
  facebook: string;
  youtube: string;
  copyrightText: string;
}

const defaultFooterContent: FooterContent = {
  facebook: "https://facebook.com/maminnetwork",
  youtube: "https://youtube.com/maminnetwork",
  copyrightText: "© 2026 M Amin Network. All Rights Reserved.",
};

export default function TopbarFooterPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [footerContent, setFooterContent] = useState<FooterContent>(defaultFooterContent);

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    const saved = localStorage.getItem("m_amin_footer_content");
    if (saved) {
      setFooterContent(JSON.parse(saved));
    } else {
      localStorage.setItem("m_amin_footer_content", JSON.stringify(defaultFooterContent));
      setFooterContent(defaultFooterContent);
    }
  }, [router]);

  const saveFooterContent = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("m_amin_footer_content", JSON.stringify(footerContent));
    alert("Footer content saved successfully!");
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Header &amp; Footer Global CMS Settings</h2>
        <p className="text-xs text-slate-500 mt-1">Update social accounts and bottom copyright branding variables.</p>
      </div>
      <form onSubmit={saveFooterContent} className="space-y-4 max-w-md">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Facebook Page Link</label>
          <input
            type="text"
            value={footerContent.facebook}
            onChange={(e) => setFooterContent({ ...footerContent, facebook: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">YouTube Channel Link</label>
          <input
            type="text"
            value={footerContent.youtube}
            onChange={(e) => setFooterContent({ ...footerContent, youtube: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Copyright Bottom Text</label>
          <input
            type="text"
            value={footerContent.copyrightText}
            onChange={(e) => setFooterContent({ ...footerContent, copyrightText: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-3 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md"
        >
          Save Header &amp; Footer
        </button>
      </form>
    </div>
  );
}
