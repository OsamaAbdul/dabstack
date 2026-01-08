import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-blue-600/80 backdrop-blur-md border border-white/20 shadow-[0_0_20px_rgba(37,99,235,0.5)] text-white transition-all duration-300 group"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="h-6 w-6 group-hover:-translate-y-1 transition-transform duration-300" />
                    <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-md -z-10 group-hover:bg-blue-400/40 transition-colors" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
