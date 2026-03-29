'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SfxAssetPath, SfxContextType } from '@/types/sfx';
import { UI_CONSTANTS } from '@/constants';

const defaultContext: SfxContextType = {
  isSfxMuted: false,
  toggleSfxMute: () => console.warn('SfxProvider is not wrapped'),
  sfxVolume: UI_CONSTANTS.DEFAULT_VOLUME,
  setSfxVolume: () => console.warn('SfxProvider is not wrapped'),
};

const SfxContext = createContext<SfxContextType>(defaultContext);

export function SfxProvider({ children }: { children: React.ReactNode }) {
  const [isSfxMuted, setIsSfxMuted] = React.useState(false);
  const [sfxVolume, setSfxVolume] = React.useState<number>(UI_CONSTANTS.DEFAULT_VOLUME);

  useEffect(() => {
    const savedMute = localStorage.getItem('isSfxMuted');
    if (savedMute) {
      setIsSfxMuted(JSON.parse(savedMute));
    }

    const savedVolume = localStorage.getItem('sfxVolume');
    if (savedVolume) {
      setSfxVolume(parseFloat(savedVolume));
    }else{
      localStorage.setItem('sfxVolume', JSON.stringify(UI_CONSTANTS.DEFAULT_VOLUME));
    }
  }, []);

  const toggleSfxMute = React.useCallback(() => {
    setIsSfxMuted((prev) => {
      const newState = !prev;
      localStorage.setItem('isSfxMuted', JSON.stringify(newState));
      return newState;
    });
  }, []);

  const setSfxVolumeWithPersist = React.useCallback((volume: number) => {
    setSfxVolume(volume);
    localStorage.setItem('sfxVolume', JSON.stringify(volume));
  }, []);

  return (
    <SfxContext.Provider value={{ isSfxMuted, toggleSfxMute, sfxVolume, setSfxVolume: setSfxVolumeWithPersist }}>
      {children}
    </SfxContext.Provider>
  );
}
export const useSfx: (src: SfxAssetPath, volume?: number) => () => void = (src: SfxAssetPath, volume = UI_CONSTANTS.DEFAULT_VOLUME) => { //FIXME: i will be confuse about the name here.
  const { isSfxMuted, sfxVolume } = useSfxContext();

  return useCallback(() => {
    // if mute do nothing. keep listeing
    if (isSfxMuted) return;
    
    // play the sfx
    const audio = new Audio(src);
    audio.volume = volume * sfxVolume;
    audio.play().catch(e => console.warn("[SFX] Play error:", e));
    
    // GC
    audio.onended = () => {
      audio.src = '';
    };
  }, [src, volume, isSfxMuted, sfxVolume]);
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
