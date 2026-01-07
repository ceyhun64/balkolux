"use client";

import React from "react";
import { Trees, Sparkles, PencilRuler } from "lucide-react";
import { motion } from "framer-motion";

const whyChooseUs = [
  {
    icon: Trees,
    title: "Dış Mekan Formu",
    desc: "Balkon ve bahçenizin mimari yapısına uyum sağlayan, hava koşullarına dirençli modüler tasarımlar.",
  },
  {
    icon: Sparkles,
    title: "Ham Madde Etiği",
    desc: "Sürdürülebilir tik ağacı ve yüksek teknoloji dış mekan tekstili ile işlenen zamansız parçalar.",
  },
  {
    icon: PencilRuler,
    title: "Yerleşim Sanatı",
    desc: "Dış mekanınızın ışığını ve rüzgarını hesaplayan profesyonel mimari projelendirme desteği.",
  },
  {
    icon: PencilRuler,
    title: "Sorunsuz Kurulum",
    desc: "Kendi uzman kadromuzla, dış mekan peyzajınıza zarar vermeden titiz ve sessiz montaj.",
  },
];

const CardItem = ({ icon: Icon, title, desc, index }: any) => (
  <div className="group relative p-12 transition-all duration-1000 bg-white flex flex-col items-start text-left border-l border-stone-50 first:border-l-0">
    {/* Minimalist İkon */}
    <div className="mb-12 transition-all duration-700 group-hover:scale-110">
      <Icon className="w-8 h-8 text-stone-800 stroke-[1.2]" />
    </div>

    {/* Metin İçeriği */}
    <div className="space-y-4 flex-1">
      <h3 className="text-[11px] font-bold text-stone-900 tracking-[0.4em] uppercase">
        {title}
      </h3>
      <p className="text-[13px] text-stone-600 leading-relaxed font-light max-w-[220px]">
        {desc}
      </p>
    </div>

    {/* Çok İnce Sıra Numarası Alt Köşede */}
    <span className="absolute bottom-8 right-8 text-[10px] font-medium tracking-widest text-stone-200 uppercase italic">
      / 0{index + 1}
    </span>

    {/* Hover Durumunda Altta Uzayan Çok İnce Çizgi */}
    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-stone-900 group-hover:w-full transition-all duration-1000 ease-in-out" />
  </div>
);

export default function ShopServices() {
  return (
    <section className="py-32 bg-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Üst Başlık - Daha Minimal */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-stone-100 pb-12">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] tracking-[0.6em] text-stone-600 uppercase mb-6 block"
            >
              BalkoLüx Standartları
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-[1.2]">
              Dış mekanda{" "}
              <span className="italic text-stone-500 font-light">konforun</span>{" "}
              <br />
              mimari disiplinle buluşması.
            </h2>
          </div>
          <p className="text-stone-600 font-light text-xs max-w-[240px] leading-relaxed italic">
            "Sadece mobilya değil, açık havada geçen her anı daha değerli
            kılacak bir estetik anlayışı."
          </p>
        </div>

        {/* Grid Yapısı - Çizgileri Daha İnce */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-stone-100">
          {whyChooseUs.map((item, idx) => (
            <CardItem key={idx} index={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
