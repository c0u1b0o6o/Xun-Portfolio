/**
 * useCopyToClipboard - 複製到剪貼板 Hook
 * 
 * 提供複製功能、反饋狀態管理、自動清除
 * 用於替代 DetailWindow.tsx 中重複的複製邏輯
 */

import { useState } from 'react';

interface UseCopyToClipboardOptions {
    /** 複製成功後保持反饋的持續時間 (毫秒) */
    displayDuration?: number;
    /** 複製成功的回調 */
    onSuccess?: () => void;
    /** 複製失敗的回調 */
    onError?: (error: Error) => void;
}

interface UseCopyToClipboardReturn {
    /** 是否已複製（用於顯示反饋） */
    copied: boolean;
    /** 執行複製操作的函數 */
    copy: (text: string) => Promise<void>;
    /** 手動重置 copied 狀態 */
    reset: () => void;
}

/**
 * 複製文本到剪貼板並顯示反饋
 * @param options 配置選項
 * @returns { copied, copy, reset }
 * 
 * @example
 * const { copied, copy } = useCopyToClipboard();
 * 
 * <button onClick={() => copy('text')}>
 *   {copied ? 'Copied!' : 'Copy'}
 * </button>
 */
export function useCopyToClipboard(
    options: UseCopyToClipboardOptions = {}
): UseCopyToClipboardReturn {
    const { displayDuration = 2000, onSuccess, onError } = options;
    const [copied, setCopied] = useState(false);
    const [lastTimer, setLastTimer] = useState<NodeJS.Timeout | null>(null);

    const copy = async (text: string): Promise<void> => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            if (lastTimer) {
                clearTimeout(lastTimer);
            }

            // 自動清除複製狀態
            const NewTimer = setTimeout(() => {
                setCopied(false);
            }, displayDuration);

            setLastTimer(NewTimer);

            // if scucess, call onSuccess callback.
            onSuccess?.();
        } catch (error) {
            const err = error instanceof Error ? error : new Error(String(error));
            onError?.(err);
            throw err;
        }
    };

    const reset = () => {
        setCopied(false);
        if (lastTimer) {
            clearTimeout(lastTimer);
            setLastTimer(null);
        }
    };

    return { copied, copy, reset };
}
