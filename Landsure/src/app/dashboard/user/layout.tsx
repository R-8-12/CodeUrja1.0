"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Home,
  Landmark,
  FileText,
  ShieldCheck,
  Settings,
  LogOut,
} from "lucide-react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/dashboard/user", icon: <Home /> },
    { name: "My Properties", href: "/dashboard/user/properties", icon: <Landmark /> },
    { name: "Documents", href: "/dashboard/user/documents", icon: <FileText /> },
    { name: "Upload Document", href: "/dashboard/user/upload", icon: <ShieldCheck /> },
    { name: "Profile & Settings", href: "/dashboard/user/profile", icon: <Settings /> },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r p-4 flex flex-col justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-bold px-2">Land Registry</h2>
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-2 py-3 rounded-lg ${
                  pathname === link.href
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <form action="/api/auth/signout" method="POST">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            type="submit"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </form>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8 bg-gray-50 dark:bg-black">{children}</div>
    </div>
  );
}