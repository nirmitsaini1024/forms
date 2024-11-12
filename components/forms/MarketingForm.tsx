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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  socialMedia: z.array(z.string()).min(1, "Select at least one platform"),
  preferredMarketing: z.string().min(1, "Select preferred marketing platform"),
  targetLocations: z.string().min(1, "Target locations are required"),
  contentTone: z.string().min(1, "Select content tone"),
  blogging: z.object({
    needed: z.boolean(),
    frequency: z.string().optional(),
    topics: z.string().optional(),
  }),
  budget: z.object({
    type: z.enum(["monthly", "project"]),
    amount: z.string().min(1, "Budget amount is required"),
  }),
  marketingMaterials: z.array(z.string()),
  kpis: z.array(z.string()).min(1, "Select at least one KPI"),
  multilingualSupport: z.string().optional(),
  additionalRequirements: z.string().optional(),
  marketingChallenges: z.string().optional(),
  finalNotes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

type MarketingFormProps = {
  onSubmit: (data: FormData) => void;
};

const socialPlatforms = [
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "twitter", label: "Twitter" },
  { id: "youtube", label: "YouTube" },
];

const marketingMaterials = [
  { id: "posters", label: "Posters" },
  { id: "videoAds", label: "Video Ads" },
  { id: "socialPosts", label: "Social Media Posts" },
];

const kpiOptions = [
  { id: "sales", label: "Sales Growth" },
  { id: "traffic", label: "Website Traffic" },
  { id: "engagement", label: "Social Media Engagement" },
  { id: "retention", label: "Customer Retention" },
];

export default function MarketingForm({ onSubmit }: MarketingFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      socialMedia: [],
      preferredMarketing: "",
      targetLocations: "",
      contentTone: "",
      blogging: {
        needed: false,
        frequency: "",
        topics: "",
      },
      budget: {
        type: "monthly",
        amount: "",
      },
      marketingMaterials: [],
      kpis: [],
      multilingualSupport: "",
      additionalRequirements: "",
      marketingChallenges: "",
      finalNotes: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="socialMedia"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Social Media Platforms</FormLabel>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {socialPlatforms.map((platform) => (
                  <FormField
                    key={platform.id}
                    control={form.control}
                    name="socialMedia"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={platform.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(platform.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, platform.id])
                                  : field.onChange(
                                      field.value?.filter((value) => value !== platform.id)
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {platform.label}
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
          name="preferredMarketing"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Marketing Platform</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="targetLocations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Locations</FormLabel>
              <FormControl>
                <Input placeholder="e.g., New York, London" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contentTone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content Tone</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="blogging.needed"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Blogging Needs
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          {form.watch("blogging.needed") && (
            <>
              <FormField
                control={form.control}
                name="blogging.frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blogging Frequency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="blogging.topics"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Topics</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What topics would you like to cover?"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="budget.type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="monthly" />
                      </FormControl>
                      <FormLabel className="font-normal">Monthly</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="project" />
                      </FormControl>
                      <FormLabel className="font-normal">Project-based</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget.amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="marketingMaterials"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Marketing Materials Needed</FormLabel>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {marketingMaterials.map((material) => (
                  <FormField
                    key={material.id}
                    control={form.control}
                    name="marketingMaterials"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={material.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(material.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, material.id])
                                  : field.onChange(
                                      field.value?.filter((value) => value !== material.id)
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {material.label}
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
          name="kpis"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Key Performance Indicators (KPIs)</FormLabel>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {kpiOptions.map((kpi) => (
                  <FormField
                    key={kpi.id}
                    control={form.control}
                    name="kpis"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={kpi.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(kpi.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, kpi.id])
                                  : field.onChange(
                                      field.value?.filter((value) => value !== kpi.id)
                                    );
                              }}
                            />
                          </FormControl>
                           <FormLabel className="font-normal">
                            {kpi.label}
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
          name="multilingualSupport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Multilingual Support Needed</FormLabel>
              <FormControl>
                <Input placeholder="List required languages" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalRequirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Requirements</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any other features or tools needed?"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="marketingChallenges"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Previous Marketing Challenges</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What hasn't worked for you in the past?"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="finalNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Final Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any other specific needs or features?"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </Form>
  );
}
