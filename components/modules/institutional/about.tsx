"use client";

import React from "react";
import { MapPin, Phone, Mail, Instagram, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

// --- YARDIMCI BİLEŞENLER ---

const SectionTitle = ({
  subtitle,
  title,
}: {
  subtitle: string;
  title: string;
}) => (
  <div className="space-y-3 mb-12">
    <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium italic">
      {subtitle}
    </span>
    <h2 className="text-3xl md:text-4xl font-light text-stone-800 leading-tight">
      {title}
    </h2>
  </div>
);

const ContentSection = ({
  title,
  text,
  image,
  alt,
  list,
  reverse,
}: {
  title: string;
  text?: string;
  image: string;
  alt: string;
  list?: string[];
  reverse: boolean;
}) => (
  <div
    className={`flex flex-col ${
      reverse ? "md:flex-row-reverse" : "md:flex-row"
    } gap-12 md:gap-24 items-center py-16 border-b border-stone-100 last:border-0`}
  >
    <div className="w-full md:w-1/2 overflow-hidden bg-stone-50">
      <Image
        src={image}
        alt={alt}
        width={1000}
        height={1200}
        className="w-full h-[400px] md:h-[500px] object-cover transition-all duration-1000"
      />
    </div>

    <div className="w-full md:w-1/2 space-y-6">
      <h3 className="text-2xl md:text-3xl font-light text-stone-800 tracking-tight">
        {title}
      </h3>
      <p className="text-stone-500 leading-relaxed font-light text-sm md:text-base">
        {text}
      </p>
      {list && (
        <ul className="space-y-4 pt-4">
          {list.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-4 text-stone-600 text-sm border-b border-stone-50 pb-2"
            >
              <span className="text-[10px] text-stone-300">0{i + 1}</span>
              <span className="font-light tracking-wide">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

// --- ANA BİLEŞEN ---

export default function AboutPage() {
  const sections = [
    {
      title: "Konfor ve Estetik",
      text: `BalkoLüx, dış mekan yaşamında sessiz bir lüks anlayışını temsil eder. Modern tasarım anlayışımızla, bahçe mobilyalarını sadece birer eşya değil, açık havada geçen anlarınızı taçlandıran mimari öğeler olarak kurguluyoruz.`,
      image: "/about/1.webp",
      alt: "Bahçe mobilyası detay",
      reverse: false,
    },
    {
      title: "Doğrudan Yaşam Alanınıza",
      text: `Üretimden doğrudan terasınıza. Karmaşık tedarik süreçlerini ortadan kaldırarak; iroko ahşabından paslanmaz alüminyuma kadar en yüksek kalite standartlarını dürüst bir modelle sunuyoruz. Her minder dikişinde kalite, her teslimatta güven odak noktamızdır.`,
      image: "/about/2.webp",
      alt: "Dış mekan dokusu",
      reverse: true,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-100 text-stone-800 selection:bg-stone-200">
      {/* HERO SECTION */}
      <header className="relative h-[70dvh] flex flex-col justify-center items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl space-y-6"
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-stone-400">
            Est. 2026 — Gaziantep
          </span>
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter leading-none italic text-stone-900">
            Gökyüzü Altında <br /> Konforun Formu
          </h1>
          <p className="max-w-xl mx-auto text-sm md:text-base text-stone-500 font-light leading-relaxed pt-4">
            BalkoLüx, geleneksel zanaati modern materyallerle harmanlayarak
            bahçe ve balkonlarınızı yaşayan birer huzur alanına dönüştürür.
          </p>
        </motion.div>
        <div className="absolute bottom-12 animate-bounce">
          <div className="w-[1px] h-12 bg-stone-300 mx-auto"></div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        {/* HİKAYE BÖLÜMLERİ */}
        <section>
          {sections.map((sec, idx) => (
            <ContentSection key={idx} {...sec} />
          ))}
        </section>

        {/* ÖZET DEĞERLER */}
        <section className="py-24 grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
          {[
            {
              t: "Materyal Gücü",
              d: "UV ışınlarına ve suya dayanıklı premium kumaşlar, uzun ömürlü iskeletler.",
            },
            {
              t: "Özgünlük",
              d: "Mekanınıza özel ölçü seçenekleri ve geniş renk kartelası.",
            },
            {
              t: "Sürdürülebilirlik",
              d: "Doğa dostu ahşap kaynakları ve nesiller boyu kullanılacak dayanıklılık.",
            },
          ].map((item, i) => (
            <div key={i} className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest font-semibold text-stone-400 italic">
                0{i + 1}. {item.t}
              </h4>
              <p className="text-stone-500 font-light text-sm leading-relaxed">
                {item.d}
              </p>
            </div>
          ))}
        </section>

        {/* İLETİŞİM - MİNİMAL LİSTE */}
        <section className="pt-24 border-t border-stone-200">
          <SectionTitle subtitle="Bize Ulaşın" title="Bir Hayaliniz mi Var?" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Phone, label: "Telefon", val: "+90 546 225 56 59" , href: "tel:+905462255659"},
              { icon: Mail, label: "E-Posta", val: "balkoluxofficial@gmail.com", href: "mailto:balkoluxofficial@gmail.com" },
              { icon: Instagram, label: "Sosyal Medya", val: "@balkolux" , href: "https://www.instagram.com/balkolux" },
              { icon: MapPin, label: "Showroom", val: "Esentepe Bulvarı Prof Necmettin Erbakan Bulvarı No353, 01150 Çukurova/Adana", href: "https://www.google.com/maps/place/Balk%C3%B6lux/@36.9995129,35.4018642,15z/data=!4m5!3m4!1s0x0:0x0!8m2!3d36.9995129!4d35.4018642" },
            ].map((item, i) => (
              <a
                href={item.href}
                key={i}
                className="group flex flex-col gap-2 p-4 hover:bg-stone-50 transition-colors"
              >
                <item.icon className="w-4 h-4 text-stone-400 group-hover:text-stone-800 transition-colors" />
                <span className="text-[10px] uppercase tracking-widest text-stone-400">
                  {item.label}
                </span>
                <span className="text-sm font-light flex items-center gap-1 group-hover:underline">
                  {item.val}{" "}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
