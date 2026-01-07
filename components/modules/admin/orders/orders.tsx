"use client";

import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "@/components/modules/admin/sideBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import DefaultPagination from "@/components/layout/pagination";
import {
  Loader,
  Truck,
  CheckCircle,
  XCircle,
  Package,
  Search,
  AlertCircle,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import OrderDetailDialog from "./orderDetailDialog";
import { Dialog } from "@/components/ui/dialog";
import { FormattedOrder } from "@/types/order";
import { Spinner } from "@/components/ui/spinner";

export default function Orders() {
  const isMobile = useIsMobile();
  const [orders, setOrders] = useState<FormattedOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<FormattedOrder | null>(
    null
  );

  const itemsPerPage = 15;
  const statusOrder: FormattedOrder["status"][] = [
    "pending",
    "paid",
    "shipped",
    "delivered",
  ];

  const getStatusInTurkish = (status: string) => {
    switch (status) {
      case "pending":
        return "Ödeme Bekleniyor";
      case "paid":
        return "Ödeme Başarılı";
      case "shipped":
        return "Kargoya Verildi";
      case "delivered":
        return "Teslim Edildi";
      case "cancelled":
        return "İptal Edildi";
      default:
        return "Bilinmiyor";
    }
  };

  const getStatusBadge = (status: string) => {
    const label = getStatusInTurkish(status);
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-600 border-amber-200 font-medium flex items-center gap-1.5 px-2.5 py-0.5"
          >
            <Loader className="w-3 h-3 animate-spin" /> {label}
          </Badge>
        );
      case "paid":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-600 border-blue-200 font-medium flex items-center gap-1.5 px-2.5 py-0.5"
          >
            <CheckCircle className="w-3 h-3" /> {label}
          </Badge>
        );
      case "shipped":
        return (
          <Badge
            variant="outline"
            className="bg-indigo-50 text-indigo-600 border-indigo-200 font-medium flex items-center gap-1.5 px-2.5 py-0.5"
          >
            <Truck className="w-3 h-3" /> {label}
          </Badge>
        );
      case "delivered":
        return (
          <Badge
            variant="outline"
            className="bg-emerald-50 text-emerald-600 border-emerald-200 font-medium flex items-center gap-1.5 px-2.5 py-0.5"
          >
            <Package className="w-3 h-3" /> {label}
          </Badge>
        );
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-slate-50 text-slate-500 border-slate-200 font-medium flex items-center gap-1.5 px-2.5 py-0.5"
          >
            <XCircle className="w-3 h-3" /> {label}
          </Badge>
        );
      default:
        return <Badge variant="secondary">{label}</Badge>;
    }
  };

  const getNextStatus = (currentStatus: FormattedOrder["status"]) => {
    const index = statusOrder.indexOf(currentStatus);
    return index >= 0 && index < statusOrder.length - 1
      ? statusOrder[index + 1]
      : null;
  };

  const getTotalItemCount = (order: FormattedOrder) => {
    return order.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/order");
      const data = await res.json();
      if (data.status === "success") {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Siparişler yüklenirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (
    orderId: number,
    currentStatus: FormattedOrder["status"]
  ) => {
    const nextStatus = getNextStatus(currentStatus);
    if (!nextStatus) {
      alert("Bu siparişin durumu daha fazla güncellenemez.");
      return;
    }

    if (
      !confirm(
        `Sipariş durumu "${getStatusInTurkish(
          currentStatus
        )}" → "${getStatusInTurkish(
          nextStatus
        )}" olarak güncellenecek. Onaylıyor musunuz?`
      )
    ) {
      return;
    }

    try {
      const res = await fetch("/api/order", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: nextStatus }),
      });
      const data = await res.json();
      if (data.status === "success") {
        await fetchOrders();
      } else {
        alert("Durum güncellenirken bir hata oluştu.");
      }
    } catch (err) {
      console.error("Durum güncelleme hatası:", err);
      alert("Durum güncellenirken bir hata oluştu.");
    }
  };

  const filteredOrders = useMemo(
    () =>
      orders.filter(
        (o) =>
          `${o.user.name} ${o.user.surname}`
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          o.user.email.toLowerCase().includes(search.toLowerCase()) ||
          String(o.id).includes(search)
      ),
    [orders, search]
  );

  const paginatedOrders = useMemo(
    () =>
      filteredOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [filteredOrders, currentPage]
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] font-sans antialiased text-slate-900">
      <Sidebar />
      <main
        className={`flex-1 p-6 lg:p-10 transition-all duration-300 ${
          isMobile ? "mt-14" : "md:ml-72"
        }`}
      >
        {/* Header Section */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-1.5 w-6 bg-indigo-600 rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600/80">
              Yönetici Paneli
            </span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Sipariş Yönetimi
          </h1>
          <p className="text-slate-500 text-sm">
            Gelen siparişleri takip edin ve süreçleri yönetin.
          </p>
        </header>

        {/* Search Bar */}
        <div className="relative max-w-md mb-8 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <Input
            placeholder="Müşteri, email veya ID..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 bg-white border-slate-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Müşteri</th>
                  <th className="px-6 py-4 hidden sm:table-cell text-center">
                    Ürünler
                  </th>
                  <th className="px-6 py-4 hidden md:table-cell text-center">
                    Tutar
                  </th>
                  <th className="px-6 py-4 hidden lg:table-cell text-center">
                    Durum
                  </th>
                  <th className="px-6 py-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-12 text-slate-400 italic"
                    >
                      {search
                        ? "Arama kriterlerine uygun sipariş bulunamadı."
                        : "Henüz kayıtlı sipariş bulunmamaktadır."}
                    </td>
                  </tr>
                ) : (
                  paginatedOrders.map((order) => {
                    const nextStatus = getNextStatus(order.status);
                    const totalItems = getTotalItemCount(order);
                    return (
                      <tr
                        key={order.id}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="px-6 py-5 font-mono text-xs text-slate-400">
                          #{order.id}
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-800">
                              {order.user.name} {order.user.surname}
                            </span>
                            <span className="text-xs text-slate-400">
                              {order.user.email}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 hidden sm:table-cell">
                          <div className="flex items-center gap-3">
                            {/* Ürün Görselleri Stack */}
                            <div className="flex -space-x-3 overflow-hidden">
                              {order.items.slice(0, 3).map((item, idx) => (
                                <div
                                  key={idx}
                                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden bg-slate-100 border border-slate-200"
                                >
                                  <img
                                    src={item.product.mainImage}
                                    alt={item.product.title}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              ))}
                              {order.items.length > 3 && (
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 ring-2 ring-white text-[10px] font-bold text-slate-500 border border-slate-200">
                                  +{order.items.length - 3}
                                </div>
                              )}
                            </div>

                            {/* Ürün Metin Bilgisi */}
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-slate-700 max-w-[150px] truncate">
                                {order.items[0]?.product.title}
                              </span>
                              {order.items.length > 1 ? (
                                <span className="text-[10px] text-indigo-500 font-semibold">
                                  +{order.items.length - 1} diğer ürün
                                </span>
                              ) : (
                                <span className="text-[10px] text-slate-400">
                                  Tekli Ürün
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 hidden md:table-cell text-center font-semibold text-slate-700">
                          {order.paidPrice.toLocaleString("tr-TR")} ₺
                        </td>
                        <td className="px-6 py-5 hidden lg:table-cell text-center">
                          {getStatusBadge(order.status)}
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-3 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                              onClick={() => setSelectedOrder(order)}
                            >
                              Detay
                            </Button>
                            {nextStatus && order.status !== "cancelled" && (
                              <Button
                                size="sm"
                                className="h-8 px-3 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200"
                                onClick={() =>
                                  handleUpdateStatus(order.id, order.status)
                                }
                              >
                                {getStatusInTurkish(nextStatus)}
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer / Pagination */}
        {filteredOrders.length > 0 && (
          <div className="mt-8">
            <DefaultPagination
              totalItems={filteredOrders.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}

        <Dialog
          open={!!selectedOrder}
          onOpenChange={() => setSelectedOrder(null)}
        >
          {selectedOrder && (
            <OrderDetailDialog
              order={selectedOrder}
              setSelectedOrder={setSelectedOrder}
              onUpdateStatus={handleUpdateStatus}
              getStatusInTurkish={getStatusInTurkish}
              getStatusBadge={getStatusBadge}
              getNextStatus={getNextStatus}
            />
          )}
        </Dialog>
      </main>
    </div>
  );
}
