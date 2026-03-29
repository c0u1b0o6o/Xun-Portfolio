'use client';

import Image from 'next/image';

/**
 * Avatar - 標準頭像組件
 * 
 * 顯示圓形頭像，支持本地和遠端圖片
 * 
 * @param src - 圖片路徑 (本地或遠端 URL)
 * @param alt - 替代文字
 * @param size - 頭像尺寸 (寬高相等)
 * @param className - 額外的 Tailwind 類別
 */
interface AvatarProps {
  src: string;
  alt?: string;
  size?: number;
  className?: string;
}

export default function Avatar({
  src,
  alt = "",
  size = 64,
  className = ""
}: AvatarProps) {
  return (
    <div
      className={"relative overflow-hidden rounded-full shadow-md" + className}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        priority={size > 100}
        className="object-cover"
      />
    </div>
  );
}

/**
 * GifAvatar - 動畫鴿子頭像組件
 * 
 * 顯示帶有邊框的圓形 GIF 頭像，支持縮放和位移調整
 * 用於展示特殊的動畫圖片 (如行走的醫生鴿子)
 * 
 * @param size - 外觀尺寸 (寬高)
 * @param imageScale - 圖片放大倍率 (用於調整圖片在圓形裁切內的大小)
 * @param offsetX - 水平位移 (px)
 * @param offsetY - 垂直位移 (px)
 */
interface GifAvatarProps {
  size?: number;
  imageScale?: number;
  offsetX?: number;
  offsetY?: number;
}

export function GifAvatar({
  size = 160,
  imageScale = 1.3,
  offsetX = 15,
  offsetY = 0,
}: GifAvatarProps) {
  return (
    // 外層容器：定義圓形和裁切區域
    <div
      className="select-none relative overflow-hidden rounded-full border-5 border-ink-900 shadow-xl"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Image
        src="/gif/pigeon_doctor_walking.gif"
        alt="Pigeon Doctor Walking"
        fill
        unoptimized
        className="object-cover transition-transform duration-300"
        style={{
          transform: `scale(${imageScale}) translate(${offsetX}px, ${offsetY}px)`,
        }}
      />
    </div>
  );
}
