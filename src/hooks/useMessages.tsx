import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { Database } from "@/integrations/supabase/types";

type Message = Database["public"]["Tables"]["messages"]["Row"];
type MessageType = Database["public"]["Enums"]["message_type"];

export function useMessages(projectId: string | null) {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMessages = useCallback(async () => {
        if (!projectId) return;

        setIsLoading(true);
        const { data, error } = await supabase
            .from("messages")
            .select("*")
            .eq("project_id", projectId)
            .order("created_at", { ascending: true });

        if (!error && data) {
            setMessages(data);
        }
        setIsLoading(false);
    }, [projectId]);

    useEffect(() => {
        if (!projectId) {
            setMessages([]);
            return;
        }

        fetchMessages();

        // Subscribe to changes for this project
        const channel = supabase
            .channel(`project-messages-${projectId}`)
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "messages",
                    filter: `project_id=eq.${projectId}`,
                },
                (payload) => {
                    setMessages((prev) => [...prev, payload.new as Message]);
                }
            )
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "messages",
                    filter: `project_id=eq.${projectId}`,
                },
                (payload) => {
                    setMessages((prev) =>
                        prev.map((msg) => msg.id === payload.new.id ? (payload.new as Message) : msg)
                    );
                }
            )
            .on(
                "postgres_changes",
                {
                    event: "DELETE",
                    schema: "public",
                    table: "messages",
                },
                (payload) => {
                    setMessages((prev) => prev.filter((msg) => msg.id !== payload.old.id));
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [projectId, fetchMessages]);

    const sendMessage = async (content: string, type: MessageType = "text") => {
        if (!user || !projectId) return { error: new Error("Missing requirements") };

        const { error } = await supabase.from("messages").insert({
            project_id: projectId,
            sender_id: user.id,
            content,
            type,
        });

        return { error };
    };

    const updateMessage = async (messageId: string, content: string) => {
        const { error } = await supabase
            .from("messages")
            .update({ content })
            .eq("id", messageId);
        return { error };
    };

    const deleteMessage = async (messageId: string) => {
        const { error } = await supabase
            .from("messages")
            .delete()
            .eq("id", messageId);
        return { error };
    };

    const uploadMedia = async (file: File, bucket: string = "chat-media") => {
        if (!user) return { error: new Error("Not authenticated") };

        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
            .from(bucket)
            .upload(filePath, file);

        if (uploadError) return { error: uploadError };

        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath);

        return { publicUrl, error: null };
    };

    return {
        messages,
        isLoading,
        sendMessage,
        updateMessage,
        deleteMessage,
        uploadMedia,
        refetch: fetchMessages,
    };
}
