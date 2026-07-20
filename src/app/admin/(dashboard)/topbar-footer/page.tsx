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
  addressEn: string;
  addressBn?: string;
  email: string;
}

interface TopbarContent {
  hotline: string;
  availabilityText: string;
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

type SectionId = "topbar" | "brand-license" | "contact-info" | "affiliations" | "social-link" | "btrc-tariff";

const sectionSaveLabels: Record<SectionId, string> = {
  topbar: "Save Topbar",
  "brand-license": "Save Brand License",
  "contact-info": "Save Contact Info",
  affiliations: "Save Affiliations",
  "social-link": "Save Social Links",
  "btrc-tariff": "Save BTRC Tariff",
};

const sectionSuccessMessages: Record<SectionId, string> = {
  topbar: "Topbar saved successfully!",
  "brand-license": "Brand license badges saved successfully!",
  "contact-info": "Contact info saved successfully!",
  affiliations: "Affiliations saved successfully!",
  "social-link": "Social links saved successfully!",
  "btrc-tariff": "BTRC tariff upload is saved automatically after successful upload.",
};

const defaultFooterContent: FooterContent = {
  facebook: "https://facebook.com/maminnetwork",
  youtube: "https://youtube.com/maminnetwork",
  instagram: "https://instagram.com/maminnetwork",
  twitter: "https://x.com/maminnetwork",
  linkedin: "https://linkedin.com/company/maminnetwork",
  addressEn: "House No. 68, Kadomtoli, Aganagar, South Keraniganj, Dhaka-1310, Bangladesh.",
  email: "info@m-aminnetwork.com",
};

const defaultNavLinks: { nameEn: string; nameBn?: string; href: string }[] = [
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

const defaultTopbarContent: TopbarContent = {
  hotline: "+880 1901-348400",
  availabilityText: "24/7 — Call Any Time",
};

const defaultBadges: AffiliationBadge[] = [
  { textEn: "ISPAB MEMBER", isCyan: false, image: "/ispab.jpeg" },
  { textEn: "AS150164 BGP NETWORK", isCyan: true }
];

const defaultLicenses: LicenseBadge[] = [
  { textEn: "ASN: AS150164", isMono: true, colorStyle: "cyan" },
  { textEn: "BTRC Licensed", isMono: false, colorStyle: "emerald", image: "/btrc.png" }
];

const defaultPhones = ["+880 1707-009267"];
const imageBadgeFallbackText = "Image Badge";

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

function textValue(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function normalizeFooterContent(value: unknown): FooterContent {
  const record = value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};

  return {
    facebook: textValue(record.facebook, defaultFooterContent.facebook),
    youtube: textValue(record.youtube, defaultFooterContent.youtube),
    instagram: textValue(record.instagram, defaultFooterContent.instagram),
    twitter: textValue(record.twitter, defaultFooterContent.twitter),
    linkedin: textValue(record.linkedin, defaultFooterContent.linkedin),
    addressEn: textValue(record.addressEn, defaultFooterContent.addressEn),
    addressBn: textValue(record.addressBn ?? "", defaultFooterContent.addressBn ?? ""),
    email: textValue(record.email, defaultFooterContent.email),
  };
}

function normalizeAffiliationBadge(value: unknown): AffiliationBadge {
  const record = value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
  const textEn = textValue(record.textEn, imageBadgeFallbackText).trim() || imageBadgeFallbackText;
  const textBn = textValue(record.textBn, imageBadgeFallbackText).trim() || imageBadgeFallbackText;
  const savedImage = textValue(record.image, "").trim();
  const shouldUseDefaultIspabImage = textEn.toUpperCase().includes("ISPAB") && !savedImage;

  return {
    textEn,
    textBn,
    isCyan: record.isCyan === true,
    image: savedImage || (shouldUseDefaultIspabImage ? "/ispab.jpeg" : undefined),
  };
}

export default function TopbarFooterPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [footerContent, setFooterContent] = useState<FooterContent>(defaultFooterContent);
  const [topbarContent, setTopbarContent] = useState<TopbarContent>(defaultTopbarContent);
  const [badges, setBadges] = useState<AffiliationBadge[]>(defaultBadges);
  const [licenses, setLicenses] = useState<LicenseBadge[]>(defaultLicenses);
  const [phones, setPhones] = useState<string[]>(defaultPhones);
  const [activeSection, setActiveSection] = useState<SectionId>("topbar");
  const [savingSection, setSavingSection] = useState<SectionId | null>(null);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);

