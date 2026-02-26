"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Hide splash screen after 1.8 seconds
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-darker"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-6xl font-black text-white uppercase tracking-widest"
                    >
                        FIT<span className="text-brand-red">PRO</span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
