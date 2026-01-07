"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Sidebar from "./sideBar";
import { toast } from "sonner";
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
  const router = useRouter();
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

        // --- Giriş Kontrolü ---
        if (res.status === 401) {
          router.push("/login");
          return;
        }

        if (!res.ok) throw new Error("Veri alınamadı");

        const data = await res.json();
        const userData = data.user;

        if (!userData) {
          router.push("/login");
          return;
        }

        setUser(userData);
        setFormData({
          firstName: userData.name || "",
          lastName: userData.surname || "",
          phone: userData.phone?.replace("+90", "") || "",
          email: userData.email || "",
        });
      } catch (error) {
        console.error("Auth Error:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  // --- Validation Mantığı ---
  const validateForm = () => {
    const nameRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/;
    const phoneClean = formData.phone.replace(/\D/g, "");

    if (!formData.firstName.trim() || formData.firstName.length < 2) {
      toast.error("Lütfen geçerli bir isim giriniz.");
      return false;
    }
    if (!nameRegex.test(formData.firstName)) {
      toast.error("İsim sadece harflerden oluşmalıdır.");
      return false;
    }
    if (!formData.lastName.trim() || formData.lastName.length < 2) {
      toast.error("Lütfen geçerli bir soyisim giriniz.");
      return false;
    }
    if (!nameRegex.test(formData.lastName)) {
      toast.error("Soyisim sadece harflerden oluşmalıdır.");
      return false;
    }
    if (phoneClean && (phoneClean.length < 10 || phoneClean.length > 11)) {
      toast.error("Telefon numarası 10 veya 11 hane olmalıdır.");
      return false;
    }
    if (phoneClean && !phoneClean.startsWith("5")) {
      toast.error("Telefon numarası 5xx ile başlamalıdır.");
      return false;
    }

    return true;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSaving(true);
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          phone: formData.phone
            ? `+90${formData.phone.replace(/\D/g, "")}`
            : null,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Bilgileriniz başarıyla güncellendi.");
    } catch (err) {
      toast.error("Güncelleme yapılamadı, lütfen tekrar deneyin.");
    } finally {
      setSaving(false);
    }
  };

  // Yükleme ekranı
  if (loading) return <PersonalLoadingSkeleton />;

  // Kullanıcı yoksa (yönlendirme öncesi boş render)
  if (!user) return null;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#FBFBFB] text-zinc-900">
      <Sidebar />

      <main className="flex-1 px-4 py-10 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-100 pb-8">
            <div>
              <h1 className="text-3xl font-light tracking-tight mb-2 italic">
                Kişisel Bilgilerim
              </h1>
              <p className="text-zinc-500 text-[11px] uppercase tracking-[0.2em] font-light">
                Profilinizi ve iletişim bilgilerinizi buradan yönetin.
              </p>
            </div>
          </header>

          <form onSubmit={handleSave} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              {/* Ad */}
              <div className="space-y-3">
                <Label
                  htmlFor="firstName"
                  className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium"
                >
                  Ad *
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="border-0 border-b border-zinc-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-zinc-900 transition-colors bg-transparent placeholder:text-zinc-200 h-10 shadow-none"
                  placeholder="Adınız"
                />
              </div>

              {/* Soyad */}
              <div className="space-y-3">
                <Label
                  htmlFor="lastName"
                  className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium"
                >
                  Soyad *
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="border-0 border-b border-zinc-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-zinc-900 transition-colors bg-transparent placeholder:text-zinc-200 h-10 shadow-none"
                  placeholder="Soyadınız"
                />
              </div>

              {/* E-posta (Statik) */}
              <div className="space-y-3 opacity-60">
                <Label
                  htmlFor="email"
                  className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium"
                >
                  E-Posta Adresi
                </Label>
                <Input
                  id="email"
                  value={formData.email}
                  disabled
                  className="border-0 border-b border-zinc-100 rounded-none px-0 bg-transparent text-zinc-400 cursor-not-allowed h-10 shadow-none"
                />
              </div>

              {/* Telefon */}
              <div className="space-y-3">
                <Label
                  htmlFor="phone"
                  className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium"
                >
                  Telefon
                </Label>
                <div className="relative">
                  <span className="absolute left-0 top-2 text-sm text-zinc-400 font-light">
                    +90
                  </span>
                  <Input
                    id="phone"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    className="border-0 border-b border-zinc-200 rounded-none pl-10 pr-0 focus-visible:ring-0 focus-visible:border-zinc-900 transition-colors bg-transparent h-10 placeholder:text-zinc-200 shadow-none"
                    placeholder="5xx xxx xx xx"
                  />
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Button
                type="submit"
                disabled={saving}
                className="bg-zinc-950 hover:bg-zinc-800 text-white rounded-none px-12 py-7 text-[10px] tracking-[0.3em] uppercase transition-all duration-500 disabled:opacity-30 active:scale-[0.98] shadow-none w-full md:w-auto"
              >
                {saving ? "GÜNCELLENİYOR..." : "DEĞİŞİKLİKLERİ KAYDET"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

function PersonalLoadingSkeleton() {
  return (
    <div className="flex max-w-[1600px] mx-auto min-h-screen bg-white">
      <Skeleton className="w-64 md:w-72 h-screen rounded-none bg-zinc-50" />
      <div className="flex-1 px-16 py-24 space-y-12">
        <Skeleton className="h-10 w-48 bg-zinc-50" />
        <div className="grid grid-cols-2 gap-x-12 gap-y-16">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-2 w-16 bg-zinc-50" />
              <Skeleton className="h-10 w-full bg-zinc-50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
