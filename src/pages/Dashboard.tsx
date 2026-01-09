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
import { Loader2, MessageSquare, CreditCard, Settings, Sparkles, Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Dashboard() {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("projects");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate("/auth");
      } else if (isAdmin && activeSection === "projects") {
        setActiveSection("admin");
      }
    }
  }, [user, isLoading, navigate, isAdmin, activeSection]);

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
        return <ProjectsSection />;
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
        return <SettingsSection />;
      default:
        return <ProjectsSection />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
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
      />

      <main className="md:pl-64">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-end p-8 pb-0 max-w-6xl">
          <ThemeToggle />
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
