"use client"
import { Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import Link from "next/link";
import {productsData} from '../data/productsData';
import { ProductCard } from './ProductCard';

interface FeaturedProductProps {
  
}

export default function FeaturedProduct({}: FeaturedProductProps) {
//   const { featuredProducts, products } = useProducts();

  // If there are fewer than 8 featured products, pad with other products
  const displayProducts =productsData.filter((p) => !p.featured).slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14" aria-labelledby="featured-products-heading">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-600 mb-1.5">
            <TrendingUp className="h-4 w-4 text-amber-500" />
            <span>Our Collection</span>
          </div>
          <h2 id="featured-products-heading" className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            Popular Products
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-xl">
            Quality electrical products customers are choosing right now for construction, renovation, and home upgrades.
          </p>
        </div>
        
        <Link
          href="/shop"
          className="text-xs font-bold text-neutral-900 hover:text-amber-600 flex items-center gap-1.5 transition-colors group"
        >
          <span>View All Products</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* 4-column Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}