import React from "react";
import { Button } from "@/components/ui/button";

export default function ContactUs() {
  return (
    <div className="bg-white dark:bg-black">
      <div className="mb-10 flex items-center max-w-3xl mx-auto justify-center min-h-[250px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Get in Touch with Us?
          </h2>
          <div className="flex gap-4 items-center justify-center">
            <Button className="px-6 py-3 text-lg rounded-full font-medium bg-white text-black hover:bg-gray-200">
              Contact Us
            </Button>
            <Button className="px-6 py-3 text-lg rounded-full font-medium bg-white text-black hover:bg-gray-200">
              Ask any Questions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
