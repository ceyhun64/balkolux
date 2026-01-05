"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Sidebar from "@/components/modules/admin/sideBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DefaultPagination from "@/components/layout/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import {
  Search,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Users as UsersIcon,
  CheckCircle2,
  MoreVertical,
} from "lucide-react";

// --- Interfaces ---
interface Address {
  id: number;
  title: string;
  address: string;
  city: string;
  district: string;
  zip: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone?: string;
  addresses?: Address[];
}

const ITEMS_PER_PAGE = 12;

export default function UsersManagement() {
  const isMobile = useIsMobile();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isBatchDeleting, setIsBatchDeleting] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/user/all");
      if (!res.ok) throw new Error("Veriler alınamadı");
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      toast.error("Kullanıcı listesi yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Yardımcı: Telefon getirme
  const displayPhone = (user: User) => {
    return user.phone || user.addresses?.[0]?.phone || "Tanımlanmadı";
  };

  // Filtreleme (Memoized)
  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      `${u.name} ${u.surname} ${u.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Silme İşlemleri
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/user/all/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
        toast.success("Kullanıcı başarıyla silindi.");
      }
    } catch (error) {
      toast.error("Silme işlemi başarısız.");
    }
  };

  const handleBatchDelete = async () => {
    setIsBatchDeleting(true);
    try {
      // Örnek toplu silme API çağrısı simülasyonu
      await Promise.all(
        selectedIds.map((id) =>
          fetch(`/api/user/all/${id}`, { method: "DELETE" })
        )
      );
      setUsers((prev) => prev.filter((u) => !selectedIds.includes(u.id)));
      setSelectedIds([]);
      toast.success(`${selectedIds.length} kullanıcı silindi.`);
    } catch (error) {
      toast.error("Bazı kullanıcılar silinemedi.");
    } finally {
      setIsBatchDeleting(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <Spinner className="w-8 h-8 text-indigo-600" />
      </div>
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
              Müşteri Yönetimi
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              İşletmenizin performansını gerçek zamanlı izleyin.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <Input
                placeholder="İsim veya e-posta ile ara..."
                className="pl-11 h-12 w-full md:w-80 bg-white border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-indigo-50 transition-all border-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {selectedIds.length > 0 && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="h-12 px-6 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 border-none shadow-none font-bold animate-in fade-in zoom-in duration-200">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Sil ({selectedIds.length})
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-[2rem] border-none">
                  <DialogHeader>
                    <DialogTitle>Seçilenleri Sil</DialogTitle>
                    <DialogDescription>
                      {selectedIds.length} kullanıcıyı sistemden kalıcı olarak
                      silmek istediğinize emin misiniz?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="mt-4">
                    <Button variant="ghost" className="rounded-xl">
                      Vazgeç
                    </Button>
                    <Button
                      onClick={handleBatchDelete}
                      disabled={isBatchDeleting}
                      className="bg-red-600 hover:bg-red-700 rounded-xl px-8"
                    >
                      {isBatchDeleting ? (
                        <Spinner className="w-4 h-4" />
                      ) : (
                        "Evet, Hepsini Sil"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </header>

        {/* Veri Tablosu */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50 bg-slate-50/30">
                <th className="px-8 py-5 w-12">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    onChange={(e) =>
                      setSelectedIds(
                        e.target.checked ? paginatedUsers.map((u) => u.id) : []
                      )
                    }
                  />
                </th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">
                  Profil
                </th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">
                  İletişim
                </th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">
                  Adres Bilgisi
                </th>
                <th className="px-6 py-5 text-right text-xs font-bold uppercase tracking-widest text-slate-400">
                  Yönet
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-indigo-50/20 transition-all group"
                >
                  <td className="px-8 py-5">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(user.id)}
                      onChange={() =>
                        setSelectedIds((prev) =>
                          prev.includes(user.id)
                            ? prev.filter((i) => i !== user.id)
                            : [...prev, user.id]
                        )
                      }
                      className="w-5 h-5 rounded-md border-slate-300 text-indigo-600"
                    />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-600 font-black text-sm shadow-inner group-hover:from-indigo-100 group-hover:to-indigo-200 group-hover:text-indigo-600 transition-all">
                        {user.name[0]}
                        {user.surname[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {user.name} {user.surname}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 tracking-tighter uppercase">
                          ID: #{user.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm font-medium text-slate-600">
                        <Mail className="w-3.5 h-3.5 mr-2 text-slate-300" />{" "}
                        {user.email}
                      </div>
                      <div className="flex items-center text-xs text-slate-400">
                        <Phone className="w-3.5 h-3.5 mr-2 text-slate-300" />{" "}
                        {displayPhone(user)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-9 rounded-xl text-xs font-bold border-slate-200 hover:bg-slate-50 hover:text-indigo-600 transition-all"
                        >
                          <MapPin className="w-3.5 h-3.5 mr-1.5" />
                          {user.addresses?.length || 0} Adres Kaydı
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-[2rem] border-none max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-black">
                            Adres Detayları
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 my-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                          {user.addresses?.length ? (
                            user.addresses.map((addr) => (
                              <div
                                key={addr.id}
                                className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors"
                              >
                                <div className="flex justify-between mb-2">
                                  <span className="text-xs font-black uppercase tracking-widest text-indigo-600">
                                    {addr.title}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-bold">
                                    #{addr.id}
                                  </span>
                                </div>
                                <p className="text-sm font-semibold text-slate-700">
                                  {addr.address}
                                </p>
                                <p className="text-xs text-slate-500 mt-1 font-medium">
                                  {addr.district} / {addr.city}
                                </p>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-10 text-slate-400 font-medium">
                              Kayıtlı adres bulunamadı.
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-10 w-10 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-3xl">
                        <DialogHeader>
                          <DialogTitle>Kullanıcıyı Sil</DialogTitle>
                          <DialogDescription>
                            <b>
                              {user.name} {user.surname}
                            </b>{" "}
                            isimli kullanıcıyı silmek üzeresiniz. Bu işlem geri
                            alınamaz.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-6">
                          <Button variant="ghost" className="rounded-xl">
                            Vazgeç
                          </Button>
                          <Button
                            onClick={() => handleDelete(user.id)}
                            className="bg-red-600 hover:bg-red-700 rounded-xl px-8"
                          >
                            Kullanıcıyı Sil
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                <UsersIcon className="w-10 h-10 text-slate-200" />
              </div>
              <p className="text-slate-400 font-semibold text-lg">
                Eşleşen kullanıcı bulunamadı.
              </p>
              <Button
                variant="link"
                onClick={() => setSearch("")}
                className="text-indigo-600 font-bold"
              >
                Aramayı Temizle
              </Button>
            </div>
          )}
        </div>

        {/* Pagination Alt Bar */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
          <p className="text-sm font-bold text-slate-400">
            {filteredUsers.length} sonuçtan{" "}
            <span className="text-slate-900">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)}
            </span>{" "}
            arası gösteriliyor
          </p>
          <div className="bg-white p-1.5 rounded-2xl shadow-xl shadow-slate-200/50">
            <DefaultPagination
              totalItems={filteredUsers.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
