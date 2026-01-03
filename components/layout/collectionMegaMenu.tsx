"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import Image from "next/image";

interface CollectionMegaMenuProps {
  collectionOpen: boolean;
  setCollectionOpen: (isOpen: boolean) => void;
  collectionLink: {
    subItems?: { label: string; href: string }[];
  };
}

const QUICK_LINKS = [
  { label: "Hikayemiz", href: "/about" },
  { label: "Katalog", href: "/catalog" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/contact" },
];

// Animasyon varyantları
const containerVariants = {
  hidden: { opacity: 0, y: "-100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: "-100%",
    transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CollectionMegaMenu({
  collectionOpen,
  setCollectionOpen,
  collectionLink,
}: CollectionMegaMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (!(e.target as HTMLElement).closest("button")) {
          setCollectionOpen(false);
        }
      }
    };
    if (collectionOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [collectionOpen, setCollectionOpen]);

  return (
    <AnimatePresence mode="wait">
      {collectionOpen && (
        <>
          {/* Backdrop: Daha sofistike bir blur efekti */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/5 backdrop-blur-[8px] z-[55]"
            onClick={() => setCollectionOpen(false)}
          />

          <motion.div
            ref={ref}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 right-0 bg-white z-[60] border-b border-zinc-100 shadow-2xl"
          >
            <div className="max-w-[1600px] mx-auto pt-28 pb-24 px-8 md:px-16 lg:px-24">
              <div className="grid grid-cols-12 gap-12 lg:gap-24">
                {/* 1. Bölüm: Yan Navigasyon */}
                <motion.div
                  variants={itemVariants}
                  className="col-span-12 md:col-span-3 flex flex-col justify-between border-r border-zinc-100 pr-12"
                >
                  <div>
                    <h4 className="text-[10px] tracking-[0.4em] text-zinc-400 uppercase font-semibold mb-10">
                      KEŞFET
                    </h4>
                    <nav className="flex flex-col space-y-5">
                      {QUICK_LINKS.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={() => setCollectionOpen(false)}
                          className="group flex items-center text-sm text-zinc-600 hover:text-black transition-all duration-300 tracking-tight"
                        >
                          <span className="w-0 group-hover:w-4 h-[1px] bg-black mr-0 group-hover:mr-3 transition-all duration-300" />
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="mt-12">
                    <p className="text-[11px] text-zinc-400 font-light tracking-widest">
                      EST. 2026 — BALKOLÜX
                    </p>
                  </div>
                </motion.div>

                {/* 2. Bölüm: Ana Koleksiyonlar (Merkez Odak) */}
                <div className="col-span-12 md:col-span-6">
                  <motion.h4
                    variants={itemVariants}
                    className="text-[10px] tracking-[0.4em] text-zinc-400 uppercase font-semibold mb-10 text-center md:text-left"
                  >
                    KOLEKSİYONLARIMIZ
                  </motion.h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                    {collectionLink.subItems?.map((item, idx) => (
                      <motion.div key={idx} variants={itemVariants}>
                        <Link
                          href={item.href}
                          onClick={() => setCollectionOpen(false)}
                          className="group relative flex items-center justify-between py-6 border-b border-zinc-50 overflow-hidden"
                        >
                          <span className="text-3xl font-light text-zinc-700 hover:text-zinc-700/50 transition-all duration-700 ease-in-out italic">
                            {item.label}
                          </span>
                          <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-black stroke-[1px]" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 3. Bölüm: Editorial CTA */}
                <motion.div
                  variants={itemVariants}
                  className="col-span-12 md:col-span-3"
                >
                  <Link
                    href="/products"
                    onClick={() => setCollectionOpen(false)}
                    className="group relative block w-full aspect-[4/5] overflow-hidden bg-zinc-900"
                  >
                    {/* Görsel */}
                    <Image
                      src="/megaMenu/megaMenu.webp"
                      alt="Yeni Koleksiyon"
                      fill
                      className="object-cover scale-105
                 transition-all duration-[2000ms] ease-out
                 group-hover:scale-110 group-hover:opacity-30"
                    />

                    {/* Okunabilirlik için gradient overlay */}
                    <div
                      className="absolute inset-0
                 bg-gradient-to-t
                 from-black/70 via-black/30 to-transparent
                 transition-opacity duration-700"
                    />

                    {/* İçerik */}
                    <div className="absolute bottom-10 left-0 right-0 z-10 flex flex-col items-center text-center px-6">
                      <span
                        className="text-[10px] tracking-[0.35em] uppercase font-medium
                       text-zinc-300 mb-3"
                      >
                        Öne Çıkanlar
                      </span>

                      <h3
                        className="text-xl font-serif font-light tracking-tight
                     text-white mb-5 leading-snug"
                      >
                        Zamansız Tasarımlar
                      </h3>

                      <span
                        className="text-[11px] tracking-[0.25em] uppercase font-medium
                   text-white border-b border-white/40 pb-1
                   opacity-0 translate-y-2
                   group-hover:opacity-100 group-hover:translate-y-0
                   transition-all duration-700"
                      >
                        Şimdi İncele
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </div>

              {/* Minimal Kapatma Butonu */}
              <button
                onClick={() => setCollectionOpen(false)}
                className="absolute top-12 right-12 flex items-center gap-3 group"
              >
                <span className="text-[10px] tracking-widest text-zinc-600 group-hover:text-zinc-600/50 transition-colors duration-300 uppercase">
                  Kapat
                </span>
                <div className="relative flex items-center justify-center w-10 h-10 border border-zinc-100 rounded-full group-hover:border-black transition-colors duration-500">
                  <X className="w-4 h-4 text-zinc-600 group-hover:text-zinc-600/50transition-colors duration-300 stroke-[1.5px]" />
                </div>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
