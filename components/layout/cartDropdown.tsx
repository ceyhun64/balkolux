"use client";

import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import CartItemDropdown from "./cartItem";
import {
  getCart,
  updateGuestCartQuantity,
  removeFromGuestCart,
  GuestCartItem,
} from "@/utils/cart";
import { Skeleton } from "@/components/ui/skeleton";

// ✅ Prisma modeline uygun Product interface'i
interface Product {
  id: number;
  title: string;
  price: number; // Prisma'da Int
  mainImage: string;
}

// ✅ Yeni şemaya uygun sadeleştirilmiş CartItemType
export interface CartItemType {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

interface CartDropdownProps {
  showCount?: boolean;
  guest?: boolean;
}

const CartDropdown = forwardRef(
  ({ showCount = true, guest = false }: CartDropdownProps, ref) => {
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkLogin = useCallback(async (): Promise<boolean> => {
      try {
        const res = await fetch("/api/account/check", {
          method: "GET",
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

    const fetchCart = useCallback(async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/cart", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("API hatası");
        const data = await res.json();
        setCartItems(data);
      } catch (err) {
        setCartItems([]);
      } finally {
        setIsLoading(false);
      }
    }, []);

    const loadGuestCart = useCallback(() => {
      try {
        const cart = getCart();
        const guestCart = cart.map((item: GuestCartItem) => ({
          id: item.productId,
          productId: item.productId,
          quantity: item.quantity,
          product: {
            id: item.productId,
            title: item.title,
            price: item.price,
            mainImage: item.image,
          },
        }));
        setCartItems(guestCart);
      } catch (err) {
        console.error("Guest cart error", err);
      } finally {
        setIsLoading(false);
      }
    }, []);

    useEffect(() => {
      (async () => {
        const logged = await checkLogin();
        if (logged && !guest) await fetchCart();
        else loadGuestCart();
      })();
    }, [checkLogin, fetchCart, loadGuestCart, guest]);

    useEffect(() => {
      if (isOpen) {
        if (isLoggedIn && !guest) fetchCart();
        else loadGuestCart();
      }
    }, [isOpen, isLoggedIn, fetchCart, loadGuestCart, guest]);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      refreshCart: () => {
        if (isLoggedIn && !guest) fetchCart();
        else loadGuestCart();
      },
    }));

    useEffect(() => {
      const handleCartUpdate = () => {
        if (isLoggedIn && !guest) fetchCart();
        else loadGuestCart();
      };
      window.addEventListener("cartUpdated", handleCartUpdate);
      return () => window.removeEventListener("cartUpdated", handleCartUpdate);
    }, [isLoggedIn, fetchCart, loadGuestCart, guest]);

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

        if (!res.ok) {
          toast.error("Miktar güncellenemedi");
          return;
        }

        const updatedItem = await res.json();
        setCartItems((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, quantity: updatedItem.quantity } : c
          )
        );
      } catch (err) {
        toast.error("Miktar güncellenemedi");
      }
    };

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
          toast.success("Ürün kaldırıldı");
        }
      } catch {
        toast.error("Ürün kaldırılamadı");
      }
    };

    // ✅ Sadeleştirilmiş hesaplama: price * quantity
    const subtotal = cartItems.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="relative" size="icon">
            <ShoppingCart className="h-7 w-7 stroke-[1.5px]" />
            {showCount && cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#7B0323] text-white text-[10px] flex items-center justify-center font-bold">
                {cartItems.length}
              </span>
            )}
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="z-[2000] p-4 w-full max-w-sm h-full fixed top-0 right-0 bg-white/95 backdrop-blur-md border-l border-gray-100 flex flex-col"
        >
          <SheetHeader className="pb-4 border-b border-gray-100 mb-4">
            <SheetTitle className="text-xl font-bold text-gray-900">
              Sepetim
            </SheetTitle>
            <SheetDescription className="text-gray-500 text-xs">
              Ürünlerinizi kontrol edip düzenleyebilirsiniz.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="w-20 h-20 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4 text-gray-500">
                <ShoppingCart className="h-12 w-12 text-gray-300" />
                <p className="text-lg font-medium">Sepetiniz boş</p>
                <SheetClose asChild>
                  <Link href="/products">
                    <Button variant="outline" className="rounded-full px-8">
                      Göz At
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            ) : (
              cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CartItemDropdown
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                  />
                </motion.div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 pt-4 mt-auto space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Ara Toplam</span>
                  <span>₺{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-dotted">
                  <span>Genel Toplam</span>
                  <span>₺{subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Link href="/checkout" className="w-full">
                  <Button className="w-full bg-[#7B0323] hover:bg-[#5E021A] text-white rounded-xl py-6 font-semibold">
                    Ödemeye Geç
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/cart" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full rounded-xl py-6 text-gray-700"
                  >
                    Sepete Git
                  </Button>
                </Link>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="w-full text-gray-400 text-sm"
                  >
                    Alışverişe Devam Et
                  </Button>
                </SheetClose>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    );
  }
);

CartDropdown.displayName = "CartDropdown";

export default CartDropdown;
