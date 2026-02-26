import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Menu, X, Twitter, Instagram, Github, ChevronRight } from "lucide-react";

interface NavbarProps {
  onGetStarted: () => void;
}

export function Navbar({ onGetStarted }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  // Dynamic scale and opacity based on scroll
  const navScale = useTransform(scrollY, [0, 100], [1, 0.98]);
  const navBgOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Tech Stack", href: "#tech-stack" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <div className="fixed top-8 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ scale: navScale }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl pointer-events-auto"
      >
        <div className="bg-black/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-[40px] px-8 py-3 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <a href="/" className="flex items-center gap-2">
              <img
                src="/DARKMODE.png"
                alt="DABSTACK"
                className="h-10 w-auto rounded-lg"
              />
              <span className="text-white/70 hover:text-white text-sm font-semibold transition-colors">DABSTACK</span>
            </a>
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 bg-white/5 px-6 py-2.5 rounded-full border border-white/10 mx-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/70 hover:text-red-500 text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Socials & Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-4 text-white/50 border-r border-white/10 pr-4 mr-2">
              <motion.a
                href="https://twitter.com/dabstacknigeria"
                target="_blank"
                whileHover={{ scale: 1.2, color: "#fff" }}
                className="hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4.5 h-4.5" />
              </motion.a>
              <motion.a
                href="https://instagram.com/dab.stack"
                target="_blank"
                whileHover={{ scale: 1.2, color: "#fff" }}
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4.5 h-4.5" />
              </motion.a>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onGetStarted}
                className="text-white/70 hover:text-white text-sm font-semibold transition-colors"
              >
                Login
              </button>
              <Button
                onClick={onGetStarted}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-5 font-bold shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all group"
              >
                Get Started
                <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white/10 rounded-full"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="md:hidden mt-4 bg-black/95 dark:bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-[30px] p-6 shadow-2xl"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-red-500 text-lg font-semibold flex items-center justify-between group"
                  >
                    {link.label}
                    <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}

                <div className="h-px bg-white/10 my-2" />

                <div className="flex flex-col gap-4">
                  <Button
                    variant="ghost"
                    className="w-full text-white/70 justify-center hover:bg-white/5 h-14 rounded-2xl text-lg font-bold"
                    onClick={() => {
                      onGetStarted();
                      setIsOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    className="w-full justify-center h-14 rounded-2xl text-lg font-bold bg-red-600 text-white"
                    onClick={() => {
                      onGetStarted();
                      setIsOpen(false);
                    }}
                  >
                    Get Started
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-8 text-white/50 pt-4">
                  <a href="https://twitter.com/dabstacknigeria" target="_blank" className="hover:text-white transition-colors">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a href="https://instagram.com/dab.stack" target="_blank" className="hover:text-white transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
