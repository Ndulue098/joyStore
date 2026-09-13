import ProductPage from "@/src/features/product/ProductPage";

interface pageProps {
  params:Promise<{ productId: string }>;
}

export default async function page({params}: pageProps) {
  const {productId}=await params 

 
 
  return (
    <div className="max-w-6xl mx-auto w-full mt-12">

      <ProductPage productId={productId} />
    </div>
  );
}  