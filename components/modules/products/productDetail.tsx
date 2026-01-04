"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Heart,
  Minus,
  Plus,
  Share2,
  Truck,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { CustomImageZoom } from "./imageZoom";
import ProductTabs from "./productTabs";
import ProductDetailSkeleton from "./productDetailSkeleton";
import { useFavorite } from "@/contexts/favoriteContext";
import { addToGuestCart } from "@/utils/cart";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams() as { id?: string };
  const productId = Number(params.id);

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { isFavorited, addFavorite, removeFavorite } = useFavorite();

  const cartDropdownRef = useRef<{ open: () => void; refreshCart: () => void }>(
    null
  );

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${productId}`);
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
        if (!res.ok) return setIsLoggedIn(false);
        const data = await res.json();
        setIsLoggedIn(!!data.user?.id);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  const handleAddToCart = async () => {
    if (!product) {
      toast.error("Ürün bilgisi bulunamadı.");
      return;
    }

    const item = {
      productId: product.id,
      quantity,
      title: product.title,
      price: product.price,
      image: product.mainImage,
    };

    // Misafir kullanıcı için sepete ekle
    if (!isLoggedIn) {
      addToGuestCart(item);
      toast.success("Ürün sepete eklendi.");
      window.dispatchEvent(new CustomEvent("cartUpdated"));
      return;
    }

    // Giriş yapmış kullanıcı için API'ye gönder
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(
          `Ürün sepete eklendi! Toplam: ₺${(
            product.price * quantity
          ).toLocaleString("tr-TR")}`
        );
        window.dispatchEvent(new CustomEvent("cartUpdated"));
        cartDropdownRef.current?.open?.();
        cartDropdownRef.current?.refreshCart?.();
      } else {
        toast.error(data.error || "Sepete eklenemedi");
      }
    } catch (error) {
      console.error(error);
      toast.error("Sepete ekleme sırasında bir hata oluştu.");
    }
  };

  if (loading) return <ProductDetailSkeleton />;
  if (!product)
    return (
      <div className="h-screen flex items-center justify-center italic text-stone-400">
        Ürün bulunamadı.
      </div>
    );

  const images = [
    product.mainImage,
    product.subImage,
    product.subImage2,
    product.subImage3,
    product.subImage4,
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-zinc-50 text-stone-800">
      {/* Üst Navigasyon */}
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-stone-400 hover:text-stone-800 transition-colors"
        >
          <ArrowLeft size={14} /> Koleksiyona Dön
        </Link>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
          {/* SOL: GÖRSEL GALERİSİ */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative aspect-[4/5] md:aspect-[16/11] bg-white overflow-hidden border border-stone-100">
              <CustomImageZoom src={images[activeIndex]} alt={product.title} />
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar justify-center">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "relative w-24 h-16 flex-shrink-0 transition-all duration-500 border-b-2 py-2",
                    activeIndex === i
                      ? "border-stone-800 opacity-100"
                      : "border-transparent opacity-40 hover:opacity-70"
                  )}
                >
                  <Image
                    src={img}
                    alt="thumb"
                    fill
                    className="object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* SAĞ: SATIN ALMA ALANI */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <div className="sticky top-12 space-y-12">
              {/* Başlık ve Kategori */}
              <header className="space-y-4">
                <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-stone-400 font-medium">
                  <span>{product.category?.name}</span>
                  <span className="w-1 h-1 rounded-full bg-stone-200" />
                  <span>Premium Seri</span>
                </div>
                <h1 className="text-4xl xl:text-5xl font-extralight tracking-tighter text-stone-900 italic leading-[1.1]">
                  {product.title}
                </h1>
              </header>

              {/* Fiyat Alanı */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-light tracking-tighter text-stone-900">
                    {product.price.toLocaleString("tr-TR")} TL
                  </span>
                  <span className="text-sm text-stone-400 line-through font-light">
                    {(product.price * 1.4).toLocaleString("tr-TR")} TL
                  </span>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-green-600 font-semibold">
                  Ücretsiz Kargo & 9 Taksit
                </p>
              </div>

              {/* Satın Alma Aksiyonları */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  {/* Adet Seçici */}
                  <div className="flex items-center border border-stone-200 h-14 px-4 gap-6">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="text-stone-400 hover:text-stone-800 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-4 text-center text-sm font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="text-stone-400 hover:text-stone-800 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Sepete Ekle */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 h-14 bg-stone-900 text-white text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-stone-800 transition-all duration-500"
                  >
                    Sepete Ekle
                  </button>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      isFavorited(product.id)
                        ? removeFavorite(product.id)
                        : addFavorite(product.id)
                    }
                    className="flex-1 h-12 border border-stone-200 flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest hover:border-stone-800 transition-all"
                  >
                    <Heart
                      size={14}
                      className={cn(
                        isFavorited(product.id) &&
                          "fill-stone-800 text-stone-800"
                      )}
                    />
                    {isFavorited(product.id) ? "Favorilerde" : "Favoriye Ekle"}
                  </button>
                  <button className="w-12 h-12 border border-stone-200 flex items-center justify-center hover:border-stone-800 transition-all">
                    <Share2 size={14} className="text-stone-400" />
                  </button>
                </div>
              </div>

              {/* İkonlu Bilgiler */}
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <div className="flex items-center gap-4 text-[11px] text-stone-500 tracking-wide font-light">
                  <Truck size={16} strokeWidth={1} />
                  <span>Tüm Türkiye'ye ücretsiz sigortalı gönderim</span>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-stone-500 tracking-wide font-light">
                  <ShieldCheck size={16} strokeWidth={1} />
                  <span>2 Yıl Moda Perde tasarım garantisi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detay Tabları */}
        <div className="mt-32">
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
