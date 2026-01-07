"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductCard from "../products/productCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";

interface ProductData {
  id: number;
  title: string;
  mainImage: string;
  price: number;
  category: string;
}

const ProductCardSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="aspect-[4/5] w-full bg-stone-50" />
    <div className="space-y-2">
      <Skeleton className="h-3 w-1/4 bg-stone-50" />
      <Skeleton className="h-4 w-3/4 bg-stone-100" />
    </div>
  </div>
);

export default function Products() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

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
      <div className="min-h-screen bg-zinc-50 px-6 py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-stone-900 px-6 py-24 lg:py-32 relative">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header - Minimalist & Elite */}
        <header className="max-w-3xl mb-24 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-stone-900" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-600">
              Küratörlü Koleksiyon
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-serif italic tracking-tight text-stone-900">
            Dış Mekanda <br /> Rafine Dokunuşlar
          </h2>
          
          <p className="text-stone-500 text-sm md:text-base font-light max-w-lg leading-relaxed">
            Oturma gruplarından lüks barbekülere, bahçenizdeki her detay için özenle seçilmiş tasarım harikaları.
          </p>
        </header>

        {/* Ürün Grid - Sade ve Net */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 mb-24">
          {products.slice(0, 6).map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Footer Action - Industrial & Elegant */}
        <footer className="border-t border-stone-100 pt-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-1">
            <p className="text-xs font-bold tracking-widest uppercase text-stone-600">
              Keşfetmeye Devam Et
            </p>
            <p className="text-stone-900 font-serif italic text-xl">
              Tüm dış mekan mobilya serisi
            </p>
          </div>

          <Link href="/products">
            <button className="group flex items-center gap-4 bg-stone-900 text-white px-10 py-5 rounded-none hover:bg-stone-800 transition-all duration-500">
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase">
                Tümünü İncele
              </span>
              <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
            </button>
          </Link>
        </footer>
      </div>

      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-[40%]   h-[100%] bg-background -z-10" />
    </div>
  );
}