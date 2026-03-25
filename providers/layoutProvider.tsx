'use client';
// AI GENERATED
import { createContext, useContext, RefObject } from 'react';

// 定義 Context 的型別
const LayoutContext = createContext<RefObject<HTMLDivElement | null> | null>(null);

// 建立一個自定義 Hook 方便之後調用
export const useDesktopConstraints = () => useContext(LayoutContext);

export function LayoutProvider({ 
  children, 
  value 
}: { 
  children: React.ReactNode; 
  value: RefObject<HTMLDivElement | null>;
}) {
  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}