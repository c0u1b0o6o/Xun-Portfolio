'use client';
import { motion, useDragControls } from "framer-motion";
import React from "react";
import { useLayout, useSfx, useWindowContext } from "@/providers";
import { IoCloseOutline } from "react-icons/io5";
import { WindowId } from '../constants/window';

interface DragWindowProps {
    children: React.ReactNode;
    title?: string;
    id: WindowId;
}

export default function DragWindow({ children, title = 'None', id}: DragWindowProps) {
    const dragControls = useDragControls();
    const constrainRef = useLayout(); 
    const playClickSfx = useSfx("/sfx/click.wav", 0.5);

    const { toggleWindow,focusWindow} = useWindowContext();
    const windowState = useWindowContext().windows[id];;

    const handleClose = () => {
        toggleWindow(id);
        playClickSfx();
    };

    const [isMoving , setIsMoving] = React.useState(false);

    return (
        <motion.div
            onClick={() => focusWindow(id)}
            style={{zIndex: windowState.z}}
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
            onDragEnd={() => {
                playClickSfx(); 
                setIsMoving(false);   
            }}
            onDragStart={() => {
                playClickSfx(); 
                setIsMoving(true);
            }}
            dragConstraints={constrainRef || undefined}
            className="shadow-lg transition-shadow duration-200 rounded-lg select-none"
        >
            <div style={{pointerEvents: isMoving ? 'none' : 'auto'}}
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
    )
}

export function CloseButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            className="hover:scale-120"
            onClick={onClick}
        >
            <IoCloseOutline className="mb-1 text-surface-base text-3xl" />
        </button>
    );
}