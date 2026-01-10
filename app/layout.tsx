import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";
import ScrollToTopButton from "@/components/layout/scrollToTop";
import { CartProvider } from "@/contexts/cartContext";
import { FavoriteProvider } from "@/contexts/favoriteContext";
import { Toaster } from "sonner";
import CookieConsent from "@/components/layout/cookieConsent";

// ✅ Font optimizasyonu
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  preload: true,
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1a1a1a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://balkolux.com"),

  title: {
    default:
      "BalkoLüx | Lüks Bahçe ve Balkon Mobilyaları – Oturma Takımları, Salıncak ve Barbekü",
    template: "%s | BalkoLüx",
  },

  description:
    "BalkoLüx ile dış mekan yaşamınızı sanata dönüştürün. Premium bahçe oturma takımları, yemek masaları, lüks salıncaklar, şezlonglar ve profesyonel barbekü sistemleri. Uşak'ın dünyaya açılan mobilya markası.",

  keywords: [
    "bahçe mobilyası",
    "balkon mobilyaları",
    "dış mekan oturma grubu",
    "bahçe masası",
    "bahçe salıncağı",
    "lüks şezlong",
    "bahçe şemsiyesi",
    "barbekü modelleri",
    "rattan mobilya",
    "alüminyum bahçe takımı",
    "teak bahçe mobilyası",
    "Uşak mobilya mağazası",
    "BalkoLüx",
    "konforlu dış mekan",
    "bahçe dekorasyonu",
  ],

  authors: [{ name: "BalkoLüx" }],
  creator: "BalkoLüx",
  publisher: "BalkoLüx",

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://balkolux.com",
    siteName: "BalkoLüx Bahçe Mobilyaları",
    title: "BalkoLüx | Dış Mekan Yaşamında Lüks ve Konfor",
    description:
      "Oturma takımlarından barbekülere, dış mekan dair her şey. BalkoLüx premium koleksiyonunu keşfedin.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BalkoLüx Lüks Bahçe Mobilyaları",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "BalkoLüx | Lüks Bahçe ve Balkon Mobilyaları",
    description:
      "Bahçenize zarafet katan oturma grupları ve salıncak modelleri BalkoLüx'te.",
    images: ["/og-image.png"],
  },

  alternates: {
    canonical: "https://balkolux.com",
  },

  category: "furniture",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeJsonLd = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: "BalkoLüx",
    description: "Premium Bahçe, Balkon ve Teras Mobilyaları Mağazası.",
    url: "https://balkolux.com",
    logo: "https://balkolux.com/logo/og-image.png",
    image: "https://balkolux.com/og-image.png",
    telephone: "+90-276-XXX-XXXX",
    email: "balkoluxofficial@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mobilyacılar Sitesi No:XX",
      addressLocality: "Uşak",
      addressRegion: "Uşak",
      postalCode: "64000",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "38.6823",
      longitude: "29.4082",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    priceRange: "₺₺₺",
  };

  return (
    <html
      lang="tr"
      className={`${playfairDisplay.variable} ${geistSans.variable}`}
    >
      <head>
        {/* ✅ Favicon & Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* ✅ Preconnect - Font yükleme hızlandırma */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* ✅ LCP görseli preload */}
        <link
          rel="preload"
          as="image"
          href="/heroes/1.0.avif"
          type="image/avif"
          fetchPriority="high"
        />

        {/* ✅ JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.className} ${playfairDisplay.variable} antialiased text-neutral-900 bg-white`}
      >
        <CartProvider>
          <FavoriteProvider>
            <ClientLayoutWrapper>
              <main className="min-h-screen font-sans">
                {children}
                <CookieConsent />
              </main>
            </ClientLayoutWrapper>

            <ScrollToTopButton />
            <Toaster
              richColors={false}
              closeButton={false}
              position="bottom-right"
              toastOptions={{
                style: {
                  borderRadius: "0px",
                  padding: "14px 26px",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.65))",
                  backdropFilter: "blur(16px) saturate(180%)",
                  WebkitBackdropFilter: "blur(16px) saturate(180%)",
                  color: "#111111",
                  border: "none",
                  outline: "none",
                  boxShadow:
                    "0 8px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)",
                  fontFamily: "var(--font-geist-sans), sans-serif",
                  fontSize: "12px",
                  fontWeight: "500",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  minWidth: "260px",
                  lineHeight: "1.6",
                },
              }}
            />
          </FavoriteProvider>
        </CartProvider>
      </body>
    </html>
  );
}
