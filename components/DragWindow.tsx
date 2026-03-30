'use client';
import { motion, useDragControls, AnimatePresence, useMotionValue } from "framer-motion";
import React, { useEffect } from "react";
import { useLayout, useSfx, useWindowContext } from "@/providers";
import { RiCloseLine } from "react-icons/ri";
import { WindowId } from '@/types/window';
import { UI_CONSTANTS } from '@/constants';
import { useMediaQuery, BREAKPOINTS } from '@/hooks';

interface DragWindowProps {
    children: React.ReactNode;
    title?: string;
    id: WindowId;
    className?: string;
}

export default function DragWindow({ children, title = 'None', id, className}: DragWindowProps) {
    const dragControls = useDragControls();
    const constrainRef = useLayout(); 
    const isMobile = useMediaQuery(BREAKPOINTS.MOBILE);
    // 播放視窗關閉時的音效 (已記憶化)
    const playClickSfx = useSfx("/sfx/click.wav", UI_CONSTANTS.DEFAULT_VOLUME);
    const playCloseSfx = useSfx("/sfx/close.mp3", UI_CONSTANTS.DEFAULT_VOLUME);

    const [isDragging, setIsDragging] = React.useState(false);

    const { toggleWindow,focusWindow,updatePosition} = useWindowContext();
    const windowState = useWindowContext().windows[id];;

    const handleClose = () => {
        toggleWindow(id);
        playCloseSfx();
    };

    useEffect(() => {
        if(windowState?.isOpen) {
            focusWindow(id);
        }
    }, [windowState?.isOpen]);

    // ===== 手機版 =====
    if (isMobile) {
        const isWelcome = id === 'welcome';

        // Welcome 視窗：固定顯示在頁面頂部
        if (isWelcome) {
            return (
                <AnimatePresence>
                    {windowState?.isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className={`w-full shadow-lg rounded-lg ${className || ''}`}
                        >
                            <div className="relative bg-ink-900 rounded-lg pt-2 px-2 pb-1">
                                <div className="flex flex-row items-center justify-between">
                                    <h2 className="flex flex-col justify-center items-start font-mono text-surface-base text-xl font-normal text-center mb-2 ml-2">
                                        {title}
                                    </h2>
                                    <CloseButton onClick={handleClose} />
                                </div>
                                <div className="flex flex-wrap items-center justify-center w-full p-3 bg-surface-elevated rounded-lg shadow-lg text-center">
                                    {children}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            );
        }

        // 其他視窗：從下方滑出的 Bottom Sheet
        return (
            <AnimatePresence>
                {windowState?.isOpen && (
                    <motion.div
                        key={`bottom-sheet-${id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] flex flex-col justify-end"
                        onClick={handleClose}
                    >
                        {/* 背景遮罩 */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

                        {/* Bottom Sheet 視窗 */}
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%", transitionEnd: { pointerEvents: "none" } }}
                            transition={{ type: "spring", damping: 30, stiffness: 350 }}
                            drag="y"
                            dragConstraints={{ top: 0, bottom: 0 }}
                            dragElastic={{ top: 0, bottom: 0.5 }}
                            onDragEnd={(e, info) => {
                                if (info.offset.y > 100) {
                                    handleClose();
                                }
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className={`relative w-full max-h-[85vh] select-none ${className || ''}`}
                        >
                            <div className="relative bg-ink-900 rounded-t-2xl pt-2 px-2 pb-1 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                                {/* 拉柄指示器 */}
                                <div className="flex justify-center pt-2 pb-1 cursor-grab active:cursor-grabbing">
                                    <div className="w-12 h-1.5 rounded-full bg-surface-base/30" />
                                </div>
                                {/* Header */}
                                <div className="flex flex-row items-center justify-between px-1">
                                    <h2 className="flex flex-col justify-center items-start font-mono text-surface-base text-xl font-normal text-center mb-2 ml-2">
                                        {title}
                                    </h2>
                                    <CloseButton onClick={handleClose} />
                                </div>
                                {/* Content Area */}
                                <div 
                                    // [AI更動] 將 onPointerDownCapture 改為 onPointerDown
                                    // 解除使用 Capture 階段強行攔截事件的問題，讓子元件（如 Slider）能正確拿到 pointer events 並更新狀態
                                    onPointerDown={(e) => {
                                        // 防止內部捲動時觸發拖曳
                                        const target = e.target as HTMLElement;
                                        if (target.closest('.overflow-y-auto')) {
                                            e.stopPropagation();
                                        }
                                    }}
                                    className="flex flex-wrap items-center justify-center w-full p-3 bg-surface-elevated rounded-t-lg shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] text-center overflow-y-auto max-h-[calc(85vh-5rem)]"
                                >
                                    {children}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    }

    // ===== 桌面版：可拖曳視窗佈局 =====
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
                power: UI_CONSTANTS.DRAG_ANIMATION.MOMENTUM_POWER,
                timeConstant: UI_CONSTANTS.DRAG_ANIMATION.MOMENTUM_TIME_CONSTANT, 
            }}
            dragListener={false}  
            whileDrag={{ 
                scale: UI_CONSTANTS.DRAG_ANIMATION.SCALE_WHILE_DRAGGING, 
                transition: { duration: UI_CONSTANTS.DRAG_ANIMATION.TRANSITION_DURATION, ease: "easeOut" }, 
            }}
            onDragEnd={(event,info) => {
                updatePosition(id, info.point.x, info.point.y);
                setIsDragging(false);
                playClickSfx(); 
            }}
            onDragStart={() => {
                setIsDragging(true);
                playClickSfx(); 
            }}
            dragConstraints={constrainRef || undefined}
            className={`shadow-lg transition-shadow duration-200 rounded-lg select-none ${className || ''}`}
            
       >
            <div style={{pointerEvents: isDragging ? 'none' : 'auto'}} // DO NOT CHANGE
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