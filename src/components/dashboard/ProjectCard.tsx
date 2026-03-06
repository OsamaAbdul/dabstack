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
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Card
        className="p-6 cursor-pointer hover:shadow-2xl transition-all duration-500 bg-background/40 backdrop-blur-xl border-border/40 hover:border-primary/30 relative overflow-hidden group"
        onClick={onClick}
      >
        {/* Subtle Decorative Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />

        <div className="flex items-start justify-between mb-6 relative z-10">
          <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center relative border border-primary/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
            <Icon className="h-7 w-7 text-primary" />
            {hasUnread && (
              <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-red-600 rounded-full border-[3px] border-background animate-pulse" />
            )}
          </div>
          <Badge
            variant="outline"
            className={cn("capitalize px-3 py-1 text-[10px] font-black tracking-widest border-2", statusColors[project.status])}
          >
            {statusLabels[project.status]}
          </Badge>
        </div>

        <div className="relative z-10">
          <h3 className="font-black text-xl capitalize mb-2 tracking-tight">{project.type} Solution</h3>

          {project.target_audience && (
            <p className="text-sm text-muted-foreground mb-6 line-clamp-2 font-medium">
              Built for <span className="text-foreground">{project.target_audience}</span>
            </p>
          )}

          <div className="flex items-center gap-5 text-sm mb-6">
            {project.budget && (
              <div className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                <Banknote className="h-4 w-4 text-primary" />
                <span className="font-bold tracking-tighter">₦{Number(project.budget).toLocaleString()}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-muted-foreground font-semibold">
              <Clock className="h-4 w-4" />
              <span>{format(new Date(project.created_at), "MMM d, yyyy")}</span>
            </div>
          </div>

          {/* Status Stepper */}
          <div className="pt-6 border-t border-border/50">
            <div className="flex items-center gap-1.5">
              {(["onboarding", "review", "in_progress", "completed"] as ProjectStatus[]).map((status, index) => {
                const statusIndex = ["onboarding", "review", "in_progress", "completed"].indexOf(project.status);
                const currentIndex = index;
                const isActive = currentIndex <= statusIndex;

                return (
                  <div key={status} className="flex items-center flex-1 h-1.5">
                    <motion.div
                      initial={false}
                      animate={{
                        backgroundColor: isActive ? "hsl(var(--primary))" : "hsl(var(--muted))",
                        opacity: isActive ? 1 : 0.3
                      }}
                      className="h-full w-full rounded-full transition-colors shadow-sm"
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-3 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">
              <span className={cn(project.status === "onboarding" && "text-primary")}>Discovery</span>
              <span className={cn(project.status === "completed" && "text-green-500")}>Launch</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
