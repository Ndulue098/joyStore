"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MonthlyOrderStatusData {
  month: string;
  completed: number;
  cancelled: number;
  pending: number;
}

interface OrderStatusChartProps {
  data: MonthlyOrderStatusData[];
  year?: number;
}

export function OrderStatusChart({
  data,
  year = new Date().getFullYear(),
}: OrderStatusChartProps) {
  return (
    <Card className="w-full bg-gray-100">
      <CardHeader>
        <CardTitle className="text-base font-bold text-neutral-900">
          Order Outcomes & Revenue ({year})
        </CardTitle>
        <CardDescription className="text-xs text-neutral-500">
          Monthly accumulation of completed sales vs. cancelled and pending orders
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="h-72 flex items-center justify-center text-xs text-neutral-400">
            No order records found for {year}.
          </div>
        ) : (
          <div className="h-76 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                barGap={4}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  tickFormatter={(val) => `₦${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `₦${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
                    name.charAt(0).toUpperCase() + name.slice(1),
                  ]}
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px",
                    border: "none",
                  }}
                  itemStyle={{ color: "#fff" }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span className="text-xs text-neutral-600 font-medium ml-1 capitalize">
                      {value}
                    </span>
                  )}
                />
                <Bar
                  dataKey="completed"
                  name="Completed"
                  fill="#6366f1" // Emerald / Green
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
                <Bar
                  dataKey="pending"
                  name="Pending"
                  fill="#f59e0b" // Amber / Yellow
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
                <Bar
                  dataKey="cancelled"
                  name="Cancelled"
                  fill="#ef4444" // Red
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}