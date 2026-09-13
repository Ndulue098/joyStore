import ShopPage from "@/src/features/shop/ShopPage";

interface pageProps {
  
}

export default function page({}: pageProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <ShopPage/>
    </div>
  );
}