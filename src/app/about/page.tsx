"use client";

import React, { useState, useEffect } from "react";
import { getSetting } from "@/actions/content";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import * as Lucide from "lucide-react";

interface Credential {
  keyEn: string;
  keyBn?: string;
  valEn: string;
  valBn?: string;
}

interface InfraCard {
  titleEn: string;
  titleBn?: string;
  descEn: string;
  descBn?: string;
  iconName: string;
}

interface AboutContentFull {
  headerTitleEn: string;
  headerTitleBn?: string;
  headerDescEn: string;
  headerDescBn?: string;
  
  missionTitleEn: string;
  missionTitleBn?: string;
  missionP1En: string;
  missionP1Bn?: string;
  missionP2En: string;
  missionP2Bn?: string;
  
  credTitleEn: string;
  credTitleBn?: string;
  credentials: Credential[];
  
  infraTitleEn: string;
  infraTitleBn?: string;
  infraDescEn: string;
  infraDescBn?: string;
  infraCards: InfraCard[];
  
  integrityTitleEn: string;
  integrityTitleBn?: string;
  integrityDescEn: string;
  integrityDescBn?: string;
  btn1En: string;
  btn1Bn?: string;
  btn2En: string;
  btn2Bn?: string;
}

const defaultContent: AboutContentFull = {
  headerTitleEn: "About ",
  headerDescEn: "Discover our history, network infrastructure capabilities, and why we are South Keraniganj's most trusted broadband provider.",
  
  missionTitleEn: "Our Mission",
  missionP1En: "At M Amin Network, we believe high-speed, reliable internet is no longer a luxury—it is an essential utility for education, commerce, and communication. Since our inception, we have dedicated ourselves to bridging the digital divide in South Keraniganj by deploying pure, 100% optical fiber connections (FTTH) direct to homes and businesses.",
  missionP2En: "Operating our own Autonomous System Number (AS150164), we peer directly with major local and global content exchanges. This infrastructure gives our subscribers latency-free access to remote work resources, streaming caches (Google GGC, Facebook FNA, Netflix OCA), and multiplayer gaming servers.",
  
  credTitleEn: "Key Credentials",
  credentials: [
    { keyEn: "License Authority", valEn: "BTRC Bangladesh" },
    { keyEn: "ISP Association Membership", valEn: "ISPAB Active Member" },
    { keyEn: "Autonomous System (ASN)", valEn: "AS150164", valBn: "AS150164" },
    { keyEn: "Service Coverage", valEn: "South Keraniganj, Dhaka" },
    { keyEn: "Line Configuration", valEn: "100% Fiber (FTTH)" }
  ],
  
  infraTitleEn: "Infrastructure Powerhouse",
  infraDescEn: "We leverage modern networking standards to maintain steady throughput, routing, and uptime.",
  infraCards: [
    {
      titleEn: "BGP Multi-Homing Routing",
      descEn: "By operating our own BGP network (AS150164), we peer with multiple major upstream Tier-1 network gateways. In the event of a fiber outage from one upstream gateway, our router automatically re-routes packets instantly.",
      iconName: "Network"
    },
    {
      titleEn: "Local Exchange Peering",
      descEn: "We route directly to Bangladesh Internet Exchange (BDIX) and various local hosting centers. Subscribing to M Amin Network gives you access of up to 100 Mbps to local databases, FTP streaming archives, and live TV portals.",
      iconName: "Database"
    },
    {
      titleEn: "24/7 On-Field Dispatch",
      descEn: "Unlike major centralized ISPs, our support center is localized right inside South Keraniganj. Our field crews, splicing engineers, and technical support assistants are situated nearby to provide instant physical repair service.",
      iconName: "Wrench"
    }
  ],
  
  integrityTitleEn: "Our Integrity Guarantee",
  integrityDescEn: "We adhere strictly to the guidelines and standards set forth by the Bangladesh Telecommunication Regulatory Commission (BTRC). We guarantee that you will receive the minimum committed bandwidth speeds as defined in your contract, with no hidden fair usage policies (FUP) or caps.",
  btn1En: "Explore Packages",
  btn2En: "Support Center"
};

