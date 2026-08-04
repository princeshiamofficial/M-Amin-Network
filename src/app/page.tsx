"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MorphCarousel } from "@/components/lightswind-pro/morph-carousel";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import LogoCloud from "@/components/ui/logo-cloud";
import { useTranslation } from "@/hooks/useTranslation";
import { getSetting, submitPackageRequestAction } from "@/actions/content";
import { ChevronDown, ChevronUp, Zap, Wifi, Gamepad2, LifeBuoy, Cloud, Building2, Server, Shield, Globe, Headphones, Monitor, Router, Network, Signal, Activity, Lock, Cpu, Database, Mail, Phone, MessageSquare, Users, Clock, CheckCircle, AlertCircle, Info, HelpCircle, Star, Heart, ThumbsUp, Award, TrendingUp, BarChart3 } from "lucide-react";
import Image from "next/image";

interface Plan {
  speed: string | number;
  price: number;
  name: string;
  category?: "home" | "gaming" | "corporate";
  tagline?: string;
  features: string[];
  popular?: boolean;
}

interface Testimonial {
  name: string;
  role: string;
  comment: string;
  rating: number;
  isPublished: boolean;
  src?: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  isPublished: boolean;
}

interface NetworkFeature {
  id: string;
  titleEn: string;
  titleBn?: string;
  descEn: string;
  descBn?: string;
  iconName: string;
  _sort_order: number;
}

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

const DEFAULT_HERO_SLIDES = [
  "/28ca5e1d52c944ebfc4dd9f2b300980d.jpg",
  "/6c55d74de82b7eee7127c3e2d4939b1f.jpg",
  "/933503ea823535235e8159f65709292f.jpg",
  "/ea82d2834f062ee8d73d8b99aebe0d31.jpg",
];

const DEFAULT_HERO_TYPOGRAPHY: HeroTypography = {
  badgeText: "BTRC Licensed Broadband Provider",
  mainTitle: "Blazing Fast Fiber | Internet in Keraniganj",
  subtitle: "M Amin Network (AS150164) is South Keraniganj's leading ISP, offering high-speed, SLA-backed stable internet with dedicated routing.",
  slides: DEFAULT_HERO_SLIDES,
};

const DEFAULT_HERO_METRICS: HeroMetric[] = [
  { value: "99.9%", titleEn: "Guaranteed Uptime", titleBn: "Guaranteed Uptime", descEn: "Redundant upstream connections", descBn: "Redundant upstream connections" },
  { value: "2,000+", titleEn: "Active Clients", titleBn: "Active Clients", descEn: "Trusted by homes & businesses", descBn: "Trusted by homes & businesses" },
  { value: "10+", titleEn: "Cities Served", titleBn: "Cities Served", descEn: "Across South Keraniganj", descBn: "Across South Keraniganj" },
  { value: "24/7", titleEn: "Support Response", titleBn: "Support Response", descEn: "Expert technical field support", descBn: "Expert technical field support" },
];

function normalizePopupEnabled(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") return !["false", "0", "off", "no"].includes(value.toLowerCase());
  return true;
}

function getPopupSessionKey(image: string): string {
  return `hasSeenOfferPopup:${image}`;
}

function parseHeroMetricValue(value: string): { end: number; decimals: number; suffix: string; prefix: string } {
  const cleanValue = value.trim();
  const match = cleanValue.match(/^([^0-9.-]*)([0-9,]+(?:\.[0-9]+)?)(.*)$/);

  if (!match) {
    return { end: 0, decimals: 0, suffix: cleanValue, prefix: "" };
  }

  const numericPart = match[2].replace(/,/g, "");
  const end = Number(numericPart);
  const decimals = numericPart.includes(".") ? numericPart.split(".")[1].length : 0;

  return {
    end: Number.isFinite(end) ? end : 0,
    decimals,
    prefix: match[1] || "",
    suffix: match[3] || "",
  };
}

function normalizeHeroMetrics(saved: unknown): HeroMetric[] {
  const savedItems = Array.isArray(saved) ? saved : [];

  return DEFAULT_HERO_METRICS.map((fallback, index) => {
    const item = savedItems[index];
    if (!item || typeof item !== "object") return fallback;

    const metric = item as Record<string, unknown>;
    return {
      value: String(metric.value || fallback.value),
      titleEn: String(metric.titleEn || fallback.titleEn),
      titleBn: String((metric.titleBn ?? "") || (fallback.titleBn ?? "")),
      descEn: String(metric.descEn || fallback.descEn),
      descBn: String((metric.descBn ?? "") || (fallback.descBn ?? "")),
    };
  });
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap, Wifi, Gamepad2, LifeBuoy, Cloud, Building2,
  Server, Shield, Globe, Headphones, Monitor, Router,
  Network, Signal, Activity, Lock, Cpu, Database,
  Mail, Phone, MessageSquare, Users, Clock, CheckCircle,
  AlertCircle, Info, HelpCircle, Star, Heart, ThumbsUp,
  Award, TrendingUp, BarChart3
};

function getIconComponent(iconName: string): React.ComponentType<{ className?: string }> {
  return ICON_MAP[iconName] || Zap;
}

