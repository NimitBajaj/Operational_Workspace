import CountUp from "react-countup";
import { ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/Card";

interface DashboardStatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  change?: string;
}

export default function DashboardStatCard({
  title,
  value,
  icon,
  color,
  change,
}: DashboardStatCardProps) {
  return (
    <Card className="p-6 hover:-translate-y-1 transition-all duration-300">

      <div className="flex justify-between items-start">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
  {title === "Revenue"
    ? `₹${value.toLocaleString("en-IN")}`
    : value.toLocaleString("en-IN")}
</h2>

          {change && (
            <div className="mt-3 flex items-center gap-1 text-sm text-emerald-600">

              <ArrowUpRight size={16} />

              {change}

            </div>
          )}

        </div>

        <div
          className="h-14 w-14 rounded-2xl flex items-center justify-center text-white"
          style={{
            background: color,
          }}
        >
          {icon}
        </div>

      </div>

    </Card>
  );
}