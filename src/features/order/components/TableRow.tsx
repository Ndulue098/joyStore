import { ImageOff } from "lucide-react";
import { OrderItemType } from "@/src/types/types";

interface TableRowProps {
  order_items: OrderItemType[];
}

export default function TableRow({ order_items }: TableRowProps) {

  return (
    <>
      {order_items.map((order_item, i) => {
        // Parse attributes if they are saved as an object or JSON string
        const attributes = 
          typeof order_item.attributes === "string" 
            ? JSON.parse(order_item.attributes) 
            : order_item.attributes || {};

        const attributeEntries = Object.entries(attributes);

        return (
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
                {order_item?.images ? (
                  <img
                    src={order_item.images}
                    alt={order_item?.product_name}
                    className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <ImageOff className="h-4 w-4 stroke-[1.5] text-neutral-400" />
                )}
              </div>
            </td>

            {/* Product Name & Variant Attributes */}
            <td className="py-3.5 px-1 sm:px-2">
              <div className="flex flex-col space-y-1">
                <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm leading-snug">
                  {order_item.product_name}
                </span>

                {/* Render Variant Attributes Pills */}
                {attributeEntries.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    {attributeEntries.map(([key, value]) => {
                      const stringVal = value === null || value === undefined ? 'None' : String(value);
                      return (
                        <span 
                          key={key} 
                          className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700"
                        >
                          <span className="text-neutral-400 capitalize mr-1">{key}:</span>
                          <span className="font-semibold">{stringVal}</span>
                        </span>
                      );
                    })}
                  </div>
                )}
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
        );
      })}
    </>
  );
}