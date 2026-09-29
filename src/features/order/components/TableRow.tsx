import { ImageOff } from "lucide-react";
import { Order_item } from "../../type";

interface TableRowProps {
  order_items:Order_item[]
}

export default function TableRow({order_items}: TableRowProps) {
    // <TableData order_item={order_item} key={order_item.id}/>

    console.log("orderrrrr=== ",order_items);
    

  return (
    <>
    {order_items.map((order_item,i)=>(
        <tr key={order_item.id} className="hover:bg-neutral-50/50 transition-colors">
                <td className="py-3.5 px-3 text-center font-mono text-neutral-400">
                    {i+1}
                </td>
                
                <td className=" text-center flex items-center sm:table-cell">
                    {order_item?.product.imageUrl ? (
                        <img
                        src={order_item.product.imageUrl}
                        alt={order_item.name}
                        className="h-full w-full overflow-hidden rounded-sm object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <ImageOff className="h-6 w-6  stroke-[1.5] text-neutral-300 mx-auto" />
                    )}
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