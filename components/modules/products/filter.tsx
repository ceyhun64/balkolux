"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface FilterProps {
  colorFilter: string;
  setColorFilter: (color: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  minPrice: number;
  setMinPrice: (price: number) => void;
}

const productCategories = [
  { label: "Tüm Koleksiyon", href: "/products" },
  { label: "Oturma Takımları", href: "/products/seating_sets" },
  { label: "Masa Takımları", href: "/products/table_sets" },
  { label: "Salıncak", href: "/products/swing" },
  { label: "Şezlong", href: "/products/sunbed" },
  { label: "Barbekü", href: "/products/barbecue" },
];

const Filter: React.FC<FilterProps> = ({
  colorFilter,
  setColorFilter,
  maxPrice,
  setMaxPrice,
  minPrice,
  setMinPrice,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="space-y-12">
      {/* Kategoriler */}
      <section>
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-6 font-medium">
          Kategoriler
        </h3>
        <div className="flex flex-col gap-3">
          {productCategories.map((category) => (
            <button
              key={category.label}
              onClick={() => router.push(category.href)}
              className={cn(
                "text-left text-sm font-light transition-all duration-300 hover:pl-2",
                pathname === category.href
                  ? "text-black font-normal"
                  : "text-neutral-500 hover:text-black"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      {/* Fiyat Slider */}
      <section className="pt-8 border-t border-neutral-200">
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-8 font-medium">
          Fiyat Aralığı
        </h3>
        <div className="px-2">
          <Slider
            value={[minPrice, maxPrice]}
            onValueChange={([min, max]) => {
              setMinPrice(min);
              setMaxPrice(max);
            }}
            max={300000}
            step={5000}
            className="mb-6"
          />
          <div className="flex justify-between modern-sans text-[11px] text-neutral-500">
            <span>{minPrice.toLocaleString()}₺</span>
            <span>{maxPrice.toLocaleString()}₺</span>
          </div>
        </div>
      </section>

      {/* Temizle */}
      <button
        onClick={() => {
          setColorFilter("all");
          setMinPrice(0);
          setMaxPrice(300000);
        }}
        className="w-full py-4 text-[10px] tracking-widest uppercase border border-neutral-900 hover:bg-black hover:text-white transition-all duration-500"
      >
        Filtreleri Sıfırla
      </button>
    </div>
  );
};

export default Filter;
