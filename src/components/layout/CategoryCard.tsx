import { CategoryType } from "@/src/types/types";
import { ArrowRight, Layers, Package } from "lucide-react";
import Link from "next/link";

interface CategoryCardProps {
  subcat:CategoryType
}

export default async function CategoryCard({subcat}: CategoryCardProps) {
  
   const validSubcategories =
    subcat?.subcategories?.filter( 
      (sub) => sub.products && sub.products.length > 0
    ) || [];

  
  return (
    <>
      {validSubcategories.map((obj)=>{
        const productLength=obj.products.length

        return <div key={obj.id} className="w-[280px] sm:w-[320px] shrink-0 snap-start">
          <Link
            href={`/shop?category=${obj.slug}`}
            className="group flex flex-col h-full bg-white rounded-2xl border border-neutral-200/80 hover:border-amber-400/80 overflow-hidden shadow-xs hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-300"
          >
            {/* Visual Image Header */}
            <div className="relative aspect-12/10 w-full overflow-hidden bg-neutral-100">
              {obj.imageUrl ? (
                <img
                  src={obj.imageUrl}
                  alt={obj.name}
                  className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />
              ) : (
                /* Fallback Container when imageUrl is null */
                <div className="h-full w-full bg-gradient-to-br from-neutral-100 via-neutral-200/60 to-amber-500/10 flex flex-col items-center justify-center p-6 text-neutral-400 group-hover:text-amber-600 transition-colors">
                  <Layers className="w-10 h-10 stroke-[1.5] mb-1" />
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400">
                    Category Image
                  </span>
                </div>
              )}

              {/* Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />

              {/* Top Badge: Product Count */}
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900/70 backdrop-blur-md border border-white/10 text-[11px] font-medium text-white shadow-xs">
                  <Package className="w-3.5 h-3.5 text-amber-400" />
                  <span>{productLength} {productLength === 1 ? "Item" : "Items"}</span>
                </span>
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-3.5 left-4 right-4">
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors drop-shadow-xs">
                  {obj.name}
                </h3>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed font-normal">
                {obj.description || "Explore top products in this category."}
              </p>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-neutral-900 group-hover:text-amber-600 transition-colors">
                <span>Explore Category</span>
                <div className="h-8 w-8 rounded-full bg-neutral-100 group-hover:bg-amber-500 group-hover:text-neutral-950 flex items-center justify-center transition-all duration-200">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          </Link>
    </div>}

    )}
    </>
  );
}

