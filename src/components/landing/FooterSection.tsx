import { Button } from "@/components/ui/button";
import { Check, MessageCircle, ShoppingCart } from "lucide-react";

const benefits = [
  "Next-Day Delivery & Setup",
  "3-Year Warranty", 
  "14-Day Money Back Guarantee"
];

const footerLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Refund Policy", href: "/refunds" },
  { name: "Contact Us", href: "/contact" }
];

export const FooterSection = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/966500000000", "_blank");
  };

  const handleReserveNow = () => {
    // Scroll to form
    document.getElementById('lead-form')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <footer className="bg-card py-20 px-4 border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Buy with <span className="text-primary">Stovia+</span>, Just For You™
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Experience the difference with our premium service guarantee
          </p>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center justify-center gap-3 p-6 rounded-lg bg-primary/5 border border-primary/20 fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <span className="font-semibold text-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              onClick={handleReserveNow}
              className="btn-hero group"
            >
              <ShoppingCart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Reserve Now
            </Button>
            
            <Button 
              onClick={handleWhatsApp}
              variant="outline" 
              className="btn-secondary group"
            >
              <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              WhatsApp Us Now
            </Button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <div className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Stovia. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};