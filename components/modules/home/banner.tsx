"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BannerData {
  title: string;
  subtitle: string;
}

export default function Banner() {
  const [isLoading, setIsLoading] = useState(true);
  const [banner, setBanner] = useState<BannerData | null>(null);

  // Varsayılan İçerikler
  const defaultContent: BannerData = {
    title: "Hayalinizdeki Bahçeyi Beraber Tasarlayalım.",
    subtitle:
      "Kişiye özel kumaş seçkisi ve hassas ölçülendirme disipliniyle, mekanınızın ruhuna eşlik eden rafine çözümler sunuyoruz.",
  };

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch("/api/banner");
        const data = await res.json();

        // API'den banners dizisi geliyor, ilk elemanı alıyoruz
        if (data.banners && data.banners.length > 0) {
          setBanner(data.banners[0]);
        }
      } catch (error) {
        console.error("Banner yüklenirken hata oluştu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanner();
  }, []);

  // API'den gelen varsa onu, yoksa varsayılanı kullan
  const activeContent = {
    title: banner?.title || defaultContent.title,
    subtitle: banner?.subtitle || defaultContent.subtitle,
  };

  if (isLoading) {
    return (
      <Skeleton className="w-full h-[70vh] rounded-none bg-stone-900/10" />
    );
  }

  return (
    <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden bg-[#0f0f0f] py-24">
      {/* Arka Plan Görseli ve Efektler */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-20" />
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute -top-[20%] -right-[10%] w-[60%] h-[100%] bg-stone-400 rounded-full blur-[150px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f0f0f]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] md:text-[11px] tracking-[0.6em] text-stone-500 uppercase mb-8 block font-medium"
          >
            Atölye & Tasarım Hizmetleri
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl text-white font-serif leading-[1.2] tracking-tight mb-10"
          >
            {activeContent.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-stone-400 text-sm md:text-lg font-light max-w-2xl mx-auto leading-relaxed mb-14"
          >
            {activeContent.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href={"/contact"}
              className="group relative inline-flex items-center gap-6 px-12 py-6 bg-transparent overflow-hidden border border-stone-800 hover:border-stone-400 transition-all duration-700"
            >
              <div className="absolute inset-0 w-0 bg-white group-hover:w-full transition-all duration-700 ease-[0.19,1,0.22,1]" />
              <span className="relative z-10 text-[11px] tracking-[0.4em] uppercase text-stone-200 group-hover:text-stone-950 font-bold">
                Hemen İletişime Geç
              </span>
              <ArrowRight
                size={16}
                className="relative z-10 text-stone-500 group-hover:text-stone-950 group-hover:translate-x-2 transition-all"
              />
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-stone-800 to-transparent opacity-30 hidden lg:block" />
      <div className="absolute right-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-stone-800 to-transparent opacity-30 hidden lg:block" />
    </section>
  );
}
