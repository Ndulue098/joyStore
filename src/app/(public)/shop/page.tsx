import ShopPage from "@/src/features/shop/ShopPage";
import { RotateCcw } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop for products",
};

interface PageProps { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="max-w-7xl mx-auto">
      

      <ShopPage searchParams={resolvedSearchParams} />
    </div>
  );
}