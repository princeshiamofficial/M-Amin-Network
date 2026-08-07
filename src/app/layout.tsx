import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from 'sonner';
import MaintenanceWrapper from "@/components/MaintenanceWrapper";
import ScrollToTop from "@/components/ScrollToTop";
import { getSetting } from "@/actions/content";
import Script from "next/script";

export const dynamic = 'force-dynamic';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const getLogoUrl = (value: unknown): string | null => {
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record.horizontalUrl === "string") return record.horizontalUrl;
    if (typeof record.url === "string") return record.url;
  }
  if (Array.isArray(value)) {
    const firstLogo = value.find((item) => item && typeof item === "object" && "url" in item);
    if (firstLogo && typeof firstLogo === "object" && "url" in firstLogo && typeof firstLogo.url === "string") {
      return firstLogo.url;
    }
  }
  return null;
};

export async function generateMetadata(): Promise<Metadata> {
  const siteContent = (await getSetting("site_content")) as { siteTitle?: string } | null;
  return {
    title: siteContent?.siteTitle || "M-Amin Network | Best Broadband ISP in Dhaka District",
    description: "Get high-speed, buffer-free broadband internet and corporate connectivity in Kadomtoli, Aganagar, Dhaka District with M-Amin Network (AS150164). BTRC Licensed & ISPAB Member.",
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" }
      ],
      apple: [
        { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
      ],
      shortcut: "/favicon/favicon.ico"
    }
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let siteLogo = "/logo.png";
  const savedLogo = await getSetting("site_logo");
  siteLogo = getLogoUrl(savedLogo) || siteLogo;

  const fullLogoUrl = siteLogo.startsWith("http") ? siteLogo : `https://m-aminnetwork.com${siteLogo}`;

  const sysConfig = (await getSetting("system_config")) as { maintenanceMode?: boolean | number; maintenanceMessage?: string } | null;
  const isMaintenance = !!sysConfig?.maintenanceMode;
  const maintenanceMessage = sysConfig?.maintenanceMessage || "";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full w-full overflow-x-hidden antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Anti-translation script for admin panel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (window.location.pathname.startsWith('/admin')) {
                  document.documentElement.classList.add('notranslate');
                  document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
                  document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=' + window.location.hostname;
                  if (window.location.hostname.includes('.')) {
                    var parts = window.location.hostname.split('.');
                    if (parts.length >= 2) {
                      var rootDomain = '.' + parts.slice(-2).join('.');
                      document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=' + rootDomain;
                    }
                  }
                }
              })();
            `
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://m-aminnetwork.com/#website",
                  "url": "https://m-aminnetwork.com/",
                  "name": "M-Amin Network",
                  "description": "Best Broadband ISP in Dhaka District",
                  "potentialAction": [
                    {
                      "@type": "SearchAction",
                      "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": "https://m-aminnetwork.com/search?q={search_term_string}"
                      },
                      "query-input": "required name=search_term_string"
                    }
                  ]
                },
                {
                  "@type": "Organization",
                  "@id": "https://m-aminnetwork.com/#organization",
                  "name": "M-Amin Network",
                  "url": "https://m-aminnetwork.com/",
                  "logo": fullLogoUrl,
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+8801707009267",
                    "contactType": "customer service",
                    "areaServed": "BD",
                    "availableLanguage": ["en", "bn"]
                  }
                }
              ]
            })
          }}
        />



        {/* Preconnects */}
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />



        {/* Custom Styles */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes lw-spin-border {
              from { --lw-border-angle: 0deg; }
              to   { --lw-border-angle: 360deg; }
          }
          @property --lw-border-angle {
              syntax: '<angle>';
              initial-value: 0deg;
              inherits: false;
          }
          .lw-spin-border {
              animation: lw-spin-border 3s linear infinite;
              background: conic-gradient(
                  from var(--lw-border-angle),
                  transparent 70%,
                  var(--primarylw) 80%,
                  var(--greedy) 90%,
                  transparent 100%
              );
          }
          @keyframes lw-pulse-glow {
              0%, 100% { opacity: 0.5; transform: scale(1); }
              50%       { opacity: 1;   transform: scale(1.15); }
          }
          .lw-pulse-glow { animation: lw-pulse-glow 2.5s ease-in-out infinite; }

          @keyframes lw-badge-shine {
              0%   { background-position: -200% center; }
              100% { background-position: 200% center; }
          }
          .lw-badge-shine {
              background: linear-gradient(90deg, var(--primarylw) 0%, var(--greedy) 40%, #ffffff 50%, var(--greedy) 60%, var(--primarylw) 100%);
              background-size: 200% auto;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              animation: lw-badge-shine 3s linear infinite;
          }

          @keyframes lw-float {
              0%, 100% { transform: translateY(0px); }
              50%       { transform: translateY(-3px); }
          }
          .lw-float { animation: lw-float 3s ease-in-out infinite; }

          @keyframes lw-btn-ripple {
              0%   { transform: scale(0); opacity: 0.6; }
              100% { transform: scale(2.5); opacity: 0; }
          }
          .lw-btn-ripple { animation: lw-btn-ripple 0.6s ease-out forwards; }
          
          .force-active-tab {
              background-color: #0072ff !important;
              color: #ffffff !important;
          }
          .force-active-link {
              color: #0072ff !important;
          }
          /* Hide Google Translate native top banner & dynamic layout shifting */
          iframe.goog-te-banner-frame {
              display: none !important;
          }
          .goog-te-banner-frame {
              display: none !important;
          }
          body {
              top: 0px !important;
          }
          .skiptranslate {
              display: none !important;
          }
          #google_translate_element {
              display: none !important;
          }
        `}} />

        {/* Google Translate API Widget integration */}
        <Script
          id="google-translate-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                if (window.location.pathname.startsWith('/admin')) {
                  return;
                }
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false
                }, 'google_translate_element');
              }
            `
          }}
        />
        <Script
          id="google-translate-element"
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        {/* Custom translation override script to replace "শূন্য" (Sunno) with "জিরো" (Zero) for technical accuracy */}
        <Script
          id="translate-zero-override"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (window.location.pathname.startsWith('/admin')) return;
                function replaceText(node) {
                  if (node.nodeType === Node.TEXT_NODE) {
                    if (node.nodeValue && node.nodeValue.includes('শূন্য')) {
                      node.nodeValue = node.nodeValue.replace(/শূন্য/g, 'জিরো');
                    }
                  } else {
                    for (let child of node.childNodes) {
                      replaceText(child);
                    }
                  }
                }

                function runReplace() {
                  if (document.documentElement.lang === 'bn') {
                    replaceText(document.body);
                  }
                }

                if (typeof window !== 'undefined') {
                  var observer = new MutationObserver(function(mutations) {
                    if (document.documentElement.lang === 'bn') {
                      observer.disconnect();
                      runReplace();
                      observer.observe(document.body, {
                        childList: true,
                        subtree: true,
                        characterData: true
                      });
                    }
                  });

                  var htmlObserver = new MutationObserver(function(mutations) {
                    if (document.documentElement.lang === 'bn') {
                      observer.disconnect();
                      runReplace();
                      observer.observe(document.body, {
                        childList: true,
                        subtree: true,
                        characterData: true
                      });
                    }
                  });

                  var startObservers = function() {
                    if (document.body) {
                      observer.observe(document.body, {
                        childList: true,
                        subtree: true,
                        characterData: true
                      });
                      htmlObserver.observe(document.documentElement, {
                        attributes: true,
                        attributeFilter: ['lang']
                      });
                      runReplace();
                    } else {
                      setTimeout(startObservers, 50);
                    }
                  };
                  startObservers();
                }
              })();
            `
          }}
        />

      </head>
      <body className={`${geistSans.className} min-h-full flex flex-col bg-brand-dark text-slate-100 overflow-x-hidden`} suppressHydrationWarning={true}>
        <ScrollToTop />
        <div id="google_translate_element" style={{ display: "none" }} />
        <MaintenanceWrapper isMaintenance={isMaintenance} maintenanceMessage={maintenanceMessage}>
          <Navbar />
          <main className="grow pt-24 flex flex-col overflow-x-hidden">{children}</main>
          <Footer />
        </MaintenanceWrapper>
        <Toaster position="bottom-right" theme="light" />
      </body>
    </html>
  );
}


