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
      setSetting("footer_content", footerContent),
      setSetting("nav_links", navLinks),
      setSetting("footer_badges", badges),
      setSetting("footer_licenses", licenses),
      setSetting("footer_phones", serializePhoneList(normalizedPhones)),
    ]);

    if (results.every(Boolean)) {
      toast("Topbar, Footer, and Header Menu configurations saved successfully!");
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

  // Edit in-place handler
  const handleLinkFieldChange = (index: number, field: keyof NavLink, value: string) => {
    const updated = [...navLinks];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setNavLinks(updated);
  };

  // Delete handler
  const deleteNavLink = (index: number) => {
    if (!confirm("Are you sure you want to delete this menu link?")) return;
    const updated = navLinks.filter((_, idx) => idx !== index);
    setNavLinks(updated);
  };

  // Add handler
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
          { id: "menu", label: "Header Menu", icon: Menu },
          { id: "footer", label: "Footer Section", icon: Building }
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
        
        {/* Tab 1: Header Menu Editor */}
        {activeSection === "menu" && (
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs text-slate-500">
              Manage the links displayed in the website header navigation menu. Changes are saved when you click &quot;Save Configurations&quot; at the bottom of the page.
            </div>

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

        {/* Tab 2: Footer Section */}
        {activeSection === "footer" && (
          <div className="space-y-6 w-full animate-fade-in">
            
            {/* Section A: Brand & Badges */}
            <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30 space-y-4 shadow-xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-brand-blue" /> Section A: Brand &amp; Badges
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">About Text (English)</label>
                  <textarea
                    value={footerContent.aboutTextEn}
                    onChange={(e) => setFooterContent({ ...footerContent, aboutTextEn: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue min-h-[90px] leading-relaxed"
                    placeholder="Enter English description"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">About Text (Bangla)</label>
                  <textarea
                    value={footerContent.aboutTextBn}
                    onChange={(e) => setFooterContent({ ...footerContent, aboutTextBn: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue min-h-[90px] leading-relaxed"
                    placeholder="Enter Bangla description"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <span className="text-xs font-black uppercase tracking-wider text-slate-800 block">Brand License/Status Badges List</span>
                
                {/* Licenses Editor Table */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                        <th className="px-4 py-3 w-16 text-center">Order</th>
                        <th className="px-4 py-3">English Label</th>
                        <th className="px-4 py-3">Bangla Label</th>
                        <th className="px-4 py-3 w-48">Badge Image</th>
                        <th className="px-4 py-3 w-28 text-center">Mono Font</th>
                        <th className="px-4 py-3 w-32 text-center">Color Style</th>
                        <th className="px-4 py-3 w-20 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150">
                      {licenses.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-slate-400 font-semibold">No status badges configured. Add one below.</td>
                        </tr>
                      ) : (
                        licenses.map((lic, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            {/* Order */}
                            <td className="px-4 py-2 text-center flex items-center justify-center gap-1.5 mt-0.5">
                              <button
                                type="button"
                                onClick={() => moveLicenseUp(idx)}
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
                                onClick={() => moveLicenseDown(idx)}
                                disabled={idx === licenses.length - 1}
                                className={`p-1.5 rounded-lg border border-slate-100 transition-colors shadow-xs ${
                                  idx === licenses.length - 1 ? "text-slate-200 bg-slate-50 cursor-not-allowed" : "text-slate-500 hover:bg-slate-100 bg-white cursor-pointer"
                                }`}
                                title="Move Down"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                            </td>

                            {/* English Label */}
                            <td className="px-4 py-2">
                              <input
                                type="text"
                                value={lic.textEn}
                                onChange={(e) => handleLicenseFieldChange(idx, "textEn", e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                                required
                              />
                            </td>

                            {/* Bangla Label */}
                            <td className="px-4 py-2">
                              <input
                                type="text"
                                value={lic.textBn}
                                onChange={(e) => handleLicenseFieldChange(idx, "textBn", e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                                required
                              />
                            </td>

                            {/* Badge Image Upload & Preview */}
                            <td className="px-4 py-2">
                              <div className="flex items-center gap-3">
                                {/* Thumbnail Preview */}
                                <div className="w-16 h-12 border border-slate-200 rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                                  {lic.image ? (
                                    <Image
                                      src={lic.image}
                                      alt="License badge preview"
                                      width={64}
                                      height={48}
                                      className="max-w-full max-h-full object-contain p-1"
                                    />
                                  ) : (
                                    <span className="text-[9px] text-slate-400 font-bold">No Image</span>
                                  )}
                                </div>

                                {/* Controls */}
                                <div className="flex flex-col gap-1">
                                  <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[10px] font-bold text-slate-700 px-2.5 py-1 rounded transition-colors text-center select-none shadow-xs">
                                    {lic.image ? "Change" : "Upload"}
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          if (file.size > 500 * 1024) {
                                            toast("File size exceeds 500KB. Please upload a smaller logo image (under 500KB) to ensure it saves correctly in local storage.");
                                            return;
                                          }
                                          const reader = new FileReader();
                                          reader.onload = (event) => {
                                            const base64 = event.target?.result as string;
                                            handleLicenseFieldChange(idx, "image", base64);
                                          };
                                          reader.readAsDataURL(file);
                                        }
                                      }}
                                    />
                                  </label>
                                  {lic.image && (
                                    <button
                                      type="button"
                                      onClick={() => handleLicenseFieldChange(idx, "image", "")}
                                      className="text-[9px] text-red-500 hover:text-red-755 font-bold transition-colors text-center cursor-pointer"
                                    >
                                      Clear
                                    </button>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Mono Font Checkbox */}
                            <td className="px-4 py-2 text-center">
                              <input
                                type="checkbox"
                                checked={lic.isMono}
                                onChange={(e) => handleLicenseFieldChange(idx, "isMono", e.target.checked)}
                                className="w-4 h-4 text-brand-blue border-slate-300 rounded focus:ring-brand-blue cursor-pointer"
                              />
                            </td>

                            {/* Color Style Selector */}
                            <td className="px-4 py-2 text-center">
                              <select
                                value={lic.colorStyle}
                                onChange={(e) => handleLicenseFieldChange(idx, "colorStyle", e.target.value)}
                                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue cursor-pointer w-full"
                              >
                                <option value="cyan">Cyan accent</option>
                                <option value="emerald">Emerald highlight</option>
                                <option value="slate">Slate gray</option>
                              </select>
                            </td>

                            {/* Delete */}
                            <td className="px-4 py-2 text-center">
                              <button
                                type="button"
                                onClick={() => deleteLicense(idx)}
                                className="p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors rounded-lg cursor-pointer"
                                title="Delete Badge"
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

                {/* Quick Add License Badge */}
                <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                    <Plus className="w-4 h-4 text-brand-blue" /> Add License/Status Badge
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase block">English Text</label>
                      <input
                        type="text"
                        value={newLicense.textEn}
                        onChange={(e) => setNewLicense({ ...newLicense, textEn: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                        placeholder="e.g. BTRC Licensed"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase block">Bangla Text</label>
                      <input
                        type="text"
                        value={newLicense.textBn}
                        onChange={(e) => setNewLicense({ ...newLicense, textBn: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                        placeholder="e.g. বিটিআরসি অনুমোদিত"
                      />
                    </div>
                    
                    {/* Badge Image Upload & Preview */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase block">Badge Image</label>
                      <div className="flex items-center gap-3 mt-1.5">
                        <div className="w-16 h-12 border border-slate-200 rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                          {newLicense.image ? (
                            <Image
                              src={newLicense.image}
                              alt="License preview"
                              width={64}
                              height={48}
                              className="max-w-full max-h-full object-contain p-1"
                            />
                          ) : (
                            <span className="text-[9px] text-slate-400 font-bold">No Image</span>
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[10px] font-bold text-slate-700 px-2.5 py-1 rounded transition-colors text-center select-none shadow-xs">
                            {newLicense.image ? "Change" : "Upload"}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  if (file.size > 500 * 1024) {
                                    toast("File size exceeds 500KB. Please upload a smaller logo image (under 500KB) to ensure it saves correctly in local storage.");
                                    return;
                                  }
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    const base64 = event.target?.result as string;
                                    setNewLicense({ ...newLicense, image: base64 });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                          {newLicense.image && (
                            <button
                              type="button"
                              onClick={() => setNewLicense({ ...newLicense, image: "" })}
                              className="text-[9px] text-red-500 hover:text-red-755 font-bold transition-colors text-center cursor-pointer"
                            >
                              Clear
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase block">Color Theme</label>
                      <select
                        value={newLicense.colorStyle}
                        onChange={(e) => setNewLicense({ ...newLicense, colorStyle: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue cursor-pointer"
                      >
                        <option value="cyan">Cyan accent</option>
                        <option value="emerald">Emerald highlight</option>
                        <option value="slate">Slate gray</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2 pt-5 md:pt-4">
                      <input
                        type="checkbox"
                        id="newLicenseMono"
                        checked={newLicense.isMono}
                        onChange={(e) => setNewLicense({ ...newLicense, isMono: e.target.checked })}
                        className="w-4 h-4 text-brand-blue border-slate-300 rounded focus:ring-brand-blue cursor-pointer"
                      />
                      <label htmlFor="newLicenseMono" className="text-xs font-bold text-slate-655 cursor-pointer select-none">Mono font style</label>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addNewLicense}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg text-[10px] uppercase tracking-wider transition-all cursor-pointer select-none active:scale-[0.97] shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" /> Append Badge
                  </button>
                </div>
              </div>
            </div>

            {/* Section B: Quick Links Column Header */}
            <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30 space-y-4 shadow-xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                <Menu className="w-4 h-4 text-brand-blue" /> Section B: Quick Links Header
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Quick Links Header (English)</label>
                  <input
                    type="text"
                    value={footerContent.quickLinksTitleEn}
                    onChange={(e) => setFooterContent({ ...footerContent, quickLinksTitleEn: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Quick Links Header (Bangla)</label>
                  <input
                    type="text"
                    value={footerContent.quickLinksTitleBn}
                    onChange={(e) => setFooterContent({ ...footerContent, quickLinksTitleBn: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section C: Contacts & Location */}
            <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30 space-y-4 shadow-xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-brand-blue" /> Section C: Contact &amp; Location Info
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Contact Info Header (English)</label>
                  <input
                    type="text"
                    value={footerContent.contactTitleEn}
                    onChange={(e) => setFooterContent({ ...footerContent, contactTitleEn: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Contact Info Header (Bangla)</label>
                  <input
                    type="text"
                    value={footerContent.contactTitleBn}
                    onChange={(e) => setFooterContent({ ...footerContent, contactTitleBn: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700 block">Phone Numbers List</label>
                  <div className="space-y-2">
                    {phones.map((phone, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => {
                            const updated = [...phones];
                            updated[idx] = e.target.value;
                            setPhones(updated);
                          }}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue font-mono"
                          placeholder="e.g. +880 1707-009267"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (phones.length <= 1) {
                              toast("At least one phone number is required.");
                              return;
                            }
                            setPhones(phones.filter((_, i) => i !== idx));
                          }}
                          className="p-2.5 text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors rounded-xl border border-slate-100 cursor-pointer"
                          title="Delete Phone Number"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setPhones([...phones, ""])}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-[10px] uppercase tracking-wider transition-all cursor-pointer select-none active:scale-[0.97] shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Phone Number
                  </button>
                </div>
                <div className="space-y-1 pt-1 md:pt-0">
                  <label className="text-xs font-bold text-slate-700 block">Support Email Address</label>
                  <input
                    type="email"
                    value={footerContent.email}
                    onChange={(e) => setFooterContent({ ...footerContent, email: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                    placeholder="e.g. info@m-aminnetwork.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Address (English)</label>
                  <textarea
                    value={footerContent.addressEn}
                    onChange={(e) => setFooterContent({ ...footerContent, addressEn: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue min-h-[70px]"
                    placeholder="Enter English physical address"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Address (Bangla)</label>
                  <textarea
                    value={footerContent.addressBn}
                    onChange={(e) => setFooterContent({ ...footerContent, addressBn: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue min-h-[70px]"
                    placeholder="Enter Bangla physical address"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section D: Affiliations & Membership */}
            <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30 space-y-4 shadow-xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-brand-blue" /> Section D: Affiliations &amp; Membership
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Affiliation Header (English)</label>
                  <input
                    type="text"
                    value={footerContent.affiliationTitleEn}
                    onChange={(e) => setFooterContent({ ...footerContent, affiliationTitleEn: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Affiliation Header (Bangla)</label>
                  <input
                    type="text"
                    value={footerContent.affiliationTitleBn}
                    onChange={(e) => setFooterContent({ ...footerContent, affiliationTitleBn: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Affiliation Description (English)</label>
                  <textarea
                    value={footerContent.affiliationDescEn}
                    onChange={(e) => setFooterContent({ ...footerContent, affiliationDescEn: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue min-h-[60px]"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Affiliation Description (Bangla)</label>
                  <textarea
                    value={footerContent.affiliationDescBn}
                    onChange={(e) => setFooterContent({ ...footerContent, affiliationDescBn: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue min-h-[60px]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <span className="text-xs font-black uppercase tracking-wider text-slate-800 block">Affiliation Badges List</span>
                
                {/* Badges Editor Table */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                        <th className="px-4 py-3 w-16 text-center">Order</th>
                        <th className="px-4 py-3">English Label (Fallback)</th>
                        <th className="px-4 py-3">Bangla Label (Fallback)</th>
                        <th className="px-4 py-3 w-48">Badge Image</th>
                        <th className="px-4 py-3 w-28 text-center">Cyan Accent</th>
                        <th className="px-4 py-3 w-20 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150">
                      {badges.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-400 font-semibold">No badges configured. Add one below.</td>
                        </tr>
                      ) : (
                        badges.map((badge, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            {/* Order */}
                            <td className="px-4 py-2 text-center flex items-center justify-center gap-1.5 mt-0.5">
                              <button
                                type="button"
                                onClick={() => moveBadgeUp(idx)}
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
                                onClick={() => moveBadgeDown(idx)}
                                disabled={idx === badges.length - 1}
                                className={`p-1.5 rounded-lg border border-slate-100 transition-colors shadow-xs ${
                                  idx === badges.length - 1 ? "text-slate-200 bg-slate-50 cursor-not-allowed" : "text-slate-500 hover:bg-slate-100 bg-white cursor-pointer"
                                }`}
                                title="Move Down"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                            </td>

                            {/* English Label */}
                            <td className="px-4 py-2">
                              <input
                                type="text"
                                value={badge.textEn}
                                onChange={(e) => handleBadgeFieldChange(idx, "textEn", e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                                required
                              />
                            </td>

                            {/* Bangla Label */}
                            <td className="px-4 py-2">
                              <input
                                type="text"
                                value={badge.textBn}
                                onChange={(e) => handleBadgeFieldChange(idx, "textBn", e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                                required
                              />
                            </td>

                            {/* Image Preview & Upload (No raw text input box) */}
                            <td className="px-4 py-2">
                              <div className="flex items-center gap-3">
                                {/* Thumbnail Preview */}
                                <div className="w-16 h-12 border border-slate-200 rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                                  {badge.image ? (
                                    <Image
                                      src={badge.image}
                                      alt="Badge preview"
                                      width={64}
                                      height={48}
                                      className="max-w-full max-h-full object-contain p-1"
                                    />
                                  ) : (
                                    <span className="text-[9px] text-slate-400 font-bold">No Image</span>
                                  )}
                                </div>

                                {/* Controls */}
                                <div className="flex flex-col gap-1">
                                  <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[10px] font-bold text-slate-700 px-2.5 py-1 rounded transition-colors text-center select-none shadow-xs">
                                    {badge.image ? "Change" : "Upload"}
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          if (file.size > 500 * 1024) {
                                            toast("File size exceeds 500KB. Please upload a smaller logo image (under 500KB) to ensure it saves correctly in local storage.");
                                            return;
                                          }
                                          const reader = new FileReader();
                                          reader.onload = (event) => {
                                            const base64 = event.target?.result as string;
                                            handleBadgeFieldChange(idx, "image", base64);
                                          };
                                          reader.readAsDataURL(file);
                                        }
                                      }}
                                    />
                                  </label>
                                  {badge.image && (
                                    <button
                                      type="button"
                                      onClick={() => handleBadgeFieldChange(idx, "image", "")}
                                      className="text-[9px] text-red-500 hover:text-red-750 font-bold transition-colors text-center cursor-pointer"
                                    >
                                      Clear
                                    </button>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Cyan Accent */}
                            <td className="px-4 py-2 text-center">
                              <input
                                type="checkbox"
                                checked={badge.isCyan}
                                onChange={(e) => handleBadgeFieldChange(idx, "isCyan", e.target.checked)}
                                className="w-4 h-4 text-brand-blue border-slate-300 rounded focus:ring-brand-blue cursor-pointer"
                              />
                            </td>

                            {/* Delete */}
                            <td className="px-4 py-2 text-center">
                              <button
                                type="button"
                                onClick={() => deleteBadge(idx)}
                                className="p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors rounded-lg cursor-pointer"
                                title="Delete Badge"
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

                {/* Quick Add Badge */}
                <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                    <Plus className="w-4 h-4 text-brand-blue" /> Add Affiliation Badge
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase block">English Fallback</label>
                      <input
                        type="text"
                        value={newBadge.textEn}
                        onChange={(e) => setNewBadge({ ...newBadge, textEn: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                        placeholder="e.g. ISPAB MEMBER"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase block">Bangla Fallback</label>
                      <input
                        type="text"
                        value={newBadge.textBn}
                        onChange={(e) => setNewBadge({ ...newBadge, textBn: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                        placeholder="e.g. আইএসপিএবি সদস্য"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase block">Badge Image</label>
                      <div className="flex items-center gap-3 mt-1.5">
                        {/* Thumbnail Preview */}
                        <div className="w-16 h-12 border border-slate-200 rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                          {newBadge.image ? (
                            <Image
                              src={newBadge.image}
                              alt="Badge preview"
                              width={64}
                              height={48}
                              className="max-w-full max-h-full object-contain p-1"
                            />
                          ) : (
                            <span className="text-[9px] text-slate-400 font-bold">No Image</span>
                          )}
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col gap-1">
                          <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[10px] font-bold text-slate-700 px-2.5 py-1 rounded transition-colors text-center select-none shadow-xs">
                            {newBadge.image ? "Change" : "Upload"}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  if (file.size > 500 * 1024) {
                                    toast("File size exceeds 500KB. Please upload a smaller logo image (under 500KB) to ensure it saves correctly in local storage.");
                                    return;
                                  }
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    const base64 = event.target?.result as string;
                                    setNewBadge({ ...newBadge, image: base64 });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                          {newBadge.image && (
                            <button
                              type="button"
                              onClick={() => setNewBadge({ ...newBadge, image: "" })}
                              className="text-[9px] text-red-500 hover:text-red-750 font-bold transition-colors text-center cursor-pointer"
                            >
                              Clear
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-5 md:pt-4">
                      <input
                        type="checkbox"
                        id="newBadgeCyan"
                        checked={newBadge.isCyan}
                        onChange={(e) => setNewBadge({ ...newBadge, isCyan: e.target.checked })}
                        className="w-4 h-4 text-brand-blue border-slate-300 rounded focus:ring-brand-blue cursor-pointer"
                      />
                      <label htmlFor="newBadgeCyan" className="text-xs font-bold text-slate-655 cursor-pointer select-none">Cyan Accent Style</label>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addNewBadge}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg text-[10px] uppercase tracking-wider transition-all cursor-pointer select-none active:scale-[0.97] shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" /> Append Badge
                  </button>
                </div>
              </div>
            </div>

            {/* Section E: Legal, Social & Copyright */}
            <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30 space-y-4 shadow-xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-brand-blue" /> Section E: Legal, Social &amp; Copyright
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Facebook Link</label>
                  <input
                    type="url"
                    value={footerContent.facebook}
                    onChange={(e) => setFooterContent({ ...footerContent, facebook: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue font-mono"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">YouTube Link</label>
                  <input
                    type="url"
                    value={footerContent.youtube}
                    onChange={(e) => setFooterContent({ ...footerContent, youtube: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Instagram Link</label>
                  <input
                    type="url"
                    value={footerContent.instagram}
                    onChange={(e) => setFooterContent({ ...footerContent, instagram: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue font-mono"
                    placeholder="https://instagram.com/profile"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Twitter/X Link</label>
                  <input
                    type="url"
                    value={footerContent.twitter}
                    onChange={(e) => setFooterContent({ ...footerContent, twitter: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue font-mono"
                    placeholder="https://x.com/profile"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">LinkedIn Link</label>
                  <input
                    type="url"
                    value={footerContent.linkedin}
                    onChange={(e) => setFooterContent({ ...footerContent, linkedin: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue font-mono"
                    placeholder="https://linkedin.com/company/profile"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Privacy policy Label (English)</label>
                    <input
                      type="text"
                      value={footerContent.privacyTextEn}
                      onChange={(e) => setFooterContent({ ...footerContent, privacyTextEn: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Privacy policy Label (Bangla)</label>
                    <input
                      type="text"
                      value={footerContent.privacyTextBn}
                      onChange={(e) => setFooterContent({ ...footerContent, privacyTextBn: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Terms of Service Label (English)</label>
                  <input
                    type="text"
                    value={footerContent.termsTextEn}
                    onChange={(e) => setFooterContent({ ...footerContent, termsTextEn: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Terms of Service Label (Bangla)</label>
                  <input
                    type="text"
                    value={footerContent.termsTextBn}
                    onChange={(e) => setFooterContent({ ...footerContent, termsTextBn: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Brand Link info (English)</label>
                  <input
                    type="text"
                    value={footerContent.brandTextEn}
                    onChange={(e) => setFooterContent({ ...footerContent, brandTextEn: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Brand Link info (Bangla)</label>
                  <input
                    type="text"
                    value={footerContent.brandTextBn}
                    onChange={(e) => setFooterContent({ ...footerContent, brandTextBn: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Copyright Bottom (English)</label>
                  <input
                    type="text"
                    value={footerContent.copyrightText}
                    onChange={(e) => setFooterContent({ ...footerContent, copyrightText: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Copyright Bottom (Bangla)</label>
                  <input
                    type="text"
                    value={footerContent.copyrightTextBn}
                    onChange={(e) => setFooterContent({ ...footerContent, copyrightTextBn: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 animate-fade-in">
                <span className="text-xs font-black uppercase tracking-wider text-slate-800 block">BTRC Regulatory Documents</span>
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">BTRC Approved Tariff Plan PDF</span>
                      <span className="text-[10px] text-slate-400 block font-medium">Upload the official regulatory PDF document to serve on the website footer link.</span>
                    </div>
                    <label className="flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-655 cursor-pointer transition-all active:scale-95 shadow-sm">
                      {isUploadingPdf ? (
                        <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      <span>{isUploadingPdf ? "Uploading PDF..." : "Upload Tariff PDF"}</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={handlePdfUpload}
                        disabled={isUploadingPdf}
                      />
                    </label>
                  </div>
                </div>
              </div>
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

