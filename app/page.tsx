"use client";
import DotGridBackground from "@/components/DotGridBackground";
import React from "react";
import { LayoutProvider } from "@/providers/layoutProvider";
import { WelcomeWindow } from "@/components/windows/Welcome";
import { ContactWindow } from "@/components/windows/Contact";
import { SettingWindow } from "@/components/windows/Setting";
import { useWindowContext } from "@/providers";
import { AboutWindow } from "@/components/windows/About";
import { MusicPlayerWindow } from "@/components/windows/MusicPlayer";
import { BlogPreviewWindow } from "@/components/windows/BlogPreview";
import { DetailWindows } from "@/components/windows/DetailWindow";
import { useMediaQuery, BREAKPOINTS } from "@/hooks";

export default function Home() {
  const constraintsRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery(BREAKPOINTS.MOBILE);

  return (
    <main
      ref={constraintsRef}
      className={
        isMobile
          ? "relative min-h-screen w-full flex flex-col items-center justify-center p-4"
          : "absolute min-h-screen w-full flex flex-col items-center justify-center p-24"
      }
    >
      <LayoutProvider value={constraintsRef}>
        <DotGridBackground />
        <WelcomeWindow />
        {/* 手機上這些是 bottom sheet overlay，不佔 flow 空間 */}
        <ContactWindow />
        <SettingWindow />
        <AboutWindow />
        <MusicPlayerWindow />
        <BlogPreviewWindow />
        <DetailWindows />
      </LayoutProvider>
    </main>
  );
}
