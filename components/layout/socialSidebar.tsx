"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Instagram, Facebook, MessageCircle, Phone } from "lucide-react";

export default function SocialSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("socialSidebarOpen");
    if (stored !== null) setIsOpen(stored === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("socialSidebarOpen", String(isOpen));
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const whatsappNumber = "+90 546 225 56 59";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^\d]/g, "")}`;

  const socialLinks = [
    {
      name: "Instagram",
      link: "https://www.instagram.com/balkolux",
      icon: Instagram,
    },
    {
      name: "Facebook",
      link: "https://www.facebook.com/p/Balkol%C3%BCx-Balkon-Bah%C3%A7e-Mobilyalar%C4%B1-61561591640222/",
      icon: Facebook,
    },
    { name: "WhatsApp", link: whatsappLink, icon: MessageCircle },
    { name: "Telefon", link: `tel:${whatsappNumber}`, icon: Phone },
  ];

  return (
    <div className="fixed left-6 bottom-8 z-50 flex flex-col items-center">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex flex-col items-center gap-5 mb-6"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {socialLinks.map((item, idx) => (
              <motion.a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative flex items-center justify-center"
              >
             
                {/* Icon Container */}
                <div className="w-10 h-10 rounded-full border border-zinc-300 bg-white/80 flex items-center justify-center text-zinc-900 group-hover:text-stone-900 group-hover:border-stone-900 group-hover:shadow-sm transition-all duration-500">
                  <item.icon size={18} strokeWidth={1.2} />
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleSidebar}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full bg-zinc-800 text-white shadow-2xl flex items-center justify-center transition-colors hover:bg-stone-800"
        aria-label="İletişim Kanalları"
      >
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Plus size={24} strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </div>
  );
}
