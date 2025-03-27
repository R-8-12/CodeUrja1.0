"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"; 


export function InfiniteMovingCardsDemo() {
  return (
    <div className="bg-white dark:bg-black">
      {/* Header Section */}
     

    
      <div className="h-[40rem] max-w-7xl mx-auto rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden ">
      <section className="mb-20 flex items-center  justify-center py-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
          Testimonials
        </h1>
      </section>
        <InfiniteMovingCards
          items={testimonials}
          direction="left"
          speed="slow"
        />
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, I thought I would sail about a little.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
