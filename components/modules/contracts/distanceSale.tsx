"use client";

import React from "react";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function DistanceSalesContract() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-24 space-y-20">
        {/* Üst Başlık ve Tarih */}
        <header className="border-b border-stone-200 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <span className="text-[10px] tracking-[0.4em] text-stone-500 uppercase block font-semibold">
              Resmi Belge
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight font-bold">
              Mesafeli Satış Sözleşmesi
            </h1>
            <p className="text-[11px] text-stone-500 font-medium tracking-wider uppercase pt-4">
              Son Güncelleme: 06 Ocak 2026 — Referans: BLX-2026/01
            </p>
          </motion.div>
        </header>

        {/* Sözleşme İçeriği */}
        <div className="space-y-16">
          {/* Madde 1: Taraflar */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.25em] uppercase">
              Madde 1. Taraflar
            </h2>
            <div className="md:col-span-2 space-y-6">
              <p className="text-sm text-stone-700 leading-relaxed">
                İşbu sözleşme, aşağıda belirtilen Satıcı ile Alıcı arasında 6502
                sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli
                Sözleşmeler Yönetmeliği hükümleri gereğince mesafeli iletişim
                araçları kullanılarak akdedilmiştir.
              </p>
              <div className="grid grid-cols-1 gap-8 pt-4 border-t border-stone-100">
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wide">
                    Satıcı Bilgileri
                  </p>
                  <address className="not-italic text-[13px] text-stone-700 space-y-1 leading-relaxed">
                    <span className="text-stone-900 font-semibold block mb-2">
                      Balkolux Bahçe ve Balkon Mobilyaları
                    </span>
                    Esentepe bulvarı prof necmettin erbakan bulvarı no353, 01150
                    Çukurova/Adana
                    <br />
                    <span className="block mt-2">
                      Telefon: +90 546 225 56 59
                    </span>
                    <span className="block">
                      E-posta: balkoluxofficial@gmail.com
                    </span>
                    <span className="block">Mersis No: 0123456789012345</span>
                  </address>
                </div>
              </div>
            </div>
          </section>

          {/* Madde 2: Konu ve Kapsam */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-200 pt-16">
            <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.25em] uppercase">
              Madde 2. Konu ve Kapsam
            </h2>
            <div className="md:col-span-2 text-sm text-stone-700 leading-[1.8]">
              <p>
                İşbu sözleşmenin konusu, Alıcı'nın Satıcı'ya ait
                www.balkolux.com internet sitesi üzerinden elektronik ortamda
                siparişini verdiği, özellikleri ve satış bedeli aşağıda
                belirtilen bahçe ve balkon mobilyası ürünlerinin satışı ve
                teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması
                Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri
                gereğince tarafların hak ve yükümlülüklerinin belirlenmesidir.
              </p>
              <p className="mt-4">
                İşbu sözleşme, Alıcı'nın sipariş verdiği ürünlerin teslimi,
                ödeme şekli, teslimat koşulları, cayma hakkı ve garanti
                koşulları gibi hususları düzenlemektedir.
              </p>
            </div>
          </section>

          {/* Madde 3: Sözleşme Konusu Ürün/Hizmet Bilgileri */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-200 pt-16">
            <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.25em] uppercase">
              Madde 3. Ürün Bilgileri
            </h2>
            <div className="md:col-span-2 space-y-4">
              <p className="text-sm text-stone-700 leading-[1.8]">
                Sözleşme konusu ürünün/ürünlerin temel özellikleri, cinsi,
                miktarı, marka/modeli, rengi, satış bedeli Satıcı'ya ait
                internet sitesinde yer almaktadır. Ürün bilgilerini incelemenizi
                rica ederiz.
              </p>
              <div className="bg-stone-50 border border-stone-200 p-6 space-y-3">
                <p className="text-[11px] font-bold text-stone-900 uppercase tracking-wide">
                  Ürün Kategorileri:
                </p>
                <ul className="space-y-2">
                  {[
                    "Balkon masa ve sandalye takımları",
                    "Bahçe oturma grupları ve köşe takımları",
                    "Dış mekan dinlenme yatakları ve şezlonglar",
                    "Bahçe salıncakları ve hamak sistemleri",
                    "Dış mekan saksı ve dekorasyon ürünleri",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="text-[12px] text-stone-700 flex gap-3"
                    >
                      <span className="text-stone-400 font-bold">—</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Madde 4: Genel Hükümler */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-200 pt-16">
            <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.25em] uppercase">
              Madde 4. Genel Hükümler
            </h2>
            <div className="md:col-span-2 space-y-4">
              <p className="text-sm text-stone-700 leading-[1.8]">
                Alıcı, Satıcı'ya ait internet sitesinde sözleşme konusu ürünün
                temel nitelikleri, satış fiyatı, ödeme şekli ve teslimat
                koşulları ile ilgili ön bilgileri okuyup bilgi sahibi olduğunu
                ve elektronik ortamda gerekli teyidi verdiğini beyan eder.
              </p>
              <p className="text-sm text-stone-700 leading-[1.8]">
                Alıcı, sipariş vermeden önce ön bilgilendirmeyi okuyup teyit
                etmekle işbu sözleşmede belirtilen adres, siparişi verilen
                ürünlere ait bilgiler, ürünlerin vergiler dahil fiyatı, ödeme ve
                teslimat bilgilerinin doğru ve eksiksiz olduğunu kabul, beyan ve
                taahhüt eder.
              </p>
            </div>
          </section>

          {/* Madde 5: Cayma Hakkı (Kritik Bölüm) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-200 pt-16">
            <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.25em] uppercase">
              Madde 5. Cayma Hakkı
            </h2>
            <div className="md:col-span-2 space-y-6">
              <p className="text-sm text-stone-700 leading-[1.8]">
                Alıcı, sözleşme konusu ürünün kendisine veya gösterdiği
                adresteki kişi/kuruluşa teslim tarihinden itibaren 14 (on dört)
                gün içinde, Satıcı'ya bildirmek şartıyla hiçbir hukuki ve cezai
                sorumluluk üstlenmeksizin ve hiçbir gerekçe göstermeksizin malı
                reddederek sözleşmeden cayma hakkına sahiptir.
              </p>
              <div className="bg-stone-50 border border-stone-200 p-6 space-y-4">
                <p className="text-[11px] font-bold text-stone-900 uppercase tracking-wide">
                  Cayma Hakkının Kullanımı:
                </p>
                <ul className="space-y-3">
                  {[
                    "Cayma hakkı süresi içinde ürün kullanılmamış, ambalajı açılmamış ve zarar görmemiş olmalıdır.",
                    "Cayma bildirimini balkoluxofficial@gmail.com adresine veya +90 546 225 56 59 numaralı telefona yapabilirsiniz.",
                    "Ürün faturası, iade formu ve teslimat belgesi iade ile birlikte gönderilmelidir.",
                    "Ürün iadesi, cayma bildirimi tarihinden itibaren 10 gün içinde yapılmalıdır.",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="text-[12px] text-stone-700 flex gap-3"
                    >
                      <span className="text-stone-400 font-bold">—</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-6 space-y-4 mt-4">
                <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wide">
                  Cayma Hakkının Kullanılamayacağı Haller:
                </p>
                <ul className="space-y-3">
                  {[
                    "Alıcı'nın istekleri veya açıkça kişisel ihtiyaçları doğrultusunda hazırlanan, özel ölçü ve tasarımla üretilen bahçe mobilyaları.",
                    "Alıcı'nın talebi üzerine montajı yapılmış veya renk/desen değişikliği yapılmış ürünler.",
                    "Hızla bozulabilen, son kullanma tarihi geçebilecek veya kullanım süresi dolabilecek mallar.",
                    "Teslimden sonra ambalajı açılmış, kullanılmış veya montajı yapılmış ürünler.",
                    "Hijyen ve sağlık açısından uygun olmayan, teslimden sonra başka ürünlerle karışan mallar.",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="text-[12px] text-stone-700 flex gap-3"
                    >
                      <span className="text-amber-600 font-bold">—</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Madde 6: Teslimat */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-200 pt-16">
            <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.25em] uppercase">
              Madde 6. Teslimat
            </h2>
            <div className="md:col-span-2 space-y-4">
              <p className="text-sm text-stone-700 leading-[1.8]">
                Ürün, Alıcı'nın veya gösterdiği adresteki kişi/kuruluşa teslim
                edilir. Teslimat süresi, ödeme onayından sonra en geç 30 (otuz)
                gün içindedir. Özel üretim ürünlerde bu süre sipariş onayı
                sonrası Alıcı'ya bildirilir.
              </p>
              <p className="text-sm text-stone-700 leading-[1.8]">
                Teslimat sırasında Alıcı veya gösterilen kişi/kuruluş hazır
                bulunmalıdır. Ürün hasarlı veya kusurlu olarak teslim edilirse,
                teslim tutanağına "hasarlı teslim edildi" notu düşülmelidir.
              </p>
            </div>
          </section>

          {/* Madde 7: Ödeme */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-200 pt-16">
            <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.25em] uppercase">
              Madde 7. Ödeme
            </h2>
            <div className="md:col-span-2 space-y-4">
              <p className="text-sm text-stone-700 leading-[1.8]">
                Alıcı, kredi kartı, banka kartı, havale/EFT veya kapıda ödeme
                yöntemlerinden birini seçerek ödeme yapabilir. Taksitli ödeme
                seçenekleri, kredi kartı için geçerlidir ve banka politikalarına
                göre değişkenlik gösterir.
              </p>
              <p className="text-sm text-stone-700 leading-[1.8]">
                Ödeme bilgilerinin güvenliği için 128-bit SSL şifreleme
                teknolojisi kullanılmaktadır. Kredi kartı bilgileri kesinlikle
                saklanmamakta ve üçüncü şahıslarla paylaşılmamaktadır.
              </p>
            </div>
          </section>

          {/* Madde 8: Garanti */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-200 pt-16">
            <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.25em] uppercase">
              Madde 8. Garanti Koşulları
            </h2>
            <div className="md:col-span-2 space-y-4">
              <p className="text-sm text-stone-700 leading-[1.8]">
                Satıcı tarafından satılan tüm ürünler, üretici firma garantisine
                sahiptir. Garanti süresi ve kapsamı ürün ile birlikte teslim
                edilen garanti belgesinde detaylı olarak açıklanmıştır.
              </p>
              <p className="text-sm text-stone-700 leading-[1.8]">
                Ürünlerde tespit edilen üretim hataları, garanti kapsamında
                Satıcı veya yetkili servis tarafından ücretsiz olarak giderilir.
                Kullanım hataları ve dış etkenlerden kaynaklanan hasarlar
                garanti kapsamı dışındadır.
              </p>
            </div>
          </section>

          {/* Madde 9: Uyuşmazlıkların Çözümü */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-200 pt-16">
            <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.25em] uppercase">
              Madde 9. Uyuşmazlıklar
            </h2>
            <div className="md:col-span-2 space-y-4">
              <p className="text-sm text-stone-700 leading-[1.8]">
                İşbu sözleşmeden doğabilecek her türlü uyuşmazlıklarda, Sanayi
                ve Ticaret Bakanlığı tarafından her yıl Aralık ayında belirlenen
                parasal sınırlar dahilinde Alıcı'nın mal veya hizmeti satın
                aldığı ya da ikametgahının bulunduğu yerdeki Tüketici Hakem
                Heyetleri ile Tüketici Mahkemeleri yetkilidir.
              </p>
              <p className="text-sm text-stone-700 leading-[1.8]">
                İşbu sözleşme, Alıcı tarafından okunmuş, elektronik ortamda
                onaylanmış ve kabul edilmiştir. Sözleşme 8 (sekiz) sayfadan
                oluşmaktadır.
              </p>
            </div>
          </section>

          {/* Madde 10: Yürürlük */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-200 pt-16">
            <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.25em] uppercase">
              Madde 10. Yürürlük
            </h2>
            <div className="md:col-span-2 space-y-4">
              <p className="text-sm text-stone-700 leading-[1.8]">
                İşbu sözleşme, Alıcı tarafından elektronik ortamda onaylandığı
                tarihte yürürlüğe girer. Satıcı, sözleşme konusu edimlerini
                eksiksiz ve tam olarak, Alıcı ise ödeme ve bildirim
                yükümlülüklerini işbu sözleşme hükümleri doğrultusunda yerine
                getirmeyi kabul ve taahhüt eder.
              </p>
            </div>
          </section>

          {/* İletişim & Onay */}
          <footer className="pt-24 border-t border-stone-200">
            <div className="bg-[#0a0a0a] p-12 md:p-16 text-white flex flex-col md:flex-row justify-between items-start gap-12 relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <h3 className="text-2xl font-serif font-semibold tracking-tight">
                  Hukuki Destek ve İletişim
                </h3>
                <div className="space-y-4 text-stone-300 text-xs font-medium tracking-wide">
                  <div className="flex items-center gap-4">
                    <Mail size={14} strokeWidth={1.5} />
                    <span>balkoluxofficial@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone size={14} strokeWidth={1.5} />
                    <span>+90 546 225 56 59</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin size={14} strokeWidth={1.5} />
                    <span>
                      Esentepe bulvarı prof necmettin erbakan bulvarı no353,
                      01150 Çukurova/Adana
                    </span>
                  </div>
                </div>
              </div>
              <button className="relative z-10 group flex items-center gap-4 border border-stone-700 px-8 py-4 hover:border-white transition-all duration-300">
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold">
                  Müşteri Hizmetleri
                </span>
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </button>

              {/* Dekoratif Arka Plan */}
              <div className="absolute -bottom-10 -right-10 text-[120px] font-serif text-white/[0.02] pointer-events-none select-none">
                BLX
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
