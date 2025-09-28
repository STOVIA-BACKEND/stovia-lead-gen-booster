import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import stoviaLogo from "@/assets/stovia-logo.png";

const animatedWords = [
  "Coffee Makers",
  "Commercial Ovens", 
  "Refrigeration",
  "Dishwashing Equipment",
  "Laundry Solutions",
  "Bakery Equipment"
];

interface HeroSectionProps {
  onScrollToForm: () => void;
}

export const HeroSection = ({ onScrollToForm }: HeroSectionProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 2000);

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
      <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-3xl fade-in-up">
        Covering commercial kitchens, bakery equipment, refrigeration, ovens, 
        coffee makers, laundry solutions, and more.
      </p>

      {/* Animated Text Line */}
      <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl fade-in-up">
        Enjoy from our exciting lineup of{" "}
        <span className="relative inline-block h-8 overflow-hidden">
          {animatedWords.map((word, index) => (
            <span
              key={word}
              className={`absolute left-0 transition-all duration-500 text-primary glow font-semibold ${
                index === currentWordIndex
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-full"
              }`}
            >
              {word}
            </span>
          ))}
        </span>
      </p>

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