"use client";

import { useState } from "react";
import DotGridBackground from "@/components/DotGridBackground";
import DragWindow from "@/components/DragWindow";
import React from "react";
import { LayoutProvider } from "@/providers/layoutProvider";
import { WelcomeWindow } from "@/components/windows/Welcome";
import { Contact } from "@/components/windows/Contact";
import { SettingWindow } from "@/components/windows/Setting";

export default function Home() {
  const constraintsRef = React.useRef<HTMLDivElement>(null);
  
  return (
    <main
      ref={constraintsRef}
      className="absolute min-h-screen w-full flex flex-col items-center justify-center p-24"
    >
      <LayoutProvider value={constraintsRef}>
        {/* z-index is -1 here, so it'll be the background */}
      <DotGridBackground />

      {/* z-index still greater than DotGridBackground */}
      {/* w-full is fill up the father container's width */}
        <WelcomeWindow/>
        <Contact/>
        <SettingWindow/>
        </LayoutProvider>
    </main>
  );
}