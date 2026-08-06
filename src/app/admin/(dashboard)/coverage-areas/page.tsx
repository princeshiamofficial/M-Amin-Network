"use client";
import { toast } from "sonner";

import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import { useAdminSecurity } from "@/hooks/useAdminSecurity";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  MoreVertical,
  Map,
  Wifi,
  Activity,
  Layers,
  X,
  MapPin,
  HelpCircle,
  Loader2
} from "lucide-react";

interface CoverageZone {
  name: string;
  status: "active" | "expanding" | "planned";
  subAreas: string[];
}

const defaultZones: CoverageZone[] = [
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

export default function CoverageAreasPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { canAdd, canEdit, canDelete } = useAdminSecurity();
  const allowAdd = canAdd("/admin/coverage-areas");
  const allowEdit = canEdit("/admin/coverage-areas");
  const allowDelete = canDelete("/admin/coverage-areas");

  // Coverage zones state
  const [zones, setZones] = useState<CoverageZone[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "expanding" | "planned">("all");

  // Modal forms state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    status: "active" as "active" | "expanding" | "planned",
    subAreasText: "",
  });

  const loadZones = React.useCallback(() => {
    if (typeof window === "undefined") return;
    getSetting("coverage_zones").then(saved => {
      if (saved) {
        setZones(saved as unknown as CoverageZone[]);
      } else {
        setSetting("coverage_zones", defaultZones);
        setZones(defaultZones);
      }
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("admin_token");
        if (!token) {
          router.replace("/admin");
        } else {
          setIsAuthenticated(true);
          loadZones();
        }
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [router, loadZones]);

  // Listen to database reset event
  useEffect(() => {
    const handleReset = async () => {
      if (typeof window !== "undefined") {
        setSetting("coverage_zones", defaultZones);
        setZones(defaultZones);
      }
    };
    window.addEventListener("reset_db", handleReset);
    return () => window.removeEventListener("reset_db", handleReset);
  }, []);

  const handleOpenAddModal = () => {
    setEditingIndex(null);
    setFormData({
      name: "",
      status: "active",
      subAreasText: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (index: number, zone: CoverageZone) => {
    setEditingIndex(index);
    setFormData({
      name: zone.name,
      status: zone.status,
      subAreasText: zone.subAreas.join("\n"),
    });
    setIsModalOpen(true);
  };

  const handleSaveZone = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window === "undefined") return;

    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      toast.error("Zone name is required.");
      return;
    }

    const subAreas = formData.subAreasText
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const zoneData: CoverageZone = {
      name: trimmedName,
      status: formData.status,
      subAreas,
    };

    setIsSaving(true);
    // Add small artificial delay for premium feels
    setTimeout(() => {
      let updated: CoverageZone[];
      if (editingIndex !== null) {
        updated = [...zones];
        updated[editingIndex] = zoneData;
      } else {
        if (zones.some(z => z.name.toLowerCase() === trimmedName.toLowerCase())) {
          toast.error("A coverage zone with this name already exists!");
          setIsSaving(false);
          return;
        }
        updated = [...zones, zoneData];
      }

      setZones(updated);
      setSetting("coverage_zones", updated);
      setIsSaving(false);
      setIsModalOpen(false);
      toast.success(editingIndex !== null ? "Coverage zone updated successfully!" : "New coverage zone added successfully!");
    }, 600);
  };

  const handleDeleteZone = async (index: number) => {
    const confirmed = window.customConfirm
      ? await window.customConfirm("Are you sure you want to delete this coverage zone and all its sub-areas?")
      : confirm("Are you sure you want to delete this coverage zone?");
    
    if (!confirmed) return;

    const updated = zones.filter((_, i) => i !== index);
    setZones(updated);
    setSetting("coverage_zones", updated);
    toast.success("Coverage zone deleted successfully.");
  };

  if (!mounted || !isAuthenticated) return null;

  const filteredZones = zones.filter((zone) => {
    const matchesSearch =
      zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      zone.subAreas.some((sub) => sub.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === "all" || zone.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  // Calculate statistics
  const totalZones = zones.length;
  const activeZones = zones.filter(z => z.status === "active").length;
  const expandingZones = zones.filter(z => z.status === "expanding").length;
  const plannedZones = zones.filter(z => z.status === "planned").length;

  return (
    <div className="space-y-6 text-slate-850 font-sans">
      
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {/* Total Zones */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:p-5 shadow-xs flex items-center justify-between hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300">
          <div className="space-y-0.5 sm:space-y-1 text-left min-w-0">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">Total Sectors</span>
            <span className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight block truncate">{totalZones}</span>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <Map className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Active Fiber */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:p-5 shadow-xs flex items-center justify-between hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300">
          <div className="space-y-0.5 sm:space-y-1 text-left min-w-0">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">Active Fiber</span>
            <span className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight block truncate">{activeZones}</span>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 relative">
            <span className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500"></span>
            </span>
            <Wifi className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Expanding */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:p-5 shadow-xs flex items-center justify-between hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300">
          <div className="space-y-0.5 sm:space-y-1 text-left min-w-0">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">Under Expansion</span>
            <span className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight block truncate">{expandingZones}</span>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Planned */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:p-5 shadow-xs flex items-center justify-between hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300">
          <div className="space-y-0.5 sm:space-y-1 text-left min-w-0">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">Planned Expansion</span>
            <span className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight block truncate">{plannedZones}</span>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
      </div>

      {/* Main Panel Card */}
      <div className="bg-transparent md:bg-white border-0 md:border md:border-slate-200/85 shadow-none md:shadow-sm rounded-none md:rounded-2xl p-0 md:p-6 space-y-4 md:space-y-6">
        
        {/* Controls Row */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          <div className="flex-1 flex flex-col sm:flex-row gap-3 max-w-2xl">
            {/* Search bar */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search zone name or sub-area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white md:bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 placeholder-slate-400 transition-all font-medium"
              />
            </div>
            {/* Filter select */}
            <div className="relative shrink-0">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as "all" | "active" | "expanding" | "planned")}
                className="w-full sm:w-44 bg-white md:bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 font-bold focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 cursor-pointer appearance-none pr-8"
              >
                <option value="all">All Sectors</option>
                <option value="active">Active Only</option>
                <option value="expanding">Expanding Only</option>
                <option value="planned">Planned Only</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </div>
          </div>

          {allowAdd && (
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-md shadow-indigo-500/10 inline-flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Coverage Zone</span>
            </button>
          )}
        </div>

        {/* Mobile View: 2-column Grid Cards matching public page style */}
        <div className="block md:hidden">
          {filteredZones.length === 0 ? (
            <div className="py-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200/80 p-6">
              <div className="flex flex-col items-center justify-center gap-2">
                <HelpCircle className="w-8 h-8 text-slate-300" />
                <span className="text-xs font-semibold">No coverage zones found.</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredZones.map((zone) => {
                const originalIndex = zones.findIndex((z) => z.name === zone.name);
                return (
                  <div
                    key={zone.name}
                    className="p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between gap-2.5 text-left relative overflow-hidden bg-white hover:shadow-md transition-all"
                  >
                    <div>
                      {/* Top Row: Icon + Title + Actions */}
                      <div className="flex items-center justify-between gap-1 border-b border-slate-100/90 pb-2 mb-2">
                        <div className="flex items-center gap-1.5 min-w-0 pr-1">
                          <div className="w-6 h-6 rounded-md bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                            <MapPin className="w-3.5 h-3.5" />
                          </div>
                          <h4 className="text-slate-900 font-extrabold text-xs tracking-tight truncate">{zone.name}</h4>
                        </div>
                        {(allowEdit || allowDelete) && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="inline-flex items-center justify-center w-6 h-6 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-700 transition-colors cursor-pointer outline-none shrink-0 -mr-1">
                                <MoreVertical className="w-3.5 h-3.5" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-32 bg-white border border-slate-200/80 rounded-xl shadow-xl py-1 relative z-50">
                              {allowEdit && (
                                <DropdownMenuItem
                                  onClick={() => handleOpenEditModal(originalIndex, zone)}
                                  className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/30 cursor-pointer flex items-center gap-2"
                                >
                                  <Pencil className="w-3.5 h-3.5 text-slate-400" />
                                  <span>Edit Zone</span>
                                </DropdownMenuItem>
                              )}
                              {allowDelete && (
                                <DropdownMenuItem
                                  onClick={() => handleDeleteZone(originalIndex)}
                                  className="px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50/40 cursor-pointer flex items-center gap-2"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>

                      {/* Status Badge */}
                      <div className="mb-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border leading-none ${
                          zone.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                          zone.status === "expanding" ? "bg-blue-50 text-blue-700 border-blue-200" :
                          "bg-slate-100 text-slate-600 border-slate-200"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            zone.status === "active" ? "bg-emerald-500" :
                            zone.status === "expanding" ? "bg-blue-500 animate-pulse" :
                            "bg-slate-400"
                          }`} />
                          <span className="truncate">
                            {zone.status === "active" ? "Active Fiber" :
                             zone.status === "expanding" ? "Expanding" :
                             "Planned"}
                          </span>
                        </span>
                      </div>

                      {/* Sub-areas */}
                      <div className="space-y-1">
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Sub-areas:</p>
                        <div className="flex flex-wrap gap-1">
                          {zone.subAreas.map((sub, i) => (
                            <span key={i} className="bg-slate-100/90 text-slate-700 text-[9px] font-medium px-1.5 py-0.5 rounded border border-slate-200/50">
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Desktop View: Full Table Grid */}
        <div className="hidden md:block overflow-x-auto border border-slate-200/60 rounded-xl">
          <Table>
            <TableHeader className="bg-slate-50/75 border-b border-slate-200/60">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider py-4 pl-5">Zone Name</TableHead>
                <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider py-4">Status</TableHead>
                <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider py-4">Sub-areas / Road Peering</TableHead>
                <TableHead className="text-xs font-bold text-slate-500 text-right uppercase tracking-wider py-4 pr-5">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredZones.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <HelpCircle className="w-8 h-8 text-slate-300" />
                      <span className="text-xs font-semibold">No coverage zones found.</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredZones.map((zone) => {
                  const originalIndex = zones.findIndex(z => z.name === zone.name);
                  return (
                    <TableRow key={zone.name} className="group hover:bg-slate-50/40 transition-colors border-b border-slate-100 last:border-0">
                      <TableCell className="py-4 pl-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:border-indigo-100 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 shrink-0 transition-all">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <span className="font-extrabold text-slate-900">{zone.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border leading-none ${
                          zone.status === "active" ? "bg-emerald-50/70 text-emerald-700 border-emerald-100" :
                          zone.status === "expanding" ? "bg-blue-50/70 text-blue-700 border-blue-100" :
                          "bg-slate-50/80 text-slate-500 border-slate-150"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            zone.status === "active" ? "bg-emerald-500" :
                            zone.status === "expanding" ? "bg-blue-500 animate-pulse" :
                            "bg-slate-400"
                          }`} />
                          <span>
                            {zone.status === "active" ? "Active Fiber" :
                             zone.status === "expanding" ? "Expanding" :
                             "Planned"}
                          </span>
                        </span>
                      </TableCell>
                      <TableCell className="py-4 max-w-sm">
                        <div className="flex flex-wrap gap-1.5">
                          {zone.subAreas.map((sub, i) => (
                            <span key={i} className="bg-slate-100/70 text-slate-650 hover:bg-slate-200/50 hover:text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200/30 transition-all select-none">
                              {sub}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 pr-5 text-right">
                        {(allowEdit || allowDelete) && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="inline-flex items-center justify-center w-7 h-7 hover:bg-slate-100/70 active:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer outline-none border border-transparent hover:border-slate-200/40">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-32 bg-white border border-slate-200/80 rounded-xl shadow-xl py-1 relative z-50">
                              {allowEdit && (
                                <DropdownMenuItem
                                  onClick={() => handleOpenEditModal(originalIndex, zone)}
                                  className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/30 cursor-pointer flex items-center gap-2"
                                >
                                  <Pencil className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
                                  <span>Edit Zone</span>
                                </DropdownMenuItem>
                              )}
                              {allowDelete && (
                                <DropdownMenuItem
                                  onClick={() => handleDeleteZone(originalIndex)}
                                  className="px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50/40 cursor-pointer flex items-center gap-2"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ── ADD/EDIT ZONE MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-[9999] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-slate-100 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto text-left relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer w-7 h-7 rounded-full hover:bg-slate-50 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1 text-left">
              <h3 className="text-slate-900 font-extrabold text-sm uppercase tracking-wider">
                {editingIndex !== null ? "Modify Coverage Zone" : "Add New Coverage Zone"}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Define network coverage zone status and sub-areas peering routing details.
              </p>
            </div>

            <form onSubmit={handleSaveZone} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Zone Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kadomtoli"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 placeholder-[#8c94a0] focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Zone Status</label>
                  <div className="relative">
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "expanding" | "planned" })}
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 cursor-pointer appearance-none pr-8"
                    >
                      <option value="active">Active Fiber</option>
                      <option value="expanding">Expanding</option>
                      <option value="planned">Planned</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Sub-areas / Road Peering (one per line)</label>
                <textarea
                  required
                  rows={5}
                  placeholder="e.g.&#10;Kadomtoli Chowrasta&#10;Aganagar Road&#10;Babu Mia Mosque Road"
                  value={formData.subAreasText}
                  onChange={(e) => setFormData({ ...formData, subAreasText: e.target.value })}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 placeholder-[#8c94a0] focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-none font-mono text-[11px] leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-extrabold text-slate-700 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl text-xs font-extrabold cursor-pointer transition-all shadow-md shadow-indigo-500/10 flex items-center justify-center gap-1.5"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingIndex !== null ? "Save Changes" : "Create Zone"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
