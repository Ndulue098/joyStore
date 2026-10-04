import { Suspense } from "react";
import { Layers, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getCategoriesSubcategoriesAndProducts } from "@/src/features/admin/categories/data/getComponent";
import ProductBtn from "./ProductBtn";
import { ProductSkeleton } from "./ProductSkeleton";
import ProductGrid from "./ProductGrid";
import { Subcategories } from "@/src/types/types";

interface ProductSectionProps {
  // resolvedSearchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  resolvedSearchParams: { [key: string]: string | string[] | undefined };
  
}

export default async function ProductSection({ resolvedSearchParams }: ProductSectionProps) {
  const catdata = await getCategoriesSubcategoriesAndProducts();

  // Extract valid subcategories
  const allSubcategories = catdata.flatMap(
    (cat) => cat?.subcategories?.filter((sub: Subcategories) => sub.products && sub.products.length > 0) || []
  );

  // Directly access properties since resolvedSearchParams is already an object
  const key = typeof resolvedSearchParams?.category === "string" ? resolvedSearchParams.category : "all";

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
      aria-labelledby="more-products-heading"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h2
            id="more-products-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight"
          >
            More Electrical Essentials
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 max-w-xl font-medium leading-relaxed">
            Cables, conduit boxes, circuit breakers, switches, and heavy-duty fittings for ongoing wiring and renovations.
          </p>
        </div>

        {/* View All Link */}
        <Link
          href="/shop"
          className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1.5 transition-colors group self-start sm:self-auto shrink-0"
        >
          <span>View All Products</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Quick Filter Tabs (Scrollable Bar) */}
      <div className="relative mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]">
          <ProductBtn slug="all" name="All Essentials" />
          {allSubcategories.map((subCat) => (
            <ProductBtn key={subCat.id} slug={subCat.slug} name={subCat.name} />
          ))}
        </div>
      </div>

      {/* Product Grid with Suspense Skeleton */}
      <div className="relative z-10">
        <Suspense key={key} fallback={<ProductSkeleton />}>
          <ProductGrid resolvedSearchParams={resolvedSearchParams} />
        </Suspense>
      </div>
    </section>
  );
}