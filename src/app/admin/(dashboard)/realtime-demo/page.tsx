"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RealtimeDemoPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [activeClients, setActiveClients] = useState(1482);
  const [totalBandwidthGbps, setTotalBandwidthGbps] = useState(4.2);

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    const savedClients = localStorage.getItem("m_amin_active_clients");
    if (savedClients) setActiveClients(Number(savedClients));
    const savedBandwidth = localStorage.getItem("m_amin_bandwidth");
    if (savedBandwidth) setTotalBandwidthGbps(Number(savedBandwidth));
  }, [router]);

  const saveDemoStats = () => {
    localStorage.setItem("m_amin_active_clients", String(activeClients));
    localStorage.setItem("m_amin_bandwidth", String(totalBandwidthGbps));
    alert("Real-time demo settings updated!");
  };

  const resetToDefaults = () => {
    if (!confirm("Are you sure you want to reset mock database to default seeded values?")) return;
    
    // Seed default values
    const defaultClaims = [
      { id: "CLM-72648-2849", name: "Mehan Ahmed", phone: "01707009267", address: "House 12, Road 4, Kadomtoli, South Keraniganj", promoCode: "ANNUAL10", promoTitle: "Pay 10 Months, Get 12", date: "7/2/2026, 11:34 AM", status: "Pending" },
      { id: "CLM-19472-8829", name: "Nasrin Sultana", phone: "01819284920", address: "Block C, Bashundhara R/A, South Keraniganj", promoCode: "FREEINSTALL2026", promoTitle: "Zero Installation Fee", date: "7/2/2026, 2:15 PM", status: "Approved" },
    ];
    const defaultComplaints = [
      { id: "CMP-88239-1102", clientId: "SUB-88293", name: "Mehan Ahmed", phone: "01707009267", category: "Billing Dispute", desc: "Charged double for the standard premium plan subscription this month without notice.", date: "7/2/2026, 1:44 PM", status: "Pending" },
      { id: "CMP-38492-9903", clientId: "SUB-19402", name: "Sheikh Nabil", phone: "01928492049", category: "Frequent Disconnections", desc: "Fiber optic connection drops out every 10 minutes in Kadomtoli area.", date: "7/2/2026, 4:50 PM", status: "Investigating" },
    ];
    const defaultTickets = [
      { id: "TCK-19482-9902", clientId: "SUB-88293", name: "Mehan Ahmed", phone: "01707009267", category: "Hardware", desc: "ONU device power indicator is red, no optical signal received.", date: "7/2/2026, 3:12 PM", status: "Open" },
      { id: "TCK-88392-1209", clientId: "SUB-19402", name: "Sheikh Nabil", phone: "01928492049", category: "Speed Issue", desc: "Getting only 10 Mbps on 30 Mbps Gamer Pack subscription.", date: "7/2/2026, 5:20 PM", status: "Assigned" },
    ];
    const defaultPayments = [
      { id: "TXN-88291", clientId: "SUB-88293", name: "Mehan Ahmed", phone: "01707009267", planName: "Home Premium", speed: "50 Mbps", amount: 1200, gateway: "bKash", date: "7/1/2026, 10:15 AM" },
      { id: "TXN-19401", clientId: "SUB-19402", name: "Sheikh Nabil", phone: "01928492049", planName: "Gamer Pack", speed: "30 Mbps", amount: 900, gateway: "Nagad", date: "7/1/2026, 2:30 PM" },
    ];
    const defaultMessages = [
      { id: "MSG-10291", name: "Karim Hossain", email: "karim@example.com", phone: "01812345678", subject: "Peering Request", message: "Interested in peering with your AS150164 network for our SOHO setup.", date: "7/3/2026, 9:00 AM" },
    ];
    const defaultJobs = [
      { id: "JOB-1001", title: "Fiber Splicing Technician", department: "Field Operations", type: "Full-time", status: "Open", date: "7/1/2026" },
      { id: "JOB-1002", title: "NOC Engineer", department: "Network Operations", type: "Full-time", status: "Open", date: "7/2/2026" },
      { id: "JOB-1003", title: "Sales Representative", department: "Business Development", type: "Part-time", status: "Closed", date: "6/28/2026" },
    ];
    const defaultJobApplications = [
      { id: "APP-1001", name: "Rafiqul Islam", email: "rafiq@example.com", phone: "01712345678", jobTitle: "Fiber Splicing Technician", experience: "3 Years", date: "7/3/2026", status: "Screening" },
      { id: "APP-1002", name: "Sadia Akter", email: "sadia@example.com", phone: "01812345679", jobTitle: "NOC Engineer", experience: "2 Years", date: "7/4/2026", status: "Interview" },
    ];
    const defaultTestimonials = [
      { id: "1", author: "Arup Rudra", role: "SOHO Subscriber", text: "Amazing latency for online gaming. Splicing team was extremely professional.", rating: 5, isPublished: true },
      { id: "2", author: "Nabil Ahmed", role: "Home Starter User", text: "Good speed for streaming. Customer support resolved a fiber break issue quickly.", rating: 4, isPublished: true },
    ];
    const defaultFAQs = [
      { id: "1", question: "How long does installation take?", answer: "Usually within 24 to 48 hours after billing confirmation.", isPublished: true },
      { id: "2", question: "Do you provide public static IP?", answer: "Yes, static IP is available upon request for business plans.", isPublished: true },
    ];
    const defaultServiceHighlights = [
      { id: "SRV-1", title: "Dedicated GGC/SNA Peering Cache", description: "Direct connectivity to YouTube and Facebook caches for buffer-free delivery." },
      { id: "SRV-2", title: "Optical Fiber SLA Gateway", description: "Redundant link pathways keeping fiber uptime metrics above BTRC rules." },
    ];
    const defaultServiceReviews = [
      { id: "REV-1", author: "Kamrul Islam", rating: 5, comment: "Zero latency during midnight working slots, highly recommended!" },
    ];
    const defaultAdminUsers = [
      { id: "USR-1", username: "admin", role: "Super Administrator", email: "admin@maminnetwork.test", lastLogin: "7/3/2026, 10:30 AM" },
      { id: "USR-2", username: "moderator_support", role: "Support Staff", email: "support@maminnetwork.test", lastLogin: "7/2/2026, 04:15 PM" },
    ];
    const defaultSecurityLogs = [
      { id: "LOG-1", event: "Super Admin Session Authenticated", ipAddress: "192.168.1.50", timestamp: "7/3/2026, 10:30 AM", severity: "Info" },
      { id: "LOG-2", event: "Failed Authentication Attempt", ipAddress: "203.0.113.88", timestamp: "7/2/2026, 11:20 PM", severity: "Warning" },
    ];
    const defaultSEOAuditReports = [
      { page: "Homepage (/) ", score: 98, ssl: true, mobileFriendly: true },
      { page: "Packages (/packages)", score: 95, ssl: true, mobileFriendly: true },
      { page: "Offers (/offers)", score: 92, ssl: true, mobileFriendly: true },
    ];
    const defaultShortcuts = [
      { id: "SC-1", label: "Grievances Queue", targetTab: "Complaints" },
      { id: "SC-2", label: "Transactions Log", targetTab: "Bills" },
      { id: "SC-3", label: "Openings (Jobs)", targetTab: "Jobs" },
    ];

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

    // Also reset demo stats
    setActiveClients(1482);
    setTotalBandwidthGbps(4.2);
    localStorage.setItem("m_amin_active_clients", "1482");
    localStorage.setItem("m_amin_bandwidth", "4.2");

    alert("Mock database has been reset successfully!");
  };

  const clearAllData = () => {
    if (!confirm("WARNING: Are you sure you want to delete all entries in the mock database? This cannot be undone.")) return;
    
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

    alert("Mock database cleared successfully!");
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Realtime Demo Settings</h2>
        <p className="text-xs text-slate-500 mt-1">Adjust virtual peering traffic and trigger bulk operations database seeds.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-200">
        <div className="space-y-4">
          <h4 className="font-bold text-xs uppercase tracking-wider text-brand-blue">Simulated Active Clients</h4>
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
          <h4 className="font-bold text-xs uppercase tracking-wider text-brand-blue">Virtual Peering Flow</h4>
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

      <div className="flex gap-4 pt-2">
        <button
          onClick={saveDemoStats}
          className="px-5 py-3 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md"
        >
          Save Demo Stats
        </button>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-100">
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
            className="px-5 py-3 border border-red-500/40 bg-red-500/5 hover:bg-red-500/10 text-red-600 font-bold rounded-xl text-xs transition-all cursor-pointer"
          >
            Wipe Database (Delete All Logs)
          </button>
        </div>
      </div>
    </div>
  );
}
