// AI GENERATED
import DragWindow from "../DragWindow";
import {
  RiVolumeUpFill,
  RiVolumeMuteFill,
  RiRefreshLine,
} from "react-icons/ri";
import { MdMusicNote, MdMusicOff } from "react-icons/md";
import { useSfxContext } from "@/providers/sfxProvider";
import { useWindowContext } from "@/providers/windowProvider";
import { useMusicContext } from "@/providers/musicProvider";

export function SettingWindow() {
  const { isSfxMuted, sfxVolume, setSfxVolume } = useSfxContext();
  const { isPlaying, musicVolume, setMusicVolume } = useMusicContext();
  const { resetWindows } = useWindowContext();

  return (
    <DragWindow title="Setting." id="setting">
      <div className="flex flex-col gap-6 p-4 w-72 select-none">
        {/* Music Volume Control */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-ink-900 flex items-center gap-2">
              <MdMusicNote size={18} />
              <h1>BGM</h1>
            </span>
          </div>
          <div
            onPointerDown={(e) => e.stopPropagation()}
            className="relative h-6 flex items-center group"
          >
            {/* 軌道背景 */}
            <div className="absolute w-full h-1.5 bg-ink-100 rounded-full group-hover:bg-ink-200 transition-colors" />
            {/* 進度色塊 */}
            <div
              className="absolute h-1.5 bg-ink-900 rounded-full pointer-events-none"
              style={{ width: `${musicVolume * 100}%` }}
            />
            {/* 拉鈕 */}
            <div
              className="absolute h-3.5 w-3.5 bg-ink-900 rounded-full shadow-sm pointer-events-none"
              style={{ left: `calc(${musicVolume * 100}% - 7px)` }}
            />
            {/* 真正的透明 Input */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={musicVolume}
              onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
            />
          </div>
        </div>

        {/* SFX Volume Control */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-ink-900 flex items-center gap-2">
              <RiVolumeUpFill size={18} />
              <h1>SFX</h1>
            </span>
          </div>
          <div
            onPointerDown={(e) => e.stopPropagation()}
            className="relative h-6 flex items-center group"
          >
            <div className="absolute w-full h-1.5 bg-ink-100 rounded-full group-hover:bg-ink-200 transition-colors" />
            <div
              className="absolute h-1.5 bg-ink-900 rounded-full pointer-events-none"
              style={{ width: `${sfxVolume * 100}%` }}
            />
            <div
              className="absolute h-3.5 w-3.5 bg-ink-900 rounded-full shadow-sm pointer-events-none"
              style={{ left: `calc(${sfxVolume * 100}% - 7px)` }}
            />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={sfxVolume}
              onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
            />
          </div>
        </div>

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
