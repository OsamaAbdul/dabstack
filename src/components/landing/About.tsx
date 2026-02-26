import { motion, useScroll, useTransform } from "framer-motion";
import {
    Trophy, Users, Globe, Zap,
    Code2, Settings2, Palette,
    Target, Eye, Sparkles, ChevronRight
} from "lucide-react";
import { useRef } from "react";

export function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const rotateParallax = useTransform(scrollYProgress, [0, 1], [0, 20]);

    const features = [
        {
            icon: Trophy,
            title: "Award Winning",
            description: "Best Fullstack Solutions 2024",
            color: "text-red-500",
            bgColor: "bg-red-500/10"
        },
        {
            icon: Users,
            title: "500+ Clients",
            description: "Trusted by teams worldwide",
            color: "text-red-500",
            bgColor: "bg-red-500/10"
        },
        {
            icon: Globe,
            title: "Global Reach",
            description: "Offices in major tech hubs",
            color: "text-red-500",
            bgColor: "bg-red-500/10"
        },
        {
            icon: Zap,
            title: "24/7 Support",
            description: "Always here to help you",
            color: "text-red-500",
            bgColor: "bg-red-500/10"
        },
    ];

    const cards = [
        {
            title: "Our Key Services",
            icon: Code2,
            iconBg: "bg-red-600",
            items: [
                { label: "Web Development", text: "We create custom websites developed to your business needs and goals." },
                { label: "Fullstack Architecture", text: "Our scalable solutions provide the backbone for your digital growth." },
                { label: "Managed Infrastructure", text: "We handle the complexity of deployment and scaling for you." }
            ],
            borderColor: "border-red-500/10 dark:border-red-500/20"
        },
        {
            title: "Our Mission",
            icon: Target,
            iconBg: "bg-red-700",
            items: [
                { text: "To help businesses build their brand through professional fullstack solutions that drive results." },
                { text: "To create software that perfectly aligns with each client's specific needs and goals." }
            ],
            borderColor: "border-red-500/10 dark:border-red-500/20"
        },
        {
            title: "Our Vision",
            icon: Eye,
            iconBg: "bg-red-800",
            items: [
                { text: "To become the global leader in managed fullstack development, known for excellence and innovation." },
                { text: "To empower businesses & individuals across the globe with premium digital solutions." }
            ],
            borderColor: "border-red-500/10 dark:border-red-500/20"
        }
    ];

    const transition = { duration: 0.8, ease: "easeOut" };

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden" id="about">
            {/* Background Decorative Elements */}
            <motion.div
                style={{ y: yParallax, rotate: rotateParallax }}
                className="absolute top-0 -right-20 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none"
            />
            <motion.div
                style={{ y: yParallax, rotate: -rotateParallax }}
                className="absolute bottom-0 -left-20 w-[600px] h-[600px] bg-red-800/5 rounded-full blur-[150px] pointer-events-none"
            />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={transition}
                        className="text-red-600 font-black tracking-[0.2em] text-sm uppercase block mb-4"
                    >
                        ABOUT US
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight mt-4 mb-6 text-foreground"
                    >
                        Dabstack Solution <span className="text-red-600 font-cursive italic">Limited</span>
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                        className="h-1.5 w-32 bg-red-600 mx-auto rounded-full"
                    />
                </div>

                <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
                    {/* Left side: Description */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={transition}
                        className="space-y-8"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                            Nigeria's Best <span className="text-red-600">Fullstack</span> Agency
                        </h3>
                        <div className="space-y-6">
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                                Dabstack Solution Limited are the best fullstack developers. We are passionate about helping businesses in the retail, finance, health and corporate industries fully leverage the latest <span className="text-red-600 font-serif italic border-b-2 border-red-600/20">software technologies</span>.
                            </p>
                            <p className="text-lg text-muted-foreground/80 leading-relaxed font-light">
                                We build corporate business solutions and ecommerce platforms for all kinds of businesses across <span className="text-red-600 font-serif italic border-b-2 border-red-600/20">global markets</span> and beyond. Our team is dedicated to creating solutions that meet your exact needs through technical excellence.
                            </p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 text-red-600 font-bold group"
                        >
                            Learn more about our process <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </motion.div>

                    {/* Right side: Feature Grid */}
                    <div className="grid grid-cols-2 gap-6 md:gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="bg-muted/30 backdrop-blur-sm border border-border/50 p-6 md:p-8 rounded-[32px] text-center shadow-sm hover:shadow-xl hover:shadow-red-500/5 hover:border-red-500/20 transition-all duration-300 group"
                            >
                                <motion.div
                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                    className={`w-20 h-20 rounded-[24px] ${feature.bgColor} flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all`}
                                >
                                    <feature.icon className={`w-10 h-10 ${feature.color}`} />
                                </motion.div>
                                <h4 className="font-black text-foreground text-lg mb-2">{feature.title}</h4>
                                <p className="text-sm text-muted-foreground font-medium">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom row: Info Cards */}
                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.15 }}
                            whileHover={{ y: -15 }}
                            className={`bg-card p-10 rounded-[40px] shadow-2xl border-2 ${card.borderColor} flex flex-col items-center text-center relative overflow-hidden group hover:border-red-500/30 transition-all duration-500`}
                        >
                            {/* Decorative Glow */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-600/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />

                            <motion.div
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                className={`w-20 h-20 rounded-[28px] ${card.iconBg} flex items-center justify-center mb-8 shadow-xl shadow-black/10`}
                            >
                                <card.icon className="w-10 h-10 text-white" />
                            </motion.div>
                            <h3 className="text-2xl font-black mb-8 tracking-tight">{card.title}</h3>
                            <ul className="space-y-6 text-left w-full">
                                {card.items.map((item, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: (index * 0.2) + (idx * 0.1) }}
                                        className="flex gap-4 text-base leading-relaxed text-muted-foreground group/item"
                                    >
                                        <div className="mt-2.5 w-2 h-2 rounded-full bg-red-600 flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                                        <span className="font-medium">
                                            {item.label && <span className="font-black text-foreground block mb-1">{item.label}</span>}
                                            {item.text}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
