"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const heroes = [
  {
    id: 1,
    title: "Dış Mekanda Konfor Sanatı",
    subtitle: "Premium Rattan & İroko Koleksiyonu",
    image: "/heroes/1001.webp",
    href: "/products",
  },
  {
    id: 2,
    title: "Yıldızların Altında Akşam Yemeği",
    subtitle: "Modern Sandalye ve Mobilya Takımları",
    image: "/heroes/1002.webp",
    href: "/products",
  },
  {
    id: 3,
    title: "Doğayla Bütünleşen Tasarımlar",
    subtitle: "Minimalist Bahçe Mobilyalarında %30 İndirim",
    image: "/heroes/1003.webp",
    href: "/products",
  },
  {
    id: 4,
    title: "Güneşin Keyfini Sürün",
    subtitle: "Dayanıklı ve Şık Yemek Masası Takımları",
    image: "/heroes/1004.webp",
    href: "/products",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === heroes.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Arka Plan Görseli - Kenarlarda hafif vinyet ile */}
          <div className="relative w-full h-full">
            <Image
              src={heroes[current].image}
              alt={heroes[current].title}
              fill
              className="object-cover scale-105 animate-subtle-zoom"
              priority
            />


            {/* 2. Katman: Dinamik Gradyan (Metinlerin olduğu orta ve alt kısmı daha çok vurgular) */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-transparent" />
          </div>
          {/* İçerik Alanı */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-white text-[10px] md:text-xs tracking-[0.5em] uppercase mb-6 font-medium"
            >
              {heroes[current].subtitle}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-white text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-[1.1] max-w-4xl mb-12"
            >
              {heroes[current].title.split(" ").map((word, i) => (
                <span key={i} className={i === 1 ? "font-normal italic" : ""}>
                  {word}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <Link
                href={heroes[current].href}
                className="group flex items-center gap-4 text-white hover:text-white/80 transition-all"
              >
                <span className="text-xs tracking-[0.3em] font-medium uppercase border-b border-white/40 pb-1 group-hover:border-white transition-all">
                  Koleksiyonu Keşfet
                </span>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Modern Progress Bar Navigasyon */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center gap-8 z-20">
        {heroes.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="group relative py-4"
          >
            <div
              className={`h-[1px] transition-all duration-700 ${
                current === i
                  ? "w-16 bg-white"
                  : "w-8 bg-white/30 group-hover:bg-white/60"
              }`}
            />
            <span
              className={`absolute -top-4 left-0 text-[10px] font-medium transition-all ${
                current === i
                  ? "opacity-100 text-white"
                  : "opacity-0 text-white/50"
              }`}
            >
              0{i + 1}
            </span>
          </button>
        ))}
      </div>

      <style jsx global>{`
        @keyframes subtle-zoom {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.1);
          }
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 20s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
}
