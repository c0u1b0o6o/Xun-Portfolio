import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DragWindow from "../DragWindow";
import { url } from "inspector";

export function EmailContent() {
    const [copied, setCopied] = useState(false);
    const email = "cuboomax@gmail.com";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-6 flex flex-col justify-center items-center gap-4 w-fit select-none">
            <div className="text-center">
                <h1 className="font-mono text-3xl font-bold mb-2">
                    Contact Me via Email?
                </h1>
                <div
                    onClick={handleCopy}
                    className="cursor-pointer group relative flex flex-col items-center"
                >
                    <h1 className="font-mono text-2xl underline underline-offset-4 group-hover:scale-105 group-hover:text-bright-amber text-tropical-teal transition-all duration-200">
                        {email}
                    </h1>
                    <div className="h-6 mt-1 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {copied ? (
                                //AI GENERATED
                                <motion.p
                                    key="copied"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="text-ink-700"
                                >
                                    Copied!
                                </motion.p>
                            ) : (
                                <motion.p
                                    key="copy"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-ink-700"
                                >
                                    Click it to copy!
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function DiscordContent() {
    const [copied, setCopied] = useState(false);
    const username = "cuboo";

    const handleCopy = () => {
        navigator.clipboard.writeText(username);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-6 flex flex-col justify-center items-center gap-4 w-fit select-none">
            <div className="text-start w-full">
                <div className="flex flex-row items-end justify-center mb-6">
                    <h1 className="text-center font-mono text-2xl font-bold italic mr-4">
                        are u using
                    </h1>
                    <h1 onClick={() => { window.open("https://discord.com/channels/@me", "_blank"); }} className="cursor-pointer text-4xl font-montserrat underline text-blue-400 hover:text-blue-600 hover:scale-110 transition-all duration-200">Discord???</h1>
                </div>
                <p className="w-full text-2xl mb-2 font-bold primary-gradient-text font-mono">I love DC!</p>
                <p className="w-full font-mono mb-2">
                    I use Discord everyday! <br />
                    So, The best way to contact me is via Discord! <br />
                    Here's my <span className="font-montserrat font-bold">username</span>:
                </p>
                <div
                    onClick={handleCopy}
                    className="cursor-pointer group relative flex flex-col items-center"
                >
                    <h1 className="font-mono text-2xl underline underline-offset-4 group-hover:scale-105 group-hover:text-bright-amber text-tropical-teal transition-all duration-200">
                        {username}
                    </h1>
                    <div className="h-6 mt-1 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {copied ? (
                                <motion.p
                                    key="copied"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="text-ink-700"
                                >
                                    Copied!
                                </motion.p>
                            ) : (
                                <motion.p
                                    key="copy"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-ink-700"
                                >
                                    Click it to copy!
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function DetailWindows() {
    return (
        <>
            {/* Discord Window */}
            <DragWindow title="Discord." id="discord">
                <DiscordContent />
            </DragWindow>

            {/* Email Window */}
            <DragWindow title="Email." id="email">
                <EmailContent />
            </DragWindow>

            {/* Portfolio Link Window */}
            <DragWindow title="Portfolio." id="portfolio_link">
                <div className="p-4 w-64">
                    {/* Add your content here */}
                    <h1 className="font-mono text-2xl italic">
                        YOU ARE HERE NOW!
                    </h1>
                </div>
            </DragWindow>
        </>
    );
}
