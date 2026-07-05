"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface HeroTypography {
  mainTitle: string;
  subtitle: string;
}

const defaultHeroTypography: HeroTypography = {
  mainTitle: "Super Fast Broadband Connection in Dhaka",
  subtitle: "High-speed fiber internet solutions tailored for homes and businesses across Southern Keraniganj.",
};

export default function HeroTypographyPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [heroTypography, setHeroTypography] = useState<HeroTypography>(defaultHeroTypography);

  useEffect(() => {
    if (!localStorage.getItem("m_amin_admin_token")) {
      router.replace("/admin");
      return;
    }
    setAuth(true);
    const saved = localStorage.getItem("m_amin_hero_typography");
    if (saved) {
      setHeroTypography(JSON.parse(saved));
    } else {
      localStorage.setItem("m_amin_hero_typography", JSON.stringify(defaultHeroTypography));
      setHeroTypography(defaultHeroTypography);
    }
  }, [router]);

  const saveHeroTypography = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("m_amin_hero_typography", JSON.stringify(heroTypography));
    alert("Hero typography saved successfully!");
  };

  if (!auth) return null;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Hero Screen Headings</h2>
        <p className="text-xs text-slate-500 mt-1">Modify main advertising messages visible to visitors on landing.</p>
      </div>
      <form onSubmit={saveHeroTypography} className="space-y-4 max-w-lg">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Main Advertising Title</label>
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
        <button
          type="submit"
          className="px-5 py-3 bg-brand-blue text-white font-bold rounded-xl text-xs hover:opacity-95 cursor-pointer shadow-md"
        >
          Save Hero Typography
        </button>
      </form>
    </div>
  );
}
