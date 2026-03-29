import DragWindow from "@/components/DragWindow";
import {
  RiRefreshLine,
} from "react-icons/ri";
import { MdMusicNote } from "react-icons/md";
import { RiVolumeUpFill } from "react-icons/ri";
import { useSfx, useSfxContext } from "@/providers/sfxProvider";
import { useWindowContext } from "@/providers/windowProvider";
import { useMusicContext } from "@/providers/musicProvider";
import { RangeSlider } from "@/components/RangeSlider";
import { SFX_ASSETS } from "@/constants/sfx";

export function SettingWindow() {
  const { isSfxMuted, sfxVolume, setSfxVolume, mutedSfx, toggleSfxMuteByPath } = useSfxContext();
  const { isPlaying, musicVolume, setMusicVolume } = useMusicContext();
  const { resetWindows } = useWindowContext();
  const playPipeSfx = useSfx("/sfx/mental_pipe.mp3", 0.1);
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
              <p className="text-lg font-mono">bgm</p>
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
              <p className="text-lg font-mono">sfx</p>
            </span>
          }
          stopPropagation
        />

        {/* Individual SFX Mute Controls */}
        <h1 className="text-2xl font-bold">Mute Effects</h1>
          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
            {Object.entries(SFX_ASSETS).map(([key, path]) => (
              <div key={key} className="flex items-center gap-3 justify-between">
                <span className="text-sm">{key}</span>
                <input
                  type="checkbox"
                  checked={(mutedSfx ?? {})[path] ?? false}
                  onChange={() => toggleSfxMuteByPath(path as any)}
                  className="w-4 h-4 cursor-pointer"
                />
              </div>
            ))}
          </div>

        {/* Reset Action */}
        <button
          onClick={() => {
            resetWindows();
            playPipeSfx();
          }}
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
