'use client';
//FIXME: This file is shit. Need to refactor. Ill do it later.
import { useEffect, useState } from "react";
import DragWindow from "../DragWindow";
import { UI_CONSTANTS } from "@/constants";

export function AboutWindow() {
    return (
        <DragWindow title="About." id="about" className="max-w-2xl">
            <div className="mb-3 flex w-full justify-start items-center gap-y-7 p-5">
                <div className="shrink-0 mr-2">
                    <GifAvatar />
                </div>
                <div className="flex flex-col gap-4 ml-2">
                    <NameDisplay />
                    <p className="text-start ml-5">
                        Major in CS but can only <span className="font-bold text-2xl">VIBING</span>.
                        <br />
                        I think im <span className="font-bold text-2xl">COOKED</span>.
                    </p>
                </div>
            </div>
            <div className="text-start mt-2 flex max-h-81.25 overflow-y-auto justify-start w-full flex-col gap-4 p-5">
                <p className="w-full text-start">
                    Hey, it's me. I am...
                </p>
                <ul className="mt-2 ml-4 list-disc list-inside text-start text-lg">
                    <li>Frontend Learner:
                        <span className="text-xl font-bold ml-2">Nextjs,</span>
                        <span className="text-blue-300 text-xl font-bold ml-2">Tailwind CSS,</span>
                        <span className="text-blue-400 text-xl font-bold ml-2">TS</span>.
                    </li>
                    <li><span className="text-bright-amber text-xl font-bold">Python</span> Enjoyer.</li>
                    <li>Watching brainrot shit posts everyday.</li>
                    <li>Grade Cooker. I dont want to study bro🥀🥀</li>
                    <li>ACT Lover, especially Silksong, ZZZ, Monster Hunter.</li>
                </ul>
                <h1 className="mt-3 text-3xl">
                    Education
                </h1>
                <div className="border-l-2 pl-4">
                    <p className="text-ink-700">
                        National Taiwan University Science and Technology
                        <br />
                        CSIE Department
                    </p>
                </div>
                <div className="border-l-2 pl-4">
                    <p className="text-ink-700">
                        Taichung Municipal Taichung Industrial High School
                        <br />
                        IT Department
                    </p>
                </div>
                <p className="mt-4 w-full text-start">
                    I'm Major in CS now but I can only Vibe Coding.<br />
                    But I'll keep learning and improving myself.
                    <br />
                    <span className="text-ink-700 text-sm">Maybe ..?</span>
                </p>
                <h1 className="mt-3 text-3xl">
                    Contributers
                </h1>
                <div className="border-l-2 pl-4">
                    <p>
                        Me, and AI.<br/>
                        And any cool open source community that I used in.
                    </p>
                </div>
                <div className="border-l-2 pl-4">
                    <p>
                        Thanks for all the libaries and resources that I can use for free to make ts shit🥀🥀🥀
                    </p>
                </div>
                <h1 className="mt-3 text-3xl">
                    Shout Out
                </h1>
                <div className="border-l-2 pl-4">
                    <a 
                    href="https://www.sharyap.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className=" text-tropical-teal hover:text-bright-amber transition-colors duration-300 underline text-2xl font-bold italic">
                        shar's desktop
                    </a>
                    <p className="">
                    This portfolio UI/UX inspired by hers.
                    It's so cool and aesthetic, and I want to make one for myself. So here we are.
                    </p>
                </div>
                <a 
                    href="https://github.com/c0u1b0o6o/Xun-Portfolio" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 inline-block font-bold text-tropical-teal hover:text-bright-amber transition-colors duration-300 underline"
                >
                    CHECK MY PORTFOLIO SOURCE CODE ON GITHUB!
                </a>
            </div>
        </DragWindow>
    )
}


