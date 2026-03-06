import { motion } from "framer-motion";
import { LayoutDashboard, MessageSquare, CreditCard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
    activeSection: string;
    onSectionChange: (section: string) => void;
    isAdmin?: boolean;
}

const navItems = [
    { id: "projects", label: "Projects", icon: LayoutDashboard },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
];

export function BottomNav({ activeSection, onSectionChange, isAdmin }: BottomNavProps) {
    // If admin, the sections might be different, but for now we follow the user dashboard pattern
    // as per the sidebar logic in DashboardSidebar.tsx

    return (
        <div className="fixed bottom-6 left-0 right-0 z-50 md:hidden px-6">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="bg-background/40 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2rem] p-1.5 flex items-center justify-around relative overflow-hidden h-16"
            >
                {/* Dynamic Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onSectionChange(item.id)}
                            aria-label={item.label}
                            aria-pressed={isActive}
                            className={cn(
                                "flex flex-col items-center justify-center transition-all duration-500 relative z-10 w-13 h-13 rounded-full group",
                                isActive ? "text-primary" : "text-muted-foreground/60 hover:text-foreground"
                            )}
                        >
                            {/* Active Orb Backdrop */}
                            {isActive && (
                                <motion.div
                                    layoutId="bottom-nav-blob"
                                    className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20 shadow-inner"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}

                            <div className={cn(
                                "relative transition-transform duration-500 flex flex-col items-center",
                                isActive ? "scale-110 -translate-y-0.5" : "group-hover:scale-110"
                            )}>
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                {isActive && (
                                    <motion.div
                                        layoutId="bottom-nav-dot"
                                        className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                                    />
                                )}
                            </div>

                            <span className={cn(
                                "text-[8px] font-black uppercase tracking-widest mt-0.5 transition-all leading-none",
                                isActive ? "opacity-100 scale-100" : "opacity-0 scale-50"
                            )}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </motion.div>
        </div>
    );
}
