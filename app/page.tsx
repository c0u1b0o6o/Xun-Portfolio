"use client";

import { useState } from "react";
import DotGridBackground from "@/components/DotGridBackground";
import DragWindow from "@/components/DragWindow";
import React from "react";
import { LayoutProvider } from "@/providers/layoutProvider";
import { WelcomeWindow } from "@/components/windows/Welcome";
import { Contact } from "@/components/windows/Contact";
import { SettingWindow } from "@/components/windows/Setting";
import { useWindowContext } from "@/providers";

export default function Home() {
  const constraintsRef = React.useRef<HTMLDivElement>(null);
  const {windows} = useWindowContext();
  return (
    <main
      ref={constraintsRef}
      className="absolute min-h-screen w-full flex flex-col items-center justify-center p-24"
    >
      <LayoutProvider value={constraintsRef}>
      <DotGridBackground />

      {windows["welcome"]?.isOpen && <WelcomeWindow/>}
      {windows["contact"]?.isOpen && <Contact/>}
      {windows["setting"]?.isOpen && <SettingWindow/>}
        
      </LayoutProvider>
    </main>
  );
}