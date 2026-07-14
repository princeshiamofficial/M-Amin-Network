"use client";

import React, { useState, useEffect } from "react";

declare global {
  interface Window {
    customConfirm?: (message: string) => Promise<boolean>;
  }
}
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import AdminNavbar from "@/components/AdminNavbar";
import { getSetting, isAdminAuthenticated } from "@/actions/content";
import { IconMap, defaultQuickActions, QuickAction } from "@/app/admin/(dashboard)/dashboard/page";
import { AdminSecurityProvider, useAdminSecurity } from "@/hooks/useAdminSecurity";
import { toast } from "sonner";

const tabUrls: Record<string, string> = {
  "Overview": "/admin/dashboard",
  "Packages": "/admin/packages",
  "Offers": "/admin/offers",
  "Multimedia": "/admin/multimedia",
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
  "Packages Header": "/admin/page-headers/packages",
  "Offers Header": "/admin/page-headers/offers",
  "Coverage Header": "/admin/page-headers/coverage",
  "Multimedia Header": "/admin/page-headers/multimedia",
  "Careers Header": "/admin/page-headers/careers",
  "SEO & Sharing": "/admin/seo-sharing",
  "About Page": "/admin/about-page",
  "Contact Page": "/admin/contact-page",
  "Support Page": "/admin/support-page",
  "Popup Offer Page": "/admin/popup-offer",

  "Top Bar & Footer": "/admin/topbar-footer",
  "Settings": "/admin/settings",
  "Manage User": "/admin/manage-user",
  "User Role": "/admin/user-role",
  "Security": "/admin/security",
  "SEO Audit": "/admin/seo-audit",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminSecurityProvider>
      <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>
    </AdminSecurityProvider>
  );
}

function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [quickActions, setQuickActions] = useState<QuickAction[]>([]);
  
  const { userRole, rolePermissions, permissionsLoaded, hasAccess } = useAdminSecurity();

  // State for global custom confirmation popup
  const [confirmDialog, setConfirmDialog] = useState<{
    message: string;
    resolve: (val: boolean) => void;
  } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.customConfirm = (msg: string) => {
        return new Promise<boolean>((resolve) => {
          setConfirmDialog({
            message: msg,
            resolve,
          });
        });
      };
    }
    return () => {
      if (typeof window !== "undefined") {
        delete window.customConfirm;
      }
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      if (typeof window !== "undefined") {
        const auth = sessionStorage.getItem("admin_authenticated");
        if (auth !== "true") {
          router.push("/admin");
        } else {
          isAdminAuthenticated().then((isServerAuth) => {
            if (!isServerAuth) {
              sessionStorage.removeItem("admin_authenticated");
              localStorage.removeItem("admin_token");
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

  // Route Permission Guard
  useEffect(() => {
    if (!isAuthenticated || !permissionsLoaded) return;

    if (userRole === "Super Administrator") return;

    if (pathname !== "/admin/dashboard" && pathname.startsWith("/admin")) {
      const isAllowed = hasAccess(pathname);
      if (!isAllowed) {
        router.push("/admin/dashboard");
        toast.error("Access denied: You do not have permission to view this page.");
      }
    }
  }, [pathname, isAuthenticated, permissionsLoaded, userRole, hasAccess, router]);

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
          userRole={userRole}
          rolePermissions={rolePermissions}
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
                    className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-sm ${
                      isActive
                        ? "border-brand-blue bg-blue-50/20 text-brand-blue"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-350 hover:bg-slate-50/50"
                    }`}
                  >
                    <ActionIcon className={`w-3.5 h-3.5 ${isActive ? "text-brand-blue" : item.text}`} />
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

      {/* Custom Confirmation Modal */}
      {confirmDialog && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white border border-slate-100 shadow-2xl rounded-3xl p-6 sm:p-7 max-w-sm w-full space-y-5 text-left">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="space-y-1.5 grow">
                <h4 className="text-slate-900 font-extrabold text-sm uppercase tracking-wider">Confirm Action</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed font-sans">
                  {confirmDialog.message}
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  confirmDialog.resolve(false);
                  setConfirmDialog(null);
                }}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-extrabold text-slate-700 cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  confirmDialog.resolve(true);
                  setConfirmDialog(null);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-extrabold cursor-pointer transition-colors shadow-md shadow-red-500/10"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

