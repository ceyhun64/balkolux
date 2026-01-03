"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus } from "lucide-react"; // İkonları daha şık hale getirmek için ekledik
import { CartItemType } from "./cartDropdown";

interface CartItemDropdownProps {
  item: CartItemType;
  onQuantityChange: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

const CartItemDropdown: React.FC<CartItemDropdownProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  // ✅ Prisma şemasına göre sadeleştirilmiş hesaplama
  // price Prisma'da Int olduğu için doğrudan çarpıyoruz
  const unitPrice = item.product.price || 0;
  const totalPrice = unitPrice * (item.quantity || 1);

  return (
    <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-gray-100 shadow-sm transition-hover hover:border-gray-300">
      {/* Ürün Görseli */}
      <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-50 border border-gray-100">
        <img
          src={item.product.mainImage}
          alt={item.product.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Ürün Bilgileri */}
      <div className="flex-1 mx-3 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">
          {item.product.title}
        </p>

        <div className="mt-1 flex flex-col">
          <span className="text-[11px] text-gray-500">
            Birim: ₺{unitPrice.toLocaleString("tr-TR")}
          </span>
          <span className="text-sm font-bold text-[#7B0323]">
            ₺{totalPrice.toLocaleString("tr-TR")}
          </span>
        </div>
      </div>

      {/* Kontroller (Adet ve Silme) */}
      <div className="flex flex-col items-end gap-3">
        <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 p-0.5">
          <Button
            size="icon"
            variant="ghost"
            className="w-6 h-6 rounded-full text-gray-600 hover:bg-white"
            onClick={() => onQuantityChange(item.id, -1)}
            disabled={item.quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>

          <span className="text-xs font-medium w-6 text-center select-none">
            {item.quantity}
          </span>

          <Button
            size="icon"
            variant="ghost"
            className="w-6 h-6 rounded-full text-gray-600 hover:bg-white"
            onClick={() => onQuantityChange(item.id, 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        <button
          onClick={() => onRemove(item.id)}
          className="text-gray-400 hover:text-red-600 transition-colors"
          title="Ürünü kaldır"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItemDropdown;
