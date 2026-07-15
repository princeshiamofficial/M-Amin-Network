"use client";
import { toast } from "sonner";

import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useAdminSecurity } from "@/hooks/useAdminSecurity";
import { getSetting, setSetting } from "@/actions/content";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {
  Pencil,
  Trash2,
  Upload,
  Image as ImageIcon,
  Eye,
  Copy,
  Play,
  Pause,
  RefreshCw,
  Download
} from "lucide-react";

interface PromoOffer {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  details: string;
  code: string;
  validUntil: string;
  imageUrl: string;
  terms?: string;
  note?: string;
  status: "Active" | "Scheduled" | "Draft" | "Expired" | "Disabled";
  createdAt: string;
  htmlDetails?: string;
}

type PromoOfferRecord = Record<string, unknown>;

const getStringValue = (item: PromoOfferRecord, keys: string[], fallback = "") => {
  for (const key of keys) {
    const value = item[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return fallback;
};

const getFallbackPromoCode = (record: PromoOfferRecord, index: number) => {
  const title = getStringValue(record, ["title", "campaignTitle", "campaign_title", "name"], `OFFER ${index + 1}`);
  const slug = title
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${slug || "OFFER"}-${index + 1}`;
};

const getUniquePromoCode = (code: string, usedCodes: Set<string>) => {
  let uniqueCode = code;
  let counter = 2;

  while (usedCodes.has(uniqueCode)) {
    uniqueCode = `${code}-${counter}`;
    counter += 1;
  }

  usedCodes.add(uniqueCode);
  return uniqueCode;
};

const normalizePromoOffer = (item: unknown, index = 0, usedCodes = new Set<string>()): PromoOffer => {
  const record = item && typeof item === "object" ? item as PromoOfferRecord : {};
  const badge = getStringValue(record, ["badge", "category"], "Promotion");
  const rawCode = getStringValue(record, ["code", "promoCode", "promo_code", "couponCode", "coupon_code", "coupon"]).toUpperCase();
  const code = getUniquePromoCode(rawCode || getFallbackPromoCode(record, index), usedCodes);
  
  const id = getStringValue(record, ["id", "campaignId"], `CMP-00${index + 1}`);
  const rawStatus = getStringValue(record, ["status"], "Active");
  const status = ["Active", "Scheduled", "Draft", "Expired", "Disabled"].includes(rawStatus)
    ? (rawStatus as "Active" | "Scheduled" | "Draft" | "Expired" | "Disabled")
    : "Active";
  const createdAt = getStringValue(record, ["createdAt", "created_at", "created"], new Date().toISOString());

  return {
    id,
    title: getStringValue(record, ["title", "campaignTitle", "campaign_title", "name"], "Untitled Campaign"),
    badge,
    badgeColor: getStringValue(record, ["badgeColor", "badge_color"], "bg-slate-500/10 border-slate-500/30 text-slate-400"),
    details: getStringValue(record, ["details", "description", "desc"]),
    code,
    validUntil: getStringValue(record, ["validUntil", "valid_until", "validity", "expiresAt", "expires_at"], "Ongoing Promotion"),
    imageUrl: getStringValue(record, ["imageUrl", "image_url", "image", "thumbnail"], "/offer-card-banner.png"),
    terms: getStringValue(record, ["terms", "terms_and_conditions"]),
    note: getStringValue(record, ["note"]),
    status,
    createdAt,
    htmlDetails: getStringValue(record, ["htmlDetails", "html_details", "htmlDesc", "html_desc", "htmlCode", "html_code", "html"]),
  };
};

const normalizePromoOffers = (offers: unknown): PromoOffer[] => {
  if (!Array.isArray(offers)) return [];
  const usedCodes = new Set<string>();
  return offers.map((offer, index) => normalizePromoOffer(offer, index, usedCodes));
};

const defaultPromoOffers: PromoOffer[] = [
  {
    id: "CMP-001",
    title: "Zero Installation Fee",
    badge: "New Connection",
    badgeColor: "bg-brand-cyan/15 border-brand-cyan/30 text-brand-cyan",
    details: "Subscribe to any 20 Mbps or higher home internet package for a minimum contract of 6 months, and get standard installation & optical fiber line connection completely free (saves ৳1,000 BDT).",
    code: "FREEINSTALL2026",
    validUntil: "31 Dec 2026",
    imageUrl: "/offer-card-banner.png",
    status: "Active",
    createdAt: new Date("2026-07-16T00:00:00.000Z").toISOString(),
  },
  {
    id: "CMP-002",
    title: "Pay 10 Months, Get 12",
    badge: "Best Value",
    badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 animate-pulse",
    details: "Pay for 10 months upfront on any Home Broadband or Gamer Pack plan, and get an additional 2 months of subscription completely free (saves up to ৳3,000 BDT).",
    code: "ANNUAL10",
    validUntil: "Ongoing Promotion",
    imageUrl: "/offer-card-banner.png",
    status: "Active",
    createdAt: new Date("2026-07-15T00:00:00.000Z").toISOString(),
  },
  {
    id: "CMP-003",
    title: "Free Public IP for Gamers",
    badge: "Gamer Special",
    badgeColor: "bg-brand-blue/15 border-brand-blue/30 text-brand-blue",
    details: "Subscribe to the 30 Mbps Gamer Pack or higher and receive a dedicated Static Public IP address for hosting lobbies and obtaining lowest pings at 0 extra monthly cost (saves ৳150/month).",
    code: "GAMERIP",
    validUntil: "31 Oct 2026",
    imageUrl: "/offer-card-banner.png",
    status: "Scheduled",
    createdAt: new Date("2026-07-12T00:00:00.000Z").toISOString(),
  },
  {
    id: "CMP-004",
    title: "Refer a Friend",
    badge: "Community Deal",
    badgeColor: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    details: "Refer a neighbor or friend in South Keraniganj. Once their connection is activated, both you and your referred friend get a 50% discount on your next month's internet bill.",
    code: "REFER50",
    validUntil: "Ongoing Promotion",
    imageUrl: "/offer-card-banner.png",
    status: "Draft",
    createdAt: new Date("2026-07-10T00:00:00.000Z").toISOString(),
  },
];

const isDefaultButtonsOnly = (html?: string): boolean => {
  if (!html) return false;
  const text = html.replace(/<[^>]*>/g, "").trim();
  return text.length < 80 && (html.includes("/packages") || html.includes("/contact"));
};

const emptyPromoForm = {
  id: "",
  title: "",
  badge: "Promotion",
  badgeColor: "",
  details: "",
  code: "",
  validUntil: "Ongoing Promotion",
  imageUrl: "",
  terms: "",
  note: "",
  status: "Active" as "Active" | "Scheduled" | "Draft" | "Expired" | "Disabled",
  createdAt: "",
  htmlDetails: "",
};

export default function OffersPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { canAdd, canEdit, canDelete } = useAdminSecurity();
  const allowAdd = canAdd("/admin/offers");
  const allowEdit = canEdit("/admin/offers");
  const allowDelete = canDelete("/admin/offers");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const sortBy = "newest";

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(25); // Standard layout row count

  // Campaigns Data State
  const [promoOffers, setPromoOffers] = useState<PromoOffer[]>([]);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [promoFormIndex, setPromoFormIndex] = useState<number | null>(null);
  const [promoFormData, setPromoFormData] = useState(emptyPromoForm);
  const [promoImageFile, setPromoImageFile] = useState<File | null>(null);
  const [promoImagePreview, setPromoImagePreview] = useState(emptyPromoForm.imageUrl);
  const [isUploadingPromoImage, setIsUploadingPromoImage] = useState(false);

  // Auxiliary Preview & Confirmation Modals
  const [selectedOfferForPreview, setSelectedOfferForPreview] = useState<PromoOffer | null>(null);
  const [selectedImageForPreview, setSelectedImageForPreview] = useState<string | null>(null);
  const [deleteConfirmIndex, setDeleteConfirmIndex] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin");
      return;
    }
    setTimeout(() => setIsAuthenticated(true), 50);

    // Load promo campaigns
    getSetting("promo_offers").then(savedOffers => {
      const normalizedOffers = normalizePromoOffers(savedOffers);
      if (normalizedOffers.length > 0) {
        setPromoOffers(normalizedOffers);
      } else {
        setSetting("promo_offers", defaultPromoOffers);
        setPromoOffers(defaultPromoOffers);
      }
      setIsLoading(false);
    });
  }, [router]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortBy]);

  // --- Campaign Processing Filters & Sort ---
  const filteredOffers = promoOffers.filter((o) => {
    const matchSearch =
      o.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = statusFilter === "All Status" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sortBy === "title-asc") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === "title-desc") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  // --- Pagination Slice ---
  const totalCampaigns = sortedOffers.length;
  const totalPages = Math.ceil(totalCampaigns / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalCampaigns);
  const paginatedOffers = sortedOffers.slice(startIndex, endIndex);

  // --- Handlers ---
  const resetPromoForm = () => {
    setPromoFormData(emptyPromoForm);
    setPromoFormIndex(null);
    setPromoImageFile(null);
    setPromoImagePreview(emptyPromoForm.imageUrl);
  };

  const handlePromoImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setPromoImageFile(file);
    setPromoImagePreview(URL.createObjectURL(file));
  };

  const uploadPromoImage = async () => {
    if (!promoImageFile) return promoFormData.imageUrl || "";

    const formData = new FormData();
    formData.append("file", promoImageFile);

    const response = await fetch("/api/upload-offer-image", {
      method: "POST",
      body: formData,
      cache: "no-store",
    });
    const result = await response.json() as { url?: string; error?: string };

    if (!response.ok || !result.url) {
      throw new Error(result.error || "Offer image upload failed.");
    }
    return result.url;
  };

  const handleSavePromoOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window === "undefined") return;

    let codeUpper = promoFormData.code ? promoFormData.code.toUpperCase().trim() : "";
    if (!codeUpper) {
      codeUpper = promoFormData.title.toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      if (!codeUpper) {
        codeUpper = `CAMPAIGN-${Date.now().toString().slice(-6)}`;
      }
    }
    if (promoOffers.some((o, index) => o.code === codeUpper && index !== promoFormIndex)) {
      codeUpper = `${codeUpper}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    }

    let badgeColor = promoFormData.badgeColor;
    if (!badgeColor) {
      badgeColor = "bg-slate-500/10 border-slate-500/30 text-slate-400";
    }

    setIsUploadingPromoImage(true);
    let imageUrl = promoFormData.imageUrl || "";
    try {
      imageUrl = await uploadPromoImage();
    } catch (error) {
      toast(error instanceof Error ? error.message : "Offer image upload failed.");
      setIsUploadingPromoImage(false);
      return;
    }

    const offerData: PromoOffer = {
      id: promoFormData.id || `CMP-00${promoOffers.length + 1}`,
      title: promoFormData.title,
      badge: promoFormData.badge || "Promotion",
      badgeColor,
      details: promoFormData.details,
      code: codeUpper,
      validUntil: promoFormData.validUntil || "Ongoing Promotion",
      imageUrl,
      terms: promoFormData.terms || "",
      note: promoFormData.note || "",
      status: promoFormData.status || "Active",
      createdAt: promoFormData.createdAt || new Date().toISOString(),
      htmlDetails: promoFormData.htmlDetails || "",
    };

    let updated: PromoOffer[];
    if (promoFormIndex !== null) {
      updated = [...promoOffers];
      updated[promoFormIndex] = offerData;
    } else {
      updated = [offerData, ...promoOffers];
    }
    updated = normalizePromoOffers(updated);

    const saved = await setSetting("promo_offers", updated);
    if (!saved) {
      toast("Campaign could not be saved to database. Please try again.");
      setIsUploadingPromoImage(false);
      return;
    }

    const refreshedOffers = normalizePromoOffers(await getSetting("promo_offers"));
    setPromoOffers(refreshedOffers.length > 0 ? refreshedOffers : updated);
    setPromoImageFile(null);
    setPromoImagePreview(imageUrl);
    setIsUploadingPromoImage(false);
    setIsPromoModalOpen(false);
    toast(promoFormIndex !== null ? "Campaign updated successfully!" : "New campaign created successfully!");
  };

  const handleDuplicatePromoOffer = async (offer: PromoOffer) => {
    const duplicated: PromoOffer = {
      ...offer,
      id: `CMP-00${promoOffers.length + 1}`,
      title: `${offer.title} (Copy)`,
      code: `${offer.code}-COPY`,
      createdAt: new Date().toISOString(),
      status: "Draft",
    };

    const codes = new Set(promoOffers.map(o => o.code));
    duplicated.code = getUniquePromoCode(duplicated.code, codes);

    const updated = [duplicated, ...promoOffers];
    const saved = await setSetting("promo_offers", updated);
    if (!saved) {
      toast("Failed to duplicate campaign. Please try again.");
      return;
    }
    setPromoOffers(updated);
    toast("Campaign duplicated as Draft successfully!");
  };

  const handleTogglePause = async (originalIndex: number) => {
    const updated = [...promoOffers];
    const target = updated[originalIndex];
    if (target.status === "Active") {
      target.status = "Disabled";
      toast(`Campaign "${target.title}" has been paused.`);
    } else {
      target.status = "Active";
      toast(`Campaign "${target.title}" is now active.`);
    }

    const saved = await setSetting("promo_offers", updated);
    if (!saved) {
      toast("Failed to update status. Please try again.");
      return;
    }
    setPromoOffers(updated);
  };

  const handleRefreshCampaigns = async () => {
    setIsRefreshing(true);
    try {
      const data = await getSetting("promo_offers");
      const normalized = normalizePromoOffers(data);
      if (normalized.length > 0) {
        setPromoOffers(normalized);
      }
      toast("Campaign list refreshed from server.");
    } catch {
      toast("Failed to refresh database data.");
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const handleExportCampaigns = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(promoOffers, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `promo_campaigns_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      toast("Campaigns exported as JSON successfully.");
    } catch {
      toast("Export failed. Please try again.");
    }
  };

  const getStatusBadge = (status: PromoOffer["status"]) => {
    switch (status) {
      case "Active":
        return (
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold whitespace-nowrap">
            ● Active
          </span>
        );
      case "Scheduled":
        return (
          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-750 text-xs font-semibold whitespace-nowrap">
            ● Scheduled
          </span>
        );
      case "Draft":
        return (
          <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold whitespace-nowrap">
            ● Draft
          </span>
        );
      case "Expired":
        return (
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold whitespace-nowrap">
            ● Expired
          </span>
        );
      case "Disabled":
        return (
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold whitespace-nowrap">
            ● Disabled
          </span>
        );
      default:
        return null;
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="w-full font-sans">
      {/* ── TOP HEADER ── */}
      <div className="flex justify-between items-center mb-8 select-none">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Promo Campaigns</h1>
          <p className="text-gray-500 mt-1 text-xs sm:text-sm font-medium">
            Manage promotional campaigns and discounts.
          </p>
        </div>

        {allowAdd && (
          <button
            onClick={() => {
              resetPromoForm();
              setIsPromoModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg font-semibold text-xs transition duration-200 cursor-pointer active:scale-95 shrink-0"
          >
            + New Campaign
          </button>
        )}
      </div>

      {/* ── TOOLBAR ── */}
      <div className="bg-white rounded-2xl shadow-sm border p-5 mb-6 select-none border-slate-200">
        <div className="flex flex-wrap gap-4 items-stretch">
          <input
            type="text"
            placeholder="Search campaign..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-xs text-slate-800 placeholder-slate-400 border-slate-200"
          />

          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-xl px-4 text-xs font-semibold text-slate-700 border-slate-200 cursor-pointer outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Expired">Expired</option>
            <option value="Disabled">Disabled</option>
          </select>

          <button 
            onClick={handleRefreshCampaigns}
            className="border px-5 rounded-xl text-xs font-bold text-slate-650 hover:bg-slate-50 transition border-slate-200 cursor-pointer active:scale-95 flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button 
            onClick={handleExportCampaigns}
            className="border px-5 rounded-xl text-xs font-bold text-slate-650 hover:bg-slate-50 transition border-slate-200 cursor-pointer active:scale-95 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* ── CAMPAIGNS MAIN LAYOUT / TABLE ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {isLoading ? (
          /* Table Skeleton Loader */
          <div className="p-6 space-y-4">
            <div className="h-6 w-1/4 bg-slate-100 rounded-md animate-pulse" />
            <div className="space-y-2.5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 py-3 border-b border-slate-100">
                  <div className="w-16 h-16 bg-slate-100 rounded-xl animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/3 bg-slate-100 rounded-md animate-pulse" />
                    <div className="h-3 w-1/2 bg-slate-100 rounded-md animate-pulse" />
                  </div>
                  <div className="h-6 w-16 bg-slate-100 rounded-full animate-pulse" />
                  <div className="h-6 w-12 bg-slate-100 rounded-md animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ) : filteredOffers.length === 0 ? (
          /* Empty State Layout */
          <div className="py-16 px-4 text-center max-w-md mx-auto space-y-4">
            <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-slate-400 mx-auto">
              <ImageIcon className="w-10 h-10 opacity-60" />
            </div>
            <div className="space-y-1">
              <h3 className="text-slate-900 font-extrabold text-base">No Campaigns Found</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                No promotions match your search filter settings. Create a new campaign to begin.
              </p>
            </div>
            {allowAdd && (
              <button
                onClick={() => {
                  resetPromoForm();
                  setIsPromoModalOpen(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 inline-flex items-center gap-1 cursor-pointer"
              >
                + Create Campaign
              </button>
            )}
          </div>
        ) : (
          /* Main Table */
          <Table className="w-full">
            <TableHeader className="bg-gray-50 border-b border-slate-200">
              <TableRow className="text-left text-gray-500 text-xs font-bold uppercase tracking-wider">
                <TableHead className="p-5 font-bold">Campaign</TableHead>
                <TableHead className="font-bold">Image</TableHead>
                <TableHead className="font-bold">Description</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Created</TableHead>
                <TableHead className="text-right pr-8 font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-slate-100">
              {paginatedOffers.map(({ id, title, badge, badgeColor, details, code, validUntil, imageUrl, terms, note, status, createdAt, htmlDetails }) => {
                const originalIndex = promoOffers.findIndex((o) => o.id === id);
                return (
                  <TableRow key={id} className="hover:bg-blue-50 transition duration-150">
                    <td className="p-5 font-semibold text-slate-900">
                      <div className="font-semibold text-sm">{title}</div>
                    </td>
                    <td className="py-4">
                      <div 
                        onClick={() => setSelectedImageForPreview(imageUrl || "/offer-card-banner.png")}
                        className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-150 bg-slate-50 cursor-zoom-in hover:scale-105 transition-transform duration-200"
                      >
                        <Image
                          src={imageUrl || "/offer-card-banner.png"}
                          alt={title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="text-gray-650 max-w-sm text-xs leading-relaxed py-4 pr-4">
                      <div className="line-clamp-2" title={details}>{details}</div>
                    </td>
                    <td>
                      {getStatusBadge(status)}
                    </td>
                    <td className="text-gray-500 text-xs font-semibold whitespace-nowrap pr-4">
                      {new Date(createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="text-right pr-8">
                      {(allowEdit || allowDelete || allowAdd) && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="text-gray-550 text-2xl font-bold hover:text-slate-800 transition-colors p-1 rounded-md hover:bg-slate-100 cursor-pointer focus:outline-none">
                              ⋮
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-30 font-sans">
                            <DropdownMenuItem
                              onClick={() => setSelectedOfferForPreview({ id, title, badge, badgeColor, details, code, validUntil, imageUrl, terms, note, status, createdAt })}
                              className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                            >
                              <Eye className="w-3.5 h-3.5 text-slate-400" />
                              <span>View Detail</span>
                            </DropdownMenuItem>
                            {allowEdit && (
                              <DropdownMenuItem
                                onClick={() => {
                                  setPromoFormData({ id, title, badge, badgeColor, details, code, validUntil, imageUrl, terms: terms || "", note: note || "", status, createdAt, htmlDetails: htmlDetails || "" });
                                  setPromoFormIndex(originalIndex);
                                  setPromoImageFile(null);
                                  setPromoImagePreview(imageUrl || "");
                                  setIsPromoModalOpen(true);
                                }}
                                className="px-3.5 py-2 text-xs font-bold text-brand-blue hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                              >
                                <Pencil className="w-3.5 h-3.5 text-brand-blue/80" />
                                <span>Edit Campaign</span>
                              </DropdownMenuItem>
                            )}
                            {allowAdd && (
                              <DropdownMenuItem
                                onClick={() => handleDuplicatePromoOffer({ id, title, badge, badgeColor, details, code, validUntil, imageUrl, terms, note, status, createdAt })}
                                className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                              >
                                <Copy className="w-3.5 h-3.5 text-slate-400" />
                                <span>Duplicate</span>
                              </DropdownMenuItem>
                            )}
                            {allowEdit && (
                              <DropdownMenuItem
                                onClick={() => handleTogglePause(originalIndex)}
                                className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                              >
                                {status === "Active" ? (
                                  <>
                                    <Pause className="w-3.5 h-3.5 text-slate-400" />
                                    <span>Pause</span>
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-3.5 h-3.5 text-emerald-550" />
                                    <span>Resume</span>
                                  </>
                                )}
                              </DropdownMenuItem>
                            )}
                            {allowDelete && (
                              <DropdownMenuItem
                                onClick={() => setDeleteConfirmIndex(originalIndex)}
                                className="px-3.5 py-2 text-xs font-bold text-red-650 hover:bg-red-50 cursor-pointer flex items-center gap-2"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-red-650/80" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </td>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      {/* ── PAGINATION ── */}
      {!isLoading && filteredOffers.length > 0 && (
        <div className="flex justify-between items-center mt-6 select-none">
          <p className="text-gray-500 text-xs sm:text-sm font-semibold">
            Showing {startIndex + 1}–{endIndex} of {totalCampaigns} campaigns
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border px-4 py-2 rounded-lg text-xs font-bold text-slate-600 border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, idx) => {
              const pg = idx + 1;
              return (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition duration-150 cursor-pointer ${
                    currentPage === pg
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 text-slate-650 hover:bg-slate-50"
                  }`}
                >
                  {pg}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="border px-4 py-2 rounded-lg text-xs font-bold text-slate-600 border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* ── ADD/EDIT CAMPAIGN MODAL ── */}
      <Dialog.Root open={isPromoModalOpen} onOpenChange={setIsPromoModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-[9999] max-w-2xl w-full translate-x-[-50%] translate-y-[-50%] bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] font-sans data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <Dialog.Title className="text-slate-900 font-extrabold text-base">
                {promoFormIndex !== null ? "✏ Modify Promotional Campaign" : "➕ Add New Promotional Campaign"}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  className="text-slate-400 hover:text-slate-950 p-1 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer outline-none"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Description className="sr-only">Form to add or edit a promotional campaign.</Dialog.Description>
            
            <form onSubmit={handleSavePromoOffer} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Campaign Title</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Free Optical ONT Setup" 
                    value={promoFormData.title}
                    onChange={(e) => setPromoFormData({ ...promoFormData, title: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue font-medium" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Campaign Status</label>
                  <select 
                    value={promoFormData.status}
                    onChange={(e) => setPromoFormData({ ...promoFormData, status: e.target.value as PromoOffer["status"] })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue cursor-pointer font-bold font-sans"
                  >
                    <option value="Active">🟢 Active</option>
                    <option value="Scheduled">🟠 Scheduled</option>
                    <option value="Draft">🔵 Draft</option>
                    <option value="Expired">🔴 Expired</option>
                    <option value="Disabled">⚫ Disabled</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-bold flex items-center gap-1.5">
                  <span>Campaign Description</span>
                  <span className="text-[10px] font-normal text-slate-400">(Plain text preview for listing card - Optional)</span>
                </label>
                <textarea 
                  rows={2} 
                  placeholder="e.g. Up to 40% discount on all food items during summer campaign."
                  value={promoFormData.details}
                  onChange={(e) => setPromoFormData({ ...promoFormData, details: e.target.value })}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue resize-none font-medium" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-bold flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <span>HTML Description</span>
                    <span className="text-[10px] font-normal text-slate-400">(Custom HTML, CSS, JS layout for detail page - Optional)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const buttonHtml = `<div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:24px;">\n  <a href="/packages" style="display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:12px 24px; background-color:#0082C4; color:#ffffff; font-weight:bold; border-radius:12px; text-decoration:none; font-size:14px; box-shadow:0 4px 6px -1px rgba(0,130,196,0.1), 0 2px 4px -1px rgba(0,130,196,0.06);">View Packages</a>\n  <a href="/contact" style="display:inline-flex; align-items:center; justify-content:center; padding:12px 24px; border:1px solid #e2e8f0; background-color:#ffffff; color:#334155; font-weight:bold; border-radius:12px; text-decoration:none; font-size:14px;">Contact Us to Claim</a>\n</div>`;
                      setPromoFormData({
                        ...promoFormData,
                        htmlDetails: promoFormData.htmlDetails 
                          ? `${promoFormData.htmlDetails}\n${buttonHtml}`
                          : buttonHtml
                      });
                    }}
                    className="text-[10px] font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer hover:underline focus:outline-none"
                  >
                    + Insert Buttons HTML
                  </button>
                </label>
                <textarea 
                  rows={4} 
                  placeholder="Provide HTML snippet or rich style sheet markup..."
                  value={promoFormData.htmlDetails}
                  onChange={(e) => setPromoFormData({ ...promoFormData, htmlDetails: e.target.value })}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue resize-none font-medium" 
                />
              </div>


              <div className="space-y-2">
                <label className="text-slate-700 font-bold block mb-2">Offer Image</label>
                <div className="w-full">
                  <label className="relative block h-32 overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 cursor-pointer hover:border-brand-blue hover:bg-blue-50/40 transition-all group">
                    {promoImagePreview ? (
                      <>
                        <Image
                          src={promoImagePreview}
                          alt={promoFormData.title || "Offer image preview"}
                          fill
                          sizes="224px"
                          className="object-cover transition-opacity group-hover:opacity-40"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-brand-blue text-[10px] font-bold uppercase tracking-wider bg-white/90 px-3 py-1.5 rounded-md shadow-sm">Change Image</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col h-full items-center justify-center text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-brand-blue transition-colors">
                        <ImageIcon className="w-5 h-5 opacity-40 mb-1 group-hover:opacity-100 transition-opacity" />
                        <span className="text-[11px]">Upload Image</span>
                        <span className="text-[9px] normal-case font-medium mt-1">Click to browse</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={handlePromoImageChange}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100 justify-end">
                <button 
                  type="button" 
                  onClick={() => setIsPromoModalOpen(false)} 
                  className="px-5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-705 font-bold rounded-xl text-xs cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isUploadingPromoImage} 
                  className="px-5 py-3 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                >
                  {isUploadingPromoImage ? "Saving..." : promoFormIndex !== null ? "Save Changes" : "Create Campaign"}
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* ── VIEW DETAIL PREVIEW MODAL ── */}
      <Dialog.Root open={!!selectedOfferForPreview} onOpenChange={(open) => !open && setSelectedOfferForPreview(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/45 backdrop-blur-xs z-[9999] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-[9999] max-w-2xl w-full translate-x-[-50%] translate-y-[-50%] bg-white border border-slate-200/90 shadow-2xl rounded-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto font-sans data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-200">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 bg-slate-50 border border-slate-150 px-2 py-0.5 rounded-md">
                  CAMPAIGN PREVIEW
                </span>
                <Dialog.Title className="text-slate-900 font-extrabold text-lg mt-1">{selectedOfferForPreview?.title}</Dialog.Title>
              </div>
              <Dialog.Close asChild>
                <button
                  className="text-slate-400 hover:text-slate-950 p-1 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer outline-none"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Description className="sr-only">Detailed preview of the promotional campaign.</Dialog.Description>
            
            <div className="space-y-4">
              <div className="relative h-48 w-full overflow-hidden rounded-xl bg-slate-50 border border-slate-100">
                <Image
                  src={selectedOfferForPreview.imageUrl || "/offer-card-banner.png"}
                  alt={selectedOfferForPreview.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs border-b border-slate-100 pb-4">
                <div>
                  <span className="text-slate-400 block font-bold uppercase tracking-wider text-[10px]">Campaign ID</span>
                  <span className="text-slate-800 font-semibold">{selectedOfferForPreview.id}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold uppercase tracking-wider text-[10px]">Status</span>
                  <span className="mt-0.5 inline-block">{getStatusBadge(selectedOfferForPreview.status)}</span>
                </div>
              </div>

              {selectedOfferForPreview.htmlDetails && selectedOfferForPreview.htmlDetails.trim() && isDefaultButtonsOnly(selectedOfferForPreview.htmlDetails) && selectedOfferForPreview.details && selectedOfferForPreview.details.trim() && (
                <div className="text-xs text-slate-650 leading-relaxed max-w-none font-sans font-medium">
                  {selectedOfferForPreview.details}
                </div>
              )}

              {selectedOfferForPreview.htmlDetails && selectedOfferForPreview.htmlDetails.trim() ? (
                <div className="w-full">
                  <iframe
                    title="Campaign Preview HTML Content"
                    srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><base target="_parent"/><style>html,body{overflow:hidden;margin:0;padding:0;background-color:transparent;}body{font-family:sans-serif;font-size:13px;color:#334155;line-height:1.5;}</style></head><body>${selectedOfferForPreview.htmlDetails}</body></html>`}
                    className="w-full border-none bg-transparent overflow-hidden"
                    style={{ height: "100px" }}
                    scrolling="no"
                    onLoad={(e) => {
                      try {
                        const iframe = e.currentTarget;
                        const doc = iframe.contentDocument || iframe.contentWindow?.document;
                        if (doc && doc.body) {
                          const getHeight = () => Math.max(
                            doc.body.scrollHeight,
                            doc.body.offsetHeight,
                            doc.documentElement.clientHeight,
                            doc.documentElement.scrollHeight,
                            doc.documentElement.offsetHeight
                          );
                          iframe.style.height = getHeight() + "px";
                          const observer = new ResizeObserver(() => {
                            iframe.style.height = getHeight() + "px";
                          });
                          observer.observe(doc.body);
                        }
                      } catch {
                        // ignore sandbox blocks
                      }
                    }}
                  />
                </div>
              ) : (
                <div 
                  className="text-xs text-slate-650 leading-relaxed max-w-none font-sans"
                  dangerouslySetInnerHTML={{ __html: selectedOfferForPreview.details || "Full offer details are available at our office." }}
                />
              )}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedOfferForPreview(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-950 text-white font-bold rounded-xl text-xs cursor-pointer shadow-sm"
              >
                Close Preview
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* ── IMAGE ZOOM MODAL ── */}
      <Dialog.Root open={!!selectedImageForPreview} onOpenChange={(open) => !open && setSelectedImageForPreview(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-xs z-[9999] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-[9999] max-w-4xl w-full translate-x-[-50%] translate-y-[-50%] max-h-[85vh] overflow-hidden rounded-2xl bg-black border border-slate-800 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-200">
            <Dialog.Title className="sr-only">Image Zoom Preview</Dialog.Title>
            <Dialog.Description className="sr-only">Full view of the selected image.</Dialog.Description>
            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/80 p-2 rounded-full transition-colors cursor-pointer z-10 outline-none"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </Dialog.Close>
            <div className="relative w-full h-[70vh]">
              <Image
                src={selectedImageForPreview}
                alt="Campaign Full View"
                fill
                className="object-contain"
              />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* ── INLINE CUSTOM DELETE CONFIRMATION MODAL ── */}
      <Dialog.Root open={deleteConfirmIndex !== null} onOpenChange={(open) => !open && setDeleteConfirmIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/45 backdrop-blur-xs z-[9999] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-[9999] max-w-sm w-full translate-x-[-50%] translate-y-[-50%] bg-white border border-slate-200/90 shadow-2xl rounded-3xl p-6 sm:p-7 space-y-5 text-left font-sans data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-205">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 grow">
                <Dialog.Title className="text-slate-900 font-extrabold text-sm uppercase tracking-wider">Delete Campaign</Dialog.Title>
                <Dialog.Description className="text-xs text-slate-500 font-medium leading-relaxed">
                  Are you sure you want to delete this promotional campaign? This action is permanent and cannot be undone.
                </Dialog.Description>
              </div>
            </div>
            <div className="flex justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setDeleteConfirmIndex(null)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  const idx = deleteConfirmIndex;
                  setDeleteConfirmIndex(null);
                  const updated = promoOffers.filter((_, i) => i !== idx);
                  const saved = await setSetting("promo_offers", updated);
                  if (!saved) {
                    toast("Campaign could not be deleted from database. Please try again.");
                    return;
                  }
                  setPromoOffers(updated);
                  toast("Campaign deleted successfully.");
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-md shadow-red-500/10"
              >
                Delete
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
