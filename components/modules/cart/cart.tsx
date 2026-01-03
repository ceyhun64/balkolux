"use client";

import React, { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import CartItem from "./cartItem";
import CartSummary from "./cartSummary";
import { Button } from "../../ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

import {
  getCart,
  updateGuestCartQuantity,
  removeFromGuestCart,
  GuestCartItem,
} from "@/utils/cart";

interface Product {
  id: number;
  title: string;
  price: number; // Prisma: Int
  mainImage: string;
  category: string;
}

export interface CartItemType {
  id: number;
  product: Product;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLogin = useCallback(async (): Promise<boolean> => {
    try {
      const res = await fetch("/api/account/check", {
        credentials: "include",
      });

      if (!res.ok) {
        setIsLoggedIn(false);
        return false;
      }

      const data = await res.json();
      const logged = !!data?.user?.id;
      setIsLoggedIn(logged);
      return logged;
    } catch {
      setIsLoggedIn(false);
      return false;
    }
  }, []);

  const loadGuestCart = useCallback(() => {
    try {
      const cart = getCart();
      const guestCart = cart.map((item: GuestCartItem) => ({
        id: item.productId,
        quantity: item.quantity,
        product: {
          id: item.productId,
          title: item.title,
          price: item.price,
          mainImage: item.image,
          category: item.category || "Genel",
        },
      }));
      setCartItems(guestCart);
    } catch (err) {
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/cart", { credentials: "include" });

      if (!res.ok) throw new Error("Sepet verisi alınamadı");

      const data = await res.json();
      setCartItems(data);
    } catch {
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const logged = await checkLogin();
      if (logged) await fetchCart();
      else loadGuestCart();
    })();
  }, [checkLogin, fetchCart, loadGuestCart]);

  // ---------- Quantity Update ----------
  const handleQuantityChange = async (id: number, delta: number) => {
    if (!isLoggedIn) {
      updateGuestCartQuantity(id, delta);
      loadGuestCart();
      return;
    }

    const item = cartItems.find((c) => c.id === id);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);

    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
        credentials: "include",
      });

      if (res.ok) {
        const updatedItem = await res.json();
        setCartItems((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, quantity: updatedItem.quantity } : c
          )
        );
      } else {
        toast.error("Güncelleme başarısız");
      }
    } catch {
      toast.error("Miktar güncellenemedi");
    }
  };

  // ---------- Remove ----------
  const handleRemove = async (id: number) => {
    if (!isLoggedIn) {
      removeFromGuestCart(id);
      loadGuestCart();
      return;
    }

    try {
      const res = await fetch(`/api/cart/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setCartItems((prev) => prev.filter((c) => c.id !== id));
        toast.success("Ürün sepetten kaldırıldı");
      }
    } catch {
      toast.error("Ürün kaldırılamadı");
    }
  };

  // ✅ Yeni sadeleştirilmiş subtotal hesabı: price * quantity
  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product.price || 0;
    const quantity = item.quantity || 1;
    return acc + price * quantity;
  }, 0);

  if (isLoading) {
    return (
      <div className="container mx-auto px-3 md:px-40 py-8 md:py-16 mb-12">
        <Skeleton className="h-10 w-48 mx-auto mb-12" />
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 border rounded-lg"
              >
                <Skeleton className="w-24 h-24 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))}
          </div>
          <div className="w-full md:w-80 p-6 border rounded-lg space-y-4">
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  const EmptyCart = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-gray-500">
      <div className="p-6 bg-gray-50 rounded-full">
        <ShoppingBag className="h-16 w-16 text-gray-300" />
      </div>
      <p className="text-xl font-semibold text-gray-900">Sepetiniz şu an boş</p>
      <p className="text-sm text-gray-400 text-center max-w-xs">
        Görünüşe göre henüz sepetinize bir ürün eklemediniz.
      </p>
      <Link href="/products">
        <Button className="mt-4 bg-[#7B0323] hover:bg-[#5E021A] text-white rounded-full px-8 py-6">
          Alışverişe Başla
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="container mx-auto px-3 md:px-40 py-8 md:py-16 mb-12">
      {cartItems.length > 0 && (
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Sepetim
        </h1>
      )}

      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={() => handleQuantityChange(item.id, 1)}
                onDecrease={() => handleQuantityChange(item.id, -1)}
                onRemove={() => handleRemove(item.id)}
              />
            ))}
          </div>

          <div className="w-full lg:w-[380px]">
            <CartSummary subtotal={subtotal} />
          </div>
        </div>
      )}
    </div>
  );
}
