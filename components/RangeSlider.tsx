/**
 * RangeSlider - 統一的音量/進度滑塊組件
 * 
 * 聚合 Setting.tsx 和 MusicPlayer.tsx 中重複的滑塊 HTML 和邏輯
 * 支持音量、進度條、自定義範圍等多種用途
 */

import { ReactNode } from 'react';

export interface RangeSliderProps {
  /** 當前值 (0-1 或 0-max) */
  value: number;
  /** 值改變回調 */
  onChange: (value: number) => void;
  /** 最大值 */
  max?: number;
  /** 最小值 */
  min?: number;
  /** 步進值 */
  step?: number;
  /** 滑塊容器額外 className */
  className?: string;
  /** 滑塊軌道額外 className */
  trackClassName?: string;
  /** 是否在 pointerDown 時停止事件傳播（用於拖動窗口時） */
  stopPropagation?: boolean;
  /** 可選的 label */
  label?: ReactNode;
  /** label 容器額外 className */
  labelClassName?: string;
}

/**
 * 計算進度百分比
 */
function getProgressPercent(value: number, min: number, max: number): number {
  const range = max - min;
  return range === 0 ? 0 : ((value - min) / range) * 100;
}

/**
 * RangeSlider 組件
 * 使用自定義樣式和透明 input 的標準滑塊組件
 */
export function RangeSlider({
  value,
  onChange,
  max = 1,
  min = 0,
  step = 0.01,
  className = 'relative h-6 flex items-center group',
  trackClassName = 'absolute w-full h-1.5 bg-ink-100 rounded-full group-hover:bg-ink-200 transition-colors',
  stopPropagation = true,
  label,
  labelClassName = 'text-sm font-bold text-ink-900 flex items-center gap-2',
}: RangeSliderProps) {
  const progressPercent = getProgressPercent(value, min, max);
  const thumbLeft = `calc(${progressPercent}% - 7px)`;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className="flex items-center justify-between">
          <span className={labelClassName}>{label}</span>
        </div>
      )}
      <div
        onPointerDown={(e) => {
          if (stopPropagation) e.stopPropagation();
        }}
        className={className}
      >
        {/* 軌道背景 */}
        <div className={trackClassName} />

        {/* 進度色塊 */}
        <div
          className="absolute h-1.5 bg-ink-900 rounded-full pointer-events-none"
          style={{ width: `${progressPercent}%` }}
        />

        {/* 拉鈕 */}
        <div
          className="absolute h-3.5 w-3.5 bg-ink-900 rounded-full shadow-sm pointer-events-none"
          style={{ left: thumbLeft }}
        />

        {/* 真正的透明 Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
        />
      </div>
    </div>
  );
}
