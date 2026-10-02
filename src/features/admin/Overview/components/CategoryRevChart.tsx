"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface CategoryRevenueData {
  categoryName: string;
  revenue: number;
}

interface CategoryRevChartProps {
  data: CategoryRevenueData[];
}

// export default function CategoryRevChart({}: CategoryRevChartProps) {
//   return (
//     <div>
      
//     </div>
//   );
// }


// interface CategoryRevenueChartProps {
//   data: CategoryRevenueData[];
// }

const COLORS = [
  "#6366f1", // Indigo
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#ec4899", // Pink
  "#8b5cf6", // Purple
  "#3b82f6", // Blue
  "#64748b", // Slate
];

export function CategoryRevChart({ data }: CategoryRevChartProps) {
  const totalRevenue = useMemo(
    () => data.reduce((acc, curr) => acc + curr.revenue, 0),
    [data]
  );

  return (
    <Card className="w-full h-96">
      <CardHeader>
        <CardTitle className="text-base font-bold text-neutral-900">
          Revenue by Category
        </CardTitle>
        <CardDescription className="text-xs text-neutral-500">
          Distribution of gross sales across product categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-xs text-neutral-400">
            No sales data available.
          </div>
        ) : (
          <div className="h-72 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="revenue"
                  nameKey="categoryName"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  stroke="none"
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [
                    `₦${value?.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
                    "Revenue",
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
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span className="text-xs text-neutral-600 dark:text-neutral-300 font-medium ml-1">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Centered Total Overlay */}
            <div className="absolute inset-0 top-[-36px] flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-semibold uppercase text-neutral-400">
                Total Revenue
              </span>
              <span className="text-sm font-bold font-mono text-neutral-900">
                ₦{totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}