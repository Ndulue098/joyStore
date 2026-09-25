import { Order_item } from "../../type";

interface TableRowProps {
  order_items:Order_item[]
}

export default function TableRow({order_items}: TableRowProps) {
    // <TableData order_item={order_item} key={order_item.id}/>
  return (
    <>
    {order_items.map((order_item,i)=>(
        <tr key={order_item.id} className="hover:bg-neutral-50/50 transition-colors">
                <td className="py-3.5 px-3 text-center font-mono text-neutral-400">
                    {i+1}
                </td>
                
                <td className="py-3.5 px-2 hidden sm:table-cell">
                    <div className="h-10 w-10 shrink-0 rounded-md border border-neutral-200 overflow-hidden bg-neutral-100">
                    {/* <ImageWithFallback
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover" 
                        /> */}
                    </div>
                </td>

                <td className="py-3.5 px-3">
                    <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                        {order_item.product_name}
                    </span>
                    {/* <span className="font-semibold text-neutral-900 leading-snug">
                        Philips LED Cool Daylight Bulb 12W E27
                    </span> */}
                    </div>
                </td>

                <td className="py-3.5 px-3 text-center font-semibold text-neutral-900">
                    {order_item.quantity}
                </td>

                <td className="py-3.5 px-3 text-right font-mono text-neutral-600">
                    {order_item.unit_price}
                </td>

                <td className="py-3.5 px-3 text-right font-mono font-bold text-neutral-900">
                    {order_item.subtotal}
                </td>
            </tr>
    ))}
    </>
  );
}