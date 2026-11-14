
import CategoryCarousel from "@/src/components/layout/CategoryCarousel";
import FeaturedProduct from "@/src/components/layout/FeaturedProduct";
import Footer from "@/src/components/layout/Footer";
import Hero from "@/src/components/layout/Hero";
import { HowItWorks } from "@/src/components/layout/HowItWorks";
import ProductSection from "@/src/components/layout/ProductSection";
import PromoBanner from "@/src/components/layout/PromoBanner";
import ShopwithUs from "@/src/components/layout/ShopwithUs";
import TrackOrder from "@/src/components/layout/TrackOrder";
import QuickOrder from "@/src/components/QuickOrder";

interface pageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({searchParams}: pageProps) {
    const resolvedSearchParams = await searchParams;

  return (
    <div className="bg-gray-100">
      <Hero/>
      <CategoryCarousel/>
      <QuickOrder/>
      <FeaturedProduct/>
      <PromoBanner/> 
      <ShopwithUs/>
      <ProductSection resolvedSearchParams={resolvedSearchParams}/>
      <HowItWorks/>
      <TrackOrder/>
      <Footer/> 
    </div>
  );
}