import ProductGallery from "@/components/product/ProductGallery"
import VariantSelector from "@/components/product/VariantSelector"
import MagneticButton from "@/components/ui/MagneticButton"

export default function ProductPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-2 gap-16">

      <ProductGallery />

      <div>

        <h1 className="text-4xl font-bold">
          Nike Air Force 1
        </h1>

        <p className="text-xl text-gray-500 mt-3">
          $120
        </p>

        <p className="mt-6 text-gray-600">
          Iconic design with premium leather construction.
        </p>

        <VariantSelector />

        <div className="mt-10">
          <MagneticButton>
            <button className="px-8 py-4 bg-black text-white rounded-full">
              Add to Cart
            </button>
          </MagneticButton>
        </div>

      </div>

    </div>
  )
}