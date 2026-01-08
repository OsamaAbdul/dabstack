import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sparkles, Mail, Lock, User, ArrowRight, Chrome, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup" | "reset_password">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      if (mode === "signin") {
        const { error } = await signIn(email, password);
        if (error) throw error;
        onClose();
        navigate("/dashboard");
      } else if (mode === "signup") {
        const { error } = await signUp(email, password, name);
        if (error) throw error;
        onClose();
        navigate("/dashboard");
      } else if (mode === "reset_password") {
        const { error } = await resetPassword(email);
        if (error) throw error;
        setSuccessMessage("Check your email for the password reset link.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-border/50 shadow-large">
        <div className="p-6 sm:p-8">
          {/* Logo */}
          <DialogHeader className="text-center mb-6">
            <div className="mx-auto h-12 w-12 rounded-xl bg-primary flex items-center justify-center shadow-medium mb-4">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <DialogTitle className="text-2xl font-bold">
              {mode === "signin"
                ? "Welcome back"
                : mode === "signup"
                  ? "Create an account"
                  : "Reset Password"}
            </DialogTitle>
          </DialogHeader>

          {/* Social Auth - Hide in reset mode */}
          {mode !== "reset_password" && (
            <div className="grid grid-cols-1 gap-3 mb-6">
              <Button
                variant="outline"
                className="h-11 font-medium hover-lift"
                onClick={handleGoogleLogin}
                disabled={isSubmitting}
                type="button"
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Chrome className="mr-2 h-4 w-4" />
                )}
                Google
              </Button>
            </div>
          )}

          {mode !== "reset_password" && (
            <div className="relative mb-6">
              <Separator />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-xs text-muted-foreground uppercase tracking-wider">
                or continue with
              </span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
                {error}
              </div>
            )}
            {successMessage && (
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-medium">
                {successMessage}
              </div>
            )}

            <AnimatePresence mode="wait">
              {mode === "signup" && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Osama abdul"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 h-11"
                        required={mode === "signup"}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11"
                  required
                />
              </div>
            </div>

            {mode !== "reset_password" && (
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>
            )}

            {mode === "signin" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setMode("reset_password");
                    setError("");
                    setSuccessMessage("");
                  }}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {mode === "reset_password" && successMessage ? (
              <Button
                type="button"
                onClick={() => {
                  setMode("signin");
                  setSuccessMessage("");
                  setError("");
                }}
                className="w-full h-12 font-semibold shadow-soft hover-lift"
              >
                Back to Sign In
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 font-semibold shadow-soft hover-lift group"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    {mode === "signin"
                      ? "Sign In"
                      : mode === "signup"
                        ? "Create Account"
                        : "Send Reset Link"}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            )}

            {mode === "reset_password" && !successMessage && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setMode("signin");
                    setError("");
                    setSuccessMessage("");
                  }}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Back to Sign In
                </button>
              </div>
            )}
          </form>

          {/* Switch Mode */}
          {mode !== "reset_password" && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "signin" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setError("");
                    }}
                    className="text-primary font-semibold hover:underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signin");
                      setError("");
                    }}
                    className="text-primary font-semibold hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
