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

interface PromoOffer {
  title: string;
  badge: string;
  badgeColor: string;
  details: string;
  code: string;
  validUntil: string;
}

const defaultPromoOffers: PromoOffer[] = [
  {
    title: "Zero Installation Fee",
    badge: "New Connection",
    badgeColor: "bg-brand-cyan/15 border-brand-cyan/30 text-brand-cyan",
    details: "Subscribe to any 20 Mbps or higher home internet package for a minimum contract of 6 months, and get standard installation & optical fiber line connection completely free (saves ৳1,000 BDT).",
    code: "FREEINSTALL2026",
    validUntil: "31 Dec 2026",
  },
  {
    title: "Pay 10 Months, Get 12",
    badge: "Best Value",
    badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 animate-pulse",
    details: "Pay for 10 months upfront on any Home Broadband or Gamer Pack plan, and get an additional 2 months of subscription completely free (saves up to ৳3,000 BDT).",
    code: "ANNUAL10",
    validUntil: "Ongoing Promotion",
  },
  {
    title: "Free Public IP for Gamers",
    badge: "Gamer Special",
    badgeColor: "bg-brand-blue/15 border-brand-blue/30 text-brand-blue",
    details: "Subscribe to the 30 Mbps Gamer Pack or higher and receive a dedicated Static Public IP address for hosting lobbies and obtaining lowest pings at 0 extra monthly cost (saves ৳150/month).",
    code: "GAMERIP",
    validUntil: "31 Oct 2026",
  },
  {
    title: "Refer a Friend",
    badge: "Community Deal",
    badgeColor: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    details: "Refer a neighbor or friend in South Keraniganj. Once their connection is activated, both you and your referred friend get a 50% discount on your next month's internet bill.",
    code: "REFER50",
    validUntil: "Ongoing Promotion",
  },
];

