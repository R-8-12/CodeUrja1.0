import { Card } from "@/components/ui/card";

export function MetricCard({
  title,
  value,
  icon,
  chart,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  chart?: React.ReactNode;
}) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        {icon}
      </div>
      {chart && <div className="mt-4">{chart}</div>}
    </Card>
  );
}