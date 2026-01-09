import { motion } from "framer-motion";
import { UserPlus, FileText, CreditCard, Package } from "lucide-react";

const steps = [
    {
        order: 1,
        title: "Create Account",
        description: "Sign up in seconds to access your personalized dashboard.",
        icon: UserPlus,
    },
    {
        order: 2,
        title: "State Project Details",
        description: "Tell us what you want to build. Share your requirements and vision.",
        icon: FileText,
    },
    {
        order: 3,
        title: "Make Payment",
        description: "Securely process payment to kickstart your project's development.",
        icon: CreditCard,
    },
    {
        order: 4,
        title: "Get Delivered",
        description: "Receive your fully optimized, premium website ready for launch.",
        icon: Package,
    },
];

export function HowItWorksSection() {
    return (
        <section className="py-24 bg-muted/30 relative overflow-hidden transition-colors duration-300">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-sans"
                    >
                        How It Works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        Go from idea to deployed application in four simple steps.
                    </motion.p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0 hidden md:block -translate-x-1/2" />

                    <div className="flex flex-col gap-12 md:gap-24">
                        {steps.map((step, index) => (
                            <TimelineItem key={index} step={step} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ step, index }: { step: typeof steps[0]; index: number }) {
    const isEven = index % 2 === 0;

    return (
        <div className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-8`}>

            {/* Center Checkpoint/Dot (Desktop) */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-background bg-blue-600 z-10 items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-colors duration-300">
                <span className="text-white font-bold text-sm">{step.order}</span>
            </div>

            {/* Content Side */}
            <motion.div
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`w-full md:w-[calc(50%-3rem)] ${isEven ? 'text-left md:text-right' : 'text-left'}`}
            >
                <div className={`
            p-8 rounded-2xl border border-border bg-card backdrop-blur-sm 
            hover:border-blue-500/30 transition-all duration-300 group
            shadow-lg hover:shadow-xl
        `}>
                    <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : 'flex-row'}`}>
                        <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 group-hover:text-white group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-colors">
                            <step.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground font-sans">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                    </p>
                </div>
            </motion.div>

            {/* Empty Spacer Side (Desktop) */}
            <div className="hidden md:block w-[calc(50%-3rem)]" />
        </div>
    );
}
