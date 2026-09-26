import ProductSkeleton from "@/src/features/product/components/ProductSkeleton";
import ProductPage from "@/src/features/product/ProductPage";
import { Metadata } from "next";
import { Suspense } from "react";

interface PageProps {
  params:Promise<{ productId: string }>;
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { productId } = await params;

  return {
    title: `Product #${productId}`,
    description: `View details and tracking for order #${productId}`,
  };
}

export default async function page({params}: PageProps) {
  const {productId}=await params 
 
  return (
    <div className="max-w-6xl mx-auto w-full mt-12">
      <Suspense fallback={<ProductSkeleton/>}>
        <ProductPage productId={productId} />
      </Suspense>
    </div>
  );
}  