"use client"
import React, { useState } from 'react';

import {Eye, Zap, PlusCircle, CheckCircle2, ImageOff } from 'lucide-react';
import Link from 'next/link';
import { useCartContext } from '@/src/features/context/CartContext';
import { ProductsType } from '@/src/types/types';
export interface ProductCardProps {
  product: ProductsType;
}

export function ProductCard({ product }: ProductCardProps) {
  const [active,setActive]=useState<boolean>(false)
  const {handleAddToCart}=useCartContext()
  
  function handleClick(){
    
    const productData={
      id:product.id,
      category_id: product.category_id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      brand: product.brand,
      description: product.description,
      short_description: product.short_description,
      price: product.price,
      category:product?.category?.name, 
      total:product.price,
      imageUrl:product.imageUrl 
    }
 
    handleAddToCart(productData,1)
    setActive(true)

    setTimeout(() => {
      setActive(false)
    }, 2000);
  }

  return (
    <div className="group  relative z-0 flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-xs transition-all duration-200 hover:border-neutral-300 hover:shadow-md">
      {/* Image Container with Badges */}

      <Link
        href={`/products/${product.id}`}
        className="relative aspect-4/3 sm:aspect-12/10 w-full overflow-hidden bg-neutral-100/80 flex items-center justify-center group-hover:bg-neutral-100 transition-colors"
      >
        {product?.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-neutral-400 gap-1.5 select-none p-4">
            <ImageOff className="h-8 w-8 stroke-[1.5] text-neutral-300 group-hover:text-neutral-400 transition-colors" />
            <span className="text-[11px] font-medium text-neutral-400">
              No Image Available
            </span>
          </div>
        )}

        {/* Top Badges Layer */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-start justify-between z-10 pointer-events-none">
          {/* Featured Tag */}
          <div>
            {product.featured && (
              <span className="inline-flex items-center gap-1 rounded-md bg-neutral-900/90 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs">
                <Zap className="h-3 w-3 fill-amber-400 text-amber-400" />
                Featured
              </span>
            )}
          </div>

          {/* Stock Badge */}
          <div className="ml-auto">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              • In Stock
            </span>
          </div>
        </div>

        {/* Quick Hover Overlay */}
        <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-neutral-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 translate-y-1 group-hover:translate-y-0 transition-transform">
            <Eye className="h-3.5 w-3.5 text-neutral-600" />
            View Specs
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
        <div className="space-y-1.5">
          {/* Brand & Category Header */}
          <div className="flex items-center justify-between text-xs gap-2">
            <span className="font-bold text-amber-700 tracking-wider uppercase text-[10px] truncate">
              {product.brand || "Generic"}
            </span>
            <span className="text-[11px] text-neutral-400 truncate max-w-[100px] sm:max-w-[120px]">
              {product.category?.name}
            </span>
          </div>

          {/* Title */}
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="text-xs sm:text-sm font-semibold text-neutral-900 line-clamp-2 leading-snug group-hover:text-amber-700 transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Pricing & Cart Action Button */}
        <div className="relative z-10 pt-2.5 border-t border-neutral-100 flex items-center justify-between gap-2 mt-auto">
          <div className="min-w-0 flex-1">
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-neutral-400 block leading-tight">
              Listed Price
            </span>
            <div className="flex items-baseline gap-0.5 text-neutral-900 font-bold font-mono">
              <span className="text-xs sm:text-sm">₦</span>
              <span className="text-sm sm:text-base truncate">
                {Number(product.price).toLocaleString()}
              </span>
            </div>
          </div>

          {/* ADD TO CART / ADDED BUTTON */}
          <button
            type="button"
            onClick={handleClick}
            className={`cursor-pointer px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shrink-0 ${
              active
                ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
                : "bg-amber-500 text-neutral-950 hover:bg-amber-400 active:scale-95 shadow-xs"
            }`}
          >
            {active ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Add to cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
