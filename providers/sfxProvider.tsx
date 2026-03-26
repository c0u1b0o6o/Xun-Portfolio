'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SfxAssetPath, SfxContextType } from '@/types/sfx';

const defaultContext: SfxContextType = {
  isSfxMuted: false,
  toggleSfxMute: () => console.warn('SfxProvider is not wrapped'),
};

const SfxContext = createContext<SfxContextType>(defaultContext);

export function SfxProvider({ children }: { children: React.ReactNode }) {
  const [isSfxMuted, setIsSfxMuted] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
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
export const useSfx: (src: SfxAssetPath, volume?: number) => () => void = (src: SfxAssetPath, volume = 0.5) => { //FIXME: i will be confuse about the name here.
  const { isSfxMuted } = useSfxContext();

  return useCallback(() => {
    // if mute do nothing. keep listeing
    if (isSfxMuted) return;
    
    // play the sfx
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play().catch(e => console.warn("[SFX] Play error:", e));
    
    // GC
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
