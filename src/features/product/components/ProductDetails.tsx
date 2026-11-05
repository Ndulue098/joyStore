"use client";

import { CheckCircle2, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCartContext } from "../../context/CartContext";
import { useState, useEffect } from "react";
import { ProductsType, CartItem } from "@/src/types/types";

interface ProductDetailsProps {
  product: ProductsType;
  onImageChange?: (newImage: string | null | undefined) => void;
} 

export default function ProductDetails({ product, onImageChange }: ProductDetailsProps) {
  const { cart, handleAddToCart, isInCart, removeItemFromCart, updateQuantity } = useCartContext();

  const variants = product.product_variants || [];
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);
  const [localQuantity, setLocalQuantity] = useState(1);

  const currentVariant = variants[selectedVariantIndex] || null;

  // Active item identifiers based on selected variant or base product fallback
  const activeId = currentVariant ? currentVariant.id : product.id;
  const activeSku = currentVariant?.sku || product.sku;
  const activePrice = currentVariant ? currentVariant.price : product.price;
  const activeImage = currentVariant?.image_url || product.imageUrl;

  // Sync image change to parent ProductPage hero image component
  useEffect(() => {
    if (onImageChange) {
      onImageChange(activeImage);
    }
  }, [activeImage, onImageChange]); 

  const inCart = isInCart(activeId);
  const cartItem = cart?.find((item) => item.id === activeId);
  const currentQuantity = inCart ? cartItem?.quantity || 1 : localQuantity;

  // Extract unique attribute keys (e.g., ['gang', 'type'])
  const attributeKeys = Array.from(
    new Set(
      variants.flatMap((v) => (v.attributes ? Object.keys(v.attributes) : []))
    )
  );
 
  function handleAttributeClick(key: string, value: any) {
    const matchingIndex = variants.findIndex((v) => {
      const attrVal = v.attributes ? v.attributes[key] : null;
      return attrVal === value;
    });

    if (matchingIndex !== -1) {
      setSelectedVariantIndex(matchingIndex);
    }
  }

  function handleAdd() {
    const productData: CartItem = {
      id: product.id,                 
      variantId: currentVariant?.id,   
      category_id: product.category_id,
      name: `${product.name} ${currentVariant?.sku ? `(${currentVariant.sku})` : ''}`,
      slug: product.slug,
      sku: activeSku,
      brand: product.brand,
      description: product.description,
      short_description: product.short_description,
      price: activePrice,
      category: product?.category?.name, 
      total: activePrice,
      quantity: localQuantity,
      imageUrl: activeImage,
      attributes: currentVariant?.attributes || {}, 
      class_name: product.class_name || '',
    };
    handleAddToCart(productData, localQuantity);
  }

  function handleQuantityChange(delta: number) {
    if (inCart) {
      updateQuantity(activeId, currentQuantity + delta);
    } else {
      setLocalQuantity((prev) => Math.max(1, prev + delta));
    }
  }

  // Specifications breakdown
  const baseSpecs = product.specifications ? Object.entries(product.specifications) : [];
  const variantSpecs = currentVariant?.specifications ? Object.entries(currentVariant.specifications) : [];

  return (
    <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
      {/* Header Metadata */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 font-semibold uppercase tracking-wider text-amber-800">
            {product.brand || "Generic"}
          </span>
          {activeSku && (
            <span className="text-neutral-400 font-mono text-[11px] tracking-tight">
              SKU: <strong className="text-neutral-600 font-semibold">{activeSku}</strong>
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            {product.name} <span className="text-[11px] text-neutral-500 font-medium tracking-wider">
              {product.class_name ? `/ ${product.class_name}` : ''}
            </span>
          </h1>

          {product.colors && product.colors.length > 0 && (
            <div className="flex flex-wrap items-center gap-1 pt-0.5">
                <span className="text-[10px] text-neutral-400 font-medium mr-0.5">Colors:</span>
                {product.colors.map((colorName, idx) => (
                  <span
                  key={idx}
                  style={{ backgroundColor: colorName.toLowerCase() }}
                  className="inline-flex rounded-full items-center w-4 h-4 text-[9px] font-medium bg-neutral-100 text-neutral-700 border border-neutral-200"
                  >
                    {/* {colorName} */}
                  </span>
                ))}
              </div>
            )}
        </div>
      </div>

      {/* Interactive Variant Attribute Selectors */}
      {attributeKeys.length > 0 && (
        <div className="space-y-3 pt-1">
          {attributeKeys.map((key) => {
            const uniqueValues = Array.from(
              new Set(variants.map((v) => (v.attributes ? v.attributes[key] : null)))
            );

            return (
              <div key={key} className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 capitalize">
                  {key}:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {uniqueValues.map((val) => {
                    const stringVal = val === null || val === undefined ? 'None' : String(val);
                    const isSelected = currentVariant?.attributes?.[key] === val;

                    return (
                      <button
                        key={`${key}-${stringVal}`} 
                        type="button"
                        onClick={() => handleAttributeClick(key, val)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                          isSelected
                            ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                            : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                        }`}
                      >
                        {stringVal}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Descriptions (Both General & Variant-Specific) */}
      <div className="space-y-4">
        {product.description && (
          <div className="space-y-1">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Overview Description
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>
        )}

        {currentVariant?.description && (
          <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-1">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
              Variant Note / Details
            </h3>
            <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed">
              {currentVariant.description}
            </p>
          </div>
        )}
      </div>

      {/* Pricing & Quantity Selector Card */}
      <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200/80 bg-neutral-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">
            Unit Price
          </span>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-900 tracking-tight">
              ₦{Number(activePrice).toLocaleString()}
            </p>
            {product.unit && (
              <span className="text-xs font-medium text-neutral-500">
                / {product.unit}
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
          className={`flex-1 py-3 px-6 active:scale-[0.99] transition-all rounded-xl font-semibold flex items-center justify-center gap-2.5 shadow-xs cursor-pointer ${
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

        {inCart && (
          <button
            type="button"
            onClick={() => removeItemFromCart(activeId)}
            className="py-3 px-5 active:scale-[0.99] transition-all rounded-xl font-semibold flex items-center justify-center gap-2 border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:border-rose-300 shadow-2xs cursor-pointer"
          >
            <Trash2 className="w-4 h-4 stroke-[2]" />
            <span>Remove Item</span>
          </button>
        )}
      </div>

      {/* Specifications (General + Variant Specific Tables) */}
      {(baseSpecs.length > 0 || variantSpecs.length > 0) && (
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 pb-2 border-b border-neutral-200">
            Specifications
          </h3>

          {baseSpecs.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wide">General Specs</span>
              <div className="rounded-xl border border-neutral-200/80 overflow-hidden text-xs divide-y divide-neutral-200/60">
                {baseSpecs.map(([key, value], i) => (
                  <div key={i} className={`flex justify-between items-center px-4 py-2.5 ${i % 2 === 0 ? "bg-neutral-50/65" : "bg-white"}`}>
                    <span className="font-medium text-neutral-500 capitalize">{key}</span>
                    <span className="font-semibold text-neutral-900 text-right">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {variantSpecs.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wide">Variant Specs</span>
              <div className="rounded-xl border border-amber-200/80 overflow-hidden text-xs divide-y divide-amber-100">
                {variantSpecs.map(([key, value], i) => (
                  <div key={i} className={`flex justify-between items-center px-4 py-2.5 ${i % 2 === 0 ? "bg-amber-50/40" : "bg-white"}`}>
                    <span className="font-medium text-neutral-600 capitalize">{key}</span>
                    <span className="font-semibold text-neutral-900 text-right">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}