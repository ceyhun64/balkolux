"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  HelpCircle,
  Headset,
  ChevronDown,
  Package,
  ShieldCheck,
  Hammer,
} from "lucide-react";
import { motion } from "framer-motion";

/**
 * Bahçe ve Balkon Mobilyaları Temalı SSS (FAQ) Bölümü
 */
export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const primaryColor = "#7B0323";
  const lightColor = "text-rose-600";

  const faqs = [
    {
      question: "Mobilyalar dış hava koşullarına dayanıklı mı?",
      icon: <ShieldCheck className="w-5 h-5" />,
      answer: (
        <>
          <p className="mb-2">
            Evet, BalkoLüx koleksiyonundaki tüm ürünler dış mekan kullanımına
            uygun olarak üretilmektedir.
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>
              <strong className="text-rose-700">Metal aksamlar:</strong>{" "}
              Elektrostatik fırın boya ile paslanmaya karşı korumalıdır.
            </li>
            <li>
              <strong className="text-rose-700">Rattan ve Ahşap:</strong> UV
              ışınlarına ve suya dayanıklı materyaller seçilmiştir.
            </li>
            <li>
              <strong className="text-rose-700">Minderler:</strong> Su itici
              özelliğe sahip, kolay solmayan kumaşlar kullanılmaktadır.
            </li>
          </ul>
        </>
      ),
    },
    {
      question: "Ürünler kurulu mu geliyor, montaj hizmetiniz var mı?",
      icon: <Hammer className="w-5 h-5" />,
      answer: (
        <p>
          Ürünlerimizin birçoğu nakliye güvenliği ve kapı geçiş kolaylığı için
          demonte veya yarı-demonte olarak gönderilmektedir. Paket içerisinde
          kolay kurulum şeması ve gerekli tüm aparatlar yer alır. İstanbul içi
          siparişlerde belirli tutar üzerindeki alışverişlerinizde ücretsiz
          montaj desteği sunmaktayız.
        </p>
      ),
    },
    {
      question: "Kargo süreci ve büyük paket taşımacılığı nasıl yapılıyor?",
      icon: <Package className="w-5 h-5" />,
      answer: (
        <>
          <p className="mb-2">
            Mobilya gibi büyük hacimli ürünler, standart kargo firmalarının yanı
            sıra uzman lojistik firmaları ile gönderilmektedir.
          </p>
          <p>
            Ürünlerimiz, darbelere dayanıklı özel kalın kartonlar ve koruyucu
            köpükler ile paketlenerek "katınıza kadar teslim" seçeneğiyle
            adresinize ulaştırılır.
          </p>
        </>
      ),
    },
    {
      question: "Kışın mobilyalarımı nasıl korumalıyım?",
      icon: <HelpCircle className="w-5 h-5" />,
      answer: (
        <p>
          Ürünlerimiz dayanıklı olsa da, mobilyalarınızın ömrünü uzatmak için
          kış aylarında koruma kılıfı kullanmanızı veya minderleri kapalı/kuru
          bir alanda muhafaza etmenizi öneririz. Ahşap ürünler için yılda bir
          kez yapacağınız yağ bakımı, mobilyanızın ilk günkü formunu korumasını
          sağlayacaktır.
        </p>
      ),
    },
    {
      question: "Özel ölçü veya renk seçeneği mevcut mu?",
      icon: <HelpCircle className="w-5 h-5" />,
      answer: (
        <p>
          Belirli model koltuk ve masa takımlarımızda kumaş rengi değişimi
          yapabiliyoruz. Balkonunuzun ölçüsüne özel üretim talepleriniz için
          "Canlı Destek" butonundan ekibimizle iletişime geçerek detaylı bilgi
          alabilirsiniz.
        </p>
      ),
    },
  ];

  return (
    <div className="bg-white font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* ÜST BAŞLIK */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-base font-semibold tracking-widest uppercase text-rose-500">
            Müşteri Deneyimi
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-2 tracking-tight">
            Merak Edilenler
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Bahçenizi ve balkonunuzu güzelleştirirken aklınıza takılan tüm
            teknik detaylar ve süreçler hakkında bilgi alın.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* FAQ LİSTESİ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white border rounded-lg transition-all duration-300 ${
                  openIndex === index
                    ? "border-rose-300 ring-1 ring-rose-100 shadow-lg"
                    : "border-gray-200 hover:border-gray-300 shadow-sm"
                }`}
              >
                <button
                  className="w-full p-5 sm:p-6 text-left focus:outline-none flex items-center justify-between"
                  onClick={() => toggleIndex(index)}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`${
                        openIndex === index ? "text-rose-600" : "text-gray-400"
                      } transition-colors`}
                    >
                      {faq.icon}
                    </span>
                    <h3
                      className={`text-lg font-bold ${
                        openIndex === index ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      openIndex === index
                        ? "rotate-180 text-rose-600"
                        : "text-gray-400"
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50 mt-1">
                    <div className="pt-4">{faq.answer}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* SAĞ KART: DESTEK */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="sticky top-8 bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl text-white overflow-hidden relative">
              {/* Dekoratif Arka Plan İkonu */}
              <HelpCircle className="absolute -right-8 -bottom-8 w-32 h-32 text-white/5 rotate-12" />

              <div className="relative z-10">
                <div className="bg-rose-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-rose-500/30">
                  <Headset className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Size Özel Çözümler</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Balkon ölçülerinize uygun mobilya seçimi veya kurulum desteği
                  için uzman ekibimizle görüşebilirsiniz.
                </p>

                <Link href="/contact" className="block">
                  <Button
                    style={{ backgroundColor: primaryColor }}
                    className="w-full rounded-xl text-white py-6 text-lg font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Mimarımıza Danışın
                  </Button>
                </Link>

                <div className="mt-8 pt-8 border-t border-white/10 space-y-3">
                  <p className="text-sm text-gray-400 flex justify-between">
                    <span>Hafta İçi:</span>
                    <span className="text-white">09:00 - 19:00</span>
                  </p>
                  <p className="text-sm text-gray-400 flex justify-between">
                    <span>Hafta Sonu:</span>
                    <span className="text-white">10:00 - 17:00</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
