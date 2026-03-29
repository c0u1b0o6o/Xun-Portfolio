'use client';
import { useEffect, useRef, useCallback } from 'react';
import { useMusicContext } from '@/providers/musicProvider';

// --- 配置常量 ---
const CONFIG = {
  BAR_COUNT: 32,
  BAR_WIDTH_RATIO: 0.75,
  SMOOTHING: 0.85,
  MAX_HEIGHT_RATIO: 0.70, // 最大佔比限制
  AMP_FACTOR: 1.35,       // 高度放大係數
  FFT_SIZE: 64,           // BAR_COUNT * 2
};

// Properly typed AudioContext for webkit support
type AudioContextConstructor = { new(): AudioContext };

declare global {
  interface Window {
    webkitAudioContext?: AudioContextConstructor;
  }
}

export default function CavaVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const smoothedDataRef = useRef<number[]>(new Array(CONFIG.BAR_COUNT / 2).fill(0));
  const animFrameRef = useRef<number>(0);
  const inkColorRef = useRef<string>('#221e1f');


  const { isPlaying, audioRef } = useMusicContext();

  // 1. 處理顏色獲取 (封裝動態顏色邏輯)
  // 依賴：無 - 此函數只進行 DOM 查詢和本地狀態更新
  const updateInkColor = useCallback(() => {
    if (typeof window === 'undefined') return;
    const style = getComputedStyle(document.documentElement);
    const color = style.getPropertyValue('--color-ink-900').trim();
    
    if (color) {
      inkColorRef.current = color;
    } else {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      inkColorRef.current = isDark ? '#f5f5f7' : '#221e1f';
    }
  }, []);

  // 2. 音訊初始化 (單例模式)
  // 依賴：[audioRef] - 僅在 audioRef 變更時重新初始化
  // 注意：使用單例模式確保 AudioContext 只創建一次
  const initAudio = useCallback(() => {
    if (audioContextRef.current || !audioRef?.current) return;

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        console.warn('[Visualizer] Web Audio API not supported');
        return;
      }
      
      const ctx = new AudioContextClass();
      const analyser = ctx.createAnalyser();
      
      analyser.fftSize = CONFIG.FFT_SIZE;
      analyser.smoothingTimeConstant = 0.8;

      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);

      audioContextRef.current = ctx;
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

      if (ctx.state === 'suspended') {
        ctx.resume();
      }
    } catch (err) {
      console.warn('[Visualizer] Web Audio init failed:', err);
    }
  }, [audioRef]);

  // 3. 繪圖核心邏輯
  // 依賴：[isPlaying] - isPlaying 變更時更新繪圖邏輯
  // 原理：每一幀都會從 analyser 獲取頻率數據，計算平滑值，並在 canvas 上繪製
  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    const { width, height } = ctx.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    ctx.clearRect(0, 0, width, height);

    if (!analyserRef.current || !dataArrayRef.current || !isPlaying) return;

    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    if (!dataArray || !analyser || !isPlaying) return;

    analyser.getByteFrequencyData(dataArray as any);

    const halfCount = CONFIG.BAR_COUNT / 2;
    const barWidth = width / CONFIG.BAR_COUNT;
    const actualBarWidth = barWidth * CONFIG.BAR_WIDTH_RATIO;
    const gap = (barWidth - actualBarWidth) / 2;

    ctx.fillStyle = inkColorRef.current;

    for (let i = 0; i < halfCount; i++) {
      // 獲取並平滑數據
      const rawValue = dataArray[i] || 0;
      smoothedDataRef.current[i] = 
        smoothedDataRef.current[i] * CONFIG.SMOOTHING + rawValue * (1 - CONFIG.SMOOTHING);

      // 計算高度
      const normalized = (smoothedDataRef.current[i] / 255) * CONFIG.AMP_FACTOR;
      const constrainedHeight = Math.min(normalized * CONFIG.MAX_HEIGHT_RATIO, 1);
      const barHeight = Math.max(constrainedHeight * height, 2);

      // 繪製左半部 (從左向中心)
      ctx.fillRect(
        i * barWidth + gap,
        height - barHeight,
        actualBarWidth,
        barHeight
      );

      // 繪製右半部 (從右向中心，對稱)
      ctx.fillRect(
        width - (i + 1) * barWidth + gap,
        height - barHeight,
        actualBarWidth,
        barHeight
      );
    }
  }, [isPlaying]);

  // 4. 副作用：生命週期與事件監聽
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // --- 尺寸處理 ---
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      updateInkColor();
    };

    // --- 監聽處理 ---
    const colorMatch = window.matchMedia('(prefers-color-scheme: dark)');
    const interactionEvents = ['pointerdown', 'click', 'keydown', 'touchstart'];
    
    const onUserActive = () => {
      initAudio();
      
      // 確保如果 AudioContext 已經初始化但被瀏覽器 suspend，在此時嘗試喚醒
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      interactionEvents.forEach(e => document.removeEventListener(e, onUserActive));
    };

    window.addEventListener('resize', handleResize);
    colorMatch.addEventListener('change', updateInkColor);
    interactionEvents.forEach(e => document.addEventListener(e, onUserActive, { capture: true }));

    // --- 初始化執行 ---
    handleResize();
    updateInkColor();

    // --- 動畫循環 ---
    const renderLoop = () => {
      draw(ctx);
      animFrameRef.current = requestAnimationFrame(renderLoop);
    };
    animFrameRef.current = requestAnimationFrame(renderLoop);

    // --- 清理 ---
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      colorMatch.removeEventListener('change', updateInkColor);
      interactionEvents.forEach(e => document.removeEventListener(e, onUserActive));
    };
  }, [draw, initAudio, updateInkColor]);

  return (
    <canvas
      ref={canvasRef}
      className="selece-none fixed inset-0 w-full h-screen z-0 pointer-events-none mt-4"
      style={{ touchAction: 'none' }}
    />
  );
}