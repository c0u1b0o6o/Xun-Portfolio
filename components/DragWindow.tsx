'use client';
import { motion,scale,useDragControls } from "framer-motion";
import React from "react";
import { useDesktopConstraints } from "@/providers/layoutProvider";
import { useSfx } from "@/providers/sfxProvider";

export default function DragWindow({ children, title = 'None'}: { children: React.ReactNode; title?: string;}) {
    const dragControls = useDragControls(); // useDragControls is from React's framer-motion, it allows us to control the dragging behavior manually
    const constrainRef = useDesktopConstraints(); // useDesktopConstraints is a from layoutContext, it provides the ref of the container that we want to constrain the dragging within
    const playClickSfx = useSfx("/sfx/click.wav", 0.5);
    return (
        // drag: make it draggable
        // dragMomentum: disable momentum after dragging
        // dragListener: disable the default drag behavior, we will start dragging manually on the title bar
        // whileDrag: while dragging, set zIndex to 10 to make sure it's above other elements
        // onDragStart: when dragging starts, set isDragging to true
        // onDragEnd: when dragging ends, set isDragging to false
        // whileHover: while hovering, slightly scale up the window to indicate it's interactive
        // initial: set the initial position of the window to (0, 0)
        // dragConstraints: constrain the dragging within the container provided by layoutContext(I customed it.)
        <motion.div 
            drag 
            dragControls={dragControls} 
            dragMomentum={true} 
            dragTransition={{
                power: 0.2,           // more power, more mementum
                timeConstant: 300,    // time for the momentum to stop
            }}
            dragListener={false} 
            whileDrag={{ zIndex:10 , scale:1.05, transition: { duration: 0.15, ease: "easeOut"}}}
            onDragEnd={() => {
                playClickSfx(); // play click sound effect when dragging ends
            }}
            onDragStart={() => {
                playClickSfx(); // play click sound effect when dragging starts
            }}
            initial={{ x: 0, y: 0 }}
            dragConstraints={constrainRef || undefined}
            className="shadow-lg transition-shadow duration-200 rounded-lg select-none"
        >  

            <div onPointerDown={(e) => dragControls.start(e)} className="relative bg-ink-900 rounded-lg pt-2 px-2 pb-1">
                <h2  className="
                cursor-grab 
                flex 
                flex-col 
                justify-center 
                items-start 
                font-mono 
                text-surface-base 
                text-2xl font-normal 
                text-center 
                mb-2 
                ml-2"
                >
                    {title}
                </h2>
                <div className="
                flex 
                flex-wrap 
                items-center 
                justify-center
                w-fit           /* fit the element inside */
                p-4            /* padding 8 */
                bg-surface-elevated 
                rounded-lg
                shadow-lg
                text-center
                "
                >
                    {children}
                </div>
            </div>
        </motion.div>
    )
}