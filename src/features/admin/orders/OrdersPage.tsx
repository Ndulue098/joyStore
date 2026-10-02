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
    <div>
      <div className="flex flex-col">

      <div className="flex flex-col items-center justify-between mb-12">
        <h2 className="text-3xl font-bold">
          Orders & WhatsApp Negotiations
        </h2>
        <p className="text-xs text-neutral-500">Review incoming quotations, adjust agreed negotiation prices, and confirm pickup fulfillment</p>
      </div>

      {/* <div className="overflow-x-auto rounded-md border border-neutral-200 bg-white shadow-2xs">
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
      </div> */}
      <OrderTable orders={orders}/>
      </div>
    </div>
  );
}