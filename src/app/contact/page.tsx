"use client";

import React, { useState, useEffect } from "react";
import { getSetting } from "@/actions/content";
import { useTranslation } from "@/hooks/useTranslation";
import { ContactContentFull, defaultContactContent } from "@/app/admin/(dashboard)/contact-page/page";

export default function Contact() {
  const lang = useTranslation();
  const t = (en: string, bn: string) => (lang === "BN" ? bn : en);

  const [content, setContent] = useState<ContactContentFull>(defaultContactContent);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Inquiry",
    msg: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getSetting("contact_content_full").then((s) => {
      if (s) {
        const item = Array.isArray(s) ? s[0] : s;
        if (item && typeof item === "object") {
          setContent(item as unknown as ContactContentFull);
        }
      }
    });
  }, []);

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
    <div className="w-full py-0 relative overflow-hidden min-h-[80vh] flex flex-col">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue/5 blur-[120px] pointer-events-none" />

      {/* Header Area Banner */}
      <div 
        className="relative w-full overflow-hidden bg-slate-950 py-3 sm:py-6 border-b border-white/5 bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(9, 13, 24, 0.45), rgba(9, 13, 24, 0.75)), url("/contact.jpg")'
        }}
      >
        <div className="absolute inset-0 bg-brand-dark/20 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-brand-dark/85 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold text-white tracking-tight mt-3 text-center w-full block">
              {t(content.titleEn, content.titleEn)}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan to-brand-blue text-glow">
                {t(content.highlightEn, content.highlightEn)}
              </span>
            </h1>
            <p className="text-slate-300 mt-4 text-sm sm:text-base leading-relaxed text-center font-medium drop-shadow-sm max-w-2xl mx-auto">
              {t(content.descEn, content.descEn)}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Content - White Background Section */}
      <div className="w-full bg-white text-slate-800 py-16 grow border-t border-slate-200 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact details & simulated map */}
            <div className="lg:col-span-5 space-y-8">
              {/* Details */}
              <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <h3 className="text-slate-900 font-extrabold text-lg">{t(content.infoTitleEn, content.infoTitleEn)}</h3>
                <ul className="space-y-6 text-sm text-left">
                  <li className="flex gap-4 items-start text-left">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/20 shrink-0 mt-0.5">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className="text-slate-900 font-bold block mb-1">{t(content.officeTitleEn, content.officeTitleEn)}</h4>
                      <p className="text-slate-600 leading-relaxed text-xs">
                        {t(content.officeL1En, content.officeL1En)}
                        <br />
                        {t(content.officeL2En, content.officeL2En)}
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-4 items-start text-left">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/20 shrink-0 mt-0.5">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className="text-slate-900 font-bold block mb-1">{t(content.phoneTitleEn, content.phoneTitleEn)}</h4>
                      <p className="text-slate-600 text-xs space-y-1">
                        {content.phones?.map((phone, idx) => (
                          <React.Fragment key={idx}>
                            {t(phone.labelEn, phone.labelEn)} <a href={`tel:${phone.number}`} className="hover:text-brand-blue text-slate-900 font-mono font-bold">{phone.number}</a>
                            {idx !== content.phones.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-4 items-start text-left">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/20 shrink-0 mt-0.5">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className="text-slate-900 font-bold block mb-1">{t(content.emailTitleEn, content.emailTitleEn)}</h4>
                      <p className="text-slate-600 text-xs">
                        {t(content.emailGenLabelEn, content.emailGenLabelEn)} <a href={`mailto:${content.emailGenAddr}`} className="hover:text-brand-blue text-brand-blue font-mono font-semibold">{content.emailGenAddr}</a>
                        <br />
                        {t(content.emailOpsLabelEn, content.emailOpsLabelEn)} <a href={`mailto:${content.emailOpsAddr}`} className="hover:text-brand-blue text-brand-blue font-mono font-semibold">{content.emailOpsAddr}</a>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Map placeholder */}
              <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-4 shadow-sm overflow-hidden relative min-h-[220px] flex flex-col justify-end text-left">
                <iframe 
                  src={content.mapEmbedUrl}
                  className="w-full h-full absolute inset-0 border-0 opacity-80 hover:opacity-100 transition-opacity duration-500 z-0" 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade" 
                />
              </div>
            </div>

            {/* Right Column: Contact form */}
            <div className="lg:col-span-7 text-left">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl text-left">
                {!success ? (
                  <form onSubmit={handleSubmit} className="space-y-5 text-left">
                    <div>
                      <h3 className="text-slate-900 font-extrabold text-xl">{t(content.formTitleEn, content.formTitleEn)}</h3>
                      <p className="text-xs text-slate-600 mt-1">
                        {t(content.formDescEn, content.formDescEn)}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 text-left">
                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{"Your Full Name"}</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="e.g. Kamrul Hasan"
                          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                        <div className="flex flex-col gap-1.5 text-left">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{"Contact Phone"}</label>
                          <input
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="e.g. 01707009267"
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5 text-left">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{"Email Address"}</label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="e.g. name@example.com"
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{"Subject Type"}</label>
                        <select
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-cyan cursor-pointer"
                        >
                          <option value="Inquiry" className="bg-white text-slate-800">{"General Business Inquiry"}</option>
                          <option value="Corporate Connection" className="bg-white text-slate-800">{"Dedicated Corporate Internet Connection"}</option>
                          <option value="Reseller Panel" className="bg-white text-slate-800">{"Sub-ISP / Reseller Panel request"}</option>
                          <option value="Billing Query" className="bg-white text-slate-800">{"Billing invoice queries"}</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{"Detailed Message"}</label>
                        <textarea
                          required
                          rows={4}
                          value={form.msg}
                          onChange={(e) => setForm({ ...form, msg: e.target.value })}
                          placeholder={"Write your connection query, location details, or requirements here..."}
                          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan resize-none font-sans"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-linear-to-r from-brand-blue to-brand-cyan text-brand-dark py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:opacity-95 flex justify-center items-center gap-2 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                          {"Sending Inquiry..."}
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
                      <h3 className="text-slate-900 font-bold text-2xl">{"Message Dispatched!"}</h3>
                      <p className="text-sm text-slate-600">
                        {"Thank you for reaching out,"} <span className="text-slate-900 font-bold">{form.name}</span>.
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                      {t(
                        "Your general inquiry form has been recorded. Our front-desk coordinator will review your topic and contact you back at your number shortly.",
                        ""
                      )}
                    </p>

                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300/80 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                    >
                      {"Send Another Message"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

