'use client';
import DragWindow from "@/components/DragWindow";
import { FaGithub, FaInstagram, FaDiscord, FaEnvelope, FaLink } from "react-icons/fa";
import { RiGlobalLine } from "react-icons/ri";

const socialLinks = [
    {
        name: "GitHub",
        url: "https://github.com/c0u1b0o6o",
        icon: FaGithub,
    },
    {
        name: "Instagram",
        url: "https://instagram.com",
        icon: FaInstagram,
    },
    {
        name: "Discord",
        url: "https://discord.com",
        icon: FaDiscord,
    },
    {
        name: "Email",
        url: "mailto:cuboomax@gmail.com",
        icon: FaEnvelope,
    },
    {
        name: "Portfolio",
        url: "https://cubooouo.com",
        icon: RiGlobalLine,
    },
    {
        name: "Linktree",
        url: "https://linktree.com",
        icon: FaLink,
    },
];

export function Contact() {
    return (
        <DragWindow title="Contact ME." id="contact">
            <div className="flex flex-col gap-4 w-full">
                <div className="grid grid-cols-6 gap-3 sm:gap-4">
                    {socialLinks.map((link) => (
                        <SocialButton
                            key={link.name}
                            {...link}
                        />
                    ))}
                </div>
            </div>
        </DragWindow>
    );
}

function SocialButton({ 
    name, 
    url, 
    icon: Icon, 
}: { 
    name: string; 
    url: string; 
    icon: React.ComponentType<{ className?: string; size?: number }>; 
}) {
    return (
        <button
            onClick={() => window.open(url)}
            className={"flex flex-col items-center justify-center gap-2 p-4 rounded-lg hover:scale-110 transition-transform duration-200"}
            title={name}
        >
            <Icon className="text-6xl transition-colors duration-200" />
            <h1 className="font-5xl text-ink-900 dark:text-gray-200 italic">
                {name}
            </h1>
        </button>
    );
}