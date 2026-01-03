import Navbar from "@/components/layout/navbar";
import AllProducts from "@/components/modules/products/allProducts";
import Banner from "@/components/modules/home/banner";
import Testimonials from "@/components/layout/testimonial";
import Footer from "@/components/layout/footer";

export default function AllProductsPage() {
  return (
    <div>
      <Navbar />
      <AllProducts />
      <Banner />
      <Testimonials />
      <Footer />
    </div>
  );
}
