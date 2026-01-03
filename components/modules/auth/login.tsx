"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Loader2, Minus } from "lucide-react";
import { toast } from "sonner";

export default function LoginForm({
  onLoginSuccess,
}: {
  onLoginSuccess?: (u: any) => void;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        toast.error("Giriş Başarısız", {
          description: "Girdiğiniz bilgiler kayıtlarımızla eşleşmiyor.",
        });
        setIsLoading(false);
        return;
      }
      if (result?.ok) {
        toast.success("Erişim Onaylandı", {
          description: "Yönlendiriliyorsunuz...",
        });
        router.push("/");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Bir hata oluştu.");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-background px-4 py-10 my-20">
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] overflow-hidden">
        {/* Sol Taraf: Editoryal Bölüm */}
        <div className="w-full md:w-[40%] bg-zinc-900 p-12 flex flex-col justify-between relative text-white">
          <div className="space-y-8">
            <div className="w-12 h-[1px] bg-zinc-500" />
            <div>
              <h1 className="text-5xl md:text-6xl font-serif leading-[0.9] tracking-tighter">
                Kişisel <br />
                <span className="italic text-zinc-500 font-light text-4xl md:text-5xl">
                  Arşiviniz
                </span>
              </h1>
              <p className="mt-6 text-zinc-400 text-[10px] tracking-[0.25em] leading-relaxed max-w-[220px] uppercase font-medium">
                Özel kürasyonlara erişim için kimliğinizi doğrulayın.
              </p>
            </div>
          </div>

          <div className="mt-20 md:mt-0 space-y-6">
            <p className="text-[10px] text-zinc-500 tracking-widest uppercase font-bold">
              Yeni Misiniz?
            </p>
            <Link
              href="/register"
              className="group flex items-center gap-4 text-zinc-100 text-xs tracking-[0.3em] hover:text-zinc-400 transition-all uppercase"
            >
              HESAP OLUŞTUR
              <div className="w-12 h-[1px] bg-zinc-700 group-hover:w-20 group-hover:bg-zinc-400 transition-all duration-500" />
            </Link>
          </div>
        </div>

        {/* Sağ Taraf: Minimalist Form */}
        <div className="w-full md:w-[60%] p-10 md:p-20 bg-white">
          <form onSubmit={handleLogin} className="space-y-12">
            {/* E-posta Grubu */}
            <div className="relative group">
              <Label
                htmlFor="email"
                className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 group-focus-within:text-zinc-900 transition-colors duration-300"
              >
                E-posta Adresi
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-zinc-200 rounded-none px-0 py-6 text-zinc-900 text-lg shadow-none focus-visible:ring-0 focus-visible:border-zinc-900 transition-all placeholder:text-zinc-300"
                id="email"
                placeholder="ornek@balkolux.com"
                required
              />
            </div>

            {/* Şifre Grubu */}
            <div className="relative group">
              <div className="flex justify-between items-center">
                <Label
                  htmlFor="password"
                  className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 group-focus-within:text-zinc-900 transition-colors duration-300"
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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-zinc-200 rounded-none px-0 py-6 text-zinc-900 text-lg shadow-none focus-visible:ring-0 focus-visible:border-zinc-900 transition-all"
                id="password"
                required
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-6">
              <Link
                href="/forgot-password"
                className="text-[10px] text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-[0.2em] font-medium"
              >
                Şifremi Hatırlat
              </Link>

              <Button
                type="submit"
                disabled={isLoading}
                className="relative overflow-hidden bg-zinc-900 text-white hover:bg-black px-12 h-16 rounded-none transition-all duration-300 group shadow-lg"
              >
                <span className="relative z-10 flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold">
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    "Giriş Yap"
                  )}
                </span>
              </Button>
            </div>
          </form>

          {/* Alt Bilgi */}
          <div className="mt-24 flex justify-between items-center text-[9px] text-zinc-400 tracking-[0.3em] uppercase border-t border-zinc-100 pt-8">
            <span className="font-semibold text-zinc-900">© 2026 BalkoLüx</span>
            <span className="italic">Küratörlük & Arşiv</span>
          </div>
        </div>
      </div>
    </div>
  );
}
