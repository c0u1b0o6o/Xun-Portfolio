'use client';
import { useState } from "react";

export default function DotGridBackground() {
    return (
        /* 這裡使用 fixed 覆蓋整個視窗，z-[-1] 確保它在最底層 */
        <div
            className="fixed inset-0 z-0 w-full h-full bg-surface-base overflow-hidden"
        >
            {/* 網點層 */}
            <div className="dot-grid-base absolute inset-0" />
        </div>
    );
}