"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./sideBar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, Trash2, PlusCircle, X, MapPin } from "lucide-react";
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
  const [adresler, setAdresler] = useState<Address[]>([]);
  const [yeniAdresForm, setYeniAdresForm] = useState(false);
  const [duzenleForm, setDuzenleForm] = useState(false);
  const [duzenlenenAdres, setDuzenlenenAdres] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);

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
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Adresler yüklenemedi.");
        setAdresler(data.addresses || []);
      } catch (error) {
        toast.error("Adresler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

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

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <Sidebar />

      <main className="flex-1 px-6 py-12 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-extralight tracking-tighter text-zinc-900 uppercase">
                Adreslerim
              </h1>
              <div className="h-[1px] w-12 bg-zinc-900" />
              <p className="text-[11px] tracking-[0.2em] text-zinc-400 uppercase leading-relaxed">
                Kayıtlı teslimat ve fatura bilgilerinizi <br /> bu alandan
                modernize edebilirsiniz.
              </p>
            </div>

            <Button
              onClick={() => {
                setYeniAdresForm(!yeniAdresForm);
                setDuzenleForm(false);
                setEkleFormData(initialFormData);
              }}
              className="group flex items-center gap-2 rounded-none bg-zinc-900 text-white px-6 py-6 text-[10px] tracking-widest uppercase hover:bg-zinc-800 transition-all"
            >
              {yeniAdresForm ? <X size={14} /> : <PlusCircle size={14} />}
              <span>{yeniAdresForm ? "Vazgeç" : "Yeni Adres"}</span>
            </Button>
          </header>

          <AnimatePresence mode="wait">
            {/* Formlar */}
            {(yeniAdresForm || duzenleForm) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-20 p-8 border border-zinc-100 bg-zinc-50/30"
              >
                <h3 className="text-xs font-bold tracking-widest uppercase mb-8 text-zinc-800">
                  {duzenleForm ? "Adresi Güncelle" : "Yeni Bilgiler"}
                </h3>
                <AdresForm
                  formData={duzenleForm ? duzenleFormData : ekleFormData}
                  setFormData={
                    duzenleForm ? setDuzenleFormData : setEkleFormData
                  }
                  onSave={duzenleForm ? handleDuzenleKaydet : handleEkleKaydet}
                />
              </motion.div>
            )}

            {/* Adres Listesi */}
            {!loading && !yeniAdresForm && !duzenleForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 gap-12"
              >
                {adresler.length > 0 ? (
                  adresler.map((a) => (
                    <div
                      key={a.id}
                      className="group flex flex-col md:flex-row justify-between items-start border-b border-zinc-100 pb-10 last:border-0 transition-colors"
                    >
                      <div className="space-y-4 max-w-lg">
                        <div className="flex items-center gap-3">
                          <MapPin size={14} className="text-zinc-400" />
                          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900">
                            {a.title}
                          </h3>
                        </div>

                        <div className="space-y-1">
                          <p className="text-xs font-medium text-zinc-800 uppercase tracking-tight">
                            {a.firstName} {a.lastName}
                          </p>
                          <p className="text-[13px] text-zinc-500 font-light leading-relaxed italic">
                            {a.address} <br />
                            {a.neighborhood && `${a.neighborhood}, `}{" "}
                            {a.district} / {a.city}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] tracking-widest text-zinc-400 uppercase">
                          <span>{a.phone}</span>
                          {a.tcno && <span>TC: {a.tcno}</span>}
                          <span>{a.country}</span>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-6 md:mt-0">
                        <button
                          onClick={() => handleDuzenle(a)}
                          className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 hover:text-zinc-900 flex items-center gap-1 transition-all"
                        >
                          <Edit size={12} /> Düzenle
                        </button>
                        <button
                          onClick={() => handleSil(a.id)}
                          className="text-[10px] tracking-[0.2em] uppercase text-zinc-300 hover:text-red-500 flex items-center gap-1 transition-all"
                        >
                          <Trash2 size={12} /> Sil
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

          {loading && <LoadingSkeleton />}
        </div>
      </main>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-20 text-center border-t border-zinc-100">
      <p className="text-xs tracking-widest text-zinc-400 uppercase mb-4 italic">
        Kayıtlı adres bulunamadı
      </p>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-12">
      {[1, 2].map((i) => (
        <div key={i} className="border-b border-zinc-100 pb-10">
          <Skeleton className="h-4 w-32 mb-4 bg-zinc-50" />
          <Skeleton className="h-20 w-full bg-zinc-50" />
        </div>
      ))}
    </div>
  );
}
