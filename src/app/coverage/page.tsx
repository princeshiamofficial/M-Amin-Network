"use client";

import React, { useState, useRef } from "react";
import { MeteorsBeam } from "@/components/lightswind-pro/meteors-beam";

interface CoverageZone {
  name: string;
  status: "active" | "expanding" | "planned";
  subAreas: string[];
}

export default function Coverage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeKadomtoliRef = useRef<SVGGElement>(null);
  const nodeAganagarRef = useRef<SVGGElement>(null);
  const nodeZinjiraRef = useRef<SVGGElement>(null);
  const nodeChunkutiaRef = useRef<SVGGElement>(null);
  const nodeKholamuraRef = useRef<SVGGElement>(null);
  const nodeKaliganjRef = useRef<SVGGElement>(null);
  const nodeDoleshwarRef = useRef<SVGGElement>(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "expanding" | "planned">("all");
  
  // Request Feasibility form state
  const [requestData, setRequestData] = useState({
    name: "",
    phone: "",
    area: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const zones: CoverageZone[] = [
    {
      name: "Kadomtoli",
      status: "active",
      subAreas: ["Kadomtoli Chowrasta", "Aganagar Road", "Babu Mia Mosque Road", "Al-Hira Goli"],
    },
    {
      name: "Aganagar",
      status: "active",
      subAreas: ["Main Bazaar Road", "Haji Market area", "Aganagar Union Parishad", "Aganagar High School Road"],
    },
    {
      name: "Chunkutia",
      status: "active",
      subAreas: ["Chunkutia East", "Chunkutia West", "Vidyut Office Road", "Girls School Goli"],
    },
    {
      name: "Zinjira",
      status: "active",
      subAreas: ["Bazar Road", "Zinjira Launch Ghat Road", "Pachpara", "Rahmatpur"],
    },
    {
      name: "Kaliganj",
      status: "active",
      subAreas: ["Iron Market", "Doli Market Road", "Kaliganj Canal Road"],
    },
    {
      name: "Telghat",
      status: "active",
      subAreas: ["Lauchat Road", "River view road", "Telghat Ferry Ghat"],
    },
    {
      name: "Kholamura",
      status: "expanding",
      subAreas: ["Kholamura Bazar", "Kholamura Ghat", "Model Town Block A & B"],
    },
    {
      name: "East Aganagar",
      status: "expanding",
      subAreas: ["East Union Road", "Bypass road sector 2", "Munshiganj Link Road"],
    },
    {
      name: "Char Kaliganj",
      status: "expanding",
      subAreas: ["Char Kaliganj Ferry Ghat Road", "Riverbank Road"],
    },
    {
      name: "Doleshwar",
      status: "planned",
      subAreas: ["Doleshwar Bazar", "Doleshwar Madrasah Road", "Doleshwar High School"],
    },
    {
      name: "Hasnabad",
      status: "planned",
      subAreas: ["Hasnabad Housing", "Hasnabad Cargo Terminal area", "N8 Highway Link"],
    },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleRequestChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRequestData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const resetRequestForm = () => {
    setRequestData({
      name: "",
      phone: "",
      area: "",
      address: "",
    });
    setSubmitted(false);
  };

  const filteredZones = zones.filter((zone) => {
    const matchesSearch =
      zone.name.toLowerCase().includes(search.toLowerCase()) ||
      zone.subAreas.some((sub) => sub.toLowerCase().includes(search.toLowerCase()));
    
    const matchesFilter = filter === "all" || zone.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 flex-grow">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-brand-cyan/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
        <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center mb-4 text-brand-cyan shadow-[0_0_15px_rgba(0,240,255,0.1)]">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Fiber Network{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue text-glow">
            Coverage Area
          </span>
        </h1>
        <p className="text-slate-400 mt-4 text-sm sm:text-base">
          M Amin Network operates a extensive optical fiber ring throughout South Keraniganj. Browse our active deployment zones or submit a feasibility request for new areas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Network Map Graphic and Coverage list */}
        <div className="lg:col-span-8 space-y-8">
          {/* Simulated Digital Network Map Graphic */}
          <div ref={containerRef} className="glass-panel border-brand-border/60 rounded-3xl p-6 relative overflow-hidden shadow-xl min-h-[300px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-2xl" />
            
            <div className="flex justify-between items-center mb-6 z-10">
              <div>
                <h3 className="text-white font-bold text-base">South Keraniganj Grid</h3>
                <p className="text-xs text-slate-400">Digital Fiber Backbone Topology (AS150164)</p>
              </div>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Network Online
              </span>
            </div>

            {/* Connection Beams (Lightswind Pro) */}
            <MeteorsBeam containerRef={containerRef} fromRef={nodeKadomtoliRef} toRef={nodeAganagarRef} color="#0072ff" meteorColor="#00f0ff" duration={4} delay={0} />
            <MeteorsBeam containerRef={containerRef} fromRef={nodeAganagarRef} toRef={nodeZinjiraRef} color="#0072ff" meteorColor="#00f0ff" duration={3.5} delay={0.5} />
            <MeteorsBeam containerRef={containerRef} fromRef={nodeZinjiraRef} toRef={nodeKaliganjRef} color="#0072ff" meteorColor="#00f0ff" duration={3} delay={1} />
            <MeteorsBeam containerRef={containerRef} fromRef={nodeKaliganjRef} toRef={nodeDoleshwarRef} color="#0072ff" meteorColor="#00f0ff" duration={4} delay={1.5} />
            <MeteorsBeam containerRef={containerRef} fromRef={nodeKadomtoliRef} toRef={nodeChunkutiaRef} color="#0072ff" meteorColor="#00f0ff" duration={3.8} delay={0.2} />
            <MeteorsBeam containerRef={containerRef} fromRef={nodeAganagarRef} toRef={nodeChunkutiaRef} color="#0072ff" meteorColor="#00f0ff" duration={3.5} delay={0.8} />
            <MeteorsBeam containerRef={containerRef} fromRef={nodeChunkutiaRef} toRef={nodeZinjiraRef} color="#0072ff" meteorColor="#00f0ff" duration={3} delay={0.4} />
            <MeteorsBeam containerRef={containerRef} fromRef={nodeChunkutiaRef} toRef={nodeKholamuraRef} color="#0072ff" meteorColor="#00f0ff" duration={4} delay={1.2} />
            <MeteorsBeam containerRef={containerRef} fromRef={nodeKholamuraRef} toRef={nodeDoleshwarRef} color="#0072ff" meteorColor="#00f0ff" duration={3.5} delay={1.6} />
            
            {/* Expanding / Dashed connections */}
            <MeteorsBeam containerRef={containerRef} fromRef={nodeKholamuraRef} toRef={nodeKaliganjRef} color="#1e294b" dashed={true} />
            <MeteorsBeam containerRef={containerRef} fromRef={nodeChunkutiaRef} toRef={nodeKaliganjRef} color="#1e294b" dashed={true} />

            {/* Glowing Map Illustration SVG */}
            <div className="w-full flex items-center justify-center py-6 relative z-10">
              <svg className="w-full max-w-full md:max-w-[680px] h-auto" viewBox="0 0 600 300" fill="none">
                {/* Background Tech Grid */}
                <g opacity="0.08">
                  <line x1="100" y1="0" x2="100" y2="300" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="200" y1="0" x2="200" y2="300" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="300" y1="0" x2="300" y2="300" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="400" y1="0" x2="400" y2="300" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="500" y1="0" x2="500" y2="300" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="0" y1="100" x2="600" y2="100" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="0" y1="200" x2="600" y2="200" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="3 3" />
                </g>

                {/* Network Core Hub Range */}
                <circle cx="300" cy="150" r="90" stroke="#0072ff" strokeWidth="1" strokeDasharray="10 15" opacity="0.06" fill="none" />
                <circle cx="300" cy="150" r="180" stroke="#00f0ff" strokeWidth="1" strokeDasharray="5 10" opacity="0.03" fill="none" />

                {/* Nodes (Active / Expanding / Planned) */}
                {/* Node 1: Kadomtoli (Active) */}
                <g ref={nodeKadomtoliRef} className="cursor-pointer group">
                  <circle cx="70" cy="150" r="16" fill="rgba(0, 240, 255, 0.05)" className="animate-pulse" />
                  <circle cx="70" cy="150" r="9" fill="rgba(0, 240, 255, 0.15)" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1" />
                  <circle cx="70" cy="150" r="4" fill="#00f0ff" />
                  <text x="70" y="175" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Kadomtoli</text>
                  <text x="70" y="184" fill="#00f0ff" fontSize="6.5" fontWeight="semibold" opacity="0.75" textAnchor="middle">Active Node</text>
                </g>

                {/* Node 2: Aganagar (Active) */}
                <g ref={nodeAganagarRef} className="cursor-pointer group">
                  <circle cx="180" cy="90" r="16" fill="rgba(0, 240, 255, 0.05)" className="animate-pulse" />
                  <circle cx="180" cy="90" r="9" fill="rgba(0, 240, 255, 0.15)" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1" />
                  <circle cx="180" cy="90" r="4" fill="#00f0ff" />
                  <text x="180" y="68" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Aganagar</text>
                  <text x="180" y="77" fill="#00f0ff" fontSize="6.5" fontWeight="semibold" opacity="0.75" textAnchor="middle">Active Node</text>
                </g>

                {/* Node 3: Zinjira (Active) */}
                <g ref={nodeZinjiraRef} className="cursor-pointer group">
                  <circle cx="300" cy="120" r="16" fill="rgba(0, 240, 255, 0.05)" className="animate-pulse" />
                  <circle cx="300" cy="120" r="9" fill="rgba(0, 240, 255, 0.15)" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1" />
                  <circle cx="300" cy="120" r="4" fill="#00f0ff" />
                  <text x="300" y="142" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Zinjira</text>
                  <text x="300" y="151" fill="#00f0ff" fontSize="6.5" fontWeight="semibold" opacity="0.75" textAnchor="middle">Active Node</text>
                </g>

                {/* Node 4: Chunkutia (Active) */}
                <g ref={nodeChunkutiaRef} className="cursor-pointer group">
                  <circle cx="270" cy="210" r="16" fill="rgba(0, 240, 255, 0.05)" className="animate-pulse" />
                  <circle cx="270" cy="210" r="9" fill="rgba(0, 240, 255, 0.15)" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1" />
                  <circle cx="270" cy="210" r="4" fill="#00f0ff" />
                  <text x="270" y="232" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Chunkutia</text>
                  <text x="270" y="241" fill="#00f0ff" fontSize="6.5" fontWeight="semibold" opacity="0.75" textAnchor="middle">Active Node</text>
                </g>

                {/* Node 5: Kholamura (Expanding) */}
                <g ref={nodeKholamuraRef} className="cursor-pointer group">
                  <circle cx="420" cy="180" r="16" fill="rgba(0, 114, 255, 0.05)" className="animate-pulse" />
                  <circle cx="420" cy="180" r="9" fill="rgba(0, 114, 255, 0.15)" stroke="rgba(0, 114, 255, 0.4)" strokeWidth="1" />
                  <circle cx="420" cy="180" r="4" fill="#0072ff" />
                  <text x="420" y="202" fill="#0072ff" fontSize="9" fontWeight="bold" textAnchor="middle" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Kholamura</text>
                  <text x="420" y="211" fill="#0072ff" fontSize="6.5" fontWeight="semibold" opacity="0.75" textAnchor="middle">Expanding</text>
                </g>

                {/* Node 6: Kaliganj (Active) */}
                <g ref={nodeKaliganjRef} className="cursor-pointer group">
                  <circle cx="420" cy="75" r="16" fill="rgba(0, 240, 255, 0.05)" className="animate-pulse" />
                  <circle cx="420" cy="75" r="9" fill="rgba(0, 240, 255, 0.15)" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1" />
                  <circle cx="420" cy="75" r="4" fill="#00f0ff" />
                  <text x="420" y="53" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Kaliganj</text>
                  <text x="420" y="62" fill="#00f0ff" fontSize="6.5" fontWeight="semibold" opacity="0.75" textAnchor="middle">Active Node</text>
                </g>

                {/* Node 7: Doleshwar (Planned) */}
                <g ref={nodeDoleshwarRef} className="cursor-pointer group">
                  <circle cx="520" cy="180" r="12" fill="rgba(148, 163, 184, 0.03)" />
                  <circle cx="520" cy="180" r="7" fill="rgba(148, 163, 184, 0.1)" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="1" />
                  <circle cx="520" cy="180" r="3.5" fill="#64748b" />
                  <text x="520" y="202" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Doleshwar</text>
                  <text x="520" y="211" fill="#64748b" fontSize="6.5" fontWeight="semibold" opacity="0.75" textAnchor="middle">Planned</text>
                </g>
              </svg>
            </div>

            {/* Map Legend */}
            <div className="flex flex-wrap gap-4 text-xs border-t border-brand-border/40 pt-4 z-10">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
                Active Fiber Coverage
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(0,114,255,0.6)]" />
                Expanding Fiber Lines
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                Planned Coverage
              </span>
            </div>
          </div>

          {/* Controls & Area Listing */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-brand-card/30 p-4 rounded-2xl border border-brand-border/40 glass-panel">
              {/* Search */}
              <div className="relative w-full sm:max-w-xs">
                <input
                  type="text"
                  placeholder="Filter by area..."
                  value={search}
                  onChange={handleSearchChange}
                  className="w-full bg-brand-dark border border-brand-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                />
                <svg
                  className="w-5 h-5 text-slate-500 absolute left-3 top-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Status Filters */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { id: "all", label: "Show All" },
                  { id: "active", label: "Active Only" },
                  { id: "expanding", label: "Expanding" },
                  { id: "planned", label: "Planned" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFilter(item.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      filter === item.id
                        ? "bg-brand-border border border-brand-cyan text-brand-cyan"
                        : "bg-brand-card hover:bg-brand-border/40 text-slate-400 hover:text-white border border-transparent"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredZones.length > 0 ? (
                filteredZones.map((zone, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-brand-card/40 border border-brand-border/40 glass-panel flex flex-col gap-4 text-left"
                  >
                    <div className="flex items-center justify-between border-b border-brand-border/40 pb-3">
                      <div className="flex items-center gap-1.5 text-brand-cyan">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <h4 className="text-white font-bold text-base">{zone.name}</h4>
                      </div>
                      <span
                        className={`text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full border ${
                          zone.status === "active"
                            ? "bg-brand-cyan/10 border-brand-cyan/30 text-brand-cyan"
                            : zone.status === "expanding"
                            ? "bg-brand-blue/10 border-brand-blue/30 text-brand-blue"
                            : "bg-slate-500/10 border-slate-500/30 text-slate-400"
                        }`}
                      >
                        {zone.status === "active"
                          ? "Active Fiber"
                          : zone.status === "expanding"
                          ? "Expanding"
                          : "Planned"}
                      </span>
                    </div>

                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">
                        Active Sub-areas / Road Peering:
                      </p>
                      <ul className="space-y-1.5">
                        {zone.subAreas.map((sub, subIdx) => (
                          <li key={subIdx} className="text-xs text-slate-300 flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {sub}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-12 bg-brand-card/20 rounded-2xl border border-brand-border/40">
                  <p className="text-slate-400">No coverage zones match your search query.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Feasibility Request Form */}
        <div className="lg:col-span-4">
          <div className="glass-panel border-brand-border/60 rounded-3xl p-6 sm:p-8 space-y-6 sticky top-28 shadow-xl">
            {!submitted ? (
              <form onSubmit={handleRequestSubmit} className="space-y-5">
                <div>
                  <h3 className="text-white font-bold text-lg">Request Coverage</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Don&apos;t see your area on the list? Submit a request so our engineers can perform a fiber routing survey.
                  </p>
                </div>

                <div className="flex flex-col gap-4 text-left">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={requestData.name}
                      onChange={handleRequestChange}
                      placeholder="e.g. Kamrul Hasan"
                      className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={requestData.phone}
                      onChange={handleRequestChange}
                      placeholder="e.g. 01707009267"
                      className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Target Area</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="area"
                        required
                        value={requestData.area}
                        onChange={handleRequestChange}
                        placeholder="e.g. Hasnabad Union"
                        className="w-full bg-brand-dark border border-brand-border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                      />
                      <svg className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Descriptive Address</label>
                    <textarea
                      name="address"
                      required
                      rows={3}
                      value={requestData.address}
                      onChange={handleRequestChange}
                      placeholder="Specify landmarks, mosque, or school names near your premises"
                      className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark py-3.5 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:opacity-95 flex justify-center items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                      Saving Request...
                    </>
                  ) : (
                    "Submit Feasibility Request"
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 animate-pulse">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h3 className="text-white font-bold text-xl">Survey Registered!</h3>
                  <p className="text-sm text-slate-400">
                    We have saved your request for <span className="text-slate-200 font-bold">{requestData.area}</span>.
                  </p>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Our network planning unit regularly assesses survey requests to plot new distribution boxes. Our representative will contact you in case we expand near your line within the current quarter.
                </p>

                <button
                  onClick={resetRequestForm}
                  className="px-6 py-2 rounded-xl bg-brand-border hover:bg-brand-border/80 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Submit Another Area
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
