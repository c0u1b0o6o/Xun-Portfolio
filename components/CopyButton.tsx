/**
 * CopyButton - 統一的複製按鈕組件
 * 
 * 聚合 DetailWindow.tsx 中 EmailContent 和 DiscordContent 的重複複製邏輯
 * 支持自定義內容、複製文本、反饋時長等
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface CopyButtonProps {
  /** 要複製的文本內容 */
  textToCopy: string;
  /** 顯示的文本（可與 textToCopy 不同） */
  displayText: string;
  /** 複製成功反饋持續時間（毫秒） */
  feedbackDuration?: number;
  /** 複製成功時顯示的文本 */
  copiedText?: string;
  /** 未複製時顯示的提示文本 */
  hintText?: string;
  /** 按鈕容器額外 className */
  containerClassName?: string;
  /** 文本顯示部分額外 className */
  textClassName?: string;
  /** 反饋文本額外 className */
  feedbackClassName?: string;
}

/**
 * CopyButton 組件
 * 點擊複製 textToCopy，顯示反饋提示
 */
export function CopyButton({
  textToCopy,
  displayText,
  feedbackDuration = 2000,
  copiedText = 'Copied!',
  hintText = 'Click it to copy!',
  containerClassName = 'cursor-pointer group relative flex flex-col items-center',
  textClassName = 'font-mono text-2xl underline underline-offset-4 group-hover:scale-105 group-hover:text-bright-amber text-tropical-teal transition-all duration-200',
  feedbackClassName = 'text-ink-700',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), feedbackDuration);
    } catch (err) {
      console.warn("[CopyButton] Failed to copy text:", err);
    }
  };

  return (
    <div onClick={handleCopy} className={containerClassName}>
      <h1 className={textClassName}>{displayText}</h1>
      <div className="h-6 mt-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.p
              key="copied"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={feedbackClassName}
            >
              {copiedText}
            </motion.p>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={feedbackClassName}
            >
              {hintText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
