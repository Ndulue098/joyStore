import CartPage from "@/src/features/cart/CartPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};

export default function page({}) {
  return (
    <div>
      <CartPage/>
    </div>
  );
}