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
        {/* The Base Image - Only visible in dark mode to keep light mode clean white */}
        <div
          className="absolute inset-0 z-0 opacity-0 dark:opacity-100 transition-opacity duration-700"
          style={{
            backgroundImage: `url('/bg.gif')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Premium Overlays - Adjusted for light mode white background */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-background/40 to-background/10 dark:to-transparent transition-colors duration-500" />
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
          className="absolute top-1/4 left-[10%] text-primary/20 dark:text-primary/10 transition-colors duration-500"
        >
          <Cloud size={120} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-[15%] text-primary/15 dark:text-primary/10 transition-colors duration-500"
        >
          <Globe size={100} />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/3 right-[20%] text-primary/20 dark:text-primary/10 transition-colors duration-500"
        >
          <Cpu size={120} />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Content */}
          <div className="lg:col-span-7 text-left">
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
                className="text-xl sm:text-2xl text-foreground max-w-2xl leading-relaxed font-bold tracking-tight"
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
            </motion.div>
          </div>

          {/* Right Column: Code Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 hidden lg:block perspective-1000"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative group"
            >
              {/* Decorative Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

              <div className="relative bg-[#1e1e1e] rounded-2xl border border-white/10 overflow-hidden shadow-2xl overflow-hidden">
                {/* Mac Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#2d2d2d] border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                  </div>
                  <div className="flex-1 text-center pr-12">
                    <span className="text-xs text-white/40 font-mono tracking-wider italic">Navbar.tsx</span>
                  </div>
                </div>

                {/* Code Content */}
                <div className="p-6 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto scrollbar-hide">
                  <pre className="text-white/90">
                    <code>
                      <span className="text-pink-400">1</span>  <span className="text-purple-400">import</span> {"{"} <span className="text-blue-300">useState</span>, <span className="text-blue-300">useEffect</span> {"}"} <span className="text-purple-400">from</span> <span className="text-emerald-400">"react"</span>;<br />
                      <span className="text-pink-400">2</span>  <span className="text-purple-400">import</span> {"{"} <span className="text-blue-300">motion</span>, <span className="text-blue-300">useScroll</span> {"}"} <span className="text-purple-400">from</span> <span className="text-emerald-400">"framer-motion"</span>;<br />
                      <span className="text-pink-400">3</span>  <span className="text-purple-400">import</span> {"{"} <span className="text-blue-300">Button</span> {"}"} <span className="text-purple-400">from</span> <span className="text-emerald-400">"@/components/ui/button"</span>;<br />
                      <span className="text-pink-400">4</span>  <br />
                      <span className="text-pink-400">5</span>  <span className="text-purple-400">export function</span> <span className="text-yellow-300">Navbar</span>({"{"} <span className="text-orange-300">onGetStarted</span> {"}"}: NavbarProps) {"{"}<br />
                      <span className="text-pink-400">6</span>  &nbsp;&nbsp;<span className="text-purple-400">const</span> [<span className="text-blue-300">isOpen</span>, <span className="text-blue-300">setIsOpen</span>] = <span className="text-yellow-300">useState</span>(<span className="text-blue-300">false</span>);<br />
                      <span className="text-pink-400">7</span>  &nbsp;&nbsp;<span className="text-purple-400">const</span> {"{"} <span className="text-blue-300">scrollY</span> {"}"} = <span className="text-yellow-300">useScroll</span>();<br />
                      <span className="text-pink-400">8</span>  <br />
                      <span className="text-pink-400">9</span>  &nbsp;&nbsp;<span className="text-gray-500">// Dynamic scale and opacity</span><br />
                      <span className="text-pink-400">10</span> &nbsp;&nbsp;<span className="text-purple-400">const</span> <span className="text-blue-300">navScale</span> = <span className="text-yellow-300">useTransform</span>(<span className="text-blue-300">scrollY</span>, [0, 100], [1, 0.98]);<br />
                      <span className="text-pink-400">11</span> &nbsp;&nbsp;<span className="text-purple-400">const</span> <span className="text-blue-300">navBgOpacity</span> = <span className="text-yellow-300">useTransform</span>(<span className="text-blue-300">scrollY</span>, [0, 100], [0.8, 0.95]);<br />
                    </code>
                  </pre>
                </div>

                {/* Cursor Highlight (Simulated) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute left-10 top-36 w-20 h-6 bg-blue-500/20 rounded"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-rose-600/10 rounded-full blur-3xl -z-10" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
