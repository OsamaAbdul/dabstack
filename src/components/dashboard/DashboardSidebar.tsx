import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  CreditCard,
  Settings,
  Shield,
  LogOut,
  Sparkles,
  X,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { id: "projects", label: "Projects", icon: LayoutDashboard },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar({
  activeSection,
  onSectionChange,
  isOpen,
  onClose
}: DashboardSidebarProps) {
  const { signOut, isAdmin } = useAuth();

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <motion.aside
        initial={{ x: "-100%" }}
        animate={{
          x: isOpen ? 0 : (window.innerWidth < 768 ? "-100%" : 0),
        }}
        transition={{
          type: "tween",
          ease: "circOut",
          duration: 0.25
        }}
        className={cn(
          "w-64 h-screen bg-slate-950/95 dark:bg-black/95 backdrop-blur-xl text-white flex flex-col fixed left-0 top-0 z-50 md:translate-x-0 border-r border-white/5 shadow-2xl"
        )}
      >
        {/* Logo & Close Button */}
        <div className="p-8 pb-10 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Dabstack</span>
              <span className="text-[10px] text-blue-400 uppercase tracking-widest font-semibold">Vision Center</span>
            </div>
          </div>

          {/* Mobile Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="md:hidden text-white/70 hover:text-white hover:bg-white/10 rounded-full"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {!isAdmin && (
            <>
              <div className="mb-4 px-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Dashboard</div>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                    activeSection === item.id
                      ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-colors",
                    activeSection === item.id ? "bg-blue-500/20 text-blue-400" : "group-hover:text-white"
                  )}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full"
                    />
                  )}
                </button>
              ))}
            </>
          )}

          {isAdmin && (
            <>
              <div className="mt-8 mb-4 px-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Administration</div>
              <button
                onClick={() => onSectionChange("admin")}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                  activeSection === "admin"
                    ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  activeSection === "admin" ? "bg-blue-500/20 text-blue-400" : "group-hover:text-white"
                )}>
                  <Shield className="h-4 w-4" />
                </div>
                Admin Panel
                {activeSection === "admin" && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full"
                  />
                )}
              </button>
            </>
          )}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 space-y-4">
          <div className="flex items-center gap-3 px-2 mb-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-500 flex items-center justify-center text-xs font-bold border border-white/10">
              {useAuth().user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium truncate text-white/90">Account</span>
              <span className="text-[10px] text-white/40 truncate">{useAuth().user?.email}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              onClick={signOut}
              className="flex-1 justify-start gap-3 text-white/50 hover:text-white hover:bg-white/10 rounded-xl"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm">Log out</span>
            </Button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
