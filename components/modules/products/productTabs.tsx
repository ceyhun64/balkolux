"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Comment {
  id: number;
  rating: number;
  title?: string;
  comment?: string;
  createdAt: string;
  user?: { id: number; name: string; surname: string };
}

interface ProductTabsProps {
  productId: number;
  productTitle: string;
  productPrice: number;
  productDescription?: string;
}

export default function ProductTabs({
  productId,
  productPrice,
  productDescription,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<
    "info" | "comments" | "installments" | "suggestions"
  >("info");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Banka Listesi - SVG Logoları ile
  const installmentRates = [
    { name: "Maximum", logo: "/cards/maximum.svg" },
    { name: "Axess", logo: "/cards/axess.svg" },
    { name: "Paraf", logo: "/cards/paraf.svg" },
    { name: "Bonus", logo: "/cards/bonus.svg" },
    { name: "World", logo: "/cards/world.svg" },
    { name: "Bankkart Combo", logo: "/cards/bankkartcombo.svg" },
  ];

  // Taksit Oranları
  const rates = [
    { label: "Tek Çekim", count: 1, rate: 0 },
    { label: "2 Taksit", count: 2, rate: 3.5 },
    { label: "3 Taksit", count: 3, rate: 5.2 },
    { label: "6 Taksit", count: 6, rate: 9.8 },
    { label: "9 Taksit", count: 9, rate: 13.5 },
    { label: "12 Taksit", count: 12, rate: 17.0 },
  ];

  
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/account/check");
        const data = await res.json();
        if (data.user) setCurrentUser(data.user);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (productId) fetchComments();
  }, [productId]);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/review/${productId}`);
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateInstallment = (price: number, rate: number, count: number) => {
    const total = price + (price * rate) / 100;
    const monthly = total / count;
    return {
      monthly: monthly.toLocaleString("tr-TR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      total: total.toLocaleString("tr-TR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    };
  };

  const tabs = [
    { id: "info", label: "Detaylar" },
    { id: "comments", label: "Yorumlar", count: comments.length },
    { id: "installments", label: "Taksit Seçenekleri" },
    { id: "suggestions", label: "Öneri" },
  ];

  return (
    <section className="mt-32 max-w-5xl mx-auto px-6 font-light">
      {/* Tab Navigasyonu */}
      <nav className="flex items-center justify-center border-b border-stone-100 mb-12 md:mb-20 overflow-x-hidden">
        <div className="flex gap-4 md:gap-12 w-full justify-between md:justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "pb-4 md:pb-6 text-[9px] md:text-[11px] uppercase tracking-[0.15em] md:tracking-[0.3em] transition-all relative whitespace-nowrap flex-1 md:flex-none text-center",
                activeTab === tab.id
                  ? "text-stone-900 opacity-100 font-bold"
                  : "text-stone-600 opacity-60 hover:opacity-100"
              )}
            >
              <span className="block md:inline">
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="ml-1 opacity-50 font-light text-[8px] md:text-[10px]">
                    ({tab.count})
                  </span>
                )}
              </span>

              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-stone-900 animate-in fade-in duration-500" />
              )}
            </button>
          ))}
        </div>
      </nav>

      <div className="min-h-[300px]">
        {/* 1. Detaylar */}
        {activeTab === "info" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            {productDescription ? (
              <div
                className="prose prose-stone max-w-none text-stone-600 font-light leading-relaxed text-sm md:text-base columns-1 md:columns-2 gap-16"
                dangerouslySetInnerHTML={{ __html: productDescription }}
              />
            ) : (
              <p className="text-center italic text-stone-300 py-12">
                Detaylı bilgi yakında eklenecek.
              </p>
            )}
          </div>
        )}

        {/* 2. Yorumlar */}
        {activeTab === "comments" && (
          <div className="animate-in fade-in duration-700 space-y-16">
            <div className="flex justify-between items-end border-b border-stone-100 pb-8">
              <h3 className="text-2xl italic font-extralight text-stone-900 leading-none">
                Deneyimler
              </h3>
              {currentUser && (
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="text-[10px] uppercase tracking-widest font-bold border-b border-stone-900 pb-1 hover:opacity-60 transition-opacity"
                >
                  Yorumunu Paylaş
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {comments.map((comment) => (
                <div key={comment.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          className={cn(
                            i < comment.rating
                              ? "fill-stone-900"
                              : "text-stone-200"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-stone-300 font-mono italic">
                      {new Date(comment.createdAt).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-stone-800 uppercase tracking-tighter">
                      {comment.user?.name} {comment.user?.surname}
                    </p>
                    <p className="text-sm text-stone-500 leading-relaxed font-light">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Taksitler (SVG Logolu Tablo - 2'li Izgara Yapısı) */}
        {activeTab === "installments" && (
          <div className="animate-in fade-in duration-700 space-y-12">
            {/* Grid yapısı: Mobilde 1, Tablet ve üzerinde 2 sütun */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-48 gap-y-16">
              {installmentRates.map((bank) => (
                <div key={bank.name} className="space-y-4">
                  {/* Banka Logo Başlığı */}
                  <div className="flex items-center h-10 border-b border-stone-100 pb-2">
                    <div className="relative w-24 h-full">
                      <Image
                        src={bank.logo}
                        alt={bank.name}
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                  </div>

                  <div className="overflow-hidden">
                    <table className="w-full text-left text-[11px]">
                      <thead>
                        <tr className="text-stone-400 uppercase tracking-tighter border-b border-stone-50">
                          <th className="py-3 font-medium">Taksit</th>
                          <th className="py-3 font-medium text-right">
                            Taksit Tutarı
                          </th>
                          <th className="py-3 font-medium text-right">
                            Toplam
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-50">
                        {rates.map((r) => {
                          const { monthly, total } = calculateInstallment(
                            productPrice,
                            r.rate,
                            r.count
                          );
                          return (
                            <tr
                              key={r.count}
                              className="hover:bg-stone-50/50 transition-colors group"
                            >
                              <td className="py-3 text-stone-600 group-hover:text-stone-900">
                                {r.label}
                              </td>
                              <td className="py-3 font-medium text-stone-900 text-right">
                                {r.count > 1 ? `${r.count} x ` : ""}
                                {monthly} TL
                              </td>
                              <td className="py-3 text-stone-600 text-right">
                                {total} TL
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            {/* Alt Bilgi Notu */}
            <div className="bg-stone-50 p-6 text-center mt-12">
              <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em]">
                Ödemeleriniz iyzico güvencesiyle 256-bit SSL sertifikası ile
                korunmaktadır.
              </p>
            </div>
          </div>
        )}

        {/* 4. Öneriler */}
        {activeTab === "suggestions" && (
          <div className="animate-in fade-in duration-700 max-w-lg mx-auto text-center space-y-10 py-10">
            <div className="space-y-4">
              <h3 className="text-3xl font-extralight italic text-stone-900">
                Bir fikrin mi var?
              </h3>
              <p className="text-stone-400 text-sm font-light">
                Tasarım sürecimizi senin önerilerinle geliştirmek isteriz.
              </p>
            </div>
            <div className="relative border-b border-stone-200 focus-within:border-stone-800 transition-all duration-500 text-left">
              <textarea
                className="w-full bg-transparent outline-none py-4 text-sm font-light resize-none min-h-[100px]"
                placeholder="Önerini buraya bırakabilirsin..."
              />
            </div>
            <button className="flex items-center gap-4 mx-auto text-[10px] uppercase tracking-[0.4em] font-bold group">
              İlet{" "}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-2 transition-transform"
              />
            </button>
          </div>
        )}
      </div>

      {/* Yorum Modalı */}
      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent className="max-w-md bg-[#FCFBFA] border-none shadow-2xl rounded-none font-light">
          <DialogHeader className="text-left space-y-4">
            <DialogTitle className="text-2xl italic font-extralight tracking-tight">
              Ürünü Değerlendir
            </DialogTitle>
            <DialogDescription className="text-xs uppercase tracking-widest text-stone-400">
              Puanın ve görüşlerin bizim için kıymetli.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-12 mt-8">
            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setRating(n)}
                  className="transition-all hover:scale-110"
                >
                  <Star
                    size={24}
                    className={cn(
                      n <= rating ? "fill-stone-900" : "text-stone-200"
                    )}
                  />
                </button>
              ))}
            </div>
            <div className="space-y-10">
              <div className="border-b border-stone-200 focus-within:border-stone-800 transition-all duration-500">
                <input
                  placeholder="Başlık (Opsiyonel)"
                  className="w-full bg-transparent py-3 outline-none text-sm font-light"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="border-b border-stone-200 focus-within:border-stone-800 transition-all duration-500">
                <textarea
                  placeholder="Yorumunuz..."
                  className="w-full bg-transparent py-3 outline-none text-sm font-light min-h-[80px] resize-none"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={() => {
                toast.success("Değerlendirmeniz alındı, teşekkürler.");
                setIsReviewModalOpen(false);
              }}
              className="w-full bg-stone-900 text-white py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-stone-800 transition-colors"
            >
              Yorumu Yayınla
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
