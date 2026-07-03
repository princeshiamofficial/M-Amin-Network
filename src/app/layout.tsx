import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full w-full overflow-x-hidden antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-dark text-slate-100 overflow-x-hidden">
        <Navbar />
        <main className="flex-grow pt-24 flex flex-col overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

