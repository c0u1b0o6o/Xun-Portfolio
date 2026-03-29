"use client";

import { MusicContextType, MusicProps } from "@/types/music";
import React, { useContext, useCallback } from "react";
import { createContext, useEffect } from "react";
import { MUSIC_ASSETS } from "@/constants/music";
import { UI_CONSTANTS } from "@/constants";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const defaultValue: MusicContextType = {
  isPlaying: false,
  togglePlayPause: () => {
    console.warn("togglePlayPause is not implemented now. pls check.");
  },
  audioRef: { current: null },
  currentTrack: MUSIC_ASSETS.CRUSH,
  changeTrack: () => {
    console.warn("changeTrack is not implemented now. pls check.");
  },
  nextTrack: () => {
    console.warn("nextTrack is not implemented now. pls check.");
  },
  prevTrack: () => {
    console.warn("prevTrack is not implemented now. pls check.");
  },
  musicVolume: UI_CONSTANTS.DEFAULT_VOLUME,
  setMusicVolume: () => {
    console.warn("setMusicVolume is not implemented now. pls check.");
  },
};

const MusicContext = createContext<MusicContextType>(defaultValue);

/**
 * MusicProvider - 音樂播放上下文提供者
 * 
 * 管理：播放狀態、當前音軌、音量、Audio 實例
 * 使用 useLocalStorage 統一管理 localStorage 邏輯
 */
export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTrack, setCurrentTrack] = React.useState<MusicProps>(
    MUSIC_ASSETS.CRUSH,
  );
  const { value: musicVolume, setValue: setMusicVolume } = useLocalStorage<number>(
    'musicVolume',
    { initialValue: UI_CONSTANTS.DEFAULT_VOLUME }
  );
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // 初始化單一 Audio 實例以確保 CavaVisualizer 連線不會因為換歌被切斷
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  // Audio 播放邏輯：當播放狀態、當前音軌或音量改變時更新
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 檢查是否真的換了歌，如果有換歌才更換 src
    if (!audio.src.endsWith(currentTrack.src)) {
      audio.src = currentTrack.src;
      audio.load();
    }

    // 確保音量隨設定更新
    audio.volume = currentTrack.defaultVolume * (musicVolume ?? UI_CONSTANTS.DEFAULT_VOLUME);

    if (isPlaying) {
      audio.play().catch((e) => {
        console.warn("[Music] Auto-play prevented:", e);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack, musicVolume]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const setMusicVolumeWithPersist = useCallback((volume: number) => {
    setMusicVolume(volume);
  }, [setMusicVolume]);

  // 改變當前播放的音軌
  const changeTrack = useCallback((track: MusicProps) => {
    setCurrentTrack(track);
  }, []);

  const nextTrack = useCallback(() => {
    setCurrentTrack((prev) => {
      const tracks = Object.values(MUSIC_ASSETS);
      const idx = tracks.findIndex((t) => t.src === prev.src);
      return tracks[(idx + 1) % tracks.length];
    });
  }, []);

  const prevTrack = useCallback(() => {
    setCurrentTrack((prev) => {
      const tracks = Object.values(MUSIC_ASSETS);
      const idx = tracks.findIndex((t) => t.src === prev.src);
      return tracks[(idx - 1 + tracks.length) % tracks.length];
    });
  }, []);

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        togglePlayPause,
        audioRef,
        currentTrack,
        changeTrack,
        nextTrack,
        prevTrack,
        musicVolume: musicVolume ?? UI_CONSTANTS.DEFAULT_VOLUME, // Fallback to default volume if not persisted
        setMusicVolume: setMusicVolumeWithPersist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusicContext must be used within a MusicProvider");
  }
  return context;
};
