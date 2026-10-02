import { formatPickupDate } from "@/src/features/lib/formatPickupDate";
import { Eye } from "lucide-react";
import { getOrderById } from "../action";
import ReviewOrder from "./ReviewOrder";
import Status from "./Status";
import { OrderType } from "@/src/types/types";

interface OrderTableRowProps {
  order: OrderType;
}

export default function OrderTableRow({ order }: OrderTableRowProps) {


  return (
    <tr className="hover:bg-neutral-50/60 transition-colors">
      <td className="py-3.5 px-4 font-mono font-bold text-neutral-900">
        {order.public_code}
      </td>

      <td className="py-3.5 px-4 whitespace-nowrap">
        <div className="flex flex-col text-xs text-neutral-500 font-semibold">
          <span>Pickup date:</span>
          <span className="font-normal text-neutral-800">
            {formatPickupDate(order.pickup_date)}
          </span>
        </div>
      </td>

      <td className="py-3.5 px-4 text-xs">
        <div className="flex flex-col">
          <span className="font-semibold text-neutral-900 capitalize">
            {order.customer_name}
          </span>
          <span className="font-mono text-neutral-500">
            {order.customer_phone}
          </span>
        </div>
      </td>

      <td className="py-3.5 px-4 text-center">
        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-neutral-100 border border-neutral-200/80 text-xs font-medium text-neutral-600">
          {order.item_count} item(s)
        </span>
      </td>

      <td className="py-3.5 px-4 text-right font-mono text-neutral-500">
        ₦{order.estimated_total}
      </td>

      <td className="py-3.5 px-4 text-right font-mono font-bold text-neutral-900">
        {order.agreed_total ? (
          `₦${order.agreed_total}`
        ) : (
          <span className="text-neutral-400 font-normal">—</span>
        )}
      </td>

      <td className="py-3.5 px-4 text-center">
        {/* <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/60 capitalize">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          {order.status}
        </span> */}
        <Status order={order.status}/>
      </td>

      <td className="py-3.5 px-4 text-right">
        <ReviewOrder id={order.id}>
          <span>
            <button
              type="button"
              
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-100 hover:text-neutral-900 transition-colors shadow-2xs cursor-pointer active:bg-neutral-200"
              >
              <Eye className="w-3.5 h-3.5 text-neutral-500" />
              <span>Review</span>
            </button>
          </span>
        </ReviewOrder>
      </td>
    </tr>
  ); 







/* 


*/



  
}


/* this is the data i get when i click on review
id: 'd7726624-eca6-4502-b004-c8552eb361c2',
  public_code: 'ORD-F5NRQ',
  customer_name: 'okiri',
  customer_phone: '09143241605',
  pickup_date: '2026-09-17',
  notes: 'Time Slot: afternoon | User Notes: nothing there',
  estimated_total: 667.48,
  agreed_total: null,
  status: 'draft',
  created_at: '2026-09-15T17:15:55.162197+00:00',
  updated_at: '2026-09-15T17:15:55.162197+00:00',
  expires_at: null,
  orderItems: [
    {
      id: '0c13bb21-83f2-4b5e-b062-6106dcd593ab',
      product: [Object],
      order_id: 'd7726624-eca6-4502-b004-c8552eb361c2',
      quantity: 2,
      subtotal: 39.98,
      created_at: '2026-09-15T17:15:56.069516+00:00',
      product_id: 16,
      unit_price: 19.99,
      product_name: 'Tamper-Resistant Wall Outlet with Dual USB Ports'
    },
    {
      id: '7a69e920-8184-4916-844a-ffd7381acd04',
      product: [Object],
      order_id: 'd7726624-eca6-4502-b004-c8552eb361c2',
      quantity: 2,
      subtotal: 438,
      created_at: '2026-09-15T17:15:56.069516+00:00',
      product_id: 11,
      unit_price: 219,
      product_name: 'Solid Walnut Coffee Table with Storage'
    },
    {
      id: '227020bf-18f7-4038-8af3-b0d983cc7b58',
      product: [Object],
      order_id: 'd7726624-eca6-4502-b004-c8552eb361c2',
      quantity: 1,
      subtotal: 189.5,
      created_at: '2026-09-15T17:15:56.069516+00:00',
      product_id: 12,
      unit_price: 189.5,
      product_name: 'Ergonomic Mesh Office Chair with Lumbar Support'
    }
  ]
}

and this is my review popup component ill display 
import { X } from "lucide-react";

interface ReviewOrderProps {
  
}

export default function ReviewOrder({}: ReviewOrderProps) {
  return (
    <div>
      <div>
        <h3>Order Negotiation & Details #BL-F7ZXWN</h3>
        <span><X/></span>
      </div>

      <p className="text-center">costomer info.</p>
      <div className="border border-neutral-500 p-2 rounded-md">
        <span>name</span> : <span>okiri</span> 
        <span>Phone Number</span> : <span> 0912093842</span>
        <span>pick up date</span> : <span></span>
        <span>pick up note</span> : <span></span>

      </div>

      <div>
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50/80 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Qty</th>
              <th className="py-3 px-4">Unit Price</th>
              <th className="py-3 px-4 text-right">Discount</th>
              <th className="py-3 px-4 text-center">SubTotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 font-normal text-neutral-700">

              <tr>
                <td>Philips LED Cool Daylight Bulb 12W E27</td>
                <td>4</td>
                <td>600</td>
                <td>
                  <input type="number" placeholder="discount%" />
                </td>
                <td>₦10,000</td>
              </tr>
          </tbody>
        </table>
      </div>

      <div>
        <label htmlFor="agreed total"></label>
        <input type="text" />

        update status
        {/* use the select component from shad cn  
//       </div>

//       <button>update negotiation</button>
//     </div>
//   );
// }

// formmat it properly,
// for the status i want a shad cn component that displays the current status and status like: negotiation, cancled, confirmed and completed. on the discount column use an input form ready for the admin to add discound and the subtotal should be claculated with the unit_price, quantity and discount(if included) the agreed total should also react to the chage.  */