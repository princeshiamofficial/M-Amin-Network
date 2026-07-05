"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

interface PromoOffer {
  title: string;
  badge: string;
  badgeColor: string;
  details: string;
  code: string;
  validUntil: string;
}

export default function Offers() {
  const lang = useTranslation();
  const t = (en: string, bn: string) => (lang === "BN" ? bn : en);

  const translateOfferBadge = (b: string) => {
    if (b === "New Connection") return t("New Connection", "নতুন সংযোগ");
    if (b === "Best Value") return t("Best Value", "সেরা ডিল");
    if (b === "Gamer Special") return t("Gamer Special", "গেমার স্পেশাল");
    if (b === "Community Deal") return t("Community Deal", "কমিউনিটি অফার");
    return b;
  };

  const translateOfferTitle = (title: string) => {
    if (title === "Zero Installation Fee") return t("Zero Installation Fee", "শূন্য ইনস্টলেশন ফি");
    if (title === "Pay 10 Months, Get 12") return t("Pay 10 Months, Get 12", "১০ মাসের বিলে ১২ মাস");
    if (title === "Free Public IP for Gamers") return t("Free Public IP for Gamers", "গেমারদের জন্য ফ্রি পাবলিক আইপি");
    if (title === "Refer a Friend") return t("Refer a Friend", "বন্ধুকে রেফার করুন");
    return title;
  };

  const translateOfferDetails = (det: string) => {
    if (det.startsWith("Subscribe to any 20 Mbps")) return t("Subscribe to any 20 Mbps or higher home internet package for a minimum contract of 6 months, and get standard installation & optical fiber line connection completely free (saves ৳1,000 BDT).", "যেকোনো ২০ এমবিপিএস বা তার বেশি গতির প্যাকেজে ন্যূনতম ৬ মাসের চুক্তিতে সাবস্ক্রাইব করুন এবং স্ট্যান্ডার্ড ইনস্টলেশন ও ফাইবার লাইন সংযোগ পান সম্পূর্ণ ফ্রি (৳১,০০০ সাশ্রয়)।");
    if (det.startsWith("Pay for 10 months")) return t("Pay for 10 months upfront on any Home Broadband or Gamer Pack plan, and get an additional 2 months of subscription completely free (saves up to ৳3,000 BDT).", "যেকোনো হোম বা গেমার প্যাকে একবারে ১০ মাসের বিল পরিশোধ করুন এবং অতিরিক্ত ২ মাসের বিল পান সম্পূর্ণ ফ্রি (৳৩,০০০ পর্যন্ত সাশ্রয়)।");
    if (det.startsWith("Subscribe to the 30 Mbps")) return t("Subscribe to the 30 Mbps Gamer Pack or higher and receive a dedicated Static Public IP address for hosting lobbies and obtaining lowest pings at 0 extra monthly cost (saves ৳150/month).", "৩০ এমবিপিএস গেমার প্যাক বা তার উপরে সাবস্ক্রাইব করে কোনো অতিরিক্ত ফি ছাড়াই ডেডিকেটেড স্ট্যাটিক পাবলিক আইপি অ্যাড্রেস সংগ্রহ করুন (প্রতি মাসে ৳১৫০ সাশ্রয়)।");
    if (det.startsWith("Refer a neighbor")) return t("Refer a neighbor or friend in South Keraniganj. Once their connection is activated, both you and your referred friend get a 50% discount on your next month's internet bill.", "দক্ষিণ কেরানীগঞ্জে আপনার কোনো প্রতিবেশী বা বন্ধুকে রেফার করুন। তাদের কানেকশন অ্যাক্টিভ হলে পরবর্তী মাসের বিলে আপনারা উভয়েই ৫০% ডিসকাউন্ট পাবেন।");
    return det;
  };

  const translateValidUntil = (v: string) => {
    if (v === "31 Dec 2026") return t("31 Dec 2026", "৩১ ডিসেম্বর ২০২৬");
    if (v === "Ongoing Promotion") return t("Ongoing Promotion", "চলমান অফার");
    if (v === "31 Oct 2026") return t("31 Oct 2026", "৩১ অক্টোবর ২০২৬");
    return v;
  };

  const getBadgeStyles = (badge: string) => {
    if (badge === "New Connection") return "bg-cyan-50 border-cyan-200 text-cyan-700 font-bold";
    if (badge === "Best Value") return "bg-emerald-50 border-emerald-250 text-emerald-600 font-bold";
    if (badge === "Gamer Special") return "bg-blue-50 border-blue-200 text-blue-600 font-bold";
    if (badge === "Community Deal") return "bg-purple-50 border-purple-200 text-purple-600 font-bold";
    return "bg-slate-100 border-slate-200 text-slate-500";
  };

  const [promoInput, setPromoInput] = useState("");
  const [promoStatus, setPromoStatus] = useState<{ status: "success" | "error"; msg: string } | null>(null);
  const [checkingPromo, setCheckingPromo] = useState(false);

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

    if (typeof window !== "undefined") {
      const savedOffers = localStorage.getItem("m_amin_promo_offers");
      if (savedOffers) {
        setActiveOffers(JSON.parse(savedOffers));
      } else {
        localStorage.setItem("m_amin_promo_offers", JSON.stringify(defaultOffers));
        setActiveOffers(defaultOffers);
      }
    }
  }, []);

  const handlePromoCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    setCheckingPromo(true);
    setPromoStatus(null);

    setTimeout(() => {
      setCheckingPromo(false);
      const codeUpper = promoInput.toUpperCase().trim();

      const matched = activeOffers.some((o) => o.code === codeUpper);

      if (matched) {
        if (codeUpper === "FREEINSTALL2026") {
          setPromoStatus({
            status: "success",
            msg: t(
              "Promo Applied: Free optical fiber ONT setup and router installation on standard packages!",
              "প্রোমো কোড সফল: স্ট্যান্ডার্ড প্যাকেজে ফ্রি অপটিক্যাল ফাইবার ও রাউটার ইনস্টলেশন!"
            ),
          });
        } else if (codeUpper === "ANNUAL10") {
          setPromoStatus({
            status: "success",
            msg: t(
              "Promo Applied: 12 months subscription for the price of 10 months upfront!",
              "প্রোমো কোড সফল: ১০ মাসের অগ্রিম বিলে ১২ মাসের সাবস্ক্রিপশন!"
            ),
          });
        } else {
          setPromoStatus({
            status: "success",
            msg: t(
              `Promo Code "${codeUpper}" is valid! Our representative will verify this code when activating your connection.`,
              `প্রোমো কোড "${codeUpper}" কার্যকর! কানেকশন চালুর সময় আমাদের প্রতিনিধি এটি যাচাই করবেন।`
            ),
          });
        }
      } else {
        setPromoStatus({
          status: "error",
          msg: t(
            "Invalid Promo Code. Please enter an active coupon code listed below.",
            "ভুল প্রোমো কোড। অনুগ্রহ করে নিচে তালিকাভুক্ত সচল কোড ব্যবহার করুন।"
          ),
        });
      }
    }, 1000);
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPromo) return;
    setSubmittingClaim(true);
    setTimeout(() => {
      try {
        const claims = JSON.parse(localStorage.getItem("m_amin_claims") || "[]");
        const newClaim = {
          id: `CLM-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`,
          name: claimForm.name,
          phone: claimForm.phone,
          address: claimForm.address,
          promoCode: selectedPromo.code,
          promoTitle: selectedPromo.title,
          date: new Date().toLocaleString(),
          status: "Pending"
        };
        claims.push(newClaim);
        localStorage.setItem("m_amin_claims", JSON.stringify(claims));
      } catch (err) {
        console.error("Error saving claim:", err);
      }
      setSubmittingClaim(false);
      setClaimSuccess(true);
    }, 1500);
  };

  const resetClaimForm = () => {
    setClaimForm({ name: "", phone: "", address: "" });
    setClaimSuccess(false);
    setSelectedPromo(null);
  };

  return (
    <div className="w-full grow relative text-left">
      {/* Top Section Wrapper (Confined to max-w-7xl) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-brand-cyan/5 blur-[120px] pointer-events-none" />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="bg-brand-blue/15 text-brand-cyan text-[10px] font-bold tracking-widest px-2.5 py-1 rounded border border-brand-cyan/20 uppercase">
            {t("Promotions & Deals", "প্রোমোশন ও ডিল")}
          </span>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mt-3 text-center w-full block">
            {t("Special ", "বিশেষ ")}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan to-brand-blue text-glow">
              {t("Internet Offers", "ইন্টারনেট অফার")}
            </span>
          </h1>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed text-center">
            {t(
              "Upgrade your broadband line today. Browse our seasonal connection offers, package deals, and coupon codes valid across Keraniganj.",
              "আজই আপনার ব্রডব্যান্ড লাইন আপগ্রেড করুন। আমাদের সংযোগ অফার, প্যাকেজ ডিল এবং কুপন কোডগুলো দেখুন।"
            )}
          </p>
        </div>
      </div> {/* Close Top Section Wrapper */}

      {/* Bottom Section: Offers Grid & Apply Promo Form (Truly Full Width White Background) */}
      <div className="bg-white py-16 border-t border-slate-200 text-slate-900 relative z-10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
            {/* Left Column: Offers Grid */}
            <div className="lg:col-span-8 space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {activeOffers.map((offer, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between text-left transition-all hover:shadow-md hover:border-slate-300"
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 text-left">
                        <span className={`text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full border ${getBadgeStyles(offer.badge)}`}>
                          {translateOfferBadge(offer.badge)}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{t("Valid", "মেয়াদ")}: {translateValidUntil(offer.validUntil)}</span>
                      </div>
                      <h3 className="text-slate-900 font-extrabold text-lg leading-tight mb-3 text-left">{translateOfferTitle(offer.title)}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-6 text-left">{translateOfferDetails(offer.details)}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto text-left">
                      <div className="font-mono text-xs text-left">
                        <span className="text-slate-400 block text-left">{t("PROMO CODE", "প্রোমো কোড")}</span>
                        <span className="text-brand-blue font-bold uppercase tracking-wider text-left">{offer.code}</span>
                      </div>
                      <button
                        onClick={() => setSelectedPromo(offer)}
                        className="bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-205 transition-all cursor-pointer"
                      >
                        {t("Claim Offer", "অফার দাবি করুন")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Code Checker panel */}
            <div className="lg:col-span-4 text-left">
              <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 sticky top-28 shadow-sm text-left">
                <div>
                  <h3 className="text-slate-900 font-extrabold text-lg">{t("Apply Promo Code", "প্রোমো কোড ব্যবহার")}</h3>
                  <p className="text-xs text-slate-450 mt-1">
                    {t(
                      "Enter your coupon code to test feasibility and reserve the discount details on your subscription profile.",
                      "ডিসকাউন্ট সংরক্ষিত করতে এবং কোডের কার্যকারিতা পরীক্ষা করতে কুপন কোডটি প্রবেশ করান।"
                    )}
                  </p>
                </div>

                <form onSubmit={handlePromoCheck} className="flex gap-2 text-left">
                  <input
                    type="text"
                    required
                    placeholder="e.g. ANNUAL10"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-blue grow font-mono uppercase"
                  />
                  <button
                    type="submit"
                    disabled={checkingPromo}
                    className="bg-brand-blue text-white px-5 py-3 rounded-xl text-xs font-bold hover:bg-brand-blue/90 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {t("Apply", "প্রয়োগ")}
                  </button>
                </form>

                {/* Promo Result status */}
                {checkingPromo && (
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-mono">
                    <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
                    <span>{t("Checking promo database...", "ডাটাবেস চেক করা হচ্ছে...")}</span>
                  </div>
                )}

                {promoStatus && (
                  <div
                    className={`p-4 rounded-xl border text-xs leading-relaxed ${
                      promoStatus.status === "success"
                        ? "bg-emerald-50 border-emerald-250 text-emerald-600"
                        : "bg-rose-55 border-rose-200 text-rose-600"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold mb-1">
                      <span className={`w-2 h-2 rounded-full ${
                        promoStatus.status === "success" ? "bg-emerald-500" : "bg-rose-500"
                      }`} />
                      {promoStatus.status === "success" ? t("PROMO APPLIED", "কোড সফলভাবে প্রয়োগ করা হয়েছে") : t("VALIDATION ERROR", "কোড ভ্যালিডেশন ত্রুটি")}
                    </div>
                    <p className="text-slate-650 mt-1.5 leading-relaxed">{promoStatus.msg}</p>
                    {promoStatus.status === "success" && (
                      <Link
                        href={`/packages?promo=${promoInput.toUpperCase().trim()}`}
                        className="mt-3 inline-block text-[10px] text-brand-blue hover:underline font-bold"
                      >
                        {t("Proceed with package selection >", "প্যাকেজ নির্বাচনের দিকে এগিয়ে যান >")}
                      </Link>
                    )}
                  </div>
                )}
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
                  <h3 className="text-slate-900 font-bold text-xl">{t("Claim Promotion Deal", "অফারটি সংরক্ষণ করুন")}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {t("Book connection with promo code:", "প্রোমো কোড সহ সংযোগ সংরক্ষণ করুন:")}{" "}
                    <span className="text-brand-blue font-bold font-mono uppercase">{selectedPromo.code}</span>
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2 text-left">
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">{translateOfferTitle(selectedPromo.title)}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{translateOfferDetails(selectedPromo.details)}</p>
                </div>

                <div className="space-y-4 text-left">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Full Name", "আপনার নাম")}</label>
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
                    <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Phone Number", "মোবাইল নম্বর")}</label>
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
                    <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Premises Address", "সংযোগের ঠিকানা")}</label>
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
                      {t("Booking Offer...", "অফারটি সংরক্ষণ করা হচ্ছে...")}
                    </>
                  ) : (
                    t("Reserve Connection Deal", "অফারটি সংরক্ষণ করুন")
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
                  <h3 className="text-slate-900 font-bold text-xl">{t("Offer Booked!", "অফারটি সংরক্ষিত হয়েছে!")}</h3>
                  <p className="text-sm text-slate-600">
                    {t("Your reservation for the", "আপনার")} <span className="text-brand-blue font-bold">{translateOfferTitle(selectedPromo.title)}</span> {t("promo has been saved.", "অফার বুকিং সংরক্ষণ করা হয়েছে।")}
                  </p>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {t(
                    "Our installation supervisor will prioritize your ticket and verify the promo code during routing setup. Keep your mobile phone active!",
                    "আমাদের সংযোগ সুপারভাইজার আপনার টিকিটটিকে অগ্রাধিকার দেবেন এবং রাউটিং সেটআপের সময় প্রোমো কোডটি যাচাই করবেন। অনুগ্রহ করে মোবাইলটি সচল রাখুন!"
                  )}
                </p>

                <button
                  onClick={resetClaimForm}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {t("Close Window", "উইন্ডো বন্ধ করুন")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
