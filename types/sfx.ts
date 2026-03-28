/**
 * This file contains the types for SFX Provider and SFX Hook.
 */

import { SFX_ASSETS } from "@/constants/sfx";

export interface SfxContextType{
    isSfxMuted: boolean;
    toggleSfxMute: () => void;
    sfxVolume: number;
    setSfxVolume: (volume: number) => void;
}
// UseSfx Declare the type for hook of SFX Provider 
export type SfxAssetPath = typeof SFX_ASSETS[keyof typeof SFX_ASSETS];
