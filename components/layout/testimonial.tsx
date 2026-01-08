"use client";
import React from "react";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role?: string;
  message: string;
  avatarLetter: string;
  rating: number;
}

const outdoorTestimonials: Testimonial[] = [
  {
    name: "Selin Y.",
    role: "Lüks Oturma Grubu",
    message:
      "Teak ağacı oturma grubunuz verandamıza bambaşka bir hava kattı. Kumaşların su iticiliği ve kalitesi beklediğimizin çok üzerinde.",
    avatarLetter: "S",
    rating: 5,
  },
  {
    name: "Ahmet K.",
    role: "Premium Barbekü Serisi",
    message:
      "Barbekü performansı inanılmaz. Isı dengesi ve döküm kalitesi profesyonel düzeyde. Bahçe partilerimizin vazgeçilmezi oldu.",
    avatarLetter: "A",
    rating: 5,
  },
  {
    name: "Caner M.",
    role: "Alüminyum Şezlong Seti",
    message:
      "Havuz başı için aldığımız şezlonglar hem çok hafif hem de inanılmaz estetik. Güneş altındaki dayanıklılığı gerçekten başarılı.",
    avatarLetter: "C",
    rating: 5,
  },
  {
    name: "Melis E.",
    role: "Rattan Salıncak",
    message:
      "Bahçemdeki en sevdiğim köşe oldu. Örgü kalitesi ve minderlerin konforu o kadar iyi ki, üzerinden kalkmak istemiyoruz.",
    avatarLetter: "M",
    rating: 5,
  },
  {
    name: "Bülent T.",
    role: "Dev Bahçe Şemsiyesi",
    message:
      "360 derece dönebilen mekanizması çok pratik. En rüzgarlı günlerde bile sağlamlığından ödün vermedi, çok güven verici.",
    avatarLetter: "B",
    rating: 5,
  },
  {
    name: "Deniz A.",
    role: "Modern Masa Takımı",
    message:
      "Mermer tablalı masa takımı tam bir tasarım harikası. 10 kişilik akşam yemeklerimizde tüm misafirlerimiz hayran kaldı.",
    avatarLetter: "D",
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  return (
    <div className="py-20 md:py-32 bg-zinc-50 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-200 -skew-x-12 translate-x-1/2 pointer-events-none" />

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-16 md:mb-24 relative z-10">
        <h2 className="text-[10px] font-bold tracking-[0.5em] text-stone-500 uppercase mb-4">
          Outdoor Experience
        </h2>
        <h3 className="text-3xl md:text-6xl font-serif text-stone-900 leading-tight">
          Açık Havada <br />
          <span className="italic">Konfor Hikayeleri</span>
        </h3>
        <div className="w-16 h-[1px] bg-stone-300 mx-auto mt-6 md:mt-10" />
      </div>

      {/* Marquee Container */}
      <div className="relative flex overflow-hidden group py-10">
        <div className="flex animate-marquee gap-6 md:gap-10 whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              {outdoorTestimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="w-[300px] md:w-[400px] flex-shrink-0 bg-white p-8 md:p-12 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-stone-100 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:-translate-y-2"
                >
                  <div className="relative">
                    <Quote className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-8 h-8 md:w-12 md:h-12 text-stone-50 opacity-20" />

                    {/* Rating */}
                    <div className="flex gap-1 mb-6 md:mb-8">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          className={
                            i < t.rating
                              ? "fill-stone-800 text-stone-800"
                              : "text-stone-200"
                          }
                        />
                      ))}
                    </div>

                    <p className="text-stone-600 text-[14px] md:text-[16px] leading-[1.8] font-light italic whitespace-normal font-sans">
                      "{t.message}"
                    </p>
                  </div>

                  <div className="mt-8 md:mt-12 flex items-center gap-4 md:gap-5">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center text-[12px] md:text-[14px] font-light tracking-tighter shadow-xl">
                      {t.avatarLetter}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] md:text-[13px] font-bold text-stone-900 tracking-widest uppercase">
                        {t.name}
                      </span>
                      <span className="text-[9px] md:text-[10px] text-stone-500 font-medium tracking-[0.2em] uppercase mt-1">
                        {t.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Trust Badges / Stats */}
      {/* MOBİL AYARI: flex-wrap ve gap-6 eklendi */}
      <div className="mt-12 md:mt-20 flex flex-wrap justify-center items-center gap-6 md:gap-12 px-6 opacity-60 grayscale pointer-events-none">
        <span className="text-[8px] md:text-[10px] font-bold tracking-[0.3em] text-stone-900 uppercase text-center">
          UV Dayanım Sertifikası
        </span>
        <span className="text-[8px] md:text-[10px] font-bold tracking-[0.3em] text-stone-900 uppercase text-center">
          Hava Koşullarına Dayanıklı Kumaş
        </span>
        <span className="text-[8px] md:text-[10px] font-bold tracking-[0.3em] text-stone-900 uppercase text-center">
          Premium Tik Ağacı
        </span>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          /* Masaüstü: 80 saniye (çok yavaş ve akıcı) */
          animation: marquee 80s linear infinite;
        }

        @media (max-width: 768px) {
          .animate-marquee {
            /* Mobil: 120 saniye */
            /* Mobilde mesafe kısa olduğu için saniyeyi daha da artırıyoruz */
            animation: marquee 120s linear infinite;
          }
        }

        /* Kullanıcı üzerine geldiğinde durması için */
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
