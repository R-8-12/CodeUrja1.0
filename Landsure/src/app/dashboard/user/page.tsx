"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import MapComponent from "@/components/map";
import { ShieldCheck, Landmark, FileText } from "lucide-react";
import { redirect } from "next/navigation";
import { useUser, useAuth } from "@clerk/nextjs";

Chart.register(...registerables);

type Property = {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
};

type UserData = {
  ekycStatus: "approved" | "pending" | "rejected";
  totalProperties: number;
  totalDocuments: number;
  properties: Property[];
  chartData?: any;
};

export default function UserDashboard() {
  const { isSignedIn, user } = useUser();
  const { isLoaded } = useAuth();

  // Redirect if not authenticated
  if (isLoaded && !isSignedIn) {
    redirect("/");
  }

  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Only fetch if user is authenticated
        if (isSignedIn) {
          const response = await fetch('/api/user/dashboard');
          const jsonData = await response.json();
          setData(jsonData);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isSignedIn]);

  // Loading state
  if (!isLoaded || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <h1 className="text-3xl font-bold">Welcome, {user?.firstName}</h1>

      {/* EKYC Banner */}
      {data?.ekycStatus === "pending" && (
        <Card className="p-4 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/30">
          <div className="flex justify-between items-center">
            <span className="text-yellow-700 dark:text-yellow-300">
              Complete your e-KYC verification
            </span>
            <Button size="sm" variant="secondary">
              Verify Now
            </Button>
          </div>
        </Card>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">e-KYC Status</p>
              <Badge 
                variant={
                  data?.ekycStatus === "approved" ? "default" :
                  data?.ekycStatus === "pending" ? "secondary" : "destructive"
                }
              >
                {data?.ekycStatus}
              </Badge>
            </div>
            <ShieldCheck className="h-6 w-6 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Total Properties</p>
              <h3 className="text-2xl font-bold">
                {data?.totalProperties ?? 0}
              </h3>
            </div>
            <Landmark className="h-6 w-6 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Documents</p>
              <h3 className="text-2xl font-bold">
                {data?.totalDocuments ?? 0}
              </h3>
            </div>
            <FileText className="h-6 w-6 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Map Preview */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Properties Map</h3>
        <div className="h-96 rounded-lg overflow-hidden">
          <MapComponent properties={data?.properties || []} />
        </div>
      </Card>
    </div>
  );
}