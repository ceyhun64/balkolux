"use client";

import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "@/components/modules/admin/sideBar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Package,
  ShoppingCart,
  Users,
  FileText,
  Loader2,
  CheckCircle2,
  Truck,
  XCircle,
  UserPlus,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// --- Types ---
interface KPI {
  id: string;
  title: string;
  stat: number;
  description: string;
  icon: React.ElementType;
  href: string;
  colorClass: string;
}

interface OrderItem {
  product?: { title: string };
}

interface Order {
  id: string;
  createdAt: string;
  paidPrice: number;
  status: string;
  items: OrderItem[];
}

export default function AdminDashboard() {
  const isMobile = useIsMobile();
  const [kpiData, setKpiData] = useState<KPI[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const getStatusBadge = (status: string) => {
    const statusMap: Record<
      string,
      { label: string; class: string; icon: any }
    > = {
      pending: {
        label: "Beklemede",
        class: "bg-orange-50 text-orange-600 border-orange-100",
        icon: <Loader2 size={12} className="animate-spin" />,
      },
      paid: {
        label: "Ödendi",
        class: "bg-emerald-50 text-emerald-600 border-emerald-100",
        icon: <CheckCircle2 size={12} />,
      },
      shipped: {
        label: "Kargoda",
        class: "bg-blue-50 text-blue-600 border-blue-100",
        icon: <Truck size={12} />,
      },
      delivered: {
        label: "Tamamlandı",
        class: "bg-gray-50 text-gray-600 border-gray-200",
        icon: <Package size={12} />,
      },
      cancelled: {
        label: "İptal",
        class: "bg-red-50 text-red-600 border-red-100",
        icon: <XCircle size={12} />,
      },
    };

    const config = statusMap[status] || {
      label: "Belirsiz",
      class: "bg-gray-50",
      icon: null,
    };

    return (
      <Badge
        variant="outline"
        className={`${config.class} border flex items-center gap-1.5 px-2 py-0.5 rounded-md font-medium text-[11px]`}
      >
        {config.icon} {config.label}
      </Badge>
    );
  };

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const endpoints = [
        "/api/products",
        "/api/order",
        "/api/user/all",
        "/api/blog",
        "/api/subscribe",
      ];
      const responses = await Promise.all(
        endpoints.map((url) => fetch(url).then((res) => res.json()))
      );

      const [products, orders, users, blogs, subscribers] = responses;

      setKpiData([
        {
          id: "orders",
          title: "Siparişler",
          stat: orders.orders?.length || 0,
          description: "Toplam Satış",
          icon: ShoppingCart,
          href: "/admin/orders",
          colorClass: "text-blue-600 bg-blue-50",
        },
        {
          id: "products",
          title: "Ürünler",
          stat: products.products?.length || 0,
          description: "Aktif Envanter",
          icon: Package,
          href: "/admin/products",
          colorClass: "text-indigo-600 bg-indigo-50",
        },
        {
          id: "users",
          title: "Müşteriler",
          stat: users.users?.length || 0,
          description: "Kayıtlı Kullanıcı",
          icon: Users,
          href: "/admin/users",
          colorClass: "text-violet-600 bg-violet-50",
        },
        {
          id: "blogs",
          title: "İçerik",
          stat: blogs.blogs?.length || 0,
          description: "Blog Yazıları",
          icon: FileText,
          href: "/admin/blogs",
          colorClass: "text-amber-600 bg-amber-50",
        },
        {
          id: "subscribers",
          title: "Aboneler",
          stat: Array.isArray(subscribers) ? subscribers.length : 0,
          description: "Bülten Kaydı",
          icon: UserPlus,
          href: "/admin/subscribers",
          colorClass: "text-rose-600 bg-rose-50",
        },
      ]);

      setRecentOrders(
        (orders.orders || [])
          .sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 5)
      );
    } catch (error) {
      console.error("Dashboard data fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) return <DashboardSkeleton isMobile={isMobile} />;

  return (
    <div className="flex min-h-screen bg-[#F8F9FB] font-sans selection:bg-indigo-100">
      <Sidebar />
      <main
        className={`flex-1 p-6 lg:p-12 transition-all duration-300 ${
          isMobile ? "mt-14" : "md:ml-72"
        }`}
      >
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1 w-8 bg-indigo-600 rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                Yönetim Paneli
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Genel Bakış
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              İşletmenizin performansını gerçek zamanlı izleyin.
            </p>
          </div>
        
        </header>

        {/* KPI Grid */}
        <div className="grid gap-6 mb-12 grid-cols-1 sm:grid-cols-2 xl:grid-cols-5">
          {kpiData.map((card) => (
            <Link key={card.id} href={card.href} className="group">
              <Card className="border-none shadow-sm group-hover:shadow-md transition-all duration-300 rounded-2xl bg-white overflow-hidden relative">
                <CardContent className="p-6">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${card.colorClass}`}
                  >
                    <card.icon size={20} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                      {card.stat.toLocaleString()}
                    </h3>
                    <p className="text-[13px] font-semibold text-slate-500 uppercase tracking-tight">
                      {card.title}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium leading-none">
                      {card.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Table Section */}
        <section>
          <div className="flex items-center justify-between mb-6 px-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                <TrendingUp size={16} className="text-indigo-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-800 tracking-tight">
                Son Siparişler
              </h2>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 underline-offset-4 hover:underline"
            >
              Tümünü Yönet
            </Link>
          </div>

          <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-left">
                      Sipariş ID
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-left hidden md:table-cell">
                      İçerik
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-left">
                      Tutar
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-left">
                      Durum
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">
                      Detay
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700">
                            #{order.id.slice(-6).toUpperCase()}
                          </span>
                          <span className="text-[10px] font-medium text-slate-400">
                            {new Date(order.createdAt).toLocaleDateString(
                              "tr-TR",
                              { day: "numeric", month: "long" }
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <p className="text-xs font-medium text-slate-500 max-w-[240px] truncate">
                          {order.items
                            ?.map((i) => i.product?.title)
                            .join(", ") || "Genel Hizmet"}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-extrabold text-slate-900">
                          {order.paidPrice?.toLocaleString("tr-TR")}{" "}
                          <small className="font-medium text-slate-500 text-[10px]">
                            TRY
                          </small>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/admin/orders?orderId=${order.id}`}>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-xl hover:bg-slate-900 hover:text-white transition-all duration-300"
                          >
                            <ChevronRight size={16} />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {recentOrders.length === 0 && (
                <div className="py-24 text-center">
                  <p className="text-sm font-medium text-slate-400 italic">
                    Henüz bir işlem gerçekleştirilmedi.
                  </p>
                </div>
              )}
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}

// --- Loading State Component ---
function DashboardSkeleton({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      <div className={`flex-1 p-6 lg:p-12 ${isMobile ? "mt-14" : "md:ml-72"}`}>
        <div className="space-y-2 mb-12">
          <Skeleton className="h-4 w-24 bg-slate-200" />
          <Skeleton className="h-10 w-48 bg-slate-200" />
        </div>
        <div className="grid gap-6 mb-12 grid-cols-1 sm:grid-cols-2 xl:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-32 rounded-2xl bg-white shadow-sm" />
          ))}
        </div>
        <Skeleton className="h-[400px] rounded-2xl bg-white shadow-sm" />
      </div>
    </div>
  );
}
