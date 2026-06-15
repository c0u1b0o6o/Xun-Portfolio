"use client";

import DragWindow from "@/components/DragWindow";
import { UI_CONSTANTS } from "@/components/constants";
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
    <DragWindow title="About." id="about" className="sm:min-w-2xl">
      {/* 上半部：頭像與名稱展示 */}
      <div className="mb-3 flex flex-col sm:flex-row w-full justify-center sm:justify-start items-center gap-4 sm:gap-y-7 p-4 sm:p-5">
        <div className="shrink-0 sm:mr-2">
          <GifAvatar imageScale={1.5} offsetY={20} offsetX={-5} />
        </div>
        <div className="flex flex-col items-center sm:items-start gap-3 sm:gap-4 sm:ml-2">
          <NameDisplay />
          <p className="text-center sm:text-start sm:ml-5">
            Major in CS but can only{" "}
            <span className="font-bold text-lg sm:text-xl md:text-2xl">
              VIBING
            </span>
            .
            <br />I think im{" "}
            <span className="font-bold text-lg sm:text-xl md:text-2xl">
              COOKED
            </span>
            .
          </p>
        </div>
      </div>

      {/* 下半部：詳細資訊滾動區 */}
      <div className="text-start mt-2 flex max-h-81.25 overflow-y-auto justify-start w-full flex-col gap-4 p-5">
        <p className="w-full text-start">Hey, it's me. I am...</p>
        {/* I dont like li and ui */}
        <p className="mt-2 ml-4 list-disc list-inside text-start space-y-1">
          • Frontend Learner:
          <span className="font-bold ml-2">Nextjs,</span>
          <span className="text-blue-300 font-bold ml-2">Tailwind CSS,</span>
          <span className="text-blue-400 font-bold ml-2">TS</span>.
          <br />• <span className="text-bright-amber font-bold">
            Python
          </span>{" "}
          Enjoyer.
          <br />
          • Watching brainrot shit posts everyday.
          <br />
          • Grade Cooker. I dont want to study bro🥀🥀
          <br />• ACT Lover, especially Silksong, ZZZ, Monster Hunter.
        </p>

        <h1 className="mt-3 text-3xl">Education</h1>
        <div className="border-l-2 border-ink-700/30 pl-4 flex flex-col gap-3">
          <p className="text-ink-700">
            National Taiwan University Science and Technology
            <br />
            <label>CSIE Department</label>
          </p>
          <p className="text-ink-700">
            Taichung Municipal Taichung Industrial High School
            <br />
            <label>IT Department</label>
          </p>
        </div>

        <h1 className="mt-3 text-3xl">
          <label className="text-sm font-normal text-ink-700 mr-3">
            (plssssss :3)
          </label>
          SAY HI TO ME
        </h1>
        <div className="flex flex-col gap-4">
          <p>
            I’m too shy to text first, but if you don't mind my chaotic energy,
            I will literally be your best friend forever. (no cap🥀🥀).
          </p>
        </div>

        <CopyButton
          textToCopy={"cuboo"}
          displayText={"Copy my username and ADD ME ON DISCORD!"}
          feedbackDuration={UI_CONSTANTS.COPY_FEEDBACK_DURATION}
        />

        {/* HACK: Minion Image */}
        <div className="py-2">
          <Image
            src="/img/minion.png"
            alt="Minion"
            width={100}
            height={100}
            priority={true}
            className="object-contain"
          />
        </div>

        <h1 className="mt-3 text-3xl">Shout Out</h1>
        <div className="border-l-2 border-ink-700/30 pl-4">
          <ExternalLink href="https://www.sharyap.com/" variant="large">
            shar's desktop
          </ExternalLink>
          <p className="mt-2 text-ink-700">
            This portfolio UI/UX inspired by hers. It's so cool and aesthetic,
            and I want to make one for myself. So here we are.
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-2 text-lg">
          <ExternalLink
            href="https://github.com/c0u1b0o6o/Xun-Portfolio"
            variant="minimal"
          >
            CHECK THE SRC ON GITHUB!
          </ExternalLink>
          <p className="text-ink-700 leading-relaxed opacity-70 ">
            (I knew there're a lot of AI slot in src, i'll rewrite it later.
            <br />
            Dont judge me.😭😭😭
            <br />
            update(26/6/15): nah, i wont fix ts anymore.
          </p>
        </div>
      </div>
    </DragWindow>
  );
}
