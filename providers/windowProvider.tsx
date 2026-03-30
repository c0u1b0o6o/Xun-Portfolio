"use client";
import {
  WindowContextType,
  WindowId,
  WindowStates as WindowProps,
} from "@/types/window";
import React, { useEffect } from "react";
import { createContext } from "react";

const WindowContext = createContext<WindowContextType | null>(null);

// 預設各視窗的初始位置
const DEFAULT_WINDOWS_STATES: Record<WindowId, WindowProps> = {
  welcome: { id: "welcome", isOpen: true, x: 0, y: 0, z: 10 }, // we dont need this
  setting: { id: "setting", isOpen: false, x: 200, y: 100, z: 10 },
  contact: { id: "contact", isOpen: false, x: 50, y: 150, z: 10 },
  blog: { id: "blog", isOpen: false, x: 400, y: 250, z: 10 },
  about: { id: "about", isOpen: false, x: 0, y: 0, z: 10 },
  musicplayer: { id: "musicplayer", isOpen: false, x: 0, y: 0, z: 10 },
  discord: { id: "discord", isOpen: false, x: 200, y: 200, z: 10 },
  email: { id: "email", isOpen: false, x: 250, y: 250, z: 10 },
  mobile_warning: { id: "mobile_warning", isOpen: true, x: 250, y: 250, z: 10 },
  portfolio_link: {
    id: "portfolio_link",
    isOpen: false,
    x: 300,
    y: 300,
    z: 10,
  },
};

export function WindowProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = React.useState<Record<WindowId, WindowProps>>(
    DEFAULT_WINDOWS_STATES,
  );

  const resetWindows = () => {
    setWindows(DEFAULT_WINDOWS_STATES);
  };

  const toggleWindow = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: !prev[id].isOpen,
      },
    }));
  };

  const updatePosition = (id: WindowId, newX: number, newY: number) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        x: newX,
        y: newY,
      },
    }));
  };

  const focusWindow = (id: WindowId) => {
    setWindows((prev) => {
      const currentMaxZ = Math.max(...Object.values(prev).map((w) => w.z), 0);
      return {
        ...prev,
        [id]: { ...prev[id], z: currentMaxZ + 1 },
      };
    });
  };

  return (
    <WindowContext.Provider
      value={{
        windows,
        toggleWindow,
        focusWindow,
        updatePosition,
        resetWindows,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
}

// custom hook.
export const useWindowContext = () => {
  const context = React.useContext(WindowContext);
  if (!context) {
    throw new Error("useWindowContext must be used within a WindowProvider");
  }
  return context;
};
