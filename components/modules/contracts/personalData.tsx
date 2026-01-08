"use client";

import React from "react";
import {
  MapPin,
  Phone,
  Globe,
  Mail,
  ShieldCheck,
  FileText,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function PersonalDataConsent() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 space-y-16">
        {/* Başlık Bölümü */}
        <header className="text-center space-y-4 border-b border-stone-200 pb-12">
          <span className="text-[10px] tracking-[0.4em] text-stone-500 uppercase font-semibold block">
            KVKK Onay Formu
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">
            Kişisel Verilerin İşlenmesi
            <br />
            <span className="text-3xl md:text-4xl">Açık Rıza Metni</span>
          </h1>
          <p className="text-sm text-stone-500 font-medium">
            Balkolux Bahçe ve Balkon Mobilyaları — 06 Ocak 2026
          </p>
        </header>

        {/* Giriş Açıklaması */}
        <section className="max-w-3xl mx-auto bg-stone-50 border-l-4 border-stone-900 p-8">
          <p className="text-base text-stone-700 leading-relaxed">
            6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında,
            kişisel verilerinizin işlenmesi ve korunması hususunda
            bilgilendirilmiş olarak aşağıdaki onay metnini dikkatlice okumanızı
            ve onaylamanızı rica ederiz.
          </p>
        </section>

        {/* Ana İçerik */}
        <div className="space-y-10">
          {/* Onay Metni */}
          <section className="border border-stone-200 p-8 md:p-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-stone-900 text-white rounded-sm">
                <FileText size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  Açık Rıza Beyanı
                </h2>
                <p className="text-xs text-stone-500 uppercase tracking-wide mt-1">
                  Kişisel Verilerin İşlenmesine İlişkin Onay
                </p>
              </div>
            </div>

            <div className="space-y-6 text-sm text-stone-700 leading-[1.8]">
              <p>
                <strong>Balkolux Bahçe ve Balkon Mobilyaları</strong> tarafından
                hazırlanan KVKK Aydınlatma Metni'ni okudum ve anladım. Bu
                kapsamda, tarafıma ait kişisel verilerin,{" "}
                <strong>
                  6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)
                </strong>{" "}
                uyarınca, Balkolux tarafından aşağıda belirtilen amaçlarla
                işlenmesine ve gerektiğinde üçüncü kişilerle paylaşılmasına
                açıkça rıza gösteriyorum.
              </p>

              <div className="bg-stone-50 border border-stone-200 p-6 space-y-4">
                <p className="text-[11px] font-bold text-stone-900 uppercase tracking-wide">
                  Kişisel Verilerimin İşlenme Amaçları:
                </p>
                <ul className="space-y-3">
                  {[
                    "Sipariş işlemlerimin gerçekleştirilmesi ve takibi",
                    "Satış sözleşmesinin kurulması ve ifası",
                    "Ödeme işlemlerinin yürütülmesi",
                    "Kargo ve teslimat süreçlerinin yönetimi",
                    "Müşteri memnuniyeti ve destek hizmetlerinin sağlanması",
                    "Satış sonrası hizmetler ve garanti işlemlerinin takibi",
                    "Ürün ve hizmetlerin geliştirilmesi",
                    "Pazarlama ve iletişim faaliyetlerinin yürütülmesi",
                    "Kampanya, promosyon ve bilgilendirme iletilerinin gönderilmesi",
                    "Finans ve muhasebe işlemlerinin gerçekleştirilmesi",
                    "Yasal yükümlülüklerin yerine getirilmesi",
                    "Hukuki işlemlerin yürütülmesi ve takibi",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="text-[12px] text-stone-700 flex gap-3 items-start"
                    >
                      <CheckCircle
                        size={14}
                        className="text-green-600 mt-0.5 flex-shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p>
                Bu kapsamda; <strong>ad-soyad</strong>,{" "}
                <strong>T.C. kimlik numarası</strong>,{" "}
                <strong>telefon numarası</strong>,{" "}
                <strong>e-posta adresi</strong>,{" "}
                <strong>açık adres bilgileri</strong>,{" "}
                <strong>IP adresi</strong>, <strong>çerez bilgileri</strong>,{" "}
                <strong>banka hesap ve kredi kartı bilgileri</strong>,{" "}
                <strong>sipariş ve alışveriş geçmişi</strong> ile{" "}
                <strong>iletişim tercihleri</strong> gibi kişisel verilerimin,
                Balkolux'un hizmet sağlayıcıları, kargo şirketleri, ödeme
                hizmeti sunucuları, pazarlama ajansları, yasal danışmanlar ve
                gerektiğinde resmi merciler ile paylaşılmasına açık rıza
                veriyorum.
              </p>
            </div>
          </section>

          {/* Veri Aktarımı */}
          <section className="border border-stone-200 p-8 md:p-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-stone-900 text-white rounded-sm">
                <Globe size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  Veri Aktarımı ve Paylaşımı
                </h2>
                <p className="text-xs text-stone-500 uppercase tracking-wide mt-1">
                  Üçüncü Taraflarla Paylaşım Onayı
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-stone-700 leading-[1.8]">
              <p>
                Kişisel verilerimin, yukarıda belirtilen amaçlar doğrultusunda
                ve KVKK'nın öngördüğü şartlar çerçevesinde, Balkolux tarafından
                belirlenen süre boyunca saklanacağını ve aşağıdaki kategorilerde
                yer alan üçüncü kişilerle paylaşılabileceğini kabul ediyorum:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Kargo ve lojistik hizmet sağlayıcıları",
                  "Ödeme kuruluşları ve bankalar",
                  "Pazarlama ve reklam ajansları",
                  "Bilgi teknolojileri altyapı hizmeti sağlayıcıları",
                  "Çağrı merkezi hizmet sağlayıcıları",
                  "Hukuki danışmanlar ve denetim şirketleri",
                  "Kamu kurum ve kuruluşları",
                  "İş ortakları ve tedarikçiler",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-stone-50 border border-stone-200 p-4"
                  >
                    <ArrowRight
                      size={14}
                      className="text-stone-400 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-[12px]">{item}</span>
                  </div>
                ))}
              </div>

              <p className="bg-amber-50 border-l-4 border-amber-400 p-4 text-xs italic">
                Kişisel verilerimin yurt dışına aktarılması gerektiğinde,
                KVKK'nın 9. maddesinde öngörülen şartlar ve Kişisel Verileri
                Koruma Kurulu kararları çerçevesinde aktarım yapılacağını
                biliyorum.
              </p>
            </div>
          </section>

          {/* Ticari Elektronik İleti */}
          <section className="border border-stone-200 p-8 md:p-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-stone-900 text-white rounded-sm">
                <Mail size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  Ticari Elektronik İleti Onayı
                </h2>
                <p className="text-xs text-stone-500 uppercase tracking-wide mt-1">
                  Pazarlama İletişimi İzni
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-stone-700 leading-[1.8]">
              <p>
                6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun
                kapsamında, Balkolux tarafından sunulan ürün ve hizmetler,
                kampanyalar, özel teklifler, indirimler ve diğer pazarlama
                faaliyetleri hakkında ticari elektronik ileti almayı kabul
                ediyorum.
              </p>

              <div className="bg-blue-50 border border-blue-200 p-6 space-y-3">
                <p className="text-[11px] font-bold text-blue-900 uppercase tracking-wide">
                  İletişim Kanalları:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    "E-posta (E-mail)",
                    "SMS (Kısa Mesaj)",
                    "Telefon Araması",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-white border border-blue-200 px-3 py-2 text-[12px]"
                    >
                      <CheckCircle size={12} className="text-blue-600" />
                      {item}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-stone-600 italic pt-3">
                  Bu onayımı istediğim zaman geri alabileceğimi ve ticari
                  elektronik ileti almayı reddetme hakkıma sahip olduğumu
                  biliyorum.
                </p>
              </div>
            </div>
          </section>

          {/* Haklarım */}
          <section className="border border-stone-200 p-8 md:p-10 bg-stone-50">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-stone-900 text-white rounded-sm">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  Kişisel Veri Sahibi Olarak Haklarım
                </h2>
                <p className="text-xs text-stone-500 uppercase tracking-wide mt-1">
                  KVKK Kapsamında Sahip Olduğum Haklar
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-stone-700 leading-[1.8]">
              <p>
                KVKK'nın 11. maddesi uyarınca, kişisel veri sahibi olarak
                aşağıdaki haklara sahip olduğumu biliyorum ve bu hakları
                kullanmak için Balkolux'a başvurabileceğimi kabul ediyorum:
              </p>

              <div className="space-y-3">
                {[
                  "Kişisel verilerimin işlenip işlenmediğini öğrenmek",
                  "Kişisel verilerim işlenmişse buna ilişkin bilgi talep etmek",
                  "Kişisel verilerimin işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenmek",
                  "Yurt içinde veya yurt dışında kişisel verilerimin aktarıldığı üçüncü kişileri bilmek",
                  "Kişisel verilerimin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini istemek",
                  "KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerimin silinmesini veya yok edilmesini istemek",
                  "Düzeltme, silme veya yok edilme işlemlerinin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini istemek",
                  "İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhime bir sonucun ortaya çıkmasına itiraz etmek",
                  "Kişisel verilerimin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramam halinde zararın giderilmesini talep etmek",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-white border border-stone-200 p-4"
                  >
                    <span className="text-stone-900 font-bold min-w-[24px] text-center">
                      {i + 1}.
                    </span>
                    <span className="text-[12px]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 border border-green-200 p-6 mt-6">
                <p className="text-[11px] font-bold text-green-900 uppercase tracking-wide mb-3">
                  Başvuru Yöntemi:
                </p>
                <p className="text-[12px] text-stone-700 mb-4">
                  Yukarıda belirtilen haklarımı kullanmak için başvurumu,
                  Balkolux'a yazılı olarak veya kayıtlı elektronik posta (KEP)
                  adresi, güvenli elektronik imza, mobil imza ya da ilgili kişi
                  tarafından Balkolux'a daha önce bildirilen ve sistemde kayıtlı
                  bulunan elektronik posta adresini kullanmak suretiyle
                  iletebilirim.
                </p>
                <div className="border-t border-green-300 pt-4 space-y-2 text-[12px] text-stone-700">
                  <p>
                    <strong>Başvuru Adresi:</strong> Esentepe Bulvarı Prof
                    Necmettin Erbakan Bulvarı No353, 01150 Çukurova/Adana
                  </p>
                  <p>
                    <strong>E-posta:</strong> balkoluxofficial@gmail.com
                  </p>
                  <p className="text-[11px] text-stone-600 italic pt-2">
                    Başvurularım, talebimin niteliğine göre en geç 30 (otuz) gün
                    içinde ücretsiz olarak sonuçlandırılacaktır. Ancak, işlemin
                    ayrıca bir maliyeti gerektirmesi halinde, Kişisel Verileri
                    Koruma Kurulu tarafından belirlenen tarifedeki ücret
                    alınabilir.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Onay Beyanı */}
          <section className="border-2 border-stone-900 p-8 md:p-10 bg-stone-900 text-white">
            <h2 className="text-2xl font-serif font-bold mb-6">
              Son Beyan ve Onay
            </h2>
            <div className="space-y-4 text-sm leading-[1.8]">
              <p>
                İşbu açık rıza metninde yer alan tüm hususları okudum, anladım
                ve kabul ediyorum. Kişisel verilerimin yukarıda belirtilen
                amaçlar ve yöntemlerle işlenmesine, saklanmasına ve
                paylaşılmasına özgür iradem ile açık rıza gösteriyorum.
              </p>
              <p>
                Bu onayımı istediğim zaman geri alabileceğimi ve KVKK kapsamında
                sahip olduğum haklarımı kullanabileceğimi biliyorum.
              </p>
              <div className="bg-white/10 border border-white/20 p-4 mt-6">
                <p className="text-xs text-stone-300">
                  <strong className="text-white">Not:</strong> Bu belge
                  elektronik ortamda düzenlenmiş olup, onay tarihi sistem
                  kayıtlarına işlenmiştir. Fiziksel imza gerektirmemektedir.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* İletişim Kartı */}
        <section className="bg-stone-100 border-2 border-stone-200 p-8 md:p-10 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            İletişim Bilgileri
          </h2>
          <p className="text-sm text-stone-700 leading-relaxed">
            Kişisel verileriniz ile ilgili sorularınız, talepleriniz veya
            şikayetleriniz için aşağıdaki iletişim kanallarını kullanarak bize
            ulaşabilirsiniz.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 bg-white border border-stone-200 p-6">
              <MapPin className="w-6 h-6 text-stone-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-[10px] text-stone-500 uppercase tracking-wide font-semibold mb-2">
                  Adres
                </p>
                <p className="text-sm text-stone-700 leading-relaxed">
                  Balkolux Bahçe ve Balkon Mobilyaları
                  <br />
                  Esentepe Bulvarı Prof Necmettin Erbakan Bulvarı No353, 01150
                  Çukurova/Adana
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white border border-stone-200 p-6">
              <Phone className="w-6 h-6 text-stone-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-[10px] text-stone-500 uppercase tracking-wide font-semibold mb-2">
                  Telefon
                </p>
                <p className="text-sm text-stone-700">+90 546 225 56 59</p>
                <p className="text-xs text-stone-500 mt-1">
                  Pazartesi - Cumartesi: 09:00 - 18:00
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white border border-stone-200 p-6">
              <Mail className="w-6 h-6 text-stone-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-[10px] text-stone-500 uppercase tracking-wide font-semibold mb-2">
                  E-posta
                </p>
                <p className="text-sm text-stone-700">
                  balkoluxofficial@gmail.com
                </p>
              
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white border border-stone-200 p-6">
              <Globe className="w-6 h-6 text-stone-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-[10px] text-stone-500 uppercase tracking-wide font-semibold mb-2">
                  Web Sitesi
                </p>
                <p className="text-sm text-stone-700">www.balkolux.com</p>
                <p className="text-xs text-stone-500 mt-1">
                  7/24 Online Destek
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-green-50 border-2 border-green-200 p-6 mt-6">
            <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm text-stone-700 leading-relaxed">
                Kişisel verilerinizin korunması için gerekli tüm teknik ve idari
                tedbirler Balkolux tarafından alınmaktadır. Bilgileriniz
                güvendedir.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-12 border-t border-stone-200 space-y-4">
          <p className="text-[10px] text-stone-400 tracking-wide uppercase">
            © 2026 Balkolux Bahçe ve Balkon Mobilyaları
          </p>
          <p className="text-[9px] text-stone-400">
            Tüm Hakları Saklıdır — Bu belge KVKK uyarınca hazırlanmıştır
          </p>
        </footer>
      </div>
    </div>
  );
}
