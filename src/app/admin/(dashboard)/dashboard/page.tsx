"use client";
import { toast } from "sonner";
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getSetting, setSetting } from "@/actions/content";
import {
  Users,
  FileText,
  Receipt,
  LifeBuoy,
  MessageSquare,
  AlertTriangle,
  Mail,
  Package,
  Tag,
  MapPin,
  Briefcase,
  Zap,
  LayoutGrid,
  Type,
  Info,
  Phone,
  PanelTop,
  Tv2,
  Settings,
  UserCog
} from "lucide-react";

interface Claim {
  id: string;
  name: string;
  phone: string;
  address: string;
  promoCode: string;
  promoTitle: string;
  date: string;
  status: "Pending" | "Approved" | "Cancelled";
}


interface Complaint {
  id: string;
  clientId: string;
  name: string;
  phone: string;
  category: string;
  desc: string;
  date: string;
  status: "Pending" | "Investigating" | "Resolved";
}

interface Ticket {
  id: string;
  clientId: string;
  name: string;
  phone: string;
  category: string;
  desc: string;
  date: string;
  status: "Open" | "Assigned" | "Resolved";
}

interface Payment {
  id: string;
  clientId: string;
  name: string;
  phone: string;
  planName: string;
  speed: string;
  amount: number;
  gateway: string;
  date: string;
  dueDate?: string;
  paidDate?: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
}

interface Job {
  id: string;
  title: string;
  department: string;
  type: string;
  status: "Open" | "Closed";
  date: string;
}

interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  experience: string;
  status: "Screening" | "Reviewing" | "Interview" | "Accepted" | "Rejected";
  date: string;
}

interface Testimonial {
  id: string;
  author: string;
  role: string;
  text: string;
  rating: number;
  isPublished: boolean;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  isPublished: boolean;
}

interface SiteContent {
  hotline: string;
  supportEmail: string;
  address: string;
}

interface HomeSections {
  hero: boolean;
  packages: boolean;
  offers: boolean;
  coverage: boolean;
  testimonials: boolean;
  faq: boolean;
}

interface HeroTypography {
  mainTitle: string;
  subtitle: string;
}

interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}

interface AboutContent {
  storyTitle: string;
  storyBody: string;
}

interface ContactPageContent {
  headline: string;
  officeHours: string;
  mapEmbedUrl: string;
}

interface ComplaintPageContent {
  guidelineTitle: string;
  guidelineBody: string;
}

interface FooterContent {
  facebook: string;
  youtube: string;
  copyrightText: string;
  copyrightTextBn: string;
  aboutTextEn: string;
  aboutTextBn: string;
  asnText: string;
  btrcTextEn: string;
  btrcTextBn: string;
  addressEn: string;
  addressBn: string;
  phone: string;
  email: string;
  aff1En: string;
  aff1Bn: string;
  aff2En: string;
  aff2Bn: string;
}

interface ServiceHighlight {
  id: string;
  title: string;
  description: string;
}

interface ServiceReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
}

interface SystemConfig {
  peeringBandwidthLimit: string;
  maintenanceMode: boolean;
}

interface AdminUser {
  id: string;
  username: string;
  role: string;
  email: string;
  lastLogin: string;
}

interface SecurityLog {
  id: string;
  event: string;
  ipAddress: string;
  timestamp: string;
  severity: "Info" | "Warning" | "Critical";
}

interface SEOAuditReport {
  page: string;
  score: number;
  ssl: boolean;
  mobileFriendly: boolean;
}

interface Shortcut {
  id: string;
  label: string;
  targetTab: string;
}

