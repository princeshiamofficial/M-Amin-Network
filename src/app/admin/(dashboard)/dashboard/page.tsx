"use client";
import { toast } from "sonner";
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect, useRef } from "react";
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
  UserCog,
  Link,
  Star,
  Activity,
  Plus,
  ChevronDown,
  HelpCircle,
  Layers,
  Globe,
  Lock,
  BarChart3,
  LogOut
} from "lucide-react";

export const IconMap: Record<string, React.ElementType> = {
  Users, FileText, Receipt, LifeBuoy, MessageSquare, AlertTriangle, Mail, Package, Tag, MapPin, Briefcase, Zap, LayoutGrid, Type, Info, Phone, PanelTop, Tv2, Settings, UserCog, Link, Star, Activity, Plus, HelpCircle, Layers, Globe, Lock, BarChart3, LogOut
};

export interface QuickAction {
  id: string;
  label: string;
  path: string;
  route: string;
  iconName: string;
  bg: string;
  text: string;
}

export const adminRoutes = [
  { label: "Dashboard Overview", route: "/admin/dashboard" },
  { label: "Packages", route: "/admin/packages" },
  { label: "Offers", route: "/admin/offers" },
  { label: "Coverage Areas", route: "/admin/coverage-areas" },
  { label: "Applications", route: "/admin/applications" },
  { label: "Customers", route: "/admin/customers" },
  { label: "Bills", route: "/admin/bills" },
  { label: "Tickets", route: "/admin/tickets" },
  { label: "Package Requests", route: "/admin/package-requests" },
  { label: "Contact Messages", route: "/admin/contact-messages" },
  { label: "Complaints", route: "/admin/complaints" },
  { label: "Jobs", route: "/admin/jobs" },
  { label: "Job Applications", route: "/admin/job-applications" },
  { label: "Testimonials", route: "/admin/testimonials" },
  { label: "FAQs", route: "/admin/faqs" },
  { label: "Multimedia", route: "/admin/multimedia" },
  { label: "Hero Typography", route: "/admin/hero-typography" },
  { label: "Page Headers", route: "/admin/page-headers" },
  { label: "SEO & Sharing", route: "/admin/seo-sharing" },
  { label: "About Page", route: "/admin/about-page" },
  { label: "Contact Page", route: "/admin/contact-page" },
  { label: "Support Page", route: "/admin/support-page" },
  { label: "Top Bar & Footer", route: "/admin/topbar-footer" },
  { label: "Manage User", route: "/admin/manage-user" },
  { label: "User Role", route: "/admin/user-role" },
  { label: "Security", route: "/admin/security" },
  { label: "SEO Audit", route: "/admin/seo-audit" }
];



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
  image?: string;
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
  "Hero Typography": "/admin/hero-typography",
  "Multimedia": "/admin/multimedia",
  "Page Headers": "/admin/page-headers",
  "SEO & Sharing": "/admin/seo-sharing",
  "About Page": "/admin/about-page",
  "Contact Page": "/admin/contact-page",
  "Top Bar & Footer": "/admin/topbar-footer",
  "Settings": "/admin/settings",
  "Manage User": "/admin/manage-user",
  "User Role": "/admin/user-role",
  "Security": "/admin/security",
  "SEO Audit": "/admin/seo-audit",
};

