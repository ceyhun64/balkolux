"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  createdAt: string;
}

export default function BlogDetailPage() {
  const searchParams = useSearchParams();
  const blogParam = searchParams?.get("blog") ?? null;

  let blog: Blog | null = null;
  if (blogParam) {
    try {
      blog = JSON.parse(blogParam);
    } catch (err) {
      console.error("Parse hatası:", err);
    }
  }

  if (!blog)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FCFBFA] px-6 text-center">
        <h2 className="text-2xl font-light text-stone-800 mb-6 italic">
          İçerik bulunamadı.
        </h2>
        <Link
          href="/blog"
          className="text-xs tracking-widest uppercase border-b border-stone-300 pb-1 hover:border-stone-800 transition-colors"
        >
          Listeye Geri Dön
        </Link>
      </div>
    );

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#FCFBFA] text-stone-800 selection:bg-stone-100">
      {/* --- TOP NAVIGATION --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 flex justify-between items-center mix-blend-difference text-white">
        <Link
          href="/blog"
          className="group flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Geri Dön
        </Link>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative h-[80dvh] w-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl z-10 space-y-8"
        >
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.5em] uppercase text-stone-400 font-medium italic">
              {formattedDate} — Tasarım Notları
            </span>
            <h1 className="text-4xl md:text-7xl font-extralight tracking-tighter leading-[1.1] text-stone-900 italic">
              {blog.title}
            </h1>
          </div>
        </motion.div>

        {/* Zarif Bir Scroll Göstergesi */}
        <div className="absolute bottom-12 w-[1px] h-16 bg-stone-200" />
      </header>

      {/* --- FEATURE IMAGE --- */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative aspect-[21/9] overflow-hidden bg-stone-100"
        >
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            priority
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </motion.div>
      </section>

      {/* --- ARTICLE CONTENT --- */}
      <article className="max-w-2xl mx-auto px-6 pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="prose prose-stone prose-lg"
        >
          {blog.content.split("\n").map((line, i) =>
            line.trim() === "" ? (
              <div key={i} className="h-8" />
            ) : (
              <p
                key={i}
                className="text-stone-600 font-light leading-relaxed mb-8 first-letter:text-5xl first-letter:font-extralight first-letter:mr-3 first-letter:float-left first-letter:text-stone-900 first-letter:italic"
              >
                {line}
              </p>
            )
          )}
        </motion.div>

        {/* FOOTER: Paylaş veya Sıradaki */}
        <div className="mt-24 pt-12 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-widest text-stone-400">
              Yazar
            </span>
            <span className="text-sm font-medium tracking-tight">
              BalkoLüx Tasarım Ekibi
            </span>
          </div>
          <Link
            href="/blog"
            className="group flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-stone-900"
          >
            Sıradaki Yazı{" "}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </article>
    </div>
  );
}
