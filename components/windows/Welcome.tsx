import DragWindow from "../DragWindow";
import { RiBallPenFill, RiInformationFill, RiMusicAiFill, RiPhoneFill, RiSettings3Fill } from "react-icons/ri";
import { NavButton } from "../NavButton";
import { useSfx, useWindowContext } from "@/providers";
import { WindowId } from "@/types/window";
import { UI_CONSTANTS } from "@/constants";

export function WelcomeWindow(){
  const playClickSfx = useSfx("/sfx/click.wav", UI_CONSTANTS.DEFAULT_VOLUME);
  const { toggleWindow } = useWindowContext();
  const handleOnClick = (windowId:WindowId) => {
    return () => {
      toggleWindow(windowId);
      playClickSfx();
    };
  }

  return (
      <DragWindow title="Welcome." id="welcome">
        <div className="select-none px-8 pt-8 text-center">
          <h1 className="ml-3 w-full font-mono font-display font-bold text-7xl italic">
            hi. i'm <span className="primary-gradient-text inline-block">Xun.</span>
          </h1>
          <div className="w-full h-2" />
            <h1 className="w-full font-mono font-display font-normal text-2xl">
              You can take a look!
            </h1>
          <div className="mt-4 w-full grid grid-cols-5 items-center justify-center gap-2">
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