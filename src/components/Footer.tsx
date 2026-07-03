"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function Footer() {
  const lang = useTranslation();
  const t = (en: string, bn: string) => (lang === "BN" ? bn : en);

  return (
    <footer className="bg-brand-dark border-t border-brand-border/60 text-slate-300 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Logo and About */}
          <div className="flex flex-col gap-4 md:col-span-3">
            <Link href="/" className="flex items-center py-1">
              <img
                src="/logo.png"
                alt="M Amin Network"
                className="h-11 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              {t(
                "Top-tier Internet Service Provider (ISP) in South Keraniganj, Dhaka. Providing lightning-fast, buffer-free, SLA-backed broadband internet solutions for homes and businesses.",
                "দক্ষিণ কেরানীগঞ্জ, ঢাকার শীর্ষস্থানীয় ইন্টারনেট সেবা প্রদানকারী (ISP)। আমরা বাসা ও অফিসের জন্য অতি-দ্রুত, বাফার-মুক্ত, এবং SLA-সমর্থিত ব্রডব্যান্ড ইন্টারনেট সেবা প্রদান করি।"
              )}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="bg-brand-border px-2.5 py-1 rounded text-brand-cyan font-mono border border-brand-border/80">
                ASN: AS150164
              </span>
              <span className="bg-brand-border px-2.5 py-1 rounded text-emerald-400 font-semibold border border-brand-border/80">
                {t("BTRC Licensed", "বিটিআরসি অনুমোদিত")}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              {t("Quick Links", "কুইক লিংক")}
            </h3>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="hover:text-brand-cyan transition-colors">
                    {t("Home", "হোম")}
                  </Link>
                </li>
                <li>
                  <Link href="/packages" className="hover:text-brand-cyan transition-colors">
                    {t("Packages", "প্যাকেজ")}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-brand-cyan transition-colors">
                    {t("About", "আমাদের সম্পর্কে")}
                  </Link>
                </li>
                <li>
                  <Link href="/offers" className="hover:text-brand-cyan transition-colors">
                    {t("Offers", "অফার")}
                  </Link>
                </li>
              </ul>
              <ul className="space-y-3">
                <li>
                  <Link href="/coverage" className="hover:text-brand-cyan transition-colors">
                    {t("Coverage", "কাভারেজ")}
                  </Link>
                </li>
                <li>
                  <Link href="/multimedia" className="hover:text-brand-cyan transition-colors">
                    {t("Multimedia", "মাল্টিমিডিয়া")}
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-brand-cyan transition-colors">
                    {t("Diagnostics", "ডায়াগনস্টিকস")}
                  </Link>
                </li>
                <li>
                  <Link href="/bill-payment" className="hover:text-brand-cyan transition-colors">
                    {t("Pay Bill", "বিল পরিশোধ")}
                  </Link>
                </li>
              </ul>
              <ul className="space-y-3">
                <li>
                  <Link href="/contact" className="hover:text-brand-cyan transition-colors">
                    {t("Contact", "যোগাযোগ")}
                  </Link>
                </li>
                <li>
                  <Link href="/complain" className="hover:text-brand-cyan transition-colors">
                    {t("Complain", "অভিযোগ")}
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-brand-cyan transition-colors">
                    {t("Careers", "ক্যারিয়ার")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              {t("Contact Info", "যোগাযোগ")}
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex gap-2.5 items-start">
                <svg
                  className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span>
                  {t(
                    "House No. 68, Kadomtoli, Aganagar, South Keraniganj, Dhaka-1310, Bangladesh.",
                    "বাসা নং ৬৮, কদমতলী, আগানগর, দক্ষিণ কেরানীগঞ্জ, ঢাকা-১৩১০, বাংলাদেশ।"
                  )}
                </span>
              </li>
              <li className="flex gap-2.5 items-center">
                <svg
                  className="w-5 h-5 text-brand-cyan flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.47-5.114-3.758-6.583-6.583l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <a href="tel:+8801707009267" className="hover:text-brand-cyan transition-colors">
                  +880 1707-009267
                </a>
              </li>
              <li className="flex gap-2.5 items-center">
                <svg
                  className="w-5 h-5 text-brand-cyan flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <a
                  href="mailto:info@m-aminnetwork.com"
                  className="hover:text-brand-cyan transition-colors"
                >
                  info@m-aminnetwork.com
                </a>
              </li>
            </ul>
          </div>

          {/* Affiliation and Badges */}
          <div className="md:col-span-2">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              {t("Our Affiliations", "আমাদের অধিভুক্তি")}
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              {t(
                "We are a proud, active member of the Internet Service Providers Association of Bangladesh (ISPAB).",
                "আমরা ইন্টারনেট সার্ভিস প্রোভাইডার অ্যাসোসিয়েশন অব বাংলাদেশ (ISPAB)-এর একজন গর্বিত ও সক্রিয় সদস্য।"
              )}
            </p>
            <div className="flex flex-col gap-2">
              <div className="p-3 rounded-lg bg-brand-card border border-brand-border text-center flex items-center justify-center">
                <span className="text-xs font-bold tracking-widest text-slate-300">
                  {t("ISPAB MEMBER", "আইএসপিএবি সদস্য")}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-brand-card border border-brand-border text-center flex items-center justify-center">
                <span className="text-xs font-bold tracking-widest text-brand-cyan">
                  {t("AS150164 BGP NETWORK", "AS150164 বিজিপি নেটওয়ার্ক")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-brand-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} M Amin Network. {t("All Rights Reserved.", "সর্বস্বত্ব সংরক্ষিত।")}
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <Link href="/" className="hover:text-brand-cyan transition-colors">
              {t("Privacy Policy", "গোপনীয়তা নীতি")}
            </Link>
            <span>&bull;</span>
            <Link href="/" className="hover:text-brand-cyan transition-colors">
              {t("Terms of Service", "ব্যবহারের শর্তাবলী")}
            </Link>
            <span>&bull;</span>
            <span className="text-slate-400">{t("Keraniganj ISP", "কেরানীগঞ্জ আইএসপি")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
