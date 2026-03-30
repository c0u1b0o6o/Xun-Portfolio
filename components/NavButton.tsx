import { motion } from "framer-motion";
import { IconType } from "react-icons";

interface NavButtonProps {
  icon: IconType; // 傳入 Icon 元件
  title: string;
  onClick?: () => void;
}

export function NavButton({ icon: Icon, title, onClick }: NavButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center flex-auto py-2 sm:py-4"
    >
      {/* Icon 區域 */}
      <Icon className="text-5xl sm:text-4xl md:text-4xl mb-1 sm:mb-2" />
      
      {/* 文字區域 */}
      <h1 className="font-mono font-bold italic text-sm sm:text-sm md:text-base">{title}</h1>
    </motion.button>
  );
}
