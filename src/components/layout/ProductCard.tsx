"use client"
import React, { useState } from 'react';

import { Plus, Check, Eye, ArrowRight, Zap, PlusCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/src/types/types';
import { StockBadge } from '@/src/ui/StockBadge';
import { useCartContext } from '@/src/features/context/CartContext';
export interface ProductCardProps {
  key?: React.Key;
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const [active,setActive]=useState<boolean>(false)
  const {handleAddToCart}=useCartContext()

  function handleClick(){
    console.log("clicked");
    
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
    }
 
    handleAddToCart(productData,1)
    setActive(true)

    setTimeout(() => {
      setActive(false)
    }, 2000);
  }

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden border border-neutral-200 bg-white transition-all duration-200 hover:border-neutral-300 cursor-pointer ${className}`}
    >
      {/* Image Container with Badges */}
      <Link href={`/products/${product.id}`}  className="relative aspect-4/3 sm:aspect-12/10 w-full overflow-hidden bg-neutral-100">
        {/* <img
          src={primaryImage?.url}
          alt={primaryImage?.alt || product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        /> */}

        {/* Featured Tag */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.featured && (
            <span className="inline-flex items-center gap-1 rounded-md bg-neutral-900/90 text-white px-2 py-0.5 text-[11px] font-semibold backdrop-blur-xs shadow-xs">
              <Zap className="h-3 w-3 fill-amber-400 text-amber-400" />
              Featured
            </span>
          )}
        </div>

        {/* Stock Badge */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <StockBadge status={product.stock_status} quantity={product.stock_quantity} />
        </div>

        {/* Quick hover overlay with "View Details" hint */}
        <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/90 text-neutral-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
            <Eye className="h-3.5 w-3.5 text-neutral-600" />
            View Specs
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
            <span className="font-semibold text-amber-700 tracking-wide uppercase text-[11px]">
              {product.brand}
            </span>
            <span className="text-[11px] text-neutral-400 truncate max-w-[120px]">
              {product.category?.name}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-neutral-900 line-clamp-2 leading-snug ">
            {product.name}
          </h3>
        </div>

        {/* Pricing & Add to Order */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-neutral-400 block -mb-0.5">Listed Price</span>
            <span className="text-base sm:text-lg font-bold text-neutral-900">
              ${product.price}
            </span>
          </div>


          {/* BUTTON */}
          <button onClick={()=>handleClick()} className=' cursor-pointer p-2.5 py-1 rounded-xs bg-amber-500/80 border border-neutral-700 flex items-center justify-center gap-2'>
            {active?<CheckCircle2 className='h-4 w-4'/>:<PlusCircle className='h-4 w-4'/>}
            <span className='font-semibold text-base '>Add to cart</span>
          </button>

        </div>
      </div>
    </div>
  );
}
