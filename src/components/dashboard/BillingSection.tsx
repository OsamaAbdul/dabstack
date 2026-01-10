import { useProjects } from "@/hooks/useProjects";
import { Card } from "@/components/ui/card";
import { Loader2, CreditCard, Banknote, Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { motion } from "framer-motion";

export function BillingSection() {
    const { projects, isLoading } = useProjects();

    const totalSpent = projects
        .filter(p => p.status === 'in_progress' || p.status === 'completed')
        .reduce((acc, current) => acc + (current.budget || 0), 0);

    const pendingAmount = projects
        .filter(p => p.status === 'onboarding' || p.status === 'review')
        .reduce((acc, current) => acc + (current.budget || 0), 0);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Billing & Payments</h2>
                <p className="text-muted-foreground">Manage your project payments and view history.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="p-6 bg-primary text-primary-foreground border-none">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium opacity-90">Total Spent</h3>
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Banknote className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold tracking-tight">
                        ₦{totalSpent.toLocaleString()}
                    </div>
                    <p className="text-sm mt-2 opacity-75">
                        Lifetime investment on completed & active projects
                    </p>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-muted-foreground">Pending Requests</h3>
                        <div className="p-2 bg-yellow-500/10 text-yellow-600 rounded-lg">
                            <Clock className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold tracking-tight">
                        ₦{pendingAmount.toLocaleString()}
                    </div>
                    <p className="text-sm mt-2 text-muted-foreground">
                        Estimated budget for projects in review & onboarding
                    </p>
                </Card>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Payment History</h3>

                {projects.length === 0 ? (
                    <Card className="p-12 text-center border-dashed">
                        <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-semibold text-lg mb-2">No Transactions Yet</h3>
                        <p className="text-muted-foreground">Your payment history will appear here once you start a project.</p>
                    </Card>
                ) : (
                    <div className="space-y-3">
                        {projects.filter(p => p.status !== 'onboarding').map((project, i) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-sm transition-shadow">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "p-3 rounded-full",
                                            project.status === 'completed' ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                                        )}>
                                            {project.status === 'completed' ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold capitalize">{project.type} Project</h4>
                                            <p className="text-sm text-muted-foreground">{format(new Date(project.created_at), "PPP")}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-lg">₦{project.budget?.toLocaleString()}</div>
                                        <span className={cn(
                                            "text-xs px-2 py-0.5 rounded-full capitalize",
                                            project.status === 'completed'
                                                ? "bg-green-100 text-green-700"
                                                : "bg-blue-100 text-blue-700"
                                        )}>
                                            {project.status === 'in_progress' ? 'Paid' : project.status}
                                        </span>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
