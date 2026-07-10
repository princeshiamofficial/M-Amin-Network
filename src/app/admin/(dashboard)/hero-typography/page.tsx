"use client";
import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2 } from "lucide-react";

interface HeroTypography {
  mainTitle: string;
  subtitle: string;
  slides: string[];
}

interface HeroMetric {
  value: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
}

const defaultHeroTypography: HeroTypography = {
  mainTitle: "Blazing Fast Fiber | Internet in Keraniganj",
  subtitle: "M Amin Network (AS150164) is South Keraniganj's leading ISP, offering high-speed, SLA-backed stable internet with dedicated routing.",
  slides: [
    "/28ca5e1d52c944ebfc4dd9f2b300980d.jpg",
    "/6c55d74de82b7eee7127c3e2d4939b1f.jpg",
    "/933503ea823535235e8159f65709292f.jpg",
    "/ea82d2834f062ee8d73d8b99aebe0d31.jpg",
  ]
};

const defaultHeroMetrics: HeroMetric[] = [
  { value: "99.9%", titleEn: "Guaranteed Uptime", titleBn: "গ্যারান্টিড আপটাইম", descEn: "Redundant upstream connections", descBn: "অতিরিক্ত আপস্ট্রিম সংযোগ" },
  { value: "2,000+", titleEn: "Active Clients", titleBn: "সক্রিয় গ্রাহক", descEn: "Trusted by homes & businesses", descBn: "বাসা ও ব্যবসার বিশ্বস্ত অংশীদার" },
  { value: "10+", titleEn: "Cities Served", titleBn: "পরিষেবা এলাকা", descEn: "Across South Keraniganj", descBn: "দক্ষিণ কেরানীগঞ্জ জুড়ে" },
  { value: "24/7", titleEn: "Support Response", titleBn: "সহায়তা প্রতিক্রিয়া", descEn: "Expert technical field support", descBn: "দক্ষ টেকনিক্যাল ফিল্ড সাপোর্ট" },
];

export default function HeroTypographyPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [heroTypography, setHeroTypography] = useState<HeroTypography>(defaultHeroTypography);
  const [heroMetrics, setHeroMetrics] = useState<HeroMetric[]>(defaultHeroMetrics);
  const [newSlideUrl, setNewSlideUrl] = useState("");
  
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
        const parsed = saved as any;
        setHeroTypography({
          mainTitle: parsed.mainTitle || defaultHeroTypography.mainTitle,
          subtitle: parsed.subtitle || defaultHeroTypography.subtitle,
          slides: parsed.slides && parsed.slides.length > 0 ? parsed.slides : defaultHeroTypography.slides
        });
      } else {
        setSetting("hero_typography", defaultHeroTypography as any);
        setHeroTypography(defaultHeroTypography);
      }
    });

    // Load hero metrics
    getSetting("hero_metrics").then(saved => {
      if (saved) {
        setHeroMetrics(saved as any);
      } else {
        setSetting("hero_metrics", defaultHeroMetrics as any);
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
    setSetting("hero_typography", heroTypography as any);
    setSetting("hero_metrics", heroMetrics as any);
    toast("Hero configurations and stats metrics saved successfully!");
  };

  const addSlide = () => {
    if (!newSlideUrl.trim()) return;
    const updatedSlides = [...(heroTypography.slides || []), newSlideUrl.trim()];
    const updated = { ...heroTypography, slides: updatedSlides };
    setHeroTypography(updated);
    setSetting("hero_typography", updated as any);
    setNewSlideUrl("");
  };

  const removeSlide = (index: number) => {
    const updatedSlides = (heroTypography.slides || []).filter((_, i) => i !== index);
    const updated = { ...heroTypography, slides: updatedSlides };
    setHeroTypography(updated);
    setSetting("hero_typography", updated as any);
    // Reset active preview index if out of bounds
    if (activePreviewSlide >= updatedSlides.length) {
      setActivePreviewSlide(0);
    }
  };

  const handleMetricChange = (index: number, field: keyof HeroMetric, value: string) => {
    const updated = [...heroMetrics];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setHeroMetrics(updated);
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
            <label className="text-xs font-bold text-slate-700 block">Main Advertising Title</label>
            <p className="text-[10px] text-slate-400 mb-1">Use the pipe symbol <code className="bg-slate-100 px-1 py-0.5 rounded font-bold text-slate-700">|</code> to separate the regular white text from the glowing cyan/blue text (e.g. <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-700">Blazing Fast Fiber | Internet in Keraniganj</code>).</p>
            <textarea
              rows={2}
              value={heroTypography.mainTitle}
              onChange={(e) => setHeroTypography({ ...heroTypography, mainTitle: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue font-semibold resize-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">Sub-Headline Text</label>
            <textarea
              rows={3}
              value={heroTypography.subtitle}
              onChange={(e) => setHeroTypography({ ...heroTypography, subtitle: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue resize-none"
            />
          </div>
          
          <div className="space-y-3 pt-4 border-t border-slate-150">
            <label className="text-xs font-bold text-slate-700 block">Hero Slide Images</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. /my-hero-slide.jpg or absolute URL"
                value={newSlideUrl}
                onChange={(e) => setNewSlideUrl(e.target.value)}
                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
              />
              <button
                type="button"
                onClick={addSlide}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer transition-colors"
              >
                Add Slide
              </button>
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
                    className="absolute top-2 right-2 bg-red-600/90 text-white rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-700 shadow-md"
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
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 block uppercase">Card Value / Stat</label>
                      <input
                        type="text"
                        value={metric.value}
                        onChange={(e) => handleMetricChange(idx, "value", e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                        placeholder="e.g. 99.9% or 2,000+"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 block uppercase">Title (English)</label>
                        <input
                          type="text"
                          value={metric.titleEn}
                          onChange={(e) => handleMetricChange(idx, "titleEn", e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                          placeholder="e.g. Guaranteed Uptime"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 block uppercase">Title (Bangla)</label>
                        <input
                          type="text"
                          value={metric.titleBn}
                          onChange={(e) => handleMetricChange(idx, "titleBn", e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                          placeholder="e.g. গ্যারান্টিড আপটাইম"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 block uppercase">Description (English)</label>
                        <input
                          type="text"
                          value={metric.descEn}
                          onChange={(e) => handleMetricChange(idx, "descEn", e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                          placeholder="e.g. Redundant connections"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 block uppercase">Description (Bangla)</label>
                        <input
                          type="text"
                          value={metric.descBn}
                          onChange={(e) => handleMetricChange(idx, "descBn", e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-brand-blue"
                          placeholder="e.g. অতিরিক্ত আপস্ট্রিম সংযোগ"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-3 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md transition-all active:scale-[0.98]"
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
                BTRC Licensed Broadband Provider
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
                    <div className="text-[7.5px] font-bold text-white leading-tight mt-1">{stat.titleEn}</div>
                    <div className="text-[6.5px] text-slate-400 leading-tight mt-0.5">{stat.descEn}</div>
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

