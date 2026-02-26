"use client";

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
            {/* UFC / Conor McGregor YouTube Background */}
            <iframe
                src="https://www.youtube.com/embed/54D8qQJJa7s?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=54D8qQJJa7s"
                className="absolute w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"
                style={{ border: 0, pointerEvents: 'none' }}
                allow="autoplay; encrypted-media"
            />
            {/* Gradient overlay to ensure text contrast */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-darker/90 via-brand-darker/70 to-brand-red/20" />
        </div>
    );
}
