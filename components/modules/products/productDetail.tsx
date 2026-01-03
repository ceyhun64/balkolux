"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  Share2,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ImageZoom } from "@/components/ui/shadcn-io/image-zoom";
import { addToGuestCart } from "@/utils/cart";
import { useFavorite } from "@/contexts/favoriteContext";
import ProductDetailSkeleton from "./productDetailSkeleton";
import { CustomImageZoom } from "./imageZoom";
import ProductTabs from "./productTabs";

interface ProductData {
  id: number;
  title: string;
  price: number;
  rating: number;
  reviewCount?: number;
  mainImage: string;
  subImage?: string;
  subImage2?: string;
  subImage3?: string;
  subImage4?: string;
  description: string;
  categoryId: number;
  category: { name: string };
}

export default function ProductDetailPage() {
  const params = useParams() as { id?: string };
  const productId = Number(params.id);

  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { isFavorited, addFavorite, removeFavorite } = useFavorite();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error("Ürün bulunamadı");
        const data = await res.json();
        setProduct(data.product);
      } catch (error) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    if (productId) fetchProduct();
  }, [productId]);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("/api/account/check", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setIsLoggedIn(!!data.user?.id);
        }
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  const handleAddToCart = async () => {
    if (!product) return;
    const item = {
      productId: product.id,
      quantity,
      title: product.title,
      price: product.price,
      image: product.mainImage,
    };

    if (!isLoggedIn) {
      addToGuestCart(item);
      toast.success("Ürün sepetinize eklendi");
      window.dispatchEvent(new CustomEvent("cartUpdated"));
      return;
    }

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity }),
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Ürün başarıyla sepete eklendi!");
        window.dispatchEvent(new CustomEvent("cartUpdated"));
      }
    } catch (error) {
      toast.error("İşlem sırasında bir hata oluştu.");
    }
  };

  if (loading) return <ProductDetailSkeleton />;
  if (!product)
    return (
      <div className="h-screen flex items-center justify-center font-light tracking-widest uppercase">
        Ürün bulunamadı.
      </div>
    );

  const images = [
    product.mainImage,
    product.subImage,
    product.subImage2,
    product.subImage3,
    product.subImage4,
  ].filter(Boolean) as string[];

  return (
    <div className="bg-background min-h-screen pb-20 pt-12 lg:pt-16">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* SOL: GÖRSEL GALERİSİ */}
          {/* SOL: GÖRSEL GALERİSİ */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <div className="relative group aspect-[16/11] bg-white overflow-hidden ring-1 ring-gray-100">
              {/* Yeni Birleştirilmiş Bileşenimiz */}
              <CustomImageZoom src={images[activeIndex]} alt={product.title} />

              {/* Yön Okları */}
              {images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Modal'ın açılmasını engeller
                      setActiveIndex((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1
                      );
                    }}
                    className="pointer-events-auto p-3 bg-white/90 hover:bg-black hover:text-white rounded-full shadow-sm transition-all duration-300"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Modal'ın açılmasını engeller
                      setActiveIndex((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1
                      );
                    }}
                    className="pointer-events-auto p-3 bg-white/90 hover:bg-black hover:text-white rounded-full shadow-sm transition-all duration-300"
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnail Navigation (Mevcut kodunuzdaki gibi kalabilir) */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "relative w-40 h-24 flex-shrink-0 transition-all duration-300 border",
                    activeIndex === i
                      ? "border-black scale-95"
                      : "border-transparent opacity-90 hover:opacity-100"
                  )}
                >
                  <Image
                    src={img}
                    alt="thumb"
                    fill
                    className="object-contain bg-white" // 'cover' yerine 'contain' kullanarak görselin tamamını sığdırıyoruz
                  />
                </button>
              ))}
            </div>
          </div>

          {/* SAĞ: SATIN ALMA ALANI */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-8">
            <header className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                <span>{product.category?.name || "Koleksiyon"}</span>
                <span>/</span>
                <span className="text-gray-600">Premium Seri</span>
              </div>
              <h1 className="text-3xl xl:text-4xl font-light text-[#1A1A1A] tracking-tight leading-[1.1]">
                {product.title}
              </h1>
            </header>

            {/* Lüks Fiyat Alanı */}
            <div className="flex items-center gap-6 py-6 border-y border-gray-100">
              <div className="bg-[#1A1A1A] text-white w-16 h-16 flex flex-col items-center justify-center text-sm font-bold tracking-tighter leading-none">
                <span className="text-[10px] font-normal opacity-70">
                  İndirim
                </span>
                <span className="text-xl">%30</span>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 line-through text-sm tracking-wide">
                  {(product.price * 1.4).toLocaleString("tr-TR", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  TL
                </p>
                <p className="text-4xl font-semibold text-[#1A1A1A] tracking-tighter">
                  {product.price.toLocaleString("tr-TR", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  <span className="text-xl font-normal">TL</span>
                </p>
                <p className="text-[11px] text-green-600 font-medium uppercase tracking-wider">
                  Kredi Kartına 9 Taksit Avantajı
                </p>
              </div>
            </div>

            {/* Bilgi Kutuları */}
            <div className="grid grid-cols-2 gap-px bg-gray-100 border border-gray-100 overflow-hidden">
              <div className="bg-white p-4 flex flex-col gap-1">
                <span className="text-[10px] uppercase text-gray-400 tracking-widest">
                  Kategori
                </span>
                <span className="text-sm font-medium">
                  {product.category?.name || "Mobilya"}
                </span>
              </div>
              <div className="bg-white p-4 flex flex-col gap-1">
                <span className="text-[10px] uppercase text-gray-400 tracking-widest">
                  Durum
                </span>
                <span className="text-sm font-medium text-green-600">
                  Stokta Mevcut
                </span>
              </div>
            </div>

            {/* Eylemler */}
            <div className="space-y-6 pt-4">
              <div className="space-y-3">
                <label className="text-[11px] uppercase tracking-[0.1em] font-semibold text-gray-500">
                  Adet Seçimi
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-black/10 h-14 bg-white">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-5 hover:bg-gray-50 transition-colors h-full"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-12 text-center font-medium text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-5 hover:bg-gray-50 transition-colors h-full"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 h-14 bg-[#1A1A1A] hover:bg-black text-white rounded-none font-bold uppercase text-[11px] tracking-[0.2em] transition-all duration-300"
                  >
                    Sepete Ekle
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    isFavorited(product.id)
                      ? removeFavorite(product.id)
                      : addFavorite(product.id)
                  }
                  className="flex-1 flex items-center justify-center gap-2 h-12 border border-gray-200 hover:border-black transition-all text-[11px] uppercase tracking-widest"
                >
                  <Heart
                    size={16}
                    className={cn(
                      isFavorited(product.id) && "fill-red-500 text-red-500"
                    )}
                  />
                  {isFavorited(product.id) ? "Favorilerimde" : "Favoriye Ekle"}
                </button>
                <button className="w-14 flex items-center justify-center h-12 border border-gray-200 hover:border-black transition-all">
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            {/* Lüks Güven Bilgileri */}
            <div className="pt-8 space-y-4">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <Truck size={18} className="text-gray-400" />
                <span>2-4 İş Günü İçinde Ücretsiz Teslimat</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <ShieldCheck size={18} className="text-gray-400" />
                <span>2 Yıl Marka Garantisi & Teknik Destek</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Bölüm */}
        <div className=" border-t border-gray-100 ">
          <ProductTabs 
            productId={product.id} 
            productTitle={product.title}
            productPrice={product.price}
            productDescription={product.description}
          />
        </div>
      </div>
    </div>
  );
}