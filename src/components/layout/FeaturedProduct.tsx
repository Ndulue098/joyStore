import { ArrowRight, TrendingUp } from 'lucide-react';
import Link from "next/link";
import { ProductCard } from './ProductCard';
import { getProducts } from '@/src/features/shop/data/getProducts';
import { ProductsType } from '@/src/types/types';

export default async function FeaturedProduct({}) {
  const options={limit:8}
  const data= await getProducts(undefined,options)
  const {products =[]}=data ?? {}

  // const products = (data?.products ?? []) as ProductsType[]

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14"
      aria-labelledby="featured-products-heading"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          {/* Eyebrow */}
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-500 mb-1.5">
            <TrendingUp className="h-4 w-4 text-amber-500 shrink-0" />
            <span>Our Collection</span>
          </div>

          {/* Heading */}
          <h2
            id="featured-products-heading"
            className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight"
          >
            Popular Products
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-xl font-medium leading-relaxed">
            Quality electrical products customers are choosing right now for construction, renovation, and home upgrades.
          </p>
        </div>

        {/* View All Link */}
        <Link
          href="/shop"
          className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1.5 transition-colors group self-start sm:self-end"
        >
          <span>View All Products</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Grid Layout */}
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-4 md:px-0 ">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Fallback Empty State */
        <div className="text-center py-12 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No popular products available right now. Check back soon!
          </p>
        </div>
      )}
    </section>
  );
}