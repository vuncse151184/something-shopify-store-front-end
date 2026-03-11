import "./globals.css"
import { ReactNode } from "react"
import { Providers } from "./providers"
import { Geist, Oswald } from "next/font/google";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://something.store"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Something Store — Exclusive Sneakers & Streetwear",
    template: "%s | Something Store",
  },
  description:
    "Shop exclusive sneakers, streetwear, and curated collections. Authentic products, fast shipping, and a premium shopping experience.",
  keywords: [
    "sneakers", "streetwear", "shoes", "exclusive sneakers",
    "limited edition", "sneaker store", "buy sneakers online",
  ],
  authors: [{ name: "Something Store" }],
  creator: "Something Store",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Something Store",
    title: "Something Store — Exclusive Sneakers & Streetwear",
    description:
      "Shop exclusive sneakers, streetwear, and curated collections. Authentic products, fast shipping.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Something Store — Exclusive Sneakers & Streetwear",
    description:
      "Shop exclusive sneakers, streetwear, and curated collections.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const geist = Geist({subsets:['latin'],variable:'--font-sans'});
const oswald = Oswald({subsets:['latin'],variable:'--font-display', weight:['400','500','600','700']});

export default function RootLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable, oswald.variable)}>
      <body className="bg-black text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}