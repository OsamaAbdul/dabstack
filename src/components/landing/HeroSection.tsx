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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20 transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Floating Icons Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 text-blue-500/20"
        >
          <Cloud size={120} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-1/4 text-cyan-500/20"
        >
          <Globe size={100} />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/3 text-indigo-500/20"
        >
          <Cpu size={80} />
        </motion.div>
        {/* Add some "code" looking text elements */}
        <div className="absolute top-20 right-10 font-mono text-xs text-blue-900/10 dark:text-blue-400/10 hidden md:block">
          {`const build = () => { return "future" }`}
        </div>

      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-foreground"
          >
            We Build, Manage & Scale <br className="hidden md:block" />
            <span className="text-foreground">Modern Websites</span>
          </motion.h1>

          {/* Subheadline (Typewriter) */}
          <div className="h-24 sm:h-16 mb-12 flex items-center justify-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed font-medium"
            >
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-[2px] h-[1.2em] bg-red-600 ml-1 translate-y-1"
              />
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button
              size="lg"
              onClick={onGetStarted}
              className="w-full sm:w-auto h-14 px-10 text-lg font-semibold bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-full transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
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
