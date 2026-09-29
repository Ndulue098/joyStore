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

export default function CartItemRow({item}: CartItemRowProps) {
    const {removeItemFromCart,updateQuantity}=useCartContext()    
  return (
    <ul>
    {/* {cart.map((item) => ( */}
      
    <CartItem item={item} deleteItem={removeItemFromCart} updateQuantity={updateQuantity} />
    {/* ))} */}
    </ul>
  );
} 