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
  Briefcase 
} from "lucide-react";
import { toast } from "sonner";

type TabId = "packages" | "offers" | "coverage" | "multimedia" | "careers";

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

  // State for all 5 page headers
  const [headers, setHeaders] = useState<Record<TabId, HeaderSection>>({
    packages: { bg: "", titleEn: "", highlightEn: "", subtitleEn: "" },
    offers: { bg: "", titleEn: "", highlightEn: "", subtitleEn: "" },
    coverage: { bg: "", titleEn: "", highlightEn: "", subtitleEn: "" },
    multimedia: { bg: "", titleEn: "", highlightEn: "", subtitleEn: "" },
    careers: { bg: "", titleEn: "", highlightEn: "", subtitleEn: "" },
  });

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
        });
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
    const current = await getSetting("page_headers") || {};
    
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
    };

    await setSetting("page_headers", updated);
    setSaved(true);
    toast.success("Header Content settings updated successfully!");
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
  ];

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Tabs navigation */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap shadow-sm border ${
                isActive
                  ? "bg-slate-900 border-slate-900 text-white"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tab.icon}
              {tab.label} Header
            </button>
          );
        })}
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
                Subtitle Description (English)
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
                Normal Title Prefix (English)
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
                Highlighted Title Suffix (English)
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
