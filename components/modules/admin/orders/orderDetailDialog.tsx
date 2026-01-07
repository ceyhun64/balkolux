"use client";

import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  Package,
  Truck,
  ArrowRight,
  Calendar,
  CreditCard,
  Hash,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { FormattedOrder } from "@/types/order";

interface Props {
  order: FormattedOrder | null;
  setSelectedOrder: React.Dispatch<React.SetStateAction<FormattedOrder | null>>;
  onUpdateStatus: (
    orderId: number,
    currentStatus: FormattedOrder["status"]
  ) => void;
  getStatusInTurkish: (status: string) => string;
  getStatusBadge: (status: string) => React.ReactNode;
  getNextStatus: (
    currentStatus: FormattedOrder["status"]
  ) => FormattedOrder["status"] | null;
}

export default function OrderDetailDialog({
  order,
  setSelectedOrder,
  onUpdateStatus,
  getStatusInTurkish,
  getStatusBadge,
  getNextStatus,
}: Props) {
  if (!order) return null;

  const nextStatus = getNextStatus(order.status);
  const shippingAddress = order.addresses.find((a) => a.type === "shipping");
  const billingAddress = order.addresses.find((a) => a.type === "billing");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTotalQuantity = () => {
    return order.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  };

  console.log("order", order);
 
  return (
    <DialogContent className="bg-white text-gray-900 max-w-[95vw] sm:max-w-[600px] lg:max-w-[900px] max-h-[90vh] overflow-y-auto p-0">
      {/* Header */}
      <DialogHeader className="p-6 pb-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex items-start justify-between">
          <div>
            <DialogTitle className="text-2xl font-semibold text-gray-800 mb-1">
              Sipariş #{order.id}
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-sm flex items-center gap-2">
              <User className="w-4 h-4" />
              {order.user.name} {order.user.surname} · {order.user.email}
            </DialogDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            {getStatusBadge(order.status)}
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(order.createdAt)}
            </span>
          </div>
        </div>
      </DialogHeader>

      <div className="p-6 space-y-6">
        {/* Ödeme Bilgileri */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-100">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 mb-4">
            <Wallet className="w-5 h-5 text-indigo-600" /> Ödeme Bilgileri
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/60 rounded-md p-3 backdrop-blur-sm">
              <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                <Package className="w-3 h-3" />
                Toplam Tutar
              </div>
              <div className="text-xl font-bold text-gray-800">
                {order.totalPrice.toLocaleString("tr-TR")} ₺
              </div>
            </div>
            <div className="bg-white/60 rounded-md p-3 backdrop-blur-sm">
              <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                <CreditCard className="w-3 h-3" />
                Ödenen Tutar
              </div>
              <div className="text-xl font-bold text-indigo-600">
                {order.paidPrice.toLocaleString("tr-TR")} ₺
              </div>
            </div>
            <div className="bg-white/60 rounded-md p-3 backdrop-blur-sm">
              <div className="text-xs text-gray-500 mb-1">Ödeme Yöntemi</div>
              <div className="text-sm font-medium text-gray-700 capitalize">
                {order.paymentMethod}
              </div>
            </div>
            <div className="bg-white/60 rounded-md p-3 backdrop-blur-sm">
              <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                <Hash className="w-3 h-3" />
                İşlem ID
              </div>
              <div className="text-sm font-medium text-gray-700 font-mono">
                {order.transactionId || "-"}
              </div>
            </div>
            {order.installment && order.installment > 1 && (
              <div className="bg-white/60 rounded-md p-3 backdrop-blur-sm">
                <div className="text-xs text-gray-500 mb-1">Taksit</div>
                <div className="text-sm font-medium text-gray-700">
                  {order.installment} Taksit
                </div>
              </div>
            )}
            <div className="bg-white/60 rounded-md p-3 backdrop-blur-sm">
              <div className="text-xs text-gray-500 mb-1">Para Birimi</div>
              <div className="text-sm font-medium text-gray-700">
                {order.currency}
              </div>
            </div>
          </div>

          {nextStatus && order.status !== "cancelled" && (
            <div className="flex justify-end mt-4">
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 shadow-md"
                onClick={() => onUpdateStatus(order.id, order.status)}
              >
                <ArrowRight className="w-4 h-4" />
                {getStatusInTurkish(nextStatus)}'ye Geç
              </Button>
            </div>
          )}
        </div>

        {/* Sipariş Ürünleri */}
        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
              <Package className="w-5 h-5 text-gray-600" /> Sipariş Ürünleri
            </h3>
            <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200">
              <span className="font-semibold">{getTotalQuantity()}</span> Adet ·{" "}
              <span className="font-semibold">{order.items.length}</span> Kalem
            </div>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <img
                  src={item.product.mainImage}
                  alt={item.product.title}
                  className="w-20 h-20 object-cover rounded-md border border-gray-200 flex-shrink-0"
                />
                <div className="flex-1 min-w-0 space-y-2">
                  <p className="font-semibold text-gray-800 text-sm leading-tight">
                    {item.product.title}
                  </p>
                  {item.product.description && (
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {item.product.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">Birim Fiyat:</span>
                      <span className="font-medium">
                        {item.unitPrice.toLocaleString("tr-TR")} ₺
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">Adet:</span>
                      <span className="font-medium">{item.quantity}</span>
                    </div>
                  </div>
                  <div className="pt-1 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Toplam:</span>
                      <span className="font-bold text-indigo-600">
                        {item.totalPrice.toLocaleString("tr-TR")} ₺
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Adres Bilgileri */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Kargo Adresi */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-5 border border-green-100">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 mb-3">
              <Truck className="w-5 h-5 text-green-600" /> Kargo Adresi
            </h3>
            {shippingAddress ? (
              <div className="bg-white/70 rounded-md p-4 space-y-2.5 text-sm backdrop-blur-sm">
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-800">
                      {shippingAddress.firstName} {shippingAddress.lastName}
                    </div>
                    <div className="text-xs text-gray-500">
                      TC: {shippingAddress.tcno}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-700 leading-relaxed">
                    {shippingAddress.address}
                    <br />
                    {shippingAddress.district && (
                      <>
                        {shippingAddress.district} / {shippingAddress.city}
                        <br />
                      </>
                    )}
                    {shippingAddress.zip && `${shippingAddress.zip} `}
                    {shippingAddress.country}
                  </div>
                </div>
                {shippingAddress.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div className="text-gray-700 font-medium">
                      {shippingAddress.phone}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-200">
                Kargo adresi bulunamadı
              </div>
            )}
          </div>

          {/* Fatura Adresi */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-5 border border-orange-100">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 mb-3">
              <CreditCard className="w-5 h-5 text-orange-600" /> Fatura Adresi
            </h3>
            {billingAddress ? (
              <div className="bg-white/70 rounded-md p-4 space-y-2.5 text-sm backdrop-blur-sm">
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-800">
                      {billingAddress.firstName} {billingAddress.lastName}
                    </div>
                    <div className="text-xs text-gray-500">
                      TC: {billingAddress.tcno}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-700 leading-relaxed">
                    {billingAddress.address}
                    <br />
                    {billingAddress.district && (
                      <>
                        {billingAddress.district} / {billingAddress.city}
                        <br />
                      </>
                    )}
                    {billingAddress.zip && `${billingAddress.zip} `}
                    {billingAddress.country}
                  </div>
                </div>
                {billingAddress.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div className="text-gray-700 font-medium">
                      {billingAddress.phone}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-200">
                Fatura adresi bulunamadı
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 p-6 pt-4 border-t border-gray-100 bg-gray-50">
        <Button
          onClick={() => setSelectedOrder(null)}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6"
        >
          Kapat
        </Button>
      </div>
    </DialogContent>
  );
}