export default function OffersPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Campaigns state
  const [promoOffers, setPromoOffers] = useState<PromoOffer[]>([]);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [promoFormIndex, setPromoFormIndex] = useState<number | null>(null);
  const [promoFormData, setPromoFormData] = useState({
    title: "",
    badge: "New Connection",
    badgeColor: "",
    details: "",
    code: "",
    validUntil: ""
  });

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
      if (savedOffers) {
        setPromoOffers(savedOffers as any);
      } else {
        setSetting("promo_offers", defaultPromoOffers as any);
        setPromoOffers(defaultPromoOffers);
      }
    });
  }, [router]);

  // --- Campaigns Handlers ---
  const handleSavePromoOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window === "undefined") return;

    const codeUpper = promoFormData.code.toUpperCase().trim();
    if (!codeUpper) { toast("Promo code is required."); return; }

    let badgeColor = promoFormData.badgeColor;
    if (!badgeColor) {
      if (promoFormData.badge === "New Connection") badgeColor = "bg-brand-cyan/15 border-brand-cyan/30 text-brand-cyan";
      else if (promoFormData.badge === "Best Value") badgeColor = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 animate-pulse";
      else if (promoFormData.badge === "Gamer Special") badgeColor = "bg-brand-blue/15 border-brand-blue/30 text-brand-blue";
      else if (promoFormData.badge === "Community Deal") badgeColor = "bg-purple-500/10 border-purple-500/30 text-purple-400";
      else badgeColor = "bg-slate-500/10 border-slate-500/30 text-slate-400";
    }

    const offerData: PromoOffer = {
      title: promoFormData.title,
      badge: promoFormData.badge || "Promotion",
      badgeColor,
      details: promoFormData.details,
      code: codeUpper,
      validUntil: promoFormData.validUntil || "Ongoing Promotion"
    };

    let updated: PromoOffer[];
    if (promoFormIndex !== null) {
      updated = [...promoOffers];
      updated[promoFormIndex] = offerData;
    } else {
      if (promoOffers.some(o => o.code === codeUpper)) {
        toast("A campaign with this promo code already exists!");
        return;
      }
      updated = [offerData, ...promoOffers];
    }

    setPromoOffers(updated);
    setSetting("promo_offers", updated as any);
    setIsPromoModalOpen(false);
    toast(promoFormIndex !== null ? "Campaign updated successfully!" : "New campaign created successfully!");
  };

  const handleDeletePromoOffer = async (index: number) => {
    if (!confirm("Are you sure you want to delete this promotional campaign?")) return;
    const updated = promoOffers.filter((_, i) => i !== index);
    setPromoOffers(updated);
    setSetting("promo_offers", updated as any);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-6">

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <div className="flex-1 max-w-sm relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search promo code or campaign..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue placeholder-slate-400 transition-all"
          />
        </div>
        <button
          onClick={() => {
            setPromoFormData({ title: "", badge: "New Connection", badgeColor: "", details: "", code: "", validUntil: "" });
            setPromoFormIndex(null);
            setIsPromoModalOpen(true);
          }}
          className="px-4 py-2.5 bg-brand-blue hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md inline-flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Promo Campaign</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign Title</TableHead>
              <TableHead>Badge</TableHead>
              <TableHead>Promo Code</TableHead>
              <TableHead>Validity</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promoOffers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-slate-400">No campaigns found.</TableCell>
              </TableRow>
            ) : (
              promoOffers
                .filter((o) => o.title.toLowerCase().includes(searchTerm.toLowerCase()) || o.code.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((o, idx) => (
                  <TableRow key={o.code}>
                    <TableCell>
                      <span className="font-extrabold text-slate-900 block">{o.title}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        o.badge === "Best Value" ? "bg-emerald-50 text-emerald-700 border-emerald-100 animate-pulse" :
                        o.badge === "New Connection" ? "bg-cyan-50 text-cyan-700 border-cyan-100" :
                        o.badge === "Gamer Special" ? "bg-blue-50 text-blue-700 border-blue-100" :
                        o.badge === "Community Deal" ? "bg-purple-50 text-purple-700 border-purple-100" :
                        "bg-slate-50 text-slate-500 border-slate-100"
                      }`}>
                        {o.badge}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="bg-blue-50/70 text-brand-blue border border-blue-100/50 rounded-lg px-2.5 py-1 font-bold inline-flex items-center text-xs">
                        {o.code}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-500 font-medium">{o.validUntil}</TableCell>
                    <TableCell className="text-slate-600 max-w-xs truncate" title={o.details}>{o.details}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="inline-flex items-center justify-center p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700 transition-colors cursor-pointer outline-none">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32 bg-white border border-slate-200 rounded-xl shadow-xl py-1">
                          <DropdownMenuItem
                            onClick={() => {
                              setPromoFormData({ title: o.title, badge: o.badge, badgeColor: o.badgeColor, details: o.details, code: o.code, validUntil: o.validUntil });
                              setPromoFormIndex(idx);
                              setIsPromoModalOpen(true);
                            }}
                            className="px-3 py-2 text-xs font-bold text-brand-blue hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeletePromoOffer(idx)}
                            className="px-3 py-2 text-xs font-bold text-red-650 hover:bg-red-50 cursor-pointer flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── ADD/EDIT CAMPAIGN MODAL ── */}
      {isPromoModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div>
              <h3 className="text-slate-900 font-extrabold text-base">
                {promoFormIndex !== null ? "Modify Promotional Campaign" : "Add New Promotional Campaign"}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Define a client promo code that will be redeemable on the public offers portal.</p>
            </div>
            <form onSubmit={handleSavePromoOffer} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Campaign Title</label>
                  <input type="text" required placeholder="e.g. Free Optical ONT Setup" value={promoFormData.title}
                    onChange={(e) => setPromoFormData({ ...promoFormData, title: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue" />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Promo Coupon Code</label>
                  <input type="text" required placeholder="e.g. FREEINSTALL2026" value={promoFormData.code}
                    disabled={promoFormIndex !== null}
                    onChange={(e) => setPromoFormData({ ...promoFormData, code: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue disabled:opacity-50 disabled:cursor-not-allowed" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Badge Category</label>
                  <select value={promoFormData.badge}
                    onChange={(e) => setPromoFormData({ ...promoFormData, badge: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue cursor-pointer">
                    <option value="New Connection">New Connection</option>
                    <option value="Best Value">Best Value</option>
                    <option value="Gamer Special">Gamer Special</option>
                    <option value="Community Deal">Community Deal</option>
                    <option value="Custom Promotion">Custom Promotion</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Campaign Validity</label>
                  <input type="text" required placeholder="e.g. 31 Dec 2026" value={promoFormData.validUntil}
                    onChange={(e) => setPromoFormData({ ...promoFormData, validUntil: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Campaign Description</label>
                <textarea required rows={3} placeholder="Provide description of this discount deal..."
                  value={promoFormData.details}
                  onChange={(e) => setPromoFormData({ ...promoFormData, details: e.target.value })}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:border-brand-blue resize-none" />
              </div>
              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button type="submit" className="px-5 py-3.5 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md">
                  {promoFormIndex !== null ? "Save Changes" : "Create Campaign"}
                </button>
                <button type="button" onClick={() => setIsPromoModalOpen(false)} className="px-5 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs cursor-pointer">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

