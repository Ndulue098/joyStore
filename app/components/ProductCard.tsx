import React, { useState } from 'react';
import { Product } from '../types/types';
// import {productsData} from '../data/productsData';

// import { StockBadge } from '../../../components/ui/Badge';
import { Plus, Check, Eye, ArrowRight, Zap } from 'lucide-react';
import { StockBadge } from '../ui/StockBadge';

export interface ProductCardProps {
  key?: React.Key;
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
//   const [justAdded, setJustAdded] = useState(false);

  const primaryImage =
    product.images.find((img) => img.isPrimary) || product.images[0];
//   const inCart = isInCart(product.id);
//   const currentQuantity = getItemQuantity(product.id);

//   const handleQuickAdd = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     addToCart(product, 1);
//     setJustAdded(true);
//     setTimeout(() => setJustAdded(false), 1800);
//   };

//   const handleCardClick = () => {
//     router.push(`/products/${product.slug}`);
//   };

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden border border-neutral-200 bg-white transition-all duration-200 hover:border-neutral-300 cursor-pointer ${className}`}
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-4/3 sm:aspect-12/10 w-full overflow-hidden bg-neutral-100">
        <img
          src={primaryImage?.url}
          alt={primaryImage?.alt || product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />

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
          <StockBadge status={product.stockStatus} quantity={product.stockQuantity} />
        </div>

        {/* Quick hover overlay with "View Details" hint */}
        <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/90 text-neutral-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
            <Eye className="h-3.5 w-3.5 text-neutral-600" />
            View Specs
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
            <span className="font-semibold text-amber-700 tracking-wide uppercase text-[11px]">
              {product.brand}
            </span>
            <span className="text-[11px] text-neutral-400 truncate max-w-[120px]">
              {product.categoryName}
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
              $400
            </span>
          </div>

          {/* <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to order`}
            disabled={product.stockStatus === 'out_of_stock'}
            className={`inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
              product.stockStatus === 'out_of_stock'
                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                : justAdded
                ? 'bg-emerald-600 text-white shadow-2xs'
                : inCart
                ? 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-2xs'
                : 'bg-amber-500 text-neutral-950 hover:bg-amber-400 shadow-2xs active:scale-95'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Added</span>
              </>
            ) : inCart ? (
              <>
                <Plus className="h-3.5 w-3.5" />
                <span>Add ({currentQuantity})</span>
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" />
                <span>Add to Order</span>
              </>
            )}
          </button> */}
        </div>
      </div>
    </div>
  );
}
