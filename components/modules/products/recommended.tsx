"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import ProductCard from "../products/productCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProductData {
  id: number;
  title: string;
  mainImage: string;
  price: number;
  category: string;
}

// --- Minimalist İskelet ---
const CarouselSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="space-y-4">
        <Skeleton className="aspect-[4/5] w-full bg-stone-50 rounded-none" />
        <Skeleton className="h-3 w-1/3 bg-stone-50" />
        <Skeleton className="h-4 w-2/3 bg-stone-100" />
      </div>
    ))}
  </div>
);

export default function YeniUrunlerCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.products) setProducts(data.products);
      } catch (error) {
        console.error("Hata:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-24">
        <Skeleton className="h-10 w-64 mb-12 ml-4" />
        <CarouselSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-background py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        {/* Header - Asimetrik ve Modern */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 px-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1px] bg-stone-900" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400">
                Yeni Sezon
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif italic text-stone-900 leading-tight">
              Önerilen <br /> Ürünler
            </h2>
          </div>

          {/* Minimal Navigasyon Kontrolleri */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => api?.scrollPrev()}
              className="p-2 text-stone-300 hover:text-stone-900 transition-colors"
            >
              <ArrowLeft strokeWidth={1.2} size={28} />
            </button>
            <div className="h-12 w-[1px] bg-stone-100 hidden md:block" />
            <button
              onClick={() => api?.scrollNext()}
              className="p-2 text-stone-300 hover:text-stone-900 transition-colors"
            >
              <ArrowRight strokeWidth={1.2} size={28} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel
            opts={{ align: "start", loop: true }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-4 sm:-ml-6">
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-4 sm:pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="pb-8">
                    <ProductCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Özel Tasarım Progress Bar */}
          <div className="mt-12 flex items-center justify-start px-4 gap-4">
            <span className="text-[10px] font-mono text-stone-400">
              0{current + 1}
            </span>
            <div className="relative h-[2px] w-32 bg-stone-100 overflow-hidden">
              <motion.div
                initial={false}
                animate={{ x: `${(current / (products.length - 1)) * 100}%` }}
                className="absolute inset-0 w-full h-full bg-stone-900 origin-left"
                style={{ scaleX: 1 / (products.length / 4) }}
              />
            </div>
            <span className="text-[10px] font-mono text-stone-400">
              0{products.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
