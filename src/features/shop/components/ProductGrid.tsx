import { SlidersHorizontal } from "lucide-react";
// import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import EmptyState from "./EmptyState";
import { getProducts } from "../data/getProducts";
import { ProductCard } from "@/src/components/layout/ProductCard";
// import { getProducts } from "@/lib/actions/getProducts";

interface ProductGridProps {
  searchParams: { [key: string]: string | string[] | undefined }; 
}

export default async function ProductGrid({ searchParams }: ProductGridProps) {
  // 1. Resolve searchParams to read current page
  const resolvedParams = await searchParams || {};
  const page = Number(resolvedParams.page) || 1;
  const limit = 9;

  // 2. Pass current page into options & extract totalCount
  const { products, totalCount } = await getProducts(Promise.resolve(searchParams), {
    page,
    limit,
  });

  // 3. Compute total pages dynamically
  const totalPages = Math.ceil(totalCount / limit);

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
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}