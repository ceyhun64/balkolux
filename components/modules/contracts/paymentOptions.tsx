"use client";

import React from "react";
import {
  CreditCard,
  Banknote,
  ArrowRightCircle,
  ShieldCheck,
  Mail,
  Phone,
  Lock,
  CheckCircle2,
} from "lucide-react";

export default function PaymentOptions() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 space-y-16">
        {/* Başlık Bölümü */}
        <header className="text-center space-y-4 border-b border-stone-200 pb-12">
          <span className="text-[10px] tracking-[0.4em] text-stone-500 uppercase font-semibold block">
            Ödeme Bilgilendirmesi
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">
            Ödeme Seçenekleri
          </h1>
          <p className="text-sm text-stone-500 font-medium">
            Balkolux — 06 Ocak 2026
          </p>
        </header>

        {/* Giriş Açıklaması */}
        <section className="max-w-3xl mx-auto">
          <p className="text-base text-stone-700 leading-relaxed text-center">
            Balkolux olarak, bahçe ve balkon mobilyası alışverişlerinizi güvenli
            ve kolay hale getirmek için çeşitli ödeme yöntemleri sunmaktayız.
            Tüm ödeme işlemleriniz, uluslararası güvenlik standartlarına uygun
            olarak gerçekleştirilmektedir.
          </p>
        </section>

        {/* Ödeme Yöntemleri */}
        <div className="space-y-12">
          {/* 1. Kredi Kartı */}
          <section className="border border-stone-200 p-8 md:p-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-stone-900 text-white rounded-sm">
                <CreditCard size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  1. Kredi Kartı ile Ödeme
                </h2>
                <p className="text-xs text-stone-500 uppercase tracking-wide mt-1">
                  En Hızlı ve Güvenli Yöntem
                </p>
              </div>
            </div>
            <div className="space-y-4 text-sm text-stone-700 leading-relaxed">
              <p>
                Visa, MasterCard ve American Express kredi kartlarınız ile
                güvenli ödeme yapabilirsiniz. Tüm kredi kartı işlemleriniz, PCI
                DSS (Payment Card Industry Data Security Standard) güvenlik
                standartlarına uygun olarak 256-bit SSL şifreleme teknolojisi
                ile korunmaktadır.
              </p>
              <div className="bg-stone-50 border border-stone-200 p-6 space-y-3">
                <p className="text-[11px] font-bold text-stone-900 uppercase tracking-wide">
                  Kredi Kartı ile Ödemenin Avantajları:
                </p>
                <ul className="space-y-2">
                  {[
                    "Anında onay ve hızlı sipariş işleme",
                    "Taksit seçenekleri (bankanıza göre değişir)",
                    "3D Secure güvenlik sistemi ile koruma",
                    "Ödeme bilgileriniz saklanmaz",
                    "Otomatik fatura oluşturma",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="text-[12px] text-stone-700 flex gap-3 items-start"
                    >
                      <CheckCircle2
                        size={14}
                        className="text-green-600 mt-0.5 flex-shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 2. Banka Kartı */}
          <section className="border border-stone-200 p-8 md:p-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-stone-900 text-white rounded-sm">
                <CreditCard size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  2. Banka Kartı (Debit Card)
                </h2>
                <p className="text-xs text-stone-500 uppercase tracking-wide mt-1">
                  Doğrudan Hesabınızdan Ödeme
                </p>
              </div>
            </div>
            <div className="space-y-4 text-sm text-stone-700 leading-relaxed">
              <p>
                Visa Debit, MasterCard Debit ve diğer banka kartlarınız ile
                doğrudan banka hesabınızdan ödeme yapabilirsiniz. Banka kartı
                ile yapılan ödemeler, kredi kartı ile aynı güvenlik
                standartlarında işlenmektedir.
              </p>
              <p>
                Banka kartı ödemelerinde, kartınızın online işlemlere açık
                olması ve yeterli bakiyenin bulunması gerekmektedir. Ödeme onayı
                anında gerçekleşir ve siparişiniz hemen işleme alınır.
              </p>
            </div>
          </section>

          {/* 3. Havale/EFT */}
          <section className="border border-stone-200 p-8 md:p-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-stone-900 text-white rounded-sm">
                <Banknote size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  3. Havale / EFT ile Ödeme
                </h2>
                <p className="text-xs text-stone-500 uppercase tracking-wide mt-1">
                  Banka Transferi ile Güvenli Ödeme
                </p>
              </div>
            </div>
            <div className="space-y-4 text-sm text-stone-700 leading-relaxed">
              <p>
                Siparişinizi tamamladıktan sonra, banka hesap bilgilerimiz
                e-posta adresinize otomatik olarak gönderilecektir. Havale veya
                EFT işleminizi gerçekleştirdikten sonra dekont/makbuzunuzu
                balkoluxofficial@gmail.com adresine iletebilirsiniz.
              </p>
              <div className="bg-amber-50 border border-amber-200 p-6 space-y-3">
                <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wide">
                  Önemli Bilgiler:
                </p>
                <ul className="space-y-2">
                  {[
                    "Havale/EFT açıklamasına sipariş numaranızı mutlaka yazınız",
                    "Ödeme onayı banka işlem saatlerine bağlı olarak 1-2 iş günü sürebilir",
                    "Ödeme onaylandıktan sonra siparişiniz işleme alınır",
                    "Farklı bir isimden ödeme yapılacaksa lütfen önceden bildiriniz",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="text-[12px] text-stone-700 flex gap-3 items-start"
                    >
                      <ArrowRightCircle
                        size={14}
                        className="text-amber-600 mt-0.5 flex-shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Kapıda Ödeme */}
          <section className="border border-stone-200 p-8 md:p-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-stone-900 text-white rounded-sm">
                <Banknote size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  4. Kapıda Ödeme
                </h2>
                <p className="text-xs text-stone-500 uppercase tracking-wide mt-1">
                  Ürünü Teslim Alırken Ödeyin
                </p>
              </div>
            </div>
            <div className="space-y-4 text-sm text-stone-700 leading-relaxed">
              <p>
                Seçili ürün ve bölgeler için kapıda nakit veya kredi kartı ile
                ödeme seçeneği mevcuttur. Kapıda ödeme seçeneğinin geçerli
                olduğu ürünler, ödeme adımında belirtilmektedir.
              </p>
              <p className="text-xs text-stone-600 italic bg-stone-50 border-l-4 border-stone-300 p-4">
                Not: Büyük ve özel üretim ürünlerde kapıda ödeme seçeneği
                bulunmamaktadır. Sipariş tutarının belirli bir kısmının peşin
                ödenmesi gerekebilir.
              </p>
            </div>
          </section>

          {/* 5. Taksitli Ödeme */}
          <section className="border border-stone-200 p-8 md:p-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-stone-900 text-white rounded-sm">
                <CreditCard size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  5. Taksitli Ödeme Seçeneği
                </h2>
                <p className="text-xs text-stone-500 uppercase tracking-wide mt-1">
                  Kredi Kartı ile Taksit İmkanı
                </p>
              </div>
            </div>
            <div className="space-y-4 text-sm text-stone-700 leading-relaxed">
              <p>
                Kredi kartı ile yapılan ödemelerde, bankanızın ve kartınızın
                özelliklerine göre taksit seçeneği sunulmaktadır. Taksit sayısı
                ve faiz oranları, kullandığınız banka ve kredi kartı türüne göre
                değişiklik gösterebilir.
              </p>
              <div className="bg-stone-50 border border-stone-200 p-6">
                <p className="text-[12px] text-stone-700 mb-3">
                  Ödeme adımında, kullanabileceğiniz taksit seçeneklerini
                  görebilir ve size en uygun olanı seçebilirsiniz. Bazı bankalar
                  için ekstra taksit kampanyaları da uygulanmaktadır.
                </p>
                <p className="text-[11px] text-stone-600 italic">
                  * Taksit faiz oranları bankanız tarafından belirlenmektedir.
                  Detaylı bilgi için bankanızla iletişime geçebilirsiniz.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Güvenlik Bilgilendirmesi */}
        <section className="bg-green-50 border-2 border-green-200 p-8 md:p-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-green-600 text-white rounded-sm">
              <Lock size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">
                Güvenli Alışveriş Garantisi
              </h2>
              <p className="text-xs text-green-700 uppercase tracking-wide mt-1">
                Ödeme Bilgileriniz Tamamen Güvende
              </p>
            </div>
          </div>
          <div className="space-y-4 text-sm text-stone-700 leading-relaxed">
            <p>
              Balkolux olarak, müşterilerimizin ödeme güvenliğini en üst düzeyde
              tutmak için gerekli tüm teknik ve idari tedbirleri almaktayız:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {[
                {
                  title: "256-bit SSL Şifreleme",
                  desc: "Tüm ödeme işlemleri şifreli olarak iletilir",
                },
                {
                  title: "PCI DSS Uyumluluğu",
                  desc: "Uluslararası ödeme güvenlik standardı",
                },
                {
                  title: "3D Secure Doğrulama",
                  desc: "Ek güvenlik katmanı ile koruma",
                },
                {
                  title: "Veri Koruma",
                  desc: "Kredi kartı bilgileriniz saklanmaz",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-green-200 p-4 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-green-600" />
                    <p className="text-[11px] font-bold text-stone-900 uppercase tracking-wide">
                      {item.title}
                    </p>
                  </div>
                  <p className="text-[12px] text-stone-600">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-stone-600 italic pt-4 border-t border-green-200">
              Ödeme bilgileriniz yalnızca işlem sırasında kullanılır ve hiçbir
              şekilde üçüncü şahıslarla paylaşılmaz. Balkolux, PCI DSS Level 1
              sertifikalı ödeme altyapısı kullanmaktadır.
            </p>
          </div>
        </section>

        {/* İletişim Kartı */}
        <section className="bg-stone-900 text-white p-8 md:p-10 space-y-6">
          <h2 className="text-2xl font-serif font-bold">
            Ödeme ile İlgili Sorularınız mı Var?
          </h2>
          <p className="text-sm text-stone-300 leading-relaxed">
            Ödeme süreçleri, taksit seçenekleri veya herhangi bir sorunuz için
            müşteri hizmetlerimiz ile iletişime geçebilirsiniz. Size yardımcı
            olmaktan mutluluk duyarız.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-stone-700">
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-stone-400 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-stone-400 uppercase tracking-wide mb-1">
                  E-posta
                </p>
                <p className="text-sm">balkoluxofficial@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-stone-400 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-stone-400 uppercase tracking-wide mb-1">
                  Telefon
                </p>
                <p className="text-sm">+90 546 225 56 59</p>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-stone-700">
            <p className="text-xs text-stone-400">
              Çalışma Saatleri: Pazartesi - Cumartesi, 09:00 - 18:00
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-12 border-t border-stone-200">
          <p className="text-[10px] text-stone-400 tracking-wide uppercase">
            © 2026 Balkolux Bahçe ve Balkon Mobilyaları — Tüm Hakları Saklıdır
          </p>
        </footer>
      </div>
    </div>
  );
}
