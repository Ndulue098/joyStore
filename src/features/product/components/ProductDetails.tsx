"use client";

import { CheckCircle2, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCartContext } from "../../context/CartContext";
import { CartItemTyp } from "../../type";
import { useState } from "react";

interface ProductDetailsProps {
  brand: string;
  sku: string | undefined;
  name: string;
  description: string;
  unit: string;
  specArray: [string, string][];
  price: number;
  id: string;
  slug: string;
  category_id: number;
  short_description: string;
  category: undefined;
  image:string
}

export default function ProductDetails({
  brand,
  sku,
  name,
  description,
  unit,
  specArray = [],
  price,
  id,
  slug,
  category_id,
  short_description,
  category,
  image
}: ProductDetailsProps) {
  const { cart, handleAddToCart, isInCart, removeItemFromCart, updateQuantity } =
    useCartContext();

  const [localQuantity, setLocalQuantity] = useState(1);
  const inCart = isInCart(id);

  // Find current cart item quantity if already added
  const cartItem = cart?.find((item) => item.id === id);
  const currentQuantity = inCart ? cartItem?.quantity || 1 : localQuantity;

  function handleAdd() {
    const productData: CartItemTyp = {
      id,
      category_id,
      name,
      slug,
      sku,
      brand,
      description,
      short_description,
      price,
      category,
      total: price,
      quantity: localQuantity,
      imageUrl:image  
    };
    handleAddToCart(productData, localQuantity);
  }

  function handleQuantityChange(delta: number) {
    if (inCart) {
      updateQuantity(id, currentQuantity + delta);
    } else {
      setLocalQuantity((prev) => Math.max(1, prev + delta));
    }
  }

  return (
    <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
      {/* Header Metadata */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 font-semibold uppercase tracking-wider text-amber-800">
            {brand || "Generic"}
          </span>
          {sku && (
            <span className="text-neutral-400 font-mono text-[11px] tracking-tight">
              SKU: <strong className="text-neutral-600 font-semibold">{sku}</strong>
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-tight">
          {name}
        </h1>
      </div>

      {/* Product Description */}
      {description && (
        <div className="space-y-1.5">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
            Product Description
          </h3>
          <p className="text-neutral-600 text-sm leading-relaxed font-normal">
            {description}
          </p>
        </div>
      )}

      {/* Pricing & Quantity Selector Card */}
      <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200/80 bg-neutral-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">
            Unit Price
          </span>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-900 tracking-tight">
              ₦{Number(price).toLocaleString()}
            </p>
            {unit && (
              <span className="text-xs font-medium text-neutral-500">
                / {unit}
              </span>
            )}
          </div>
        </div>

        {/* Quantity Controller */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-200/60">
          <span className="text-xs font-semibold text-neutral-600">
            Quantity:
          </span>
          <div className="flex items-center rounded-xl border border-neutral-300 bg-white shadow-2xs overflow-hidden">
            <button
              type="button"
              disabled={currentQuantity <= 1}
              onClick={() => handleQuantityChange(-1)}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center text-sm font-bold font-mono text-neutral-900 select-none">
              {currentQuantity}
            </span>
            <button
              type="button"
              onClick={() => handleQuantityChange(1)}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cart Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          disabled={inCart}
          onClick={handleAdd}
          className={`flex-1 py-3 px-6 active:scale-[0.99] transition-all rounded-xl font-semibold flex items-center justify-center gap-2.5 shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 ${
            inCart
              ? "bg-emerald-600 text-white cursor-default opacity-95"
              : "bg-neutral-900 hover:bg-neutral-800 text-white shadow-sm hover:shadow-md"
          }`}
        >
          {inCart ? (
            <>
              <CheckCircle2 className="w-4 h-4 stroke-[2.25]" />
              <span>Item in Cart</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 stroke-[2.25]" />
              <span>Add to Cart</span>
            </>
          )}
        </button>

        {inCart && <button
            type="button"
            onClick={() => removeItemFromCart(id)}
            className="py-3 px-5 active:scale-[0.99] transition-all rounded-xl font-semibold flex items-center justify-center gap-2 border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:border-rose-300 shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          >
            <Trash2 className="w-4 h-4 stroke-[2]" />
            <span>Remove Item</span>
          </button>
        }
      </div>

      {/* Specifications Table */}
      {specArray.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 pb-2 border-b border-neutral-200">
            Specifications
          </h3>
          <div className="rounded-xl border border-neutral-200/80 overflow-hidden text-xs divide-y divide-neutral-200/60">
            {specArray.map(([key, value], i) => (
              <div
                key={i}
                className={`flex justify-between items-center px-4 py-2.5 transition-colors ${
                  i % 2 === 0 ? "bg-neutral-50/60" : "bg-white"
                }`}
              >
                <span className="font-medium text-neutral-500 capitalize">
                  {key}
                </span>
                <span className="font-semibold text-neutral-900 text-right">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}