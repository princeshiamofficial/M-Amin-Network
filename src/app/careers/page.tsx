"use client";
import { toast } from "sonner";
/* eslint-disable @next/next/no-img-element */

import React, { useState } from "react";
import { getSetting, submitJobApplicationAction } from "@/actions/content";
import { useTranslation } from "@/hooks/useTranslation";
const defaultCareersPageContent = {
  str1En: "Network Engineering & Maintenance",
  str2En: "Helpdesk Operations",
  str3En: "Infrastructure Operations",
  str4En: "Support Technician (Field Operations)",
  str5En: "Customer Support Executive",
  str6En: "Junior Network Engineer",
  str7En: "South Keraniganj",
  str8En: "Kadomtoli Office, Dhaka",
  str9En: "Full Time",
  str10En: "We are looking for dedicated field technicians to lay fiber cables, splice optical lines, install ONTs, and troubleshoot client premises issues.",
  str11En: "Manage customer queries, guide clients through router reboots, catalog support tickets, and direct field teams to fiber line breaks.",
  str12En: "Assist in monitoring the BGP network (AS150164), configure OLT splitters, manage DNS and local caching servers (FTP, BDIX).",
  str13En: "Prior experience in fiber splicing (laser splicing machines)",
  str14En: "Familiarity with OLT port configs & client router configurations",
  str15En: "Willingness to travel around South Keraniganj neighborhoods",
  str16En: "Excellent communication and problem-solving skills",
  str17En: "Higher Secondary Certificate (HSC) or Bachelor degree",
  str18En: "Polite tone and high patience for user support",
  str19En: "Basic computer knowledge (Google Sheets, ticket dashboards)",
  str20En: "Ability to speak fluent Bangla (English is a plus)",
  str21En: "Diploma in Computer/Telecommunication Engineering or CCNA certified",
  str22En: "Familiarity with Mikrotik RouterOS and basic Linux scripting",
  str23En: "Understanding of IPv4 subnetting and dynamic BGP routing",
  str24En: "Willingness to work in rotating shifts",
  str25En: "Please fill in all required fields (marked with *).",
  str26En: "Please enter present and permanent address details.",
  str27En: "Please agree to the certification terms and provide your signature.",
  str28En: "Join M Amin Network",
  str29En: "Careers & ",
  str30En: "Opportunities",
  str31En: "Work with South Keraniganj's leading network engineers. We offer attractive bonuses, hands-on training on optical line terminals, and CCNA certifications sponsorship.",
  str32En: "Open Positions",
  str33En: "position found",
  str34En: "positions found",
  str35En: "General Application",
  str36En: "Search title, department, keyword...",
  str37En: "All departments",
  str38En: "Engineering & Maintenance",
  str39En: "All types",
  str40En: "Full-Time",
  str41En: "All locations",
  str42En: "vacancy", str42Bn: "vacancy",
  str43En: "Deadline:", str43Bn: "Deadline:",
  str44En: "Details",
  str45En: "Apply Now",
  str46En: "No open positions match your search criteria",
  str47En: "Try adjusting your keywords or clearing selected filters.",
  str48En: "Location:",
  str49En: "Vacancy:",
  str50En: "position",
  str51En: "Salary:",
  str52En: "Deadline:",
  str53En: "About the Role:",
  str54En: "Candidate Requirements:",
  str55En: "Close",
  str56En: "Employment Application",
  str57En: "Position Applied For:",
  str58En: "Personal",
  str59En: "Education",
  str60En: "Experience",
  str61En: "Questions",
  str62En: "Review & Submit",
  str63En: "Experienced",
  str64En: "Fresh",
  str65En: "Full Name (English as per Certificate) *",
  str66En: "Full Name (Bangla) *",
  str67En: "Fathers Name",
  str68En: "Father's Occupation",
  str69En: "Mothers Name",
  str70En: "Mother's Occupation",
  str71En: "Date of Birth *",
  str72En: "Place of Birth",
  str73En: "Gender",
  str74En: "Male",
  str75En: "Female",
  str76En: "Other",
  str77En: "Blood Group",
  MaritalStatus: "", // Wait, keep variables keys matching! Let's write keys as:
  str78En: "Marital Status",
  str79En: "Single",
  str80En: "Married",
  str81En: "Divorced",
  str82En: "Widowed",
  str83En: "Spouse's Name",
  str84En: "No. of Children",
  str85En: "Religion",
  str86En: "Nationality",
  str87En: "NID or BRC Card No *",
  str88En: "Contact Mobile Number *",
  str89En: "Email Address *",
  str90En: "Emergency Contact Phone",
  str91En: "Present Address *",
  str92En: "Permanent Address *",
  str93En: "Same as Present",
  str94En: "Educational Qualifications",
  str95En: "Master's (MBA/MSc/MA)",
  str96En: "Bachelor's (BBA/BSc/BA)",
  str97En: "HSC / Diploma",
  str98En: "SSC / O' Level",
  str99En: "JSC / Equivalent",
  str100En: "Other Qualifications (Licenses, Skills, Trainings, Awards, Achievements)",
  str101En: "Work Experience",
  str102En: "Add Experience Row",
  str103En: "Remove",
  str104En: "Company Name",
  str105En: "Designation",
  str106En: "Duration (From & To)",
  str107En: "Monthly Salary (TK)",
  str108En: "Reason for Leaving",
  str109En: "Extra-Curricular Activities",
  str110En: "Do you consider yourself a highly motivated person? Why?",
  str111En: "What environments are you comfortable working in?",
  str112En: "As a part of a team",
  str113En: "Leading a team",
  str114En: "Work Individually",
  str115En: "What are your expectations from M Amin Network?",
  str116En: "Criminal offence history?",
  str117En: "Yes",
  str118En: "No",
  str119En: "Any relative working in M Amin Network?",
  str120En: "References (Provide Two)",
  str121En: "Reference 1",
  str122En: "Reference 2",
  str123En: "Confirm Application Summary",
  str124En: "Candidate Type:",
  str125En: "Applicant Name (EN):",
  str126En: "Mobile Phone:",
  str127En: "Email ID:",
  str128En: "NID/BRC NO:",
  str129En: "Date of Birth:",
  str130En: "Expected Salary Range (Monthly TK) *",
  str131En: "Application Date",
  str132En: "Applicant Certification",
  str133En: "I certify that the information contained in this employment application is true and complete to the best of my knowledge. I understand that false or misleading information or omissions may result in immediate rejection of my application or termination of employment if hired.",
  str134En: "Applicant Signature (Type Name) *",
  str135En: "I certify and agree to the above terms *",
  str136En: "Back",
  str137En: "Continue",
  str138En: "Submitting...",
  str139En: "Submit Application",
  str140En: "Application Received Successfully!",
  str141En: "Thank you",
  str142En: "We have saved your application request for",
  str143En: "Our HR team will review your qualifications, references, and credentials as per your submitted employment form. If your background aligns with our operational needs, our office coordinator will contact you to schedule an interview at our Kadomtoli branch.",
  str144En: "Close Window",
};
import { defaultPageHeaders, PageHeaderData } from "@/app/admin/(dashboard)/page-headers/page";

