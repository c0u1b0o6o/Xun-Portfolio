'use client';
import { WindowContextType, WindowId, WindowStates as WindowProps } from "@/types/window";
import React, { useEffect } from "react";
import { createContext } from "react";

const WindowContext = createContext<WindowContextType | null>(null);

// 預設各視窗的初始位置
const DEFAULT_WINDOWS_STATES: Record<WindowId, WindowProps> = {
    welcome: { id: 'welcome', isOpen: true, x: 0, y: 0, z: 10 }, // we dont need this
    setting: { id: 'setting', isOpen: true, x: 200, y: 100, z: 10 },
    contact: { id: 'contact', isOpen: true, x: 50, y: 150, z: 10 },
    blog: { id: 'blog', isOpen: true, x: 400, y: 250, z: 10 },
    about: { id: 'about', isOpen: true, x: 500, y: 300, z: 10 },
    dock: { id: 'dock', isOpen: true, x: 0, y: 0, z: 10 },
};

export function WindowProvider({ children }: { children: React.ReactNode }) {
    const [windows, setWindows] = React.useState<Record<WindowId, WindowProps>>(DEFAULT_WINDOWS_STATES);
    const [maxZ, setMaxZ] = React.useState(15); // track the current max z-index to ensure focused window is always on top.
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        setWindows(DEFAULT_WINDOWS_STATES); // set all the windows to default.
        setIsMounted(true);
    }, []);

    /**
     * ...prev equal {EFAULT_WINDOWS_PROPS (expanded)}
     * ...prev[id] equal the specific window that we want to update (expanded), like:about: { id: 'about', isOpen: false, x: 500, y: 300, z: 14 },
     * [id]:{}, by ID as key, update the [ID] window's state
     * run1:..
     * run4:['about']:{(Props Expanded), isOpen:!prev['about'].isOpen} means, hey! i want to change the isOpen state and other keep the same.
     * So this is how we toggle the window, we just change the isOpen state.\0
     */
    // const toggleWindow = (id: WindowId) => {
    //     setWindows(prev => ({
    //         ...prev,
    //         [id]: {
    //             ...prev[id],
    //             isOpen: !prev[id].isOpen,
    //         }
    //     }));
    // }
    // But this is hard as hell i think. so...

    const toggleWindow = (id: WindowId) => {
        setWindows(prev => {
            const allWindows = {...prev};
            const targetWindow = allWindows[id];
            targetWindow.isOpen = !targetWindow.isOpen; // toggle the isOpen state
            return allWindows;
        });
    }   

    const updatePosition = (id: WindowId, newX: number, newY: number) => {
        setWindows(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                x: newX,
                y: newY,
            }
        }));
    }

const focusWindow = (id: WindowId) => {
    setWindows(prev => {
        const currentMaxZ = Math.max(...Object.values(prev).map(w => w.z), 0);
        return {
            ...prev,
            [id]: { ...prev[id], z: currentMaxZ + 1 }
        };
    });
};

    return (
        <WindowContext.Provider value={{ windows, toggleWindow, focusWindow }}>
            {children}
        </WindowContext.Provider>
    );
}

// custom hook.
export const useWindowContext = () => {
    const context = React.useContext(WindowContext);
    if(!context) {
        throw new Error("useWindowContext must be used within a WindowProvider");
    }
    return context;
}