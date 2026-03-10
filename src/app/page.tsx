import SneakerHero from "@/components/sections/SneakerHero"
import HeroNavbar from "@/components/layout/HeroNavbar"
import FeaturedProducts from "@/components/sections/FeaturedProducts"

export default function Home() {
  return (
    <>
      <HeroNavbar />
      <SneakerHero />
      <FeaturedProducts />
    </>
  )
}