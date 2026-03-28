import DragWindow from "../DragWindow";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { NavButton } from "../NavButton";
import { useSfx, useWindowContext } from "@/providers";
import { WindowId } from "@/types/window";

export function WelcomeWindow(){
  const playClickSfx = useSfx("/sfx/click.wav", 0.5);
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
          <div className="mt-2 w-full flex items-center justify-center gap-4">
            {/* I need some navbutton, icon is above and title below */}
            <NavButton icon={BsFillInfoCircleFill} title="about" onClick={handleOnClick("about")} />
            <NavButton icon={IoCall} title="contact" onClick={handleOnClick("contact")} />
            <NavButton icon={IoMdSettings} title="setting" onClick={handleOnClick("setting")} />
          </div>
        </div>
      </DragWindow>
  )
}