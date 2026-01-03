"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        toast.error("E-posta veya şifre hatalı");
        return;
      }

      toast.success("Giriş başarılı");
      router.push("/");
    } catch (err) {
      toast.error("Giriş sırasında bir hata oluştu");
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
        {/* SOL: MARKA / EDITORYAL */}
        <div className="lg:col-span-5 bg-stone-950 p-12 lg:p-16 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-stone-900 rounded-full blur-[100px] -mr-32 -mt-32 opacity-50" />

          <div className="relative z-10">
            <div className="h-[1px] w-12 bg-stone-500 mb-12" />

            <h1 className="text-5xl lg:text-7xl font-serif leading-[0.85] tracking-tighter mb-8">
              BalkoLüx
            </h1>

            <p className="text-[10px] tracking-[0.3em] uppercase text-stone-500 font-bold mb-4">
              Member Access
            </p>

            <p className="text-sm text-stone-400 font-light leading-relaxed max-w-[260px]">
              Kişisel arşivinize, favorilerinize ve özel koleksiyonlara erişin.
            </p>
          </div>

          <div className="relative z-10 pt-12 lg:pt-0">
            <p className="text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-4 font-medium">
              Henüz hesabınız yok mu?
            </p>
            <Link
              href="/register"
              className="group inline-flex items-center gap-6 text-stone-100 hover:text-white transition-all underline-offset-[12px] hover:underline"
            >
              <span className="text-[11px] tracking-[0.4em] uppercase font-bold">
                Hesap Oluştur
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500 text-stone-500" />
            </Link>
          </div>
        </div>

        {/* SAĞ: LOGIN FORM */}
        <div className="lg:col-span-7 p-8 md:p-16 lg:p-24 bg-white flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <header className="mb-12">
              <h2 className="text-[10px] tracking-[0.5em] uppercase text-stone-400 font-bold mb-3">
                Giriş Yap
              </h2>
              <p className="text-3xl font-serif text-stone-900 leading-tight">
                Kişisel <span className="italic">Arşivinize</span> Erişin
              </p>
            </header>

            <form onSubmit={handleLogin} className="space-y-12">
              {/* EMAIL */}
              <div className="space-y-2">
                <Label className="block text-[10px] uppercase tracking-[0.25em] text-stone-400">
                  E-Posta
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent border-0 border-b border-stone-200 rounded-none px-3 py-2 text-sm text-stone-900 focus-visible:ring-0 focus-visible:border-stone-900 transition-colors"
                />
              </div>

              {/* PASSWORD */}
              <div className="space-y-2 relative">
                <Label className="block text-[10px] uppercase tracking-[0.25em] text-stone-400">
                  Şifre
                </Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent border-0 border-b border-stone-200 rounded-none px-3 py-2 pr-10 text-sm text-stone-900 focus-visible:ring-0 focus-visible:border-stone-900 transition-colors"
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

              {/* BUTTON */}
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
                        Giriş Yap
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              </Button>
            </form>

            <footer className="mt-16 pt-8 border-t border-stone-50 flex justify-between items-center">
              <span className="text-[9px] uppercase tracking-widest font-bold text-stone-900">
                © 2026 BalkoLüx
              </span>
              <Link
                href="/forgot-password"
                className="text-[9px] uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
              >
                Şifremi Unuttum
              </Link>
            </footer>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
