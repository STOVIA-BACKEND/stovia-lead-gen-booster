import { Check } from "lucide-react";
import partnerLogos from "@/assets/partner-logos.png";

const trustStats = [
  "Trusted by 500+ restaurants and hotels",
  "40 years of commercial kitchen expertise", 
  "Serving Saudi Arabia's homeowners and professionals"
];

export const TrustSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto text-center">
        {/* Partner Logos */}
        <div className="mb-16 fade-in-up">
          <h3 className="text-lg font-medium text-muted-foreground mb-8">
            Partnering with Industry Leaders
          </h3>
          <div className="flex justify-center">
            <img 
              src={partnerLogos} 
              alt="Partner companies including TurboChef, Anets, Vulcan, Hobart, and Rational"
              className="h-20 md:h-24 opacity-70 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Trust Stats */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {trustStats.map((stat, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 p-6 rounded-lg bg-background/50 backdrop-blur-sm border border-primary/10 fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <p className="text-foreground font-medium text-left leading-relaxed">
                {stat}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};