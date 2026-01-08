import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Sparkles } from "lucide-react";

interface NavbarProps {
  onGetStarted: () => void;
}

export function Navbar({ onGetStarted }: NavbarProps) {
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

        <div className="flex items-center gap-4">
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
      </div>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium text-sm"
    >
      {children}
    </a>
  );
}