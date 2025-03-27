"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  panNumber: z.string().length(10, "PAN must be 10 characters"),
  aadharNumber: z.string().length(12, "Aadhar must be 12 digits"),
  landSize: z.string().min(1, "Land size is required"),
  location: z.string().min(5, "Location must be at least 5 characters"),
  district: z.string().min(1, "District is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  ownershipProof: z.instanceof(File).refine((file) => file.size > 0, "Document is required"),
  surveyNumber: z.string().min(1, "Survey number is required"),
});

export default function LandRegistrationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      panNumber: "",
      aadharNumber: "",
      landSize: "",
      location: "",
      district: "",
      state: "",
      country: "India",
      surveyNumber: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Add your form submission logic here
  }

  return (
    <div className="dark:bg-black bg-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto dark:bg-zinc-900 bg-gray-50 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 dark:text-white text-black">
          Land Registration Form
        </h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold dark:text-gray-200 text-gray-700">
                Personal Information
              </h2>

              <FormField
                control={form.control}
                name="panNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-300">PAN Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="ABCDE1234F" 
                        {...field} 
                        className="dark:bg-zinc-900 bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="aadharNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-300">Aadhar Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1234 5678 9012"
                        {...field}
                        className="dark:bg-zinc-900 bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Land Details Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold dark:text-gray-200 text-gray-700">
                Land Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="landSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-300">Land Size (acres)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="5.0"
                          {...field}
                          className="dark:bg-zinc-900 bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="surveyNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-300">Survey Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="SRV-12345"
                          {...field}
                          className="dark:bg-zinc-900 bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-300">Location</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Full address of the land"
                        {...field}
                        className="dark:bg-zinc-900 bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location Details Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold dark:text-gray-200 text-gray-700">
                Location Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-300">District</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="District name"
                          {...field}
                          className="dark:bg-zinc-900 bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-300">State</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="State name"
                          {...field}
                          className="dark:bg-zinc-900 bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-300">Country</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Country name"
                          {...field}
                          className="dark:bg-zinc-900 bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Document Upload Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold dark:text-gray-200 text-gray-700">
                Document Upload
              </h2>

              <FormField
                control={form.control}
                name="ownershipProof"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-300">Ownership Proof (PDF)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                        className="dark:bg-zinc-900 bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-zinc-800 dark:text-white hover:bg-zinc-900"
            >
              Submit Registration
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}