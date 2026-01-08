import { motion } from "framer-motion";
import { Layers, Zap, Shield, Palette, MessageSquare, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Multi-Step Onboarding",
    description: "Guided project setup that captures your vision, audience, and goals in minutes.",
  },
  {
    icon: Zap,
    title: "Lightning Fast Delivery",
    description: "From concept to launch in record time with our streamlined workflow.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and security protocols protect your data.",
  },
  {
    icon: Palette,
    title: "Pixel Perfect Design",
    description: "Premium, custom designs tailored to your brand identity.",
  },
  {
    icon: MessageSquare,
    title: "Real-time Communication",
    description: "WhatsApp-style messaging keeps you connected with your team.",
  },
  {
    icon: BarChart3,
    title: "Project Analytics",
    description: "Track progress, milestones, and deliverables in your command center.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Ship Faster</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A complete platform designed to streamline your digital product development from start to finish.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative h-full">
      <div className="h-full p-6 rounded-2xl bg-card border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}