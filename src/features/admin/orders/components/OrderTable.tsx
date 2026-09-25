import { OrderType } from "@/src/features/type";
import OrderTableRow from "./OrderTableRow";

interface OrderTableProps {
    orders: OrderType[];
  
}

export default function OrderTable({orders}: OrderTableProps) {
  return (
    <div className="overflow-x-auto rounded-md border border-neutral-200 bg-white shadow-2xs">
      <table className="w-full text-left text-xs sm:text-sm border-collapse">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50/80 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
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
        <tbody className="divide-y divide-neutral-100 font-normal text-neutral-700">
          {orders.map((order)=><OrderTableRow key={order.id} order={order}/>)}
          
        </tbody>
      </table>
    </div>
  );
}