import { StockBadge } from "@/src/ui/StockBadge";
import { Minus, Plus, ShoppingCart, ImageOff } from "lucide-react";
import { getProductById } from "./data/getProductById";
import RelatedProduct from "./components/RelatedProduct";
import ProductImage from "./components/ProductImage";
import ProductDetails from "./components/ProductDetails";
import { Suspense } from "react";
import ProductSkeleton from "./components/ProductSkeleton";
import CustomBreadcrumbs from "../Components/CustomBreadcrumbs";

interface ProductPageProps {
  productId: string;
}

export default async function ProductPage({ productId }: ProductPageProps) {
  const product = await getProductById(productId);

  console.log("productttt=== ", product);
  

  if (!product) {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-neutral-500 font-semibold">
        No Product Found
      </div>
    );
  }

  const {
    id,
    slug,
    category_id,
    short_description,
    category,
    name,
    sku,
    brand,
    description,
    price,
    stock_quantity,
    stock_status,
    unit,
    specifications,
    imageUrl:image, // Assuming image URL is provided in the product object
  } = product || {};

  const specArray = specifications ? Object.entries(specifications) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      <CustomBreadcrumbs
        items={[
          { label: "Shop", href: "/shop" },
          { label: product.category?.name, href: `/shop/shop?search=${product.name}` },
          { label: product.name }
        ]}
      />
      {/* Top Product Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start border-b border-neutral-200 pb-12">
          <ProductImage image={image} name={name}/>
          {/* Right Column: Details & Order Actions (7 cols) */}
          <ProductDetails image={image} id={id} slug={slug} category_id={category_id} short_description={short_description} category={category} brand={brand} sku={sku} name={name} description={description} unit={unit} specArray={specArray} price={price}/>
      </div>

      {/* Bottom Related Products Component */}
      <RelatedProduct category_id={category_id} productId={productId} />
    </div>
  );
}

