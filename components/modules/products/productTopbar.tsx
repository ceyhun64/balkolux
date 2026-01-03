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
} from "lucide-react";
import React, { useEffect, useState } from "react";
import MobileFilter from "./mobileFilter";
import { motion, AnimatePresence } from "framer-motion";

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
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const desktopGridOptions = [
    { value: 2, icon: Grid2X2 },
    { value: 3, icon: Grid3X3 },
    { value: 4, icon: LayoutGrid },
  ] as const;

  const sortOptions = [
    { id: "az" as const, label: "A-Z", icon: ArrowDownAZ },
    { id: "za" as const, label: "Z-A", icon: ArrowUpAZ },
    { id: "priceLow" as const, label: "Düşük", icon: TrendingDown },
    { id: "priceHigh" as const, label: "Yüksek", icon: TrendingUp },
  ];

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap");
        .minimal-sans {
          font-family: "Inter", sans-serif;
        }
      `}</style>

      {/* Desktop TopBar - Minimal */}
      <div className="hidden md:flex items-center gap-8 bg-white">
        {/* Grid Controls */}
        <div className="flex items-center gap-3">
          <span className="minimal-sans text-[10px] tracking-wider uppercase text-stone-400 font-medium">
            Görünüm
          </span>
          <div className="flex gap-1">
            {desktopGridOptions.map((option) => {
              const Icon = option.icon;
              const isActive = gridCols === option.value;

              return (
                <motion.button
                  key={option.value}
                  onClick={() => setGridCols(option.value as 2 | 3 | 4)}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300",
                    isActive
                      ? "bg-stone-900 text-white"
                      : "text-stone-400 hover:bg-stone-100 hover:text-stone-700"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3">
          <span className="minimal-sans text-[10px] tracking-wider uppercase text-stone-400 font-medium">
            Sıralama
          </span>
          <div className="flex gap-1">
            {sortOptions.map((option) => {
              const Icon = option.icon;
              const isActive = sort === option.id;

              return (
                <motion.button
                  key={option.id}
                  onClick={() => setSort(option.id)}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "minimal-sans px-3 h-9 rounded-lg flex items-center gap-2 transition-all duration-300",
                    "text-[11px] font-medium",
                    isActive
                      ? "bg-stone-900 text-white"
                      : "text-stone-500 hover:bg-stone-100 hover:text-stone-900"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">{option.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="md:hidden">
        {/* Mobile FAB */}
        <motion.button
          onClick={() => setMobileOpen(!mobileOpen)}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-5 py-3 rounded-full bg-stone-900 text-white minimal-sans text-[11px] font-medium tracking-wide shadow-xl"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtreler
        </motion.button>

        {/* Mobile Sheet */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
                onClick={() => setMobileOpen(false)}
              />

              {/* Sheet */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 250 }}
                className="fixed bottom-0 left-0 right-0 z-40 bg-white rounded-t-3xl shadow-2xl"
              >
                {/* Handle */}
                <div className="pt-3 pb-4">
                  <div className="w-10 h-1 bg-stone-200 rounded-full mx-auto" />
                </div>

                <div className="px-6 pb-6 space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="minimal-sans text-lg font-semibold text-stone-900">
                      Ayarlar
                    </h3>
                    <button
                      onClick={() => setMobileOpen(false)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 text-stone-400 hover:bg-stone-200"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Mobile Filter */}
                  <MobileFilter
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                  />

                  {/* Grid Options */}
                  <div className="space-y-3">
                    <label className="minimal-sans text-[10px] tracking-wider uppercase text-stone-400 font-medium">
                      Görünüm
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: 1, icon: Grid2X2, label: "Tek" },
                        { value: 2, icon: Grid3X3, label: "İki" },
                      ].map((option) => {
                        const Icon = option.icon;
                        const isActive = gridCols === option.value;

                        return (
                          <button
                            key={option.value}
                            onClick={() => setGridCols(option.value as 1 | 2)}
                            className={cn(
                              "minimal-sans h-11 rounded-lg flex items-center justify-center gap-2 text-[11px] font-medium transition-colors",
                              isActive
                                ? "bg-stone-900 text-white"
                                : "bg-stone-50 text-stone-600"
                            )}
                          >
                            <Icon className="w-4 h-4" />
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sort Options */}
                  <div className="space-y-3">
                    <label className="minimal-sans text-[10px] tracking-wider uppercase text-stone-400 font-medium">
                      Sıralama
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {sortOptions.map((option) => {
                        const Icon = option.icon;
                        const isActive = sort === option.id;

                        return (
                          <button
                            key={option.id}
                            onClick={() => setSort(option.id)}
                            className={cn(
                              "minimal-sans h-11 rounded-lg flex items-center justify-center gap-2 text-[11px] font-medium transition-colors",
                              isActive
                                ? "bg-stone-900 text-white"
                                : "bg-stone-50 text-stone-600"
                            )}
                          >
                            <Icon className="w-4 h-4" />
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="minimal-sans w-full py-3 bg-stone-900 text-white text-[11px] font-medium tracking-wide rounded-lg"
                  >
                    Uygula
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ProductTopBar;