import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  CheckCircle,
  Banknote,
  PartyPopper,
  Clock,
  Loader2,
  Users as UsersIcon,
  LayoutGrid,
  TrendingUp,
  MessageCircle,
  Mail,
  MoreHorizontal,
  Briefcase
} from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { useProjects } from "@/hooks/useProjects";
import { useUsers } from "@/hooks/useUsers";
import { Database } from "@/integrations/supabase/types";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, startOfMonth, subMonths } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

type Project = Database["public"]["Tables"]["projects"]["Row"];
type ProjectStatus = Database["public"]["Enums"]["project_status"];

interface AdminPanelProps {
  onOpenChat: (projectId: string) => void;
}

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

export function AdminPanel({ onOpenChat }: AdminPanelProps) {
  const { projects, updateProjectStatus } = useProjects();
  const { users, isLoading: usersLoading, updateUserRole } = useUsers();
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const handleMarkPaid = async (project: Project) => {
    setLoadingStates((prev) => ({ ...prev, [`paid-${project.id}`]: true }));
    const { error } = await updateProjectStatus(project.id, "in_progress");
    if (!error) {
      toast.success("Payment Confirmed!", {
        description: `Project "${project.type}" is now In Progress`,
        icon: <Banknote className="h-4 w-4 text-green-500" />,
      });
    }
    setLoadingStates((prev) => ({ ...prev, [`paid-${project.id}`]: false }));
  };

  const handleComplete = async (project: Project) => {
    setLoadingStates((prev) => ({ ...prev, [`complete-${project.id}`]: true }));
    const { error } = await updateProjectStatus(project.id, "completed");
    if (!error) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#2563EB", "#0ea5e9", "#F5F5DC"],
      });
      toast.success("Project Completed! 🎉");
    }
    setLoadingStates((prev) => ({ ...prev, [`complete-${project.id}`]: false }));
  };

  // Analytics Calculation
  const monthlyStats = useMemo(() => {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const d = subMonths(new Date(), i);
      return format(d, "MMM yyyy");
    }).reverse();

    return last6Months.map(monthLabel => {
      const projectsInMonth = projects.filter(p => format(new Date(p.created_at), "MMM yyyy") === monthLabel);
      const revenueInMonth = projectsInMonth.reduce((acc, p) => acc + (p.budget || 0), 0);
      return {
        name: monthLabel,
        projects: projectsInMonth.length,
        revenue: revenueInMonth
      };
    });
  }, [projects]);

  const stats = [
    { label: "Total Revenue", value: `₦${projects.reduce((acc, p) => acc + (p.budget || 0), 0).toLocaleString()}`, icon: Banknote, color: "text-green-500 bg-green-500/10" },
    { label: "Total Users", value: users.length, icon: UsersIcon, color: "text-blue-500 bg-blue-500/10" },
    { label: "Total Clients", value: users.filter(u => u.role === 'user').length, icon: Briefcase, color: "text-purple-500 bg-purple-500/10" },
    { label: "Completed Projects", value: projects.filter(p => p.status === "completed").length, icon: CheckCircle, color: "text-orange-500 bg-orange-500/10" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">Comprehensive system oversight and management</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 flex items-center gap-4 border-none shadow-sm bg-background/50 backdrop-blur-sm">
            <div className={cn("p-3 rounded-xl", stat.color)}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              <h4 className="text-2xl font-bold">{stat.value}</h4>
            </div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-6">
          <TabsTrigger value="projects" className="px-6">Projects</TabsTrigger>
          <TabsTrigger value="users" className="px-6">Users</TabsTrigger>
          <TabsTrigger value="analytics" className="px-6">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          {projects.length === 0 ? (
            <Card className="p-12 text-center border-dashed">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No Projects Yet</h3>
              <p className="text-muted-foreground">New project requests will appear here.</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-6 group hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <LayoutGrid className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-lg capitalize">{project.type} Project</h3>
                            <Badge variant="outline" className={cn("capitalize text-[10px]", statusColors[project.status])}>
                              {statusLabels[project.status]}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Banknote className="h-4 w-4 text-green-500/70" />
                              <span className="font-semibold text-foreground">₦{Number(project.budget || 0).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>Last update: {format(new Date(project.updated_at), "MMM d, yyyy")}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="gap-2"
                          onClick={() => onOpenChat(project.id)}
                        >
                          <MessageCircle className="h-4 w-4" />
                          Chat
                        </Button>

                        {project.status === "review" && (
                          <Button
                            size="sm"
                            onClick={() => handleMarkPaid(project)}
                            disabled={loadingStates[`paid-${project.id}`]}
                            className="gap-2 bg-green-600 hover:bg-green-700 text-white"
                          >
                            {loadingStates[`paid-${project.id}`] ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                            Paid
                          </Button>
                        )}

                        {project.status === "in_progress" && (
                          <Button
                            size="sm"
                            onClick={() => handleComplete(project)}
                            disabled={loadingStates[`complete-${project.id}`]}
                            variant="default"
                            className="gap-2"
                          >
                            {loadingStates[`complete-${project.id}`] ? <Loader2 className="h-4 w-4 animate-spin" /> : <PartyPopper className="h-4 w-4" />}
                            Complete
                          </Button>
                        )}

                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card className="overflow-hidden border-none shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">User</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Role</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Projects</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Joined</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersLoading ? (
                    <tr>
                      <td colSpan={5} className="p-10 text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                      </td>
                    </tr>
                  ) : users.map((u, i) => (
                    <tr key={u.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                            {u.email.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{u.full_name || "New User"}</p>
                            <p className="text-xs text-muted-foreground">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={u.role === "admin" ? "default" : "secondary"} className="capitalize">
                          {u.role}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm font-medium">{u.project_count}</td>
                      <td className="p-4 text-sm text-muted-foreground">{format(new Date(u.created_at), "MMM d, yyyy")}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-muted"
                            onClick={() => window.location.href = `mailto:${u.email}`}
                            title="Send Email"
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "h-8 w-8 rounded-full",
                              u.role === "admin"
                                ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                                : "text-muted-foreground hover:bg-muted"
                            )}
                            onClick={() => {
                              const newRole = u.role === "admin" ? "user" : "admin";
                              updateUserRole(u.user_id, newRole);
                              toast.info(
                                newRole === "admin"
                                  ? `User promoted to Admin`
                                  : `Admin privileges removed`,
                                { description: `Updated role for ${u.email}` }
                              );
                            }}
                            title={u.role === "admin" ? "Remove Admin Privileges" : "Promote to Admin"}
                          >
                            <Shield className={cn("h-4 w-4", u.role === "admin" && "fill-current")} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-6 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                Revenue Overview (Last 6 Months)
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyStats}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₦${value / 1000}k`} />
                    <Tooltip
                      formatter={(value) => `₦${Number(value).toLocaleString()}`}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#22c55e" fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-6 flex items-center gap-2">
                <LayoutGrid className="h-4 w-4 text-purple-500" />
                Project Growth (Last 6 Months)
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyStats}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="projects" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
