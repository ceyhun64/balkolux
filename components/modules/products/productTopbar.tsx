"use client";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  SlidersHorizontal,
  Grid2X2,
  Grid3X3,
  LayoutGrid,
  ArrowDownAZ,
  ArrowUpAZ,
  TrendingUp,
  TrendingDown,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import MobileFilter from "./mobileFilter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductTopBarProps {
  gridCols: 1 | 2 | 3 | 4;
  setGridCols: (cols: 1 | 2 | 3 | 4) => void;
  sort: "az" | "za" | "priceLow" | "priceHigh";
  setSort: (sort: "az" | "za" | "priceLow" | "priceHigh") => void;
}

const ProductTopBar: React.FC<ProductTopBarProps> = ({
  gridCols,
  setGridCols,
  sort,
  setSort,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const desktopGridOptions = [
    { value: 2, icon: Grid2X2 },
    { value: 3, icon: Grid3X3 },
    { value: 4, icon: LayoutGrid },
  ] as const;

  const sortOptions = [
    { id: "az", label: "A-Z", icon: ArrowDownAZ },
    { id: "za", label: "Z-A", icon: ArrowUpAZ },
    { id: "priceLow", label: "Fiyat (Artan)", icon: TrendingDown },
    { id: "priceHigh", label: "Fiyat (Azalan)", icon: TrendingUp },
  ] as const;

  return (
    <nav className="sticky top-0 z-30 -mb-8 max-w-7xl transition-all duration-500 border-b border-transparent bg-white/80 backdrop-blur-md border-stone-100 py-3">
      <div className="max-w-[1800px] mx-auto px-6 flex items-center justify-between">
        {/* Desktop - Sağ Taraf: Kontroller */}
        <div className="hidden md:flex items-center gap-10">
          {/* Görünüm Seçenekleri */}
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest text-stone-400">
              Görünüm
            </span>
            <div className="flex bg-stone-50 p-1 rounded-full border border-stone-100">
              {desktopGridOptions.map((option) => {
                const Icon = option.icon;
                const isActive = gridCols === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setGridCols(option.value)}
                    className={cn(
                      "relative p-2 rounded-full transition-all duration-300",
                      isActive
                        ? "text-stone-950"
                        : "text-stone-300 hover:text-stone-500"
                    )}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-white shadow-sm rounded-full" />
                    )}
                    <Icon className="w-3.5 h-3.5 relative z-10" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sıralama Seçenekleri (Minimal Dropdown Tarzı) */}
          {/* Sıralama Seçenekleri (shadcn/ui) */}
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">
              Sırala
            </span>
            <Select value={sort} onValueChange={(value: any) => setSort(value)}>
              <SelectTrigger
                className="
    w-[170px]
    h-8
    border-none
    bg-transparent
    text-[11px]
    font-medium
    focus:ring-0
    focus:ring-offset-0
    hover:text-stone-950
    transition-colors
    uppercase
    tracking-wider
    p-0
    pr-5
    shadow-none
    [&>svg]:ml-2
    [&>svg]:opacity-60
  "
              >
                <SelectValue placeholder="Sıralama Seçin" />
              </SelectTrigger>
              <SelectContent
                align="end"
                className="rounded-xl border-stone-100 shadow-xl min-w-[180px] bg-white/95 backdrop-blur-sm"
              >
                {sortOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <SelectItem
                      key={opt.id}
                      value={opt.id}
                      className="text-[11px] focus:bg-stone-50 focus:text-stone-950 cursor-pointer py-2.5 px-3"
                    >
                      <div className="flex items-center gap-2.5 ms-2">
                        <Icon className="w-3.5 h-3.5 text-stone-400" />
                        <span className="font-medium">{opt.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mobile FAB Trigger - Daha Zarif */}
        <div className="flex md:hidden w-full justify-between items-center">
          <span className="text-[11px] font-semibold uppercase tracking-widest">
            Ürünler
          </span>
          <motion.button
            onClick={() => setMobileOpen(true)}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 text-stone-900 text-[11px] font-medium"
          >
            <SlidersHorizontal className="w-3 h-3" />
            Filtrele
          </motion.button>
        </div>
      </div>

      {/* Mobile Sidebar/Sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-stone-950/20 backdrop-blur-md z-[50]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-[51] shadow-2xl flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-stone-50">
                <h3 className="text-[14px] font-semibold uppercase tracking-widest">
                  Ayarlar
                </h3>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 hover:bg-stone-50 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-stone-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Mobile Filter Component */}
                <div className="space-y-4">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest">
                    Kategoriler
                  </span>
                  <MobileFilter
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                  />
                </div>

                {/* Grid Seçimi */}
                <div className="space-y-4">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest">
                    Görünüm Düzeni
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2].map((num) => (
                      <button
                        key={num}
                        onClick={() => setGridCols(num as 1 | 2)}
                        className={cn(
                          "py-4 rounded-xl border transition-all text-[11px] font-medium",
                          gridCols === num
                            ? "border-stone-900 bg-stone-900 text-white"
                            : "border-stone-100 bg-stone-50 text-stone-500"
                        )}
                      >
                        {num === 1 ? "Geniş Görünüm" : "Kılavuz (2'li)"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sıralama */}
                <div className="space-y-4">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest">
                    Sıralama
                  </span>
                  <div className="space-y-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSort(option.id)}
                        className={cn(
                          "w-full flex items-center justify-between p-4 rounded-xl border transition-all",
                          sort === option.id
                            ? "border-stone-900 bg-stone-50"
                            : "border-transparent bg-stone-50/50"
                        )}
                      >
                        <span className="text-[12px] font-medium">
                          {option.label}
                        </span>
                        {sort === option.id && (
                          <div className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-stone-50">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-4 bg-stone-950 text-white text-[12px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-stone-800 transition-colors"
                >
                  Sonuçları Göster
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default ProductTopBar;
