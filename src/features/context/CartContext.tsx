"use client"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {CartItemTyp } from "../type";



interface CartContextProps {
    cart:CartItemTyp[]
    handleAddToCart: (productData: Omit<CartItemTyp, 'quantity'>, quantity?: number) => void;
    removeItemFromCart:(id:string)=>void;
    updateQuantity:(id:string,quantity:number)=>void
    clearCart:()=>void
    cartItemsLength:number,
    totalPrice:number
    totalCategories:number
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext=createContext<CartContextProps | undefined>(undefined); 

export default function CartProvider({children}: CartProviderProps) {
    const [cart,setCart]=useState<CartItemTyp[]>(()=>{
        if (typeof window != "undefined"){
            const savedCart=localStorage.getItem("shoppingCart")
            if(savedCart){
                try{
                   return JSON.parse(savedCart)
                }catch (err) {
                    console.error("Failed to parse cart", err);
                }
            }

        }
        return []
    })

    // save to local storag on state change
    useEffect(()=>{
        localStorage.setItem("shoppingCart",JSON.stringify(cart))
    },[cart])



    // ✅ CORRECT
    const handleAddToCart = function (productData: Omit<CartItemTyp, 'quantity'>, quantity = 1) {
    setCart((prev) => {
        const existing = prev.find((item) => item.id === productData.id);

        if (existing) {
        return prev.map((item) =>
            item.id === productData.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        }

        return [...prev, { ...productData, quantity }];
    });
    };


    const removeItemFromCart=function(id:string){
        setCart((prev)=>prev.filter((item)=>item.id!==id))
    }

    const updateQuantity=function(id:string,quantity:number){
        if (quantity<=0){
            // return removeItemFromCart(id)
            return null
        }
        setCart((prev) =>
            prev.map((item) =>
            item.id === id ? { ...item, quantity} : item
            )
        );
    }

    const clearCart = () => setCart([]);

    const totalCategories=cart.length
    const cartItemsLength = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
        cart,
        handleAddToCart,
        cartItemsLength,
        updateQuantity,
        clearCart,
        totalPrice,
        removeItemFromCart,
        totalCategories
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext(){
    const context=useContext(CartContext)
    if (context ===undefined){
        throw new Error ("Context was used outside provider")
    }
    return context
}