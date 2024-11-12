"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import BusinessForm from "@/components/forms/BusinessForm";
import WebsiteForm from "@/components/forms/WebsiteForm";
import MarketingForm from "@/components/forms/MarketingForm";
import { Building2, Laptop, Megaphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const { toast } = useToast();

  const progress = ((step - 1) / 2) * 100;

  const handleFormSubmit = async (data: any) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);

    if (step === 3) {
      try {
        const response = await fetch('/api/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFormData),
        });

        if (!response.ok) {
          throw new Error('Failed to save form data');
        }

        toast({
          title: "Success!",
          description: "Your form has been submitted successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save form data. Please try again.",
          variant: "destructive",
        });
        return;
      }
    }

    setStep(step + 1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Tell Us About Your Business
          </h1>
          <p className="text-muted-foreground text-lg">
            Let's create something amazing together
          </p>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2">
            <div className="flex items-center gap-2">
              <Building2 className={step >= 1 ? "text-primary" : "text-muted-foreground"} />
              <span className={step >= 1 ? "text-primary font-medium" : "text-muted-foreground"}>
                Business Details
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Laptop className={step >= 2 ? "text-primary" : "text-muted-foreground"} />
              <span className={step >= 2 ? "text-primary font-medium" : "text-muted-foreground"}>
                Website Needs
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Megaphone className={step >= 3 ? "text-primary" : "text-muted-foreground"} />
              <span className={step >= 3 ? "text-primary font-medium" : "text-muted-foreground"}>
                Marketing
              </span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-card rounded-lg shadow-lg p-6 md:p-8">
              {step === 1 && <BusinessForm onSubmit={handleFormSubmit} />}
              {step === 2 && <WebsiteForm onSubmit={handleFormSubmit} />}
              {step === 3 && <MarketingForm onSubmit={handleFormSubmit} />}
              {step === 4 && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                  <p className="text-muted-foreground">
                    We've received your information and will be in touch soon.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}