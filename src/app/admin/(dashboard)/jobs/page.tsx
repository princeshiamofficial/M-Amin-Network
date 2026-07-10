"use client";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";

interface Job {
  id: string; title: string; department: string;
  type: string; status: "Open" | "Closed"; date: string;
}

const defaultJobs: Job[] = [
  { id: "JOB-1001", title: "Fiber Splicing Technician", department: "Field Operations", type: "Full-time", status: "Open", date: "7/1/2026" },
  { id: "JOB-1002", title: "NOC Engineer", department: "Network Operations", type: "Full-time", status: "Open", date: "7/2/2026" },
  { id: "JOB-1003", title: "Sales Representative", department: "Business Development", type: "Part-time", status: "Closed", date: "6/28/2026" },
];

export default function JobsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newJob, setNewJob] = useState({ title: "", department: "", type: "Full-time" });

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) { router.replace("/admin"); return; }
    setAuth(true);
    getSetting("m_amin_jobs").then(saved => {
      if (saved) { setJobs(saved as Job[]); }
      else { setSetting("m_amin_jobs", defaultJobs as Job[]); setJobs(defaultJobs); }
    });
  }, [router]);

  const toggleStatus = (id: string) => {
    const updated = jobs.map(j => j.id === id ? { ...j, status: j.status === "Open" ? "Closed" as const : "Open" as const } : j);
    setJobs(updated); setSetting("m_amin_jobs", updated as Job[]);
  };
  const deleteJob = async (id: string) => {
    if (!confirm("Delete this job?")) return;
    const updated = jobs.filter(j => j.id !== id);
    setJobs(updated); setSetting("m_amin_jobs", updated as Job[]);
  };

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title || !newJob.department) return;
    const added: Job = {
      id: `JOB-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newJob.title,
      department: newJob.department,
      type: newJob.type,
      status: "Open",
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    };
    const updated = [added, ...jobs];
    setJobs(updated);
    setSetting("m_amin_jobs", updated as Job[]);
    setNewJob({ title: "", department: "", type: "Full-time" });
    setShowAddForm(false);
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">Careers &amp; Active Openings</h2>
          <p className="text-xs text-slate-500 mt-1">Review, delete, toggle status, or add current positions.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-brand-blue text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-blue-700 transition-colors cursor-pointer"
        >
          {showAddForm ? "Cancel" : "Post New Job"}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddJob} className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <h3 className="font-bold text-slate-800 text-sm">Post a New Job</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Position Title</label>
              <input required type="text" value={newJob.title} onChange={e => setNewJob({ ...newJob, title: e.target.value })} className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-blue" placeholder="e.g., Network Engineer" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Department</label>
              <input required type="text" value={newJob.department} onChange={e => setNewJob({ ...newJob, department: e.target.value })} className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-blue" placeholder="e.g., Field Operations" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Job Type</label>
              <select value={newJob.type} onChange={e => setNewJob({ ...newJob, type: e.target.value })} className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-blue">
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>
          <button type="submit" className="bg-brand-blue text-white px-5 py-2 rounded-lg font-bold text-xs hover:bg-blue-700 transition-colors cursor-pointer">
            Publish Job
          </button>
        </form>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">Job ID</th>
              <th className="pb-3">Position Title</th>
              <th className="pb-3">Department</th>
              <th className="pb-3">Job Type</th>
              <th className="pb-3">Publish Date</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jobs.length === 0 ? (
              <tr><td colSpan={7} className="py-8 text-center text-slate-400">No jobs listed.</td></tr>
            ) : (
              jobs.map((j) => (
                <tr key={j.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 font-bold font-mono text-brand-blue">{j.id}</td>
                  <td className="py-3.5 font-extrabold text-slate-800">{j.title}</td>
                  <td className="py-3.5 text-slate-600">{j.department}</td>
                  <td className="py-3.5 text-slate-600 font-semibold">{j.type}</td>
                  <td className="py-3.5 text-slate-500">{j.date}</td>
                  <td className="py-3.5"><span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${j.status === "Open" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-slate-500/10 text-slate-500 border border-slate-500/20"}`}>{j.status}</span></td>
                  <td className="py-3.5 text-right space-x-2">
                    <button onClick={() => toggleStatus(j.id)} className="px-2.5 py-1 bg-brand-blue/10 hover:bg-brand-blue/20 border border-brand-blue/20 text-brand-blue rounded-lg font-bold text-[10px] cursor-pointer">Toggle Status</button>
                    <button onClick={() => deleteJob(j.id)} className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-600 rounded-lg font-bold text-[10px] cursor-pointer">Delete</button>
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
