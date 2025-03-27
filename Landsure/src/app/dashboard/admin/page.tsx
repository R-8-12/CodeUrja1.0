"use client";

import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Activity,
  Landmark,
  FileCheck,
  UserCheck,
  Bell,
  Settings,
  Users,
  FileText,
  ShieldCheck,
  Database,
  FileCheck2,
  ListCollapse
} from "lucide-react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { ChartOptions } from 'chart.js';


Chart.register(...registerables);


const MapComponent = dynamic(
  () => import("@/components/map"),
  { 
    ssr: false,
    loading: () => <div className="h-96 w-full bg-muted rounded-lg animate-pulse" />
  }
);

type Metric = {
  title: string;
  value: string;
  icon: string;
};

type LandRecord = {
  id: string;
  owner: string;
  area: string;
  status: "Verified" | "Pending";
};

type ChartData = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string;
  }>;
};

type DisputeData = {
  labels: string[];
  datasets: Array<{
    data: number[];
    backgroundColor: string[];
  }>;
};

type DashboardData = {
  metrics: Metric[];
  landRecords: LandRecord[];
  chartData: ChartData;
  disputeData: DisputeData;
};

const iconComponents: { [key: string]: React.ReactNode } = {
  FileCheck: <FileCheck className="h-6 w-6 text-blue-500" />,
  Landmark: <Landmark className="h-6 w-6 text-green-500" />,
  UserCheck: <UserCheck className="h-6 w-6 text-purple-500" />,
  ShieldCheck: <ShieldCheck className="h-6 w-6 text-red-500" />
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/dashboard-data.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };

  const pieOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'right' } }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!data) {
    return <div className="p-6 text-center text-red-500">No data available</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Land Registry Dashboard</h1>
        <div className="flex items-center gap-4">
        <Link href="/dashboard/admin/requests">
  <Button variant="ghost" size="icon">
    <ListCollapse className="h-6 w-6" />
  </Button>
</Link>
        <Link href="/dashboard/admin/document">
      <Button variant="ghost" size="icon">
        <FileCheck2 className="h-6 w-6" />
      </Button>
    </Link>
          <Button variant="ghost" size="icon">
            <Bell className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.metrics.map((metric, index) => (
          <Card key={index} className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <h3 className="text-2xl font-bold">{metric.value}</h3>
              </div>
              {iconComponents[metric.icon]}
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Land Registrations</h3>
          <div className="h-64">
            <Bar data={data.chartData} options={chartOptions} />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Dispute Status</h3>
          <div className="h-64">
            <Pie data={data.disputeData} options={pieOptions} />
          </div>
        </Card>
      </div>

      {/* Recent Activities & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Land Records</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Record ID</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.landRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.id}</TableCell>
                  <TableCell>{record.owner}</TableCell>
                  <TableCell>{record.area}</TableCell>
                  <TableCell>
                    <Badge variant={record.status === "Verified" ? "default" : "secondary"}>
                      {record.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Geospatial Overview</h3>
          <div className="h-96 rounded-lg overflow-hidden">
            <MapComponent />
          </div>
        </Card>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Users className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <FileText className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total Documents</p>
              <p className="text-2xl font-bold">4,567</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Database className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Storage Used</p>
              <Progress value={65} className="h-2" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}