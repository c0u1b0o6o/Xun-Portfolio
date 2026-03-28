'use client';
import { motion, useDragControls, AnimatePresence, useMotionValue } from "framer-motion";
import React, { useEffect } from "react";
import { useLayout, useSfx, useWindowContext } from "@/providers";
import { RiCloseLine } from "react-icons/ri";
import { WindowId } from '../types/window';

interface DragWindowProps {
    children: React.ReactNode;
    title?: string;
    id: WindowId;
    className?: string;
}

export default function DragWindow({ children, title = 'None', id, className}: DragWindowProps) {
    const dragControls = useDragControls();
    const constrainRef = useLayout(); 
    const playClickSfx = useSfx("/sfx/click.wav", 0.5);

    const [isDraggin, setIsDraggin] = React.useState(false);

    const { toggleWindow,focusWindow,updatePosition} = useWindowContext();
    const windowState = useWindowContext().windows[id];;

    const handleClose = () => {
        toggleWindow(id);
        playClickSfx();
    };

    useEffect(() => {
        if(windowState?.isOpen) {
            focusWindow(id);
        }
    }, [windowState?.isOpen]);

    return (
        <AnimatePresence>
            {windowState?.isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => focusWindow(id)}
            style={{
                position: 'absolute',
                zIndex: windowState.z
            }}
            drag
            dragControls={dragControls}
            dragMomentum={true}
            dragTransition={{
                power: 0.2,
                timeConstant: 300, 
            }}
            dragListener={false}  
            whileDrag={{ 
                scale: 1.05, 
                transition: { duration: 0.15, ease: "easeOut" }, 
            }}
            onDragEnd={(event,info) => {
                updatePosition(id, info.point.x, info.point.y);
                setIsDraggin(false);
                playClickSfx(); 
            }}
            onDragStart={() => {
                setIsDraggin(true);
                playClickSfx(); 
            }}
            dragConstraints={constrainRef || undefined}
            className={`shadow-lg transition-shadow duration-200 rounded-lg select-none ${className || ''}`}
            
       >
            <div style={{pointerEvents: isDraggin ? 'none' : 'auto'}} // DO NOT CHANGE
                onPointerDown={(e) => {dragControls.start(e); focusWindow(id);}} 
                className="relative bg-ink-900 rounded-lg pt-2 px-2 pb-1"
            >
                {/* Header / Drag Handle */}
                <div className="flex flex-row items-center justify-between">
                    <h2 className="cursor-grab flex flex-col justify-center items-start font-mono text-surface-base text-2xl font-normal text-center mb-2 ml-2">
                        {title}
                    </h2>
                    <CloseButton onClick={handleClose} />
                </div>

                {/* Content Area */}
                <div className="flex flex-wrap items-center justify-center w-fit p-4 bg-surface-elevated rounded-lg shadow-lg text-center">
                    {children}
                </div>
            </div>
            </motion.div>
            )}
        </AnimatePresence>
    )
}

export function CloseButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            className="hover:scale-120"
            onClick={onClick}
        >
            <RiCloseLine className="mb-1 text-surface-base text-3xl" />
        </button>
    );
}