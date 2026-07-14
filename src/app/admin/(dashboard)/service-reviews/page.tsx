"use client";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";

interface ServiceReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
}

const defaultReviews: ServiceReview[] = [
  { id: "REV-1", author: "Kamrul Islam", rating: 5, comment: "Zero latency during midnight working slots, highly recommended!" },
];

export default function ServiceReviewsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [serviceReviews, setServiceReviews] = useState<ServiceReview[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    getSetting("service_reviews").then(saved => {
      if (saved) {
        setServiceReviews(saved as unknown as ServiceReview[]);
      } else {
        setSetting("service_reviews", defaultReviews as unknown as Record<string, unknown>[]);
        setServiceReviews(defaultReviews);
      }
    });
  }, [router]);

  const deleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    const updated = serviceReviews.filter((r) => r.id !== id);
    setServiceReviews(updated);
    setSetting("service_reviews", updated as unknown as Record<string, unknown>[]);
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Active Peering &amp; Speed Reviews</h2>
        <p className="text-xs text-slate-500 mt-1">Audit customer comments reviewing specific coverage clusters.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">ID</th>
              <th className="pb-3">Committer Details</th>
              <th className="pb-3">Score</th>
              <th className="pb-3">Comment Text</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {serviceReviews.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 font-bold font-mono text-brand-blue">{r.id}</td>
                <td className="py-3.5 font-extrabold text-slate-800">{r.author}</td>
                <td className="py-3.5 font-bold text-amber-500">{"★".repeat(r.rating)}</td>
                <td className="py-3.5 text-slate-600 max-w-md truncate">{r.comment}</td>
                <td className="py-3.5 text-right">
                  <button
                    onClick={() => deleteReview(r.id)}
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

