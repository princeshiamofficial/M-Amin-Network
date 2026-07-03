"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import AdminNavbar from "@/components/AdminNavbar";

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

const shortcutsList = [
  {
    name: "Packages",
    href: "/admin/packages",
    icon: (
      <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  {
    name: "Offers",
    href: "/admin/offers",
    icon: (
      <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    name: "Coverage Areas",
    href: "/admin/coverage-areas",
    icon: (
      <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    name: "Application",
    href: "/admin/applications",
    icon: (
      <svg className="w-3.5 h-3.5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )
  },
  {
    name: "Customer",
    href: "/admin/customers",
    icon: (
      <svg className="w-3.5 h-3.5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    name: "Bills",
    href: "/admin/bills",
    icon: (
      <svg className="w-3.5 h-3.5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-6 2h6m-6 2h6m-6 2h6M3 5h18a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2z" />
      </svg>
    )
  },
  {
    name: "Contact Messages",
    href: "/admin/contact-messages",
    icon: (
      <svg className="w-3.5 h-3.5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    name: "Complaints",
    href: "/admin/complaints",
    icon: (
      <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  },
  {
    name: "Jobs Add",
    href: "/admin/jobs",
    icon: (
      <svg className="w-3.5 h-3.5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    name: "Job Applications",
    href: "/admin/job-applications",
    icon: (
      <svg className="w-3.5 h-3.5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    )
  },
  {
    name: "Site Content",
    href: "/admin/site-content",
    icon: (
      <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    name: "Home Sections",
    href: "/admin/home-sections",
    icon: (
      <svg className="w-3.5 h-3.5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )
  },
  {
    name: "Hero Typography",
    href: "/admin/hero-typography",
    icon: (
      <svg className="w-3.5 h-3.5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    )
  },
  {
    name: "About Page",
    href: "/admin/about-page",
    icon: (
      <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    name: "Contact Page",
    href: "/admin/contact-page",
    icon: (
      <svg className="w-3.5 h-3.5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    name: "Top Bar and Footer",
    href: "/admin/topbar-footer",
    icon: (
      <svg className="w-3.5 h-3.5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  },
  {
    name: "Multimedia",
    href: "/multimedia",
    icon: (
      <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a1 1 0 011.414 0L16 16m-2-2l1.586-1.586a1 1 0 011.414 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: (
      <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    name: "Users Control",
    href: "/admin/users-roles",
    icon: (
      <svg className="w-3.5 h-3.5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
];

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
        <div className="sticky top-0 z-30 bg-white shadow-sm flex-shrink-0">
          <AdminNavbar
            activeTab={activeTab}
            onResetDatabase={handleResetDatabase}
            onSignOut={handleLogout}
            isSidebarCollapsed={isSidebarCollapsed}
            onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="bg-[#f1f5f9]/70 border-b border-slate-200/50 px-8 py-3 flex flex-wrap items-center gap-2">
            <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider mr-1.5 select-none">My shortcuts:</span>
            <div className="flex flex-wrap gap-2 items-center">
              {shortcutsList.map((item) => {
                const isActive = pathname === item.href || (item.name === "Packages" && pathname === "/admin/packages");
                return (
                  <button
                    key={item.name}
                    onClick={() => router.push(item.href)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 bg-white border rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-sm ${
                      isActive
                        ? "border-brand-blue bg-blue-50/20 text-brand-blue"
                        : "border-slate-200 hover:border-slate-350 text-slate-700 hover:bg-slate-50/50"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </button>
                );
              })}
              <button
                onClick={() => router.push("/admin/my-shortcuts")}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/70 border border-slate-200/80 rounded-full text-[11px] font-bold text-slate-600 transition-all cursor-pointer"
              >
                <span>+ Manage</span>
              </button>
            </div>
          </div>

          <div className="flex-grow p-8 space-y-6 bg-[#f8fafc]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
