import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-50 animate-pulse">
      {/* Üst Navigasyon Skeleton */}
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <Skeleton className="h-4 w-32 bg-stone-200" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
          {/* SOL: GÖRSEL GALERİSİ SKELETON */}
          <div className="lg:col-span-7 space-y-8">
            {/* Ana Görsel */}
            <Skeleton className="aspect-[16/11] w-full bg-stone-200 border border-stone-100" />

            {/* Thumbnail'lar */}
            <div className="flex gap-4 justify-center">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="w-24 h-16 bg-stone-200" />
              ))}
            </div>
          </div>

          {/* SAĞ: SATIN ALMA ALANI SKELETON */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <div className="space-y-12">
              {/* Başlık ve Kategori */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-3 w-24 bg-stone-200" />
                  <div className="w-1 h-1 rounded-full bg-stone-200" />
                  <Skeleton className="h-3 w-20 bg-stone-200" />
                </div>
                <Skeleton className="h-12 w-3/4 bg-stone-200" />
                <Skeleton className="h-12 w-1/2 bg-stone-200" />
              </div>

              {/* Fiyat Alanı */}
              <div className="space-y-3">
                <div className="flex items-baseline gap-4">
                  <Skeleton className="h-10 w-32 bg-stone-200" />
                  <Skeleton className="h-6 w-24 bg-stone-100" />
                </div>
                <Skeleton className="h-4 w-40 bg-green-50" />
              </div>

              {/* Satın Alma Aksiyonları */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  {/* Adet Seçici */}
                  <Skeleton className="h-14 w-32 bg-stone-200" />
                  {/* Sepete Ekle */}
                  <Skeleton className="h-14 flex-1 bg-stone-800 opacity-20" />
                </div>

                <div className="flex gap-4">
                  <Skeleton className="h-12 flex-1 bg-stone-200" />
                  <Skeleton className="h-12 w-12 bg-stone-200" />
                </div>
              </div>

              {/* İkonlu Bilgiler */}
              <div className="space-y-4 pt-8 border-t border-stone-100">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-5 w-5 rounded-full bg-stone-100" />
                  <Skeleton className="h-3 w-64 bg-stone-100" />
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-5 w-5 rounded-full bg-stone-100" />
                  <Skeleton className="h-3 w-56 bg-stone-100" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detay Tabları Skeleton */}
        <div className="mt-32 border-t border-stone-100 pt-12">
          <div className="flex gap-8 mb-8">
            <Skeleton className="h-4 w-24 bg-stone-200" />
            <Skeleton className="h-4 w-24 bg-stone-200" />
            <Skeleton className="h-4 w-24 bg-stone-200" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full bg-stone-100" />
            <Skeleton className="h-4 w-full bg-stone-100" />
            <Skeleton className="h-4 w-2/3 bg-stone-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
