"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-[#FDFDFD] text-stone-800 px-6 overflow-hidden">
      {/* Arka Plan Hafif Dekoratif Element */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif italic text-stone-50/50 select-none">
          BalkoLüx
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <span className="text-[10px] tracking-[0.5em] uppercase text-stone-400 font-light mb-4 block">
          Hata Kodu 404
        </span>

        <h1 className="text-6xl md:text-8xl font-extralight tracking-tighter leading-none mb-6">
          Sayfa{" "}
          <span className="font-serif italic text-stone-400">Bulunamadı</span>
        </h1>

        <p className="mt-2 text-sm md:text-base text-stone-500 max-w-[280px] md:max-w-md font-light leading-relaxed">
          Aradığınız içerik taşınmış veya artık mevcut olmayabilir. Dış mekanın
          huzuruna geri dönmeye ne dersiniz?
        </p>

        <div className="mt-12 flex flex-col items-center gap-6">
          <Link
            href="/"
            className="group relative flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-medium text-stone-800 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-2" />
            <span className="border-b border-stone-200 pb-1 group-hover:border-stone-800">
              Ana Sayfaya Dön
            </span>
          </Link>

          <div className="h-20 w-[1px] bg-gradient-to-b from-stone-200 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}
