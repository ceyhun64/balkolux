"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./sideBar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import Link from "next/link";
import { ShoppingBag, Package, ChevronRight, MapPin } from "lucide-react";

// ==== Tip Tanımları ====
interface Address {
  id: string | number;
  type: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  neighborhood?: string;
  district: string;
  city: string;
  zip?: string;
  country: string;
}

interface Product {
  id: number;
  title: string;
  category: string;
  mainImage: string;
  pricePerM2?: number;
}

interface OrderItem {
  id: string | number;
  product: Product;
  quantity: number;
  totalPrice: number;
  m2?: number;
  width?: number;
  height?: number;
  profile?: string;
  device?: string;
  note?: string;
}

interface Order {
  id: string | number;
  createdAt: string;
  updatedAt?: string;
  status: string;
  paidPrice: number;
  totalPrice: number;
  currency: string;
  paymentMethod?: string;
  transactionId?: string;
  addresses: Address[];
  items: OrderItem[];
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/order/user", { method: "GET" });
      const data = await res.json();
      if (data.status === "success") setOrders(data.orders);
      else toast.error("Siparişler alınamadı.");
    } catch (err) {
      toast.error("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId: string | number) => {
    try {
      const res = await fetch("/api/order/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();
      if (data.status === "success") {
        toast.success("Sipariş başarıyla iptal edildi.");
        fetchOrders();
      } else toast.error(data.error || "Sipariş iptal edilemedi.");
    } catch (err) {
      toast.error("Bir hata oluştu.");
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "cancelled":
        return "text-red-400 border-red-100 bg-red-50/30";
      case "delivered":
        return "text-emerald-500 border-emerald-100 bg-emerald-50/30";
      case "shipped":
        return "text-blue-500 border-blue-100 bg-blue-50/30";
      default:
        return "text-zinc-500 border-zinc-100 bg-zinc-50/30";
    }
  };

  const getStatusInTurkish = (status: string) => {
    const statuses: Record<string, string> = {
      pending: "Beklemede",
      paid: "Hazırlanıyor",
      shipped: "Kargoda",
      delivered: "Teslim Edildi",
      cancelled: "İptal Edildi",
    };
    return statuses[status] || "İşleniyor";
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <Sidebar />

      <main className="flex-1 px-6 py-12 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          {/* Minimal Header */}
          <header className="mb-20 space-y-4">
            <h1 className="text-4xl font-extralight tracking-tighter text-zinc-900 uppercase">
              Siparişlerim
            </h1>
            <div className="h-[1px] w-12 bg-zinc-900" />
            <p className="text-[11px] tracking-[0.2em] text-zinc-400 uppercase">
              Tüm siparişlerinizin detaylarını buradan takip edebilirsiniz.
            </p>
          </header>

          {loading ? (
            <div className="space-y-12">
              {[1, 2].map((i) => (
                <Skeleton
                  key={i}
                  className="h-40 w-full rounded-none bg-zinc-50"
                />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="py-24 text-center border-t border-zinc-100">
              <p className="text-xs tracking-widest text-zinc-400 uppercase mb-8">
                Henüz bir siparişiniz bulunmuyor
              </p>
              <Button
                asChild
                className="rounded-none bg-zinc-950 text-white px-10 py-6 text-[10px] tracking-widest uppercase hover:bg-zinc-800 transition-all"
              >
                <Link href="/products">Alışverişe Başla</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-24">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="group border-b border-zinc-100 pb-12 last:border-0"
                >
                  {/* Order Meta Bar */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] tracking-[0.3em] text-zinc-300 uppercase font-semibold">
                        ID #{order.id}
                      </span>
                      <h3 className="text-sm font-medium text-zinc-900">
                        {new Date(order.createdAt).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </h3>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <span className="block text-[10px] tracking-widest text-zinc-300 uppercase mb-1">
                          Durum
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-widest border px-3 py-1 ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {getStatusInTurkish(order.status)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] tracking-widest text-zinc-300 uppercase mb-1">
                          Tutar
                        </span>
                        <span className="text-sm font-semibold text-zinc-900">
                          {order.totalPrice.toLocaleString("tr-TR")}{" "}
                          {order.currency === "TRY" ? "₺" : order.currency}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Items & Logistics Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Products list */}
                    <div className="lg:col-span-7 space-y-6">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-6 items-center">
                          <div className="relative h-24 w-20 bg-zinc-50 overflow-hidden">
                            <img
                              src={item.product.mainImage}
                              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                              alt={item.product.title}
                            />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-[11px] font-bold uppercase tracking-tight text-zinc-800 leading-tight">
                              {item.product.title}
                            </h4>
                            <p className="text-[10px] text-zinc-400 uppercase tracking-widest">
                              {item.width}x{item.height}cm • {item.quantity}{" "}
                              Adet
                            </p>
                            <p className="text-[10px] text-zinc-500 font-light italic">
                              {item.profile || "Standart Profile"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Logistics & Actions */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
                      <div className="flex items-start gap-3 bg-zinc-50/50 p-4">
                        <MapPin size={14} className="text-zinc-400 mt-0.5" />
                        <div className="space-y-1">
                          <p className="text-[10px] tracking-widest text-zinc-400 uppercase font-medium">
                            Teslimat Adresi
                          </p>
                          <p className="text-[11px] leading-relaxed text-zinc-500 font-light italic">
                            {order.addresses
                              .find((a) => a.type === "shipping")
                              ?.address.substring(0, 80)}
                            ...
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 self-end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="link"
                              className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 hover:text-zinc-950 p-0 h-auto"
                            >
                              Detaylı Bilgi{" "}
                              <ChevronRight size={12} className="ml-1" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="rounded-none border-zinc-100 max-w-lg">
                            <DialogHeader>
                              <DialogTitle className="text-sm uppercase tracking-widest">
                                Sipariş Detayı #{order.id}
                              </DialogTitle>
                              <DialogDescription className="text-xs pt-4 space-y-2">
                                <div className="flex justify-between border-b pb-2">
                                  <span>Ödeme Yöntemi:</span>{" "}
                                  <span className="font-medium">
                                    {order.paymentMethod}
                                  </span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                  <span>İşlem ID:</span>{" "}
                                  <span className="font-mono">
                                    {order.transactionId || "—"}
                                  </span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                  <span>Güncelleme:</span>{" "}
                                  <span>
                                    {new Date(
                                      order.updatedAt || ""
                                    ).toLocaleString("tr-TR")}
                                  </span>
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>

                        {["pending", "paid"].includes(order.status) && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                className="text-[10px] tracking-[0.2em] uppercase text-zinc-300 hover:text-red-500 hover:bg-transparent p-0 h-auto transition-colors"
                              >
                                Siparişi İptal Et
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="rounded-none">
                              <DialogHeader>
                                <DialogTitle className="text-sm tracking-widest uppercase">
                                  İptal İşlemi
                                </DialogTitle>
                                <DialogDescription className="text-xs italic pt-2">
                                  #{order.id} numaralı siparişi iptal etmek
                                  istediğinize emin misiniz?
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                  <Button
                                    variant="outline"
                                    className="rounded-none text-xs uppercase tracking-widest"
                                  >
                                    Vazgeç
                                  </Button>
                                </DialogClose>
                                <Button
                                  onClick={() => handleCancelOrder(order.id)}
                                  className="rounded-none bg-red-500 hover:bg-red-600 text-white text-xs uppercase tracking-widest"
                                >
                                  Onayla
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
