"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
    {
        name: "Marko M.",
        plan: "Plan za Hipertrofiju",
        text: "Konačno program koji nije samo copy-paste! Dobio sam 6kg čistih mišića za 3 mjeseca.",
        rating: 5,
        img: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        name: "Ivana P.",
        plan: "Protokol Mršavljenja",
        text: "FitPro metodologija je promijenila moj pogled na ishranu. -12kg, a nikad nisam imala više energije u teretani.",
        rating: 5,
        img: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        name: "Dejan T.",
        plan: "Elitna Kondicija",
        text: "Treniram fudbal čitav život, ali ova sprema se ne može porediti ni sa čim. Kondicija leti u nebo!",
        rating: 5,
        img: "https://randomuser.me/api/portraits/men/85.jpg"
    }
];

export default function Reviews() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % reviews.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-20 bg-brand-darker/60 backdrop-blur-md border-t border-brand-gray/30 px-6 overflow-hidden">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-bold uppercase text-white mb-4">Rezultati Klijenata</h2>
                <div className="w-24 h-1 bg-brand-red mx-auto mb-12"></div>

                <div className="relative h-64 md:h-48 flex justify-center items-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className="absolute w-full flex flex-col items-center bg-brand-dark/80 p-6 md:p-8 rounded-2xl border border-brand-red/20 shadow-[0_0_20px_rgba(229,9,20,0.1)]"
                        >
                            <img
                                src={reviews[index].img}
                                alt={reviews[index].name}
                                className="w-16 h-16 rounded-full border-2 border-brand-red mb-4"
                            />
                            <div className="flex text-yellow-500 mb-2">
                                {Array.from({ length: reviews[index].rating }).map((_, i) => (
                                    <span key={i}>★</span>
                                ))}
                            </div>
                            <p className="text-gray-300 italic text-lg mb-4 max-w-2xl px-4">
                                "{reviews[index].text}"
                            </p>
                            <div>
                                <strong className="text-white text-lg">{reviews[index].name}</strong>
                                <span className="text-brand-red text-sm block">{reviews[index].plan}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex justify-center gap-2 mt-8">
                    {reviews.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`w-3 h-3 rounded-full transition-all ${i === index ? "bg-brand-red scale-125" : "bg-gray-600 hover:bg-gray-400"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
