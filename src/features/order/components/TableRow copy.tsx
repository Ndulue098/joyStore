import { ImageOff } from "lucide-react";
import { OrderItemType } from "@/src/types/types";

interface TableRowProps {
  order_items:OrderItemType[]
}

export default function TableRow({order_items}: TableRowProps) {
    // <TableData order_item={order_item} key={order_item.id}/>

    console.log("orderrrrr=== ",order_items);
    

  return (
    <>
      {order_items.map((order_item, i) => (
        <tr 
          key={order_item.id || i} 
          className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-colors"
        >
          {/* Item Index (#) */}
          <td className="py-3.5 px-1 sm:px-2 text-center font-mono text-xs text-neutral-400 hidden sm:table-cell">
            {i + 1}
          </td>
          
          {/* Image Thumbnail */}
          <td className="py-3.5 px-1 sm:px-2 hidden sm:table-cell">
            <div className="h-10 w-10 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-center shrink-0 mx-auto">
              {order_item?.product?.imageUrl ? (
                <img
                  src={order_item.product.imageUrl}
                  alt={order_item?.product?.name || order_item.product_name}
                  className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <ImageOff className="h-4 w-4 stroke-[1.5] text-neutral-400" />
              )}
            </div>
          </td>

          {/* Product Name & Details */}
          <td className="py-3.5 px-1 sm:px-2">
            <div className="flex flex-col">
              <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm leading-snug">
                {order_item.product_name}
              </span>
              {/* {order_item.product?.category && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-500 mt-0.5">
                  {order_item.product.category}
                </span>
              )} */}
            </div>
          </td>

          {/* Quantity */}
          <td className="py-3.5 px-1 sm:px-2 text-center font-semibold text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm">
            {order_item.quantity}
          </td>

          {/* Unit Price */}
          <td className="py-3.5 px-1 sm:px-2 text-right font-mono text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            ₦{Number(order_item.unit_price).toLocaleString()}
          </td>

          {/* Subtotal */}
          <td className="py-3.5 px-1 sm:px-2 text-right font-mono text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100">
            ₦{Number(order_item.subtotal).toLocaleString()}
          </td>
        </tr>
      ))}
    </>
  );
}