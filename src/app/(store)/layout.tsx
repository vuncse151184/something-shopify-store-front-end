"use client"

import { useLenis } from "@/hooks/useLenis"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export default function StoreLayout({
  children
}: {
  children: React.ReactNode
}) {
  useLenis()

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}