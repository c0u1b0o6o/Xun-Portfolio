import DragWindow from "../DragWindow";
import { RiVolumeUpFill, RiVolumeMuteFill, RiRefreshLine } from "react-icons/ri";
import { useSfxContext } from "@/providers/sfxProvider";

export function SettingWindow(){
    const { isSfxMuted, toggleSfxMute } = useSfxContext();
    return(
        <DragWindow title="Setting." id="setting">
            <div className="flex flex-row gap-2 items-center justify-center">
                <SettingButton onClick={toggleSfxMute}>
                    {isSfxMuted ? <RiVolumeMuteFill size={50} /> : <RiVolumeUpFill size={50} />}
                </SettingButton>
                <SettingButton>
                    <RiRefreshLine size={45} />
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