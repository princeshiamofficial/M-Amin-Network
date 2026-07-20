"use client";

import React, { useState, useEffect } from "react";
import { getSetting, setSetting, submitClaimAction } from "@/actions/content";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
const defaultOffersPageContent = {
  str1En: "New Connection",
  str2En: "Best Value",
  str3En: "Gamer Special",
  str4En: "Community Deal",
  str5En: "Zero Installation Fee",
  str6En: "Pay 10 Months, Get 12",
  str7En: "Free Public IP for Gamers",
  str8En: "Refer a Friend",
  str9En: "",
  str10En: "",
  str11En: "",
  str12En: "Refer a neighbor or friend in South Keraniganj. Once their connection is activated, both you and your referred friend get a 50% discount on your next month's internet bill.",
  str13En: "Valid Until",
  str14En: "Ongoing Promotion",
  str15En: "Claim Offer",
  str16En: "Learn More",
  str17En: "Active Campaigns",
  str18En: "& Promotions",
  str19En: "Available offers for home and corporate subscribers.",
  str20En: "Monsoon Campaigns",
  str21En: "& Discounts",
  str22En: "Unlock high-speed splicing broadband peering plans at zero installation fees.",
  str23En: "All Offers",
  str24En: "Home Packages",
  str25En: "Gamer Packs",
  str26En: "Corporate Plans",
  str27En: "New Connections",
  str28En: "Referral Deals",
  str29En: "No active offers at this time.",
  str30En: "Check back soon for new campaigns.",
  str31En: "Code",
  str32En: "Copy Code",
  str33En: "Claim This Offer",
  str34En: "You are claiming promo code",
  str35En: "Full Name",
  str36En: "Phone Number",
  str37En: "Your Address",
  str38En: "Submitting...",
  str39En: "Submit Claim",
  str40En: "Claim Submitted!",
  str41En: "Your claim for",
  str42En: "has been registered. Our team will contact you shortly.",
  str43En: "A coordinator will verify your subscription eligibility and activate the promotional benefit within 24 hours.",
  str44En: "Close",
};
import { defaultPageHeaders, PageHeaderData } from "@/app/admin/(dashboard)/page-headers/page";

interface PromoOffer {
  title: string;
  badge: string;
  badgeColor: string;
  details: string;
  code: string;
  validUntil: string;
  imageUrl: string;
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

const normalizePromoOffer = (item: unknown): PromoOffer => {
  const record = item && typeof item === "object" ? item as PromoOfferRecord : {};
  const badge = getStringValue(record, ["badge", "category"], "Promotion");

  return {
    title: getStringValue(record, ["title", "campaignTitle", "campaign_title", "name"], "Untitled Campaign"),
    badge,
    badgeColor: getStringValue(record, ["badgeColor", "badge_color"], "bg-slate-500/10 border-slate-500/30 text-slate-400"),
    details: getStringValue(record, ["details", "description", "desc"]),
    code: getStringValue(record, ["code", "promoCode", "promo_code", "couponCode", "coupon_code", "coupon"]).toUpperCase(),
    validUntil: getStringValue(record, ["validUntil", "valid_until", "validity", "expiresAt", "expires_at"], "Ongoing Promotion"),
    imageUrl: getStringValue(record, ["imageUrl", "image_url", "image", "thumbnail"], "/offer-card-banner.png"),
    htmlDetails: getStringValue(record, ["htmlDetails", "html_details", "htmlDesc", "html_desc", "htmlCode", "html_code", "html"]),
  };
};

const normalizePromoOffers = (offers: unknown): PromoOffer[] => {
  if (!Array.isArray(offers)) return [];
  return offers.map(normalizePromoOffer);
};

export default function Offers() {
  const [pageContent, setPageContent] = React.useState(defaultOffersPageContent);
  const [headerData, setHeaderData] = React.useState<PageHeaderData>(defaultPageHeaders);
  React.useEffect(() => {
    const s = localStorage.getItem("offers_page_content");
    if (s) {
      try { setPageContent(JSON.parse(s)); } catch { /* ignore */ }
    }
    getSetting("page_headers").then(saved => {
      if (saved) setHeaderData(saved as PageHeaderData);
    });
  }, []);

  const lang = useTranslation();
  const t = (en: string, bn: string) => (lang === "BN" ? bn : en);

  const translateOfferTitle = (title: string) => {
    if (!title || typeof title !== "string") return "";
    if (title === "Zero Installation Fee") return t(pageContent.str5En, pageContent.str5En);
    if (title === "Pay 10 Months, Get 12") return t(pageContent.str6En, pageContent.str6En);
    if (title === "Free Public IP for Gamers") return t(pageContent.str7En, pageContent.str7En);
    if (title === "Refer a Friend") return t(pageContent.str8En, pageContent.str8En);
    return title;
  };

  const translateOfferDetails = (det: string) => {
    if (!det || typeof det !== "string") return "";
    if (det.startsWith("Subscribe to any 20 Mbps")) return t(pageContent.str9En, pageContent.str9En);
    if (det.startsWith("Pay for 10 months")) return t(pageContent.str10En, pageContent.str10En);
    if (det.startsWith("Subscribe to the 30 Mbps")) return t(pageContent.str11En, pageContent.str11En);
    if (det.startsWith("Refer a neighbor")) return t(pageContent.str12En, pageContent.str12En);
    return det;
  };



  // Claim offer modal
  const [selectedPromo, setSelectedPromo] = useState<PromoOffer | null>(null);
  const [claimForm, setClaimForm] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [submittingClaim, setSubmittingClaim] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);

