import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Smile,
    Paperclip,
    Mic,
    Send,
    X,
    Image as ImageIcon,
    Loader2,
    MicOff
} from "lucide-react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ChatInputProps {
    onSendMessage: (content: string, type: "text" | "image" | "audio") => Promise<void>;
    onUploadMedia: (file: File) => Promise<{ publicUrl?: string; error: any }>;
}

export function ChatInput({ onSendMessage, onUploadMedia }: ChatInputProps) {
    const [text, setText] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const { theme } = useTheme();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const handleSend = async () => {
        if (!text.trim() || isUploading) return;
        const content = text.trim();
        setText("");
        setShowEmoji(false);
        await onSendMessage(content, "text");
    };

    const onEmojiClick = (emojiData: any) => {
        setText((prev) => prev + emojiData.emoji);
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("File is too large. Max 5MB.");
            return;
        }

        setIsUploading(true);
        const { publicUrl, error } = await onUploadMedia(file);

        if (error) {
            toast.error("Failed to upload image");
        } else if (publicUrl) {
            await onSendMessage(publicUrl, "image");
        }
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
                const audioFile = new File([audioBlob], "recording.webm", { type: "audio/webm" });

                setIsUploading(true);
                const { publicUrl, error } = await onUploadMedia(audioFile);
                if (publicUrl) {
                    await onSendMessage(publicUrl, "audio");
                } else {
                    toast.error("Failed to send voice note");
                }
                setIsUploading(false);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            toast.error("Microphone access denied");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    return (
        <div className="relative p-3 bg-background border-t">
            {showEmoji && (
                <div className="absolute bottom-full left-0 z-50 mb-2">
                    <EmojiPicker
                        onEmojiClick={onEmojiClick}
                        theme={theme === "dark" ? Theme.DARK : Theme.LIGHT}
                        lazyLoadEmojis={true}
                    />
                </div>
            )}

            <div className="flex items-center gap-2 max-w-4xl mx-auto">
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowEmoji(!showEmoji)}
                        className={cn("text-muted-foreground", showEmoji && "text-primary")}
                    >
                        <Smile className="h-5 w-5" />
                    </Button>

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-muted-foreground"
                        disabled={isUploading}
                    >
                        {isUploading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <Paperclip className="h-5 w-5" />
                        )}
                    </Button>
                </div>

                <div className="flex-1 relative">
                    <Input
                        placeholder={isRecording ? "Recording voice note..." : "Type a message..."}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        disabled={isRecording || isUploading}
                        className="pr-10 bg-muted/50 border-none focus-visible:ring-1"
                    />
                </div>

                <div className="flex items-center gap-1">
                    {text.trim() || isUploading ? (
                        <Button
                            size="icon"
                            onClick={handleSend}
                            disabled={!text.trim() || isUploading}
                            className="rounded-full bg-primary hover:bg-primary/90"
                        >
                            <Send className="h-5 w-5 text-white" />
                        </Button>
                    ) : (
                        <Button
                            size="icon"
                            onMouseDown={startRecording}
                            onMouseUp={stopRecording}
                            onTouchStart={startRecording}
                            onTouchEnd={stopRecording}
                            className={cn(
                                "rounded-full transition-all duration-300",
                                isRecording
                                    ? "bg-destructive hover:bg-destructive/90 scale-125 animate-pulse"
                                    : "bg-primary hover:bg-primary/90"
                            )}
                        >
                            {isRecording ? (
                                <MicOff className="h-5 w-5 text-white" />
                            ) : (
                                <Mic className="h-5 w-5 text-white" />
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
