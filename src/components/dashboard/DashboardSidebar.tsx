import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard,
  MessageSquare,
  CreditCard,
  Settings,
  Shield,
  LogOut,
  X,
  Cloud,
  Globe,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
  avatarUrl: string | null;
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
  onClose,
  avatarUrl
}: DashboardSidebarProps) {
  const { signOut, isAdmin, user } = useAuth();
  const navigate = useNavigate();



  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

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
          "w-64 h-screen bg-sidebar text-sidebar-foreground flex flex-col fixed left-0 top-0 z-50 md:translate-x-0 border-r border-sidebar-border shadow-2xl transition-colors duration-500 overflow-hidden"
        )}
      >
        {/* Hero Background Image Integration */}
        <div
          className="absolute inset-0 z-0 opacity-40 dark:opacity-30"
          style={{
            backgroundImage: `url('/bg.gif')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-sidebar via-sidebar/80 to-sidebar" />

        {/* Floating Icons Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.03]">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 -left-4 text-primary"
          >
            <Cloud size={60} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/2 -right-6 text-primary"
          >
            <Globe size={80} />
          </motion.div>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-10 text-primary"
          >
            <Cpu size={50} />
          </motion.div>
        </div>

        {/* Logo & Close Button */}
        <div className="p-8 pb-10 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <img
                src="/DARKMODE.png"
                alt="Dabstack"
                className="dark:hidden rounded-xl shadow-2xl hover:scale-110 transition-transform duration-300"
                width={50}
                height={50}
              />
              <img
                src="/LIGHTMODE.jpg"
                alt="Dabstack"
                className="hidden dark:block rounded-xl shadow-2xl shadow-red-600/20 hover:scale-110 transition-transform duration-300 border border-sidebar-foreground/10"
                width={50}
                height={50}
              />
            </div>

          </div>

          {/* Mobile Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="md:hidden text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-foreground/10 rounded-full"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {!isAdmin && (
            <>

              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                    activeSection === item.id
                      ? "bg-sidebar-foreground/5 text-sidebar-foreground shadow-sm"
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-foreground/5"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-colors",
                    activeSection === item.id ? "bg-primary/10 text-primary" : "group-hover:text-sidebar-foreground"
                  )}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                    />
                  )}
                </button>
              ))}
            </>
          )}

          {isAdmin && (
            <>
              <div className="mt-8 mb-4 px-4 text-[10px] font-bold text-sidebar-foreground/60 uppercase tracking-[0.2em] transition-colors duration-300">Administration</div>
              <button
                onClick={() => onSectionChange("admin")}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                  activeSection === "admin"
                    ? "bg-sidebar-foreground/5 text-sidebar-foreground shadow-sm"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-foreground/5"
                )}
              >
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  activeSection === "admin" ? "bg-primary/10 text-primary" : "group-hover:text-sidebar-foreground"
                )}>
                  <Shield className="h-4 w-4" />
                </div>
                Admin Panel
                {activeSection === "admin" && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                  />
                )}
              </button>
            </>
          )}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-sidebar-border bg-sidebar/50 backdrop-blur-md relative z-10">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 px-3 py-3 mb-4 rounded-2xl bg-sidebar-foreground/5 border border-sidebar-foreground/10 shadow-lg transition-all"
          >
            <div className="relative h-12 w-12 rounded-full ring-2 ring-primary/20 flex items-center justify-center text-sm font-bold border border-sidebar-foreground/20 text-sidebar-foreground overflow-hidden bg-primary/10">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <span className="font-serif italic">{user?.email?.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div className="flex flex-col min-w-0 transition-colors duration-300">
              <span className="text-sm font-serif italic font-bold truncate text-sidebar-foreground">Account</span>
              <span className="text-[10px] text-sidebar-foreground/70 truncate font-medium">{user?.email}</span>
            </div>
          </motion.div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="flex-1 justify-start gap-3 h-12 px-4 text-sidebar-foreground/70 hover:text-primary hover:bg-primary/10 rounded-xl transition-all border border-transparent hover:border-primary/20"
            >
              <LogOut className="h-5 w-5 text-primary" />
              <span className="text-sm font-bold text-sidebar-foreground transition-colors duration-300">Log out</span>
            </Button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
