import DragWindow from "../DragWindow";
import { GiSoundOn, GiSoundOff } from "react-icons/gi";
import { useSfxContext } from "@/providers/sfxProvider";
import { useMusicContext } from "@/providers/musicProvider";
import { TbReload } from "react-icons/tb";
import { MdMusicNote, MdMusicOff } from "react-icons/md";

export function SettingWindow(){
    const { isSfxMuted, toggleSfxMute } = useSfxContext();
    const { isMusicMuted, toggleMusicMute } = useMusicContext();
    return(
        <DragWindow title="Setting." id="setting">
            <div className="flex flex-row gap-2 items-center justify-center">
                <SettingButton onClick={toggleSfxMute}>
                    {isSfxMuted ? <GiSoundOff size={50} /> : <GiSoundOn size={50} />}
                </SettingButton>

                <SettingButton>
                    <TbReload size={40} />
                </SettingButton>

                <SettingButton onClick={toggleMusicMute}>
                    {isMusicMuted ? <MdMusicOff size={40} /> : <MdMusicNote size={40} />}
                </SettingButton>
            </div>
        </DragWindow>
    )
}

export function SettingButton({ children, onClick
    
 }: { children: React.ReactNode; onClick?: () => void }){
    return (
        <button 
            className="flex flex-col items-center justify-center gap-2 rounded-lg hover:scale-110 active:scale-95 transition-transform duration-200"
            onClick={onClick}
        >
            {children}
        </button>
    );
}