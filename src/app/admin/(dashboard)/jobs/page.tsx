"use client";
import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from "@/components/ui/table";

interface Job {
  id: string; title: string; department: string;
  type: string; location: string; status: "Open" | "Closed"; date: string;
  desc: string; requirements: string[]; vacancy: string; salary: string; deadline: string; image?: string;
}

interface JobForm {
  title: string;
  department: string;
  type: string;
  location: string;
  desc: string;
  requirements: string;
  vacancy: string;
  salary: string;
  deadline: string;
  image: string;
}

const emptyJobForm: JobForm = {
  title: "",
  department: "",
  type: "Full-Time",
  location: "",
  desc: "",
  requirements: "",
  vacancy: "1",
  salary: "Negotiable",
  deadline: "",
  image: "",
};

function getStringValue(item: Record<string, unknown>, keys: string[], fallback: string): string {
  for (const key of keys) {
    const value = item[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number") return String(value);
  }

  return fallback;
}

function getRequirementsValue(value: unknown): string[] {
  if (Array.isArray(value)) {
    const requirements = value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
    return requirements.length ? requirements : ["Relevant experience for this role"];
  }

  if (typeof value === "string" && value.trim()) {
    const requirements = value
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);
    return requirements.length ? requirements : ["Relevant experience for this role"];
  }

  return ["Relevant experience for this role"];
}

function normalizeJob(item: Record<string, unknown>): Job | null {
  const title = getStringValue(item, ["title"], "");
  if (!title) return null;

  const status = getStringValue(item, ["status"], "Open");

  return {
    id: getStringValue(item, ["id"], `JOB-${Math.floor(1000 + Math.random() * 9000)}`),
    title,
    department: getStringValue(item, ["department", "dept"], "General Support"),
    type: getStringValue(item, ["type"], "Full-Time"),
    location: getStringValue(item, ["location"], "South Keraniganj"),
    status: status === "Closed" ? "Closed" : "Open",
    date: getStringValue(item, ["date"], "Not set"),
    desc: getStringValue(item, ["desc", "description"], "Apply for this open position at M Amin Network."),
    requirements: getRequirementsValue(item.requirements),
    vacancy: getStringValue(item, ["vacancy"], "1"),
    salary: getStringValue(item, ["salary"], "Negotiable"),
    deadline: getStringValue(item, ["deadline"], ""),
    image: getStringValue(item, ["image", "imageUrl"], ""),
  };
}

