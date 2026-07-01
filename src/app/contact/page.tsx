"use client";

import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Inquiry",
    msg: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setForm({
      name: "",
      phone: "",
      email: "",
      subject: "Inquiry",
      msg: "",
    });
    setSuccess(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 flex-grow text-left">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-brand-cyan/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="bg-brand-blue/15 text-brand-cyan text-[10px] font-bold tracking-widest px-2.5 py-1 rounded border border-brand-cyan/20 uppercase">
          Get In Touch
        </span>
        <h1 className="text-4xl font-extrabold text-white tracking-tight mt-3">
          Contact{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue text-glow">
            Our Team
          </span>
        </h1>
        <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed text-center">
          Have questions about coverage feasibility, pricing discounts, or corporate dedicated connections? Reach out to us directly or fill out the query form.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Contact details & simulated map */}
        <div className="lg:col-span-5 space-y-8">
          {/* Details */}
          <div className="glass-panel border-brand-border/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="text-white font-extrabold text-lg">Contact Information</h3>
            <ul className="space-y-6 text-sm">
              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/20 text-brand-cyan flex items-center justify-center border border-brand-cyan/20 flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-bold block mb-1">Corporate Office</h4>
                  <p className="text-slate-350 leading-relaxed text-xs">
                    House No. 68, Kadomtoli, Aganagar,
                    <br />
                    South Keraniganj, Dhaka-1310, Bangladesh.
                  </p>
                </div>
              </li>

              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/20 text-brand-cyan flex items-center justify-center border border-brand-cyan/20 flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-bold block mb-1">Telephone Hotlines</h4>
                  <p className="text-slate-350 text-xs">
                    Residential Support: <a href="tel:+8801707009267" className="hover:text-brand-cyan text-white font-mono font-bold">+880 1707-009267</a>
                    <br />
                    Corporate Desk: +880 1707-009267
                  </p>
                </div>
              </li>

              <li className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/20 text-brand-cyan flex items-center justify-center border border-brand-cyan/20 flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-bold block mb-1">Email Correspondence</h4>
                  <p className="text-slate-350 text-xs">
                    General Queries: <a href="mailto:info@m-aminnetwork.com" className="hover:text-brand-cyan text-white">info@m-aminnetwork.com</a>
                    <br />
                    Network Ops: <a href="mailto:mibappy00@gmail.com" className="hover:text-brand-cyan text-white">mibappy00@gmail.com</a>
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Map placeholder */}
          <div className="glass-panel border-brand-border/60 rounded-3xl p-4 shadow-xl overflow-hidden relative min-h-[220px] flex flex-col justify-end text-left">
            <div className="absolute inset-0 bg-brand-dark/80 flex flex-col items-center justify-center p-6 border-b border-brand-border/40 pointer-events-none">
              <svg className="w-8 h-8 text-brand-cyan animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span className="text-white text-xs font-bold mt-2">Kadomtoli Chowrasta, Aganagar</span>
              <span className="text-slate-500 text-[10px] mt-1 text-center">House No. 68, Kadomtoli Office Location</span>
            </div>
            <div className="w-full h-full bg-slate-900 absolute inset-0 opacity-15" />
          </div>
        </div>

        {/* Right Column: Contact form */}
        <div className="lg:col-span-7">
          <div className="glass-panel border-brand-border/60 rounded-3xl p-6 sm:p-8 shadow-xl text-left">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-white font-extrabold text-xl">Send an Inquiry</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill out the form below and our operations support manager will follow up with you.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Contact Phone</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="e.g. 01707009267"
                        className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="e.g. name@example.com"
                        className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Subject Type</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan cursor-pointer"
                    >
                      <option value="Inquiry">General Business Inquiry</option>
                      <option value="Corporate Connection">Dedicated Corporate Internet Connection</option>
                      <option value="Reseller Panel">Sub-ISP / Reseller Panel request</option>
                      <option value="Billing Query">Billing invoice queries</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Detailed Message</label>
                    <textarea
                      required
                      rows={4}
                      value={form.msg}
                      onChange={(e) => setForm({ ...form, msg: e.target.value })}
                      placeholder="Write your connection query, location details, or requirements here..."
                      className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:opacity-95 flex justify-center items-center gap-2 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                      Sending Inquiry...
                    </>
                  ) : (
                    "Submit Inquiry Form"
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 animate-pulse">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h3 className="text-white font-bold text-2xl">Message Dispatched!</h3>
                  <p className="text-sm text-slate-400">
                    Thank you for reaching out, <span className="text-slate-200 font-bold">{form.name}</span>.
                  </p>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                  Your general inquiry form has been recorded. Our front-desk coordinator will review your topic and contact you back at your number shortly.
                </p>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-brand-border hover:bg-brand-border/80 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
