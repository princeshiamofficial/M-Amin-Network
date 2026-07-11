import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from 'sonner';
import MaintenanceWrapper from "@/components/MaintenanceWrapper";
import { getSetting } from "@/actions/content";

export const dynamic = 'force-dynamic';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteContent = (await getSetting("site_content")) as { siteTitle?: string } | null;
  return {
    title: siteContent?.siteTitle || "M Amin Network | Best Broadband ISP in South Keraniganj, Dhaka",
    description: "Get high-speed, buffer-free broadband internet and corporate connectivity in Kadomtoli, Aganagar, South Keraniganj with M Amin Network (AS150164). BTRC Licensed & ISPAB Member.",
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
  const sysConfig = (await getSetting("system_config")) as { maintenanceMode?: boolean | number } | null;
  const isMaintenance = !!sysConfig?.maintenanceMode;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full w-full overflow-x-hidden antialiased`}
    >
      <head>
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
                  "name": "M Amin Network",
                  "description": "Best Broadband ISP in South Keraniganj, Dhaka",
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
                  "name": "M Amin Network",
                  "url": "https://m-aminnetwork.com/",
                  "logo": "https://m-aminnetwork.com/logo.png",
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

        {/* Stylesheets */}
        <link rel="stylesheet" href="https://lightswind.com/_next/static/chunks/3dyoda17z7vdw.css" />
        <link rel="stylesheet" href="https://lightswind.com/_next/static/chunks/41hxdqbq9x353.css" />
        <link rel="stylesheet" href="https://lightswind.com/_next/static/chunks/328-uwih_omq0.css" />
        <link rel="stylesheet" href="https://lightswind.com/_next/static/chunks/20mcgp0we_-w0.css" />
        <link rel="stylesheet" href="https://lightswind.com/_next/static/chunks/3zaui-bjnfpl-.css" />
        <link rel="stylesheet" href="https://lightswind.com/_next/static/chunks/1t7veh6pgwbdb.css" />
        <link rel="stylesheet" href="https://lightswind.com/_next/static/chunks/0jd2xvpvdi6fi.css" />

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
          
          @keyframes rzp-rot{to{transform: rotate(360deg);}}
          @-webkit-keyframes rzp-rot{to{-webkit-transform: rotate(360deg);}} 
          .razorpay-container > iframe {min-height: 100%!important;}
        `}} />

        {/* External Scripts */}
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
        <script src="https://cdn.razorpay.com/static/cx/razorpay-risk-detection/bundle.js" async />
        <script src="https://apis.google.com/_/scs/abc-static/_/js/k=gapi.lb.en.9vdPKhB0RUg.O/m=gapi_iframes/rt=j/sv=1/d=1/ed=1/rs=AHpOoo97anj7zZ432JcN58tqJJp_A6WeOw/cb=gapi.loaded_0?le=scs" async />
      </head>
      <body className={`${geistSans.className} min-h-full flex flex-col bg-brand-dark text-slate-100 overflow-x-hidden`}>
        <MaintenanceWrapper isMaintenance={isMaintenance}>
          <Navbar />
          <main className="grow pt-24 flex flex-col overflow-x-hidden">{children}</main>
          <Footer />
        </MaintenanceWrapper>
        <Toaster position="bottom-right" theme="light" />
      </body>
    </html>
  );
}


