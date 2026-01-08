import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type UserRole = Database["public"]["Enums"]["app_role"];

export interface UserWithRole extends Profile {
    role: UserRole;
    project_count: number;
}

export function useUsers() {
    const { isAdmin } = useAuth();
    const [users, setUsers] = useState<UserWithRole[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUsers = async () => {
        if (!isAdmin) return;

        setIsLoading(true);

        try {
            // 1. Fetch all profiles
            const { data: profiles, error: pError } = await supabase
                .from("profiles")
                .select("*");

            if (pError) throw pError;

            // 2. Fetch all user roles
            const { data: roles, error: rError } = await supabase
                .from("user_roles")
                .select("*");

            if (rError) throw rError;

            // 3. Fetch all projects to count them
            const { data: projects, error: jError } = await supabase
                .from("projects")
                .select("id, user_id");

            if (jError) throw jError;

            // 4. Merge data
            if (profiles) {
                const formattedUsers: UserWithRole[] = profiles.map((p) => {
                    const userRole = roles?.find(r => r.user_id === p.user_id)?.role || "user";
                    const projectCount = projects?.filter(prj => prj.user_id === p.user_id).length || 0;

                    return {
                        ...p,
                        role: userRole,
                        project_count: projectCount
                    };
                });
                setUsers(formattedUsers);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();

        const channel = supabase
            .channel('public:profiles')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'profiles' },
                () => {
                    fetchUsers();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [isAdmin]);

    const updateUserRole = async (userId: string, newRole: UserRole) => {
        // Enforce single role: Delete existing first
        await supabase.from("user_roles").delete().eq("user_id", userId);

        const { error } = await supabase
            .from("user_roles")
            .insert({ user_id: userId, role: newRole });

        if (!error) {
            setUsers(prev => prev.map(u => u.user_id === userId ? { ...u, role: newRole } : u));
        }
        return { error };
    };

    return {
        users,
        isLoading,
        updateUserRole,
        refetch: fetchUsers
    };
}
