"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  businessDomain: z.string().min(1, "Please select a business domain"),
  primaryService: z.string().min(2, "Please describe your primary service"),
  location: z.string().min(2, "Location is required"),
  primaryLanguage: z.string().min(1, "Primary language is required"),
  secondaryLanguages: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface BusinessFormProps {
  onSubmit: (data: FormData) => void;
}

export default function BusinessForm({ onSubmit }: BusinessFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      businessDomain: "",
      primaryService: "",
      location: "",
      primaryLanguage: "",
      secondaryLanguages: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="Your awesome business name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessDomain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Domain</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your domain" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="primaryService"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Products/Services</FormLabel>
              <FormControl>
                <Input placeholder="What do you offer?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Location(s)</FormLabel>
              <FormControl>
                <Input placeholder="Where are you based?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="primaryLanguage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secondaryLanguages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secondary Language(s)</FormLabel>
              <FormControl>
                <Input placeholder="Additional languages (optional)" {...field} />
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
