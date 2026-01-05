"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import Sidebar from "@/components/modules/admin/sideBar";
import AddBlogDialog from "./addBlog";
import UpdateBlogDialog from "./updateBlog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import DefaultPagination from "@/components/layout/pagination";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Search,
  Trash2,
  BookOpen,
  Filter,
  Hash,
  Layers,
  Edit3,
} from "lucide-react";

interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  category: string;
}

const DeleteDialog = ({ onConfirm, trigger, title, description }: any) => (
  <Dialog>
    <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogContent className="sm:max-w-[400px] border-none shadow-2xl rounded-2xl p-6">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-slate-900">
          {title}
        </DialogTitle>
        <DialogDescription className="text-slate-500 mt-2">
          {description}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="mt-6 gap-2">
        <Button variant="ghost" className="rounded-xl hover:bg-slate-100">
          İptal
        </Button>
        <Button
          variant="destructive"
          className="rounded-xl px-6 bg-red-500 hover:bg-red-600"
          onClick={onConfirm}
        >
          Silmeyi Onayla
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      if (res.ok && data.blogs) setBlogs(data.blogs);
    } catch (err) {
      toast.error("Bloglar yüklenemedi.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
    if (res.ok) {
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      toast.success("İçerik kaldırıldı.");
    }
  };

  const filteredBlogs = blogs
    .filter((b) =>
      filter === "all"
        ? true
        : b.category.toLowerCase() === filter.toLowerCase()
    )
    .filter((b) => b.title.toLowerCase().includes(search.toLowerCase()));

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * 15,
    currentPage * 15
  );

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
              Blog Yönetimi
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              İşletmenizin performansını gerçek zamanlı izleyin.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <DeleteDialog
              title="Toplu Silme"
              description={`${selectedIds.length} içerik kalıcı olarak silinecek.`}
              onConfirm={() => {
                /* Toplu silme logic */
              }}
              trigger={
                <Button
                  disabled={selectedIds.length === 0}
                  className={`h-11 rounded-xl px-5 transition-all shadow-sm ${
                    selectedIds.length > 0
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-slate-100 text-slate-400 border border-slate-200"
                  }`}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Seçilenleri Kaldır ({selectedIds.length})
                </Button>
              }
            />
            <AddBlogDialog onAdd={(newB) => setBlogs([...blogs, newB])} />
          </div>
        </header>

        {/* Toolbar Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Yazı başlığı ile ara..."
              className="pl-10 h-11 bg-white border-slate-200 rounded-xl focus:ring-4 focus:ring-slate-100 transition-all shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Select onValueChange={setFilter} value={filter}>
            <SelectTrigger className="h-11 bg-white border-slate-200 rounded-xl shadow-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <SelectValue placeholder="Kategori" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200 shadow-xl">
              <SelectItem value="all">Tüm Kategoriler</SelectItem>
              {Array.from(new Set(blogs.map((b) => b.category))).map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Content Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-[11px] uppercase tracking-[0.1em] font-bold">
                <th className="px-6 py-4 w-10 text-center">
                  <input
                    type="checkbox"
                    className="rounded-md border-slate-300 text-[#001e59] focus:ring-[#001e59]"
                    onChange={(e) =>
                      setSelectedIds(
                        e.target.checked ? paginatedBlogs.map((b) => b.id) : []
                      )
                    }
                  />
                </th>
                <th className="px-6 py-4">
                  <span className="flex items-center gap-2">
                    <Hash className="w-3 h-3" /> ID
                  </span>
                </th>
                <th className="px-6 py-4">BAŞLIK & İÇERİK</th>
                <th className="px-6 py-4">
                  <span className="flex items-center gap-2">
                    <Layers className="w-3 h-3" /> KATEGORİ
                  </span>
                </th>
                <th className="px-6 py-4 text-right pr-10">EYLEMLER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode="popLayout">
                {paginatedBlogs.map((blog) => (
                  <motion.tr
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={blog.id}
                    className="group hover:bg-slate-50/80 transition-all"
                  >
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(blog.id)}
                        onChange={() =>
                          setSelectedIds((prev) =>
                            prev.includes(blog.id)
                              ? prev.filter((id) => id !== blog.id)
                              : [...prev, blog.id]
                          )
                        }
                        className="rounded-md border-slate-300"
                      />
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                      #{blog.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-[400px]">
                        <p className="font-semibold text-slate-900 truncate">
                          {blog.title}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                          Görsel: {blog.image || "Varsayılan"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="secondary"
                        className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-none rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                      >
                        {blog.category || "Genel"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <UpdateBlogDialog
                          blog={blog}
                          onUpdate={(updated) =>
                            setBlogs((prev) =>
                              prev.map((b) =>
                                b.id === updated.id ? updated : b
                              )
                            )
                          }
                        />
                        <DeleteDialog
                          onConfirm={() => handleDelete(blog.id)}
                          trigger={
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-9 w-9 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          }
                          title="Yazıyı Sil"
                          description={`"${blog.title}" kalıcı olarak kaldırılacaktır.`}
                        />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {/* Empty State */}
          {filteredBlogs.length === 0 && (
            <div className="py-24 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-4">
                <BookOpen className="w-10 h-10 text-slate-200" />
              </div>
              <h3 className="text-slate-900 font-bold">Sonuç bulunamadı</h3>
              <p className="text-slate-400 text-sm mt-1 max-w-xs">
                Arama kriterlerinize uygun blog yazısı mevcut değil.
              </p>
            </div>
          )}
        </div>

        {/* Footer / Pagination */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 font-medium">
            Toplam <strong>{filteredBlogs.length}</strong> içerikten{" "}
            {Math.min(filteredBlogs.length, 15)} tanesi gösteriliyor.
          </p>
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
            <DefaultPagination
              totalItems={filteredBlogs.length}
              itemsPerPage={15}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
