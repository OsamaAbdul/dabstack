import { motion } from "framer-motion";
import {
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Code,
  Layout
} from "lucide-react";
import { useState } from "react";
import { PrivacyPolicyModal, TermsOfServiceModal } from "./LegalModals";

export function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const socialLinks = [
    { icon: Twitter, href: "https://www.x.com/dabstacknigeria", label: "Twitter" },
    { icon: Instagram, href: "https://www.instagram.com/dab.stack", label: "Instagram" },
    { icon: Youtube, href: "#", label: "Youtube" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const quickLinks = [
    { label: "Portfolio", href: "#portfolio" },
    { label: "Tech Stack", href: "#tech-stack" },
    { label: "About Us", href: "#about" },
    { label: "Contact Us", href: "#contact" },
  ];

  const services = [
    { label: "Web Development", href: "#" },
    { label: "Mobile App Design", href: "#" },
    { label: "SEO Optimization", href: "#" },
    { label: "SM Management", href: "#" },
  ];

  return (
    <footer className="bg-background border-t border-border text-foreground pt-24 pb-12 relative overflow-hidden transition-colors duration-300">
      {/* Subtle brand glow - keeping it subtle to match Dabstack aesthetic */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img
                src="/LIGHTMODE.jpg"
                alt="DABSTACK"
                className="dark:hidden rounded-lg shadow-sm h-12 w-auto"
              />
              <img
                src="/DARKMODE.png"
                alt="DABSTACK"
                className="hidden dark:block rounded-lg shadow-sm h-12 w-auto"
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Dabstack Solution Limited is a premier web design and development company. We specialize in building high-performance digital solutions that empower businesses to scale and dominate their markets through innovation and excellence.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all duration-300 border border-border group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block text-foreground uppercase tracking-wider">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-red-600 rounded-full" />
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-red-600 flex items-center gap-2 transition-colors duration-200 group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block text-foreground uppercase tracking-wider">
              Our Services
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-red-600 rounded-full" />
            </h4>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className="text-muted-foreground hover:text-red-600 flex items-center gap-2 transition-colors duration-200 group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-bold mb-8 relative inline-block text-foreground uppercase tracking-wider">
                Contact Info
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-red-600 rounded-full" />
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 text-muted-foreground group cursor-pointer hover:text-foreground transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-red-600/10 group-hover:text-red-600 transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="mt-2">+234 703 322 1019</span>
                </li>
                <li className="flex items-start gap-4 text-muted-foreground group cursor-pointer hover:text-foreground transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-red-600/10 group-hover:text-red-600 transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="mt-2 text-sm break-all">dabstack.ltd@gmail.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold mb-4 text-foreground/70 uppercase tracking-widest">Global Offices</h4>
              <ul className="space-y-4">

                <li className="flex items-start gap-3 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                  <span>Karu, Abuja</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} <span className="text-foreground font-serif font-medium tracking-tight text-lg">Dabstack</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-muted-foreground">
            <button onClick={() => setShowPrivacy(true)} className="hover:text-red-600 transition-colors">Privacy Policy</button>
            <button onClick={() => setShowTerms(true)} className="hover:text-red-600 transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>

      <PrivacyPolicyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <TermsOfServiceModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </footer>
  );
}
