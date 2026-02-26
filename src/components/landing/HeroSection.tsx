import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Cloud, Globe, Cpu } from "lucide-react";
import { useState, useEffect } from "react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const strings = [
    "Design, develop, and manage reliable web solutions.",
    "Scale without the stress of hiring in-house developers."
  ];

  useEffect(() => {
    const handleType = () => {
      const currentString = strings[loopIndex % strings.length];
      const updatedText = isDeleting
        ? currentString.substring(0, displayText.length - 1)
        : currentString.substring(0, displayText.length + 1);

      setDisplayText(updatedText);

      if (!isDeleting && updatedText === currentString) {
        setTypingSpeed(3000); // Wait before starting delete
        setIsDeleting(true);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopIndex(loopIndex + 1);
        setTypingSpeed(500); // Pause before next string
      } else {
        setTypingSpeed(isDeleting ? 50 : 100);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopIndex, typingSpeed, strings]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-20 transition-colors duration-300">
      {/* Premium Background with Provided Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* The Base Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/bg.gif')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Premium Overlays & Glassmorphism - Horizontal Gradient for visibility */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-background/40 to-transparent dark:via-background/70 transition-colors duration-500" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-background/60 dark:to-background/95 transition-colors duration-500" />

        {/* Subtle Paper/Grain Texture for Light Mode to reduce "whiteness" */}
        <div className="absolute inset-0 z-10 opacity-[0.06] dark:opacity-0 pointer-events-none mix-blend-multiply"
          style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/asfalt-dark.png')` }} />

        {/* Animated Glow Blobs for "Premium" feel - Now in Red/Rose hues */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none z-20" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-rose-600/5 rounded-full blur-[100px] pointer-events-none z-20" />

        {/* Subtle Web Overlay (SVG) */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05] dark:opacity-[0.08] z-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="premium-web" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M 200 0 L 0 0 0 200" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <path d="M 0 0 L 200 200" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#premium-web)" />
        </svg>
      </div>

      {/* Floating Icons Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%] text-red-500/10"
        >
          <Cloud size={120} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-[15%] text-red-400/10"
        >
          <Globe size={100} />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-[20%] text-red-500/10"
        >
          <Cpu size={80} />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 md:pl-24 md:pr-12 relative z-10 mt-10">
        <div className="max-w-4xl text-left">

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-8 text-foreground leading-[1.1]"
          >
            We Build, Manage <br className="hidden md:block" />
            & Scale <span className="font-serif text-primary">Modern</span> <br className="hidden md:block" />
            <span className="text-foreground">Websites</span>
          </motion.h1>

          {/* Subheadline (Typewriter) */}
          <div className="h-24 sm:h-16 mb-12 flex items-center justify-start">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl sm:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-sans font-normal"
            >
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-[3px] h-[1.2em] bg-primary ml-1 translate-y-1"
              />
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-start gap-6 font-sans"
          >
            <Button
              size="lg"
              onClick={onGetStarted}
              className="w-full sm:w-auto h-16 px-12 text-xl font-bold bg-primary hover:bg-red-700 text-white rounded-2xl transition-all shadow-[0_20px_40px_-15px_rgba(239,68,68,0.4)] hover:scale-105 active:scale-95"
            >
              Start Building
            </Button>

            <a href="https://wa.me/2347033221019" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-base font-medium rounded-full bg-transparent border-border text-foreground hover:bg-muted transition-all"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp
              </Button>
            </a>

            <a href="mailto:dabstack.ltd@gmail.com">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-base font-medium rounded-full bg-transparent border-border text-foreground hover:bg-muted transition-all"
              >
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
