/**
 * useLocalStorage - 通用的 localStorage Hook，帶類型安全
 * 
 * 提供：get/set/remove localStorage、初始值、類型推斷
 * 用於替代 sfxProvider、musicProvider 中重複的 localStorage 邏輯
 */

import { useState, useEffect } from 'react';

interface UseLocalStorageOptions<T> {
    /** 初始值，如果 localStorage 沒有該鍵時使用 */
    initialValue?: T;
    /** 是否在挂載時同步 localStorage 的值 */
    syncOnMount?: boolean;
    /** 出錯時的回調 */
    onError?: (error: Error) => void;
}

interface UseLocalStorageReturn<T> {
    /** 當前值 */
    value: T | null;
    /** 設置新值到 state 和 localStorage */
    setValue: (value: T | ((prev: T | null) => T)) => void;
    /** 移除 localStorage 中的該鍵 */
    removeValue: () => void;
    /** 是否已初始化 */
    isLoaded: boolean;
}

/**
 * 使用 localStorage 儲存和管理狀態，自動同步
 * 
 * @typeParam T - 值的類型
 * @param key - localStorage 的鍵
 * @param options - 配置選項
 * @returns { value, setValue, removeValue, isLoaded }
 * 
 * @example
 * // 保存數字
 * const { value: volume, setValue: setVolume } = useLocalStorage<number>('sfxVolume', {
 *   initialValue: 0.5
 * });
 * 
 * // 保存布林值
 * const { value: isMuted, setValue: setIsMuted } = useLocalStorage<boolean>('isSfxMuted', {
 *   initialValue: false
 * });
 * 
 * // 使用
 * setVolume(0.8);  // 同時更新 state 和 localStorage
 */
export function useLocalStorage<T = string>(
    key: string,
    options: UseLocalStorageOptions<T> = {}
): UseLocalStorageReturn<T> {
    const { initialValue, syncOnMount = true, onError } = options;
    const [value, setValue] = useState<T | null>(initialValue ?? null);
    const [isLoaded, setIsLoaded] = useState(false);

    // 初始化：從 localStorage 讀取值
    useEffect(() => {
        if (!syncOnMount) {
            setIsLoaded(true);
            return;
        }

        try {
            const storedValue = localStorage.getItem(key);

            if (storedValue !== null) {
                const parsedValue = JSON.parse(storedValue) as T;
                setValue(parsedValue);
            } else if (initialValue !== undefined) {
                // 如果沒有存儲值但有初始值，寫入 localStorage
                localStorage.setItem(key, JSON.stringify(initialValue));
                setValue(initialValue);
            }

            setIsLoaded(true);
        } catch (error) {
            const err = error instanceof Error ? error : new Error(String(error));
            onError?.(err);
            setIsLoaded(true);
        }
    }, [key, syncOnMount]);

    // 同步更新：setValue 時自動持久化到 localStorage
    const handleSetValue = (newValue: T | ((prev: T | null) => T)) => {
        try {
            let actualValue: T;
            
            if (typeof newValue === 'function') {
                actualValue = (newValue as (prev: T | null) => T)(value);
            } else {
                actualValue = newValue;
            }

            setValue(actualValue);
            localStorage.setItem(key, JSON.stringify(actualValue));
        } catch (error) {
            const err = error instanceof Error ? error : new Error(String(error));
            onError?.(err);
        }
    };

    // 移除操作
    const removeValue = () => {
        try {
            setValue(null);
            localStorage.removeItem(key);
        } catch (error) {
            const err = error instanceof Error ? error : new Error(String(error));
            onError?.(err);
        }
    };

    return {
        value,
        setValue: handleSetValue,
        removeValue,
        isLoaded,
    };
}
