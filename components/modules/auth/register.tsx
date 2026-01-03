"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { set } from "date-fns";

interface RegisterFormProps {
  onLoginClick?: () => void;
}

export default function RegisterForm({ onLoginClick }: RegisterFormProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Şifreler eşleşmiyor!");
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
        toast.success("Kayıt başarılı! Giriş yapabilirsiniz.");
        if (onLoginClick) onLoginClick();
        router.push("/login"); // yönlendirme
      }
    } catch (err) {
      console.error(err);
      toast.error("Sunucu hatası, tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fcfcfc] flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-stone-100 overflow-hidden"
      >
        {/* Sol Taraf: Marka Deneyimi */}
        <div className="lg:col-span-5 bg-stone-950 p-12 lg:p-16 flex flex-col justify-between text-white relative overflow-hidden">
          {/* Arka plan dekoratif element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-stone-900 rounded-full blur-[100px] -mr-32 -mt-32 opacity-50" />

          <div className="relative z-10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-[1px] bg-stone-500 mb-12"
            />

            <h1 className="text-5xl lg:text-7xl font-serif leading-[0.85] tracking-tighter mb-8">
              BalkoLüx
            </h1>

            <div className="space-y-6 max-w-[280px]">
              <p className="text-[10px] tracking-[0.3em] uppercase text-stone-500 font-bold">
                Exclusive Access
              </p>
              <p className="text-sm text-stone-400 font-light leading-relaxed">
                Küratörlüğünü üstlendiğimiz sınırlı sayıdaki koleksiyonlara ve
                kişiselleştirilmiş hizmetlerimize erişim sağlayın.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-12 lg:pt-0">
            <p className="text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-4 font-medium">
              Zaten bir hesabınız var mı?
            </p>
            <Link
              href="/login"
              className="group inline-flex items-center gap-6 text-stone-100 hover:text-white transition-all underline-offset-[12px] hover:underline"
            >
              <span className="text-[11px] tracking-[0.4em] uppercase font-bold">
                Giriş Yap
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500 text-stone-500" />
            </Link>
          </div>
        </div>

        {/* Sağ Taraf: Kayıt Formu */}
        <div className="lg:col-span-7 p-8 md:p-16 lg:p-24 bg-white flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <header className="mb-12">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-[10px] tracking-[0.5em] uppercase text-stone-400 font-bold mb-3">
                  Müşteri Kaydı
                </h2>
                <p className="text-3xl font-serif text-stone-900 leading-tight">
                  Kişisel Hesabınızı <br />{" "}
                  <span className="italic">Oluşturun</span>
                </p>
              </motion.div>
            </header>

            <form onSubmit={handleRegister} className="space-y-12">
              {/* İsim & Soyad */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                {/* İsim */}
                <div className="space-y-2">
                  <Label className="block text-[10px] uppercase tracking-[0.25em] text-stone-400">
                    İsim
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 bg-transparent border-0 border-b border-stone-200 rounded-none  py-2 text-sm text-stone-900 focus-visible:ring-0 focus-visible:border-stone-900 transition-colors duration-300"
                  />
                </div>

                {/* Soyad */}
                <div className="space-y-2">
                  <Label className="block text-[10px] uppercase tracking-[0.25em] text-stone-400">
                    Soyad
                  </Label>
                  <Input
                    id="surname"
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    required
                    className="w-full bg-transparent border-0 border-b border-stone-200 rounded-none px-3 py-2 text-sm text-stone-900 focus-visible:ring-0 focus-visible:border-stone-900 transition-colors duration-300"
                  />
                </div>
              </div>

              {/* E-Posta */}
              <div className="space-y-2">
                <Label className="block text-[10px] uppercase tracking-[0.25em] text-stone-400">
                  E-Posta Adresi
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent border-0 border-b border-stone-200 rounded-none px-3 py-2 text-sm text-stone-900 focus-visible:ring-0 focus-visible:border-stone-900 transition-colors duration-300"
                />
              </div>

              {/* Şifreler */}
              <div className="space-y-10">
                {/* Şifre */}
                <div className="space-y-2 relative">
                  <Label className="block text-[10px] uppercase tracking-[0.25em] text-stone-400">
                    Şifre
                  </Label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-transparent border-0 border-b border-stone-200 rounded-none px-3 py-2 pr-8 text-sm text-stone-900 focus-visible:ring-0 focus-visible:border-stone-900 transition-colors duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[34px] text-stone-900/50 hover:text-stone-900 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff size={14} strokeWidth={1.5} />
                    ) : (
                      <Eye size={14} strokeWidth={1.5} />
                    )}
                  </button>
                </div>

                {/* Şifre Onay */}
                <div className="space-y-2 relative">
                  <Label className="block text-[10px] uppercase tracking-[0.25em] text-stone-400">
                    Şifreyi Onayla
                  </Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                     value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full bg-transparent border-0 border-b border-stone-200 rounded-none px-3 py-2 text-sm text-stone-900 focus-visible:ring-0 focus-visible:border-stone-900 transition-colors duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[34px] text-stone-900/50 hover:text-stone-900 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff size={14} strokeWidth={1.5} />
                    ) : (
                      <Eye size={14} strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>

              {/* Yasal Metin & Buton */}
              <div className="space-y-6 pt-4">
                <p className="text-[10px] text-stone-400 leading-relaxed italic max-w-xl">
                  "Kaydı Tamamla" butonuna basarak, üyelik sözleşmesini ve
                  kişisel verilerin korunması politikasını kabul etmiş
                  sayılırsınız.
                </p>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-16 bg-stone-950 text-white hover:bg-black rounded-none transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="relative z-10 flex items-center justify-center gap-4">
                    {isLoading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <>
                        <span className="text-[11px] uppercase tracking-[0.4em] font-bold">
                          Kaydı Tamamla
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </div>

                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                </Button>
              </div>
            </form>

            <footer className="mt-16 pt-8 border-t border-stone-50 flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-widest font-bold text-stone-900">
                  © 2026 BalkoLüx
                </span>
                <span className="text-[8px] uppercase tracking-[0.2em] text-stone-400 italic">
                  Secured & Encrypted
                </span>
              </div>
              <Link
                href="/help"
                className="text-[9px] uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
              >
                Yardım Merkezi
              </Link>
            </footer>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
