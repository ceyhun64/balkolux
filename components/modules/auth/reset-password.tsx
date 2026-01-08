"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, ArrowLeft, Lock } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Geçersiz veya eksik doğrulama kodu.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/account/reset_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Bir hata oluştu");
        return;
      }

      toast.success("Şifreniz başarıyla güncellendi!");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      toast.error("Sunucu hatası, tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[380px] relative z-10"
    >
      {/* Header Bölümü */}
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="w-12 h-12 bg-stone-950 rounded-full flex items-center justify-center mb-6 shadow-xl">
          <Lock className="text-white w-5 h-5 font-light" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-serif text-stone-900 tracking-tight">
          Yeni Şifre Belirle
        </h1>
        <p className="text-stone-400 text-sm mt-3 leading-relaxed font-light">
          Lütfen hesabınız için güçlü ve yeni bir şifre oluşturun.
        </p>
      </div>

      {/* Form Alanı */}
      <form onSubmit={handleResetPassword} className="space-y-8">
        <div className="relative group">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Yeni Şifreniz"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-14 border-0 border-b border-stone-200 rounded-none bg-transparent px-0 text-base focus-visible:ring-0 focus-visible:border-stone-950 transition-all placeholder:text-stone-300"
          />
          <button
            type="button"
            className="absolute right-0 bottom-3 text-stone-300 hover:text-stone-950 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={18} strokeWidth={1.5} />
            ) : (
              <Eye size={18} strokeWidth={1.5} />
            )}
          </button>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="h-14 w-full bg-stone-950 text-white rounded-none font-light tracking-[0.15em] uppercase text-xs transition-all hover:bg-stone-800 active:scale-[0.98] disabled:opacity-50"
        >
          {isLoading ? "Güncelleniyor..." : "Şifreyi Güncelle"}
        </Button>
      </form>

      {/* Footer / Linkler */}
      <div className="mt-12 flex flex-col items-center gap-8">
        <Link
          href="/login"
          className="group flex items-center gap-2 text-xs font-medium text-stone-500 hover:text-stone-950 transition-colors tracking-widest uppercase"
        >
          <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
          Vazgeç ve Dön
        </Link>

        <div className="flex items-center gap-4 w-full">
          <div className="h-[1px] bg-stone-300 flex-1" />
          <p className="text-[9px] uppercase tracking-[0.3em] text-stone-400 font-light">
            BalkoLüx © {new Date().getFullYear()}
          </p>
          <div className="h-[1px] bg-stone-300 flex-1" />
        </div>
      </div>
    </motion.div>
  );
}

// Next.js useSearchParams kullanımı için Suspense ile sarmalamak gerekir
export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 relative overflow-hidden">
      {/* İnce Arkaplan Dokusu */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <Suspense
        fallback={
          <div className="text-stone-400 font-light tracking-widest uppercase text-[10px]">
            Yükleniyor...
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