export function NameDisplay() {
    const [toggleName, setToggleName] = useState(true);
    const [isHover, setIsHover] = useState(false);
    const playClickSfx = useSfx("/sfx/click.wav", UI_CONSTANTS.DEFAULT_VOLUME);

    // auto switch name every 3 secs.
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

    // framer motion variants are like key frames in PR or CSS.
    // type:"spring" means it will have a spring animation
    // damping means how bouncy it is. More damping means less bouncy. 10 will make it jiggle some more. 25 will make it less jiggle.
    // stiffness means how fast it will move. Higher will make the jiggle faster. 1000 very fast.
    const nameVariants: Variants = {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { y: { duration: UI_CONSTANTS.NAME_DISPLAY.ENTER_DURATION, type: "spring", damping: 10, stiffness: 1000 } } },
        exit: { y: -20, opacity: 0, transition: { duration: UI_CONSTANTS.NAME_DISPLAY.EXIT_DURATION, ease: "easeIn" } },
    };

    return (
        <motion.div
            onClick={handleOnClick}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            whileHover={{ scale: 1.1 }}
            className="relative flex w-fit items-end justify-center cursor-pointer overflow-visible"
        >
            {/* Telling framer should let the old one exit first then new one come in */}
            <AnimatePresence mode="wait">

                {toggleName ? (
                    <motion.div
                        key="realName" // 唯一的 key
                        variants={nameVariants} // 使用上面定義的動畫
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="flex w-fit ml-2"
                    >
                        <h1 className="text-center font-mono font-bold text-6xl tracking-wider italic">MengXun</h1>
                        <h1 className="ml-2 font-montserrat font-extrabold text-6xl tracking-wider primary-gradient-text">Liu</h1>
                    </motion.div>
                ) : (
                    <motion.div
                        key="nickname" // 唯一的 key
                        variants={nameVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-fit"
                    >
                        <h1 className="primary-gradient-text text-center font-mono font-bold text-6xl tracking-wider italic">
                            Cuboo
                        </h1>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// AI GENERATED
//FIXME:
import Image from 'next/image';
import { useSfx } from "@/providers";
import { AnimatePresence, motion, Variant, Variants } from "framer-motion";
import DotGridBackground from '../DotGridBackground';

interface AvatarProps {
    src: string;          // 圖片路徑 (本地或遠端 URL)
    alt?: string;         // 替代文字
    size?: number;        // 大頭貼尺寸 (寬高相等)
    className?: string;   // 額外的 Tailwind 類別 (例如邊框)
}

export default function Avatar({
    src,
    alt = "",
    size = 64,
    className = ""
}: AvatarProps) {
    return (
        <div
            className={"relative overflow-hidden rounded-full shadow-md" + className}
            style={{ width: `${size}px`, height: `${size}px` }}
        >
            <Image
                src={src}
                alt={alt}
                fill
                sizes={`${size}px`}
                priority={size > 100}
                className="object-cover"
            />
        </div>
    );
}

interface PigeonAvatarProps {
    size?: number; // 外觀尺寸 (e.g., 96)
    imageScale?: number; // 圖片放大倍率 (e.g., 1.5)
    offsetX?: number; // 水平位移 (px)
    offsetY?: number; // 垂直位移 (px)
}

export function GifAvatar({
    size = 160,
    imageScale = 1.3, // 預設放大 1.3 倍
    offsetX = 15,     // 預設向左移 15px (因為鴿子可能偏右)
    offsetY = 0,      // 預設向上移 10px
}: PigeonAvatarProps) {
    return (
        // 1. 外層容器：負責定義圓形和裁切
        <div
            className="select-none relative overflow-hidden rounded-full border-5 border-ink-900 shadow-xl"
            style={{ width: `${size}px`, height: `${size}px` }}
        >
            <Image
                src="/gif/pigeon_doctor_walking.gif"
                alt="Pigeon Doctor Walking"
                fill
                unoptimized
                className="object-cover transition-transform duration-300"
                style={{
                    transform: `scale(${imageScale}) translate(${offsetX}px, ${offsetY}px)`,
                }}
            />
        </div>
    );
}