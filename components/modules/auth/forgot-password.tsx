"use client";

import React, { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/account/forgot_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Bir hata oluştu, tekrar deneyin.");
      } else {
        toast.success(data.message || "Şifre sıfırlama linki gönderildi.");
      }
    } catch (err) {
      console.error("Forgot password hatası:", err);
      toast.error("Sunucu hatası, tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4 selection:bg-red-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[400px] bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 flex flex-col gap-8"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Şifremi Unuttum
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed px-4">
            E-posta adresinize bir sıfırlama linki göndereceğiz.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-xs font-medium uppercase tracking-wider text-gray-400 ml-1"
            >
              E-posta
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="E-posta adresinizi giriniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12  border-gray-200 bg-gray-50/50 transition-all focus:bg-white focus:ring-0 focus:border-gray-900"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className={`h-12 w-full  bg-gray-900 text-white font-medium shadow-sm transition-all hover:bg-black active:scale-[0.98] ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "İşleniyor..." : "Bağlantı Gönder"}
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
