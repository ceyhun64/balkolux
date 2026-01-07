"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CookiePolicy() {
  const sections = [
    {
      title: "01. Çerez Nedir?",
      content:
        "Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza depolanan küçük metin dosyalarıdır. Size daha kişiselleştirilmiş bir deneyim sunmak ve sitemizin performansını analiz etmek için kullanılır.",
    },
    {
      title: "02. Kullanım Amacımız",
      content:
        "Sitemizde kullanılan çerezler; oturumunuzun güvenliğini sağlamak, dil tercihlerinizi hatırlamak ve alışveriş deneyiminizi optimize etmek amacıyla işlenmektedir. Üçüncü taraf çerezleri ise yalnızca anonim analizler için kullanılır.",
    },
    {
      title: "03. Çerez Yönetimi",
      content:
        "Tarayıcı ayarlarınız üzerinden çerezleri dilediğiniz zaman engelleyebilir veya silebilirsiniz. Ancak çerezlerin devre dışı bırakılması, sitemizdeki bazı özelliklerin tam performansla çalışmasını engelleyebilir.",
    },
    {
      title: "04. Veri Güvenliği",
      content:
        "Çerezler aracılığıyla toplanan verileriniz, gizlilik politikamız doğrultusunda en yüksek güvenlik standartları ile korunmaktadır. Verileriniz asla üçüncü şahıslara satılmaz.",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#FDFDFD]">

      <main className="flex-1 px-8 py-16 md:px-20 lg:px-32">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-24 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-light tracking-[0.15em] text-zinc-900 uppercase mb-4">
                Çerez Politikası
              </h1>
              <div className="h-[1px] w-12 bg-zinc-900/30 mb-8" />
              <p className="text-[10px] tracking-[0.25em] text-zinc-400 uppercase leading-relaxed max-w-sm italic">
                Son Güncelleme: 07 Ocak 2026 <br />
                Dijital deneyiminizi optimize etme ve gizliliğinizi koruma
                standartlarımız.
              </p>
            </motion.div>
          </header>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-20"
          >
            {sections.map((section, index) => (
              <section
                key={index}
                className="group border-b border-zinc-100 pb-12 last:border-0"
              >
                <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                  <div className="md:w-1/3">
                    <h2 className="text-[10px] tracking-[0.4em] text-zinc-900 uppercase font-semibold">
                      {section.title}
                    </h2>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-[13px] text-zinc-500 font-light leading-relaxed italic">
                      {section.content}
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </motion.div>

          {/* Footer Note */}
          <footer className="mt-32 pt-12 border-t border-zinc-100">
            <p className="text-[9px] tracking-[0.3em] text-zinc-300 uppercase text-center">
              Sorularınız için bizimle iletişime geçebilirsiniz:
              privacy@markaniz.com
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
