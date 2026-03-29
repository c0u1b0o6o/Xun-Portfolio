import DragWindow from "@/components/DragWindow";
import { RiBallPenFill, RiInformationFill, RiMusicAiFill, RiPhoneFill, RiSettings3Fill } from "react-icons/ri";
import { NavButton } from "@/components/NavButton";
import { useSfx, useWindowContext } from "@/providers";
import { WindowId } from "@/types/window";
import { UI_CONSTANTS } from "@/constants";

export function WelcomeWindow(){
  // 創建播放點擊音效的函數 (已記憶化，考慮靜音和音量設定)
  const playClickSfx = useSfx("/sfx/open.mp3", UI_CONSTANTS.DEFAULT_VOLUME);
  const { toggleWindow } = useWindowContext();
  const handleOnClick = (windowId:WindowId) => {
    return () => {
      toggleWindow(windowId);
      playClickSfx();
    };
  }

  return (
      <DragWindow title="Welcome." id="welcome">
        <div className="select-none px-6 py-10 sm:px-8 sm:pt-8 sm:pb-4 text-center w-full">
          <h1 className="ml-0 sm:ml-3 w-full font-mono font-display font-bold text-5xl sm:text-5xl md:text-7xl italic">
            hi. i'm <span className="primary-gradient-text inline-block">Xun.</span>
          </h1>
          <div className="w-full h-4 sm:h-2" />
            <h1 className="w-full font-mono font-display font-normal text-xl sm:text-xl md:text-2xl">
              You can take a look!
            </h1>
          <div className="mt-8 sm:mt-4 w-full grid grid-cols-2 sm:grid-cols-5 items-center justify-center gap-3 sm:gap-2">
            {/* I need some navbutton, icon is above and title below */}
            <NavButton icon={RiInformationFill} title="about" onClick={handleOnClick("about")} />
            <NavButton icon={RiPhoneFill} title="contact" onClick={handleOnClick("contact")} />
            <NavButton icon={RiSettings3Fill} title="setting" onClick={handleOnClick("setting")} />
            <NavButton icon={RiMusicAiFill} title="player" onClick={handleOnClick("musicplayer")} />
            <NavButton icon={RiBallPenFill} title="blog" onClick={handleOnClick("blog")} />
          </div>
        </div>
      </DragWindow>
  )
}