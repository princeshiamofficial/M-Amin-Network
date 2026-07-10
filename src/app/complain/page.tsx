"use client";

import React, { useState } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useTranslation } from "@/hooks/useTranslation";
import { defaultComplainPageContent } from "@/app/admin/(dashboard)/complain-page/page";

export default function Complain() {
  const [pageContent, setPageContent] = React.useState(defaultComplainPageContent);
  React.useEffect(() => {
    const s = localStorage.getItem("complain_page_content");
    if (s) {
      try { setPageContent(JSON.parse(s)); } catch { /* ignore */ }
    }
  }, []);

  const lang = useTranslation();
  const t = (en: string, bn: string) => (lang === "BN" ? bn : en);

  const translateCategory = (cat: string) => {
    if (cat === "Support Response Delay") return t(pageContent.str1En, pageContent.str1Bn);
    if (cat === "Frequent Disconnections") return t(pageContent.str2En, pageContent.str2Bn);
    if (cat === "Billing Discrepancy") return t(pageContent.str3En, pageContent.str3Bn);
    if (cat === "Staff Misbehavior") return t(pageContent.str4En, pageContent.str4Bn);
    if (cat === "Speed Not Matching Pack") return t(pageContent.str5En, pageContent.str5Bn);
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
    setTimeout(async () => {
      const generatedRef = `CMP-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
      try {
        const complaints = await getSetting("complaints"); const complaintsArr = Array.isArray(complaints) ? complaints : [];
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
        complaintsArr.push(newComplaint);
        setSetting("complaints", complaintsArr as Record<string, unknown>[]);
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
          <h1 className="text-4xl font-extrabold text-white tracking-tight mt-3">
            {t(pageContent.str7En, pageContent.str7Bn)}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan to-brand-blue text-glow">
              {t(pageContent.str8En, pageContent.str8Bn)}
            </span>
          </h1>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed text-center">
            {t(pageContent.str9En, pageContent.str9Bn)}
          </p>
        </div>
      </div>

      {/* Complain Card Section - White Background */}
      <div className="w-full bg-white text-slate-800 py-16 grow border-t border-slate-200 relative z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm text-left space-y-6">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-slate-900 font-extrabold text-lg mt-3">{t(pageContent.str11En, pageContent.str11Bn)}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {t(pageContent.str12En, pageContent.str12Bn)}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str13En, pageContent.str13Bn)}</label>
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
                      <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str14En, pageContent.str14Bn)}</label>
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
                      <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str15En, pageContent.str15Bn)}</label>
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
                      <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str16En, pageContent.str16Bn)}</label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-cyan cursor-pointer"
                      >
                        <option value="Support Response Delay">{t(pageContent.str17En, pageContent.str17Bn)}</option>
                        <option value="Frequent Disconnections">{t(pageContent.str18En, pageContent.str18Bn)}</option>
                        <option value="Billing Discrepancy">{t(pageContent.str19En, pageContent.str19Bn)}</option>
                        <option value="Staff Misbehavior">{t(pageContent.str20En, pageContent.str20Bn)}</option>
                        <option value="Speed Not Matching Pack">{t(pageContent.str21En, pageContent.str21Bn)}</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str22En, pageContent.str22Bn)}</label>
                    <textarea
                      required
                      rows={4}
                      value={form.desc}
                      onChange={(e) => setForm({ ...form, desc: e.target.value })}
                      placeholder={t(pageContent.str23En, pageContent.str23Bn)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan resize-none"
                    />
                  </div>
                </div>

                {/* BTRC Warning Info */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-slate-700 leading-relaxed flex gap-2">
                  <svg className="w-5 h-5 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>
                    {t(pageContent.str24En, pageContent.str24Bn)}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-linear-to-r from-brand-blue to-brand-cyan text-brand-dark py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:opacity-95 flex justify-center items-center gap-2 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                      {t(pageContent.str25En, pageContent.str25Bn)}
                    </>
                  ) : (
                    t(pageContent.str26En, pageContent.str26Bn)
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
                  <h3 className="text-slate-900 font-bold text-xl">{t(pageContent.str27En, pageContent.str27Bn)}</h3>
                  <p className="text-sm text-slate-600">
                    {t(pageContent.str28En, pageContent.str28Bn)}
                  </p>
                </div>

                {/* Receipt info */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-sm mx-auto font-mono text-left text-slate-700">
                  <div className="flex justify-between border-b border-slate-200 pb-2 mb-2 text-xs text-slate-500">
                    <span>{t(pageContent.str29En, pageContent.str29Bn)}</span>
                    <span className="text-brand-blue font-bold">{complaintRef}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2 mb-2 text-xs text-slate-500">
                    <span>{t(pageContent.str30En, pageContent.str30Bn)}</span>
                    <span className="text-slate-800 font-bold">{form.clientId.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2 mb-2 text-xs text-slate-500">
                    <span>{t(pageContent.str31En, pageContent.str31Bn)}</span>
                    <span className="text-slate-800 font-semibold">{translateCategory(form.category)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{t(pageContent.str32En, pageContent.str32Bn)}</span>
                    <span className="text-emerald-600 font-bold">&lt; {t(pageContent.str33En, pageContent.str33Bn)}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  {t(pageContent.str34En, pageContent.str34Bn)}{" "}
                  <span className="text-slate-900 font-bold">{form.phone}</span>{" "}
                  {t(pageContent.str35En, pageContent.str35Bn)}
                </p>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300/80 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  {t(pageContent.str36En, pageContent.str36Bn)}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

