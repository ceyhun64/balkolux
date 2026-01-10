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
    desktopImage: "/heroes/1.0.avif",
    mobileImage: "/heroes/2.0.avif", // Mobilde görünecek
    href: "/products",
  },
  {
    id: 2,
    title: "Yıldızların Altında Akşam Yemeği",
    subtitle: "Modern Sandalye ve Mobilya Takımları",
    desktopImage: "/heroes/1.1.avif",
    mobileImage: "/heroes/2.1.avif", // Mobilde görünecek
    href: "/products",
  },
  {
    id: 3,
    title: "Doğayla Bütünleşen Tasarımlar",
    subtitle: "Minimalist Bahçe Mobilyalarında %30 İndirim",
    desktopImage: "/heroes/1.2.avif",
    mobileImage: "/heroes/2.2.avif", // Mobilde görünecek
    href: "/products",
  },
  {
    id: 4,
    title: "Güneşin Keyfini Sürün",
    subtitle: "Dayanıklı ve Şık Yemek Masası Takımları",
    desktopImage: "/heroes/1.3.avif",
    mobileImage: "/heroes/2.3.avif", // Mobilde görünecek
    href: "/products",
  },
  {
    id: 5,
    title: "Güneşin Keyfini Sürün",
    subtitle: "Dayanıklı ve Şık Yemek Masası Takımları",
    desktopImage: "/heroes/1.4.avif",
    mobileImage: "/heroes/2.4.avif", // Mobilde görünecek
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
    <div className="relative w-full h-[100dvh] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* MASAÜSTÜ RESMİ (Sadece md ekranlarda görünür) */}
          <div className="hidden md:block relative w-full h-full">
            <Image
              src={heroes[current].desktopImage}
              alt={heroes[current].title}
              fill
              className="object-cover scale-105 animate-subtle-zoom"
              priority={current === 0}
              sizes="100vw"
              quality={85}
            />
          </div>

          {/* MOBİL RESMİ (md altı ekranlarda görünür) */}
          <div className="block md:hidden relative w-full h-full">
            <Image
              src={heroes[current].mobileImage}
              alt={heroes[current].title}
              fill
              className="object-cover scale-105 animate-subtle-zoom"
              priority={current === 0} // Mobilde de ilk resim en hızlı şekilde inmeli
              sizes="100vw"
              quality={75} // Mobilde 75 kalite yeterlidir, dosya boyutunu %40 düşürür
            />
          </div>

          <div className="absolute inset-0 bg-black/35" />

          {/* İÇERİK: Mobilde animasyonları sadeleştirdik */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white text-[10px] md:text-xs tracking-[0.5em] uppercase mb-6 font-medium"
            >
              {heroes[current].subtitle}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 15 }} // Mobilde 30px yerine 15px (daha az CPU tüketir)
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-4xl md:text-8xl font-extralight tracking-tight leading-[1.1] max-w-4xl mb-12"
            >
              {heroes[current].title}
            </motion.h1>

            {/* CTA butonu mobilde direkt görünebilir veya çok hafif bir delay ile gelebilir */}
            <Link
              href={heroes[current].href}
              className="group flex items-center gap-4 text-white"
            >
              <span className="text-xs tracking-[0.3em] font-medium uppercase border-b border-white/40 pb-1">
                Koleksiyonu Keşfet
              </span>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigasyon Çubukları (Z-Index ve Tıklama Alanı Optimize Edildi) */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center gap-4 z-30">
        {heroes.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="p-2" // Tıklama alanı mobilde parmak için büyütüldü
            aria-label="Slayt değiştir"
          >
            <div
              className={`h-[1px] transition-all duration-500 ${
                current === i ? "w-10 bg-white" : "w-5 bg-white/30"
              }`}
            />
          </button>
        ))}
      </div>

      <style jsx global>{`
        @keyframes subtle-zoom {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.08);
          }
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 15s infinite alternate ease-in-out;
          will-change: transform; /* Performans için tarayıcıya önceden bildiriyoruz */
        }
      `}</style>
    </div>
  );
}
