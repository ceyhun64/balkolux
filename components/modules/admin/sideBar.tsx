"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  LogOut,
  Menu,
  X,
  FileText,
  Settings,
  Bell,
  ChevronRight,
  Ticket,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

export default function AdminSidebar(): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const [isOpen, setIsOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Genel Bakış",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
    },
    {
      id: "products",
      label: "Ürün Yönetimi",
      icon: Package,
      href: "/admin/products",
    },
    {
      id: "orders",
      label: "Siparişler",
      icon: ShoppingCart,
      href: "/admin/orders",
    },
    { id: "users", label: "Müşteriler", icon: Users, href: "/admin/users" },
    {
      id: "blogs",
      label: "Blog Yazıları",
      icon: FileText,
      href: "/admin/blogs",
    },
    {
      id: "subscribers",
      label: "Aboneler",
      icon: Bell,
      href: "/admin/subscribers",
    },
    {
      id: "coupon",
      label: "Kuponlar",
      icon: Ticket,
      href: "/admin/coupon",
    },
    {
      id: "settings",
      label: "Sistem Ayarları",
      icon: Settings,
      href: "/admin/banner",
    },
  ];

  const activeId = menuItems.find(
    (item) => pathname === item.href || pathname.startsWith(item.href + "/")
  )?.id;

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (!res.ok) throw new Error();
      toast.success("Güvenli çıkış yapıldı", {
        description: "Yönetici oturumunuz sonlandırıldı.",
      });
      router.push("/admin");
    } catch (error) {
      toast.error("Çıkış yapılırken bir hata oluştu.");
    }
  };

  const NavContent = (isMobile = false) => (
    <div className="flex flex-col h-full bg-white px-5 py-8">
      {/* Brand Logo */}
      <div className="px-3 mb-12">
        <Link
          href="/admin/dashboard"
          className="inline-block hover:opacity-80 transition-opacity"
        >
          <Image
            src="/logo/logoblack.webp"
            alt="BalkoLüx Logo"
            width={140}
            height={36}
            priority
            className="h-auto w-auto"
          />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1 relative">
        {menuItems.map(({ id, label, icon: Icon, href }) => {
          const isActive = activeId === id;
          return (
            <Link
              key={id}
              href={href}
              onClick={() => isMobile && setIsOpen(false)}
              className={`relative flex items-center justify-between group px-4 py-3 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "text-zinc-950"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
              }`}
            >
              {/* Active Background Animation */}
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-zinc-100/80 rounded-2xl z-0"
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <div className="flex items-center gap-3.5 z-10">
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={
                    isActive
                      ? "text-zinc-950"
                      : "text-zinc-400 group-hover:text-zinc-600 transition-colors"
                  }
                />
                <span
                  className={`text-[13.5px] tracking-tight ${
                    isActive ? "font-bold" : "font-medium"
                  }`}
                >
                  {label}
                </span>
              </div>

              {isActive && (
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="z-10"
                >
                  <ChevronRight size={14} className="text-zinc-400" />
                </motion.div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Profile & Logout Section */}
      <div className="mt-auto pt-6 border-t border-zinc-100">
        <div className="flex items-center gap-3 px-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white font-bold text-xs">
            AD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-zinc-900 leading-none">
              Yönetici
            </span>
            <span className="text-[11px] text-zinc-400 mt-1 font-medium">
              BalkoLüx Admin Panel
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="group flex items-center gap-3 w-full px-4 py-3.5 text-sm font-semibold text-zinc-500 hover:text-red-600 hover:bg-red-50/50 rounded-2xl transition-all duration-200"
        >
          <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center group-hover:bg-red-50 transition-colors">
            <LogOut size={16} />
          </div>
          <span>Oturumu Kapat</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 w-[280px] h-screen bg-white border-r border-zinc-100 hidden md:block z-50">
        {NavContent()}
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white/70 backdrop-blur-xl border-b border-zinc-100 px-6 py-4 z-40 flex justify-between items-center">
        <Image src="/logo/logoblack.webp" alt="logo" width={100} height={26} />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(true)}
          className="rounded-xl bg-zinc-50 hover:bg-zinc-100"
        >
          <Menu size={20} className="text-zinc-900" />
        </Button>
      </div>

      {/* Mobile Sidebar Overlay & Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-zinc-950/30 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed left-0 top-0 w-[300px] h-screen bg-white z-[70] md:hidden shadow-2xl border-r border-zinc-100"
            >
              <div className="absolute top-8 right-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-zinc-100"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={20} className="text-zinc-500" />
                </Button>
              </div>
              {NavContent(true)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
