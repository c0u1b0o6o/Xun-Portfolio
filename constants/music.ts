/**
 * This file contains the types for Music Provider and Music Hook.
 */
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
