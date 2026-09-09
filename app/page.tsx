import CategoryCarousel from "./components/CategoryCarousel";
import FeaturedProduct from "./components/FeaturedProduct";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import NavBar from "./components/NavBar";
import ProductSection from "./components/ProductSection";
import PromoBanner from "./components/PromoBanner";
import ShopwithUs from "./components/ShopwithUs";
import TrackOrder from "./components/TrackOrder";

interface pageProps {
  
}

export default function Home({}: pageProps) {
  return (
    <div>
      <NavBar/>
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