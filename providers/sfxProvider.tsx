'use client';

import React, { createContext, useContext, useCallback } from 'react';
import { SfxAssetPath, SfxContextType } from '@/types/sfx';
import { UI_CONSTANTS } from '@/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const defaultContext: SfxContextType = {
  isSfxMuted: false,
  toggleSfxMute: () => console.warn('SfxProvider is not wrapped'),
  sfxVolume: UI_CONSTANTS.DEFAULT_VOLUME,
  setSfxVolume: () => console.warn('SfxProvider is not wrapped'),
};

const SfxContext = createContext<SfxContextType>(defaultContext);

/**
 * SfxProvider - SFX 上下文提供者
 * 
 * 提供：SFX 靜音狀態、音量、相關操作
 * 使用 useLocalStorage 統一管理 localStorage 邏輯
 */
export function SfxProvider({ children }: { children: React.ReactNode }) {
  const { value: isSfxMuted, setValue: setIsSfxMuted } = useLocalStorage<boolean>(
    'isSfxMuted',
    { initialValue: false }
  );
  
  const { value: sfxVolume, setValue: setSfxVolume } = useLocalStorage<number>(
    'sfxVolume',
    { initialValue: UI_CONSTANTS.DEFAULT_VOLUME }
  );

  const toggleSfxMute = useCallback(() => {
    setIsSfxMuted((prev) => !(prev ?? false));
  }, [setIsSfxMuted]);

  const setSfxVolumeWithPersist = useCallback((volume: number) => {
    setSfxVolume(volume);
  }, [setSfxVolume]);

  return (
    <SfxContext.Provider value={{ isSfxMuted: isSfxMuted ?? false, toggleSfxMute, sfxVolume: sfxVolume ?? UI_CONSTANTS.DEFAULT_VOLUME, setSfxVolume: setSfxVolumeWithPersist }}>
      {children}
    </SfxContext.Provider>
  );
}

/**
 * useSfx Hook - 播放 SFX 音效
 * 
 * 返回一個播放函數，會考慮靜音和音量設定
 * 
 * @param src - 音效資源路徑
 * @param volume - 音效基礎音量 (0-1)
 * @returns 播放函數 () => void
 * 
 * @example
 * const play = useSfx('sfx/click.mp3');
 * <button onClick={play}>Click me</button>
 */
export const useSfx = (src: SfxAssetPath, volume: number = UI_CONSTANTS.DEFAULT_VOLUME): (() => void) => {
  const { isSfxMuted, sfxVolume } = useSfxContext();

  return useCallback(() => {
    // 如果靜音，不播放
    if (isSfxMuted) return;
    
    // 播放音效
    const audio = new Audio(src);
    audio.volume = volume * (sfxVolume ?? UI_CONSTANTS.DEFAULT_VOLUME);
    audio.play().catch(e => console.warn("[SFX] Play error:", e));
    
    // 垃圾回收
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
