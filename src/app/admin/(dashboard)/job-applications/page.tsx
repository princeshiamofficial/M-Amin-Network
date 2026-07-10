"use client";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";

interface JobApplication {
  id: string; name: string; email: string; phone: string;
  jobTitle: string; experience: string; date: string;
  status: "Screening" | "Reviewing" | "Interview" | "Accepted" | "Rejected";
}

const defaultApplications: JobApplication[] = [
  { id: "APP-1001", name: "Rafiqul Islam", email: "rafiq@example.com", phone: "01712345678", jobTitle: "Fiber Splicing Technician", experience: "3 Years", date: "7/3/2026", status: "Screening" },
  { id: "APP-1002", name: "Sadia Akter", email: "sadia@example.com", phone: "01812345679", jobTitle: "NOC Engineer", experience: "2 Years", date: "7/4/2026", status: "Interview" },
];

export default function JobApplicationsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [applications, setApplications] = useState<JobApplication[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) { router.replace("/admin"); return; }
    setAuth(true);
    getSetting("job_applications").then(saved => {
      if (saved) { setApplications(saved as any); }
      else { setSetting("job_applications", defaultApplications as any); setApplications(defaultApplications); }
    });
  }, [router]);

  const updateStatus = (id: string, status: JobApplication["status"]) => {
    const updated = applications.map(a => a.id === id ? { ...a, status } : a);
    setApplications(updated); setSetting("job_applications", updated as any);
  };
  const deleteApp = async (id: string) => {
    if (!confirm("Delete this application?")) return;
    const updated = applications.filter(a => a.id !== id);
    setApplications(updated); setSetting("job_applications", updated as any);
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">Submitted Job Applications</h2>
          <p className="text-xs text-slate-500 mt-1">Review candidates, track review stages, and set application status.</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">Candidate Details</th>
              <th className="pb-3">Position Applied</th>
              <th className="pb-3">Experience</th>
              <th className="pb-3">Submission Date</th>
              <th className="pb-3">Review Status</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {applications.length === 0 ? (
              <tr><td colSpan={6} className="py-8 text-center text-slate-400">No applications received.</td></tr>
            ) : (
              applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5"><span className="font-extrabold text-slate-800 block">{app.name}</span><span className="text-[10px] text-slate-500 font-mono">{app.email} | {app.phone}</span></td>
                  <td className="py-3.5 font-semibold text-brand-blue">{app.jobTitle}</td>
                  <td className="py-3.5 text-slate-600">{app.experience}</td>
                  <td className="py-3.5 text-slate-500">{app.date}</td>
                  <td className="py-3.5"><span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${app.status === "Accepted" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : app.status === "Rejected" ? "bg-red-500/10 text-red-600 border border-red-500/20" : app.status === "Interview" ? "bg-purple-500/10 text-purple-600 border border-purple-500/20" : "bg-blue-500/10 text-blue-600 border border-blue-500/20"}`}>{app.status}</span></td>
                  <td className="py-3.5 text-right space-x-2">
                    {app.status !== "Accepted" && <button onClick={() => updateStatus(app.id, "Accepted")} className="px-2.5 py-1 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-600 rounded-lg font-bold text-[10px] cursor-pointer">Accept</button>}
                    {app.status !== "Rejected" && <button onClick={() => updateStatus(app.id, "Rejected")} className="px-2.5 py-1 bg-red-500/15 hover:bg-red-500/25 text-red-600 rounded-lg font-bold text-[10px] cursor-pointer">Reject</button>}
                    <button onClick={() => deleteApp(app.id)} className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-600 rounded-lg font-bold text-[10px] cursor-pointer">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

