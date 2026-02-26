import { motion } from "framer-motion";

const projects = [
    {
        title: "Xandeum Analytics",
        category: "Web App • Analytics",
        description: "A comprehensive analytics platform for Xandeum pNodes, monitoring status, uptime, and version distribution via direct pRPC connection.",
        image: "https://osamaabduldev.vercel.app/images/xandium.png",
        color: "from-red-600/20 to-transparent",
        link: "https://xandeum-pnode-monitor.vercel.app/"
    },
    {
        title: "EduSparkz",
        category: "Web App • AI Learning",
        description: "An innovative AI-powered learning platform that transforms PDFs, docs, and images into interactive quizzes and personalized study partners.",
        image: "https://osamaabduldev.vercel.app/images/edu-sparkz.png",
        color: "from-red-600/20 to-transparent",
        link: "https://edusparkz.fun"
    },
    {
        title: "Airdrop Catcher",
        category: "Web App • Solana Game",
        description: "A fast-paced, high-stakes arcade game built on Solana. Collect tokens like SOL and BONK while avoiding scams, rugs, and wallet drainers.",
        image: "https://osamaabduldev.vercel.app/images/scrolly.png",
        color: "from-red-600/20 to-transparent",
        link: "https://scrolly-airdrop-catcher.vercel.app/"
    },
    {
        title: "AGILE Tracker",
        category: "Web App • Monitoring & Evaluation",
        description: "A specialized digital monitoring platform for the Nasarawa State Ministry of Education, tracking the AGILE initiative for girls' empowerment.",
        image: "https://osamaabduldev.vercel.app/images/agile.png",
        color: "from-red-600/20 to-transparent",
        link: "https://agile-tracker-psi.vercel.app/auth"
    },
    {
        title: "NAYFLI",
        category: "Web App • Leadership Initiative",
        description: "A transformative fellowship platform for the Nasarawa Young Female Leadership Initiative, empowering young women through mentorship and sisterhood.",
        image: "https://osamaabduldev.vercel.app/images/nayfli.png",
        color: "from-red-600/20 to-transparent",
        link: "https://www.nayfli.org/"
    },
    {
        title: "Farmer Sales App",
        category: "Web App • Agrotech",
        description: "Connects farmers to buyers and agro-companies for verified seeds and grants. Integrated Grok AI to fetch real-time agricultural trends from X.",
        image: "https://osamaabduldev.vercel.app/images/farmer.png",
        color: "from-red-600/20 to-transparent",
        link: "#",
        hideLink: true
    },
    {
        title: "MemeX",
        category: "Web App • Blockchain • AI",
        description: "A high-fidelity memecoin launchpad on MultiversX. Uses Gemini AI to automate token creation, branding, and deployment with a single prompt.",
        image: "https://osamaabduldev.vercel.app/images/memex.png",
        color: "from-red-600/20 to-transparent",
        link: "https://memex-blush.vercel.app/"
    },

];

export function Portfolio() {
    return (
        <section className="py-24 bg-background relative overflow-hidden" id="portfolio">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-red-600 font-bold tracking-widest text-xs uppercase"
                    >
                        SOME EXAMPLES OF OUR WORKS
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-serif font-bold mt-4 mb-2"
                    >
                        Our Portfolio
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
                        className="text-muted-foreground max-w-3xl mx-auto text-sm md:text-base leading-relaxed"
                    >
                        As the top web designer in Nigeria and a leading web design company in Lagos, we've poured our hearts into hundreds of projects. Below are some of our works:
                    </motion.p>
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                y: 50,
                                scale: 0.9
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                scale: 1
                            }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.1,
                                ease: [0.21, 0.47, 0.32, 0.98]
                            }}
                            className="group relative bg-card rounded-[2.5rem] overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                        >
                            <div className="aspect-[4/3] overflow-hidden relative">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t ${project.color} group-hover:opacity-100 transition-opacity duration-500`} />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    {!project.hideLink ? (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-red-600 hover:text-white"
                                        >
                                            View Project
                                        </a>
                                    ) : (
                                        <span className="bg-white/10 backdrop-blur-md text-white px-6 py-2.5 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 border border-white/20">
                                            Case Study Coming Soon
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mb-2">
                                    {project.category}
                                </p>
                                <h3 className="text-xl font-serif font-medium text-foreground group-hover:text-red-600 transition-colors duration-300 mb-3">
                                    {project.title}
                                </h3>
                                {'description' in project && (
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {project.description}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
