/**
 * This file contains the paths to all the assets used in the project. 
 */
export const SFX_ASSETS = {
    CLICK: "/sfx/click.wav",
} as const;

export const MUSIC_ASSETS = {
    DELTARUNE_THIRD_SANCTUARY: "/music/DeltaruneThirdSanctuary.mp3",
} as const;

/**
 * These is 3 steps to get the union of all the path.
 * 
 * typeof SFX_ASSETS =>
 * 
 * interface SFX_ASSETS {
 * CLICK: "/sfx/click.wav"
 * }
 * 
 * keyof typeof SFX_ASSETS =>
 * CLICK | ...
 * 
 * typeof SFX_ASSETS[keyof typeof SFX_ASSETS] =>
 * "/sfx/click.wav"  ...
 * 
 * So, they used to prevent from using any string as the path as param and run the function, watc'ing they go wrong.
 * SfxAssetPath organize all the path of SFX assets, so the param of the function can only be the path in SFX_ASSETS.
 * Beatiful, isn't it?
 * And I want to take a nap bro :(
 */
export type SfxAssetPath = typeof SFX_ASSETS[keyof typeof SFX_ASSETS];
export type MusicAssetPath = typeof MUSIC_ASSETS[keyof typeof MUSIC_ASSETS];