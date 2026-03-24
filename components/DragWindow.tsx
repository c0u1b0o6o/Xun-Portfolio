'use client';
import { motion,useDragControls } from "framer-motion";
import React from "react";
import { useDesktopConstraints } from "@/ultilities/layoutProvider";
import { useSoundEffect,SOUNDS } from "@/ultilities/useSoundEffect";

export default function DragWindow({ children, title = 'None'}: { children: React.ReactNode; title?: string;}) {
    const dragControls = useDragControls(); // useDragControls is from React's framer-motion, it allows us to control the dragging behavior manually

    const [isDragging, setIsDragging] = React.useState(false); // custom a isDraggin state to determine whether we are currently dragging, so we can change the cursor and prevent text selection during dragging

    const constrainRef = useDesktopConstraints(); // useDesktopConstraints is a from layoutContext, it provides the ref of the container that we want to constrain the dragging within
    
    const playClickSound = useSoundEffect(SOUNDS.CLICK, 0.5); // useSoundEffect is a custom hook that we created to play sound effects, it takes the sound source and volume as parameters, and returns a function that can be called to play the sound effect
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
                power: 0.2,           // 慣性的「推力」：數值越大，放手後滑得越遠 (預設 0.8)
                timeConstant: 300,    // 減速快慢：數值越小，減速越快，感覺越「重」 (預設 700) // 進階：讓慣性結束時自動吸附到網格
            }}
            dragListener={false} 
            whileDrag={{ zIndex:10 }}
            onDragEnd={() => {
                setIsDragging(false);
                playClickSound();
            }}
            onDragStart={() => {
                setIsDragging(true);
                playClickSound();
            }}
            whileHover={{ scale: 1.02 }}
            initial={{ x: 0, y: 0 }}
            dragConstraints={constrainRef || undefined}
            className="shadow-lg rounded-s-lg select-none"
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
                p-8             /* padding 8 */
                bg-surface-elevated 
                rounded-lg
                shadow-lg"
                >
                    {children}
                </div>
            </div>
        </motion.div>
    )
}