"use client";
import { toast } from "sonner";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PenLine, User, Settings, LogOut, Trash2 } from "lucide-react";
import { getSetting, setSetting, getNotifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification } from "@/actions/content";

interface AdminNavbarProps {
  activeTab: string;
  onSignOut: () => void;
  onToggleSidebar?: () => void;
}

export default function AdminNavbar({
  activeTab,
  onSignOut,
  onToggleSidebar,
}: AdminNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [avatarView, setAvatarView] = useState<"menu" | "edit">("menu");
  const [avatarUrl, setAvatarUrl] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("avatar_url") || "/xlogo.png";
    }
    return "/xlogo.png";
  });
  
  const [userName, setUserName] = useState("M Amin");
  const [userEmail, setUserEmail] = useState("admin@maminnetwork.com");
  const [userRole, setUserRole] = useState("Super Administrator");

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const currentUsername = localStorage.getItem("admin_username") || "admin";
    const currentRole = localStorage.getItem("admin_user_role") || "Super Administrator";
    setUserRole(currentRole);

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
          setUserName(String(match.username || currentUsername));
          setUserEmail(String(match.email || "admin@maminnetwork.com"));
          setUserRole(String(match.role || currentRole));
          if (match.avatarUrl) {
            setAvatarUrl(String(match.avatarUrl));
          }
        } else {
          setUserName(currentUsername === "admin" ? "M Amin" : currentUsername);
          setUserEmail("admin@maminnetwork.com");
        }
      } else {
        setUserName(currentUsername === "admin" ? "M Amin" : currentUsername);
      }
    }).catch(() => {
      setUserName(currentUsername === "admin" ? "M Amin" : currentUsername);
    });
  }, []);

  interface NotificationItem {
    id: string;
    title: string;
    time: string;
    read: boolean;
    link?: string;
  }

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const getRelativeTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return dateStr || "recently";
      }
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString();
    } catch {
      return dateStr || "recently";
    }
  };

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const fetchNotifications = async () => {
      try {
        const raw = await getNotifications();
        const mapped = raw.slice(0, 8).map((item: Record<string, unknown>) => ({
          id: String(item.id || ""),
          title: String(item.title || item.message || "Notification"),
          time: getRelativeTime(String(item.date || "")),
          read: Boolean(item.read),
          link: item.link ? String(item.link) : undefined,
        }));
        setNotifications(mapped);
      } catch {
        // safe fallback
      }
    };

    fetchNotifications();
    const interval = setInterval(() => {
      if (typeof document !== "undefined" && document.hidden) return;
      fetchNotifications();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id: string) => {
    await markNotificationAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = async () => {
    await markAllNotificationsAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleDeleteNotification = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await deleteNotification(id);
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  return (
    <header className="w-full h-16 bg-[#eef2f5] border-b border-[#e2e8f0] flex items-center justify-between px-3 sm:px-6 select-none relative z-10 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      {/* Left side: Active Page Title & Mobile Toggle */}
      <div className="flex items-center gap-2 sm:gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-1.5 hover:bg-slate-200/70 rounded-lg text-slate-700 transition-colors md:hidden cursor-pointer shrink-0"
            title="Toggle Navigation Menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        <h2 className="text-slate-800 font-extrabold text-xs sm:text-sm tracking-wide truncate max-w-[140px] sm:max-w-none">
          {activeTab} Workspace
        </h2>
      </div>

      {/* Right side: Reference icons and avatar */}
      <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
        {/* Clear Cache button */}
        <button
          onClick={() => {
            const auth = sessionStorage.getItem("admin_authenticated");
            const avatar = localStorage.getItem("avatar_url");
            localStorage.clear();
            sessionStorage.clear();
            if (auth) sessionStorage.setItem("admin_authenticated", auth);
            if (avatar) localStorage.setItem("avatar_url", avatar);
            window.location.href = window.location.pathname + '?t=' + Date.now();
          }}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-red-50 hover:bg-red-100/70 border border-red-200/80 text-red-700 hover:text-red-800 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-xs"
        >
          <svg className="w-[15px] h-[15px] text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span className="hidden sm:inline">Clear Cache</span>
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
                    onClick={handleMarkAllRead}
                    className="text-[10px] text-brand-blue font-bold hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto scrollbar-none">
                {notifications.length === 0 && (
                  <div className="p-4 text-center text-slate-400 text-[11px] font-medium">
                    No notifications yet
                  </div>
                )}
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => handleMarkAsRead(n.id)}
                    className={`p-3 transition-colors hover:bg-slate-50/70 flex flex-col gap-0.5 cursor-pointer ${!n.read ? "bg-blue-50/20" : ""}`}
                  >
                    <div className="flex justify-between items-start gap-1">
                      <span className={`text-[11px] leading-relaxed ${!n.read ? "text-slate-900 font-bold text-left block" : "text-slate-600 text-left block"}`}>
                        {n.link ? <a href={n.link} onClick={(e) => { if (!n.read) { e.stopPropagation(); handleMarkAsRead(n.id); }}} className="hover:underline">{n.title}</a> : n.title}
                      </span>
                      <div className="flex items-center gap-1 shrink-0">
                        {!n.read && <span className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-1 shrink-0" />}
                        <button
                          onClick={(e) => handleDeleteNotification(e, n.id)}
                          className="text-slate-300 hover:text-red-500 transition-colors cursor-pointer"
                          title="Dismiss"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
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
            className="relative w-10 h-10 rounded-full border-2 border-[#f97316] overflow-hidden hover:scale-105 transition-transform cursor-pointer shrink-0"
          >
            <Image
              src={avatarUrl}
              alt="Admin Profile"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </button>

          {isAvatarOpen && (
            <div className={`absolute right-0 top-9 mt-1.5 bg-white border border-slate-200/90 rounded-2xl shadow-xl z-50 p-3 text-[13px] text-slate-700 transition-all duration-200 flex ${avatarView === "edit" ? "w-[464px] gap-4" : "w-56"}`}>
              {/* Left Column: Edit Profile */}
              {avatarView === "edit" && (
                <div className="w-56 flex flex-col gap-3 text-slate-800 pr-4 border-r border-slate-100/80 justify-between">
                  <div>
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

                    {/* Picture area */}
                    <div className="flex items-center gap-3 py-2">
                      <div className="w-16 h-16 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-100 shrink-0">
                        <Image
                          src={avatarUrl}
                          alt="Current Avatar"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      </div>

                      <button
                        onClick={() => {
                          const input = document.getElementById("avatar-upload-input-dropdown-side");
                          input?.click();
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-[10px] font-bold text-slate-700 transition-all cursor-pointer shadow-sm"
                      >
                        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span>Upload Image</span>
                      </button>

                      <input
                        id="avatar-upload-input-dropdown-side"
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
                        setAvatarUrl("/xlogo.png");
                      }}
                      className="flex items-center gap-1.5 text-[10.5px] font-bold text-red-500 hover:text-red-655 transition-colors cursor-pointer w-fit"
                    >
                      <Trash2 className="w-3.5 h-3.5" strokeWidth={2.5} />
                      <span>Remove Current Avatar</span>
                    </button>

                    <p className="text-[9px] text-slate-400 font-medium text-left mt-1">Upload JPG, PNG, GIF. Max 2MB.</p>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex justify-end gap-2 border-t border-slate-100 pt-2 mt-2">
                    <button
                      onClick={() => setAvatarView("menu")}
                      className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={async () => {
                        localStorage.setItem("avatar_url", avatarUrl);
                        const currentUsername = localStorage.getItem("admin_username") || "admin";
                        try {
                          const savedUsers = await getSetting("admin_users");
                          if (Array.isArray(savedUsers)) {
                            const updated = savedUsers.map((u) => {
                              if (u && typeof u === "object" && "username" in u && String(u.username).trim().toLowerCase() === currentUsername.trim().toLowerCase()) {
                                return { ...u, avatarUrl };
                              }
                              return u;
                            });
                            await setSetting("admin_users", updated);
                          }
                        } catch {
                          console.error("Failed to save admin avatar");
                        }
                        setAvatarView("menu");
                        toast("Profile avatar updated successfully!");
                      }}
                      className="px-2.5 py-1.5 bg-[#f59e0b] hover:bg-[#d97706] text-white rounded-xl text-[10px] font-bold transition-all cursor-pointer shadow-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Right Column: Main Menu Dropdown */}
              <div className="w-56 flex flex-col justify-between">
                <div>
                  {/* Header */}
                  <div className="px-1 pb-2 border-b border-slate-100 flex flex-col gap-0.5 text-left">
                    <span className="font-extrabold text-[#1e293b] text-sm">{userName}</span>
                    <span className="text-[11px] text-[#94a3b8] font-medium">{userEmail}</span>
                    <span className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-wide mt-0.5">ROLE: {userRole}</span>
                  </div>
                  
                  {/* Middle Action Links */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setAvatarView(avatarView === "edit" ? "menu" : "edit");
                      }}
                      className={`w-full px-1.5 py-2 flex items-center gap-3 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer text-left font-semibold rounded-xl ${avatarView === "edit" ? "bg-slate-100/80" : "hover:bg-slate-50"}`}
                    >
                      <PenLine className="w-[17px] h-[17px] text-[#64748b]" strokeWidth={2.5} />
                      <span>Edit Profile</span>
                    </button>

                    {/* Profile (Soon) */}
                    <div className="w-full px-1.5 py-2 flex items-center gap-3 text-slate-400 select-none font-semibold text-left">
                      <User className="w-[17px] h-[17px] text-slate-300" strokeWidth={2} />
                      <span>Profile (Soon)</span>
                    </div>

                    {/* Settings (Active) */}
                    <Link
                      href="/admin/settings"
                      onClick={() => setIsAvatarOpen(false)}
                      className="w-full px-1.5 py-2 hover:bg-slate-50 flex items-center gap-3 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer text-left font-semibold rounded-xl"
                    >
                      <Settings className="w-[17px] h-[17px] text-[#64748b]" strokeWidth={2} />
                      <span>Settings</span>
                    </Link>
                  </div>
                </div>
                
                {/* Footer */}
                <div className="border-t border-slate-100 pt-2 mt-2 text-left">
                  <button
                    onClick={() => {
                      setIsAvatarOpen(false);
                      onSignOut();
                    }}
                    className="w-full flex items-center gap-3 px-1.5 py-2 hover:bg-rose-50/50 text-red-500 hover:text-red-655 transition-colors cursor-pointer text-left font-bold rounded-xl"
                  >
                    <LogOut className="w-[17px] h-[17px] text-red-500" strokeWidth={2.5} />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

