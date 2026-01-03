"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Minus } from "lucide-react";
import { toast } from "sonner";

interface RegisterFormProps {
  onLoginClick?: () => void;
}

export default function RegisterForm({ onLoginClick }: RegisterFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Şifre Hatası", {
        description: "Şifreler birbiriyle eşleşmiyor.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/account/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Kayıt başarısız!");
      } else {
        toast.success("Kayıt Başarılı", {
          description: "Arşivimize hoş geldiniz. Giriş yapabilirsiniz.",
        });
        if (onLoginClick) onLoginClick();
        router.push("/login");
      }
    } catch (err) {
      toast.error("Sunucu Hatası", {
        description: "Lütfen daha sonra tekrar deneyiniz.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-background px-4 py-10 my-30">
      <div className="w-full max-w-7xl flex flex-col md:flex-row bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] overflow-hidden">
        {/* Sol Taraf: Editoryal Bölüm (Kayıt Bilgilendirme) */}
        <div className="w-full md:w-[40%] bg-zinc-900 p-12 flex flex-col justify-between relative text-white">
          <div className="space-y-8">
            <div className="w-12 h-[1px] bg-zinc-500" />
            <div>
              <h1 className="text-5xl md:text-6xl font-serif leading-[0.9] tracking-tighter">
                Yeni Bir <br />
                <span className="italic text-zinc-500 font-light text-4xl md:text-5xl">
                  Başlangıç
                </span>
              </h1>
              <div className="mt-8 space-y-4">
                <p className="text-zinc-400 text-[10px] tracking-[0.25em] uppercase font-bold">
                  Üyeliğin Avantajları:
                </p>
                <ul className="text-zinc-500 text-[10px] tracking-[0.15em] leading-relaxed uppercase space-y-2 font-light">
                  <li>• Kişiselleştirilmiş Arşiv Erişimi</li>
                  <li>• Sipariş Takibi ve Geçmişi</li>
                  <li>• Öncelikli Kürasyon Bildirimleri</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-20 md:mt-0 space-y-6">
            <p className="text-[10px] text-zinc-500 tracking-widest uppercase font-bold">
              Zaten Üye Misiniz?
            </p>
            <Link
              href="/login"
              className="group flex items-center gap-4 text-zinc-100 text-xs tracking-[0.3em] hover:text-zinc-400 transition-all uppercase"
            >
              GİRİŞ YAP
              <div className="w-12 h-[1px] bg-zinc-700 group-hover:w-20 group-hover:bg-zinc-400 transition-all duration-500" />
            </Link>
          </div>
        </div>

        {/* Sağ Taraf: Minimalist Kayıt Formu */}
        <div className="w-full md:w-[60%] p-10 md:p-20 bg-white">
          <form onSubmit={handleRegister} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* İsim */}
              <div className="relative group">
                <Label
                  htmlFor="name"
                  className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 group-focus-within:text-zinc-900 transition-colors"
                >
                  İsim
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-zinc-200 rounded-none px-0 py-4 text-zinc-900 text-lg shadow-none focus-visible:ring-0 focus-visible:border-zinc-900 transition-all"
                  required
                />
              </div>

              {/* Soyad */}
              <div className="relative group">
                <Label
                  htmlFor="surname"
                  className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 group-focus-within:text-zinc-900 transition-colors"
                >
                  Soyad
                </Label>
                <Input
                  id="surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-zinc-200 rounded-none px-0 py-4 text-zinc-900 text-lg shadow-none focus-visible:ring-0 focus-visible:border-zinc-900 transition-all"
                  required
                />
              </div>
            </div>

            {/* E-posta */}
            <div className="relative group">
              <Label
                htmlFor="email"
                className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 group-focus-within:text-zinc-900 transition-colors"
              >
                E-posta Adresi
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-zinc-200 rounded-none px-0 py-4 text-zinc-900 text-lg shadow-none focus-visible:ring-0 focus-visible:border-zinc-900 transition-all placeholder:text-zinc-200"
                placeholder="ornek@balkolux.com"
                required
              />
            </div>

            {/* Şifre */}
            <div className="relative group">
              <div className="flex justify-between items-center">
                <Label
                  htmlFor="password"
                  className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 group-focus-within:text-zinc-900 transition-colors"
                >
                  Şifre
                </Label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-zinc-200 rounded-none px-0 py-4 text-zinc-900 text-lg shadow-none focus-visible:ring-0 focus-visible:border-zinc-900 transition-all"
                required
              />
            </div>

            {/* Şifre Tekrar */}
            <div className="relative group">
              <Label
                htmlFor="confirmPassword"
                className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 group-focus-within:text-zinc-900 transition-colors"
              >
                Şifreyi Onayla
              </Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-zinc-200 rounded-none px-0 py-4 text-zinc-900 text-lg shadow-none focus-visible:ring-0 focus-visible:border-zinc-900 transition-all"
                required
              />
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full relative overflow-hidden bg-zinc-900 text-white hover:bg-black px-12 h-16 rounded-none transition-all duration-300 group shadow-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold">
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    "Hesabı Oluştur"
                  )}
                </span>
              </Button>
            </div>
          </form>

          {/* Alt Bilgi */}
          <div className="mt-20 flex justify-between items-center text-[9px] text-zinc-400 tracking-[0.3em] uppercase border-t border-zinc-100 pt-8">
            <span className="font-semibold text-zinc-900">© 2026 BalkoLüx</span>
            <span className="italic">Membership & Registry</span>
          </div>
        </div>
      </div>
    </div>
  );
}
