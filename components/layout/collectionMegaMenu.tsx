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
  { label: "Hikayemiz", href: "/institutional/about" },
  { label: "Katalog", href: "/catalog" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/contact" },
];

const containerVariants = {
  hidden: { opacity: 0, y: "-100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.05,
      delayChildren: 0.1,
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

  // Scroll engelleme
  useEffect(() => {
    if (collectionOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [collectionOpen]);

  return (
    <AnimatePresence mode="wait">
      {collectionOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-[8px] z-[55]"
            onClick={() => setCollectionOpen(false)}
          />

          <motion.div
            ref={ref}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 right-0 bg-white z-[60] border-b border-zinc-100 shadow-2xl max-h-screen overflow-y-auto"
          >
            <div className="max-w-[1600px] mx-auto pt-24 pb-12 px-6 md:px-16 lg:px-24">
              {/* Mobil Kapatma Butonu - Daha belirgin */}
              <button
                onClick={() => setCollectionOpen(false)}
                className="absolute top-6 right-6 flex items-center gap-2 group z-50"
              >
                <span className="text-[10px] tracking-widest text-zinc-400 uppercase hidden md:block">
                  Kapat
                </span>
                <div className="w-10 h-10 border border-zinc-100 rounded-full flex items-center justify-center bg-white shadow-sm">
                  <X className="w-5 h-5 text-zinc-900" />
                </div>
              </button>

              <div className="grid grid-cols-12 gap-y-12 md:gap-x-12 lg:gap-24">
                {/* 1. Bölüm: Koleksiyonlar (Mobilde en üstte olmalı) */}
                <div className="col-span-12 md:col-span-6 order-1 md:order-2">
                  <motion.h4
                    variants={itemVariants}
                    className="text-[10px] tracking-[0.4em] text-zinc-400 uppercase font-bold mb-6"
                  >
                    KOLEKSİYONLARIMIZ
                  </motion.h4>
                  <div className="grid grid-cols-1 gap-y-1">
                    {collectionLink.subItems?.map((item, idx) => (
                      <motion.div key={idx} variants={itemVariants}>
                        <Link
                          href={item.href}
                          onClick={() => setCollectionOpen(false)}
                          className="group flex items-center justify-between py-4 border-b border-zinc-50 transition-all"
                        >
                          <span className="text-2xl md:text-3xl font-light text-zinc-800 italic group-hover:pl-2 transition-all duration-300">
                            {item.label}
                          </span>
                          <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-black transition-all" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 2. Bölüm: Yan Navigasyon (Mobilde orta kısım) */}
                <motion.div
                  variants={itemVariants}
                  className="col-span-12 md:col-span-3 order-2 md:order-1 flex flex-col justify-between md:border-r border-zinc-100 md:pr-12"
                >
                  <div className="space-y-8">
                    <h4 className="text-[10px] tracking-[0.4em] text-zinc-400 uppercase font-bold">
                      KEŞFET
                    </h4>
                    <nav className="grid grid-cols-2 md:grid-cols-1 gap-y-5 gap-x-4">
                      {QUICK_LINKS.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={() => setCollectionOpen(false)}
                          className="flex items-center text-sm text-zinc-600 hover:text-black transition-colors tracking-tight"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="mt-10 pt-6 border-t border-zinc-50 md:border-none">
                    <p className="text-[10px] text-zinc-400 font-light tracking-[0.2em]">
                      EST. 2026 — BALKOLÜX
                    </p>
                  </div>
                </motion.div>

                {/* 3. Bölüm: Editorial CTA (Mobilde en altta veya gizli) */}
                <motion.div
                  variants={itemVariants}
                  className="col-span-12 md:col-span-3 order-3"
                >
                  <Link
                    href="/products"
                    onClick={() => setCollectionOpen(false)}
                    className="group relative block w-full aspect-[16/9] md:aspect-[4/5] overflow-hidden bg-zinc-900 rounded-sm"
                  >
                    <Image
                      src="/megaMenu/megaMenu.webp"
                      alt="Yeni Koleksiyon"
                      fill
                      className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                      <span className="text-[9px] tracking-[0.3em] uppercase text-zinc-300 mb-2">
                        Öne Çıkanlar
                      </span>
                      <h3 className="text-lg font-serif text-white mb-3">
                        Zamansız Tasarımlar
                      </h3>
                      <span className="text-[10px] tracking-widest text-white border-b border-white/40 pb-1">
                        İNCELE
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
