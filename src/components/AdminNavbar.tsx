"use client";

import React from "react";
import Link from "next/link";

interface AdminNavbarProps {
  activeTab: string;
  onResetDatabase: () => void;
  onSignOut: () => void;
}

export default function AdminNavbar({ activeTab, onResetDatabase, onSignOut }: AdminNavbarProps) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-brand-border/40 mb-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">{activeTab}</h1>
        <p className="text-xs text-slate-400 mt-1">Operational management console workspace.</p>
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <Link
          href="/"
          className="px-4 py-2 border border-brand-border hover:border-brand-cyan/40 hover:bg-brand-border/40 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
        >
          ← Back to Website
        </Link>
        <button
          onClick={onResetDatabase}
          className="px-4 py-2 bg-brand-blue/15 hover:bg-brand-blue/30 text-brand-cyan border border-brand-cyan/20 rounded-xl text-xs font-bold transition-all cursor-pointer"
        >
          Reset Mock DB
        </button>
        <button
          onClick={onSignOut}
          className="px-4 py-2 border border-red-500/30 hover:border-red-500/60 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-bold transition-all cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
