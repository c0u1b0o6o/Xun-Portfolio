import DragWindow from "@/components/DragWindow";

export function BlogPreviewWindow() {
    return (
        <DragWindow title="Blog." id="blog">
            <a
                href="https://cayo-perico.cuboouo.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className=" text-tropical-teal hover:text-bright-amber transition-colors duration-300 underline text-2xl font-bold italic"
            >
                CLICK HERE! GET TO MY BLOG!
            </a>
        </DragWindow>
    );
}