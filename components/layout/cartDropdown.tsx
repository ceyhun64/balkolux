"use client";

import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { ShoppingCart, ArrowRight, Minus } from "lucide-react";
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

interface Product {
  id: number;
  title: string;
  price: number;
  mainImage: string;
}

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

    const subtotal = cartItems.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className=" relative p-2.5 hover:bg-white/10 rounded-full transition-colors group">
            <ShoppingCart className="h-5 w-5 stroke-[1.5px] group-hover:scale-110 transition-transform" />
            <AnimatePresence>
              {showCount && cartItems.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-white text-stone-900 text-[9px] flex items-center justify-center font-medium"
                >
                  {cartItems.length}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="z-[2000] p-0 w-full max-w-md h-full fixed top-0 right-0 bg-white border-l border-stone-100 flex flex-col"
        >
          {/* Header */}
          <div className="p-8 pb-6 border-b border-stone-100">
            <div className="flex items-start justify-between mb-2">
              <div>
                <SheetTitle>
                  <span className="text-[10px] tracking-[0.4em] text-zinc-400 uppercase font-bold">
                    Sepetiniz
                  </span>
                </SheetTitle>
                <SheetDescription className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium">
                  {cartItems.length} Ürün
                </SheetDescription>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="w-24 h-24 rounded-sm" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-3 w-3/4" />
                      <Skeleton className="h-3 w-1/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
                <div className="w-20 h-20 rounded-full bg-stone-50 flex items-center justify-center">
                  <ShoppingCart className="h-8 w-8 text-stone-300 stroke-[1.5px]" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-serif text-stone-900">
                    Sepetiniz Boş
                  </p>
                  <p className="text-xs text-stone-400 uppercase tracking-wider">
                    Henüz ürün eklemediniz
                  </p>
                </div>
                <SheetClose asChild>
                  <Link href="/products">
                    <Button
                      variant="outline"
                      className="rounded-none border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-300 px-8 h-11 text-[10px] uppercase tracking-[0.3em] font-medium"
                    >
                      Koleksiyona Göz At
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence>
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <CartItemDropdown
                        item={item}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemove}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-stone-100 p-8 space-y-6 bg-stone-50/30">
              {/* Toplam */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-medium">
                    Ara Toplam
                  </span>
                  <span className="text-sm text-stone-600 font-light">
                    ₺
                    {subtotal.toLocaleString("tr-TR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="h-[1px] bg-stone-200" />
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-xs uppercase tracking-[0.2em] text-stone-900">
                    Toplam
                  </span>
                  <span className="text-xl text-stone-900">
                    ₺
                    {subtotal.toLocaleString("tr-TR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <SheetClose asChild>
                  <Link href="/checkout" className="block">
                    <Button className="w-full bg-stone-950 hover:bg-stone-900 text-white rounded-none h-14 font-medium text-[11px] uppercase tracking-[0.3em] group transition-all duration-300">
                      Ödemeye Geç
                      <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href="/cart" className="block">
                    <Button
                      variant="outline"
                      className="w-full rounded-none h-12 border-stone-200 text-stone-700 hover:bg-stone-50 text-[10px] uppercase tracking-[0.25em] font-medium"
                    >
                      Sepeti Görüntüle
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="w-full text-stone-400 hover:text-stone-600 text-[9px] uppercase tracking-[0.2em] h-10"
                  >
                    Alışverişe Devam
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
