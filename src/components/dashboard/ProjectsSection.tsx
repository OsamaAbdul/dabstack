import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Plus, Loader2, FolderOpen } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { OnboardingFlow, OnboardingData } from "@/components/onboarding/OnboardingFlow";
import { useProjects } from "@/hooks/useProjects";
import { toast } from "sonner";

interface ProjectsSectionProps {
  onProjectSelect?: (projectId: string) => void;
}

export function ProjectsSection({ onProjectSelect }: ProjectsSectionProps) {
  const { projects, isLoading, createProject } = useProjects();
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleOnboardingComplete = async (data: OnboardingData) => {
    setIsCreating(true);

    const { data: newProject, error } = await createProject({
      type: data.type,
      target_audience: data.targetAudience,
      budget: data.budget,
      timeline: data.timeline?.toISOString().split("T")[0] || null,
      status: "review",
      onboarding_data: JSON.parse(JSON.stringify(data)),
    });

    if (error) {
      toast.error("Failed to create project", {
        description: error.message,
      });
    } else {
      // Send initial onboarding message
      if (newProject) {
        const messageContent = `**🚀 New Project Initiated**

We've successfully kickstarted your new **${data.type}** project. Here's the snapshot of what we're building:

**📋 Project Details**
• **Target Audience:** ${data.targetAudience}
• **Budget Allocation:** ₦${data.budget.toLocaleString()}
• **Timeline Target:** ${data.timeline ? data.timeline.toLocaleDateString() : 'Not specified'}

*Our team has been notified and will review your requirements shortly.*`;

        await supabase.from("messages").insert({
          project_id: newProject.id,
          sender_id: newProject.user_id,
          content: messageContent,
          type: "text"
        });
      }

      toast.success("Project created!", {
        description: "Your project is now under review.",
      });
      setIsOnboardingOpen(false);
    }

    setIsCreating(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black tracking-tighter mb-2">Project Portfolio</h2>
          <p className="text-muted-foreground font-medium text-lg">
            Monitor development progress and manage your active solutions
          </p>
        </div>
        <Button
          onClick={() => setIsOnboardingOpen(true)}
          className="gap-2 h-12 px-6 rounded-2xl bg-primary hover:bg-red-700 shadow-[0_10px_30px_-10px_rgba(239,68,68,0.5)] transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="h-5 w-5" />
          <span className="font-bold tracking-tight">Initiate Project</span>
        </Button>
      </div>

      {projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-16 text-center bg-background/40 backdrop-blur-xl border-dashed border-2 border-border/50 relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-colors duration-700" />

            <div className="relative z-10">
              <div className="h-20 w-20 rounded-[2rem] bg-primary/10 flex items-center justify-center mx-auto mb-8 border border-primary/20 shadow-xl group-hover:rotate-12 transition-transform duration-500">
                <FolderOpen className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-3xl font-black tracking-tighter mb-4">No Active Projects</h3>
              <p className="text-muted-foreground mb-10 max-w-lg mx-auto text-lg leading-relaxed font-medium">
                Your innovation journey starts here. Launch your first project and
                collaborate with our elite engineering team to bring your vision to life.
              </p>
              <Button
                size="lg"
                onClick={() => setIsOnboardingOpen(true)}
                className="gap-3 h-14 px-10 text-lg font-bold rounded-2xl bg-primary hover:bg-red-700 shadow-large hover-lift"
              >
                <Plus className="h-6 w-6" />
                Start My First Project
              </Button>
            </div>
          </Card>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard
                project={project}
                onClick={() => onProjectSelect?.(project.id)}
                hasUnread={(() => {
                  const lastMessage = project.messages?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
                  if (!lastMessage) return false;

                  const lastViewed = localStorage.getItem(`last_viewed_project_${project.id}`);
                  if (!lastViewed) return true; // Never viewed, has message -> Unread

                  return new Date(lastMessage.created_at) > new Date(lastViewed);
                })()}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Onboarding Dialog */}
      <Dialog open={isOnboardingOpen} onOpenChange={setIsOnboardingOpen}>
        <DialogContent className="sm:max-w-2xl p-8">
          <OnboardingFlow
            onComplete={handleOnboardingComplete}
            isLoading={isCreating}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
