"use client";

import React, { useState } from "react";

interface JobOpening {
  title: string;
  dept: string;
  location: string;
  type: string;
  desc: string;
  requirements: string[];
}

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [applyForm, setApplyForm] = useState({
    name: "",
    phone: "",
    email: "",
    experience: "Entry Level",
    resumeLink: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const jobs: JobOpening[] = [
    {
      title: "Support Technician (Field Operations)",
      dept: "Network Engineering & Maintenance",
      location: "South Keraniganj",
      type: "Full-Time",
      desc: "We are looking for dedicated field technicians to lay fiber cables, splice optical lines, install ONTs, and troubleshoot client premises issues.",
      requirements: [
        "Prior experience in fiber splicing (laser splicing machines)",
        "Familiarity with OLT port configs & client router configurations",
        "Willingness to travel around South Keraniganj neighborhoods",
        "Excellent communication and problem-solving skills",
      ],
    },
    {
      title: "Customer Support Executive",
      dept: "Helpdesk Operations",
      location: "Kadomtoli Office, Dhaka",
      type: "Full-Time",
      desc: "Manage customer queries, guide clients through router reboots, catalog support tickets, and direct field teams to fiber line breaks.",
      requirements: [
        "Higher Secondary Certificate (HSC) or Bachelor degree",
        "Polite tone and high patience for user support",
        "Basic computer knowledge (Google Sheets, ticket dashboards)",
        "Ability to speak fluent Bangla (English is a plus)",
      ],
    },
    {
      title: "Junior Network Engineer",
      dept: "Infrastructure Operations",
      location: "Kadomtoli Office, Dhaka",
      type: "Full-Time",
      desc: "Assist in monitoring the BGP network (AS150164), configure OLT splitters, manage DNS and local caching servers (FTP, BDIX).",
      requirements: [
        "Diploma in Computer/Telecommunication Engineering or CCNA certified",
        "Familiarity with Mikrotik RouterOS and basic Linux scripting",
        "Understanding of IPv4 subnetting and dynamic BGP routing",
        "Willingness to work in rotating shifts",
      ],
    },
  ];

  const handleApplyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setApplyForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setApplyForm({
      name: "",
      phone: "",
      email: "",
      experience: "Entry Level",
      resumeLink: "",
    });
    setSuccess(false);
    setSelectedJob(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 flex-grow text-left">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="bg-brand-blue/15 text-brand-cyan text-[10px] font-bold tracking-widest px-2.5 py-1 rounded border border-brand-cyan/20 uppercase">
          Join M Amin Network
        </span>
        <h1 className="text-4xl font-extrabold text-white tracking-tight mt-3">
          Careers &amp;{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue text-glow">
            Opportunities
          </span>
        </h1>
        <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed text-center">
          Work with South Keraniganj&apos;s leading network engineers. We offer attractive bonuses, hands-on training on optical line terminals, and CCNA certifications sponsorship.
        </p>
      </div>

      {/* Job Postings Grid */}
      <div className="space-y-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-6">Active Open Positions</h2>
        {jobs.map((job, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-brand-card/40 border border-brand-border/60 glass-panel shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/20 px-2 py-0.5 rounded font-semibold">
                  {job.dept}
                </span>
                <span className="text-slate-500 font-mono">{job.location} | {job.type}</span>
              </div>
              <h3 className="text-white font-extrabold text-lg tracking-tight">{job.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{job.desc}</p>
            </div>
            <button
              onClick={() => setSelectedJob(job)}
              className="bg-brand-blue text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-brand-blue/90 transition-colors flex-shrink-0 cursor-pointer"
            >
              View &amp; Apply
            </button>
          </div>
        ))}
      </div>

      {/* Apply Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm">
          <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!success ? (
              <form onSubmit={handleApplySubmit} className="space-y-5">
                <div>
                  <h3 className="text-white font-bold text-xl">Apply for Job</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Position: <span className="text-brand-cyan font-bold">{selectedJob.title}</span>
                  </p>
                </div>

                {/* Job requirements details list */}
                <div className="bg-brand-dark border border-brand-border/60 rounded-2xl p-4 space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Candidate Requirements:</h4>
                  <ul className="space-y-1">
                    {selectedJob.requirements.map((req, reqIdx) => (
                      <li key={reqIdx} className="text-xs text-slate-300 flex items-start gap-1.5 leading-relaxed">
                        <span className="text-brand-cyan font-bold">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={applyForm.name}
                      onChange={handleApplyChange}
                      placeholder="e.g. Tanvir Ahmed"
                      className="bg-brand-dark border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={applyForm.phone}
                        onChange={handleApplyChange}
                        placeholder="e.g. 01707009267"
                        className="bg-brand-dark border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={applyForm.email}
                        onChange={handleApplyChange}
                        placeholder="e.g. name@example.com"
                        className="bg-brand-dark border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Experience Level</label>
                      <select
                        name="experience"
                        value={applyForm.experience}
                        onChange={handleApplyChange}
                        className="bg-brand-dark border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-cyan cursor-pointer"
                      >
                        <option value="Entry Level">Entry Level (No experience)</option>
                        <option value="1-2 Years">1 - 2 Years Experience</option>
                        <option value="3+ Years">3+ Years Experience</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Resume Link (Google Drive / DropBox)</label>
                      <input
                        type="url"
                        name="resumeLink"
                        required
                        value={applyForm.resumeLink}
                        onChange={handleApplyChange}
                        placeholder="e.g. https://drive.google.com/..."
                        className="bg-brand-dark border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark py-3.5 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:opacity-95 flex justify-center items-center gap-2 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 animate-pulse">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h3 className="text-white font-bold text-xl">Application Received!</h3>
                  <p className="text-sm text-slate-400">
                    Thank you, <span className="text-slate-200 font-bold">{applyForm.name}</span>. We have saved your application request for <span className="text-brand-cyan font-bold">{selectedJob.title}</span>.
                  </p>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Our HR coordinator will review your submitted resume link and credentials. In case your background aligns with our operational needs, our office team will contact you for an in-person interview at our Kadomtoli branch.
                </p>

                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-xl bg-brand-border hover:bg-brand-border/80 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
