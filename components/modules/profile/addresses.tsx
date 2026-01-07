"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // 1. Router import edildi
import Sidebar from "./sideBar";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import AdresForm from "./addressForm";

// ==== Tip Tanımları ====
interface Address {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  district: string;
  city: string;
  neighborhood?: string;
  zip?: string;
  phone?: string;
  country?: string;
  email?: string;
  tcno?: string;
}

interface AddressFormData {
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  district: string;
  neighborhood: string;
  zip?: string;
  phone?: string;
  country?: string;
  email?: string;
  tcno?: string;
}

export default function Adreslerim() {
  const router = useRouter(); // 2. Router tanımlandı
  const [adresler, setAdresler] = useState<Address[]>([]);
  const [yeniAdresForm, setYeniAdresForm] = useState(false);
  const [duzenleForm, setDuzenleForm] = useState(false);
  const [duzenlenenAdres, setDuzenlenenAdres] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false); // Auth kontrolü için state

  const initialFormData: AddressFormData = {
    title: "",
    firstName: "",
    lastName: "",
    address: "",
    district: "",
    city: "",
    neighborhood: "",
    zip: "",
    phone: "",
    country: "Türkiye",
    email: "",
    tcno: "",
  };

  const [ekleFormData, setEkleFormData] =
    useState<AddressFormData>(initialFormData);
  const [duzenleFormData, setDuzenleFormData] =
    useState<AddressFormData>(initialFormData);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await fetch("/api/address", { method: "GET" });

        // 3. Oturum Kontrolü
        if (res.status === 401) {
          router.push("/login");
          return;
        }

        if (!res.ok) throw new Error("Adresler yüklenemedi.");

        const data = await res.json();
        setAdresler(data.addresses || []);
        setIsAuthorized(true); // Kullanıcı yetkili
      } catch (error) {
        console.error("Auth/Fetch error:", error);
        toast.error("Oturum doğrulanamadı.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, [router]);

  const handleSil = async (id: number) => {
    try {
      const res = await fetch(`/api/address/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Silinemedi");
      setAdresler((prev) => prev.filter((a) => a.id !== id));
      toast.success("Adres silindi.");
    } catch (error) {
      toast.error("Silme işlemi başarısız.");
    }
  };

  const handleEkleKaydet = async () => {
    if (
      !ekleFormData.firstName ||
      !ekleFormData.address ||
      !ekleFormData.city
    ) {
      toast.error("Lütfen zorunlu alanları doldurun.");
      return;
    }
    try {
      const res = await fetch("/api/address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ekleFormData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAdresler((prev) => [data.address, ...prev]);
      toast.success("Yeni adres kaydedildi.");
      setYeniAdresForm(false);
      setEkleFormData(initialFormData);
    } catch (error) {
      toast.error("Kaydedilemedi.");
    }
  };

  const handleDuzenle = (adres: Address) => {
    setDuzenlenenAdres(adres);
    setDuzenleFormData({ ...adres, neighborhood: adres.neighborhood || "" });
    setDuzenleForm(true);
    setYeniAdresForm(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDuzenleKaydet = async () => {
    if (!duzenlenenAdres) return;
    try {
      const res = await fetch(`/api/address/${duzenlenenAdres.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(duzenleFormData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAdresler((prev) =>
        prev.map((a) => (a.id === duzenlenenAdres.id ? data.address : a))
      );
      toast.success("Adres güncellendi.");
      setDuzenleForm(false);
    } catch (error) {
      toast.error("Güncellenemedi.");
    }
  };

  // Yükleme sırasında skeleton göster
  if (loading)
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-[#FBFBFB]">
        <Sidebar />
        <main className="flex-1 px-4 py-10 md:px-12 lg:px-20">
          <div className="max-w-5xl mx-auto">
            <LoadingSkeleton />
          </div>
        </main>
      </div>
    );

  // Yetkisizse render etme (router yönlendirmesi çalışana kadar)
  if (!isAuthorized) return null;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#FBFBFB] text-zinc-900">
      <Sidebar />

      <main className="flex-1 px-4 py-10 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="mb-8">
              <h1 className="text-3xl font-light tracking-tight mb-2 italic">
                Adreslerim
              </h1>
              <p className="text-zinc-500 text-[11px] uppercase tracking-[0.2em] font-light">
                Teslimat ve fatura adreslerinizi buradan yönetin.
              </p>
            </div>

            <button
              onClick={() => {
                setYeniAdresForm(!yeniAdresForm);
                setDuzenleForm(false);
                setEkleFormData(initialFormData);
              }}
              className="group flex items-center gap-3 border-b border-zinc-900 pb-1 text-[10px] tracking-[0.3em] uppercase transition-all hover:gap-5"
            >
              {yeniAdresForm ? (
                <X size={14} strokeWidth={1.5} />
              ) : (
                <Plus size={14} strokeWidth={1.5} />
              )}
              <span>{yeniAdresForm ? "Vazgeç" : "Yeni Ekle"}</span>
            </button>
          </header>

          <AnimatePresence mode="wait">
            {(yeniAdresForm || duzenleForm) && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="mb-24 p-10 bg-white border border-zinc-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]"
              >
                <div className="flex items-center gap-2 mb-10 text-[10px] tracking-widest text-zinc-400 uppercase">
                  <span className="w-4 h-[1px] bg-zinc-300" />
                  {duzenleForm ? "Kayıt Güncelleme" : "Yeni Kayıt Oluşturma"}
                </div>
                <AdresForm
                  formData={duzenleForm ? duzenleFormData : ekleFormData}
                  setFormData={
                    duzenleForm ? setDuzenleFormData : setEkleFormData
                  }
                  onSave={duzenleForm ? handleDuzenleKaydet : handleEkleKaydet}
                />
              </motion.div>
            )}

            {!yeniAdresForm && !duzenleForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-16"
              >
                {adresler.length > 0 ? (
                  adresler.map((a) => (
                    <div
                      key={a.id}
                      className="group relative flex flex-col md:flex-row justify-between items-start pb-12 border-b border-zinc-100 last:border-0"
                    >
                      <div className="space-y-5 flex-1">
                        <div className="flex items-center gap-4">
                          <span className="text-[9px] tracking-[0.3em] text-zinc-300 uppercase font-medium">
                            #{a.id}
                          </span>
                          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-900">
                            {a.title}
                          </h3>
                        </div>

                        <div className="space-y-2">
                          <p className="text-[12px] font-medium text-zinc-800 tracking-tight">
                            {a.firstName} {a.lastName}
                          </p>
                          <p className="text-[13px] text-zinc-500 font-light leading-relaxed max-w-md">
                            {a.address} <br />
                            <span className="text-zinc-400 text-[12px]">
                              {a.neighborhood && `${a.neighborhood}, `}
                              {a.district} / {a.city}
                            </span>
                          </p>
                        </div>

                        <div className="flex gap-8 text-[9px] tracking-[0.2em] text-zinc-400 uppercase pt-2">
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-zinc-200" />
                            {a.phone}
                          </div>
                          {a.tcno && <span>{a.tcno}</span>}
                        </div>
                      </div>

                      <div className="flex md:flex-col gap-6 mt-8 md:mt-0 items-end">
                        <button
                          onClick={() => handleDuzenle(a)}
                          className="text-[9px] tracking-[0.3em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors py-1"
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => handleSil(a.id)}
                          className="text-[9px] tracking-[0.3em] uppercase text-zinc-300 hover:text-red-400 transition-colors py-1"
                        >
                          Kaldır
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-32 text-center">
      <p className="text-[10px] tracking-[0.3em] text-zinc-300 uppercase italic">
        Henüz bir adres tanımlanmadı
      </p>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-16">
      <div className="mb-12">
        <Skeleton className="h-10 w-48 mb-4 bg-zinc-100" />
        <Skeleton className="h-4 w-64 bg-zinc-50" />
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="pb-12 border-b border-zinc-100">
          <Skeleton className="h-3 w-24 mb-6 bg-zinc-100" />
          <Skeleton className="h-4 w-48 mb-3 bg-zinc-50" />
          <Skeleton className="h-12 w-full bg-zinc-50/50" />
        </div>
      ))}
    </div>
  );
}
