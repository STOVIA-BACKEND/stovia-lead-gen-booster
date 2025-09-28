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
  const extendedAnimatedWords = [...animatedWords, ...animatedWords, ...animatedWords];
  const [currentWordIndex, setCurrentWordIndex] = useState(animatedWords.length);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setCurrentWordIndex(prevIndex => prevIndex + 1);
    }, 2000);

    return () => clearInterval(animationInterval);
  }, []);

  useEffect(() => {
    if (currentWordIndex >= animatedWords.length * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentWordIndex(animatedWords.length);
        setTimeout(() => {
          setIsTransitioning(true);
        }, 50);
      }, 800);
    }
  }, [currentWordIndex]);

  return (
    <section className="hero-gradient min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      <div className="pt-8 w-full"> {/* Added w-full */}
        {/* Logo */}
        <div className="mb-8 fade-in-up">
          <img 
            src={stoviaLogo} 
            alt="Stovia Commercial Kitchen Equipment" 
            className="h-16 md:h-20 mx-auto"
          />
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-5xl leading-tight text-shadow fade-in-up mx-auto"> {/* Added mx-auto */}
          Six Expert Guides. One{" "}
          <span className="text-primary glow">Free Download</span>. 
          <br />Choose Yours Today.
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-3xl fade-in-up mx-auto"> {/* Added mx-auto */}
          Covering commercial kitchens, bakery equipment, refrigeration, ovens, 
          coffee makers, laundry solutions, and more.
        </p>

        {/* Animated Text Line */}
        <div className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl fade-in-up flex items-center justify-center mx-auto"> {/* Added mx-auto */}
          <span>Enjoy from our exciting lineup of&nbsp;</span>
          <div
            className="relative inline-block overflow-hidden text-center"
            style={{
              height: "1.5em",
              width: "22ch",
              verticalAlign: "middle",
            }}
          >
            <div
              style={{
                transform: `translateY(-${currentWordIndex * 1.5}em)`,
                transition: isTransitioning ? "transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)" : "none",
              }}
            >
              {extendedAnimatedWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="block whitespace-nowrap font-semibold text-primary"
                  style={{
                    height: "1.5em",
                    lineHeight: "1.5em",
                    transition: "opacity 0.5s, filter 0.5s",
                    opacity: 1 - Math.min(1, Math.abs(index - currentWordIndex) * 0.4),
                    filter: `blur(${Math.min(4, Math.abs(index - currentWordIndex) * 2)}px)`,
                  }}
                  aria-hidden={index !== currentWordIndex}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pb-12"> {/* Added wrapper with pb-12 */}
          <Button 
            onClick={onScrollToForm}
            className="btn-hero group" // Removed mb-8
          >
            Get My Free Guide
            <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};