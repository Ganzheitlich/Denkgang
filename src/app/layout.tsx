import type { Metadata } from "next";
import { Source_Serif_4, IBM_Plex_Sans } from "next/font/google";
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${sourceSerif.variable} ${plexSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
