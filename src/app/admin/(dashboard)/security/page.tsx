"use client";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";

interface SecurityLog {
  id: string;
  event: string;
  ipAddress: string;
  timestamp: string;
  severity: "Info" | "Warning" | "Critical";
}

const defaultSecurityLogs: SecurityLog[] = [
  { id: "LOG-1", event: "Super Admin Session Authenticated", ipAddress: "192.168.1.50", timestamp: "7/3/2026, 10:30 AM", severity: "Info" },
  { id: "LOG-2", event: "Failed Authentication Attempt", ipAddress: "203.0.113.88", timestamp: "7/2/2026, 11:20 PM", severity: "Warning" },
];

export default function SecurityPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    getSetting("security_logs").then(saved => {
      if (saved) {
        setSecurityLogs(saved as unknown as SecurityLog[]);
      } else {
        setSetting("security_logs", defaultSecurityLogs as unknown as Record<string, unknown>[]);
        setSecurityLogs(defaultSecurityLogs);
      }
    });
  }, [router]);

  const deleteSecurityLog = async (id: string) => {
    if (!confirm("Are you sure you want to purge this security log?")) return;
    const updated = securityLogs.filter((l) => l.id !== id);
    setSecurityLogs(updated);
    setSetting("security_logs", updated as unknown as Record<string, unknown>[]);
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Security Incident Logs</h2>
        <p className="text-xs text-slate-500 mt-1">Audit security login traces and suspicious connection attempts.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">ID</th>
              <th className="pb-3">Event Action</th>
              <th className="pb-3">IP Address</th>
              <th className="pb-3">Timestamp</th>
              <th className="pb-3">Severity</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {securityLogs.map((l) => (
              <tr key={l.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 font-bold font-mono text-brand-blue">{l.id}</td>
                <td className="py-3.5 font-extrabold text-slate-800">{l.event}</td>
                <td className="py-3.5 font-mono text-slate-600">{l.ipAddress}</td>
                <td className="py-3.5 text-slate-500">{l.timestamp}</td>
                <td className="py-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    l.severity === "Critical" ? "bg-red-500/10 text-red-600 border border-red-500/20 animate-pulse" :
                    l.severity === "Warning" ? "bg-amber-400/10 text-amber-600 border border-amber-400/20" :
                    "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                  }`}>{l.severity}</span>
                </td>
                <td className="py-3.5 text-right">
                  <button
                    onClick={() => deleteSecurityLog(l.id)}
                    className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-650 rounded-lg font-bold text-[10px] cursor-pointer"
                  >
                    Purge Log
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

