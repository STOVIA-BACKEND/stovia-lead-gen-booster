import { useEffect } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { LeadCaptureForm } from "@/components/landing/LeadCaptureForm";
import { TrustSection } from "@/components/landing/TrustSection";
import { FooterSection } from "@/components/landing/FooterSection";

const Index = () => {
  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // SEO Meta tags
  useEffect(() => {
    document.title = "Free Commercial Kitchen Equipment Guides | Stovia";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", 
        "Download free expert guides for commercial kitchen equipment. Get professional insights on ovens, refrigeration, coffee makers, and more. Trusted by 500+ restaurants in Saudi Arabia."
      );
    }
  }, []);

  return (
    <main className="min-h-screen">
      <HeroSection onScrollToForm={scrollToForm} />
      <LeadCaptureForm />
      <TrustSection />
      <FooterSection />
    </main>
  );
};

export default Index;
