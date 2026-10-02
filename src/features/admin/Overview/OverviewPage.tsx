import { CheckCircle2, Layers, Package, ShoppingBag } from "lucide-react";
import { getCategoryRevenue, getDashboardTotals, getDiscountBreakdownByCategory, getMonthlyOrdersByStatus, getTopSellingProducts } from "./data/getCategoryRev";
import { OrderStatusChart } from "./components/OrderStatusChart";
import { TopProductsChart } from "./components/TopProductsChart";
import { getAllOrders } from "../orders/data/getOrderData";
import OrderTable from "../orders/components/OrderTable";



export default async function OverviewPage({}) {
    const orders=await getAllOrders()
  
    const orderList=orders||[]

  const uncompletedOrders=orderList?.filter((order)=>order.status!=="completed")

 const [data, discount, orderStatus,topSales,{totalProducts,totalCategories,totalOrders,totalConfirmedOrders}] = await Promise.all([
  getCategoryRevenue(),
  getDiscountBreakdownByCategory(),
  getMonthlyOrdersByStatus(),
  getTopSellingProducts(),
  getDashboardTotals()
]);
  console.log("cahjednsafenrkdsjf kwj dsfkj askd jk",data);
  
  return (
    <div className="space-y-8">
      {/* 1. TOP METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Products */}
        <div className="p-4 rounded-xl border border-blue-200/80 bg-blue-50/30 dark:bg-blue-950/20 dark:border-blue-900/60  hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              Total Products
            </span>
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 shrink-0">
              <Package className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100 mt-2">
            {totalProducts}
          </p>
        </div>

        {/* Total Categories */}
        <div className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/30 dark:bg-amber-950/20 dark:border-amber-900/60  hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Total Categories
            </span>
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-300 shrink-0">
              <Layers className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100 mt-2">
            {totalCategories}
          </p>
        </div>

        {/* Total Orders */}
        <div className="p-4 rounded-xl border border-emerald-200/80 bg-emerald-50/30 dark:bg-emerald-950/20 dark:border-emerald-900/60  hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Total Orders
            </span>
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 shrink-0">
              <ShoppingBag className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100 mt-2">
            {totalOrders}
          </p>
        </div>

        {/* Confirmed Orders */}
        <div className="p-4 rounded-xl border border-purple-200/80 bg-purple-50/30 dark:bg-purple-950/20 dark:border-purple-900/60  hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
              Confirmed Orders
            </span>
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 shrink-0">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100 mt-2">
            {totalConfirmedOrders}
          </p>
        </div>
      </div>

      {/* 2. ACTIONABLE ORDERS TABLE */}
      <div className="  bg-white  overflow-hidden flex flex-col gap-2">
        <span className="text-sm font-semibold ">Uncompleted Orders</span>
        <OrderTable orders={uncompletedOrders} />
      </div>

      {/* 3. ANALYTICS CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="rounded-xl border border-neutral-200/80 bg-white  p-1 ">
          <TopProductsChart data={topSales} />
        </div>
        <div className="rounded-xl border border-neutral-200/80 bg-white  p-1 ">
          <OrderStatusChart data={orderStatus} />
        </div>
      </div>
    </div>
  );
}