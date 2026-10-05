import { Suspense } from "react";
import ProductFilter from "./components/ProductFilter";
import ProductGrid from "./components/ProductGrid";
import SearchFilter from "./components/SearchFilter";
import ShopHero from "./components/ShopHero";
import { ShopSkeleton } from "./components/ShopSkeleton";
import { RotateCcw } from "lucide-react";
import Link from "next/link";
import CustomBreadcrumbs from "../Components/CustomBreadcrumbs";
import ShopLayout from "./components/ShopLayout";
interface ShopPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined; }>;
}

export default function ShopPage({ searchParams }: ShopPageProps) {
  // const useSearch=useSearchParams()
  // const resolvedSearchParams = await searchParams;
  // const suspenseKey = JSON.stringify(resolvedSearchParams);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 min-h-screen">
      {/* Navigation Breadcrumbs */}
      <CustomBreadcrumbs items={[{ label: "Shop", href: "/shop" }]} />

      {/* Hero Header */}
      <div className="mt-4">
        <ShopHero />
      </div>

      {/* Search Bar & Mobile Filter Trigger Bar */}
      <div className="mt-6">
        <SearchFilter />
      </div>

      {/* Main Grid Content Area */}
      {/* <Suspense fallback={<ShopSkeleton />} key={suspenseKey}> */}
        <ShopLayout searchParams={searchParams} />
        
      {/* </Suspense> */}
    </div>
  );
}