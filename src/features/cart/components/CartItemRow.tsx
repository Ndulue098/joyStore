"use client"
import Link from "next/link";
import { useCartContext } from "../../context/CartContext";
import { CartItemTyp } from "../../type";
import CartItem from "./CartItem";
 
interface CartItemRowProps {
    key: string; 
    item: CartItemTyp;
    deleteItem: (id: string) => void; 
    updateQuantity:(id:string,quantity:number)=>void
}

export default function CartItemRow({}: CartItemRowProps) {
    const {cart,removeItemFromCart,updateQuantity}=useCartContext()    

    if (!cart.length){
      return <div className="m-8 p-2.5 rounded-md max-w-[20rem] text-center mx-auto bg-neutral-200 w-full">
        <h2 className="font-semibold text-xl text-neutral-600 mb-2">Your Order List is Empty</h2>
        <p className="text-xs mb-3 text-neutral-500 ">
          You haven't selected any electrical supplies or appliances yet. Explore our store catalogue to add items to your quotation list.
        </p>
 
        <Link href={`/shop`} className="bg-amber-500/80 block  px-2.5 py-1.5 w-full rounded-sm text-sm font-semibold"> 
          Browse Store
        </Link>
      </div>
    }

  return (
    <ul>
    {cart.map((item) => (
        <CartItem key={item.id} item={item} deleteItem={removeItemFromCart} updateQuantity={updateQuantity} />
    ))}
    </ul>
  );
}