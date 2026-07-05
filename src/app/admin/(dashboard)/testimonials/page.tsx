"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Testimonial {
  id: string;
  author: string;
  role: string;
  text: string;
  rating: number;
  isPublished: boolean;
}

const defaultTestimonials: Testimonial[] = [
  { id: "1", author: "Arup Rudra", role: "SOHO Subscriber", text: "Amazing latency for online gaming. Splicing team was extremely professional.", rating: 5, isPublished: true },
  { id: "2", author: "Nabil Ahmed", role: "Home Starter User", text: "Good speed for streaming. Customer support resolved a fiber break issue quickly.", rating: 4, isPublished: true },
];

export default function TestimonialsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    const saved = localStorage.getItem("m_amin_testimonials");
    if (saved) {
      setTestimonials(JSON.parse(saved));
    } else {
      localStorage.setItem("m_amin_testimonials", JSON.stringify(defaultTestimonials));
      setTestimonials(defaultTestimonials);
    }
  }, [router]);

  const togglePublish = (id: string) => {
    const updated = testimonials.map((t) =>
      t.id === id ? { ...t, isPublished: !t.isPublished } : t
    );
    setTestimonials(updated);
    localStorage.setItem("m_amin_testimonials", JSON.stringify(updated));
  };

  const deleteTestimonial = (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    const updated = testimonials.filter((t) => t.id !== id);
    setTestimonials(updated);
    localStorage.setItem("m_amin_testimonials", JSON.stringify(updated));
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Manage Customer Testimonials</h2>
        <p className="text-xs text-slate-500 mt-1">Review feedback, toggle display status, or delete client reviews.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">Author Details</th>
              <th className="pb-3">Rating</th>
              <th className="pb-3">Review Feedback Text</th>
              <th className="pb-3">Home Display</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {testimonials.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5">
                  <span className="font-extrabold text-slate-800 block">{t.author}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{t.role}</span>
                </td>
                <td className="py-3.5 font-bold text-amber-500">{"★".repeat(t.rating)}</td>
                <td className="py-3.5 text-slate-600 max-w-sm truncate">{t.text}</td>
                <td className="py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    t.isPublished ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-slate-100 text-slate-500 border border-slate-200"
                  }`}>{t.isPublished ? "Published" : "Hidden"}</span>
                </td>
                <td className="py-3.5 text-right space-x-2">
                  <button
                    onClick={() => togglePublish(t.id)}
                    className="px-2.5 py-1 bg-brand-blue/10 hover:bg-brand-blue/20 border border-brand-blue/20 text-brand-blue rounded-lg font-bold text-[10px] cursor-pointer"
                  >
                    Toggle Publish
                  </button>
                  <button
                    onClick={() => deleteTestimonial(t.id)}
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
