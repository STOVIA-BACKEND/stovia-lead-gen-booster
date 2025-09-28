import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import stoviaLogo from "@/assets/stovia-logo.png";
import guideCoffee from "@/assets/guide-coffee.png";
import guideOvens from "@/assets/guide-ovens.png";
import guideRefrigeration from "@/assets/guide-refrigeration.png";
import guideDishwashing from "@/assets/guide-dishwashing.png";
import guideLaundry from "@/assets/guide-laundry.png";
import guideBakery from "@/assets/guide-bakery.png";

const guides = [
  { id: "coffee", image: guideCoffee, title: "Coffee Makers" },
  { id: "ovens", image: guideOvens, title: "Commercial Ovens" },
  { id: "refrigeration", image: guideRefrigeration, title: "Refrigeration" },
  { id: "dishwashing", image: guideDishwashing, title: "Dishwashing" },
  { id: "laundry", image: guideLaundry, title: "Laundry Solutions" },
  { id: "bakery", image: guideBakery, title: "Bakery Equipment" },
];

interface HeroSectionProps {
  onScrollToForm: () => void;
}

export const HeroSection = ({ onScrollToForm }: HeroSectionProps) => {
  const [currentGuide, setCurrentGuide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGuide((prev) => (prev + 1) % guides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-gradient min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Logo */}
      <div className="mb-12 fade-in-up">
        <img 
          src={stoviaLogo} 
          alt="Stovia Commercial Kitchen Equipment" 
          className="h-16 md:h-20 mx-auto"
        />
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-5xl leading-tight text-shadow fade-in-up">
        Six Expert Guides. One{" "}
        <span className="text-primary glow">Free Download</span>. 
        <br />Choose Yours Today.
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl fade-in-up">
        Covering commercial kitchens, bakery equipment, refrigeration, ovens, 
        coffee makers, laundry solutions, and more.
      </p>

      {/* Animated Guide Covers */}
      <div className="relative h-64 md:h-80 mb-12 flex items-center justify-center">
        {guides.map((guide, index) => (
          <div
            key={guide.id}
            className={`absolute transition-all duration-1000 ${
              index === currentGuide
                ? "opacity-100 scale-110 guide-underglow"
                : "opacity-0 scale-95"
            }`}
          >
            <img
              src={guide.image}
              alt={`${guide.title} Guide`}
              className="h-48 md:h-64 w-auto rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-primary font-medium text-sm">
                {guide.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <Button 
        onClick={onScrollToForm}
        className="btn-hero mb-8 group"
      >
        Get My Free Guide
        <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
      </Button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-primary" />
      </div>
    </section>
  );
};