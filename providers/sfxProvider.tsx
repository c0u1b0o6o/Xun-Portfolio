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
 * 返回一個已記憶化的播放函數，會自動考慮全域靜音和音量設定。
 * 
 * 設計理念：
 * - Hook 返回播放函數，這樣調用時可直接執行：const play = useSfx(...); play()
 * - 依賴項包括 src、volume、isSfxMuted 和 sfxVolume，確保設定變更時更新函數
 * - 播放失敗時會捕捉異常並輸出警告，不會中斷程序
 * 
 * @param src - 音效資源路徑 (如 '/sfx/click.wav')
 * @param volume - 音效基礎音量倍數 (0-1，預設為 UI_CONSTANTS.DEFAULT_VOLUME)
 * 
 * @returns 已記憶化的播放函數 () => void
 *   - 調用此函數會播放音效（若未靜音），自動考慮全域音量設定
 *   - 若全域靜音，調用此函數不會發出聲音
 * 
 * @example
 * // 最簡單的用法
 * const play = useSfx('/sfx/click.wav');
 * <button onClick={play}>播放點擊音效</button>
 * 
 * @example
 * // 帶有自定義音量
 * const playLoud = useSfx('/sfx/notification.wav', 0.8);
 * <div onClick={playLoud}>音量較大的通知音</div>
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
