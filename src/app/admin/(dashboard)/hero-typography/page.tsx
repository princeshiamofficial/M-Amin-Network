"use client";
import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2, Upload } from "lucide-react";
import { useAdminSecurity } from "@/hooks/useAdminSecurity";

interface HeroTypography {
  badgeText: string;
  mainTitle: string;
  subtitle: string;
  slides: string[];
}

interface HeroMetric {
  value: string;
  titleEn: string;
  titleBn?: string;
  descEn: string;
  descBn?: string;
}

const defaultHeroTypography: HeroTypography = {
  badgeText: "BTRC Licensed Broadband Provider",
  mainTitle: "Blazing Fast Fiber | Internet in Keraniganj",
  subtitle: "M Amin Network (AS150164) is South Keraniganj's leading ISP, offering high-speed, SLA-backed stable internet with dedicated routing.",
  slides: []
};

const MAX_HERO_SLIDES = 6;

const defaultHeroMetrics: HeroMetric[] = [
  { value: "99.9%", titleEn: "Guaranteed Uptime", descEn: "Redundant upstream connections" },
  { value: "2,000+", titleEn: "Active Clients", descEn: "Trusted by homes & businesses" },
  { value: "10+", titleEn: "Cities Served", descEn: "Across South Keraniganj" },
  { value: "24/7", titleEn: "Support Response", descEn: "Expert technical field support" },
];

const defaultMetricSuffixes = ["%", "+", "+", "/7"];

function getMetricNumber(value: string): string {
  const match = value.match(/[0-9,]+(?:\.[0-9]+)?/);
  return match ? match[0].replace(/,/g, "") : "";
}

function getMetricSuffix(value: string, index: number): string {
  const match = value.match(/[0-9,]+(?:\.[0-9]+)?(.*)$/);
  return match?.[1] || defaultMetricSuffixes[index] || "";
}

function normalizeHeroMetrics(saved: unknown): HeroMetric[] {
  const savedItems = Array.isArray(saved) ? saved : [];

  return defaultHeroMetrics.map((fallback, index) => {
    const item = savedItems[index];
    if (!item || typeof item !== "object") return fallback;

    const metric = item as Record<string, unknown>;
    return {
      value: String(metric.value || fallback.value),
      titleEn: String(metric.titleEn || fallback.titleEn),
      titleBn: String(metric.titleBn || fallback.titleBn),
      descEn: String(metric.descEn || fallback.descEn),
      descBn: String(metric.descBn || fallback.descBn),
    };
  });
}

