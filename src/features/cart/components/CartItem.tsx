"use client"
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCartContext } from "../../context/CartContext";
import { CartItemTyp } from "../../type";

interface CartItemProps {
  item:CartItemTyp
  deleteItem:(id:string)=>void
  updateQuantity:(id:string,quantity:number)=>void
}

export default function CartItem({item,deleteItem,updateQuantity}: CartItemProps) {

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-b border-neutral-200">
      {/* Product Image & Info */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <Link
          href={`/products${item.id}`}
          className="relative h-20 w-20 shrink-0 overflow-hidden  border border-neutral-200 bg-neutral-100"
        >
          {/* <ImageWithFallback
            src={primaryImage?.url}
            alt={product.name}
            className="h-full w-full object-cover"
          /> */}
        </Link>

        <div className="flex-1 min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">
            {item.brand}
          </span>
          <Link
            href={`/products/${item.id}`}
            className="text-sm font-semibold text-neutral-900 hover:text-amber-600 transition-colors line-clamp-1"
          >
            {item.name}
          </Link>
          <div className="text-xs text-neutral-500 mt-1">
            Unit Price: <span className="font-semibold text-neutral-800">{item.price}</span>
          </div>
        </div>
      </div>

      {/* Quantity Selector, Subtotal & Delete */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
        <div className="border flex items-center justify-center gap-2 rounded-md">
          {/* Minus Button: Decreases quantity by 1 */}
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-2 border-r hover:bg-gray-100 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3 h-3" />
          </button>

          {/* Display Current Quantity */}
          <span className="px-2 font-medium">{item.quantity}</span>

          {/* Plus Button: Increases quantity by 1 */}
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-2 border-l hover:bg-gray-100 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        <div className="text-right min-w-[90px]">
          <span className="text-[10px] text-neutral-400 block -mb-1">Subtotal</span>
          <span className="text-sm font-bold text-neutral-900 font-mono">
            {item.total*item.quantity} 
          </span>
        </div>

        <button
          type="button"
          onClick={()=>deleteItem(item.id)}
          className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}