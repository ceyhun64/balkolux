"use client";

import React, { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        toast.error(data.error || "Bir hata oluştu.");
      } else {
        toast.success("Sıfırlama bağlantısı e-posta adresinize gönderildi.");
      }
    } catch (err) {
      toast.error("Sunucu hatası, lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      {/* Arkaplan için çok hafif bir doku veya degrade eklenebilir */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[380px] relative z-10"
      >
        {/* Logo veya İkon Alanı */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-stone-950 rounded-full flex items-center justify-center mb-6 shadow-xl">
            <Mail className="text-white w-5 h-5 font-light" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-serif text-stone-900 tracking-tight">
            Şifre Yenileme
          </h1>
          <p className="text-stone-400 text-sm mt-3 text-center leading-relaxed font-light">
            E-posta adresinizi girin, size özel güvenli bir bağlantı gönderelim.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <Input
              id="email"
              type="email"
              placeholder="E-posta Adresi"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-14 border-0 border-b border-stone-200 rounded-none bg-transparent px-0 text-base focus-visible:ring-0 focus-visible:border-stone-950 transition-all placeholder:text-stone-300"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-14 w-full bg-stone-950 text-white rounded-none font-light tracking-[0.15em] uppercase text-xs transition-all hover:bg-stone-800 active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? "Gönderiliyor..." : "Bağlantıyı Gönder"}
          </Button>
        </form>

        <div className="mt-12 flex flex-col items-center gap-8">
          <Link
            href="/login"
            className="group flex items-center gap-2 text-xs font-medium text-stone-400 hover:text-stone-950 transition-colors tracking-widest uppercase"
          >
            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
            Giriş Ekranına Dön
          </Link>

          <div className="flex items-center gap-4 w-full">
            <div className="h-[1px] bg-stone-300 flex-1" />
            <p className="text-[9px] uppercase tracking-[0.3em] text-stone-500 font-light">
              BalkoLüx © {new Date().getFullYear()}
            </p>
            <div className="h-[1px] bg-stone-300 flex-1" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
