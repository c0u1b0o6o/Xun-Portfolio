'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SfxContextType, SfxHook } from '@/types/abstract';

const defaultContext: SfxContextType = {
  isSfxMuted: false,
  toggleSfxMute: () => console.warn('SfxProvider is not wrapped'),
};

const SfxContext = createContext<SfxContextType>(defaultContext);

export function SfxProvider({ children }: { children: React.ReactNode }) {
  const [isSfxMuted, setIsSfxMuted] = React.useState(false);

  // 初始化讀取記憶
  useEffect(() => {
    const saved = localStorage.getItem('isSfxMuted');
    if (saved !== null) setIsSfxMuted(JSON.parse(saved));
  }, []);

  const toggleSfxMute = React.useCallback(() => {
    setIsSfxMuted((prev) => {
      const newState = !prev;
      localStorage.setItem('isSfxMuted', JSON.stringify(newState));
      return newState;
    });
  }, []);

  return (
    <SfxContext.Provider value={{ isSfxMuted, toggleSfxMute }}>
      {children}
    </SfxContext.Provider>
  );
}
export const useSfx: SfxHook = (src, volume = 0.5) => { //TODO: i will be confuse about the names here.
  const { isSfxMuted } = useSfxContext();

  return useCallback(() => {
    // 如果靜音，就直接收工，不播了
    if (isSfxMuted) return;
    
    // 真正播放的硬體邏輯
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play().catch(e => console.warn("[SFX] Play error:", e));
    
    // 播完自動銷毀 (垃圾回收)
    audio.onended = () => {
      audio.src = '';
    };
  }, [src, volume, isSfxMuted]);
};

export const useSfxContext = () => {
  const context = useContext(SfxContext);

  if (!context) {
    throw new Error(
      "useSfxContext must be used within a SfxProvider"
    );
  }

  return context;
};
