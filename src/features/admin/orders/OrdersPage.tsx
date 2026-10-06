import { getAllOrders } from "./data/getOrderData";
import OrderTableRow from "./components/OrderTableRow";
import OrderTable from "./components/OrderTable";



export default async function OrdersPage({}) {
  const orders=await getAllOrders() 

  console.log("orders",orders);
   
  if(orders.length===0){
    return  <div className="p-4 rounded-lg bg-neutral-100 text-neutral-500 text-sm text-center">
      No orders available.
    </div>
  }

  return (
    <div className="w-full max-w-full overflow-hidden space-y-6">
      {/* Header Section */}
      <div className="flex flex-col items-start justify-between gap-1 pb-4 border-b border-neutral-200/80 dark:border-neutral-800">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Orders & WhatsApp Negotiations
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
          Review incoming quotations, adjust agreed negotiation prices, and confirm pickup fulfillment.
        </p>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="w-full max-w-full overflow-x-auto rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs">
        <OrderTable orders={orders} />
      </div>
    </div>
  ); 
}