export const defaultQuickActions: QuickAction[] = [
  { id: "qa-1", label: "Packages",        path: "/admin/packages",        route: "/admin/packages",        iconName: "Package",      bg: "bg-blue-50",    text: "text-blue-600" },
  { id: "qa-2", label: "Offers",          path: "/admin/offers",          route: "/admin/offers",          iconName: "Tag",          bg: "bg-violet-50",  text: "text-violet-600" },
  { id: "qa-3", label: "Coverage Areas",  path: "/admin/coverage",        route: "/admin/coverage-areas",  iconName: "MapPin",       bg: "bg-emerald-50", text: "text-emerald-600" },
  { id: "qa-4", label: "Application",     path: "/admin/applications",    route: "/admin/applications",    iconName: "FileText",     bg: "bg-amber-50",   text: "text-amber-600" },
  { id: "qa-5", label: "Customer",        path: "/admin/customers",        route: "/admin/customers",        iconName: "Users",        bg: "bg-sky-50",     text: "text-sky-600" },
  { id: "qa-6", label: "Bills",           path: "/admin/bills",           route: "/admin/bills",           iconName: "Receipt",      bg: "bg-teal-50",    text: "text-teal-600" },
  { id: "qa-7", label: "Contact Messages",path: "/admin/contact",         route: "/admin/contact-messages", iconName: "Mail",         bg: "bg-pink-50",    text: "text-pink-600" },
  { id: "qa-8", label: "Complaints",      path: "/admin/complaints",      route: "/admin/complaints",      iconName: "AlertTriangle", bg: "bg-red-50",    text: "text-red-500" },
  { id: "qa-9", label: "Jobs Add",        path: "/admin/jobs",            route: "/admin/jobs",            iconName: "Briefcase",    bg: "bg-orange-50",  text: "text-orange-600" },
  { id: "qa-10", label: "Job Applications",path: "/admin/job-applications",route: "/admin/job-applications",iconName: "FileText",     bg: "bg-indigo-50",  text: "text-indigo-600" },
  { id: "qa-11", label: "Page Headers",    path: "/admin/page-headers",    route: "/admin/page-headers",    iconName: "PanelTop",     bg: "bg-yellow-50",  text: "text-yellow-600" },
  { id: "qa-13", label: "Hero Typography", path: "/admin/hero-typography", route: "/admin/hero-typography", iconName: "Type",         bg: "bg-cyan-50",    text: "text-cyan-600" },
  { id: "qa-14", label: "About Page",      path: "/admin/about",           route: "/admin/about-page",      iconName: "Info",         bg: "bg-lime-50",    text: "text-lime-600" },
  { id: "qa-15", label: "Contact Page",    path: "/admin/contact-page",   route: "/admin/contact-page",    iconName: "Phone",        bg: "bg-rose-50",    text: "text-rose-600" },
  { id: "qa-16", label: "Top Bar & Footer",path: "/admin/layout",          route: "/admin/topbar-footer",   iconName: "PanelTop",     bg: "bg-slate-100",  text: "text-slate-600" },
  { id: "qa-18", label: "Settings",        path: "/admin/settings",        route: "/admin/settings",        iconName: "Settings",     bg: "bg-gray-100",   text: "text-gray-600" },
  { id: "qa-19", label: "Manage User",     path: "/admin/users",           route: "/admin/manage-user",     iconName: "UserCog",      bg: "bg-blue-50",    text: "text-blue-700" },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [greeting, setGreeting] = useState("Welcome");
  const [adminName, setAdminName] = useState("");



  const [quickActionsList, setQuickActionsList] = useState<QuickAction[]>([]);
  
  const quickActionsListRef = useRef<QuickAction[]>(quickActionsList);
  useEffect(() => {
    quickActionsListRef.current = quickActionsList;
  }, [quickActionsList]);

  const ignoreNextClickRef = useRef<boolean>(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [draggingQuickActionId, setDraggingQuickActionId] = useState<string | null>(null);
  const quickActionPointerDragRef = useRef<{
    id: string;
    pointerId: number;
    startX: number;
    startY: number;
    moved: boolean;
  } | null>(null);
  const quickActionsReorderedRef = useRef(false);

  const [isQuickActionModalOpen, setIsQuickActionModalOpen] = useState(false);
  const [isRouteDropdownOpen, setIsRouteDropdownOpen] = useState(false);
  const [editingQuickAction, setEditingQuickAction] = useState<QuickAction | null>(null);
  const [quickActionFormData, setQuickActionFormData] = useState<Omit<QuickAction, "id">>({
    label: "", path: "", route: "", iconName: "Link", bg: "bg-blue-50", text: "text-blue-600"
  });

  const handleSaveQuickAction = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: QuickAction[];
    if (editingQuickAction) {
      updated = quickActionsList.map(a => a.id === editingQuickAction.id ? { ...quickActionFormData, id: a.id } : a);
    } else {
      updated = [...quickActionsList, { ...quickActionFormData, id: `qa-${Date.now()}` }];
    }
    setQuickActionsList(updated);
    setSetting("quick_actions", updated);
    window.dispatchEvent(new Event("quick_actions_updated"));
    setIsQuickActionModalOpen(false);
    toast(editingQuickAction ? "Quick action updated successfully!" : "Quick action added successfully!");
  };

  const reorderQuickAction = (draggedId: string, targetId: string) => {
    if (draggedId === targetId) return;

    const currentList = quickActionsListRef.current;
    const draggedIdx = currentList.findIndex((item) => item.id === draggedId);
    const targetIdx = currentList.findIndex((item) => item.id === targetId);

    if (draggedIdx === -1 || targetIdx === -1) return;

    const newList = [...currentList];
    const [draggedItem] = newList.splice(draggedIdx, 1);
    newList.splice(targetIdx, 0, draggedItem);

    quickActionsListRef.current = newList;
    quickActionsReorderedRef.current = true;
    setQuickActionsList(newList);
  };

  const getQuickActionIdFromPoint = (clientX: number, clientY: number) => {
    const element = document.elementFromPoint(clientX, clientY);
    if (!(element instanceof Element)) return null;

    return element.closest<HTMLElement>("[data-quick-action-id]")?.dataset.quickActionId ?? null;
  };

  const handleQuickActionPointerDown = (e: React.PointerEvent<HTMLDivElement>, id: string) => {
    if (e.button !== 0) return;

    const target = e.target;
    if (target instanceof Element && target.closest("button, a, input, textarea, select")) return;

    quickActionPointerDragRef.current = {
      id,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      moved: false,
    };
    quickActionsReorderedRef.current = false;
    ignoreNextClickRef.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleQuickActionPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const dragState = quickActionPointerDragRef.current;
    if (!dragState || dragState.pointerId !== e.pointerId) return;

    const distance = Math.hypot(e.clientX - dragState.startX, e.clientY - dragState.startY);
    if (!dragState.moved && distance < 6) return;

    if (!dragState.moved) {
      dragState.moved = true;
      ignoreNextClickRef.current = true;
      setDraggingQuickActionId(dragState.id);
    }

    const targetId = getQuickActionIdFromPoint(e.clientX, e.clientY);
    setHoveredId(targetId && targetId !== dragState.id ? targetId : null);

    if (targetId) {
      reorderQuickAction(dragState.id, targetId);
    }
  };

  const finishQuickActionPointerDrag = async (e: React.PointerEvent<HTMLDivElement>) => {
    const dragState = quickActionPointerDragRef.current;
    if (!dragState || dragState.pointerId !== e.pointerId) return;

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    quickActionPointerDragRef.current = null;
    setHoveredId(null);
    setDraggingQuickActionId(null);

    if (dragState.moved && quickActionsReorderedRef.current) {
      await setSetting("quick_actions", quickActionsListRef.current);
      window.dispatchEvent(new Event("quick_actions_updated"));
    }

    quickActionsReorderedRef.current = false;
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
  const [countCustomers, setCountCustomers] = useState(0);
  const [countApplications, setCountApplications] = useState(0);
  const [countTickets, setCountTickets] = useState(0);
  const [countComplaintsToday, setCountComplaintsToday] = useState(0);
  const [countAllComplaints, setCountAllComplaints] = useState(0);
  const [countContactInbox, setCountContactInbox] = useState(0);
  const [countPackages, setCountPackages] = useState(0);
  const [countOffers, setCountOffers] = useState(0);
  const [countCoverageAreas, setCountCoverageAreas] = useState(0);

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
    setSetting("claims", updated);
    setIsClaimModalOpen(false);
    toast("Connection claim reservation added successfully!");
  };


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
      image: "/ea82d2834f062ee8d73d8b99aebe0d31.jpg",
    },
    {
      id: "TEST-002",
      author: "Farhana Yasmin",
      role: "Work From Home Mom",
      text: "Good customer service. Line issues are resolved within hours after reporting to the support team.",
      rating: 4,
      isPublished: true,
      image: "/6c55d74de82b7eee7127c3e2d4939b1f.jpg",
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

  async function loadDatabase() {
    if (typeof window === "undefined") return;
    setIsLoadingData(true);
    await Promise.all([
      getSetting("claims").then(savedClaims => {
      if (savedClaims) {
        setClaims(savedClaims as Claim[]);
      } else {
        setClaims([]);
      }
    }),
      getSetting("complaints").then(savedComplaints => {
      if (savedComplaints) {
        const list = savedComplaints as Complaint[];
        setComplaints(list);
        setCountAllComplaints(list.length);
        const todayStr = new Date().toLocaleDateString();
        const filedToday = list.filter((c: Complaint) => c.date && c.date.includes(todayStr));
        setCountComplaintsToday(filedToday.length);
      } else {
        setComplaints([]);
        setCountAllComplaints(0);
        setCountComplaintsToday(0);
      }
    }),
      getSetting("tickets").then(savedTickets => {
      if (savedTickets) {
        const list = savedTickets as Ticket[];
        setTickets(list);
        setCountTickets(list.length);
      } else {
        setTickets([]);
        setCountTickets(0);
      }
    }),
      getSetting("payments").then(savedPayments => {
      if (savedPayments) {
        setPayments(savedPayments as Payment[]);
      } else {
        setPayments([]);
      }
    }),
      getSetting("contact_submissions").then(savedMessages => {
      if (savedMessages) {
        const list = savedMessages as ContactMessage[];
        setMessages(list);
        setCountContactInbox(list.length);
      } else {
        setMessages([]);
        setCountContactInbox(0);
      }
    }),
      getSetting("jobs").then(savedJobs => {
      if (savedJobs) {
        setJobs(savedJobs as Job[]);
      } else {
        setJobs([]);
      }
    }),
      getSetting("job_applications").then(savedApps => {
      if (savedApps) {
        const list = savedApps as JobApplication[];
        setJobApplications(list);
        setCountApplications(list.length);
      } else {
        setJobApplications([]);
        setCountApplications(0);
      }
    }),
      getSetting("testimonials").then(savedTestimonials => {
      if (savedTestimonials) {
        setTestimonials(savedTestimonials as Testimonial[]);
      } else {
        setTestimonials([]);
      }
    }),
      getSetting("faqs").then(savedFAQs => {
      if (savedFAQs) {
        setFaqs(savedFAQs as FAQ[]);
      } else {
        setFaqs([]);
      }
    }),
      getSetting("site_content").then(saved => {
      if (saved) setSiteContent(saved as Record<string, unknown> as unknown as Parameters<typeof setSiteContent>[0]);
    }),
      getSetting("home_sections").then(saved => {
      if (saved) setHomeSections(saved as Record<string, unknown>[] as unknown as Parameters<typeof setHomeSections>[0]);
    }),
      getSetting("hero_typography").then(saved => {
      if (saved) setHeroTypography(saved as Record<string, unknown> as unknown as Parameters<typeof setHeroTypography>[0]);
    }),
      getSetting("seo_settings").then(saved => {
      if (saved) setSeoSettings(saved as Record<string, unknown> as unknown as Parameters<typeof setSeoSettings>[0]);
    }),
      getSetting("about_content").then(saved => {
      if (saved) setAboutContent(saved as Record<string, unknown> as unknown as Parameters<typeof setAboutContent>[0]);
    }),
      getSetting("contact_content").then(saved => {
      if (saved) setContactPageContent(saved as Record<string, unknown> as unknown as Parameters<typeof setContactPageContent>[0]);
    }),
      getSetting("complaint_content_guidelines").then(saved => {
      if (saved) setComplaintPageContent(saved as Record<string, unknown> as unknown as Parameters<typeof setComplaintPageContent>[0]);
    }),
      getSetting("footer_content").then(saved => {
      if (saved) setFooterContent(saved as Record<string, unknown> as unknown as Parameters<typeof setFooterContent>[0]);
    }),
      getSetting("service_highlights").then(savedHighlights => {
      if (savedHighlights && (savedHighlights as unknown[]).length > 0) {
        setServiceHighlights(savedHighlights as ServiceHighlight[]);
      } else {
        setServiceHighlights([]);
      }
    }),
      getSetting("service_reviews").then(savedReviews => {
      if (savedReviews && (savedReviews as unknown[]).length > 0) {
        setServiceReviews(savedReviews as ServiceReview[]);
      } else {
        setServiceReviews([]);
      }
    }),
      getSetting("system_config").then(saved => {
      if (saved) {
        const config = saved as Record<string, unknown>;
        setSystemConfig({
          peeringBandwidthLimit: (config.peeringBandwidthLimit as string) || "10 Gbps",
          maintenanceMode: !!config.maintenanceMode
        });
      }
    }),
      getSetting("admin_users").then(savedUsers => {
      if (savedUsers) {
        setAdminUsers(savedUsers as AdminUser[]);
      } else {
        setAdminUsers([]);
      }
    }),
      getSetting("security_logs").then(savedLogs => {
      if (savedLogs) {
        setSecurityLogs(savedLogs as SecurityLog[]);
      } else {
        setSecurityLogs([]);
      }
    }),
      getSetting("seo_audits").then(savedSeoAudits => {
      if (savedSeoAudits) {
        setSeoAuditReports(savedSeoAudits as SEOAuditReport[]);
      } else {
        setSeoAuditReports([]);
      }
    }),
      getSetting("dashboard_shortcuts").then(savedShortcuts => {
      if (savedShortcuts) {
        setShortcuts(savedShortcuts as Shortcut[]);
      } else {
        setShortcuts([]);
      }
    }),
      getSetting("quick_actions").then(savedActions => {
      if (savedActions) {
        setQuickActionsList(savedActions as QuickAction[]);
      } else {
        setQuickActionsList([]);
      }
    }),
      getSetting("promo_offers").then(saved => {
      if (saved && Array.isArray(saved)) {
        setCountOffers(saved.length);
      } else {
        setCountOffers(0);
      }
    }),
      getSetting("coverage_zones").then(saved => {
      if (saved && Array.isArray(saved)) {
        setCountCoverageAreas(saved.length);
      } else {
        setCountCoverageAreas(0);
      }
    }),
      getSetting("packages_list").then(saved => {
      if (saved && Array.isArray(saved)) {
        setCountPackages(saved.length);
      } else {
        setCountPackages(0);
      }
    }),
      getSetting("subscribers").then(saved => {
      if (saved && Array.isArray(saved)) {
        setCountCustomers(saved.length);
      } else {
        setCountCustomers(0);
      }
    })
    ]);
    setIsLoadingData(false);
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
        const auth = sessionStorage.getItem("admin_authenticated");
        if (auth !== "true") {
          router.push("/admin");
        } else {
          setIsAuthenticated(true);
          loadDatabase();
          
          const currentUsername = localStorage.getItem("admin_username") || "admin";
          getSetting("admin_users").then((savedUsers) => {
            if (Array.isArray(savedUsers)) {
              const match = savedUsers.find(
                (u) =>
                  u &&
                  typeof u === "object" &&
                  "username" in u &&
                  String(u.username).trim().toLowerCase() === currentUsername.trim().toLowerCase()
              );
              if (match) {
                setAdminName(String(match.username || currentUsername));
              } else {
                setAdminName(currentUsername === "admin" ? "M Amin" : currentUsername);
              }
            } else {
              setAdminName(currentUsername === "admin" ? "M Amin" : currentUsername);
            }
          }).catch(() => {
            setAdminName(currentUsername === "admin" ? "M Amin" : currentUsername);
          });
        }
      }
    }, 0);

    return () => {
      clearTimeout(timer);
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
      setSetting("claims", defaultClaims);
      setSetting("complaints", defaultComplaints);
      setSetting("tickets", defaultTickets);
      setSetting("payments", defaultPayments);
      setSetting("contact_submissions", defaultMessages);
      setSetting("jobs", defaultJobs);
      setSetting("job_applications", defaultJobApplications);
      setSetting("testimonials", defaultTestimonials);
      setSetting("faqs", defaultFAQs);
      setSetting("service_highlights", defaultServiceHighlights);
      setSetting("service_reviews", defaultServiceReviews);
      setSetting("admin_users", defaultAdminUsers);
      setSetting("security_logs", defaultSecurityLogs);
      setSetting("seo_audits", defaultSEOAuditReports);
      setSetting("dashboard_shortcuts", defaultShortcuts);
      setSetting("quick_actions", defaultQuickActions);
      
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

      setSetting("site_content", defaultSite);
      setSetting("home_sections", defaultHome);
      setSetting("hero_typography", defaultHero);
      setSetting("seo_settings", defaultSeo);
      setSetting("about_content", defaultAbout);
      setSetting("contact_content", defaultContact);
      setSetting("complaint_content_guidelines", defaultComp);
      setSetting("footer_content", defaultFoot);
      setSetting("system_config", defaultSys);
      setSetting("nav_links", defaultNavLinks);
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
      setSetting("network_features", defaultFeatures);
      const defaultBadges = [
        { textEn: "ISPAB MEMBER", textBn: "আইএসপিএবি সদস্য", isCyan: false, image: "/ispab.jpeg" },
        { textEn: "AS150164 BGP NETWORK", textBn: "AS150164 বিজিপি নেটওয়ার্ক", isCyan: true }
      ];
      setSetting("footer_badges", defaultBadges);
      const defaultLicenses = [
        { textEn: "ASN: AS150164", textBn: "ASN: AS150164", isMono: true, colorStyle: "cyan" },
        { textEn: "BTRC Licensed", textBn: "বিটিআরসি অনুমোদিত", isMono: false, colorStyle: "emerald", image: "/btrc.png" }
      ];
      setSetting("footer_licenses", defaultLicenses);
      setSetting("footer_phones", ["+880 1707-009267"]);
      
      const defaultHeroMetrics = [
        { value: "99.9%", titleEn: "Guaranteed Uptime", titleBn: "গ্যারান্টিড আপটাইম", descEn: "Redundant upstream connections", descBn: "অতিরিক্ত আপস্ট্রিম সংযোগ" },
        { value: "2,000+", titleEn: "Active Clients", titleBn: "সক্রিয় গ্রাহক", descEn: "Trusted by homes & businesses", descBn: "বাসা ও ব্যবসার বিশ্বস্ত অংশীদার" },
        { value: "10+", titleEn: "Cities Served", titleBn: "পরিষেবা এলাকা", descEn: "Across South Keraniganj", descBn: "দক্ষিণ কেরানীগঞ্জ জুড়ে" },
        { value: "24/7", titleEn: "Support Response", titleBn: "সহায়তা প্রতিক্রিয়া", descEn: "Expert technical field support", descBn: "দক্ষ টেকনিক্যাল ফিল্ড সাপোর্ট" },
      ];
      setSetting("hero_metrics", defaultHeroMetrics);

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
      setQuickActionsList(defaultQuickActions);

      toast("Mock database has been reset successfully!");
    }
  };

  const clearAllData = async () => {
    if (typeof window === "undefined") return;
    if (confirm("WARNING: Are you sure you want to delete all entries in the mock database? This cannot be undone.")) {
      setSetting("claims", []);
      setSetting("complaints", []);
      setSetting("tickets", []);
      setSetting("payments", []);
      setSetting("contact_submissions", []);
      setSetting("jobs", []);
      setSetting("job_applications", []);
      setSetting("testimonials", []);
      setSetting("faqs", []);
      setSetting("service_highlights", []);
      setSetting("service_reviews", []);
      setSetting("admin_users", []);
      setSetting("security_logs", []);
      setSetting("seo_audits", []);
      setSetting("dashboard_shortcuts", []);
      setSetting("quick_actions", []);
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
      setQuickActionsList([]);
      toast("Mock database cleared successfully!");
    }
  };

  const updateClaimStatus = (id: string, newStatus: "Approved" | "Cancelled") => {
    const updated = claims.map((c) => (c.id === id ? { ...c, status: newStatus } : c));
    setClaims(updated);
    setSetting("claims", updated);
  };

  const deleteClaim = async (id: string) => {
    const updated = claims.filter((c) => c.id !== id);
    setClaims(updated);
    setSetting("claims", updated);
  };

  const updateComplaintStatus = (id: string, newStatus: "Investigating" | "Resolved") => {
    const updated = complaints.map((c) => (c.id === id ? { ...c, status: newStatus } : c));
    setComplaints(updated);
    setSetting("complaints", updated);
  };

  const deleteComplaint = async (id: string) => {
    const updated = complaints.filter((c) => c.id !== id);
    setComplaints(updated);
    setSetting("complaints", updated);
  };

  const updateTicketStatus = (id: string, newStatus: "Assigned" | "Resolved") => {
    const updated = tickets.map((t) => (t.id === id ? { ...t, status: newStatus } : t));
    setTickets(updated);
    setSetting("tickets", updated);
  };

  const deleteTicket = async (id: string) => {
    const updated = quickActionsList.filter((a) => a.id !== id);
    setQuickActionsList(updated);
    setSetting("quick_actions", updated);
    window.dispatchEvent(new Event("quick_actions_updated"));
  };

  const deletePayment = async (id: string) => {
    const updated = payments.filter((p) => p.id !== id);
    setPayments(updated);
    setSetting("payments", updated);
  };

  const deleteMessage = async (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    setSetting("contact_submissions", updated);
  };

  const toggleJobStatus = (id: string) => {
    const updated: Job[] = jobs.map((j) =>
      j.id === id ? { ...j, status: (j.status === "Open" ? "Closed" : "Open") as "Open" | "Closed" } : j
    );
    setJobs(updated);
    setSetting("jobs", updated);
  };

  const deleteJob = async (id: string) => {
    const updated = jobs.filter((j) => j.id !== id);
    setJobs(updated);
    setSetting("jobs", updated);
  };

  const updateApplicationStatus = (id: string, status: JobApplication["status"]) => {
    const updated = jobApplications.map((app) => (app.id === id ? { ...app, status } : app));
    setJobApplications(updated);
    setSetting("job_applications", updated);
  };

  const deleteApplication = async (id: string) => {
    const updated = jobApplications.filter((app) => app.id !== id);
    setJobApplications(updated);
    setSetting("job_applications", updated);
  };

  const toggleTestimonialPublish = (id: string) => {
    const updated = testimonials.map((t) => (t.id === id ? { ...t, isPublished: !t.isPublished } : t));
    setTestimonials(updated);
    setSetting("testimonials", updated);
  };

  const deleteTestimonial = async (id: string) => {
    const updated = testimonials.filter((t) => t.id !== id);
    setTestimonials(updated);
    setSetting("testimonials", updated);
  };

  const toggleFAQPublish = (id: string) => {
    const updated = faqs.map((f) => (f.id === id ? { ...f, isPublished: !f.isPublished } : f));
    setFaqs(updated);
    setSetting("faqs", updated);
  };

  const deleteFAQ = async (id: string) => {
    const updated = faqs.filter((f) => f.id !== id);
    setFaqs(updated);
    setSetting("faqs", updated);
  };

  const saveSiteContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetting("site_content", siteContent);
    toast("Site Contact settings saved successfully!");
  };

  const saveHomeSections = (key: keyof HomeSections) => {
    const updated = { ...homeSections, [key]: !homeSections[key] };
    setHomeSections(updated);
    setSetting("home_sections", updated);
  };

  const saveHeroTypography = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetting("hero_typography", heroTypography);
    toast("Hero text settings saved successfully!");
  };

  const saveSEOSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetting("seo_settings", seoSettings);
    toast("SEO details saved successfully!");
  };

  const saveAboutContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetting("about_content", aboutContent);
    toast("About Us block content saved successfully!");
  };

  const saveContactContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetting("contact_content", contactPageContent);
    toast("Contact page settings saved successfully!");
  };

  const saveComplaintContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetting("complaint_content_guidelines", complaintPageContent);
    toast("Complaint guidelines saved successfully!");
  };

  const saveFooterContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetting("footer_content", footerContent);
    toast("Top Bar & Footer settings saved successfully!");
  };

  const deleteServiceHighlight = async (id: string) => {
    const updated = serviceHighlights.filter((s) => s.id !== id);
    setServiceHighlights(updated);
    setSetting("service_highlights", updated);
  };

  const deleteServiceReview = async (id: string) => {
    const updated = serviceReviews.filter((r) => r.id !== id);
    setServiceReviews(updated);
    setSetting("service_reviews", updated);
  };

  const saveSystemConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetting("system_config", systemConfig);
    toast("System Settings saved successfully!");
  };

  const deleteAdminUser = async (id: string) => {
    const updated = adminUsers.filter((u) => u.id !== id);
    setAdminUsers(updated);
    setSetting("admin_users", updated);
  };

  const deleteSecurityLog = async (id: string) => {
    const updated = securityLogs.filter((l) => l.id !== id);
    setSecurityLogs(updated);
    setSetting("security_logs", updated);
  };

  const deleteShortcut = async (id: string) => {
    const updated = shortcuts.filter((s) => s.id !== id);
    setShortcuts(updated);
    setSetting("dashboard_shortcuts", updated);
  };



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
                  {greeting},{" "}
                  {isLoadingData || !adminName ? (
                    <span className="inline-block h-9 w-64 rounded-lg bg-white/25 animate-pulse align-middle" />
                  ) : (
                    <>
                      {adminName}
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
                    </>
                  )}
                </h1>
                <p className="text-md sm:text-lg mt-1 text-white-muted-force">Here&apos;s an overview of your broadband network operations and subscriber analytics.</p>
              </div>              {/* Today's Snapshot Section */}
              <div className="space-y-4 pt-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {isLoadingData ? Array.from({ length: 10 }).map((_, idx) => (
                    <div
                      key={`snapshot-skeleton-${idx}`}
                      className="border text-card-foreground bg-white p-2.5 sm:p-4 rounded-2xl border-slate-100 border-solid shadow-sm sm:shadow-md flex flex-col justify-center min-h-[84px]"
                    >
                      <div className="flex sm:flex-row flex-col items-center sm:items-center space-y-2.5 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-full bg-slate-200 animate-pulse" />
                        <div className="flex-1 min-w-0 w-full space-y-2">
                          <div className="h-3 w-28 rounded bg-slate-200 animate-pulse" />
                          <div className="h-6 w-16 rounded bg-slate-200 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  )) : snapshotCards.map((card, idx) => (
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
                  <button 
                    onClick={() => {
                      setEditingQuickAction(null);
                      setQuickActionFormData({ label: "", path: "", route: "", iconName: "Link", bg: "bg-blue-50", text: "text-blue-600" });
                      setIsQuickActionModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer transition-all shadow-sm active:scale-95"
                  >
                    <span>+ Add</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {isLoadingData ? Array.from({ length: 8 }).map((_, idx) => (
                    <div
                      key={`quick-action-skeleton-${idx}`}
                      className="bg-white border border-slate-100/90 rounded-2xl p-4 flex items-center shadow-sm"
                    >
                      <div className="h-4 w-4 rounded bg-slate-200 animate-pulse mr-2" />
                      <div className="h-9 w-9 rounded-full bg-slate-200 animate-pulse mr-3" />
                      <div className="space-y-2">
                        <div className="h-3.5 w-28 rounded bg-slate-200 animate-pulse" />
                        <div className="h-2.5 w-20 rounded bg-slate-200 animate-pulse" />
                      </div>
                    </div>
                  )) : quickActionsList.map((action) => {
                    const ActionIcon = IconMap[action.iconName] || IconMap["Link"];
                    return (
                    <div
                      key={action.id}
                      data-quick-action-id={action.id}
                      onPointerDown={(e) => handleQuickActionPointerDown(e, action.id)}
                      onPointerMove={handleQuickActionPointerMove}
                      onPointerUp={finishQuickActionPointerDrag}
                      onPointerCancel={finishQuickActionPointerDrag}
                      onClick={() => {
                        if (ignoreNextClickRef.current) {
                          ignoreNextClickRef.current = false;
                          return;
                        }
                        router.push(action.route);
                      }}
                      className={`group bg-white border rounded-2xl p-4 flex items-center justify-between shadow-sm relative transition-all duration-200 select-none touch-none ${
                        draggingQuickActionId === action.id
                          ? "opacity-40 border-dashed border-slate-300 bg-slate-50 scale-95 cursor-grabbing z-40"
                          : hoveredId === action.id
                          ? "border-primary/50 bg-primary/5 ring-2 ring-primary/10 shadow-md scale-[1.02] z-30"
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
                          <ActionIcon className="h-5 w-5" />
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
                            setEditingQuickAction(action);
                            setQuickActionFormData({ label: action.label, path: action.path, route: action.route, iconName: action.iconName, bg: action.bg, text: action.text });
                            setIsQuickActionModalOpen(true);
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
                            if (confirm(`Are you sure you want to remove the ${action.label} shortcut?`)) {
                              const updated = quickActionsList.filter((item) => item.id !== action.id);
                              setQuickActionsList(updated);
                              setSetting("quick_actions", updated);
                              window.dispatchEvent(new Event("quick_actions_updated"));
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
                  )})}
                </div>
              </div>
            </div>
          )}

      {/* Quick Action Modal */}
      {isQuickActionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-lg text-slate-800">{editingQuickAction ? "Edit Quick Action" : "Add Quick Action"}</h3>
              <button onClick={() => setIsQuickActionModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSaveQuickAction} className="p-6 space-y-4">

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Label</label>
                <input type="text" required value={quickActionFormData.label} onChange={(e) => setQuickActionFormData({ ...quickActionFormData, label: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" placeholder="e.g. Packages" />
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Route URL</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsRouteDropdownOpen(!isRouteDropdownOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-left shadow-sm"
                  >
                    <span className={quickActionFormData.route ? "text-slate-900" : "text-slate-400"}>
                      {quickActionFormData.route || "Select a route"}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isRouteDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isRouteDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl max-h-48 overflow-y-auto animate-in fade-in zoom-in-95 duration-100 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      {adminRoutes
                        .filter((r) => !quickActionsList.some((action) => action.route === r.route && action.id !== editingQuickAction?.id))
                        .map((r) => (
                        <button
                          key={r.route}
                          type="button"
                          onClick={() => {
                            setQuickActionFormData({ ...quickActionFormData, route: r.route, path: r.route });
                            setIsRouteDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 text-sm transition-colors border-b last:border-b-0 border-slate-50 ${quickActionFormData.route === r.route ? 'bg-brand-blue/5 text-brand-blue font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                          {r.route}
                        </button>
                      ))}
                      {adminRoutes.filter((r) => !quickActionsList.some((action) => action.route === r.route && action.id !== editingQuickAction?.id)).length === 0 && (
                        <div className="p-4 text-center text-sm text-slate-500">All available routes are added!</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Icon</label>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-3 border border-slate-200 rounded-xl bg-slate-50/50 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {Object.keys(IconMap).map((icon) => {
                    const ActionIcon = IconMap[icon];
                    const isSelected = quickActionFormData.iconName === icon;
                    return (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setQuickActionFormData({ ...quickActionFormData, iconName: icon })}
                        className={`p-2 rounded-lg transition-all cursor-pointer ${isSelected ? 'bg-brand-blue text-white shadow-md scale-105' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100 hover:text-slate-700'}`}
                        title={icon}
                      >
                        <ActionIcon className="h-5 w-5" />
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Color Theme</label>
                <div className="flex flex-wrap gap-2.5 p-3 border border-slate-200 rounded-xl bg-slate-50/50">
                  {Object.entries({
                    "bg-blue-50": "text-blue-600",
                    "bg-violet-50": "text-violet-600",
                    "bg-emerald-50": "text-emerald-600",
                    "bg-amber-50": "text-amber-600",
                    "bg-sky-50": "text-sky-600",
                    "bg-teal-50": "text-teal-600",
                    "bg-pink-50": "text-pink-600",
                    "bg-red-50": "text-red-500",
                    "bg-orange-50": "text-orange-600",
                    "bg-indigo-50": "text-indigo-600",
                    "bg-yellow-50": "text-yellow-600",
                    "bg-fuchsia-50": "text-fuchsia-600",
                    "bg-cyan-50": "text-cyan-600",
                    "bg-lime-50": "text-lime-600",
                    "bg-rose-50": "text-rose-600",
                    "bg-slate-100": "text-slate-600",
                    "bg-purple-50": "text-purple-600",
                    "bg-gray-100": "text-gray-600",
                  }).map(([bg, text]) => {
                    const isSelected = quickActionFormData.bg === bg;
                    return (
                      <button
                        key={bg}
                        type="button"
                        onClick={() => setQuickActionFormData({ ...quickActionFormData, bg, text })}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${bg} ${text} border border-slate-200/50 ${isSelected ? 'ring-2 ring-brand-blue ring-offset-2 scale-110 shadow-sm' : 'hover:scale-110'}`}
                        title={bg.replace('bg-', '').replace('-50', '').replace('-100', '')}
                      >
                        {isSelected && <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsQuickActionModalOpen(false)} className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 font-medium text-white bg-brand-blue hover:bg-brand-blue/90 rounded-xl shadow-md transition-colors cursor-pointer">{editingQuickAction ? "Save Changes" : "Add Action"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

