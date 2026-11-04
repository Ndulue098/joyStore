// src/app/products/[productId]/page.tsx
import { getProductById } from "./data/getProductById";
import RelatedProduct from "./components/RelatedProduct";
import ProductHeroSection from "./components/ProductHeroSection";
import CustomBreadcrumbs from "../Components/CustomBreadcrumbs";

interface ProductPageProps {
  productId: string;
}

export default async function ProductPage({productId}: ProductPageProps) {
   const product = await getProductById(productId);

  if (!product) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-neutral-500 font-semibold">
        No Product Found
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 ">
      <CustomBreadcrumbs
        items={[
          { label: "Shop", href: "/shop" },
          { label: product.name }
        ]}
      />

      <ProductHeroSection product={product} />

      <RelatedProduct category_id={product.category_id} productId={Number(productId)} />
    </div>
  );
}