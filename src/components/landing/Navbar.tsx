import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Sparkles, Menu, X } from "lucide-react";

interface NavbarProps {
  onGetStarted: () => void;
}

export function Navbar({ onGetStarted }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/80 dark:bg-[#0A192F]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold tracking-wider text-blue-600 dark:text-[#00E5FF]">DABSTACK</span>
            <div className="h-2 w-2 bg-blue-600 dark:bg-[#00E5FF] rounded-full animate-pulse" />
          </div>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10"
            onClick={onGetStarted}
          >
            Login
          </Button>
          <Button
            onClick={onGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6"
          >
            Start Building
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white dark:bg-[#0A192F] border-t border-gray-200 dark:border-white/10 mt-4"
          >
            <div className="flex flex-col gap-4 py-4 px-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-lg"
                onClick={() => {
                  onGetStarted();
                  setIsOpen(false);
                }}
              >
                Login
              </Button>
              <Button
                className="w-full justify-center text-lg bg-blue-600 text-white"
                onClick={() => {
                  onGetStarted();
                  setIsOpen(false);
                }}
              >
                Start Building
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}