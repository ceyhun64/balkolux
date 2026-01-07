"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// ⚡ Critical Components - Normal Import (Above the fold)
import Navbar from "@/components/layout/navbar";
import HeroSection from "@/components/modules/home/carousel";

// ⚡ Non-Critical Components - Dynamic Import (Below the fold)
const CategoriesSection = dynamic(
  () => import("@/components/modules/home/categories"),
  {
    loading: () => (
      <div className="bg-background py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 animate-pulse">
          <div className="h-32 bg-gray-200 rounded mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
            <div className="aspect-[8/5] bg-gray-200 rounded" />
            <div className="aspect-[8/5] bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    ),
    ssr: true, // SEO için SSR aktif
  }
);

const Products = dynamic(
  () => import("@/components/modules/home/products"),
  {
    loading: () => (
      <div className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 animate-pulse">
          <div className="h-20 bg-gray-200 rounded mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    ),
    ssr: true,
  }
);

const Banner = dynamic(() => import("@/components/modules/home/banner"), {
  loading: () => <div className="h-64 bg-gray-100" />,
  ssr: false, // Banner için SSR gerekli değil
});

const ShopServices = dynamic(
  () => import("@/components/modules/home/services"),
  {
    loading: () => <div className="h-96 bg-white" />,
    ssr: false,
  }
);

const Testimonials = dynamic(
  () => import("@/components/layout/testimonial"),
  {
    loading: () => <div className="h-96 bg-gray-50" />,
    ssr: false,
  }
);

const ProductsRow = dynamic(
  () => import("@/components/modules/home/newArrivals"),
  {
    loading: () => <div className="h-96 bg-white" />,
    ssr: false,
  }
);

const Footer = dynamic(() => import("@/components/layout/footer"), {
  loading: () => <div className="h-64 bg-neutral-900" />,
  ssr: true, // Footer SEO için önemli
});

export default function Home() {
  return (
    <div>
      {/* ⚡ Critical: Above the Fold - Hemen yükle */}
      <Navbar />
      <HeroSection />

      {/* ⚡ Progressive Loading: Below the Fold - Lazy yükle */}
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900" />
          </div>
        }
      >
        <CategoriesSection />
        <Products />
        <Banner />
        <ShopServices />
        <Testimonials />
        <ProductsRow />
        <Footer />
      </Suspense>
    </div>
  );
}