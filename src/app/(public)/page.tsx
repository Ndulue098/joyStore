
import CategoryCarousel from "@/src/components/layout/CategoryCarousel";
import FeaturedProduct from "@/src/components/layout/FeaturedProduct";
import Footer from "@/src/components/layout/Footer";
import Hero from "@/src/components/layout/Hero";
import { HowItWorks } from "@/src/components/layout/HowItWorks";
import ProductSection from "@/src/components/layout/ProductSection";
import PromoBanner from "@/src/components/layout/PromoBanner";
import ShopwithUs from "@/src/components/layout/ShopwithUs";
import TrackOrder from "@/src/components/layout/TrackOrder";

interface pageProps {
  
}

export default function Home({}: pageProps) {
  return (
    <div>
      <Hero/>
      <CategoryCarousel/>
      <FeaturedProduct/>
      <PromoBanner/> 
      <ShopwithUs/>
      <HowItWorks/>
      <ProductSection/>
      <TrackOrder/>
      <Footer/> 
    </div>
  );
}