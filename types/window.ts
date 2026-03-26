/**
 * This file contains the types for Window Provider and Window Context.
 */

import { WindowId } from "@/constants/window";

// Window Basic States
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
    focusWindow: (id: WindowId) => void; // click to bring it front, update z-index to the highest
}