// AI GENERATED
/**
 * UI 相關的魔法常數
 * 包括：動畫持續時間、超時時間、預設音量等
 */

// 為了避免過度的類型檢查，某些 Web Audio API 操作可能需要 as any
export const UI_CONSTANTS = {
  // 預設音量
  DEFAULT_VOLUME: 0.5,

  // 複製到剪貼板的超時時間（毫秒）
  COPY_FEEDBACK_DURATION: 2000,

  // 錯誤提示持續時間（毫秒）
  ERROR_MESSAGE_DURATION: 3000,

  // 拖動窗口動畫常數
  DRAG_ANIMATION: {
    // 拖動時的縮放比例
    SCALE_WHILE_DRAGGING: 1.05,
    // 拖動時的過渡持續時間（秒）
    TRANSITION_DURATION: 0.15,
    // 拖動阻力（越小越快到達目標位置）
    MOMENTUM_POWER: 0.2,
    // 拖動時間常數（毫秒）
    MOMENTUM_TIME_CONSTANT: 300,
  },

  // 視窗動畫常數
  WINDOW_ANIMATION: {
    // 打開視窗時的過度動畫
    OPEN_SCALE: 1,
    OPEN_OPACITY: 1,
    CLOSE_SCALE: 0.8,
    CLOSE_OPACITY: 0,
    // 打開/關閉視窗的過渡持續時間（秒）
    TRANSITION_DURATION: 0.2,
  },

  // 反饋動畫
  FEEDBACK_ANIMATION: {
    SCALE: 0.8,
    DURATION: 0.25,
  },

  // 名稱顯示的動畫和切換
  NAME_DISPLAY: {
    // 名稱自動切換間隔（毫秒）
    AUTO_SWITCH_INTERVAL: 3000,
    // 名稱動畫進入持續時間（秒）
    ENTER_DURATION: 0.25,
    // 名稱動畫退出持續時間（秒）
    EXIT_DURATION: 0.2,
  },
} as const;

export type UIConstants = typeof UI_CONSTANTS;
