import AboutUs from "@/components/otherui/AboutUs";
import Hero from "@/components/otherui/Hero";
import { WorldMapDemo } from "@/components/ui/WorldMapDemo";
import Footer from "@/components/otherui/Footer";
import { InfiniteMovingCardsDemo } from "@/components/otherui/InfiniteMovingCardsDemo";
import React from "react";
import ContactUs from "@/components/otherui/Contactus";

function page() {
  return (
    <div>
      <Hero />
      <WorldMapDemo />
      <AboutUs />
      <InfiniteMovingCardsDemo />
      <ContactUs/>
      <Footer />
    </div>
  );
}

export default page;
