"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ContactPageContent {
  headline: string;
  officeHours: string;
  mapEmbedUrl: string;
}

const defaultContactPageContent: ContactPageContent = {
  headline: "Get in Touch With Us",
  officeHours: "Saturday - Thursday: 09:00 AM - 10:00 PM",
  mapEmbedUrl: "https://maps.google.com",
};

export default function ContactPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [contactContent, setContactContent] = useState<ContactPageContent>(defaultContactPageContent);

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    const saved = localStorage.getItem("m_amin_contact_page_content");
    if (saved) {
      setContactContent(JSON.parse(saved));
    } else {
      localStorage.setItem("m_amin_contact_page_content", JSON.stringify(defaultContactPageContent));
      setContactContent(defaultContactPageContent);
    }
  }, [router]);

  const saveContactContent = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("m_amin_contact_page_content", JSON.stringify(contactContent));
    alert("Contact page settings saved successfully!");
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Contact Us Page Setup</h2>
        <p className="text-xs text-slate-500 mt-1">Customize layout values shown on the main support contact section.</p>
      </div>
      <form onSubmit={saveContactContent} className="space-y-4 max-w-lg">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Contact Headline Title</label>
          <input
            type="text"
            value={contactContent.headline}
            onChange={(e) => setContactContent({ ...contactContent, headline: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Office Hours Text</label>
          <input
            type="text"
            value={contactContent.officeHours}
            onChange={(e) => setContactContent({ ...contactContent, officeHours: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Google Map Embed URL</label>
          <input
            type="text"
            value={contactContent.mapEmbedUrl}
            onChange={(e) => setContactContent({ ...contactContent, mapEmbedUrl: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-3 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md"
        >
          Save Contact Page Config
        </button>
      </form>
    </div>
  );
}
