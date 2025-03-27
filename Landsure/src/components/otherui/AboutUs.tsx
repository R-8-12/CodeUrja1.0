"use client";

import { motion } from "framer-motion";
import { CheckCircle, Users, Globe } from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className=" bg-white dark:bg-black text-gray-900 dark:text-white p-8 md:p-16">
      {/* Mission Section */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <motion.h2 
          className="text-3xl md:text-4xl font-semibold mb-6" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Mission
        </motion.h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          LandSure aims to revolutionize land resource management by providing a secure and transparent platform for land registration and ownership transfer. Our mission is to empower landowners with efficient digital solutions using eKYC for authentication.
        </p>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <motion.div 
          className="p-6 border rounded-xl shadow-lg dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900"
          whileHover={{ scale: 1.05 }}
        >
          <CheckCircle className="h-12 w-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold">eKYC Integration</h3>
          <p className="text-gray-600 dark:text-gray-400">Secure and seamless authentication for land registration and ownership transfers.</p>
        </motion.div>

        <motion.div 
          className="p-6 border rounded-xl shadow-lg dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900"
          whileHover={{ scale: 1.05 }}
        >
          <Users className="h-12 w-12 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold">Transparent Ownership</h3>
          <p className="text-gray-600 dark:text-gray-400">Ensure legal clarity and reduce disputes with transparent digital ownership records.</p>
        </motion.div>

        <motion.div 
          className="p-6 border rounded-xl shadow-lg dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900"
          whileHover={{ scale: 1.05 }}
        >
          <Globe className="h-12 w-12 text-indigo-500 mb-4" />
          <h3 className="text-xl font-semibold">Global Accessibility</h3>
          <p className="text-gray-600 dark:text-gray-400">Access your land records from anywhere using our secure cloud-based platform.</p>
        </motion.div>
      </section>
    </div>
  );
}