const tabUrls: Record<string, string> = {
  "Overview": "/admin/dashboard",
  "Packages": "/admin/packages",
  "Offers": "/admin/offers",
  "Coverage Areas": "/admin/coverage-areas",
  "Applications": "/admin/applications",
  "Customers": "/admin/customers",
  "Bills": "/admin/bills",
  "Tickets": "/admin/tickets",
  "Package Requests": "/admin/package-requests",
  "Contact Messages": "/admin/contact-messages",
  "Complaints": "/admin/complaints",
  "Jobs": "/admin/jobs",
  "Job Applications": "/admin/job-applications",
  "Testimonials": "/admin/testimonials",
  "FAQs": "/admin/faqs",
  "Site Content": "/admin/site-content",
  "Home Sections": "/admin/home-sections",
  "Hero Typography": "/admin/hero-typography",
  "SEO & Sharing": "/admin/seo-sharing",
  "About Page": "/admin/about-page",
  "Contact Page": "/admin/contact-page",
  "Complaint Page": "/admin/complaint-page",
  "Top Bar & Footer": "/admin/topbar-footer",
  "Services Hub": "/admin/services-hub",
  "Service Reviews": "/admin/service-reviews",
  "Settings": "/admin/settings",
  "Users & Roles": "/admin/users-roles",
  "Security": "/admin/security",
  "SEO Audit": "/admin/seo-audit",
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [greeting, setGreeting] = useState("Welcome");

  // Quick actions reordering state
  const [quickActionsList, setQuickActionsList] = useState([
    { label: "Packages",        path: "/admin/packages",        route: "/admin/packages",        icon: Package,      bg: "bg-blue-50",    text: "text-blue-600" },
    { label: "Offers",          path: "/admin/offers",          route: "/admin/offers",          icon: Tag,          bg: "bg-violet-50",  text: "text-violet-600" },
    { label: "Coverage Areas",  path: "/admin/coverage",        route: "/admin/coverage-areas",  icon: MapPin,       bg: "bg-emerald-50", text: "text-emerald-600" },
    { label: "Application",     path: "/admin/applications",    route: "/admin/applications",    icon: FileText,     bg: "bg-amber-50",   text: "text-amber-600" },
    { label: "Customer",        path: "/admin/customers",        route: "/admin/customers",        icon: Users,        bg: "bg-sky-50",     text: "text-sky-600" },
    { label: "Bills",           path: "/admin/bills",           route: "/admin/bills",           icon: Receipt,      bg: "bg-teal-50",    text: "text-teal-600" },
    { label: "Contact Messages",path: "/admin/contact",         route: "/admin/contact-messages", icon: Mail,         bg: "bg-pink-50",    text: "text-pink-600" },
    { label: "Complaints",      path: "/admin/complaints",      route: "/admin/complaints",      icon: AlertTriangle, bg: "bg-red-50",    text: "text-red-500" },
    { label: "Jobs Add",        path: "/admin/jobs",            route: "/admin/jobs",            icon: Briefcase,    bg: "bg-orange-50",  text: "text-orange-600" },
    { label: "Job Applications",path: "/admin/job-applications",route: "/admin/job-applications",icon: FileText,     bg: "bg-indigo-50",  text: "text-indigo-600" },
    { label: "Site Content",    path: "/admin/content",         route: "/admin/site-content",    icon: Zap,          bg: "bg-yellow-50",  text: "text-yellow-600" },
    { label: "Home Sections",   path: "/admin/home-sections",   route: "/admin/home-sections",   icon: LayoutGrid,   bg: "bg-fuchsia-50", text: "text-fuchsia-600" },
    { label: "Hero Typography", path: "/admin/hero-typography", route: "/admin/hero-typography", icon: Type,         bg: "bg-cyan-50",    text: "text-cyan-600" },
    { label: "About Page",      path: "/admin/about",           route: "/admin/about-page",      icon: Info,         bg: "bg-lime-50",    text: "text-lime-600" },
    { label: "Contact Page",    path: "/admin/contact-page",   route: "/admin/contact-page",    icon: Phone,        bg: "bg-rose-50",    text: "text-rose-600" },
    { label: "Top Bar & Footer",path: "/admin/layout",          route: "/admin/topbar-footer",   icon: PanelTop,     bg: "bg-slate-100",  text: "text-slate-600" },
    { label: "Multimedia",      path: "/admin/services",        route: "/admin/services-hub",    icon: Tv2,          bg: "bg-purple-50",  text: "text-purple-600" },
    { label: "Settings",        path: "/admin/settings",        route: "/admin/settings",        icon: Settings,     bg: "bg-gray-100",   text: "text-gray-600" },
    { label: "Users & Roles",   path: "/admin/users",           route: "/admin/users-roles",     icon: UserCog,      bg: "bg-blue-50",    text: "text-blue-700" },
  ]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragEnter = (targetIdx: number) => {
    if (draggedIndex === null || draggedIndex === targetIdx) return;
    setQuickActionsList((prevList) => {
      const newList = [...prevList];
      const draggedItem = newList[draggedIndex];
      newList.splice(draggedIndex, 1);
      newList.splice(targetIdx, 0, draggedItem);
      return newList;
    });
    setDraggedIndex(targetIdx);
  };

  // Database states
  const [claims, setClaims] = useState<Claim[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [activeActionMenu, setActiveActionMenu] = useState<string | null>(null);

  // Snapshot counts states
  const [countCustomers, setCountCustomers] = useState(3);
  const [countApplications, setCountApplications] = useState(1);
  const [countTickets, setCountTickets] = useState(1);
  const [countComplaintsToday, setCountComplaintsToday] = useState(0);
  const [countAllComplaints, setCountAllComplaints] = useState(3);
  const [countContactInbox, setCountContactInbox] = useState(0);
  const [countPackages, setCountPackages] = useState(5);
  const [countOffers, setCountOffers] = useState(7);
  const [countCoverageAreas, setCountCoverageAreas] = useState(1);

  // CMS Content States
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent>({
    hotline: "+880 1707-009267",
    supportEmail: "support@maminnetwork.com",
    address: "Kadomtoli, South Keraniganj, Dhaka, Bangladesh",
  });
  const [homeSections, setHomeSections] = useState<HomeSections>({
    hero: true,
    packages: true,
    offers: true,
    coverage: true,
    testimonials: true,
    faq: true,
  });
  const [heroTypography, setHeroTypography] = useState<HeroTypography>({
    mainTitle: "Super Fast Broadband Connection in Dhaka",
    subtitle: "High-speed fiber internet solutions tailored for homes and businesses across Southern Keraniganj.",
  });
  const [seoSettings, setSeoSettings] = useState<SEOSettings>({
    metaTitle: "M Amin Network - Leading ISP in Keraniganj",
    metaDescription: "Enjoy ultra-fast fiber internet connection, stable gateway SLA, and dedicated customer support.",
    keywords: "internet provider, ISP Keraniganj, broadband, fiber optic, high-speed wifi",
  });
  const [aboutContent, setAboutContent] = useState<AboutContent>({
    storyTitle: "Our Story & Mission",
    storyBody: "Founded with a vision to connect every household in Southern Keraniganj with premium fiber internet, M Amin Network provides reliable high-bandwidth gateway SLA and dedicated network engineers to ensure optimal performance 24/7.",
  });

  // Additional CMS States
  const [contactPageContent, setContactPageContent] = useState<ContactPageContent>({
    headline: "Get in Touch With Us",
    officeHours: "Saturday - Thursday: 09:00 AM - 10:00 PM",
    mapEmbedUrl: "https://maps.google.com",
  });
  const [complaintPageContent, setComplaintPageContent] = useState<ComplaintPageContent>({
    guidelineTitle: "Submitting Formal Grievances (BTRC SLA Compliance)",
    guidelineBody: "Under BTRC guidelines, clients may lodge formal complaints here. All submissions generate trace IDs. Tickets are resolved within standard BTRC SLA frames (24-48 hrs).",
  });
  const [footerContent, setFooterContent] = useState<FooterContent>({
    facebook: "https://facebook.com/maminnetwork",
    youtube: "https://youtube.com/maminnetwork",
    copyrightText: "© 2026 M Amin Network. All Rights Reserved.",
    copyrightTextBn: "© 2026 এম আমিন নেটওয়ার্ক। সর্বস্বত্ব সংরক্ষিত।",
    aboutTextEn: "Top-tier Internet Service Provider (ISP) in South Keraniganj, Dhaka. Providing lightning-fast, buffer-free, SLA-backed broadband internet solutions for homes and businesses.",
    aboutTextBn: "দক্ষিণ কেরানীগঞ্জ, ঢাকার শীর্ষস্থানীয় ইন্টারনেট সেবা প্রদানকারী (ISP)। আমরা বাসা ও অফিসের জন্য অতি-দ্রুত, বাফার-মুক্ত, এবং SLA-সমর্থিত ব্রডব্যান্ড ইন্টারনেট সেবা প্রদান করি।",
    asnText: "AS150164",
    btrcTextEn: "BTRC Licensed",
    btrcTextBn: "বিটিআরসি অনুমোদিত",
    addressEn: "House No. 68, Kadomtoli, Aganagar, South Keraniganj, Dhaka-1310, Bangladesh.",
    addressBn: "বাসা নং ৬৮, কদমতলী, আগানগর, দক্ষিণ কেরানীগঞ্জ, ঢাকা-১৩১০, বাংলাদেশ।",
    phone: "+880 1707-009267",
    email: "info@m-aminnetwork.com",
    aff1En: "ISPAB MEMBER",
    aff1Bn: "আইএসপিএবি সদস্য",
    aff2En: "AS150164 BGP NETWORK",
    aff2Bn: "AS150164 বিজিপি নেটওয়ার্ক",
  });
  const [serviceHighlights, setServiceHighlights] = useState<ServiceHighlight[]>([]);
  const [serviceReviews, setServiceReviews] = useState<ServiceReview[]>([]);
  const [systemConfig, setSystemConfig] = useState<SystemConfig>({
    peeringBandwidthLimit: "10 Gbps",
    maintenanceMode: false,
  });

  // Access States
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([]);
  const [seoAuditReports, setSeoAuditReports] = useState<SEOAuditReport[]>([]);
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  // Search/Filter states
  const [searchTerm, setSearchTerm] = useState("");

  // Offers modal state
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [claimFormData, setClaimFormData] = useState({
    name: "",
    phone: "",
    address: "",
    promoCode: "",
    promoTitle: "",
    status: "Pending" as "Pending" | "Approved" | "Cancelled"
  });

  const handleSaveClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window === "undefined") return;

    const newClaim: Claim = {
      id: `CLM-${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      name: claimFormData.name,
      phone: claimFormData.phone,
      address: claimFormData.address,
      promoCode: claimFormData.promoCode || "CUSTOM",
      promoTitle: claimFormData.promoTitle || "Custom Reservation",
      date: new Date().toLocaleString(),
      status: claimFormData.status
    };

    const updated = [newClaim, ...claims];
    setClaims(updated);
    setSetting("m_amin_claims", updated);
    setIsClaimModalOpen(false);
    toast("Connection claim reservation added successfully!");
  };


  // System stats mockup states
  const [activeClients, setActiveClients] = useState(1482);
  const [totalBandwidthGbps, setTotalBandwidthGbps] = useState(4.2);

  const defaultClaims: Claim[] = [
    {
      id: "CLM-72648-2849",
      name: "Mehan Ahmed",
      phone: "01707009267",
      address: "House 12, Road 4, Kadomtoli, South Keraniganj",
      promoCode: "ANNUAL10",
      promoTitle: "Pay 10 Months, Get 12",
      date: "7/2/2026, 11:34 AM",
      status: "Pending",
    },
    {
      id: "CLM-19472-8829",
      name: "Nasrin Sultana",
      phone: "01819284920",
      address: "Block C, Bashundhara R/A, South Keraniganj",
      promoCode: "FREEINSTALL2026",
      promoTitle: "Zero Installation Fee",
      date: "7/2/2026, 2:15 PM",
      status: "Approved",
    },
  ];

  const defaultComplaints: Complaint[] = [
    {
      id: "CMP-88239-1102",
      clientId: "SUB-88293",
      name: "Mehan Ahmed",
      phone: "01707009267",
      category: "Billing Dispute",
      desc: "Charged double for the standard premium plan subscription this month without notice.",
      date: "7/2/2026, 1:44 PM",
      status: "Pending",
    },
    {
      id: "CMP-38492-9903",
      clientId: "SUB-19402",
      name: "Sheikh Nabil",
      phone: "01928492049",
      category: "Frequent Disconnections",
      desc: "Fiber optic connection drops out every 10 minutes in Kadomtoli area.",
      date: "7/2/2026, 4:50 PM",
      status: "Investigating",
    },
  ];

  const defaultTickets: Ticket[] = [
    {
      id: "TCK-19482-9902",
      clientId: "SUB-88293",
      name: "Mehan Ahmed",
      phone: "01707009267",
      category: "Hardware",
      desc: "ONU device power indicator is red, no optical signal received.",
      date: "7/2/2026, 3:12 PM",
      status: "Open",
    },
    {
      id: "TCK-88392-1209",
      clientId: "SUB-19402",
      name: "Sheikh Nabil",
      phone: "01928492049",
      category: "Line Issue",
      desc: "Broadband speeds capped at 5Mbps instead of the committed 30Mbps.",
      date: "7/2/2026, 5:30 PM",
      status: "Resolved",
    },
  ];

  const defaultPayments: Payment[] = [
    {
      id: "TXN-99883-29402",
      clientId: "SUB-88293",
      name: "Mehan Ahmed",
      phone: "01707009267",
      planName: "Premium Home",
      speed: "30 Mbps",
      amount: 1250,
      gateway: "bKash",
      date: "7/2/2026, 12:30 PM",
    },
    {
      id: "TXN-12049-88392",
      clientId: "SUB-19402",
      name: "Sheikh Nabil",
      phone: "01928492049",
      planName: "Standard Starter",
      speed: "15 Mbps",
      amount: 800,
      gateway: "Nagad",
      date: "7/2/2026, 4:12 PM",
    },
  ];

  const defaultMessages: ContactMessage[] = [
    {
      id: "MSG-00192-2849",
      name: "Rashedul Karim",
      email: "rashed@gmail.com",
      phone: "01712345678",
      subject: "Corporate Pricing Query",
      message: "Please send corporate peering rates for a 100Mbps dedicated splice link in Aganagar.",
      date: "7/2/2026, 10:15 AM",
    },
  ];

  const defaultJobs: Job[] = [
    {
      id: "JOB-001",
      title: "Network Support Engineer",
      department: "Technical Operations",
      type: "Full-Time",
      status: "Open",
      date: "7/1/2026",
    },
    {
      id: "JOB-002",
      title: "Fiber Splicer Technician",
      department: "Field Infrastructure",
      type: "Full-Time",
      status: "Open",
      date: "7/2/2026",
    },
  ];

  const defaultJobApplications: JobApplication[] = [
    {
      id: "APP-4829",
      name: "Mehedi Hasan",
      email: "mehedi@gmail.com",
      phone: "01728394012",
      jobTitle: "Network Support Engineer",
      experience: "2 Years",
      status: "Reviewing",
      date: "7/2/2026, 11:34 AM",
    },
  ];

  const defaultTestimonials: Testimonial[] = [
    {
      id: "TEST-001",
      author: "Adil Chowdhury",
      role: "Freelance Designer",
      text: "The internet speeds are super stable. Bufferless 4K streaming and low latency during night peering works perfectly.",
      rating: 5,
      isPublished: true,
    },
    {
      id: "TEST-002",
      author: "Farhana Yasmin",
      role: "Work From Home Mom",
      text: "Good customer service. Line issues are resolved within hours after reporting to the support team.",
      rating: 4,
      isPublished: true,
    },
  ];

  const defaultFAQs: FAQ[] = [
    {
      id: "FAQ-001",
      question: "How long does address verification and installation take?",
      answer: "Address checks and fiber connection setup generally take 24 to 48 working hours depending on location availability.",
      isPublished: true,
    },
    {
      id: "FAQ-002",
      question: "Do you offer corporate dedicated splice lines?",
      answer: "Yes, we offer fully redundant peering connections for businesses and corporations in Southern Keraniganj.",
      isPublished: true,
    },
  ];

  const defaultServiceHighlights: ServiceHighlight[] = [
    { id: "SRV-1", title: "Dedicated GGC/SNA Peering Cache", description: "Direct connectivity to YouTube and Facebook caches for buffer-free delivery." },
    { id: "SRV-2", title: "Optical Fiber SLA Gateway", description: "Redundant link pathways keeping fiber uptime metrics above BTRC rules." },
  ];

  const defaultServiceReviews: ServiceReview[] = [
    { id: "REV-1", author: "Kamrul Islam", rating: 5, comment: "Zero latency during midnight working slots, highly recommended!" },
  ];

  const defaultAdminUsers: AdminUser[] = [
    { id: "USR-1", username: "admin", role: "Super Administrator", email: "admin@maminnetwork.test", lastLogin: "7/3/2026, 10:30 AM" },
    { id: "USR-2", username: "moderator_support", role: "Support Staff", email: "support@maminnetwork.test", lastLogin: "7/2/2026, 04:15 PM" },
  ];

  const defaultSecurityLogs: SecurityLog[] = [
    { id: "LOG-1", event: "Super Admin Session Authenticated", ipAddress: "192.168.1.50", timestamp: "7/3/2026, 10:30 AM", severity: "Info" },
    { id: "LOG-2", event: "Failed Authentication Attempt", ipAddress: "203.0.113.88", timestamp: "7/2/2026, 11:20 PM", severity: "Warning" },
  ];

  const defaultSEOAuditReports: SEOAuditReport[] = [
    { page: "Homepage (/) ", score: 98, ssl: true, mobileFriendly: true },
    { page: "Packages (/packages)", score: 95, ssl: true, mobileFriendly: true },
    { page: "Offers (/offers)", score: 92, ssl: true, mobileFriendly: true },
  ];

  const defaultShortcuts: Shortcut[] = [
    { id: "SC-1", label: "Grievances Queue", targetTab: "Complaints" },
    { id: "SC-2", label: "Transactions Log", targetTab: "Bills" },
    { id: "SC-3", label: "Openings (Jobs)", targetTab: "Jobs" },
  ];

  function loadDatabase() {
    if (typeof window === "undefined") return;

    getSetting("m_amin_claims").then(savedClaims => {
      if (savedClaims) {
        setClaims(savedClaims as Claim[]);
      } else {
        setSetting("m_amin_claims", defaultClaims);
        setClaims(defaultClaims);
      }
    });

    getSetting("m_amin_complaints").then(savedComplaints => {
      if (savedComplaints) {
        setComplaints(savedComplaints as Complaint[]);
      } else {
        setSetting("m_amin_complaints", defaultComplaints);
        setComplaints(defaultComplaints);
      }
    });

    getSetting("m_amin_tickets").then(savedTickets => {
      if (savedTickets) {
        setTickets(savedTickets as Ticket[]);
      } else {
        setSetting("m_amin_tickets", defaultTickets);
        setTickets(defaultTickets);
      }
    });

    getSetting("m_amin_payments").then(savedPayments => {
      if (savedPayments) {
        setPayments(savedPayments as Payment[]);
      } else {
        setSetting("m_amin_payments", defaultPayments);
        setPayments(defaultPayments);
      }
    });

    getSetting("m_amin_contact_submissions").then(savedMessages => {
      if (savedMessages) {
        setMessages(savedMessages as ContactMessage[]);
      } else {
        setSetting("m_amin_contact_submissions", defaultMessages);
        setMessages(defaultMessages);
      }
    });

    getSetting("m_amin_jobs").then(savedJobs => {
      if (savedJobs) {
        setJobs(savedJobs as Job[]);
      } else {
        setSetting("m_amin_jobs", defaultJobs);
        setJobs(defaultJobs);
      }
    });

    getSetting("m_amin_job_applications").then(savedApps => {
      if (savedApps) {
        setJobApplications(savedApps as JobApplication[]);
      } else {
        setSetting("m_amin_job_applications", defaultJobApplications);
        setJobApplications(defaultJobApplications);
      }
    });

    getSetting("m_amin_testimonials").then(savedTestimonials => {
      if (savedTestimonials) {
        setTestimonials(savedTestimonials as Testimonial[]);
      } else {
        setSetting("m_amin_testimonials", defaultTestimonials);
        setTestimonials(defaultTestimonials);
      }
    });

    getSetting("m_amin_faqs").then(savedFAQs => {
      if (savedFAQs) {
        setFaqs(savedFAQs as FAQ[]);
      } else {
        setSetting("m_amin_faqs", defaultFAQs);
        setFaqs(defaultFAQs);
      }
    });

    const savedSiteContent = localStorage.getItem("m_amin_site_content");
    if (savedSiteContent) {
      setSiteContent(JSON.parse(savedSiteContent));
    }

    const savedHomeSections = localStorage.getItem("m_amin_home_sections");
    if (savedHomeSections) {
      setHomeSections(JSON.parse(savedHomeSections));
    }

    const savedHeroTypography = localStorage.getItem("m_amin_hero_typography");
    if (savedHeroTypography) {
      setHeroTypography(JSON.parse(savedHeroTypography));
    }

    const savedSeo = localStorage.getItem("m_amin_seo_settings");
    if (savedSeo) {
      setSeoSettings(JSON.parse(savedSeo));
    }

    const savedAbout = localStorage.getItem("m_amin_about_content");
    if (savedAbout) {
      setAboutContent(JSON.parse(savedAbout));
    }

    const savedContact = localStorage.getItem("m_amin_contact_content");
    if (savedContact) {
      setContactPageContent(JSON.parse(savedContact));
    }

    const savedComplaintContent = localStorage.getItem("m_amin_complaint_content_guidelines");
    if (savedComplaintContent) {
      setComplaintPageContent(JSON.parse(savedComplaintContent));
    }

    const savedFooter = localStorage.getItem("m_amin_footer_content");
    if (savedFooter) {
      setFooterContent(JSON.parse(savedFooter));
    }

    getSetting("m_amin_service_highlights").then(savedHighlights => {
      if (savedHighlights) {
        setServiceHighlights(savedHighlights as ServiceHighlight[]);
      } else {
        setSetting("m_amin_service_highlights", defaultServiceHighlights);
        setServiceHighlights(defaultServiceHighlights);
      }
    });

    getSetting("m_amin_service_reviews").then(savedReviews => {
      if (savedReviews) {
        setServiceReviews(savedReviews as ServiceReview[]);
      } else {
        setSetting("m_amin_service_reviews", defaultServiceReviews);
        setServiceReviews(defaultServiceReviews);
      }
    });

    const savedSys = localStorage.getItem("m_amin_system_config");
    if (savedSys) {
      setSystemConfig(JSON.parse(savedSys));
    }

    getSetting("m_amin_admin_users").then(savedUsers => {
      if (savedUsers) {
        setAdminUsers(savedUsers as AdminUser[]);
      } else {
        setSetting("m_amin_admin_users", defaultAdminUsers);
        setAdminUsers(defaultAdminUsers);
      }
    });

    getSetting("m_amin_security_logs").then(savedLogs => {
      if (savedLogs) {
        setSecurityLogs(savedLogs as SecurityLog[]);
      } else {
        setSetting("m_amin_security_logs", defaultSecurityLogs);
        setSecurityLogs(defaultSecurityLogs);
      }
    });

    getSetting("m_amin_seo_audits").then(savedSeoAudits => {
      if (savedSeoAudits) {
        setSeoAuditReports(savedSeoAudits as SEOAuditReport[]);
      } else {
        setSetting("m_amin_seo_audits", defaultSEOAuditReports);
        setSeoAuditReports(defaultSEOAuditReports);
      }
    });

    getSetting("m_amin_dashboard_shortcuts").then(savedShortcuts => {
      if (savedShortcuts) {
        setShortcuts(savedShortcuts as Shortcut[]);
      } else {
        setSetting("m_amin_dashboard_shortcuts", defaultShortcuts);
        setShortcuts(defaultShortcuts);
      }
    });

    // Load snapshot counts
    try {
      const savedCustomers = localStorage.getItem("m_amin_customers");
      if (savedCustomers) {
        setCountCustomers(JSON.parse(savedCustomers).length);
      } else {
        setCountCustomers(3);
      }

      const savedApps = localStorage.getItem("m_amin_job_applications");
      if (savedApps) {
        setCountApplications(JSON.parse(savedApps).length);
      }

      const savedTickets = localStorage.getItem("m_amin_tickets");
      if (savedTickets) {
        setCountTickets(JSON.parse(savedTickets).length);
      }

      const savedComplaints = localStorage.getItem("m_amin_complaints");
      if (savedComplaints) {
        const list = JSON.parse(savedComplaints);
        setCountAllComplaints(list.length);
        const todayStr = new Date().toLocaleDateString();
        const filedToday = list.filter((c: Complaint) => c.date && c.date.includes(todayStr));
        setCountComplaintsToday(filedToday.length);
      }

      const savedMessages = localStorage.getItem("m_amin_contact_submissions");
      if (savedMessages) {
        setCountContactInbox(JSON.parse(savedMessages).length);
      }

      const savedPackages = localStorage.getItem("m_amin_packages");
      if (savedPackages) {
        setCountPackages(JSON.parse(savedPackages).length);
      }

      const savedClaims = localStorage.getItem("m_amin_claims");
      if (savedClaims) {
        setCountOffers(JSON.parse(savedClaims).length);
      }

      const savedAreas = localStorage.getItem("m_amin_coverage_zones");
      if (savedAreas) {
        setCountCoverageAreas(JSON.parse(savedAreas).length);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setGreeting("Good Morning");
      } else if (hour >= 12 && hour < 17) {
        setGreeting("Good Afternoon");
      } else if (hour >= 17 && hour < 22) {
        setGreeting("Good Evening");
      } else {
        setGreeting("Good Night");
      }
      if (typeof window !== "undefined") {
        const auth = sessionStorage.getItem("m_amin_admin_authenticated");
        if (auth !== "true") {
          router.push("/admin");
        } else {
          setIsAuthenticated(true);
          loadDatabase();
        }
      }
    }, 0);

    const interval = setInterval(() => {
      setTotalBandwidthGbps((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(2));
    }, 4000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // Sync tab active selection dynamically with the pathname
  useEffect(() => {
    const currentTab = Object.entries(tabUrls).find(([, url]) => url === pathname)?.[0];
    if (currentTab) {
      const timer = setTimeout(() => {
        setActiveTab(currentTab);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [pathname]);



  const resetToDefaults = async () => {
    if (typeof window === "undefined") return;
    if (confirm("Are you sure you want to reset mock database to default seeded values?")) {
      setSetting("m_amin_claims", defaultClaims);
      setSetting("m_amin_complaints", defaultComplaints);
      setSetting("m_amin_tickets", defaultTickets);
      setSetting("m_amin_payments", defaultPayments);
      setSetting("m_amin_contact_submissions", defaultMessages);
      setSetting("m_amin_jobs", defaultJobs);
      setSetting("m_amin_job_applications", defaultJobApplications);
      setSetting("m_amin_testimonials", defaultTestimonials);
      setSetting("m_amin_faqs", defaultFAQs);
      setSetting("m_amin_service_highlights", defaultServiceHighlights);
      setSetting("m_amin_service_reviews", defaultServiceReviews);
      setSetting("m_amin_admin_users", defaultAdminUsers);
      setSetting("m_amin_security_logs", defaultSecurityLogs);
      setSetting("m_amin_seo_audits", defaultSEOAuditReports);
      setSetting("m_amin_dashboard_shortcuts", defaultShortcuts);
      
      const defaultSite = { hotline: "+880 1707-009267", supportEmail: "support@maminnetwork.com", address: "Kadomtoli, South Keraniganj, Dhaka, Bangladesh" };
      const defaultHome = { hero: true, packages: true, offers: true, coverage: true, testimonials: true, faq: true };
      const defaultHero = { mainTitle: "Super Fast Broadband Connection in Dhaka", subtitle: "High-speed fiber internet solutions tailored for homes and businesses across Southern Keraniganj." };
      const defaultSeo = { metaTitle: "M Amin Network - Leading ISP in Keraniganj", metaDescription: "Enjoy ultra-fast fiber internet connection, stable gateway SLA, and dedicated customer support.", keywords: "internet provider, ISP Keraniganj, broadband, fiber optic, high-speed wifi" };
      const defaultAbout = { storyTitle: "Our Story & Mission", storyBody: "Founded with a vision to connect every household in Southern Keraniganj with premium fiber internet, M Amin Network provides reliable high-bandwidth gateway SLA and dedicated network engineers to ensure optimal performance 24/7." };
      const defaultContact = { headline: "Get in Touch With Us", officeHours: "Saturday - Thursday: 09:00 AM - 10:00 PM", mapEmbedUrl: "https://maps.google.com" };
      const defaultComp = { guidelineTitle: "Submitting Formal Grievances (BTRC SLA Compliance)", guidelineBody: "Under BTRC guidelines, clients may lodge formal complaints here. All submissions generate trace IDs. Tickets are resolved within standard BTRC SLA frames (24-48 hrs)." };
      const defaultFoot = {
        facebook: "https://facebook.com/maminnetwork",
        youtube: "https://youtube.com/maminnetwork",
        instagram: "https://instagram.com/maminnetwork",
        twitter: "https://x.com/maminnetwork",
        linkedin: "https://linkedin.com/company/maminnetwork",
        copyrightText: "© 2026 M Amin Network. All Rights Reserved.",
        copyrightTextBn: "© 2026 এম আমিন নেটওয়ার্ক। সর্বস্বত্ব সংরক্ষিত।",
        aboutTextEn: "Top-tier Internet Service Provider (ISP) in South Keraniganj, Dhaka. Providing lightning-fast, buffer-free, SLA-backed broadband internet solutions for homes and businesses.",
        aboutTextBn: "দক্ষিণ কেরানীগঞ্জ, ঢাকার শীর্ষস্থানীয় ইন্টারনেট সেবা প্রদানকারী (ISP)। আমরা বাসা ও অফিসের জন্য অতি-দ্রুত, বাফার-মুক্ত, এবং SLA-সমর্থিত ব্রডব্যান্ড ইন্টারনেট সেবা প্রদান করি।",
        asnText: "AS150164",
        btrcTextEn: "BTRC Licensed",
        btrcTextBn: "বিটিআরসি অনুমোদিত",
        addressEn: "House No. 68, Kadomtoli, Aganagar, South Keraniganj, Dhaka-1310, Bangladesh.",
        addressBn: "বাসা নং ৬৮, কদমতলী, আগানগর, দক্ষিণ কেরানীগঞ্জ, ঢাকা-১৩১০, বাংলাদেশ।",
        phone: "+880 1707-009267",
        email: "info@m-aminnetwork.com",
        aff1En: "ISPAB MEMBER",
        aff1Bn: "আইএসপিএবি সদস্য",
        aff2En: "AS150164 BGP NETWORK",
        aff2Bn: "AS150164 বিজিপি নেটওয়ার্ক",
        quickLinksTitleEn: "Quick Links",
        quickLinksTitleBn: "কুইক লিংক",
        contactTitleEn: "Contact Info",
        contactTitleBn: "যোগাযোগ",
        affiliationTitleEn: "Our Affiliations",
        affiliationTitleBn: "আমাদের অধিভুক্তি",
        affiliationDescEn: "We are a proud, active member of the Internet Service Providers Association of Bangladesh (ISPAB).",
        affiliationDescBn: "আমরা ইন্টারনেট সার্ভিস প্রোভাইডার অ্যাসোসিয়েশন অব বাংলাদেশ (ISPAB)-এর একজন গর্বিত ও সক্রিয় সদস্য।",
        privacyTextEn: "Privacy Policy",
        privacyTextBn: "গোপনীয়তা নীতি",
        termsTextEn: "Terms of Service",
        termsTextBn: "ব্যবহারের শর্তাবলী",
        brandTextEn: "Keraniganj ISP",
        brandTextBn: "কেরানীগঞ্জ আইএসপি"
      };
      const defaultSys = { peeringBandwidthLimit: "10 Gbps", maintenanceMode: false };
      const defaultNavLinks = [
        { nameEn: "Home", nameBn: "হোম", href: "/" },
        { nameEn: "Packages", nameBn: "প্যাকেজ", href: "/packages" },
        { nameEn: "Offers", nameBn: "অফার", href: "/offers" },
        { nameEn: "Coverage", nameBn: "কাভারেজ", href: "/coverage" },
        { nameEn: "Multimedia", nameBn: "মাল্টিমিডিয়া", href: "/multimedia" },
        { nameEn: "Complain", nameBn: "অভিযোগ", href: "/complain" },
        { nameEn: "Pay Bill", nameBn: "বিল পরিশোধ", href: "/bill-payment" },
        { nameEn: "Careers", nameBn: "ক্যারিয়ার", href: "/careers" },
        { nameEn: "Contact", nameBn: "যোগাযোগ", href: "/contact" },
        { nameEn: "About", nameBn: "আমাদের সম্পর্কে", href: "/about" },
      ];

      setSetting("m_amin_site_content", defaultSite);
      setSetting("m_amin_home_sections", defaultHome);
      setSetting("m_amin_hero_typography", defaultHero);
      setSetting("m_amin_seo_settings", defaultSeo);
      setSetting("m_amin_about_content", defaultAbout);
      setSetting("m_amin_contact_content", defaultContact);
      setSetting("m_amin_complaint_content_guidelines", defaultComp);
      setSetting("m_amin_footer_content", defaultFoot);
      setSetting("m_amin_system_config", defaultSys);
      setSetting("m_amin_nav_links", defaultNavLinks);
      const defaultFeatures = [
        {
          titleEn: "100% Fiber Optic (FTTH)",
          titleBn: "১০০% ফাইবার অপটিক (FTTH)",
          descEn: "Pure optical fiber direct to your home. No copper line degradation, providing immune connectivity to atmospheric interference and electrical storms.",
          descBn: "সরাসরি আপনার বাসায় বিশুদ্ধ অপটিক্যাল ফাইবার। কোনো তামার তারের অবনতি নেই, যা বায়ুমণ্ডলীয় হস্তক্ষেপ ও বজ্রপাত থেকে নিরাপদ সংযোগ প্রদান করে।",
          iconName: "Zap"
        },
        {
          titleEn: "Dedicated BGP Routing",
          titleBn: "ডেডিকেটেড বিজিপি রাউটিং",
          descEn: "Operating AS150164 enables smart routing policies. We peer directly with BDIX, GGC (Google), SNA (Facebook), and major localized content delivery caches.",
          descBn: "AS150164 পরিচালনা আমাদের স্মার্ট রাউটিং পলিসি সক্ষম করে। আমরা সরাসরি BDIX, GGC (গুগল), SNA (ফেসবুক) এবং প্রধান লোকাল ক্যাশ সার্ভারের সাথে যুক্ত।",
          iconName: "Wifi"
        },
        {
          titleEn: "Low-Ping Gamer Optimizations",
          titleBn: "লো-পিং গেমার অপ্টিমাইজেশান",
          descEn: "Specialized low-latency paths to Southeast Asia and European servers (PUBG, Free Fire, CS2, Valorant). Zero packet loss, steady pings, and jitter control.",
          descBn: "দক্ষিণ-পূর্ব এশিয়া ও ইউরোপীয় সার্ভারে বিশেষায়িত লো-লেটেন্সি পাথ (PUBG, Free Fire, CS2, Valorant)। শূন্য প্যাকেট লস, স্থির পিং এবং জিটার কন্ট্রোল।",
          iconName: "Gamepad2"
        },
        {
          titleEn: "24/7 Priority SLA Support",
          titleBn: "২৪/৭ অগ্রাধিকার SLA সাপোর্ট",
          descEn: "No waiting for hours. Our localized support hub in South Keraniganj ensures our field technicians are dispatched to your home or office in record time.",
          descBn: "ঘণ্টার পর ঘণ্টা অপেক্ষা করতে হবে না। দক্ষিণ কেরানীগঞ্জে আমাদের লোকাল সাপোর্ট হাব নিশ্চিত করে যে আমাদের টেকনিশিয়ানরা রেকর্ড সময়ে আপনার বাসা বা অফিসে পৌঁছে যাবে।",
          iconName: "LifeBuoy"
        },
        {
          titleEn: "BDIX & Local FTP Access",
          titleBn: "BDIX ও লোকাল এফটিপি অ্যাক্সেস",
          descEn: "Get unlimited speeds of up to 100 Mbps to localized Bangladesh Internet Exchange (BDIX) resources, local FTP server movies, live TV, and games caches.",
          descBn: "বাংলাদেশ ইন্টারনেট এক্সচেঞ্জ (BDIX) রিসোর্স, লোকাল এফটিপি মুভি, লাইভ টিভি এবং গেম ক্যাশে ১০০ এমবিপিএস পর্যন্ত আনলিমিটেড স্পিড পান।",
          iconName: "Cloud"
        },
        {
          titleEn: "Corporate Dedicated Backup",
          titleBn: "কর্পোরেট ডেডিকেটেড ব্যাকআপ",
          descEn: "Dual backbones with auto-failover, ensuring continuous SLA-backed business operations. Static IPs, multi-router protocols, and direct client portal support.",
          descBn: "অটো-ফেইলওভার সহ ডুয়াল ব্যাকবোন, যা অব্যাহত SLA-সমর্থিত ব্যবসায়িক কার্যক্রম নিশ্চিত করে। স্ট্যাটিক আইপি এবং ডিরেক্ট ক্লায়েন্ট সাপোর্ট।",
          iconName: "Building2"
        }
      ];
      setSetting("m_amin_network_features", defaultFeatures);
      const defaultBadges = [
        { textEn: "ISPAB MEMBER", textBn: "আইএসপিএবি সদস্য", isCyan: false, image: "/ispab.jpeg" },
        { textEn: "AS150164 BGP NETWORK", textBn: "AS150164 বিজিপি নেটওয়ার্ক", isCyan: true }
      ];
      setSetting("m_amin_footer_badges", defaultBadges);
      const defaultLicenses = [
        { textEn: "ASN: AS150164", textBn: "ASN: AS150164", isMono: true, colorStyle: "cyan" },
        { textEn: "BTRC Licensed", textBn: "বিটিআরসি অনুমোদিত", isMono: false, colorStyle: "emerald", image: "/btrc.png" }
      ];
      setSetting("m_amin_footer_licenses", defaultLicenses);
      setSetting("m_amin_footer_phones", ["+880 1707-009267"]);
      
      const defaultHeroMetrics = [
        { value: "99.9%", titleEn: "Guaranteed Uptime", titleBn: "গ্যারান্টিড আপটাইম", descEn: "Redundant upstream connections", descBn: "অতিরিক্ত আপস্ট্রিম সংযোগ" },
        { value: "2,000+", titleEn: "Active Clients", titleBn: "সক্রিয় গ্রাহক", descEn: "Trusted by homes & businesses", descBn: "বাসা ও ব্যবসার বিশ্বস্ত অংশীদার" },
        { value: "10+", titleEn: "Cities Served", titleBn: "পরিষেবা এলাকা", descEn: "Across South Keraniganj", descBn: "দক্ষিণ কেরানীগঞ্জ জুড়ে" },
        { value: "24/7", titleEn: "Support Response", titleBn: "সহায়তা প্রতিক্রিয়া", descEn: "Expert technical field support", descBn: "দক্ষ টেকনিক্যাল ফিল্ড সাপোর্ট" },
      ];
      setSetting("m_amin_hero_metrics", defaultHeroMetrics);

      setClaims(defaultClaims);
      setComplaints(defaultComplaints);
      setTickets(defaultTickets);
      setPayments(defaultPayments);
      setMessages(defaultMessages);
      setJobs(defaultJobs);
      setJobApplications(defaultJobApplications);
      setTestimonials(defaultTestimonials);
      setFaqs(defaultFAQs);
      setSiteContent(defaultSite);
      setHomeSections(defaultHome);
      setHeroTypography(defaultHero);
      setSeoSettings(defaultSeo);
      setAboutContent(defaultAbout);
      setContactPageContent(defaultContact);
      setComplaintPageContent(defaultComp);
      setFooterContent(defaultFoot);
      setServiceHighlights(defaultServiceHighlights);
      setServiceReviews(defaultServiceReviews);
      setSystemConfig(defaultSys);
      setAdminUsers(defaultAdminUsers);
      setSecurityLogs(defaultSecurityLogs);
      setSeoAuditReports(defaultSEOAuditReports);
      setShortcuts(defaultShortcuts);

      toast("Mock database has been reset successfully!");
    }
  };

  const clearAllData = async () => {
    if (typeof window === "undefined") return;
    if (confirm("WARNING: Are you sure you want to delete all entries in the mock database? This cannot be undone.")) {
      setSetting("m_amin_claims", []);
      setSetting("m_amin_complaints", []);
      setSetting("m_amin_tickets", []);
      setSetting("m_amin_payments", []);
      setSetting("m_amin_contact_submissions", []);
      setSetting("m_amin_jobs", []);
      setSetting("m_amin_job_applications", []);
      setSetting("m_amin_testimonials", []);
      setSetting("m_amin_faqs", []);
      setSetting("m_amin_service_highlights", []);
      setSetting("m_amin_service_reviews", []);
      setSetting("m_amin_admin_users", []);
      setSetting("m_amin_security_logs", []);
      setSetting("m_amin_seo_audits", []);
      setSetting("m_amin_dashboard_shortcuts", []);
      setClaims([]);
      setComplaints([]);
      setTickets([]);
      setPayments([]);
      setMessages([]);
      setJobs([]);
      setJobApplications([]);
      setTestimonials([]);
      setFaqs([]);
      setServiceHighlights([]);
      setServiceReviews([]);
      setAdminUsers([]);
      setSecurityLogs([]);
      setSeoAuditReports([]);
      setShortcuts([]);
      toast("Mock database cleared successfully!");
    }
  };

  const updateClaimStatus = (id: string, newStatus: "Approved" | "Cancelled") => {
    const updated = claims.map((c) => (c.id === id ? { ...c, status: newStatus } : c));
    setClaims(updated);
    setSetting("m_amin_claims", updated);
  };

  const deleteClaim = async (id: string) => {
    const updated = claims.filter((c) => c.id !== id);
    setClaims(updated);
    setSetting("m_amin_claims", updated);
  };

  const updateComplaintStatus = (id: string, newStatus: "Investigating" | "Resolved") => {
    const updated = complaints.map((c) => (c.id === id ? { ...c, status: newStatus } : c));
    setComplaints(updated);
    setSetting("m_amin_complaints", updated);
  };

  const deleteComplaint = async (id: string) => {
    const updated = complaints.filter((c) => c.id !== id);
    setComplaints(updated);
    setSetting("m_amin_complaints", updated);
  };

  const updateTicketStatus = (id: string, newStatus: "Assigned" | "Resolved") => {
    const updated = tickets.map((t) => (t.id === id ? { ...t, status: newStatus } : t));
    setTickets(updated);
    setSetting("m_amin_tickets", updated);
  };

  const deleteTicket = async (id: string) => {
    const updated = tickets.filter((t) => t.id !== id);
    setTickets(updated);
    setSetting("m_amin_tickets", updated);
  };

  const deletePayment = async (id: string) => {
    const updated = payments.filter((p) => p.id !== id);
    setPayments(updated);
    setSetting("m_amin_payments", updated);
  };

  const deleteMessage = async (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    setSetting("m_amin_contact_submissions", updated);
  };

  const toggleJobStatus = (id: string) => {
    const updated: Job[] = jobs.map((j) =>
      j.id === id ? { ...j, status: (j.status === "Open" ? "Closed" : "Open") as "Open" | "Closed" } : j
    );
    setJobs(updated);
    setSetting("m_amin_jobs", updated);
  };

  const deleteJob = async (id: string) => {
    const updated = jobs.filter((j) => j.id !== id);
    setJobs(updated);
    setSetting("m_amin_jobs", updated);
  };

  const updateApplicationStatus = (id: string, status: JobApplication["status"]) => {
    const updated = jobApplications.map((app) => (app.id === id ? { ...app, status } : app));
    setJobApplications(updated);
    setSetting("m_amin_job_applications", updated);
  };

  const deleteApplication = async (id: string) => {
    const updated = jobApplications.filter((app) => app.id !== id);
    setJobApplications(updated);
    setSetting("m_amin_job_applications", updated);
  };

  const toggleTestimonialPublish = (id: string) => {
    const updated = testimonials.map((t) => (t.id === id ? { ...t, isPublished: !t.isPublished } : t));
    setTestimonials(updated);
    setSetting("m_amin_testimonials", updated);
  };

  const deleteTestimonial = async (id: string) => {
    const updated = testimonials.filter((t) => t.id !== id);
    setTestimonials(updated);
    setSetting("m_amin_testimonials", updated);
  };

  const toggleFAQPublish = (id: string) => {
    const updated = faqs.map((f) => (f.id === id ? { ...f, isPublished: !f.isPublished } : f));
    setFaqs(updated);
    setSetting("m_amin_faqs", updated);
  };

  const deleteFAQ = async (id: string) => {
    const updated = faqs.filter((f) => f.id !== id);
    setFaqs(updated);
    setSetting("m_amin_faqs", updated);
  };

  const saveSiteContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetting("m_amin_site_content", siteContent);
    toast("Site Contact settings saved successfully!");
  };

  const saveHomeSections = (key: keyof HomeSections) => {
    const updated = { ...homeSections, [key]: !homeSections[key] };
    setHomeSections(updated);
    setSetting("m_amin_home_sections", updated);
  };

  const saveHeroTypography = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetting("m_amin_hero_typography", heroTypography);
    toast("Hero text settings saved successfully!");
  };

  const saveSEOSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetting("m_amin_seo_settings", seoSettings);
    toast("SEO details saved successfully!");
  };

  const saveAboutContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetting("m_amin_about_content", aboutContent);
    toast("About Us block content saved successfully!");
  };

  const saveContactContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetting("m_amin_contact_content", contactPageContent);
    toast("Contact page settings saved successfully!");
  };

  const saveComplaintContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetting("m_amin_complaint_content_guidelines", complaintPageContent);
    toast("Complaint guidelines saved successfully!");
  };

  const saveFooterContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetting("m_amin_footer_content", footerContent);
    toast("Top Bar & Footer settings saved successfully!");
  };

  const deleteServiceHighlight = async (id: string) => {
    const updated = serviceHighlights.filter((s) => s.id !== id);
    setServiceHighlights(updated);
    setSetting("m_amin_service_highlights", updated);
  };

  const deleteServiceReview = async (id: string) => {
    const updated = serviceReviews.filter((r) => r.id !== id);
    setServiceReviews(updated);
    setSetting("m_amin_service_reviews", updated);
  };

  const saveSystemConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetting("m_amin_system_config", systemConfig);
    toast("System Settings saved successfully!");
  };

  const deleteAdminUser = async (id: string) => {
    const updated = adminUsers.filter((u) => u.id !== id);
    setAdminUsers(updated);
    setSetting("m_amin_admin_users", updated);
  };

  const deleteSecurityLog = async (id: string) => {
    const updated = securityLogs.filter((l) => l.id !== id);
    setSecurityLogs(updated);
    setSetting("m_amin_security_logs", updated);
  };

  const deleteShortcut = async (id: string) => {
    const updated = shortcuts.filter((s) => s.id !== id);
    setShortcuts(updated);
    setSetting("m_amin_dashboard_shortcuts", updated);
  };



  if (!mounted || !isAuthenticated) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white text-slate-650">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-sm tracking-widest text-slate-500">LOADING SECURE ACCESS CONTROL...</span>
        </div>
      </div>
    );
  }

  // Calculate totals
  const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);

  const snapshotCards = [
    {
      label: "Customers",
      value: countCustomers,
      color: {
        bg: "bg-blue-50 dark:bg-blue-500/20",
        text: "text-blue-600 dark:text-blue-400",
      },
      icon: Users,
      route: "/admin/customers",
    },
    {
      label: "Applications",
      value: countApplications,
      color: {
        bg: "bg-indigo-50 dark:bg-indigo-500/20",
        text: "text-indigo-600 dark:text-indigo-400",
      },
      icon: FileText,
      route: "/admin/job-applications",
    },
    {
      label: "Bills",
      value: `৳${totalRevenue}`,
      color: {
        bg: "bg-emerald-50 dark:bg-emerald-500/20",
        text: "text-emerald-600 dark:text-emerald-400",
      },
      icon: Receipt,
      route: "/admin/bills",
    },
    {
      label: "Tickets",
      value: countTickets,
      color: {
        bg: "bg-rose-50 dark:bg-rose-500/20",
        text: "text-rose-600 dark:text-rose-400",
      },
      icon: LifeBuoy,
      route: "/admin/tickets",
    },
    {
      label: "Today's Complaints",
      value: countComplaintsToday,
      color: {
        bg: "bg-amber-100 dark:bg-amber-500/20",
        text: "text-amber-600 dark:text-amber-400",
      },
      icon: MessageSquare,
      route: "/admin/complaints",
    },
    {
      label: "All Complaints",
      value: countAllComplaints,
      color: {
        bg: "bg-red-50 dark:bg-red-500/20",
        text: "text-red-600 dark:text-red-400",
      },
      icon: AlertTriangle,
      route: "/admin/complaints",
    },
    {
      label: "Contact Inbox",
      value: countContactInbox,
      color: {
        bg: "bg-violet-50 dark:bg-violet-500/20",
        text: "text-violet-600 dark:text-violet-400",
      },
      icon: Mail,
      route: "/admin/contact-messages",
    },
    {
      label: "Packages",
      value: countPackages,
      color: {
        bg: "bg-pink-50 dark:bg-pink-500/20",
        text: "text-pink-600 dark:text-pink-400",
      },
      icon: Package,
      route: "/admin/packages",
    },
    {
      label: "Offers",
      value: countOffers,
      color: {
        bg: "bg-teal-50 dark:bg-teal-500/20",
        text: "text-teal-600 dark:text-teal-400",
      },
      icon: Tag,
      route: "/admin/offers",
    },
    {
      label: "Coverage Areas",
      value: countCoverageAreas,
      color: {
        bg: "bg-cyan-50 dark:bg-cyan-500/20",
        text: "text-cyan-600 dark:text-cyan-400",
      },
      icon: MapPin,
      route: "/admin/coverage-areas",
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* 1. OVERVIEW VIEW */}
          {activeTab === "Overview" && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="bg-linear-to-r from-[hsl(var(--sidebar-background))] to-[#81C9FE] text-primary-foreground p-5 sm:p-8 rounded-2xl sm:rounded-xl shadow-xl print:hidden">
                <h1 className="text-3xl sm:text-4xl font-bold flex items-center text-white-force">
                  {greeting}, Mehan Ahmed
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-hand ml-2 h-8 w-8 transform rotate-20 text-yellow-300"
                  >
                    <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"></path>
                    <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"></path>
                    <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"></path>
                    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
                  </svg>
                </h1>
                <p className="text-md sm:text-lg mt-1 text-white-muted-force">Here&apos;s an overview of your broadband network operations and subscriber analytics.</p>
              </div>              {/* Today's Snapshot Section */}
              <div className="space-y-4 pt-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {snapshotCards.map((card, idx) => (
                    <div
                      key={idx}
                      className="border text-card-foreground group relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-white p-2.5 sm:p-4 rounded-2xl border-slate-100 border-solid shadow-sm sm:shadow-md flex flex-col justify-center min-h-[84px]"
                    >
                      <div className={`absolute inset-0 opacity-[0.03] sm:hidden transition-opacity group-active:opacity-[0.06] ${card.color.bg}`} />
                      <div className="flex sm:flex-row flex-col items-center sm:items-center space-y-2.5 sm:space-y-0 sm:space-x-4 text-center sm:text-left relative z-10">
                        <div className={`p-2.5 sm:p-3 rounded-xl sm:rounded-full transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm sm:shadow-none ${card.color.bg}`}>
                          <card.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${card.color.text}`} />
                        </div>
                        <div className="flex-1 min-w-0 w-full text-left">
                          <p className="text-[10px] sm:text-sm font-bold sm:font-medium uppercase sm:capitalize tracking-widest sm:tracking-normal text-slate-400 sm:text-slate-500 truncate px-1">
                            {card.label}
                          </p>
                          <p className="text-[15px] sm:text-2xl font-bold text-slate-800 font-mono mt-0.5 sm:mt-0 px-1 leading-tight">
                            {card.value}
                          </p>
                        </div>
                      </div>
                      <div className="absolute -right-4 -bottom-4 opacity-[0.04] sm:hidden pointer-events-none transform rotate-12 scale-110">
                        <card.icon className={`h-20 w-20 ${card.color.text}`} />
                      </div>
                      <div className={`absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/10 to-transparent sm:hidden`} />
                    </div>
                  ))}
                </div>
              </div>






              {/* Quick actions Section */}
              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-800 tracking-tight">Quick actions</h2>
                  <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer transition-all shadow-sm active:scale-95">
                    <span>+ Add</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {quickActionsList.map((action, idx) => (
                    <div
                      key={idx}
                      draggable
                      onDragStart={(e) => {
                        setDraggedIndex(idx);
                        e.dataTransfer.effectAllowed = "move";
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDragEnter={() => handleDragEnter(idx)}
                      onDragEnd={() => setDraggedIndex(null)}
                      onClick={() => {
                        if (draggedIndex === null) {
                          router.push(action.route);
                        }
                      }}
                      className={`group bg-white border rounded-2xl p-4 flex items-center justify-between shadow-sm transition-all relative ${
                        draggedIndex === idx
                          ? "opacity-30 scale-95 border-dashed border-teal-350 bg-teal-50/10"
                          : "border-slate-100/90 hover:shadow-md cursor-grab active:cursor-grabbing"
                      }`}
                    >
                      <div className="flex items-center">
                        {/* Grab handle */}
                        <div className="text-slate-300 mr-2 group-hover:text-slate-400 transition-colors cursor-grab active:cursor-grabbing">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 6a2 2 0 11-4 0 2 2 0 014 0zm0 6a2 2 0 11-4 0 2 2 0 014 0zm0 6a2 2 0 11-4 0 2 2 0 014 0zm10-12a2 2 0 11-4 0 2 2 0 014 0zm0 6a2 2 0 11-4 0 2 2 0 014 0zm0 6a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        {/* Icon in circle */}
                        <div className={`p-2 ${action.bg} rounded-full mr-3 ${action.text}`}>
                          <action.icon className="h-5 w-5" />
                        </div>
                        {/* Title and path */}
                        <div className="text-left">
                          <span className="font-bold text-slate-800 text-sm block group-hover:text-brand-blue transition-colors">{action.label}</span>
                          <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{action.path}</span>
                        </div>
                      </div>

                      {/* Hover action buttons on right */}
                      <div className="flex flex-col gap-1 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(action.route);
                          }}
                          className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Delete shortcut by removing it from state!
                            if (confirm(`Are you sure you want to remove the ${action.label} shortcut?`)) {
                              setQuickActionsList((prev) => prev.filter((item) => item.label !== action.label));
                            }
                          }}
                          className="p-1 hover:bg-red-55 rounded text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                          title="Remove"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
    </div>
  );
}
