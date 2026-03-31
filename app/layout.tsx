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
  title: "Xun's Portfolio.",
  description: "I'm Xun! You can call me Cuboo! Feel free to say hi to me! A CS Student, bout to scoop some fires!",
  keywords: ["portfolio", "frontend developer", "Next.js", "Tailwind CSS", "TypeScript", "web developer", "Xun"],
  authors: [{ name: "Xun" }],
  creator: "Xun",
  publisher: "Xun",
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "https://www.cuboouo.com"),
  openGraph: {
    title: "Xun's Portfolio.",
    description: "Welcome! Feel free to say hi to me! A CS Student, bout to scoop some fires!",
    url: process.env.NEXT_PUBLIC_URL || "https://www.cuboouo.com",
    siteName: "Xun's Portfolio",
    images: [
      {
        url: "/og-image.png?v=${new Date().getTime()}",
        width: 1200,
        height: 630,
        alt: "Xun's Portfolio Preview",
      },
    ],
    locale: "zh-TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xun's Portfolio.",
    description: "Welcome! Feel free to say hi to me! A CS Student, bout to scoop some fires!",
    images: ["/og-image.png?v=${new Date().getTime()}"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://www.cuboouo.com",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
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
