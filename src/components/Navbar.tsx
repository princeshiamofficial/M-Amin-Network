"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getSetting } from "@/actions/content";

interface NavLink {
  nameEn: string;
  nameBn?: string;
  href: string;
}

interface TopbarContent {
  hotline: string;
  availabilityText: string;
}

type LogoVariant = "horizontal" | "square";

const getLogoUrl = (value: unknown, variant: LogoVariant = "horizontal"): string | null => {
  const preferredKey = variant === "square" ? "squareUrl" : "horizontalUrl";
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record[preferredKey] === "string") return record[preferredKey];
    if (typeof record.url === "string") return record.url;
  }
  if (Array.isArray(value)) {
    const firstLogo = value.find((item) => item && typeof item === "object" && "url" in item);
    if (firstLogo && typeof firstLogo === "object" && "url" in firstLogo && typeof firstLogo.url === "string") {
      return firstLogo.url;
    }
  }
  return null;
};

const defaultTopbarContent: TopbarContent = {
  hotline: "+880 1901-348400",
  availabilityText: "24/7 — Call Any Time",
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [lang, setLang] = useState("EN");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getActiveLangFromCookie = () => {
        const match = document.cookie.match(/googtrans=([^;]+)/);
        if (match && match[1] && match[1].includes("/bn")) {
          return "BN";
        }
        return localStorage.getItem("app-lang") || "EN";
      };
      setLang(getActiveLangFromCookie());
    }
  }, []);

  const defaultNavLinks: NavLink[] = [
    { nameEn: "Home", href: "/" },
    { nameEn: "Packages", href: "/packages" },
    { nameEn: "Offers", href: "/offers" },
    { nameEn: "Coverage", href: "/coverage" },
    { nameEn: "Multimedia", href: "/multimedia" },
    { nameEn: "Complain", href: "/complain" },
    { nameEn: "Pay Bill", href: "/bill-payment" },
    { nameEn: "Careers", href: "/careers" },
    { nameEn: "Contact", href: "/contact" },
    { nameEn: "About", href: "/about" },
  ];

  const [linksList, setLinksList] = useState<NavLink[]>(defaultNavLinks);
  const [siteLogo, setSiteLogo] = useState<string>("/logo.png");
  const [topbarContent, setTopbarContent] = useState<TopbarContent>(defaultTopbarContent);

  const handleLangChange = (newLang: string) => {
    setLang(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("app-lang", newLang);
      const domain = window.location.hostname;
      if (newLang === "BN") {
        document.cookie = "googtrans=/en/bn; path=/";
        document.cookie = `googtrans=/en/bn; path=/; domain=${domain}`;
        if (domain.includes(".")) {
          const parts = domain.split(".");
          if (parts.length >= 2) {
            const rootDomain = "." + parts.slice(-2).join(".");
            document.cookie = `googtrans=/en/bn; path=/; domain=${rootDomain}`;
          }
        }
      } else {
        document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        if (domain.includes(".")) {
          const parts = domain.split(".");
          if (parts.length >= 2) {
            const rootDomain = "." + parts.slice(-2).join(".");
            document.cookie = `googtrans=; path=/; domain=${rootDomain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          }
        }
      }
      window.dispatchEvent(new Event("languageChange"));
      window.location.reload();
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
      getSetting("nav_links")
        .then((saved) => {
          if (saved && Array.isArray(saved) && saved.length > 0) {
            setLinksList(saved as NavLink[]);
          }
        })
        .catch(() => {
          // Fallback to defaultNavLinks on error
        });
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      getSetting("site_logo").then(saved => {
        const logoUrl = getLogoUrl(saved, "horizontal");
        if (logoUrl) setSiteLogo(logoUrl);
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      getSetting("topbar_content").then(saved => {
        if (saved && typeof saved === "object" && !Array.isArray(saved)) {
          setTopbarContent(prev => ({
            ...prev,
            ...(saved as Record<string, unknown> as unknown as TopbarContent)
          }));
        }
      });
    }
  }, []);

  const t = (en: string, bn?: string) => (lang === "BN" && bn ? bn : en);
  const hotlineHref = topbarContent.hotline.replace(/[^\d+]/g, "");

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
              <span className="text-[10px] font-black tracking-wider uppercase">{"Hotline"}</span>
            </div>
            <a href={`tel:${hotlineHref}`} className="hover:text-brand-cyan transition-colors font-bold font-mono text-slate-200">
              {topbarContent.hotline}
            </a>
          </div>
          
          <div className="flex items-center gap-1.5 font-semibold text-white">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="text-white">{topbarContent.availabilityText}</span>
          </div>
        </div>
      </div>

      <div className={`w-full px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        scrolled ? "py-1.5" : "py-2.5"
      }`}>
        <div className="flex items-center justify-between h-11">
          {/* Logo */}
          <div className="shrink-0">
            <Link
              href="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  window.scrollTo({ top: 0, behavior: "instant" });
                }
              }}
              className="flex items-center py-1 cursor-pointer"
            >
              <Image
                src={siteLogo}
                alt="M Amin Network"
                width={160}
                height={40}
                className="h-10 w-40 object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {linksList.map((link) => {
              const isActive = pathname === link.href;
              const linkName = t(link.nameEn, link.nameBn ?? "");
              return (
                <Link
                  key={link.href + linkName}
                  href={link.href}
                  className={`text-sm font-semibold transition-all duration-200 px-3 py-1.5 rounded-full flex items-center gap-1 ${
                    isActive
                      ? "bg-brand-blue/10 force-active-link"
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
              <button className="flex items-center gap-1.5 hover:text-brand-blue transition-colors font-semibold text-sm text-slate-600">
                <Image
                  src={lang === "EN" ? "https://www.untitledui.com/images/flags/GB.svg" : "https://www.untitledui.com/images/flags/BD.svg"}
                  alt={lang === "EN" ? "English" : "Bangla"}
                  width={16}
                  height={16}
                  className="rounded-full object-cover size-4 shrink-0"
                />
                <span className="notranslate">{lang === "EN" ? "English" : "বাংলা"}</span>
                <svg className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180 text-slate-500 group-hover:text-brand-blue" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-1 w-32 rounded-lg bg-white border border-slate-200 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-1 font-sans">
                <button
                  onClick={() => handleLangChange("EN")}
                  className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 transition-colors text-xs font-semibold flex items-center justify-between ${
                    lang === "EN" ? "text-brand-blue bg-brand-blue/5" : "text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src="https://www.untitledui.com/images/flags/GB.svg"
                      alt="English"
                      width={14}
                      height={14}
                      className="rounded-full object-cover size-3.5 shrink-0"
                    />
                    <span className="notranslate">English</span>
                  </div>
                  {lang === "EN" && <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0"></span>}
                </button>
                <button
                  onClick={() => handleLangChange("BN")}
                  className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 transition-colors text-xs font-semibold flex items-center justify-between ${
                    lang === "BN" ? "text-brand-blue bg-brand-blue/5" : "text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src="https://www.untitledui.com/images/flags/BD.svg"
                      alt="Bangla"
                      width={14}
                      height={14}
                      className="rounded-full object-cover size-3.5 shrink-0"
                    />
                    <span className="notranslate">বাংলা</span>
                  </div>
                  {lang === "BN" && <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0"></span>}
                </button>
              </div>
            </div>

            {/* Client Portal Button */}
            <Link
              href="/portal"
              className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-linear-to-r from-brand-blue to-brand-cyan text-brand-dark font-extrabold text-xs shadow-md shadow-brand-blue/15 hover:shadow-lg hover:shadow-brand-blue/20 hover:scale-[1.02] transition-all cursor-pointer"
            >
              {"Client Portal"}
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
            const linkName = link.nameEn;
            return (
              <Link
                key={link.href + linkName}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-3 rounded-lg text-base font-medium transition-colors flex items-center justify-between ${
                  isActive
                    ? "bg-brand-blue/10 force-active-link border-l-4 border-brand-blue"
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
            <span className="text-slate-500 text-sm font-semibold">{"Language"}</span>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => handleLangChange("EN")}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                  lang === "EN" ? "bg-white text-brand-blue shadow-sm" : "text-slate-500"
                }`}
              >
                <Image
                  src="https://www.untitledui.com/images/flags/GB.svg"
                  alt="English"
                  width={14}
                  height={14}
                  className="rounded-full object-cover size-3.5 shrink-0"
                />
                <span className="notranslate">English</span>
              </button>
              <button
                onClick={() => handleLangChange("BN")}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                  lang === "BN" ? "bg-white text-brand-blue shadow-sm" : "text-slate-500"
                }`}
              >
                <Image
                  src="https://www.untitledui.com/images/flags/BD.svg"
                  alt="Bangla"
                  width={14}
                  height={14}
                  className="rounded-full object-cover size-3.5 shrink-0"
                />
                <span className="notranslate">বাংলা</span>
              </button>
            </div>
          </div>

          <div className="pt-2 pb-2 mt-2">
            <Link
              href="/portal"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-3 rounded-xl bg-linear-to-r from-brand-blue to-brand-cyan text-white text-base font-semibold shadow-lg shadow-brand-blue/20"
            >
              {"Client Portal"}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

