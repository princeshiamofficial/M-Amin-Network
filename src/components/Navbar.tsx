"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getSetting } from "@/actions/content";

interface NavLink {
  nameEn: string;
  nameBn: string;
  href: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("app-lang") || "EN";
    }
    return "EN";
  });

  const defaultNavLinks: NavLink[] = [
    { nameEn: "Home", nameBn: "হোম", href: "/" },
    { nameEn: "Packages", nameBn: "প্যাকেজ", href: "/packages" },
    { nameEn: "Offers", nameBn: "অফার", href: "/offers" },
    { nameEn: "Coverage", nameBn: "কাভারেজ", href: "/coverage" },
    { nameEn: "Multimedia", nameBn: "মাল্টিমিডিয়া", href: "/multimedia" },
    { nameEn: "Complain", nameBn: "অভিযোগ", href: "/complain" },
    { nameEn: "Pay Bill", nameBn: "বিল পরিশোধ", href: "/bill-payment" },
    { nameEn: "Careers", nameBn: "ক্যারিয়ার", href: "/careers" },
    { nameEn: "Contact", nameBn: "যোগাযোগ", href: "/contact" },
    { nameEn: "About", nameBn: "আমাদের সম্পর্কে", href: "/about" },
  ];

  const [linksList, setLinksList] = useState<NavLink[]>(defaultNavLinks);

  const handleLangChange = (newLang: string) => {
    setLang(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("app-lang", newLang);
      window.dispatchEvent(new Event("languageChange"));
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.remove("theme-light");
    }

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nav_links");
      if (saved) {
        try {
          setLinksList(JSON.parse(saved));
        } catch (e) {
          console.error("Error parsing nav links config:", e);
        }
      }
    }
  }, []);

  const [offerCount, setOfferCount] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      getSetting("promo_offers").then((offers) => {
        if (Array.isArray(offers) && offers.length > 0) {
          setOfferCount(offers.length);
        } else {
          setOfferCount(4);
        }
      }).catch(() => {
        setOfferCount(4);
      });
    }
  }, []);

  const t = (en: string, bn: string) => (lang === "BN" ? bn : en);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm"
    >
      {/* Top Utility Bar */}
      <div className={`bg-brand-dark/95 border-b border-brand-border/20 text-slate-300 text-xs py-1.5 transition-all duration-300 overflow-hidden ${
        scrolled ? "max-h-0 opacity-0 py-0 border-b-0" : "max-h-12 opacity-100"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full px-2 py-0.5 text-brand-cyan">
              <svg
                className="w-3 h-3 animate-pulse"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 0 1-7.108-7.108c-.155-.44.01-1.029.387-1.31l1.293-.97c.362-.271.528-.733.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
              <span className="text-[10px] font-black tracking-wider uppercase">{t("Hotline", "হটলাইন")}</span>
            </div>
            <a href="tel:+8801901348400" className="hover:text-brand-cyan transition-colors font-bold font-mono text-slate-200">
              +880 1901-348400
            </a>
          </div>
          
          <div className="flex items-center gap-1.5 font-semibold text-slate-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>{t("24/7 — Call Any Time", "২৪/৭ — যেকোনো সময় কল")}</span>
          </div>
        </div>
      </div>

      <div className={`w-full px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        scrolled ? "py-1.5" : "py-2.5"
      }`}>
        <div className="flex items-center justify-between h-11">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center py-1">
              <Image
                src="/logo.png"
                alt="M Amin Network"
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {linksList.map((link) => {
              const isActive = pathname === link.href;
              const linkName = t(link.nameEn, link.nameBn);
              return (
                <Link
                  key={link.href + linkName}
                  href={link.href}
                  className={`text-sm font-semibold transition-all duration-200 px-3 py-1.5 rounded-full flex items-center gap-1 ${
                    isActive
                      ? "bg-brand-blue/10 !text-brand-blue"
                      : "text-slate-600 hover:text-brand-blue hover:bg-slate-100/50"
                  }`}
                >
                  <span>{linkName}</span>
                  {link.href === "/offers" && offerCount !== null && (
                    <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full leading-none min-w-[16px] text-center">
                      {offerCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Client Portal Button & Language Selector */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher Dropdown */}
            <div className="relative group py-1">
              <button className="flex items-center gap-1 hover:text-brand-blue transition-colors font-semibold text-sm text-slate-600">
                <svg className="w-4 h-4 text-slate-500 group-hover:text-brand-blue transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <span>{lang}</span>
                <svg className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180 text-slate-500 group-hover:text-brand-blue" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-1 w-24 rounded-lg bg-white border border-slate-200 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-1 font-sans">
                <button
                  onClick={() => handleLangChange("EN")}
                  className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 transition-colors text-xs font-semibold flex items-center justify-between ${
                    lang === "EN" ? "text-brand-blue bg-brand-blue/5" : "text-slate-700"
                  }`}
                >
                  <span>English</span>
                  {lang === "EN" && <span className="w-1.5 h-1.5 rounded-full bg-brand-blue"></span>}
                </button>
                <button
                  onClick={() => handleLangChange("BN")}
                  className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 transition-colors text-xs font-semibold flex items-center justify-between ${
                    lang === "BN" ? "text-brand-blue bg-brand-blue/5" : "text-slate-700"
                  }`}
                >
                  <span>বাংলা</span>
                  {lang === "BN" && <span className="w-1.5 h-1.5 rounded-full bg-brand-blue"></span>}
                </button>
              </div>
            </div>

            {/* Client Portal Button */}
            <Link
              href="/portal"
              className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-linear-to-r from-brand-blue to-brand-cyan text-brand-dark font-extrabold text-xs shadow-md shadow-brand-blue/15 hover:shadow-lg hover:shadow-brand-blue/20 hover:scale-[1.02] transition-all cursor-pointer"
            >
              {t("Client Portal", "গ্রাহক পোর্টাল")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible overflow-hidden"
        }`}
        id="mobile-menu"
      >
        <div className="px-4 pt-2 pb-3 space-y-1 bg-white border-b border-slate-200/80 backdrop-blur-lg">
          {linksList.map((link) => {
            const isActive = pathname === link.href;
            const linkName = t(link.nameEn, link.nameBn);
            return (
              <Link
                key={link.href + linkName}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-3 rounded-lg text-base font-medium transition-colors flex items-center justify-between ${
                  isActive
                    ? "bg-brand-blue/10 !text-brand-blue border-l-4 border-brand-blue"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span>{linkName}</span>
                {link.href === "/offers" && offerCount !== null && (
                  <span className="px-2 py-0.5 bg-red-500 text-white text-[11px] font-bold rounded-full leading-none text-center">
                    {offerCount}
                  </span>
                )}
              </Link>
            );
          })}
          <div className="flex items-center justify-between py-3 border-t border-slate-100 mt-2 px-2">
            <span className="text-slate-500 text-sm font-semibold">{t("Language", "ভাষা")}</span>
            <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg">
              <button
                onClick={() => handleLangChange("EN")}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  lang === "EN" ? "bg-white text-brand-blue shadow-sm" : "text-slate-500"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLangChange("BN")}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  lang === "BN" ? "bg-white text-brand-blue shadow-sm" : "text-slate-500"
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>

          <div className="pt-2 pb-2 mt-2">
            <Link
              href="/portal"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-3 rounded-xl bg-linear-to-r from-brand-blue to-brand-cyan text-white text-base font-semibold shadow-lg shadow-brand-blue/20"
            >
              {t("Client Portal", "গ্রাহক পোর্টাল")}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

