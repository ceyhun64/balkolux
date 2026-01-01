"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, PhoneOutgoing, Sparkles } from "lucide-react";
import Image from "next/image";

// --- TYPES ---
interface CollectionMegaMenuProps {
  collectionOpen: boolean;
  setCollectionOpen: (isOpen: boolean) => void;
  collectionLink: {
    subItems?: { label: string; href: string }[];
  };
}

const QUICK_LINKS = [
  { label: "Hakkımızda", href: "/about" },
  { label: "Mağazalarımız", href: "/stores" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/contact" },
];

// --- Sub-Component: Minimal Category Link ---
function CategoryLink({ item, closeMenu }: { item: { label: string; href: string }; closeMenu: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={closeMenu}
      className="group flex items-center justify-between py-3 border-b border-black/5 hover:border-black/20 transition-all"
    >
      <span className="text-[15px] font-light tracking-wide text-black/70 group-hover:text-black group-hover:pl-2 transition-all duration-300 uppercase">
        {item.label}
      </span>
      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-black" />
    </Link>
  );
}

export default function CollectionMegaMenu({
  collectionOpen,
  setCollectionOpen,
  collectionLink,
}: CollectionMegaMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        const isButton = (e.target as HTMLElement).closest('button');
        if (!isButton) setCollectionOpen(false);
      }
    };
    if (collectionOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [collectionOpen, setCollectionOpen]);

  return (
    <AnimatePresence>
      {collectionOpen && (
        <>
          {/* Backdrop: Daha şeffaf ve kaliteli blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-[4px] z-40"
            onClick={() => setCollectionOpen(false)}
          />

          <motion.div
            ref={ref}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="fixed top-0 left-0 right-0 bg-white z-50 pt-[100px] pb-12 shadow-2xl"
          >
            <div className="max-w-[1440px] mx-auto px-10">
              
              <div className="grid grid-cols-12 gap-12">
                
                {/* 1. Sol Panel: Başlık ve Hızlı Linkler */}
                <div className="col-span-3 border-r border-black/5 pr-12">
                  <div className="flex items-center gap-2 mb-8">
                    <Sparkles className="w-4 h-4 text-black/40" />
                    <span className="text-[10px] tracking-[0.4em] font-medium text-black/40 uppercase">Keşfet</span>
                  </div>
                  <h2 className="text-3xl font-light tracking-tight mb-10 leading-tight">
                    BalkoLüx <br /> Koleksiyonu
                  </h2>
                  
                  <nav className="flex flex-col gap-4">
                    {QUICK_LINKS.map((link) => (
                      <Link 
                        key={link.label} 
                        href={link.href} 
                        onClick={() => setCollectionOpen(false)}
                        className="text-xs tracking-[0.2em] text-black/50 hover:text-black transition-colors uppercase"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* 2. Orta Panel: Kategoriler (Grid) */}
                <div className="col-span-6">
                  <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                    {collectionLink.subItems?.map((item, idx) => (
                      <CategoryLink key={idx} item={item} closeMenu={() => setCollectionOpen(false)} />
                    ))}
                  </div>
                </div>

                {/* 3. Sağ Panel: Öne Çıkan Görsel / CTA */}
                <div className="col-span-3">
                  <Link 
                    href="/contact" 
                    onClick={() => setCollectionOpen(false)}
                    className="group relative block aspect-[4/5] overflow-hidden rounded-sm bg-gray-100"
                  >
                    <Image 
                      src="/categories/default.webp" // Buraya şık bir yaşam alanı görseli koymalısın
                      alt="İletişim"
                      fill
                      className="object-cover brightness-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-6">
                      <p className="text-white text-xs tracking-widest uppercase mb-2">Özel Projeler</p>
                      <h4 className="text-white text-xl font-light mb-4 text-balance">Ücretsiz Ölçü ve Tasarım Desteği</h4>
                      <div className="flex items-center gap-2 text-white">
                        <span className="text-[10px] font-bold tracking-widest border-b border-white pb-1">BİZE ULAŞIN</span>
                      </div>
                    </div>
                  </Link>
                </div>

              </div>

              {/* Kapatma Butonu: Sağ Alt Köşede Minimal */}
              <button
                onClick={() => setCollectionOpen(false)}
                className="absolute top-8 right-10 p-2 hover:rotate-90 transition-all duration-300 opacity-40 hover:opacity-100"
              >
                <X className="w-6 h-6 stroke-[1px]" />
              </button>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}