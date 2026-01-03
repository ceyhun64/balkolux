"use client";

import React, { useState, useEffect } from "react";
import {
  Info,
  MessageCircle,
  Star,
  CreditCard,
  Lightbulb,
  Check,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Comment {
  id: number;
  rating: number;
  title?: string;
  comment?: string;
  createdAt: string;
  user?: {
    id: number;
    name: string;
    surname: string;
  };
}

interface ProductTabsProps {
  productId: number;
  productTitle: string;
  productPrice: number;
  productDescription?: string;
}

export default function ProductTabs({
  productId,
  productTitle,
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [suggestionText, setSuggestionText] = useState("");
  const [suggestionEmail, setSuggestionEmail] = useState("");
  const [isSuggestionSubmitting, setIsSuggestionSubmitting] = useState(false);

  const [currentUser, setCurrentUser] = useState<{
    id: number;
    name: string;
    surname: string;
  } | null>(null);

  const [hasUserCommented, setHasUserCommented] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/account/check", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.user?.id) {
          setCurrentUser({
            id: data.user.id,
            name: data.user.name,
            surname: data.user.surname,
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (productId) fetchComments();
  }, [productId, currentUser]);

  const fetchComments = async () => {
    if (!productId) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/review/${productId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Yorumlar alınamadı");
      setComments(data);

      if (currentUser) {
        const userAlreadyCommented = data.some(
          (comment: Comment) => comment.user?.id === currentUser.id
        );
        setHasUserCommented(userAlreadyCommented);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!productId || !currentUser) {
      toast.error("Giriş yapmalısınız.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          rating,
          title,
          comment: commentText,
        }),
      });
      if (!res.ok) throw new Error("Gönderilemedi");

      setComments([
        {
          id: Date.now(),
          rating,
          title,
          comment: commentText,
          createdAt: new Date().toISOString(),
          user: currentUser,
        },
        ...comments,
      ]);

      setHasUserCommented(true);
      setIsReviewModalOpen(false);
      toast.success("Yorumunuz yayınlandı.");
      setRating(0);
      setTitle("");
      setCommentText("");
    } catch (error) {
      toast.error("Hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: "info", label: "Ürün Bilgisi" },
    { id: "comments", label: "Yorumlar", badge: comments.length },
    { id: "installments", label: "Taksitler" },
    { id: "suggestions", label: "Öneriniz" },
  ];

  const installmentBanks = [
    "Akbank",
    "Garanti BBVA",
    "İş Bankası",
    "Yapı Kredi",
  ];

  return (
    <section className="mt-24 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Modern Segmented Control Navigation */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center bg-gray-100/80 p-1  border border-gray-200/50 backdrop-blur-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative px-6 py-2.5 text-sm font-medium transition-all duration-300 ease-out ${
                activeTab === tab.id
                  ? "bg-white text-black shadow-sm ring-1 ring-black/5"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <span className="flex items-center gap-2">
                {tab.label}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 price ${
                      activeTab === tab.id
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div >
        {/* Info Tab */}
        {activeTab === "info" && (
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
            <div className="max-w-4xl mx-auto">
              {productDescription ? (
                <div
                  className="prose prose-neutral max-w-none text-gray-600 leading-relaxed lg:columns-1 gap-12"
                  dangerouslySetInnerHTML={{ __html: productDescription }}
                />
              ) : (
                <div className="text-center py-20 text-gray-400 font-light">
                  Açıklama henüz eklenmedi.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === "comments" && (
          <div className="animate-in fade-in duration-500 space-y-12">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pb-8 border-b border-gray-100">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
                  Müşteri Değerlendirmeleri
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Bu ürün için toplam {comments.length} yorum yapıldı.
                </p>
              </div>
              {!hasUserCommented && currentUser && (
                <Button
                  onClick={() => setIsReviewModalOpen(true)}
                  className=" bg-black hover:bg-zinc-800 text-white px-8 py-5 h-auto transition-transform active:scale-95"
                >
                  Yorum Yaz
                </Button>
              )}
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="w-6 h-6 border-2 border-black border-t-transparent price animate-spin"></div>
              </div>
            ) : comments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="group p-6 price bg-gray-50/50 hover:bg-white border border-transparent hover:border-gray-100 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 price bg-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-600">
                          {comment.user?.name[0]}
                          {comment.user?.surname?.[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {comment.user?.name} {comment.user?.surname}
                          </p>
                          <div className="flex gap-0.5 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={
                                  i < comment.rating
                                    ? "fill-black text-black"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] text-gray-400 tabular-nums">
                        {new Date(comment.createdAt).toLocaleDateString(
                          "tr-TR"
                        )}
                      </span>
                    </div>
                    {comment.title && (
                      <h4 className="font-medium text-gray-900 mb-2">
                        {comment.title}
                      </h4>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {comment.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-gray-50 price border border-dashed border-gray-200">
                <p className="text-gray-400 font-medium">
                  Henüz bir değerlendirme yok.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Installments Tab */}
        {activeTab === "installments" && (
          <div className="animate-in fade-in duration-500 max-w-3xl mx-auto">
            <div className=" overflow-hidden border border-gray-100 shadow-sm bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 uppercase text-[10px] tracking-widest">
                    <th className="px-8 py-5 text-left font-semibold">Banka</th>
                    <th className="px-8 py-5 text-center font-semibold">
                      3 Taksit
                    </th>
                    <th className="px-8 py-5 text-center font-semibold">
                      6 Taksit
                    </th>
                    <th className="px-8 py-5 text-right font-semibold">
                      9 Taksit
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {installmentBanks.map((bank) => (
                    <tr
                      key={bank}
                      className="hover:bg-gray-50/30 transition-colors"
                    >
                      <td className="px-8 py-5 font-medium text-gray-900">
                        {bank}
                      </td>
                      <td className="px-8 py-5 text-center text-gray-600">
                        {(productPrice / 3).toFixed(2)} TL
                      </td>
                      <td className="px-8 py-5 text-center text-gray-600">
                        {(productPrice / 6).toFixed(2)} TL
                      </td>
                      <td className="px-8 py-5 text-right font-semibold text-black">
                        {(productPrice / 9).toFixed(2)} TL
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["Vade Farksız", "Güvenli Ödeme", "Hızlı İşlem"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-[11px] text-gray-500 justify-center"
                >
                  <Check size={14} className="text-green-500" /> {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions Tab */}
        {activeTab === "suggestions" && (
          <div className="animate-in fade-in duration-500 max-w-xl mx-auto text-center">
            <div className="mb-10">
              <div className="w-16 h-16 bg-yellow-50 price flex items-center justify-center mx-auto mb-4">
                <Lightbulb size={32} className="text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Fikirleriniz Önemli
              </h3>
              <p className="text-gray-500 mt-2">
                Deneyiminizi iyileştirmemize yardımcı olun.
              </p>
            </div>
            <div className="space-y-4">
              <input
                value={suggestionEmail}
                onChange={(e) => setSuggestionEmail(e.target.value)}
                placeholder="E-posta adresiniz (opsiyonel)"
                className="w-full px-6 py-4 price bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 transition-all outline-none text-sm"
              />
              <textarea
                value={suggestionText}
                onChange={(e) => setSuggestionText(e.target.value)}
                placeholder="Önerinizi buraya yazın..."
                className="w-full px-6 py-4 price bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 transition-all outline-none text-sm min-h-[160px] resize-none"
              />
              <Button
                onClick={() => {
                  toast.success("Öneriniz alındı.");
                  setSuggestionText("");
                }}
                className="w-full py-7 price bg-black hover:bg-zinc-800 text-white font-medium"
              >
                Gönder
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modern Yorum Modalı */}
      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent className="sm:max-w-[480px]  p-8 border-none shadow-2xl overflow-hidden">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold">
              Deneyiminizi Paylaşın
            </DialogTitle>
            <DialogDescription>
              Ürün hakkındaki görüşleriniz diğer müşterilere ışık tutacaktır.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex justify-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setRating(n)}
                  className="transition-transform active:scale-90"
                >
                  <Star
                    size={32}
                    className={`${
                      n <= rating ? "fill-black text-black" : "text-gray-200"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>

            <input
              placeholder="Başlık (Opsiyonel)"
              className="w-full px-4 py-3 price bg-gray-50 border-none outline-none focus:ring-1 focus:ring-black/10 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Yorumunuzu buraya yazın..."
              className="w-full px-4 py-3 price bg-gray-50 border-none outline-none focus:ring-1 focus:ring-black/10 text-sm min-h-[120px] resize-none"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />

            <div className="flex gap-3 pt-2">
              <Button
                variant="ghost"
                onClick={() => setIsReviewModalOpen(false)}
                className="flex-1 price h-12"
              >
                İptal
              </Button>
              <Button
                onClick={handleCommentSubmit}
                disabled={rating === 0 || !commentText || isSubmitting}
                className="flex-[2] price bg-black h-12 text-white"
              >
                {isSubmitting ? "Gönderiliyor..." : "Yorumu Yayınla"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
