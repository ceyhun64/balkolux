"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react"; // Simge eklemek zenginlik katar

export default function Banner() {
  const [banner, setBanner] = useState<{
    title?: string;
    subtitle?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // API simülasyonu veya fetch
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Skeleton className="w-full h-[500px] mb-12 rounded-none" />;
  }

  return (
    <section className="bg-zinc-700 py-32 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-neutral-800/30 skew-x-12 translate-x-20" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        <h2 className="luxury-serif text-4xl md:text-6xl text-white mb-8">
          Hayalinizdeki Salonu <br />{" "}
          <span className="italic">Beraber Tasarlayalım.</span>
        </h2>
        <p className="modern-sans text-neutral-400 font-light max-w-lg mb-12">
          Kişiye özel kumaş seçimleri ve ölçülendirme hizmetimizle, mekanınıza
          tam uyum sağlayan çözümler sunuyoruz.
        </p>
        <button className="group flex items-center gap-4 bg-white text-neutral-900 px-10 py-5 rounded-full hover:bg-neutral-200 transition-all duration-500">
          <span className="modern-sans text-xs font-bold tracking-[0.2em] uppercase">
            Danışmanlık Al
          </span>
          <ArrowRight
            size={18}
            className="group-hover:translate-x-2 transition-transform"
          />
        </button>
      </div>
    </section>
  );
}
