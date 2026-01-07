"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

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
        setIsLoading(false);
        return;
      }

      toast.success("Şifreniz başarıyla güncellendi!");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Sunucu hatası, tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4 selection:bg-red-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[400px] bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 flex flex-col gap-8"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Şifre Sıfırlama
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed px-4">
            Güvenliğiniz için lütfen yeni bir şifre belirleyin.
          </p>
        </div>

        <form onSubmit={handleResetPassword} className="flex flex-col gap-5">
          <div className="relative space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-gray-400 ml-1">
              Yeni Şifre
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 border-gray-200 bg-gray-50/50 pr-12 transition-all focus:bg-white focus:ring-0 focus:border-gray-900"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-900 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className={`h-12 w-full bg-gray-900 text-white font-medium shadow-sm transition-all hover:bg-black active:scale-[0.98] ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Güncelleniyor..." : "Şifreyi Sıfırla"}
          </Button>
        </form>

        <div className="flex flex-col items-center gap-6">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-400 hover:text-stone-950 transition-colors"
          >
            ← Giriş Ekranına Dön
          </Link>

          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-300">
            © {new Date().getFullYear()} BalkoLüx
          </p>
        </div>
      </motion.div>
    </div>
  );
}
