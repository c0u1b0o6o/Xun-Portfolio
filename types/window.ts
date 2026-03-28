import { WINDOW_ID } from "@/constants/window";

/**
 * This file contains the types for Window Provider and Window Context.
 */
export interface WindowStates{
    id: WindowId;
    isOpen: boolean;
    x:number;
    y:number;
    z:number;
}

// Window Provider Types
export interface WindowContextType{
    windows: Record<WindowId, WindowStates>;
    toggleWindow: (id: WindowId) => void;
    updatePosition: (id: WindowId, newX: number, newY: number) => void;
    focusWindow: (id: WindowId) => void; // click to bring it front, update z-index to the highest
}
export type WindowId = typeof WINDOW_ID[keyof typeof WINDOW_ID];