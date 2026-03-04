import { motion } from "framer-motion";
import { ShieldCheck, Award, FileText } from "lucide-react";

export const RegistrationCard = () => {
    return (
        <section className="py-12 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="relative group p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-background to-primary/5 border border-primary/20 backdrop-blur-sm shadow-2xl overflow-hidden">
                        {/* Background decorative elements */}
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500" />
                        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500" />

                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl animate-pulse" />
                                    <div className="relative bg-gradient-to-tr from-primary to-primary/80 p-5 rounded-2xl shadow-xl">
                                        <ShieldCheck className="w-12 h-12 text-white" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-primary font-semibold tracking-wide uppercase text-sm">
                                    <Award className="w-4 h-4" />
                                    <span>Fully Registered & Verified</span>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                                    Official Business Identity
                                </h2>

                                <p className="text-muted-foreground text-lg mb-6 max-w-2xl">
                                    DABSTACK is a legally recognized entity, operating with full transparency and
                                    compliance under the Corporate Affairs Commission (CAC).
                                </p>

                                <div className="inline-flex items-center gap-4 p-4 px-6 rounded-2xl bg-foreground/5 dark:bg-white/5 border border-foreground/10 backdrop-blur-md">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-muted-foreground uppercase font-medium tracking-wider">RC Number</span>
                                        <span className="text-2xl md:text-3xl font-mono font-bold text-primary tracking-tighter">
                                            9380703
                                        </span>
                                    </div>
                                    <div className="h-10 w-[1px] bg-foreground/10 mx-2 hidden sm:block" />
                                    <div className="hidden sm:flex flex-col items-start">
                                        <span className="text-xs text-muted-foreground uppercase font-medium tracking-wider">Status</span>
                                        <span className="flex items-center gap-1.5 text-green-500 font-bold text-sm">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            ACTIVE
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden lg:block opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                                <FileText className="w-24 h-24" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
