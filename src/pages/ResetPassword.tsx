import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if we have a session (handled by Supabase auto-login from link)
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                toast.error("Invalid or expired reset link");
                navigate("/");
            }
        });
    }, [navigate]);

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.updateUser({
            password: password,
        });

        if (error) {
            toast.error(error.message);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-2xl shadow-large border border-border/50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight">Reset Password</h2>
                    <p className="text-muted-foreground mt-2">
                        Enter your new password below.
                    </p>
                </div>

                {success ? (
                    <div className="flex flex-col items-center justify-center space-y-4 py-8">
                        <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-green-500" />
                        </div>
                        <p className="font-medium text-center">
                            Password updated successfully!
                            <br />
                            Redirecting to dashboard...
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleUpdatePassword} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 h-11"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-11 font-semibold shadow-soft hover-lift"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                "Update Password"
                            )}
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
}