  const [activeOffers, setActiveOffers] = useState<PromoOffer[]>([]);

  useEffect(() => {
    const defaultOffers: PromoOffer[] = [
      {
        title: "Zero Installation Fee",
        badge: "New Connection",
        badgeColor: "bg-brand-cyan/15 border-brand-cyan/30 text-brand-cyan",
        details: "",
        code: "FREEINSTALL2026",
        validUntil: "31 Dec 2026",
        imageUrl: "/offer-card-banner.png",
      },
      {
        title: "Pay 10 Months, Get 12",
        badge: "Best Value",
        badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 animate-pulse",
        details: "",
        code: "ANNUAL10",
        validUntil: "Ongoing Promotion",
        imageUrl: "/offer-card-banner.png",
      },
      {
        title: "Free Public IP for Gamers",
        badge: "Gamer Special",
        badgeColor: "bg-brand-blue/15 border-brand-blue/30 text-brand-blue",
        details: "",
        code: "GAMERIP",
        validUntil: "31 Oct 2026",
        imageUrl: "/offer-card-banner.png",
      },
      {
        title: "Refer a Friend",
        badge: "Community Deal",
        badgeColor: "bg-purple-500/10 border-purple-500/30 text-purple-400",
        details: "Refer a neighbor or friend in South Keraniganj. Once their connection is activated, both you and your referred friend get a 50% discount on your next month's internet bill.",
        code: "REFER50",
        validUntil: "Ongoing Promotion",
        imageUrl: "/offer-card-banner.png",
      },
    ];

    if (typeof window !== "undefined") {
      getSetting("promo_offers").then(savedOffers => {
      const normalizedOffers = normalizePromoOffers(savedOffers);
      if (normalizedOffers.length > 0) {
        setActiveOffers(normalizedOffers);
      } else {
        setSetting("promo_offers", defaultOffers);
        setActiveOffers(defaultOffers);
      }
    });
    }
  }, []);



