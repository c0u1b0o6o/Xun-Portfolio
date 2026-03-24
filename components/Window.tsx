'use client';
import { motion,useDragControls } from "framer-motion";
import React from "react";
import { useDesktopConstraints } from "@/context/layoutContext";

export default function Window({ children, title = 'None'}: { children: React.ReactNode; title?: string;}) {
    const dragControls = useDragControls();
    const [isDragging, setIsDragging] = React.useState(false);
    const constrainRef = useDesktopConstraints();
    return (
        // drag: make it draggable
        // dragMomentum: disable momentum after dragging
        // dragListener: disable the default drag behavior, we will start dragging manually on the title bar
        // dragElastic: make it less elastic when dragging beyond constraints

        <motion.div 
            drag 
            dragControls={dragControls} 
            dragMomentum={false} 
            dragElastic={0.0}
            dragListener={false} 
            whileDrag={{ zIndex:10 }}
            onDragEnd={() => setIsDragging(false)}
            onDragStart={() => setIsDragging(true)}
            whileHover={{ scale: 1.02 }}
            initial={{ x: 0, y: 0 }}
            dragConstraints={constrainRef || undefined}
            className="relative z-10"
        >  
            <div className={isDragging ? "select-none cursor-grabbing" : ""}>
                <div className="touch-none relative bg-ink-900 rounded-lg pt-5 px-2 pb-1">
                <h2 onPointerDown={(e) => dragControls.start(e)} className="cursor-grab flex items-start font-mono text-surface-base text-3xl font-normal text-center mb-4 ml-2">{title}</h2>
                <div className="
                    flex flex-wrap items-center justify-center
                    w-fit           /* fit the element inside */
                    p-8             /* padding 8 */
                    bg-surface-elevated 
                    rounded-lg
                    shadow-lg"
                >
                    {children}
                </div>
            </div>
            </div>
        </motion.div>
    )
}