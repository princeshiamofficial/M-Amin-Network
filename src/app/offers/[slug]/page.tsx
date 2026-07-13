import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getSetting } from "@/actions/content";
import type { Metadata } from "next";
import SharePanel from "./SharePanel";
import SafeIframe from "./SafeIframe";

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
  discount: string;
  description: string;
  imageUrl: string;
  createdAt?: string;
  htmlDetails?: string;
};

const isDefaultButtonsOnly = (html?: string): boolean => {
  if (!html) return false;
  const text = html.replace(/<[^>]*>/g, "").trim();
  return text.length < 80 && (html.includes("/packages") || html.includes("/contact"));
};

function formatCreateDate(dateStr?: string): string {
  const date = dateStr ? new Date(dateStr) : new Date();
  if (isNaN(date.getTime())) return "9:31 PM, September 30, 2023";
  
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const timeStr = `${hours}:${minutes} ${ampm}`;
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  return `${timeStr}, ${month} ${day}, ${year}`;
}

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
    discount: str(["discount"], ""),
    imageUrl: str(["imageUrl", "image_url", "image", "thumbnail"], "/offer-card-banner.png"),
    createdAt: str(["createdAt", "created_at", "created"], ""),
    htmlDetails: str(["htmlDetails", "html_details", "htmlDesc", "html_desc", "htmlCode", "html_code", "html"], ""),
  };
}

async function getOfferBySlug(slug: string): Promise<PromoOffer | null> {
  const raw = await getSetting("promo_offers");
  const list = Array.isArray(raw) ? (raw as Record<string, unknown>[]) : [];
  for (const item of list) {
    const offer = normalizeOffer(item);
    if (toSlug(offer.title) === slug) {
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

  const fullDetails = offer.htmlDetails || offer.details || offer.description || "";

  return (
    <div className="w-full grow min-h-0 bg-white text-slate-900">
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
        <div className="lg:flex grid grid-cols-1 gap-10 items-start">

          {/* ── Left: 75% ── */}
          <div className="lg:w-[75%] w-full">
            <h1 className="font-extrabold tracking-tight pt-0 text-gray-800 md:text-4xl text-2xl">
              {offer.title}
            </h1>
            <p className="pb-6 text-gray-550 md:text-sm text-xs mt-1">
              Published on: <span className="font-semibold">{formatCreateDate(offer.createdAt)}</span>
            </p>

            {/* Cover image */}
            <div className="w-full lg:h-[450px] h-auto overflow-hidden rounded-xl">
              <Image
                src={offer.imageUrl || "/offer-card-banner.png"}
                alt={offer.title}
                width={900}
                height={450}
                priority
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>

            {/* Rich content body */}
            <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
              {/* Full description */}
              {offer.htmlDetails && offer.htmlDetails.trim() && isDefaultButtonsOnly(offer.htmlDetails) && offer.details && offer.details.trim() && (
                <div className="text-[15px] text-gray-650 leading-relaxed font-sans font-medium">
                  {offer.details}
                </div>
              )}

              {offer.htmlDetails && offer.htmlDetails.trim() ? (
                <SafeIframe html={offer.htmlDetails} />
              ) : (
                <div 
                  className="text-[15px] text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: fullDetails || "Full offer details are available at our office or via hotline."
                  }}
                />
              )}
            </div>
          </div>

          {/* ── Right: 25% ── */}
          <div className="lg:w-[25%] w-full self-start sticky top-28">
            <SharePanel title={offer.title} />
          </div>

        </div>
      </div>
    </div>
  );
}
