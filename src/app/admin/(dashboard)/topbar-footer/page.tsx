"use client";
import { toast } from "sonner";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import {
  Info,
  Mail,
  Building,
  Globe,
  ArrowUp,
  ArrowDown,
  Plus,
  Trash2,
  Menu,
  Upload
} from "lucide-react";

interface FooterContent {
  facebook: string;
  youtube: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  copyrightText: string;
  copyrightTextBn: string;
  aboutTextEn: string;
  aboutTextBn: string;
  asnText: string;
  btrcTextEn: string;
  btrcTextBn: string;
  addressEn: string;
  addressBn: string;
  phone: string;
  email: string;
  aff1En: string;
  aff1Bn: string;
  aff2En: string;
  aff2Bn: string;
  quickLinksTitleEn: string;
  quickLinksTitleBn: string;
  contactTitleEn: string;
  contactTitleBn: string;
  affiliationTitleEn: string;
  affiliationTitleBn: string;
  affiliationDescEn: string;
  affiliationDescBn: string;
  privacyTextEn: string;
  privacyTextBn: string;
  termsTextEn: string;
  termsTextBn: string;
  brandTextEn: string;
  brandTextBn: string;
}

interface NavLink {
  nameEn: string;
  nameBn: string;
  href: string;
}

interface TopbarContent {
  hotline: string;
  availabilityText: string;
}

interface AffiliationBadge {
  textEn: string;
  textBn: string;
  isCyan: boolean;
  image?: string;
}

interface LicenseBadge {
  textEn: string;
  textBn: string;
  isMono: boolean;
  colorStyle: string; // "cyan" | "emerald" | "slate"
  image?: string;
}

const defaultFooterContent: FooterContent = {
  facebook: "https://facebook.com/maminnetwork",
  youtube: "https://youtube.com/maminnetwork",
  instagram: "https://instagram.com/maminnetwork",
  twitter: "https://x.com/maminnetwork",
  linkedin: "https://linkedin.com/company/maminnetwork",
  copyrightText: "© 2026 M Amin Network. All Rights Reserved.",
  copyrightTextBn: "© 2026 এম আমিন নেটওয়ার্ক। সর্বস্বত্ব সংরক্ষিত।",
  aboutTextEn: "Top-tier Internet Service Provider (ISP) in South Keraniganj, Dhaka. Providing lightning-fast, buffer-free, SLA-backed broadband internet solutions for homes and businesses.",
  aboutTextBn: "দক্ষিণ কেরানীগঞ্জ, ঢাকার শীর্ষস্থানীয় ইন্টারনেট সেবা প্রদানকারী (ISP)। আমরা বাসা ও অফিসের জন্য অতি-দ্রুত, বাফার-মুক্ত, এবং SLA-সমর্থিত ব্রডব্যান্ড ইন্টারনেট সেবা প্রদান করি।",
  asnText: "AS150164",
  btrcTextEn: "BTRC Licensed",
  btrcTextBn: "বিটিআরসি অনুমোদিত",
  addressEn: "House No. 68, Kadomtoli, Aganagar, South Keraniganj, Dhaka-1310, Bangladesh.",
  addressBn: "বাসা নং ৬৮, কদমতলী, আগানগর, দক্ষিণ কেরানীগঞ্জ, ঢাকা-১৩১০, বাংলাদেশ।",
  phone: "+880 1707-009267",
  email: "info@m-aminnetwork.com",
  aff1En: "ISPAB MEMBER",
  aff1Bn: "আইএসপিএবি সদস্য",
  aff2En: "AS150164 BGP NETWORK",
  aff2Bn: "AS150164 বিজিপি নেটওয়ার্ক",
  quickLinksTitleEn: "Quick Links",
  quickLinksTitleBn: "কুইক লিংক",
  contactTitleEn: "Contact Info",
  contactTitleBn: "যোগাযোগ",
  affiliationTitleEn: "Our Affiliations",
  affiliationTitleBn: "আমাদের অধিভুক্তি",
  affiliationDescEn: "We are a proud, active member of the Internet Service Providers Association of Bangladesh (ISPAB).",
  affiliationDescBn: "আমরা ইন্টারনেট সার্ভিস প্রোভাইডার অ্যাসোসিয়েশন অব বাংলাদেশ (ISPAB)-এর একজন গর্বিত ও সক্রিয় সদস্য।",
  privacyTextEn: "Privacy Policy",
  privacyTextBn: "গোপনীয়তা নীতি",
  termsTextEn: "Terms of Service",
  termsTextBn: "ব্যবহারের শর্তাবলী",
  brandTextEn: "Keraniganj ISP",
  brandTextBn: "কেরানীগঞ্জ আইএসপি"
};

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

const defaultTopbarContent: TopbarContent = {
  hotline: "+880 1901-348400",
  availabilityText: "24/7 — Call Any Time",
};

