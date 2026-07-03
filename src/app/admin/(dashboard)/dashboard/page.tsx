"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import AdminNavbar from "@/components/AdminNavbar";
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
  "Realtime Demo": "/admin/realtime-demo",
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
  "My Shortcuts": "/admin/my-shortcuts",
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
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

  // Snapshot counts states
  const [countCustomers, setCountCustomers] = useState(3);
  const [countApplications, setCountApplications] = useState(1);
  const [countBills, setCountBills] = useState(2);
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

  // System stats mockup states
  const [activeClients, setActiveClients] = useState(1482);
  const [networkUptime, setNetworkUptime] = useState("99.98%");
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

  useEffect(() => {
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

    const interval = setInterval(() => {
      setTotalBandwidthGbps((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(2));
    }, 4000);
    return () => clearInterval(interval);
  }, [router]);

  // Sync tab active selection dynamically with the pathname
  useEffect(() => {
    const currentTab = Object.entries(tabUrls).find(([name, url]) => url === pathname)?.[0];
    if (currentTab) {
      setActiveTab(currentTab);
    }
  }, [pathname]);

  const loadDatabase = () => {
    if (typeof window === "undefined") return;

    const savedClaims = localStorage.getItem("m_amin_claims");
    if (savedClaims) {
      setClaims(JSON.parse(savedClaims));
    } else {
      localStorage.setItem("m_amin_claims", JSON.stringify(defaultClaims));
      setClaims(defaultClaims);
    }

    const savedComplaints = localStorage.getItem("m_amin_complaints");
    if (savedComplaints) {
      setComplaints(JSON.parse(savedComplaints));
    } else {
      localStorage.setItem("m_amin_complaints", JSON.stringify(defaultComplaints));
      setComplaints(defaultComplaints);
    }

    const savedTickets = localStorage.getItem("m_amin_tickets");
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets));
    } else {
      localStorage.setItem("m_amin_tickets", JSON.stringify(defaultTickets));
      setTickets(defaultTickets);
    }

    const savedPayments = localStorage.getItem("m_amin_payments");
    if (savedPayments) {
      setPayments(JSON.parse(savedPayments));
    } else {
      localStorage.setItem("m_amin_payments", JSON.stringify(defaultPayments));
      setPayments(defaultPayments);
    }

    const savedMessages = localStorage.getItem("m_amin_contact_submissions");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      localStorage.setItem("m_amin_contact_submissions", JSON.stringify(defaultMessages));
      setMessages(defaultMessages);
    }

    const savedJobs = localStorage.getItem("m_amin_jobs");
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    } else {
      localStorage.setItem("m_amin_jobs", JSON.stringify(defaultJobs));
      setJobs(defaultJobs);
    }

    const savedApps = localStorage.getItem("m_amin_job_applications");
    if (savedApps) {
      setJobApplications(JSON.parse(savedApps));
    } else {
      localStorage.setItem("m_amin_job_applications", JSON.stringify(defaultJobApplications));
      setJobApplications(defaultJobApplications);
    }

    const savedTestimonials = localStorage.getItem("m_amin_testimonials");
    if (savedTestimonials) {
      setTestimonials(JSON.parse(savedTestimonials));
    } else {
      localStorage.setItem("m_amin_testimonials", JSON.stringify(defaultTestimonials));
      setTestimonials(defaultTestimonials);
    }

    const savedFAQs = localStorage.getItem("m_amin_faqs");
    if (savedFAQs) {
      setFaqs(JSON.parse(savedFAQs));
    } else {
      localStorage.setItem("m_amin_faqs", JSON.stringify(defaultFAQs));
      setFaqs(defaultFAQs);
    }

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

    const savedHighlights = localStorage.getItem("m_amin_service_highlights");
    if (savedHighlights) {
      setServiceHighlights(JSON.parse(savedHighlights));
    } else {
      localStorage.setItem("m_amin_service_highlights", JSON.stringify(defaultServiceHighlights));
      setServiceHighlights(defaultServiceHighlights);
    }

    const savedReviews = localStorage.getItem("m_amin_service_reviews");
    if (savedReviews) {
      setServiceReviews(JSON.parse(savedReviews));
    } else {
      localStorage.setItem("m_amin_service_reviews", JSON.stringify(defaultServiceReviews));
      setServiceReviews(defaultServiceReviews);
    }

    const savedSys = localStorage.getItem("m_amin_system_config");
    if (savedSys) {
      setSystemConfig(JSON.parse(savedSys));
    }

    const savedUsers = localStorage.getItem("m_amin_admin_users");
    if (savedUsers) {
      setAdminUsers(JSON.parse(savedUsers));
    } else {
      localStorage.setItem("m_amin_admin_users", JSON.stringify(defaultAdminUsers));
      setAdminUsers(defaultAdminUsers);
    }

    const savedLogs = localStorage.getItem("m_amin_security_logs");
    if (savedLogs) {
      setSecurityLogs(JSON.parse(savedLogs));
    } else {
      localStorage.setItem("m_amin_security_logs", JSON.stringify(defaultSecurityLogs));
      setSecurityLogs(defaultSecurityLogs);
    }

    const savedSeoAudits = localStorage.getItem("m_amin_seo_audits");
    if (savedSeoAudits) {
      setSeoAuditReports(JSON.parse(savedSeoAudits));
    } else {
      localStorage.setItem("m_amin_seo_audits", JSON.stringify(defaultSEOAuditReports));
      setSeoAuditReports(defaultSEOAuditReports);
    }

    const savedShortcuts = localStorage.getItem("m_amin_dashboard_shortcuts");
    if (savedShortcuts) {
      setShortcuts(JSON.parse(savedShortcuts));
    } else {
      localStorage.setItem("m_amin_dashboard_shortcuts", JSON.stringify(defaultShortcuts));
      setShortcuts(defaultShortcuts);
    }

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

      const savedPayments = localStorage.getItem("m_amin_payments");
      if (savedPayments) {
        setCountBills(JSON.parse(savedPayments).length);
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
        const filedToday = list.filter((c: any) => c.date && c.date.includes(todayStr));
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
  };

  const resetToDefaults = () => {
    if (typeof window === "undefined") return;
    if (confirm("Are you sure you want to reset mock database to default seeded values?")) {
      localStorage.setItem("m_amin_claims", JSON.stringify(defaultClaims));
      localStorage.setItem("m_amin_complaints", JSON.stringify(defaultComplaints));
      localStorage.setItem("m_amin_tickets", JSON.stringify(defaultTickets));
      localStorage.setItem("m_amin_payments", JSON.stringify(defaultPayments));
      localStorage.setItem("m_amin_contact_submissions", JSON.stringify(defaultMessages));
      localStorage.setItem("m_amin_jobs", JSON.stringify(defaultJobs));
      localStorage.setItem("m_amin_job_applications", JSON.stringify(defaultJobApplications));
      localStorage.setItem("m_amin_testimonials", JSON.stringify(defaultTestimonials));
      localStorage.setItem("m_amin_faqs", JSON.stringify(defaultFAQs));
      localStorage.setItem("m_amin_service_highlights", JSON.stringify(defaultServiceHighlights));
      localStorage.setItem("m_amin_service_reviews", JSON.stringify(defaultServiceReviews));
      localStorage.setItem("m_amin_admin_users", JSON.stringify(defaultAdminUsers));
      localStorage.setItem("m_amin_security_logs", JSON.stringify(defaultSecurityLogs));
      localStorage.setItem("m_amin_seo_audits", JSON.stringify(defaultSEOAuditReports));
      localStorage.setItem("m_amin_dashboard_shortcuts", JSON.stringify(defaultShortcuts));
      
      const defaultSite = { hotline: "+880 1707-009267", supportEmail: "support@maminnetwork.com", address: "Kadomtoli, South Keraniganj, Dhaka, Bangladesh" };
      const defaultHome = { hero: true, packages: true, offers: true, coverage: true, testimonials: true, faq: true };
      const defaultHero = { mainTitle: "Super Fast Broadband Connection in Dhaka", subtitle: "High-speed fiber internet solutions tailored for homes and businesses across Southern Keraniganj." };
      const defaultSeo = { metaTitle: "M Amin Network - Leading ISP in Keraniganj", metaDescription: "Enjoy ultra-fast fiber internet connection, stable gateway SLA, and dedicated customer support.", keywords: "internet provider, ISP Keraniganj, broadband, fiber optic, high-speed wifi" };
      const defaultAbout = { storyTitle: "Our Story & Mission", storyBody: "Founded with a vision to connect every household in Southern Keraniganj with premium fiber internet, M Amin Network provides reliable high-bandwidth gateway SLA and dedicated network engineers to ensure optimal performance 24/7." };
      const defaultContact = { headline: "Get in Touch With Us", officeHours: "Saturday - Thursday: 09:00 AM - 10:00 PM", mapEmbedUrl: "https://maps.google.com" };
      const defaultComp = { guidelineTitle: "Submitting Formal Grievances (BTRC SLA Compliance)", guidelineBody: "Under BTRC guidelines, clients may lodge formal complaints here. All submissions generate trace IDs. Tickets are resolved within standard BTRC SLA frames (24-48 hrs)." };
      const defaultFoot = { facebook: "https://facebook.com/maminnetwork", youtube: "https://youtube.com/maminnetwork", copyrightText: "© 2026 M Amin Network. All Rights Reserved." };
      const defaultSys = { peeringBandwidthLimit: "10 Gbps", maintenanceMode: false };

      localStorage.setItem("m_amin_site_content", JSON.stringify(defaultSite));
      localStorage.setItem("m_amin_home_sections", JSON.stringify(defaultHome));
      localStorage.setItem("m_amin_hero_typography", JSON.stringify(defaultHero));
      localStorage.setItem("m_amin_seo_settings", JSON.stringify(defaultSeo));
      localStorage.setItem("m_amin_about_content", JSON.stringify(defaultAbout));
      localStorage.setItem("m_amin_contact_content", JSON.stringify(defaultContact));
      localStorage.setItem("m_amin_complaint_content_guidelines", JSON.stringify(defaultComp));
      localStorage.setItem("m_amin_footer_content", JSON.stringify(defaultFoot));
      localStorage.setItem("m_amin_system_config", JSON.stringify(defaultSys));

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

      alert("Mock database has been reset successfully!");
    }
  };

  const clearAllData = () => {
    if (typeof window === "undefined") return;
    if (confirm("WARNING: Are you sure you want to delete all entries in the mock database? This cannot be undone.")) {
      localStorage.setItem("m_amin_claims", JSON.stringify([]));
      localStorage.setItem("m_amin_complaints", JSON.stringify([]));
      localStorage.setItem("m_amin_tickets", JSON.stringify([]));
      localStorage.setItem("m_amin_payments", JSON.stringify([]));
      localStorage.setItem("m_amin_contact_submissions", JSON.stringify([]));
      localStorage.setItem("m_amin_jobs", JSON.stringify([]));
      localStorage.setItem("m_amin_job_applications", JSON.stringify([]));
      localStorage.setItem("m_amin_testimonials", JSON.stringify([]));
      localStorage.setItem("m_amin_faqs", JSON.stringify([]));
      localStorage.setItem("m_amin_service_highlights", JSON.stringify([]));
      localStorage.setItem("m_amin_service_reviews", JSON.stringify([]));
      localStorage.setItem("m_amin_admin_users", JSON.stringify([]));
      localStorage.setItem("m_amin_security_logs", JSON.stringify([]));
      localStorage.setItem("m_amin_seo_audits", JSON.stringify([]));
      localStorage.setItem("m_amin_dashboard_shortcuts", JSON.stringify([]));
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
      alert("Mock database cleared successfully!");
    }
  };

  const updateClaimStatus = (id: string, newStatus: "Approved" | "Cancelled") => {
    const updated = claims.map((c) => (c.id === id ? { ...c, status: newStatus } : c));
    setClaims(updated);
    localStorage.setItem("m_amin_claims", JSON.stringify(updated));
  };

  const deleteClaim = (id: string) => {
    const updated = claims.filter((c) => c.id !== id);
    setClaims(updated);
    localStorage.setItem("m_amin_claims", JSON.stringify(updated));
  };

  const updateComplaintStatus = (id: string, newStatus: "Investigating" | "Resolved") => {
    const updated = complaints.map((c) => (c.id === id ? { ...c, status: newStatus } : c));
    setComplaints(updated);
    localStorage.setItem("m_amin_complaints", JSON.stringify(updated));
  };

  const deleteComplaint = (id: string) => {
    const updated = complaints.filter((c) => c.id !== id);
    setComplaints(updated);
    localStorage.setItem("m_amin_complaints", JSON.stringify(updated));
  };

  const updateTicketStatus = (id: string, newStatus: "Assigned" | "Resolved") => {
    const updated = tickets.map((t) => (t.id === id ? { ...t, status: newStatus } : t));
    setTickets(updated);
    localStorage.setItem("m_amin_tickets", JSON.stringify(updated));
  };

  const deleteTicket = (id: string) => {
    const updated = tickets.filter((t) => t.id !== id);
    setTickets(updated);
    localStorage.setItem("m_amin_tickets", JSON.stringify(updated));
  };

  const deletePayment = (id: string) => {
    const updated = payments.filter((p) => p.id !== id);
    setPayments(updated);
    localStorage.setItem("m_amin_payments", JSON.stringify(updated));
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    localStorage.setItem("m_amin_contact_submissions", JSON.stringify(updated));
  };

  const toggleJobStatus = (id: string) => {
    const updated: Job[] = jobs.map((j) =>
      j.id === id ? { ...j, status: (j.status === "Open" ? "Closed" : "Open") as "Open" | "Closed" } : j
    );
    setJobs(updated);
    localStorage.setItem("m_amin_jobs", JSON.stringify(updated));
  };

  const deleteJob = (id: string) => {
    const updated = jobs.filter((j) => j.id !== id);
    setJobs(updated);
    localStorage.setItem("m_amin_jobs", JSON.stringify(updated));
  };

  const updateApplicationStatus = (id: string, status: JobApplication["status"]) => {
    const updated = jobApplications.map((app) => (app.id === id ? { ...app, status } : app));
    setJobApplications(updated);
    localStorage.setItem("m_amin_job_applications", JSON.stringify(updated));
  };

  const deleteApplication = (id: string) => {
    const updated = jobApplications.filter((app) => app.id !== id);
    setJobApplications(updated);
    localStorage.setItem("m_amin_job_applications", JSON.stringify(updated));
  };

  const toggleTestimonialPublish = (id: string) => {
    const updated = testimonials.map((t) => (t.id === id ? { ...t, isPublished: !t.isPublished } : t));
    setTestimonials(updated);
    localStorage.setItem("m_amin_testimonials", JSON.stringify(updated));
  };

  const deleteTestimonial = (id: string) => {
    const updated = testimonials.filter((t) => t.id !== id);
    setTestimonials(updated);
    localStorage.setItem("m_amin_testimonials", JSON.stringify(updated));
  };

  const toggleFAQPublish = (id: string) => {
    const updated = faqs.map((f) => (f.id === id ? { ...f, isPublished: !f.isPublished } : f));
    setFaqs(updated);
    localStorage.setItem("m_amin_faqs", JSON.stringify(updated));
  };

  const deleteFAQ = (id: string) => {
    const updated = faqs.filter((f) => f.id !== id);
    setFaqs(updated);
    localStorage.setItem("m_amin_faqs", JSON.stringify(updated));
  };

  const saveSiteContent = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("m_amin_site_content", JSON.stringify(siteContent));
    alert("Site Contact settings saved successfully!");
  };

  const saveHomeSections = (key: keyof HomeSections) => {
    const updated = { ...homeSections, [key]: !homeSections[key] };
    setHomeSections(updated);
    localStorage.setItem("m_amin_home_sections", JSON.stringify(updated));
  };

  const saveHeroTypography = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("m_amin_hero_typography", JSON.stringify(heroTypography));
    alert("Hero text settings saved successfully!");
  };

  const saveSEOSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("m_amin_seo_settings", JSON.stringify(seoSettings));
    alert("SEO details saved successfully!");
  };

  const saveAboutContent = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("m_amin_about_content", JSON.stringify(aboutContent));
    alert("About Us block content saved successfully!");
  };

  const saveContactContent = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("m_amin_contact_content", JSON.stringify(contactPageContent));
    alert("Contact page settings saved successfully!");
  };

  const saveComplaintContent = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("m_amin_complaint_content_guidelines", JSON.stringify(complaintPageContent));
    alert("Complaint guidelines saved successfully!");
  };

  const saveFooterContent = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("m_amin_footer_content", JSON.stringify(footerContent));
    alert("Top Bar & Footer settings saved successfully!");
  };

  const deleteServiceHighlight = (id: string) => {
    const updated = serviceHighlights.filter((s) => s.id !== id);
    setServiceHighlights(updated);
    localStorage.setItem("m_amin_service_highlights", JSON.stringify(updated));
  };

  const deleteServiceReview = (id: string) => {
    const updated = serviceReviews.filter((r) => r.id !== id);
    setServiceReviews(updated);
    localStorage.setItem("m_amin_service_reviews", JSON.stringify(updated));
  };

  const saveSystemConfig = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("m_amin_system_config", JSON.stringify(systemConfig));
    alert("System Settings saved successfully!");
  };

  const deleteAdminUser = (id: string) => {
    const updated = adminUsers.filter((u) => u.id !== id);
    setAdminUsers(updated);
    localStorage.setItem("m_amin_admin_users", JSON.stringify(updated));
  };

  const deleteSecurityLog = (id: string) => {
    const updated = securityLogs.filter((l) => l.id !== id);
    setSecurityLogs(updated);
    localStorage.setItem("m_amin_security_logs", JSON.stringify(updated));
  };

  const deleteShortcut = (id: string) => {
    const updated = shortcuts.filter((s) => s.id !== id);
    setShortcuts(updated);
    localStorage.setItem("m_amin_dashboard_shortcuts", JSON.stringify(updated));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("m_amin_admin_authenticated");
    router.push("/admin");
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
              <div className="bg-gradient-to-r from-[hsl(var(--sidebar-background))] to-[hsl(var(--primary))] text-primary-foreground p-5 sm:p-8 rounded-2xl sm:rounded-xl shadow-xl print:hidden">
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
                    className="lucide lucide-hand ml-2 h-8 w-8 transform rotate-[20deg] text-yellow-300"
                  >
                    <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"></path>
                    <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"></path>
                    <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"></path>
                    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
                  </svg>
                </h1>
                <p className="text-md sm:text-lg mt-1 text-white-muted-force">Here's an overview of your broadband network operations and subscriber analytics.</p>
              </div>              {/* Today's Snapshot Section */}
              <div className="space-y-4 pt-4">
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Overview</h2>
                  <p className="text-xs text-slate-500 mt-1">Today's snapshot.</p>
                </div>

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
                      <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent sm:hidden`} />
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

          {/* 3. OFFERS VIEW */}
          {activeTab === "Offers" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">Connection Claims & Reservations</h2>
                  <p className="text-xs text-slate-500 mt-1">Manage connection bookings claimed by clients via the offers page.</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue w-full sm:w-44"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                      <th className="pb-3">Client Details</th>
                      <th className="pb-3">Address</th>
                      <th className="pb-3">Promo Code</th>
                      <th className="pb-3">Claim Date</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {claims.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">No connection deal claims found.</td>
                      </tr>
                    ) : (
                      claims
                        .filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone.includes(searchTerm))
                        .map((c) => (
                          <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3.5">
                              <span className="font-extrabold text-slate-855 block">{c.name}</span>
                              <span className="text-[10px] text-slate-500 font-mono">{c.phone}</span>
                            </td>
                            <td className="py-3.5 text-slate-600">{c.address}</td>
                            <td className="py-3.5 font-semibold text-brand-blue">{c.promoCode}</td>
                            <td className="py-3.5 text-slate-500">{c.date}</td>
                            <td className="py-3.5">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                c.status === "Approved" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" :
                                c.status === "Cancelled" ? "bg-slate-500/10 text-slate-500 border border-slate-500/20" :
                                "bg-amber-400/10 text-amber-600 border border-amber-400/20"
                              }`}>{c.status}</span>
                            </td>
                            <td className="py-3.5 text-right space-x-2">
                              {c.status === "Pending" && (
                                <>
                                  <button
                                    onClick={() => updateClaimStatus(c.id, "Approved")}
                                    className="px-2.5 py-1 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-600 rounded-lg font-bold text-[10px] cursor-pointer"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => updateClaimStatus(c.id, "Cancelled")}
                                    className="px-2.5 py-1 bg-slate-500/15 hover:bg-slate-500/25 border border-slate-500/30 text-slate-550 rounded-lg font-bold text-[10px] cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => deleteClaim(c.id)}
                                className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-655 rounded-lg font-bold text-[10px] cursor-pointer"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. COVERAGE AREAS VIEW */}
          {activeTab === "Coverage Areas" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Coverage Sectors & Node Loads</h2>
                <p className="text-xs text-slate-500 mt-1">Interactive status mapping for Southern Keraniganj broadband cells.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "South Keraniganj", load: "84%", latency: "11ms", status: "Optimal" },
                  { name: "Aganagar Central", load: "92%", latency: "14ms", status: "High Load" },
                  { name: "Kadomtoli Splice Point", load: "45%", latency: "8ms", status: "Optimal" },
                ].map((c) => (
                  <div key={c.name} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
                    <h3 className="text-sm font-extrabold text-slate-800">{c.name}</h3>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Node Load:</span>
                        <span className="text-slate-900 font-bold">{c.load}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Backbone Latency:</span>
                        <span className="text-brand-blue font-bold">{c.latency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Status:</span>
                        <span className={`font-bold ${c.status === "Optimal" ? "text-emerald-600" : "text-yellow-600"}`}>{c.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. APPLICATIONS VIEW */}
          {activeTab === "Applications" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Connection Applications</h2>
                <p className="text-xs text-slate-500 mt-1">Review raw connection reservations pending system verification.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                      <th className="pb-3">Application ID</th>
                      <th className="pb-3">Client Details</th>
                      <th className="pb-3">Package Details</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {claims.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 font-bold font-mono text-brand-blue">{c.id}</td>
                        <td className="py-3.5">
                          <span className="font-extrabold text-slate-805 block">{c.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{c.phone} | {c.address}</span>
                        </td>
                        <td className="py-3.5 font-semibold text-slate-600">{c.promoTitle || "General Link Booking"}</td>
                        <td className="py-3.5">
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-55/65 text-slate-700 border border-slate-200">
                            {c.status === "Pending" ? "Verifying Address" : "Completed"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. CUSTOMERS VIEW */}
          {activeTab === "Customers" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Active Subscriber Accounts</h2>
                <p className="text-xs text-slate-500 mt-1">Simulated listing of active optical fiber subscribers (AS150164).</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                      <th className="pb-3">Subscriber ID</th>
                      <th className="pb-3">Client Name</th>
                      <th className="pb-3">Address</th>
                      <th className="pb-3">Signal Power</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { id: "SUB-88293", name: "Mehan Ahmed", address: "Kadomtoli, South Keraniganj", signal: "-19.2 dBm (Optimal)" },
                      { id: "SUB-19402", name: "Sheikh Nabil", address: "Aganagar Central, Dhaka", signal: "-24.1 dBm (Acceptable)" },
                      { id: "SUB-22839", name: "Nasrin Sultana", address: "Bashundhara R/A, South Keraniganj", signal: "-18.5 dBm (Optimal)" },
                    ].map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 font-bold font-mono text-brand-blue">{u.id}</td>
                        <td className="py-3.5 font-extrabold text-slate-800">{u.name}</td>
                        <td className="py-3.5 text-slate-600">{u.address}</td>
                        <td className="py-3.5 font-semibold text-emerald-600">{u.signal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 7. BILLS VIEW */}
          {activeTab === "Bills" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Online Transaction Logs</h2>
                <p className="text-xs text-slate-555 mt-1">Audit customer payments received online through bKash, Nagad, and Cards.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                      <th className="pb-3">Transaction ID</th>
                      <th className="pb-3">Subscriber</th>
                      <th className="pb-3">Gateway Method</th>
                      <th className="pb-3">Amount Paid</th>
                      <th className="pb-3">Timestamp</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {payments.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">No payment transaction records found.</td>
                      </tr>
                    ) : (
                      payments.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 font-bold font-mono text-brand-blue text-sm">{p.id}</td>
                          <td className="py-3.5">
                            <span className="font-extrabold text-slate-855 block">{p.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{p.phone}</span>
                          </td>
                          <td className="py-3.5 font-extrabold text-slate-700 uppercase">{p.gateway}</td>
                          <td className="py-3.5 font-black text-emerald-600 text-sm">৳{p.amount} BDT</td>
                          <td className="py-3.5 text-slate-550">{p.date}</td>
                          <td className="py-3.5 text-right">
                            <button
                              onClick={() => deletePayment(p.id)}
                              className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-650 rounded-lg font-bold text-[10px] cursor-pointer"
                            >
                              Wipe Log
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 8. TICKETS VIEW */}
          {activeTab === "Tickets" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Technical Support Tickets</h2>
                <p className="text-xs text-slate-500 mt-1">Review customer reports, assign field teams, and log resolved support tickets.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                      <th className="pb-3">Client details</th>
                      <th className="pb-3">Topic / Category</th>
                      <th className="pb-3">Description</th>
                      <th className="pb-3">Register Date</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tickets.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">No tickets found.</td>
                      </tr>
                    ) : (
                      tickets.map((t) => (
                        <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5">
                            <span className="font-extrabold text-slate-855 block">{t.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{t.phone}</span>
                          </td>
                          <td className="py-3.5 font-semibold text-brand-blue">{t.category}</td>
                          <td className="py-3.5 max-w-xxs truncate text-slate-600">{t.desc}</td>
                          <td className="py-3.5 text-slate-505">{t.date}</td>
                          <td className="py-3.5">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              t.status === "Resolved" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" :
                              t.status === "Assigned" ? "bg-blue-500/10 text-blue-600 border border-blue-500/20" :
                              "bg-amber-400/10 text-amber-600 border border-amber-400/20"
                            }`}>{t.status}</span>
                          </td>
                          <td className="py-3.5 text-right space-x-2">
                            {t.status === "Open" && (
                              <button
                                onClick={() => updateTicketStatus(t.id, "Assigned")}
                                className="px-2.5 py-1 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-600 rounded-lg font-bold text-[10px] cursor-pointer"
                              >
                                Assign Team
                              </button>
                            )}
                            {t.status !== "Resolved" && (
                              <button
                                onClick={() => updateTicketStatus(t.id, "Resolved")}
                                className="px-2.5 py-1 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-600 rounded-lg font-bold text-[10px] cursor-pointer"
                              >
                                Resolve
                              </button>
                            )}
                            <button
                              onClick={() => deleteTicket(t.id)}
                              className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-655 rounded-lg font-bold text-[10px] cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 9. PACKAGE REQUESTS VIEW */}
          {activeTab === "Package Requests" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Broadband Package Upgrade Requests</h2>
                <p className="text-xs text-slate-500 mt-1">Audit billing adjustments and speed alterations requested by active clients.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                      <th className="pb-3">Account Number</th>
                      <th className="pb-3">Requested Plan</th>
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 font-bold font-mono text-brand-blue">SUB-88293 (Mehan Ahmed)</td>
                      <td className="py-3.5 font-extrabold text-slate-850">Upgrade to Enterprise Splice (100 Mbps)</td>
                      <td className="py-3.5 text-slate-555">Upgrade Speed</td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#eef2f5] text-slate-700 border border-slate-200 animate-pulse">
                          Splicing Scheduled
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 10. CONTACT MESSAGES VIEW */}
          {activeTab === "Contact Messages" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Web Contact Form Inquiries</h2>
                <p className="text-xs text-slate-500 mt-1">Review contact/peering messages submitted by site users.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                      <th className="pb-3">Sender Details</th>
                      <th className="pb-3">Subject</th>
                      <th className="pb-3">Message Body</th>
                      <th className="pb-3">Timestamp</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {messages.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400">No contact messages received.</td>
                      </tr>
                    ) : (
                      messages.map((m) => (
                        <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5">
                            <span className="font-extrabold text-slate-855 block">{m.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{m.email} | {m.phone}</span>
                          </td>
                          <td className="py-3.5 font-semibold text-brand-blue">{m.subject}</td>
                          <td className="py-3.5 max-w-xs truncate text-slate-600">{m.message}</td>
                          <td className="py-3.5 text-slate-500">{m.date}</td>
                          <td className="py-3.5 text-right">
                            <button
                              onClick={() => deleteMessage(m.id)}
                              className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-650 rounded-lg font-bold text-[10px] cursor-pointer"
                            >
                              Delete Message
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 11. COMPLAINTS VIEW */}
          {activeTab === "Complaints" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Official Grievances Queue (BTRC Standards)</h2>
                <p className="text-xs text-slate-500 mt-1">Review formal SLA compliance complaints submitted by subscribers.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                      <th className="pb-3">Complainant</th>
                      <th className="pb-3">Phone</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Description Details</th>
                      <th className="pb-3">Date Filed</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {complaints.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-500">No active complaints found.</td>
                      </tr>
                    ) : (
                      complaints.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5">
                            <span className="font-extrabold text-slate-855 block">{c.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{c.clientId}</span>
                          </td>
                          <td className="py-3.5 font-mono">{c.phone}</td>
                          <td className="py-3.5 font-semibold text-brand-blue">{c.category}</td>
                          <td className="py-3.5 max-w-xxs truncate text-slate-600">{c.desc}</td>
                          <td className="py-3.5 text-slate-500">{c.date}</td>
                          <td className="py-3.5">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              c.status === "Resolved" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" :
                              c.status === "Investigating" ? "bg-blue-500/10 text-blue-600 border border-blue-500/20" :
                              "bg-amber-400/10 text-amber-600 border border-amber-400/20"
                            }`}>{c.status}</span>
                          </td>
                          <td className="py-3.5 text-right space-x-2">
                            {c.status === "Pending" && (
                              <button
                                onClick={() => updateComplaintStatus(c.id, "Investigating")}
                                className="px-2.5 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-600 rounded-lg font-bold text-[10px] cursor-pointer"
                              >
                                Investigate
                              </button>
                            )}
                            {c.status !== "Resolved" && (
                              <button
                                onClick={() => updateComplaintStatus(c.id, "Resolved")}
                                className="px-2.5 py-1 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-600 rounded-lg font-bold text-[10px] cursor-pointer"
                              >
                                Resolve
                              </button>
                            )}
                            <button
                              onClick={() => deleteComplaint(c.id)}
                              className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-650 rounded-lg font-bold text-[10px] cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 12. JOBS VIEW */}
          {activeTab === "Jobs" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">Careers & Active Openings</h2>
                  <p className="text-xs text-slate-500 mt-1">Review, delete, or toggle status for current positions.</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                      <th className="pb-3">Job ID</th>
                      <th className="pb-3">Position Title</th>
                      <th className="pb-3">Department</th>
                      <th className="pb-3">Job Type</th>
                      <th className="pb-3">Publish Date</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {jobs.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">No jobs listed.</td>
                      </tr>
                    ) : (
                      jobs.map((j) => (
                        <tr key={j.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 font-bold font-mono text-brand-blue">{j.id}</td>
                          <td className="py-3.5 font-extrabold text-slate-850">{j.title}</td>
                          <td className="py-3.5 text-slate-655">{j.department}</td>
                          <td className="py-3.5 text-slate-600 font-semibold">{j.type}</td>
                          <td className="py-3.5 text-slate-555">{j.date}</td>
                          <td className="py-3.5">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              j.status === "Open" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" :
                              "bg-slate-500/10 text-slate-550 border border-slate-500/20"
                            }`}>{j.status}</span>
                          </td>
                          <td className="py-3.5 text-right space-x-2">
                            <button
                              onClick={() => toggleJobStatus(j.id)}
                              className="px-2.5 py-1 bg-brand-blue/10 hover:bg-brand-blue/20 border border-brand-blue/20 text-brand-blue rounded-lg font-bold text-[10px] cursor-pointer"
                            >
                              Toggle Status
                            </button>
                            <button
                              onClick={() => deleteJob(j.id)}
                              className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-655 rounded-lg font-bold text-[10px] cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 13. JOB APPLICATIONS VIEW */}
          {activeTab === "Job Applications" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">Submitted Job Applications</h2>
                  <p className="text-xs text-slate-500 mt-1">Review candidates, track review stages, and set application status.</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                      <th className="pb-3">Candidate Details</th>
                      <th className="pb-3">Position Applied</th>
                      <th className="pb-3">Experience</th>
                      <th className="pb-3">Submission Date</th>
                      <th className="pb-3">Review Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {jobApplications.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">No applications received.</td>
                      </tr>
                    ) : (
                      jobApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5">
                            <span className="font-extrabold text-slate-855 block">{app.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{app.email} | {app.phone}</span>
                          </td>
                          <td className="py-3.5 font-semibold text-brand-blue">{app.jobTitle}</td>
                          <td className="py-3.5 text-slate-650">{app.experience}</td>
                          <td className="py-3.5 text-slate-555">{app.date}</td>
                          <td className="py-3.5">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              app.status === "Accepted" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" :
                              app.status === "Rejected" ? "bg-red-500/10 text-red-650 border border-red-500/20" :
                              app.status === "Interview" ? "bg-purple-500/10 text-purple-650 border border-purple-500/20" :
                              "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                            }`}>{app.status}</span>
                          </td>
                          <td className="py-3.5 text-right space-x-2">
                            {app.status !== "Accepted" && (
                              <button
                                onClick={() => updateApplicationStatus(app.id, "Accepted")}
                                className="px-2.5 py-1 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-600 rounded-lg font-bold text-[10px] cursor-pointer"
                              >
                                Accept
                              </button>
                            )}
                            {app.status !== "Rejected" && (
                              <button
                                onClick={() => updateApplicationStatus(app.id, "Rejected")}
                                className="px-2.5 py-1 bg-red-500/15 hover:bg-red-500/25 border border-red-650 rounded-lg font-bold text-[10px] cursor-pointer"
                              >
                                Reject
                              </button>
                            )}
                            <button
                              onClick={() => deleteApplication(app.id)}
                              className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-650 rounded-lg font-bold text-[10px] cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 14. TESTIMONIALS VIEW */}
          {activeTab === "Testimonials" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Manage Customer Testimonials</h2>
                <p className="text-xs text-slate-500 mt-1">Review feedback, toggle display status, or delete client reviews.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                      <th className="pb-3">Author Details</th>
                      <th className="pb-3">Rating</th>
                      <th className="pb-3">Review Feedback Text</th>
                      <th className="pb-3">Home Display</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {testimonials.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5">
                          <span className="font-extrabold text-slate-855 block">{t.author}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{t.role}</span>
                        </td>
                        <td className="py-3.5 font-bold text-amber-500">{"★".repeat(t.rating)}</td>
                        <td className="py-3.5 text-slate-600 max-w-sm truncate">{t.text}</td>
                        <td className="py-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            t.isPublished ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-slate-100 text-slate-500 border border-slate-200"
                          }`}>{t.isPublished ? "Published" : "Hidden"}</span>
                        </td>
                        <td className="py-3.5 text-right space-x-2">
                          <button
                            onClick={() => toggleTestimonialPublish(t.id)}
                            className="px-2.5 py-1 bg-brand-blue/10 hover:bg-brand-blue/20 border border-brand-blue/20 text-brand-blue rounded-lg font-bold text-[10px] cursor-pointer"
                          >
                            Toggle Publish
                          </button>
                          <button
                            onClick={() => deleteTestimonial(t.id)}
                            className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-650 rounded-lg font-bold text-[10px] cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 15. FAQS VIEW */}
          {activeTab === "FAQs" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Manage Frequently Asked Questions</h2>
                <p className="text-xs text-slate-500 mt-1">Review questions, toggle display status, or delete portal FAQs.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                      <th className="pb-3">Question</th>
                      <th className="pb-3">Answer Detail</th>
                      <th className="pb-3">Home Display</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {faqs.map((f) => (
                      <tr key={f.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 font-bold text-slate-805 max-w-xs truncate">{f.question}</td>
                        <td className="py-3.5 text-slate-600 max-w-sm truncate">{f.answer}</td>
                        <td className="py-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            f.isPublished ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-slate-100 text-slate-500 border border-slate-200"
                          }`}>{f.isPublished ? "Published" : "Hidden"}</span>
                        </td>
                        <td className="py-3.5 text-right space-x-2">
                          <button
                            onClick={() => toggleFAQPublish(f.id)}
                            className="px-2.5 py-1 bg-brand-blue/10 hover:bg-brand-blue/20 border border-brand-blue/20 text-brand-blue rounded-lg font-bold text-[10px] cursor-pointer"
                          >
                            Toggle Publish
                          </button>
                          <button
                            onClick={() => deleteFAQ(f.id)}
                            className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-655 rounded-lg font-bold text-[10px] cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 16. SITE CONTENT VIEW */}
          {activeTab === "Site Content" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Site Contact & Global Details</h2>
                <p className="text-xs text-slate-500 mt-1">Edit standard global contact information displayed across footer and portal headers.</p>
              </div>
              <form onSubmit={saveSiteContent} className="space-y-4 max-w-md">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Support Hotline Number</label>
                  <input
                    type="text"
                    value={siteContent.hotline}
                    onChange={(e) => setSiteContent({ ...siteContent, hotline: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Support Email Address</label>
                  <input
                    type="email"
                    value={siteContent.supportEmail}
                    onChange={(e) => setSiteContent({ ...siteContent, supportEmail: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">HQ Office Address</label>
                  <textarea
                    rows={2}
                    value={siteContent.address}
                    onChange={(e) => setSiteContent({ ...siteContent, address: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3.5 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md"
                >
                  Save Global Details
                </button>
              </form>
            </div>
          )}

          {/* 17. HOME SECTIONS VIEW */}
          {activeTab === "Home Sections" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Enable/Disable Homepage Rows</h2>
                <p className="text-xs text-slate-500 mt-1">Switch sections on/off instantly across the consumer landing page.</p>
              </div>
              <div className="space-y-4 max-w-sm">
                {Object.entries(homeSections).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">{key} Section</span>
                    <button
                      onClick={() => saveHomeSections(key as keyof HomeSections)}
                      className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                        val
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                          : "bg-slate-100 text-slate-500 border-slate-200"
                      }`}
                    >
                      {val ? "Enabled" : "Disabled"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 18. HERO TYPOGRAPHY VIEW */}
          {activeTab === "Hero Typography" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Hero Screen Headings</h2>
                <p className="text-xs text-slate-500 mt-1">Modify main advertising messages visible to visitors on landing.</p>
              </div>
              <form onSubmit={saveHeroTypography} className="space-y-4 max-w-lg">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Main Advertising Title</label>
                  <textarea
                    rows={2}
                    value={heroTypography.mainTitle}
                    onChange={(e) => setHeroTypography({ ...heroTypography, mainTitle: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Sub-Headline Text</label>
                  <textarea
                    rows={3}
                    value={heroTypography.subtitle}
                    onChange={(e) => setHeroTypography({ ...heroTypography, subtitle: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3.5 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md"
                >
                  Save Hero Typography
                </button>
              </form>
            </div>
          )}

          {/* 19. SEO & SHARING VIEW */}
          {activeTab === "SEO & Sharing" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-905">Meta Tags & Search Visibility Settings</h2>
                <p className="text-xs text-slate-500 mt-1">Configure keywords, titles, and site description variables to optimize SEO ranking.</p>
              </div>
              <form onSubmit={saveSEOSettings} className="space-y-4 max-w-lg">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Meta Page Title</label>
                  <input
                    type="text"
                    value={seoSettings.metaTitle}
                    onChange={(e) => setSeoSettings({ ...seoSettings, metaTitle: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Meta Description String</label>
                  <textarea
                    rows={3}
                    value={seoSettings.metaDescription}
                    onChange={(e) => setSeoSettings({ ...seoSettings, metaDescription: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Default Keywords (Comma Separated)</label>
                  <input
                    type="text"
                    value={seoSettings.keywords}
                    onChange={(e) => setSeoSettings({ ...seoSettings, keywords: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3.5 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md"
                >
                  Save SEO Details
                </button>
              </form>
            </div>
          )}

          {/* 20. ABOUT PAGE VIEW */}
          {activeTab === "About Page" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">About Us Page Text Blocks</h2>
                <p className="text-xs text-slate-500 mt-1">Customize the company storytelling blocks rendered on the about page.</p>
              </div>
              <form onSubmit={saveAboutContent} className="space-y-4 max-w-lg">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Mission Story Header</label>
                  <input
                    type="text"
                    value={aboutContent.storyTitle}
                    onChange={(e) => setAboutContent({ ...aboutContent, storyTitle: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Core Story Content Body</label>
                  <textarea
                    rows={5}
                    value={aboutContent.storyBody}
                    onChange={(e) => setAboutContent({ ...aboutContent, storyBody: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3.5 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md"
                >
                  Save About Page Block
                </button>
              </form>
            </div>
          )}

          {/* 22. CONTACT PAGE VIEW */}
          {activeTab === "Contact Page" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Contact Us Page Setup</h2>
                <p className="text-xs text-slate-500 mt-1">Customize layout values shown on the main support contact section.</p>
              </div>
              <form onSubmit={saveContactContent} className="space-y-4 max-w-lg">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Header Headline</label>
                  <input
                    type="text"
                    value={contactPageContent.headline}
                    onChange={(e) => setContactPageContent({ ...contactPageContent, headline: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Office Hours Details</label>
                  <input
                    type="text"
                    value={contactPageContent.officeHours}
                    onChange={(e) => setContactPageContent({ ...contactPageContent, officeHours: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Google Maps Embed URL</label>
                  <input
                    type="text"
                    value={contactPageContent.mapEmbedUrl}
                    onChange={(e) => setContactPageContent({ ...contactPageContent, mapEmbedUrl: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3.5 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md"
                >
                  Save Contact Page Settings
                </button>
              </form>
            </div>
          )}

          {/* 23. COMPLAINT PAGE VIEW */}
          {activeTab === "Complaint Page" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Formal Grievance Guidelines</h2>
                <p className="text-xs text-slate-555 mt-1">Configure layout instructions visible to customers filing formal complaints.</p>
              </div>
              <form onSubmit={saveComplaintContent} className="space-y-4 max-w-lg">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Guideline Headline Title</label>
                  <input
                    type="text"
                    value={complaintPageContent.guidelineTitle}
                    onChange={(e) => setComplaintPageContent({ ...complaintPageContent, guidelineTitle: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Guideline Body Text</label>
                  <textarea
                    rows={4}
                    value={complaintPageContent.guidelineBody}
                    onChange={(e) => setComplaintPageContent({ ...complaintPageContent, guidelineBody: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3.5 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md"
                >
                  Save Guidelines
                </button>
              </form>
            </div>
          )}

          {/* 24. TOP BAR & FOOTER VIEW */}
          {activeTab === "Top Bar & Footer" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Header & Footer Global CMS Settings</h2>
                <p className="text-xs text-slate-500 mt-1">Update social accounts and bottom copyright branding variables.</p>
              </div>
              <form onSubmit={saveFooterContent} className="space-y-4 max-w-md">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Facebook Page Link</label>
                  <input
                    type="text"
                    value={footerContent.facebook}
                    onChange={(e) => setFooterContent({ ...footerContent, facebook: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">YouTube Channel Link</label>
                  <input
                    type="text"
                    value={footerContent.youtube}
                    onChange={(e) => setFooterContent({ ...footerContent, youtube: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Copyright Bottom Text</label>
                  <input
                    type="text"
                    value={footerContent.copyrightText}
                    onChange={(e) => setFooterContent({ ...footerContent, copyrightText: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3.5 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md"
                >
                  Save Header & Footer
                </button>
              </form>
            </div>
          )}

          {/* 25. SERVICES HUB VIEW */}
          {activeTab === "Services Hub" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Featured Network Highlights</h2>
                <p className="text-xs text-slate-505 mt-1">Review features highlighting the M Amin Network infrastructure.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                      <th className="pb-3">Highlight ID</th>
                      <th className="pb-3">Featured Headline</th>
                      <th className="pb-3">Core Description</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {serviceHighlights.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 font-bold font-mono text-brand-blue">{s.id}</td>
                        <td className="py-3.5 font-extrabold text-slate-800">{s.title}</td>
                        <td className="py-3.5 text-slate-600 max-w-sm truncate">{s.description}</td>
                        <td className="py-3.5 text-right">
                          <button
                            onClick={() => deleteServiceHighlight(s.id)}
                            className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-650 rounded-lg font-bold text-[10px] cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 26. SERVICE REVIEWS VIEW */}
          {activeTab === "Service Reviews" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Active Peering & Speed Reviews</h2>
                <p className="text-xs text-slate-500 mt-1">Audit customer comments reviewing specific coverage clusters.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                      <th className="pb-3">ID</th>
                      <th className="pb-3">Committer Details</th>
                      <th className="pb-3">Score</th>
                      <th className="pb-3">Comment Text</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {serviceReviews.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 font-bold font-mono text-brand-blue">{r.id}</td>
                        <td className="py-3.5 font-extrabold text-slate-800">{r.author}</td>
                        <td className="py-3.5 font-bold text-amber-500">{"★".repeat(r.rating)}</td>
                        <td className="py-3.5 text-slate-600 max-w-md truncate">{r.comment}</td>
                        <td className="py-3.5 text-right">
                          <button
                            onClick={() => deleteServiceReview(r.id)}
                            className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-655 rounded-lg font-bold text-[10px] cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 27. SETTINGS VIEW */}
          {activeTab === "Settings" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">General Core Settings</h2>
                <p className="text-xs text-slate-500 mt-1">Configure general gateway parameters, simulated traffic ceilings, and maintenance triggers.</p>
              </div>
              <form onSubmit={saveSystemConfig} className="space-y-4 max-w-md">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Virtual Peering SLA Limit</label>
                  <input
                    type="text"
                    value={systemConfig.peeringBandwidthLimit}
                    onChange={(e) => setSystemConfig({ ...systemConfig, peeringBandwidthLimit: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div className="flex items-center gap-3 py-2">
                  <input
                    type="checkbox"
                    id="maint_mode"
                    checked={systemConfig.maintenanceMode}
                    onChange={(e) => setSystemConfig({ ...systemConfig, maintenanceMode: e.target.checked })}
                    className="w-4 h-4 text-brand-blue border-slate-300 rounded focus:ring-brand-blue"
                  />
                  <label htmlFor="maint_mode" className="text-xs font-bold text-slate-800 select-none cursor-pointer">
                    Enable Landing Page Maintenance Banner
                  </label>
                </div>
                <button
                  type="submit"
                  className="px-5 py-3.5 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md"
                >
                  Save Configuration
                </button>
              </form>
            </div>
          )}

          {/* 28. USERS & ROLES VIEW */}
          {activeTab === "Users & Roles" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Administrator Accounts & Team Roles</h2>
                <p className="text-xs text-slate-500 mt-1">Audit administrative personnel and scope roles across the dashboard.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                      <th className="pb-3">User ID</th>
                      <th className="pb-3">Username</th>
                      <th className="pb-3">Scope Role</th>
                      <th className="pb-3">Contact Email</th>
                      <th className="pb-3">Last Active Login</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {adminUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 font-bold font-mono text-brand-blue">{u.id}</td>
                        <td className="py-3.5 font-extrabold text-slate-800">{u.username}</td>
                        <td className="py-3.5 font-semibold text-slate-650">{u.role}</td>
                        <td className="py-3.5 text-slate-500 font-mono">{u.email}</td>
                        <td className="py-3.5 text-slate-500">{u.lastLogin}</td>
                        <td className="py-3.5 text-right">
                          <button
                            onClick={() => deleteAdminUser(u.id)}
                            className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-655 rounded-lg font-bold text-[10px] cursor-pointer"
                          >
                            Revoke User
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 29. SECURITY VIEW */}
          {activeTab === "Security" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Security Incident Logs</h2>
                <p className="text-xs text-slate-505 mt-1">Audit security login traces and suspicious connection attempts.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                      <th className="pb-3">ID</th>
                      <th className="pb-3">Event Action</th>
                      <th className="pb-3">IP Address</th>
                      <th className="pb-3">Timestamp</th>
                      <th className="pb-3">Severity</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {securityLogs.map((l) => (
                      <tr key={l.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 font-bold font-mono text-brand-blue">{l.id}</td>
                        <td className="py-3.5 font-extrabold text-slate-800">{l.event}</td>
                        <td className="py-3.5 font-mono text-slate-650">{l.ipAddress}</td>
                        <td className="py-3.5 text-slate-500">{l.timestamp}</td>
                        <td className="py-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            l.severity === "Critical" ? "bg-red-500/10 text-red-600 border border-red-500/20 animate-pulse" :
                            l.severity === "Warning" ? "bg-amber-400/10 text-amber-600 border border-amber-400/20" :
                            "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                          }`}>{l.severity}</span>
                        </td>
                        <td className="py-3.5 text-right">
                          <button
                            onClick={() => deleteSecurityLog(l.id)}
                            className="px-2.5 py-1 border border-slate-200 hover:bg-red-500/10 hover:text-red-650 rounded-lg font-bold text-[10px] cursor-pointer"
                          >
                            Purge Log
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 30. SEO AUDIT VIEW */}
          {activeTab === "SEO Audit" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">SEO Audit & Page Speed Index</h2>
                <p className="text-xs text-slate-505 mt-1">Audit Lighthouse scores, SSL certification, and mobile friendliness tags for search engines.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                      <th className="pb-3">Audit target page</th>
                      <th className="pb-3">Speed Score</th>
                      <th className="pb-3">SSL Cert</th>
                      <th className="pb-3">Mobile Friendly</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {seoAuditReports.map((r, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 font-extrabold text-slate-800">{r.page}</td>
                        <td className="py-3.5 font-bold text-emerald-600 text-sm">{r.score} / 100</td>
                        <td className="py-3.5 font-semibold text-emerald-600">{r.ssl ? "✓ HTTPS Enabled" : "✗ No SSL"}</td>
                        <td className="py-3.5 font-semibold text-emerald-600">{r.mobileFriendly ? "✓ Optimized" : "✗ Needs Review"}</td>
                        <td className="py-3.5">
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                            Excellent
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 31. MY SHORTCUTS VIEW */}
          {activeTab === "My Shortcuts" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Dashboard Shortcuts Panel</h2>
                <p className="text-xs text-slate-500 mt-1">Customize quick shortcuts to switch between active tabs.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {shortcuts.map((s) => (
                  <div key={s.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm space-y-4">
                    <div>
                      <h4 className="font-extrabold text-slate-800">{s.label}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Launches {s.targetTab} Workspace</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(tabUrls[s.targetTab] || "/admin/dashboard")}
                        className="px-3.5 py-1.5 bg-brand-blue text-white rounded-lg font-bold text-[10px] hover:opacity-95 cursor-pointer shadow-sm"
                      >
                        Launch
                      </button>
                      <button
                        onClick={() => deleteShortcut(s.id)}
                        className="px-3.5 py-1.5 border border-slate-200 hover:bg-red-500/10 hover:text-red-655 rounded-lg font-bold text-[10px] cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 21. REALTIME DEMO VIEW */}
          {activeTab === "Realtime Demo" && (
            <div className="bg-white border border-slate-200 shadow-sm rounded-[24px] p-6 space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Realtime Demo Settings</h2>
                <p className="text-xs text-slate-500 mt-1">Adjust virtual peering traffic and trigger bulk operations database seeds.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-200">
                <div className="space-y-4">
                  <h4 className="text-slate-800 font-bold text-xs uppercase tracking-wider text-brand-blue">Simulated Active Clients</h4>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      value={activeClients}
                      onChange={(e) => setActiveClients(Number(e.target.value))}
                      className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 max-w-[120px] focus:outline-none focus:border-brand-blue"
                    />
                    <span className="text-[11px] text-slate-500 flex items-center">Active subscribers in simulated GPON map</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-slate-800 font-bold text-xs uppercase tracking-wider text-brand-blue">Virtual Peering Flow</h4>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      step="0.01"
                      value={totalBandwidthGbps}
                      onChange={(e) => setTotalBandwidthGbps(Number(e.target.value))}
                      className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 max-w-[120px] focus:outline-none focus:border-brand-blue"
                    />
                    <span className="text-[11px] text-slate-500 flex items-center">Gbps real-time peering bandwidth rate</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-slate-900 font-bold text-sm">Database Actions</h3>
                <p className="text-xs text-slate-500">Manage mock database entries for client applications. Resetting to defaults will populate sample bookings, support tickets, and complaints.</p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={resetToDefaults}
                    className="px-5 py-3 bg-brand-blue text-white hover:opacity-95 font-bold rounded-xl text-xs transition-all cursor-pointer shadow-md"
                  >
                    Reset Mock Database Seeds
                  </button>
                  <button
                    onClick={clearAllData}
                    className="px-5 py-3 border border-red-500/40 bg-red-500/5 hover:bg-red-500/10 text-red-655 font-bold rounded-xl text-xs transition-all cursor-pointer"
                  >
                    Wipe Database (Delete All Logs)
                  </button>
                </div>
              </div>
            </div>
          )}
    </div>
  );
}
