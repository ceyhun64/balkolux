"use client";
import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Package,
  Truck,
  Mail,
  Home,
  ArrowRight,
  Info,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      router.push("/");
    }
  }, [countdown, router]);

  const nextSteps = [
    {
      icon: Mail,
      title: "E-posta Onayı",
      description: "Detaylar adresinize gönderildi",
      status: "completed",
    },
    {
      icon: Package,
      title: "Sipariş Hazırlanıyor",
      description: "Ürünleriniz özenle paketleniyor",
      status: "in-progress",
    },
    {
      icon: Truck,
      title: "Kargoya Verilecek",
      description: "Takip numarası iletilecektir",
      status: "pending",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6 font-sans text-zinc-950">
      <div className="max-w-xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Success Header */}
        <div className="text-center space-y-4">
          <div className="relative mx-auto w-20 h-20 mb-6">
            <div className="absolute inset-0 bg-zinc-900 rounded-full animate-ping opacity-5"></div>
            <div className="relative bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-sm border border-zinc-100">
              <CheckCircle
                className="w-10 h-10 text-zinc-900"
                strokeWidth={1.5}
              />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">
            Ödeme Başarılı
          </h1>
          <p className="text-zinc-500 text-sm max-w-xs mx-auto leading-relaxed">
            Siparişiniz başarıyla alındı ve işleme konuldu. Teşekkür ederiz.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm p-8 md:p-10 space-y-10">
          {/* Next Steps List */}
          <div className="space-y-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              Sonraki Adımlar
            </h2>
            <div className="grid gap-4">
              {nextSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                      step.status === "completed"
                        ? "bg-zinc-50/50 border-zinc-100"
                        : "bg-white border-zinc-100/50"
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-xl ${
                        step.status === "completed"
                          ? "bg-zinc-900 text-white"
                          : "bg-zinc-100 text-zinc-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-sm font-bold ${
                          step.status === "pending"
                            ? "text-zinc-400"
                            : "text-zinc-900"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-xs text-zinc-500">
                        {step.description}
                      </p>
                    </div>
                    {step.status === "in-progress" && (
                      <div className="w-4 h-4 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Info Box */}
          <div className="flex gap-4 p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
            <Info className="w-5 h-5 text-zinc-900 shrink-0" />
            <p className="text-[13px] leading-relaxed text-zinc-600">
              Sipariş durumunu <strong>Hesabım &gt; Siparişlerim</strong>{" "}
              kısmından takip edebilirsiniz.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => (window.location.href = "/profile/orders")}
              className="group flex items-center justify-center gap-2 bg-zinc-900 text-white px-6 py-4 rounded-2xl font-bold text-sm transition-all hover:bg-zinc-800 active:scale-95"
            >
              <Package className="w-4 h-4" />
              Siparişlerim
              <ArrowRight className="w-3 h-3 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="flex items-center justify-center gap-2 bg-white text-zinc-900 border border-zinc-200 px-6 py-4 rounded-2xl font-bold text-sm transition-all hover:bg-zinc-50 active:scale-95"
            >
              <Home className="w-4 h-4" />
              Ana Sayfa
            </button>
          </div>
        </div>

        {/* Countdown Footer */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-zinc-100 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-500"></span>
            </span>
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
              Yönlendiriliyor:{" "}
              <span className="text-zinc-900 ml-1">{countdown}s</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
