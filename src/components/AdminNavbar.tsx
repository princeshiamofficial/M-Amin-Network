"use client";

import React, { useState } from "react";
import Link from "next/link";

interface AdminNavbarProps {
  activeTab: string;
  onResetDatabase: () => void;
  onSignOut: () => void;
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

export default function AdminNavbar({
  activeTab,
  onResetDatabase,
  onSignOut,
  isSidebarCollapsed = false,
  onToggleSidebar,
}: AdminNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New ticket filed by Tanvir Ahmed", time: "5 mins ago", read: false },
    { id: 2, title: "Payment of ৳1,250 BDT received via bKash", time: "12 mins ago", read: false },
    { id: 3, title: "New job application from Mehedi Hasan", time: "2 hours ago", read: true },
    { id: 4, title: "Complaint registered: Frequent Disconnections", time: "5 hours ago", read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  return (
    <header className="w-full h-16 bg-[#eef2f5] border-b border-[#e2e8f0] flex items-center justify-between px-6 select-none relative z-10 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      {/* Left side: Active Page Title */}
      <div className="flex items-center gap-3">
        <h2 className="text-slate-800 font-extrabold text-sm tracking-wide">
          {activeTab} Workspace
        </h2>
      </div>

      {/* Right side: Reference icons and avatar */}
      <div className="flex items-center gap-6">
        {/* Clear Cache button */}
        <button
          onClick={() => {
            if (confirm("Are you sure you want to clear the mock database cache? This will reset all records.")) {
              localStorage.clear();
              alert("Cache cleared successfully! Reloading...");
              window.location.reload();
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100/70 border border-red-200/80 text-red-700 hover:text-red-800 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-sm"
        >
          <svg className="w-[15px] h-[15px] text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span>Clear Cache</span>
        </button>

        {/* Notification Bell with Badge Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            title="View Alerts & Notifications"
            className="p-1 hover:bg-[#e2e8f0] rounded-lg transition-colors cursor-pointer flex items-center justify-center relative"
          >
            <svg className="w-[19px] h-[19px] text-[#475569]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#eef2f5]" />
            )}
          </button>

          {isOpen && (
            <div className="absolute right-0 top-9 mt-1 w-80 bg-white border border-slate-200/90 rounded-[20px] shadow-xl z-50 py-3 text-xs">
              <div className="flex justify-between items-center px-4 pb-2 border-b border-slate-100">
                <span className="font-extrabold text-slate-800">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                    className="text-[10px] text-brand-blue font-bold hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className={`p-3 transition-colors hover:bg-slate-50/70 flex flex-col gap-0.5 ${!n.read ? "bg-blue-50/20" : ""}`}>
                    <div className="flex justify-between items-start gap-1">
                      <span className={`text-[11px] leading-relaxed ${!n.read ? "text-slate-900 font-bold text-left block" : "text-slate-600 text-left block"}`}>
                        {n.title}
                      </span>
                      {!n.read && <span className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-1 flex-shrink-0" />}
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono text-left block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User avatar portrait with orange border ring & dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsAvatarOpen(!isAvatarOpen)}
            title="Admin Options"
            className="relative w-8 h-8 rounded-full border-2 border-[#f97316] overflow-hidden hover:scale-105 transition-transform cursor-pointer flex-shrink-0"
          >
            <img
              src="/ea82d2834f062ee8d73d8b99aebe0d31.jpg"
              alt="Admin Profile"
              className="w-full h-full object-cover"
            />
          </button>

          {isAvatarOpen && (
            <div className="absolute right-0 top-9 mt-1 w-48 bg-white border border-slate-200/90 rounded-[20px] shadow-xl z-50 py-2.5 text-xs">
              <div className="px-4 py-1.5 border-b border-slate-100 flex flex-col gap-0.5">
                <span className="font-extrabold text-slate-800">Super Admin</span>
                <span className="text-[10px] text-slate-400 font-mono">admin@maminnetwork.com</span>
              </div>
              <div className="py-1">
                <Link
                  href="/admin/dashboard"
                  onClick={() => setIsAvatarOpen(false)}
                  className="w-full px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer text-left block"
                >
                  Dashboard Home
                </Link>
                <Link
                  href="/admin/settings"
                  onClick={() => setIsAvatarOpen(false)}
                  className="w-full px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer text-left block"
                >
                  System Settings
                </Link>
              </div>
              <div className="border-t border-slate-100 mt-1 pt-1.5">
                <button
                  onClick={() => {
                    setIsAvatarOpen(false);
                    onSignOut();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-655 hover:text-red-700 font-bold transition-colors cursor-pointer"
                >
                  Sign Out Session
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
