import { OrderType } from "@/src/types/types";
import OrderTableRow from "./OrderTableRow";
import { Inbox } from "lucide-react";

interface OrderTableProps {
  orders: OrderType[];
}

export default function OrderTable({ orders }: OrderTableProps) {
  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50/50 dark:bg-neutral-900/50">
        <div className="p-3 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 mb-3">
          <Inbox className="w-6 h-6" />
        </div>
        <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          No uncompleted orders
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          All customer orders have been completed or processed.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xs">
      <table className="w-full text-left text-xs sm:text-sm border-collapse">
        <thead>
          <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-800/50 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <th className="py-3 px-4">Order Code</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Customer</th>
            <th className="py-3 px-4 text-center">Products</th>
            <th className="py-3 px-4 text-right">Listed Total</th>
            <th className="py-3 px-4 text-right">Agreed Total</th>
            <th className="py-3 px-4 text-center">Status</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-normal text-neutral-700 dark:text-neutral-300">
          {orders.map((order) => (
            <OrderTableRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
}