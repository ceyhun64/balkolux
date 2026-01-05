"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";
import { Edit3, Save, X, Layout, Type, Tag, ImageIcon } from "lucide-react";

interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  category: string;
}

interface UpdateBlogDialogProps {
  blog: Blog;
  onUpdate: (updated: Blog) => void;
}

export default function UpdateBlogDialog({
  blog,
  onUpdate,
}: UpdateBlogDialogProps) {
  const [editedBlog, setEditedBlog] = useState<Blog>(blog);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Dialog açıldığında blog verilerini eşitle
  useEffect(() => {
    if (open) setEditedBlog(blog);
  }, [open, blog]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blog/${blog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedBlog),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Güncelleme başarısız");

      onUpdate(data.blog);
      toast.success("İçerik başarıyla güncellendi");
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-slate-400 hover:text-[#001e59] hover:bg-blue-50 rounded-xl transition-all"
        >
          <Edit3 className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[850px] p-0 overflow-hidden border-none shadow-2xl rounded-2xl bg-white">
        <DialogHeader className="p-6 bg-white border-b border-slate-100">
          <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <Layout className="w-4 h-4 text-[#001e59]" />
            </div>
            İçeriği Düzenle
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-5 max-h-[70vh] overflow-y-auto lg:overflow-hidden">
          {/* Sol: Form Alanı */}
          <div className="lg:col-span-3 p-6 space-y-5 overflow-y-auto border-r border-slate-50">
            <div className="space-y-2">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Başlık
              </Label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <Input
                  value={editedBlog.title}
                  onChange={(e) =>
                    setEditedBlog({ ...editedBlog, title: e.target.value })
                  }
                  className="pl-10 h-11 rounded-xl border-slate-200 focus:ring-4 focus:ring-blue-50 transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Kategori
                </Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <Input
                    value={editedBlog.category}
                    onChange={(e) =>
                      setEditedBlog({ ...editedBlog, category: e.target.value })
                    }
                    className="pl-10 h-11 rounded-xl border-slate-200 shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Görsel URL
                </Label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <Input
                    value={editedBlog.image}
                    onChange={(e) =>
                      setEditedBlog({ ...editedBlog, image: e.target.value })
                    }
                    className="pl-10 h-11 rounded-xl border-slate-200 shadow-sm font-mono text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                İçerik Metni
              </Label>
              <textarea
                value={editedBlog.content}
                onChange={(e) =>
                  setEditedBlog({ ...editedBlog, content: e.target.value })
                }
                className="w-full min-h-[180px] p-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 transition-all shadow-sm text-sm outline-none resize-none leading-relaxed text-slate-600"
              />
            </div>
          </div>

          {/* Sağ: Canlı Önizleme */}
          <div className="lg:col-span-2 p-6 bg-[#F8FAFC] flex flex-col items-center justify-start">
            <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4 self-start">
              Görünüm Önizlemesi
            </Label>

            <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col group">
              <div className="relative w-full aspect-video bg-slate-100">
                {editedBlog.image ? (
                  <Image
                    src={editedBlog.image}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                    <ImageIcon className="w-8 h-8 mb-2 opacity-20" />
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2">
                <span className="px-2 py-0.5 bg-blue-50 text-[#001e59] text-[10px] font-bold rounded-lg uppercase tracking-tight">
                  {editedBlog.category || "Kategori"}
                </span>
                <h4 className="font-bold text-slate-900 leading-tight line-clamp-2">
                  {editedBlog.title || "Başlık Yazılmadı"}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {editedBlog.content || "İçerik henüz eklenmedi..."}
                </p>
              </div>
              <div className="mt-auto p-4 border-t border-slate-50 flex items-center justify-between bg-slate-50/50">
                <div className="h-1.5 w-16 bg-slate-200 rounded-full" />
                <div className="h-4 w-4 rounded-full bg-slate-100" />
              </div>
            </div>

            <p className="mt-4 text-[10px] text-slate-400 italic text-center px-4">
              * Bu alan, kartın web sitesinde nasıl görüneceğini temsil eder.
            </p>
          </div>
        </div>

        <DialogFooter className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="rounded-xl px-6 font-medium text-slate-500 hover:bg-slate-200"
          >
            Vazgeç
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-[#001e59] hover:bg-[#003080] text-white rounded-xl px-8 font-semibold shadow-lg shadow-blue-900/10 flex items-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Değişiklikleri Kaydet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
