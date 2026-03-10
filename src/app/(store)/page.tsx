import Hero from "@/components/sections/Hero"
import ProductCard from "@/components/product/ProductCard"

export default function HomePage() {
  return (
    <div>
      <Hero />

      <section className="container mx-auto py-24 grid grid-cols-4 gap-8">
        <ProductCard
          name="Nike Air Force 1"
          price={120}
          image="/shoe1.jpg"
        />

        <ProductCard
          name="Adidas Ultraboost"
          price={180}
          image="/shoe2.jpg"
        />

        <ProductCard
          name="Jordan 1 Retro"
          price={200}
          image="/shoe3.jpg"
        />

        <ProductCard
          name="New Balance 550"
          price={150}
          image="/shoe4.jpg"
        />
      </section>
    </div>
  )
}