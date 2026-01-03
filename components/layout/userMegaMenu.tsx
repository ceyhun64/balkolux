"use client";

import Link from "next/link";
import {
  LogIn,
  UserPlus,
  User,
  MapPin,
  Package,
  X,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserMegaMenuProps {
  user: { name?: string; email?: string } | null;
  setUser: (user: { name?: string; email?: string } | null) => void;
  userMenuOpen: boolean;
  setUserMenuOpen: (open: boolean) => void;
  pathname: string;
}

export default function UserMegaMenu({
  user,
  setUser,
  userMenuOpen,
  setUserMenuOpen,
}: UserMegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // ESC ve dışarı tıklama kapatma
  useEffect(() => {
    if (!userMenuOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setUserMenuOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [userMenuOpen, setUserMenuOpen]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      toast.error("Çıkış yaptınız."); // 🔹 Toast ekledik
      router.push("/");
    } catch (err) {
      console.error("Çıkış yapılamadı", err);
      toast.error("Çıkış sırasında bir hata oluştu."); // 🔹 Hata toast
    }
  };

  const mainItems = user
    ? [
        { label: "Profil Bilgilerim", href: "/profile", icon: User },
        { label: "Sipariş Geçmişi", href: "/profile/orders", icon: Package },
        { label: "Adres Defteri", href: "/profile/addresses", icon: MapPin },
      ]
    : [];

  return (
    <AnimatePresence>
      {userMenuOpen && (
        <>
          {/* Backdrop: Hafif ve Modern */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setUserMenuOpen(false)}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[100]"
          />

          {/* Sheet (Sağ Panel) */}
          <motion.div
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-8 py-10">
              <span className="text-[10px] tracking-[0.4em] text-zinc-400 uppercase font-bold">
                {user ? "Hesabınız" : "Giriş Paneli"}
              </span>
              <button
                onClick={() => setUserMenuOpen(false)}
                className="group p-2 -mr-2 outline-none"
              >
                <X className="w-5 h-5 text-zinc-400 group-hover:text-black transition-colors duration-300 stroke-[1.5px]" />
              </button>
            </div>

            <div className="flex-1 px-8 overflow-y-auto">
              {user ? (
                /* --- Authenticated User --- */
                <div className="space-y-12">
                  {/* User Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col gap-1"
                  >
                    <h2 className="text-3xl font-light text-zinc-900 italic font-serif leading-tight">
                      {user.name || "Kullanıcı"}
                    </h2>
                    <p className="text-xs text-zinc-400 tracking-wider font-light">
                      {user.email}
                    </p>
                  </motion.div>

                  {/* Menu Links */}
                  <nav className="space-y-1">
                    {mainItems.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setUserMenuOpen(false)}
                          className="group flex items-center justify-between py-5 border-b border-zinc-50"
                        >
                          <div className="flex items-center gap-4">
                            <item.icon className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
                            <span className="text-sm text-zinc-600 group-hover:text-black transition-colors tracking-tight">
                              {item.label}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:translate-x-1 transition-all" />
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  <button
                    className="flex items-center gap-3 text-xs text-zinc-400 hover:text-red-800 transition-colors pt-4 group"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="group-hover:tracking-widest transition-all">
                      Güvenli Çıkış Yap
                    </span>
                  </button>
                </div>
              ) : (
                /* --- Guest --- */
                <div className="space-y-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-xl font-light text-zinc-800 leading-relaxed font-serif italic">
                      Kişiselleştirilmiş bir deneyim için oturum açın veya
                      aramıza katılın.
                    </p>
                  </motion.div>

                  <div className="flex flex-col gap-4 pt-6">
                    <Link
                      href="/login"
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full flex items-center justify-center py-4 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all duration-500"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Giriş Yap
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full flex items-center justify-center py-4 border border-zinc-200 text-black text-xs tracking-[0.2em] uppercase hover:border-black transition-all duration-500"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Hesap Oluştur
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-8 bg-zinc-50">
              <p className="text-[9px] text-zinc-400 tracking-[0.2em] leading-relaxed uppercase">
                Yardıma mı ihtiyacınız var? <br />
                <Link
                  href="/contact"
                  className="text-black border-b border-zinc-300"
                >
                  Müşteri Hizmetleri
                </Link>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
