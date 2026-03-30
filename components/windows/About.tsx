'use client';

import DragWindow from "@/components/DragWindow";
import { UI_CONSTANTS } from "@/constants";
import NameDisplay from "@/components/windows/NameDisplay";
import { GifAvatar } from "@/components/windows/Avatar";
import { ExternalLink } from "@/components/ExternalLink";
import { CopyButton } from "../CopyButton";
import Image from "next/image";
/**
 * AboutWindow - 關於我的視窗組件
 * 
 * 展示用戶信息：頭像、名稱、教育背景、興趣愛好
 * 組合了 NameDisplay 和 GifAvatar 子組件
 */
export function AboutWindow() {
    return (
        <DragWindow title="About." id="about" className="max-w-2xl">
            <div className="mb-3 flex w-full justify-start items-center gap-y-7 p-5">
                <div className="shrink-0 mr-2">
                    <GifAvatar imageScale={1.5} offsetY={20} offsetX={-5}/>
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
                <h1 className="mt-3 text-3xl">
                    <label className="text-sm font-normal text-ink-700">(get in)</label>TOUCH ME???
                </h1>
                <p>
                    Feel free to say hi to me!<br/>
                    I keep it lowkey bruh.<br/>
                    I need some homies now.😭😭😭<br/>
                </p>
                <p>
                    I dont know how to rizz a friend, if you're down to my homie, that's a W. No Cap bruh🥀🥀.
                </p>
                <CopyButton
                    textToCopy={"cuboo"}
                    displayText={"Copy my username ADD ME ON DISCORDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD"}
                    feedbackDuration={UI_CONSTANTS.COPY_FEEDBACK_DURATION}
                />
                <h1 className="mt-3 text-3xl">
                    SPIRIT
                </h1>
                    <div className="p-3 bg-black/20 rounded border border-white/5 font-mono text-sm">
                    <p className="text-red-400">{'[CRITICAL]'} ENGLISH: COOKED</p>
                    <p className="text-red-400">{'[CRITICAL]'} GPA: COOKED</p>
                    <p className="text-red-400">{'[CRITICAL]'} LIFE: COOKED</p>
                    </div>
                <p>
                    Jealous of naturals, too lazy with myself.<br/>
                    But I'm still in the game, I'll back to the grind.
                </p>
                {/* HACK: just put a image here, i dont want to make a separate component for it */}
                <Image src="/img/minion.png" alt="Minion" width={100} height={100} priority={true} />

                <h1 className="mt-3 text-3xl">
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
                    CHECK THE SRC ON GITHUB!
                </ExternalLink>
                <p className="text-ink-700 text-sm">
                    (I knew there're a lot of AI slot in src, i'll rewrite it later.<br/> Dont judge me.😭😭😭
                    <br/>
                    Btw, git history is a mess, i knew it, im sorry....😭.
                </p>
            </div>
        </DragWindow>
    )
}