"use client";

import React from "react";
import { Trash2, Plus, Minus, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CartItemType } from "./cart";

interface CartItemProps {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  const { product, quantity } = item;
  
  // ✅ Yeni sadeleştirilmiş fiyat hesabı (Fiyat * Adet)
  const finalPrice = (product.price || 0) * quantity;

  return (
    <div className="flex flex-row w-full gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all font-sans">
      {/* Ürün Görseli */}
      <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
        <Image
          src={product.mainImage}
          alt={product.title}
          fill
          className="object-contain p-2"
          unoptimized
        />
      </div>

      {/* Ürün Bilgileri */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          {/* Başlık ve Silme Butonu */}
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-sm sm:text-lg text-gray-900 leading-tight">
              {product.title}
            </h3>
            <button
              onClick={onRemove}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              aria-label="Ürünü Sil"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          {/* Birim Fiyat Bilgisi */}
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Birim Fiyat: ₺{(product.price || 0).toLocaleString("tr-TR")}
          </p>
        </div>

        {/* Alt Kısım: Adet Kontrolü ve Toplam Fiyat */}
        <div className="mt-4 flex flex-row justify-between items-end">
          {/* Adet Kontrolleri */}
          <div className="flex items-center border border-gray-200 rounded-full bg-gray-50 p-1">
            <button
              onClick={onDecrease}
              disabled={quantity <= 1}
              className="p-1.5 text-gray-600 hover:bg-white rounded-full transition-colors disabled:opacity-30"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center font-bold text-gray-900 text-sm sm:text-base">
              {quantity}
            </span>
            <button
              onClick={onIncrease}
              className="p-1.5 text-gray-600 hover:bg-white rounded-full transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Fiyat ve Düzenle */}
          <div className="flex flex-col items-end">
            <span className="font-extrabold text-[#7B0323] text-base sm:text-xl">
              ₺{finalPrice.toLocaleString("tr-TR")}
            </span>
            <Link href={`/products/${product.id}`}>
              <button className="flex items-center text-gray-400 hover:text-gray-700 mt-1 text-xs transition-colors group">
                <span className="mr-1 group-hover:underline">Ürüne Git</span>
                <Edit className="h-3 w-3" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}