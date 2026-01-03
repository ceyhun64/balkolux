"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Sidebar from "./sideBar";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface UserData {
  name: string;
  surname: string;
  phone?: string | null;
  email: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export default function KisiselBilgilerim() {
  const [user, setUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user", { method: "GET" });
        if (!res.ok) throw new Error("Hata");
        const data = await res.json();
        const userData = data.user;
        setUser(userData);
        setFormData({
          firstName: userData.name || "",
          lastName: userData.surname || "",
          phone: userData.phone?.replace("+90", "") || "",
          email: userData.email || "",
        });
      } catch {
        toast.error("Bilgiler yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone ? `+90${formData.phone}` : null,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Değişiklikler kaydedildi.");
    } catch {
      toast.error("Güncellenemedi.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <PersonalLoadingSkeleton />;

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col md:flex-row max-w-[1600px] mx-auto">
        <Sidebar />

        <main className="flex-1 px-6 py-16 md:px-16 md:py-24">
          <div className="max-w-2xl">
            {/* Minimal Header */}
            <header className="mb-16 space-y-3">
              <span className="text-[10px] tracking-[0.4em] text-zinc-400 uppercase font-light">
                Hesap Ayarları
              </span>
              <h1 className="text-4xl font-extralight tracking-tight text-zinc-900">
                Kişisel Bilgiler
              </h1>
            </header>

            <form onSubmit={handleSave} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {/* Ad */}
                <div className="space-y-3">
                  <Label
                    htmlFor="firstName"
                    className="text-[11px] uppercase tracking-widest text-zinc-500 font-light"
                  >
                    Ad
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="border-0 border-b border-zinc-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-zinc-900 transition-colors bg-transparent placeholder:text-zinc-300 h-10"
                    placeholder="Adınız"
                    required
                  />
                </div>

                {/* Soyad */}
                <div className="space-y-3">
                  <Label
                    htmlFor="lastName"
                    className="text-[11px] uppercase tracking-widest text-zinc-500 font-light"
                  >
                    Soyad
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="border-0 border-b border-zinc-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-zinc-900 transition-colors bg-transparent placeholder:text-zinc-300 h-10"
                    placeholder="Soyadınız"
                    required
                  />
                </div>

                {/* E-posta (Disabled) */}
                <div className="space-y-3">
                  <Label
                    htmlFor="email"
                    className="text-[11px] uppercase tracking-widest text-zinc-500 font-light opacity-50"
                  >
                    E-Posta Adresi
                  </Label>
                  <Input
                    id="email"
                    value={formData.email}
                    disabled
                    className="border-0 border-b border-zinc-100 rounded-none px-0 bg-transparent text-zinc-400 cursor-not-allowed h-10"
                  />
                </div>

                {/* Telefon */}
                <div className="space-y-3">
                  <Label
                    htmlFor="phone"
                    className="text-[11px] uppercase tracking-widest text-zinc-500 font-light"
                  >
                    Telefon
                  </Label>
                  <div className="relative">
                    <span className="absolute left-0 top-2 text-sm text-zinc-400 font-light">
                      +90
                    </span>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="border-0 border-b border-zinc-200 rounded-none pl-10 pr-0 focus-visible:ring-0 focus-visible:border-zinc-900 transition-colors bg-transparent h-10"
                      placeholder="5xx xxx xx xx"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-zinc-950 hover:bg-zinc-800 text-white rounded-none px-12 py-6 text-[10px] tracking-[0.2em] uppercase transition-all duration-500 disabled:opacity-50"
                >
                  {saving ? "GÜNCELLENİYOR..." : "DEĞİŞİKLİKLERİ KAYDET"}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

function PersonalLoadingSkeleton() {
  return (
    <div className="flex max-w-[1600px] mx-auto min-h-screen">
      <Skeleton className="w-64 md:w-72 h-screen rounded-none bg-zinc-50" />
      <div className="flex-1 px-16 py-24 space-y-12">
        <Skeleton className="h-12 w-64 bg-zinc-50" />
        <div className="grid grid-cols-2 gap-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-3 w-20 bg-zinc-50" />
              <Skeleton className="h-10 w-full bg-zinc-50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