export default function JobsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newJob, setNewJob] = useState(emptyJobForm);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [jobImageFile, setJobImageFile] = useState<File | null>(null);
  const [jobImagePreview, setJobImagePreview] = useState(emptyJobForm.image);
  const [isUploadingJobImage, setIsUploadingJobImage] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) { router.replace("/admin"); return; }
    setAuth(true);
    getSetting("jobs").then(saved => {
      if (Array.isArray(saved)) {
        const normalizedJobs = (saved as Record<string, unknown>[])
          .map(normalizeJob)
          .filter((job): job is Job => job !== null);
        setJobs(normalizedJobs);
      } else {
        setJobs([]);
      }
    });
  }, [router]);

  const toggleStatus = (id: string) => {
    const updated = jobs.map(j => j.id === id ? { ...j, status: j.status === "Open" ? "Closed" as const : "Open" as const } : j);
    setJobs(updated); setSetting("jobs", updated as Job[]);
  };
  const deleteJob = async (id: string) => {
    if (!confirm("Delete this job?")) return;
    const updated = jobs.filter(j => j.id !== id);
    setJobs(updated); setSetting("jobs", updated as Job[]);
    if (editingJobId === id) resetJobForm();
  };

  const resetJobForm = () => {
    setNewJob(emptyJobForm);
    setEditingJobId(null);
    setJobImageFile(null);
    setJobImagePreview(emptyJobForm.image);
    setIsUploadingJobImage(false);
  };

  const handleToggleForm = () => {
    if (showAddForm) {
      resetJobForm();
      setShowAddForm(false);
      return;
    }

    resetJobForm();
    setShowAddForm(true);
  };

  const handleEditJob = (job: Job) => {
    setEditingJobId(job.id);
    setNewJob({
      title: job.title,
      department: job.department,
      type: job.type,
      location: job.location,
      desc: job.desc,
      requirements: job.requirements.join("\n"),
      vacancy: job.vacancy || "1",
      salary: job.salary || "Negotiable",
      deadline: job.deadline,
      image: job.image || "",
    });
    setJobImageFile(null);
    setJobImagePreview(job.image || "");
    setShowAddForm(true);
  };

  const handleJobImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setJobImageFile(file);
    setJobImagePreview(URL.createObjectURL(file));
  };

  const uploadJobImage = async () => {
    if (!jobImageFile) return newJob.image;

    const formData = new FormData();
    formData.append("file", jobImageFile);

    const response = await fetch("/api/upload-job-image", {
      method: "POST",
      body: formData,
      cache: "no-store",
    });
    const result = await response.json() as { url?: string; error?: string };

    if (!response.ok || !result.url) {
      throw new Error(result.error || "Job image upload failed.");
    }
    return result.url;
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title || !newJob.department || !newJob.location || !newJob.desc || !newJob.deadline) return;
    if (!jobImageFile && !newJob.image) {
      toast("Please upload a job image.");
      return;
    }
    const requirements = newJob.requirements
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    setIsUploadingJobImage(true);
    let image = newJob.image;
    try {
      image = await uploadJobImage();
    } catch (error) {
      toast(error instanceof Error ? error.message : "Job image upload failed.");
      setIsUploadingJobImage(false);
      return;
    }

    const existingJob = editingJobId ? jobs.find((job) => job.id === editingJobId) : undefined;
    const savedJob: Job = {
      id: existingJob?.id || `JOB-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newJob.title,
      department: newJob.department,
      type: newJob.type,
      location: newJob.location,
      status: existingJob?.status || "Open",
      date: existingJob?.date || new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      desc: newJob.desc,
      requirements: requirements.length ? requirements : ["Relevant experience for this role"],
      vacancy: newJob.vacancy,
      salary: newJob.salary,
      deadline: newJob.deadline,
      image,
    };
    const updated = existingJob
      ? jobs.map((job) => (job.id === existingJob.id ? savedJob : job))
      : [savedJob, ...jobs];
    const saved = await setSetting("jobs", updated as Job[]);
    if (!saved) {
      toast("Could not save job post. Please sign in again and retry.");
      setIsUploadingJobImage(false);
      return;
    }

    setJobs(updated);
    toast(existingJob ? "Job post updated." : "Job post published.");
    resetJobForm();
    setShowAddForm(false);
  };

  if (!auth) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">Careers &amp; Active Openings</h2>
          <p className="text-xs text-slate-500 mt-1">Review, delete, toggle status, or add current positions.</p>
        </div>
        <button
          onClick={handleToggleForm}
          className="bg-brand-blue text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-blue-700 transition-colors cursor-pointer"
        >
          {showAddForm ? "Cancel" : "Post New Job"}
        </button>
      </div>

      {showAddForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/55 p-4 backdrop-blur-sm"
          onClick={handleToggleForm}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="job-dialog-title"
            className="my-8 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h3 id="job-dialog-title" className="text-base font-extrabold text-slate-900">
                  {editingJobId ? "Edit Job Post" : "Post a New Job"}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {editingJobId ? "Update the job details and save the revised opening." : "Create a new career opening for the public careers page."}
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggleForm}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
                aria-label="Close job dialog"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="max-h-[calc(100vh-9rem)] overflow-y-auto bg-slate-50 p-5 space-y-4 sm:p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Location</label>
              <input required type="text" value={newJob.location} onChange={e => setNewJob({ ...newJob, location: e.target.value })} className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-blue" placeholder="e.g., Kadomtoli Office, Dhaka" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Vacancy</label>
              <input required type="number" min="1" value={newJob.vacancy} onChange={e => setNewJob({ ...newJob, vacancy: e.target.value })} className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-blue" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Salary</label>
              <input required type="text" value={newJob.salary} onChange={e => setNewJob({ ...newJob, salary: e.target.value })} className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-blue" placeholder="e.g., 18,000-25,000" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Deadline</label>
              <input required type="date" value={newJob.deadline} onChange={e => setNewJob({ ...newJob, deadline: e.target.value })} className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-blue" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Job Description</label>
            <textarea required rows={3} value={newJob.desc} onChange={e => setNewJob({ ...newJob, desc: e.target.value })} className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-blue" placeholder="Describe the role and responsibilities." />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Requirements</label>
            <textarea rows={4} value={newJob.requirements} onChange={e => setNewJob({ ...newJob, requirements: e.target.value })} className="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-blue" placeholder={"Write one requirement per line"} />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-600 mb-2">Job Image</label>
            <div className="w-full">
              <label className="relative block h-32 overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 cursor-pointer hover:border-brand-blue hover:bg-blue-50/40 transition-all group">
                {jobImagePreview ? (
                  <>
                    <Image
                      src={jobImagePreview}
                      alt={newJob.title || "Job image preview"}
                      fill
                      sizes="224px"
                      className="object-cover transition-opacity group-hover:opacity-40"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-brand-blue text-[10px] font-bold uppercase tracking-wider bg-white/90 px-3 py-1.5 rounded-md shadow-sm">Change Image</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col h-full items-center justify-center text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-brand-blue transition-colors">
                    <span className="text-[11px]">Upload Image</span>
                    <span className="text-[9px] normal-case font-medium mt-1">Click to browse</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleJobImageChange}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="submit" disabled={isUploadingJobImage} className="bg-brand-blue text-white px-5 py-2 rounded-lg font-bold text-xs hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
              {isUploadingJobImage ? "Saving..." : editingJobId ? "Update Job" : "Publish Job"}
            </button>
            <button
              type="button"
              onClick={handleToggleForm}
              className="border border-slate-200 bg-white px-5 py-2 rounded-lg font-bold text-xs text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
          </div>
        </div>
      )}
      <div className="overflow-x-auto border border-slate-200/60 rounded-xl bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50/75 border-b border-slate-200/60">
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-4 pl-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Job ID</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Image</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Position Title</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Department</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Job Type</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Vacancy</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Publish Date</TableHead>
              <TableHead className="py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</TableHead>
              <TableHead className="py-4 pr-4 text-xs font-bold text-slate-500 text-right uppercase tracking-wider">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="py-12 text-center text-slate-400">
                  No jobs listed.
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((j) => (
                <TableRow key={j.id} className="hover:bg-slate-50/40 transition-colors border-b border-slate-100 last:border-0 text-slate-800">
                  <TableCell className="py-3.5 pl-4 font-bold font-mono text-brand-blue text-[11px]">{j.id}</TableCell>
                  <TableCell className="py-3.5">
                    <div className="relative h-10 w-14 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                      {j.image ? (
                        <Image
                          src={j.image}
                          alt={j.title}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell className="py-3.5 font-extrabold text-slate-900">{j.title}</TableCell>
                  <TableCell className="py-3.5 text-slate-600 text-xs">{j.department}</TableCell>
                  <TableCell className="py-3.5 text-slate-700 font-semibold text-xs">{j.type}</TableCell>
                  <TableCell className="py-3.5 text-slate-655 text-xs">{j.location || "Not set"}</TableCell>
                  <TableCell className="py-3.5 text-slate-600 font-bold font-mono text-xs">{j.vacancy || "1"}</TableCell>
                  <TableCell className="py-3.5 text-slate-500 font-mono text-[11px] whitespace-nowrap">{j.date}</TableCell>
                  <TableCell className="py-3.5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border leading-none ${
                      j.status === "Open" ? "bg-emerald-50 text-emerald-700 border-emerald-100 animate-pulse" : "bg-slate-50 text-slate-600 border-slate-200"
                    }`}>
                      <span className={`w-1 h-1 rounded-full shrink-0 ${j.status === "Open" ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
                      <span>{j.status}</span>
                    </span>
                  </TableCell>
                  <TableCell className="py-3.5 pr-4 text-right space-x-2 whitespace-nowrap">
                    <button onClick={() => handleEditJob(j)} className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-700 rounded-lg font-bold text-[10px] cursor-pointer transition-colors">Edit</button>
                    <button onClick={() => toggleStatus(j.id)} className="px-2.5 py-1 bg-brand-blue/10 hover:bg-brand-blue/20 border border-brand-blue/20 text-brand-blue rounded-lg font-bold text-[10px] cursor-pointer transition-colors">Toggle Status</button>
                    <button onClick={() => deleteJob(j.id)} className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-600 hover:border-red-500/20 rounded-lg font-bold text-[10px] cursor-pointer transition-colors">Delete</button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

