import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Layers,
  ShoppingCart,
  Smartphone,
  FileText,
  Calendar,
  Banknote,
  Clock
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Database } from "@/integrations/supabase/types";

type Project = Database["public"]["Tables"]["projects"]["Row"] & {
  messages?: { created_at: string }[];
};
type ProjectStatus = Database["public"]["Enums"]["project_status"];

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
  hasUnread?: boolean;
}

const typeIcons: Record<string, typeof Layers> = {
  saas: Layers,
  ecommerce: ShoppingCart,
  mobile: Smartphone,
  landing: FileText,
};

const statusColors: Record<ProjectStatus, string> = {
  onboarding: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  review: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  in_progress: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  completed: "bg-green-500/10 text-green-600 border-green-500/20",
};

const statusLabels: Record<ProjectStatus, string> = {
  onboarding: "Onboarding",
  review: "In Review",
  in_progress: "In Progress",
  completed: "Completed",
};

export function ProjectCard({ project, onClick, hasUnread }: ProjectCardProps) {
  const Icon = typeIcons[project.type] || Layers;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card
        className="p-6 cursor-pointer hover:shadow-large transition-shadow bg-background/50 backdrop-blur-sm border-border/50"
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center relative">
            <Icon className="h-6 w-6 text-primary" />
            {hasUnread && (
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-600 rounded-full border-2 border-background animate-pulse" />
            )}
          </div>
          <Badge
            variant="outline"
            className={cn("capitalize", statusColors[project.status])}
          >
            {statusLabels[project.status]}
          </Badge>
        </div>

        <h3 className="font-semibold text-lg capitalize mb-2">{project.type} Project</h3>

        {project.target_audience && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            Target: {project.target_audience}
          </p>
        )}

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {project.budget && (
            <div className="flex items-center gap-1">
              <span className="text-primary font-bold">₦</span>
              <span>{Number(project.budget).toLocaleString()}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{format(new Date(project.created_at), "MMM d")}</span>
          </div>
        </div>

        {/* Status Stepper */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center gap-1">
            {(["onboarding", "review", "in_progress", "completed"] as ProjectStatus[]).map((status, index) => {
              const statusIndex = ["onboarding", "review", "in_progress", "completed"].indexOf(project.status);
              const currentIndex = index;
              const isActive = currentIndex <= statusIndex;

              return (
                <div key={status} className="flex items-center flex-1">
                  <div
                    className={cn(
                      "h-2 w-full rounded-full transition-colors",
                      isActive ? "bg-primary" : "bg-muted"
                    )}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Start</span>
            <span>Complete</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
