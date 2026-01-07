"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Phone,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // --- Sosyal Medya Link Tanımlamaları ---
  const whatsappNumber = "+90 546 225 56 59";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, "")}`;

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/balkolux",
      label: "Instagram",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/balkolux",
      label: "Facebook",
    },
    { icon: MessageCircle, href: whatsappLink, label: "WhatsApp" },
    { icon: Phone, href: `tel:${whatsappNumber}`, label: "Telefon" },
  ];
  // ---------------------------------------

  const menuGroups = {
    kurumsal: {
      title: "KURUMSAL",
      links: [
        { label: "Hakkımızda", href: "/institutional/about" },
        { label: "İletişim", href: "/contact" },
        { label: "Neden Biz", href: "/institutional/why_us" },
        { label: "Kargo Takip", href: "/track-order" },
        { label: "Çerez Politikası", href: "/institutional/cookie_policy" },
      ],
    },
    alisveris: {
      title: "ALIŞVERİŞ",
      links: [
        { label: "Sepetim", href: "/cart" },
        { label: "Beğendiklerim", href: "/favorites" },
        { label: "Siparişlerim", href: "/profile/orders" },
        { label: "Üye Ol", href: "/register" },
        { label: "Giriş Yap", href: "/login" },
      ],
    },
    sozlesmeler: {
      title: "SÖZLEŞMELER",
      links: [
        { href: "/contracts/kvkk", label: "KVKK Aydınlatma Metni" },
        {
          href: "/contracts/distance_sale",
          label: "Mesafeli Satış Sözleşmesi",
        },
        {
          href: "/contracts/personal_data",
          label: "Kişisel Veriler Onay Metni",
        },
        { href: "/contracts/payment_options", label: "Ödeme Seçenekleri" },
      ],
    },
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Ayrıcalıklı dünyamıza hoş geldiniz.");
      setEmail("");
    } catch (error) {
      toast.error("Bir sorun oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-zinc-950 text-stone-400 relative overflow-hidden font-sans border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* 1. Kolon: Marka Bilgisi */}
          <div className="md:col-span-3 space-y-8">
            <Link href="/" className="inline-block">
              <Image
                src="/logo/logo.webp"
                alt="BalkoLüx"
                width={130}
                height={40}
                className="object-contain brightness-0 invert opacity-80"
              />
            </Link>
            <p className="text-stone-500 text-[13px] leading-relaxed font-light max-w-[240px]">
              Yaşam alanlarınıza lüks ve zarafet katan modern tasarımlar.
            </p>

            {/* Sosyal Medya İkonları - GÜNCELLENDİ */}
            <div className="flex items-center gap-5">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* 2-3-4. Kolonlar: Link Grupları */}
          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(menuGroups).map(([key, group]) => (
              <div key={key} className="space-y-6">
                <h4 className="text-stone-100 text-[10px] font-bold tracking-[0.3em] uppercase">
                  {group.title}
                </h4>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13px] font-light text-stone-500 hover:text-white transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 5. Kolon: BÜLTEN */}
          <div className="md:col-span-3 space-y-6 flex flex-col justify-end">
            <div className="space-y-3">
              <h4 className="text-stone-100 text-[10px] font-bold tracking-[0.3em] uppercase">
                BÜLTEN
              </h4>
              <p className="text-[12px] text-stone-500 font-light leading-snug">
                Yeni koleksiyonlardan ilk siz haberdar olun.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="relative group">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border-b border-stone-800 py-3 text-[13px] text-stone-200 placeholder:text-stone-700 focus:outline-none focus:border-stone-500 transition-all font-light"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-0 bottom-3 text-stone-500 hover:text-amber-500 transition-colors"
                aria-label="abone ol"
              >
                {loading ? (
                  <span className="text-[10px]">...</span>
                ) : (
                  <ArrowRight size={16} />
                )}
              </button>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-600 transition-all duration-500 group-focus-within:w-full" />
            </form>
          </div>
        </div>
      </div>

      {/* Alt Bar: Copyright & Logos */}
      <div className="bg-white py-3 border-t border-stone-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
            <div className="flex-1 text-[9px] uppercase tracking-[0.2em] text-stone-400">
              © {currentYear} BALKOLÜX.
            </div>

            <div className="flex-1 flex justify-end">
              <Image
                src="/iyzico/logo_band_colored@3x.webp"
                alt="iyzico"
                width={180}
                height={32}
                className="transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
