"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Cities from "@/public/city.json";
import { toast } from "sonner";

export interface AddressFormData {
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

export interface AddressFormProps {
  formData: AddressFormData;
  setFormData: React.Dispatch<React.SetStateAction<AddressFormData>>;
  onSave: () => void;
}

const inputStyles =
  "border-0 border-b border-zinc-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-zinc-900 transition-colors bg-transparent placeholder:text-zinc-300 h-10 shadow-none w-full";

export default function AdresForm({
  formData,
  setFormData,
  onSave,
}: AddressFormProps) {
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    const cityArray = Object.entries(Cities).map(([id, name]) => ({
      id,
      name,
    }));
    setCities(cityArray);
  }, []);

  useEffect(() => {
    if (!formData.city) return;
    const selectedCityId = cities.find((c) => c.name === formData.city)?.id;
    if (!selectedCityId) return;

    fetch(`/api/location/ilceler/${selectedCityId}`)
      .then((res) => res.json())
      .then((data) => setDistricts(data))
      .catch(console.error);
  }, [formData.city, cities]);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Türkiye telefon formatı kontrolü (0 ile başlayan 11 hane veya 5 ile başlayan 10 hane)
    const phoneClean = formData.phone?.replace(/\D/g, "");

    if (!formData.title || formData.title.length < 2) {
      toast.error("Lütfen geçerli bir adres başlığı giriniz.");
      return false;
    }
    if (!formData.firstName || formData.firstName.length < 2) {
      toast.error("Lütfen geçerli bir isim giriniz.");
      return false;
    }
    if (!formData.lastName || formData.lastName.length < 2) {
      toast.error("Lütfen geçerli bir soyisim giriniz.");
      return false;
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      toast.error("Lütfen geçerli bir e-posta adresi giriniz.");
      return false;
    }
    if (!phoneClean || (phoneClean.length !== 10 && phoneClean.length !== 11)) {
      toast.error("Telefon numarası 10 veya 11 hane olmalıdır.");
      return false;
    }
    if (!formData.city) {
      toast.error("Lütfen bir şehir seçiniz.");
      return false;
    }
    if (!formData.district) {
      toast.error("Lütfen bir ilçe seçiniz.");
      return false;
    }
    if (!formData.tcno || formData.tcno.length !== 11) {
      toast.error("TC Kimlik Numarası 11 hane olmalıdır.");
      return false;
    }
    if (!formData.zip || formData.zip.length < 5) {
      toast.error("Lütfen geçerli bir posta kodu giriniz.");
      return false;
    }
    if (!formData.address || formData.address.length < 10) {
      toast.error(
        "Adres detayı çok kısa. Lütfen daha açıklayıcı bir adres giriniz."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave();
    }
  };

  return (
    <form className="space-y-12 font-sans" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {/* Adres Başlığı - Full Width */}
        <div className="space-y-2 md:col-span-2">
          <Label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-light">
            Adres Başlığı *
          </Label>
          <Input
            className={inputStyles}
            placeholder="Örn: Ev Adresim"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        {/* Ad & Soyad */}
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-light">
            Ad *
          </Label>
          <Input
            className={inputStyles}
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-light">
            Soyad *
          </Label>
          <Input
            className={inputStyles}
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </div>

        {/* Email & Telefon */}
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-light">
            E-Posta *
          </Label>
          <Input
            type="email"
            className={inputStyles}
            placeholder="ornek@alanadi.com"
            value={formData.email || ""}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-light">
            Telefon *
          </Label>
          <Input
            className={inputStyles}
            placeholder="05XXXXXXXXX"
            value={formData.phone || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value.replace(/\D/g, ""),
              })
            }
          />
        </div>

        {/* Şehir & İlçe - Full Width Elements in Grid */}
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-light">
            Şehir *
          </Label>
          <Select
            value={cities.find((c) => c.name === formData.city)?.id || ""}
            onValueChange={(value) => {
              const selectedCity = cities.find((c) => c.id === value);
              setFormData((prev) => ({
                ...prev,
                city: selectedCity?.name || "",
                district: "",
                neighborhood: "",
              }));
            }}
          >
            <SelectTrigger className="w-full border-0 border-b border-zinc-200 rounded-none px-0 h-10 focus:ring-0 shadow-none">
              <SelectValue placeholder="Şehir Seçiniz" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              {cities.map((c) => (
                <SelectItem key={c.id} value={c.id} className="text-xs">
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-light">
            İlçe *
          </Label>
          <Select
            value={
              districts
                .find((d) => d.name === formData.district)
                ?.id.toString() || ""
            }
            onValueChange={(value) => {
              const selectedDistrict = districts.find(
                (d) => d.id.toString() === value
              );
              setFormData((prev) => ({
                ...prev,
                district: selectedDistrict?.name || "",
                neighborhood: "",
              }));
            }}
            disabled={!formData.city}
          >
            <SelectTrigger className="w-full border-0 border-b border-zinc-200 rounded-none px-0 h-10 focus:ring-0 shadow-none">
              <SelectValue placeholder="İlçe Seçiniz" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              {districts.map((d) => (
                <SelectItem
                  key={d.id}
                  value={d.id.toString()}
                  className="text-xs"
                >
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* TC No & Posta Kodu */}
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-light">
            TC Kimlik No *
          </Label>
          <Input
            maxLength={11}
            className={inputStyles}
            value={formData.tcno || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                tcno: e.target.value.replace(/\D/g, ""),
              })
            }
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-light">
            Posta Kodu *
          </Label>
          <Input
            maxLength={5}
            className={inputStyles}
            value={formData.zip || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                zip: e.target.value.replace(/\D/g, ""),
              })
            }
          />
        </div>

        {/* Detaylı Adres - Full Width */}
        <div className="space-y-2 md:col-span-2">
          <Label className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-light">
            Adres Detayı *
          </Label>
          <Input
            className={inputStyles}
            placeholder="Mahalle, Sokak, No, Daire..."
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>
      </div>

      <div className="pt-6">
        <Button
          type="submit"
          className="w-full md:w-auto bg-zinc-950 hover:bg-zinc-800 text-white rounded-none px-16 py-7 text-[10px] tracking-[0.3em] uppercase transition-all duration-500"
        >
          ADRESİ KAYDET
        </Button>
      </div>
    </form>
  );
}
