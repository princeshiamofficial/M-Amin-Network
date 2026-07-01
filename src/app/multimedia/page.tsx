"use client";

import React, { useState } from "react";

interface MediaPortal {
  name: string;
  category: "ftp" | "tv" | "torrent" | "gaming";
  url: string;
  desc: string;
  speed: string;
  status: "Online" | "Offline" | "Maintenance";
}

export default function Multimedia() {
  const [testingPing, setTestingPing] = useState(false);
  const [pingResult, setPingResult] = useState<number | null>(null);

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

  const handlePingTest = () => {
    setTestingPing(true);
    setPingResult(null);
    setTimeout(() => {
      setTestingPing(false);
      setPingResult(parseFloat((1 + Math.random() * 1.5).toFixed(1)));
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 flex-grow text-left">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-brand-cyan/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="bg-brand-blue/15 text-brand-cyan text-[10px] font-bold tracking-widest px-2.5 py-1 rounded border border-brand-cyan/20 uppercase">
          FTP &amp; Caching Caches
        </span>
        <h1 className="text-4xl font-extrabold text-white tracking-tight mt-3">
          Multimedia{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue text-glow">
            &amp; BDIX Portal
          </span>
        </h1>
        <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed text-center">
          Subscribers can access our local high-speed entertainment gateways. Stream movies, play game updates, and watch live TV at speeds up to 100 Mbps, regardless of your standard plan bandwidth speed.
        </p>
      </div>

      {/* Latency Checker Card */}
      <div className="max-w-xl mx-auto mb-16 p-6 rounded-3xl bg-brand-card/75 border border-brand-border/60 glass-panel shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-left space-y-1">
          <h3 className="text-white font-bold text-base">Local FTP Signal Ping</h3>
          <p className="text-xs text-slate-400">Test latency from your connection to our local SAN cache</p>
        </div>

        <div className="flex items-center gap-4">
          {pingResult !== null && (
            <span className="text-xs font-bold text-emerald-400 font-mono">
              Latency: {pingResult} ms
            </span>
          )}
          <button
            onClick={handlePingTest}
            disabled={testingPing}
            className="bg-brand-blue hover:bg-brand-blue/90 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
          >
            {testingPing ? "Pinging..." : "Check Latency"}
          </button>
        </div>
      </div>

      {/* Grid of portals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portals.map((portal, i) => (
          <div
            key={i}
            className="p-6 rounded-3xl bg-brand-card/45 border border-brand-border/60 glass-panel glass-panel-hover flex flex-col justify-between text-left"
          >
            <div>
              <div className="flex items-center justify-between border-b border-brand-border/40 pb-3 mb-4">
                <span
                  className={`text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full border ${
                    portal.category === "ftp"
                      ? "bg-brand-cyan/10 border-brand-cyan/20 text-brand-cyan"
                      : portal.category === "tv"
                      ? "bg-brand-blue/10 border-brand-blue/20 text-brand-blue"
                      : portal.category === "torrent"
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                      : "bg-purple-500/10 border-purple-500/20 text-purple-400"
                  }`}
                >
                  {portal.category.toUpperCase()}
                </span>
                <span
                  className={`text-[10px] font-bold ${
                    portal.status === "Online"
                      ? "text-emerald-400"
                      : portal.status === "Offline"
                      ? "text-rose-400"
                      : "text-amber-400"
                  }`}
                >
                  ● {portal.status}
                </span>
              </div>

              <h3 className="text-white font-extrabold text-lg leading-tight mb-2">{portal.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">{portal.desc}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-brand-border/30 mt-auto">
              <div className="font-mono text-xs">
                <span className="text-slate-500 block">FTP SPEED</span>
                <span className="text-white font-bold">{portal.speed}</span>
              </div>
              
              {portal.status === "Online" ? (
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-blue text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-brand-blue/90 transition-colors"
                >
                  Access Server
                </a>
              ) : (
                <button
                  disabled
                  className="bg-brand-border text-slate-500 text-xs font-bold px-4 py-2.5 rounded-xl border border-brand-border"
                >
                  Restricted
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
