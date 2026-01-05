"use client";

import React, { ChangeEvent, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit3, Trash2, Star, MessageSquare, ImageOff } from "lucide-react";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviewCount?: number;
  mainImage: string;
  category: string;
  subCategory?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductTableProps {
  products: Product[];
  selectedIds: number[];
  onDeleteClick: (product: Product) => void;
  onUpdateClick: (product: Product) => void;
  onSelectAll: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectOne: (id: number) => void;
}

export default function ProductTable({
  products,
  selectedIds,
  onDeleteClick,
  onUpdateClick,
  onSelectAll,
  onSelectOne,
}: ProductTableProps) {
  // Resim yolu güvenliği
  const getSafeImagePath = (image?: string) => {
    if (!image || image.trim() === "") return null;
    return image.startsWith("http") ? image : "/" + image.replace(/^\/+/, "");
  };

  // Tarih formatlama (Hatasız)
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    try {
      const d = new Date(dateStr);
      return isNaN(d.getTime())
        ? "-"
        : new Intl.DateTimeFormat("tr-TR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }).format(d);
    } catch {
      return "-";
    }
  };

  return (
    <div className="w-full bg-white">
      {/* DESKTOP VIEW */}
      <div className="hidden md:block overflow-x-auto">
        <Table className="border-collapse">
          <TableHeader className="bg-slate-50/40 border-b border-slate-100/80">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12 pl-6 pr-0">
                <input
                  type="checkbox"
                  checked={
                    products.length > 0 &&
                    selectedIds.length === products.length
                  }
                  onChange={onSelectAll}
                  className="w-4 h-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-all"
                />
              </TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 py-4 px-6">
                Ürün Detayı
              </TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 py-4 px-4">
                Kategori
              </TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 py-4 px-4">
                Fiyat
              </TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 py-4 px-4">
                Performans
              </TableHead>
              <TableHead className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 py-4 px-4">
                Kayıt
              </TableHead>
              <TableHead className="text-right pr-6 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 py-4">
                İşlemler
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <AnimatePresence mode="popLayout">
              {products.map((product, index) => {
                const imgPath = getSafeImagePath(product.mainImage);
                return (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                    className={`group border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-all ${
                      selectedIds.includes(product.id) ? "bg-indigo-50/20" : ""
                    }`}
                  >
                    <TableCell className="pl-6 pr-0">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(product.id)}
                        onChange={() => onSelectOne(product.id)}
                        className="w-4 h-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-all"
                      />
                    </TableCell>

                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/50 flex-shrink-0 flex items-center justify-center">
                          {imgPath ? (
                            <Image
                              src={imgPath}
                              alt={product.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <ImageOff size={16} className="text-slate-400" />
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-slate-900 text-sm line-clamp-1 group-hover:text-indigo-600 transition-colors">
                            {product.title}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            ID: #{product.id}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-4">
                      <Badge className="bg-white text-slate-600 border border-slate-200 shadow-none hover:bg-slate-50 text-[10px] px-2 py-0.5 rounded-lg font-bold">
                        {product.category}
                      </Badge>
                    </TableCell>

                    <TableCell className="px-4 font-bold text-slate-900 text-sm whitespace-nowrap">
                      {new Intl.NumberFormat("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                      }).format(product.price)}
                    </TableCell>

                    <TableCell className="px-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-[12px] font-bold text-amber-500">
                          <Star size={12} fill="currentColor" />
                          {product.rating.toFixed(1)}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                          <MessageSquare size={10} />
                          {product.reviewCount || 0} Yorum
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 text-[12px] text-slate-500 font-medium whitespace-nowrap">
                      {formatDate(product.createdAt)}
                    </TableCell>

                    <TableCell className="text-right pr-6">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 text-slate-400 hover:text-indigo-600 transition-all"
                          onClick={() => onUpdateClick(product)}
                        >
                          <Edit3 size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all"
                          onClick={() => onDeleteClick(product)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden space-y-3 p-4 bg-[#F8F9FB]">
        {products.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[20px] p-4 shadow-sm border border-slate-100/80 flex flex-col gap-4"
          >
            <div className="flex gap-4">
              <div className="relative w-20 h-20 rounded-[14px] overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0">
                {getSafeImagePath(product.mainImage) ? (
                  <Image
                    src={getSafeImagePath(product.mainImage)!}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageOff size={20} className="text-slate-300" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900 text-sm truncate pr-2">
                      {product.title}
                    </h3>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(product.id)}
                      onChange={() => onSelectOne(product.id)}
                      className="w-4 h-4 rounded-md border-slate-300 text-indigo-600"
                    />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-500 text-[9px] font-bold uppercase tracking-wider mt-1 px-1.5 py-0"
                  >
                    {product.category}
                  </Badge>
                </div>
                <div className="text-base font-black text-slate-900">
                  {product.price.toLocaleString("tr-TR")} ₺
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-50">
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star size={14} fill="currentColor" />{" "}
                  {product.rating.toFixed(1)}
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">
                  {product.reviewCount || 0} Yorum
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl h-8 px-4 font-bold text-[11px] border-slate-200 text-slate-600"
                  onClick={() => onUpdateClick(product)}
                >
                  Düzenle
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="rounded-xl h-8 w-8 p-0 text-red-400 hover:bg-red-50 hover:text-red-600"
                  onClick={() => onDeleteClick(product)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
