"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogOut, User, MapPin, Package } from "lucide-react";
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
      <div className="flex flex-col py-12 px-6 md:px-8 h-full border-r border-zinc-100">
        {/* User Identity Section */}
        <div className="mb-16">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-3 w-16 bg-zinc-50" />
              <Skeleton className="h-6 w-32 bg-zinc-50" />
            </div>
          ) : (
            <div className="flex flex-col">
              <span className="text-[10px] tracking-[0.3em] text-zinc-400 uppercase font-light mb-2">
                Hoş Geldiniz
              </span>
              <h2 className="text-xl font-extralight tracking-tight text-zinc-900 uppercase">
                {user ? `${user.name} ${user.surname}` : "Misafir"}
              </h2>
              {user && (
                <button
                  onClick={handleLogout}
                  className="mt-6 flex items-center gap-2 text-[10px] tracking-widest text-zinc-400 hover:text-zinc-950 transition-colors duration-300 uppercase"
                >
                  <LogOut size={12} strokeWidth={1.5} />
                  <span>Güvenli Çıkış</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-12">
          {Object.entries(menuItems).map(([category, items]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-[10px] tracking-[0.4em] text-zinc-300 font-medium uppercase">
                {category}
              </h3>
              <ul className="space-y-1">
                {items.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        className={cn(
                          "group flex items-center gap-4 py-3 text-sm transition-all duration-500 relative",
                          isActive
                            ? "text-zinc-950 font-medium"
                            : "text-zinc-400 hover:text-zinc-950"
                        )}
                      >
                        <item.icon
                          size={16}
                          strokeWidth={isActive ? 1.5 : 1}
                          className={cn(
                            "transition-colors",
                            isActive
                              ? "text-zinc-950"
                              : "text-zinc-300 group-hover:text-zinc-950"
                          )}
                        />
                        <span className="tracking-tight font-light">
                          {item.name}
                        </span>

                        {/* Active Indicator Line */}
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute left-[-24px] md:left-[-32px] w-1 h-4 bg-zinc-950"
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
      </div>
    </aside>
  );
}
