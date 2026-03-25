/**
 * Abstract types for contexts. Declare what should the provider to do.
 * Usually used for any of feature's provider like Music,SFX,etc.
 */
import {RefObject} from "react";
import { MusicAssetPath, SfxAssetPath } from "@/constants/assets";

/**
 * Music Provider Types
 */
export interface MusicContextType{
    isMusicMuted: boolean;
    toggleMusicMute: () => void;
    audioRef: RefObject<HTMLAudioElement | null>; // Ref is a reference to the audio element, so we can use the only element like this.
}

/**
 * SFX Provider Types
 */
export interface SfxContextType{
    isSfxMuted: boolean;
    toggleSfxMute: () => void;
}

// UseSfx Declare the type for hook of SFX Provider 
export type SfxHook = (src: SfxAssetPath, volume?: number) => () => void;
export type MusicHook = (src: MusicAssetPath, volume?: number) => () => void;

/**
 * Layout Provider Types
 */
export interface LayoutContextType {
  containerRef: RefObject<HTMLDivElement | null>;
}