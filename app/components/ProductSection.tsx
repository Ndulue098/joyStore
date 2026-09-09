"use client"
import { useState } from "react";
import {categoriesData} from "../data/categoriesData";
import {productsData} from "../data/productsData";
import { Layers, ArrowRight, Filter } from 'lucide-react';
import Link from "next/link";
import { ProductCard } from "./ProductCard";

interface ProductSectionProps {
  
}

export default function ProductSection({}: ProductSectionProps) {
    
    
//  const { products, categories } = useProducts();
  const [activeTab, setActiveTab] = useState<string>('all');

  // Filter products by selected quick tab or show diverse essentials
  const displayCategories = categoriesData.slice(1, 6); // Select a few top categories for tabs

  const filteredProducts =
    activeTab === 'all'
      ? productsData.slice(4, 12)
      : productsData.filter((p) => p.categoryId === activeTab).slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14" aria-labelledby="more-products-heading">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-600 mb-1.5">
            <Layers className="h-4 w-4 text-amber-500" />
            <span>Project Supplies</span>
          </div>
          <h2 id="more-products-heading" className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            More Electrical Essentials
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-xl">
            Cables, conduit boxes, circuit breakers, switches, and heavy-duty fittings for ongoing wiring and renovations.
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

      {/* Quick Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-md text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-neutral-950 text-white shadow-xs'
              : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
          }`}
        >
          All Essentials ({productsData.length})
        </button>

        {displayCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveTab(cat.id)}
            className={`px-4 py-2 rounded-md text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === cat.id
                ? 'bg-amber-500 text-neutral-950 shadow-xs'
                : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}