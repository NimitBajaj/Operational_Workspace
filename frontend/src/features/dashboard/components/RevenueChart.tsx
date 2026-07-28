import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { Card } from "@/components/ui/Card";

interface RevenueChartProps {
  data: {
    month: string;
    revenue: number;
  }[];
}

export default function RevenueChart({
  data,
}: RevenueChartProps) {
  return (
    <Card className="p-6 h-[380px]">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Revenue Overview
        </h2>

        <p className="text-slate-500 text-sm">
          Monthly quotation revenue
        </p>

      </div>

      <ResponsiveContainer width="100%" height={280}>

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tickFormatter={(value) => `₹${value / 1000}k`}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            formatter={(value: number) => [
              `₹${value.toLocaleString()}`,
              "Revenue",
            ]}
          />

          <Line
            dataKey="revenue"
            type="monotone"
            stroke="#2563EB"
            strokeWidth={4}
            dot={{
              r: 5,
            }}
            activeDot={{
              r: 8,
            }}
          />

        </LineChart>

      </ResponsiveContainer>

    </Card>
  );
}