"use client";

import React, { useState, useEffect } from "react";
import { getSetting } from "@/actions/content";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import * as Lucide from "lucide-react";

interface Credential {
  keyEn: string;
  keyBn: string;
  valEn: string;
  valBn: string;
}

interface InfraCard {
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  iconName: string;
}

interface AboutContentFull {
  headerTitleEn: string;
  headerTitleBn: string;
  headerDescEn: string;
  headerDescBn: string;
  
  missionTitleEn: string;
  missionTitleBn: string;
  missionP1En: string;
  missionP1Bn: string;
  missionP2En: string;
  missionP2Bn: string;
  
  credTitleEn: string;
  credTitleBn: string;
  credentials: Credential[];
  
  infraTitleEn: string;
  infraTitleBn: string;
  infraDescEn: string;
  infraDescBn: string;
  infraCards: InfraCard[];
  
  integrityTitleEn: string;
  integrityTitleBn: string;
  integrityDescEn: string;
  integrityDescBn: string;
  btn1En: string;
  btn1Bn: string;
  btn2En: string;
  btn2Bn: string;
}

const defaultContent: AboutContentFull = {
  headerTitleEn: "About ",
  headerTitleBn: "আমাদের ",
  headerDescEn: "Discover our history, network infrastructure capabilities, and why we are South Keraniganj's most trusted broadband provider.",
  headerDescBn: "আমাদের ইতিহাস, নেটওয়ার্ক অবকাঠামোর সক্ষমতা এবং কেন আমরা দক্ষিণ কেরানীগঞ্জের সবচেয়ে বিশ্বস্ত ব্রডব্যান্ড প্রদানকারী তা জানুন।",
  
  missionTitleEn: "Our Mission",
  missionTitleBn: "আমাদের লক্ষ্য",
  missionP1En: "At M Amin Network, we believe high-speed, reliable internet is no longer a luxury—it is an essential utility for education, commerce, and communication. Since our inception, we have dedicated ourselves to bridging the digital divide in South Keraniganj by deploying pure, 100% optical fiber connections (FTTH) direct to homes and businesses.",
  missionP1Bn: "এম আমিন নেটওয়ার্কে আমরা বিশ্বাস করি উচ্চগতির ও নির্ভরযোগ্য ইন্টারনেট আর কোনো বিলাসিতা নয়—এটি শিক্ষা, ব্যবসা ও যোগাযোগের জন্য একটি অপরিহার্য সেবা। শুরু থেকেই আমরা দক্ষিণ কেরানীগঞ্জে শতভাগ অপটিক্যাল ফাইবার সংযোগ (FTTH) স্থাপনের মাধ্যমে ডিজিটাল ব্যবধান দূর করতে কাজ করে যাচ্ছি।",
  missionP2En: "Operating our own Autonomous System Number (AS150164), we peer directly with major local and global content exchanges. This infrastructure gives our subscribers latency-free access to remote work resources, streaming caches (Google GGC, Facebook FNA, Netflix OCA), and multiplayer gaming servers.",
  missionP2Bn: "আমাদের নিজস্ব স্বায়ত্তশাসিত সিস্টেম নম্বর (AS150164) পরিচালনা করে আমরা সরাসরি বড় লোকাল ও বৈশ্বিক কন্টেন্ট এক্সচেঞ্জের সাথে যুক্ত হয়েছি। এই অবকাঠামো আমাদের গ্রাহকদের রিমোট কাজ, স্ট্রিমিং ক্যাশ এবং মাল্টিপ্লেয়ার গেমিং সার্ভারে লেটেন্সি-মুক্ত অ্যাক্সেস প্রদান করে।",
  
  credTitleEn: "Key Credentials",
  credTitleBn: "মূল প্রমাণপত্র",
  credentials: [
    { keyEn: "License Authority", keyBn: "লাইসেন্স কর্তৃপক্ষ", valEn: "BTRC Bangladesh", valBn: "বিটিআরসি বাংলাদেশ" },
    { keyEn: "ISP Association Membership", keyBn: "আইএসপি অ্যাসোসিয়েশন সদস্যপদ", valEn: "ISPAB Active Member", valBn: "আইএসপিএবি সক্রিয় সদস্য" },
    { keyEn: "Autonomous System (ASN)", keyBn: "স্বায়ত্তশাসিত সিস্টেম (ASN)", valEn: "AS150164", valBn: "AS150164" },
    { keyEn: "Service Coverage", keyBn: "পরিষেবা এলাকা", valEn: "South Keraniganj, Dhaka", valBn: "দক্ষিণ কেরানীগঞ্জ, ঢাকা" },
    { keyEn: "Line Configuration", keyBn: "লাইন কনফিগারেশন", valEn: "100% Fiber (FTTH)", valBn: "১০০% ফাইবার (FTTH)" }
  ],
  
  infraTitleEn: "Infrastructure Powerhouse",
  infraTitleBn: "অবকাঠামোগত শক্তি",
  infraDescEn: "We leverage modern networking standards to maintain steady throughput, routing, and uptime.",
  infraDescBn: "আমরা অবিচ্ছিন্ন থ্রুপুট, রাউটিং এবং আপটাইম বজায় রাখতে আধুনিক নেটওয়ার্কিং স্ট্যান্ডার্ড ব্যবহার করি।",
  infraCards: [
    {
      titleEn: "BGP Multi-Homing Routing", titleBn: "বিজিপি মাল্টি-হোমিং রাউটিং",
      descEn: "By operating our own BGP network (AS150164), we peer with multiple major upstream Tier-1 network gateways. In the event of a fiber outage from one upstream gateway, our router automatically re-routes packets instantly.",
      descBn: "আমাদের নিজস্ব বিজিপি নেটওয়ার্ক (AS150164) পরিচালনা করে আমরা একাধিক আপস্ট্রিম টিয়ার-১ গেটওয়ের সাথে যুক্ত হয়েছি। কোনো একটি গেটওয়েতে বিভ্রাট দেখা দিলে আমাদের রাউটার তাৎক্ষণিকভাবে স্বয়ংক্রিয়ভাবে পথ পরিবর্তন করে।",
      iconName: "Network"
    },
    {
      titleEn: "Local Exchange Peering", titleBn: "লোকাল এক্সচেঞ্জ পিয়ারিং",
      descEn: "We route directly to Bangladesh Internet Exchange (BDIX) and various local hosting centers. Subscribing to M Amin Network gives you access of up to 100 Mbps to local databases, FTP streaming archives, and live TV portals.",
      descBn: "আমরা সরাসরি বাংলাদেশ ইন্টারনেট এক্সচেঞ্জ (BDIX) এবং বিভিন্ন লোকাল হোস্টিং সেন্টারে ট্রাফিক রাউট করি। এম আমিন নেটওয়ার্কে সাবস্ক্রাইব করলে আপনি লোকাল ডাটাবেস ও এফটিপিতে ১০০ এমবিপিএস পর্যন্ত স্পিড পাবেন।",
      iconName: "Database"
    },
    {
      titleEn: "24/7 On-Field Dispatch", titleBn: "২৪/৭ অন-ফিল্ড ডিসপ্যাচ",
      descEn: "Unlike major centralized ISPs, our support center is localized right inside South Keraniganj. Our field crews, splicing engineers, and technical support assistants are situated nearby to provide instant physical repair service.",
      descBn: "আমাদের সাপোর্ট সেন্টার দক্ষিণ কেরানীগঞ্জের ভেতরেই অবস্থিত। আমাদের অন-ফিল্ড টিম ও টেকনিশিয়ানরা যেকোনো শারীরিক ত্রুটি দ্রুত মেরামতের জন্য সবসময় প্রস্তুত থাকে।",
      iconName: "Wrench"
    }
  ],
  
  integrityTitleEn: "Our Integrity Guarantee",
  integrityTitleBn: "আমাদের সততার নিশ্চয়তা",
  integrityDescEn: "We adhere strictly to the guidelines and standards set forth by the Bangladesh Telecommunication Regulatory Commission (BTRC). We guarantee that you will receive the minimum committed bandwidth speeds as defined in your contract, with no hidden fair usage policies (FUP) or caps.",
  integrityDescBn: "আমরা বাংলাদেশ টেলিযোগাযোগ নিয়ন্ত্রণ কমিশন (বিটিআরসি)-এর গাইডলাইন কঠোরভাবে মেনে চলি। আমরা গ্যারান্টি দিচ্ছি যে আপনার চুক্তিতে নির্ধারিত গতি আপনি পাবেন, কোনো লুকানো ফেয়ার ইউজেজ পলিসি (FUP) বা ক্যাপ থাকবে না।",
  btn1En: "Explore Packages",
  btn1Bn: "প্যাকেজ সমূহ দেখুন",
  btn2En: "Support Center",
  btn2Bn: "সহায়তা কেন্দ্র"
};

