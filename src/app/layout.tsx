import type { Metadata } from "next";
import { Noto_Sans_JP, Shippori_Mincho } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { profile } from "../data/profile";
import { site } from "../data/site";
import { buildJsonLd } from "../lib/jsonld";
import "./globals.css";

const sansJp = Noto_Sans_JP({
  variable: "--font-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const mincho = Shippori_Mincho({
  variable: "--font-mincho",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const description = `${profile.name}（${profile.romaji}）の${site.modeLabel[site.mode].ja}。Instagram・TikTokの最新情報とスケジュールをまとめています。`;

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: `${profile.name}（${profile.romaji}）スケジュール 2026 | Instagram・TikTok`,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: site.siteName,
    description,
    url: site.siteUrl,
    siteName: site.siteName,
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.siteName,
    description,
    images: [site.ogImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = buildJsonLd();

  return (
    <html lang="ja">
      <body className={`${sansJp.variable} ${mincho.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
