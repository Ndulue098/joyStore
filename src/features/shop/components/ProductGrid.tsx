import { SlidersHorizontal } from "lucide-react";
import Pagination from "./Pagination";
import EmptyState from "./EmptyState";
import { getProducts } from "../data/getProducts";
import { ProductCard } from "@/src/components/layout/ProductCard";
import { ProductsType } from "@/src/types/types";

interface ProductGridProps {
  searchParams: { [key: string]: string | string[] | undefined }; 
}


export default async function ProductGrid({ searchParams }: ProductGridProps) {
  const resolvedParams = await searchParams || {};
  const page = Number(resolvedParams.page) || 1;
  const limit = 9;

  const { products, totalCount } = await getProducts(Promise.resolve(searchParams), {
    page,
    limit,
  });

  const totalPages = Math.ceil(totalCount / limit);

  if (products.length === 0) {
    return (
      <EmptyState
        icon={<SlidersHorizontal className="h-8 w-8 text-neutral-400" />}
        title="No products match your criteria"
        description="We couldn't find any electrical supplies matching your filters or search query."
      />
    );
  }

  // Flatten products: if a product has NO variant fields, expand its variants into individual cards
  const expandedItems: { product: any; forcedVariantIndex?: number }[] = [];

  products.forEach((product:ProductsType) => {
    const hasVariantFields = product.product_variant_fields && product.product_variant_fields.length > 0;
    const variants = product.product_variants || [];

    if (!hasVariantFields && variants.length > 0) {
      // Render each variant as its own standalone card entry
      variants.forEach((_, vIndex) => {
        expandedItems.push({ product, forcedVariantIndex: vIndex });
      });
    } else {
      // Render normally as a single card with dynamic attribute switcher
      expandedItems.push({ product });
    }
  });

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {expandedItems.map((item, idx) => (
          <ProductCard 
            key={`${item.product.id}-${item.forcedVariantIndex ?? 'group'}-${idx}`} 
            product={item.product} 
            forcedVariantIndex={item.forcedVariantIndex} 
          />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}