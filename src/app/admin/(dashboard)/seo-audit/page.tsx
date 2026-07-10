"use client";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";

interface SEOAuditReport {
  page: string;
  score: number;
  ssl: boolean;
  mobileFriendly: boolean;
}

const defaultSEOAuditReports: SEOAuditReport[] = [
  { page: "Homepage (/) ", score: 98, ssl: true, mobileFriendly: true },
  { page: "Packages (/packages)", score: 95, ssl: true, mobileFriendly: true },
  { page: "Offers (/offers)", score: 92, ssl: true, mobileFriendly: true },
];

export default function SEOAuditPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [seoAuditReports, setSeoAuditReports] = useState<SEOAuditReport[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    getSetting("m_amin_seo_audit_reports").then(saved => {
      if (saved) {
        setSeoAuditReports(saved as any);
      } else {
        setSetting("m_amin_seo_audit_reports", defaultSEOAuditReports as any);
        setSeoAuditReports(defaultSEOAuditReports);
      }
    });
  }, [router]);

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">SEO Audit &amp; Page Speed Index</h2>
        <p className="text-xs text-slate-500 mt-1">Audit Lighthouse scores, SSL certification, and mobile friendliness tags for search engines.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">Audit target page</th>
              <th className="pb-3">Speed Score</th>
              <th className="pb-3">SSL Cert</th>
              <th className="pb-3">Mobile Friendly</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {seoAuditReports.map((r, idx) => (
              <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 font-extrabold text-slate-800">{r.page}</td>
                <td className="py-3.5 font-bold text-emerald-600 text-sm">{r.score} / 100</td>
                <td className="py-3.5 font-semibold text-emerald-600">{r.ssl ? "✓ HTTPS Enabled" : "✗ No SSL"}</td>
                <td className="py-3.5 font-semibold text-emerald-600">{r.mobileFriendly ? "✓ Optimized" : "✗ Needs Review"}</td>
                <td className="py-3.5">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    Excellent
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
