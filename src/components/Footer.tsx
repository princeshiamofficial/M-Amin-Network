"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { getSetting } from "@/actions/content";

interface FooterData {
  facebook: string;
  youtube: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  addressEn: string;
  addressBn?: string;
  email: string;
}

interface AffiliationBadge {
  textEn: string;
  textBn?: string;
  isCyan: boolean;
  image?: string;
}

interface LicenseBadge {
  textEn: string;
  textBn?: string;
  isMono: boolean;
  colorStyle: string; // "cyan" | "emerald" | "slate"
  image?: string;
}

interface NavLink {
  nameEn: string;
  nameBn?: string;
  href: string;
}

const defaultFooterData: FooterData = {
  facebook: "https://facebook.com/maminnetwork",
  youtube: "https://youtube.com/maminnetwork",
  instagram: "https://instagram.com/maminnetwork",
  twitter: "https://x.com/maminnetwork",
  linkedin: "https://linkedin.com/company/maminnetwork",
  addressEn: "House No. 68, Kadomtoli, Aganagar, South Keraniganj, Dhaka-1310, Bangladesh.",
  email: "info@m-aminnetwork.com",
};

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

const defaultBadges: AffiliationBadge[] = [
  { textEn: "ISPAB MEMBER", isCyan: false, image: "/ispab.jpeg" },
  { textEn: "AS150164 BGP NETWORK", isCyan: true }
];

const defaultLicenses: LicenseBadge[] = [
  { textEn: "ASN: AS150164", textBn: "ASN: AS150164", isMono: true, colorStyle: "cyan" },
  { textEn: "BTRC Licensed", isMono: false, colorStyle: "emerald", image: "/btrc.png" }
];

const defaultPhones = ["+880 1707-009267"];
const imageBadgeFallbackText = "Image Badge";

function textValue(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function normalizeFooterData(value: unknown): FooterData {
  const record = value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};

  return {
    facebook: textValue(record.facebook, defaultFooterData.facebook),
    youtube: textValue(record.youtube, defaultFooterData.youtube),
    instagram: textValue(record.instagram, defaultFooterData.instagram),
    twitter: textValue(record.twitter, defaultFooterData.twitter),
    linkedin: textValue(record.linkedin, defaultFooterData.linkedin),
    addressEn: textValue(record.addressEn, defaultFooterData.addressEn),
    addressBn: textValue(record.addressBn ?? "", defaultFooterData.addressBn ?? ""),
    email: textValue(record.email, defaultFooterData.email),
  };
}

function normalizeAffiliationBadge(value: unknown): AffiliationBadge {
  const record = value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
  const textEn = textValue(record.textEn, imageBadgeFallbackText).trim() || imageBadgeFallbackText;
  const textBn = textValue(record.textBn ?? "", imageBadgeFallbackText).trim() || imageBadgeFallbackText;
  const savedImage = textValue(record.image, "").trim();
  const shouldUseDefaultIspabImage = textEn.toUpperCase().includes("ISPAB") && !savedImage;

  return {
    textEn,
    textBn,
    isCyan: record.isCyan === true,
    image: savedImage || (shouldUseDefaultIspabImage ? "/ispab.jpeg" : undefined),
  };
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

function normalizePhoneList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (typeof item === "string" || typeof item === "number") {
        return String(item);
      }

      if (item && typeof item === "object") {
        const record = item as Record<string, unknown>;
        const candidate = record.value ?? record.phone ?? record.number ?? record.text;
        if (typeof candidate === "string" || typeof candidate === "number") {
          return String(candidate);
        }
      }

      return "";
    })
    .map((phone) => phone.trim())
    .filter(Boolean);
}

