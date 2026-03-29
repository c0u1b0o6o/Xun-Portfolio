'use client';

import DragWindow from "@/components/DragWindow";
import { UI_CONSTANTS } from "@/constants";
import NameDisplay from "@/components/windows/NameDisplay";
import { GifAvatar } from "@/components/windows/Avatar";
import { ExternalLink } from "@/components/ExternalLink";

/**
 * AboutWindow - 關於我的視窗組件
 * 
 * 展示用戶信息：頭像、名稱、教育背景、興趣愛好
 * 組合了 NameDisplay 和 GifAvatar 子組件
 */
export function AboutWindow() {
    return (
        <DragWindow title="About." id="about" className="max-w-[calc(100vw-2rem)] sm:max-w-2xl">
            <div className="mb-3 flex flex-col sm:flex-row w-full justify-center sm:justify-start items-center gap-4 sm:gap-y-7 p-4 sm:p-5">
                <div className="shrink-0 sm:mr-2">
                    <GifAvatar imageScale={1.5} offsetY={20} offsetX={-5}/>
                </div>
                <div className="flex flex-col items-center sm:items-start gap-3 sm:gap-4 sm:ml-2">
                    <NameDisplay />
                    <p className="text-center sm:text-start text-sm sm:text-base md:text-xl sm:ml-5">
                        Major in CS but can only <span className="font-bold text-lg sm:text-xl md:text-2xl">VIBING</span>.
                        <br />
                        I think im <span className="font-bold text-lg sm:text-xl md:text-2xl">COOKED</span>.
                    </p>
                </div>
            </div>
            <div className="text-center sm:text-start mt-2 flex max-h-81.25 overflow-y-auto justify-start w-full flex-col gap-3 sm:gap-4 p-4 sm:p-5">
                <p className="w-full text-start">
                    Hey, it's me. I am...
                </p>
                <ul className="mt-2 ml-4 list-disc list-inside text-start text-sm sm:text-base md:text-lg">
                    <li>Frontend Learner:
                        <span className="text-base sm:text-lg md:text-xl font-bold ml-2">Nextjs,</span>
                        <span className="text-blue-300 text-base sm:text-lg md:text-xl font-bold ml-2">Tailwind CSS,</span>
                        <span className="text-blue-400 text-base sm:text-lg md:text-xl font-bold ml-2">TS</span>.
                    </li>
                    <li><span className="text-bright-amber text-base sm:text-lg md:text-xl font-bold">Python</span> Enjoyer.</li>
                    <li>Watching brainrot shit posts everyday.</li>
                    <li>Grade Cooker. I dont want to study bro🥀🥀</li>
                    <li>ACT Lover, especially Silksong, ZZZ, Monster Hunter.</li>
                </ul>
                <h1 className="mt-3 text-2xl sm:text-3xl">
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
                <h1 className="mt-3 text-2xl sm:text-3xl">
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
                <h1 className="mt-3 text-2xl sm:text-3xl">
                    Shout Out
                </h1>
                <div className="border-l-2 pl-4">
                    <ExternalLink 
                      href="https://www.sharyap.com/"
                      variant="large"
                    >
                        shar's desktop
                    </ExternalLink>
                    <p className="">
                    This portfolio UI/UX inspired by hers.
                    It's so cool and aesthetic, and I want to make one for myself. So here we are.
                    </p>
                </div>
                <ExternalLink 
                    href="https://github.com/c0u1b0o6o/Xun-Portfolio"
                    variant="minimal" 
                    className="mt-4"
                >
                    CHECK MY PORTFOLIO SOURCE CODE ON GITHUB!
                </ExternalLink>
            </div>
        </DragWindow>
    )
}