"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface Props {
  src: string;
  alt: string;
}

export function CustomImageZoom({ src, alt }: Props) {
  const [showZoom, setShowZoom] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // DOM elementlerine doğrudan erişmek için Ref'ler
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomLayerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !zoomLayerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    // Mouse pozisyonunu hesapla
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    // Sınırları kontrol et
    const boundedX = Math.max(0, Math.min(100, x));
    const boundedY = Math.max(0, Math.min(100, y));

    // React State yerine doğrudan CSS Variable güncelleme (Re-render'ı engeller)
    zoomLayerRef.current.style.setProperty("--zoom-x", `${boundedX}%`);
    zoomLayerRef.current.style.setProperty("--zoom-y", `${boundedY}%`);
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden cursor-zoom-in bg-white"
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-contain transition-opacity duration-300 ${
            showZoom ? "opacity-0" : "opacity-100"
          }`}
          priority
        />

        {showZoom && (
          <div
            ref={zoomLayerRef}
            className="absolute inset-0 pointer-events-none will-change-[background-position]"
            style={{
              backgroundImage: `url(${src})`,
              backgroundPosition: `var(--zoom-x, 50%) var(--zoom-y, 50%)`,
              backgroundSize: "250%",
              backgroundRepeat: "no-repeat",
              // transition kaldırıldı veya çok düşük değer verildi (akışkanlık için)
              transition: "opacity 0.2s ease-in-out",
            }}
          />
        )}
      </div>

      {/* Modal Kısmı (Aynı kalabilir) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 animate-in fade-in duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:rotate-90 transition-transform duration-300 z-[10000] p-2 hover:bg-white/10 rounded-full"
            onClick={() => setIsModalOpen(false)}
          >
            <X size={32} />
          </button>
          <div className="relative w-full h-screen max-w-none flex items-center justify-center">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain" // Görselin oranını bozmadan sığdırır
              quality={100}
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
