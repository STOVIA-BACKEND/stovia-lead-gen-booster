import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Clock, Download } from "lucide-react";
import guideCoffee from "@/assets/guide-coffee.png";
import guideOvens from "@/assets/guide-ovens.png";
import guideRefrigeration from "@/assets/guide-refrigeration.png";
import guideDishwashing from "@/assets/guide-dishwashing.png";
import guideLaundry from "@/assets/guide-laundry.png";
import guideBakery from "@/assets/guide-bakery.png";

const guides = [
  { id: "coffee", image: guideCoffee, title: "Coffee Makers & Espresso Equipment", subtitle: "Professional coffee and espresso machine solutions" },
  { id: "ovens", image: guideOvens, title: "Commercial Ovens & Cooking Equipment", subtitle: "Industrial ovens and cooking solutions" },
  { id: "refrigeration", image: guideRefrigeration, title: "Refrigeration & Cooling Systems", subtitle: "Commercial refrigeration and cooling equipment" },
  { id: "dishwashing", image: guideDishwashing, title: "Dishwashing & Cleaning Systems", subtitle: "Professional dishwashing and sanitation solutions" },
  { id: "laundry", image: guideLaundry, title: "Laundry & Washing Solutions", subtitle: "Commercial laundry and textile care equipment" },
  { id: "bakery", image: guideBakery, title: "Bakery Equipment & Solutions", subtitle: "Professional baking and pastry equipment" },
];

const saudiCities = [
  "Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Khobar", "Dhahran", 
  "Buraidah", "Tabuk", "Khamis Mushait", "Hail", "Najran", "Jazan", "Taif", "Other"
];

const countryCodeOptions = [
  { code: "+966", country: "Saudi Arabia" },
  { code: "+971", country: "UAE" },
  { code: "+973", country: "Bahrain" },
  { code: "+974", country: "Qatar" },
  { code: "+965", country: "Kuwait" },
  { code: "+968", country: "Oman" },
];

const jobTitles = [
  "CEO/Owner", "General Manager", "Operations Manager", "Marketing Manager", 
  "Purchasing Manager", "Kitchen Manager", "F&B Manager", "Other"
];

const timelines = [
  "Within 1 month", "1–3 months", "3–6 months", "6+ months", "Just researching"
];

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50, "First name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  countryCode: z.string().min(1, "Please select a country code"),
  phoneNumber: z.string().min(8, "Phone number must be at least 8 digits").max(15, "Phone number must be less than 15 digits"),
  city: z.string().min(1, "Please select a city"),
  jobTitle: z.string().min(1, "Please select a job title"),
  businessName: z.string().min(2, "Business name must be at least 2 characters").max(100, "Business name must be less than 100 characters"),
  timeline: z.string().min(1, "Please select a timeline"),
  selectedGuide: z.string().min(1, "Please select a guide"),
});

type FormData = z.infer<typeof formSchema>;

