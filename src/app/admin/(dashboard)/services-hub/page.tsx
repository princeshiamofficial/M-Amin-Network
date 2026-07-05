"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ServiceHighlight {
  id: string;
  title: string;
  description: string;
}

const defaultHighlights: ServiceHighlight[] = [
  { id: "SRV-1", title: "Dedicated GGC/SNA Peering Cache", description: "Direct connectivity to YouTube and Facebook caches for buffer-free delivery." },
  { id: "SRV-2", title: "Optical Fiber SLA Gateway", description: "Redundant link pathways keeping fiber uptime metrics above BTRC rules." },
];

export default function ServicesHubPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [serviceHighlights, setServiceHighlights] = useState<ServiceHighlight[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    const saved = localStorage.getItem("m_amin_service_highlights");
    if (saved) {
      setServiceHighlights(JSON.parse(saved));
    } else {
      localStorage.setItem("m_amin_service_highlights", JSON.stringify(defaultHighlights));
      setServiceHighlights(defaultHighlights);
    }
  }, [router]);

  const deleteHighlight = (id: string) => {
    if (!confirm("Are you sure you want to delete this highlight?")) return;
    const updated = serviceHighlights.filter((s) => s.id !== id);
    setServiceHighlights(updated);
    localStorage.setItem("m_amin_service_highlights", JSON.stringify(updated));
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Featured Network Highlights</h2>
        <p className="text-xs text-slate-500 mt-1">Review features highlighting the M Amin Network infrastructure.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">Highlight ID</th>
              <th className="pb-3">Featured Headline</th>
              <th className="pb-3">Core Description</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {serviceHighlights.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 font-bold font-mono text-brand-blue">{s.id}</td>
                <td className="py-3.5 font-extrabold text-slate-800">{s.title}</td>
                <td className="py-3.5 text-slate-600 max-w-sm truncate">{s.description}</td>
                <td className="py-3.5 text-right">
                  <button
                    onClick={() => deleteHighlight(s.id)}
                    className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-650 rounded-lg font-bold text-[10px] cursor-pointer"
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