  const handleClaimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPromo) return;
    setSubmittingClaim(true);
    setTimeout(async () => {
      try {
        const result = await submitClaimAction(
          {
            name: claimForm.name,
            phone: claimForm.phone,
            address: claimForm.address,
          },
          {
            code: selectedPromo.code,
            title: selectedPromo.title,
          }
        );
        if (result.success) {
          setClaimSuccess(true);
        } else {
          console.error("Failed to submit claim.");
        }
      } catch (err) {
        console.error("Error saving claim:", err);
      }
      setSubmittingClaim(false);
    }, 1500);
  };

  const resetClaimForm = () => {
    setClaimForm({ name: "", phone: "", address: "" });
    setClaimSuccess(false);
    setSelectedPromo(null);
  };

  return (
    <div className="w-full grow relative text-left">
      {/* Top Section Header with Background asset */}
      <div 
        className="w-full relative py-6 sm:py-10 border-b border-brand-border/40 overflow-hidden bg-slate-950"
      >
        {/* Background video/image */}
        <div className="absolute inset-0 z-0">
          {headerData.offers_bg?.endsWith(".mp4") ? (
            <video
              autoPlay
              loop
              muted={true}
              playsInline
              className="w-full h-full object-cover opacity-50"
            >
              <source src={headerData.offers_bg} type="video/mp4" />
            </video>
          ) : (
            <div
              className="w-full h-full bg-cover bg-center opacity-50"
              style={{ backgroundImage: `url('${headerData.offers_bg}')` }}
            />
          )}
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl font-extrabold text-white tracking-tight mt-0 text-center w-full block drop-shadow-md">
            {t(headerData.offers_title_en, headerData.offers_title_bn ?? "")}{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan to-brand-blue text-glow">
              {t(headerData.offers_title_highlight_en, headerData.offers_title_highlight_bn ?? "")}
            </span>
          </h1>
          <p className="text-slate-300 mt-4 text-sm sm:text-base leading-relaxed text-center font-medium drop-shadow-sm max-w-2xl mx-auto">
            {t(headerData.offers_subtitle_en, headerData.offers_subtitle_bn ?? "")}
          </p>
        </div>
      </div> {/* Close Top Section Wrapper */}

      {/* Bottom Section: Offers Grid & Apply Promo Form (Truly Full Width White Background) */}
      <div className="bg-white py-16 border-t border-slate-200 text-slate-900 relative z-10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
            {/* Left Column: Offers Grid */}
            <div className="lg:col-span-12 space-y-6 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                {activeOffers.map((offer, i) => {
                  const slug = offer.title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
                  return (
                    <Link
                      key={i}
                      href={`/offers/${slug}`}
                      className="group bg-white rounded-2xl shadow-md border border-white hover:border-orange-300 transition-all overflow-hidden flex flex-col"
                    >
                      {/* Banner image */}
                      <div className="h-44 relative rounded-t-2xl overflow-hidden bg-[#f7bd08] shrink-0">
                        <Image
                          src={offer.imageUrl || "/offer-card-banner.png"}
                          alt={translateOfferTitle(offer.title)}
                          fill
                          priority={i < 2}
                          className="object-cover"
                        />
                      </div>

                      {/* Body */}
                      <div className="px-5 lg:px-7 flex flex-col flex-1">
                        {/* Title row */}
                        <div className="border-b border-[#e5e7eb] py-3">
                          <p className="text-[#2E3033] group-hover:text-[#0082C4] transition-colors font-bold text-[18px] leading-snug">
                            {translateOfferTitle(offer.title)}
                          </p>
                        </div>

                        {/* Description — wrapper handles padding, inner handles clamping */}
                        {offer.details && offer.details.trim() && (
                          <div className="py-3 flex-1">
                            <div className="text-[#777B84] text-[15px] leading-relaxed line-clamp-3 font-sans font-medium">
                              {translateOfferDetails(offer.details)}
                            </div>
                          </div>
                        )}

                        {/* Learn More — always at bottom */}
                        <div className="flex items-center pb-5 mt-auto">
                          <p className="text-base font-semibold text-[#F74F22] flex items-center gap-2 group-hover:gap-3 transition-all">
                            Claim Offer
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Claim Promo Modal (Maintains Premium Overlay) */}
      {selectedPromo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl p-6 sm:p-8 max-w-md w-full relative text-left">
            <button
              onClick={resetClaimForm}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!claimSuccess ? (
              <form onSubmit={handleClaimSubmit} className="space-y-5 text-left">
                <div>
                  <h3 className="text-slate-900 font-bold text-xl">{t(pageContent.str33En, pageContent.str33En)}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {t(pageContent.str34En, pageContent.str34En)}{" "}
                    <span className="text-brand-blue font-bold font-mono uppercase">{selectedPromo.code}</span>
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2 text-left">
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">{translateOfferTitle(selectedPromo.title)}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{translateOfferDetails(selectedPromo.details)}</p>
                </div>

                <div className="space-y-4 text-left">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str35En, pageContent.str35En)}</label>
                    <input
                      type="text"
                      required
                      value={claimForm.name}
                      onChange={(e) => setClaimForm({ ...claimForm, name: e.target.value })}
                      placeholder="e.g. Kamrul Hasan"
                      className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str36En, pageContent.str36En)}</label>
                    <input
                      type="tel"
                      required
                      value={claimForm.phone}
                      onChange={(e) => setClaimForm({ ...claimForm, phone: e.target.value })}
                      placeholder="e.g. 01707009267"
                      className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t(pageContent.str37En, pageContent.str37En)}</label>
                    <textarea
                      required
                      rows={2}
                      value={claimForm.address}
                      onChange={(e) => setClaimForm({ ...claimForm, address: e.target.value })}
                      placeholder="House No, Road, Area in South Keraniganj"
                      className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue resize-none font-sans"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submittingClaim}
                  className="w-full bg-linear-to-r from-brand-blue to-brand-cyan text-brand-dark py-3.5 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:opacity-95 flex justify-center items-center gap-2 cursor-pointer"
                >
                  {submittingClaim ? (
                    <>
                      <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                      {t(pageContent.str38En, pageContent.str38En)}
                    </>
                  ) : (
                    t(pageContent.str39En, pageContent.str39En)
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
                  <h3 className="text-slate-900 font-bold text-xl">{t(pageContent.str40En, pageContent.str40En)}</h3>
                  <p className="text-sm text-slate-600">
                    {t(pageContent.str41En, pageContent.str41En)} <span className="text-brand-blue font-bold">{translateOfferTitle(selectedPromo.title)}</span> {t(pageContent.str42En, pageContent.str42En)}
                  </p>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {t(pageContent.str43En, pageContent.str43En)}
                </p>

                <button
                  onClick={resetClaimForm}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {t(pageContent.str44En, pageContent.str44En)}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