interface JobOpening {
  id?: string;
  title: string;
  dept: string;
  location: string;
  type: string;
  desc: string;
  requirements: string[];
  vacancy: string;
  salary: string;
  deadline: string;
  image?: string;
  status?: "Open" | "Closed";
}

function getStringValue(item: Record<string, unknown>, keys: string[], fallback: string): string {
  for (const key of keys) {
    const value = item[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number") return String(value);
  }

  return fallback;
}

function getRequirementsValue(value: unknown): string[] {
  if (Array.isArray(value)) {
    const items = value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
    return items.length ? items : ["Relevant experience for this role"];
  }

  if (typeof value === "string" && value.trim()) {
    const lines = value
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);
    return lines.length ? lines : [value.trim()];
  }

  return ["Relevant experience for this role"];
}

function normalizePostedJob(item: Record<string, unknown>): JobOpening | null {
  const status = getStringValue(item, ["status"], "Open");
  if (status !== "Open") return null;

  const title = getStringValue(item, ["title"], "");
  if (!title) return null;

  return {
    id: getStringValue(item, ["id"], title),
    title,
    dept: getStringValue(item, ["dept", "department"], "General Support"),
    location: getStringValue(item, ["location"], "South Keraniganj"),
    type: getStringValue(item, ["type"], "Full-Time"),
    desc: getStringValue(item, ["desc", "description"], "Apply for this open position at M Amin Network."),
    requirements: getRequirementsValue(item.requirements),
    vacancy: getStringValue(item, ["vacancy"], "1"),
    salary: getStringValue(item, ["salary"], "Negotiable"),
    deadline: getStringValue(item, ["deadline"], "Open Until Filled"),
    image: getStringValue(item, ["image", "imageUrl"], ""),
    status: "Open",
  };
}

