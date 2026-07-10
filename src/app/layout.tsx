import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from 'sonner';
import MaintenanceWrapper from "@/components/MaintenanceWrapper";
import { getSetting } from "@/actions/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "M Amin Network | Best Broadband ISP in South Keraniganj, Dhaka",
  description: "Get high-speed, buffer-free broadband internet and corporate connectivity in Kadomtoli, Aganagar, South Keraniganj with M Amin Network (AS150164). BTRC Licensed & ISPAB Member.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sysConfig = (await getSetting("system_config")) as { maintenanceMode?: boolean } | null;
  const isMaintenance = sysConfig?.maintenanceMode === true;

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
      </head>
      <body className="min-h-full flex flex-col bg-brand-dark text-slate-100 overflow-x-hidden">
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


