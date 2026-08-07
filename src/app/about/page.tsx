import React from "react";
import { getSetting } from "@/actions/content";
import Link from "next/link";
import * as Lucide from "lucide-react";
import {
  defaultAboutContentFull,
  type AboutContentFull,
  type Credential,
  type InfraCard,
} from "@/lib/about-content";

export const dynamic = "force-dynamic";

export default async function About() {
  const phRaw = await getSetting("page_headers");
  const savedRaw = await getSetting("about_content_full");

  const ph = (phRaw as Record<string, string> | null) || {};
  const saved = (savedRaw as Record<string, unknown> | null) || {};

  const merged: AboutContentFull = {
    ...defaultAboutContentFull,
    ...(saved as unknown as Partial<AboutContentFull>),
  };

  if (!Array.isArray(merged.credentials)) {
    merged.credentials = defaultAboutContentFull.credentials;
  }
  if (!Array.isArray(merged.infraCards)) {
    merged.infraCards = defaultAboutContentFull.infraCards;
  }

  const bgUrl = ph.about_bg || "/About.jpg";
  const headerTitleEn = ph.about_title_en || merged.headerTitleEn;
  const highlightText = ph.about_title_highlight_en || merged.highlightEn || "M Amin Network";
  const headerDescEn = ph.about_subtitle_en || merged.headerDescEn;

  return (
    <div className="w-full grow relative text-left">
      {/* Header Area Banner */}
      <div
        className="relative w-full overflow-hidden bg-slate-950 py-3 sm:py-6 border-b border-white/5 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(9, 13, 24, 0.45), rgba(9, 13, 24, 0.75)), url("${bgUrl}")`,
        }}
      >
        <div className="absolute inset-0 bg-brand-dark/20 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-brand-dark/85 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold text-white tracking-tight mt-3 text-center w-full block">
              {headerTitleEn}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan to-brand-blue text-glow">
                {highlightText}
              </span>
            </h1>
            <p className="text-slate-300 mt-4 text-sm sm:text-base leading-relaxed text-center font-medium drop-shadow-sm max-w-2xl mx-auto">
              {headerDescEn}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white py-16 border-t border-slate-200 text-slate-900 relative z-10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {/* Mission Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <h2 className="text-2xl font-bold text-slate-900">
                {merged.missionTitleEn}
              </h2>
              <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
                {merged.missionP1En}
              </p>
              <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
                {merged.missionP2En}
              </p>
            </div>

            {/* Credentials Section */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-left">
                <h3 className="text-slate-900 font-extrabold text-base">
                  {merged.credTitleEn}
                </h3>
                <div className="space-y-4">
                  {merged.credentials.map((cred: Credential, idx: number) => (
                    <div
                      key={idx}
                      className={`flex justify-between items-center ${
                        idx !== merged.credentials.length - 1
                          ? "border-b border-slate-200 pb-2.5"
                          : ""
                      }`}
                    >
                      <span className="text-xs text-slate-500 font-medium">
                        {cred.keyEn}
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          cred.keyEn.includes("ASN")
                            ? "text-brand-blue font-mono"
                            : cred.keyEn.includes("Configuration")
                            ? "text-emerald-600"
                            : "text-slate-800 uppercase"
                        }`}
                      >
                        {cred.valEn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Infrastructure highlights */}
          <div className="space-y-10 text-center pt-8 border-t border-slate-100">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900">
                {merged.infraTitleEn}
              </h2>
              <p className="text-slate-650 mt-2 text-sm leading-relaxed">
                {merged.infraDescEn}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {merged.infraCards.map((infra: InfraCard, i: number) => {
                const IconComp =
                  (Lucide as unknown as Record<string, React.ElementType>)[
                    infra.iconName
                  ] || Lucide.HelpCircle;
                return (
                  <div
                    key={i}
                    className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-blue/20 hover:scale-[1.01] transition-all flex flex-col gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/25 shrink-0">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 tracking-wide">
                      {infra.titleEn}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {infra.descEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Corporate Integrity pledge */}
          <div className="p-8 sm:p-12 rounded-3xl bg-linear-to-r from-slate-50 to-slate-100/85 border border-slate-200 text-center relative overflow-hidden shadow-sm">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">
              {merged.integrityTitleEn}
            </h3>
            <p className="text-slate-650 max-w-2xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
              {merged.integrityDescEn}
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/packages"
                className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-sm transition-all cursor-pointer"
              >
                {merged.btn1En}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
