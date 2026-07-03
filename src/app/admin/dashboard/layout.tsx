"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import AdminNavbar from "@/components/AdminNavbar";

const tabUrls: Record<string, string> = {
  "Overview": "/admin/dashboard",
  "Packages": "/admin/packages",
  "Offers": "/admin/dashboard/offers",
  "Coverage Areas": "/admin/dashboard/coverage-areas",
  "Applications": "/admin/dashboard/applications",
  "Customers": "/admin/dashboard/customers",
  "Bills": "/admin/dashboard/bills",
  "Tickets": "/admin/dashboard/tickets",
  "Package Requests": "/admin/dashboard/package-requests",
  "Contact Messages": "/admin/dashboard/contact-messages",
  "Complaints": "/admin/dashboard/complaints",
  "Realtime Demo": "/admin/dashboard/realtime-demo",
  "Jobs": "/admin/dashboard/jobs",
  "Job Applications": "/admin/dashboard/job-applications",
  "Testimonials": "/admin/dashboard/testimonials",
  "FAQs": "/admin/dashboard/faqs",
  "Site Content": "/admin/dashboard/site-content",
  "Home Sections": "/admin/dashboard/home-sections",
  "Hero Typography": "/admin/dashboard/hero-typography",
  "SEO & Sharing": "/admin/dashboard/seo-sharing",
  "About Page": "/admin/dashboard/about-page",
  "Contact Page": "/admin/dashboard/contact-page",
  "Complaint Page": "/admin/dashboard/complaint-page",
  "Top Bar & Footer": "/admin/dashboard/topbar-footer",
  "Services Hub": "/admin/dashboard/services-hub",
  "Service Reviews": "/admin/dashboard/service-reviews",
  "Settings": "/admin/dashboard/settings",
  "Users & Roles": "/admin/dashboard/users-roles",
  "Security": "/admin/dashboard/security",
  "SEO Audit": "/admin/dashboard/seo-audit",
  "My Shortcuts": "/admin/dashboard/my-shortcuts",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("m_amin_admin_authenticated");
      if (auth !== "true") {
        router.push("/admin");
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);

  useEffect(() => {
    const currentTab = Object.entries(tabUrls).find(([name, url]) => url === pathname)?.[0];
    if (currentTab) {
      setActiveTab(currentTab);
    }
  }, [pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem("m_amin_admin_authenticated");
    router.push("/admin");
  };

  const handleResetDatabase = () => {
    if (typeof window !== "undefined" && confirm("Are you sure you want to reset mock database to default seeded values?")) {
      window.dispatchEvent(new Event("m_amin_reset_db"));
    }
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

  return (
    <div className="min-h-screen -mt-24 bg-white text-slate-800 flex overflow-hidden">
      <div className="relative flex-shrink-0">
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            const url = tabUrls[tab];
            if (url) {
              router.push(url);
            }
          }}
          onSignOut={handleLogout}
          isCollapsed={isSidebarCollapsed}
        />
        
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          className="absolute top-20 right-0 translate-x-1/2 z-50 w-6 h-6 rounded-full bg-[#071120] border border-[#1e293b]/70 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer shadow-lg shadow-black/35 hover:bg-[#0c1e35] transition-all"
        >
          {isSidebarCollapsed ? (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      <main className="flex-1 h-screen flex flex-col bg-slate-50/40 overflow-hidden">
        <AdminNavbar
          activeTab={activeTab}
          onResetDatabase={handleResetDatabase}
          onSignOut={handleLogout}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#f8fafc]">
          {children}
        </div>
      </main>
    </div>
  );
}
