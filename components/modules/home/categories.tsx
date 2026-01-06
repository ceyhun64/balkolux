"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight } from "lucide-react";

interface CategoryData {
  id: number;
  name: string;
  image: string;
  href: string;
}

// Yeni kategori verileri: Bahçe ve Balkon Mobilyaları
const initialCategories: CategoryData[] = [
  {
    id: 1,
    name: "BAHÇE MOBİLYALARI",
    image: "/categories/garden.jpg", // Bu isimde bir görseliniz olduğundan emin olun
    href: "/products/seating_sets",
  },
  {
    id: 2,
    name: "BALKON MOBİLYALARI",
    image: "/categories/balcony.avif", // Bu isimde bir görseliniz olduğundan emin olun
    href: "/products/table_sets",
  },
];

export default function CategoriesSection() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-background py-20 md:py-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Başlık Alanı */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] tracking-[0.6em] text-neutral-400 font-semibold uppercase mb-4 block">
              Dış Mekan Koleksiyonu 2026
            </span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-neutral-900 leading-[1.1]">
              Bahçe ve Balkon Yaşamını <br />
              <span className="font-serif italic text-neutral-500">
                Yeniden Kurgulayın
              </span>
            </h2>
          </div>
          <Link
            href="/products"
            className="group flex items-center gap-2 text-[11px] tracking-[0.3em] font-bold border-b border-black pb-2 hover:text-neutral-500 hover:border-neutral-300 transition-all uppercase"
          >
            Tüm Ürünleri Keşfet
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* Grid Yapısı - 2 Kategori için lg:grid-cols-2 olarak güncellendi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="aspect-[16/9] md:aspect-[4/5] w-full rounded-none"
                />
              ))
            : initialCategories.map((category) => (
                <PremiumCategoryCard key={category.id} category={category} />
              ))}
        </div>
      </div>
    </section>
  );
}

function PremiumCategoryCard({ category }: { category: CategoryData }) {
  return (
    <Link
      href={category.href}
      className="group relative block overflow-hidden bg-gray-50 aspect-[8/5]"
    >
      {/* Görsel Katmanı */}
      <div className="relative w-full h-full">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
      </div>

      {/* İçerik Katmanı */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="flex items-end justify-between">
          {/* pt-4 (padding-top) ekleyerek yazının yukarı kayarken kesilmesini engelledik */}
          <div className="overflow-hidden pt-4">
            <h3 className="text-white text-xl md:text-2xl font-light tracking-[0.15em] transform transition-transform duration-500 uppercase group-hover:-translate-y-1">
              {category.name}
            </h3>
            <p className="text-white/90 text-[10px] tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 uppercase">
              Koleksiyonu Keşfet
            </p>
          </div>

          <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 border border-white/20 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
    </Link>
  );
}
