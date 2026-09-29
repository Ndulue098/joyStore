import { useCartContext } from "@/src/features/context/CartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";


export default function CartItem({}) {
   const { cartItemsLength } = useCartContext();
  return (
    <Link
      href="/cart"
      id="header-cart-button"
      className="relative flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-neutral-900 shadow-2xs hover:bg-neutral-50 hover:border-neutral-300 transition-all"
      aria-label={`Your Order with ${cartItemsLength} items`}
    >
      <ShoppingCart className="h-4 w-4 text-neutral-800" />
      <span className="text-xs font-bold hidden sm:inline">Order Cart</span>
      {cartItemsLength > 0 && (
        <span className="inline-flex items-center justify-center rounded-lg text-[11px] font-extrabold h-5 px-1.5 bg-amber-500 text-white font-mono shadow-2xs animate-in zoom-in-50 duration-150">
          {cartItemsLength}
        </span>
      )}
    </Link>
  );
}