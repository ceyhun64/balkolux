"use client";

import Link from "next/link";
import {
  User,
  MapPin,
  Package,
  X,
  ChevronRight,
  LogOut,
  CreditCard,
  Settings,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface UserMegaMenuProps {
  userMenuOpen: boolean;
  setUserMenuOpen: (open: boolean) => void;
}

export default function UserMegaMenu({
  userMenuOpen,
  setUserMenuOpen,
}: UserMegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [user, setUser] = useState<{
    name?: string;
    surname?: string;
    email?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const checkUserStatus = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/account/check", { cache: "no-store" });
      const data = await res.json();
      setUser(data.user || null);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userMenuOpen) checkUserStatus();
  }, [userMenuOpen, checkUserStatus]);

  useEffect(() => {
    if (!userMenuOpen) return;
    const handleEsc = (e: KeyboardEvent) =>
      e.key === "Escape" && setUserMenuOpen(false);
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [userMenuOpen, setUserMenuOpen]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    setUser(null);
    setUserMenuOpen(false);
    toast.success("Oturum kapatıldı.");
    router.refresh();
  };

  const menuItems = [
    { label: "Profilim", href: "/profile", icon: User },
    { label: "Siparişlerim", href: "/profile/orders", icon: Package },
    { label: "Adreslerim", href: "/profile/addresses", icon: MapPin },
    { label: "Ödemeler", href: "/profile/payments", icon: CreditCard },
  ];

  return (
    <AnimatePresence>
      {userMenuOpen && (
        <>
          {/* Sofistike Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setUserMenuOpen(false)}
            className="fixed inset-0 bg-stone-900/10 backdrop-blur-[2px] z-[100]"
          />

          <motion.div
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-[380px] bg-zinc-100 z-[101] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.05)]"
          >
            {/* Header: Minimalist & Clean */}
            <div className="px-10 pt-12 pb-6 flex justify-between items-baseline">
              <span className="text-[9px] tracking-[0.5em] text-stone-400 uppercase font-medium">
                {user ? "Hesap" : "BalkoLüx"}
              </span>
              <button
                onClick={() => setUserMenuOpen(false)}
                className="text-stone-500 hover:text-stone-900 transition-colors"
              >
                <X size={18} strokeWidth={1} />
              </button>
            </div>

            <div className="flex-1 px-10 overflow-y-auto">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <span className="text-[10px] tracking-widest text-stone-300 animate-pulse uppercase">
                    Yükleniyor
                  </span>
                </div>
              ) : user ? (
                /* --- AUTH STATE --- */
                <div className="py-12 flex flex-col h-full">
                  <motion.header
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                  >
                    <h2 className="text-3xl font-serif italic text-stone-900">
                      {user.name} {user.surname}
                    </h2>
                    <p className="text-[11px] text-stone-400 mt-2 tracking-wide font-light">
                      {user.email}
                    </p>
                  </motion.header>

                  <nav className="space-y-1">
                    {menuItems.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        onClick={() => setUserMenuOpen(false)}
                        className="group flex items-center justify-between py-5 border-b border-stone-50"
                      >
                        <span className="text-sm font-light text-stone-600 group-hover:text-stone-900 transition-colors tracking-tight">
                          {item.label}
                        </span>
                        <ArrowRight
                          size={14}
                          className="text-stone-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                        />
                      </Link>
                    ))}
                  </nav>

                  <button
                    onClick={handleLogout}
                    className="mt-auto mb-10 text-[10px] tracking-[0.2em] text-stone-400 hover:text-stone-900 transition-colors uppercase py-4"
                  >
                    Oturumu Kapat
                  </button>
                </div>
              ) : (
                /* --- GUEST STATE --- */
                <div className="py-12 h-full flex flex-col">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 flex flex-col justify-center"
                  >
                    <h3 className="text-4xl font-serif italic text-stone-900 leading-[1.1] mb-8">
                      Zarafet, <br /> detaylarda gizlidir.
                    </h3>

                    <div className="space-y-6">
                      <Link
                        href="/login"
                        onClick={() => setUserMenuOpen(false)}
                        className="block text-sm font-light text-stone-900 border-b border-stone-900 w-fit pb-1 hover:text-stone-500 hover:border-stone-500 transition-all"
                      >
                        Giriş Yapın
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setUserMenuOpen(false)}
                        className="block text-sm font-light text-stone-900 border-b border-stone-900 w-fit pb-1 hover:text-stone-500 hover:border-stone-500 transition-all"
                      >
                        Hesap Oluşturun
                      </Link>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-10 py-10">
              <Link
                href="/contact"
                className="text-[10px] text-stone-400 hover:text-stone-900 transition-colors uppercase tracking-[0.2em]"
              >
                Müşteri Deneyimi
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
