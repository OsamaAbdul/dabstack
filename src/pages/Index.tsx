import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { Footer } from "@/components/landing/Footer";
import { About } from "@/components/landing/About";
import { AuthModal } from "@/components/auth/AuthModal";

import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleGetStarted = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onGetStarted={handleGetStarted} />
      <main>
        <HeroSection onGetStarted={handleGetStarted} />
        <About />

        <HowItWorksSection />

      </main>
      <Footer />
      <ScrollToTop />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Index;