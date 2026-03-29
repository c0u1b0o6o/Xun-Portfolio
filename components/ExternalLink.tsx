/**
 * ExternalLink - 外部連結組件
 * 
 * 統一的超連結樣式組件，自動處理 target="_blank" 和 rel="noopener noreferrer"
 * 
 * @param href - 連結地址
 * @param children - 連結文本
 * @param variant - 樣式變體 ('default' | 'large' | 'minimal')
 * @param className - 額外的 Tailwind 類別
 */

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'default' | 'large' | 'minimal';
  className?: string;
}

/**
 * 基礎樣式：文色 + hover 動畫 + 下劃線 + 粗體
 */
const baseStyles = 'text-tropical-teal hover:text-bright-amber transition-colors duration-300 underline font-bold';

/**
 * 變體樣式定義
 */
const variantStyles = {
  default: 'text-lg',
  large: 'text-2xl italic',
  minimal: 'inline-block',
};

export function ExternalLink({
  href,
  children,
  variant = 'default',
  className = '',
}: ExternalLinkProps) {
  const variantClass = variantStyles[variant] || '';
  const combinedClassName = `${baseStyles} ${variantClass} ${className}`.trim();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={combinedClassName}
    >
      {children}
    </a>
  );
}
