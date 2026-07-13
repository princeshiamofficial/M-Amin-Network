"use client";

import React from "react";
import Image from "next/image";
import { MagicCard } from "@/components/lightswind/magic-card";

interface MediaPortal {
  name: string;
  category: "ftp" | "tv" | "torrent" | "gaming";
  url: string;
  desc: string;
  speed: string;
  status: "Online" | "Offline" | "Maintenance";
  image: string;
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
      image: "/ea82d2834f062ee8d73d8b99aebe0d31.jpg",
    },
    {
      name: "BDIX Live TV Portal",
      category: "tv",
      url: "http://tv.m-aminnetwork.com",
      desc: "Watch 120+ high-definition local and international satellite television channels live with zero buffer lag using our local TV gateway.",
      speed: "Up to 100 Mbps",
      status: "Online",
      image: "/28ca5e1d52c944ebfc4dd9f2b300980d.jpg",
    },
    {
      name: "Gaming Caches Server",
      category: "gaming",
      url: "http://games.m-aminnetwork.com",
      desc: "Download PC game installation packages, Steam backup folders, patches, and console software updates from our high-speed cache storage.",
      speed: "Up to 100 Mbps",
      status: "Online",
      image: "/933503ea823535235e8159f65709292f.jpg",
    },
    {
      name: "BDIX Torrent Cache",
      category: "torrent",
      url: "http://torrent.m-aminnetwork.com",
      desc: "High-speed torrent peer caching utilizing localized peering routing (AS150164). Replaces slow international seeds with local fast peers.",
      speed: "Up to 100 Mbps",
      status: "Online",
      image: "/footer-bg.jpg",
    },
    {
      name: "FTP Anime Archive",
      category: "ftp",
      url: "http://anime.m-aminnetwork.com",
      desc: "Watch subbed and dubbed anime series in HD quality directly hosted on our local media servers.",
      speed: "Up to 50 Mbps",
      status: "Online",
      image: "/Multimedia.jpg",
    },
    {
      name: "BDIX Sports Live",
      category: "tv",
      url: "http://sports.m-aminnetwork.com",
      desc: "Never miss a match. Stream live ICC cricket matches, football tournaments, and local leagues in HD quality.",
      speed: "Up to 100 Mbps",
      status: "Maintenance",
      image: "/offer-card-banner.png",
    },
  ];

  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const filteredPortals = portals.filter(
    (portal) => selectedCategory === "all" || portal.category === selectedCategory
  );

  return (
    <div className="w-full py-0 relative overflow-hidden min-h-[80vh] flex flex-col">
      {/* Background glow (decorative top background) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue/5 blur-[120px] pointer-events-none" />

      {/* Header Area Banner */}
      <div 
        className="relative w-full overflow-hidden bg-slate-950 py-3 sm:py-6 border-b border-white/5 bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(9, 13, 24, 0.45), rgba(9, 13, 24, 0.75)), url("/Multimedia.jpg")'
        }}
      >
        <div className="absolute inset-0 bg-brand-dark/20 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-brand-dark/80 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold text-white tracking-tight mt-3">
              Multimedia{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan to-brand-blue text-glow">
                &amp; BDIX Portal
              </span>
            </h1>
            <p className="text-slate-300 mt-4 text-sm sm:text-base leading-relaxed text-center font-medium drop-shadow-sm max-w-2xl mx-auto">
              Access our high-speed local entertainment gateways to stream movies, play games, and watch live TV at speeds up to 100 Mbps.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of portals - White Background Section */}
      <div className="w-full bg-white text-slate-800 py-16 grow border-t border-slate-200 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {[
              { id: "all", label: "All Portals" },
              { id: "ftp", label: "FTP Servers" },
              { id: "tv", label: "Live TV" },
              { id: "gaming", label: "Gaming Caches" },
              { id: "torrent", label: "BDIX Torrents" }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/15"
                    : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {filteredPortals.map((portal, i) => (
              <a
                key={i}
                href={portal.status === "Online" ? portal.url : undefined}
                target="_blank"
                rel="noopener noreferrer"
                className={portal.status === "Online" ? "cursor-pointer" : "cursor-not-allowed"}
              >
                <MagicCard
                  imageUrl={portal.image}
                  imageAlt={portal.name}
                  className="aspect-square p-4 rounded-3xl bg-slate-50 border border-slate-200/60 shadow-sm hover:shadow-md hover:border-brand-blue/20 hover:scale-[1.01] transition-all flex items-center justify-center text-center"
                >
                  <div className="flex items-center justify-center w-full h-full p-1">
                    <Image
                      src={portal.image}
                      alt={portal.name}
                      width={120}
                      height={120}
                      className="object-cover aspect-square rounded-2xl max-w-[85%] max-h-[85%]"
                    />
                  </div>
                </MagicCard>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
