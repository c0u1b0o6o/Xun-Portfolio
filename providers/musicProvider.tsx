'use client';

import { MusicContextType, MusicProps } from "@/types/music";
import React, { useContext } from "react";
import { createContext, useEffect } from "react";
import { MUSIC_ASSETS } from "@/constants/music";

const defaultValue: MusicContextType = {
  isMusicMuted: true,
  toggleMusicMute: () => { console.warn("toggleMusicMute is not implemented now. pls check.") },
  audioRef: { current: null },
  currentTrack: MUSIC_ASSETS.CRUSH,
  changeTrack: () => { console.warn("changeTrack is not implemented now. pls check.") },
  nextTrack: () => { console.warn("nextTrack is not implemented now. pls check.") },
  prevTrack: () => { console.warn("prevTrack is not implemented now. pls check.") },
};

// Create the Music Abstract Context Type Object.
const MusicContext = createContext<MusicContextType>(defaultValue);

// Create the Music Provider Component, which will provide the music context to its children.
// useEffect is (()=>{}, [])
// {} is how it run
// [] is when it run, like what should we listen to trigger the effect.
// 1. [], it only run once when the component is mounted.
// 2. [isMusicMuted], it will run when the component is mounted and when the isMusicMuted state changes.
// 3. , nothing, you should take care bout it bro. It'll run all the time when anything updated.
export function MusicProvider({ children }: { children: React.ReactNode; }) {
  const [isMusicMuted, setIsMusicMuted] = React.useState(true); // That's what i talk about the state like event bro.
  const [isMounted, setIsMounted] = React.useState(false);
  const [currentTrack, setCurrentTrack] = React.useState<MusicProps>(MUSIC_ASSETS.CRUSH);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // ---This useEffect will run once while amounting.---
  // 初始化單一 Audio 實例以確保 CavaVisualizer 連線不會因為換歌被切斷
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audioRef.current = audio;

    setIsMounted(true);

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    }
  }, []); // 只在掛載時執行一次

  // ---This useEffect will rerun when the isMusicMuted or currentTrack state changes.---
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    
    // 檢查是否真的換了歌，如果有換歌才更換 src
    if (!audio.src.endsWith(currentTrack.src)) {
        audio.src = currentTrack.src;
        audio.load();
    }
    
    // 確保音量隨設定更新
    audio.volume = currentTrack.defaultVolume;

    if (isMusicMuted) {
      audio.pause();
    } else {
      audio.play().catch(e => {
        console.warn("[Music] Auto-play prevented:", e);
      });
    }
  }, [isMusicMuted, isMounted, currentTrack]);

  // ---This is the function to toggle the music mute state. We Abstracted it before.---
  // 1. set toggle state, if 1 ? 0 : 1. Yeah. You should know what im talkin bout.
  // 2. persist the state in localStorage, so when user refresh the page, it can keep the state. I just want to make it more user-friendly bro.
  // 3. return the new state.
  const toggleMusicMute = React.useCallback(() => {
    setIsMusicMuted((prev) => {
      const newState = !prev;
      /*NOTE: I just ai and maybe it's working like, when user play the music, and want to turn to another tab
      make this website rebuild, state reset, the music stop. So use localStorage to presist this situation*/
      // localStorage.setItem('isMusicMuted', JSON.stringify(newState));
      return newState;
    });
  }, [])

  // ---This is the function to change the music track.---
  // Change the current track and keep the music playing state.
  const changeTrack = React.useCallback((track: MusicProps) => {
    setCurrentTrack(track);
  }, []);

  const nextTrack = React.useCallback(() => {
    setCurrentTrack(prev => {
      const tracks = Object.values(MUSIC_ASSETS);
      const idx = tracks.findIndex(t => t.src === prev.src);
      return tracks[(idx + 1) % tracks.length];
    });
  }, []);

  const prevTrack = React.useCallback(() => {
    setCurrentTrack(prev => {
      const tracks = Object.values(MUSIC_ASSETS);
      const idx = tracks.findIndex(t => t.src === prev.src);
      return tracks[(idx - 1 + tracks.length) % tracks.length];
    });
  }, []);


  // Anyway, you need a provider in ur implementation right? So return it bro.
  // Now, you can do <blablablaProvider/> in ur tsx. nice.
  // And the value is the context you want to provide, pass to the children.

  // Ex:
  // <MusicProvider>
  //     <MuteButton/>
  // </MusicProvider>


  // MuteBButton be like:
  /*
    export default function MuteButton() {

    const {
        isMusicMuted,
        toggleMusicMute
    } = useMusicContext();

    return (
        <button onClick={toggleMusicMute}>
            {isMusicMuted ? "Unmute" : "Mute"}
        </button>
        );
    }
   */
  return (
    <MusicContext.Provider value={{ isMusicMuted, toggleMusicMute, audioRef, currentTrack, changeTrack, nextTrack, prevTrack }}>
      {children}
    </MusicContext.Provider>
  );
}

// This is called "Custom Hook".

// Before:
// import { useContext } from "react"; import { MusicContextObj } from "@/providers/musicProvider";
// const { isMusicMuted, toggleMusicMute } = useContext(MusicContextObj);

// After:
// import { useMusicContext } from "@/providers/musicProvider";
// const { isMusicMuted, toggleMusicMute } = useMusicContext();

// Then, we can catch the error when we use the hook outside of the provider, and make it more user-friendly. Nice.
export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusicContext must be used within a MusicProvider");
  }
  return context;
};