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

        {/* Preloads */}
        <link rel="preload" href="https://lightswind.com/_next/static/media/1b99372b3eaef0c8-s.p.1gsd1jahc5dg_.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://lightswind.com/_next/static/media/31a9145ccb84606d-s.p.3j3x29wbycqkn.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://lightswind.com/_next/static/media/345c85a432359eed-s.p.0zem_9y19rte6.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://lightswind.com/_next/static/media/47fe1b7cd6e6ed85-s.p.3bh2vc0w-r-ll.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://lightswind.com/_next/static/media/80dbc432bf467303-s.p.2mn_dieig53zr.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://lightswind.com/_next/static/media/83afe278b6a6bb3c-s.p.2bn3s6zvc0dyp.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://lightswind.com/_next/static/media/8e451580e5e95631-s.p.27vw08z6_vw0m.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://lightswind.com/_next/static/media/8e6fa89aa22d24ec-s.p.2o7m9ogm38dql.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://lightswind.com/_next/static/media/9be384ea93fe3f49-s.p.0ig786lf0ff2-.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://lightswind.com/_next/static/media/GeistMonoVF-s.p.1lv5tp2fpjxdz.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="https://lightswind.com/_next/static/media/GeistVF-s.p.0e569l9b0bre8.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="https://lightswind.com/_next/static/media/a218039a3287bcfd-s.p.43zbiuwnnoiok.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://lightswind.com/_next/static/media/c875c6f5d3e977ac-s.p.1h18_wedhzk4h.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://lightswind.com/_next/static/media/ce62453a442c7f35-s.p.0a0h245ktd4x0.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://lightswind.com/_next/static/media/e2334d715941921e-s.p.3o_v2fun1jzxk.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://lightswind.com/_next/static/media/f30fd2e485acf1bc-s.p.35belnv3c2-b-.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://lightswind.com/_next/static/media/fba5a26ea33df6a3-s.p.18rizl4rsrl42.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="https://i.ytimg.com/vi/X8fT_lAhVnQ/hqdefault.jpg" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-3dblock03.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-3dblock02.png?alt=media" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1620712943543-bcc4628c9455?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-login01.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-signup01.png?alt=media" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1614850523296-e811cfbaf163?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-blog01.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-blog03.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/uploads%2Fcard01.png?alt=media" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=940" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1667372333114-3d4031bd3662?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?q=80&w=2074&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-contact01.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-contact02.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-cta01.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-cta02.png?alt=media" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1555529733-0e67056058e1?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2074&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-faq01.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-faq02.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-feature01.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-feature02.png?alt=media" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1621504450181-5d156fd312ef?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1611974714851-48206138d73e?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-footer01.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-footer02.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-gallery01.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-gallery02.png?alt=media" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-hero01.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-hero02.png?alt=media" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-logo01.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-logo02.png?alt=media" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-newsletter01.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-newsletter02.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-Hero01.png?alt=media" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=1200" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-pricing01.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-pricing02.png?alt=media" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=940" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1614064641913-a41706f92025?q=80&w=2070&auto=format&fit=crop" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=940" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=940" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-stats01.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-stats02.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-step01.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-step02.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-team01.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-team02.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-testimonial01.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-testimonial02.png?alt=media" as="image" />
        <link rel="preload" href="https://firebasestorage.googleapis.com/v0/b/codewithmuhilandb.appspot.com/o/admin-content%2Fblocks-timeline01.png?alt=media" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop" as="image" />

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


