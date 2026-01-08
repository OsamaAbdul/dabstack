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
    const [isPaused, setIsPaused] = useState(false);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const { theme } = useTheme();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

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
                // Determine if we should send or just discard based on flag? 
                // Currently onstop handles sending. We might need a way to discard.
                // Logic moved to handleSendRecording / handleCancelRecording
            };

            mediaRecorder.start();
            setIsRecording(true);
            setIsPaused(false);
            setRecordingDuration(0);

            timerRef.current = setInterval(() => {
                setRecordingDuration(prev => prev + 1);
            }, 1000);

        } catch (err) {
            console.error(err);
            toast.error("Microphone access denied");
        }
    };

    const pauseRecording = () => {
        if (mediaRecorderRef.current && isRecording && !isPaused) {
            mediaRecorderRef.current.pause();
            setIsPaused(true);
            if (timerRef.current) clearInterval(timerRef.current);
        }
    };

    const resumeRecording = () => {
        if (mediaRecorderRef.current && isRecording && isPaused) {
            mediaRecorderRef.current.resume();
            setIsPaused(false);
            timerRef.current = setInterval(() => {
                setRecordingDuration(prev => prev + 1);
            }, 1000);
        }
    };

    const cancelRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            mediaRecorderRef.current = null; // Detach
        }
        if (timerRef.current) clearInterval(timerRef.current);
        setIsRecording(false);
        setIsPaused(false);
        setRecordingDuration(0);
        chunksRef.current = [];
    };

    const sendRecording = async () => {
        if (!mediaRecorderRef.current) return;

        // Stop recorder and handle data
        const recorder = mediaRecorderRef.current;

        // We wrap the onstop logic here to ensure we capture the specific "send" intent
        // Using a promise to wait for final data
        const blobPromise = new Promise<Blob>((resolve) => {
            recorder.onstop = () => {
                const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
                resolve(audioBlob);
            };
        });

        recorder.stop();
        if (timerRef.current) clearInterval(timerRef.current);

        setIsRecording(false);
        setIsPaused(false);
        setIsUploading(true);

        try {
            const audioBlob = await blobPromise;
            const audioFile = new File([audioBlob], "recording.webm", { type: "audio/webm" });

            const { publicUrl, error } = await onUploadMedia(audioFile);
            if (publicUrl) {
                await onSendMessage(publicUrl, "audio");
            } else {
                toast.error("Failed to send voice note");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error processing recording");
        } finally {
            setIsUploading(false);
            recorder.stream.getTracks().forEach(track => track.stop());
            setRecordingDuration(0);
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

            {isRecording ? (
                <div className="flex items-center gap-4 max-w-4xl mx-auto h-[44px]">
                    <div className="flex items-center gap-2 text-destructive animate-pulse">
                        <Mic className="h-4 w-4" />
                        <span className="text-sm font-medium whitespace-nowrap">
                            {formatDuration(recordingDuration)}
                        </span>
                    </div>
                    <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                        <div className={cn(
                            "h-full bg-destructive transition-all duration-1000",
                            isPaused ? "opacity-50" : "animate-pulse"
                        )} style={{ width: '100%' }} />
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={cancelRecording}
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                            <X className="h-5 w-5" />
                        </Button>

                        {isPaused ? (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={resumeRecording}
                                className="text-primary hover:bg-primary/10"
                            >
                                <Mic className="h-5 w-5" />
                            </Button>
                        ) : (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={pauseRecording}
                                className="text-primary hover:bg-primary/10"
                            >
                                <MicOff className="h-5 w-5" />
                            </Button>
                        )}

                        <Button
                            size="icon"
                            onClick={sendRecording}
                            className="rounded-full bg-primary hover:bg-primary/90"
                        >
                            <Send className="h-5 w-5 text-primary-foreground" />
                        </Button>
                    </div>
                </div>
            ) : (
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
                            placeholder="Type a message..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            disabled={isUploading}
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
                                <Send className="h-5 w-5 text-primary-foreground" />
                            </Button>
                        ) : (
                            <Button
                                size="icon"
                                onClick={startRecording}
                                className="rounded-full bg-primary hover:bg-primary/90"
                            >
                                <Mic className="h-5 w-5 text-primary-foreground" />
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
