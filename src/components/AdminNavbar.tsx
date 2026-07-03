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
    <header className="w-full h-16 bg-[#eef2f5] border-b border-[#e2e8f0] flex items-center justify-between px-6 select-none">
      {/* Left side: Active Page Title */}
      <div className="flex items-center gap-3">
        <h2 className="text-slate-800 font-extrabold text-sm tracking-wide uppercase">
          {activeTab} Workspace
        </h2>
      </div>

      {/* Right side: Reference icons and avatar */}
      <div className="flex items-center gap-6">
        {/* Dialogue button */}
        <button
          onClick={() => alert("Dialogue Panel opened.")}
          className="flex items-center gap-2 text-[13px] font-semibold text-[#1e293b] hover:text-[#0f172a] transition-colors cursor-pointer"
        >
          <svg className="w-[18px] h-[18px] text-[#475569]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Dialogue</span>
        </button>

        {/* Case Study button */}
        <button
          onClick={() => alert("Case Study documentation loaded.")}
          className="flex items-center gap-2 text-[13px] font-semibold text-[#1e293b] hover:text-[#0f172a] transition-colors cursor-pointer"
        >
          <svg className="w-[18px] h-[18px] text-[#475569]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Case Study</span>
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
