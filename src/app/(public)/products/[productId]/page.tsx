import ProductPage from "@/src/features/product/ProductPage";
import { Metadata } from "next";

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
 
      <ProductPage productId={productId} />
    </div>
  );
}  