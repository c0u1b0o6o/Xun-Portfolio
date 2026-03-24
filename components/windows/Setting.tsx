import DragWindow from "../DragWindow";
import Window from "../Window";
import { GiSoundOn, GiSoundOff } from "react-icons/gi";
import { useSoundContext } from "@/ultilities/soundProvider";

export function SettingWindow(){
    const { isMuted, toggleMute } = useSoundContext();
    
    return(
        <DragWindow title="Setting.">
            <div className="flex flex-col items-center justify-center">
                <SettingButton onClick={toggleMute}>
                    {isMuted ? <GiSoundOff size={80} /> : <GiSoundOn size={80} />}
                </SettingButton>
            </div>
        </DragWindow>
    )
}

export function SettingButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }){
    return (
        <button 
            onClick={onClick}
            className="flex flex-col items-center justify-center gap-2 rounded-lg hover:scale-110 transition-transform duration-200"
        >
            {children}
        </button>
    )
}