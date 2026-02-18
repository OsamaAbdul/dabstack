import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export function ContactSection() {
    return (
        <section className="py-24 bg-background relative" id="contact">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto bg-card rounded-[3rem] overflow-hidden border border-border/40 shadow-2xl flex flex-col lg:flex-row">

                    {/* Contact Info Side */}
                    <div className="lg:w-2/5 bg-[#0B0F1A] p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] -mr-32 -mt-32" />

                        <h3 className="text-3xl font-bold mb-8 relative z-10">Get in Touch</h3>
                        <p className="text-gray-400 mb-12 relative z-10">
                            Ready to start your next project? Contact us today for a free consultation and let's build something amazing together.
                        </p>

                        <div className="space-y-8 relative z-10">
                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-red-600 transition-all duration-300">
                                    <Phone className="w-6 h-6 text-red-500 group-hover:text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 font-medium">Call Us Only</p>
                                    <p className="text-lg font-semibold">+234 814 888 2303</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-red-600 transition-all duration-300">
                                    <Mail className="w-6 h-6 text-red-500 group-hover:text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 font-medium">Email Address</p>
                                    <p className="text-lg font-semibold">contact@dabstack.com.ng</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-red-600 transition-all duration-300">
                                    <MapPin className="w-6 h-6 text-red-500 group-hover:text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 font-medium">Lagos Office</p>
                                    <p className="text-base">Otta road, Ijora Olopa, Lagos State</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Side */}
                    <div className="lg:w-3/5 p-12 bg-card">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-background border border-border/50 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full bg-background border border-border/50 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">Subject</label>
                                <select className="w-full bg-background border border-border/50 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all appearance-none cursor-pointer">
                                    <option>Web Development</option>
                                    <option>Mobile App</option>
                                    <option>SEO Services</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">Message</label>
                                <textarea
                                    placeholder="Tell us about your project..."
                                    rows={4}
                                    className="w-full bg-background border border-border/50 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all resize-none"
                                ></textarea>
                            </div>

                            <button className="w-full bg-red-600 text-white font-bold py-5 rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 group">
                                Send Message
                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
