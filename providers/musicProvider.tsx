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
  // 1. set the default info
  // 2. play the music
  // 3. GC
  useEffect(() => {
    const audio = new Audio(currentTrack.src); // create a new audio element with the src of the music asset.
    audio.loop = true;
    audio.volume = currentTrack.defaultVolume; // set the default volume to 50%
    audioRef.current = audio; // set the current music

    setIsMounted(true); // set mounted . done.

    // play done. GC the resource
    return () => {
      audio.pause();
      audio.src = ""; // clear the source to release memory
      audioRef.current = null;
    }
  }, [currentTrack]) // run when currentTrack changes.


  // ---This useEffect will rerun when the isMusicMuted state changes.---
  // Ok, you mounted it successfully, then what should u do?
  // we need to keep listen the event(state), and do something.
  useEffect(() => {
    // Conditon1: Music is muted or current is null, then do nothing. Dont play it.
    if (!audioRef.current)
      return;

    // Condition 2a: Music is muted, pause it.
    // Condition 2b: Music is not muted, play it. If catch any error, just log it.
    if (isMusicMuted) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => {
        console.warn("[Music] Auto-play prevented:", e);
      });
    }
  }, [isMusicMuted, isMounted, currentTrack])

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
    <MusicContext.Provider value={{ isMusicMuted, toggleMusicMute, audioRef, currentTrack, changeTrack }}>
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