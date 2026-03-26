'use client';

import { MusicContextType } from "@/types/music";
import React, { useCallback, useContext } from "react";
import { createContext, useEffect } from "react";
import { MUSIC_ASSETS } from '../constants/music';

const defaultValue:MusicContextType = {
    isMusicMuted: true,
    toggleMusicMute: () => {console.warn("toggleMusicMute is not implemented now. pls check.")},
    audioRef: { current: null },
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
export function MusicProvider({ children}: { children: React.ReactNode; }) {
    const [isMusicMuted, setIsMusicMuted] = React.useState(true); // That's what i talk about the state like event bro.
    const [isMounted, setIsMounted] = React.useState(false);
    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    // ---This useEffect will run once while amounting.---
    // 1. set the default info
    // 2. play the music
    // 3. GC
    useEffect(() => {
      // FIXME: This save feature is so confused. It'll make defualt not mute, but no music play. So idk what's this for
      // FIXME: Hey, im right. I dont really need ts, bc i want default all state when reload the page.
      // If have saved the state in localStorage, use it. Otherwise, use the default state(true).
      // const saved = localStorage.getItem('isMusicMuted');
      // if (saved !== null) setIsMusicMuted(JSON.parse(saved));
      // else setIsMusicMuted(true);

      const audio = new Audio(MUSIC_ASSETS.DELTARUNE_THIRD_SANCTUARY);
      audio.loop = true;
      audio.volume = 0.5; // set the default volume to 50%
      audioRef.current = audio; // set the current music

      setIsMounted(true); // set mounted . done.

      // play done. GC the resource
      return () => {
        audio.pause();
        audio.src = ""; // clear the source to release memory
        audioRef.current = null;
      }
    }, []) // only run this time. Goodbye.);
    
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
    },[isMusicMuted,isMounted])

    // ---This is the function to toggle the music mute state. We Abstracted it before.---
    // 1. set toggle state, if 1 ? 0 : 1. Yeah. You should know what im talkin bout.
    // 2. persist the state in localStorage, so when user refresh the page, it can keep the state. I just want to make it more user-friendly bro.
    // 3. return the new state.
    const toggleMusicMute = React.useCallback(()=>{
        setIsMusicMuted((prev) => {
            const newState = !prev;
            /*NOTE: I just ai and maybe it's working like, when user play the music, and want to turn to another tab
            make this website rebuild, state reset, the music stop. So use localStorage to presist this situation*/
            localStorage.setItem('isMusicMuted', JSON.stringify(newState));
            return newState;
        });
    },[])

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
        <MusicContext.Provider value={{ isMusicMuted, toggleMusicMute, audioRef }}>
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
export const useMusicContext = () =>{
  const context = useContext(MusicContext);
  if(!context){
    throw new Error("useMusicContext must be used within a MusicProvider");
  }
  return context;
};