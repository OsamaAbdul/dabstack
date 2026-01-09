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
          "w-64 h-screen bg-[hsl(220,70%,10%)] dark:bg-[hsl(34,41%,84%)] text-[hsl(34,41%,84%)] dark:text-[hsl(220,70%,10%)] flex flex-col fixed left-0 top-0 z-50 md:translate-x-0 border-r border-sidebar-border shadow-2xl transition-colors duration-500 overflow-hidden"
        )}
      >
        {/* Floating Icons Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-10">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 -left-4 text-sidebar-foreground"
          >
            <Cloud size={60} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/2 -right-6 text-sidebar-foreground"
          >
            <Globe size={80} />
          </motion.div>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-10 text-sidebar-foreground"
          >
            <Cpu size={50} />
          </motion.div>
        </div>

        {/* Logo & Close Button */}
        <div className="p-8 pb-10 flex items-center justify-between">
          <div className="flex items-center group cursor-pointer">
            <img
              src="/DARKMODE.png"
              alt="Dabstack"
              className="dark:hidden rounded-xl shadow-sm"
              width={100}
              height={100}
            />
            <img
              src="/LIGHTMODE.jpg"
              alt="Dabstack"
              className="hidden dark:block rounded-xl shadow-sm"
              width={100}
              height={100}
            />
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
              <div className="mb-4 px-4 text-[10px] font-bold text-sidebar-foreground/30 uppercase tracking-[0.2em]">Dashboard</div>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                    activeSection === item.id
                      ? "bg-sidebar-foreground/5 text-sidebar-foreground shadow-sm"
                      : "text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-foreground/5"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-colors",
                    activeSection === item.id ? "bg-blue-600/20 text-blue-400 dark:text-blue-600" : "group-hover:text-sidebar-foreground"
                  )}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                    />
                  )}
                </button>
              ))}
            </>
          )}

          {isAdmin && (
            <>
              <div className="mt-8 mb-4 px-4 text-[10px] font-bold text-sidebar-foreground/30 uppercase tracking-[0.2em]">Administration</div>
              <button
                onClick={() => onSectionChange("admin")}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                  activeSection === "admin"
                    ? "bg-sidebar-foreground/5 text-sidebar-foreground shadow-sm"
                    : "text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-foreground/5"
                )}
              >
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  activeSection === "admin" ? "bg-blue-600/20 text-blue-400 dark:text-blue-600" : "group-hover:text-sidebar-foreground"
                )}>
                  <Shield className="h-4 w-4" />
                </div>
                Admin Panel
                {activeSection === "admin" && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                  />
                )}
              </button>
            </>
          )}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-sidebar-border space-y-4">
          <div className="flex items-center gap-3 px-2 mb-2">
            <div className="relative h-10 w-10 rounded-full bg-sidebar-primary/20 flex items-center justify-center text-xs font-bold border border-sidebar-border text-sidebar-foreground overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <span>{user?.email?.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium truncate text-sidebar-foreground/90">Account</span>
              <span className="text-[10px] text-sidebar-foreground/40 truncate">{user?.email}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="flex-1 justify-start gap-3 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-foreground/10 rounded-xl"
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
