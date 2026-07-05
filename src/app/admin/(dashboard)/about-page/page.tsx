"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AboutContent {
  storyTitle: string;
  storyBody: string;
}

const defaultAboutContent: AboutContent = {
  storyTitle: "Our Mission & Journey",
  storyBody: "Established with a vision to connect every corner of Southern Keraniganj, M Amin Network has been leading with high quality fiber optics and 24/7 client satisfaction.",
};

export default function AboutPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [aboutContent, setAboutContent] = useState<AboutContent>(defaultAboutContent);

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    const saved = localStorage.getItem("m_amin_about_content");
    if (saved) {
      setAboutContent(JSON.parse(saved));
    } else {
      localStorage.setItem("m_amin_about_content", JSON.stringify(defaultAboutContent));
      setAboutContent(defaultAboutContent);
    }
  }, [router]);

  const saveAboutContent = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("m_amin_about_content", JSON.stringify(aboutContent));
    alert("About page block saved successfully!");
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">About Us Page Text Blocks</h2>
        <p className="text-xs text-slate-500 mt-1">Customize the company storytelling blocks rendered on the about page.</p>
      </div>
      <form onSubmit={saveAboutContent} className="space-y-4 max-w-lg">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Mission Story Header</label>
          <input
            type="text"
            value={aboutContent.storyTitle}
            onChange={(e) => setAboutContent({ ...aboutContent, storyTitle: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Core Story Content Body</label>
          <textarea
            rows={5}
            value={aboutContent.storyBody}
            onChange={(e) => setAboutContent({ ...aboutContent, storyBody: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue resize-none"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-3 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md"
        >
          Save About Page Block
        </button>
      </form>
    </div>
  );
}