export default function HeroTypographyPage() {
  const router = useRouter();
  const { canEdit } = useAdminSecurity();
  const allowEdit = canEdit("/admin/hero-typography");
  const [auth, setAuth] = useState(false);
  const [heroTypography, setHeroTypography] = useState<HeroTypography>(defaultHeroTypography);
  const [heroMetrics, setHeroMetrics] = useState<HeroMetric[]>(defaultHeroMetrics);
  const [uploadingSlide, setUploadingSlide] = useState(false);
  
  // Preview states
  const [activePreviewSlide, setActivePreviewSlide] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    
    // Load hero info
    getSetting("hero_typography").then(saved => {
      if (saved) {
        const parsed = saved as Record<string, unknown>;
        const savedSlides = Array.isArray(parsed.slides)
          ? parsed.slides.filter((slide): slide is string => 
              typeof slide === "string" && 
              slide.trim() !== "" &&
              !slide.includes("28ca5e1d52c944ebfc4dd9f2b300980d") &&
              !slide.includes("6c55d74de82b7eee7127c3e2d4939b1f") &&
              !slide.includes("933503ea823535235e8159f65709292f") &&
              !slide.includes("ea82d2834f062ee8d73d8b99aebe0d31")
            )
          : [];
        setHeroTypography({
          badgeText: (parsed.badgeText as string) || defaultHeroTypography.badgeText,
          mainTitle: (parsed.mainTitle as string) || defaultHeroTypography.mainTitle,
          subtitle: (parsed.subtitle as string) || defaultHeroTypography.subtitle,
          slides: savedSlides.length > 0 ? savedSlides.slice(0, MAX_HERO_SLIDES) : defaultHeroTypography.slides
        });
      } else {
        setSetting("hero_typography", defaultHeroTypography);
        setHeroTypography(defaultHeroTypography);
      }
    });

    // Load hero metrics
    getSetting("hero_metrics").then(saved => {
      if (saved) {
        setHeroMetrics(normalizeHeroMetrics(saved));
      } else {
        setSetting("hero_metrics", defaultHeroMetrics);
        setHeroMetrics(defaultHeroMetrics);
      }
    });
  }, [router]);

  // Preview background slide rotator hook
  useEffect(() => {
    if (heroTypography.slides && heroTypography.slides.length > 0) {
      const interval = setInterval(() => {
        setActivePreviewSlide((prev) => (prev + 1) % heroTypography.slides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [heroTypography.slides]);

  const saveHeroTypography = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allowEdit) {
      toast.error("You do not have permission to update hero settings.");
      return;
    }
    setSetting("hero_typography", heroTypography);
    setSetting("hero_metrics", heroMetrics);
    toast("Hero configurations and stats metrics saved successfully!");
  };

  const removeSlide = (index: number) => {
    if (!allowEdit) {
      toast.error("You do not have permission to remove hero slides.");
      return;
    }
    const updatedSlides = (heroTypography.slides || []).filter((_, i) => i !== index);
    const updated = { ...heroTypography, slides: updatedSlides };
    setHeroTypography(updated);
    setSetting("hero_typography", updated);
    // Reset active preview index if out of bounds
    if (activePreviewSlide >= updatedSlides.length) {
      setActivePreviewSlide(0);
    }
  };

  const uploadSlide = async (file: File | null) => {
    if (!file) return;
    if (!allowEdit) {
      toast.error("You do not have permission to upload hero slides.");
      return;
    }
    if ((heroTypography.slides || []).length >= MAX_HERO_SLIDES) {
      toast.error(`Maximum ${MAX_HERO_SLIDES} hero slides allowed.`);
      return;
    }

    setUploadingSlide(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload-header-asset", {
        method: "POST",
        body: formData
      });
      const data = await response.json() as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        toast.error(data.error || "Slide upload failed.");
        return;
      }
      const updated = {
        ...heroTypography,
        slides: [...(heroTypography.slides || []), data.url].slice(0, MAX_HERO_SLIDES)
      };
      setHeroTypography(updated);
      await setSetting("hero_typography", updated);
      toast.success("Hero slide uploaded successfully.");
    } catch {
      toast.error("Slide upload failed.");
    } finally {
      setUploadingSlide(false);
    }
  };

  const updateMetricValue = (index: number, value: string) => {
    const updated = [...heroMetrics];
    updated[index] = {
      ...updated[index],
      value
    };
    setHeroMetrics(updated);
  };

  const updateMetricField = (index: number, field: keyof HeroMetric, val: string) => {
    const updated = [...heroMetrics];
    updated[index] = {
      ...updated[index],
      [field]: val
    };
    setHeroMetrics(updated);
  };

  const handleMetricNumberChange = (index: number, numberValue: string) => {
    const currentValue = heroMetrics[index]?.value || "";
    const suffix = getMetricSuffix(currentValue, index);
    updateMetricValue(index, numberValue ? `${numberValue}${suffix}` : "");
  };

  if (!auth) return null;

  // Title Splitting for dynamic live rendering
  const titleParts = (heroTypography.mainTitle || "").split("|");
  const firstPart = titleParts[0]?.trim() || heroTypography.mainTitle;
  const secondPart = titleParts[1]?.trim() || "";

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Hero Section &amp; Slides Settings</h2>
        <p className="text-xs text-slate-500 mt-1">Modify main advertising messages, slide images, and core trust stats cards visible on the landing page.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Editor */}
        <form onSubmit={saveHeroTypography} className="lg:col-span-7 space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">Badge Text</label>
            <input
              type="text"
              value={heroTypography.badgeText || ""}
              onChange={(e) => setHeroTypography({ ...heroTypography, badgeText: e.target.value })}
              disabled={!allowEdit}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">Main Advertising Title</label>
            <p className="text-[10px] text-slate-400 mb-1">Use the pipe symbol <code className="bg-slate-100 px-1 py-0.5 rounded font-bold text-slate-700">|</code> to separate the regular white text from the glowing cyan/blue text (e.g. <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-700">Blazing Fast Fiber | Internet in Keraniganj</code>).</p>
            <textarea
              rows={2}
              value={heroTypography.mainTitle || ""}
              onChange={(e) => setHeroTypography({ ...heroTypography, mainTitle: e.target.value })}
              disabled={!allowEdit}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue font-semibold resize-none disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">Sub-Headline Text</label>
            <textarea
              rows={3}
              value={heroTypography.subtitle || ""}
              onChange={(e) => setHeroTypography({ ...heroTypography, subtitle: e.target.value })}
              disabled={!allowEdit}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue resize-none disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>
          
          <div className="space-y-3 pt-4 border-t border-slate-150">
            <div className="flex items-center justify-between gap-3">
              <label className="text-xs font-bold text-slate-700 block">Hero Slide Images</label>
              <span className="text-[10px] font-bold text-slate-400">{(heroTypography.slides || []).length}/{MAX_HERO_SLIDES}</span>
            </div>
            <div className="flex gap-2">
              <label className={`px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-900 rounded-xl text-xs font-bold text-white transition-colors flex items-center gap-2 ${!allowEdit || uploadingSlide || (heroTypography.slides || []).length >= MAX_HERO_SLIDES ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
                <Upload className="w-3.5 h-3.5" />
                {uploadingSlide ? "Uploading" : "Upload"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  disabled={!allowEdit || uploadingSlide || (heroTypography.slides || []).length >= MAX_HERO_SLIDES}
                  onChange={(e) => {
                    uploadSlide(e.target.files?.[0] || null);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
              {(heroTypography.slides || []).map((slide, index) => (
                <div key={index} className="relative group border border-slate-150 rounded-xl overflow-hidden aspect-video bg-slate-50">
                  <Image
                    src={slide}
                    alt={`Slide ${index + 1}`}
                    width={300}
                    height={180}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&q=80";
                    }}
                    unoptimized
                  />
                  <button
                    type="button"
                    onClick={() => removeSlide(index)}
                    disabled={!allowEdit}
                    className="absolute top-2 right-2 bg-red-600/90 text-white rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-700 shadow-md disabled:cursor-not-allowed disabled:opacity-0"
                    title="Remove Slide"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute bottom-0 inset-x-0 bg-black/60 px-2 py-1 text-[9px] font-mono text-white truncate text-center select-all">
                    {slide}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics Editor */}
          <div className="space-y-4 pt-4 border-t border-slate-150">
            <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Hero Section Stats Cards (Trust Metrics)</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {heroMetrics.map((metric, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Card {idx + 1} Settings</span>
                  <div className="space-y-3.5">
                    {/* Value inputs */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 block uppercase">Number Value</label>
                        <input
                          type="number"
                          min="0"
                          step={idx === 0 ? "0.1" : "1"}
                          value={getMetricNumber(metric.value || "")}
                          onChange={(e) => handleMetricNumberChange(idx, e.target.value)}
                          disabled={!allowEdit}
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue disabled:bg-slate-50 disabled:text-slate-400"
                          placeholder={idx === 0 ? "99.9" : idx === 1 ? "2000" : idx === 2 ? "10" : "24"}
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 block uppercase">Suffix (e.g. %, +, /7)</label>
                        <input
                          type="text"
                          value={getMetricSuffix(metric.value || "", idx)}
                          onChange={(e) => {
                            const num = getMetricNumber(metric.value || "");
                            updateMetricValue(idx, num ? `${num}${e.target.value}` : e.target.value);
                          }}
                          disabled={!allowEdit}
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue disabled:bg-slate-50 disabled:text-slate-400"
                          placeholder="%"
                        />
                      </div>
                    </div>

                    {/* Titles */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 block uppercase">Card Title</label>
                      <input
                        type="text"
                        value={metric.titleEn || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          const updated = [...heroMetrics];
                          updated[idx] = {
                            ...updated[idx],
                            titleEn: val,
                            titleBn: val
                          };
                          setHeroMetrics(updated);
                        }}
                        disabled={!allowEdit}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue disabled:bg-slate-50 disabled:text-slate-400"
                        placeholder="e.g. Active Clients"
                        required
                      />
                    </div>

                    {/* Descriptions */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 block uppercase">Card Description</label>
                      <input
                        type="text"
                        value={metric.descEn || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          const updated = [...heroMetrics];
                          updated[idx] = {
                            ...updated[idx],
                            descEn: val,
                            descBn: val
                          };
                          setHeroMetrics(updated);
                        }}
                        disabled={!allowEdit}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue disabled:bg-slate-50 disabled:text-slate-400"
                        placeholder="e.g. Trusted clients"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!allowEdit}
            className="px-5 py-3 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Settings
          </button>
        </form>

        {/* Right Column: Live Preview */}
        <div className="lg:col-span-5 lg:sticky lg:top-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Live Interactive Preview</span>
            <span className="text-[10px] bg-slate-100 border text-slate-500 rounded px-1.5 py-0.5 font-bold">Auto-rotating</span>
          </div>

          {/* Preview Canvas */}
          <div className="bg-[#0a0d18] border border-slate-800 rounded-2xl relative overflow-hidden flex flex-col justify-center py-7 px-6 shadow-xl select-none">
            {/* Background Slides */}
            {heroTypography.slides && heroTypography.slides.length > 0 ? (
              heroTypography.slides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
                    idx === activePreviewSlide ? "opacity-40" : "opacity-0"
                  }`}
                >
                  <Image
                    src={slide}
                    alt="Preview Background"
                    width={500}
                    height={300}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&q=80";
                    }}
                    unoptimized
                  />
                </div>
              ))
            ) : (
              <div className="absolute inset-0 bg-slate-900 opacity-40" />
            )}

            {/* Readability dark overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent pointer-events-none z-0" />
            <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent pointer-events-none z-0" />

            {/* Glowing Accent background light */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />

            {/* Content Mockup */}
            <div className="relative z-10 space-y-4 w-full">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[8px] font-bold tracking-wider uppercase select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                {heroTypography.badgeText || defaultHeroTypography.badgeText}
              </div>

              <h1 className="text-xl sm:text-2xl font-extrabold text-white leading-tight tracking-tight max-w-md">
                {firstPart} <br />
                {secondPart && (
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 text-glow">
                    {secondPart}
                  </span>
                )}
              </h1>

              <p className="text-[10px] sm:text-xs text-slate-300 leading-relaxed max-w-md font-medium">
                {heroTypography.subtitle || "Customize this sub-headline text in the form settings on the left."}
              </p>

              <div className="flex items-center gap-2 pt-1">
                <div className="px-3.5 py-2 rounded-lg bg-linear-to-r from-blue-500 to-cyan-400 text-slate-950 font-extrabold text-[9px] uppercase tracking-wider shadow-md">
                  View Packages
                </div>
                <div className="px-3.5 py-2 rounded-lg border border-slate-700 bg-slate-950/60 text-white font-semibold text-[9px] uppercase tracking-wider backdrop-blur-xs">
                  Check Coverage
                </div>
              </div>

              {/* Trust Stats Metrics Preview */}
              <div className="grid grid-cols-4 gap-2 pt-3.5 border-t border-slate-800/80 w-full">
                {heroMetrics.map((stat, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/80 text-center backdrop-blur-xs flex flex-col justify-center min-h-[58px]">
                    <div className="text-[11px] font-black text-cyan-400 text-glow leading-none">{stat.value}</div>
                    <div className="text-[7.5px] font-bold text-white leading-tight mt-1">{stat.titleEn || defaultHeroMetrics[idx].titleEn}</div>
                    <div className="text-[6.5px] text-slate-400 leading-tight mt-0.5">{stat.descEn || defaultHeroMetrics[idx].descEn}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            {heroTypography.slides && heroTypography.slides.length > 0 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                {heroTypography.slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePreviewSlide(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === activePreviewSlide ? "bg-cyan-400 w-3.5" : "bg-slate-650 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

