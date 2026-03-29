'use client';

import { useState, useEffect } from 'react';

/**
 * useMediaQuery - 媒體查詢 Hook
 * 
 * 監聽瀏覽器的媒體查詢變化，回傳是否匹配
 * 用於響應式設計中的條件渲染和行為切換
 * 
 * @param query - CSS 媒體查詢字串，例如 '(max-width: 640px)'
 * @returns boolean - 是否匹配該媒體查詢
 * 
 * @example
 * const isMobile = useMediaQuery('(max-width: 640px)');
 * const isTablet = useMediaQuery('(max-width: 1024px)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // 初始化時立即同步狀態
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

/** 預定義的斷點常數 */
export const BREAKPOINTS = {
  MOBILE: '(max-width: 640px)',
  TABLET: '(max-width: 1024px)',
} as const;
