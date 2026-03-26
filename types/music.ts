import { MUSIC_ASSETS } from "@/constants/music";
import { RefObject } from "react";

/**
 * Music Provider Types
 */
export interface MusicContextType{
    isMusicMuted: boolean;
    toggleMusicMute: () => void;
    audioRef: RefObject<HTMLAudioElement | null>; // Ref is a reference to the audio element, so we can use the only element like this.
}

export type MusicAssetPath = typeof MUSIC_ASSETS[keyof typeof MUSIC_ASSETS];