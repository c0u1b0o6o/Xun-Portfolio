import DragWindow from "../DragWindow";

export function WelcomeWindow(){
    return (
        <DragWindow title="Welcome.">
            <div className="py-8 text-center">
            <h1 className="ml-3 w-full font-mono font-display font-bold text-7xl italic">
              hi. i'm <span className="gradient-text inline-block">Xun.</span>
            </h1>
            <div className="w-full h-2" />
            <h1 className="w-full font-mono font-display font-normal text-2xl">
              You can take a look!
            </h1>
          </div>
          </DragWindow>
    )
}