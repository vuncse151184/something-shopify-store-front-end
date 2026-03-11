"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import type { ShopifyProduct } from "@/types/product"

type Props = {
  product: ShopifyProduct
}

function formatVND(amount: number) {
  return new Intl.NumberFormat('vi-VN').format(amount) + '₫'
}

export default function ProductCard({ product }: Props) {
  const firstImage = product.images[0]?.url
  const firstVariant = product.variants[0]
  const price = firstVariant ? parseFloat(firstVariant.price.amount) : 0
  const compareAtPrice = firstVariant?.compareAtPrice
    ? parseFloat(firstVariant.compareAtPrice.amount)
    : null
  const isOnSale = compareAtPrice && compareAtPrice > price

  return (
    <Link href={`/products/${product.handle}`}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="group relative cursor-pointer"
      >
        {/* Card container */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.08] backdrop-blur-sm transition-all duration-500 group-hover:border-red-500/30 group-hover:shadow-[0_8px_40px_rgba(220,38,38,0.15)]">

          {/* Sale badge */}
          {isOnSale && (
            <div className="absolute top-3 left-3 z-20">
              <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase shadow-lg shadow-red-600/30">
                Giảm giá
              </span>
            </div>
          )}

          {/* Image container */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800">
            {firstImage ? (
              <Image
                src={firstImage}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/20">
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Quick view hint */}
            <div className="absolute bottom-0 inset-x-0 flex justify-center pb-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              <span className="bg-white/90 backdrop-blur-md text-black text-xs font-bold px-4 py-2 rounded-full tracking-wider uppercase">
                Xem chi tiết
              </span>
            </div>
          </div>

          {/* Info section */}
          <div className="p-4">
            <h3 className="font-medium text-sm text-white/90 truncate group-hover:text-white transition-colors duration-300">
              {product.title}
            </h3>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="text-base font-bold tracking-widest text-red-500 font-[var(--font-display)]">
                {formatVND(price)}
              </span>
              {isOnSale && compareAtPrice && (
                <span className="text-xs text-white/30 line-through">
                  {formatVND(compareAtPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}