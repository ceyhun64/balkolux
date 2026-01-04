"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";

export default function Banner() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Skeleton className="w-full h-[600px] rounded-none bg-stone-900/10" />
    );
  }

  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#0f0f0f] py-24">
      {/* Arka Plan Dokusu ve Işık Oyunu */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-20" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute -top-[20%] -right-[10%] w-[60%] h-[100%] bg-stone-400 rounded-full blur-[150px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f0f0f]/80" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Üst Küçük Başlık */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[10px] md:text-[11px] tracking-[0.6em] text-stone-500 uppercase mb-8 block font-medium"
          >
            Atölye & Tasarım Hizmetleri
          </motion.span>

          {/* Ana Başlık */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-5xl md:text-8xl text-white font-serif leading-[1.1] tracking-tight mb-10"
          >
            Hayalinizdeki Salonu <br />
            <span className="italic font-light text-stone-300">
              Beraber Tasarlayalım.
            </span>
          </motion.h2>

          {/* Açıklama Metni */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-stone-400 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed mb-14"
          >
            Kişiye özel kumaş seçkisi ve hassas ölçülendirme disipliniyle,
            mekanınızın ruhuna eşlik eden rafine çözümler sunuyoruz.
          </motion.p>

          {/* Buton - Minimal ama Güçlü */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <button className="group relative inline-flex items-center gap-6 px-12 py-6 bg-transparent overflow-hidden border border-stone-800 hover:border-stone-400 transition-all duration-700">
              {/* Hover Arka Planı */}
              <div className="absolute inset-0 w-0 bg-white group-hover:w-full transition-all duration-700 ease-[0.19,1,0.22,1]" />

              <span className="relative z-10 text-[11px] tracking-[0.4em] uppercase text-stone-200 group-hover:text-stone-950 font-bold transition-colors duration-500">
                Danışmanlık Al
              </span>
              <ArrowRight
                size={16}
                className="relative z-10 text-stone-500 group-hover:text-stone-950 group-hover:translate-x-2 transition-all duration-500"
              />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Estetik Kenar Çizgileri */}
      <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-stone-800 to-transparent opacity-30 hidden lg:block" />
      <div className="absolute right-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-stone-800 to-transparent opacity-30 hidden lg:block" />
    </section>
  );
}
