import {
  RiSkipForwardFill,
  RiSkipBackFill,
  RiPlayFill,
  RiPauseFill,
} from "react-icons/ri";
import DragWindow from "@/components/DragWindow";
import { useMusicContext } from "@/providers/musicProvider";
import { useEffect, useState, useRef } from "react";

export function MusicPlayerWindow() {
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    nextTrack,
    prevTrack,
    audioRef,
  } = useMusicContext();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const isScrubbingRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (!isScrubbingRef.current) {
        setProgress(audio.currentTime);
      }
    };
    const updateDuration = () => setDuration(audio.duration);

    // Add listeners
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    // Initial sync
    if (!isScrubbingRef.current) {
      setProgress(audio.currentTime);
    }
    setDuration(audio.duration || 0);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [audioRef.current, currentTrack]); // 重新綁定當音軌更新時

  // [AI更動] 修改型別以同時支援 onChange 與 onInput 的事件類型
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLInputElement>) => {
    setProgress(Number(e.currentTarget.value));
  };

  const handleSeekCommit = () => {
    if (!isScrubbingRef.current) return;
    if (!audioRef.current) return;
    audioRef.current.currentTime = progress;
    isScrubbingRef.current = false;

    // 如果目前播放播放狀態，則在拖曳改變時間後強制重新觸發播放
    // 以避免某些瀏覽器在手動設定 currentTime 時自動切換為暫停狀態
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((e) => console.warn("Seek play prevented:", e));
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <DragWindow title="MusicPlayer." id="musicplayer">
      <div className="flex flex-col gap-5 w-full sm:w-64 select-none">
        {/* Track Info */}
        <div className="flex flex-col items-center justify-center text-center mt-2">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-ink-900 bg-clip-text">
            {currentTrack.title}
          </h2>
          <p className="text-sm font-mono text-ink-500 opacity-80 mt-1">
            {currentTrack.author}
          </p>
        </div>

        {/* Progress Bar & Time */}
        <div className="flex flex-col gap-2 w-full px-2">
          <div className="relative w-full h-4 flex items-center justify-center group">
            {/* 底部未填滿的實體線色 */}
            <div className="absolute w-full h-1.5 bg-ink-200 rounded-full transition-colors group-hover:bg-ink-300" />

            {/* 已填滿的進度線色 */}
            <div
              className="absolute left-0 h-1.5 bg-ink-900 rounded-full pointer-events-none"
              style={{
                width: `${duration > 0 ? (progress / duration) * 100 : 0}%`,
              }}
            />

            {/* 拖曳的那顆圓球 */}
            <div
              className="absolute h-3.5 w-3.5 bg-ink-900 rounded-full pointer-events-none shadow-sm shadow-black/20"
              style={{
                left: `calc(${duration > 0 ? (progress / duration) * 100 : 0}% - 7px)`,
              }}
            />

            {/* 透明的原生 input range 用來承接所有事件 */}
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={progress}
              onChange={handleSeekChange}
              // [AI更動] 加入 onInput 以便在手機端拖動時即時更新進度，而不是放開才更新
              onInput={handleSeekChange}
              onPointerDown={(e) => {
                e.stopPropagation();
                isScrubbingRef.current = true;
              }}
              onPointerUp={handleSeekCommit}
              onPointerCancel={handleSeekCommit}
              onMouseUp={handleSeekCommit}
              // [AI更動] 加入 onTouchEnd 來確保在手機上放開時能確實 commit 變更
              onTouchEnd={handleSeekCommit}
              className="absolute w-full h-full opacity-0 cursor-pointer z-10"
              // [AI更動] 加入 touchAction: 'none' 防止在手機上左用滑動時觸發瀏覽器的原生捲動/返回行為
              style={{ touchAction: 'none' }}
            />
          </div>

          {/* Time Texts */}
          <div className="flex justify-between w-full text-xs font-mono text-ink-500 opacity-80 px-1">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-row items-center justify-center gap-6 mb-2">
          <button
            onClick={prevTrack}
            className="p-2 rounded-full hover:bg-surface-base hover:scale-110 active:scale-95 transition-all duration-200 text-ink-900"
          >
            <RiSkipBackFill size={35} />
          </button>

          <button
            onClick={togglePlayPause}
            className="p-3 bg-ink-900 text-surface-base rounded-full hover:scale-110 shadow-xl active:scale-95 transition-all duration-200"
          >
            {isPlaying ? (
              <RiPauseFill size={40} />
            ) : (
              <RiPlayFill size={40} />
            )}
          </button>

          <button
            onClick={nextTrack}
            className="p-2 rounded-full hover:bg-surface-base hover:scale-110 active:scale-95 transition-all duration-200 text-ink-900"
          >
            <RiSkipForwardFill size={35} />
          </button>
        </div>
      </div>
    </DragWindow>
  );
}
