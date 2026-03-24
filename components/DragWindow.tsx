'use client';
import { motion,useDragControls } from "framer-motion";
import React from "react";
import { useDesktopConstraints } from "@/context/layoutContext";

export default function DragWindow({ children, title = 'None'}: { children: React.ReactNode; title?: string;}) {
    const dragControls = useDragControls(); // useDragControls is from React's framer-motion, it allows us to control the dragging behavior manually

    const [isDragging, setIsDragging] = React.useState(false); // custom a isDraggin state to determine whether we are currently dragging, so we can change the cursor and prevent text selection during dragging

    const constrainRef = useDesktopConstraints(); // useDesktopConstraints is a from layoutContext, it provides the ref of the container that we want to constrain the dragging within
    
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
            dragMomentum={false} 
            dragListener={false} 
            whileDrag={{ zIndex:10 }}
            onDragEnd={() => setIsDragging(false)}
            onDragStart={() => setIsDragging(true)}
            whileHover={{ scale: 1.02 }}
            initial={{ x: 0, y: 0 }}
            dragConstraints={constrainRef || undefined}
        >  
        {/* if isDragging, we can's select text, otherwise.. */}
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