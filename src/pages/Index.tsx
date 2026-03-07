import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { Footer } from "@/components/landing/Footer";
import { About } from "@/components/landing/About";
import { TechStack } from "@/components/landing/TechStack";
import { Portfolio } from "@/components/landing/Portfolio";
import { FAQ } from "@/components/landing/FAQ";
import { ContactSection } from "@/components/landing/ContactSection";
import { AuthModal } from "@/components/auth/AuthModal";

import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { RegistrationCard } from "@/components/landing/RegistrationCard";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/dashboard");
    }
  }, [user, isLoading, navigate]);


  const handleGetStarted = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onGetStarted={handleGetStarted} />
      <main>
        <HeroSection onGetStarted={handleGetStarted} />
        <About />
        <TechStack />
        <Portfolio />
        <FAQ />
        <ContactSection />

        <HowItWorksSection />

        <RegistrationCard />
      </main>
      <Footer />
      <ScrollToTop />
      <FloatingWhatsApp />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Index;