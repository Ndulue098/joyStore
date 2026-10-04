import { useCartContext } from "@/src/features/context/CartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";


export default function CartItem({}) {
   const { cartItemsLength } = useCartContext();
  return (
    <Link
      href="/cart"
      id="header-cart-button"
      className="relative flex items-center gap-2 rounded-lg sm:rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-neutral-900 dark:text-neutral-100 shadow-2xs hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all group shrink-0"
      aria-label={`Your Order with ${cartItemsLength} items`}
    >
      <ShoppingCart className="h-4 w-4 text-neutral-800 dark:text-neutral-200 group-hover:scale-105 transition-transform" />
      <span className="text-xs font-bold hidden sm:inline">Order Cart</span>
      {cartItemsLength > 0 && (
        <span className="inline-flex items-center justify-center rounded-full text-[11px] font-extrabold h-5 min-w-[20px] px-1.5 bg-amber-500 text-neutral-950 font-mono shadow-2xs animate-in zoom-in-50 duration-150 shrink-0">
          {cartItemsLength}
        </span>
      )}
    </Link>
  );
}