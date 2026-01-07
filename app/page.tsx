import Topbar from "@/components/layout/topbar";
import Navbar from "@/components/layout/navbar";
import CategoriesSection from "@/components/modules/home/categories";
import HeroSection from "@/components/modules/home/carousel";
import Banner from "@/components/modules/home/banner";
import Footer from "@/components/layout/footer";
import Products from "@/components/modules/home/products";
import ProductsRow from "@/components/modules/home/newArrivals";
import ShopServices from "@/components/modules/home/services";
import Testimonials from "@/components/layout/testimonial";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <Products />
      <Banner />
      <ShopServices />
      <Testimonials />
      <ProductsRow />
      <Footer />
    </div>
  );
}
