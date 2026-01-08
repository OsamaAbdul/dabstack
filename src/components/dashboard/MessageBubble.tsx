import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Database } from "@/integrations/supabase/types";
import { useAuth } from "@/hooks/useAuth";
import { Play, Pause, MoreVertical, Pencil, Trash2, Check, X } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type Message = Database["public"]["Tables"]["messages"]["Row"];

interface MessageBubbleProps {
    message: Message;
    onEdit?: (messageId: string, newContent: string) => Promise<void>;
    onDelete?: (messageId: string) => Promise<void>;
}

export function MessageBubble({ message, onEdit, onDelete }: MessageBubbleProps) {
    const { user } = useAuth();
    const isMe = message.sender_id === user?.id;
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(message.content);
    const [isDeleting, setIsDeleting] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const toggleAudio = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSaveEdit = async () => {
        if (onEdit && editedContent.trim() !== message.content) {
            await onEdit(message.id, editedContent.trim());
        }
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditedContent(message.content);
        setIsEditing(false);
    };

    const handleDelete = async () => {
        if (onDelete) {
            setIsDeleting(true);
            await onDelete(message.id);
        }
    };

    return (
        <AnimatePresence>
            {!isDeleting && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, height: 0 }}
                    className={cn(
                        "flex w-full mb-2 group",
                        isMe ? "justify-end" : "justify-start"
                    )}
                >
                    <div className="flex items-end gap-2 max-w-[75%]">
                        {isMe && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <MoreVertical className="h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {message.type === "text" && (
                                        <DropdownMenuItem onClick={() => setIsEditing(true)}>
                                            <Pencil className="h-4 w-4 mr-2" />
                                            Edit
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem
                                        onClick={handleDelete}
                                        className="text-destructive focus:text-destructive"
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}

                        <div
                            className={cn(
                                "px-3 py-2 rounded-2xl relative shadow-sm",
                                isMe
                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                    : "bg-background border border-border rounded-tl-none"
                            )}
                        >
                            {/* Render content based on type */}
                            {message.type === "text" && !isEditing && (
                                <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                            )}

                            {message.type === "text" && isEditing && (
                                <div className="flex flex-col gap-2 min-w-[200px]">
                                    <Input
                                        value={editedContent}
                                        onChange={(e) => setEditedContent(e.target.value)}
                                        className={cn(
                                            "text-sm",
                                            isMe ? "bg-primary-foreground/10 text-primary-foreground" : ""
                                        )}
                                        autoFocus
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSaveEdit();
                                            } else if (e.key === "Escape") {
                                                handleCancelEdit();
                                            }
                                        }}
                                    />
                                    <div className="flex gap-2 justify-end">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={handleCancelEdit}
                                            className="h-6 px-2"
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={handleSaveEdit}
                                            className="h-6 px-2"
                                        >
                                            <Check className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {message.type === "image" && (
                                <>
                                    <div className="rounded-lg overflow-hidden">
                                        <img
                                            src={message.content}
                                            alt="Sent image"
                                            className="max-w-full h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
                                            onClick={() => setIsPreviewOpen(true)}
                                        />
                                    </div>
                                    <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                                        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none shadow-none">
                                            <img
                                                src={message.content}
                                                alt="Preview"
                                                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                                            />
                                        </DialogContent>
                                    </Dialog>
                                </>
                            )}

                            {message.type === "audio" && (
                                <div className="flex items-center gap-3 min-w-[200px] py-1">
                                    <button
                                        onClick={toggleAudio}
                                        className={cn(
                                            "h-8 w-8 rounded-full flex items-center justify-center transition-colors",
                                            isMe ? "bg-primary-foreground/20" : "bg-primary/10"
                                        )}
                                    >
                                        {isPlaying ? (
                                            <Pause className="h-4 w-4" />
                                        ) : (
                                            <Play className="h-4 w-4 ml-0.5" />
                                        )}
                                    </button>
                                    <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className={cn(
                                                "h-full w-1/3",
                                                isMe ? "bg-primary-foreground" : "bg-primary"
                                            )}
                                        />
                                    </div>
                                    <audio
                                        ref={audioRef}
                                        src={message.content}
                                        onEnded={() => setIsPlaying(false)}
                                        className="hidden"
                                    />
                                    <span className="text-[10px] opacity-70">Voice</span>
                                </div>
                            )}

                            {/* Timestamp */}
                            <div
                                className={cn(
                                    "text-[10px] mt-1 flex justify-end opacity-60",
                                    isMe ? "text-primary-foreground/80" : "text-muted-foreground"
                                )}
                            >
                                {format(new Date(message.created_at), "HH:mm")}
                            </div>

                            {/* Tail */}
                            <div
                                className={cn(
                                    "absolute top-0 w-2 h-2",
                                    isMe
                                        ? "right-[-6px] border-t-[8px] border-t-primary border-r-[8px] border-r-transparent"
                                        : "left-[-6px] border-t-[8px] border-t-background border-l-[8px] border-l-transparent"
                                )}
                                style={{
                                    filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))",
                                    borderLeftColor: isMe ? "transparent" : undefined,
                                    borderRightColor: isMe ? undefined : "transparent",
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
