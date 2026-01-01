"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Instagram, Facebook, Phone, ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GradientText } from "../ui/shadcn-io/gradient-text/index";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Menü Grupları
  const menuGroups = {
    kurumsal: {
      title: "KURUMSAL",
      links: [
        { label: "Hakkımızda", href: "/about" },
        { label: "Basında Biz", href: "/press" },
        { label: "Mağazalarımız", href: "/stores" },
        { label: "İletişim", href: "/contact" },
        { label: "Kargo Takip", href: "/track-order" },
      ],
    },
    alisveris: {
      title: "ALIŞVERİŞ",
      links: [
        { label: "Sepetim", href: "/cart" },
        { label: "Beğendiklerim", href: "/wishlist" },
        { label: "Siparişlerim", href: "/orders" },
        { label: "Üye Ol", href: "/register" },
        { label: "Giriş Yap", href: "/login" },
      ],
    },
    sozlesmeler: {
      title: "SÖZLEŞMELER",
      links: [
        { label: "Üyelik Sözleşmesi", href: "/contracts/membership" },
        { label: "İptal Ve İade Şartları", href: "/contracts/return-policy" },
        { label: "Kişisel Verilerin Korunması", href: "/contracts/kvkk" },
        { label: "Gizlilik Ve Güvenlik", href: "/contracts/privacy" },
      ],
    },
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      toast.success("Ayrıcalıklı dünyamıza hoş geldiniz.");
      setEmail("");
    } catch (error) {
      toast.error("Bir sorun oluştu, lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-zinc-900 text-stone-400 pt-0 relative overflow-hidden font-sans">
      {/* --- Newsletter Section --- */}
      <div className="relative border-b border-white/5 py-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_#2D1B0D_0%,_transparent_70%)] opacity-40" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-10">
            <div className="space-y-4">
              <h3 className="text-3xl md:text-5xl font-serif italic text-stone-100 tracking-tight">
                Bültenimize Abone Olun
              </h3>
              <p className="text-stone-500 text-sm md:text-base font-light tracking-widest uppercase">
                GÜNCEL HABERLER VE ÖZEL FIRSATLAR
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="relative max-w-md mx-auto group">
              <input
                type="email"
                placeholder="E-posta adresinizi girin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border-b border-stone-800 py-4 px-0 text-stone-200 placeholder:text-stone-700 focus:outline-none focus:border-amber-600 transition-colors duration-700 font-light"
              />
              <button 
                type="submit" 
                disabled={loading}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-500 hover:text-amber-500 transition-all duration-300"
              >
                {loading ? "..." : <ArrowRight className="w-5 h-5" />}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* --- Main Links Section --- */}
      <div className="container mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          
          {/* Brand Info */}
          <div className="md:col-span-3 space-y-8 text-center md:text-left">
            <Link href="/" className="inline-block">
              <Image
                src="/logo/logo2.png"
                alt="Moda Perde"
                width={140}
                height={50}
                className="object-contain brightness-0 invert opacity-80"
              />
            </Link>
            <p className="text-stone-500 text-[13px] leading-relaxed font-light">
              Lüksü ve konforu yaşam alanlarınıza taşıyoruz. 
              Modern tasarımın en seçkin örnekleriyle tanışın.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-6">
              <a href="#" className="hover:text-amber-600 transition-colors duration-300"><Instagram size={18} /></a>
              <a href="#" className="hover:text-amber-600 transition-colors duration-300"><Facebook size={18} /></a>
              <a href="#" className="hover:text-amber-600 transition-colors duration-300"><Phone size={18} /></a>
            </div>
          </div>

          {/* Menus Grid */}
          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-12 md:pl-12">
            {Object.entries(menuGroups).map(([key, group]) => (
              <div key={key} className="space-y-6">
                <h4 className="text-stone-100 text-[11px] font-bold tracking-[0.4em] uppercase">
                  {group.title}
                </h4>
                <ul className="space-y-4">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href} 
                        className="relative text-[13px] font-light text-stone-500 hover:text-white transition-colors duration-300 group inline-block"
                      >
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-700 transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Footer Bottom Bar --- */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
            
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-stone-400 text-[10px] uppercase tracking-widest">Designed by</span>
                <a href="https://wa.me/905541496377" target="_blank">
                  <GradientText
                    className="text-2xl font-bold font-mono tracking-tighter"
                    text=".jhun{}"
                  />
                </a>
              </div>
              <p className="text-stone-400 text-[10px] uppercase tracking-[0.2em]">
                © {currentYear} MODA PERDE. TÜM HAKLARI SAKLIDIR.
              </p>
            </div>
            
            <div className="flex items-center gap-8  transition-all duration-1000">
               <Image
                src="/iyzico/logo_band_colored@3x.webp"
                alt="iyzico"
                width={220}
                height={40}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}