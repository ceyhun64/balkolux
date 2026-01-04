"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Heart, User, X, Search, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import CartDropdown from "./cartDropdown";
import { useFavorite } from "@/contexts/favoriteContext";
import MobileNavSheet from "./mobileNavSheet";
import CollectionMegaMenu from "./collectionMegaMenu";
import UserMegaMenu from "./userMegaMenu";

interface Product {
  id: number;
  title: string;
  mainImage: string;
  price: number;
  category: string;
}

export default function Navbar() {
  const pathname = usePathname() || "/";
  const isHomePage = pathname === "/";

  const links = [
    { label: "Anasayfa", href: "/" },
    {
      label: "Menu",
      href: "/products",
      subItems: [
        { label: "Oturma Takımları", href: "/products/seating_sets" },
        { label: "Masa Takımları", href: "/products/table_sets" },
        { label: "Salıncak", href: "/products/swing" },
        { label: "Şezlong", href: "/products/sunbed" },
        { label: "Şemsiye", href: "/products/umbrella" },
        { label: "Barbekü", href: "/products/barbecue" },
      ],
    },
  ];

  const collectionLink = links.find((l) => l.label === "Menu")!;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(
    null
  );

  const { favorites } = useFavorite();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoadingProducts(true);
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products
      .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 6);
  }, [searchQuery, products]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNavbarBg = () => {
    if (scrolled) return "bg-zinc-950/30 backdrop-blur-2xl py-3 shadow-lg";
    return isHomePage
      ? "bg-transparent backdrop-blur-xs py-5 md:py-7"
      : "bg-zinc-950/30 backdrop-blur-2xl py-5 md:py-7 sticky";
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out text-white ${getNavbarBg()}`}
      >
        <div className="max-w-[1600px] mx-auto px-4 md:px-12">
          {/* ÜST SATIR: Hamburger - Logo - İkonlar */}
          <div className="flex items-center justify-between">
            {/* SOL: Hamburger (Menü Butonu) */}
            <div className="flex items-center flex-1">
              <button
                onClick={() => setCollectionOpen(!collectionOpen)}
                className="group flex items-center gap-4 outline-none transition-opacity hover:opacity-70"
              >
                <div className="flex flex-col gap-1.5 items-start">
                  <motion.span
                    animate={
                      collectionOpen
                        ? { rotate: 45, y: 5, width: 22 }
                        : { rotate: 0, y: 0, width: 22 }
                    }
                    className="h-[1px] bg-white transition-all"
                  />
                  <motion.span
                    animate={
                      collectionOpen
                        ? { opacity: 0, x: -5 }
                        : { opacity: 1, x: 0, width: 14 }
                    }
                    className="h-[1px] bg-white transition-all"
                  />
                  <motion.span
                    animate={
                      collectionOpen
                        ? { rotate: -45, y: -5, width: 22 }
                        : { rotate: 0, y: 0, width: 22 }
                    }
                    className="h-[1px] bg-white transition-all"
                  />
                </div>
                <span className="text-[10px] tracking-[0.4em] font-light uppercase hidden lg:block">
                  {collectionOpen ? "Kapat" : "Menü"}
                </span>
              </button>
            </div>

            {/* ORTA: Logo (Mobilde sola kaydırılmış) */}
            <div className="flex-none flex justify-start md:justify-center -ml-18 md:ml-0 mb-4">
              <Link
                href="/"
                className="block transition-transform duration-500 hover:scale-[1.03]"
              >
                <Image
                  src="/logo/logo2.png"
                  alt="itals"
                  width={90}
                  height={32}
                  className="brightness-0 invert object-contain md:w-[180px] md:h-[64px]"
                  priority
                />
              </Link>
            </div>

            {/* SAĞ: Arama (Desktop) & İkonlar */}
            <div className="flex items-center justify-end gap-1 md:gap-5 flex-1 md:flex-1">
              {/* DESKTOP ARAMA (Sadece MD ve üzeri) */}
              {/* DESKTOP ARAMA (Sadece MD ve üzeri) */}
              <div
                ref={searchRef}
                className="relative hidden md:flex items-center"
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    initial={false}
                    animate={{
                      width: searchOpen ? 300 : 0, // Genişliği biraz artırdık
                      opacity: searchOpen ? 1 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 28 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center h-10 bg-white/10 backdrop-blur-md px-4 rounded-sm border border-white/5">
                      <input
                        autoFocus={searchOpen}
                        type="text"
                        placeholder="Koleksiyonlarda ara…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent text-[12px] text-white placeholder:text-white/30 focus:outline-none tracking-wide"
                      />
                      {searchQuery && (
                        <X
                          size={14}
                          className="text-white/40 cursor-pointer hover:text-white transition-colors"
                          onClick={() => setSearchQuery("")}
                        />
                      )}
                    </div>
                  </motion.div>
                  <button
                    onClick={() => setSearchOpen(!searchOpen)}
                    className="p-2.5 rounded-full hover:bg-white/10 transition-all active:scale-95"
                  >
                    <Search
                      size={18}
                      className={searchOpen ? "text-white" : "text-white/70"}
                    />
                  </button>
                </div>

                {/* Desktop Sonuçlar Popover - MOBİL STİLİNE UYARLANDI */}
                <AnimatePresence>
                  {searchOpen && searchQuery && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-4 w-[400px] bg-zinc-700/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-[60]"
                    >
                      {isLoadingProducts ? (
                        <div className="p-8 text-center text-[10px] tracking-[0.2em] text-white/30 uppercase animate-pulse">
                          Aranıyor...
                        </div>
                      ) : filteredProducts.length > 0 ? (
                        <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
                          {filteredProducts.map((product) => (
                            <Link
                              key={product.id}
                              href={`/products/${product.id}`}
                              className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-all border-b border-white/5 group"
                              onClick={() => {
                                setSearchOpen(false);
                                setSearchQuery("");
                              }}
                            >
                              {/* Ürün Görseli - Mobil Stili gibi kare/dikdörtgen temiz yapı */}
                              <div className="relative aspect-square w-23 h-16 bg-white overflow-hidden shrink-0">
                                <Image
                                  src={product.mainImage}
                                  alt={product.title}
                                  fill
                                  className="object-contain group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>

                              {/* Ürün Detayları */}
                              <div className="flex flex-col min-w-0 gap-0.5">
                                <p className="text-[11px] text-white/40 uppercase tracking-[0.1em] font-medium">
                                  {product.category}
                                </p>
                                <p className="text-[13px] text-white font-light group-hover:text-stone-300 transition-colors truncate">
                                  {product.title}
                                </p>
                                <p className="text-[12px] text-white/60 mt-1">
                                  {product.price.toLocaleString("tr-TR", {
                                    style: "currency",
                                    currency: "TRY",
                                  })}
                                </p>
                              </div>

                              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                <ChevronRight
                                  size={14}
                                  className="text-white/30"
                                />
                              </div>
                            </Link>
                          ))}

                          {/* Alt Bilgi */}
                          <div className="p-4 bg-white/5 text-center">
                            <Link href={`/products`}>
                              <button className="text-[9px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">
                                Tüm Sonuçları Gör
                              </button>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className="p-10 text-center flex flex-col items-center gap-2">
                          <span className="text-[11px] text-white/20 uppercase tracking-widest">
                            Sonuç Bulunamadı
                          </span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Favori & Profil & Sepet */}
              <Link
                href="/favorites"
                className="p-2 md:p-2.5 hover:bg-white/10 rounded-full transition-all relative"
              >
                <Heart
                  size={18}
                  strokeWidth={1.2}
                  className={
                    favorites.length > 0
                      ? "fill-white text-white"
                      : "text-white/70"
                  }
                />
                {favorites.length > 0 && (
                  <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-rose-500 rounded-full animate-pulse" />
                )}
              </Link>

              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="p-2 md:p-2.5 hover:bg-white/10 rounded-full transition-all"
              >
                <User size={18} strokeWidth={1.2} className="text-white/70" />
              </button>

              <div className="md:pl-1 md:border-l md:border-white/10">
                <CartDropdown />
              </div>
            </div>
          </div>

          {/* ALT SATIR: Mobil Arama Çubuğu (Sadece MD Altı) */}
          <div className="mt-1 md:hidden">
            <div className="relative flex items-center h-10 bg-white/10 backdrop-blur-md px-3 rounded-sm">
              <Search size={16} className="text-white/40 mr-2" />
              <input
                type="text"
                placeholder="Ürün veya koleksiyon ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                className="w-full bg-transparent text-[13px] text-white placeholder:text-white/30 focus:outline-none"
              />
              {searchQuery && (
                <X
                  size={14}
                  className="text-white/40"
                  onClick={() => setSearchQuery("")}
                />
              )}
            </div>

            {/* Mobil Arama Sonuçları */}
            <AnimatePresence>
              {searchOpen && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-4 right-4 top-full mt-2 bg-zinc-500/90 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden z-[60]"
                >
                  {isLoadingProducts ? (
                    <div className="p-4 text-center text-xs text-white/40">
                      Yükleniyor...
                    </div>
                  ) : filteredProducts.length > 0 ? (
                    <div className="max-h-[50vh] overflow-y-auto">
                      {filteredProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-3 p-3 border-b border-white/5 active:bg-white/10"
                        >
                          <div className="relative h-full w-1/5 p-4">
                            <Image
                              src={product.mainImage}
                              alt={product.title}
                              fill
                              className="object-contain bg-white"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[12px] text-white truncate">
                              {product.title}
                            </p>
                            <p className="text-[10px] text-white/40 uppercase tracking-tighter">
                              {product.category}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-white/40">
                      Sonuç bulunamadı
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Menü Bileşenleri */}
      <CollectionMegaMenu
        collectionOpen={collectionOpen}
        setCollectionOpen={setCollectionOpen}
        collectionLink={collectionLink}
      />
      <UserMegaMenu
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
      />
      <MobileNavSheet
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={[]}
      />
    </>
  );
}
