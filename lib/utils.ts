import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// next/image için güvenli src: DB'de eksik/bozuk bir path varsa (örn. Cloudinary
// yüklemesi başarısız olup default değere düşülmüşse) sayfanın çökmesini önler.
export function getSafeImagePath(image?: string | null) {
  if (!image || image.trim() === "" || image === "default-image.jpg") {
    return "/og-image.png";
  }
  return image.startsWith("http") ? image : "/" + image.replace(/^\/+/, "");
}
