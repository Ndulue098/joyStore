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
    <Card className="w-full border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-bold text-neutral-900">
            Top Performing Products
          </CardTitle>
          <CardDescription className="text-xs text-neutral-500">
            Leaderboard by {metric === "revenue" ? "gross revenue (₦)" : "units sold"}
          </CardDescription>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center rounded-lg bg-neutral-100 p-0.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMetric("revenue")}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              metric === "revenue"
                ? "bg-white text-indigo-600 shadow-xs"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Revenue
          </button>
          <button
            type="button"
            onClick={() => setMetric("quantity")}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              metric === "quantity"
                ? "bg-white text-indigo-600 shadow-xs"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Units Sold
          </button>
        </div>
      </CardHeader>

      <CardContent className="px-0 py-0">
        {data.length === 0 ? (
          <div className="h-80 flex items-center justify-center text-xs text-neutral-400">
            No product sales data recorded yet.
          </div>
        ) : (
          <div className="h-74 w-full p-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={data}
                margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
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
                  tick={{ fontSize: 11, fill: "#334155" }}
                  width={110}
                  tickFormatter={(val) =>
                    val.length > 16 ? `${val.slice(0, 14)}...` : val
                  }
                />
                <Tooltip
                  cursor={{ fill: "rgba(241, 245, 249, 0.6)" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item: TopProductData = payload[0].payload;
                      return (
                        <div className="bg-[#1e293b] text-white p-2.5 rounded-md text-xs space-y-1 shadow-md">
                          <p className="font-bold border-b border-slate-700 pb-1">
                            {item.productName}
                          </p>
                          <p>
                            Revenue:{" "}
                            <span className="font-mono font-semibold text-emerald-400">
                              ₦{item.totalRevenue.toLocaleString(undefined, {
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
                                  ? "text-red-400"
                                  : "text-neutral-300"
                              }`}
                            >
                              {item.stockQuantity} units
                            </span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey={metric === "revenue" ? "totalRevenue" : "totalQuantity"}
                  radius={[0, 4, 4, 0]}
                  barSize={18}
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