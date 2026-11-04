"use client"
import { CartItem } from "@/src/types/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface CartContextProps {
    cart: CartItem[];
    handleAddToCart: (productData: Omit<CartItem, 'quantity'>, quantity?: number) => void;
    removeItemFromCart: (id: number | string) => void;
    updateQuantity: (id: number | string, quantity: number) => void;
    clearCart: () => void;
    cartItemsLength: number;
    totalPrice: number;
    totalCategories: number; 
    isInCart: (id: number | string) => boolean;
    setOpen: (open: boolean) => void;
    open: boolean;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextProps | undefined>(undefined); 

export default function CartProvider({ children }: CartProviderProps) {
    const [open, setOpen] = useState(false);

    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window != "undefined") {
            const savedCart = localStorage.getItem("shoppingCart");
            if (savedCart) {
                try {
                   return JSON.parse(savedCart);
                }catch (err) {
                    console.error("Failed to parse cart", err);
                }
            }
        }
        return [];
    });

    // Save to local storage on state change
    useEffect(() => {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }, [cart]);

    // ✅ Correctly handle adding variants or base products
    const handleAddToCart = function (productData: Omit<CartItem, 'quantity'>, quantity = 1) {
        console.log("Adding to cart:", productData, "Quantity:", quantity);
        setCart((prev) => {
            // Determine the unique identifier (use variantId if it exists, otherwise base product id)
            const targetId = productData.variantId || productData.id;
            
            const existingIndex = prev.findIndex((item) => (item.variantId || item.id) === targetId);

            if (existingIndex > -1) {
                // Item exists, update quantity
                return prev.map((item, index) =>
                    index === existingIndex
                        ? { ...item, quantity: item.quantity + quantity,total:item.price * (item.quantity + quantity) }
                        : item
                );
            }

            // Item does not exist, add new entry
            return [...prev, { ...productData, id: targetId,productId:productData.variantId,baseProductId:productData.id, quantity }];
        });
    };

    const removeItemFromCart = function (id: number | string) {
        setCart((prev) => prev.filter((item) => (item.variantId || item.id) !== id));
    };

    const updateQuantity = function (id: number | string, quantity: number) {
        const newQuantity = Math.max(1, quantity);

        setCart((prev) =>
            prev.map((item) =>
                (item.variantId || item.id) === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => setCart([]);

    const isInCart = (id: number | string): boolean => {
        return cart.some((item) => (item.variantId || item.id) === id);
    };

    const totalCategories = cart.length;
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
            isInCart,
            setOpen,
            open,
        }}>
          {children} 
        </CartContext.Provider>
    );
}

export function useCartContext() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("Context was used outside provider");
    }
    return context;
}