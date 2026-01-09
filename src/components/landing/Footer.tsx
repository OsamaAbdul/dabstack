import { Twitter, Instagram } from "lucide-react";
import { useState } from "react";
import { PrivacyPolicyModal, TermsOfServiceModal } from "./LegalModals";

export function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <footer className="relative bg-background text-foreground pt-20 pb-10 overflow-hidden border-t border-border transition-colors duration-300">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16">

          {/* Brand section removed as per user request */}

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <SocialLink href="https://www.x.com/dabstacknigeria" icon={Twitter} label="Twitter" />

            <SocialLink href="https://www.instagram.com/dab.stack" icon={Instagram} label="Instagram" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Dabstack. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <button onClick={() => setShowPrivacy(true)} className="hover:text-foreground transition-colors">Privacy Policy</button>
            <button onClick={() => setShowTerms(true)} className="hover:text-foreground transition-colors">Terms of Service</button>
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
      className="h-12 w-12 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 hover:border-border/80 hover:scale-110 transition-all duration-300 group"
      aria-label={label}
    >
      <Icon className="h-5 w-5 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] dark:group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all" />
    </a>
  );
}