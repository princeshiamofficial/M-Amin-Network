"use client";

import { useState, useEffect } from "react";

export function useTranslation() {
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("app-lang") || "EN";
    }
    return "EN";
  });

  useEffect(() => {
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

