"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Image as ImageIcon, X, Send, Tag, FileText } from "lucide-react";

interface AddBlogDialogProps {
  onAdd: (blog: any) => void;
}

export default function AddBlogDialog({ onAdd }: AddBlogDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Dosya seçildiğinde önizleme oluştur ve memory leak'i önle
  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("");
    setImageFile(null);
  };

  const handleAddBlog = async () => {
    if (!title || !content || !category || !imageFile) {
      toast.error("Lütfen tüm alanları doldurun.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("image", imageFile);

      const res = await fetch("/api/blog", { method: "POST", body: formData });
      const data = await res.json();

      if (res.ok) {
        onAdd(data.blog);
        resetForm();
        setOpen(false);
        toast.success("Blog yazısı yayına alındı.");
      } else {
        toast.error(data.message || "Bir hata oluştu.");
      }
    } catch (err) {
      toast.error("Sunucuya ulaşılamadı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-[#001e59] hover:bg-[#003080] text-white rounded-xl px-5 h-11 shadow-sm transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Yeni İçerik Ekle
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden border-none shadow-2xl rounded-2xl bg-[#F8FAFC]">
        <DialogHeader className="p-6 bg-white border-b border-slate-100">
          <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-[#001e59]" />
            </div>
            İçerik Oluştur
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-5 h-full max-h-[75vh] overflow-y-auto lg:overflow-hidden">
          {/* Form Alanı */}
          <div className="lg:col-span-3 p-6 space-y-5 bg-white overflow-y-auto">
            <div className="space-y-2">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Başlık
              </Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Yaratıcı bir başlık yazın..."
                className="h-11 rounded-xl border-slate-200 focus:ring-4 focus:ring-blue-50 transition-all shadow-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Kategori
                </Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <Input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Eğitim, Teknoloji..."
                    className="pl-10 h-11 rounded-xl border-slate-200 shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Kapak Görseli
                </Label>
                <label className="flex items-center justify-center h-11 px-4 border border-dashed border-slate-300 rounded-xl hover:bg-slate-50 cursor-pointer transition-all group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <ImageIcon className="w-4 h-4 text-slate-400 group-hover:text-blue-500 mr-2" />
                  <span className="text-sm text-slate-500 truncate">
                    {imageFile ? imageFile.name : "Görsel Seç"}
                  </span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                İçerik Metni
              </Label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Okuyucularınıza ne anlatmak istersiniz?"
                className="w-full min-h-[200px] p-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 transition-all shadow-sm text-sm outline-none resize-none"
              />
            </div>
          </div>

          {/* Önizleme Alanı */}
          <div className="lg:col-span-2 p-6 bg-[#F8FAFC] border-l border-slate-100 hidden lg:flex flex-col">
            <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4">
              Önizleme
            </Label>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-1 flex flex-col">
              <div className="relative w-full aspect-video bg-slate-100 flex items-center justify-center">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-slate-300">
                    <ImageIcon className="w-8 h-8 mb-2" />
                    <span className="text-[10px] font-medium uppercase tracking-widest">
                      Görsel Bekleniyor
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2">
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">
                    {category || "Kategori"}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 leading-tight line-clamp-2">
                  {title || "Blog Başlığı"}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-4 leading-relaxed italic">
                  {content || "İçerik önizlemesi burada görünecek..."}
                </p>
              </div>
              <div className="mt-auto p-4 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-200" />
                  <div className="h-2 w-20 bg-slate-100 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 bg-slate-50 border-t border-slate-100 sm:justify-end gap-3">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="rounded-xl px-6 font-medium text-slate-500 hover:bg-slate-200"
          >
            Vazgeç
          </Button>
          <Button
            onClick={handleAddBlog}
            disabled={loading}
            className="bg-[#001e59] hover:bg-[#003080] text-white rounded-xl px-8 font-semibold shadow-md transition-all flex items-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {loading ? "Yükleniyor..." : "Yayınla"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
