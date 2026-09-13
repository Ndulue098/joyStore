
import CategoryCarousel from "../components/layout/CategoryCarousel";
import FeaturedProduct from "../components/layout/FeaturedProduct";
import Footer from "../components/layout/Footer";
import Hero from "../components/layout/Hero";
import { HowItWorks } from "../components/layout/HowItWorks";
import ProductSection from "../components/layout/ProductSection";
import PromoBanner from "../components/layout/PromoBanner";
import ShopwithUs from "../components/layout/ShopwithUs";
import TrackOrder from "../components/layout/TrackOrder";

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