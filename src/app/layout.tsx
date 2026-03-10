import "./globals.css"
import { ReactNode } from "react"
import { Providers } from "./providers"
import { Geist, Oswald } from "next/font/google";
import { cn } from "@/lib/utils";

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