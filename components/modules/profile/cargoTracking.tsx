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
      setError("Lütfen bir takip numarası giriniz.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `/api/cargo-tracking?requestNumber=${encodeURIComponent(
          requestNumber.trim()
        )}`
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Kargo bulunamadı");
      setCargoData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#FBFBFB] text-zinc-900">
      <Sidebar />

      <main className="flex-1 px-4 py-10 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <header className="mb-16 border-b border-zinc-100 pb-10">
            <div className="max-w-fit">
              <h1 className="text-4xl font-light tracking-tight mb-3 italic text-zinc-800">
                Kargo Takip
              </h1>
              <p className="text-zinc-400 text-[13px] font-extralight tracking-widest italic leading-relaxed">
                Siparişinizin yolculuğunu ve teslimat detaylarını{" "}
                <br className="hidden md:block" />
                buradan şeffaf bir şekilde izleyebilirsiniz.
              </p>
            </div>
          </header>

          {/* Search Section */}
          <section className="mb-16">
            <form onSubmit={handleTrack} className="relative group">
              <input
                type="text"
                value={requestNumber}
                onChange={(e) => setRequestNumber(e.target.value)}
                placeholder="Sipariş veya Takip Numarası"
                className="w-full bg-transparent border-b-2 border-zinc-200 py-4 pr-32 text-xl font-light focus:outline-none focus:border-zinc-600 transition-colors placeholder:text-zinc-300 placeholder:text-sm"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-0 bottom-3 px-6 py-2 text-sm font-medium tracking-widest uppercase text-zinc-600 hover:text-zinc-800 transition-colors disabled:text-zinc-400"
              >
                {loading ? "Sorgulanıyor..." : "Sorgula"}
              </button>
            </form>
            {error && (
              <p className="mt-4 text-red-500 text-xs tracking-wide uppercase">
                {error}
              </p>
            )}
          </section>

          {cargoData && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Ana Özet Kartı */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 pb-12 border-b border-zinc-100">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                    Durum
                  </span>
                  <p className="text-lg font-medium text-zinc-800">
                    {cargoData.shippingDeliveryState.deliveryStatus ||
                      "İşlem Görmekte"}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                    Takip No
                  </span>
                  <p className="text-lg font-mono text-zinc-600">
                    {cargoData.shippingDeliveryState.cargoTrackingNumber}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                    Tahmini Varış
                  </span>
                  <p className="text-lg font-medium text-zinc-800">
                    Şehir: {cargoData.shippingDeliveryState.receiverCity}
                  </p>
                </div>
              </div>

              {/* Detaylar İki Sütun */}
              <div className="grid md:grid-cols-2 gap-16 mb-20">
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">
                    Sevkiyat Detayı
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between py-2 border-b border-zinc-50">
                      <span className="text-zinc-500">Alıcı</span>
                      <span className="font-medium">
                        {cargoData.shippingDeliveryState.receiverName}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-zinc-50">
                      <span className="text-zinc-500">Toplam Parça</span>
                      <span className="font-medium">
                        {cargoData.shippingDeliveryState.totalPieces} Adet
                      </span>
                    </div>
                    <div className="flex flex-col py-2">
                      <span className="text-zinc-500 mb-1">
                        Teslimat Adresi
                      </span>
                      <span className="font-medium text-zinc-700 leading-relaxed">
                        {cargoData.shippingDeliveryState.receiverAddress}
                      </span>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">
                    Kargo Yolculuğu
                  </h3>
                  <div className="space-y-8 relative before:absolute before:inset-0 before:left-[5px] before:w-[1px] before:bg-zinc-100">
                    {cargoData.listOfMovements.map((movement, index) => (
                      <div key={index} className="relative pl-8 group">
                        {/* Nokta */}
                        <div
                          className={`absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full border-2 border-white ring-1 ${
                            index === 0
                              ? "bg-zinc-600 ring-zinc-600 shadow-lg shadow-zinc-200"
                              : "bg-zinc-300 ring-zinc-300"
                          }`}
                        />

                        <div className="flex flex-col">
                          <span
                            className={`text-xs font-semibold tracking-wide ${
                              index === 0 ? "text-zinc-600" : "text-zinc-500"
                            }`}
                          >
                            {movement.status}
                          </span>
                          <span className="text-[11px] text-zinc-400 mt-0.5">
                            {movement.statusDate}
                          </span>
                          {movement.deliveryProblem && (
                            <span className="mt-2 text-[11px] text-red-500 bg-red-50 self-start px-2 py-0.5 rounded">
                              {movement.deliveryProblem}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Ürünler - Basit Liste */}
              <section className="bg-zinc-50 rounded-2xl p-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6 text-center">
                  Paket İçeriği
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cargoData.listOfShipments.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-xl border border-zinc-100 flex justify-between items-center"
                    >
                      <span className="text-sm font-medium text-zinc-700">
                        {item.productName}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {item.quantity} Adet
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
