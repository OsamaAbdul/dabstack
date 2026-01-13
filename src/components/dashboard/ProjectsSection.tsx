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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Projects</h2>
          <p className="text-muted-foreground">
            Manage and track your project portfolio
          </p>
        </div>
        <Button onClick={() => setIsOnboardingOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-12 text-center bg-gradient-to-br from-background to-muted/30 border-dashed border-2">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <FolderOpen className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start your first project and bring your ideas to life. Our guided
              onboarding will help you get set up in minutes.
            </p>
            <Button
              size="lg"
              onClick={() => setIsOnboardingOpen(true)}
              className="gap-2 shadow-medium hover-lift"
            >
              <Plus className="h-5 w-5" />
              Start New Project
            </Button>
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
