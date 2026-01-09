import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, User, Save, Upload } from "lucide-react";
import { useRef } from "react";

interface SettingsSectionProps {
    onProfileUpdate?: () => void;
}

export function SettingsSection({ onProfileUpdate }: SettingsSectionProps) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
                    setAvatarUrl(data.avatar_url);
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

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                return;
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const filePath = `${user?.id}-${Math.random()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            const { error: updateError } = await supabase
                .from('profiles')
                .update({ avatar_url: publicUrl })
                .eq('user_id', user?.id);

            if (updateError) {
                throw updateError;
            }

            setAvatarUrl(publicUrl);
            onProfileUpdate?.();
            toast.success("Profile picture updated!");
        } catch (error) {
            console.error('Error uploading avatar:', error);
            toast.error("Failed to upload profile picture");
        } finally {
            setUploading(false);
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
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden relative group">
                            {avatarUrl ? (
                                <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                            ) : (
                                <span className="text-2xl font-bold text-primary">
                                    {fullName ? fullName.charAt(0).toUpperCase() : email.charAt(0).toUpperCase()}
                                </span>
                            )}
                            {uploading && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <Loader2 className="h-6 w-6 text-white animate-spin" />
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Profile Information</h3>
                            <p className="text-sm text-muted-foreground mb-2">Update your photo and personal details.</p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    className="h-8 text-xs"
                                >
                                    <Upload className="h-3 w-3 mr-2" />
                                    Change Photo
                                </Button>
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    disabled={uploading}
                                />
                            </div>
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
