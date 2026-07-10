"use client";
import { toast } from "sonner";

import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
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
  MoreVertical
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

  // Coverage zones state
  const [zones, setZones] = useState<CoverageZone[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "expanding" | "planned">("all");

  // Modal forms state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
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
      toast("Zone name is required.");
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

    let updated: CoverageZone[];
    if (editingIndex !== null) {
      updated = [...zones];
      updated[editingIndex] = zoneData;
    } else {
      if (zones.some(z => z.name.toLowerCase() === trimmedName.toLowerCase())) {
        toast("A coverage zone with this name already exists!");
        return;
      }
      updated = [...zones, zoneData];
    }

    setZones(updated);
    setSetting("coverage_zones", updated);
    setIsModalOpen(false);
    toast(editingIndex !== null ? "Coverage zone updated successfully!" : "New coverage zone added successfully!");
  };

  const handleDeleteZone = async (index: number) => {
    if (!confirm("Are you sure you want to delete this coverage zone?")) return;
    const updated = zones.filter((_, i) => i !== index);
    setZones(updated);
    setSetting("coverage_zones", updated);
  };

  if (!mounted || !isAuthenticated) return null;

  const filteredZones = zones.filter((zone) => {
    const matchesSearch =
      zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      zone.subAreas.some((sub) => sub.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === "all" || zone.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-6 text-slate-800">
      


      {/* Controls Row */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <div className="flex-1 flex gap-3 max-w-xl">
          {/* Search bar */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search zone name or sub-area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue placeholder-slate-400 transition-all"
            />
          </div>
          {/* Filter select */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as "all" | "active" | "expanding" | "planned")}
            className="bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-brand-blue cursor-pointer"
          >
            <option value="all">All Sectors</option>
            <option value="active">Active Only</option>
            <option value="expanding">Expanding Only</option>
            <option value="planned">Planned Only</option>
          </select>
        </div>

        {/* Add button */}
        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 bg-brand-blue hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md inline-flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Coverage Zone</span>
        </button>
      </div>

      {/* Table grid */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Zone Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sub-areas / Road Peering</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredZones.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-slate-400">No coverage zones found.</TableCell>
              </TableRow>
            ) : (
              filteredZones.map((zone) => {
                // Find original index in full list for edit/delete
                const originalIndex = zones.findIndex(z => z.name === zone.name);
                return (
                  <TableRow key={zone.name}>
                    <TableCell>
                      <span className="font-extrabold text-slate-900 block">{zone.name}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        zone.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                        zone.status === "expanding" ? "bg-blue-50 text-blue-700 border-blue-100 animate-pulse" :
                        "bg-slate-50 text-slate-500 border-slate-100"
                      }`}>
                        {zone.status === "active" ? "Active Fiber" :
                         zone.status === "expanding" ? "Expanding" :
                         "Planned"}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {zone.subAreas.map((sub, i) => (
                          <span key={i} className="bg-slate-100 text-slate-650 text-[10px] font-medium px-2 py-0.5 rounded border border-slate-200/50">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="inline-flex items-center justify-center p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700 transition-colors cursor-pointer outline-none">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32 bg-white border border-slate-200 rounded-xl shadow-xl py-1">
                          <DropdownMenuItem
                            onClick={() => handleOpenEditModal(originalIndex, zone)}
                            className="px-3 py-2 text-xs font-bold text-brand-blue hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span>Edit Zone</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteZone(originalIndex)}
                            className="px-3 py-2 text-xs font-bold text-red-650 hover:bg-red-50 cursor-pointer flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── ADD/EDIT ZONE MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div>
              <h3 className="text-slate-900 font-extrabold text-base">
                {editingIndex !== null ? "Modify Coverage Zone" : "Add New Coverage Zone"}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Define network coverage zone status and sub-areas peering routing.</p>
            </div>
            <form onSubmit={handleSaveZone} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Zone Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kadomtoli"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Zone Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "expanding" | "planned" })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-850 focus:outline-none focus:border-brand-blue cursor-pointer"
                  >
                    <option value="active">Active Fiber</option>
                    <option value="expanding">Expanding</option>
                    <option value="planned">Planned</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Sub-areas / Road Peering (one per line)</label>
                <textarea
                  required
                  rows={6}
                  placeholder="e.g.&#10;Kadomtoli Chowrasta&#10;Aganagar Road&#10;Babu Mia Mosque Road"
                  value={formData.subAreasText}
                  onChange={(e) => setFormData({ ...formData, subAreasText: e.target.value })}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue resize-none font-mono text-[11px]"
                />
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button
                  type="submit"
                  className="px-5 py-3.5 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md"
                >
                  {editingIndex !== null ? "Save Changes" : "Create Zone"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

