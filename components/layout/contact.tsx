"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

// --- YARDIMCI BİLEŞENLER ---

const MinimalContactItem = ({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: any;
  label: string;
  value: string;
  href?: string;
}) => (
  <div className="group flex flex-col gap-2 py-6 border-b border-stone-100 last:border-0">
    <div className="flex items-center gap-3 text-stone-400">
      <Icon size={14} strokeWidth={1.5} />
      <span className="text-[10px] uppercase tracking-[0.3em] font-medium">
        {label}
      </span>
    </div>
    {href ? (
      <a
        href={href}
        className="text-sm md:text-base font-light text-stone-800 hover:text-stone-500 transition-colors inline-flex items-center gap-1"
      >
        {value}{" "}
        <ArrowUpRight
          size={14}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </a>
    ) : (
      <span className="text-sm md:text-base font-light text-stone-800">
        {value}
      </span>
    )}
  </div>
);

// --- ANA BİLEŞEN ---

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simüle edilmiş gönderim süreci
    setTimeout(() => {
      toast.success("Mesajınız nezaketle alındı.");
      setFormData({ name: "", phone: "", email: "", message: "" });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FCFBFA] text-stone-800 font-light">
      <main className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        {/* HEADER */}
        <header className="max-w-3xl mb-24 space-y-4">
          <span className="text-[10px] tracking-[0.4em] uppercase text-stone-400 font-medium">
            İletişim
          </span>
          <h1 className="text-4xl md:text-6xl font-extralight tracking-tighter text-stone-900 italic leading-[1.1]">
            Mekanınıza Değer <br /> Katmak İçin Buradayız
          </h1>
          <p className="text-stone-500 max-w-md pt-4 leading-relaxed text-sm md:text-base">
            Sorularınız, iş birliği talepleriniz veya projeleriniz için bize
            dilediğiniz zaman ulaşabilirsiniz.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* SOL: İLETİŞİM BİLGİLERİ */}
          <section className="lg:col-span-5 space-y-2">
            <MinimalContactItem
              icon={MapPin}
              label="Atölye & Adres"
              value="Mustafa Kökmen Blv. 91, Nizip, Gaziantep"
            />
            <MinimalContactItem
              icon={Phone}
              label="Telefon"
              value="+90 533 387 40 74"
              href="tel:+905333874074"
            />
            <MinimalContactItem
              icon={Mail}
              label="E-posta"
              value="info@modaperde.com"
              href="mailto:info@modaperde.com"
            />
          </section>

          {/* SAĞ: FORM */}
          <section className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                {/* İsim */}
                <div className="group relative border-b border-stone-200 focus-within:border-stone-800 transition-colors">
                  <label className="text-[10px] uppercase tracking-widest text-stone-400 mb-2 block">
                    Adınız Soyadınız
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent pb-3 outline-none text-stone-800 placeholder:text-stone-200 font-light text-sm"
                    placeholder="Örn: Selin Yılmaz"
                    required
                  />
                </div>
                {/* E-posta */}
                <div className="group relative border-b border-stone-200 focus-within:border-stone-800 transition-colors">
                  <label className="text-[10px] uppercase tracking-widest text-stone-400 mb-2 block">
                    E-posta
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent pb-3 outline-none text-stone-800 placeholder:text-stone-200 font-light text-sm"
                    placeholder="selin@example.com"
                    required
                  />
                </div>
              </div>

              {/* Mesaj */}
              <div className="group relative border-b border-stone-200 focus-within:border-stone-800 transition-colors">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 mb-2 block">
                  Mesajınız
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={1}
                  className="w-full bg-transparent pb-3 outline-none text-stone-800 placeholder:text-stone-200 font-light text-sm resize-none min-h-[100px]"
                  placeholder="Projenizden bahsedin..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group flex items-center gap-4 text-xs tracking-[0.3em] uppercase font-bold text-stone-900 disabled:opacity-50"
              >
                {isLoading ? "Gönderiliyor..." : "Mesajı Gönder"}
                <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-stone-900 group-hover:text-white transition-all duration-500">
                  <Send
                    size={14}
                    className={isLoading ? "animate-pulse" : ""}
                  />
                </div>
              </button>
            </form>
          </section>
        </div>

        {/* HARİTA: SOFİSTİKE BİR SUNUM */}
        <section className="mt-32 grayscale hover:grayscale-0 transition-all duration-1000">
          <div className="aspect-[21/9] w-full bg-stone-100 relative overflow-hidden">
            {/* Yer tutucu yerine gerçek iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3184.456789!2d37.6625!3d37.0123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDAwJzQ0LjMiTiAzN8KwMzknNDUuMCJF!5e0!3m2!1str!2str!4v1620000000000"
              className="absolute inset-0 w-full h-full opacity-70"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
