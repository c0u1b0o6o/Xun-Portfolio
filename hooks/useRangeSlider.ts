/**
 * useRangeSlider - 統一的音量/進度滑塊 Hook
 * 
 * 提供：軌道、進度條、拉鈕的位置計算和事件處理
 * 用於替代 Setting.tsx 和 MusicPlayer.tsx 中重複的滑塊邏輯
 */

interface RangeSliderConfig {
  min?: number;
  max?: number;
  step?: number;
}

interface RangeSliderState {
  /** 軌道寬度百分比 (0-100) */
  progressPercent: number;
  /** 拉鈕左位移 (css calc 計算式) */
  thumbLeft: string;
}

/**
 * 計算滑塊的視覺狀態
 * @param value 當前值
 * @param max 最大值
 * @returns 進度百分比和拉鈕位置
 */
export function useRangeSlider(
  value: number,
  max: number = 1,
  config: RangeSliderConfig = {}
): RangeSliderState {
  const { min = 0 } = config;
  
  // 正規化值到 0-100
  const range = max - min;
  const normalized = range === 0 ? 0 : ((value - min) / range) * 100; // Make the value be percent, the result might be bigger or smaller than 0-100, it depends on what the input value is, so , we need to clamp it.
  const clampedPercent = Math.max(0, Math.min(100, normalized)); // Clamp to 0-100
  
  return {
    progressPercent: clampedPercent,
    thumbLeft: `calc(${clampedPercent}% - 7px)`, // -7px 是拉鈕寬度的一半 (14px/2)
  };
}

/**
 * 計算滑塊拖拽後的新值
 * @param clientX 滑鼠 X 坐標
 * @param containerRect 容器的 bounding rect
 * @param max 最大值
 * @param min 最小值 (預設 0)
 * @returns 新值
 */
export function calculateRangeValue(
  clientX: number,
  containerRect: DOMRect,
  max: number,
  min: number = 0
): number {
  const relativeX = clientX - containerRect.left;
  const percent = Math.max(0, Math.min(100, (relativeX / containerRect.width) * 100));
  return min + (percent / 100) * (max - min);
}
