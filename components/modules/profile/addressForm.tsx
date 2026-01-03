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

// Minimal Input Stili
const inputStyles =
  "border-0 border-b border-zinc-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-zinc-900 transition-colors bg-transparent placeholder:text-zinc-300 h-10 shadow-none";

export default function AdresForm({
  formData,
  setFormData,
  onSave,
}: AddressFormProps) {
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>(
    []
  );
  const [neighborhoods, setNeighborhoods] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    const cityArray = Object.entries(Cities).map(([id, name]) => ({
      id,
      name,
    }));
    setCities(cityArray);
  }, []);

  // İlçe fetch
  useEffect(() => {
    if (!formData.city) return;
    const selectedCityId = cities.find((c) => c.name === formData.city)?.id;
    if (!selectedCityId) return;

    fetch(`/api/location/ilceler/${selectedCityId}`)
      .then((res) => res.json())
      .then((data) => setDistricts(data))
      .catch(console.error);
  }, [formData.city, cities]);

  // Mahalle fetch
  useEffect(() => {
    if (!formData.district) return;
    const selectedDistrict = districts.find(
      (d) => d.name === formData.district
    );
    if (!selectedDistrict) return;

    fetch(`/api/location/mahalleler/${selectedDistrict.id}`)
      .then((res) => res.json())
      .then((data) => setNeighborhoods(data))
      .catch(console.error);
  }, [formData.district, districts]);

  return (
    <form
      className="space-y-12 font-sans"
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {/* Adres Başlığı */}
        <div className="space-y-2 md:col-span-2">
          <Label className="text-[10px] uppercase tracking-widest text-zinc-400 font-light">
            Adres Başlığı *
          </Label>
          <Input
            className={inputStyles}
            placeholder="Ev, İş vb."
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        {/* Ad & Soyad */}
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-widest text-zinc-400 font-light">
            Ad *
          </Label>
          <Input
            className={inputStyles}
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-widest text-zinc-400 font-light">
            Soyad *
          </Label>
          <Input
            className={inputStyles}
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            required
          />
        </div>

        {/* Email & Telefon */}
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-widest text-zinc-400 font-light">
            E-Posta *
          </Label>
          <Input
            type="email"
            className={inputStyles}
            value={formData.email || ""}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-widest text-zinc-400 font-light">
            Telefon *
          </Label>
          <Input
            className={inputStyles}
            value={formData.phone || ""}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
        </div>

        {/* Şehir & İlçe */}
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-widest text-zinc-400 font-light">
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
            <SelectTrigger className="border-0 border-b border-zinc-200 rounded-none px-0 h-10 focus:ring-0 shadow-none">
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-zinc-100 shadow-xl">
              {cities.map((c) => (
                <SelectItem key={c.id} value={c.id} className="text-xs">
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-widest text-zinc-400 font-light">
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
            <SelectTrigger className="border-0 border-b border-zinc-200 rounded-none px-0 h-10 focus:ring-0 shadow-none">
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-zinc-100 shadow-xl">
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
          <Label className="text-[10px] uppercase tracking-widest text-zinc-400 font-light">
            TC Kimlik No *
          </Label>
          <Input
            maxLength={11}
            className={inputStyles}
            value={formData.tcno || ""}
            onChange={(e) => setFormData({ ...formData, tcno: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-widest text-zinc-400 font-light">
            Posta Kodu *
          </Label>
          <Input
            className={inputStyles}
            value={formData.zip || ""}
            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
            required
          />
        </div>

        {/* Detaylı Adres */}
        <div className="space-y-2 md:col-span-2">
          <Label className="text-[10px] uppercase tracking-widest text-zinc-400 font-light">
            Adres Detayı *
          </Label>
          <Input
            className={inputStyles}
            placeholder="Sokak, Bina No, Daire..."
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="pt-6">
        <Button
          type="submit"
          className="bg-zinc-950 hover:bg-zinc-800 text-white rounded-none px-12 py-6 text-[10px] tracking-[0.2em] uppercase transition-all duration-500"
        >
          ADRESİ KAYDET
        </Button>
      </div>
    </form>
  );
}
