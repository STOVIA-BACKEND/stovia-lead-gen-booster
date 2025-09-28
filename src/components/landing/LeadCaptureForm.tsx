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
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+973", country: "Bahrain", flag: "🇧🇭" },
  { code: "+974", country: "Qatar", flag: "🇶🇦" },
  { code: "+965", country: "Kuwait", flag: "🇰🇼" },
  { code: "+968", country: "Oman", flag: "🇴🇲" },
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
  const [selectedCountry, setSelectedCountry] = useState(countryCodeOptions[0]);

  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      countryCode: countryCodeOptions[0].code,
    },
  });

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
      <div className="max-w-3xl mx-auto"> {/* Centered and narrower */}
        <Card className="form-card slide-in-right">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Get Your Free Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Guide Selection */}
              <div>
                <Label className="text-base font-medium">Choose Your Guide *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
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
                  <Select 
                    defaultValue={selectedCountry.code}
                    onValueChange={(value) => {
                      setValue('countryCode', value);
                      const country = countryCodeOptions.find(c => c.code === value);
                      if (country) setSelectedCountry(country);
                    }}
                  >
                    <SelectTrigger className="w-40">
                      <div className="flex items-center gap-2">
                        <span>{selectedCountry.flag}</span>
                        <SelectValue />
                      </div>
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
    </section>
  );
};