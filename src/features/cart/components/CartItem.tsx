"use client"
import { ImageOff, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCartContext } from "../../context/CartContext";
import { CartItemTyp } from "../../type";

interface CartItemProps {
  item:CartItemTyp
  deleteItem:(id:string)=>void
  updateQuantity:(id:string,quantity:number)=>void
}

export default function CartItem({item,deleteItem,updateQuantity}: CartItemProps) {
  const subtotal = (item.price || item.total) * item.quantity;
  
  return (
    <div className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 px-2 sm:px-3 rounded-xl hover:bg-neutral-50/80 border-b border-neutral-200/80 transition-colors">
      {/* Product Image & Meta Details */}
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        <Link
          href={`/products/${item.id}`}
          className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg border border-neutral-200/80 bg-neutral-100 flex items-center justify-center group-hover:border-neutral-300 transition-colors"
        >
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <ImageOff className="h-6 w-6 stroke-[1.5] text-neutral-300" />
          )}
        </Link>

        <div className="flex-1 min-w-0 space-y-0.5">
          {item.brand && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
              {item.brand}
            </span>
          )}
          <Link
            href={`/products/${item.id}`}
            className="text-sm font-semibold text-neutral-900 hover:text-amber-700 transition-colors line-clamp-1 block"
          >
            {item.name}
          </Link>
          <div className="text-xs text-neutral-500 font-medium pt-0.5">
            Unit Price:{" "}
            <span className="font-mono font-semibold text-neutral-800">
              ₦{Number(item.price).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Quantity Selector, Subtotal & Remove Action */}
      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
        
        {/* Quantity Controls */}
        <div className="flex items-center rounded-lg border border-neutral-300 bg-white shadow-2xs overflow-hidden shrink-0">
          <button
            type="button"
            disabled={item.quantity <= 1}
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-1.5 sm:p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <span className="w-8 sm:w-10 text-center text-xs sm:text-sm font-bold font-mono text-neutral-900 select-none">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-1.5 sm:p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 transition-colors cursor-pointer"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Subtotal Display */}
        <div className="text-right min-w-[80px] sm:min-w-[100px]">
          <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block -mb-0.5">
            Subtotal
          </span>
          <span className="text-sm sm:text-base font-bold text-neutral-900 font-mono">
            ₦{Number(subtotal).toLocaleString()}
          </span>
        </div>

        {/* Delete Button */}
        <button
          type="button"
          onClick={() => deleteItem(item.id)}
          className="p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
          aria-label="Remove item from order"
        >
          <Trash2 className="h-4 w-4 stroke-[1.75]" />
        </button>
      </div>
    </div>
  );
}