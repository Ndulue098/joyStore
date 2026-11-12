"use client"
import React, { useState } from 'react';
import { Eye, Zap, PlusCircle, CheckCircle2, ImageOff, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useCartContext } from '@/src/features/context/CartContext';
import { ProductsType } from '@/src/types/types';

export interface ProductCardProps {
  product: ProductsType;
  forcedVariantIndex?: number;
}

function parseProductColors(colorsInput: any): string[] {
  if (!colorsInput) return [];
  if (Array.isArray(colorsInput)) return colorsInput.map(String);
  if (typeof colorsInput === 'string') {
    try {
      const parsed = JSON.parse(colorsInput);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch {
      return colorsInput.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
}

export function ProductCard({ product, forcedVariantIndex }: ProductCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { handleAddToCart } = useCartContext();
  const variants = product.product_variants || [];
  const hasVariantFields = product.product_variant_fields && product.product_variant_fields.length > 0;

  // State defaults to forced index if provided (standalone variant mode), otherwise 0
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(
    forcedVariantIndex !== undefined ? forcedVariantIndex : 0
  );
  const [active, setActive] = useState<boolean>(false);

  const currentVariant = variants[selectedVariantIndex] || variants[0];

  const displayImage = currentVariant?.image_url || product.imageUrl;
  const displayPrice = currentVariant ? currentVariant.price : product.price;

  // Extract unique attribute keys safely only if variant fields exist
  const attributeKeys = hasVariantFields ? Array.from(
    new Set(
      variants.flatMap((v) => (v.attributes ? Object.keys(v.attributes) : []))
    )
  ) : [];

  const productColors = parseProductColors(product.colors);

  function handleAttributeClick(key: string, value: any) {
    const matchingIndex = variants.findIndex((v) => {
      const attrVal = v.attributes ? v.attributes[key] : null;
      return attrVal === value;
    }); 

    if (matchingIndex !== -1) {
      setSelectedVariantIndex(matchingIndex); 
    }
  }

  function handleNextImage(e: React.MouseEvent) {
    e.preventDefault();
    if (variants.length > 1 && !forcedVariantIndex) {
      setSelectedVariantIndex((prev) => (prev + 1) % variants.length);
    }
  }

  function handlePrevImage(e: React.MouseEvent) {
    e.preventDefault();
    if (variants.length > 1 && !forcedVariantIndex) {
      setSelectedVariantIndex((prev) => (prev - 1 + variants.length) % variants.length);
    }
  }

  function handleClick() {
    const variantDisplayName = currentVariant?.name || currentVariant?.sku || '';
    const fullProductName = `${product.name}${variantDisplayName ? ` - ${variantDisplayName}` : ''}`;

    const productData = {
      id: product.id,
      variantId: currentVariant?.id,
      category_id: product.category_id,
      name: fullProductName,
      slug: product.slug,
      sku: currentVariant?.sku || product.sku,
      brand: product.brand,
      description: product.description,
      short_description: product.short_description,
      price: displayPrice,
      category: product?.category?.name,
      total: displayPrice,
      imageUrl: displayImage,
      attributes: currentVariant?.attributes || {},
      class_name: product.class_name || '',
    };
 
    handleAddToCart(productData, 1);
    setActive(true);

    setTimeout(() => {
      setActive(false);
    }, 2000);
  }

  return (
    <div className="group relative z-0 flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-xs transition-all duration-200 hover:border-neutral-300 hover:shadow-md">
      
      {/* Image Container */}
      <div className="relative aspect-4/3 sm:aspect-12/10 w-full overflow-hidden bg-neutral-100/80 flex items-center justify-center">
        
        {variants.length > 1 && !forcedVariantIndex && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-neutral-800 p-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              aria-label="Previous variant image"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-neutral-800 p-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              aria-label="Next variant image"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </>
        )}

        <Link
          href={`/products/${product.id}`}
          className="relative h-full w-full flex items-center justify-center bg-neutral-100"
        >
          {displayImage ? (
            <img
      src={displayImage}
      alt={product.name}
      loading="lazy"
      decoding="async"
      onLoad={() => setIsLoaded(true)}
      className={`h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105 ${
        isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
      }`}
    />
          ) : (
            <div className="flex flex-col items-center justify-center text-neutral-400 gap-1.5 p-4">
              <ImageOff className="h-8 w-8 stroke-[1.5] text-neutral-300" />
              <span className="text-[11px] font-medium text-neutral-400">No Image Available</span>
            </div>
          )}
        </Link>

        {/* Top Badges Layer */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-start justify-between z-10 pointer-events-none">
          <div>
            {product.featured && (
              <span className="inline-flex items-center gap-1 rounded-md bg-neutral-900/90 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs">
                <Zap className="h-3 w-3 fill-amber-400 text-amber-400" />
                Featured
              </span>
            )}
          </div>
          <div className="ml-auto">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              • In Stock
            </span>
          </div>
        </div>

        {/* Quick Hover Overlay */}
        <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-20">
          <span className="bg-white/95 text-neutral-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 translate-y-1 group-hover:translate-y-0 transition-transform">
            <Eye className="h-3.5 w-3.5 text-neutral-600" />
            View Specs
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
        <div className="space-y-2">
          
          {/* Brand:xxx & Category Header */}
          <div className="flex items-center justify-between text-xs gap-2">
            <span className="font-bold text-amber-700 tracking-wider uppercase text-[9px] truncate">
              brand:  
              <span className="text-neutral-500 text-[10px] ml-0.5">
                {product.brand || "Generic"}
              </span>
            </span>
            <span className="text-[11px] text-neutral-400 truncate max-w-[100px] sm:max-w-[120px]">
              {product.category?.name}
            </span> 
          </div>

          {/* Main Title */}
          <div className="flex items-start justify-between gap-2">
            <Link href={`/products/${product.id}`} className="block min-w-0 flex-1">
              <h3 className="text-xs sm:text-sm font-semibold text-neutral-900 line-clamp-1 leading-snug group-hover:text-amber-700 transition-colors">
                {currentVariant?.name || currentVariant?.sku || product.name}
              </h3>
              <p className="text-[11px] text-neutral-500 font-medium truncate mt-0.5">
                {product.name} {product.class_name ? `/ ${product.class_name}` : ''}
              </p> 
            </Link>
 
            {/* Colors Swatches Indicator */}
            {productColors.length > 0 && (
              <div className="flex flex-wrap items-center gap-1 pt-0.5 shrink-0">
                {productColors.map((colorName, idx) => (
                  <span
                    key={idx}
                    title={colorName}
                    style={{ backgroundColor: colorName.toLowerCase() }}
                    className="inline-flex rounded-full items-center w-3 h-3 border border-neutral-300 shadow-2xs"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Scrollable Attributes Carousel (Only renders if product has variant fields defined) */}
          {attributeKeys.length > 0 && (
            <div className="h-7 w-full overflow-hidden">
              <div 
                className="flex items-center gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap py-0.5"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {attributeKeys.map((key) => {
                  const uniqueValues = Array.from(
                    new Set(variants.map((v) => (v.attributes ? v.attributes[key] : null)))
                  ).filter(Boolean);

                  return uniqueValues.map((val) => {
                    const stringVal = String(val);
                    const isSelected = currentVariant?.attributes?.[key] === val;

                    return (
                      <button
                        key={`${key}-${stringVal}`}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAttributeClick(key, val);
                        }}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-all shrink-0 border cursor-pointer ${
                          isSelected
                            ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
                            : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-100'
                        }`}
                      >
                        <span className="text-neutral-400 capitalize mr-1">{key}:</span>
                        <span className="font-semibold">{stringVal}</span>
                      </button>
                    );
                  });
                })}
              </div>
            </div>
          )}
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
                {Number(displayPrice).toLocaleString()}
              </span>
            </div>
          </div>

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