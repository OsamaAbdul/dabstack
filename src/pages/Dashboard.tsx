import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ProjectsSection } from "@/components/dashboard/ProjectsSection";
import { AdminPanel } from "@/components/dashboard/AdminPanel";
import { MessagingSection } from "@/components/dashboard/MessagingSection";
import { BillingSection } from "@/components/dashboard/BillingSection";
import { SettingsSection } from "@/components/dashboard/SettingsSection";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, MessageSquare, CreditCard, Settings, Sparkles, Menu, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("projects");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate("/auth");
      } else if (isAdmin && activeSection === "projects") {
        setActiveSection("admin");
      }
    }
  }, [user, isLoading, navigate, isAdmin, activeSection]);

  const getProfile = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    // 1. Get last checked time
    const lastChecked = localStorage.getItem("last_checked_messages");
    const lastCheckedDate = lastChecked ? new Date(lastChecked) : new Date(0); // Default to epoch if never checked

    // 2. Initial count
    const fetchUnread = async () => {
      const { count, error } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .gt("created_at", lastCheckedDate.toISOString())
        .neq("sender_id", user.id); // Don't count own messages

      if (!error && count !== null) {
        setUnreadCount(count);
      }
    };

    fetchUnread();

    // 3. Subscription
    const channel = supabase
      .channel("global-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newMessage = payload.new as any; // Type assertion for simplicity
          if (newMessage.sender_id !== user.id) {
            setUnreadCount((prev) => prev + 1);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleNotificationClick = () => {
    setUnreadCount(0);
    localStorage.setItem("last_checked_messages", new Date().toISOString());
    // Optionally navigate to messages
    if (activeSection !== "messages") {
      setActiveSection("messages");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderSection = () => {
    switch (activeSection) {
      case "projects":
        return (
          <ProjectsSection
            onProjectSelect={(projectId) => {
              // Mark as viewed immediately
              localStorage.setItem(`last_viewed_project_${projectId}`, new Date().toISOString());
              setSelectedProjectId(projectId);
              setActiveSection("messages");
            }}
          />
        );
      case "admin":
        return (
          <AdminPanel
            onOpenChat={(projectId) => {
              setSelectedProjectId(projectId);
              setActiveSection("messages");
            }}
          />
        );
      case "messages":
        return (
          <MessagingSection
            initialProjectId={selectedProjectId}
            onProjectSelect={setSelectedProjectId}
          />
        );
      case "billing":
        return <BillingSection />;
      case "settings":
        return <SettingsSection onProfileUpdate={getProfile} />;
      default:
        return (
          <ProjectsSection
            onProjectSelect={(projectId) => {
              localStorage.setItem(`last_viewed_project_${projectId}`, new Date().toISOString());
              setSelectedProjectId(projectId);
              setActiveSection("messages");
            }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-primary text-primary-foreground">
        <div className="flex items-center">
          <img
            src="/LIGHTMODE.jpg"
            alt="Dabstack"
            className="h-8 w-auto dark:hidden rounded-lg shadow-sm"
            width={80}
            height={64}
          />
          <img
            src="/DARKMODE.png"
            alt="Dabstack"
            className="h-8 w-auto hidden dark:block rounded-lg shadow-sm"
            width={80}
            height={64}
          />
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <DashboardSidebar
        activeSection={activeSection}
        onSectionChange={(section) => {
          setActiveSection(section);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        avatarUrl={avatarUrl}
      />

      <main className="md:pl-64">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-end p-8 pb-0 max-w-6xl gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground hover:text-foreground"
            onClick={handleNotificationClick}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600 animate-pulse" />
            )}
          </Button>
          <ThemeToggle />
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-border">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
              <span className="text-sm font-bold text-primary">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 md:p-8 max-w-6xl"
        >
          {renderSection()}
        </motion.div>
      </main>
    </div>
  );
}
