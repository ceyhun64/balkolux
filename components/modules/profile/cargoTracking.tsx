// components/HorozCargoTracking.tsx
"use client";

import { useState } from "react";
import Sidebar from "./sideBar";

interface CargoMovement {
  requestNumber: string;
  atfNumber: string;
  deliveryType: string;
  senderName: string;
  receiverName: string;
  quantity: number;
  desi: number;
  status: string;
  statusDate: string;
  deliveryStatus: string;
  deliveryProblem?: string;
  amount: number;
}

interface CargoData {
  shippingDeliveryState: {
    requestNumber: string;
    cargoTrackingNumber: string;
    atfNumber: string;
    senderName: string;
    senderPhone: string;
    receiverName: string;
    receiverPhone: string;
    receiverAddress: string;
    receiverCity: string;
    receiverDistrict: string;
    totalPieces: number;
    deliveryStatus: string;
  };
  listOfShipments: Array<{
    productCode: string;
    productName: string;
    quantity: number;
    weight: number;
    desi: number;
  }>;
  listOfMovements: CargoMovement[];
}

export default function HorozCargoTracking() {
  const [requestNumber, setRequestNumber] = useState("");
  const [cargoData, setCargoData] = useState<CargoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!requestNumber.trim()) {
      setError("Lütfen sipariş numarası giriniz");
      return;
    }

    setLoading(true);
    setError("");
    setCargoData(null);

    try {
      const response = await fetch(
        `/api/cargo-tracking?requestNumber=${encodeURIComponent(
          requestNumber.trim()
        )}`,
        {
          method: "GET",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Kargo bulunamadı");
      }

      setCargoData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const statusMap: { [key: string]: string } = {
      TESLİM: "bg-green-100 text-green-800 border-green-300",
      ÇIKIŞ: "bg-blue-100 text-blue-800 border-blue-300",
      GİRİŞ: "bg-indigo-100 text-indigo-800 border-indigo-300",
      BEKLİYOR: "bg-yellow-100 text-yellow-800 border-yellow-300",
      "TESLİM SORUN": "bg-red-100 text-red-800 border-red-300",
    };

    return statusMap[status] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  const getStatusIcon = (status: string) => {
    const iconMap: { [key: string]: string } = {
      TESLİM: "✅",
      ÇIKIŞ: "🚛",
      GİRİŞ: "📦",
      BEKLİYOR: "⏳",
      "TESLİM SORUN": "⚠️",
    };

    return iconMap[status] || "📋";
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#FBFBFB] text-zinc-900">
      <Sidebar />

      <main className="flex-1 px-4 py-10 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-100 pb-8">
            <div>
              <h1 className="text-3xl font-light tracking-tight mb-2 italic">
                Kargo Takip
              </h1>
              <p className="text-zinc-500 text-[11px] uppercase tracking-[0.2em] font-light">
                Sipariş numaranızı girerek kargonuzun durumunu öğrenin
              </p>
            </div>
          </header>

          {/* Arama Formu */}
          <form onSubmit={handleTrack} className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={requestNumber}
                onChange={(e) => setRequestNumber(e.target.value)}
                placeholder="Sipariş numaranızı giriniz"
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all font-semibold shadow-md"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Sorgulanıyor...
                  </span>
                ) : (
                  "🔍 Sorgula"
                )}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              ⚠️ Aynı siparişi 1 saat içinde sadece 1 kez sorgulayabilirsiniz
            </p>
          </form>

          {/* Hata Mesajı */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <p className="font-semibold text-red-800">Hata</p>
                  <p className="text-red-700 text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Kargo Bilgileri */}
          {cargoData && (
            <div className="space-y-6">
              {/* Teslimat Durumu */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border-2 border-orange-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  📦 Teslimat Bilgileri
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Sipariş No</p>
                    <p className="font-bold text-gray-900">
                      {cargoData.shippingDeliveryState.requestNumber}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Kargo Takip No</p>
                    <p className="font-bold text-orange-600 font-mono">
                      {cargoData.shippingDeliveryState.cargoTrackingNumber}
                    </p>
                    <a
                      href={`https://www.horoz.com.tr/kargo-takip?trackingNumber=${cargoData.shippingDeliveryState.cargoTrackingNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                    >
                      Horoz.com.tr'de takip et →
                    </a>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">ATF Numarası</p>
                    <p className="font-semibold text-gray-900">
                      {cargoData.shippingDeliveryState.atfNumber}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Toplam Parça</p>
                    <p className="font-semibold text-gray-900">
                      {cargoData.shippingDeliveryState.totalPieces} Adet
                    </p>
                  </div>
                </div>
              </div>

              {/* Gönderen ve Alıcı Bilgileri */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Gönderen */}
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    📤 Gönderen Bilgileri
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">Ad:</span>{" "}
                      <span className="font-medium">
                        {cargoData.shippingDeliveryState.senderName}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-600">Telefon:</span>{" "}
                      <span className="font-medium">
                        {cargoData.shippingDeliveryState.senderPhone}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Alıcı */}
                <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    📥 Alıcı Bilgileri
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">Ad:</span>{" "}
                      <span className="font-medium">
                        {cargoData.shippingDeliveryState.receiverName}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-600">Telefon:</span>{" "}
                      <span className="font-medium">
                        {cargoData.shippingDeliveryState.receiverPhone}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-600">Adres:</span>{" "}
                      <span className="font-medium">
                        {cargoData.shippingDeliveryState.receiverAddress}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-600">Şehir:</span>{" "}
                      <span className="font-medium">
                        {cargoData.shippingDeliveryState.receiverCity} /{" "}
                        {cargoData.shippingDeliveryState.receiverDistrict}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Ürün Listesi */}
              {cargoData.listOfShipments.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    📋 Gönderi İçeriği
                  </h3>
                  <div className="space-y-3">
                    {cargoData.listOfShipments.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <p className="font-semibold text-gray-800">
                            {item.productName}
                          </p>
                          <p className="text-sm text-gray-600">
                            Ürün Kodu: {item.productCode}
                          </p>
                        </div>
                        <div className="text-right text-sm">
                          <p className="text-gray-700">
                            Adet:{" "}
                            <span className="font-semibold">
                              {item.quantity}
                            </span>
                          </p>
                          <p className="text-gray-700">
                            Ağırlık:{" "}
                            <span className="font-semibold">
                              {item.weight} kg
                            </span>
                          </p>
                          <p className="text-gray-700">
                            Desi:{" "}
                            <span className="font-semibold">{item.desi}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Kargo Hareketleri */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  🚚 Kargo Hareketleri
                </h2>

                <div className="relative">
                  {/* Timeline çizgisi */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300"></div>

                  <div className="space-y-4">
                    {cargoData.listOfMovements.map((movement, index) => (
                      <div key={index} className="relative pl-16">
                        {/* Timeline noktası */}
                        <div
                          className={`absolute left-3 top-4 w-6 h-6 rounded-full border-4 border-white shadow-md flex items-center justify-center text-xs ${
                            movement.status === "TESLİM"
                              ? "bg-green-500"
                              : movement.status === "TESLİM SORUN"
                              ? "bg-red-500"
                              : movement.status === "ÇIKIŞ"
                              ? "bg-blue-500"
                              : movement.status === "GİRİŞ"
                              ? "bg-indigo-500"
                              : "bg-yellow-500"
                          }`}
                        >
                          <span className="text-white">
                            {getStatusIcon(movement.status)}
                          </span>
                        </div>

                        <div
                          className={`bg-white p-5 rounded-lg border-2 shadow-sm ${getStatusColor(
                            movement.status
                          )}`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(
                                  movement.status
                                )}`}
                              >
                                {movement.status}
                              </span>
                              {movement.deliveryProblem && (
                                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                                  ⚠️ {movement.deliveryProblem}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 font-medium whitespace-nowrap">
                              {movement.statusDate}
                            </p>
                          </div>

                          <div className="grid md:grid-cols-3 gap-3 text-sm">
                            <div>
                              <p className="text-gray-600">ATF No</p>
                              <p className="font-semibold text-gray-900">
                                {movement.atfNumber}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600">Teslimat Tipi</p>
                              <p className="font-semibold text-gray-900">
                                {movement.deliveryType}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600">Adet / Desi</p>
                              <p className="font-semibold text-gray-900">
                                {movement.quantity} / {movement.desi}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
