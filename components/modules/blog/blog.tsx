"use client";

import React, { useEffect, useState, memo } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowUpRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  createdAt: string;
}

// ----------------------------------------------------
// MİNİMAL İSKELET (Skeleton)
// ----------------------------------------------------
const BlogCardSkeleton = memo(() => (
  <div className="space-y-6">
    <div className="aspect-[16/10] w-full bg-stone-100 animate-pulse" />
    <div className="space-y-3">
      <div className="h-3 w-20 bg-stone-100 animate-pulse" />
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
      // API çağrısı simülasyonu veya gerçek fetch
      const res = await fetch("/api/blog");
      const data = await res.json();

      const mockData =
        data.blogs?.length > 0
          ? data.blogs
          : [
              {
                id: 1,
                title: "Işığın Mekanla Dansı: Plise Perde Sistemleri",
                excerpt:
                  "Minimalist mimarinin vazgeçilmezi olan plise perdelerin fonksiyonel estetiğini keşfedin.",
                image:
                  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800",
                createdAt: new Date().toISOString(),
              },
              {
                id: 2,
                title: "2026 Renk Paleti: Toprak Tonları ve Doğallık",
                excerpt:
                  "Yeni sezonda pencerelerde keten dokular ve ham renklerin hakimiyetine tanıklık ediyoruz.",
                image:
                  "https://images.unsplash.com/photo-1615873968403-89e068629275?q=80&w=800",
                createdAt: new Date().toISOString(),
              },
              {
                id: 3,
                title: "Sürdürülebilir Tasarımın Geleceği",
                excerpt:
                  "Geri dönüştürülebilir tekstil ürünleri ile hem doğayı hem de evinizi korumanın yolları.",
                image:
                  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800",
                createdAt: new Date().toISOString(),
              },
            ];

      setBlogs(mockData);
    } catch (err: any) {
      toast.error("İçerikler yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#FCFBFA] text-stone-800 font-light">
      <main className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        {/* HEADER: Sade ve Tipografi Odaklı */}
        <header className="max-w-3xl mb-24 space-y-4">
          <span className="text-[10px] tracking-[0.4em] uppercase text-stone-400 font-medium">
            Notlar & İlham
          </span>
          <h1 className="text-4xl md:text-6xl font-extralight tracking-tighter text-stone-900 italic leading-[1.1]">
            Yaşam Alanınıza Dair <br /> Seçkin Yazılar
          </h1>
          <div className="h-[1px] w-24 bg-stone-200 mt-8" />
        </header>

        {/* BLOG GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
            {[1, 2, 3].map((i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href={`/blog/${blog.id}`} className="space-y-6 block">
                  {/* Görsel: Saf ve Keskin */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  </div>

                  {/* Metin İçeriği */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[10px] text-stone-400 uppercase tracking-widest">
                      <Calendar className="w-3 h-3" />
                      {new Date(blog.createdAt).toLocaleDateString("tr-TR", {
                        month: "long",
                        year: "numeric",
                      })}
                    </div>

                    <h2 className="text-xl md:text-2xl font-light leading-tight text-stone-900 group-hover:text-stone-500 transition-colors">
                      {blog.title}
                    </h2>

                    <p className="text-sm text-stone-500 leading-relaxed line-clamp-2 font-light">
                      {blog.excerpt}
                    </p>

                    <div className="pt-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-stone-900 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Okumaya Başla <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {/* ALT BİLGİ / NEWSLETTER (Opsiyonel Minimal Dokunuş) */}
        
      </main>
    </div>
  );
}
