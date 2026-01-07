"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus, ArrowRight, Instagram, Phone } from "lucide-react";
import Image from "next/image";

export default function WhyChooseUsPage() {
  const advantages = [
    {
      id: "01",
      title: "Atölyeden Doğrudan",
      description:
        "Aracıları ortadan kaldıran şeffaf üretim süreciyle, zanaatkarlığı fabrikadan balkonunuza taşıyoruz.",
    },
    {
      id: "02",
      title: "Dört Mevsim Formu",
      description:
        "UV korumalı dokular ve paslanmaz iskeletler ile estetiği doğa şartlarına karşı koruyoruz.",
    },
    {
      id: "03",
      title: "Antropometrik Konfor",
      description:
        "Vücut ergonomisine uyumlu eğimler ve yüksek yoğunluklu minderler ile konforu standartlaştırıyoruz.",
    },
    {
      id: "04",
      title: "Sürdürülebilir Tercihler",
      description:
        "Sertifikalı iroko ahşabı ve geri dönüştürülebilir bileşenler ile doğaya olan borcumuzu ödüyoruz.",
    },
  ];

  return (
    <div className="bg-[#FCFBFA] text-[#1a1a1a] font-light selection:bg-emerald-100">
      {/* 1. Hero Bölümü: Saf Minimalizm */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-emerald-700 font-semibold mb-6 block">
            Küratörlük & Zanaat
          </span>
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-[1.1] mb-8">
            Dış mekanı <br />
            <span className="italic serif text-stone-400">yeniden</span> hayal
            edin.
          </h1>
          <p className="text-lg text-stone-500 max-w-xl leading-relaxed">
            BalkoLüx, bahçe ve balkonları sadece birer alan değil; sessizliğin,
            kahkahaların ve anıların merkezine dönüştüren bir tasarım
            stüdyosudur.
          </p>
        </motion.div>
      </section>

      {/* 2. Büyük Görsel: Sinematik Etki */}
      <section className="px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto h-[25vh] md:h-[70vh] relative overflow-hidden rounded-[2px]"
        >
          <Image
            src="/why_us/1.webp"
            alt="Minimalist Dış Mekan"
            fill
            className="object-cover duration-1000 ease-in-out"
          />
        </motion.div>
      </section>

      {/* 3. Avantajlar: Dergi Düzeni (Grid) */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20">
          {advantages.map((adv) => (
            <motion.div
              key={adv.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6 group"
            >
              <span className="text-xs font-mono text-stone-300 block mb-4 group-hover:text-emerald-600 transition-colors">
                // {adv.id}
              </span>
              <h3 className="text-xl font-normal tracking-tight border-b border-stone-100 pb-4">
                {adv.title}
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed font-light">
                {adv.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. İkinci Görsel Blok: Asimetrik Yerleşim */}
      <section className="max-w-7xl mx-auto px-6 pb-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 relative h-[200px] md:h-[500px] rounded-sm overflow-hidden">
          <Image
            src="/why_us/2.webp"
            alt="Detay Tasarımı"
            fill
            className="object-cover"
          />
        </div>
        <div className="md:col-span-5 space-y-8 md:pl-12">
          <h2 className="text-3xl font-extralight leading-snug">
            Her detayın bir <br /> <span className="italic">anlamı</span> var.
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Bizim için tasarım; en küçük dikişten, en büyük iskelete kadar
            uzanan bütünsel bir disiplindir. Ham maddeyi estetikle, estetiği
            konforla birleştiriyoruz.
          </p>
          <div className="flex gap-4">
            <Instagram className="w-5 h-5 text-stone-300 hover:text-emerald-600 cursor-pointer transition-colors" />
            <span className="text-[10px] uppercase tracking-widest text-stone-400">
              @balkolux_design
            </span>
          </div>
        </div>
      </section>

      {/* 5. Minimal Footer / CTA */}
      <footer className="bg-white border-t border-stone-100 py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-[10px] tracking-[0.5em] uppercase text-stone-400">
              İletişime Geçin
            </h4>
            <p className="text-2xl font-extralight tracking-tighter">
              Yeni bir hikayeye başlayalım.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8">
            <a
              href="tel:905462255659"
              className="group flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full border border-stone-100 flex items-center justify-center group-hover:border-emerald-600 transition-all">
                <Phone className="w-4 h-4 text-stone-400 group-hover:text-emerald-600" />
              </div>
              <span className="text-sm font-medium tracking-tight">
                +90 546 225 56 59
              </span>
            </a>

            <a
              href="https://balkolux.com"
              className="group flex items-center gap-3 bg-[#1a1a1a] text-white px-8 py-4 rounded-full hover:bg-emerald-800 transition-all"
            >
              <span className="text-xs uppercase tracking-[0.2em] font-bold">
                Koleksiyonu Keşfet
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
