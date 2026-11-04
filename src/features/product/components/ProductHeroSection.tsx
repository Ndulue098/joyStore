// src/app/products/[productId]/components/ProductHeroSection.tsx
"use client";
import { useState } from "react";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import { ProductsType } from "@/src/types/types";

export default function ProductHeroSection({ product }: { product: ProductsType }) {
  const [activeImage, setActiveImage] = useState<string | null | undefined>(product.imageUrl);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start border-b border-neutral-200 pb-12">
      <ProductImage image={activeImage} name={product.name} />
      <ProductDetails product={product} onImageChange={setActiveImage} />
    </div>
  );
}