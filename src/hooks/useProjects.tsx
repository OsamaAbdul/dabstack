import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { Database } from "@/integrations/supabase/types";

type Project = Database["public"]["Tables"]["projects"]["Row"];
type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
type ProjectStatus = Database["public"]["Enums"]["project_status"];

export function useProjects() {
  const { user, isAdmin } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    if (!user) return;

    setIsLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, [user]);

  const createProject = async (projectData: Omit<ProjectInsert, "user_id">) => {
    if (!user) return { error: new Error("Not authenticated") };

    const { data, error } = await supabase
      .from("projects")
      .insert({
        ...projectData,
        user_id: user.id,
      })
      .select()
      .single();

    if (!error) {
      setProjects((prev) => [data, ...prev]);
    }

    return { data, error };
  };

  const updateProjectStatus = async (projectId: string, status: ProjectStatus) => {
    const { error } = await supabase
      .from("projects")
      .update({ status })
      .eq("id", projectId);

    if (!error) {
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? { ...p, status } : p))
      );
    }

    return { error };
  };

  return {
    projects,
    isLoading,
    createProject,
    updateProjectStatus,
    refetch: fetchProjects,
  };
}
