"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TopProductData {
  productName: string;
  totalQuantity: number;
  totalRevenue: number;
  stockQuantity: number;
}

interface TopProductsChartProps {
  data: TopProductData[];
}

export function TopProductsChart({ data }: TopProductsChartProps) {
  const [metric, setMetric] = useState<"revenue" | "quantity">("revenue");

  return (
    <Card className="w-full border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xs">
      {/* Header: Responsive flex-col on mobile, flex-row on sm screens */}
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 p-4 sm:p-6">
        <div className="space-y-0.5">
          <CardTitle className="text-sm sm:text-base font-extrabold text-neutral-900 dark:text-neutral-100">
            Top Performing Products
          </CardTitle>
          <CardDescription className="text-xs text-neutral-500 dark:text-neutral-400">
            Leaderboard by {metric === "revenue" ? "gross revenue (₦)" : "units sold"}
          </CardDescription>
        </div>

        {/* Metric Switch */}
        <div className="flex items-center self-start sm:self-auto rounded-xl bg-neutral-100 dark:bg-neutral-800 p-1 text-xs font-semibold shrink-0">
          <button
            type="button"
            onClick={() => setMetric("revenue")}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              metric === "revenue"
                ? "bg-white dark:bg-neutral-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
            }`}
          >
            Revenue
          </button>
          <button
            type="button"
            onClick={() => setMetric("quantity")}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              metric === "quantity"
                ? "bg-white dark:bg-neutral-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
            }`}
          >
            Units Sold
          </button>
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:px-6 pb-4">
        {!data || data.length === 0 ? (
          <div className="h-72 flex items-center justify-center text-xs text-neutral-400">
            No product sales data recorded yet.
          </div>
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={data}
                margin={{ top: 10, right: 15, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  className="stroke-neutral-200 dark:stroke-neutral-800"
                />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#888888" }}
                  tickFormatter={(val) =>
                    metric === "revenue"
                      ? `₦${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`
                      : val.toString()
                  }
                />
                <YAxis
                  type="category"
                  dataKey="productName"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#666666" }}
                  width={85}
                  tickFormatter={(val) =>
                    val.length > 11 ? `${val.slice(0, 9)}...` : val
                  }
                />
                <Tooltip
                  cursor={{ fill: "rgba(241, 245, 249, 0.4)" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item: TopProductData = payload[0].payload
                      return (
                        <div className="bg-neutral-900 text-neutral-100 p-3 rounded-xl text-xs space-y-1 shadow-lg border border-neutral-800">
                          <p className="font-bold border-b border-neutral-800 pb-1">
                            {item.productName}
                          </p>
                          <p>
                            Revenue:{" "}
                            <span className="font-mono font-semibold text-emerald-400">
                              ₦{item.totalRevenue?.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                              })}
                            </span>
                          </p>
                          <p>
                            Units Sold:{" "}
                            <span className="font-mono font-semibold text-indigo-300">
                              {item.totalQuantity}
                            </span>
                          </p>
                          <p>
                            Stock Remaining:{" "}
                            <span
                              className={`font-mono font-semibold ${
                                item.stockQuantity <= 5
                                  ? "text-rose-400"
                                  : "text-neutral-400"
                              }`}
                            >
                              {item.stockQuantity} units
                            </span>
                          </p>
                        </div>
                      )
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey={metric === "revenue" ? "totalRevenue" : "totalQuantity"}
                  radius={[0, 6, 6, 0]}
                  barSize={16}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.stockQuantity <= 5 ? "#f43f5e" : "#6366f1"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}