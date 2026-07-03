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
  const [avatarView, setAvatarView] = useState<"menu" | "edit">("menu");
  const [avatarUrl, setAvatarUrl] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("m_amin_avatar_url") || "/ea82d2834f062ee8d73d8b99aebe0d31.jpg";
    }
    return "/ea82d2834f062ee8d73d8b99aebe0d31.jpg";
  });
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
            onClick={() => {
              setIsAvatarOpen(!isAvatarOpen);
              setAvatarView("menu");
            }}
            title="Admin Options"
            className="relative w-8 h-8 rounded-full border-2 border-[#f97316] overflow-hidden hover:scale-105 transition-transform cursor-pointer flex-shrink-0"
          >
            <img
              src={avatarUrl}
              alt="Admin Profile"
              className="w-full h-full object-cover"
            />
          </button>

          {isAvatarOpen && (
            <div className="absolute right-0 top-9 mt-1.5 w-56 bg-white border border-slate-200/90 rounded-2xl shadow-xl z-50 p-3 text-[13px] text-slate-700">
              {avatarView === "menu" ? (
                <>
                  {/* Header */}
                  <div className="px-1 pb-2 border-b border-slate-100 flex flex-col gap-0.5">
                    <span className="font-extrabold text-[#1e293b] text-sm">M Amin</span>
                    <span className="text-[11px] text-[#94a3b8] font-medium">admin@maminnetwork.com</span>
                    <span className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-wide mt-0.5">ROLE: SYSTEM ADMIN</span>
                  </div>
                  
                  {/* Middle Action Links */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setAvatarView("edit");
                      }}
                      className="w-full px-1.5 py-2 hover:bg-slate-50 flex items-center gap-3 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer text-left font-semibold rounded-xl"
                    >
                      <svg className="w-[17px] h-[17px] text-[#64748b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      <span>Edit Profile</span>
                    </button>

                    {/* Profile (Soon) */}
                    <div className="w-full px-1.5 py-2 flex items-center gap-3 text-slate-400 select-none font-semibold">
                      <svg className="w-[17px] h-[17px] text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Profile (Soon)</span>
                    </div>

                    {/* Settings (Active) */}
                    <Link
                      href="/admin/settings"
                      onClick={() => setIsAvatarOpen(false)}
                      className="w-full px-1.5 py-2 hover:bg-slate-50 flex items-center gap-3 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer text-left font-semibold block rounded-xl"
                    >
                      <svg className="w-[17px] h-[17px] text-[#64748b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      </svg>
                      <span>Settings</span>
                    </Link>
                  </div>
                  
                  {/* Footer */}
                  <div className="border-t border-slate-100 mt-1 pt-1.5">
                    <button
                      onClick={() => {
                        setIsAvatarOpen(false);
                        onSignOut();
                      }}
                      className="w-full flex items-center gap-3 px-1.5 py-2 hover:bg-rose-50/50 text-red-500 hover:text-red-655 transition-colors cursor-pointer text-left font-bold rounded-xl"
                    >
                      <svg className="w-[17px] h-[17px] text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013-3v1" />
                      </svg>
                      <span>Log out</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-3 text-slate-800">
                  {/* Header */}
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="font-extrabold text-[#1e293b] text-xs">Edit Profile</span>
                    </div>
                    <button
                      onClick={() => setAvatarView("menu")}
                      className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Subtitle */}
                  <p className="text-[10px] text-[#64748b] font-semibold leading-normal">
                    Update your profile picture. Current email: <span className="font-mono text-slate-500 text-[9px] block mt-0.5 text-left">admin@maminnetwork.com</span>
                  </p>

                  {/* Picture area */}
                  <div className="flex items-center gap-3 py-1">
                    <div className="w-14 h-14 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-100 flex-shrink-0">
                      <img
                        src={avatarUrl}
                        alt="Current Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <button
                      onClick={() => {
                        const input = document.getElementById("avatar-upload-input-dropdown");
                        input?.click();
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-[10.5px] font-bold text-slate-700 transition-all cursor-pointer shadow-sm"
                    >
                      <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span>Upload Image</span>
                    </button>

                    <input
                      id="avatar-upload-input-dropdown"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            if (typeof reader.result === "string") {
                              setAvatarUrl(reader.result);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>

                  {/* Remove Link */}
                  <button
                    onClick={() => {
                      setAvatarUrl("/ea82d2834f062ee8d73d8b99aebe0d31.jpg");
                    }}
                    className="flex items-center gap-1.5 text-[10.5px] font-bold text-red-500 hover:text-red-655 transition-colors cursor-pointer w-fit"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Remove Current Avatar</span>
                  </button>

                  <p className="text-[9px] text-slate-400 font-medium text-left">Upload JPG, PNG, GIF. Max 2MB.</p>

                  {/* Footer Actions */}
                  <div className="flex justify-end gap-2 border-t border-slate-100 pt-2.5 mt-1">
                    <button
                      onClick={() => setAvatarView("menu")}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-[10.5px] font-bold text-slate-600 transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        localStorage.setItem("m_amin_avatar_url", avatarUrl);
                        setAvatarView("menu");
                        alert("Profile avatar updated successfully!");
                      }}
                      className="px-3 py-1.5 bg-[#f59e0b] hover:bg-[#d97706] text-white rounded-xl text-[10.5px] font-bold transition-all cursor-pointer shadow-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
