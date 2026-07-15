"use client";
import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import { useAdminSecurity } from "@/hooks/useAdminSecurity";
import { MagicCard } from "@/components/lightswind/magic-card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2, Edit, PlusCircle, X, Upload, HelpCircle, Film, Tv, Download, Gamepad2, Settings2 } from "lucide-react";
import Image from "next/image";

interface MediaPortal {
  name: string;
  category: string;
  url: string;
  desc: string;
  speed: string;
  status: "Online" | "Offline" | "Maintenance";
  image: string;
}

interface MediaCategory {
  id: string;
  label: string;
}

const defaultCategories: MediaCategory[] = [
  { id: "ftp", label: "FTP Servers" },
  { id: "tv", label: "Live TV" },
  { id: "gaming", label: "Gaming Caches" },
  { id: "torrent", label: "BDIX Torrents" }
];

const defaultPortals: MediaPortal[] = [
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

export default function MultimediaAdminPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [portals, setPortals] = useState<MediaPortal[]>([]);
  const [categories, setCategories] = useState<MediaCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Edit & Delete Confirmation Modals
  const [isEditCatModalOpen, setIsEditCatModalOpen] = useState(false);
  const [catToEdit, setCatToEdit] = useState<MediaCategory | null>(null);
  const [editCatLabel, setEditCatLabel] = useState("");

  const [isDeleteCatModalOpen, setIsDeleteCatModalOpen] = useState(false);
  const [catToDelete, setCatToDelete] = useState<MediaCategory | null>(null);

  const [isDeletePortalModalOpen, setIsDeletePortalModalOpen] = useState(false);
  const [portalToDeleteIdx, setPortalToDeleteIdx] = useState<number | null>(null);

  // Categories addition form states
  const [newCatLabel, setNewCatLabel] = useState("");

  const { canAdd, canEdit, canDelete } = useAdminSecurity();
  const allowAdd = canAdd("/admin/multimedia");
  const allowEdit = canEdit("/admin/multimedia");
  const allowDelete = canDelete("/admin/multimedia");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    url: "",
    desc: "",
    speed: "Up to 100 Mbps",
    status: "Online" as "Online" | "Offline" | "Maintenance",
    image: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);

    // Fetch categories
    getSetting("multimedia_categories").then((saved) => {
      if (saved && Array.isArray(saved)) {
        setCategories(saved as MediaCategory[]);
      } else {
        setSetting("multimedia_categories", defaultCategories);
        setCategories(defaultCategories);
      }
    });

    // Fetch portals list
    getSetting("multimedia_list").then((saved) => {
      if (saved && Array.isArray(saved)) {
        setPortals(saved as MediaPortal[]);
      } else {
        setSetting("multimedia_list", defaultPortals);
        setPortals(defaultPortals);
      }
    });
  }, [router]);

  const handleOpenAddModal = () => {
    setEditingIndex(null);
    setFormData({
      name: "",
      category: categories[0]?.id || "ftp",
      url: "",
      desc: "",
      speed: "",
      status: "Online",
      image: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (portal: MediaPortal, idx: number) => {
    setEditingIndex(idx);
    setFormData({
      name: portal.name,
      category: portal.category || categories[0]?.id || "ftp",
      url: portal.url,
      desc: "",
      speed: "",
      status: portal.status || "Online",
      image: portal.image || "",
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Max allowed size is 5MB.");
      return;
    }

    setIsUploading(true);
    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/upload-header-asset", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, image: data.url }));
        toast.success("Portal image uploaded successfully!");
      } else {
        toast.error(data.error || "File upload failed.");
      }
    } catch {
      toast.error("File upload connection error.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.url || !formData.image) {
      toast.error("Please fill in all mandatory fields (Name, Link URL, Image).");
      return;
    }

    const newItem: MediaPortal = {
      name: formData.name,
      category: formData.category,
      url: formData.url,
      desc: "",
      speed: "",
      status: formData.status,
      image: formData.image,
    };

    let updated: MediaPortal[];
    if (editingIndex !== null) {
      updated = portals.map((p, i) => (i === editingIndex ? newItem : p));
      toast.success("Multimedia portal updated successfully.");
    } else {
      updated = [...portals, newItem];
      toast.success("New multimedia portal added successfully.");
    }

    setPortals(updated);
    await setSetting("multimedia_list", updated);
    setIsModalOpen(false);
  };

  const handleDelete = (idx: number) => {
    setPortalToDeleteIdx(idx);
    setIsDeletePortalModalOpen(true);
  };

  // Category addition handler
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const label = newCatLabel.trim();
    const slug = label.toLowerCase().replace(/[^a-z0-9]/g, "");

    if (!label || !slug) {
      toast.error("Please fill in the Category Label.");
      return;
    }

    if (categories.some((c) => c.id === slug)) {
      toast.error("A category with this name/label already exists.");
      return;
    }

    const updated = [...categories, { id: slug, label }];
    setCategories(updated);
    await setSetting("multimedia_categories", updated);
    setNewCatLabel("");
    toast.success(`Category "${label}" added successfully.`);
  };

  // Category deletion handler
  const handleDeleteCategory = (catId: string) => {
    if (categories.length <= 1) {
      toast.error("At least one category must remain configured.");
      return;
    }
    const cat = categories.find((c) => c.id === catId);
    if (cat) {
      setCatToDelete(cat);
      setIsDeleteCatModalOpen(true);
    }
  };

  if (!auth) return null;

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "ftp": return <Film className="w-3.5 h-3.5 text-blue-500" />;
      case "tv": return <Tv className="w-3.5 h-3.5 text-emerald-500" />;
      case "torrent": return <Download className="w-3.5 h-3.5 text-pink-500" />;
      case "gaming": return <Gamepad2 className="w-3.5 h-3.5 text-amber-500" />;
      default: return <HelpCircle className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const getCategoryLabel = (catId: string) => {
    return categories.find((c) => c.id === catId)?.label || catId;
  };

  const filteredPortals = selectedCategory === "all"
    ? portals
    : portals.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center gap-2.5">
        {allowEdit && (
          <button
            onClick={() => setIsCatModalOpen(true)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-4 text-xs font-bold text-slate-700 transition-all cursor-pointer active:scale-95 shadow-sm hover:bg-slate-50"
          >
            <Settings2 className="h-4 w-4 text-slate-500" />
            <span>Categories</span>
          </button>
        )}
        {allowAdd && (
          <button
            onClick={handleOpenAddModal}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-extrabold text-white hover:bg-blue-700 transition-all cursor-pointer shadow-md active:scale-95"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Portal</span>
          </button>
        )}
      </div>

      {/* Category selector row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 select-none scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            selectedCategory === "all"
              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all ${
              selectedCategory === cat.id
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <button
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className="cursor-pointer font-bold outline-none whitespace-nowrap"
            >
              {cat.label}
            </button>
            {selectedCategory === cat.id && (
              <div className="flex items-center gap-1 border-l border-current/25 pl-1.5 ml-0.5">
                {allowEdit && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCatToEdit(cat);
                      setEditCatLabel(cat.label);
                      setIsEditCatModalOpen(true);
                    }}
                    className="p-0.5 rounded hover:bg-black/10 transition-colors cursor-pointer outline-none"
                    title="Rename"
                  >
                    <Edit className="w-3 h-3 opacity-80 hover:opacity-100" />
                  </button>
                )}
                {allowDelete && (
                  <button
                    type="button"
                    onClick={async (e) => {
                      e.stopPropagation();
                      await handleDeleteCategory(cat.id);
                    }}
                    className="p-0.5 rounded hover:bg-black/10 transition-colors cursor-pointer outline-none"
                    title="Delete"
                  >
                    <X className="w-3 h-3 opacity-80 hover:opacity-100" />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pt-2">
        {filteredPortals.length === 0 ? (
          <div className="py-16 text-center text-slate-400 border border-dashed border-slate-200 rounded-2xl bg-white shadow-sm">
            <div className="flex flex-col items-center justify-center gap-2">
              <HelpCircle className="w-10 h-10 text-slate-350" />
              <span className="text-sm font-bold text-slate-600">No portals configured.</span>
              <p className="text-xs text-slate-400">Add a new portal to display it on the public page.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredPortals.map((portal, idx) => (
              <div 
                key={idx} 
                className="relative group hover:scale-[1.01] transition-all"
              >
                {/* Status Badge */}
                <span className={`absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-black border uppercase tracking-wider ${
                  portal.status === "Online" 
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                    : portal.status === "Maintenance"
                    ? "bg-amber-50 text-amber-700 border-amber-100"
                    : "bg-red-50 text-red-700 border-red-100"
                }`}>
                  {portal.status || "Online"}
                </span>
                
                {/* Action dropdown button */}
                <div className="absolute top-3.5 right-3.5 z-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button 
                        disabled={!allowEdit && !allowDelete}
                        className="inline-flex items-center justify-center p-1.5 hover:bg-slate-100 active:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer outline-none border border-transparent hover:border-slate-200/50 bg-white shadow-xs"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32 bg-white border border-slate-200 rounded-xl shadow-xl py-1">
                      {allowEdit && (
                        <DropdownMenuItem
                          onClick={() => handleOpenEditModal(portal, idx)}
                          className="px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                        >
                          <Edit className="w-3.5 h-3.5 text-slate-500" />
                          <span>Edit Info</span>
                        </DropdownMenuItem>
                      )}
                      {allowDelete && (
                        <DropdownMenuItem
                          onClick={() => handleDelete(idx)}
                          className="px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 cursor-pointer flex items-center gap-2"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Magic Card Wrapper */}
                <MagicCard
                  imageUrl={portal.image}
                  imageAlt={portal.name}
                  className="aspect-square p-6 rounded-3xl bg-white border border-slate-200/85 shadow-xs hover:shadow-md transition-all flex flex-col items-center justify-center text-center cursor-pointer"
                  onClick={() => {
                    if (portal.url) {
                      window.open(portal.url, "_blank");
                    }
                  }}
                >
                  <div className="flex flex-col items-center justify-center w-full h-full gap-3 p-1">
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <Image
                        src={portal.image || "/logo.png"}
                        alt={portal.name}
                        width={120}
                        height={120}
                        className="object-cover aspect-square rounded-2xl max-w-[85%] max-h-[85%]"
                      />
                    </div>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-800 leading-tight line-clamp-2 px-1">
                      {portal.name}
                    </p>
                    <div className="mt-1">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg border bg-slate-50 border-slate-150 text-[9px] font-black uppercase text-slate-500">
                        {getCategoryIcon(portal.category)}
                        <span>{getCategoryLabel(portal.category)}</span>
                      </span>
                    </div>
                  </div>
                </MagicCard>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Categories Manager Modal Dialog */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-100 shadow-2xl rounded-3xl p-6 sm:p-7 max-w-md w-full space-y-5 text-left relative my-8">
            <button
              onClick={() => setIsCatModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 transition-colors p-1.5 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5">
              <h3 className="text-slate-900 font-extrabold text-lg uppercase tracking-wider">Configure Categories</h3>
              <p className="text-xs text-slate-500 font-medium">Add custom categories for public media portal indexing.</p>
            </div>

            {/* Add inline form */}
            <form onSubmit={handleAddCategory} className="space-y-3.5 border-t border-slate-100 pt-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Label Name</label>
                <input
                  type="text"
                  required
                  value={newCatLabel}
                  onChange={(e) => setNewCatLabel(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. HD Movies"
                />
              </div>
              <button
                type="submit"
                className="w-full flex h-9 items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition-all shadow-xs"
              >
                <PlusCircle className="w-4 h-4" /> Add Category
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Dialog Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-100 shadow-2xl rounded-3xl p-6 sm:p-7 max-w-lg w-full space-y-5 text-left relative my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 transition-colors p-1.5 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5">
              <h3 className="text-slate-900 font-extrabold text-lg uppercase tracking-wider">
                {editingIndex !== null ? "Edit Portal" : "Add Portal"}
              </h3>
              <p className="text-xs text-slate-500 font-medium">Configure details for local caching and streaming portals.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Portal Image Logo</label>
                <div className="flex items-center gap-4">
                  {formData.image ? (
                    <div className="relative w-16 h-16 rounded-xl border border-slate-200 overflow-hidden flex-shrink-0 bg-slate-50">
                      <Image
                        src={formData.image}
                        alt="Preview"
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: "" })}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-white"
                        title="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl border border-dashed border-slate-250 flex items-center justify-center flex-shrink-0 bg-slate-50 text-[10px] text-slate-450 font-bold uppercase tracking-wide">
                      No Image
                    </div>
                  )}

                  <label className="flex items-center justify-center gap-1.5 px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-655 cursor-pointer transition-all active:scale-95 shadow-sm">
                    {isUploading ? (
                      <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    <span>{isUploading ? "Uploading..." : "Upload Image"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Portal Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-855 focus:outline-none focus:border-blue-500 font-semibold transition-all"
                    placeholder="e.g. M Amin Movies"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-bold transition-all"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Link URL</label>
                <input
                  type="text"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-855 focus:outline-none focus:border-blue-500 font-mono transition-all"
                  placeholder="e.g. http://ftp.m-aminnetwork.com"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Portal Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "Online" | "Offline" | "Maintenance" })}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-bold transition-all"
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              <div className="flex justify-end gap-2.5 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm shadow-blue-200"
                >
                  Save Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Category Confirmation Modal */}
      {isDeleteCatModalOpen && catToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-slate-100 shadow-2xl rounded-3xl p-6 sm:p-7 max-w-sm w-full space-y-4 text-left relative">
            <div className="flex items-center gap-3 text-red-600">
              <div className="p-2 bg-red-50 rounded-xl">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-slate-900 font-extrabold text-base uppercase tracking-wider">Delete Category</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Are you sure you want to delete the category <span className="font-extrabold text-slate-800">&quot;{catToDelete.label}&quot;</span>? All portals referencing this category will fall back to default settings.
            </p>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteCatModalOpen(false);
                  setCatToDelete(null);
                }}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  const updated = categories.filter((c) => c.id !== catToDelete.id);
                  setCategories(updated);
                  await setSetting("multimedia_categories", updated);
                  toast.success("Category deleted successfully.");
                  setIsDeleteCatModalOpen(false);
                  setCatToDelete(null);
                  if (selectedCategory === catToDelete.id) {
                    setSelectedCategory("all");
                  }
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm shadow-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Rename Category Modal */}
      {isEditCatModalOpen && catToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-slate-100 shadow-2xl rounded-3xl p-6 sm:p-7 max-w-sm w-full space-y-4 text-left relative">
            <button
              onClick={() => {
                setIsEditCatModalOpen(false);
                setCatToEdit(null);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 transition-colors p-1.5 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-1">
              <h3 className="text-slate-900 font-extrabold text-base uppercase tracking-wider">Rename Category</h3>
              <p className="text-xs text-slate-500 font-medium">Change the label name of your category.</p>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 uppercase">New Label Name</label>
              <input
                type="text"
                required
                value={editCatLabel}
                onChange={(e) => setEditCatLabel(e.target.value)}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                placeholder="e.g. Movie Servers"
              />
            </div>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsEditCatModalOpen(false);
                  setCatToEdit(null);
                }}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  const label = editCatLabel.trim();
                  if (label !== "") {
                    const updated = categories.map((c) =>
                      c.id === catToEdit.id ? { ...c, label } : c
                    );
                    setCategories(updated);
                    await setSetting("multimedia_categories", updated);
                    toast.success("Category renamed successfully.");
                    setIsEditCatModalOpen(false);
                    setCatToEdit(null);
                  } else {
                    toast.error("Label name cannot be empty.");
                  }
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm shadow-blue-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Portal Confirmation Modal */}
      {isDeletePortalModalOpen && portalToDeleteIdx !== null && portals[portalToDeleteIdx] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-slate-100 shadow-2xl rounded-3xl p-6 sm:p-7 max-w-sm w-full space-y-4 text-left relative">
            <div className="flex items-center gap-3 text-red-600">
              <div className="p-2 bg-red-50 rounded-xl">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-slate-900 font-extrabold text-base uppercase tracking-wider">Delete Portal</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Are you sure you want to permanently delete the multimedia portal <span className="font-extrabold text-slate-800">&quot;{portals[portalToDeleteIdx].name}&quot;</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsDeletePortalModalOpen(false);
                  setPortalToDeleteIdx(null);
                }}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  const updated = portals.filter((_, i) => i !== portalToDeleteIdx);
                  setPortals(updated);
                  await setSetting("multimedia_list", updated);
                  toast.success("Portal deleted successfully.");
                  setIsDeletePortalModalOpen(false);
                  setPortalToDeleteIdx(null);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm shadow-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
