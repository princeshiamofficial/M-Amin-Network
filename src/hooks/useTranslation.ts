"use client";

import { useState, useEffect } from "react";

export function useTranslation() {
  const [lang, setLang] = useState("EN");

  useEffect(() => {
    // Initial load
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("app-lang") || "EN";
      setLang(savedLang);
    }

    const handleLanguageChange = () => {
      const savedLang = localStorage.getItem("app-lang") || "EN";
      setLang(savedLang);
    };

    window.addEventListener("languageChange", handleLanguageChange);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
    };
  }, []);

  return lang;
}
