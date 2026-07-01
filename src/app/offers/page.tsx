"use client";

import React, { useState } from "react";
import Link from "next/link";

interface PromoOffer {
  title: string;
  badge: string;
  badgeColor: string;
  details: string;
  code: string;
  validUntil: string;
}

export default function Offers() {
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

  const activeOffers: PromoOffer[] = [
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
            msg: "Promo Applied: Free optical fiber ONT setup and router installation on standard packages!",
          });
        } else if (codeUpper === "ANNUAL10") {
          setPromoStatus({
            status: "success",
            msg: "Promo Applied: 12 months subscription for the price of 10 months upfront!",
          });
        } else {
          setPromoStatus({
            status: "success",
            msg: `Promo Code "${codeUpper}" is valid! Our representative will verify this code when activating your connection.`,
          });
        }
      } else {
        setPromoStatus({
          status: "error",
          msg: "Invalid Promo Code. Please enter an active coupon code listed below.",
        });
      }
    }, 1000);
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingClaim(true);
    setTimeout(() => {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 flex-grow">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-brand-cyan/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="bg-brand-blue/15 text-brand-cyan text-[10px] font-bold tracking-widest px-2.5 py-1 rounded border border-brand-cyan/20 uppercase">
          Promotions &amp; Deals
        </span>
        <h1 className="text-4xl font-extrabold text-white tracking-tight mt-3">
          Special{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue text-glow">
            Internet Offers
          </span>
        </h1>
        <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
          Upgrade your broadband line today. Browse our seasonal connection offers, package deals, and coupon codes valid across Keraniganj.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        {/* Left Column: Offers Grid */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeOffers.map((offer, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-brand-card/45 border border-brand-border/60 glass-panel glass-panel-hover flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-brand-border/40 pb-3 mb-4">
                    <span className={`text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full border ${offer.badgeColor}`}>
                      {offer.badge}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Valid: {offer.validUntil}</span>
                  </div>
                  <h3 className="text-white font-extrabold text-lg leading-tight mb-3">{offer.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">{offer.details}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-brand-border/30 mt-auto">
                  <div className="font-mono text-xs">
                    <span className="text-slate-500 block">PROMO CODE</span>
                    <span className="text-brand-cyan font-bold uppercase tracking-wider">{offer.code}</span>
                  </div>
                  <button
                    onClick={() => setSelectedPromo(offer)}
                    className="bg-brand-border hover:bg-brand-border/80 border border-brand-border text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    Claim Offer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Code Checker panel */}
        <div className="lg:col-span-4">
          <div className="glass-panel border-brand-border/60 rounded-3xl p-6 sm:p-8 space-y-6 sticky top-28 shadow-xl text-left">
            <div>
              <h3 className="text-white font-bold text-lg">Apply Promo Code</h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter your coupon code to test feasibility and reserve the discount details on your subscription profile.
              </p>
            </div>

            <form onSubmit={handlePromoCheck} className="flex gap-2">
              <input
                type="text"
                required
                placeholder="e.g. ANNUAL10"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan flex-grow font-mono uppercase"
              />
              <button
                type="submit"
                disabled={checkingPromo}
                className="bg-brand-blue text-white px-5 py-3 rounded-xl text-xs font-bold hover:bg-brand-blue/90 transition-colors disabled:opacity-50 cursor-pointer"
              >
                Apply
              </button>
            </form>

            {/* Promo Result status */}
            {checkingPromo && (
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-mono">
                <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
                <span>Checking promo database...</span>
              </div>
            )}

            {promoStatus && (
              <div
                className={`p-4 rounded-xl border text-xs leading-relaxed ${
                  promoStatus.status === "success"
                    ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                    : "bg-rose-500/5 border-rose-500/20 text-rose-300"
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  <span className={`w-2 h-2 rounded-full ${
                    promoStatus.status === "success" ? "bg-emerald-400" : "bg-rose-400"
                  }`} />
                  {promoStatus.status === "success" ? "PROMO APPLIED" : "VALIDATION ERROR"}
                </div>
                <p className="text-slate-300 mt-1.5 leading-relaxed">{promoStatus.msg}</p>
                {promoStatus.status === "success" && (
                  <Link
                    href={`/packages?promo=${promoInput.toUpperCase().trim()}`}
                    className="mt-3 inline-block text-[10px] text-brand-cyan hover:underline font-bold"
                  >
                    Proceed with package selection &gt;
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Claim Promo Modal */}
      {selectedPromo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm">
          <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 max-w-md w-full relative">
            <button
              onClick={resetClaimForm}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!claimSuccess ? (
              <form onSubmit={handleClaimSubmit} className="space-y-5 text-left">
                <div>
                  <h3 className="text-white font-bold text-xl">Claim Promotion Deal</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Book connection with promo code: <span className="text-brand-cyan font-bold font-mono uppercase">{selectedPromo.code}</span>
                  </p>
                </div>

                <div className="bg-brand-dark border border-brand-border/60 rounded-2xl p-4 space-y-2">
                  <h4 className="text-sm font-bold text-white leading-tight">{selectedPromo.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{selectedPromo.details}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      value={claimForm.name}
                      onChange={(e) => setClaimForm({ ...claimForm, name: e.target.value })}
                      placeholder="e.g. Kamrul Hasan"
                      className="bg-brand-dark border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={claimForm.phone}
                      onChange={(e) => setClaimForm({ ...claimForm, phone: e.target.value })}
                      placeholder="e.g. 01707009267"
                      className="bg-brand-dark border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-300 font-bold uppercase tracking-wider">Premises Address</label>
                    <textarea
                      required
                      rows={2}
                      value={claimForm.address}
                      onChange={(e) => setClaimForm({ ...claimForm, address: e.target.value })}
                      placeholder="House No, Road, Area in South Keraniganj"
                      className="bg-brand-dark border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submittingClaim}
                  className="w-full bg-gradient-to-r from-brand-blue to-brand-cyan text-brand-dark py-3.5 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:opacity-95 flex justify-center items-center gap-2 cursor-pointer"
                >
                  {submittingClaim ? (
                    <>
                      <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                      Booking Offer...
                    </>
                  ) : (
                    "Reserve Connection Deal"
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
                  <h3 className="text-white font-bold text-xl">Offer Booked!</h3>
                  <p className="text-sm text-slate-400">
                    Your reservation for the <span className="text-brand-cyan font-bold">{selectedPromo.title}</span> promo has been saved.
                  </p>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Our installation supervisor will prioritize your ticket and verify the promo code during routing setup. Keep your mobile phone active!
                </p>

                <button
                  onClick={resetClaimForm}
                  className="px-6 py-2.5 rounded-xl bg-brand-border hover:bg-brand-border/80 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
