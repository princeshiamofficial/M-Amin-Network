"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function About() {
  const lang = useTranslation();
  const t = (en: string, bn: string) => (lang === "BN" ? bn : en);

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
            {t("Corporate Profile", "কর্পোরেট প্রোফাইল")}
          </span>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mt-3 text-center w-full block">
            {t("About ", "আমাদের ")}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan to-brand-blue text-glow">
              {t("M Amin Network", "এম আমিন নেটওয়ার্ক")}
            </span>
          </h1>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed text-center">
            {t(
              "Discover our history, network infrastructure capabilities, and why we are South Keraniganj's most trusted broadband provider.",
              "আমাদের ইতিহাস, নেটওয়ার্ক অবকাঠামোর সক্ষমতা এবং কেন আমরা দক্ষিণ কেরানীগঞ্জের সবচেয়ে বিশ্বস্ত ব্রডব্যান্ড প্রদানকারী তা জানুন।"
            )}
          </p>
        </div>
      </div> {/* Close Top Section Wrapper */}

      {/* Bottom Section: Mission, Credentials & Infrastructure Highlights (Truly Full Width White Background) */}
      <div className="bg-white py-16 border-t border-slate-200 text-slate-900 relative z-10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {/* Story Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <h2 className="text-2xl font-bold text-slate-900">{t("Our Mission", "আমাদের লক্ষ্য")}</h2>
              <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
                {t(
                  "At M Amin Network, we believe high-speed, reliable internet is no longer a luxury—it is an essential utility for education, commerce, and communication. Since our inception, we have dedicated ourselves to bridging the digital divide in South Keraniganj by deploying pure, 100% optical fiber connections (FTTH) direct to homes and businesses.",
                  "এম আমিন নেটওয়ার্কে আমরা বিশ্বাস করি উচ্চগতির ও নির্ভরযোগ্য ইন্টারনেট আর কোনো বিলাসিতা নয়—এটি শিক্ষা, ব্যবসা ও যোগাযোগের জন্য একটি অপরিহার্য সেবা। শুরু থেকেই আমরা দক্ষিণ কেরানীগঞ্জে শতভাগ অপটিক্যাল ফাইবার সংযোগ (FTTH) স্থাপনের মাধ্যমে ডিজিটাল ব্যবধান দূর করতে কাজ করে যাচ্ছি।"
                )}
              </p>
              <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
                {t(
                  "Operating our own Autonomous System Number (**AS150164**), we peer directly with major local and global content exchanges. This infrastructure gives our subscribers latency-free access to remote work resources, streaming caches (Google GGC, Facebook FNA, Netflix OCA), and multiplayer gaming servers.",
                  "আমাদের নিজস্ব স্বায়ত্তশাসিত সিস্টেম নম্বর (AS150164) পরিচালনা করে আমরা সরাসরি বড় লোকাল ও বৈশ্বিক কন্টেন্ট এক্সচেঞ্জের সাথে যুক্ত হয়েছি। এই অবকাঠামো আমাদের গ্রাহকদের রিমোট কাজ, স্ট্রিমিং ক্যাশ এবং মাল্টিপ্লেয়ার গেমিং সার্ভারে লেটেন্সি-মুক্ত অ্যাক্সেস প্রদান করে।"
                )}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-left">
                <h3 className="text-slate-900 font-extrabold text-base">{t("Key Credentials", "মূল প্রমাণপত্র")}</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
                    <span className="text-xs text-slate-500 font-medium">{t("License Authority", "লাইসেন্স কর্তৃপক্ষ")}</span>
                    <span className="text-xs font-bold text-slate-800 uppercase">{t("BTRC Bangladesh", "বিটিআরসি বাংলাদেশ")}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
                    <span className="text-xs text-slate-500 font-medium">{t("ISP Association Membership", "আইএসপি অ্যাসোসিয়েশন সদস্যপদ")}</span>
                    <span className="text-xs font-bold text-slate-800">{t("ISPAB Active Member", "আইএসপিএবি সক্রিয় সদস্য")}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
                    <span className="text-xs text-slate-500 font-medium">{t("Autonomous System (ASN)", "স্বায়ত্তশাসিত সিস্টেম (ASN)")}</span>
                    <span className="text-xs font-bold text-brand-blue font-mono">AS150164</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
                    <span className="text-xs text-slate-500 font-medium">{t("Service Coverage", "পরিষেবা এলাকা")}</span>
                    <span className="text-xs font-bold text-slate-800">{t("South Keraniganj, Dhaka", "দক্ষিণ কেরানীগঞ্জ, ঢাকা")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-medium">{t("Line Configuration", "লাইন কনফিগারেশন")}</span>
                    <span className="text-xs font-bold text-emerald-600">{t("100% Fiber (FTTH)", "১০০% ফাইবার (FTTH)")}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Infrastructure highlights */}
          <div className="space-y-10 text-center pt-8 border-t border-slate-100">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900">{t("Infrastructure Powerhouse", "অবকাঠামোগত শক্তি")}</h2>
              <p className="text-slate-650 mt-2 text-sm leading-relaxed">
                {t("We leverage modern networking standards to maintain steady throughput, routing, and uptime.", "আমরা অবিচ্ছিন্ন থ্রুপুট, রাউটিং এবং আপটাইম বজায় রাখতে আধুনিক নেটওয়ার্কিং স্ট্যান্ডার্ড ব্যবহার করি।")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                {
                  title: "BGP Multi-Homing Routing",
                  desc: "By operating our own BGP network (AS150164), we peer with multiple major upstream Tier-1 network gateways. In the event of a fiber outage from one upstream gateway, our router automatically re-routes packets instantly.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  ),
                },
                {
                  title: "Local Exchange Peering",
                  desc: "We route directly to Bangladesh Internet Exchange (BDIX) and various local hosting centers. Subscribing to M Amin Network gives you access of up to 100 Mbps to local databases, FTP streaming archives, and live TV portals.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  ),
                },
                {
                  title: "24/7 On-Field Dispatch",
                  desc: "Unlike major centralized ISPs, our support center is localized right inside South Keraniganj. Our field crews, splicing engineers, and technical support assistants are situated nearby to provide instant physical repair service.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                },
              ].map((infra, i) => (
                <div
                  key={i}
                  className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-blue/20 hover:scale-[1.01] transition-all flex flex-col gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center border border-brand-blue/25">
                    {infra.icon}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 tracking-wide">
                    {t(infra.title, infra.title === "BGP Multi-Homing Routing" ? "বিজিপি মাল্টি-হোমিং রাউটিং" : infra.title === "Local Exchange Peering" ? "লোকাল এক্সচেঞ্জ পিয়ারিং" : "২৪/৭ অন-ফিল্ড ডিসপ্যাচ")}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {t(infra.desc, infra.desc.startsWith("By operating") ? "আমাদের নিজস্ব বিজিপি নেটওয়ার্ক (AS150164) পরিচালনা করে আমরা একাধিক আপস্ট্রিম টিয়ার-১ গেটওয়ের সাথে যুক্ত হয়েছি। কোনো একটি গেটওয়েতে বিভ্রাট দেখা দিলে আমাদের রাউটার তাৎক্ষণিকভাবে স্বয়ংক্রিয়ভাবে পথ পরিবর্তন করে।" : infra.desc.startsWith("We route") ? "আমরা সরাসরি বাংলাদেশ ইন্টারনেট এক্সচেঞ্জ (BDIX) এবং বিভিন্ন লোকাল হোস্টিং সেন্টারে ট্রাফিক রাউট করি। এম আমিন নেটওয়ার্কে সাবস্ক্রাইব করলে আপনি লোকাল ডাটাবেস ও এফটিপিতে ১০০ এমবিপিএস পর্যন্ত স্পিড পাবেন।" : "আমাদের সাপোর্ট সেন্টার দক্ষিণ কেরানীগঞ্জের ভেতরেই অবস্থিত। আমাদের অন-ফিল্ড টিম ও টেকনিশিয়ানরা যেকোনো শারীরিক ত্রুটি দ্রুত মেরামতের জন্য সবসময় প্রস্তুত থাকে।")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Corporate Integrity pledge */}
          <div className="p-8 sm:p-12 rounded-3xl bg-linear-to-r from-slate-50 to-slate-100/85 border border-slate-200 text-center relative overflow-hidden shadow-sm">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{t("Our Integrity Guarantee", "আমাদের সততার নিশ্চয়তা")}</h3>
            <p className="text-slate-650 max-w-2xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
              {t(
                "We adhere strictly to the guidelines and standards set forth by the Bangladesh Telecommunication Regulatory Commission (BTRC). We guarantee that you will receive the minimum committed bandwidth speeds as defined in your contract, with no hidden fair usage policies (FUP) or caps.",
                "আমরা বাংলাদেশ টেলিযোগাযোগ নিয়ন্ত্রণ কমিশন (বিটিআরসি)-এর গাইডলাইন কঠোরভাবে মেনে চলি। আমরা গ্যারান্টি দিচ্ছি যে আপনার চুক্তিতে নির্ধারিত গতি আপনি পাবেন, কোনো লুকানো ফেয়ার ইউজেজ পলিসি (FUP) বা ক্যাপ থাকবে না।"
              )}
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/packages"
                className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-sm transition-all cursor-pointer"
              >
                {t("Explore Packages", "প্যাকেজ সমূহ দেখুন")}
              </Link>
              <Link
                href="/support"
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 hover:text-brand-blue px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-sm"
              >
                {t("Support Center", "সহায়তা কেন্দ্র")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
