"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Shortcut {
  id: string;
  label: string;
  targetTab: string;
}

const defaultShortcuts: Shortcut[] = [
  { id: "SC-1", label: "Grievances Queue", targetTab: "Complaints" },
  { id: "SC-2", label: "Transactions Log", targetTab: "Bills" },
  { id: "SC-3", label: "Openings (Jobs)", targetTab: "Jobs" },
];

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

export default function MyShortcutsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    const saved = localStorage.getItem("m_amin_dashboard_shortcuts");
    if (saved) {
      setShortcuts(JSON.parse(saved));
    } else {
      localStorage.setItem("m_amin_dashboard_shortcuts", JSON.stringify(defaultShortcuts));
      setShortcuts(defaultShortcuts);
    }
  }, [router]);

  const deleteShortcut = (id: string) => {
    if (!confirm("Are you sure you want to remove this shortcut?")) return;
    const updated = shortcuts.filter((s) => s.id !== id);
    setShortcuts(updated);
    localStorage.setItem("m_amin_dashboard_shortcuts", JSON.stringify(updated));
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
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
                className="px-3.5 py-1.5 border border-slate-200 hover:bg-red-500/10 hover:text-red-600 rounded-lg font-bold text-[10px] cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
