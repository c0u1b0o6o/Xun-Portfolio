"use client";
import DragWindow from "@/components/DragWindow";
import {
  RiGithubFill,
  RiInstagramFill,
  RiDiscordFill,
  RiMailFill,
  RiGlobalLine,
} from "react-icons/ri";
import { useWindowContext } from "@/providers/windowProvider";
import { WINDOW_ID } from "@/constants/window";
import { useSfx } from "@/providers";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/c0u1b0o6o",
    icon: RiGithubFill,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/mengshin.06",
    icon: RiInstagramFill,
  },
  {
    name: "Discord",
    id: WINDOW_ID.DISCORD,
    icon: RiDiscordFill,
  },
  {
    name: "Email",
    id: WINDOW_ID.EMAIL,
    icon: RiMailFill,
  },
  {
    name: "Portfolio",
    id: WINDOW_ID.PORTFOLIO_LINK,
    icon: RiGlobalLine,
  },
];

export function ContactWindow() {
  const { toggleWindow } = useWindowContext();
  const playOpenSfx = useSfx("/sfx/open.mp3"); // 假設音量為0.5，實際使用時可以從設定中獲取
  
  return (
    <DragWindow title="Contact ME." id="contact">
      <div className="sm:flex sm:flex-col w-full">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1 sm:gap-4">
          {socialLinks.map((link) => (
            <SocialButton
              key={link.name}
              name={link.name}
              icon={link.icon}
              onClick={() => {
                if ('url' in link) {
                  window.open(link.url, "_blank");
                } else {
                  toggleWindow(link.id);
                  playOpenSfx();
                }
              }}
            />
          ))}
        </div>
      </div>
    </DragWindow>
  );
}

function SocialButton({
  name,
  icon: Icon,
  onClick,
}: {
  name: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "flex flex-col items-center justify-center gap-1 sm:gap-2 p-2 sm:p-4 rounded-lg hover:scale-110 transition-transform duration-200"
      }
      title={name}
    >
      <Icon className="text-5xl sm:text-4xl md:text-6xl transition-colors duration-200" />
      <h1 className="font-ex-thin text-ink-900 dark:text-gray-200 italic leading-none text-sm sm:text-sm md:text-base">
        {name}
      </h1>
    </button>
  );
}