export default function About() {
  const lang = useTranslation();
  const t = (en: string, bn: string) => (lang === "BN" ? bn : en);

  const [content, setContent] = useState<AboutContentFull>(defaultContent);

  useEffect(() => {
    getSetting("m_amin_about_content_full").then(saved => {
      if (saved) {
        setContent(saved as unknown as AboutContentFull);
      } else {
        setContent(defaultContent);
      }
    });
  }, []);

  return (
    <div className="w-full grow relative text-left">
      {/* Top Section Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-brand-cyan/5 blur-[120px] pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white tracking-tight mt-3 text-center w-full block">
            {t(content.headerTitleEn, content.headerTitleBn)}{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan to-brand-blue text-glow">
              {t("M Amin Network", "এম আমিন নেটওয়ার্ক")}
            </span>
          </h1>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed text-center">
            {t(content.headerDescEn, content.headerDescBn)}
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white py-16 border-t border-slate-200 text-slate-900 relative z-10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* Mission Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <h2 className="text-2xl font-bold text-slate-900">{t(content.missionTitleEn, content.missionTitleBn)}</h2>
              <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
                {t(content.missionP1En, content.missionP1Bn)}
              </p>
              <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
                {t(content.missionP2En, content.missionP2Bn)}
              </p>
            </div>

            {/* Credentials Section */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-left">
                <h3 className="text-slate-900 font-extrabold text-base">{t(content.credTitleEn, content.credTitleBn)}</h3>
                <div className="space-y-4">
                  {content.credentials.map((cred, idx) => (
                    <div key={idx} className={`flex justify-between items-center ${idx !== content.credentials.length - 1 ? 'border-b border-slate-200 pb-2.5' : ''}`}>
                      <span className="text-xs text-slate-500 font-medium">{t(cred.keyEn, cred.keyBn)}</span>
                      <span className={`text-xs font-bold ${cred.keyEn.includes("ASN") ? 'text-brand-blue font-mono' : cred.keyEn.includes("Configuration") ? 'text-emerald-600' : 'text-slate-800 uppercase'}`}>
                        {t(cred.valEn, cred.valBn)}
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
              <h2 className="text-2xl font-bold text-slate-900">{t(content.infraTitleEn, content.infraTitleBn)}</h2>
              <p className="text-slate-650 mt-2 text-sm leading-relaxed">
                {t(content.infraDescEn, content.infraDescBn)}
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
                      {t(infra.titleEn, infra.titleBn)}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {t(infra.descEn, infra.descBn)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Corporate Integrity pledge */}
          <div className="p-8 sm:p-12 rounded-3xl bg-linear-to-r from-slate-50 to-slate-100/85 border border-slate-200 text-center relative overflow-hidden shadow-sm">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{t(content.integrityTitleEn, content.integrityTitleBn)}</h3>
            <p className="text-slate-650 max-w-2xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
              {t(content.integrityDescEn, content.integrityDescBn)}
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/packages"
                className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-sm transition-all cursor-pointer"
              >
                {t(content.btn1En, content.btn1Bn)}
              </Link>
              <Link
                href="/support"
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 hover:text-brand-blue px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-sm"
              >
                {t(content.btn2En, content.btn2Bn)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
