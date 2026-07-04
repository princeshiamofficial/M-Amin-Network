"use client";

import React from "react";

interface MediaPortal {
  name: string;
  category: "ftp" | "tv" | "torrent" | "gaming";
  url: string;
  desc: string;
  speed: string;
  status: "Online" | "Offline" | "Maintenance";
}

export default function Multimedia() {
  const portals: MediaPortal[] = [
    {
      name: "M Amin FTP Movies",
      category: "ftp",
      url: "http://ftp.m-aminnetwork.com",
      desc: "Stream and download thousands of Hollywood, Bollywood, and Bangla movies in full 1080p/4K resolution directly from our local SAN caches.",
      speed: "Up to 100 Mbps",
      status: "Online",
    },
    {
      name: "BDIX Live TV Portal",
      category: "tv",
      url: "http://tv.m-aminnetwork.com",
      desc: "Watch 120+ high-definition local and international satellite television channels live with zero buffer lag using our local TV gateway.",
      speed: "Up to 100 Mbps",
      status: "Online",
    },
    {
      name: "Gaming Caches Server",
      category: "gaming",
      url: "http://games.m-aminnetwork.com",
      desc: "Download PC game installation packages, Steam backup folders, patches, and console software updates from our high-speed cache storage.",
      speed: "Up to 100 Mbps",
      status: "Online",
    },
    {
      name: "BDIX Torrent Cache",
      category: "torrent",
      url: "http://torrent.m-aminnetwork.com",
      desc: "High-speed torrent peer caching utilizing localized peering routing (AS150164). Replaces slow international seeds with local fast peers.",
      speed: "Up to 100 Mbps",
      status: "Online",
    },
    {
      name: "FTP Anime Archive",
      category: "ftp",
      url: "http://anime.m-aminnetwork.com",
      desc: "Watch subbed and dubbed anime series in HD quality directly hosted on our local media servers.",
      speed: "Up to 50 Mbps",
      status: "Online",
    },
    {
      name: "BDIX Sports Live",
      category: "tv",
      url: "http://sports.m-aminnetwork.com",
      desc: "Never miss a match. Stream live ICC cricket matches, football tournaments, and local leagues in HD quality.",
      speed: "Up to 100 Mbps",
      status: "Maintenance",
    },
  ];

  return (
    <div className="w-full py-12 relative overflow-hidden min-h-[80vh] flex flex-col">
      {/* Background glow (decorative top background) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue/5 blur-[120px] pointer-events-none" />

      {/* Header Area - Dark Theme */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left relative z-10 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="bg-brand-blue/15 text-brand-cyan text-[10px] font-bold tracking-widest px-2.5 py-1 rounded border border-brand-cyan/20 uppercase">
            FTP &amp; Caching Caches
          </span>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mt-3">
            Multimedia{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan to-brand-blue text-glow">
              &amp; BDIX Portal
            </span>
          </h1>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed text-center">
            Subscribers can access our local high-speed entertainment gateways. Stream movies, play game updates, and watch live TV at speeds up to 100 Mbps, regardless of your standard plan bandwidth speed.
          </p>
        </div>
      </div>

      {/* Grid of portals - White Background Section */}
      <div className="w-full bg-white text-slate-800 py-16 grow border-t border-slate-200 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portals.map((portal, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/60 shadow-sm hover:shadow-md hover:border-brand-blue/20 hover:scale-[1.01] transition-all flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-3 mb-4">
                    <span
                      className={`text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full border ${
                        portal.category === "ftp"
                          ? "bg-brand-blue/10 border-brand-blue/20 text-brand-blue"
                          : portal.category === "tv"
                          ? "bg-brand-blue/15 border-brand-blue/25 text-brand-blue"
                          : portal.category === "torrent"
                          ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-600"
                          : "bg-purple-500/10 border-purple-500/25 text-purple-600"
                      }`}
                    >
                      {portal.category.toUpperCase()}
                    </span>
                    <span
                      className={`text-[10px] font-bold ${
                        portal.status === "Online"
                          ? "text-emerald-600"
                          : portal.status === "Offline"
                          ? "text-rose-600"
                          : "text-amber-600"
                      }`}
                    >
                      ● {portal.status}
                    </span>
                  </div>

                  <h3 className="text-slate-900 font-extrabold text-lg leading-tight mb-2">{portal.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">{portal.desc}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 mt-auto">
                  <div className="font-mono text-xs">
                    <span className="text-slate-400 block">FTP SPEED</span>
                    <span className="text-slate-900 font-bold">{portal.speed}</span>
                  </div>
                  
                  {portal.status === "Online" ? (
                    <a
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-brand-blue text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-brand-blue/90 transition-colors shadow-sm"
                    >
                      Access Server
                    </a>
                  ) : (
                    <button
                      disabled
                      className="bg-slate-100 border border-slate-200 text-slate-400 text-xs font-bold px-4 py-2.5 rounded-xl"
                    >
                      Restricted
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
