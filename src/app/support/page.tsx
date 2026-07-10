"use client";

import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { defaultSupportPageContent } from "@/app/admin/(dashboard)/support-page/page";

interface FAQItem {
  q: string;
  a: string;
}

export default function Support() {
  const [pageContent, setPageContent] = React.useState(defaultSupportPageContent);
  React.useEffect(() => {
    const s = localStorage.getItem("m_amin_support_page_content");
    if (s) {
      try { setPageContent(JSON.parse(s)); } catch { /* ignore */ }
    }
  }, []);

  const lang = useTranslation();
  const t = (en: string, bn: string) => (lang === "BN" ? bn : en);

  const translateCategory = (cat: string) => {
    if (cat === "Speed Issue") return t(pageContent.str1En, pageContent.str1Bn);
    if (cat === "Frequent Disconnect") return t(pageContent.str2En, pageContent.str2Bn);
    if (cat === "Billing Issue") return t(pageContent.str3En, pageContent.str3Bn);
    if (cat === "Physical Cable Broken") return t(pageContent.str4En, pageContent.str4Bn);
    if (cat === "Other") return t(pageContent.str5En, pageContent.str5Bn);
    return cat;
  };

  // Diagnostics states
  const [clientId, setClientId] = useState("");
  const [diagStep, setDiagStep] = useState<number>(-1);
  const [diagLogs, setDiagLogs] = useState<string[]>([]);
  const [diagResult, setDiagResult] = useState<{ status: "success" | "error"; msg: string } | null>(null);

  // Ticket states
  const [ticketForm, setTicketForm] = useState({
    clientId: "",
    name: "",
    phone: "",
    category: "Speed Issue",
    desc: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketCreated, setTicketCreated] = useState<string | null>(null);

  // FAQ Accordion open index
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const defaultFaqs: FAQItem[] = [
    {
      q: t(pageContent.str6En, pageContent.str6Bn),
      a: t(pageContent.str7En, pageContent.str7Bn),
    },
    {
      q: t(pageContent.str8En, pageContent.str8Bn),
      a: t(pageContent.str9En, pageContent.str9Bn),
    },
    {
      q: t(pageContent.str10En, pageContent.str10Bn),
      a: t(pageContent.str11En, pageContent.str11Bn),
    },
    {
      q: t(pageContent.str12En, pageContent.str12Bn),
      a: t(pageContent.str13En, pageContent.str13Bn),
    },
    {
      q: t(pageContent.str14En, pageContent.str14Bn),
      a: t(pageContent.str15En, pageContent.str15Bn),
    },
  ];

  const [faqs, setFaqs] = useState<FAQItem[]>(defaultFaqs);

  React.useEffect(() => {
    const savedFaqs = localStorage.getItem("m_amin_faqs");
    if (savedFaqs) {
      try {
        const parsed = JSON.parse(savedFaqs);
        // Ensure we only show published FAQs
        const published = parsed.filter((f: any) => f.isPublished);
        if (published.length > 0) {
          setFaqs(published.map((f: any) => ({
            q: f.question,
            a: f.answer,
          })));
        }
      } catch {
        console.error("Failed to parse FAQs");
      }
    }
  }, []);
  // Run simulated diagnostics
  const handleDiagnostics = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId.trim()) return;

    setDiagStep(0);
    setDiagLogs([]);
    setDiagResult(null);

    const steps = [
      t(pageContent.str16En, pageContent.str16Bn),
      t(pageContent.str17En, pageContent.str17Bn),
      t(pageContent.str18En, pageContent.str18Bn),
      t(pageContent.str19En, pageContent.str19Bn),
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setDiagLogs((prev) => [...prev, steps[currentStep]]);
        setDiagStep(currentStep + 1);
        currentStep++;
      } else {
        clearInterval(interval);
        // Generate result based on customer ID input
        if (clientId.toLowerCase() === "man-9988") {
          setDiagResult({
            status: "error",
            msg: t(pageContent.str20En, pageContent.str20Bn),
          });
        } else {
          setDiagResult({
            status: "success",
            msg: t(pageContent.str21En, pageContent.str21Bn),
          });
        }
      }
    }, 1000);
  };

  const handleTicketChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTicketForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedRef = `TKT-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
      try {
        const tickets = JSON.parse(localStorage.getItem("m_amin_tickets") || "[]");
        const newTicket = {
          id: generatedRef,
          clientId: ticketForm.clientId,
          name: ticketForm.name,
          phone: ticketForm.phone,
          category: ticketForm.category,
          desc: ticketForm.desc,
          date: new Date().toLocaleString(),
          status: "Open"
        };
        tickets.push(newTicket);
        localStorage.setItem("m_amin_tickets", JSON.stringify(tickets));
      } catch (err) {
        console.error("Error saving ticket:", err);
      }
      setIsSubmitting(false);
      setTicketCreated(generatedRef);
    }, 1500);
  };

  const resetTicketForm = () => {
    setTicketForm({
      clientId: "",
      name: "",
      phone: "",
      category: "Speed Issue",
      desc: "",
    });
    setTicketCreated(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 grow">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-white tracking-tight text-center w-full block">
          {t(pageContent.str22En, pageContent.str22Bn)}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan to-brand-blue text-glow">
            {t(pageContent.str23En, pageContent.str23Bn)}
          </span>
        </h1>
        <p className="text-slate-400 mt-4 text-sm sm:text-base text-center">
          {t(pageContent.str24En, pageContent.str24Bn)}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        {/* Left Column: Diagnostics Tool */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel border-brand-border/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl flex flex-col text-left">
            <div>
              <span className="bg-brand-blue/15 text-brand-cyan text-[10px] font-bold tracking-widest px-2.5 py-1 rounded border border-brand-cyan/20 uppercase">
                {t(pageContent.str25En, pageContent.str25Bn)}
              </span>
              <h3 className="text-white font-extrabold text-xl mt-3">{t(pageContent.str26En, pageContent.str26Bn)}</h3>
              <p className="text-xs text-slate-400 mt-1">
                {t(pageContent.str27En, pageContent.str27Bn)}
                <code className="text-brand-cyan font-mono bg-brand-dark px-1.5 py-0.5 rounded">MAN-9988</code>
                {t(pageContent.str28En, pageContent.str28Bn)}
              </p>
            </div>

            <form onSubmit={handleDiagnostics} className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. MAN-5432"
                required
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan grow font-mono"
              />
              <button
                type="submit"
                disabled={diagStep >= 0 && diagStep < 4}
                className="bg-brand-blue text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-brand-blue/90 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {t(pageContent.str29En, pageContent.str29Bn)}
              </button>
            </form>

            {/* Diagnostics progress terminal */}
            {diagStep >= 0 && (
              <div className="bg-black/80 rounded-2xl p-5 font-mono text-xs border border-brand-border text-left space-y-2 max-w-full overflow-hidden shadow-inner">
                <div className="flex items-center justify-between border-b border-brand-border/40 pb-2 mb-3">
                  <span className="text-[10px] text-slate-400 font-bold">{t(pageContent.str30En, pageContent.str30Bn)}</span>
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                </div>

                <div className="space-y-1.5 min-h-[100px]">
                  {diagLogs.map((log, index) => (
                    <div key={index} className="flex items-start gap-2 text-slate-300">
                      <span className="text-brand-cyan font-bold">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))}

                  {/* Typing animation or spinner */}
                  {diagStep < 4 && (
                    <div className="flex items-center gap-2 text-slate-500">
                      <div className="w-3.5 h-3.5 border border-slate-500 border-t-transparent rounded-full animate-spin shrink-0" />
                      <span className="animate-pulse">{t(pageContent.str31En, pageContent.str31Bn)}</span>
                    </div>
                  )}

                  {/* Result Box */}
                  {diagResult && (
                    <div
                      className={`mt-4 p-4 rounded-xl border leading-relaxed ${
                        diagResult.status === "success"
                          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                          : "bg-rose-500/5 border-rose-500/20 text-rose-300"
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold mb-1">
                        <span className={`w-2 h-2 rounded-full ${
                          diagResult.status === "success" ? "bg-emerald-400" : "bg-rose-400"
                        }`} />
                        {diagResult.status === "success" ? t(pageContent.str32En, pageContent.str32Bn) : t(pageContent.str33En, pageContent.str33Bn)}
                      </div>
                      <p className="text-slate-300 mt-1.5 leading-relaxed">{diagResult.msg}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Open Ticket Form */}
        <div className="lg:col-span-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl text-left">
            {!ticketCreated ? (
              <form onSubmit={handleTicketSubmit} className="space-y-5 text-left">
                <div>
                  <span className="bg-brand-blue/10 text-brand-blue text-[10px] font-bold tracking-widest px-2.5 py-1 rounded border border-brand-blue/20 uppercase">
                    {t(pageContent.str34En, pageContent.str34Bn)}
                  </span>
                  <h3 className="text-slate-900 font-extrabold text-xl mt-3">{t(pageContent.str35En, pageContent.str35Bn)}</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    {t(pageContent.str36En, pageContent.str36Bn)}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str37En, pageContent.str37Bn)}</label>
                      <input
                        type="text"
                        name="clientId"
                        required
                        value={ticketForm.clientId}
                        onChange={handleTicketChange}
                        placeholder="e.g. MAN-5432"
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan font-mono"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str38En, pageContent.str38Bn)}</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={ticketForm.name}
                        onChange={handleTicketChange}
                        placeholder="e.g. Kamrul Hasan"
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str39En, pageContent.str39Bn)}</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={ticketForm.phone}
                        onChange={handleTicketChange}
                        placeholder="e.g. 01707009267"
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str40En, pageContent.str40Bn)}</label>
                      <select
                        name="category"
                        value={ticketForm.category}
                        onChange={handleTicketChange}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-brand-cyan cursor-pointer"
                      >
                        <option value="Speed Issue">{t(pageContent.str1En, pageContent.str1Bn)}</option>
                        <option value="Frequent Disconnect">{t(pageContent.str2En, pageContent.str2Bn)}</option>
                        <option value="Billing Issue">{t(pageContent.str3En, pageContent.str3Bn)}</option>
                        <option value="Physical Cable Broken">{t(pageContent.str4En, pageContent.str4Bn)}</option>
                        <option value="Other">{t(pageContent.str5En, pageContent.str5Bn)}</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str41En, pageContent.str41Bn)}</label>
                    <textarea
                      name="desc"
                      required
                      rows={3}
                      value={ticketForm.desc}
                      onChange={handleTicketChange}
                      placeholder={t(pageContent.str42En, pageContent.str42Bn)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-cyan resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-linear-to-r from-brand-blue to-brand-cyan text-brand-dark py-3.5 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:opacity-95 flex justify-center items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                      {t(pageContent.str43En, pageContent.str43Bn)}
                    </>
                  ) : (
                    t(pageContent.str44En, pageContent.str44Bn)
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-pulse">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h3 className="text-slate-900 font-bold text-xl">{t(pageContent.str45En, pageContent.str45Bn)}</h3>
                  <p className="text-sm text-slate-600">
                    {t(pageContent.str46En, pageContent.str46Bn)}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-sm mx-auto font-mono text-left text-slate-700">
                  <div className="flex justify-between border-b border-slate-200 pb-2 mb-2 text-xs text-slate-500">
                    <span>{t(pageContent.str47En, pageContent.str47Bn)}</span>
                    <span className="text-brand-blue font-bold">{ticketCreated}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2 mb-2 text-xs text-slate-500">
                    <span>{t(pageContent.str48En, pageContent.str48Bn)}</span>
                    <span className="text-slate-800 font-bold">{ticketForm.clientId}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2 mb-2 text-xs text-slate-500">
                    <span>{t(pageContent.str49En, pageContent.str49Bn)}</span>
                    <span className="text-slate-800 font-semibold">{translateCategory(ticketForm.category)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{t(pageContent.str50En, pageContent.str50Bn)}</span>
                    <span className="text-emerald-600 font-bold">{t(pageContent.str51En, pageContent.str51Bn)}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  {t(pageContent.str52En, pageContent.str52Bn)}
                </p>

                <button
                  onClick={resetTicketForm}
                  className="px-6 py-2 rounded-xl bg-slate-200 hover:bg-slate-350/80 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  {t(pageContent.str53En, pageContent.str53Bn)}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-extrabold text-white">{t(pageContent.str54En, pageContent.str54Bn)}</h3>
          <p className="text-xs text-slate-400 mt-1">{t(pageContent.str55En, pageContent.str55Bn)}</p>
        </div>

        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-brand-border bg-brand-card/45 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-sm sm:text-base font-bold text-white hover:bg-brand-border/30 transition-colors text-left cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-brand-cyan transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="p-5 border-t border-brand-border/40 text-sm text-slate-300 leading-relaxed bg-brand-dark/40 text-left">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
