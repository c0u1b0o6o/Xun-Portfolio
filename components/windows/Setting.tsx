// AI GENERATED
import DragWindow from "../DragWindow";
import {
  RiRefreshLine,
} from "react-icons/ri";
import { MdMusicNote } from "react-icons/md";
import { RiVolumeUpFill } from "react-icons/ri";
import { useSfxContext } from "@/providers/sfxProvider";
import { useWindowContext } from "@/providers/windowProvider";
import { useMusicContext } from "@/providers/musicProvider";
import { RangeSlider } from "../RangeSlider";

export function SettingWindow() {
  const { isSfxMuted, sfxVolume, setSfxVolume } = useSfxContext();
  const { isPlaying, musicVolume, setMusicVolume } = useMusicContext();
  const { resetWindows } = useWindowContext();

  return (
    <DragWindow title="Setting." id="setting">
      <div className="flex flex-col gap-6 p-4 w-72 select-none">
        {/* Music Volume Control */}
        <RangeSlider
          value={musicVolume || 0.5}
          onChange={setMusicVolume}
          label={
            <span className="flex items-center gap-2">
              <MdMusicNote size={18} />
              <h1>BGM</h1>
            </span>
          }
          stopPropagation
        />

        {/* SFX Volume Control */}
        <RangeSlider
          value={sfxVolume || 0.5}
          onChange={setSfxVolume}
          label={
            <span className="flex items-center gap-2">
              <RiVolumeUpFill size={18} />
              <h1>SFX</h1>
            </span>
          }
          stopPropagation
        />

        {/* Reset Action */}
        <button
          onClick={resetWindows}
          className="flex items-center gap-2 font-bold w-full justify-center rounded-lg hover:scale-[1.02] hover:text-spicy-paprika active:scale-[0.98] transition-all"
        >
          <RiRefreshLine size={25} />
          <h1 className="hover:text-spicy-paprika active:scale-[0.98] transition-all">
            RESET WINDOWS
          </h1>
        </button>
      </div>
    </DragWindow>
  );
}

export function SettingButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className="flex flex-col items-center justify-center gap-2 rounded-lg hover:scale-110 active:scale-95 transition-transform duration-200"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
