"use client";

import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface JobOpening {
  title: string;
  dept: string;
  location: string;
  type: string;
  desc: string;
  requirements: string[];
}

export default function Careers() {
  const lang = useTranslation();
  const t = (en: string, bn: string) => (lang === "BN" ? bn : en);

  const translateDept = (dept: string) => {
    if (dept === "Network Engineering & Maintenance") return t("Network Engineering & Maintenance", "নেটওয়ার্ক ইঞ্জিনিয়ারিং ও রক্ষণাবেক্ষণ");
    if (dept === "Helpdesk Operations") return t("Helpdesk Operations", "হেল্পডেস্ক অপারেশনস");
    if (dept === "Infrastructure Operations") return t("Infrastructure Operations", "ইনফ্রাস্ট্রাকচার অপারেশনস");
    return dept;
  };

  const translateJobTitle = (title: string) => {
    if (title === "Support Technician (Field Operations)") return t("Support Technician (Field Operations)", "সহায়তা টেকনিশিয়ান (ফিল্ড অপারেশন)");
    if (title === "Customer Support Executive") return t("Customer Support Executive", "কাস্টমার সাপোর্ট এক্সিকিউটিভ");
    if (title === "Junior Network Engineer") return t("Junior Network Engineer", "জুনিয়র নেটওয়ার্ক ইঞ্জিনিয়ার");
    return title;
  };

  const translateLocation = (loc: string) => {
    if (loc === "South Keraniganj") return t("South Keraniganj", "দক্ষিণ কেরানীগঞ্জ");
    if (loc === "Kadomtoli Office, Dhaka") return t("Kadomtoli Office, Dhaka", "কদমতলী অফিস, ঢাকা");
    return loc;
  };

  const translateJobType = (type: string) => {
    if (type === "Full-Time") return t("Full-Time", "পূর্ণকালীন");
    return type;
  };

  const translateJobDesc = (desc: string) => {
    if (desc.startsWith("We are looking for dedicated")) return t("We are looking for dedicated field technicians to lay fiber cables, splice optical lines, install ONTs, and troubleshoot client premises issues.", "আমরা ফাইবার ক্যাবল স্থাপন, অপটিক্যাল লাইন স্প্লাইসিং, ওএনটি ইনস্টল এবং গ্রাহকের সংযোগ সমস্যার সমাধান করার জন্য ডেডিকেটেড ফিল্ড টেকনিশিয়ান খুঁজছি।");
    if (desc.startsWith("Manage customer queries")) return t("Manage customer queries, guide clients through router reboots, catalog support tickets, and direct field teams to fiber line breaks.", "গ্রাহকের জিজ্ঞাসা পরিচালনা, রাউটার রিবুট গাইডলাইন প্রদান, সাপোর্ট টিকিট ক্যাটালগ এবং ফিল্ড টিমকে লাইন মেরামতের নির্দেশ প্রদান করা।");
    if (desc.startsWith("Assist in monitoring the BGP")) return t("Assist in monitoring the BGP network (AS150164), configure OLT splitters, manage DNS and local caching servers (FTP, BDIX).", "বিজিপি নেটওয়ার্ক (AS150164) পর্যবেক্ষণ, ওএলটি স্প্লিটার কনফিগারেশন, ডিএনএস এবং লোকাল ক্যাশিং সার্ভার (এফটিপি, বিডিআইএক্স) পরিচালনায় সহায়তা করা।");
    return desc;
  };

  const translateRequirement = (req: string) => {
    if (req === "Prior experience in fiber splicing (laser splicing machines)") return t("Prior experience in fiber splicing (laser splicing machines)", "ফাইবার স্প্লাইসিংয়ে (লেজার স্প্লাইসিং মেশিন) পূর্ব অভিজ্ঞতা");
    if (req === "Familiarity with OLT port configs & client router configurations") return t("Familiarity with OLT port configs & client router configurations", "ওএলটি পোর্ট এবং ক্লায়েন্ট রাউটার কনফিগারেশন সম্পর্কে ধারণা");
    if (req === "Willingness to travel around South Keraniganj neighborhoods") return t("Willingness to travel around South Keraniganj neighborhoods", "দক্ষিণ কেরানীগঞ্জের বিভিন্ন এলাকায় যাতায়াতের মানসিকতা");
    if (req === "Excellent communication and problem-solving skills") return t("Excellent communication and problem-solving skills", "চমৎকার যোগাযোগ ও সমস্যা সমাধানের দক্ষতা");
    if (req === "Higher Secondary Certificate (HSC) or Bachelor degree") return t("Higher Secondary Certificate (HSC) or Bachelor degree", "উচ্চ মাধ্যমিক সার্টিফিকেট (এইচএসসি) বা স্নাতক ডিগ্রি");
    if (req === "Polite tone and high patience for user support") return t("Polite tone and high patience for user support", "গ্রাহক সেবার জন্য নম্র কণ্ঠস্বর এবং উচ্চ ধৈর্যশীলতা");
    if (req === "Basic computer knowledge (Google Sheets, ticket dashboards)") return t("Basic computer knowledge (Google Sheets, ticket dashboards)", "বেসিক কম্পিউটার জ্ঞান (গুগল শিট, টিকিট ড্যাশবোর্ড)");
    if (req === "Ability to speak fluent Bangla (English is a plus)") return t("Ability to speak fluent Bangla (English is a plus)", "সাবলীল বাংলায় কথা বলার ক্ষমতা (ইংরেজি জানা অতিরিক্ত যোগ্যতা হিসেবে বিবেচিত)");
    if (req === "Diploma in Computer/Telecommunication Engineering or CCNA certified") return t("Diploma in Computer/Telecommunication Engineering or CCNA certified", "কম্পিউটার/টেলিকমিউনিকেশন ইঞ্জিনিয়ারিংয়ে ডিপ্লোমা অথবা সিসিএনএ সার্টিফাইড");
    if (req === "Familiarity with Mikrotik RouterOS and basic Linux scripting") return t("Familiarity with Mikrotik RouterOS and basic Linux scripting", "মাইক্রোটিক রাউটার ওএস এবং বেসিক লিনাক্স স্ক্রিপ্টিংয়ে ধারণা");
    if (req === "Understanding of IPv4 subnetting and dynamic BGP routing") return t("Understanding of IPv4 subnetting and dynamic BGP routing", "IPv4 সাবনেটিং এবং ডায়নামিক বিজিপি রাউটিং সম্পর্কে ধারণা");
    if (req === "Willingness to work in rotating shifts") return t("Willingness to work in rotating shifts", "রোটেটিং শিফটে কাজ করার মানসিকতা");
    return req;
  };

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
          {t("Join M Amin Network", "এম আমিন নেটওয়ার্ক পরিবারে যোগ দিন")}
        </span>
        <h1 className="text-4xl font-extrabold text-white tracking-tight mt-3 text-center w-full block">
          {t("Careers & ", "ক্যারিয়ার ও ")}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue text-glow">
            {t("Opportunities", "সুযোগসমূহ")}
          </span>
        </h1>
        <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed text-center">
          {t(
            "Work with South Keraniganj's leading network engineers. We offer attractive bonuses, hands-on training on optical line terminals, and CCNA certifications sponsorship.",
            "দক্ষিণ কেরানীগঞ্জের শীর্ষস্থানীয় নেটওয়ার্ক ইঞ্জিনিয়ারদের সাথে কাজ করুন। আমরা আকর্ষণীয় বোনাস, অপটিক্যাল লাইনের ওপর ব্যবহারিক প্রশিক্ষণ ও সিসিএনএ সার্টিফিকেশনের সহায়তা প্রদান করি।"
          )}
        </p>
      </div>

      {/* Job Postings Grid */}
      <div className="space-y-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-6">{t("Active Open Positions", "চলমান খালি পদসমূহ")}</h2>
        {jobs.map((job, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-brand-card/40 border border-brand-border/60 glass-panel shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left"
          >
            <div className="space-y-2 max-w-2xl text-left">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/20 px-2 py-0.5 rounded font-semibold">
                  {translateDept(job.dept)}
                </span>
                <span className="text-slate-500 font-mono">
                  {translateLocation(job.location)} | {translateJobType(job.type)}
                </span>
              </div>
              <h3 className="text-white font-extrabold text-lg tracking-tight">{translateJobTitle(job.title)}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{translateJobDesc(job.desc)}</p>
            </div>
            <button
              onClick={() => setSelectedJob(job)}
              className="bg-brand-blue text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-brand-blue/90 transition-colors flex-shrink-0 cursor-pointer"
            >
              {t("View & Apply", "বিস্তারিত ও আবেদন")}
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
              <form onSubmit={handleApplySubmit} className="space-y-5 text-left">
                <div>
                  <h3 className="text-white font-bold text-xl">{t("Apply for Job", "চাকরির জন্য আবেদন")}</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {t("Position:", "পদবি:")} <span className="text-brand-cyan font-bold">{translateJobTitle(selectedJob.title)}</span>
                  </p>
                </div>

                {/* Job requirements details list */}
                <div className="bg-brand-dark border border-brand-border/60 rounded-2xl p-4 space-y-2 text-left">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t("Candidate Requirements:", "প্রার্থীর যোগ্যতা ও প্রয়োজনীয়তা:")}</h4>
                  <ul className="space-y-1">
                    {selectedJob.requirements.map((req, reqIdx) => (
                      <li key={reqIdx} className="text-xs text-slate-300 flex items-start gap-1.5 leading-relaxed text-left">
                        <span className="text-brand-cyan font-bold">•</span>
                        <span>{translateRequirement(req)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4 text-left">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">{t("Full Name", "আপনার নাম")}</label>
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
                      <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">{t("Phone Number", "মোবাইল নম্বর")}</label>
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
                      <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">{t("Email Address", "ইমেইল ঠিকানা")}</label>
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
                      <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">{t("Experience Level", "অভিজ্ঞতার লেভেল")}</label>
                      <select
                        name="experience"
                        value={applyForm.experience}
                        onChange={handleApplyChange}
                        className="bg-brand-dark border border-brand-border rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-brand-cyan cursor-pointer"
                      >
                        <option value="Entry Level" className="bg-brand-card">{t("Entry Level (No experience)", "এন্ট্রি লেভেল (অভিজ্ঞতা প্রয়োজন নেই)")}</option>
                        <option value="1-2 Years" className="bg-brand-card">{t("1 - 2 Years Experience", "১ - ২ বছরের অভিজ্ঞতা")}</option>
                        <option value="3+ Years" className="bg-brand-card">{t("3+ Years Experience", "৩+ বছরের অভিজ্ঞতা")}</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">{t("Resume Link (Google Drive / DropBox)", "জীবনবৃত্তান্ত (লিংক)")}</label>
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
                      {t("Submitting Application...", "আবেদন জমা দেওয়া হচ্ছে...")}
                    </>
                  ) : (
                    t("Submit Application", "আবেদন জমা দিন")
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
                  <h3 className="text-white font-bold text-xl">{t("Application Received!", "আবেদনপত্র গৃহীত হয়েছে!")}</h3>
                  <p className="text-sm text-slate-400">
                    {t("Thank you", "ধন্যবাদ")}, <span className="text-slate-200 font-bold">{applyForm.name}</span>. {t("We have saved your application request for", "আমরা আপনার আবেদনপত্রটি সংরক্ষণ করেছি:")}{" "}
                    <span className="text-brand-cyan font-bold">{translateJobTitle(selectedJob.title)}</span>।
                  </p>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {t(
                    "Our HR coordinator will review your submitted resume link and credentials. In case your background aligns with our operational needs, our office team will contact you for an in-person interview at our Kadomtoli branch.",
                    "আমাদের এইচআর টিম আপনার জীবনবৃত্তান্ত এবং দক্ষতা পর্যালোচনা করবেন। আপনার প্রোফাইলটি যদি আমাদের চাহিদার সাথে মিলে যায়, তবে পরবর্তী সাক্ষাৎকারের জন্য আপনার সাথে সরাসরি কদমতলী অফিস থেকে যোগাযোগ করা হবে।"
                  )}
                </p>

                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-xl bg-brand-border hover:bg-brand-border/80 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {t("Close Window", "উইন্ডো বন্ধ করুন")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
