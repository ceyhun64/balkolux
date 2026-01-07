"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Router eklendi
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
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import Link from "next/link";
import {
  Package,
  ChevronRight,
  MapPin,
  CreditCard,
  User,
  Phone,
  Calendar,
  Hash,
  CheckCircle2,
  XCircle,
  Truck,
  Clock,
  FileText,
} from "lucide-react";

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
  tcno?: string;
}

interface Product {
  id: number;
  title: string;
  mainImage: string;
  price?: number;
}

interface OrderItem {
  id: string | number;
  product: Product;
  quantity: number;
  totalPrice: number;
  unitPrice?: number;
}

interface Order {
  id: string | number;
  createdAt: string;
  status: string;
  paidPrice: number;
  totalPrice: number;
  currency: string;
  addresses: Address[];
  items: OrderItem[];
}

export default function Orders() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/order/user", { method: "GET" });

      // --- Oturum Kontrolü ---
      if (res.status === 401) {
        router.push("/login");
        return;
      }

      const data = await res.json();
      if (data.status === "success") {
        setOrders(data.orders);
        setIsAuthorized(true);
      } else {
        toast.error("Siparişler alınamadı.");
      }
    } catch (err) {
      console.error("Orders Fetch Error:", err);
      toast.error("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [router]);

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

  // Status Helper Functions (Aynen Korundu)
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "cancelled":
        return "text-red-600 bg-red-50 border-transparent";
      case "delivered":
        return "text-zinc-900 bg-zinc-100 border-transparent";
      case "shipped":
        return "text-blue-600 bg-blue-50 border-transparent";
      case "paid":
        return "text-amber-700 bg-amber-50 border-transparent";
      default:
        return "text-zinc-500 bg-zinc-50 border-transparent";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "cancelled":
        return <XCircle size={14} />;
      case "delivered":
        return <CheckCircle2 size={14} />;
      case "shipped":
        return <Truck size={14} />;
      case "paid":
        return <Package size={14} />;
      default:
        return <Clock size={14} />;
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

  const calculateOrderSummary = (order: Order) => {
    const subtotal = order.items.reduce(
      (sum, item) => sum + (item.unitPrice || 0) * item.quantity,
      0
    );
    const tax = order.totalPrice - subtotal;
    return { subtotal, tax };
  };

  // Yükleme ekranı
  if (loading)
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-[#FBFBFB]">
        <Sidebar />
        <main className="flex-1 px-4 py-10 md:px-12 lg:px-20">
          <div className="max-w-5xl mx-auto space-y-8">
            <Skeleton className="h-10 w-48 bg-zinc-100" />
            <Skeleton className="h-64 w-full bg-zinc-50" />
            <Skeleton className="h-64 w-full bg-zinc-50" />
          </div>
        </main>
      </div>
    );

  if (!isAuthorized) return null;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#FBFBFB] text-zinc-900">
      <Sidebar />

      <main className="flex-1 px-4 py-10 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-100 pb-8">
            <div>
              <h1 className="text-3xl font-light tracking-tight mb-2 italic">
                Siparişlerim
              </h1>
              <p className="text-zinc-500 text-[11px] uppercase tracking-[0.2em] font-light">
                Geçmiş siparişlerinizi ve gönderim durumlarını takip edin.
              </p>
            </div>
            {orders.length > 0 && (
              <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em]">
                {orders.length} SİPARİŞ BULUNDU
              </div>
            )}
          </header>

          {orders.length === 0 ? (
            <div className="py-32 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-zinc-50 flex items-center justify-center mb-6 rounded-full">
                <Package className="text-zinc-200" size={24} />
              </div>
              <h3 className="text-[12px] font-bold uppercase tracking-widest mb-2">
                Henüz siparişiniz yok
              </h3>
              <p className="text-sm text-zinc-400 font-light mb-8 max-w-xs">
                Koleksiyonlarımıza göz atarak alışverişe başlayabilirsiniz.
              </p>
              <Button
                asChild
                className="bg-zinc-950 hover:bg-zinc-800 text-white rounded-none px-12 py-6 text-[10px] tracking-[0.3em] uppercase transition-all duration-500 shadow-none"
              >
                <Link href="/products">ALIŞVERİŞE BAŞLA</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-12">
              {orders.map((order) => {
                const shippingAddress = order.addresses.find(
                  (a) => a.type === "shipping"
                );
                const billingAddress = order.addresses.find(
                  (a) => a.type === "billing"
                );
                const { subtotal, tax } = calculateOrderSummary(order);

                return (
                  <div key={order.id} className="group">
                    {/* Order Metadata Row */}
                    <div className="flex flex-wrap items-center justify-between mb-4 px-2 gap-4">
                      <div className="flex items-center gap-4">
                        <span className="text-[11px] font-bold tracking-tighter">
                          #{order.id}
                        </span>
                        <div
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-none text-[9px] font-bold uppercase tracking-[0.15em] border ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          {getStatusInTurkish(order.status)}
                        </div>
                      </div>
                      <div className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest flex items-center gap-1.5">
                        <Calendar size={12} />
                        {new Date(order.createdAt).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>

                    {/* Main Order Card */}
                    <div className="bg-white border border-zinc-100 shadow-sm group-hover:shadow-md transition-all duration-500 overflow-hidden">
                      <div className="grid grid-cols-1 lg:grid-cols-12">
                        {/* Products */}
                        <div className="lg:col-span-8 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-zinc-50">
                          <div className="space-y-6">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex gap-6 group/item"
                              >
                                <div className="h-20 w-16 overflow-hidden bg-zinc-50 flex-shrink-0 border border-zinc-100">
                                  <img
                                    src={item.product.mainImage}
                                    className="object-cover w-full h-full group-hover/item:scale-105 transition-transform duration-700"
                                    alt={item.product.title}
                                  />
                                </div>
                                <div className="flex flex-col justify-center min-w-0">
                                  <h4 className="text-[12px] font-semibold uppercase tracking-tight text-zinc-900 mb-1 truncate">
                                    {item.product.title}
                                  </h4>
                                  <div className="flex items-center gap-3 text-[11px] text-zinc-400 font-light">
                                    <span>{item.quantity} ADET</span>
                                    <span className="w-1 h-1 bg-zinc-200" />
                                    <span>
                                      {item.unitPrice?.toLocaleString("tr-TR")}{" "}
                                      ₺
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-4 bg-[#FAFAFA]/40 p-6 md:p-8 flex flex-col justify-between">
                          <div className="space-y-6">
                            {shippingAddress && (
                              <div className="space-y-1">
                                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                                  TESLİMAT ADRESİ
                                </p>
                                <p className="text-[11px] text-zinc-600 font-light leading-relaxed">
                                  {shippingAddress.firstName}{" "}
                                  {shippingAddress.lastName}
                                  <br />
                                  {shippingAddress.city},{" "}
                                  {shippingAddress.district}
                                </p>
                              </div>
                            )}

                            <div className="space-y-1">
                              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                                TOPLAM TUTAR
                              </p>
                              <div className="flex items-baseline gap-1">
                                <span className="text-xl font-light">
                                  {order.paidPrice.toLocaleString("tr-TR")}
                                </span>
                                <span className="text-xs font-medium">₺</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-8 flex flex-col gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  onClick={() => setSelectedOrder(order)}
                                  className="w-full border-zinc-200 text-[10px] tracking-[0.2em] uppercase h-11 bg-white hover:bg-zinc-900 hover:text-white transition-all rounded-none"
                                >
                                  DETAYLAR
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl border-none p-0 rounded-none overflow-hidden">
                                <div className="p-10">
                                  <DialogHeader className="mb-10">
                                    <DialogTitle className="text-2xl font-light italic">
                                      Sipariş Detayı
                                    </DialogTitle>
                                    <DialogDescription className="text-[10px] uppercase tracking-[0.3em] font-bold">
                                      #{selectedOrder?.id}
                                    </DialogDescription>
                                  </DialogHeader>

                                  {selectedOrder && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                      <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-zinc-900 border-b border-zinc-100 pb-2">
                                          <User size={14} />
                                          <span className="text-[10px] font-bold uppercase tracking-widest">
                                            FATURA BİLGİLERİ
                                          </span>
                                        </div>
                                        {billingAddress && (
                                          <div className="text-[12px] space-y-2 text-zinc-500 font-light leading-relaxed">
                                            <p className="font-semibold text-zinc-900">
                                              {billingAddress.firstName}{" "}
                                              {billingAddress.lastName}
                                            </p>
                                            <p>{billingAddress.address}</p>
                                            <p>
                                              {billingAddress.district} /{" "}
                                              {billingAddress.city}
                                            </p>
                                            <p className="flex items-center gap-2 pt-2">
                                              <Phone size={12} />{" "}
                                              {billingAddress.phone}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                      <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-zinc-900 border-b border-zinc-100 pb-2">
                                          <CreditCard size={14} />
                                          <span className="text-[10px] font-bold uppercase tracking-widest">
                                            ÖDEME ÖZETİ
                                          </span>
                                        </div>
                                        <div className="text-[12px] space-y-3 font-light">
                                          <div className="flex justify-between">
                                            <span>Ara Toplam</span>
                                            <span className="text-zinc-900">
                                              {subtotal.toLocaleString("tr-TR")}{" "}
                                              ₺
                                            </span>
                                          </div>
                                          <div className="flex justify-between text-zinc-400">
                                            <span>KDV / Hizmet</span>
                                            <span>
                                              {tax.toLocaleString("tr-TR")} ₺
                                            </span>
                                          </div>
                                          <div className="flex justify-between font-bold text-zinc-900 pt-3 border-t border-zinc-100 text-sm">
                                            <span>TOPLAM</span>
                                            <span>
                                              {order.paidPrice.toLocaleString(
                                                "tr-TR"
                                              )}{" "}
                                              ₺
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>

                            {["pending", "paid"].includes(order.status) && (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="w-full text-zinc-400 hover:text-red-500 hover:bg-transparent text-[9px] font-bold uppercase tracking-[0.2em] h-10 transition-colors"
                                  >
                                    Siparişi İptal Et
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="rounded-none border-none">
                                  <DialogHeader>
                                    <DialogTitle className="italic font-light">
                                      İptal İşlemi
                                    </DialogTitle>
                                    <DialogDescription className="text-sm font-light pt-2">
                                      Bu siparişi iptal etmek istediğinizden
                                      emin misiniz? Bu işlem geri alınamaz.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter className="mt-6 gap-2">
                                    <DialogClose asChild>
                                      <Button
                                        variant="outline"
                                        className="rounded-none flex-1 text-[10px] tracking-widest uppercase"
                                      >
                                        VAZGEÇ
                                      </Button>
                                    </DialogClose>
                                    <Button
                                      onClick={() =>
                                        handleCancelOrder(order.id)
                                      }
                                      className="bg-red-500 hover:bg-red-600 text-white rounded-none flex-1 text-[10px] tracking-widest uppercase"
                                    >
                                      EVET, İPTAL ET
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
