"use client";

import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export default function Complain() {
  const lang = useTranslation();
  const t = (en: string, bn: string) => (lang === "BN" ? bn : en);

  const translateCategory = (cat: string) => {
    if (cat === "Support Response Delay") return t("Support Response Delay", "সহায়তা প্রতিক্রিয়ায় বিলম্ব");
    if (cat === "Frequent Disconnections") return t("Frequent Disconnections", "বারবার সংযোগ বিচ্ছিন্নতা");
    if (cat === "Billing Discrepancy") return t("Billing Discrepancy", "বিলিং সংক্রান্ত অমিল");
    if (cat === "Staff Misbehavior") return t("Staff Misbehavior", "কর্মকর্তা বা টেকনিশিয়ানের অশোভন আচরণ");
    if (cat === "Speed Not Matching Pack") return t("Speed Not Matching Pack", "প্যাকেজ অনুযায়ী স্পিড না পাওয়া");
    return cat;
  };

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
      const generatedRef = `CMP-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
      try {
        const complaints = JSON.parse(localStorage.getItem("m_amin_complaints") || "[]");
        const newComplaint = {
          id: generatedRef,
          clientId: form.clientId,
          name: form.name,
          phone: form.phone,
          category: form.category,
          desc: form.desc,
          date: new Date().toLocaleString(),
          status: "Pending"
        };
        complaints.push(newComplaint);
        localStorage.setItem("m_amin_complaints", JSON.stringify(complaints));
      } catch (err) {
        console.error("Error saving complaint:", err);
      }
      setSubmitting(false);
      setSuccess(true);
      setComplaintRef(generatedRef);
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
    <div className="w-full py-12 relative overflow-hidden min-h-[80vh] flex flex-col">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue/5 blur-[120px] pointer-events-none" />

      {/* Header - Dark Theme */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left relative z-10 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="bg-brand-blue/15 text-brand-cyan text-[10px] font-bold tracking-widest px-2.5 py-1 rounded border border-brand-cyan/20 uppercase">
            {t("Grievance Redressal", "অভিযোগ প্রতিকার")}
          </span>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mt-3">
            {t("Complain Box & ", "অভিযোগ বক্স ও ")}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue text-glow">
              {t("Grievances", "আপত্তি")}
            </span>
          </h1>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed text-center">
            {t(
              "Are you experiencing recurring speed drops, long support delays, or billing discrepancies? Submit a formal complaint directly to our senior administration queue.",
              "আপনি কি ক্রমাগত স্পিড কমে যাওয়া, সহায়তায় দীর্ঘ বিলম্ব বা বিল সংক্রান্ত কোনো সমস্যার সম্মুখীন হচ্ছেন? আমাদের সিনিয়র অ্যাডমিনিস্ট্রেশনের কাছে সরাসরি একটি আনুষ্ঠানিক অভিযোগ জমা দিন।"
            )}
          </p>
        </div>
      </div>

      {/* Complain Card Section - White Background */}
      <div className="w-full bg-white text-slate-800 py-16 flex-grow border-t border-slate-200 relative z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm text-left space-y-6">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <span className="bg-brand-cyan/10 text-brand-blue text-[10px] font-bold tracking-widest px-2.5 py-1 rounded border border-brand-cyan/20 uppercase">
                    {t("Formal Complaint", "আনুষ্ঠানিক অভিযোগ")}
                  </span>
                  <h3 className="text-slate-900 font-extrabold text-lg mt-3">{t("File a Complaint Ticket", "অভিযোগ টিকিট দাখিল করুন")}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {t(
                      "Complaints filed here bypass standard queues and are reviewed directly by the M Amin Network operations manager within 12 hours.",
                      "এখানে দাখিলকৃত অভিযোগগুলো সাধারণ কিউ এড়িয়ে সরাসরি এম আমিন নেটওয়ার্কের অপারেশন ম্যানেজারের কাছে পৌঁছাবে এবং ১২ ঘণ্টার মধ্যে পর্যালোচনা করা হবে।"
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Client ID (Required)", "ক্লায়েন্ট আইডি (আবশ্যক)")}</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. MAN-5432"
                        value={form.clientId}
                        onChange={(e) => setForm({ ...form, clientId: e.target.value })}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan font-mono uppercase"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Your Full Name", "আপনার নাম")}</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Kamrul Hasan"
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Phone Number", "মোবাইল নম্বর")}</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="e.g. 01707009267"
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan font-mono"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Complaint Category", "অভিযোগের ধরন")}</label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-cyan cursor-pointer"
                      >
                        <option value="Support Response Delay">{t("Support Response Delay (> 4 hours)", "সহায়তা প্রতিক্রিয়ায় বিলম্ব (> ৪ ঘণ্টা)")}</option>
                        <option value="Frequent Disconnections">{t("Frequent Disconnections (Physical Signal drop)", "বারবার সংযোগ বিচ্ছিন্নতা (সিগন্যাল ড্রপ)")}</option>
                        <option value="Billing Discrepancy">{t("Billing / Payment Update failure", "বিল বা পেমেন্ট আপডেট না হওয়া")}</option>
                        <option value="Staff Misbehavior">{t("Staff / Field Technician Misconduct", "অফিস বা টেকনিশিয়ানের অশোভন আচরণ")}</option>
                        <option value="Speed Not Matching Pack">{t("Speed not matching package configuration", "প্যাকেজ অনুযায়ী সঠিক স্পিড না পাওয়া")}</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Describe the Incident", "ঘটনার বিস্তারিত বিবরণ")}</label>
                    <textarea
                      required
                      rows={4}
                      value={form.desc}
                      onChange={(e) => setForm({ ...form, desc: e.target.value })}
                      placeholder={t("Provide details about previous support ticket numbers, dates, times, or field technician names related to your complaint...", "আপনার অভিযোগের সাথে সম্পর্কিত পূর্ববর্তী টিকিট নম্বর, তারিখ, সময় অথবা টেকনিশিয়ানের নাম উল্লেখ করুন...")}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan resize-none"
                    />
                  </div>
                </div>

                {/* BTRC Warning Info */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-slate-700 leading-relaxed flex gap-2">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>
                    {t(
                      "According to BTRC regulatory standards, M Amin Network logs all grievances. We aim to redress complaints within 24 hours. Formal complain tracking references are shared with telecom audit queues.",
                      "বিটিআরসি নিয়ন্ত্রক মান অনুযায়ী, এম আমিন নেটওয়ার্ক সমস্ত অভিযোগের লগ সংরক্ষণ করে। আমরা ২৪ ঘণ্টার মধ্যে অভিযোগের সমাধান করতে প্রতিজ্ঞাবদ্ধ। আনুষ্ঠানিক অভিযোগের নম্বরগুলো নিরীক্ষা কিউতে শেয়ার করা হয়।"
                    )}
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
                      {t("Registering Complaint...", "অভিযোগ দাখিল করা হচ্ছে...")}
                    </>
                  ) : (
                    t("File Formal Complaint", "আনুষ্ঠানিক অভিযোগ জমা দিন")
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-pulse">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h3 className="text-slate-900 font-bold text-xl">{t("Complaint Logged!", "অভিযোগ দাখিল হয়েছে!")}</h3>
                  <p className="text-sm text-slate-600">
                    {t("Your formal complaint has been registered under BTRC audit standards.", "আপনার আনুষ্ঠানিক অভিযোগটি বিটিআরসি স্ট্যান্ডার্ডের অধীনে নিবন্ধিত হয়েছে।")}
                  </p>
                </div>

                {/* Receipt info */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-sm mx-auto font-mono text-left text-slate-700">
                  <div className="flex justify-between border-b border-slate-200 pb-2 mb-2 text-xs text-slate-500">
                    <span>{t("Complaint ID", "অভিযোগ আইডি")}</span>
                    <span className="text-brand-blue font-bold">{complaintRef}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2 mb-2 text-xs text-slate-500">
                    <span>{t("Client Account", "ক্লায়েন্ট আইডি")}</span>
                    <span className="text-slate-800 font-bold">{form.clientId.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2 mb-2 text-xs text-slate-500">
                    <span>{t("Grievance Category", "অভিযোগের ধরন")}</span>
                    <span className="text-slate-800 font-semibold">{translateCategory(form.category)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{t("Resolution SLA", "সমাধানের সময় (SLA)")}</span>
                    <span className="text-emerald-600 font-bold">&lt; {t("24 Hours", "২৪ ঘণ্টা")}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  {t("An operations administrator will contact you at", "খুব শীঘ্রই একজন অপারেশন কর্মকর্তা আপনার নম্বর")}{" "}
                  <span className="text-slate-900 font-bold">{form.phone}</span>{" "}
                  {t("to investigate this ticket details and discuss resolution steps.", "এ যোগাযোগ করবেন এবং অভিযোগটি সমাধানের উদ্যোগ নেবেন।")}
                </p>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300/80 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  {t("Close Window", "উইন্ডো বন্ধ করুন")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
