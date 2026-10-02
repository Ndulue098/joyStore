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
  resolvedSearchParams: { [key: string]: string | string[] | undefined; }
  
}

export default async function ProductSection({ resolvedSearchParams }: ProductSectionProps) {
  const catdata = await getCategoriesSubcategoriesAndProducts();

  // Extract valid subcategories
  const allSubcategories = catdata.flatMap(
    (cat) => cat?.subcategories?.filter((sub:Subcategories) => sub.products && sub.products.length > 0) || []
  );

  const searchParams = await resolvedSearchParams;
  const key = (typeof searchParams?.category === "string" ? searchParams.category : "all");

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14" aria-labelledby="more-products-heading">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
         
          <h2 id="more-products-heading" className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            More Electrical Essentials
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-xl">
            Cables, conduit boxes, circuit breakers, switches, and heavy-duty fittings for ongoing wiring and renovations.
          </p>
        </div>
        
        <Link
          href="/shop"
          className="text-xs font-bold text-neutral-900 hover:text-amber-600 flex items-center gap-1.5 transition-colors group self-start sm:self-auto"
        >
          <span>View All Products</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Quick Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
        <ProductBtn slug="all" name="All Essentials" />
        {allSubcategories.map((subCat) => (
          <ProductBtn key={subCat.id} slug={subCat.slug} name={subCat.name} />
        ))}
      </div>

      {/* Product Grid with Suspense Skeleton */}
      <Suspense key={key} fallback={<ProductSkeleton />}>
        <ProductGrid resolvedSearchParams={resolvedSearchParams} />
      </Suspense>
    </section>
  );
}