"use client";

import React, { useState } from "react";
import { PageHeaderData } from "@/app/admin/(dashboard)/page-headers/page";

export interface MediaPortal {
  name: string;
  category: "ftp" | "tv" | "gaming" | "torrent" | string;
  url: string;
  desc: string;
  speedText?: string;
  iconName?: string;
}

interface MultimediaClientProps {
  initialHeaderData: PageHeaderData;
  initialCategories: { id: string; label: string }[];
  initialPortals: MediaPortal[];
}

export default function MultimediaClient({
  initialHeaderData,
  initialCategories,
  initialPortals,
}: MultimediaClientProps) {
  const [headerData] = useState<PageHeaderData>(initialHeaderData);
  const [portals] = useState<MediaPortal[]>(initialPortals);
  const [categories] = useState<{ id: string; label: string }[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategories[0]?.id || ""
  );

  const filteredPortals = portals.filter(
    (p) => !selectedCategory || p.category === selectedCategory
  );

  return (
    <div className="w-full relative text-left">
      {/* Header Banner */}
      <div
        className="relative w-full overflow-hidden bg-slate-950 py-3 sm:py-6 border-b border-white/5 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(9, 13, 24, 0.45), rgba(9, 13, 24, 0.75)), url("${headerData.multimedia_bg || "/Multimedia.jpg"}")`,
        }}
      >
        <div className="absolute inset-0 bg-brand-dark/20 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-brand-dark/85 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold text-white tracking-tight mt-3 text-center w-full block">
              {headerData.multimedia_title_en || "Local Content"}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan to-brand-blue text-glow">
                {headerData.multimedia_title_highlight_en || "Peering Portals"}
              </span>
            </h1>
            <p className="text-slate-300 mt-4 text-sm sm:text-base leading-relaxed text-center font-medium drop-shadow-sm max-w-2xl mx-auto">
              {headerData.multimedia_subtitle_en ||
                "Enjoy latency-free access of up to 100 Mbps to local BDIX FTP servers, live TV portals, and gaming caches."}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="w-full bg-white text-slate-800 py-16 border-t border-slate-200 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Category Tabs */}
          <div className="flex gap-2 border-b border-slate-200 pb-4 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Portals Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {filteredPortals.map((portal, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue rounded-full text-[10px] font-bold uppercase">
                      {portal.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-600">
                      {portal.speedText || "Up to 100 Mbps"}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900">
                    {portal.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {portal.desc}
                  </p>
                </div>

                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white py-3 rounded-xl font-bold text-xs transition-all shadow-sm flex justify-center items-center gap-2 cursor-pointer mt-4"
                >
                  Visit Portal
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
