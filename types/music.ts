import { MusicAssetPath } from "@/constants/music";
import { RefObject } from "react";

// 定義最基礎的格式
export interface MusicProps {
    src: MusicAssetPath;          
    defaultVolume: number;
    title: string;
    author: string;
}

export interface MusicContextType {
    isMusicMuted: boolean;
    toggleMusicMute: () => void;
    audioRef: RefObject<HTMLAudioElement | null>;
    currentTrack: MusicProps;
    changeTrack: (track: MusicProps) => void;
    nextTrack: () => void;
    prevTrack: () => void;
}