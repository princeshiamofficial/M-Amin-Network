"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  isPublished: boolean;
}

const defaultFAQs: FAQ[] = [
  { id: "1", question: "How long does installation take?", answer: "Usually within 24 to 48 hours after billing confirmation.", isPublished: true },
  { id: "2", question: "Do you provide public static IP?", answer: "Yes, static IP is available upon request for business plans.", isPublished: true },
];

export default function FAQsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    const saved = localStorage.getItem("m_amin_faqs");
    if (saved) {
      setFaqs(JSON.parse(saved));
    } else {
      localStorage.setItem("m_amin_faqs", JSON.stringify(defaultFAQs));
      setFaqs(defaultFAQs);
    }
  }, [router]);

  const togglePublish = (id: string) => {
    const updated = faqs.map((f) =>
      f.id === id ? { ...f, isPublished: !f.isPublished } : f
    );
    setFaqs(updated);
    localStorage.setItem("m_amin_faqs", JSON.stringify(updated));
  };

  const deleteFAQ = (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    const updated = faqs.filter((f) => f.id !== id);
    setFaqs(updated);
    localStorage.setItem("m_amin_faqs", JSON.stringify(updated));
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Manage Frequently Asked Questions</h2>
        <p className="text-xs text-slate-500 mt-1">Review questions, toggle display status, or delete portal FAQs.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">Question</th>
              <th className="pb-3">Answer Detail</th>
              <th className="pb-3">Home Display</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {faqs.map((f) => (
              <tr key={f.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 font-bold text-slate-800 max-w-xs truncate">{f.question}</td>
                <td className="py-3.5 text-slate-600 max-w-sm truncate">{f.answer}</td>
                <td className="py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    f.isPublished ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-slate-100 text-slate-500 border border-slate-200"
                  }`}>{f.isPublished ? "Published" : "Hidden"}</span>
                </td>
                <td className="py-3.5 text-right space-x-2">
                  <button
                    onClick={() => togglePublish(f.id)}
                    className="px-2.5 py-1 bg-brand-blue/10 hover:bg-brand-blue/20 border border-brand-blue/20 text-brand-blue rounded-lg font-bold text-[10px] cursor-pointer"
                  >
                    Toggle Publish
                  </button>
                  <button
                    onClick={() => deleteFAQ(f.id)}
                    className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-600 rounded-lg font-bold text-[10px] cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
