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

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLoc, setSelectedLoc] = useState("All");

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

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      translateJobTitle(job.title).toLowerCase().includes(searchTerm.toLowerCase()) ||
      translateDept(job.dept).toLowerCase().includes(searchTerm.toLowerCase()) ||
      translateJobDesc(job.desc).toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDept === "All" || job.dept === selectedDept;
    const matchesType = selectedType === "All" || job.type === selectedType;
    const matchesLoc = selectedLoc === "All" || job.location === selectedLoc;

    return matchesSearch && matchesDept && matchesType && matchesLoc;
  });

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
    <div className="w-full min-h-screen flex flex-col relative">
      {/* Background glow (decorative top background) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue/5 blur-[120px] pointer-events-none" />

      {/* Header Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full text-left relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-6">
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
      </div>

      {/* Job Postings Section - White Background */}
      <div className="w-full bg-white text-slate-800 py-16 flex-grow border-t border-slate-200 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Open Positions Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">{t("Open Positions", "উন্মুক্ত পদসমূহ")}</h2>
              <p className="text-xs text-slate-500 mt-1 font-semibold">
                {filteredJobs.length} {filteredJobs.length === 1 ? t("position found", "টি পদ পাওয়া গেছে") : t("positions found", "টি পদ পাওয়া গেছে")}
              </p>
            </div>
            <button
              onClick={() => setSelectedJob({
                title: "General Application",
                dept: "General Support",
                location: "Any Location",
                type: "Full-Time",
                desc: "Submit your credentials for future openings if you don't find a matching active posting.",
                requirements: [
                  "Strong willingness to work with M Amin Network team",
                  "Self-motivated & proactive learning attitude",
                  "Basic telecommunication or computer knowledge"
                ]
              })}
              className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <span>{t("General Application", "সাধারণ আবেদন")}</span>
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Search & Filter Bar Row */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-4 sm:p-5 mb-8 flex flex-col gap-4 shadow-inner">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
              {/* Search Input (Takes 5 cols) */}
              <div className="lg:col-span-5 relative flex items-center">
                <span className="absolute left-3.5 text-slate-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder={t("Search title, department, keyword...", "পদবি, বিভাগ বা কিওয়ার্ড অনুসন্ধান করুন...")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-brand-blue transition-all"
                />
              </div>

              {/* Department Dropdown (Takes 3 cols) */}
              <div className="lg:col-span-3">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-600 focus:outline-none focus:border-brand-blue cursor-pointer"
                >
                  <option value="All">{t("All departments", "সকল বিভাগ")}</option>
                  <option value="Network Engineering & Maintenance">{t("Engineering & Maintenance", "ইঞ্জিনিয়ারিং ও রক্ষণাবেক্ষণ")}</option>
                  <option value="Helpdesk Operations">{t("Helpdesk Operations", "হেল্পডেস্ক অপারেশনস")}</option>
                  <option value="Infrastructure Operations">{t("Infrastructure Operations", "ইনফ্রাস্ট্রাকচার অপারেশনস")}</option>
                </select>
              </div>

              {/* Type Dropdown (Takes 2 cols) */}
              <div className="lg:col-span-2">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-600 focus:outline-none focus:border-brand-blue cursor-pointer"
                >
                  <option value="All">{t("All types", "সকল টাইপ")}</option>
                  <option value="Full-Time">{t("Full-Time", "পূর্ণকালীন")}</option>
                </select>
              </div>

              {/* Location Dropdown (Takes 2 cols) */}
              <div className="lg:col-span-2">
                <select
                  value={selectedLoc}
                  onChange={(e) => setSelectedLoc(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-600 focus:outline-none focus:border-brand-blue cursor-pointer"
                >
                  <option value="All">{t("All locations", "সকল লোকেশন")}</option>
                  <option value="South Keraniganj">{t("South Keraniganj", "দক্ষিণ কেরানীগঞ্জ")}</option>
                  <option value="Kadomtoli Office, Dhaka">{t("Kadomtoli Office, Dhaka", "কদমতলী অফিস, ঢাকা")}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Job Postings Grid */}
          <div className="space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-slate-50 border border-slate-200/60 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left"
                >
                  <div className="space-y-2 max-w-2xl text-left">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="bg-cyan-50 text-cyan-700 border border-cyan-100 px-2 py-0.5 rounded font-semibold font-mono">
                        {translateDept(job.dept)}
                      </span>
                      <span className="text-slate-500 font-mono">
                        {translateLocation(job.location)} | {translateJobType(job.type)}
                      </span>
                    </div>
                    <h3 className="text-slate-900 font-extrabold text-lg tracking-tight">{translateJobTitle(job.title)}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{translateJobDesc(job.desc)}</p>
                  </div>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="bg-brand-blue text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-brand-blue/90 transition-colors flex-shrink-0 cursor-pointer shadow-sm"
                  >
                    {t("View & Apply", "বিস্তারিত ও আবেদন")}
                  </button>
                </div>
              ))
            ) : (
              <div className="p-12 text-center bg-slate-50 border border-slate-200/60 rounded-3xl">
                <svg className="w-12 h-12 text-slate-350 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-slate-700 font-bold text-sm">{t("No open positions match your search criteria", "কোনো পদের সন্ধান মেলেনি")}</h3>
                <p className="text-xs text-slate-400 mt-1">{t("Try adjusting your keywords or clearing selected filters.", "অনুগ্রহ করে আপনার ফিল্টার বা কিওয়ার্ড পরিবর্তন করে পুনরায় চেষ্টা করুন।")}</p>
              </div>
            )}
          </div>
        </div>

        {/* Apply Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl p-6 sm:p-8 max-w-lg w-full relative max-h-[90vh] overflow-y-auto text-slate-800">
              <button
                onClick={resetForm}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {!success ? (
                <form onSubmit={handleApplySubmit} className="space-y-5 text-left">
                  <div>
                    <h3 className="text-slate-900 font-bold text-xl">{t("Apply for Job", "চাকরির জন্য আবেদন")}</h3>
                    <p className="text-xs text-slate-505 mt-1">
                      {t("Position:", "পদবি:")} <span className="text-brand-blue font-bold">{translateJobTitle(selectedJob.title)}</span>
                    </p>
                  </div>

                  {/* Job requirements details list */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2 text-left">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">{t("Candidate Requirements:", "প্রার্থীর যোগ্যতা ও প্রয়োজনীয়তা:")}</h4>
                    <ul className="space-y-1">
                      {selectedJob.requirements.map((req, reqIdx) => (
                        <li key={reqIdx} className="text-xs text-slate-600 flex items-start gap-1.5 leading-relaxed text-left">
                          <span className="text-brand-blue font-bold">•</span>
                          <span>{translateRequirement(req)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4 text-left">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Full Name", "আপনার নাম")}</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={applyForm.name}
                        onChange={handleApplyChange}
                        placeholder="e.g. Tanvir Ahmed"
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Phone Number", "মোবাইল নম্বর")}</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={applyForm.phone}
                          onChange={handleApplyChange}
                          placeholder="e.g. 01707009267"
                          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Email Address", "ইমেইল ঠিকানা")}</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={applyForm.email}
                          onChange={handleApplyChange}
                          placeholder="e.g. name@example.com"
                          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Experience Level", "অভিজ্ঞতার লেভেল")}</label>
                        <select
                          name="experience"
                          value={applyForm.experience}
                          onChange={handleApplyChange}
                          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-brand-blue focus:bg-white transition-all cursor-pointer"
                        >
                          <option value="Entry Level" className="bg-white">{t("Entry Level (No experience)", "এন্ট্রি লেভেল (অভিজ্ঞতা প্রয়োজন নেই)")}</option>
                          <option value="1-2 Years" className="bg-white">{t("1 - 2 Years Experience", "১ - ২ বছরের অভিজ্ঞতা")}</option>
                          <option value="3+ Years" className="bg-white">{t("3+ Years Experience", "৩+ বছরের অভিজ্ঞতা")}</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Resume Link (Google Drive / DropBox)", "জীবনবৃত্তান্ত (লিংক)")}</label>
                        <input
                          type="url"
                          name="resumeLink"
                          required
                          value={applyForm.resumeLink}
                          onChange={handleApplyChange}
                          placeholder="e.g. https://drive.google.com/..."
                          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-brand-blue to-brand-cyan text-white py-3.5 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:opacity-95 flex justify-center items-center gap-2 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t("Submitting Application...", "আবেদন জমা দেওয়া হচ্ছে...")}
                      </>
                    ) : (
                      t("Submit Application", "আবেদন জমা দিন")
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-500 animate-pulse">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-slate-900 font-bold text-xl">{t("Application Received!", "আবেদনপত্র গৃহীত হয়েছে!")}</h3>
                    <p className="text-sm text-slate-600">
                      {t("Thank you", "ধন্যবাদ")}, <span className="text-slate-800 font-bold">{applyForm.name}</span>. {t("We have saved your application request for", "আমরা আপনার আবেদনপত্রটি সংরক্ষণ করেছি:")}{" "}
                      <span className="text-brand-blue font-bold">{translateJobTitle(selectedJob.title)}</span>।
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {t(
                      "Our HR coordinator will review your submitted resume link and credentials. In case your background aligns with our operational needs, our office team will contact you for an in-person interview at our Kadomtoli branch.",
                      "আমাদের এইচআর টিম আপনার জীবনবৃত্তান্ত এবং দক্ষতা পর্যালোচনা করবেন। আপনার প্রোফাইলটি যদি আমাদের চাহিদার সাথে মিলে যায়, তবে পরবর্তী সাক্ষাৎকারের জন্য আমাদের অফিস টিম সরাসরি কদমতলী শাখা থেকে যোগাযোগ করবেন।"
                    )}
                  </p>

                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {t("Close Window", "উইন্ডো বন্ধ করুন")}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
