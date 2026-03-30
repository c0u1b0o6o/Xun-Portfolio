import DragWindow from "@/components/DragWindow";

export function BlogPreviewWindow() {
    return (
        <DragWindow title="Blog." id="blog">
            <a
                href="" 
                target="_blank" 
                rel="noopener noreferrer"
                className=" text-tropical-teal hover:text-bright-amber transition-colors duration-300 underline text-2xl font-bold italic"
            >
                BLOG IS COMMING SOON...
            </a>
        </DragWindow>
    );
}