const defaultBadges: AffiliationBadge[] = [
  { textEn: "ISPAB MEMBER", textBn: "আইএসপিএবি সদস্য", isCyan: false, image: "/ispab.jpeg" },
  { textEn: "AS150164 BGP NETWORK", textBn: "AS150164 বিজিপি নেটওয়ার্ক", isCyan: true }
];

const defaultLicenses: LicenseBadge[] = [
  { textEn: "ASN: AS150164", textBn: "ASN: AS150164", isMono: true, colorStyle: "cyan" },
  { textEn: "BTRC Licensed", textBn: "বিটিআরসি অনুমোদিত", isMono: false, colorStyle: "emerald", image: "/btrc.png" }
];

const defaultPhones = ["+880 1707-009267"];

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

function serializePhoneList(value: unknown): { value: string }[] {
  return normalizePhoneList(value).map((phone) => ({ value: phone }));
}

export default function TopbarFooterPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [footerContent, setFooterContent] = useState<FooterContent>(defaultFooterContent);
  const [topbarContent, setTopbarContent] = useState<TopbarContent>(defaultTopbarContent);
  const [navLinks, setNavLinks] = useState<NavLink[]>(defaultNavLinks);
  const [badges, setBadges] = useState<AffiliationBadge[]>(defaultBadges);
  const [licenses, setLicenses] = useState<LicenseBadge[]>(defaultLicenses);
  const [phones, setPhones] = useState<string[]>(defaultPhones);
  const [activeSection, setActiveSection] = useState("menu");
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);

  // New item form states
  const [newLink, setNewLink] = useState<NavLink>({ nameEn: "", nameBn: "", href: "" });
  const [newBadge, setNewBadge] = useState<AffiliationBadge>({ textEn: "", textBn: "", isCyan: false, image: "" });
  const [newLicense, setNewLicense] = useState<LicenseBadge>({ textEn: "", textBn: "", isMono: false, colorStyle: "cyan", image: "" });

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);

    // Load topbar config
    getSetting("topbar_content").then(saved => {
      if (saved && typeof saved === "object" && !Array.isArray(saved)) {
        setTopbarContent(prev => ({
          ...prev,
          ...(saved as Record<string, unknown> as unknown as TopbarContent)
        }));
      } else {
        setSetting("topbar_content", defaultTopbarContent);
        setTopbarContent(defaultTopbarContent);
      }
    });
    
    // Load footer config
    getSetting("footer_content").then(saved => {
      if (saved) {
        setFooterContent(prev => ({
          ...prev,
          ...(saved as Record<string, unknown> as unknown as typeof defaultFooterContent)
        }));
      } else {
        setSetting("footer_content", defaultFooterContent);
        setFooterContent(defaultFooterContent);
      }
    });

    // Load nav links
    getSetting("nav_links").then(saved => {
      if (saved && (saved as unknown[]).length > 0) {
        setNavLinks(saved as typeof defaultNavLinks);
      } else {
        setSetting("nav_links", defaultNavLinks);
        setNavLinks(defaultNavLinks);
      }
    });

    // Load badges
    getSetting("footer_badges").then(saved => {
      if (saved && (saved as unknown[]).length > 0) {
        const migrated = (saved as Record<string, unknown>[]).map((badge) => {
          if (badge.textEn === "ISPAB MEMBER" && !badge.image) {
            return { ...badge, image: "/ispab.jpeg" } as unknown as AffiliationBadge;
          }
          return badge as unknown as AffiliationBadge;
        });
        setBadges(migrated);
      } else {
        setSetting("footer_badges", defaultBadges);
        setBadges(defaultBadges);
      }
    });

    // Load licenses
    getSetting("footer_licenses").then(saved => {
      if (saved && (saved as unknown[]).length > 0) {
        const migrated = (saved as Record<string, unknown>[]).map((lic) => {
          if (lic.textEn === "BTRC Licensed" && !lic.image) {
            return { ...lic, image: "/btrc.png" } as unknown as LicenseBadge;
          }
          return lic as unknown as LicenseBadge;
        });
        setLicenses(migrated);
      } else {
        setSetting("footer_licenses", defaultLicenses);
        setLicenses(defaultLicenses);
      }
    });

    // Load phones
    getSetting("footer_phones").then(saved => {
      const normalizedPhones = normalizePhoneList(saved);
      if (normalizedPhones.length > 0) {
        setPhones(normalizedPhones);
      } else {
        setSetting("footer_phones", serializePhoneList(defaultPhones));
        setPhones(defaultPhones);
      }
    });
  }, [router]);

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      toast.error("File is too large. Max allowed size is 15MB.");
      return;
    }

    setIsUploadingPdf(true);
    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/upload-btrc-tariff", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        toast.success("BTRC Approved Tariff PDF uploaded and saved successfully!");
      } else {
        toast.error(data.error || "File upload failed.");
      }
    } catch {
      toast.error("File upload connection error.");
    } finally {
      setIsUploadingPdf(false);
    }
  };

  const saveAllConfigurations = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedPhones = normalizePhoneList(phones);

    if (normalizedPhones.length === 0) {
      toast.error("At least one phone number is required.");
      return;
    }

    setPhones(normalizedPhones);

    const results = await Promise.all([
      setSetting("topbar_content", topbarContent),
      setSetting("footer_content", footerContent),
      setSetting("nav_links", navLinks),
      setSetting("footer_badges", badges),
      setSetting("footer_licenses", licenses),
      setSetting("footer_phones", serializePhoneList(normalizedPhones)),
    ]);

    if (results.every(Boolean)) {
      toast("Topbar, Footer, and Header configurations saved successfully!");
    } else {
      toast.error("Some settings could not be saved. Please log in again and retry.");
    }
  };

  // Nav link order handlers
  const moveLinkUp = (index: number) => {
    if (index === 0) return;
    const updated = [...navLinks];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setNavLinks(updated);
  };

  const moveLinkDown = (index: number) => {
    if (index === navLinks.length - 1) return;
    const updated = [...navLinks];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setNavLinks(updated);
  };

  const handleLinkFieldChange = (index: number, field: keyof NavLink, value: string) => {
    const updated = [...navLinks];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setNavLinks(updated);
  };

  const deleteNavLink = (index: number) => {
    if (!confirm("Are you sure you want to delete this menu link?")) return;
    const updated = navLinks.filter((_, idx) => idx !== index);
    setNavLinks(updated);
  };

  const addNewNavLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLink.nameEn.trim() || !newLink.nameBn.trim() || !newLink.href.trim()) {
      toast("Please fill in all menu item fields.");
      return;
    }
    setNavLinks([...navLinks, newLink]);
    setNewLink({ nameEn: "", nameBn: "", href: "" });
  };

  // Badge order handlers
  const moveBadgeUp = (index: number) => {
    if (index === 0) return;
    const updated = [...badges];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setBadges(updated);
  };

  const moveBadgeDown = (index: number) => {
    if (index === badges.length - 1) return;
    const updated = [...badges];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setBadges(updated);
  };

  const handleBadgeFieldChange = (index: number, field: keyof AffiliationBadge, value: string | boolean) => {
    const updated = [...badges];
    updated[index] = {
      ...updated[index],
      [field]: value
    } as AffiliationBadge;
    setBadges(updated);
  };

  const deleteBadge = (index: number) => {
    if (!confirm("Are you sure you want to delete this badge?")) return;
    const updated = badges.filter((_, idx) => idx !== index);
    setBadges(updated);
  };

  const addNewBadge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBadge.textEn.trim() || !newBadge.textBn.trim()) {
      toast("Please fill in both English and Bangla text fields.");
      return;
    }
    const badgeToAppend: AffiliationBadge = {
      textEn: newBadge.textEn,
      textBn: newBadge.textBn,
      isCyan: newBadge.isCyan,
      image: newBadge.image?.trim() ? newBadge.image.trim() : undefined
    };
    setBadges([...badges, badgeToAppend]);
    setNewBadge({ textEn: "", textBn: "", isCyan: false, image: "" });
  };

  // License badge handlers
  const moveLicenseUp = (index: number) => {
    if (index === 0) return;
    const updated = [...licenses];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setLicenses(updated);
  };

  const moveLicenseDown = (index: number) => {
    if (index === licenses.length - 1) return;
    const updated = [...licenses];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setLicenses(updated);
  };

  const handleLicenseFieldChange = (index: number, field: keyof LicenseBadge, value: string | boolean) => {
    const updated = [...licenses];
    updated[index] = {
      ...updated[index],
      [field]: value
    } as LicenseBadge;
    setLicenses(updated);
  };

  const deleteLicense = (index: number) => {
    if (!confirm("Are you sure you want to delete this license badge?")) return;
    const updated = licenses.filter((_, idx) => idx !== index);
    setLicenses(updated);
  };

  const addNewLicense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLicense.textEn.trim() || !newLicense.textBn.trim()) {
      toast("Please fill in both English and Bangla text fields.");
      return;
    }
    setLicenses([...licenses, newLicense]);
    setNewLicense({ textEn: "", textBn: "", isMono: false, colorStyle: "cyan", image: "" });
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Header &amp; Footer Global CMS Settings</h2>
        <p className="text-xs text-slate-500 mt-1">Configure layout badges, contacts, social presence, header navigation, and copyright variables dynamically.</p>
      </div>

      {/* Tabs list (Consolidated to only 2 tabs as requested) */}
      <div className="flex border-b border-slate-100 pb-px gap-6 overflow-x-auto select-none">
        {[
          { id: "menu", label: "Header", icon: Menu }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center gap-2 pb-3 text-xs font-bold transition-all relative border-b-2 cursor-pointer border-box ${
                isActive
                  ? "text-brand-blue border-brand-blue"
                  : "text-slate-400 border-transparent hover:text-slate-600"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={saveAllConfigurations} className="space-y-6 w-full">
        
        {/* Tab 1: Header Topbar Editor */}
        {activeSection === "menu" && (
          <div className="space-y-6">
            <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4 space-y-3">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                <Menu className="w-4 h-4 text-brand-blue" /> Header Topbar
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block">Hotline Number</label>
                  <input
                    type="text"
                    value={topbarContent.hotline}
                    onChange={(e) => setTopbarContent({ ...topbarContent, hotline: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                    placeholder="+880 1901-348400"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block">Availability Text</label>
                  <input
                    type="text"
                    value={topbarContent.availabilityText}
                    onChange={(e) => setTopbarContent({ ...topbarContent, availabilityText: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                    placeholder="24/7 — Call Any Time"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Legacy Header Menu Editor */}
        {activeSection === "legacy-menu" && (
          <div className="space-y-6">
            {/* Menu Items Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                    <th className="px-4 py-3 w-16 text-center">Order</th>
                    <th className="px-4 py-3">English Label</th>
                    <th className="px-4 py-3">Bangla Label</th>
                    <th className="px-4 py-3 w-48">Target URL path (href)</th>
                    <th className="px-4 py-3 w-20 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  {navLinks.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400 font-semibold">No menu links configured. Add one below.</td>
                    </tr>
                  ) : (
                    navLinks.map((link, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        {/* Order buttons */}
                        <td className="px-4 py-2.5 text-center flex items-center justify-center gap-1.5 mt-0.5">
                          <button
                            type="button"
                            onClick={() => moveLinkUp(idx)}
                            disabled={idx === 0}
                            className={`p-1.5 rounded-lg border border-slate-100 transition-colors shadow-xs ${
                              idx === 0 ? "text-slate-200 bg-slate-50 cursor-not-allowed" : "text-slate-500 hover:bg-slate-100 bg-white cursor-pointer"
                            }`}
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveLinkDown(idx)}
                            disabled={idx === navLinks.length - 1}
                            className={`p-1.5 rounded-lg border border-slate-100 transition-colors shadow-xs ${
                              idx === navLinks.length - 1 ? "text-slate-200 bg-slate-50 cursor-not-allowed" : "text-slate-500 hover:bg-slate-100 bg-white cursor-pointer"
                            }`}
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </td>

                        {/* English Label Input */}
                        <td className="px-4 py-2.5">
                          <input
                            type="text"
                            value={link.nameEn}
                            onChange={(e) => handleLinkFieldChange(idx, "nameEn", e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                            required
                          />
                        </td>

                        {/* Bangla Label Input */}
                        <td className="px-4 py-2.5">
                          <input
                            type="text"
                            value={link.nameBn}
                            onChange={(e) => handleLinkFieldChange(idx, "nameBn", e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                            required
                          />
                        </td>

                        {/* Target URL Input */}
                        <td className="px-4 py-2.5">
                          <input
                            type="text"
                            value={link.href}
                            onChange={(e) => handleLinkFieldChange(idx, "href", e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue font-mono text-[11px]"
                            required
                          />
                        </td>

                        {/* Delete Action */}
                        <td className="px-4 py-2.5 text-center">
                          <button
                            type="button"
                            onClick={() => deleteNavLink(idx)}
                            className="p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors rounded-lg cursor-pointer"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Quick Add Menu Item Form */}
            <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4 space-y-3">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                <Plus className="w-4 h-4 text-brand-blue" /> Add Menu Item
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block">English Label</label>
                  <input
                    type="text"
                    value={newLink.nameEn}
                    onChange={(e) => setNewLink({ ...newLink, nameEn: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                    placeholder="e.g. Services"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block">Bangla Label</label>
                  <input
                    type="text"
                    value={newLink.nameBn}
                    onChange={(e) => setNewLink({ ...newLink, nameBn: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                    placeholder="e.g. সেবাসমূহ"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block">Target URL (href)</label>
                  <input
                    type="text"
                    value={newLink.href}
                    onChange={(e) => setNewLink({ ...newLink, href: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue font-mono"
                    placeholder="e.g. /services"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={addNewNavLink}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg text-[10px] uppercase tracking-wider transition-all cursor-pointer select-none active:scale-[0.97] shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Append Item
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="px-5 py-3 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md transition-all active:scale-[0.98]"
        >
          Save Configurations
        </button>
      </form>
    </div>
  );
}

