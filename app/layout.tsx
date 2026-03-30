import type { Metadata } from "next";
import { Geist, Geist_Mono,Montserrat } from "next/font/google";
import { SfxProvider } from "@/providers/sfxProvider";
import { MusicProvider } from "@/providers/musicProvider";
import { StructuredData } from "./structured-data";

import "./globals.css";
import { WindowProvider } from "@/providers";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xun - Frontend Developer & Student Portfolio",
  description: "Xun's portfolio showcasing frontend development skills with Next.js, Tailwind CSS, and TypeScript. Computer Science student at National Taiwan University.",
  keywords: ["portfolio", "frontend developer", "Next.js", "Tailwind CSS", "TypeScript", "web developer", "Xun"],
  authors: [{ name: "Xun" }],
  creator: "Xun",
  publisher: "Xun",
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "https://xun-portfolio.vercel.app"),
  openGraph: {
    title: "Xun - Frontend Developer & Student Portfolio",
    description: "Explore my portfolio showcasing skills in Next.js, Tailwind CSS, TypeScript, and Python development.",
    url: process.env.NEXT_PUBLIC_URL || "https://xun-portfolio.vercel.app",
    siteName: "Xun's Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Xun's Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xun - Frontend Developer & Student Portfolio",
    description: "Explore my portfolio showcasing skills in Next.js, Tailwind CSS, TypeScript, and Python development.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_URL || "https://xun-portfolio.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <StructuredData />
      </head>
      <body className="min-h-full flex flex-col">
        <SfxProvider>
          <MusicProvider>
            <WindowProvider>
              <div className="relative z-10 flex-1">
                {children}
              </div>
            </WindowProvider>
          </MusicProvider>
        </SfxProvider>
      </body>
    </html>
  );
}
