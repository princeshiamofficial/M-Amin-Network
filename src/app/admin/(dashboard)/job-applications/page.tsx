"use client";
import React, { useState, useEffect, useMemo } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import { Table, TableCard } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import type { SortDescriptor } from "react-aria-components";
import { Dropdown } from "@/components/base/dropdown/dropdown";

interface JobApplication {
  id: string;
  name?: string;
  nameEn?: string;
  nameBn?: string;
  applicantName?: string;
  email?: string;
  applicantEmail?: string;
  phone?: string;
  applicantPhone?: string;
  jobTitle?: string;
  position?: string;
  experience?: string;
  experienceType?: string;
  date?: string;
  dateApplied?: string;
  cvUrl?: string;
  status: "Screening" | "Reviewing" | "Interview" | "Accepted" | "Rejected";
  
  fatherName?: string;
  fatherOccupation?: string;
  motherName?: string;
  motherOccupation?: string;
  dob?: string;
  placeOfBirth?: string;
  gender?: string;
  maritalStatus?: string;
  spouseName?: string;
  childrenCount?: string;
  bloodGroup?: string;
  religion?: string;
  nationality?: string;
  nidBrc?: string;
  emergencyContact?: string;
  presentAddress?: string;
  permanentAddress?: string;
  sameAsPresent?: boolean;
  eduMBA_Uni?: string; eduMBA_Year?: string; eduMBA_CGPA?: string; eduMBA_Major?: string;
  eduBBA_Uni?: string; eduBBA_Year?: string; eduBBA_CGPA?: string; eduBBA_Major?: string;
  eduHSC_Uni?: string; eduHSC_Year?: string; eduHSC_CGPA?: string; eduHSC_Major?: string;
  eduSSC_Uni?: string; eduSSC_Year?: string; eduSSC_CGPA?: string; eduSSC_Major?: string;
  eduJSC_Uni?: string; eduJSC_Year?: string; eduJSC_CGPA?: string; eduJSC_Major?: string;
  otherQualifications?: string;
  extracurricular?: string;
  motivationReason?: string;
  workComfort?: string;
  expectations?: string;
  criminalOffence?: string;
  criminalDetails?: string;
  relativeWorking?: string;
  relativeName?: string;
  workExperiences?: {
    company?: string;
    designation?: string;
    duration?: string;
    salary?: string;
    reason?: string;
  }[];
}

const defaultApplications: JobApplication[] = [
  { id: "APP-1001", nameEn: "Rafiqul Islam", email: "rafiq@example.com", phone: "01712345678", position: "Fiber Splicing Technician", experienceType: "3 Years", dateApplied: "7/3/2026", status: "Screening" },
  { id: "APP-1002", nameEn: "Sadia Akter", email: "sadia@example.com", phone: "01812345679", position: "NOC Engineer", experienceType: "2 Years", dateApplied: "7/4/2026", status: "Interview" },
];

