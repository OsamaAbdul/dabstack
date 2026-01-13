import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import {
  Layers,
  ShoppingCart,
  Smartphone,
  FileText,
  ArrowRight,
  ArrowLeft,
  CalendarIcon,
  Loader2,
  X
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  isLoading?: boolean;
}

export interface OnboardingData {
  type: string;
  targetAudience: string;
  budget: number;
  timeline: Date | null;
}

const projectTypes = [
  { id: "saas", label: "SaaS", icon: Layers, description: "Software as a Service" },
  { id: "ecommerce", label: "E-commerce", icon: ShoppingCart, description: "Online Store" },
  { id: "mobile", label: "Mobile App", icon: Smartphone, description: "iOS & Android" },
  { id: "landing", label: "Landing Page", icon: FileText, description: "Marketing Site" },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export function OnboardingFlow({ onComplete, isLoading }: OnboardingFlowProps) {
  const [[step, direction], setStep] = useState([0, 0]);
  const [data, setData] = useState<OnboardingData>({
    type: "",
    targetAudience: "",
    budget: 500000,
    timeline: null,
  });

  const paginate = (newDirection: number) => {
    setStep([step + newDirection, newDirection]);
  };

  const handleTypeSelect = (type: string) => {
    setData((prev) => ({ ...prev, type }));
  };

  const handleAudienceChange = (audience: string) => {
    setData((prev) => ({ ...prev, targetAudience: audience }));
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return !!data.type;
      case 1:
        return !!data.targetAudience.trim();
      case 2:
        return true;
      default:
        return false;
    }
  };

  const handleComplete = () => {
    onComplete(data);
  };

  return (
    <div className="min-h-[500px] relative overflow-hidden">
      {/* Progress Indicator */}
      <div className="flex justify-center gap-2 mb-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              step === i ? "w-8 bg-primary" : "w-2 bg-muted"
            )}
          />
        ))}
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          {step === 0 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">What are we building?</h2>
                <p className="text-muted-foreground">
                  Select the type of project you want to create
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {projectTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTypeSelect(type.id)}
                    className={cn(
                      "p-6 rounded-xl border-2 text-left transition-all",
                      data.type === type.id
                        ? "border-primary bg-primary/5 shadow-medium"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <type.icon
                      className={cn(
                        "h-8 w-8 mb-3",
                        data.type === type.id
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    />
                    <h3 className="font-semibold mb-1">{type.label}</h3>
                    <p className="text-sm text-muted-foreground">
                      {type.description}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Target Audience</h2>
                <p className="text-muted-foreground">
                  Who are you building this for?
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="audience">Audience Description</Label>
                  <Input
                    id="audience"
                    placeholder="e.g., Small business owners, Student entrepreneurs..."
                    value={data.targetAudience}
                    onChange={(e) => handleAudienceChange(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Budget & Timeline</h2>
                <p className="text-muted-foreground">
                  Help us understand your project scope
                </p>
              </div>
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Budget</Label>
                    <span className="font-semibold text-primary">
                      ₦{data.budget.toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    value={[data.budget]}
                    onValueChange={(value) =>
                      setData((prev) => ({ ...prev, budget: value[0] }))
                    }
                    min={100000}
                    max={10000000}
                    step={100000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₦100,000</span>
                    <span>₦10,000,000</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Expected Deadline</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !data.timeline && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {data.timeline
                          ? format(data.timeline, "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={data.timeline || undefined}
                        onSelect={(date) =>
                          setData((prev) => ({ ...prev, timeline: date || null }))
                        }
                        initialFocus
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Button
          variant="ghost"
          onClick={() => paginate(-1)}
          disabled={step === 0}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        {step < 2 ? (
          <Button
            onClick={() => paginate(1)}
            disabled={!canProceed()}
            className="gap-2"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleComplete}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                Complete Setup
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
