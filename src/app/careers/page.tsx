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
  vacancy: string;
  salary: string;
  deadline: string;
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
    if (type === "Full-Time") return t("Full Time", "ফুল টাইম");
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
  const [detailsJob, setDetailsJob] = useState<JobOpening | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  // PDF Parsed form fields state definition
  const [applyForm, setApplyForm] = useState({
    experienceType: "Fresh", // Experienced / Fresh
    nameEn: "",
    nameBn: "",
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    dob: "",
    placeOfBirth: "",
    gender: "Male",
    maritalStatus: "Single",
    spouseName: "",
    childrenCount: "",
    bloodGroup: "",
    religion: "",
    nationality: "Bangladeshi",
    email: "",
    phone: "",
    nidBrc: "",
    emergencyContact: "",

    presentAddress: "",
    permanentAddress: "",
    sameAsPresent: false,

    // Education
    eduMBA_Uni: "", eduMBA_Year: "", eduMBA_CGPA: "", eduMBA_Major: "",
    eduBBA_Uni: "", eduBBA_Year: "", eduBBA_CGPA: "", eduBBA_Major: "",
    eduHSC_Uni: "", eduHSC_Year: "", eduHSC_CGPA: "", eduHSC_Major: "",
    eduSSC_Uni: "", eduSSC_Year: "", eduSSC_CGPA: "", eduSSC_Major: "",
    eduJSC_Uni: "", eduJSC_Year: "", eduJSC_CGPA: "", eduJSC_Major: "",

    // Skills & EC
    otherQualifications: "",
    extracurricular: "",

    // Questionnaire
    motivationReason: "",
    workComfort: "As a part of a team",
    expectations: "",
    criminalOffence: "No",
    criminalDetails: "",

    relativeWorking: "No",
    relativeName: "",
    relativeDesignation: "",
    relativeWorkstation: "",
    relativeRelation: "",

    ref1_name: "", ref1_designation: "", ref1_organization: "", ref1_address: "", ref1_phone: "",
    ref2_name: "", ref2_designation: "", ref2_organization: "", ref2_address: "", ref2_phone: "",

    expectedSalary: "",
    agreed: false,
    signature: "",
    dateOfApply: new Date().toISOString().split("T")[0]
  });

  const [workExperiences, setWorkExperiences] = useState([
    { company: "", designation: "", duration: "", salary: "", reason: "" }
  ]);

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
      vacancy: "5",
      salary: "14,000-20,000",
      deadline: "2026-08-15"
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
      vacancy: "3",
      salary: "15,000-22,000",
      deadline: "2026-08-20"
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
      vacancy: "2",
      salary: "18,000-25,000",
      deadline: "2026-08-25"
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setApplyForm((prev) => {
        const updated = { ...prev, [name]: checked };
        if (name === "sameAsPresent" && checked) {
          updated.permanentAddress = prev.presentAddress;
        }
        return updated;
      });
    } else {
      setApplyForm((prev) => {
        const updated = { ...prev, [name]: value };
        if (name === "presentAddress" && prev.sameAsPresent) {
          updated.permanentAddress = value;
        }
        return updated;
      });
    }
  };

  const handleExperienceChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...workExperiences];
    updated[index] = { ...updated[index], [field]: value };
    setWorkExperiences(updated);
  };

  const addExperience = () => {
    setWorkExperiences([...workExperiences, { company: "", designation: "", duration: "", salary: "", reason: "" }]);
  };

  const removeExperience = (index: number) => {
    if (workExperiences.length > 1) {
      setWorkExperiences(workExperiences.filter((_, idx) => idx !== index));
    }
  };

  const validateAndNext = () => {
    if (currentStep === 1) {
      if (!applyForm.nameEn || !applyForm.nameBn || !applyForm.email || !applyForm.phone || !applyForm.nidBrc) {
        alert(t("Please fill in all required fields (marked with *).", "অনুগ্রহ করে সকল তারকা চিহ্নিত (*) প্রয়োজনীয় ক্ষেত্রগুলো পূরণ করুন।"));
        return;
      }
    }
    if (currentStep === 2) {
      if (!applyForm.presentAddress || (!applyForm.sameAsPresent && !applyForm.permanentAddress)) {
        alert(t("Please enter present and permanent address details.", "অনুগ্রহ করে বর্তমান এবং স্থায়ী ঠিকানা বিবরণ প্রদান করুন।"));
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.agreed || !applyForm.signature) {
      alert(t("Please agree to the certification terms and provide your signature.", "আবেদনপত্র জমা দিতে আপনার সম্মতি দিন এবং স্বাক্ষর প্রদান করুন।"));
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      try {
        const applications = JSON.parse(localStorage.getItem("m_amin_job_applications") || "[]");
        const newApplication = {
          id: `APP-${Date.now().toString().slice(-6)}`,
          position: selectedJob?.title,
          ...applyForm,
          workExperiences,
          dateApplied: new Date().toLocaleString()
        };
        applications.push(newApplication);
        localStorage.setItem("m_amin_job_applications", JSON.stringify(applications));
      } catch (err) {
        console.error("Error saving job application:", err);
      }
      setSubmitting(false);
      setSuccess(true);
    }, 1800);
  };

  const resetForm = () => {
    setApplyForm({
      experienceType: "Fresh",
      nameEn: "",
      nameBn: "",
      fatherName: "",
      fatherOccupation: "",
      motherName: "",
      motherOccupation: "",
      dob: "",
      placeOfBirth: "",
      gender: "Male",
      maritalStatus: "Single",
      spouseName: "",
      childrenCount: "",
      bloodGroup: "",
      religion: "",
      nationality: "Bangladeshi",
      email: "",
      phone: "",
      nidBrc: "",
      emergencyContact: "",

      presentAddress: "",
      permanentAddress: "",
      sameAsPresent: false,

      eduMBA_Uni: "", eduMBA_Year: "", eduMBA_CGPA: "", eduMBA_Major: "",
      eduBBA_Uni: "", eduBBA_Year: "", eduBBA_CGPA: "", eduBBA_Major: "",
      eduHSC_Uni: "", eduHSC_Year: "", eduHSC_CGPA: "", eduHSC_Major: "",
      eduSSC_Uni: "", eduSSC_Year: "", eduSSC_CGPA: "", eduSSC_Major: "",
      eduJSC_Uni: "", eduJSC_Year: "", eduJSC_CGPA: "", eduJSC_Major: "",

      otherQualifications: "",
      extracurricular: "",

      motivationReason: "",
      workComfort: "As a part of a team",
      expectations: "",
      criminalOffence: "No",
      criminalDetails: "",

      relativeWorking: "No",
      relativeName: "",
      relativeDesignation: "",
      relativeWorkstation: "",
      relativeRelation: "",

      ref1_name: "", ref1_designation: "", ref1_organization: "", ref1_address: "", ref1_phone: "",
      ref2_name: "", ref2_designation: "", ref2_organization: "", ref2_address: "", ref2_phone: "",

      expectedSalary: "",
      agreed: false,
      signature: "",
      dateOfApply: new Date().toISOString().split("T")[0]
    });
    setWorkExperiences([{ company: "", designation: "", duration: "", salary: "", reason: "" }]);
    setCurrentStep(1);
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
              onClick={() => {
                setCurrentStep(1);
                setSelectedJob({
                  title: "General Application",
                  dept: "General Support",
                  location: "Any Location",
                  type: "Full-Time",
                  desc: "Submit your credentials for future openings if you don't find a matching active posting.",
                  requirements: [
                    "Strong willingness to work with M Amin Network team",
                    "Self-motivated & proactive learning attitude",
                    "Basic telecommunication or computer knowledge"
                  ],
                  vacancy: "N/A",
                  salary: "Negotiable",
                  deadline: "Open Always"
                });
              }}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 text-left relative"
                >
                  {/* Top Row: Title + Dept & Job Type Badge */}
                  <div className="flex justify-between items-start w-full gap-4">
                    <div>
                      <h3 className="text-slate-900 font-extrabold text-xl tracking-tight leading-tight">{translateJobTitle(job.title)}</h3>
                      <p className="text-xs text-slate-500 font-semibold mt-1">{translateDept(job.dept)}</p>
                    </div>
                    <span className="bg-[#0b2545] text-white text-[10px] sm:text-xs font-bold px-3.5 py-1 rounded-full flex-shrink-0">
                      {translateJobType(job.type)}
                    </span>
                  </div>

                  {/* Middle Row: Description */}
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {translateJobDesc(job.desc)}
                  </p>

                  {/* Third Row: Details Info Badges */}
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500 items-center font-bold">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {translateLocation(job.location)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {job.vacancy} {t("vacancy", "vacancy")}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {job.salary}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {t("Deadline:", "Deadline:")} {job.deadline}
                    </span>
                  </div>

                  {/* Fourth Row: Buttons */}
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <button
                      onClick={() => setDetailsJob(job)}
                      className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 py-3 rounded-2xl font-bold transition-all text-xs sm:text-sm cursor-pointer text-center shadow-sm"
                    >
                      {t("Details", "বিস্তারিত")}
                    </button>
                    <button
                      onClick={() => {
                        setCurrentStep(1);
                        setSelectedJob(job);
                      }}
                      className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white py-3 rounded-2xl font-extrabold transition-all text-xs sm:text-sm cursor-pointer text-center shadow-sm"
                    >
                      {t("Apply Now", "আবেদন করুন")}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center bg-slate-50 border border-slate-200/60 rounded-3xl col-span-1 md:col-span-2">
                <svg className="w-12 h-12 text-slate-350 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-slate-700 font-bold text-sm">{t("No open positions match your search criteria", "কোনো পদের সন্ধান মেলেনি")}</h3>
                <p className="text-xs text-slate-400 mt-1">{t("Try adjusting your keywords or clearing selected filters.", "অনুগ্রহ করে আপনার ফিল্টার বা কিওয়ার্ড পরিবর্তন করে পুনরায় চেষ্টা করুন।")}</p>
              </div>
            )}
          </div>
        </div>

        {/* Job Details Popup Modal */}
        {detailsJob && (
          <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-900/40 backdrop-blur-sm">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl p-6 sm:p-8 max-w-lg w-full relative text-slate-800 text-left">
              <button
                onClick={() => setDetailsJob(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="space-y-6">
                <div>
                  <span className="bg-[#0b2545] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {translateJobType(detailsJob.type)}
                  </span>
                  <h3 className="text-slate-900 font-extrabold text-2xl tracking-tight leading-tight mt-3">
                    {translateJobTitle(detailsJob.title)}
                  </h3>
                  <p className="text-sm text-brand-blue font-bold tracking-wide uppercase mt-1">
                    {translateDept(detailsJob.dept)}
                  </p>
                </div>

                {/* Info List */}
                <div className="grid grid-cols-2 gap-4 border-y border-slate-100 py-4 text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 font-normal">{t("Location:", "অবস্থান:")}</span>
                    <span>{translateLocation(detailsJob.location)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 font-normal">{t("Vacancy:", "শূন্যপদ:")}</span>
                    <span>{detailsJob.vacancy} {t("position", "টি")}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 font-normal">{t("Salary:", "বেতন:")}</span>
                    <span>{detailsJob.salary} BDT</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 font-normal">{t("Deadline:", "শেষ সময়:")}</span>
                    <span>{detailsJob.deadline}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">{t("About the Role:", "ভূমিকা সম্পর্কে:")}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {translateJobDesc(detailsJob.desc)}
                  </p>
                </div>

                {/* Candidate Requirements */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">{t("Candidate Requirements:", "প্রার্থীর যোগ্যতা ও প্রয়োজনীয়তা:")}</h4>
                  <ul className="space-y-2">
                    {detailsJob.requirements.map((req, reqIdx) => (
                      <li key={reqIdx} className="text-xs text-slate-600 flex items-start gap-1.5 leading-relaxed">
                        <span className="text-brand-blue font-bold">•</span>
                        <span>{translateRequirement(req)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => setDetailsJob(null)}
                    className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 py-3 rounded-xl font-bold transition-all text-xs sm:text-sm cursor-pointer text-center"
                  >
                    {t("Close", "বন্ধ করুন")}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setSelectedJob(detailsJob);
                      setDetailsJob(null);
                    }}
                    className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white py-3 rounded-xl font-extrabold transition-all text-xs sm:text-sm cursor-pointer text-center shadow-sm"
                  >
                    {t("Apply Now", "আবেদন করুন")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

        {/* Multi-step Application Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-900/40 backdrop-blur-sm">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl p-6 sm:p-8 max-w-3xl w-full relative text-slate-800">
              <button
                onClick={resetForm}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer z-10"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {!success ? (
                <form onSubmit={handleApplySubmit} className="space-y-6 text-left">
                  {/* Step Header */}
                  <div>
                    <h3 className="text-slate-900 font-extrabold text-xl">{t("Employment Application", "কর্মসংস্থান আবেদনপত্র")}</h3>
                    <p className="text-xs text-slate-500 mt-1 font-semibold">
                      {t("Position Applied For:", "আবেদনকৃত পদ:")} <span className="text-brand-blue font-black">{translateJobTitle(selectedJob.title)}</span>
                    </p>
                  </div>

                  {/* Stepper Progress Bar */}
                  <div className="relative flex justify-between items-center w-full bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    {[1, 2, 3, 4, 5].map((stepNum) => (
                      <div key={stepNum} className="flex items-center gap-1.5">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          currentStep === stepNum
                            ? "bg-brand-blue text-white ring-4 ring-brand-blue/15"
                            : currentStep > stepNum
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-200 text-slate-500"
                        }`}>
                          {currentStep > stepNum ? "✓" : stepNum}
                        </span>
                        <span className={`text-[10px] hidden md:inline font-bold ${
                          currentStep === stepNum ? "text-slate-900" : "text-slate-400"
                        }`}>
                          {stepNum === 1 && t("Personal", "ব্যক্তিগত")}
                          {stepNum === 2 && t("Education", "শিক্ষা")}
                          {stepNum === 3 && t("Experience", "অভিজ্ঞতা")}
                          {stepNum === 4 && t("Questions", "প্রশ্নাবলী")}
                          {stepNum === 5 && t("Review & Submit", "রিভিউ ও সাবমিট")}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* STEP 1: Personal Details */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="flex gap-4 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                          <input
                            type="radio"
                            name="experienceType"
                            value="Experienced"
                            checked={applyForm.experienceType === "Experienced"}
                            onChange={handleApplyChange}
                            className="text-brand-blue focus:ring-brand-blue"
                          />
                          {t("Experienced", "অভিজ্ঞ")}
                        </label>
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                          <input
                            type="radio"
                            name="experienceType"
                            value="Fresh"
                            checked={applyForm.experienceType === "Fresh"}
                            onChange={handleApplyChange}
                            className="text-brand-blue focus:ring-brand-blue"
                          />
                          {t("Fresh", "নতুন (অভিজ্ঞতাহীন)")}
                        </label>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Full Name (English as per Certificate) *", "পূর্ণ নাম (সার্টিফিকেট অনুযায়ী ইংরেজি) *")}</label>
                          <input
                            id="apply-name-input"
                            type="text"
                            name="nameEn"
                            required
                            value={applyForm.nameEn}
                            onChange={handleApplyChange}
                            placeholder="e.g. Mehan Ahmed"
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-blue"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Full Name (Bangla) *", "পূর্ণ নাম (বাংলা) *")}</label>
                          <input
                            type="text"
                            name="nameBn"
                            required
                            value={applyForm.nameBn}
                            onChange={handleApplyChange}
                            placeholder="উদা. মিহান আহমেদ"
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-blue"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Fathers Name", "পিতার নাম")}</label>
                            <input
                              type="text"
                              name="fatherName"
                              value={applyForm.fatherName}
                              onChange={handleApplyChange}
                              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Father's Occupation", "পিতার পেশা")}</label>
                            <input
                              type="text"
                              name="fatherOccupation"
                              value={applyForm.fatherOccupation}
                              onChange={handleApplyChange}
                              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Mothers Name", "মাতার নাম")}</label>
                            <input
                              type="text"
                              name="motherName"
                              value={applyForm.motherName}
                              onChange={handleApplyChange}
                              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Mother's Occupation", "মাতার পেশা")}</label>
                            <input
                              type="text"
                              name="motherOccupation"
                              value={applyForm.motherOccupation}
                              onChange={handleApplyChange}
                              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Date of Birth *", "জন্ম তারিখ *")}</label>
                          <input
                            type="date"
                            name="dob"
                            required
                            value={applyForm.dob}
                            onChange={handleApplyChange}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-blue"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Place of Birth", "জন্মস্থান")}</label>
                          <input
                            type="text"
                            name="placeOfBirth"
                            value={applyForm.placeOfBirth}
                            onChange={handleApplyChange}
                            placeholder="e.g. Dhaka"
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Gender", "লিঙ্গ")}</label>
                            <select
                              name="gender"
                              value={applyForm.gender}
                              onChange={handleApplyChange}
                              className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-sm text-slate-800 focus:outline-none cursor-pointer"
                            >
                              <option value="Male">{t("Male", "পুরুষ")}</option>
                              <option value="Female">{t("Female", "নারী")}</option>
                              <option value="Other">{t("Other", "অন্যান্য")}</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Blood Group", "রক্তের গ্রুপ")}</label>
                            <input
                              type="text"
                              name="bloodGroup"
                              value={applyForm.bloodGroup}
                              onChange={handleApplyChange}
                              placeholder="e.g. A+"
                              className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-sm text-slate-800 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Marital Status", "বৈবাহিক অবস্থা")}</label>
                          <select
                            name="maritalStatus"
                            value={applyForm.maritalStatus}
                            onChange={handleApplyChange}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none cursor-pointer"
                          >
                            <option value="Single">{t("Single", "অবিবাহিত")}</option>
                            <option value="Married">{t("Married", "বিবাহিত")}</option>
                            <option value="Divorced">{t("Divorced", "তালাকপ্রাপ্ত")}</option>
                            <option value="Widowed">{t("Widowed", "বিধবা/বিপত্নীক")}</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Spouse's Name", "স্বামী/স্ত্রীর নাম")}</label>
                          <input
                            type="text"
                            name="spouseName"
                            disabled={applyForm.maritalStatus !== "Married"}
                            value={applyForm.spouseName}
                            onChange={handleApplyChange}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none disabled:opacity-50"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("No. of Children", "সন্তানের সংখ্যা")}</label>
                          <input
                            type="number"
                            name="childrenCount"
                            min="0"
                            value={applyForm.childrenCount}
                            onChange={handleApplyChange}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Religion", "ধর্ম")}</label>
                          <input
                            type="text"
                            name="religion"
                            value={applyForm.religion}
                            onChange={handleApplyChange}
                            placeholder="e.g. Islam"
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Nationality", "জাতীয়তা")}</label>
                          <input
                            type="text"
                            name="nationality"
                            value={applyForm.nationality}
                            onChange={handleApplyChange}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("NID or BRC Card No *", "এনআইডি অথবা জন্ম নিবন্ধন নং *")}</label>
                          <input
                            type="text"
                            name="nidBrc"
                            required
                            value={applyForm.nidBrc}
                            onChange={handleApplyChange}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-blue"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Contact Mobile Number *", "মোবাইল নম্বর *")}</label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={applyForm.phone}
                            onChange={handleApplyChange}
                            placeholder="e.g. 01707009267"
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-blue"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Email Address *", "ইমেইল ঠিকানা *")}</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={applyForm.email}
                            onChange={handleApplyChange}
                            placeholder="e.g. name@example.com"
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-blue"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Emergency Contact Phone", "জরুরি যোগাযোগ নম্বর")}</label>
                          <input
                            type="tel"
                            name="emergencyContact"
                            value={applyForm.emergencyContact}
                            onChange={handleApplyChange}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Addresses & Educational Qualifications */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      {/* Addresses */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Present Address *", "বর্তমান ঠিকানা *")}</label>
                          <textarea
                            name="presentAddress"
                            required
                            rows={3}
                            value={applyForm.presentAddress}
                            onChange={handleApplyChange}
                            placeholder="Street, Police Station, District"
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-blue resize-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <div className="flex justify-between items-center">
                            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Permanent Address *", "স্থায়ী ঠিকানা *")}</label>
                            <label className="flex items-center gap-1.5 text-[10px] font-bold text-brand-blue cursor-pointer">
                              <input
                                type="checkbox"
                                name="sameAsPresent"
                                checked={applyForm.sameAsPresent}
                                onChange={handleApplyChange}
                                className="rounded text-brand-blue focus:ring-brand-blue w-3 h-3"
                              />
                              {t("Same as Present", "বর্তমান ঠিকানার অনুরূপ")}
                            </label>
                          </div>
                          <textarea
                            name="permanentAddress"
                            required
                            disabled={applyForm.sameAsPresent}
                            rows={3}
                            value={applyForm.permanentAddress}
                            onChange={handleApplyChange}
                            placeholder="Street, Police Station, District"
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-blue resize-none disabled:opacity-50"
                          />
                        </div>
                      </div>

                      {/* Education Grid */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">{t("Educational Qualifications", "শিক্ষাগত যোগ্যতা")}</h4>
                        <div className="space-y-4">
                          {/* MBA */}
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                            <span className="text-xs font-bold text-slate-700 pl-1">{t("Master's (MBA/MSc/MA)", "মাস্টার্স (এমবিএ/এমএসসি)")}</span>
                            <input
                              type="text"
                              name="eduMBA_Uni"
                              value={applyForm.eduMBA_Uni}
                              onChange={handleApplyChange}
                              placeholder="Board / University"
                              className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                            />
                            <div className="grid grid-cols-2 gap-1 col-span-2">
                              <input
                                type="text"
                                name="eduMBA_Year"
                                value={applyForm.eduMBA_Year}
                                onChange={handleApplyChange}
                                placeholder="Year"
                                className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                              />
                              <input
                                type="text"
                                name="eduMBA_CGPA"
                                value={applyForm.eduMBA_CGPA}
                                onChange={handleApplyChange}
                                placeholder="CGPA / Class"
                                className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* BBA */}
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                            <span className="text-xs font-bold text-slate-700 pl-1">{t("Bachelor's (BBA/BSc/BA)", "স্নাতক (বিবিএ/বিএসসি)")}</span>
                            <input
                              type="text"
                              name="eduBBA_Uni"
                              value={applyForm.eduBBA_Uni}
                              onChange={handleApplyChange}
                              placeholder="Board / University"
                              className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                            />
                            <div className="grid grid-cols-2 gap-1 col-span-2">
                              <input
                                type="text"
                                name="eduBBA_Year"
                                value={applyForm.eduBBA_Year}
                                onChange={handleApplyChange}
                                placeholder="Year"
                                className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                              />
                              <input
                                type="text"
                                name="eduBBA_CGPA"
                                value={applyForm.eduBBA_CGPA}
                                onChange={handleApplyChange}
                                placeholder="CGPA / Class"
                                className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* HSC */}
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                            <span className="text-xs font-bold text-slate-700 pl-1">{t("HSC / Diploma", "এইচএসসি / ডিপ্লোমা")}</span>
                            <input
                              type="text"
                              name="eduHSC_Uni"
                              value={applyForm.eduHSC_Uni}
                              onChange={handleApplyChange}
                              placeholder="Board / Institute"
                              className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                            />
                            <div className="grid grid-cols-2 gap-1 col-span-2">
                              <input
                                type="text"
                                name="eduHSC_Year"
                                value={applyForm.eduHSC_Year}
                                onChange={handleApplyChange}
                                placeholder="Year"
                                className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                              />
                              <input
                                type="text"
                                name="eduHSC_CGPA"
                                value={applyForm.eduHSC_CGPA}
                                onChange={handleApplyChange}
                                placeholder="GPA / CGPA"
                                className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* SSC */}
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                            <span className="text-xs font-bold text-slate-700 pl-1">{t("SSC / O' Level", "এসএসসি / ও লেভেল")}</span>
                            <input
                              type="text"
                              name="eduSSC_Uni"
                              value={applyForm.eduSSC_Uni}
                              onChange={handleApplyChange}
                              placeholder="Board / School"
                              className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                            />
                            <div className="grid grid-cols-2 gap-1 col-span-2">
                              <input
                                type="text"
                                name="eduSSC_Year"
                                value={applyForm.eduSSC_Year}
                                onChange={handleApplyChange}
                                placeholder="Year"
                                className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                              />
                              <input
                                type="text"
                                name="eduSSC_CGPA"
                                value={applyForm.eduSSC_CGPA}
                                onChange={handleApplyChange}
                                placeholder="GPA / CGPA"
                                className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* JSC */}
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                            <span className="text-xs font-bold text-slate-700 pl-1">{t("JSC / Equivalent", "জেএসসি / সমমান")}</span>
                            <input
                              type="text"
                              name="eduJSC_Uni"
                              value={applyForm.eduJSC_Uni}
                              onChange={handleApplyChange}
                              placeholder="School"
                              className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                            />
                            <div className="grid grid-cols-2 gap-1 col-span-2">
                              <input
                                type="text"
                                name="eduJSC_Year"
                                value={applyForm.eduJSC_Year}
                                onChange={handleApplyChange}
                                placeholder="Year"
                                className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                              />
                              <input
                                type="text"
                                name="eduJSC_CGPA"
                                value={applyForm.eduJSC_CGPA}
                                onChange={handleApplyChange}
                                placeholder="GPA"
                                className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Experience & Other Qualifications */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Other Qualifications (Licenses, Skills, Trainings, Awards, Achievements)", "অন্যান্য যোগ্যতা (লাইসেন্স, দক্ষতা, প্রশিক্ষণ, পুরষ্কার, অর্জন)")}</label>
                        <textarea
                          name="otherQualifications"
                          rows={3}
                          value={applyForm.otherQualifications}
                          onChange={handleApplyChange}
                          placeholder="e.g. Cisco CCNA Certification, Driver's License, Fiber laser splicing training..."
                          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-blue"
                        />
                      </div>

                      {/* Work Experience dynamic list */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">{t("Work Experience", "কাজের অভিজ্ঞতা (পূর্ববর্তী চাকরি)")}</h4>
                          <button
                            type="button"
                            onClick={addExperience}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer"
                          >
                            + {t("Add Experience Row", "চাকরি যোগ করুন")}
                          </button>
                        </div>

                        <div className="space-y-4">
                          {workExperiences.map((exp, idx) => (
                            <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 relative space-y-3">
                              {workExperiences.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeExperience(idx)}
                                  className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-xs font-bold cursor-pointer"
                                >
                                  {t("Remove", "বাতিল")}
                                </button>
                              )}
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                  <label className="text-[10px] text-slate-500 font-bold uppercase">{t("Company Name", "প্রতিষ্ঠানের নাম")}</label>
                                  <input
                                    type="text"
                                    value={exp.company}
                                    onChange={(e) => handleExperienceChange(idx, "company", e.target.value)}
                                    placeholder="e.g. Amber IT"
                                    className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                                  />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <label className="text-[10px] text-slate-500 font-bold uppercase">{t("Designation", "পদবি")}</label>
                                  <input
                                    type="text"
                                    value={exp.designation}
                                    onChange={(e) => handleExperienceChange(idx, "designation", e.target.value)}
                                    placeholder="e.g. Support Executive"
                                    className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="flex flex-col gap-1">
                                  <label className="text-[10px] text-slate-500 font-bold uppercase">{t("Duration (From & To)", "সময়সীমা (শুরু ও শেষ)")}</label>
                                  <input
                                    type="text"
                                    value={exp.duration}
                                    onChange={(e) => handleExperienceChange(idx, "duration", e.target.value)}
                                    placeholder="e.g. 2024 - 2025"
                                    className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                                  />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <label className="text-[10px] text-slate-500 font-bold uppercase">{t("Monthly Salary (TK)", "মাসিক বেতন (টাকা)")}</label>
                                  <input
                                    type="text"
                                    value={exp.salary}
                                    onChange={(e) => handleExperienceChange(idx, "salary", e.target.value)}
                                    placeholder="e.g. 18,000"
                                    className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                                  />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <label className="text-[10px] text-slate-500 font-bold uppercase">{t("Reason for Leaving", "চাকরি ছাড়ার কারণ")}</label>
                                  <input
                                    type="text"
                                    value={exp.reason}
                                    onChange={(e) => handleExperienceChange(idx, "reason", e.target.value)}
                                    className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Extra-Curricular Activities", "সহ-শিক্ষা কার্যক্রম")}</label>
                        <input
                          type="text"
                          name="extracurricular"
                          value={applyForm.extracurricular}
                          onChange={handleApplyChange}
                          placeholder="e.g. Sports, Debate Club, Volunteering..."
                          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Questionnaire & References */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Do you consider yourself a highly motivated person? Why?", "আপনি কি নিজেকে উচ্চ অনুপ্রাণিত ব্যক্তি মনে করেন? কেন?")}</label>
                          <textarea
                            name="motivationReason"
                            rows={2}
                            value={applyForm.motivationReason}
                            onChange={handleApplyChange}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-blue"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("What environments are you comfortable working in?", "কোন পরিবেশে কাজ করতে আপনি সবচেয়ে স্বাচ্ছন্দ্য বোধ করেন?")}</label>
                          <div className="flex flex-wrap gap-4 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                            <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                              <input
                                type="radio"
                                name="workComfort"
                                value="As a part of a team"
                                checked={applyForm.workComfort === "As a part of a team"}
                                onChange={handleApplyChange}
                                className="text-brand-blue"
                              />
                              {t("As a part of a team", "টিমের অংশ হিসেবে")}
                            </label>
                            <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                              <input
                                type="radio"
                                name="workComfort"
                                value="Leading a team"
                                checked={applyForm.workComfort === "Leading a team"}
                                onChange={handleApplyChange}
                                className="text-brand-blue"
                              />
                              {t("Leading a team", "টিম লিড হিসেবে")}
                            </label>
                            <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                              <input
                                type="radio"
                                name="workComfort"
                                value="Work Individually"
                                checked={applyForm.workComfort === "Work Individually"}
                                onChange={handleApplyChange}
                                className="text-brand-blue"
                              />
                              {t("Work Individually", "এককভাবে")}
                            </label>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("What are your expectations from M Amin Network?", "আমাদের সংস্থার নিকট আপনার প্রত্যাশা কি?")}</label>
                          <textarea
                            name="expectations"
                            rows={2}
                            value={applyForm.expectations}
                            onChange={handleApplyChange}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col gap-2">
                            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Criminal offence history?", "ফৌজদারি মামলার রেকর্ড রয়েছে?")}</label>
                            <div className="flex gap-4">
                              <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                                <input
                                  type="radio"
                                  name="criminalOffence"
                                  value="Yes"
                                  checked={applyForm.criminalOffence === "Yes"}
                                  onChange={handleApplyChange}
                                  className="text-brand-blue"
                                />
                                {t("Yes", "হ্যাঁ")}
                              </label>
                              <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                                <input
                                  type="radio"
                                  name="criminalOffence"
                                  value="No"
                                  checked={applyForm.criminalOffence === "No"}
                                  onChange={handleApplyChange}
                                  className="text-brand-blue"
                                />
                                {t("No", "না")}
                              </label>
                            </div>
                            {applyForm.criminalOffence === "Yes" && (
                              <input
                                type="text"
                                name="criminalDetails"
                                placeholder="Provide case details"
                                value={applyForm.criminalDetails}
                                onChange={handleApplyChange}
                                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs mt-1"
                              />
                            )}
                          </div>

                          <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col gap-2">
                            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Any relative working in M Amin Network?", "কোন আত্মীয় আমাদের সংস্থায় কর্মরত আছেন?")}</label>
                            <div className="flex gap-4">
                              <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                                <input
                                  type="radio"
                                  name="relativeWorking"
                                  value="Yes"
                                  checked={applyForm.relativeWorking === "Yes"}
                                  onChange={handleApplyChange}
                                  className="text-brand-blue"
                                />
                                {t("Yes", "হ্যাঁ")}
                              </label>
                              <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                                <input
                                  type="radio"
                                  name="relativeWorking"
                                  value="No"
                                  checked={applyForm.relativeWorking === "No"}
                                  onChange={handleApplyChange}
                                  className="text-brand-blue"
                                />
                                {t("No", "না")}
                              </label>
                            </div>
                            {applyForm.relativeWorking === "Yes" && (
                              <div className="grid grid-cols-2 gap-1 text-[10px] mt-1">
                                <input
                                  type="text"
                                  name="relativeName"
                                  placeholder="Relative Name"
                                  value={applyForm.relativeName}
                                  onChange={handleApplyChange}
                                  className="bg-white border border-slate-200 rounded-lg px-2 py-1"
                                />
                                <input
                                  type="text"
                                  name="relativeDesignation"
                                  placeholder="Designation"
                                  value={applyForm.relativeDesignation}
                                  onChange={handleApplyChange}
                                  className="bg-white border border-slate-200 rounded-lg px-2 py-1"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* References */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">{t("References (Provide Two)", "তথ্য সূত্র/রেফারেন্স (দুটি প্রদান করুন)")}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Reference 1 */}
                          <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
                            <h5 className="text-[10px] font-bold text-slate-500 uppercase">{t("Reference 1", "রেফারেন্স ১")}</h5>
                            <input
                              type="text"
                              name="ref1_name"
                              placeholder="Name"
                              value={applyForm.ref1_name}
                              onChange={handleApplyChange}
                              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs"
                            />
                            <input
                              type="text"
                              name="ref1_designation"
                              placeholder="Designation & Organization"
                              value={applyForm.ref1_designation}
                              onChange={handleApplyChange}
                              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs"
                            />
                            <input
                              type="tel"
                              name="ref1_phone"
                              placeholder="Phone"
                              value={applyForm.ref1_phone}
                              onChange={handleApplyChange}
                              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs"
                            />
                          </div>

                          {/* Reference 2 */}
                          <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
                            <h5 className="text-[10px] font-bold text-slate-500 uppercase">{t("Reference 2", "রেফারেন্স ২")}</h5>
                            <input
                              type="text"
                              name="ref2_name"
                              placeholder="Name"
                              value={applyForm.ref2_name}
                              onChange={handleApplyChange}
                              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs"
                            />
                            <input
                              type="text"
                              name="ref2_designation"
                              placeholder="Designation & Organization"
                              value={applyForm.ref2_designation}
                              onChange={handleApplyChange}
                              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs"
                            />
                            <input
                              type="tel"
                              name="ref2_phone"
                              placeholder="Phone"
                              value={applyForm.ref2_phone}
                              onChange={handleApplyChange}
                              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 5: Review & Submit */}
                  {currentStep === 5 && (
                    <div className="space-y-6">
                      {/* Read-only Review Summary */}
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 text-xs space-y-3">
                        <h4 className="font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2">{t("Confirm Application Summary", "আবেদনপত্রের সারসংক্ষেপ নিশ্চিত করুন")}</h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          <div><span className="text-slate-400">{t("Candidate Type:", "আবেদনকারীর ধরন:")}</span> <strong className="text-slate-700">{applyForm.experienceType}</strong></div>
                          <div><span className="text-slate-400">{t("Applicant Name (EN):", "নাম (ইংরেজি):")}</span> <strong className="text-slate-700">{applyForm.nameEn}</strong></div>
                          <div><span className="text-slate-400">{t("Mobile Phone:", "মোবাইল নম্বর:")}</span> <strong className="text-slate-700">{applyForm.phone}</strong></div>
                          <div><span className="text-slate-400">{t("Email ID:", "ইমেইল:")}</span> <strong className="text-slate-700">{applyForm.email}</strong></div>
                          <div><span className="text-slate-400">{t("NID/BRC NO:", "এনআইডি/জন্ম নিবন্ধন:")}</span> <strong className="text-slate-700">{applyForm.nidBrc}</strong></div>
                          <div><span className="text-slate-400">{t("Date of Birth:", "জন্ম তারিখ:")}</span> <strong className="text-slate-700">{applyForm.dob}</strong></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Expected Salary Range (Monthly TK) *", "প্রত্যাশিত মাসিক বেতন (টাকা) *")}</label>
                          <input
                            type="text"
                            name="expectedSalary"
                            required
                            value={applyForm.expectedSalary}
                            onChange={handleApplyChange}
                            placeholder="e.g. 20,000"
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-brand-blue focus:bg-white"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Application Date", "আবেদনের তারিখ")}</label>
                          <input
                            type="date"
                            name="dateOfApply"
                            readOnly
                            value={applyForm.dateOfApply}
                            className="bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-500 outline-none cursor-not-allowed"
                          />
                        </div>
                      </div>

                      {/* Declaration */}
                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">{t("Applicant Certification", "আবেদনকারীর ঘোষণা")}</h4>
                        <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed text-justify">
                          {t(
                            "I certify that the information contained in this employment application is true and complete to the best of my knowledge. I understand that false or misleading information or omissions may result in immediate rejection of my application or termination of employment if hired.",
                            "আমি ঘোষণা করছি যে, এই আবেদনপত্রে আমার প্রদত্ত সকল তথ্য সত্য, সঠিক এবং সম্পূর্ণ। আমি বুঝতে পারছি যে, কোনো অসত্য, মিথ্যা বা বিভ্রান্তিকর তথ্য প্রদান করা হলে বা কোনো গুরুত্বপূর্ণ তথ্য গোপন রাখা হলে আমার আবেদনপত্র সরাসরি বাতিল করা হতে পারে বা চাকরিতে যোগদানের পরও যেকোনো সময় চাকরি থেকে অব্যাহতি দেওয়া হতে পারে।"
                          )}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Applicant Signature (Type Name) *", "আবেদনকারীর স্বাক্ষর (আপনার নাম) *")}</label>
                            <input
                              type="text"
                              name="signature"
                              required
                              value={applyForm.signature}
                              onChange={handleApplyChange}
                              placeholder="Type name for digital signature"
                              className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-blue"
                            />
                          </div>

                          <div className="flex items-center pt-5">
                            <label className="flex items-start gap-2.5 text-xs text-slate-700 font-bold cursor-pointer select-none">
                              <input
                                type="checkbox"
                                name="agreed"
                                required
                                checked={applyForm.agreed}
                                onChange={handleApplyChange}
                                className="rounded text-brand-blue focus:ring-brand-blue mt-0.5"
                              />
                              <span>{t("I certify and agree to the above terms *", "আমি স্বাক্ষর করছি এবং উপরোক্ত শর্তাবলীতে সম্মত আছি *")}</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions buttons */}
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      disabled={currentStep === 1}
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                      className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t("Back", "পূর্ববর্তী")}
                    </button>
                    
                    {currentStep < 5 ? (
                      <button
                        type="button"
                        onClick={validateAndNext}
                        className="px-6 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-extrabold transition-colors cursor-pointer hover:bg-brand-blue/90"
                      >
                        {t("Continue", "পরবর্তী")}
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-8 py-2.5 bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-extrabold rounded-xl text-xs transition-all shadow-md hover:opacity-95 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {submitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            {t("Submitting...", "জমাদান হচ্ছে...")}
                          </>
                        ) : (
                          t("Submit Application", "আবেদন জমা দিন")
                        )}
                      </button>
                    )}
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-500 animate-pulse">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-slate-900 font-bold text-xl">{t("Application Received Successfully!", "আবেদনপত্র সফলভাবে গৃহীত হয়েছে!")}</h3>
                    <p className="text-sm text-slate-600">
                      {t("Thank you", "ধন্যবাদ")}, <span className="text-slate-800 font-bold">{applyForm.nameEn}</span>. {t("We have saved your application request for", "আমরা আপনার আবেদনপত্রটি সংরক্ষণ করেছি:")}{" "}
                      <span className="text-brand-blue font-bold">{translateJobTitle(selectedJob.title)}</span>।
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                    {t(
                      "Our HR team will review your qualifications, references, and credentials as per your submitted employment form. If your background aligns with our operational needs, our office coordinator will contact you to schedule an interview at our Kadomtoli branch.",
                      "আমাদের এইচআর বিভাগ আপনার প্রদত্ত তথ্য সূত্র, শিক্ষাগত যোগ্যতা এবং অভিজ্ঞতার রেকর্ড পর্যালোচনা করবে। আপনার আবেদনটি যদি আমাদের চাহিদার সাথে সামঞ্জস্যপূর্ণ হয়, তবে পরবর্তী সরাসরি সাক্ষাৎকারের জন্য আমাদের অফিস কো-অর্ডিনেটর কদমতলী শাখা থেকে আপনার সাথে যোগাযোগ করবেন।"
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
        </div>
      )}
      </div>
    </div>
  );
}