export default function JobApplicationsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) { router.replace("/admin"); return; }
    setAuth(true);
    getSetting("job_applications").then(saved => {
      if (saved) { setApplications(saved as JobApplication[]); }
      else { setSetting("job_applications", defaultApplications); setApplications(defaultApplications); }
    });
  }, [router]);

  const updateStatus = (id: string, status: JobApplication["status"]) => {
    if (!id) return;
    setApplications(prev => {
      const updated = prev.map(a => (a.id && a.id === id) ? { ...a, status } : a);
      setTimeout(() => {
        setSetting("job_applications", updated);
      }, 0);
      return updated;
    });
  };
  const deleteApp = async (id: string) => {
    if (!id) return;
    if (!confirm("Delete this application?")) return;
    setApplications(prev => {
      const updated = prev.filter(a => a.id && a.id !== id);
      setTimeout(() => {
        setSetting("job_applications", updated);
      }, 0);
      return updated;
    });
  };
  const handleAction = (key: string, app: JobApplication) => {
    if (key === "view") {
      setSelectedApp(app);
    } else if (key.startsWith("status-")) {
      const newStatus = key.replace("status-", "") as JobApplication["status"];
      updateStatus(app.id, newStatus);
    } else if (key === "delete") {
      deleteApp(app.id);
    }
  };

  const sortedItems = useMemo(() => {
    const data = [...applications];
    return data.sort((a, b) => {
      let first: unknown = "";
      let second: unknown = "";

      if (sortDescriptor.column === "name") {
        first = a.nameEn || a.applicantName || a.name || "";
        second = b.nameEn || b.applicantName || b.name || "";
      } else if (sortDescriptor.column === "role") {
        first = a.position || a.jobTitle || "";
        second = b.position || b.jobTitle || "";
      } else if (sortDescriptor.column === "phone") {
        first = a.phone || a.applicantPhone || "";
        second = b.phone || b.applicantPhone || "";
      } else if (sortDescriptor.column === "status") {
        first = a.status || "";
        second = b.status || "";
      }

      if (typeof first === "string" && typeof second === "string") {
        let cmp = first.localeCompare(second);
        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }
        return cmp;
      }
      return 0;
    });
  }, [applications, sortDescriptor]);

  if (!auth) return null;

  return (
    <>
      <div className="min-h-[320px] pb-12">
        <TableCard.Root>
          <TableCard.Header
            title="Job Applications"
            badge={`${applications.length} candidates`}
          />
          <Table 
            aria-label="Submitted Job Applications"
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
          >
            <Table.Header>
              <Table.Head id="name" label="Name" isRowHeader allowsSorting className="w-full max-w-1/4" />
              <Table.Head id="status" label="Status" allowsSorting />
              <Table.Head id="role" label="Role" allowsSorting />
              <Table.Head id="phone" label="Phone" allowsSorting />
              <Table.Head id="experience" label="Experience" />
              <Table.Head id="actions" label="Actions" className="text-right" />
            </Table.Header>

            <Table.Body items={sortedItems}>
              {(app) => (
                <Table.Row id={app.id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Avatar initials={(app.nameEn || app.applicantName || "N").charAt(0).toUpperCase()} size="md" />
                      <div className="whitespace-nowrap">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                          {app.nameEn || app.applicantName || "N/A"}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          {app.email || app.applicantEmail || "N/A"}
                        </p>
                      </div>
                    </div>
                  </Table.Cell>
                   <Table.Cell>
                    <select
                      value={app.status || "Reviewing"}
                      onChange={(e) => {
                        const newStatus = e.target.value as JobApplication["status"];
                        updateStatus(app.id, newStatus);
                      }}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-blue/20 w-24 text-center appearance-none ${
                        app.status === "Accepted" 
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                          : app.status === "Rejected" 
                          ? "bg-red-500/10 text-red-655 border-red-500/20" 
                          : app.status === "Interview" 
                          ? "bg-purple-500/10 text-purple-600 border-purple-500/20" 
                          : "bg-blue-500/10 text-blue-600 border-blue-500/20"
                      }`}
                    >
                      <option value="Reviewing" className="bg-white dark:bg-[#0e162f] text-blue-600 font-bold">Reviewing</option>
                      <option value="Interview" className="bg-white dark:bg-[#0e162f] text-purple-600 font-bold">Interview</option>
                      <option value="Accepted" className="bg-white dark:bg-[#0e162f] text-emerald-600 font-bold">Accepted</option>
                      <option value="Rejected" className="bg-white dark:bg-[#0e162f] text-rose-600 font-bold">Rejected</option>
                    </select>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-slate-700 dark:text-slate-300 font-medium">
                    {app.position || app.jobTitle || "N/A"}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-slate-500 dark:text-slate-400 font-medium">
                    {app.phone || app.applicantPhone || "N/A"}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color="gray" size="sm" type="color">
                      {app.experienceType || app.experience || "Fresh"}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    <Dropdown.Root>
                      <Dropdown.DotsButton className="border border-slate-200 dark:border-slate-800 rounded-lg" />
                      <Dropdown.Popover className="w-36 bg-white dark:bg-[#0e162f] border border-slate-200 dark:border-slate-800 shadow-xl rounded-xl">
                        <Dropdown.Menu key={`${app.id}-${app.status}`} onAction={(key) => handleAction(key as string, app)}>
                          <Dropdown.Item id="view" label="View Details" />
                          <Dropdown.Item id="delete" label="Delete" className="text-red-655 font-semibold" />
                        </Dropdown.Menu>
                      </Dropdown.Popover>
                    </Dropdown.Root>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </TableCard.Root>
      </div>

      {/* Profile detail modal display dialog */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Application Details: {selectedApp.nameEn || selectedApp.applicantName || selectedApp.name || "N/A"}
                </h3>
                <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                  ID: {selectedApp.id} | Applied: {selectedApp.dateApplied || selectedApp.date || "N/A"}
                </p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-655 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto scrollbar-none space-y-8 text-xs text-slate-700">
              
              {/* Section 1: Basic Info & Position */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Job Profile</span>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-slate-400 block font-semibold text-[10px]">Position Applied</span>
                      <span className="text-slate-900 font-extrabold text-sm">{selectedApp.position || selectedApp.jobTitle || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold text-[10px]">Experience Level</span>
                      <span className="text-slate-900 font-extrabold text-sm">{selectedApp.experienceType || selectedApp.experience || "N/A"}</span>
                    </div>
                    {selectedApp.cvUrl && (
                      <div>
                        <span className="text-slate-400 block font-semibold text-[10px]">Resume / CV</span>
                        <a 
                          href={selectedApp.cvUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-1 text-blue-600 hover:text-blue-800 font-bold hover:underline"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          View Resume
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Status Tracking</span>
                  <div>
                    <span className="text-slate-400 block font-semibold text-[10px] mb-1">Current Status</span>
                    <select
                      value={selectedApp.status || "Reviewing"}
                      onChange={(e) => {
                        const newStatus = e.target.value as JobApplication["status"];
                        updateStatus(selectedApp.id, newStatus);
                        setSelectedApp(prev => prev ? { ...prev, status: newStatus } : null);
                      }}
                      className="block w-full bg-white dark:bg-[#0e162f] border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1 text-xs font-bold text-slate-850 dark:text-slate-150 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 cursor-pointer"
                    >
                      <option value="Reviewing">Reviewing</option>
                      <option value="Interview">Interview</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Personal details */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] border-b border-slate-100 pb-1">Personal Profile</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-slate-400 block font-semibold">Name (English)</span>
                    <span className="text-slate-800 font-bold">{selectedApp.nameEn || selectedApp.applicantName || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Name (Bengali)</span>
                    <span className="text-slate-800 font-bold">{selectedApp.nameBn || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Gender</span>
                    <span className="text-slate-800 font-bold">{selectedApp.gender || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Date of Birth</span>
                    <span className="text-slate-800 font-bold">{selectedApp.dob || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Father&apos;s Name</span>
                    <span className="text-slate-800 font-bold">{selectedApp.fatherName || "N/A"} ({selectedApp.fatherOccupation || "N/A"})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Mother&apos;s Name</span>
                    <span className="text-slate-800 font-bold">{selectedApp.motherName || "N/A"} ({selectedApp.motherOccupation || "N/A"})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Blood Group</span>
                    <span className="text-slate-800 font-bold">{selectedApp.bloodGroup || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Religion</span>
                    <span className="text-slate-800 font-bold">{selectedApp.religion || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">NID / Birth Cert</span>
                    <span className="text-slate-800 font-bold">{selectedApp.nidBrc || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Marital Status</span>
                    <span className="text-slate-800 font-bold">{selectedApp.maritalStatus || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Nationality</span>
                    <span className="text-slate-800 font-bold">{selectedApp.nationality || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Emergency Contact</span>
                    <span className="text-slate-800 font-bold">{selectedApp.emergencyContact || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Section 3: Contact Info */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] border-b border-slate-100 pb-1">Contact Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 block font-semibold">Email Address</span>
                    <span className="text-slate-800 font-bold">{selectedApp.email || selectedApp.applicantEmail || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Phone Number</span>
                    <span className="text-slate-800 font-bold">{selectedApp.phone || selectedApp.applicantPhone || "N/A"}</span>
                  </div>
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-400 block font-semibold">Present Address</span>
                      <span className="text-slate-800 font-bold block bg-slate-50 p-2 rounded-lg border border-slate-100">{selectedApp.presentAddress || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Permanent Address</span>
                      <span className="text-slate-800 font-bold block bg-slate-50 p-2 rounded-lg border border-slate-100">{selectedApp.sameAsPresent ? "Same as Present Address" : (selectedApp.permanentAddress || "N/A")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Academic Background */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] border-b border-slate-100 pb-1">Education Records</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] border border-slate-100 rounded-lg">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold">
                        <th className="p-2">Degree</th>
                        <th className="p-2">Institution / Board</th>
                        <th className="p-2">Passing Year</th>
                        <th className="p-2">CGPA / GPA</th>
                        <th className="p-2">Major / Group</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedApp.eduMBA_Uni && (
                        <tr>
                          <td className="p-2 font-bold text-slate-800">MBA / Equivalent</td>
                          <td className="p-2">{selectedApp.eduMBA_Uni}</td>
                          <td className="p-2">{selectedApp.eduMBA_Year}</td>
                          <td className="p-2 font-semibold text-brand-blue">{selectedApp.eduMBA_CGPA}</td>
                          <td className="p-2">{selectedApp.eduMBA_Major}</td>
                        </tr>
                      )}
                      {selectedApp.eduBBA_Uni && (
                        <tr>
                          <td className="p-2 font-bold text-slate-800">BSc / BBA / Honors</td>
                          <td className="p-2">{selectedApp.eduBBA_Uni}</td>
                          <td className="p-2">{selectedApp.eduBBA_Year}</td>
                          <td className="p-2 font-semibold text-brand-blue">{selectedApp.eduBBA_CGPA}</td>
                          <td className="p-2">{selectedApp.eduBBA_Major}</td>
                        </tr>
                      )}
                      {selectedApp.eduHSC_Uni && (
                        <tr>
                          <td className="p-2 font-bold text-slate-800">HSC / Alim / Equivalent</td>
                          <td className="p-2">{selectedApp.eduHSC_Uni}</td>
                          <td className="p-2">{selectedApp.eduHSC_Year}</td>
                          <td className="p-2 font-semibold text-brand-blue">{selectedApp.eduHSC_CGPA}</td>
                          <td className="p-2">{selectedApp.eduHSC_Major}</td>
                        </tr>
                      )}
                      {selectedApp.eduSSC_Uni && (
                        <tr>
                          <td className="p-2 font-bold text-slate-800">SSC / Dakhil / Equivalent</td>
                          <td className="p-2">{selectedApp.eduSSC_Uni}</td>
                          <td className="p-2">{selectedApp.eduSSC_Year}</td>
                          <td className="p-2 font-semibold text-brand-blue">{selectedApp.eduSSC_CGPA}</td>
                          <td className="p-2">{selectedApp.eduSSC_Major}</td>
                        </tr>
                      )}
                      {selectedApp.eduJSC_Uni && (
                        <tr>
                          <td className="p-2 font-bold text-slate-800">JSC / JSC Equivalent</td>
                          <td className="p-2">{selectedApp.eduJSC_Uni}</td>
                          <td className="p-2">{selectedApp.eduJSC_Year}</td>
                          <td className="p-2 font-semibold text-brand-blue">{selectedApp.eduJSC_CGPA}</td>
                          <td className="p-2">{selectedApp.eduJSC_Major}</td>
                        </tr>
                      )}
                      {!selectedApp.eduMBA_Uni && !selectedApp.eduBBA_Uni && !selectedApp.eduHSC_Uni && !selectedApp.eduSSC_Uni && !selectedApp.eduJSC_Uni && (
                        <tr>
                          <td colSpan={5} className="p-3 text-center text-slate-400 italic">No academic history provided.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 5: Professional Experience */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] border-b border-slate-100 pb-1">Work Experiences</h4>
                {selectedApp.workExperiences && selectedApp.workExperiences.length > 0 && selectedApp.workExperiences.some(w => w.company || w.designation) ? (
                  <div className="space-y-3">
                    {selectedApp.workExperiences.map((work, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div>
                          <span className="font-extrabold text-slate-800 block text-xs">{work.designation || "Position N/A"}</span>
                          <span className="text-[10px] text-slate-500 font-semibold">{work.company || "Company N/A"}</span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-[10px] text-slate-650 font-medium">
                          <div>
                            <span className="text-slate-400 block text-[9px] font-bold uppercase">Duration</span>
                            <span>{work.duration || "N/A"}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[9px] font-bold uppercase">Last Salary</span>
                            <span>{work.salary || "N/A"}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[9px] font-bold uppercase">Reason for Leaving</span>
                            <span>{work.reason || "N/A"}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center text-slate-400 italic">
                    Fresh / No professional work history listed.
                  </div>
                )}
              </div>

              {/* Section 6: Additional Questions */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px] border-b border-slate-100 pb-1">Additional Assessments</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 border border-slate-100 rounded-xl space-y-2 md:space-y-0">
                  <div>
                    <span className="text-slate-400 block font-semibold">Motivation / Statement of Purpose</span>
                    <p className="text-slate-800 leading-relaxed font-medium mt-1">{selectedApp.motivationReason || "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Preferred Environment</span>
                    <p className="text-slate-800 font-bold mt-1">{selectedApp.workComfort || "N/A"}</p>
                  </div>
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-slate-400 block font-semibold">Expected Salary / Benefits</span>
                      <span className="text-slate-800 font-bold">{selectedApp.expectations || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Criminal Offence Check</span>
                      <span className="text-slate-800 font-bold">{selectedApp.criminalOffence === "Yes" ? `Yes: ${selectedApp.criminalDetails}` : "No"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Relative Working in M-Amin?</span>
                      <span className="text-slate-800 font-bold">{selectedApp.relativeWorking === "Yes" ? `Yes: ${selectedApp.relativeName}` : "No"}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              {selectedApp.status !== "Accepted" && (
                <button
                  onClick={() => {
                    updateStatus(selectedApp.id, "Accepted");
                    setSelectedApp({ ...selectedApp, status: "Accepted" });
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-xs transition-colors cursor-pointer"
                >
                  Accept Candidate
                </button>
              )}
              {selectedApp.status !== "Rejected" && (
                <button
                  onClick={() => {
                    updateStatus(selectedApp.id, "Rejected");
                    setSelectedApp({ ...selectedApp, status: "Rejected" });
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-extrabold text-xs transition-colors cursor-pointer"
                >
                  Reject Candidate
                </button>
              )}
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-extrabold text-xs transition-colors cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
