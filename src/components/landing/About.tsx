import { motion } from "framer-motion";
import { CheckCircle2, Trophy, Users, Zap } from "lucide-react";

export function About() {
    const stats = [
        { label: "Projects Completed", value: "50+", icon: Trophy },
        { label: "Happy Clients", value: "10+", icon: Users },
        { label: "Success Rate", value: "99%", icon: CheckCircle2 },
        { label: "Active Support", value: "24/7", icon: Zap },
    ];

    return (
        <section className="py-24 bg-background relative overflow-hidden" id="about">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <div className="w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
            </div>
            <div className="absolute bottom-0 left-0 p-12 opacity-5 pointer-events-none">
                <div className="w-64 h-64 rounded-full bg-indigo-500 blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Text Content */}
                    <div className="flex-1 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-3">
                                Our Expertise
                            </h2>
                            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                                Building & Managing <span className="text-blue-600 dark:text-blue-400">World-Class Digital Products</span>
                            </h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                We are a full-service development partner dedicated to bringing your digital vision to life. From complex SaaS platforms and high-conversion e-commerce stores to seamless mobile applications, we handle the entire lifecycle of your product.
                            </p>
                            <br />
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Our team of expert developers and product managers ensures that every solution we build is scalable, secure, and professionally managed, allowing you to focus on growing your business while we handle the technology.
                            </p>
                        </motion.div>

                        {/* Values / Features Grid based on text content */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                            {[
                                "Custom Web Applications",
                                "Scalable SaaS Platforms",
                                "Native Mobile Apps",
                                "E-commerce Solutions"
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex items-center space-x-3"
                                >
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span className="font-medium text-foreground">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Stats / Visual Content */}
                    <div className="flex-1 w-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="grid grid-cols-2 gap-6"
                        >
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-card border border-border/50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                                        <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
