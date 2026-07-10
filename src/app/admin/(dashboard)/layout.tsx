"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import AdminNavbar from "@/components/AdminNavbar";
import { getSetting } from "@/actions/content";
import { IconMap, defaultQuickActions, QuickAction } from "@/app/admin/(dashboard)/dashboard/page";


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
  "Network Features": "/admin/network-features",
  "SEO & Sharing": "/admin/seo-sharing",
  "About Page": "/admin/about-page",
  "Contact Page": "/admin/contact-page",
  "Complaint Page": "/admin/complaint-page",
  "Support Page": "/admin/support-page",
  "Careers Page": "/admin/careers-page",
  "Coverage Areas Page": "/admin/coverage-page",
  "Offers Page": "/admin/offers-page",
  "Bill Payment Page": "/admin/bill-payment-page",
  "Self-Care Portal Page": "/admin/portal-page",

  "Top Bar & Footer": "/admin/topbar-footer",
  "Services Hub": "/admin/services-hub",
  "Service Reviews": "/admin/service-reviews",
  "Settings": "/admin/settings",
  "Users & Roles": "/admin/users-roles",
  "Security": "/admin/security",
  "SEO Audit": "/admin/seo-audit",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [quickActions, setQuickActions] = useState<QuickAction[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      if (typeof window !== "undefined") {
        const auth = sessionStorage.getItem("admin_authenticated");
        if (auth !== "true") {
          router.push("/admin");
        } else {
          setIsAuthenticated(true);
          getSetting("quick_actions").then((res) => {
            if (res) {
              setQuickActions(res as QuickAction[]);
            } else {
              setQuickActions(defaultQuickActions);
            }
          });
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    const fetchQuickActions = () => {
      getSetting("quick_actions").then((res) => {
        if (res) {
          setQuickActions(res as QuickAction[]);
        } else {
          setQuickActions(defaultQuickActions);
        }
      });
    };
    
    // Initial fetch if already authenticated
    if (isAuthenticated) {
      fetchQuickActions();
    }

    window.addEventListener("quick_actions_updated", fetchQuickActions);
    return () => window.removeEventListener("quick_actions_updated", fetchQuickActions);
  }, [isAuthenticated]);

  useEffect(() => {
    const currentTab = Object.entries(tabUrls).find(([, url]) => url === pathname)?.[0];
    if (currentTab) {
      const timer = setTimeout(() => {
        setActiveTab(currentTab);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    localStorage.removeItem("admin_token");
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

  return (
    <div className="min-h-screen -mt-24 bg-white text-slate-800 flex overflow-hidden">
      <div className="relative shrink-0">
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
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
        <div className="sticky top-0 z-30 bg-white shadow-sm shrink-0">
          <AdminNavbar
            activeTab={activeTab}
            onSignOut={handleLogout}
          />
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col admin-main-scroll">
          <div className="bg-[#f1f5f9]/70 border-b border-slate-200/50 px-8 py-3 flex flex-wrap items-center gap-2">
            <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider mr-1.5 select-none">My shortcuts:</span>
            <div className="flex flex-wrap gap-2 items-center">
              {quickActions.map((item) => {
                const isActive = pathname === item.route || (item.label === "Packages" && pathname === "/admin/packages");
                const ActionIcon = IconMap[item.iconName] || IconMap["Link"];
                return (
                  <button
                    key={item.id}
                    onClick={() => router.push(item.route)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 bg-white border rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-sm ${
                      isActive
                        ? "border-brand-blue bg-blue-50/20 text-brand-blue"
                        : "border-slate-200 hover:border-slate-350 text-slate-700 hover:bg-slate-50/50"
                    }`}
                  >
                    <ActionIcon className={`w-3.5 h-3.5 ${item.text.replace('text-', 'text-').replace('-600', '-500')}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grow p-8 space-y-6 bg-[#f8fafc]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

