'use client';
// AI GENERATED
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

export const SOUNDS ={
    CLICK: '/sounds/click.wav',
} as const;

type SfxContextType = {
  isSfxMuted: boolean;
  toggleSfxMute: () => void;
};

const SfxContext = createContext<SfxContextType>({ 
  isSfxMuted: false, 
  toggleSfxMute: () => {} 
});

export function SfxProvider({ children }: { children: React.ReactNode }) {
  const [isSfxMuted, setIsSfxMuted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('isSfxMuted');
    if (saved !== null) {
      setIsSfxMuted(JSON.parse(saved));
    }
  }, []);

  const toggleSfxMute = () => {
    setIsSfxMuted((prev) => {
      const newState = !prev;
      localStorage.setItem('isSfxMuted', JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <SfxContext.Provider value={{ isSfxMuted, toggleSfxMute }}>
      {children}
    </SfxContext.Provider>
  );
}

export function useSfxContext() {
  return useContext(SfxContext);
}

export function useSoundEffect(src: string, volume: number = 1) {
  // 使用 useRef 儲存 Audio 物件，避免每次渲染都重新建立
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isSfxMuted } = useSfxContext();

  useEffect(() => {
    // 只有在瀏覽器環境才初始化
    const audio = new Audio(src);
    audio.volume = volume;
    // 預載入音效
    audio.load();
    audioRef.current = audio;

    return () => {
      audioRef.current = null;
    };
  }, [src, volume]);

  const play = useCallback(() => {
    if (!audioRef.current || isSfxMuted) return;

    // 關鍵：如果音效正在播放，重設時間到 0，實現「快速連續觸發」
    if (!audioRef.current.paused) {
        audioRef.current.currentTime = 0;
    }

    // 處理瀏覽器 Autoplay 限制
    audioRef.current.play().catch((err) => {
      console.warn("音效播放被瀏覽器阻攔，需使用者先點擊頁面:", err);
    });
  }, [isSfxMuted]);

  return play;
}