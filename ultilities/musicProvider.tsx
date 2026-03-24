'use client';
// AI GENERATED
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

type MusicContextType = {
  isMusicMuted: boolean;
  toggleMusicMute: () => void;
};

const MusicContext = createContext<MusicContextType>({ 
  isMusicMuted: true, // 預設靜音以符合瀏覽器自動播放政策
  toggleMusicMute: () => {} 
});

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [isMusicMuted, setIsMusicMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 建立背景音樂
    const audio = new Audio('/sounds/bgm.mp3');
    audio.loop = true; // 循環播放
    audio.volume = 0.3; // 預設背景音量較小
    audioRef.current = audio;

    // 嘗試讀取本地儲存
    const saved = localStorage.getItem('isMusicMuted');
    if (saved !== null) {
      const parsedSaved = JSON.parse(saved);
      setIsMusicMuted(parsedSaved);
      
      // 如果不是靜音，嘗試播放
      if (!parsedSaved) {
        audio.play().catch(e => {
          console.warn("自動播放被瀏覽器阻擋", e);
          setIsMusicMuted(true); // 如果被阻擋，重設為靜音狀態
        });
      }
    }

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // 監聽狀態改變並控制音樂播放/暫停
  useEffect(() => {
    if (!audioRef.current) return;

    if (isMusicMuted) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => {
        console.warn("播放失敗 (可能找不到檔案或被阻擋)：", e);
        // 為了避免開發時沒有音檔導致 icon 切換不過去，先註解掉強制重置
        // setIsMusicMuted(true);
      });
    }
  }, [isMusicMuted]);

  const toggleMusicMute = () => {
    setIsMusicMuted((prev) => {
      const newState = !prev;
      localStorage.setItem('isMusicMuted', JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <MusicContext.Provider value={{ isMusicMuted, toggleMusicMute }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusicContext() {
  return useContext(MusicContext);
}