"use client";

import { DataTable } from "@/components/properties-table";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { Property } from "@/components/properties-table";
import { MapComponent1 } from "@/components/map2";

// Updated mock data with Indian locations
const mockProperties: Property[] = [
  {
    id: "1",
    name: "Delhi Commercial Tower",
    area: 1500,
    location: "New Delhi, India",
    status: "Active",
  },
  {
    id: "2",
    name: "Mumbai Seaside Plaza",
    area: 2500,
    location: "Mumbai, India",
    status: "Disputed",
  },
  {
    id: "3",
    name: "Indore Tech Park",
    area: 4000,
    location: "Indore, India",
    status: "Active",
  },
];

export default function MyProperties() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setProperties(mockProperties);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load properties');
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div>Loading properties...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Indian Properties</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <DataTable 
            data={properties} 
            onSelect={setSelectedProperty} 
          />
        </Card>
        
        <Card className="p-6">
          <div className="h-[600px] rounded-lg overflow-hidden">
            <MapComponent1 
              properties={properties} 
              selected={selectedProperty} 
            />
          </div>
        </Card>
      </div>
    </div>
  );
}