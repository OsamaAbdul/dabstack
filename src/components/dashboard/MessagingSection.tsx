import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";
import { useMessages } from "@/hooks/useMessages";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { Card } from "@/components/ui/card";
import {
    MessageSquare,
    Search,
    ChevronLeft,
    Sparkles
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MessagingSectionProps {
    initialProjectId?: string | null;
    onProjectSelect?: (projectId: string | null) => void;
}

export function MessagingSection({ initialProjectId, onProjectSelect }: MessagingSectionProps) {
    const { user, isAdmin } = useAuth();
    const { projects } = useProjects();
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(initialProjectId || null);
    const [searchQuery, setSearchQuery] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    // Sync with props if they change
    useEffect(() => {
        if (initialProjectId !== undefined) {
            setSelectedProjectId(initialProjectId);
        }
    }, [initialProjectId]);

    const handleProjectSelect = (id: string | null) => {
        setSelectedProjectId(id);
        onProjectSelect?.(id);
    };

    const selectedProject = projects.find(p => p.id === selectedProjectId);
    const { messages, sendMessage, updateMessage, deleteMessage, uploadMedia, isLoading } = useMessages(selectedProjectId);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    // If user (not admin), auto-select their first project if only one exists
    useEffect(() => {
        if (!isAdmin && projects.length === 1 && !selectedProjectId) {
            setSelectedProjectId(projects[0].id);
        }
    }, [isAdmin, projects, selectedProjectId]);

    const filteredProjects = projects.filter(p =>
        p.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-[calc(100vh-140px)] flex gap-4 overflow-hidden">
            {/* Sidebar - Project List (Always show if Admin, hide on mobile if project selected) */}
            <Card className={cn(
                "w-80 flex flex-col overflow-hidden transition-all duration-300",
                selectedProjectId && "hidden md:flex",
                !selectedProjectId && "w-full md:w-80 flex"
            )}>
                <div className="p-4 border-b space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        Chats
                    </h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search projects..."
                            className="pl-9 bg-muted/50 border-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <ScrollArea className="flex-1">
                    <div className="p-2 space-y-1">
                        {filteredProjects.map((project) => (
                            <button
                                key={project.id}
                                onClick={() => handleProjectSelect(project.id)}
                                className={cn(
                                    "w-full p-3 rounded-xl flex items-center gap-3 transition-colors text-left",
                                    selectedProjectId === project.id
                                        ? "bg-primary/10"
                                        : "hover:bg-muted"
                                )}
                            >
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <Sparkles className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-semibold truncate capitalize text-sm">
                                            {project.type} Project
                                        </span>
                                        <span className="text-[10px] text-muted-foreground italic uppercase">
                                            {project.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">
                                        Click to view messages
                                    </p>
                                </div>
                            </button>
                        ))}
                        {filteredProjects.length === 0 && (
                            <div className="p-8 text-center text-muted-foreground">
                                <p className="text-sm">No projects found</p>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </Card>

            {/* Main Chat Area */}
            <Card className={cn(
                "flex-1 flex flex-col items-center justify-center bg-muted/5 border-none relative overflow-hidden",
                !selectedProjectId && "hidden md:flex"
            )}>
                {selectedProjectId ? (
                    <div className="w-full h-full flex flex-col bg-background">
                        {/* Chat Header */}
                        <div className="p-3 border-b flex items-center justify-between bg-background/80 backdrop-blur-md z-10">
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden"
                                    onClick={() => handleProjectSelect(null)}
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Sparkles className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm capitalize">
                                        {selectedProject?.type} Project
                                    </h4>
                                    <p className="text-[10px] text-green-500 font-medium">Online</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages Scroll Area */}
                        <div
                            className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scroll-smooth"
                            ref={scrollRef}
                            style={{
                                backgroundImage: 'url("https://w0.peakpx.com/wallpaper/580/630/HD-wallpaper-whatsapp-background-whatsapp-doodle-patterns-thumbnail.jpg")',
                                backgroundOpacity: 0.05,
                                backgroundBlendMode: 'overlay'
                            }}
                        >
                            <div className="max-w-4xl mx-auto flex flex-col justify-end min-h-full">
                                {messages.length === 0 && !isLoading && (
                                    <div className="text-center py-10">
                                        <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs py-2 px-4 rounded-lg inline-block shadow-sm">
                                            🔒 Messages are end-to-end encrypted. No one outside of this chat can read them.
                                        </div>
                                    </div>
                                )}
                                {messages.map((msg) => (
                                    <MessageBubble
                                        key={msg.id}
                                        message={msg}
                                        onEdit={updateMessage}
                                        onDelete={deleteMessage}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="max-w-4xl w-full mx-auto">
                            <ChatInput
                                onSendMessage={sendMessage}
                                onUploadMedia={uploadMedia}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="text-center p-12 max-w-sm">
                        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                            <MessageSquare className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Dabstack Messaging</h3>
                        <p className="text-muted-foreground text-sm">
                            Select a project from the left to start communicating with your {isAdmin ? 'client' : 'admin'} in real-time.
                        </p>
                    </div>
                )}
            </Card>
        </div>
    );
}
