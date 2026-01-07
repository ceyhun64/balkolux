"use client";

import React, { useEffect, useState, memo } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowUpRight, Calendar, Leaf } from "lucide-react";
import { motion } from "framer-motion";

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  createdAt: string;
}

// ----------------------------------------------------
// İSKELET YÜKLENİYOR (Skeleton)
// ----------------------------------------------------
const BlogCardSkeleton = memo(() => (
  <div className="space-y-6">
    <div className="aspect-[4/5] w-full bg-stone-100 animate-pulse rounded-2xl" />
    <div className="space-y-3">
      <div className="h-3 w-24 bg-stone-100 animate-pulse" />
      <div className="h-6 w-full bg-stone-100 animate-pulse" />
      <div className="h-4 w-2/3 bg-stone-50 animate-pulse" />
    </div>
  </div>
));
BlogCardSkeleton.displayName = "BlogCardSkeleton";

// ----------------------------------------------------
// ANA BİLEŞEN
// ----------------------------------------------------
export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();

      // Bahçe & Balkon Mobilyası Odaklı Mock Veriler
      const mockData =
        data.blogs?.length > 0
          ? data.blogs
          : [
              {
                id: 1,
                title: "Küçük Balkonlar İçin Büyük Fikirler",
                category: "Dekorasyon Rehberi",
                excerpt:
                  "Dar alanlarda maksimum konfor sağlamanın yolları: Katlanabilir mobilyalar ve dikey bahçecilik ipuçları.",
                image:
                  "https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=800",
                createdAt: new Date().toISOString(),
              },
              {
                id: 2,
                title: "Iroko ve Teak: Bahçenizin Ömürlük Dostları",
                category: "Malzeme Bilgisi",
                excerpt:
                  "Dış mekan mobilyalarında neden sert ağaç tercih etmelisiniz? Ahşap bakımı ve dayanıklılık sırları.",
                image:
                  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800",
                createdAt: new Date().toISOString(),
              },
              {
                id: 3,
                title: "Açık Havada Konforun Yeni Adı: Modern Köşe Takımları",
                category: "Trendler",
                excerpt:
                  "2026 dış mekan trendlerinde 'L' oturma grupları ve su itici kumaşların yükselişi devam ediyor.",
                image:
                  "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=800",
                createdAt: new Date().toISOString(),
              },
            ];

      setBlogs(mockData);
    } catch (err: any) {
      toast.error("İlham dolu yazılar yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-stone-800">
      <main className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        {/* ÜST BAŞLIK: Organik ve Sofistike */}
        <header className="max-w-4xl mb-20 space-y-6">
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-8 bg-emerald-600" />
            <span className="text-xs tracking-[0.3em] uppercase text-emerald-700 font-semibold">
              BalkoLüx Dergi
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-stone-900 leading-tight">
            Doğa ile <span className="italic text-emerald-800">Uyumlu</span>{" "}
            <br />
            Yaşam Notları
          </h1>
          <p className="text-lg text-stone-500 font-light max-w-xl">
            Bahçenizden balkonunuza, açık havada geçirdiğiniz her anı daha
            değerli kılacak dekorasyon önerileri ve bakım rehberleri.
          </p>
        </header>

        {/* BLOG GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16">
            {[1, 2, 3].map((i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${blog.id}`} className="block space-y-5">
                  {/* Görsel Alanı: Yumuşatılmış Köşeler */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-sm">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-800 shadow-sm">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Metin Detayları */}
                  <div className="px-1 space-y-3">
                    <div className="flex items-center gap-4 text-[11px] text-stone-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(blog.createdAt).toLocaleDateString("tr-TR", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-600/70">
                        <Leaf className="w-3 h-3" /> 4 dk okuma
                      </span>
                    </div>

                    <h2 className="text-2xl font-serif text-stone-900 group-hover:text-emerald-800 transition-colors duration-300 leading-snug">
                      {blog.title}
                    </h2>

                    <p className="text-sm text-stone-500 leading-relaxed line-clamp-2 font-light">
                      {blog.excerpt}
                    </p>

                    <div className="pt-2 flex items-center gap-2 text-xs font-bold text-stone-900 underline underline-offset-4 decoration-stone-200 group-hover:decoration-emerald-500 transition-all duration-300">
                      Devamını Oku <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {/* CALL TO ACTION (CTA): Bülten Kaydı */}
        <section className="mt-32 p-12 rounded-[2rem] bg-stone-900 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-3xl font-serif mb-4">
              Bahçeniz İçin İlhamı Kaçırmayın
            </h3>
            <p className="text-stone-400 font-light mb-8">
              Yeni koleksiyonlar, sezon indirimleri ve bakım rehberlerinden ilk
              siz haberdar olun.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="bg-stone-800 border-none rounded-xl px-6 py-4 flex-1 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-colors">
                Abone Ol
              </button>
            </div>
          </div>
          <Leaf className="absolute -right-12 -bottom-12 w-64 h-64 text-emerald-900/20 rotate-12" />
        </section>
      </main>
    </div>
  );
}
