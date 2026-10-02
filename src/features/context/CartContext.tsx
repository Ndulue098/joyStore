"use client"
import { CartItem } from "@/src/types/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";



interface CartContextProps {
    cart:CartItem[]
    handleAddToCart: (productData: Omit<CartItem, 'quantity'>, quantity?: number) => void;
    removeItemFromCart:(id:number)=>void;
    updateQuantity:(id:number,quantity:number)=>void
    clearCart:()=>void
    cartItemsLength:number,
    totalPrice:number
    totalCategories:number; 
    isInCart:(id: number) => boolean
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext=createContext<CartContextProps | undefined>(undefined); 

export default function CartProvider({children}: CartProviderProps) {
    const [cart,setCart]=useState<CartItem[]>(()=>{
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
    const handleAddToCart = function (productData: Omit<CartItem, 'quantity'>, quantity = 1) {
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


    const removeItemFromCart=function(id:number){
        setCart((prev)=>prev.filter((item)=>item.id!==id))
    }

    const updateQuantity=function(id:number,quantity:number){
        // if (quantity<=0){
        //     // return removeItemFromCart(id)
        //     return null
        // }

        const newQuantity = Math.max(1, quantity);

        setCart((prev) =>
            prev.map((item) =>
            item.id === id ? { ...item, quantity:newQuantity} : item
            )
        );
    }

    const clearCart = () => setCart([]);

    // const isInCart=function(id:string):boolean{
    //    return cart.some((cartId)=>cartId.id===id)
    // } 
    // Inside CartContext
    const isInCart = (id: number): boolean => {
        return cart.some((item) => item.id === id);
    };

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
        totalCategories,
        isInCart
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