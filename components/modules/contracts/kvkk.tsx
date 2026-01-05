"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, ArrowRight, MapPin, Phone, Mail } from "lucide-react";

export default function KvkkPage() {
  return (
    <div className="bg-white min-h-screen selection:bg-stone-100 selection:text-stone-900">
      <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        {/* Üst Başlık - Minimalist */}
        <header className="mb-24 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-stone-400"
          >
            <Shield size={14} strokeWidth={1.5} />
            <span className="text-[10px] tracking-[0.5em] uppercase font-medium">
              Güvenlik & Gizlilik
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight"
          >
            KVKK <br />
            <span className="italic font-light text-stone-400">
              Aydınlatma Metni
            </span>
          </motion.h1>

          <p className="text-[11px] text-stone-400 font-medium tracking-widest uppercase border-t border-stone-100 pt-6">
            Yürürlük: 22 Nisan 2025 — Veri Sorumlusu: Moda Perde
          </p>
        </header>

        {/* Ana İçerik - İnce Tipografi */}
        <div className="space-y-20">
          {/* Giriş Paradrafı */}
          <section className="max-w-3xl">
            <p className="text-stone-500 text-lg font-light leading-relaxed italic">
              "Verilerinizin gizliliği, tasarımlarımızdaki hassasiyet kadar
              değerlidir."
            </p>
          </section>

          {/* Grid Yapılı Maddeler */}
          <div className="space-y-16 border-t border-stone-100 pt-16">
            {/* 01. Veri Sorumlusu */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.3em] uppercase">
                01. Veri Sorumlusu
              </h2>
              <div className="md:col-span-2">
                <p className="text-sm text-stone-500 font-light leading-relaxed mb-6">
                  6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca,
                  kişisel verileriniz veri sorumlusu olarak Moda Perde
                  tarafından aşağıda açıklanan kapsamda işlenebilecektir.
                </p>
                <address className="not-italic bg-stone-50 p-8 text-[13px] text-stone-600 space-y-2 font-light border-l-2 border-stone-200">
                  <span className="text-stone-900 font-medium block">
                    Moda Perde
                  </span>
                  Mustafa Kökmen Blv. 91, Nizip / Gaziantep <br />
                  info@modaperde.com — +90 546 225 56 59
                </address>
              </div>
            </div>

            {/* 02. İşlenme Amaçları */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-50 pt-16">
              <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.3em] uppercase">
                02. İşleme Amaçları
              </h2>
              <div className="md:col-span-2 space-y-6">
                <p className="text-sm text-stone-500 font-light leading-relaxed">
                  Toplanan kişisel verileriniz, operasyonel süreçlerin yönetimi
                  ve sizlere daha rafine bir hizmet sunulabilmesi adına şu
                  amaçlarla işlenmektedir:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Sipariş Yönetimi",
                    "Lojistik & Teslimat",
                    "Satış Sonrası Destek",
                    "Yasal Yükümlülükler",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-xs text-stone-600 font-light border-b border-stone-50 pb-3"
                    >
                      <ArrowRight size={10} className="text-stone-300" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 07. Kullanıcı Hakları */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-50 pt-16">
              <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.3em] uppercase">
                07. Haklarınız
              </h2>
              <div className="md:col-span-2">
                <p className="text-sm text-stone-500 font-light leading-relaxed mb-8">
                  Kanun’un 11. maddesi uyarınca verilerinizin silinmesini,
                  düzeltilmesini veya işlenme durumunun sorgulanmasını her zaman
                  talep edebilirsiniz.
                </p>
                <button className="text-[10px] tracking-[0.3em] uppercase font-bold text-stone-900 border-b border-stone-900 pb-2 hover:text-stone-400 hover:border-stone-400 transition-all duration-500">
                  Başvuru Formunu İndir
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Footer İletişim */}
        <footer className="mt-32 pt-16 border-t border-stone-900/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex gap-12">
              <div className="space-y-2">
                <p className="text-[9px] tracking-widest text-stone-400 uppercase">
                  E-Posta
                </p>
                <p className="text-xs font-light text-stone-600">
                  privacy@modaperde.com
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-[9px] tracking-widest text-stone-400 uppercase">
                  Telefon
                </p>
                <p className="text-xs font-light text-stone-600">
                  +90 546 225 56 59
                </p>
              </div>
            </div>
            <p className="text-[9px] text-stone-300 tracking-[0.2em] uppercase">
              © 2026 Moda Perde Tüm Hakları Saklıdır.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
