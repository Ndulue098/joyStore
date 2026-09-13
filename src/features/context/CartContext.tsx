"use client"
import { createContext, ReactNode, useContext, useState } from "react";

type CartItem={
    id:string;
    category_id:number;
    name:string;
    slug:string;
    sku:string;
    brand:string
    short_description:string
    price:number;
    quantity:number;
    image?:string;
}


interface CartContextProps {
  cart:CartItem[]
  handleAddToCart:(productData:CartItem)=>void
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext=createContext<CartContextProps | undefined>(undefined); 

export default function CartProvider({children}: CartProviderProps) {
    const [cart,setCart]=useState<CartItem[]>([])

//    const addToCart = (product: Omit<CartItem, 'quantity'>, quantity = 1) => {
//         setCart((prev) => {
//         const existing = prev.find((item) => item.id === product.id);
//         if (existing) {
//             return prev.map((item) =>
//             item.id === product.id
//                 ? { ...item, quantity: item.quantity + quantity }
//                 : item
//             );
//         }
//         return [...prev, { ...product, quantity }];
//         });
//     };

    const handleAddToCart= function(productData:CartItem){
        console.log(productData);
        

        setCart((prev)=>{
            // check for existing data
          const existing= prev.find((item)=>item.id===productData.id)
          if(existing){
            prev.map((item)=>item.id===productData.id?{...item, quantity:item.quantity + productData.quantity}:item)
          }
            return [...prev,productData]
        })
    }

  return (
    <CartContext.Provider value={{
        cart,
        handleAddToCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

function useCartContext(){
    const context=useContext(CartContext)
    if (context ===undefined){
        throw new Error ("Context was used outside provider")
    }
    return context
}