"use client";

import React from "react";
import { Sofa, Sparkles, PencilRuler, Truck } from "lucide-react";

const whyChooseUs = [
  {
    icon: Sofa,
    title: "Kişiye Özel Tasarım",
    desc: "Yaşam alanınıza tam uyum sağlayan, kumaşından cilasına kadar size özel üretilen modüler çözümler.",
  },
  {
    icon: Sparkles,
    title: "Zanaatkar İşçiliği",
    desc: "Nesiller boyu aktarılan ustalıkla, her bir detayda yüksek el işçiliği ve birinci sınıf malzeme kalitesi.",
  },
  {
    icon: PencilRuler,
    title: "Ücretsiz Mimari Destek",
    desc: "Evinizin potansiyelini ortaya çıkarmak için profesyonel iç mimarlarımızla birlikte projelendirme hizmeti.",
  },
  {
    icon: Truck,
    title: "Premium Kurulum",
    desc: "Kendi lojistik ekibimizle profesyonel montaj ve kurulum dahil, anahtar teslim güvenli teslimat.",
  },
];

const CardItem = ({ icon: Icon, title, desc, index }: any) => (
  <div className="group relative p-10 transition-all duration-700 bg-white border-r border-b border-stone-100 last:border-r-0 md:even:border-r-0 lg:even:border-r lg:last:border-r-0 flex flex-col items-center text-center">
    {/* Kart Sıra Numarası (Lüks detay) */}
    <span className="absolute top-6 right-8 text-[60px] font-serif italic text-stone-50 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
      0{index + 1}
    </span>
    
    {/* İkon Alanı */}
    <div className="relative mb-10 transition-transform duration-500 group-hover:-translate-y-2">
      <div className="absolute inset-0 scale-[2] blur-3xl bg-amber-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full"></div>
      <Icon className="relative w-12 h-12 text-stone-700 stroke-[1] group-hover:text-amber-800 transition-colors duration-500" />
    </div>

    {/* Metin İçeriği */}
    <h3 className="text-[13px] font-bold text-stone-900 tracking-[0.25em] mb-5 uppercase">
      {title}
    </h3>

    <p className="text-[14px] text-stone-500 leading-[1.8] font-light max-w-[260px]">
      {desc}
    </p>

    {/* Alt Çizgi Efekti */}
    <div className="mt-8 flex items-center justify-center gap-2">
      <div className="w-6 h-[1px] bg-stone-200 group-hover:w-12 group-hover:bg-amber-400 transition-all duration-500"></div>
    </div>
  </div>
);

export default function ShopServices() {
  return (
    <section className="py-24">
      <div className="max-w-8xl mx-auto   shadow-sm">
        {/* Üst Başlık Alanı */}
        <div className="py-20 px-6 text-center border-b border-stone-100 ">
          <div className="inline-block px-4 py-1 mb-6 border border-amber-200/50 rounded-full">
            <span className="text-amber-700 text-[10px] font-bold tracking-[0.4em] uppercase">
              Atölyeden Evinize
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-stone-900 tracking-tight font-serif italic mb-6">
            Yaşam Alanınıza Değer Katan <br className="hidden md:block" /> Ayrıcalıklar
          </h2>
          <p className="text-stone-400 font-light text-sm max-w-xl mx-auto leading-relaxed">
            Sadece mobilya değil, nesiller boyu sürecek bir konfor ve estetik anlayışı inşa ediyoruz.
          </p>
        </div>

        {/* Grid Yapısı */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, idx) => (
            <CardItem key={idx} index={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}