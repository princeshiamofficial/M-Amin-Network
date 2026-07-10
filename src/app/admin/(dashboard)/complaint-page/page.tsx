"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ComplaintPageContent {
  guidelineTitle: string;
  guidelineBody: string;
}

const defaultComplaintPageContent: ComplaintPageContent = {
  guidelineTitle: "Submitting Formal Grievances (BTRC SLA Compliance)",
  guidelineBody: "Under BTRC guidelines, clients may lodge formal complaints here. All submissions generate trace IDs. Tickets are resolved within standard BTRC SLA frames (24-48 hrs).",
};

export default function ComplaintPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [complaintPageContent, setComplaintPageContent] = useState<ComplaintPageContent>(defaultComplaintPageContent);

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    const saved = localStorage.getItem("m_amin_complaint_page_content");
    if (saved) {
      setComplaintPageContent(JSON.parse(saved));
    } else {
      localStorage.setItem("m_amin_complaint_page_content", JSON.stringify(defaultComplaintPageContent));
      setComplaintPageContent(defaultComplaintPageContent);
    }
  }, [router]);

  const saveComplaintContent = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("m_amin_complaint_page_content", JSON.stringify(complaintPageContent));
    alert("Guidelines saved successfully!");
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Official Grievances Queue Guidelines Setup</h2>
        <p className="text-xs text-slate-500 mt-1">Configure guideline info blocks shown on the public BTRC complaint panel.</p>
      </div>
      <form onSubmit={saveComplaintContent} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Guideline Headline Title</label>
          <input
            type="text"
            value={complaintPageContent.guidelineTitle}
            onChange={(e) => setComplaintPageContent({ ...complaintPageContent, guidelineTitle: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Guideline Body Text</label>
          <textarea
            rows={4}
            value={complaintPageContent.guidelineBody}
            onChange={(e) => setComplaintPageContent({ ...complaintPageContent, guidelineBody: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue resize-none"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-3 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md"
        >
          Save Guidelines
        </button>
      </form>
    </div>
  );
}
