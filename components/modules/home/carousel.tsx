"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const [isMobile, setIsMobile] = useState(false);

  // Ekran boyutunu kontrol et
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // İlk yüklemede çalıştır
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === heroes.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden">
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            // Ekran boyutuna göre resmi seç
            src={
              isMobile
                ? heroes[current].mobileImage
                : heroes[current].desktopImage
            }
            alt={heroes[current].title}
            fill
            className="object-cover scale-105 animate-subtle-zoom"
            // ÖNEMLİ: Sadece ilk slide (index 0) priority olsun, puanı artırır
            priority={current === 0}
            sizes="100vw"
            quality={85}
          />
          {/* Karartma katmanı (yazıların okunması için) */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-transparent md:from-transparent md:via-black/30 md:to-transparent " />
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <span className="text-white text-[10px] md:text-xs tracking-[0.5em] uppercase mb-6 font-medium">
            {heroes[current].subtitle}
          </span>

          <h1 className="text-white text-4xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-[1.1] max-w-4xl mb-12">
            {heroes[current].title.split(" ").map((word, i) => (
              <span key={i} className={i === 1 ? "font-normal italic" : ""}>
                {word}{" "}
              </span>
            ))}
          </h1>

          <div>
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
          </div>
        </div>
      </div>

      {/* Navigasyon Çubukları */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center gap-4 md:gap-8 z-20">
        {heroes.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="group relative py-4"
            // Kullanıcıya kaçıncı slaytta olduğunu ve ne yapacağını söyler
            aria-label={`${i + 1}. slayta git`}
          >
            <div
              className={`h-[1px] transition-all duration-700 ${
                current === i
                  ? "w-12 md:w-16 bg-white"
                  : "w-6 md:w-8 bg-white/30 group-hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
