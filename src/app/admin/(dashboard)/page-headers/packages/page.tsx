"use client";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import { CheckCircle2, Save, FileText } from "lucide-react";
import { toast } from "sonner";

export default function PackagesHeaderPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [saved, setSaved] = useState(false);

  const [titleEn, setTitleEn] = useState("");
  const [highlightEn, setHighlightEn] = useState("");
  const [subtitleEn, setSubtitleEn] = useState("");

  const [secTitleEn, setSecTitleEn] = useState("Choose the Perfect Plan for You");
  const [secSubtitleEn, setSecSubtitleEn] = useState("High-speed fiber optic internet packages designed for seamless streaming, buffer-free gaming, and high-performance corporate networks.");

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    getSetting("page_headers").then((s) => {
      const data = s as Record<string, string> | null;
      if (data) {
        setTitleEn(data.packages_title_en || "");
        setHighlightEn(data.packages_title_highlight_en || "");
        setSubtitleEn(data.packages_subtitle_en || "");
      }
    });

    getSetting("packages_content").then((s) => {
      if (s) {
        const item = Array.isArray(s) ? s[0] : s;
        if (item && typeof item === "object") {
          const data = item as Record<string, string>;
          if (data.titleEn) setSecTitleEn(data.titleEn);
          if (data.subtitleEn) setSecSubtitleEn(data.subtitleEn);
        }
      }
    });
  }, [router]);

  const save = async () => {
    const s = await getSetting("page_headers") || {};
    const updated = {
      ...s,
      packages_title_en: titleEn,
      packages_title_bn: titleEn,
      packages_title_highlight_en: highlightEn,
      packages_title_highlight_bn: highlightEn,
      packages_subtitle_en: subtitleEn,
      packages_subtitle_bn: subtitleEn,
    };
    await setSetting("page_headers", updated);
    await setSetting("packages_content", {
      titleEn: secTitleEn,
      subtitleEn: secSubtitleEn,
    });
    setSaved(true);
    toast.success("Packages Page & Section Headers updated successfully!");
    setTimeout(() => setSaved(false), 3000);
  };

  if (!auth) return null;



  return (
    <div className="space-y-6 animate-fade-in">

      <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <FileText className="w-5 h-5 text-orange-500" />
          <h2 className="text-base font-bold text-slate-800">Packages Page Header config</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                Subtitle (English)
              </label>
              <textarea
                rows={3}
                value={subtitleEn}
                onChange={(e) => setSubtitleEn(e.target.value)}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-855 focus:bg-white focus:border-orange-500 outline-none resize-none font-sans transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                Normal Title (EN)
              </label>
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-855 focus:bg-white focus:border-orange-500 outline-none transition-all font-medium"
              />
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                Highlighted Title (EN)
              </label>
              <input
                type="text"
                value={highlightEn}
                onChange={(e) => setHighlightEn(e.target.value)}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-855 focus:bg-white focus:border-orange-500 outline-none transition-all font-medium"
              />
            </div>

          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 space-y-4">
          <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">
            Homepage Packages Section Heading
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                Homepage Section Title
              </label>
              <input
                type="text"
                value={secTitleEn}
                onChange={(e) => setSecTitleEn(e.target.value)}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-orange-500 outline-none transition-all font-medium"
                placeholder="Choose the Perfect Plan for You"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                Homepage Section Subtitle / Description
              </label>
              <textarea
                rows={2}
                value={secSubtitleEn}
                onChange={(e) => setSecSubtitleEn(e.target.value)}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-orange-500 outline-none resize-none font-sans transition-all font-medium"
                placeholder="Enter section description..."
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
            <Save className="w-4 h-4" /> Save Header
          </button>
          {saved && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-lg animate-pulse">
              <CheckCircle2 className="w-3.5 h-3.5" /> Saved!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