export default function Footer() {
  const lang = useTranslation();
  const t = (en: string, bn: string) => (lang === "BN" ? bn : en);
  const pathname = usePathname();

  const [footerData, setFooterData] = React.useState<FooterData>(defaultFooterData);
  const [badges, setBadges] = React.useState<AffiliationBadge[]>(defaultBadges);
  const [licenses, setLicenses] = React.useState<LicenseBadge[]>(defaultLicenses);
  const [phones, setPhones] = React.useState<string[]>(defaultPhones);
  const [siteLogo, setSiteLogo] = React.useState<string>("/logo.png");
  const [linksList, setLinksList] = React.useState<NavLink[]>(defaultNavLinks);

  React.useEffect(() => {
    async function loadFooterSettings() {
      try {
        const saved = await getSetting("footer_content");
        if (saved) {
          setFooterData(normalizeFooterData(saved));
        }
      } catch (e) {
        console.error("Error loading footer configuration:", e);
      }

      try {
        const savedLogo = await getSetting("site_logo");
        const logoUrl = getLogoUrl(savedLogo, "horizontal");
        if (logoUrl) setSiteLogo(logoUrl);
      } catch (e) {
        console.error("Error loading site logo:", e);
      }

      try {
        const savedBadges = await getSetting("footer_badges");
        if (savedBadges && Array.isArray(savedBadges) && savedBadges.length > 0) {
          setBadges(savedBadges.map(normalizeAffiliationBadge));
        }
      } catch (e) {
        console.error("Error loading badges configuration:", e);
      }

      try {
        const savedLicenses = await getSetting("footer_licenses");
        if (savedLicenses && Array.isArray(savedLicenses) && savedLicenses.length > 0) {
          const migrated = (savedLicenses as unknown as LicenseBadge[]).map((lic) => {
            if (lic.textEn === "BTRC Licensed" && !lic.image) {
              return { ...lic, image: "/btrc.png" };
            }
            return lic;
          });
          setLicenses(migrated);
        }
      } catch (e) {
        console.error("Error loading licenses configuration:", e);
      }

      try {
        const savedPhones = await getSetting("footer_phones");
        const normalizedPhones = normalizePhoneList(savedPhones);
        if (normalizedPhones.length > 0) {
          setPhones(normalizedPhones);
        }
      } catch (e) {
        console.error("Error loading phones configuration:", e);
      }

      try {
        const savedLinks = await getSetting("nav_links");
        if (savedLinks && Array.isArray(savedLinks) && savedLinks.length > 0) {
          setLinksList(savedLinks as NavLink[]);
        }
      } catch {
        // Fallback to defaultNavLinks
      }
    }
    loadFooterSettings();
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  const totalLinks = linksList.length;
  const itemsPerCol = Math.ceil(totalLinks / 3);
  const col1 = linksList.slice(0, itemsPerCol);
  const col2 = linksList.slice(itemsPerCol, itemsPerCol * 2);
  const col3 = linksList.slice(itemsPerCol * 2);

  return (
    <footer
      className="relative border-t border-brand-border/60 text-slate-300 pt-16 pb-8 mt-auto bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'linear-gradient(to bottom, rgba(9, 13, 24, 0.93), rgba(9, 13, 24, 0.97)), url("/footer-bg.jpg")'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Logo and About */}
          <div className="flex flex-col gap-4 md:col-span-3">
            <Link href="/" className="inline-block relative z-10 w-[200px]">
              <Image
                src={siteLogo}
                alt="M Amin Network"
                width={200}
                height={44}
                className="h-11 w-[200px] object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              {"Top-tier Internet Service Provider (ISP) in South Keraniganj, Dhaka. Providing lightning-fast, buffer-free, SLA-backed broadband internet solutions for homes and businesses."}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs flex-wrap">
              {licenses.map((lic, idx) => {
                if (lic.image) {
                  return (
                    <div key={idx} className="flex items-center shrink-0">
                      <Image
                        src={lic.image}
                        alt={lic.textEn}
                        width={100}
                        height={30}
                        style={{ width: "auto", height: "auto" }}
                        className="max-h-[30px] object-contain brightness-95 hover:brightness-100 transition-all duration-200"
                      />
                    </div>
                  );
                }

                let colorClass = "text-slate-400";
                if (lic.colorStyle === "cyan") colorClass = "text-brand-cyan";
                if (lic.colorStyle === "emerald") colorClass = "text-emerald-400";

                return (
                  <span
                    key={idx}
                    className={`bg-brand-border px-2.5 py-1 rounded border border-brand-border/80 ${colorClass} ${
                      lic.isMono ? "font-mono" : "font-semibold"
                    }`}
                  >
                    {t(lic.textEn, lic.textBn ?? "")}
                  </span>
                );
              })}
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-2 mt-4">
              {footerData.facebook && (
                <a
                  href={footerData.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-brand-border/40 border border-brand-border/60 hover:border-brand-cyan/50 hover:bg-brand-blue/15 text-slate-400 hover:text-brand-cyan transition-all flex items-center justify-center cursor-pointer shadow-xs"
                  title="Follow us on Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
              {footerData.youtube && (
                <a
                  href={footerData.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-brand-border/40 border border-brand-border/60 hover:border-brand-cyan/50 hover:bg-brand-blue/15 text-slate-400 hover:text-brand-cyan transition-all flex items-center justify-center cursor-pointer shadow-xs"
                  title="Subscribe on YouTube"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.553a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.553 9.388.553 9.388.553s7.518 0 9.388-.553a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
              {footerData.instagram && (
                <a
                  href={footerData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-brand-border/40 border border-brand-border/60 hover:border-brand-cyan/50 hover:bg-brand-blue/15 text-slate-400 hover:text-brand-cyan transition-all flex items-center justify-center cursor-pointer shadow-xs"
                  title="Follow us on Instagram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.88 4.88 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.01 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.065.218-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.637-.248 1.362-.415 2.428-.465C8.944 2.01 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
              {footerData.twitter && (
                <a
                  href={footerData.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-brand-border/40 border border-brand-border/60 hover:border-brand-cyan/50 hover:bg-brand-blue/15 text-slate-400 hover:text-brand-cyan transition-all flex items-center justify-center cursor-pointer shadow-xs"
                  title="Follow us on X"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
              {footerData.linkedin && (
                <a
                  href={footerData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-brand-border/40 border border-brand-border/60 hover:border-brand-cyan/50 hover:bg-brand-blue/15 text-slate-400 hover:text-brand-cyan transition-all flex items-center justify-center cursor-pointer shadow-xs"
                  title="Follow us on LinkedIn"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              {"Quick Links"}
            </h3>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <ul className="space-y-3">
                {col1.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-brand-cyan transition-colors">
                      {t(link.nameEn, link.nameBn ?? "")}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3">
                {col2.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-brand-cyan transition-colors">
                      {t(link.nameEn, link.nameBn ?? "")}
                    </Link>
                  </li>
                ))}
                <li>
                  <a href="/btrc-tariff.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-brand-cyan transition-colors whitespace-nowrap">
                    {"BTRC Approved Tariff"}
                  </a>
                </li>
              </ul>
              <ul className="space-y-3">
                {col3.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-brand-cyan transition-colors">
                      {t(link.nameEn, link.nameBn ?? "")}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              {"Contact Info"}
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex gap-2.5 items-start">
                <svg
                  className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5"
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
                  {t(footerData.addressEn, footerData.addressBn ?? "")}
                </span>
              </li>
              {phones.map((phone, idx) => (
                <li key={idx} className="flex gap-2.5 items-center">
                  <svg
                    className="w-5 h-5 text-brand-cyan shrink-0"
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
                  <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="hover:text-brand-cyan transition-colors font-mono">
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex gap-2.5 items-center">
                <svg
                  className="w-5 h-5 text-brand-cyan shrink-0"
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
                  href={`mailto:${footerData.email}`}
                  className="hover:text-brand-cyan transition-colors"
                >
                  {footerData.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Affiliation and Badges */}
          <div className="md:col-span-2">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              {"Our Affiliations"}
            </h3>
            <p className="text-sm text-slate-400 mt-2 mb-4 leading-relaxed max-w-[280px]">
              {"We are a proud, active member of the Internet Service Providers Association of Bangladesh (ISPAB)."}
            </p>
            <div className="flex flex-col gap-3">
              {badges.map((badge, idx) => {
                if (badge.image) {
                  return (
                    <div key={idx} className="p-2.5 rounded-lg bg-white/95 border border-brand-border text-center flex items-center justify-center min-h-[50px] w-full max-w-[180px] overflow-hidden">
                      <Image
                        src={badge.image}
                        alt={badge.textEn}
                        width={160}
                        height={50}
                        className="max-h-10 w-full object-contain"
                      />
                    </div>
                  );
                }
                return (
                  <div key={idx} className="p-3 rounded-lg bg-brand-card border border-brand-border text-center flex items-center justify-center min-h-[50px]">
                    <span className={`text-xs font-bold tracking-widest leading-normal ${badge.isCyan ? "text-brand-cyan" : "text-slate-300"}`}>
                      {t(badge.textEn, badge.textBn ?? "")}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SSLCommerz Payment Gateway Partner */}
        <div className="border-t border-brand-border/40 pt-4 pb-2 flex justify-center items-center">
          <div className="w-full flex justify-center items-center">
            <Image
              src="/sslcommerz-foo2.webp"
              alt="SSLCommerz Payment Gateway Partner"
              width={1200}
              height={150}
              className="w-full h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            {"© 2026 M Amin Network. All Rights Reserved."}
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <Link href="/" className="hover:text-brand-cyan transition-colors">
              {"Privacy Policy"}
            </Link>
            <span>&bull;</span>
            <Link href="/" className="hover:text-brand-cyan transition-colors">
              {"Terms of Service"}
            </Link>
            <span>&bull;</span>
            <span className="text-slate-400">{"Keraniganj ISP"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

