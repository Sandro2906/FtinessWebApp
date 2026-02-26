"use client";

import { useState, useEffect } from "react";

export default function SportsVideoCarousel() {
    // Array of YouTube embed URLs for different sports with autoplay, mute, loop, and no controls
    const videos = [
        { name: "NBA Košarka", url: "https://www.youtube.com/embed/V_nO2h3qXXI?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=V_nO2h3qXXI" },
        { name: "UFC Conor McGregor", url: "https://www.youtube.com/embed/d1gVvUeC1sA?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=d1gVvUeC1sA" },
        { name: "Tenis Novak Đoković", url: "https://www.youtube.com/embed/G1R2G7d6F28?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=G1R2G7d6F28" },
        { name: "Fudbal Golovi", url: "https://www.youtube.com/embed/P7E_-0mHtt0?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=P7E_-0mHtt0" },
        { name: "Stoni Tenis", url: "https://www.youtube.com/embed/pVQcR8XzY5c?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=pVQcR8XzY5c" },
        { name: "Teretana i Fitnes", url: "https://www.youtube.com/embed/QdWsEEIf2x0?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=QdWsEEIf2x0" }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Rotate videos every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
        }, 12000); // 12 seconds per video

        return () => clearInterval(interval);
    }, [videos.length]);

    return (
        <div className="w-full relative overflow-hidden rounded-2xl border border-brand-gray shadow-2xl bg-black my-12 group">
            <div className="absolute top-4 left-4 z-20 bg-brand-darker/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-brand-red/50">
                <span className="text-brand-red font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
                    {videos[currentIndex].name}
                </span>
            </div>

            <div className="relative pt-[56.25%] w-full h-0">
                {videos.map((video, index) => (
                    <iframe
                        key={index}
                        src={video.url}
                        title={video.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out z-10 ${index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                            }`}
                        style={{ border: 0 }}
                    />
                ))}
                {/* Overlay to prevent clicking and pausing the video */}
                <div className="absolute inset-0 z-10 bg-transparent"></div>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                {videos.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-brand-red scale-125" : "bg-gray-500 hover:bg-gray-400"
                            }`}
                        aria-label={`Prikaži ${videos[index].name}`}
                    />
                ))}
            </div>
        </div>
    );
}
