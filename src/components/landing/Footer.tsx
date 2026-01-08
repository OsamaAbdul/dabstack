import { Github, Twitter, Linkedin, Sparkles } from "lucide-react";
import { useState } from "react";
import { PrivacyPolicyModal, TermsOfServiceModal } from "./LegalModals";

export function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <footer className="relative bg-[#F8FAFC] dark:bg-[#0A192F] text-gray-900 dark:text-white pt-20 pb-10 overflow-hidden border-t border-gray-200 dark:border-white/10 transition-colors duration-300">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16">

          {/* Brand section removed as per user request */}

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <SocialLink href="#" icon={Twitter} label="Twitter" />
            <SocialLink href="#" icon={Github} label="Github" />
            <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Dabstack. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <button onClick={() => setShowPrivacy(true)} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => setShowTerms(true)} className="hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>

      <PrivacyPolicyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <TermsOfServiceModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </footer>
  );
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  return (
    <a
      href={href}
      className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300 group"
      aria-label={label}
    >
      <Icon className="h-5 w-5 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all" />
    </a>
  );
}