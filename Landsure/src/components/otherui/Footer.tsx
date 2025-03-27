"use client"
import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useTheme } from 'next-themes';

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#050505] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - Brand Info */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">LandSure</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Your trusted partner in securing land records with technology.</p>
          </div>

          {/* Column 2 - Navigation */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">About Us</Link></li>
              <li><Link href="/services" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Services</Link></li>
              <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Support</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/faq" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">FAQs</Link></li>
              <li><Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 4 - Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Follow Us</h4>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 text-center text-gray-600 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} LandSure. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
