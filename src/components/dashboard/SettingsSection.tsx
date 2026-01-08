import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, User, Save } from "lucide-react";

export function SettingsSection() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        async function getProfile() {
            if (!user) return;

            try {
                const { data, error } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("user_id", user.id)
                    .single();

                if (error) {
                    throw error;
                }

                if (data) {
                    setFullName(data.full_name || "");
                    setEmail(data.email || "");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        }

        getProfile();
    }, [user]);

    const handleUpdateProfile = async () => {
        if (!user) return;
        setSaving(true);

        try {
            const { error } = await supabase
                .from("profiles")
                .update({
                    full_name: fullName,
                    updated_at: new Date().toISOString(),
                })
                .eq("user_id", user.id);

            if (error) throw error;

            toast.success("Profile updated successfully");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Account Settings</h2>
                <p className="text-muted-foreground">Manage your profile and personal preferences.</p>
            </div>

            <Card className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center gap-4 pb-4 border-b">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-2xl font-bold text-primary">
                                {fullName ? fullName.charAt(0).toUpperCase() : email.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Profile Information</h3>
                            <p className="text-sm text-muted-foreground">Update your photo and personal details.</p>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                value={email}
                                disabled
                                className="bg-muted"
                            />
                            <p className="text-[10px] text-muted-foreground">
                                Email address cannot be changed.
                            </p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                placeholder="Enter your full name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button onClick={handleUpdateProfile} disabled={saving} className="gap-2">
                            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            Save Changes
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
