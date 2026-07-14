"use client";
import React, { useState, useEffect } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import { CheckCircle2, Save, Image as ImageIcon, Video, FileText, Upload } from "lucide-react";
import { toast } from "sonner";

export default function CoverageHeaderPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [bg, setBg] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleBn, setTitleBn] = useState("");
  const [highlightEn, setHighlightEn] = useState("");
  const [highlightBn, setHighlightBn] = useState("");
  const [subtitleEn, setSubtitleEn] = useState("");
  const [subtitleBn, setSubtitleBn] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    getSetting("page_headers").then((s: any) => {
      if (s) {
        setBg(s.coverage_bg || "");
        setTitleEn(s.coverage_title_en || "");
        setTitleBn(s.coverage_title_bn || "");
        setHighlightEn(s.coverage_title_highlight_en || "");
        setHighlightBn(s.coverage_title_highlight_bn || "");
        setSubtitleEn(s.coverage_subtitle_en || "");
        setSubtitleBn(s.coverage_subtitle_bn || "");
      }
    });
  }, [router]);

  const handleAssetUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      toast.error("File is too large. Max allowed size is 20MB.");
      return;
    }

    setIsUploading(true);
    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/upload-header-asset", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setBg(data.url);
        toast.success("Background file uploaded successfully!");
      } else {
        toast.error(data.error || "File upload failed.");
      }
    } catch {
      toast.error("File upload connection error.");
    } finally {
      setIsUploading(false);
    }
  };

  const save = async () => {
    const s = await getSetting("page_headers") || {};
    const updated = {
      ...s,
      coverage_bg: bg,
      coverage_title_en: titleEn,
      coverage_title_bn: titleBn,
      coverage_title_highlight_en: highlightEn,
      coverage_title_highlight_bn: highlightBn,
      coverage_subtitle_en: subtitleEn,
      coverage_subtitle_bn: subtitleBn,
    };
    await setSetting("page_headers", updated);
    setSaved(true);
    toast.success("Coverage Page Header updated successfully!");
    setTimeout(() => setSaved(false), 3000);
  };

  if (!auth) return null;

  const isVideo = bg.endsWith(".mp4");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between bg-white border border-slate-200 shadow-sm rounded-xl p-5">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Coverage Header settings</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Modify the background image/video and title/subtitle for the public active coverage areas map page.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5" /> Saved!
            </span>
          )}
          <button
            onClick={save}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-655 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-md active:scale-[0.98]"
          >
            <Save className="w-4 h-4" /> Save Header
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <FileText className="w-5 h-5 text-orange-500" />
          <h2 className="text-base font-bold text-slate-800">Coverage Page Header config</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                Background URL (Image or .mp4 Video)
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={bg}
                    onChange={(e) => setBg(e.target.value)}
                    placeholder="e.g. /coverage.jpg"
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-855 focus:bg-white focus:border-orange-500 outline-none transition-all font-medium"
                  />
                  <div className="absolute right-3 top-3 text-slate-400">
                    {isVideo ? <Video className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                  </div>
                </div>
                <label className="flex items-center justify-center gap-1.5 px-4 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-655 cursor-pointer transition-all active:scale-95 shadow-sm">
                  {isUploading ? (
                    <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  <span>{isUploading ? "Uploading..." : "Upload"}</span>
                  <input
                    type="file"
                    accept="image/*,video/mp4"
                    className="hidden"
                    onChange={handleAssetUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>

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

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                Subtitle (Bangla)
              </label>
              <textarea
                rows={3}
                value={subtitleBn}
                onChange={(e) => setSubtitleBn(e.target.value)}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-855 focus:bg-white focus:border-orange-500 outline-none resize-none font-sans transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                  Normal Title (BN)
                </label>
                <input
                  type="text"
                  value={titleBn}
                  onChange={(e) => setTitleBn(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-855 focus:bg-white focus:border-orange-500 outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                  Highlighted Title (BN)
                </label>
                <input
                  type="text"
                  value={highlightBn}
                  onChange={(e) => setHighlightBn(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-855 focus:bg-white focus:border-orange-500 outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-center h-[90px] relative overflow-hidden">
              <span className="text-[9px] font-bold text-slate-500 uppercase absolute top-2 left-3">
                Title Style Preview
              </span>
              <h3 className="text-sm font-extrabold text-white tracking-tight mt-1">
                {titleEn}{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 text-glow">
                  {highlightEn}
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
