import type { Metadata } from "next"
import SneakerHero from "@/components/sections/SneakerHero"
import HeroNavbar from "@/components/layout/HeroNavbar"
import FeaturedProducts from "@/components/sections/FeaturedProducts"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Something Store — Exclusive Sneakers & Streetwear",
  description:
    "Discover exclusive sneakers, limited-edition drops, and curated streetwear collections. Authentic products and fast shipping.",
  alternates: { canonical: "/" },
}

export default function Home() {
  return (
    <>
      <Navbar />
      <SneakerHero />
      <FeaturedProducts />
      <Footer />
    </>
  )
}