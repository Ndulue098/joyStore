import { SlidersHorizontal } from "lucide-react";
import EmptyState from "./EmptyState";

import { getProducts } from "../data/getProducts";
import { ProductCard } from "@/src/components/layout/ProductCard";

interface ProductGridProps {
 searchParams:Promise<{[key:string]:string | string [] | undefined}> 
}

export default async function ProductGrid({searchParams}: ProductGridProps) {
  // const {category}=searchParams || {}
  const {products}=await getProducts(searchParams)

  
  console.log("products", products);


if (products.length === 0) {
    return (
      <EmptyState
        icon={<SlidersHorizontal className="h-8 w-8 text-neutral-400" />}
        title="No products match your criteria"
        description="We couldn't find any electrical supplies matching your filters or search query. Try clearing some filters or searching for another item."
      />
    );
  }
 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {products.map((product) => ( 
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}