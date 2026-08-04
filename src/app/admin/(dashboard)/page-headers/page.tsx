"use client";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import { 
  CheckCircle2, 
  Save, 
  FileText, 
  Layers, 
  Tag, 
  MapPin, 
  Tv2, 
  Briefcase,
  PhoneCall,
  Info
} from "lucide-react";
import { toast } from "sonner";

type TabId = "packages" | "offers" | "coverage" | "multimedia" | "careers" | "contact" | "about";

interface HeaderSection {
  bg: string;
  titleEn: string;
  highlightEn: string;
  subtitleEn: string;
}

export default function HeaderContentPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("packages");

  // State for all 7 page headers
  const [headers, setHeaders] = useState<Record<TabId, HeaderSection>>({
    packages: { bg: "", titleEn: "", highlightEn: "", subtitleEn: "" },
    offers: { bg: "", titleEn: "", highlightEn: "", subtitleEn: "" },
    coverage: { bg: "", titleEn: "", highlightEn: "", subtitleEn: "" },
    multimedia: { bg: "", titleEn: "", highlightEn: "", subtitleEn: "" },
    careers: { bg: "", titleEn: "", highlightEn: "", subtitleEn: "" },
    contact: { bg: "", titleEn: "", highlightEn: "", subtitleEn: "" },
    about: { bg: "", titleEn: "", highlightEn: "", subtitleEn: "" },
  });

  // State for Homepage Packages Section Heading
  const [packagesSecTitleEn, setPackagesSecTitleEn] = useState("Choose the Perfect Plan for You");
  const [packagesSecSubtitleEn, setPackagesSecSubtitleEn] = useState("High-speed fiber optic internet packages designed for seamless streaming, buffer-free gaming, and high-performance corporate networks.");

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);

    getSetting("page_headers").then((s) => {
      const data = s as Record<string, string> | null;
      if (data) {
        setHeaders({
          packages: {
            bg: data.packages_bg || "",
            titleEn: data.packages_title_en || "",
            highlightEn: data.packages_title_highlight_en || "",
            subtitleEn: data.packages_subtitle_en || "",
          },
          offers: {
            bg: data.offers_bg || "",
            titleEn: data.offers_title_en || "",
            highlightEn: data.offers_title_highlight_en || "",
            subtitleEn: data.offers_subtitle_en || "",
          },
          coverage: {
            bg: data.coverage_bg || "",
            titleEn: data.coverage_title_en || "",
            highlightEn: data.coverage_title_highlight_en || "",
            subtitleEn: data.coverage_subtitle_en || "",
          },
          multimedia: {
            bg: data.multimedia_bg || "",
            titleEn: data.multimedia_title_en || "",
            highlightEn: data.multimedia_title_highlight_en || "",
            subtitleEn: data.multimedia_subtitle_en || "",
          },
          careers: {
            bg: data.careers_bg || "",
            titleEn: data.careers_title_en || "",
            highlightEn: data.careers_title_highlight_en || "",
            subtitleEn: data.careers_subtitle_en || "",
          },
          contact: {
            bg: data.contact_bg || "",
            titleEn: data.contact_title_en || "Contact ",
            highlightEn: data.contact_title_highlight_en || "Our Team",
            subtitleEn: data.contact_subtitle_en || "Have questions about coverage feasibility, pricing discounts, or corporate dedicated connections? Reach out to us directly or fill out the query form.",
          },
          about: {
            bg: data.about_bg || "",
            titleEn: data.about_title_en || "About ",
            highlightEn: data.about_title_highlight_en || "M Amin Network",
            subtitleEn: data.about_subtitle_en || "Discover our history, network infrastructure capabilities, and why we are South Keraniganj's most trusted broadband provider.",
          },
        });
      }
    });

    getSetting("contact_content_full").then((s) => {
      if (s) {
        const item = Array.isArray(s) ? s[0] : s;
        if (item && typeof item === "object") {
          const data = item as Record<string, string>;
          setHeaders(prev => ({
            ...prev,
            contact: {
              bg: prev.contact.bg || "",
              titleEn: data.titleEn || prev.contact.titleEn || "Contact ",
              highlightEn: data.highlightEn || prev.contact.highlightEn || "Our Team",
              subtitleEn: data.descEn || prev.contact.subtitleEn || "Have questions about coverage feasibility, pricing discounts, or corporate dedicated connections? Reach out to us directly or fill out the query form.",
            }
          }));
        }
      }
    });

    getSetting("about_content_full").then((s) => {
      if (s) {
        const item = Array.isArray(s) ? s[0] : s;
        if (item && typeof item === "object") {
          const data = item as Record<string, string>;
          setHeaders(prev => ({
            ...prev,
            about: {
              bg: prev.about.bg || "",
              titleEn: data.headerTitleEn || prev.about.titleEn || "About ",
              highlightEn: data.highlightEn || prev.about.highlightEn || "M Amin Network",
              subtitleEn: data.headerDescEn || prev.about.subtitleEn || "Discover our history, network infrastructure capabilities, and why we are South Keraniganj's most trusted broadband provider.",
            }
          }));
        }
      }
    });

    getSetting("packages_content").then((s) => {
      if (s) {
        const item = Array.isArray(s) ? s[0] : s;
        if (item && typeof item === "object") {
          const data = item as Record<string, string>;
          if (data.titleEn) setPackagesSecTitleEn(data.titleEn);
          if (data.subtitleEn) setPackagesSecSubtitleEn(data.subtitleEn);
        }
      }
    });
  }, [router]);

  const handleFieldChange = (field: keyof HeaderSection, value: string) => {
    setHeaders(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: value,
      }
    }));
  };

  const save = async () => {
    const current = await getSetting("page_headers") as Record<string, string> || {};
    
    // Construct the settings payload with EN mirrored to BN automatically to support clean inputs
    const updated = {
      ...current,
      packages_bg: headers.packages.bg,
      packages_title_en: headers.packages.titleEn,
      packages_title_bn: headers.packages.titleEn,
      packages_title_highlight_en: headers.packages.highlightEn,
      packages_title_highlight_bn: headers.packages.highlightEn,
      packages_subtitle_en: headers.packages.subtitleEn,
      packages_subtitle_bn: headers.packages.subtitleEn,

      offers_bg: headers.offers.bg,
      offers_title_en: headers.offers.titleEn,
      offers_title_bn: headers.offers.titleEn,
      offers_title_highlight_en: headers.offers.highlightEn,
      offers_title_highlight_bn: headers.offers.highlightEn,
      offers_subtitle_en: headers.offers.subtitleEn,
      offers_subtitle_bn: headers.offers.subtitleEn,

      coverage_bg: headers.coverage.bg,
      coverage_title_en: headers.coverage.titleEn,
      coverage_title_bn: headers.coverage.titleEn,
      coverage_title_highlight_en: headers.coverage.highlightEn,
      coverage_title_highlight_bn: headers.coverage.highlightEn,
      coverage_subtitle_en: headers.coverage.subtitleEn,
      coverage_subtitle_bn: headers.coverage.subtitleEn,

      multimedia_bg: headers.multimedia.bg,
      multimedia_title_en: headers.multimedia.titleEn,
      multimedia_title_bn: headers.multimedia.titleEn,
      multimedia_title_highlight_en: headers.multimedia.highlightEn,
      multimedia_title_highlight_bn: headers.multimedia.highlightEn,
      multimedia_subtitle_en: headers.multimedia.subtitleEn,
      multimedia_subtitle_bn: headers.multimedia.subtitleEn,

      careers_bg: headers.careers.bg,
      careers_title_en: headers.careers.titleEn,
      careers_title_bn: headers.careers.titleEn,
      careers_title_highlight_en: headers.careers.highlightEn,
      careers_title_highlight_bn: headers.careers.highlightEn,
      careers_subtitle_en: headers.careers.subtitleEn,
      careers_subtitle_bn: headers.careers.subtitleEn,

      contact_bg: headers.contact.bg,
      contact_title_en: headers.contact.titleEn,
      contact_title_bn: headers.contact.titleEn,
      contact_title_highlight_en: headers.contact.highlightEn,
      contact_title_highlight_bn: headers.contact.highlightEn,
      contact_subtitle_en: headers.contact.subtitleEn,
      contact_subtitle_bn: headers.contact.subtitleEn,

      about_bg: headers.about.bg,
      about_title_en: headers.about.titleEn,
      about_title_bn: headers.about.titleEn,
      about_title_highlight_en: headers.about.highlightEn,
      about_title_highlight_bn: headers.about.highlightEn,
      about_subtitle_en: headers.about.subtitleEn,
      about_subtitle_bn: headers.about.subtitleEn,
    };

    await setSetting("page_headers", updated);
    await setSetting("packages_content", {
      titleEn: packagesSecTitleEn,
      subtitleEn: packagesSecSubtitleEn,
    });

    const currentContact = await getSetting("contact_content_full") as Record<string, unknown> || {};
    const updatedContact = {
      ...currentContact,
      titleEn: headers.contact.titleEn,
      titleBn: headers.contact.titleEn,
      highlightEn: headers.contact.highlightEn,
      highlightBn: headers.contact.highlightEn,
      descEn: headers.contact.subtitleEn,
      descBn: headers.contact.subtitleEn,
    };
    await setSetting("contact_content_full", updatedContact);

    const currentAbout = await getSetting("about_content_full") as Record<string, unknown> || {};
    const updatedAbout = {
      ...currentAbout,
      headerTitleEn: headers.about.titleEn,
      headerTitleBn: headers.about.titleEn,
      highlightEn: headers.about.highlightEn,
      highlightBn: headers.about.highlightEn,
      headerDescEn: headers.about.subtitleEn,
      headerDescBn: headers.about.subtitleEn,
    };
    await setSetting("about_content_full", updatedAbout);

    setSaved(true);
    toast.success("Header & Section Content settings updated successfully!");
    setTimeout(() => setSaved(false), 3000);
  };

  if (!auth) return null;

  const currentHeader = headers[activeTab];

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "packages", label: "Packages", icon: <Layers className="w-4 h-4" /> },
    { id: "offers", label: "Offers", icon: <Tag className="w-4 h-4" /> },
    { id: "coverage", label: "Coverage", icon: <MapPin className="w-4 h-4" /> },
    { id: "multimedia", label: "Multimedia", icon: <Tv2 className="w-4 h-4" /> },
    { id: "careers", label: "Careers", icon: <Briefcase className="w-4 h-4" /> },
    { id: "contact", label: "Contact", icon: <PhoneCall className="w-4 h-4" /> },
    { id: "about", label: "About", icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Pixel-perfect Minimal Underline Tabs Navigation */}
      <div className="border-b border-slate-200 mb-6">
        <nav className="flex space-x-8 overflow-x-auto pb-0" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-1 inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap transition-all cursor-pointer border-b-2 -mb-px ${
                  isActive
                    ? "border-[#635BFF] text-[#635BFF]"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Config Editor Body */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <FileText className="w-5 h-5 text-orange-500" />
          <h2 className="text-base font-bold text-slate-800 uppercase tracking-wide">
            {activeTab} header configuration
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">


            {/* Subtitle textarea */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                Subtitle Description
              </label>
              <textarea
                rows={4}
                value={currentHeader.subtitleEn}
                onChange={(e) => handleFieldChange("subtitleEn", e.target.value)}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-orange-500 outline-none resize-none font-sans transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-4">
            {/* Normal Title input */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                Normal Title Prefix
              </label>
              <input
                type="text"
                value={currentHeader.titleEn}
                onChange={(e) => handleFieldChange("titleEn", e.target.value)}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-orange-500 outline-none transition-all font-medium"
              />
            </div>

            {/* Highlighted Title input */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                Highlighted Title Suffix
              </label>
              <input
                type="text"
                value={currentHeader.highlightEn}
                onChange={(e) => handleFieldChange("highlightEn", e.target.value)}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-orange-500 outline-none transition-all font-medium"
              />
            </div>


          </div>
        </div>

        {activeTab === "packages" && (
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                Homepage Packages Section Heading
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                  Homepage Section Title
                </label>
                <input
                  type="text"
                  value={packagesSecTitleEn}
                  onChange={(e) => setPackagesSecTitleEn(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-orange-500 outline-none transition-all font-medium"
                  placeholder="e.g. Choose the Perfect Plan for You"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                  Homepage Section Subtitle / Description
                </label>
                <textarea
                  rows={2}
                  value={packagesSecSubtitleEn}
                  onChange={(e) => setPackagesSecSubtitleEn(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-orange-500 outline-none resize-none font-sans transition-all font-medium"
                  placeholder="Enter section description..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Separated Save Button Section */}
        <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
          <button
            onClick={save}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-md active:scale-[0.98]"
          >
            <Save className="w-4 h-4" /> Save Headers
          </button>
          {saved && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5" /> Saved!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export interface PageHeaderData {
  packages_bg: string;
  packages_title_en: string;
  packages_title_bn?: string;
  packages_title_highlight_en: string;
  packages_title_highlight_bn?: string;
  packages_subtitle_en: string;
  packages_subtitle_bn?: string;

  offers_bg: string;
  offers_title_en: string;
  offers_title_bn?: string;
  offers_title_highlight_en: string;
  offers_title_highlight_bn?: string;
  offers_subtitle_en: string;
  offers_subtitle_bn?: string;

  coverage_bg: string;
  coverage_title_en: string;
  coverage_title_bn?: string;
  coverage_title_highlight_en: string;
  coverage_title_highlight_bn?: string;
  coverage_subtitle_en: string;
  coverage_subtitle_bn?: string;

  multimedia_bg: string;
  multimedia_title_en: string;
  multimedia_title_bn?: string;
  multimedia_title_highlight_en: string;
  multimedia_title_highlight_bn?: string;
  multimedia_subtitle_en: string;
  multimedia_subtitle_bn?: string;

  careers_bg: string;
  careers_title_en: string;
  careers_title_bn?: string;
  careers_title_highlight_en: string;
  careers_title_highlight_bn?: string;
  careers_subtitle_en: string;
  careers_subtitle_bn?: string;
}

export const defaultPageHeaders: PageHeaderData = {
  packages_bg: "/video/package-header.mp4",
  packages_title_en: "Flexible & Premium",
  packages_title_highlight_en: "Broadband Plans",
  packages_subtitle_en: "Choose from our diverse range of fiber optic broadband connections. All plans come with unlimited volume, high-speed peers, and 24/7 technical monitoring.",

  offers_bg: "/offer.jpg",
  offers_title_en: "Monsoon Campaigns",
  offers_title_highlight_en: "& Discounts",
  offers_subtitle_en: "Unlock high-speed splicing broadband peering plans at zero installation fees.",

  coverage_bg: "/coverage.jpg",
  coverage_title_en: "Active Coverage",
  coverage_title_highlight_en: "& Splicing Zones",
  coverage_subtitle_en: "Check if our fiber optic broadband coverage is available in your neighborhood of South Keraniganj.",

  multimedia_bg: "/Multimedia.jpg",
  multimedia_title_en: "Multimedia",
  multimedia_title_highlight_en: "& BDIX Portal",
  multimedia_subtitle_en: "Access our high-speed local entertainment gateways to stream movies, play games, and watch live TV at speeds up to 100 Mbps.",

  careers_bg: "/footer-bg.jpg",
  careers_title_en: "Build Your Career",
  careers_title_highlight_en: "With NOC Splicers",
  careers_subtitle_en: "Explore open opportunities, engineering apprenticeships, and localized support roles at South Keraniganj.",
};
