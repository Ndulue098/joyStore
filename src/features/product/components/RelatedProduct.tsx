import { ProductCard } from "@/src/components/layout/ProductCard";
import { getRelatedProducts } from "../data/getRelatedProduct";

interface RelatedProductProps {
    category_id: number;
     productId: number; 
}

export default async function RelatedProduct({category_id,productId}: RelatedProductProps) {
   const products= await getRelatedProducts(category_id,productId)
   if(!products || !products.length)return null


   console.log("related Product ",products);
   
  return (
    <div className="my-16">
        <h3 className="text-2xl font-semibold mb-12">Related Electrical Supplies</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
    </div>
  ); 
}

// {...product,id:Number(product.id)}