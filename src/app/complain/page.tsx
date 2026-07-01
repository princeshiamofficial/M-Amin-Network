"use client";

import React, { useState } from "react";

export default function Complain() {
  const [form, setForm] = useState({
    clientId: "",
    name: "",
    phone: "",
    category: "Support Response Delay",
    desc: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [complaintRef, setComplaintRef] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setComplaintRef(`CMP-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 1500);
  };

  const handleReset = () => {
    setForm({
      clientId: "",
      name: "",
      phone: "",
      category: "Support Response Delay",
      desc: "",
    });
    setSuccess(false);
    setComplaintRef("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 flex-grow text-left">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-brand-cyan/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="bg-brand-blue/15 text-brand-cyan text-[10px] font-bold tracking-widest px-2.5 py-1 rounded border border-brand-cyan/20 uppercase">
          Grievance Redressal
        </span>
        <h1 className="text-4xl font-extrabold text-white tracking-tight mt-3">
          Complain Box &amp;{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue text-glow">
            Grievances
          </span>
        </h1>
        <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed text-center">
          Are you experiencing recurring speed drops, long support delays, or billing discrepancies? Submit a formal complaint directly to our senior administration queue.
        </p>
      </div>

      <div className="max-w-2xl mx-auto w-full">
        <div className="glass-panel border-brand-border/60 rounded-3xl p-6 sm:p-8 shadow-xl text-left space-y-6">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <span className="bg-brand-cyan/15 text-brand-cyan text-[10px] font-bold tracking-widest px-2.5 py-1 rounded border border-brand-cyan/20 uppercase">
                  Formal Complaint
                </span>
                <h3 className="text-white font-extrabold text-lg mt-3">File a Complaint Ticket</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Complaints filed here bypass standard queues and are reviewed directly by the M Amin Network operations manager within 12 hours.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Client ID (Required)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MAN-5432"
                      value={form.clientId}
                      onChange={(e) => setForm({ ...form, clientId: e.target.value })}
                      className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan font-mono uppercase"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Kamrul Hasan"
                      className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. 01707009267"
                      className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Complaint Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan cursor-pointer"
                    >
                      <option value="Support Response Delay">Support Response Delay (&gt; 4 hours)</option>
                      <option value="Frequent Disconnections">Frequent Disconnections (Physical Signal drop)</option>
                      <option value="Billing Discrepancy">Billing / Payment Update failure</option>
                      <option value="Staff Misbehavior">Staff / Field Technician Misconduct</option>
                      <option value="Speed Not Matching Pack">Speed not matching package configuration</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Describe the Incident</label>
                  <textarea
                    required
                    rows={4}
                    value={form.desc}
                    onChange={(e) => setForm({ ...form, desc: e.target.value })}
                    placeholder="Provide details about previous support ticket numbers, dates, times, or field technician names related to your complaint..."
                    className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan resize-none"
                  />
                </div>
              </div>

              {/* BTRC Warning Info */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3.5 text-xs text-slate-300 leading-relaxed flex gap-2">
                <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>
                  According to BTRC regulatory standards, M Amin Network logs all grievances. We aim to redress complaints within 24 hours. Formal complain tracking references are shared with telecom audit queues.
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:opacity-95 flex justify-center items-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                    Registering Complaint...
                  </>
                ) : (
                  "File Formal Complaint"
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-amber-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-amber-400 animate-pulse">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01M5.071 19a9 9 0 1112.728 0m-12.728 0h12.728" />
                </svg>
              </div>

              <div className="space-y-2">
                <h3 className="text-white font-extrabold text-2xl">Complaint Logged!</h3>
                <p className="text-sm text-slate-400">
                  Your formal complaint has been registered under BTRC audit standards.
                </p>
              </div>

              {/* Receipt info */}
              <div className="bg-brand-dark border border-brand-border rounded-2xl p-5 max-w-sm mx-auto font-mono text-left">
                <div className="flex justify-between border-b border-brand-border/40 pb-2 mb-2 text-xs text-slate-400">
                  <span>Complaint ID</span>
                  <span className="text-brand-cyan font-bold">{complaintRef}</span>
                </div>
                <div className="flex justify-between border-b border-brand-border/40 pb-2 mb-2 text-xs text-slate-400">
                  <span>Client Account</span>
                  <span className="text-white font-bold">{form.clientId.toUpperCase()}</span>
                </div>
                <div className="flex justify-between border-b border-brand-border/40 pb-2 mb-2 text-xs text-slate-400">
                  <span>Grievance Category</span>
                  <span className="text-white font-semibold">{form.category}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Resolution SLA</span>
                  <span className="text-emerald-400 font-bold">&lt; 24 Hours</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                An operations administrator will contact you at <span className="text-slate-200 font-bold">{form.phone}</span> to investigate this ticket details and discuss resolution steps.
              </p>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-brand-border hover:bg-brand-border/80 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
