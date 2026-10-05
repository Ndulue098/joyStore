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
    <Card className="w-full border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xs">
      <CardHeader className="p-4 sm:p-6 pb-2">
        <CardTitle className="text-sm sm:text-base font-extrabold text-neutral-900 dark:text-neutral-100">
          Order Outcomes & Revenue ({year})
        </CardTitle>
        <CardDescription className="text-xs text-neutral-500 dark:text-neutral-400">
          Monthly accumulation of completed sales vs. cancelled and pending orders
        </CardDescription>
      </CardHeader>

      <CardContent className="px-1 sm:px-6 pb-4">
        {!data || data.length === 0 ? (
          <div className="h-72 flex items-center justify-center text-xs text-neutral-400">
            No order records found for {year}.
          </div>
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                barGap={2}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  className="stroke-neutral-200 dark:stroke-neutral-800"
                />
                
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#888888" }}
                  interval="preserveStartEnd"
                />
                
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#888888" }}
                  width={42}
                  tickFormatter={(val) =>
                    val === 0 ? "₦0" : `₦${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`
                  }
                />

                <Tooltip
                  formatter={(value: any, name: any) => {
                    const formattedName = name ? String(name) : ""
                    const capitalizedName = formattedName
                      ? formattedName.charAt(0).toUpperCase() + formattedName.slice(1)
                      : ""

                    return [
                      `₦${Number(value || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}`,
                      capitalizedName,
                    ]
                  }}
                  contentStyle={{
                    backgroundColor: "#171717",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                    border: "1px solid #262626",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
                  }}
                  itemStyle={{ color: "#fff" }}
                />

                <Legend
                  verticalAlign="top"
                  align="center"
                  wrapperStyle={{ paddingBottom: "12px" }}
                  iconType="circle"
                  iconSize={7}
                  formatter={(value) => (
                    <span className="text-[11px] text-neutral-600 dark:text-neutral-400 font-medium ml-0.5 capitalize">
                      {value}
                    </span>
                  )}
                />

                <Bar
                  dataKey="cancelled"
                  name="Cancelled"
                  fill="#ef4444"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={24}
                />
                <Bar
                  dataKey="completed"
                  name="Completed"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={24}
                />
                <Bar
                  dataKey="pending"
                  name="Pending"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}