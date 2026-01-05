"use client";

import React from "react";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function DistanceSalesContract() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-24 space-y-20">
        {/* Üst Başlık ve Tarih */}
        <header className="border-b border-stone-100 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <span className="text-[10px] tracking-[0.5em] text-stone-400 uppercase block">
              Yasal Bilgilendirme
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight">
              Mesafeli Satış <br />{" "}
              <span className="italic font-light text-stone-500 text-3xl md:text-4xl">
                Sözleşmesi
              </span>
            </h1>
            <p className="text-[11px] text-stone-400 font-medium tracking-widest uppercase pt-4">
              Son Güncelleme: 05 Haziran 2025 — Referans: MP-2025/01
            </p>
          </motion.div>
        </header>

        {/* Sözleşme İçeriği */}
        <div className="space-y-16">
          {/* Madde 1: Taraflar */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.3em] uppercase">
              01. Taraflar
            </h2>
            <div className="md:col-span-2 space-y-6">
              <p className="text-sm text-stone-500 leading-relaxed font-light italic">
                Bu sözleşme, aşağıda bilgileri yer alan Satıcı ile Alıcı
                arasında mesafeli iletişim araçları kullanılarak akdedilmiştir.
              </p>
              <div className="grid grid-cols-1 gap-8 pt-4 border-t border-stone-50">
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                    Satıcı Kimliği
                  </p>
                  <address className="not-italic text-[13px] text-stone-600 space-y-1 font-light leading-relaxed">
                    <span className="text-stone-900 font-medium block mb-2">
                      Moda Perde & Dış Mekan Sistemleri
                    </span>
                    Mustafa Kökmen Blv. 91, 27700 <br />
                    Gaziantep, Nizip — Türkiye
                  </address>
                </div>
              </div>
            </div>
          </section>

          {/* Madde 2 & 3: Konu */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-100 pt-16">
            <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.3em] uppercase">
              02. Konu & Kapsam
            </h2>
            <div className="md:col-span-2 text-sm text-stone-500 leading-[1.8] font-light">
              <p>
                İşbu sözleşmenin konusu, Alıcı'nın Satıcı'ya ait elektronik
                ticaret platformu üzerinden siparişini verdiği, nitelikleri ve
                satış fiyatı belirtilen ürünlerin satışı ve teslimi ile ilgili
                6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli
                Sözleşmeler Yönetmeliği hükümleri uyarınca tarafların hak ve
                yükümlülüklerinin belirlenmesidir.
              </p>
            </div>
          </section>

          {/* Madde 5: Cayma Hakkı (Kritik Bölüm) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-100 pt-16">
            <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.3em] uppercase">
              05. Cayma Hakkı
            </h2>
            <div className="md:col-span-2 space-y-6">
              <p className="text-sm text-stone-500 leading-[1.8] font-light">
                Alıcı, standart ürünlerde teslim tarihinden itibaren 14 gün
                içinde cayma hakkına sahiptir.
              </p>
              <div className="bg-stone-50 p-8 space-y-4">
                <p className="text-[11px] font-bold text-stone-900 uppercase tracking-tighter italic">
                  İstisnai Durumlar:
                </p>
                <ul className="space-y-3">
                  {[
                    "Kişiye özel ölçü ile üretilen perde ve döşemelik ürünler.",
                    "Alıcı'nın isteği doğrultusunda modifiye edilen dış mekan mobilyaları.",
                    "Ambalajı açılmış ve yeniden satılabilirliği yitirilmiş ürünler.",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="text-[12px] text-stone-500 font-light flex gap-3"
                    >
                      <span className="text-stone-300">—</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* İletişim & Onay */}
          <footer className="pt-24 border-t border-stone-100">
            <div className="bg-[#0a0a0a] p-12 md:p-16 text-white flex flex-col md:flex-row justify-between items-start gap-12 relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <h3 className="text-2xl font-serif italic font-light tracking-tight">
                  Hukuki Destek & İletişim
                </h3>
                <div className="space-y-4 text-stone-400 text-xs font-light tracking-wide">
                  <div className="flex items-center gap-4">
                    <Mail size={14} strokeWidth={1} />{" "}
                    <span>legal@modaperde.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone size={14} strokeWidth={1} />{" "}
                    <span>+90 546 225 56 59</span>
                  </div>
                </div>
              </div>
              <button className="relative z-10 group flex items-center gap-4 border border-stone-700 px-8 py-4 hover:border-white transition-all duration-500">
                <span className="text-[10px] tracking-[0.3em] uppercase font-bold">
                  Yardım Merkezi
                </span>
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </button>

              {/* Dekoratif Arka Plan Logosu */}
              <div className="absolute -bottom-10 -right-10 text-[120px] font-serif italic text-white/[0.03] pointer-events-none select-none">
                MP
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
