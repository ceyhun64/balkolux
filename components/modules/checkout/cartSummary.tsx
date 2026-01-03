// BasketSummaryCard.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCart, GuestCartItem } from "@/utils/cart";
import {
  ShoppingCart,
  Package,
  Edit3,
  Info,
  Receipt,
  TrendingUp,
  CheckCircle2,
  Truck,
} from "lucide-react";

const KDV_RATE = 0.1; // %10

interface Product {
  id: number;
  title: string;
  price: number; // Prisma: Int/Float
  mainImage: string;
}

interface BasketItem {
  id: number;
  product: Product;
  quantity: number;
}

interface BasketSummaryCardProps {
  selectedCargoFee: number;
}

export default function BasketSummaryCard({
  selectedCargoFee = 0,
}: BasketSummaryCardProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [guestItems, setGuestItems] = useState<GuestCartItem[]>([]);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch("/api/account/check", { method: "GET" });
        const data = await res.json();
        setIsLoggedIn(!!data.user);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn === null) return;

    const fetchCart = async () => {
      if (isLoggedIn) {
        try {
          const res = await fetch("/api/cart");
          if (res.ok) {
            const data = await res.json();
            // Prisma CartItem modelinden gelen veriyi eşle
            const items: BasketItem[] = data.map((item: any) => ({
              id: item.id,
              product: {
                id: item.product.id,
                title: item.product.title,
                price: item.product.price,
                mainImage: item.product.mainImage,
              },
              quantity: item.quantity,
            }));
            setBasketItems(items);
            setGuestItems([]);
          }
        } catch (err) {
          console.error("Cart fetch error:", err);
        }
      } else {
        const localCart = getCart();
        setGuestItems(localCart);
        setBasketItems([]);
      }
    };

    fetchCart();

    const handleCartUpdated = () => fetchCart();
    window.addEventListener("cartUpdated", handleCartUpdated);
    return () => window.removeEventListener("cartUpdated", handleCartUpdated);
  }, [isLoggedIn]);

  const itemsToRender = isLoggedIn
    ? basketItems
    : guestItems.map((item, i) => ({
        id: i,
        product: {
          id: item.productId,
          title: item.title,
          price: item.price,
          mainImage: item.image,
        },
        quantity: item.quantity,
      }));

  // Basitleştirilmiş Hesaplamalar
  const calculatedSubTotal = itemsToRender.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const calculatedKdv = calculatedSubTotal * KDV_RATE;
  const calculatedTotal = calculatedSubTotal + calculatedKdv + selectedCargoFee;

  if (isLoggedIn === null) {
    return (
      <Card className="sticky top-6">
        <CardContent className="py-8 flex flex-col items-center justify-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-sm text-gray-500">Yükleniyor...</p>
        </CardContent>
      </Card>
    );
  }

  if (itemsToRender.length === 0) {
    return (
      <Card className="sticky top-6">
        <CardContent className="py-12 text-center">
          <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="font-medium text-gray-900">Sepetiniz Boş</p>
          <Link href="/" className="mt-4 block">
            <Button className="w-full">Ürünlere Göz At</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  const displayedItems = isExpanded ? itemsToRender : itemsToRender.slice(0, 3);

  return (
    <Card className="sticky top-6 shadow-xl border-t-4 border-t-blue-600">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" /> Sipariş Özeti
          </CardTitle>
          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            {itemsToRender.length} Ürün
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 p-2 rounded-lg bg-gray-50 border border-gray-100"
            >
              <div className="relative w-12 h-12 bg-white rounded overflow-hidden flex-shrink-0 border">
                <Image
                  src={item.product.mainImage}
                  alt={item.product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate">
                  {item.product.title}
                </p>
                <p className="text-xs text-gray-500">{item.quantity} Adet</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">
                  ₺{(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {itemsToRender.length > 3 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full text-xs font-semibold text-blue-600 py-1"
          >
            {isExpanded
              ? "Daha Az Göster"
              : `+${itemsToRender.length - 3} Ürün Daha`}
          </button>
        )}

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-1">
              <Receipt className="w-4 h-4" /> Ara Toplam
            </span>
            <span className="font-medium">
              ₺{calculatedSubTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-1">
              <Truck className="w-4 h-4" /> Kargo
            </span>
            <span
              className={
                selectedCargoFee === 0
                  ? "text-green-600 font-bold"
                  : "font-medium"
              }
            >
              {selectedCargoFee === 0
                ? "ÜCRETSİZ"
                : `₺${selectedCargoFee.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> KDV (%10)
            </span>
            <span className="font-medium">₺{calculatedKdv.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-4 rounded-xl mt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[10px] uppercase tracking-wider opacity-70">
                Toplam Ödenecek
              </p>
              <p className="text-2xl font-bold">
                ₺{calculatedTotal.toFixed(2)}
              </p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg flex gap-2">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <p className="text-[11px] text-blue-800">
            Siparişiniz onaylandıktan sonra 24 saat içerisinde kargoya verilir.
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 border-t pt-4">
        <Link href="/cart" className="w-full">
          <Button variant="outline" className="w-full group">
            <Edit3 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
            Sepeti Düzenle
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
