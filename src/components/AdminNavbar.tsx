"use client";

import React from "react";
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

        {/* Refresh / database reset trigger */}
        <button
          onClick={onResetDatabase}
          title="Reset Database Seeds"
          className="p-1 hover:bg-[#e2e8f0] rounded-lg transition-colors cursor-pointer flex items-center justify-center"
        >
          <svg className="w-[18px] h-[18px] text-[#475569]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>

        {/* User avatar portrait with orange border ring */}
        <button
          onClick={onSignOut}
          title="Sign Out Session"
          className="relative w-8 h-8 rounded-full border-2 border-[#f97316] overflow-hidden hover:scale-105 transition-transform cursor-pointer flex-shrink-0"
        >
          <img
            src="/ea82d2834f062ee8d73d8b99aebe0d31.jpg"
            alt="Admin Profile"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}