  // New item form states
  const [newBadge, setNewBadge] = useState<AffiliationBadge>({ textEn: "", isCyan: false, image: "" });
  const [newLicense, setNewLicense] = useState<LicenseBadge>({ textEn: "", isMono: false, colorStyle: "cyan", image: "" });

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
        setFooterContent(normalizeFooterContent(saved));
      } else {
        setSetting("footer_content", defaultFooterContent);
        setFooterContent(defaultFooterContent);
      }
    });

    // Load nav links
    getSetting("nav_links").then(saved => {
      if (!saved || (saved as unknown[]).length === 0) {
        setSetting("nav_links", defaultNavLinks);
      }
    });

    // Load badges
    getSetting("footer_badges").then(saved => {
      if (saved && (saved as unknown[]).length > 0) {
        const migrated = (saved as unknown[]).map(normalizeAffiliationBadge);
        setBadges(migrated);
        if (JSON.stringify(saved) !== JSON.stringify(migrated)) {
          setSetting("footer_badges", migrated);
        }
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

  const getSavedFooterContent = async (): Promise<FooterContent> => {
    const saved = await getSetting("footer_content");
    return normalizeFooterContent(saved);
  };

  const saveFooterContentPatch = async (patch: Partial<FooterContent>) => {
    const saved = await getSavedFooterContent();
    return setSetting("footer_content", {
      ...saved,
      ...patch,
    });
  };

  const saveCurrentSection = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await saveSection(activeSection);
  };

  const saveSection = async (section: SectionId) => {
    if (savingSection) return;

    const normalizedPhones = normalizePhoneList(phones);
    if (section === "contact-info" && normalizedPhones.length === 0) {
      toast.error("At least one phone number is required.");
      return;
    }

    setSavingSection(section);

    try {
      let results: boolean[];

      switch (section) {
        case "topbar":
          results = await Promise.all([
            setSetting("topbar_content", topbarContent),
          ]);
          break;
        case "brand-license":
          results = await Promise.all([
            setSetting("footer_licenses", licenses),
          ]);
          break;
        case "contact-info":
          setPhones(normalizedPhones);
          results = await Promise.all([
            saveFooterContentPatch({
              email: footerContent.email,
              addressEn: footerContent.addressEn,
              addressBn: footerContent.addressBn ?? "",
            }),
            setSetting("footer_phones", serializePhoneList(normalizedPhones)),
          ]);
          break;
        case "affiliations":
          results = await Promise.all([
            setSetting("footer_badges", badges.map(normalizeAffiliationBadge)),
          ]);
          break;
        case "social-link":
          results = await Promise.all([
            saveFooterContentPatch({
              facebook: footerContent.facebook,
              youtube: footerContent.youtube,
              instagram: footerContent.instagram,
              twitter: footerContent.twitter,
              linkedin: footerContent.linkedin,
            }),
          ]);
          break;
        case "btrc-tariff":
          results = [true];
          break;
      }

      if (results.every(Boolean)) {
        toast(sectionSuccessMessages[section]);
      } else {
        toast.error("Some settings could not be saved. Please log in again and retry.");
      }
    } catch {
      toast.error("Settings could not be saved. Please log in again and retry.");
    } finally {
      setSavingSection(null);
    }
  };

  const renderSectionSaveButton = (section: SectionId) => {
    const isSaving = savingSection === section;

    return (
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={savingSection !== null}
          className="px-5 py-3 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSaving ? "Saving..." : sectionSaveLabels[section]}
        </button>
      </div>
    );
  };

  const tabs: { id: SectionId; label: string; icon: typeof Menu }[] = [
    { id: "topbar", label: "Topbar", icon: Menu },
    { id: "brand-license", label: "Brand License", icon: Info },
    { id: "contact-info", label: "Contact Info", icon: Mail },
    { id: "affiliations", label: "Affiliations", icon: Building },
    { id: "social-link", label: "Social Link", icon: Globe },
    { id: "btrc-tariff", label: "BTRC Approved Tariff", icon: Upload },
  ];

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
    const nextBadge = {
      ...updated[index],
      [field]: value
    } as AffiliationBadge;
    if (field === "image" && typeof value === "string" && value.trim()) {
      nextBadge.textEn = nextBadge.textEn.trim() || imageBadgeFallbackText;
      nextBadge.textBn = nextBadge.textEn;
    }
    updated[index] = nextBadge;
    setBadges(updated);
  };

  const deleteBadge = (index: number) => {
    if (!confirm("Are you sure you want to delete this badge?")) return;
    const updated = badges.filter((_, idx) => idx !== index);
    setBadges(updated);
  };

  const addNewBadge = (e: React.FormEvent) => {
    e.preventDefault();
    const image = newBadge.image?.trim() ? newBadge.image.trim() : undefined;
    if (!image && (!newBadge.textEn.trim() || false)) {
      toast("Please fill in the English text field.");
      return;
    }
    const badgeToAppend: AffiliationBadge = {
      textEn: newBadge.textEn.trim() || imageBadgeFallbackText,
      textBn: newBadge.textEn.trim() || imageBadgeFallbackText,
      isCyan: newBadge.isCyan,
      image
    };
    setBadges([...badges, badgeToAppend]);
    setNewBadge({ textEn: "", isCyan: false, image: "" });
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
    const nextLicense = {
      ...updated[index],
      [field]: value
    } as LicenseBadge;
    if (field === "image" && typeof value === "string" && value.trim()) {
      nextLicense.textEn = nextLicense.textEn.trim() || imageBadgeFallbackText;
      nextLicense.textBn = nextLicense.textEn;
    }
    updated[index] = nextLicense;
    setLicenses(updated);
  };

  const deleteLicense = (index: number) => {
    if (!confirm("Are you sure you want to delete this license badge?")) return;
    const updated = licenses.filter((_, idx) => idx !== index);
    setLicenses(updated);
  };

  const addNewLicense = (e: React.FormEvent) => {
    e.preventDefault();
    const image = newLicense.image?.trim() ? newLicense.image.trim() : undefined;
    if (!image && (!newLicense.textEn.trim() || false)) {
      toast("Please fill in the English text field.");
      return;
    }
    setLicenses([
      ...licenses,
      {
        textEn: newLicense.textEn.trim() || imageBadgeFallbackText,
      textBn: newLicense.textEn.trim() || imageBadgeFallbackText,
        isMono: newLicense.isMono,
        colorStyle: newLicense.colorStyle,
        image,
      },
    ]);
    setNewLicense({ textEn: "", isMono: false, colorStyle: "cyan", image: "" });
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Header &amp; Footer Global CMS Settings</h2>
        <p className="text-xs text-slate-500 mt-1">Configure layout badges, contacts, social presence, header navigation, and copyright variables dynamically.</p>
      </div>

      {/* Tabs list (Consolidated to only 6 tabs as requested) */}
      <div className="flex border-b border-slate-100 pb-px gap-6 overflow-x-auto select-none">
        {tabs.map((tab) => {
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

      <form onSubmit={saveCurrentSection} className="space-y-6 w-full">
        
        {/* Tab 1: Header Topbar Editor */}
        {activeSection === "topbar" && (
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
            {renderSectionSaveButton("topbar")}
          </div>
        )}

        {/* Tab 2: Brand License */}
        {activeSection === "brand-license" && (
          <div className="space-y-6 w-full animate-fade-in">
            
            {/* Section A: Brand & Badges */}
            <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30 space-y-4 shadow-xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-brand-blue" /> Brand License/Status Badges
              </h3>

              <div className="space-y-4 pt-4">
                <span className="text-xs font-black uppercase tracking-wider text-slate-800 block">Brand License/Status Badges List</span>
                
                {/* Licenses Editor Table */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                        <th className="px-4 py-3 w-16 text-center">Order</th>
                        <th className="px-4 py-3">English Label</th>
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
                              {lic.image ? (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  Image badge
                                </span>
                              ) : (
                                <input
                                  type="text"
                                  value={lic.textEn}
                                  onChange={(e) => handleLicenseFieldChange(idx, "textEn", e.target.value)}
                                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                                  required
                                />
                              )}
                            </td>{/* Badge Image Upload & Preview */}
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
                  <div className={newLicense.image ? "grid grid-cols-1 md:grid-cols-3 gap-4 items-center" : "grid grid-cols-1 md:grid-cols-5 gap-4 items-center"}>
                    {!newLicense.image && (
                      <>
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
                    </div>
                      </>
                    )}
                    
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
            {renderSectionSaveButton("brand-license")}
          </div>
        )}

        {/* Tab 3: Contact Info */}
        {activeSection === "contact-info" && (
          <div className="space-y-6 w-full animate-fade-in">

            {/* Section C: Contacts & Location */}
            <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30 space-y-4 shadow-xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-brand-blue" /> Contact Info
              </h3>

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
                    className="min-h-24 w-full resize-y bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-brand-blue leading-relaxed"
                    placeholder="e.g. House No. 68, Kadomtoli, Aganagar..."
                    required
                  />
                </div>
                <div className="space-y-1">
                </div>
              </div>
            </div>
            {renderSectionSaveButton("contact-info")}
          </div>
        )}

        {/* Tab 4: Affiliations */}
        {activeSection === "affiliations" && (
          <div className="space-y-6 w-full animate-fade-in">

            {/* Section D: Affiliations & Membership */}
            <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30 space-y-4 shadow-xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-brand-blue" /> Our Affiliations
              </h3>

              <div className="space-y-4 pt-4">
                <span className="text-xs font-black uppercase tracking-wider text-slate-800 block">Affiliation Badges List</span>
                
                {/* Badges Editor Table */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                        <th className="px-4 py-3 w-16 text-center">Order</th>
                        <th className="px-4 py-3">English Label (Fallback)</th>
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
                              {badge.image ? (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  Image badge
                                </span>
                              ) : (
                                <input
                                  type="text"
                                  value={badge.textEn}
                                  onChange={(e) => handleBadgeFieldChange(idx, "textEn", e.target.value)}
                                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                                  required
                                />
                              )}
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
                  <div className={newBadge.image ? "grid grid-cols-1 md:grid-cols-2 gap-4 items-center" : "grid grid-cols-1 md:grid-cols-4 gap-4 items-center"}>
                    {!newBadge.image && (
                      <>
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
                      </>
                    )}
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
            {renderSectionSaveButton("affiliations")}
          </div>
        )}

        {/* Tab 5: Social Link */}
        {activeSection === "social-link" && (
          <div className="space-y-6 w-full animate-fade-in">
            {/* Section E: Social & BTRC */}
            <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30 space-y-4 shadow-xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-brand-blue" /> Footer Social Links
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
            </div>
            {renderSectionSaveButton("social-link")}
          </div>
        )}

        {/* Tab 6: BTRC Approved Tariff */}
        {activeSection === "btrc-tariff" && (
          <div className="space-y-6 w-full animate-fade-in">
            <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30 space-y-4 shadow-xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-brand-blue" /> BTRC Regulatory Documents
              </h3>
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
            {renderSectionSaveButton("btrc-tariff")}
          </div>
        )}
      </form>
    </div>
  );
}

