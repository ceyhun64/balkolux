"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, ArrowRight, MapPin, Phone, Mail } from "lucide-react";

export default function KvkkPage() {
  return (
    <div className="bg-white min-h-screen selection:bg-stone-100 selection:text-stone-900">
      <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        {/* Üst Başlık */}
        <header className="mb-24 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-stone-500"
          >
            <Shield size={16} strokeWidth={1.5} />
            <span className="text-[10px] tracking-[0.4em] uppercase font-semibold">
              Kişisel Verilerin Korunması
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight font-bold"
          >
            KVKK Aydınlatma Metni
          </motion.h1>

          <p className="text-[11px] text-stone-500 font-medium tracking-wider uppercase border-t border-stone-200 pt-6">
            Yürürlük Tarihi: 06 Ocak 2026 — Veri Sorumlusu: Balkolux
          </p>
        </header>

        {/* Ana İçerik */}
        <div className="space-y-20">
          {/* Giriş Paragrafı */}
          <section className="max-w-3xl border-l-4 border-stone-900 pl-6">
            <p className="text-stone-700 text-base leading-relaxed">
              6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca,
              Balkolux olarak kişisel verilerinizin güvenliği ve gizliliği
              konusunda azami hassasiyeti göstermekteyiz. İşbu aydınlatma metni,
              kişisel verilerinizin ne şekilde işlendiği, saklandığı ve
              korunduğu hususunda sizleri bilgilendirmek amacıyla
              hazırlanmıştır.
            </p>
          </section>

          {/* Maddeler */}
          <div className="space-y-16 border-t border-stone-200 pt-16">
            {/* 01. Veri Sorumlusu */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.25em] uppercase">
                Madde 1. Veri Sorumlusu
              </h2>
              <div className="md:col-span-2 space-y-6">
                <p className="text-sm text-stone-700 leading-relaxed">
                  6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK")
                  kapsamında veri sorumlusu sıfatıyla hareket eden Balkolux
                  Bahçe ve Balkon Mobilyaları ("Balkolux" veya "Şirket"),
                  kişisel verilerinizi aşağıda açıklanan çerçevede işlemektedir.
                </p>
                <address className="not-italic bg-stone-50 border border-stone-200 p-8 text-[13px] text-stone-700 space-y-2 leading-relaxed">
                  <span className="text-stone-900 font-semibold block text-base mb-3">
                    Balkolux Bahçe ve Balkon Mobilyaları
                  </span>
                  <div className="space-y-1">
                    <p className="flex items-center gap-2">
                      <MapPin size={14} className="text-stone-500" />
                      Esentepe bulvarı prof necmettin erbakan bulvarı no353,
                      01150 Çukurova/Adana{" "}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail size={14} className="text-stone-500" />
                      balkoluxofficial@gmail.com
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone size={14} className="text-stone-500" />
                      +90 546 225 56 59
                    </p>
                  </div>
                </address>
              </div>
            </div>

            {/* 02. İşlenen Kişisel Veriler */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-100 pt-16">
              <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.25em] uppercase">
                Madde 2. İşlenen Kişisel Veriler
              </h2>
              <div className="md:col-span-2 space-y-6">
                <p className="text-sm text-stone-700 leading-relaxed">
                  Balkolux olarak, hizmetlerimizi sunabilmek amacıyla aşağıda
                  belirtilen kişisel verileriniz işlenebilmektedir:
                </p>
                <div className="bg-stone-50 border border-stone-200 p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "Kimlik Bilgileri (Ad, Soyad, T.C. Kimlik No)",
                      "İletişim Bilgileri (Telefon, E-posta, Adres)",
                      "Müşteri İşlem Bilgileri (Sipariş, Ödeme)",
                      "Finansal Bilgiler (Banka Hesap, Kredi Kartı)",
                      "İşlem Güvenliği Bilgileri (IP Adresi, Log)",
                      "Pazarlama Bilgileri (İlgi Alanları, Tercihler)",
                      "Görsel ve İşitsel Kayıtlar (Fotoğraf, Video)",
                      "Hukuki İşlem Bilgileri (Şikayet, Dava)",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-xs text-stone-700 border-b border-stone-100 pb-3"
                      >
                        <ArrowRight
                          size={12}
                          className="text-stone-400 mt-0.5 flex-shrink-0"
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 03. Kişisel Verilerin İşlenme Amaçları */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-100 pt-16">
              <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.25em] uppercase">
                Madde 3. İşlenme Amaçları
              </h2>
              <div className="md:col-span-2 space-y-6">
                <p className="text-sm text-stone-700 leading-relaxed">
                  Kişisel verileriniz, aşağıda belirtilen amaçlarla KVKK'nın 5.
                  ve 6. maddelerinde belirtilen kişisel veri işleme şartları
                  dahilinde işlenmektedir:
                </p>
                <div className="space-y-4">
                  {[
                    {
                      title: "Sözleşme Yükümlülüklerinin Yerine Getirilmesi",
                      desc: "Sipariş süreçlerinin yönetimi, ürün teslimatı, satış sonrası hizmetler",
                    },
                    {
                      title: "Ticari Faaliyetlerin Yürütülmesi",
                      desc: "Müşteri ilişkileri yönetimi, ürün ve hizmet geliştirme, pazar araştırmaları",
                    },
                    {
                      title: "Yasal Yükümlülüklerin Yerine Getirilmesi",
                      desc: "Vergi, muhasebe ve denetim süreçleri, yasal raporlama yükümlülükleri",
                    },
                    {
                      title: "İletişim Faaliyetleri",
                      desc: "Müşteri destek hizmetleri, bilgilendirme, kampanya ve promosyonlar",
                    },
                    {
                      title: "Güvenlik ve Denetim",
                      desc: "Bilgi güvenliği, işlem güvenliği, hukuki uyum süreçleri",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="border-l-2 border-stone-300 pl-4 py-2"
                    >
                      <p className="text-[12px] font-semibold text-stone-900 mb-1">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-stone-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 04. Kişisel Verilerin Aktarılması */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-100 pt-16">
              <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.25em] uppercase">
                Madde 4. Veri Aktarımı
              </h2>
              <div className="md:col-span-2 space-y-6">
                <p className="text-sm text-stone-700 leading-relaxed">
                  Kişisel verileriniz, KVKK'nın 8. ve 9. maddelerinde belirtilen
                  kişisel veri işleme şartları ve amaçları çerçevesinde
                  aşağıdaki taraflarla paylaşılabilmektedir:
                </p>
                <div className="bg-stone-50 border border-stone-200 p-6 space-y-3">
                  <ul className="space-y-2">
                    {[
                      "Kargo ve lojistik hizmet sağlayıcıları",
                      "Ödeme altyapı sağlayıcıları ve bankalar",
                      "Hukuki danışmanlar ve denetim şirketleri",
                      "Yetkili kamu kurum ve kuruluşları",
                      "İş ortakları ve tedarikçiler",
                      "Bilgi teknolojileri hizmet sağlayıcıları",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="text-[12px] text-stone-700 flex gap-3"
                      >
                        <span className="text-stone-400 font-bold">—</span>{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-stone-700 leading-relaxed">
                  Kişisel verileriniz, yurt dışına aktarılması gerektiğinde
                  KVKK'nın 9. maddesinde öngörülen şartlara uygun olarak
                  aktarılmaktadır.
                </p>
              </div>
            </div>

            {/* 05. Kişisel Verilerin Toplanma Yöntemi */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-100 pt-16">
              <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.25em] uppercase">
                Madde 5. Toplama Yöntemi
              </h2>
              <div className="md:col-span-2 space-y-4">
                <p className="text-sm text-stone-700 leading-relaxed">
                  Kişisel verileriniz, aşağıda belirtilen kanallar aracılığıyla
                  otomatik veya otomatik olmayan yöntemlerle toplanmaktadır:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "İnternet sitesi (www.balkolux.com)",
                    "Mobil uygulama",
                    "Telefon ve e-posta",
                    "Sosyal medya platformları",
                    "Fiziksel mağazalar ve bayiler",
                    "Anket ve formlar",
                    "Müşteri hizmetleri görüşmeleri",
                    "Etkinlik ve fuarlar",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-stone-700 bg-stone-50 border border-stone-200 px-3 py-2"
                    >
                      <ArrowRight size={10} className="text-stone-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 06. Hukuki Sebepler */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-100 pt-16">
              <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.25em] uppercase">
                Madde 6. Hukuki Sebepler
              </h2>
              <div className="md:col-span-2 space-y-4">
                <p className="text-sm text-stone-700 leading-relaxed">
                  Kişisel verileriniz, KVKK'nın 5. ve 6. maddelerinde belirtilen
                  aşağıdaki hukuki sebeplere dayanılarak işlenmektedir:
                </p>
                <div className="space-y-3">
                  {[
                    "Kanunlarda açıkça öngörülmesi",
                    "Bir sözleşmenin kurulması veya ifası için gerekli olması",
                    "Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması",
                    "İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması",
                    "Açık rızanızın bulunması",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 text-xs text-stone-700 border-l-2 border-stone-300 pl-4 py-2"
                    >
                      <span className="text-stone-900 font-semibold min-w-[20px]">
                        {i + 1}.
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 07. Kişisel Veri Sahibinin Hakları */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-100 pt-16">
              <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.25em] uppercase">
                Madde 7. Haklarınız
              </h2>
              <div className="md:col-span-2 space-y-6">
                <p className="text-sm text-stone-700 leading-relaxed">
                  KVKK'nın 11. maddesi uyarınca, kişisel veri sahibi olarak
                  aşağıdaki haklara sahipsiniz:
                </p>
                <div className="bg-stone-50 border border-stone-200 p-6 space-y-4">
                  <ul className="space-y-3">
                    {[
                      "Kişisel verilerinizin işlenip işlenmediğini öğrenme",
                      "Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme",
                      "Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme",
                      "Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme",
                      "Kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme",
                      "KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme",
                      "Düzeltme, silme veya yok edilme işlemlerinin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme",
                      "İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme",
                      "Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="text-[12px] text-stone-700 flex gap-3"
                      >
                        <span className="text-stone-400 font-bold">—</span>{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-6 space-y-3">
                  <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wide">
                    Başvuru Yöntemi:
                  </p>
                  <p className="text-[12px] text-stone-700 leading-relaxed">
                    Yukarıda belirtilen haklarınızı kullanmak için başvurunuzu,
                    yazılı olarak veya Kişisel Verileri Koruma Kurulu tarafından
                    belirlenen diğer yöntemlerle Şirketimize iletebilirsiniz.
                    Başvurularınız, talebinizin niteliğine göre en geç 30 (otuz)
                    gün içinde ücretsiz olarak sonuçlandırılacaktır.
                  </p>
                  <div className="pt-3 border-t border-amber-300">
                    <p className="text-[11px] text-stone-600 mb-2">
                      <strong>Başvuru Adresi:</strong>
                    </p>
                    <p className="text-[12px] text-stone-700">
                      Balkolux Bahçe ve Balkon Mobilyaları
                      <br />
                      Esentepe bulvarı prof necmettin erbakan bulvarı no353,
                      01150 Çukurova/Adana <br />
                      E-posta: balkoluxofficial@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 08. Verilerin Saklanma Süresi */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-100 pt-16">
              <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.25em] uppercase">
                Madde 8. Saklama Süresi
              </h2>
              <div className="md:col-span-2 space-y-4">
                <p className="text-sm text-stone-700 leading-relaxed">
                  Kişisel verileriniz, işlendikleri amaç için gerekli olan süre
                  boyunca ve her halükarda ilgili mevzuatta öngörülen süreler
                  boyunca saklanmaktadır. Saklama süresinin sona ermesi halinde
                  kişisel verileriniz, KVKK ve ilgili mevzuat hükümlerine uygun
                  olarak silinir, yok edilir veya anonim hale getirilir.
                </p>
                <p className="text-sm text-stone-700 leading-relaxed">
                  Vergi Usul Kanunu, Türk Ticaret Kanunu ve diğer ilgili mevzuat
                  kapsamında saklama yükümlülüğü bulunan belgeler için yasal
                  saklama süreleri uygulanmaktadır.
                </p>
              </div>
            </div>

            {/* 09. Veri Güvenliği */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-100 pt-16">
              <h2 className="text-[11px] font-bold text-stone-900 tracking-[0.25em] uppercase">
                Madde 9. Veri Güvenliği
              </h2>
              <div className="md:col-span-2 space-y-4">
                <p className="text-sm text-stone-700 leading-relaxed">
                  Balkolux olarak, kişisel verilerinizin güvenliğini sağlamak
                  amacıyla KVKK'nın 12. maddesinde öngörülen teknik ve idari
                  tedbirleri almaktayız. Bu kapsamda:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "SSL şifreleme teknolojisi",
                    "Güvenlik duvarları ve antivirüs sistemleri",
                    "Erişim yetkilendirme sistemleri",
                    "Düzenli güvenlik denetimleri",
                    "Personel eğitimleri",
                    "Gizlilik sözleşmeleri",
                    "Veri yedekleme sistemleri",
                    "Olay müdahale prosedürleri",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-stone-700 bg-green-50 border border-green-200 px-3 py-2"
                    >
                      <Shield size={10} className="text-green-600" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer İletişim */}
        <footer className="mt-32 pt-16 border-t border-stone-900">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
              <div className="space-y-2">
                <p className="text-[9px] tracking-widest text-stone-500 uppercase font-semibold">
                  E-Posta
                </p>
                <p className="text-xs text-stone-700">balkoluxofficial@gmail.com</p>
              </div>
              <div className="space-y-2">
                <p className="text-[9px] tracking-widest text-stone-500 uppercase font-semibold">
                  Telefon
                </p>
                <p className="text-xs text-stone-700">+90 546 225 56 59</p>
              </div>
              <div className="space-y-2">
                <p className="text-[9px] tracking-widest text-stone-500 uppercase font-semibold">
                  Adres
                </p>
                <p className="text-xs text-stone-700">
                  Esentepe bulvarı prof necmettin erbakan bulvarı no353, 01150
                  Çukurova/Adana
                </p>
              </div>
            </div>
            <p className="text-[9px] text-stone-400 tracking-[0.2em] uppercase">
              © 2026 Balkolux — Tüm Hakları Saklıdır.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
