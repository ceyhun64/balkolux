"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  Menu,
  Heart,
  User,
  PhoneOutgoing,
  Sparkles,
  MessageCircleQuestion,
  Feather,
  LayoutGrid,
  Layers,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import CartDropdown from "./cartDropdown";
import { getGuestCartCount } from "@/utils/cart";
import { useFavorite } from "@/contexts/favoriteContext";

import MobileNavSheet from "./mobileNavSheet";
import CollectionMegaMenu from "./collectionMegaMenu";
import UserMegaMenu from "./userMegaMenu";

export default function Navbar() {
  const pathname = usePathname() || "/";
  const isHomePage = pathname === "/"; // Ana sayfa kontrolü

  const links = [
    { label: "Anasayfa", href: "/", icon: LayoutGrid },
    {
      label: "Menu",
      href: "/products",
      icon: Layers,
      subItems: [
        { label: "Oturma Takımları", href: "/products/rustic" },
        { label: "Masa Takımları", href: "/products/sheer" },
        { label: "Salıncak", href: "/products/drapes" },
        { label: "Şezlong", href: "/products/plicell" },
        { label: "Şemsiye", href: "/products/accessories" },
        { label: "Barbekü", href: "/products/accessories" },
      ],
    },
    { label: "Hakkımızda", href: "/about", icon: Sparkles },
    { label: "Bize Ulaşın", href: "/contact", icon: PhoneOutgoing },
    { label: "S.S.S", href: "/faq", icon: MessageCircleQuestion },
    { label: "Moda Blog", href: "/blog", icon: Feather },
  ];

  const collectionLink = links.find((l) => l.label === "Menu")!;
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(
    null
  );
  const { favorites } = useFavorite();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch("/api/favorites", { credentials: "include" });
        if (res.status === 401) {
          setFavoriteCount(0);
          return;
        }
        if (!res.ok) return;
        const data = await res.json();
        setFavoriteCount(data.length);
      } catch {
        setFavoriteCount(0);
      }
    };
    fetchFavorites();
    const handleFavoriteChange = (e: any) =>
      setFavoriteCount((prev) => prev + e.detail);
    window.addEventListener("favoriteChanged", handleFavoriteChange);
    return () =>
      window.removeEventListener("favoriteChanged", handleFavoriteChange);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("/api/account/check");
        const data = await res.json();
        setUser(data.user || null);
      } catch (error) {
        setUser(null);
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    if (!user) {
      const updateCart = () => {
        const count = getGuestCartCount();
        window.dispatchEvent(
          new CustomEvent("cartCountUpdated", { detail: count })
        );
      };
      updateCart();
      window.addEventListener("cartUpdated", updateCart);
      return () => window.removeEventListener("cartUpdated", updateCart);
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Renk Mantığı
  const getNavbarBg = () => {
    if (scrolled) return "bg-zinc-800/50 backdrop-blur-2xl py-3 shadow-sm";

    // Scroll edilmediğinde:
    return isHomePage
      ? "bg-transparent backdrop-blur-xs py-6" // Ana sayfada şeffaf
      : "bg-zinc-700/50 backdrop-blur-2xl py-6 sticky"; // Diğer sayfalarda zinc-700
  };

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 
          transition-all duration-500 ease-in-out
          text-white
          ${getNavbarBg()}
        `}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* 1. SOL: Minimal Menü Butonu */}
          <div className="flex-1 flex items-center">
            <button
              onClick={() => setCollectionOpen(!collectionOpen)}
              className="group flex items-center gap-3 hover:opacity-70 transition-all"
            >
              <div className="relative w-6 h-5">
                <span
                  className={`absolute w-6 h-[1.2px] bg-white transition-all duration-300 ${
                    collectionOpen ? "top-2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute w-4 h-[1.2px] bg-white top-[9px] transition-all duration-300 ${
                    collectionOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute w-6 h-[1.2px] bg-white transition-all duration-300 ${
                    collectionOpen ? "top-2 -rotate-45" : "top-[18px]"
                  }`}
                />
              </div>
              <span className="text-[11px] tracking-[0.3em] font-light hidden lg:block uppercase">
                Menü
              </span>
            </button>
          </div>

          {/* 2. ORTA: Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="block transition-transform duration-300 hover:scale-[1.02]"
            >
              <Image
                src="/logo/logo2.png"
                alt="itals"
                width={160}
                height={60}
                className="brightness-0 invert object-contain"
                priority
              />
            </Link>
          </div>

          {/* 3. SAĞ: Minimal Aksiyonlar */}
          <div className="flex-1 flex items-center justify-end gap-2 md:gap-5">
            <button className="p-2.5 hover:bg-white/10 rounded-full transition-colors group">
              <Search className="h-5 w-5 stroke-[1.5px] group-hover:scale-110 transition-transform" />
            </button>

            <Link
              href="/favorites"
              className="relative p-2.5 hover:bg-white/10 rounded-full transition-colors group"
            >
              <Heart
                className={`h-5 w-5 stroke-[1.5px] group-hover:scale-110 transition-transform ${
                  favorites.length > 0 ? "fill-white" : ""
                }`}
              />
              {favorites.length > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-zinc-800" />
              )}
            </Link>

            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="p-2.5 hover:bg-white/10 rounded-full transition-colors group"
            >
              <User className="h-5 w-5 stroke-[1.5px] group-hover:scale-110 transition-transform" />
            </button>

            <div className="pl-2 ml-2 border-l border-white/10">
              <CartDropdown />
            </div>
          </div>
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 h-[1px] bg-white/5 transition-opacity ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
      </nav>

      <CollectionMegaMenu
        collectionOpen={collectionOpen}
        setCollectionOpen={setCollectionOpen}
        collectionLink={collectionLink}
      />
      <UserMegaMenu
        user={user}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        scrolled={scrolled}
        pathname={pathname}
      />
      <MobileNavSheet
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={[]}
      />
    </>
  );
}
