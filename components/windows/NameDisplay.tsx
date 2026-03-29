'use client';
// NOTE: Placed in windows folder for window management consistency
import { useEffect, useState } from "react";
import { AnimatePresence, motion, scale, Variants } from "framer-motion";
import { useSfx } from "@/providers";
import { UI_CONSTANTS } from "@/constants";

/**
 * NameDisplay - 名稱展示組件
 * 
 * 功能：
 * - 在用戶名稱 (MengXun Liu) 和暱稱 (Cuboo) 之間自動切換
 * - 自動每 3 秒切換一次（除非滑鼠懸停）
 * - 點擊可手動切換
 * - 播放點擊音效
 * 
 * 動畫：使用 Framer Motion spring 動畫，提供流暢的進出效果
 */
export default function NameDisplay() {
  const [toggleName, setToggleName] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const playClickSfx = useSfx("/sfx/click.wav", UI_CONSTANTS.DEFAULT_VOLUME);

  // 自動切換名稱，每 3 秒一次（除非滑鼠懸停）
  useEffect(() => {
    if (isHover) return;
    const interval = setInterval(() => {
      setToggleName(prev => !prev);
    }, UI_CONSTANTS.NAME_DISPLAY.AUTO_SWITCH_INTERVAL);
    return () => clearInterval(interval);
  }, [isHover]);

  const handleOnClick = () => {
    playClickSfx();
    setToggleName(prev => !prev);
  };

  // Framer Motion 變體定義
  // type: "spring" - 彈簧動畫
  // damping - 阻尼（越高越穩定，越低越彈性）
  // stiffness - 剛性（越高越快）
  const nameVariants: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        y: { 
          duration: UI_CONSTANTS.NAME_DISPLAY.ENTER_DURATION, 
          type: "spring", 
          damping: 10, 
          stiffness: 1000 
        } 
      } 
    },
    exit: { 
      y: -20, 
      opacity: 0, 
      transition: { 
        duration: UI_CONSTANTS.NAME_DISPLAY.EXIT_DURATION, 
        ease: "easeIn" 
      } 
    },
  };

  return (
    <motion.div
      onClick={handleOnClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      whileHover={{ scale: 1.1 }}
      className="relative flex w-fit items-end justify-center cursor-pointer overflow-visible"
    >
      {/* 使用 mode="wait" 確保舊名稱完全退出後再顯示新名稱 */}
      <AnimatePresence mode="wait">
        {toggleName ? (
          <motion.div
            key="realName"
            variants={nameVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-row w-fit ml-2"
          >
            <h1 className="text-center font-mono font-bold text-4xl sm:text-5xl md:text-6xl tracking-wider italic">
              MengXun
            </h1>
            <h1 className="sm:ml-2 font-montserrat font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-wider primary-gradient-text">
              Liu
            </h1>
          </motion.div>
        ) : (
          <motion.div
            key="nickname"
            variants={nameVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-fit"
          >
            <h1 className="primary-gradient-text text-center font-mono font-bold text-4xl sm:text-5xl md:text-6xl tracking-wider italic">
              Cuboo
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