interface CountUpProps {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

function CountUp({ end, duration = 2000, decimals = 0, suffix = "", prefix = "" }: CountUpProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(progress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {suffix}
    </span>
  );
}

export default function Home() {
  const lang = useTranslation();
  const t = (en: string, bn: string) => (lang === "BN" ? bn : en);

  const [speedSlider, setSpeedSlider] = useState(2); // index of default package (30 Mbps)
  const [coverageSearch, setCoverageSearch] = useState("");
  const [coverageResult, setCoverageResult] = useState<string | null>(null);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupConfig, setPopupConfig] = useState({
    enabled: true,
    image: "/popup.webp"
  });
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [heroTypography, setHeroTypography] = useState<HeroTypography | null>(null);
  const [heroMetrics, setHeroMetrics] = useState<HeroMetric[] | null>(null);
  const [heroLoading, setHeroLoading] = useState(true);
  const [networkFeatures, setNetworkFeatures] = useState<NetworkFeature[]>([]);
  const [featuresLoading, setFeaturesLoading] = useState(true);
  const [whyChooseContent, setWhyChooseContent] = useState<{
    headingEn: string;
    headingBn: string;
    subtitleEn: string;
    subtitleBn: string;
  } | null>(null);
  const [testimonialsContent, setTestimonialsContent] = useState<{
    headingEn: string;
  } | null>(null);
  const [packagesContent, setPackagesContent] = useState<{
    titleEn: string;
    subtitleEn: string;
  } | null>(null);

  useEffect(() => {
    Promise.all([
      getSetting("network_features"),
      getSetting("why_choose_content"),
      getSetting("testimonials_content"),
      getSetting("packages_content"),
    ]).then(([feats, wcc, tc, pc]) => {
      if (Array.isArray(feats)) {
        setNetworkFeatures(feats as NetworkFeature[]);
      }
      if (wcc && typeof wcc === "object") {
        const s = wcc as Record<string, string>;
        setWhyChooseContent({
          headingEn: s.headingEn || "Why Choose M Amin Network?",
          headingBn: s.headingBn || "",
          subtitleEn: s.subtitleEn || "We operate our own BGP autonomous system routing (AS150164) directly peering with all major exchanges to guarantee absolute lowest latency for gaming, VoIP, and video calling.",
          subtitleBn: s.subtitleBn || "আমরা আমাদের নিজস্ব বিজিপি স্বায়ত্তশাসিত রাউটিং (AS150164) পরিচালনা করি এবং গেমিং, ভিওআইপি ও ভিডিও কলের জন্য সর্বনিম্ন লেটেন্সি নিশ্চিত করতে সরাসরি সমস্ত বড় এক্সচেঞ্জের সাথে যুক্ত হয়েছি।",
        });
      } else {
        setWhyChooseContent({
          headingEn: "Why Choose M Amin Network?",
          headingBn: "",
          subtitleEn: "We operate our own BGP autonomous system routing (AS150164) directly peering with all major exchanges to guarantee absolute lowest latency for gaming, VoIP, and video calling.",
          subtitleBn: "আমরা আমাদের নিজস্ব বিজিপি স্বায়ত্তশাসিত রাউটিং (AS150164) পরিচালনা করি এবং গেমিং, ভিওআইপি ও ভিডিও কলের জন্য সর্বনিম্ন লেটেন্সি নিশ্চিত করতে সরাসরি সমস্ত বড় এক্সচেঞ্জের সাথে যুক্ত হয়েছি।",
        });
      }

      if (tc) {
        const item = Array.isArray(tc) ? tc[0] : tc;
        if (item && typeof item === "object") {
          const s = item as Record<string, string>;
          setTestimonialsContent({ headingEn: s.headingEn || "What Our Customers Say" });
        } else {
          setTestimonialsContent({ headingEn: "What Our Customers Say" });
        }
      } else {
        setTestimonialsContent({ headingEn: "What Our Customers Say" });
      }

      if (pc) {
        const item = Array.isArray(pc) ? pc[0] : pc;
        if (item && typeof item === "object") {
          const s = item as Record<string, string>;
          setPackagesContent({
            titleEn: s.titleEn || "Choose the Perfect Plan for You",
            subtitleEn: s.subtitleEn || "High-speed fiber optic internet packages designed for seamless streaming, buffer-free gaming, and high-performance corporate networks.",
          });
        } else {
          setPackagesContent({
            titleEn: "Choose the Perfect Plan for You",
            subtitleEn: "High-speed fiber optic internet packages designed for seamless streaming, buffer-free gaming, and high-performance corporate networks.",
          });
        }
      } else {
        setPackagesContent({
          titleEn: "Choose the Perfect Plan for You",
          subtitleEn: "High-speed fiber optic internet packages designed for seamless streaming, buffer-free gaming, and high-performance corporate networks.",
        });
      }
      setFeaturesLoading(false);
    }).catch(() => {
      setWhyChooseContent({
        headingEn: "Why Choose M Amin Network?",
        headingBn: "",
        subtitleEn: "We operate our own BGP autonomous system routing (AS150164) directly peering with all major exchanges to guarantee absolute lowest latency for gaming, VoIP, and video calling.",
        subtitleBn: "আমরা আমাদের নিজস্ব বিজিপি স্বায়ত্তশাসিত রাউটিং (AS150164) পরিচালনা করি এবং গেমিং, ভিওআইপি ও ভিডিও কলের জন্য সর্বনিম্ন লেটেন্সি নিশ্চিত করতে সরাসরি সমস্ত বড় এক্সচেঞ্জের সাথে যুক্ত হয়েছি।",
      });
      setTestimonialsContent({ headingEn: "What Our Customers Say" });
      setPackagesContent({
        titleEn: "Choose the Perfect Plan for You",
        subtitleEn: "High-speed fiber optic internet packages designed for seamless streaming, buffer-free gaming, and high-performance corporate networks.",
      });
      setFeaturesLoading(false);
    });
  }, []);
  
