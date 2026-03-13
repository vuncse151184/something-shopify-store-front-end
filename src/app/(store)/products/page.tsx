import type { Metadata } from "next"
import ProductCard from "@/components/product/ProductCard"
import JsonLd from "@/components/seo/JsonLd"
import {
  buildLocaleAlternates,
  buildProductListSchema,
  getMetadataImages,
  siteConfig,
} from "@/lib/seo"
import { getProducts } from "@/services/product.service"
import { ShopifyProduct } from "@/types/product" 

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Tất cả sản phẩm sneaker chính hãng",
  description:
    "Khám phá toàn bộ giày sneaker và streetwear chính hãng tại Something Store, tối ưu cho khách hàng mua sắm tại Việt Nam.",
  keywords: [
    "tất cả sản phẩm sneaker",
    "giày sneaker chính hãng",
    "mua sneaker Việt Nam",
    "Something Store",
  ],
  alternates: buildLocaleAlternates("/products"),
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: `${siteConfig.url}/products`,
    siteName: siteConfig.name,
    title: "Tất cả sản phẩm | Something Store",
    description:
      "Khám phá toàn bộ giày sneaker và streetwear chính hãng tại Something Store, tối ưu cho khách hàng mua sắm tại Việt Nam.",
    images: getMetadataImages(undefined, "Tất cả sản phẩm | Something Store"),
  },
}

export default async function ProductsPage() {
  let products: ShopifyProduct[] = []
  let hasError = false

  try {
    products = await getProducts()
  } catch {
    hasError = true
  }

  return (
    <div className="min-h-screen bg-black">
      {products.length > 0 && (
        <JsonLd
          data={buildProductListSchema("Tất cả sản phẩm Something Store", "/products", products)}
        />
      )}

      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_50%_0%,rgba(220,38,38,0.15),transparent_60%)]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8 pt-28 pb-20">
        <div className="mb-14 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-red-500" />
            <span className="text-red-500 text-xs font-bold tracking-[0.3em] uppercase">
              Danh mục sản phẩm
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-[var(--font-display)] tracking-tight text-white">
            Sneaker chính hãng cho thị trường Việt Nam
          </h1>
          <p className="mt-4 text-sm md:text-base text-white/40 max-w-2xl leading-relaxed">
            Tập hợp những mẫu sneaker, streetwear và phối màu nổi bật đang có tại Something Store.
            Tối ưu cho người mua tại Việt Nam với tư vấn nhanh, giao hàng toàn quốc và sản phẩm chính hãng.
          </p>
        </div>

        {hasError && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-10 text-center">
            <p className="text-red-400 text-sm">Không thể tải danh sách sản phẩm lúc này</p>
            <p className="text-white/30 text-xs mt-1">Vui lòng thử lại sau</p>
          </div>
        )}

        {!hasError && products.length === 0 && (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-12 text-center">
            <p className="text-white/50">Danh mục đang được cập nhật</p>
          </div>
        )}

        {products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
