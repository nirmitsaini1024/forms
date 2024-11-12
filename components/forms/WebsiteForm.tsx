"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

// Define the schema for form validation
const formSchema = z.object({
  targetAudience: z.object({
    age: z.string().min(1, "Age range is required"),
    location: z.string().min(1, "Geographic location is required"),
    interests: z.string().min(1, "Interests are required"),
  }),
  currentWebsite: z.string().optional(),
  themePreferences: z.object({
    colorScheme: z.string().min(1, "Color scheme is required"),
    mood: z.string().min(1, "Mood selection is required"),
  }),
  fontPreference: z.string().min(1, "Font preference is required"),
  logo: z.enum(["existing", "new"], {
    required_error: "Please select a logo option",
  }),
  features: z.array(z.string()).min(1, "Select at least one feature"),
  otherFeatures: z.string().optional(),
});

const websiteFeatures = [
  { id: "store", label: "Online Store" },
  { id: "booking", label: "Appointment Booking" },
  { id: "contact", label: "Contact Form" },
  { id: "blog", label: "Blog or News" },
  { id: "testimonials", label: "Testimonials" },
  { id: "portfolio", label: "Portfolio Gallery" },
  { id: "reviews", label: "Customer Reviews" },
];

type FormData = z.infer<typeof formSchema>;

interface WebsiteFormProps {
  onSubmit: (data: FormData) => void;
}

export default function WebsiteForm({ onSubmit }: WebsiteFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetAudience: {
        age: "",
        location: "",
        interests: "",
      },
      currentWebsite: "",
      themePreferences: {
        colorScheme: "",
        mood: "",
      },
      fontPreference: "",
      logo: "existing",
      features: [],
      otherFeatures: "",
    },
  });

  const handleSubmit = (data: FormData) => {
    console.log("Form data:", data); 
    onSubmit(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Target Audience</h3>
          <FormField
            control={form.control}
            name="targetAudience.age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age Range</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 25-45" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="targetAudience.location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Geographic Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., North America, Europe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="targetAudience.interests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specific Interests</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Technology, Fashion" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="currentWebsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Website URL (if applicable)</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Theme Preferences</h3>
          <FormField
            control={form.control}
            name="themePreferences.colorScheme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color Scheme</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Blue and white" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="themePreferences.mood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mood</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="professional" />
                      </FormControl>
                      <FormLabel className="font-normal">Professional</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="warm" />
                      </FormControl>
                      <FormLabel className="font-normal">Warm</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="vibrant" />
                      </FormControl>
                      <FormLabel className="font-normal">Vibrant</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="fontPreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font Preference</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="modern" />
                    </FormControl>
                    <FormLabel className="font-normal">Modern</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="classic" />
                    </FormControl>
                    <FormLabel className="font-normal">Classic</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="minimalistic" />
                    </FormControl>
                    <FormLabel className="font-normal">Minimalistic</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo and Branding</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="existing" />
                    </FormControl>
                    <FormLabel className="font-normal">I have an existing logo</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="new" />
                    </FormControl>
                    <FormLabel className="font-normal">I need a new logo</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="features"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Website Features</FormLabel>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {websiteFeatures.map((feature) => (
                  <FormField
                    key={feature.id}
                    control={form.control}
                    name="features"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={feature.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(feature.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, feature.id])
                                  : field.onChange(
                                      field.value?.filter((value) => value !== feature.id)
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {feature.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="otherFeatures"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Other Features</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about any other features you'd like"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Continue</Button>
      </form>
    </Form>
  );
}
