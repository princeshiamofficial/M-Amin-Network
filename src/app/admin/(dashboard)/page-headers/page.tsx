"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export interface PageHeaderData {
  packages_bg: string;
  packages_title_en: string;
  packages_title_bn: string;
  packages_title_highlight_en: string;
  packages_title_highlight_bn: string;
  packages_subtitle_en: string;
  packages_subtitle_bn: string;

  offers_bg: string;
  offers_title_en: string;
  offers_title_bn: string;
  offers_title_highlight_en: string;
  offers_title_highlight_bn: string;
  offers_subtitle_en: string;
  offers_subtitle_bn: string;

  coverage_bg: string;
  coverage_title_en: string;
  coverage_title_bn: string;
  coverage_title_highlight_en: string;
  coverage_title_highlight_bn: string;
  coverage_subtitle_en: string;
  coverage_subtitle_bn: string;

  multimedia_bg: string;
  multimedia_title_en: string;
  multimedia_title_bn: string;
  multimedia_title_highlight_en: string;
  multimedia_title_highlight_bn: string;
  multimedia_subtitle_en: string;
  multimedia_subtitle_bn: string;

  careers_bg: string;
  careers_title_en: string;
  careers_title_bn: string;
  careers_title_highlight_en: string;
  careers_title_highlight_bn: string;
  careers_subtitle_en: string;
  careers_subtitle_bn: string;
}

export const defaultPageHeaders: PageHeaderData = {
  packages_bg: "/video/package-header.mp4",
  packages_title_en: "Flexible & Premium",
  packages_title_bn: "ফ্লেক্সিবল ও প্রিমিয়াম",
  packages_title_highlight_en: "Broadband Plans",
  packages_title_highlight_bn: "ব্রডব্যান্ড প্ল্যান",
  packages_subtitle_en: "Choose from our diverse range of fiber optic broadband connections. All plans come with unlimited volume, high-speed peers, and 24/7 technical monitoring.",
  packages_subtitle_bn: "আমাদের বিভিন্ন ফাইবার অপটিক ব্রডব্যান্ড সংযোগ থেকে বেছে নিন। সমস্ত প্ল্যানে আনলিমিটেড ভলিউম, হাই-স্পিড পিয়ার্স এবং ২৪/৭ মনিটরিং অন্তর্ভুক্ত।",

  offers_bg: "/offer.jpg",
  offers_title_en: "Monsoon Campaigns",
  offers_title_bn: "বর্ষা মৌসুমী ক্যাম্পেইন",
  offers_title_highlight_en: "& Discounts",
  offers_title_highlight_bn: "ও ছাড়",
  offers_subtitle_en: "Unlock high-speed splicing broadband peering plans at zero installation fees.",
  offers_subtitle_bn: "শূন্য ইনস্টলেশন ফি-তে হাই-স্পিড ব্রডব্যান্ড পিয়ারিং প্ল্যান আনলক করুন।",

  coverage_bg: "/coverage.jpg",
  coverage_title_en: "Active Coverage",
  coverage_title_bn: "সক্রিয় কভারেজ",
  coverage_title_highlight_en: "& Splicing Zones",
  coverage_title_highlight_bn: "ও স্প্লাইসিং জোন",
  coverage_subtitle_en: "Check if our fiber optic broadband coverage is available in your neighborhood of South Keraniganj.",
  coverage_subtitle_bn: "দক্ষিণ কেরানীগঞ্জে আপনার এলাকায় আমাদের ফাইবার অপটিক ব্রডব্যান্ড সংযোগ আছে কিনা তা পরীক্ষা করুন।",

  multimedia_bg: "/Multimedia.jpg",
  multimedia_title_en: "Multimedia",
  multimedia_title_bn: "মাল্টিমিডিয়া",
  multimedia_title_highlight_en: "& BDIX Portal",
  multimedia_title_highlight_bn: "ও বিডিআইএক্স পোর্টাল",
  multimedia_subtitle_en: "Access our high-speed local entertainment gateways to stream movies, play games, and watch live TV at speeds up to 100 Mbps.",
  multimedia_subtitle_bn: "মুভি স্ট্রিম করতে, গেম খেলতে এবং লাইভ টিভি দেখতে আমাদের হাই-স্পিড লোকাল বিনোদন গেটওয়েগুলো অ্যাক্সেস করুন।",

  careers_bg: "/footer-bg.jpg",
  careers_title_en: "Build Your Career",
  careers_title_bn: "আপনার ক্যারিয়ার গড়ুন",
  careers_title_highlight_en: "With NOC Splicers",
  careers_title_highlight_bn: "এনওসি স্প্লাইসারদের সাথে",
  careers_subtitle_en: "Explore open opportunities, engineering apprenticeships, and localized support roles at South Keraniganj.",
  careers_subtitle_bn: "দক্ষিণ কেরানীগঞ্জে আমাদের সাথে নতুন সুযোগ, ইঞ্জিনিয়ারিং শিক্ষানবিস এবং লোকাল সাপোর্ট ভূমিকা অন্বেষণ করুন।",
};

export default function PageHeadersRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/page-headers/packages");
  }, [router]);
  return null;
}
