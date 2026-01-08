import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export function usePresence() {
    const { user } = useAuth();
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    useEffect(() => {
        if (!user) return;

        const channel = supabase.channel("online-users", {
            config: {
                presence: {
                    key: user.id,
                },
            },
        });

        channel
            .on("presence", { event: "sync" }, () => {
                const presenceState = channel.presenceState();
                const userIds = Object.keys(presenceState);
                setOnlineUsers(userIds);
            })
            .subscribe(async (status) => {
                if (status === "SUBSCRIBED") {
                    await channel.track({
                        online_at: new Date().toISOString(),
                        user_id: user.id,
                    });
                }
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    return { onlineUsers };
}
