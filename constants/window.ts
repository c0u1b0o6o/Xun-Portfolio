/**
 * This file contains the types for Music Provider and Music Hook.
 */
export const WINDOW_ID ={
    WELCOME: "welcome",
    ABOUT: "about",
    BLOG: "blog",
    CONTACT: "contact",
    SETTING: "setting",
    DOCK: "dock",
} as const;

export type WindowId = typeof WINDOW_ID[keyof typeof WINDOW_ID];