export default function About() {
  const lang = useTranslation();
  const t = (en: string, bn: string) => (lang === "BN" ? bn : en);

  const [content, setContent] = useState<AboutContentFull>(defaultContent);
  const [bgUrl, setBgUrl] = useState("/About.jpg");

  useEffect(() => {
    getSetting("page_headers").then((ph) => {
      if (ph) {
        const data = ph as Record<string, string>;
        if (data.about_bg) setBgUrl(data.about_bg);
        setContent(prev => ({
          ...prev,
          headerTitleEn: data.about_title_en || prev.headerTitleEn,
          highlightEn: data.about_title_highlight_en || (prev as unknown as Record<string, string>).highlightEn || "M Amin Network",
          headerDescEn: data.about_subtitle_en || prev.headerDescEn,
        }));
      }
    });

    getSetting("about_content_full").then(saved => {
      if (saved) {
        const merged = { ...defaultContent, ...(saved as unknown as Partial<AboutContentFull>) };
        if (!Array.isArray(merged.credentials)) merged.credentials = defaultContent.credentials;
        if (!Array.isArray(merged.infraCards)) merged.infraCards = defaultContent.infraCards;
        const record = saved as unknown as Record<string, string>;
        setContent(prev => ({
          ...merged,
          headerTitleEn: record.headerTitleEn || prev.headerTitleEn,
          highlightEn: record.highlightEn || (prev as unknown as Record<string, string>).highlightEn || "M Amin Network",
          headerDescEn: record.headerDescEn || prev.headerDescEn,
        }));
      }
    });
  }, []);

  return (
    <div className="w-full grow relative text-left">
      {/* Header Area Banner */}
      <div 
        className="relative w-full overflow-hidden bg-slate-950 py-3 sm:py-6 border-b border-white/5 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(9, 13, 24, 0.45), rgba(9, 13, 24, 0.75)), url("${bgUrl}")`
        }}
      >
        <div className="absolute inset-0 bg-brand-dark/20 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-brand-dark/85 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold text-white tracking-tight mt-3 text-center w-full block">
              {t(content.headerTitleEn, content.headerTitleEn)}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan to-brand-blue text-glow">
                {t((content as unknown as Record<string, string>).highlightEn || "M Amin Network", (content as unknown as Record<string, string>).highlightEn || "M Amin Network")}
              </span>
            </h1>
            <p className="text-slate-300 mt-4 text-sm sm:text-base leading-relaxed text-center font-medium drop-shadow-sm max-w-2xl mx-auto">
              {t(content.headerDescEn, content.headerDescEn)}
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
              <h2 className="text-2xl font-bold text-slate-900">{t(content.missionTitleEn, content.missionTitleEn)}</h2>
              <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
                {t(content.missionP1En, content.missionP1En)}
              </p>
              <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
                {t(content.missionP2En, content.missionP2En)}
              </p>
            </div>

            {/* Credentials Section */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-left">
                <h3 className="text-slate-900 font-extrabold text-base">{t(content.credTitleEn, content.credTitleEn)}</h3>
                <div className="space-y-4">
                  {content.credentials.map((cred, idx) => (
                    <div key={idx} className={`flex justify-between items-center ${idx !== content.credentials.length - 1 ? 'border-b border-slate-200 pb-2.5' : ''}`}>
                      <span className="text-xs text-slate-500 font-medium">{t(cred.keyEn, cred.keyEn)}</span>
                      <span className={`text-xs font-bold ${cred.keyEn.includes("ASN") ? 'text-brand-blue font-mono' : cred.keyEn.includes("Configuration") ? 'text-emerald-600' : 'text-slate-800 uppercase'}`}>
                        {t(cred.valEn, cred.valEn)}
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
              <h2 className="text-2xl font-bold text-slate-900">{t(content.infraTitleEn, content.infraTitleEn)}</h2>
              <p className="text-slate-650 mt-2 text-sm leading-relaxed">
                {t(content.infraDescEn, content.infraDescEn)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {content.infraCards.map((infra, i) => {
                const IconComp = (Lucide as unknown as Record<string, React.ElementType>)[infra.iconName] || Lucide.HelpCircle;
                return (
                  <div
                    key={i}
                    className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-blue/20 hover:scale-[1.01] transition-all flex flex-col gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/25 shrink-0">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 tracking-wide">
                      {t(infra.titleEn, infra.titleEn)}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {t(infra.descEn, infra.descEn)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Corporate Integrity pledge */}
          <div className="p-8 sm:p-12 rounded-3xl bg-linear-to-r from-slate-50 to-slate-100/85 border border-slate-200 text-center relative overflow-hidden shadow-sm">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{t(content.integrityTitleEn, content.integrityTitleEn)}</h3>
            <p className="text-slate-650 max-w-2xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
              {t(content.integrityDescEn, content.integrityDescEn)}
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/packages"
                className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-sm transition-all cursor-pointer"
              >
                {t(content.btn1En, content.btn1En)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

