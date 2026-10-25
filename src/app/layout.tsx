import type { Metadata, Viewport } from "next";
import { Source_Serif_4, IBM_Plex_Sans } from "next/font/google";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Denkgang — Klinisches Denken trainieren",
  description:
    "Klinisches Denken trainieren, nicht nur Fakten pauken — ein Lernprodukt fuer angehende und praktizierende Tierphysiotherapeut:innen.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Denkgang",
  },
};

export const viewport: Viewport = {
  themeColor: "#1d5c52",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${sourceSerif.variable} ${plexSans.variable}`}>
      <body>
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
