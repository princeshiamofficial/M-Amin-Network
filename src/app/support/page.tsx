"use client";

import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface FAQItem {
  q: string;
  a: string;
}

export default function Support() {
  const lang = useTranslation();
  const t = (en: string, bn: string) => (lang === "BN" ? bn : en);

  const translateCategory = (cat: string) => {
    if (cat === "Speed Issue") return t("Speed Drop / Sluggish Internet", "ধীরগতির ইন্টারনেট / স্পিড কম");
    if (cat === "Frequent Disconnect") return t("Frequent Disconnections", "বারবার ডিসকানেক্ট হওয়া");
    if (cat === "Billing Issue") return t("Billing / Invoice Query", "বিল বা চালান সংক্রান্ত জিজ্ঞাসা");
    if (cat === "Physical Cable Broken") return t("Physical Cable / Fiber line broken", "ফাইবার অপটিক তার কেটে যাওয়া");
    if (cat === "Other") return t("Other / Configuration support", "অন্যান্য / রাউটার কনফিগারেশন সাপোর্ট");
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

  const faqs: FAQItem[] = [
    {
      q: t(
        "How can I pay my M Amin Network monthly broadband bill?",
        "আমি কীভাবে আমার এম আমিন নেটওয়ার্কের মাসিক ব্রডব্যান্ড বিল পরিশোধ করতে পারি?"
      ),
      a: t(
        "You can pay your bill securely online via our Quick Pay portal using bKash, Nagad, Rocket, or Visa/Mastercard. You can also pay by visiting our office in Kadomtoli, or request a cash collection representative (for specific packages).",
        "আপনি বিকাশ, নগদ, রকেট বা ভিসা/মাস্টারকার্ড ব্যবহার করে আমাদের কুইক পে পোর্টালের মাধ্যমে নিরাপদে অনলাইনে বিল পরিশোধ করতে পারেন। কদমতলীতে আমাদের অফিসে এসেও বিল দিতে পারেন অথবা ক্যাশ কালেকশন প্রতিনিধির অনুরোধ করতে পারেন।"
      ),
    },
    {
      q: t(
        "What should I do if my internet connection is slow?",
        "আমার ইন্টারনেট সংযোগ ধীরগতির হলে আমার কী করা উচিত?"
      ),
      a: t(
        "First, reboot your optical ONU (small black box) and Wi-Fi router by turning them off for 30 seconds. Check if there are background downloads running on other devices. You can also run our diagnostics test above to inspect the status of your fiber line signal.",
        "প্রথমে আপনার অপটিক্যাল ওএনইউ (ছোট কালো বক্স) এবং ওয়াই-ফাই রাউটারটি ৩০ সেকেন্ডের জন্য বন্ধ করে পুনরায় চালু করুন। অন্যান্য ডিভাইসে ব্যাকগ্রাউন্ড ডাউনলোড চলছে কিনা তা পরীক্ষা করুন। লাইন সিগন্যাল পরীক্ষা করতে উপরে আমাদের ডায়াগনস্টিকস টেস্ট চালাতে পারেন।"
      ),
    },
    {
      q: t(
        "Can I request a Static Public IP for server hosting or gaming?",
        "আমি কি সার্ভার হোস্টিং বা গেমিংয়ের জন্য স্ট্যাটিক পাবলিক আইপির জন্য অনুরোধ করতে পারি?"
      ),
      a: t(
        "Yes! Static Public IP addresses are available. They are included free of charge with all Gamer Professional, Gamer Champion, and Corporate Dedicated packages. For home packages, you can purchase a static IP for a nominal charge of ৳150/month. Contact support to activate.",
        "হ্যাঁ! স্ট্যাটিক পাবলিক আইপি উপলব্ধ রয়েছে। এটি আমাদের গেমার ও কর্পোরেট প্যাকেজগুলোর সাথে বিনামূল্যে দেওয়া হয়। হোম প্যাকেজের জন্য প্রতি মাসে মাত্র ৳১৫০ ফি দিয়ে আপনি এটি সচল করতে পারেন।"
      ),
    },
    {
      q: t(
        "What does the AS150164 BGP network mean for my connection?",
        "AS150164 বিজিপি নেটওয়ার্ক আমার সংযোগের জন্য কী সুবিধা নিয়ে আসে?"
      ),
      a: t(
        "Having our own Autonomous System (AS150164) and Border Gateway Protocol routing means we have direct routing lines to international gateways. In case of an upstream fiber cut, our network automatically switches to backup routing paths, guaranteeing uninterrupted uptime.",
        "আমাদের নিজস্ব স্বায়ত্তশাসিত সিস্টেম (AS150164) and বিজিপি রাউটিং থাকার মানে হলো আন্তর্জাতিক গেটওয়ের সাথে আমাদের সরাসরি রুট রয়েছে। মূল লাইনে ত্রুটি দেখা দিলে আমাদের নেটওয়ার্ক ব্যাকআপ পাথে স্যুইচ করে গ্রাহকের নিরবচ্ছিন্ন সংযোগ নিশ্চিত করে।"
      ),
    },
    {
      q: t(
        "How long does it take to repair a broken physical fiber cable?",
        "একটি কাটা ফাইবার ক্যাবল মেরামত করতে কত সময় লাগে?"
      ),
      a: t(
        "Our South Keraniganj field maintenance team operates 24/7. Physical line breaks caused by construction or weather are typically patched and re-spliced within 2 to 4 hours from the ticket report time.",
        "আমাদের দক্ষিণ কেরানীগঞ্জের ফিল্ড টিম ২৪/৭ নিয়োজিত রয়েছে। ঝড়-বৃষ্টি বা উন্নয়ন কাজের কারণে ক্যাবল কেটে গেলে অভিযোগ পাওয়ার ২ থেকে ৪ ঘণ্টার মধ্যে তা মেরামত সম্পন্ন করা হয়।"
      ),
    },
  ];

  // Run simulated diagnostics
  const handleDiagnostics = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId.trim()) return;

    setDiagStep(0);
    setDiagLogs([]);
    setDiagResult(null);

    const steps = [
      t("Querying BGP AS150164 routing tables...", "BGP AS150164 রাউটিং টেবিল অনুসন্ধান করা হচ্ছে..."),
      t("Peering with localized gateway nodes...", "স্থানীয় গেটওয়ে নোড সংযোগ করা হচ্ছে..."),
      t("Analyzing optical signal strength (SFP Power)...", "অপটিক্যাল সিগন্যাল পাওয়ার বিশ্লেষণ করা হচ্ছে..."),
      t("Pinging customer optical network terminal (ONT)...", "গ্রাহকের ওএনইউ (ONT) পিং করা হচ্ছে..."),
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
            msg: t(
              "ONT Offline: Fiber signal strength is perfect (-18.5 dBm), but customer router is disconnected. Please check if your router is powered on and the blue/green fiber patch cord is plugged in securely.",
              "ওএনইউ অফলাইন: ফাইবার সিগন্যাল মান ঠিক আছে (-১৮.৫ dBm), কিন্তু আপনার রাউটারটি সংযুক্ত নেই। অনুগ্রহ করে রাউটারের পাওয়ার এবং নীল/সবুজ প্যাচ কর্ডটি ঠিকঠাক লাগানো আছে কিনা চেক করুন।"
            ),
          });
        } else {
          setDiagResult({
            status: "success",
            msg: t(
              "ONT Online: Connection Excellent! RX Optical Power: -19.2 dBm (Signal healthy). Network Ping: 2.1ms to gateway. Current Package speed allocated: 30 Mbps Gamer Pack. No traffic restrictions.",
              "ওএনইউ অনলাইন: সংযোগ চমৎকার! অপটিক্যাল পাওয়ার: -১৯.২ dBm (স্বাস্থ্যকর)। গেটওয়ে পিং: ২.১ মিলি-сеকেন্ড। বরাদ্দকৃত প্যাকেজ স্পিড: ৩০ এমবিপিএস গেমার প্যাক। কোনো ট্রাফিক সীমাবদ্ধতা নেই।"
            ),
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
      setIsSubmitting(false);
      setTicketCreated(`TKT-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 flex-grow">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-white tracking-tight text-center w-full block">
          {t("Smart Diagnostics & ", "স্মার্ট ডায়াগনস্টিকস ও ")}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue text-glow">
            {t("Support Center", "সহায়তা কেন্দ্র")}
          </span>
        </h1>
        <p className="text-slate-400 mt-4 text-sm sm:text-base text-center">
          {t(
            "Troubleshoot your fiber line instantly using our automated link ping analyzer or submit a support ticket directly to our localized Keraniganj support engineers.",
            "আমাদের স্বয়ংক্রিয় বিশ্লেষকের মাধ্যমে আপনার ফাইবার লাইন তাৎক্ষণিকভাবে পরীক্ষা করুন অথবা সরাসরি আমাদের কদমতলী অফিসের সাপোর্ট ইঞ্জিনিয়ারদের কাছে টিকিট দাখিল করুন।"
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        {/* Left Column: Diagnostics Tool */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel border-brand-border/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl flex flex-col text-left">
            <div>
              <span className="bg-brand-blue/15 text-brand-cyan text-[10px] font-bold tracking-widest px-2.5 py-1 rounded border border-brand-cyan/20 uppercase">
                {t("Self Diagnostics", "স্বয়ংক্রিয় রোগনির্ণয়")}
              </span>
              <h3 className="text-white font-extrabold text-xl mt-3">{t("Fiber Link Diagnostics", "ফাইবার লাইন ডায়াগনস্টিকস")}</h3>
              <p className="text-xs text-slate-400 mt-1">
                {t("Enter your Client ID to run automated routing and power tests. (Tip: Try entering ", "স্বয়ংক্রিয় পরীক্ষার জন্য আপনার ক্লায়েন্ট আইডি লিখুন। (পরীক্ষার জন্য ")}
                <code className="text-brand-cyan font-mono bg-brand-dark px-1.5 py-0.5 rounded">MAN-9988</code>
                {t(" to test offline scenario)", " লিখতে পারেন)")}
              </p>
            </div>

            <form onSubmit={handleDiagnostics} className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. MAN-5432"
                required
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan flex-grow font-mono"
              />
              <button
                type="submit"
                disabled={diagStep >= 0 && diagStep < 4}
                className="bg-brand-blue text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-brand-blue/90 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {t("Test Link", "পরীক্ষা করুন")}
              </button>
            </form>

            {/* Diagnostics progress terminal */}
            {diagStep >= 0 && (
              <div className="bg-black/80 rounded-2xl p-5 font-mono text-xs border border-brand-border text-left space-y-2 max-w-full overflow-hidden shadow-inner">
                <div className="flex items-center justify-between border-b border-brand-border/40 pb-2 mb-3">
                  <span className="text-[10px] text-slate-400 font-bold">{t("DIAGNOSTIC TERMINAL", "ডায়াগনস্টিক টার্মিনাল")}</span>
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
                      <div className="w-3.5 h-3.5 border border-slate-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                      <span className="animate-pulse">{t("Measuring metrics...", "মেট্রিক্স পরিমাপ করা হচ্ছে...")}</span>
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
                        {diagResult.status === "success" ? t("LINK EXCELLENT", "সংযোগ চমৎকার") : t("CONNECTION ISSUE DETECTED", "সংযোগের সমস্যা সনাক্ত হয়েছে")}
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
          <div className="glass-panel border-brand-border/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl text-left">
            {!ticketCreated ? (
              <form onSubmit={handleTicketSubmit} className="space-y-5 text-left">
                <div>
                  <span className="bg-brand-blue/15 text-brand-cyan text-[10px] font-bold tracking-widest px-2.5 py-1 rounded border border-brand-cyan/20 uppercase">
                    {t("Support Ticket", "সহায়তা টিকিট")}
                  </span>
                  <h3 className="text-white font-extrabold text-xl mt-3">{t("Submit Connectivity Issue", "সংযোগের সমস্যা জানান")}</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {t(
                      "Describe your issue and register a physical support ticket. Our team resolves all network line issues within 2-4 hours.",
                      "আপনার সমস্যা বর্ণনা করে টিকিট বুক করুন। আমাদের টিম ২-৪ ঘণ্টার মধ্যে সমস্ত ফাইবার লাইন মেরামত সম্পন্ন করে থাকে।"
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">{t("Client ID (Required)", "ক্লায়েন্ট আইডি (আবশ্যক)")}</label>
                      <input
                        type="text"
                        name="clientId"
                        required
                        value={ticketForm.clientId}
                        onChange={handleTicketChange}
                        placeholder="e.g. MAN-5432"
                        className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan font-mono"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">{t("Full Name", "আপনার নাম")}</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={ticketForm.name}
                        onChange={handleTicketChange}
                        placeholder="e.g. Kamrul Hasan"
                        className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">{t("Phone Number", "মোবাইল নম্বর")}</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={ticketForm.phone}
                        onChange={handleTicketChange}
                        placeholder="e.g. 01707009267"
                        className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">{t("Issue Category", "সমস্যার ধরন")}</label>
                      <select
                        name="category"
                        value={ticketForm.category}
                        onChange={handleTicketChange}
                        className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan cursor-pointer text-slate-300"
                      >
                        <option value="Speed Issue" className="bg-brand-card">{t("Speed Drop / Sluggish Internet", "ধীরগতির ইন্টারনেট / স্পিড কম")}</option>
                        <option value="Frequent Disconnect" className="bg-brand-card">{t("Frequent Disconnections", "বারবার ডিসকানেক্ট হওয়া")}</option>
                        <option value="Billing Issue" className="bg-brand-card">{t("Billing / Invoice Query", "বিল বা চালান সংক্রান্ত জিজ্ঞাসা")}</option>
                        <option value="Physical Cable Broken" className="bg-brand-card">{t("Physical Cable / Fiber line broken", "ফাইবার অপটিক তার কেটে যাওয়া")}</option>
                        <option value="Other" className="bg-brand-card">{t("Other / Configuration support", "অন্যান্য / রাউটার কনফিগারেশন সাপোর্ট")}</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">{t("Describe the problem", "সমস্যার বিবরণ লিখুন")}</label>
                    <textarea
                      name="desc"
                      required
                      rows={3}
                      value={ticketForm.desc}
                      onChange={handleTicketChange}
                      placeholder={t("Explain what lights are blinking on your router or when the problem started...", "আপনার রাউটারে কী লাইট জ্বলছে বা সমস্যাটি কখন শুরু হয়েছে তা লিখুন...")}
                      className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark py-3.5 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:opacity-95 flex justify-center items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                      {t("Registering Ticket...", "টিকিট নিবন্ধিত করা হচ্ছে...")}
                    </>
                  ) : (
                    t("Submit Ticket", "টিকিট জমা দিন")
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
                  <h3 className="text-white font-bold text-xl">{t("Ticket Created!", "টিকিট তৈরি হয়েছে!")}</h3>
                  <p className="text-sm text-slate-400">
                    {t("We have successfully registered your support request.", "আমরা সফলভাবে আপনার সহায়তার অনুরোধটি নথিভুক্ত করেছি।")}
                  </p>
                </div>

                <div className="bg-brand-dark border border-brand-border rounded-2xl p-5 max-w-sm mx-auto font-mono text-left">
                  <div className="flex justify-between border-b border-brand-border/40 pb-2 mb-2 text-xs text-slate-400">
                    <span>{t("Ticket Reference", "টিকিট রেফারেন্স নম্বর")}</span>
                    <span className="text-brand-cyan font-bold">{ticketCreated}</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-border/40 pb-2 mb-2 text-xs text-slate-400">
                    <span>{t("Client ID", "ক্লায়েন্ট আইডি")}</span>
                    <span className="text-white font-bold">{ticketForm.clientId}</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-border/40 pb-2 mb-2 text-xs text-slate-400">
                    <span>{t("Issue Type", "সমস্যার ধরন")}</span>
                    <span className="text-white font-semibold">{translateCategory(ticketForm.category)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{t("Assigned Queue", "নির্ধারিত কর্মীদল")}</span>
                    <span className="text-emerald-400 font-bold">{t("Keraniganj Field Team", "কেরানীগঞ্জ ফিল্ড টিম")}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                  {t(
                    "A support coordinator is reviewing your details. In case a line splicing survey is required, a field worker will carry out inspection within 2 hours.",
                    "একজন কর্মকর্তা আপনার টিকিটটি পর্যালোচনা করছেন। যদি লাইন মেরামতের প্রয়োজন হয়, তবে ২ ঘণ্টার মধ্যে একজন কর্মী আপনার ঠিকানায় উপস্থিত হবেন।"
                  )}
                </p>

                <button
                  onClick={resetTicketForm}
                  className="px-6 py-2 rounded-xl bg-brand-border hover:bg-brand-border/80 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {t("Create Another Ticket", "আরেকটি টিকিট খুলুন")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-extrabold text-white">{t("Frequently Asked Questions", "সাধারণ জিজ্ঞাসা (FAQ)")}</h3>
          <p className="text-xs text-slate-400 mt-1">{t("Get immediate answers to standard broadband setup queries", "ব্রডব্যান্ড সংযোগ ও সাধারণ জিজ্ঞাসাগুলোর তাৎক্ষণিক উত্তর")}</p>
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
                    className={`w-5 h-5 text-brand-cyan transition-transform duration-200 flex-shrink-0 ml-4 ${
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
