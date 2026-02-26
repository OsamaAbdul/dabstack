import { motion } from "framer-motion";

const technologies = [
    { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
    { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Shopify", logo: "https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg" },
    { name: "WooCommerce", logo: "https://www.vectorlogo.zone/logos/woocommerce/woocommerce-icon.svg" },
    { name: "WordPress", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
    { name: "Tailwind CSS", logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
];

export function TechStack() {
    return (
        <section className="py-24 bg-background relative overflow-hidden" id="tech-stack">
            <div className="container mx-auto px-6 text-center">
                {/* Header */}
                <div className="mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-red-600 font-bold tracking-widest text-xs uppercase"
                    >
                        TECHNOLOGIES WE USE
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-serif font-medium mt-4 mb-2"
                    >
                        Our Tech Stack
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="h-1 w-20 bg-red-600 mx-auto mb-8"
                    ></motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-muted-foreground max-w-4xl mx-auto text-sm md:text-base leading-relaxed"
                    >
                        We are highly proficient in HTML, CSS, Javascript, Python, Django, Bootstrap, MySQL, React JS, Woocommerce, Wordpress, Shopify and many other tools.
                    </motion.p>
                </div>

                {/* Tech Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {technologies.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            initial={{
                                opacity: 0,
                                x: index % 2 === 0 ? -50 : 50,
                                y: 20
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                                y: 0
                            }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.1,
                                ease: "easeOut" // Changed from custom array to standard easing string
                            }}
                            whileHover={{
                                scale: 1.05,
                                translateY: -8,
                            }}
                            className="bg-card border border-border/40 p-8 pt-10 rounded-[2.5rem] flex flex-col items-center justify-center group transition-all duration-500 hover:border-red-500/20 hover:shadow-2xl hover:shadow-red-500/5 shadow-sm overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:to-transparent transition-all duration-500" />

                            <div className="relative w-16 h-16 flex items-center justify-center mb-6 z-10">
                                <img
                                    src={tech.logo}
                                    alt={tech.name}
                                    className="w-full h-full object-contain transition-all duration-500 transform group-hover:scale-110 drop-shadow-sm"
                                    onError={(e) => {
                                        const img = e.currentTarget;
                                        img.style.display = 'none';
                                        img.parentElement!.innerHTML += `<div class="font-bold text-red-600/50">${tech.name[0]}</div>`;
                                    }}
                                />
                            </div>

                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 group-hover:text-red-500 transition-colors duration-300 z-10">
                                {tech.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
