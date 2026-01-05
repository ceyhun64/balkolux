"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Sidebar from "@/components/modules/admin/sideBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DefaultPagination from "@/components/layout/pagination";
import { useIsMobile } from "@/hooks/use-mobile";
import ProductTable from "./productTable";
import { toast } from "sonner";
import ProductDialog, { ProductFormData } from "./productDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Search,
  Trash2,
  Filter,
  PackageOpen,
  LayoutGrid,
  Loader2,
} from "lucide-react";

interface Product {
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

const ITEMS_PER_PAGE = 15;

export default function Products(): React.ReactElement {
  const isMobile = useIsMobile();
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // ===================== API FETCH =====================
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (res.ok) setProducts(data.products || []);
      else toast.error(data.error || "Ürünler yüklenemedi");
    } catch (err) {
      toast.error("Sunucu bağlantı hatası!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ===================== FILTRELEME & PAGINATION =====================
  const categories = [
    "Oturma Takımları",
    "Masa Takımları",
    "Salıncak",
    "Şezlong",
    "Şemsiye",
    "Barbekü",
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = filter === "all" || p.category === filter;
      const matchesSearch = p.title
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, filter, search]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // ===================== HANDLERS =====================
  const handleSubmitProduct = async (
    formData: ProductFormData,
    mainFile: File | null,
    subFile?: File | null,
    subFile2?: File | null,
    subFile3?: File | null,
    subFile4?: File | null,
    productId?: number
  ) => {
    const dataForm = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      dataForm.append(key, String(value))
    );

    if (mainFile) dataForm.append("file", mainFile);
    if (subFile) dataForm.append("subImageFile", subFile);
    if (subFile2) dataForm.append("subImage2File", subFile2);
    if (subFile3) dataForm.append("subImage3File", subFile3);
    if (subFile4) dataForm.append("subImage4File", subFile4);

    const url = productId ? `/api/products/${productId}` : "/api/products";
    const method = productId ? "PUT" : "POST";

    toast.promise(
      fetch(url, { method, body: dataForm }).then(async (res) => {
        if (!res.ok) {
          const d = await res.json();
          throw new Error(d.error || "Hata oluştu");
        }
        fetchProducts();
        setSelectedProduct(null);
      }),
      {
        loading: productId ? "Ürün güncelleniyor..." : "Yeni ürün ekleniyor...",
        success: "İşlem başarıyla tamamlandı!",
        error: (err) => err.message,
      }
    );
  };

  const handleDelete = async () => {
    const idsToDelete = productToDelete ? [productToDelete.id] : selectedIds;

    toast.promise(
      Promise.all(
        idsToDelete.map((id) =>
          fetch(`/api/products/${id}`, { method: "DELETE" })
        )
      ),
      {
        loading: "Siliniyor...",
        success: () => {
          setProducts((prev) =>
            prev.filter((p) => !idsToDelete.includes(p.id))
          );
          setSelectedIds([]);
          setDeleteDialogOpen(false);
          setProductToDelete(null);
          return "Silme işlemi başarılı.";
        },
        error: "Bazı ürünler silinemedi.",
      }
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FB] font-sans selection:bg-indigo-100">
      <Sidebar />
      <main
        className={`flex-1 p-6 lg:p-12 transition-all duration-300 ${
          isMobile ? "mt-14" : "md:ml-72"
        }`}
      >
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1 w-8 bg-indigo-600 rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                Yönetim Paneli
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Ürün Yönetimi
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              İşletmenizin performansını gerçek zamanlı izleyin.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {selectedIds.length > 0 && (
              <Button
                variant="destructive"
                className="rounded-xl gap-2 shadow-sm animate-in fade-in zoom-in duration-200 font-bold h-11"
                onClick={() => {
                  setProductToDelete(null);
                  setDeleteDialogOpen(true);
                }}
              >
                <Trash2 size={16} />
                Seçilenleri Sil ({selectedIds.length})
              </Button>
            )}
            <ProductDialog
              onSubmit={handleSubmitProduct}
              product={selectedProduct ?? undefined}
            />
          </div>
        </header>

        {/* Toolbar */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col md:flex-row gap-2 mb-8">
          <div className="relative flex-1 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
              size={18}
            />
            <Input
              placeholder="Ürün adı ile ara..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-12 bg-transparent border-none rounded-xl focus-visible:ring-0 text-sm h-12 w-full font-medium"
            />
          </div>

          <div className="h-8 w-[1px] bg-slate-100 self-center hidden md:block" />

          <Select
            onValueChange={(val) => {
              setFilter(val);
              setCurrentPage(1);
            }}
            defaultValue="all"
          >
            <SelectTrigger className="w-full md:w-64 border-none bg-transparent rounded-xl text-slate-600 font-bold h-12 shadow-none focus:ring-0">
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-slate-400" />
                <SelectValue placeholder="Kategori Filtresi" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-100 shadow-xl">
              <SelectItem value="all" className="font-medium">
                Tüm Kategoriler
              </SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="font-medium">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden min-h-[500px] relative">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[2px] z-10">
              <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
          ) : (
            <>
              <ProductTable
                products={paginatedProducts}
                onDeleteClick={(p) => {
                  setProductToDelete(p);
                  setDeleteDialogOpen(true);
                }}
                onUpdateClick={setSelectedProduct}
                onSelectAll={(e) =>
                  setSelectedIds(
                    e.target.checked ? paginatedProducts.map((p) => p.id) : []
                  )
                }
                onSelectOne={(id) =>
                  setSelectedIds((prev) =>
                    prev.includes(id)
                      ? prev.filter((i) => i !== id)
                      : [...prev, id]
                  )
                }
                selectedIds={selectedIds}
              />

              {filteredProducts.length === 0 && (
                <div className="py-32 flex flex-col items-center justify-center text-slate-400 animate-in fade-in slide-in-from-bottom-4">
                  <div className="p-5 bg-slate-50 rounded-full mb-4">
                    <PackageOpen
                      size={48}
                      strokeWidth={1}
                      className="text-slate-300"
                    />
                  </div>
                  <p className="text-sm font-bold text-slate-600">
                    Ürün Bulunamadı
                  </p>
                  <p className="text-xs text-slate-400 mt-1 font-medium">
                    Arama kriterlerinizi değiştirmeyi deneyin.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Pagination */}
        {!loading && filteredProducts.length > ITEMS_PER_PAGE && (
          <div className="mt-10 flex justify-center">
            <DefaultPagination
              totalItems={filteredProducts.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[400px] rounded-[32px] border-none p-8 gap-6 shadow-2xl">
            <DialogHeader className="items-center text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-2 animate-bounce">
                <Trash2 size={32} />
              </div>
              <DialogTitle className="text-2xl font-bold text-slate-900 leading-tight">
                Emin misiniz?
              </DialogTitle>
              <DialogDescription className="text-slate-500 font-medium pt-2">
                {productToDelete ? (
                  <>
                    <span className="text-slate-900 font-bold">
                      "{productToDelete.title}"
                    </span>{" "}
                    ürünü kalıcı olarak silinecek.
                  </>
                ) : (
                  <>
                    <span className="text-slate-900 font-bold">
                      {selectedIds.length} adet ürün
                    </span>{" "}
                    toplu olarak silinecek.
                  </>
                )}
                <br />
                Bu işlem geri alınamaz.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-row gap-3 sm:justify-center">
              <Button
                variant="ghost"
                className="flex-1 rounded-xl font-bold text-slate-500 h-12"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Vazgeç
              </Button>
              <Button
                variant="destructive"
                className="flex-1 rounded-xl font-bold h-12 shadow-lg shadow-red-100"
                onClick={handleDelete}
              >
                Evet, Sil
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
