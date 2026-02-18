import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
    const whatsappNumber = "2347033221019";
    const message = "Hello Dabstack! I'm interested in working with you.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed bottom-8 left-8 z-[100]">
            {/* Pulse Outer Animation */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute inset-0 bg-green-500 rounded-full blur-xl"
            />

            {/* Main Button */}
            <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-shadow duration-300 group"
                aria-label="Contact on WhatsApp"
            >
                <MessageCircle className="w-8 h-8 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />

                {/* Tooltip */}
                <span className="absolute left-full ml-4 px-4 py-2 bg-background border border-border text-foreground text-sm font-semibold rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap shadow-xl">
                    Chat with us!
                </span>
            </motion.a>
        </div>
    );
}
