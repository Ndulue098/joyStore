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

interface CategoryDiscountData {
  categoryName: string;
  catalogDiscount: number;
  negotiatedDiscount: number;
}

interface DiscountBreakdownChartProps {
  data: CategoryDiscountData[];
}

export function DiscountBreakdownChart({ data }: DiscountBreakdownChartProps) {
  return ( 
    <Card className="w-full border  grow" >
      <CardHeader>
        <CardTitle className="text-base font-bold text-neutral-900">
          Discount & Negotiation Breakdown
        </CardTitle>
        <CardDescription className="text-xs text-neutral-500">
          Comparison between upfront product discounts and negotiated order discounts by category
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 py-0">
        {data.length === 0 ? (
          <div className="h-72 flex items-center justify-center text-xs text-neutral-400">
            No discount data recorded.
          </div>
        ) : (
          <div className="h-72 w-full px-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                barGap={6}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="categoryName"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  interval={0}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  tickFormatter={(val) => `₦${val.toLocaleString()}`}
                />
                <Tooltip
                  formatter={(value, name) => [
                    `₦${value?.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
                    name === "catalogDiscount" ? "Catalog Discount" : "Negotiated Discount",
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
                    <span className="text-xs text-neutral-600 font-medium ml-1">
                      {value === "catalogDiscount" ? "Catalog Discount" : "Negotiated Discount"}
                    </span>
                  )}
                />
                <Bar
                  dataKey="catalogDiscount"
                  name="catalogDiscount"
                  fill="#6366f1" // Indigo
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="negotiatedDiscount"
                  name="negotiatedDiscount"
                  fill="#f59e0b" // Amber
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}