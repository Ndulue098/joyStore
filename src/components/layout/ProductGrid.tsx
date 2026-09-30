import { getProducts } from "@/src/features/shop/data/getProducts";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  resolvedSearchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductGrid({ resolvedSearchParams }: ProductGridProps) {
  const options = { limit: 8 };
  const { products } = await getProducts(resolvedSearchParams, options);

  if (!products || products.length === 0) {
    return (
      <div className="col-span-full py-12 text-center bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
        <p className="text-sm font-semibold text-neutral-600">No products found in this category.</p>
        <p className="text-xs text-neutral-400 mt-1">Try selecting another filter or viewing all products.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}