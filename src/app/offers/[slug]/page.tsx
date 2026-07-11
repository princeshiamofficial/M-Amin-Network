import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getSetting } from "@/actions/content";
import type { Metadata } from "next";
import SharePanel from "./SharePanel";

export const dynamic = "force-dynamic";

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

type PromoOffer = {
  id?: string;
  title: string;
  badge: string;
  badgeColor: string;
  details: string;
  code: string;
  validUntil: string;
  discount: string;
  description: string;
};

function normalizeOffer(raw: Record<string, unknown>): PromoOffer {
  const str = (keys: string[], fb = "") => {
    for (const k of keys) {
      const v = raw[k];
      if (typeof v === "string" && v.trim()) return v.trim();
    }
    return fb;
  };
  return {
    id: str(["id"], ""),
    title: str(["title", "name"], "Untitled Campaign"),
    badge: str(["badge", "category"], "Promotion"),
    badgeColor: str(["badgeColor", "badge_color"], "bg-slate-500"),
    details: str(["details", "description", "desc"]),
    description: str(["description", "details", "desc"]),
    code: str(["code", "promoCode", "couponCode"]).toUpperCase(),
    validUntil: str(["validUntil", "valid_until", "validity", "expiresAt"], "Ongoing"),
    discount: str(["discount"], ""),
  };
}

async function getOfferBySlug(slug: string): Promise<PromoOffer | null> {
  const raw = await getSetting("promo_offers");
  const list = Array.isArray(raw) ? (raw as Record<string, unknown>[]) : [];
  for (const item of list) {
    const offer = normalizeOffer(item);
    if (toSlug(offer.title) === slug || toSlug(offer.code) === slug) {
      return offer;
    }
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const offer = await getOfferBySlug(slug);
  if (!offer) return { title: "Offer Not Found" };
  return {
    title: `${offer.title} – Special Offer | M Amin Network`,
    description: offer.details || offer.description,
  };
}

export default async function OfferDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const offer = await getOfferBySlug(slug);
  if (!offer) notFound();

  const fullDetails = offer.details || offer.description || "";

  return (
    <div className="w-full grow bg-white text-slate-900">
      {/* Page wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

        {/* Back link */}
        <Link
          href="/offers"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0082C4] mb-8 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Offers
        </Link>

        {/* DOT-style 75/25 layout */}
        <div className="lg:flex grid grid-cols-1 gap-10">

          {/* ── Left: 75% ── */}
          <div className="lg:w-[75%] w-full">
            <h1 className="font-extrabold tracking-tight pt-0 text-gray-800 md:text-4xl text-2xl">
              {offer.title}
            </h1>
            <p className="pb-6 text-gray-500 md:text-sm text-xs mt-1">
              Valid until: <span className="font-semibold">{offer.validUntil}</span>
              {offer.discount && (
                <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-600">
                  {offer.discount}
                </span>
              )}
            </p>

            {/* Cover image */}
            <div className="w-full lg:h-[450px] h-auto overflow-hidden rounded-xl">
              <Image
                src="/offer-card-banner.png"
                alt={offer.title}
                width={900}
                height={450}
                priority
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>

            {/* Rich content body */}
            <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">

              {/* Promo code highlight */}
              <div className="bg-brand-dark text-white rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4 border border-brand-border">
                <div className="flex-1">
                  <p className="text-xs text-brand-text-muted uppercase tracking-widest font-bold mb-1">Your Promo Code</p>
                  <span className="font-mono text-2xl font-extrabold text-brand-cyan tracking-widest">
                    {offer.code || "N/A"}
                  </span>
                </div>
                <div className="text-sm text-brand-text-muted">
                  Valid until: <span className="text-white font-bold">{offer.validUntil}</span>
                </div>
              </div>

              {/* Full description */}
              <div>
                <h2 className="font-extrabold text-gray-800 text-xl mb-3">About This Offer</h2>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  {fullDetails || "Full offer details are available at our office or via hotline."}
                </p>
              </div>

              {/* Terms */}
              <div>
                <h3 className="font-extrabold text-gray-800 text-lg mb-3">Terms &amp; Conditions</h3>
                <ol className="list-decimal list-inside text-[14px] text-gray-600 space-y-2 leading-relaxed">
                  <li>Offer valid for eligible customers in M Amin Network coverage areas only.</li>
                  <li>Promo code must be mentioned at the time of connection activation or billing.</li>
                  <li>Cannot be combined with other active promotions unless otherwise stated.</li>
                  <li>M Amin Network reserves the right to modify, suspend, or withdraw the offer at any time.</li>
                  <li>For queries, contact our hotline: <strong>+880 1901-348400</strong>.</li>
                </ol>
              </div>

              {/* Note */}
              <div className="border-l-4 border-orange-400 bg-orange-50 px-5 py-4 rounded-r-xl">
                <p className="text-sm font-semibold text-orange-700">Note</p>
                <p className="text-sm text-orange-600 mt-1">
                  M Amin Network reserves the right to change the terms and conditions, suspend, modify, or discontinue this offer at any time without prior notice.
                </p>
              </div>

              {/* CTA row */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/packages"
                  className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-brand-blue hover:bg-brand-blue/90 text-white font-extrabold rounded-xl text-sm transition-all shadow-lg shadow-brand-blue/20 active:scale-95"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  View Packages
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-sm transition-all border border-slate-200 shadow-sm active:scale-95"
                >
                  Contact Us to Claim
                </Link>
              </div>
            </div>
          </div>

          {/* ── Right: 25% ── */}
          <div className="lg:w-[25%] w-full">
            <div className="sticky top-28 space-y-4">
              <SharePanel title={offer.title} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}