export default function Careers() {
  const [pageContent, setPageContent] = React.useState(defaultCareersPageContent);
  const [headerData, setHeaderData] = React.useState<PageHeaderData>(defaultPageHeaders);
  React.useEffect(() => {
    const s = localStorage.getItem("careers_page_content");
    if (s) {
      try { setPageContent(JSON.parse(s)); } catch { /* ignore */ }
    }
    getSetting("page_headers").then(saved => {
      if (saved) setHeaderData(saved as PageHeaderData);
    });
  }, []);

  const lang = useTranslation();
  const t = (en: string, bn: string) => (lang === "BN" ? bn : en);

  const translateDept = (dept: string) => {
    if (dept === "Network Engineering & Maintenance") return t(pageContent.str1En, pageContent.str1En);
    if (dept === "Helpdesk Operations") return t(pageContent.str2En, pageContent.str2En);
    if (dept === "Infrastructure Operations") return t(pageContent.str3En, pageContent.str3En);
    return dept;
  };

  const translateJobTitle = (title: string) => {
    if (title === "Support Technician (Field Operations)") return t(pageContent.str4En, pageContent.str4En);
    if (title === "Customer Support Executive") return t(pageContent.str5En, pageContent.str5En);
    if (title === "Junior Network Engineer") return t(pageContent.str6En, pageContent.str6En);
    return title;
  };

  const translateLocation = (loc: string) => {
    if (loc === "South Keraniganj") return t(pageContent.str7En, pageContent.str7En);
    if (loc === "Kadomtoli Office, Dhaka") return t(pageContent.str8En, pageContent.str8En);
    return loc;
  };

  const translateJobType = (type: string) => {
    if (type === "Full-Time") return t(pageContent.str9En, pageContent.str9En);
    return type;
  };

  const translateJobDesc = (desc: string) => {
    if (desc.startsWith("We are looking for dedicated")) return t(pageContent.str10En, pageContent.str10En);
    if (desc.startsWith("Manage customer queries")) return t(pageContent.str11En, pageContent.str11En);
    if (desc.startsWith("Assist in monitoring the BGP")) return t(pageContent.str12En, pageContent.str12En);
    return desc;
  };

  const translateRequirement = (req: string) => {
    if (req === "Prior experience in fiber splicing (laser splicing machines)") return t(pageContent.str13En, pageContent.str13En);
    if (req === "Familiarity with OLT port configs & client router configurations") return t(pageContent.str14En, pageContent.str14En);
    if (req === "Willingness to travel around South Keraniganj neighborhoods") return t(pageContent.str15En, pageContent.str15En);
    if (req === "Excellent communication and problem-solving skills") return t(pageContent.str16En, pageContent.str16En);
    if (req === "Higher Secondary Certificate (HSC) or Bachelor degree") return t(pageContent.str17En, pageContent.str17En);
    if (req === "Polite tone and high patience for user support") return t(pageContent.str18En, pageContent.str18En);
    if (req === "Basic computer knowledge (Google Sheets, ticket dashboards)") return t(pageContent.str19En, pageContent.str19En);
    if (req === "Ability to speak fluent Bangla (English is a plus)") return t(pageContent.str20En, pageContent.str20En);
    if (req === "Diploma in Computer/Telecommunication Engineering or CCNA certified") return t(pageContent.str21En, pageContent.str21En);
    if (req === "Familiarity with Mikrotik RouterOS and basic Linux scripting") return t(pageContent.str22En, pageContent.str22En);
    if (req === "Understanding of IPv4 subnetting and dynamic BGP routing") return t(pageContent.str23En, pageContent.str23En);
    if (req === "Willingness to work in rotating shifts") return t(pageContent.str24En, pageContent.str24En);
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
  const [postedJobs, setPostedJobs] = useState<JobOpening[]>([]);

  React.useEffect(() => {
    getSetting("jobs").then((saved) => {
      if (!Array.isArray(saved)) return;
      const normalizedJobs = (saved as Record<string, unknown>[])
        .map(normalizePostedJob)
        .filter((job): job is JobOpening => job !== null);
      setPostedJobs(normalizedJobs);
    });
  }, []);

  const jobs = postedJobs;
  const departmentOptions = Array.from(new Set(jobs.map((job) => job.dept).filter(Boolean)));
  const typeOptions = Array.from(new Set(jobs.map((job) => job.type).filter(Boolean)));
  const locationOptions = Array.from(new Set(jobs.map((job) => job.location).filter(Boolean)));

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
      if (!applyForm.nameEn || !applyForm.nameEn || !applyForm.email || !applyForm.phone || !applyForm.nidBrc) {
        toast(t(pageContent.str25En, pageContent.str25En));
        return;
      }
    }
    if (currentStep === 2) {
      if (!applyForm.presentAddress || (!applyForm.sameAsPresent && !applyForm.permanentAddress)) {
        toast(t(pageContent.str26En, pageContent.str26En));
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.agreed || !applyForm.signature) {
      toast(t(pageContent.str27En, pageContent.str27En));
      return;
    }

    setSubmitting(true);
    setTimeout(async () => {
      try {
        const result = await submitJobApplicationAction(
          applyForm as unknown as Record<string, unknown>,
          workExperiences as unknown as Record<string, unknown>[],
          selectedJob?.title || ""
        );
        if (result.success) {
          setSuccess(true);
        } else {
          console.error("Failed to submit job application.");
        }
      } catch (err) {
        console.error("Error saving job application:", err);
      }
      setSubmitting(false);
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
    <div className="w-full min-h-screen flex flex-col relative text-left">
      {/* Background glow (decorative top background) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue/5 blur-[120px] pointer-events-none" />

      {/* Header Area Banner */}
      <div 
        className="relative w-full overflow-hidden bg-slate-950 py-8 sm:py-14 border-b border-white/5 bg-cover bg-center"
      >
        {/* Background video/image */}
        <div className="absolute inset-0 z-0">
          {headerData.careers_bg?.endsWith(".mp4") ? (
            <video
              autoPlay
              loop
              muted={true}
              playsInline
              className="w-full h-full object-cover opacity-50"
            >
              <source src={headerData.careers_bg} type="video/mp4" />
            </video>
          ) : (
            <div
              className="w-full h-full bg-cover bg-center opacity-50"
              style={{ backgroundImage: `url('${headerData.careers_bg}')` }}
            />
          )}
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold text-white tracking-tight mt-3 text-center w-full block">
              {t(headerData.careers_title_en, headerData.careers_title_bn ?? "")}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan to-brand-blue text-glow">
                {t(headerData.careers_title_highlight_en, headerData.careers_title_highlight_bn ?? "")}
              </span>
            </h1>
            <p className="text-slate-300 mt-4 text-sm sm:text-base leading-relaxed text-center font-medium">
              {t(headerData.careers_subtitle_en, headerData.careers_subtitle_bn ?? "")}
            </p>
          </div>
        </div>
      </div>

      {/* Job Postings Section - White Background */}
      <div className="w-full bg-white text-slate-800 py-16 grow border-t border-slate-200 relative z-10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search & Filter Bar Row (Overlapping Floating Bar) */}
          <div className="bg-white border border-slate-200/90 shadow-xl rounded-2xl p-4 sm:p-5 mb-16 relative z-20 -mt-24 max-w-4xl mx-auto w-full">
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
                  placeholder={t(pageContent.str36En, pageContent.str36En)}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue transition-all"
                />
              </div>

              {/* Department Dropdown (Takes 3 cols) */}
              <div className="lg:col-span-3">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-brand-blue cursor-pointer"
                >
                  <option value="All">{t(pageContent.str37En, pageContent.str37En)}</option>
                  {departmentOptions.map((dept) => (
                    <option key={dept} value={dept}>{translateDept(dept)}</option>
                  ))}
                </select>
              </div>

              {/* Type Dropdown (Takes 2 cols) */}
              <div className="lg:col-span-2">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-brand-blue cursor-pointer"
                >
                  <option value="All">{t(pageContent.str39En, pageContent.str39En)}</option>
                  {typeOptions.map((type) => (
                    <option key={type} value={type}>{translateJobType(type)}</option>
                  ))}
                </select>
              </div>

              {/* Location Dropdown (Takes 2 cols) */}
              <div className="lg:col-span-2">
                <select
                  value={selectedLoc}
                  onChange={(e) => setSelectedLoc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-brand-blue cursor-pointer"
                >
                  <option value="All">{t(pageContent.str41En, pageContent.str41En)}</option>
                  {locationOptions.map((location) => (
                    <option key={location} value={location}>{translateLocation(location)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Open Positions Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">{t(pageContent.str32En, pageContent.str32En)}</h2>
              <p className="text-xs text-slate-500 mt-1 font-semibold">
                {filteredJobs.length} {filteredJobs.length === 1 ? t(pageContent.str33En, pageContent.str33En) : t(pageContent.str34En, pageContent.str34En)}
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
              className="flex items-center gap-1.5 px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <span>{t(pageContent.str35En, pageContent.str35En)}</span>
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Job Postings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl shadow-md border border-white hover:border-brand-blue/40 transition-all overflow-hidden flex flex-col cursor-pointer"
                >
                  {/* Banner image */}
                  <div className="h-44 relative overflow-hidden bg-brand-blue shrink-0">
                    {job.image ? (
                      <img
                        src={job.image}
                        alt={translateJobTitle(job.title)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : null}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-brand-blue text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                        {translateJobType(job.type)}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-5 lg:px-7 flex flex-col flex-1 gap-1">
                    {/* Title row */}
                    <div className="border-b border-[#e5e7eb] py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <p className="text-slate-800 group-hover:text-brand-blue transition-colors font-bold text-[18px] leading-snug">
                        {translateJobTitle(job.title)}
                      </p>
                    </div>

                    {/* Description */}
                    <div className="py-3 flex-1">
                      <p className="text-[#777B84] text-[15px] leading-relaxed line-clamp-3 font-medium">
                        {translateJobDesc(job.desc)}
                      </p>
                    </div>

                    {/* Metadata Row */}
                    <div className="border-t border-slate-100 py-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500 items-center font-bold">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-brand-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {translateLocation(job.location)}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-brand-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {job.vacancy} {t(pageContent.str42En, pageContent.str42En)}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-brand-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                        </svg>
                        {job.salary}
                      </span>
                    </div>

                    {/* Actions Links at bottom */}
                    <div className="flex items-center justify-between pb-5 border-t border-slate-100/50 pt-4 mt-auto">
                      <button
                        type="button"
                        onClick={() => setDetailsJob(job)}
                        className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                      >
                        {t(pageContent.str44En, pageContent.str44En)}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentStep(1);
                          setSelectedJob(job);
                        }}
                        className="text-sm font-bold text-brand-blue flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer"
                      >
                        {t(pageContent.str45En, pageContent.str45En)}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center bg-slate-50 border border-slate-200/60 rounded-3xl col-span-1 sm:col-span-2 lg:col-span-3">
                <svg className="w-12 h-12 text-slate-350 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-slate-700 font-bold text-sm">{t(pageContent.str46En, pageContent.str46En)}</h3>
                <p className="text-xs text-slate-400 mt-1">{t(pageContent.str47En, pageContent.str47En)}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Details Popup Modal */}
      {detailsJob && (
          <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-900/40 backdrop-blur-sm">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-6 sm:p-8 max-w-lg w-full relative text-slate-800 text-left">
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
                    <span className="text-slate-400 font-normal">{t(pageContent.str48En, pageContent.str48En)}</span>
                    <span>{translateLocation(detailsJob.location)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 font-normal">{t(pageContent.str49En, pageContent.str49En)}</span>
                    <span>{detailsJob.vacancy} {t(pageContent.str50En, pageContent.str50En)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 font-normal">{t(pageContent.str51En, pageContent.str51En)}</span>
                    <span>{detailsJob.salary} BDT</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 font-normal">{t(pageContent.str52En, pageContent.str52En)}</span>
                    <span>{detailsJob.deadline}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">{t(pageContent.str53En, pageContent.str53En)}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {translateJobDesc(detailsJob.desc)}
                  </p>
                </div>

                {/* Candidate Requirements */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">{t(pageContent.str54En, pageContent.str54En)}</h4>
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
                    {t(pageContent.str55En, pageContent.str55En)}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setSelectedJob(detailsJob);
                      setDetailsJob(null);
                    }}
                    className="w-full bg-linear-to-r from-brand-blue to-brand-cyan text-brand-dark hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] py-3 rounded-xl font-extrabold transition-all text-xs sm:text-sm cursor-pointer text-center shadow-lg shadow-brand-blue/15"
                  >
                    {t(pageContent.str45En, pageContent.str45En)}
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
              <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-6 sm:p-8 max-w-3xl w-full relative text-slate-800">
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
                    <h3 className="text-slate-900 font-extrabold text-xl">{t(pageContent.str56En, pageContent.str56En)}</h3>
                    <p className="text-xs text-slate-500 mt-1 font-semibold">
                      {t(pageContent.str57En, pageContent.str57En)} <span className="text-brand-blue font-black">{translateJobTitle(selectedJob.title)}</span>
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
                          {stepNum === 1 && t(pageContent.str58En, pageContent.str58En)}
                          {stepNum === 2 && t(pageContent.str59En, pageContent.str59En)}
                          {stepNum === 3 && t(pageContent.str60En, pageContent.str60En)}
                          {stepNum === 4 && t(pageContent.str61En, pageContent.str61En)}
                          {stepNum === 5 && t(pageContent.str62En, pageContent.str62En)}
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
                          {t(pageContent.str63En, pageContent.str63En)}
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
                          {t(pageContent.str64En, pageContent.str64En)}
                        </label>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str65En, pageContent.str65En)}</label>
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
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str66En, pageContent.str66En)}</label>
                          <input
                            type="text"
                            name="nameBn"
                            required
                            value={applyForm.nameEn}
                            onChange={handleApplyChange}
                            placeholder=""
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-blue"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str67En, pageContent.str67En)}</label>
                            <input
                              type="text"
                              name="fatherName"
                              value={applyForm.fatherName}
                              onChange={handleApplyChange}
                              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str68En, pageContent.str68En)}</label>
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
                            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str69En, pageContent.str69En)}</label>
                            <input
                              type="text"
                              name="motherName"
                              value={applyForm.motherName}
                              onChange={handleApplyChange}
                              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str70En, pageContent.str70En)}</label>
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
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str71En, pageContent.str71En)}</label>
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
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str72En, pageContent.str72En)}</label>
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
                            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str73En, pageContent.str73En)}</label>
                            <select
                              name="gender"
                              value={applyForm.gender}
                              onChange={handleApplyChange}
                              className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-sm text-slate-800 focus:outline-none cursor-pointer"
                            >
                              <option value="Male">{t(pageContent.str74En, pageContent.str74En)}</option>
                              <option value="Female">{t(pageContent.str75En, pageContent.str75En)}</option>
                              <option value="Other">{t(pageContent.str76En, pageContent.str76En)}</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str77En, pageContent.str77En)}</label>
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
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str78En, pageContent.str78En)}</label>
                          <select
                            name="maritalStatus"
                            value={applyForm.maritalStatus}
                            onChange={handleApplyChange}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none cursor-pointer"
                          >
                            <option value="Single">{t(pageContent.str79En, pageContent.str79En)}</option>
                            <option value="Married">{t(pageContent.str80En, pageContent.str80En)}</option>
                            <option value="Divorced">{t(pageContent.str81En, pageContent.str81En)}</option>
                            <option value="Widowed">{t(pageContent.str82En, pageContent.str82En)}</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str83En, pageContent.str83En)}</label>
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
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str84En, pageContent.str84En)}</label>
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
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str85En, pageContent.str85En)}</label>
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
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str86En, pageContent.str86En)}</label>
                          <input
                            type="text"
                            name="nationality"
                            value={applyForm.nationality}
                            onChange={handleApplyChange}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str87En, pageContent.str87En)}</label>
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
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str88En, pageContent.str88En)}</label>
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
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str89En, pageContent.str89En)}</label>
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
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str90En, pageContent.str90En)}</label>
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
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str91En, pageContent.str91En)}</label>
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
                            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str92En, pageContent.str92En)}</label>
                            <label className="flex items-center gap-1.5 text-[10px] font-bold text-brand-blue cursor-pointer">
                              <input
                                type="checkbox"
                                name="sameAsPresent"
                                checked={applyForm.sameAsPresent}
                                onChange={handleApplyChange}
                                className="rounded text-brand-blue focus:ring-brand-blue w-3 h-3"
                              />
                              {t(pageContent.str93En, pageContent.str93En)}
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
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">{t(pageContent.str94En, pageContent.str94En)}</h4>
                        <div className="space-y-4">
                          {/* MBA */}
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                            <span className="col-span-2 text-xs font-bold text-slate-700 pl-1">{t(pageContent.str95En, pageContent.str95En)}</span>
                            <input
                              type="text"
                              name="eduMBA_Uni"
                              value={applyForm.eduMBA_Uni}
                              onChange={handleApplyChange}
                              placeholder="Board / University"
                              className="col-span-4 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                            />
                            <input
                              type="text"
                              name="eduMBA_Major"
                              value={applyForm.eduMBA_Major}
                              onChange={handleApplyChange}
                              placeholder="Major / Subject"
                              className="col-span-3 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                            />
                            <div className="grid grid-cols-2 gap-1 col-span-3">
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
                                placeholder="CGPA"
                                className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* BBA */}
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                            <span className="col-span-2 text-xs font-bold text-slate-700 pl-1">{t(pageContent.str96En, pageContent.str96En)}</span>
                            <input
                              type="text"
                              name="eduBBA_Uni"
                              value={applyForm.eduBBA_Uni}
                              onChange={handleApplyChange}
                              placeholder="Board / University"
                              className="col-span-4 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                            />
                            <input
                              type="text"
                              name="eduBBA_Major"
                              value={applyForm.eduBBA_Major}
                              onChange={handleApplyChange}
                              placeholder="Major / Subject"
                              className="col-span-3 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                            />
                            <div className="grid grid-cols-2 gap-1 col-span-3">
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
                                placeholder="CGPA"
                                className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* HSC */}
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                            <span className="col-span-2 text-xs font-bold text-slate-700 pl-1">{t(pageContent.str97En, pageContent.str97En)}</span>
                            <input
                              type="text"
                              name="eduHSC_Uni"
                              value={applyForm.eduHSC_Uni}
                              onChange={handleApplyChange}
                              placeholder="Board / Institute"
                              className="col-span-4 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                            />
                            <input
                              type="text"
                              name="eduHSC_Major"
                              value={applyForm.eduHSC_Major}
                              onChange={handleApplyChange}
                              placeholder="Group / Subject"
                              className="col-span-3 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                            />
                            <div className="grid grid-cols-2 gap-1 col-span-3">
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
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                            <span className="col-span-2 text-xs font-bold text-slate-700 pl-1">{t(pageContent.str98En, pageContent.str98En)}</span>
                            <input
                              type="text"
                              name="eduSSC_Uni"
                              value={applyForm.eduSSC_Uni}
                              onChange={handleApplyChange}
                              placeholder="Board / School"
                              className="col-span-4 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                            />
                            <input
                              type="text"
                              name="eduSSC_Major"
                              value={applyForm.eduSSC_Major}
                              onChange={handleApplyChange}
                              placeholder="Group / Subject"
                              className="col-span-3 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                            />
                            <div className="grid grid-cols-2 gap-1 col-span-3">
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
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                            <span className="col-span-2 text-xs font-bold text-slate-700 pl-1">{t(pageContent.str99En, pageContent.str99En)}</span>
                            <input
                              type="text"
                              name="eduJSC_Uni"
                              value={applyForm.eduJSC_Uni}
                              onChange={handleApplyChange}
                              placeholder="School"
                              className="col-span-7 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none"
                            />
                            <div className="grid grid-cols-2 gap-1 col-span-3">
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
                        <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str100En, pageContent.str100En)}</label>
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
                          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">{t(pageContent.str101En, pageContent.str101En)}</h4>
                          <button
                            type="button"
                            onClick={addExperience}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer"
                          >
                            + {t(pageContent.str102En, pageContent.str102En)}
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
                                  {t(pageContent.str103En, pageContent.str103En)}
                                </button>
                              )}
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                  <label className="text-[10px] text-slate-500 font-bold uppercase">{t(pageContent.str104En, pageContent.str104En)}</label>
                                  <input
                                    type="text"
                                    value={exp.company}
                                    onChange={(e) => handleExperienceChange(idx, "company", e.target.value)}
                                    placeholder="e.g. Amber IT"
                                    className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                                  />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <label className="text-[10px] text-slate-500 font-bold uppercase">{t(pageContent.str105En, pageContent.str105En)}</label>
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
                                  <label className="text-[10px] text-slate-500 font-bold uppercase">{t(pageContent.str106En, pageContent.str106En)}</label>
                                  <input
                                    type="text"
                                    value={exp.duration}
                                    onChange={(e) => handleExperienceChange(idx, "duration", e.target.value)}
                                    placeholder="e.g. 2024 - 2025"
                                    className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                                  />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <label className="text-[10px] text-slate-500 font-bold uppercase">{t(pageContent.str107En, pageContent.str107En)}</label>
                                  <input
                                    type="text"
                                    value={exp.salary}
                                    onChange={(e) => handleExperienceChange(idx, "salary", e.target.value)}
                                    placeholder="e.g. 18,000"
                                    className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                                  />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <label className="text-[10px] text-slate-500 font-bold uppercase">{t(pageContent.str108En, pageContent.str108En)}</label>
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
                        <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str109En, pageContent.str109En)}</label>
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
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str110En, pageContent.str110En)}</label>
                          <textarea
                            name="motivationReason"
                            rows={2}
                            value={applyForm.motivationReason}
                            onChange={handleApplyChange}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-blue"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str111En, pageContent.str111En)}</label>
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
                              {t(pageContent.str112En, pageContent.str112En)}
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
                              {t(pageContent.str113En, pageContent.str113En)}
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
                              {t(pageContent.str114En, pageContent.str114En)}
                            </label>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str115En, pageContent.str115En)}</label>
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
                            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str116En, pageContent.str116En)}</label>
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
                                {t(pageContent.str117En, pageContent.str117En)}
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
                                {t(pageContent.str118En, pageContent.str118En)}
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
                            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str119En, pageContent.str119En)}</label>
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
                                {t(pageContent.str117En, pageContent.str117En)}
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
                                {t(pageContent.str118En, pageContent.str118En)}
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
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">{t(pageContent.str120En, pageContent.str120En)}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Reference 1 */}
                          <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
                            <h5 className="text-[10px] font-bold text-slate-500 uppercase">{t(pageContent.str121En, pageContent.str121En)}</h5>
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
                            <h5 className="text-[10px] font-bold text-slate-500 uppercase">{t(pageContent.str122En, pageContent.str122En)}</h5>
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
                        <h4 className="font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2">{t(pageContent.str123En, pageContent.str123En)}</h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          <div><span className="text-slate-400">{t(pageContent.str124En, pageContent.str124En)}</span> <strong className="text-slate-700">{applyForm.experienceType}</strong></div>
                          <div><span className="text-slate-400">{t(pageContent.str125En, pageContent.str125En)}</span> <strong className="text-slate-700">{applyForm.nameEn}</strong></div>
                          <div><span className="text-slate-400">{t(pageContent.str126En, pageContent.str126En)}</span> <strong className="text-slate-700">{applyForm.phone}</strong></div>
                          <div><span className="text-slate-400">{t(pageContent.str127En, pageContent.str127En)}</span> <strong className="text-slate-700">{applyForm.email}</strong></div>
                          <div><span className="text-slate-400">{t(pageContent.str128En, pageContent.str128En)}</span> <strong className="text-slate-700">{applyForm.nidBrc}</strong></div>
                          <div><span className="text-slate-400">{t(pageContent.str129En, pageContent.str129En)}</span> <strong className="text-slate-700">{applyForm.dob}</strong></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str130En, pageContent.str130En)}</label>
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
                          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str131En, pageContent.str131En)}</label>
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
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">{t(pageContent.str132En, pageContent.str132En)}</h4>
                        <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed text-justify">
                          {t(pageContent.str133En, pageContent.str133En)}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str134En, pageContent.str134En)}</label>
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
                              <span>{t(pageContent.str135En, pageContent.str135En)}</span>
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
                      {t(pageContent.str136En, pageContent.str136En)}
                    </button>
                    
                    {currentStep < 5 ? (
                      <button
                        type="button"
                        onClick={validateAndNext}
                        className="px-6 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-extrabold transition-colors cursor-pointer hover:bg-brand-blue/90"
                      >
                        {t(pageContent.str137En, pageContent.str137En)}
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-8 py-2.5 bg-linear-to-r from-brand-blue to-brand-cyan text-white font-extrabold rounded-xl text-xs transition-all shadow-md hover:opacity-95 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {submitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            {t(pageContent.str138En, pageContent.str138En)}
                          </>
                        ) : (
                          t(pageContent.str139En, pageContent.str139En)
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
                    <h3 className="text-slate-900 font-bold text-xl">{t(pageContent.str140En, pageContent.str140En)}</h3>
                    <p className="text-sm text-slate-600">
                      {t(pageContent.str141En, pageContent.str141En)}, <span className="text-slate-800 font-bold">{applyForm.nameEn}</span>. {t(pageContent.str142En, pageContent.str142En)}{" "}
                      <span className="text-brand-blue font-bold">{translateJobTitle(selectedJob.title)}</span>।
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                    {t(pageContent.str143En, pageContent.str143En)}
                  </p>

                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {t(pageContent.str144En, pageContent.str144En)}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