  useEffect(() => {
    // 1. Initial fetch
    getSetting("system_config").then((saved) => {
      if (saved) {
        const config = saved as Record<string, unknown>;
        const enabled = normalizePopupEnabled(config.popupEnabled);
        const image = (config.popupImage as string) || "/popup.webp";
        setPopupConfig({ enabled, image });
      }
    });

    // 2. Connect WebSocket for real-time updates
    let socket: WebSocket | null = null;
    let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
    let isDestroyed = false;

    let retryCount = 0;
    const MAX_RETRIES = 3;

    function connectWS() {
      if (isDestroyed || retryCount >= MAX_RETRIES) return;
      try {
        const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
        const wsUrl = `${wsProtocol}//${window.location.hostname}:3015`;
        socket = new WebSocket(wsUrl);

        socket.onopen = () => {
          retryCount = 0;
        };

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data && typeof data === "object" && "popupEnabled" in data) {
              const popupEnabled = normalizePopupEnabled(data.popupEnabled);
              const popupImage = (data.popupImage as string) || "/popup.webp";
              setPopupConfig({
                enabled: popupEnabled,
                image: popupImage
              });
              
              if (!popupEnabled) {
                setShowPopup(false);
              } else {
                const hasSeen = sessionStorage.getItem(getPopupSessionKey(popupImage));
                if (!hasSeen) {
                  setShowPopup(true);
                }
              }
            }
          } catch {
            // Ignore error
          }
        };

        socket.onerror = () => {
          try { socket?.close(); } catch { /* ignore */ }
        };

        socket.onclose = () => {
          if (!isDestroyed && retryCount < MAX_RETRIES) {
            retryCount++;
            reconnectTimeout = setTimeout(connectWS, Math.min(5000 * Math.pow(2, retryCount - 1), 30000));
          }
        };
      } catch {
        if (!isDestroyed && retryCount < MAX_RETRIES) {
          retryCount++;
          reconnectTimeout = setTimeout(connectWS, Math.min(5000 * Math.pow(2, retryCount - 1), 30000));
        }
      }
    }

    connectWS();

    return () => {
      isDestroyed = true;
      if (socket) {
        try { socket.close(); } catch { /* ignore */ }
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, []);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem(getPopupSessionKey(popupConfig.image));
    if (!hasSeen && popupConfig.enabled) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [popupConfig.enabled, popupConfig.image]);

  useEffect(() => {
    getSetting("testimonials").then((saved) => {
      if (Array.isArray(saved)) {
        const list = saved as Record<string, unknown>[];
        setTestimonials(list.map((testimonial) => {
          const image = testimonial.image || testimonial.avatar || testimonial.src;

          return {
            name: String(testimonial.author || testimonial.name || ""),
            role: String(testimonial.role || testimonial.designation || ""),
            comment: String(testimonial.text || testimonial.comment || ""),
            rating: Number(testimonial.rating || 0),
            isPublished: testimonial.isPublished !== false,
            src: typeof image === "string" ? image : undefined
          };
        }));
      } else {
        setTestimonials([]);
      }
    });
  }, []);

  useEffect(() => {
    getSetting("faqs").then((saved) => {
      if (saved) {
        const list = saved as Record<string, unknown>[];
        setFaqs(list.map((f) => ({
          id: (f.id as string) || String(Math.random()),
          question: (f.question as string) || "",
          answer: (f.answer as string) || "",
          isPublished: f.isPublished !== false
        })));
      }
    });
  }, []);

  useEffect(() => {
    Promise.all([
      getSetting("hero_typography"),
      getSetting("hero_metrics"),
    ]).then(([savedTypo, savedMetrics]) => {
      if (savedTypo && typeof savedTypo === "object") {
        const parsed = savedTypo as Record<string, unknown>;
        const slides = Array.isArray(parsed.slides)
          ? parsed.slides.filter((slide): slide is string => typeof slide === "string" && slide.trim() !== "").slice(0, 6)
          : DEFAULT_HERO_SLIDES;

        setHeroTypography({
          badgeText: typeof parsed.badgeText === "string" && parsed.badgeText.trim() ? parsed.badgeText : DEFAULT_HERO_TYPOGRAPHY.badgeText,
          mainTitle: typeof parsed.mainTitle === "string" && parsed.mainTitle.trim() ? parsed.mainTitle : DEFAULT_HERO_TYPOGRAPHY.mainTitle,
          subtitle: typeof parsed.subtitle === "string" && parsed.subtitle.trim() ? parsed.subtitle : DEFAULT_HERO_TYPOGRAPHY.subtitle,
          slides: slides.length > 0 ? slides : DEFAULT_HERO_SLIDES,
        });
      } else {
        setHeroTypography(DEFAULT_HERO_TYPOGRAPHY);
      }

      if (savedMetrics) {
        setHeroMetrics(normalizeHeroMetrics(savedMetrics));
      } else {
        setHeroMetrics(DEFAULT_HERO_METRICS);
      }
      setHeroLoading(false);
    }).catch(() => {
      setHeroTypography(DEFAULT_HERO_TYPOGRAPHY);
      setHeroMetrics(DEFAULT_HERO_METRICS);
      setHeroLoading(false);
    });
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem(getPopupSessionKey(popupConfig.image), "true");
  };

  const coverageAreas = [
    "Kadomtoli",
    "Aganagar",
    "Chunkutia",
    "Zinjira",
    "Kaliganj",
    "Telghat",
    "Kholamura",
    "East Aganagar",
    "Char Kaliganj",
    "Doleshwar",
  ];

interface PackageCategory {
  id: string;
  name: string;
}

const defaultPackageCategories: PackageCategory[] = [
  { id: "home", name: "Home Internet" },
  { id: "gaming", name: "Gamer Packs" },
  { id: "corporate", name: "Corporate Dedicated" },
];

  const [categories, setCategories] = useState<PackageCategory[]>(defaultPackageCategories);
  const [activeTab, setActiveTab] = useState<string>("home");
  const [packagesList, setPackagesList] = useState<Plan[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(true);

  useEffect(() => {
    getSetting("package_categories").then((saved) => {
      if (Array.isArray(saved) && saved.length > 0) {
        const list = saved as PackageCategory[];
        setCategories(list);
        setActiveTab((prev) => (list.some((c) => c.id === prev) ? prev : list[0].id));
      }
    });
    getSetting("packages_list").then((saved) => {
      if (Array.isArray(saved)) {
        setPackagesList(saved as Plan[]);
      } else {
        setPackagesList([]);
      }
      setPackagesLoading(false);
    });
  }, []);

  const [selectedOrderPlan, setSelectedOrderPlan] = useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    area: "Kadomtoli",
    referralCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderPlan) return;

    setIsSubmitting(true);

    const result = await submitPackageRequestAction({
      name: formData.name,
      phone: formData.phone,
      email: formData.email || "N/A",
      zone: formData.area,
      price: selectedOrderPlan.price,
      address: formData.address,
      planName: selectedOrderPlan.name,
      speed: String(selectedOrderPlan.speed),
      referralCode: formData.referralCode.trim() || "N/A",
    });

    if (result.success && result.id) {
      setIsSubmitting(false);
      setOrderSuccess(true);
      setOrderRef(result.id);
      return;
    }

    setIsSubmitting(false);
    alert("Could not submit request. Please try again.");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      area: "Kadomtoli",
      referralCode: "",
    });
    setOrderSuccess(false);
    setIsModalOpen(false);
  };

  const filteredPlans = packagesList.filter(
    (plan) => (plan.category || "home") === activeTab
  );

  const handleCoverageSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverageSearch.trim()) {
      setCoverageResult(null);
      return;
    }
    const matched = coverageAreas.some(
      (area) => area.toLowerCase().includes(coverageSearch.toLowerCase())
    );
    if (matched) {
      setCoverageResult(`Yes! We have high-speed optical fiber coverage in "${coverageSearch}".`);
    } else {
      setCoverageResult(
        `Coverage is currently limited in "${coverageSearch}". Contact us to request feasibility check!`
      );
    }
  };

  const selectedPlan = packagesList[speedSlider] || packagesList[0] || null;
  const selectedSpeedVal = selectedPlan ? (parseInt(String(selectedPlan.speed), 10) || 0) : 0;
  const heroSlides = heroTypography ? heroTypography.slides : [];
  const currentTypography = heroTypography || DEFAULT_HERO_TYPOGRAPHY;
  const heroTitleParts = (currentTypography.mainTitle || DEFAULT_HERO_TYPOGRAPHY.mainTitle).split("|");
  const heroTitleFirst = heroTitleParts[0]?.trim() || DEFAULT_HERO_TYPOGRAPHY.mainTitle;
  const heroTitleSecond = heroTitleParts[1]?.trim() || "";
  const reviewTestimonials = testimonials
    .filter((test) => test.isPublished && test.name.trim() && (test.rating > 0 || (test.comment && test.comment.trim() !== "")))
    .map((test) => ({
      quote: t(test.comment, test.comment),
      name: test.name,
      designation: t(test.role, test.role),
      src: test.src || "",
      rating: test.rating > 0 ? test.rating : undefined,
    }));

  const logoTestimonials = testimonials
    .filter((test) => test.isPublished && test.name.trim() && (!test.rating || test.rating === 0) && (!test.comment || test.comment.trim() === ""))
    .map((test) => ({
      name: test.name,
      role: test.role,
      src: test.src,
    }));

  return (
    <div className="flex flex-col gap-20 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col items-center justify-center pt-16 pb-16 lg:pt-10 lg:pb-16 overflow-hidden">
        {/* Background Decorative Wrappers */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          {/* Morph Carousel Background Animation */}
          <div className="absolute inset-0 w-full h-full opacity-[0.8] transition-opacity duration-300">
            <MorphCarousel
              images={heroSlides}
            />
          </div>
          {/* Theme-aware overlay for text readability contrast */}
          <div className="absolute inset-0 hero-overlay pointer-events-none" />
          {/* Glow Effects */}
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-cyan/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-brand-blue/15 blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col gap-6 animate-fade-in-up">
            {heroLoading || !heroTypography ? (
              <div className="flex flex-col gap-5 py-2 animate-pulse">
                <div className="h-7 w-64 rounded-full bg-slate-800/80 border border-slate-700/50 self-center lg:self-start mb-1" />
                <div className="flex flex-col gap-3">
                  <div className="h-10 sm:h-12 lg:h-14 w-4/5 max-w-xl rounded-2xl bg-slate-800/80 self-center lg:self-start" />
                  <div className="h-10 sm:h-12 lg:h-14 w-3/5 max-w-md rounded-2xl bg-linear-to-r from-slate-800/80 to-slate-700/50 self-center lg:self-start" />
                </div>
                <div className="flex flex-col gap-2 mt-1">
                  <div className="h-4 sm:h-5 w-full max-w-2xl rounded-lg bg-slate-800/70 self-center lg:self-start" />
                  <div className="h-4 sm:h-5 w-3/4 max-w-xl rounded-lg bg-slate-800/50 self-center lg:self-start" />
                </div>
              </div>
            ) : (
              <>
                <div className="inline-flex self-center lg:self-start items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-semibold tracking-wider uppercase mb-2">
                  <span className="w-2 h-2 rounded-full bg-brand-cyan animate-ping" />
                  {t(currentTypography.badgeText, currentTypography.badgeText)}
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                  {t(heroTitleFirst, heroTitleFirst)} <br />
                  {heroTitleSecond && (
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-cyan to-brand-blue text-glow">
                      {t(heroTitleSecond, heroTitleSecond)}
                    </span>
                  )}
                </h1>

                <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  {t(currentTypography.subtitle, currentTypography.subtitle)}
                </p>
              </>
            )}

             <div className="flex flex-row flex-wrap gap-2.5 sm:gap-3 justify-center lg:justify-start mt-4">
              <Link
                href="/packages"
                className="px-3.5 py-2.5 sm:px-5 rounded-xl bg-linear-to-r from-brand-blue to-brand-cyan text-brand-dark text-xs sm:text-sm font-extrabold hover:opacity-90 transition-opacity shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer"
              >
                {"View Packages"}
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/coverage"
                className="px-3.5 py-2.5 sm:px-5 rounded-xl bg-brand-card hover:bg-brand-border/60 border border-brand-border text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer"
              >
                Check Coverage
              </Link>
            </div>

            {/* Quick Coverage Form */}
            <div className="hidden mt-8 p-5 glass-panel rounded-2xl border-brand-border/60 max-w-md mx-auto lg:mx-0 text-left">
              <h4 className="text-sm font-semibold text-white mb-2">Check availability in your area:</h4>
              <form onSubmit={handleCoverageSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Kadomtoli, Aganagar"
                  value={coverageSearch}
                  onChange={(e) => setCoverageSearch(e.target.value)}
                  className="bg-brand-dark border border-brand-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan grow min-w-0"
                />
                <button
                  type="submit"
                  className="bg-brand-blue text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-blue/90 transition-colors"
                >
                  Check
                </button>
              </form>
              {coverageResult && (
                <p
                  className={`text-xs mt-3 font-semibold ${
                    coverageResult.startsWith("Yes") ? "text-emerald-400" : "text-amber-400"
                  }`}
                >
                  {coverageResult}
                </p>
              )}
            </div>
          </div>

          {/* Interactive Hero Visual (hidden visually, but kept in code) */}
          <div className="hidden">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-brand-card/60 border border-brand-border/80 shadow-2xl overflow-hidden glass-panel">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-2xl" />
              
              <div className="flex items-center justify-between border-b border-brand-border pb-6 mb-6">
                <div>
                  <h3 className="text-white font-bold text-lg">Speed Configurator</h3>
                  <p className="text-xs text-slate-400">Drag to change bandwidth requirements</p>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded bg-brand-blue/15 text-brand-cyan font-mono border border-brand-cyan/20">
                  AS150164 BGP
                </span>
              </div>

              {/* Central Speed Ring */}
              <div className="flex flex-col items-center justify-center py-6">
                <div className="relative w-44 h-44 rounded-full border-4 border-dashed border-brand-border flex flex-col items-center justify-center shadow-[0_0_40px_rgba(0,114,255,0.05)]">
                  <div className="absolute inset-2 rounded-full bg-brand-dark flex flex-col items-center justify-center">
                    <span className="text-5xl font-black text-white text-glow-blue leading-none">
                      {selectedSpeedVal}
                    </span>
                    <span className="text-brand-cyan text-xs font-bold tracking-widest mt-1">
                      MBPS
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-brand-cyan/30 animate-pulse-slow" />
                </div>
                <span className="text-brand-cyan text-sm font-semibold mt-4 tracking-wider uppercase">
                  {selectedPlan?.name || "Fiber Internet"}
                </span>
              </div>

              {/* Slider */}
              <div className="mb-6 mt-4">
                <input
                  type="range"
                  min="0"
                  max={Math.max(0, packagesList.length - 1)}
                  value={speedSlider}
                  onChange={(e) => setSpeedSlider(Number(e.target.value))}
                  className="w-full h-2 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-cyan focus:outline-none"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-2">
                  <span>10 Mbps</span>
                  <span>20 Mbps</span>
                  <span>30 Mbps</span>
                  <span>50 Mbps</span>
                  <span>100 Mbps</span>
                </div>
              </div>

              {/* Dynamic Price */}
              <div className="flex items-center justify-between bg-brand-dark/60 border border-brand-border/60 rounded-2xl p-4">
                <div>
                  <span className="text-xs text-slate-400 block">Monthly Price</span>
                  <span className="text-xl font-bold text-white font-mono">৳{selectedPlan?.price || 0} BDT</span>
                </div>
                <button
                  onClick={() => {
                    if (selectedPlan) {
                      setSelectedOrderPlan(selectedPlan);
                      setIsModalOpen(true);
                    }
                  }}
                  className="bg-linear-to-r from-brand-blue to-brand-cyan text-brand-dark text-sm font-extrabold px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Order Plan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Stats Metrics (database-driven from admin hero-typography) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-5xl mx-auto lg:mx-0 animate-fade-in-up">
          {heroLoading || !heroMetrics ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-brand-card/40 border border-brand-border/40 text-center glass-panel animate-pulse flex flex-col items-center justify-center gap-2.5 h-24"
              >
                <div className="h-7 w-20 bg-slate-800/80 rounded-lg" />
                <div className="h-3 w-28 bg-slate-800/70 rounded" />
                <div className="h-2.5 w-32 bg-slate-800/50 rounded" />
              </div>
            ))
          ) : (
            heroMetrics.map((stat, i) => {
              const parsedValue = parseHeroMetricValue(stat.value);

              return (
                <div
                  key={i}
                  className="p-3 sm:p-4 rounded-xl bg-brand-card/40 border border-brand-border/40 text-center glass-panel"
                >
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-cyan mb-1.5 text-glow">
                    <CountUp end={parsedValue.end} decimals={parsedValue.decimals} prefix={parsedValue.prefix} suffix={parsedValue.suffix} />
                  </h3>
                  <h4 className="text-white font-bold text-xs sm:text-sm tracking-wide">{t(stat.titleEn, stat.titleBn || stat.titleEn)}</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-1">{t(stat.descEn, stat.descBn || stat.descEn)}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>

      {/* Packages Section */}
      <section className="w-full bg-white py-16 relative overflow-hidden border-t border-slate-100 shadow-inner text-slate-900 -mt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {packagesLoading || !packagesContent ? (
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="h-10 w-72 mx-auto bg-slate-200 rounded-xl animate-pulse mb-4" />
              <div className="h-4 w-full bg-slate-100 rounded-lg animate-pulse" />
            </div>
          ) : (
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                {t(packagesContent.titleEn, packagesContent.titleEn)}
              </h3>
              <p className="text-slate-650 mt-4 leading-relaxed">
                {t(packagesContent.subtitleEn, packagesContent.subtitleEn)}
              </p>
            </div>
          )}

          {/* Category Tab Selectors */}
          <div className="flex justify-center mb-12 relative z-20 overflow-x-auto max-w-full px-4">
            <div className="inline-flex p-1 rounded-2xl bg-white border border-slate-200/80 shadow-xl flex-wrap justify-center gap-1">
              {categories.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "force-active-tab shadow-md relative z-10"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/50"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch">
            {packagesLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="rounded-2xl bg-slate-100 animate-pulse h-[460px] w-full border border-slate-200" />
              ))
            ) : filteredPlans.length === 0 ? (
              <div className="col-span-full text-center py-12 text-slate-500 text-sm font-medium">
                {t("No packages available in this category.", "এই ক্যাটাগরিতে কোনো প্যাকেজ পাওয়া যায়নি।")}
              </div>
            ) : (
              filteredPlans.map((plan, i) => {
                const speedLabel = String(plan.speed).includes("Mbps") ? plan.speed : `${plan.speed} Mbps`;
                const allFeatures = [
                  t(`Speed: ${speedLabel}`, `গতি: ${speedLabel}`),
                  ...plan.features,
                ];
                return (
                <div
                  key={i}
                  className={`relative w-full transition-all duration-300 hover:scale-[1.02] ${
                    plan.popular ? "lg:scale-105 z-20" : "z-10"
                  }`}
                >
                  {!!plan.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-[#0273b3] to-[#014c77] text-white text-xs font-black tracking-widest px-5 py-2 rounded-full shadow-[0_4px_12px_rgba(2,115,179,0.3)] border border-white/20 z-30">
                      {t("Popular", "জনপ্রিয়")}
                    </span>
                  )}

                  <div className="overflow-hidden rounded-2xl bg-linear-to-b from-[#0273b3] to-[#015c90] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col justify-between w-full text-center relative border border-white/10 min-h-[460px] h-full hover:shadow-[0_15px_35px_rgba(2,115,179,0.25)] transition-shadow duration-300">
                    {/* Top Green Section */}
                    <div
                      className="bg-linear-to-br from-[#10b981] to-[#047857] pt-10 pb-12 px-6 flex flex-col items-center justify-center text-white select-none"
                      style={{ clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 88%)" }}
                    >
                      <h3 className="text-white text-xl font-extrabold uppercase tracking-wider mb-1">
                        {plan.name}
                      </h3>
                      {plan.tagline && (
                        <p className="text-[10px] text-white/80 font-medium tracking-wide mb-2 text-center max-w-[240px] truncate">
                          {plan.tagline}
                        </p>
                      )}
                      <div className="flex items-baseline justify-center text-white">
                        <span className="text-3xl font-bold mr-0.5 opacity-90">৳</span>
                        <span className="text-5xl font-black font-sans tracking-tight leading-none">
                          {plan.price}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest ml-1.5 opacity-80">
                          /{t("Monthly", "মাসিক")}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Blue Section */}
                    <div className="pt-4 pb-8 px-6 sm:px-8 flex flex-col justify-between grow">
                      {/* Features List */}
                      <ul className="flex flex-col gap-3.5 text-left text-white/95 max-w-[280px] mx-auto mb-8 w-full">
                        {allFeatures.map((feat, featIdx) => (
                          <li key={featIdx} className="flex gap-3 items-center">
                            <div className="w-5 h-5 rounded-full border border-emerald-400/30 bg-emerald-500/20 text-[#d1fae5] shrink-0 flex items-center justify-center shadow-sm">
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="3.5"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium tracking-wide leading-tight">
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* BUY NOW Button */}
                      <div className="mt-auto">
                        <button
                          onClick={() => {
                            setSelectedOrderPlan(plan);
                            setIsModalOpen(true);
                          }}
                          className="mx-auto w-full max-w-[180px] py-3 bg-linear-to-r from-[#10b981] to-[#047857] hover:scale-[1.03] active:scale-[0.98] text-white text-xs font-black tracking-widest rounded-full transition-all duration-300 text-center block shadow-md hover:shadow-lg hover:shadow-emerald-500/10 uppercase cursor-pointer"
                        >
                          {t("BUY NOW", "এখনই কিনুন")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }))}
          </div>
        </div>
      </section>

      {/* Network Features Section */}
      <section className="w-full bg-black py-16 relative overflow-hidden border-t border-brand-border/40 text-white -mt-20 -mb-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            {featuresLoading || !whyChooseContent ? (
              <>
                <div className="h-10 w-72 mx-auto bg-white/10 rounded-xl animate-pulse mb-4" />
                <div className="h-4 w-full bg-white/5 rounded-lg animate-pulse mb-2" />
                <div className="h-4 w-4/5 mx-auto bg-white/5 rounded-lg animate-pulse" />
              </>
            ) : (
              <>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                  {t(whyChooseContent.headingEn, whyChooseContent.headingBn || whyChooseContent.headingEn)}
                </h3>
                {(whyChooseContent.subtitleEn || whyChooseContent.subtitleBn) && (
                  <p className="text-slate-400 mt-4 leading-relaxed">
                    {t(whyChooseContent.subtitleEn, whyChooseContent.subtitleBn || whyChooseContent.subtitleEn)}
                  </p>
                )}
              </>
            )}
          </div>

          {featuresLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-4 animate-pulse">
                  <div className="w-12 h-12 rounded-xl bg-white/10" />
                  <div className="h-5 w-3/4 bg-white/10 rounded-lg" />
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-white/5 rounded" />
                    <div className="h-3 w-5/6 bg-white/5 rounded" />
                    <div className="h-3 w-2/3 bg-white/5 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : networkFeatures.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No features configured yet. Admins can add them from the panel.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {networkFeatures.map((feat, i) => {
                const IconComponent = getIconComponent(feat.iconName);
                return (
                  <div
                    key={feat.id || i}
                    className="p-8 rounded-3xl bg-brand-card/40 border border-brand-border/40 hover:border-brand-cyan/30 hover:scale-[1.01] transition-all flex flex-col gap-4 text-left glass-panel"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center border border-brand-cyan/15">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white tracking-wide">
                      {t(feat.titleEn, feat.titleBn ?? "")}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {t(feat.descEn, feat.descBn ?? "")}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>



      {/* Customer Review & Partner Network Section */}
      {(reviewTestimonials.length > 0 || logoTestimonials.length > 0) && (
        <section className="w-full bg-white pt-16 pb-8 relative overflow-hidden border-y border-slate-100 shadow-inner text-slate-900 -mt-10 -mb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col gap-4">
            <h3 className="text-3xl font-extrabold text-slate-900 mb-2">
              {testimonialsContent?.headingEn || ""}
            </h3>

            {reviewTestimonials.length > 0 && (
              <AnimatedTestimonials
                testimonials={reviewTestimonials}
                autoplay={true}
              />
            )}

            <div className="pt-2">
              <LogoCloud items={logoTestimonials.length > 0 ? logoTestimonials : undefined} />
            </div>
          </div>
        </section>
      )}



      {/* FAQ Section */}
      {faqs.filter(f => f.isPublished).length > 0 && (
        <section className="w-full bg-white pb-16 pt-4 border-b border-slate-100 shadow-inner text-slate-900 -mb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-extrabold text-slate-900">
                {"Frequently Asked Questions"}
              </h3>
              <p className="text-slate-500 mt-2 text-sm">
                {"Find quick answers to common questions about our services"}
              </p>
            </div>

            <div className="space-y-4">
              {faqs.filter(f => f.isPublished).map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div 
                    key={faq.id} 
                    className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden transition-all duration-300 shadow-xs hover:shadow-md"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 focus:outline-none cursor-pointer"
                    >
                      <span className="font-bold text-slate-800 text-sm md:text-base leading-snug">
                        {faq.question}
                      </span>
                      <span className="text-brand-blue flex-shrink-0 transition-transform duration-200">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </span>
                    </button>
                    
                    {/* Animated accordion panel */}
                    <div 
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-[500px] border-t border-slate-100/50" : "max-h-0"
                      }`}
                    >
                      <div className="px-6 py-5 text-slate-600 text-xs md:text-sm leading-relaxed whitespace-pre-line bg-slate-50/40">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}


      {/* Home Page Pop-up Offer Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all duration-300">
          {/* Backdrop Click Dismiss */}
          <div className="absolute inset-0" onClick={handleClosePopup} />
          
          <div className="relative max-w-[550px] w-full bg-transparent overflow-visible rounded-2xl shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={handleClosePopup}
              className="absolute top-0 right-0 w-9 h-9 bg-white hover:bg-slate-100 text-slate-900 rounded-bl-2xl rounded-tr-2xl flex items-center justify-center shadow-lg transition-all z-20 cursor-pointer"
              aria-label="Close offer"
            >
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Offer Banner Image */}
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl w-full">
              <Image
                src={popupConfig.image}
                alt="Special Internet Offer"
                width={550}
                height={550}
                className="w-full h-auto object-contain rounded-2xl block select-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Order connection Modal */}
      {isModalOpen && selectedOrderPlan && (
        <div className="fixed inset-0 z-100 overflow-y-auto bg-slate-900/60 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="bg-white border border-slate-100 shadow-2xl rounded-3xl p-6 sm:p-8 max-w-lg w-full relative text-left">
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!orderSuccess ? (
              <form onSubmit={handleOrderSubmit} className="space-y-5 text-left">
                <div>
                  <h3 className="text-slate-900 font-bold text-xl">{t("New Internet Connection", "নতুন ইন্টারনেট সংযোগ")}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {t("Complete this form to request optical fiber setup for", "অপটিক্যাল ফাইবার সংযোগের জন্য এই ফর্মটি পূরণ করুন")}{" "}
                    <span className="text-[#0072ff] font-bold">{selectedOrderPlan.name} ({selectedOrderPlan.speed})</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 text-left">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Full Name", "আপনার নাম")}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Mehan Ahmed"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0072ff] focus:ring-1 focus:ring-[#0072ff]/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Phone Number", "মোবাইল নম্বর")}</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. 01707009267"
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0072ff] focus:ring-1 focus:ring-[#0072ff]/20"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Email Address", "ইমেইল অ্যাড্রেস")}</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t("optional", "ঐচ্ছিক")}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0072ff] focus:ring-1 focus:ring-[#0072ff]/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Coverage Zone", "কভারেজ এলাকা")}</label>
                      <select
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#0072ff] focus:ring-1 focus:ring-[#0072ff]/20 cursor-pointer"
                      >
                        {coverageAreas.map((area) => (
                          <option key={area} value={area} className="bg-white text-slate-900">
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Monthly Pricing", "মাসিক বিল")}</label>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 font-mono flex items-center justify-between">
                        <span>{t("Rate", "মূল্য")}</span>
                        <span className="font-bold text-slate-900">৳{selectedOrderPlan.price} BDT</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Refer / Promo Code", "রেফারাল / প্রোমো কোড")}</label>
                    <input
                      type="text"
                      name="referralCode"
                      value={formData.referralCode}
                      onChange={handleInputChange}
                      placeholder={t("optional", "ঐচ্ছিক")}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0072ff] focus:ring-1 focus:ring-[#0072ff]/20"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs text-slate-600 font-bold uppercase tracking-wider">{t("Installation Address", "সংযোজের বিস্তারিত ঠিকানা")}</label>
                    <textarea
                      name="address"
                      required
                      rows={3}
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g. House No. 25, Lane 3, Kadomtoli, South Keraniganj"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0072ff] focus:ring-1 focus:ring-[#0072ff]/20 resize-none font-sans"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 text-xs text-blue-700 leading-relaxed flex gap-2 text-left">
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>
                    {t(
                      "Our field representative will contact you within 4 hours to verify feasibility and schedule installation. Connection setups take less than 24 hours.",
                      "আমাদের প্রতিনিধি ৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করে সংযোগের সম্ভাব্যতা যাচাই এবং লাইন ইনস্টলেশন সম্পন্ন করবেন।"
                    )}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-linear-to-r from-brand-blue to-brand-cyan text-brand-dark py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg hover:opacity-95 flex justify-center items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                      {t("Processing Request...", "অনুরোধ প্রসেস হচ্ছে...")}
                    </>
                  ) : (
                    t("Submit Connection Request", "সংযোগের জন্য অনুরোধ পাঠান")
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-pulse">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h3 className="text-slate-900 font-extrabold text-2xl">{t("Request Submitted!", "অনুরোধ জমা হয়েছে!")}</h3>
                  <p className="text-sm text-slate-500">
                    {t("Thank you, ", "ধন্যবাদ, ")} <span className="text-slate-700 font-bold">{formData.name}</span>. {t("Your internet connection ticket has been successfully registered.", "আপনার সংযোগ অনুরোধের টিকেট সফলভাবে রেজিস্টার করা হয়েছে।")}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-sm mx-auto font-mono text-left">
                  <div className="flex justify-between border-b border-slate-200/80 pb-2 mb-2 text-xs text-slate-500">
                    <span>{t("Order Reference", "অর্ডার রেফারেন্স")}</span>
                    <span className="text-[#0072ff] font-bold">{orderRef}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/80 pb-2 mb-2 text-xs text-slate-500">
                    <span>{t("Selected Plan", "নির্বাচিত প্ল্যান")}</span>
                    <span className="text-slate-800 font-bold">{selectedOrderPlan.name} ({selectedOrderPlan.speed})</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{t("Contact Phone", "যোগাযোগের ফোন")}</span>
                    <span className="text-slate-800 font-bold">{formData.phone}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                  {t(
                    "A support representative will call you at your number shortly to coordinate fiber line routing and router installation. Please keep your phone active.",
                    "সংযোগের লাইন এবং রাউটার ইনস্টলেশনের জন্য আমাদের প্রতিনিধি খুব শীঘ্রই আপনার নম্বরে কল করবেন। অনুগ্রহ করে আপনার ফোনটি সচল রাখুন।"
                  )}
                </p>

                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-sm font-bold transition-colors cursor-pointer"
                >
                  {t("Close Window", "উইন্ডো বন্ধ করুন")}
                </button>
              </div>
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

