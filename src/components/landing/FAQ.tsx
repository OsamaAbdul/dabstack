import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
    {
        question: "What services does Dabstack provide?",
        answer: "We offer end-to-end fullstack development, including web applications, mobile apps, specialized monitoring platforms, and agrotech solutions. Our expertise covers React, Python, Supabase, and more."
    },
    {
        question: "How long does it take to build a custom solution?",
        answer: "Project timelines vary based on complexity. A professional landing page might take 1-2 weeks, while a comprehensive SaaS platform or monitoring system can take 4-12 weeks from design to deployment."
    },
    {
        question: "Do you offer post-handover support?",
        answer: "Absolutely! We provide dedicated support and maintenance to ensure your product remains secure, scalable, and up-to-date with the latest technologies."
    },
    {
        question: "Can Dabstack help with UI/UX design?",
        answer: "Yes, we focus on high-fidelity, premium user interfaces. Every product we build undergoes rigorous design planning to ensure it looks professional and provides a world-class user experience."
    },
    {
        question: "How do you handle data security?",
        answer: "We leverage industry-standard tools like Supabase for secure authentication and backend logic. We also implement rigorous security audits and follow best practices for encryption and data privacy."
    }
];

function FAQItem({ question, answer, isOpen, onClick }: {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void
}) {
    return (
        <div className="border-b border-border/50">
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <span className={`text-lg font-semibold transition-colors duration-300 ${isOpen ? 'text-red-600' : 'text-foreground group-hover:text-red-500'}`}>
                    {question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0 ml-4"
                >
                    <Plus className={`w-6 h-6 transition-colors duration-300 ${isOpen ? 'text-red-600' : 'text-muted-foreground'}`} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-muted-foreground leading-relaxed max-w-3xl">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-background relative" id="faq">
            <div className="container mx-auto px-6 md:pl-24 md:pr-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-red-600 font-bold tracking-widest text-xs uppercase"
                    >
                        COMMON QUESTIONS
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold mt-4 mb-2"
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="h-1 w-20 bg-red-600 mx-auto"
                    ></motion.div>
                </div>

                {/* FAQ List */}
                <div className="max-w-3xl mx-auto bg-card p-4 md:p-8 rounded-[2.5rem] border border-border/40 shadow-sm">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>

                {/* Bottom Contact Prompt */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12 px-6 py-8 bg-card inline-block mx-auto rounded-3xl border border-dashed border-red-500/30 w-full md:w-auto"
                >
                    <p className="text-muted-foreground">
                        Still have questions? <span className="text-red-600 font-bold cursor-pointer hover:underline">Contact our support team</span> for instant help.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
