"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PackageRequestsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) { router.replace("/admin"); return; }
    setAuth(true);
  }, [router]);
  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Broadband Package Upgrade Requests</h2>
        <p className="text-xs text-slate-500 mt-1">Audit billing adjustments and speed alterations requested by active clients.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">Account Number</th>
              <th className="pb-3">Requested Plan</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50/70 transition-colors">
              <td className="py-3.5 font-bold font-mono text-brand-blue">SUB-88293 (Mehan Ahmed)</td>
              <td className="py-3.5 font-extrabold text-slate-800">Upgrade to Enterprise Splice (100 Mbps)</td>
              <td className="py-3.5 text-slate-500">Upgrade Speed</td>
              <td className="py-3.5"><span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#eef2f5] text-slate-700 border border-slate-200 animate-pulse">Splicing Scheduled</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
