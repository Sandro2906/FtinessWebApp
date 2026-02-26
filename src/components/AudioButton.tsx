"use client";

import useSound from 'use-sound';

// We create a wrapper component to easily wrap any children with audio sounds
// Requires sound assets in the public folder. For now, we use a placeholder online sound or 
// expect the user to provide them. Actually, let's use a very short base64 encoded 'click/hover' sound 
// so no external files are strictly needed if we want immediate feedback, but the standard way is to link a file.

// Tiny base64 tick sound to prevent missing file errors
const clickSoundUrl = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA="; // Minimal placeholder

export function AudioButton({ children, className, onClick, ...props }: any) {
    const [playClick] = useSound(clickSoundUrl, { volume: 0.5 });

    return (
        <button
            className={`${className} transition-all active:scale-95`}
            onClick={(e) => {
                playClick();
                if (onClick) onClick(e);
            }}
            onMouseEnter={() => {
                // optional hover sound can go here
            }}
            {...props}
        >
            {children}
        </button>
    );
}
