"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogOut, User, MapPin, Package, Truck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface User {
  name: string;
  surname: string;
}

interface MenuItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  const menuItems: Record<string, MenuItem[]> = {
    HESABIM: [
      { name: "Profil Detayları", path: "/profile", icon: User },
      { name: "Kayıtlı Adresler", path: "/profile/addresses", icon: MapPin },
    ],
    ALIŞVERİŞ: [
      { name: "Sipariş Geçmişi", path: "/profile/orders", icon: Package },
      { name: "Kargo Takip", path: "/profile/cargo_tracking", icon: Truck },
    ],
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/account/check");
        const data = await res.json();
        setUser(data.user || null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      toast.success("Oturum güvenle kapatıldı.");
      router.push("/");
    } catch {
      toast.error("Bir hata oluştu.");
    }
  };

  return (
    <aside className="w-full md:w-64 lg:w-72 md:min-h-screen bg-white">
      <div className="flex flex-col py-16 px-8 md:px-10 h-full border-r border-zinc-100/60">
        {/* User Identity Section */}
        <div className="mb-20">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-2 w-12 bg-zinc-50" />
              <Skeleton className="h-5 w-24 bg-zinc-50" />
            </div>
          ) : (
            <div className="flex flex-col group">
              <span className="text-[9px] tracking-[0.4em] text-zinc-400 uppercase font-medium mb-3">
                Üyelik Paneli
              </span>
              <h2 className="text-lg font-light tracking-tight text-zinc-900 uppercase">
                {user ? `${user.name} ${user.surname}` : "Misafir"}
              </h2>
              {user && (
                <button
                  onClick={handleLogout}
                  className="mt-6 flex items-center gap-2 text-[9px] tracking-[0.2em] text-zinc-400 hover:text-red-400 transition-all duration-300 uppercase w-fit"
                >
                  <LogOut size={11} strokeWidth={1} />
                  <span className="border-b border-transparent hover:border-red-400/30">
                    Çıkış Yap
                  </span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-16">
          {Object.entries(menuItems).map(([category, items]) => (
            <div key={category} className="space-y-6">
              <h3 className="text-[9px] tracking-[0.5em] text-zinc-400 font-semibold uppercase">
                {category}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        className={cn(
                          "group flex items-center gap-4 py-2 text-[13px] transition-all duration-300 relative",
                          isActive
                            ? "text-zinc-950"
                            : "text-zinc-500 hover:text-zinc-950"
                        )}
                      >
                        <item.icon
                          size={15}
                          strokeWidth={isActive ? 1.5 : 1}
                          className={cn(
                            "transition-all duration-300",
                            isActive
                              ? "text-zinc-950"
                              : "text-zinc-300 group-hover:text-zinc-950"
                          )}
                        />
                        <span
                          className={cn(
                            "tracking-wide transition-transform duration-300",
                            isActive
                              ? "translate-x-1"
                              : "group-hover:translate-x-1"
                          )}
                        >
                          {item.name}
                        </span>

                        {/* Minimalist Active Indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute left-[-32px] md:left-[-40px] w-[2px] h-3 bg-zinc-950"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer Area - Optional refinement */}
        <div className="mt-auto pt-10">
          <p className="text-[8px] tracking-widest text-zinc-200 uppercase">
            v1.0.4 BalkoLüx Access
          </p>
        </div>
      </div>
    </aside>
  );
}