export const LeadCaptureForm = () => {
  const [selectedGuide, setSelectedGuide] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Countdown timer to September 30, 2025
  React.useEffect(() => {
    const targetDate = new Date('2025-09-30T23:59:59').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };
    
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const selectedGuideData = guides.find(g => g.id === selectedGuide);

  const onSubmit = async (data: FormData) => {
    try {
      // For now, just show success message since Supabase isn't connected
      toast({
        title: "Success!",
        description: "Your guide request has been submitted. Check your email for the download link.",
      });
      
      reset();
      setSelectedGuide("");
      
      // TODO: Connect to Supabase table 'lead_magnet2'
      console.log("Form data:", {
        ...data,
        submissionDate: new Date().toISOString(),
        currentUrl: window.location.href,
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="lead-form" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Info */}
          <div className="space-y-8 fade-in-up">
            <Badge className="badge-free inline-flex items-center gap-2">
              <Download className="h-4 w-4" />
              FREE GUIDE
            </Badge>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Download Your Free Expert Guide
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {selectedGuideData 
                  ? selectedGuideData.subtitle 
                  : "Select a guide below to get started with professional equipment insights."
                }
              </p>
            </div>

            {/* Scarcity & Urgency Boxes */}
            <div className="space-y-4">
              <div className="badge-scarcity">
                <strong>Limited Access:</strong> Only 30 downloads per guide this month
              </div>
              
              <div className="badge-urgency">
                <strong>Guides Refresh:</strong> Content will be updated on September 30, 2025
              </div>
            </div>

            {/* Countdown Timer */}
            <Card className="bg-card/50 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Clock className="h-5 w-5" />
                  Time Until Content Refresh
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{timeLeft.days}</div>
                    <div className="text-sm text-muted-foreground">Days</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{timeLeft.hours}</div>
                    <div className="text-sm text-muted-foreground">Hours</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{timeLeft.minutes}</div>
                    <div className="text-sm text-muted-foreground">Minutes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{timeLeft.seconds}</div>
                    <div className="text-sm text-muted-foreground">Seconds</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Form */}
          <Card className="form-card slide-in-right">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Get Your Free Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Guide Selection */}
                <div>
                  <Label className="text-base font-medium">Choose Your Guide *</Label>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    {guides.map((guide) => (
                      <div
                        key={guide.id}
                        className={`guide-card ${selectedGuide === guide.id ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedGuide(guide.id);
                          setValue('selectedGuide', guide.id);
                        }}
                      >
                        <img 
                          src={guide.image} 
                          alt={guide.title}
                          className="w-full h-24 object-cover rounded mb-2"
                        />
                        <p className="text-sm font-medium text-center">{guide.title}</p>
                      </div>
                    ))}
                  </div>
                  {errors.selectedGuide && (
                    <p className="text-destructive text-sm mt-1">{errors.selectedGuide.message}</p>
                  )}
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName"
                      {...register("firstName")}
                      className="mt-1"
                    />
                    {errors.firstName && (
                      <p className="text-destructive text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email"
                      type="email"
                      {...register("email")}
                      className="mt-1"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <Label>Phone Number *</Label>
                  <div className="flex gap-2 mt-1">
                    <Select onValueChange={(value) => setValue('countryCode', value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="+966" />
                      </SelectTrigger>
                      <SelectContent>
                        {countryCodeOptions.map((option) => (
                          <SelectItem key={option.code} value={option.code}>
                            {option.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex-1">
                      <Input 
                        {...register("phoneNumber")}
                        placeholder="Phone number"
                      />
                    </div>
                  </div>
                  {(errors.countryCode || errors.phoneNumber) && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.countryCode?.message || errors.phoneNumber?.message}
                    </p>
                  )}
                </div>

                {/* City & Job Title */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>City *</Label>
                    <Select onValueChange={(value) => setValue('city', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {saudiCities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.city && (
                      <p className="text-destructive text-sm mt-1">{errors.city.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label>Job Title *</Label>
                    <Select onValueChange={(value) => setValue('jobTitle', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select job title" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTitles.map((title) => (
                          <SelectItem key={title} value={title}>
                            {title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.jobTitle && (
                      <p className="text-destructive text-sm mt-1">{errors.jobTitle.message}</p>
                    )}
                  </div>
                </div>

                {/* Business Name */}
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input 
                    id="businessName"
                    {...register("businessName")}
                    className="mt-1"
                  />
                  {errors.businessName && (
                    <p className="text-destructive text-sm mt-1">{errors.businessName.message}</p>
                  )}
                </div>

                {/* Timeline */}
                <div>
                  <Label>Implementation Timeline *</Label>
                  <Select onValueChange={(value) => setValue('timeline', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="When are you looking to purchase?" />
                    </SelectTrigger>
                    <SelectContent>
                      {timelines.map((timeline) => (
                        <SelectItem key={timeline} value={timeline}>
                          {timeline}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.timeline && (
                    <p className="text-destructive text-sm mt-1">{errors.timeline.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="btn-hero w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Get Free Guide Now"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};