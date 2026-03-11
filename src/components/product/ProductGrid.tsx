"use client"

import { motion, type Variants } from "framer-motion"
import { useProducts } from "@/hooks/useProducts"
import ProductCard from "./ProductCard"

function ProductSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white/[0.04] border border-white/[0.06] animate-pulse">
      <div className="aspect-square bg-white/[0.06]" />
      <div className="p-4 space-y-2.5">
        <div className="h-4 bg-white/[0.08] rounded-md w-3/4" />
        <div className="h-4 bg-white/[0.08] rounded-md w-1/3" />
      </div>
    </div>
  )
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

export default function ProductGrid() {
  const { data: products, isLoading, error } = useProducts()

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 text-sm">Không thể tải sản phẩm</p>
        <p className="text-white/30 text-xs mt-1">Vui lòng thử lại sau</p>
      </div>
    )
  }

  if (isLoading || !products) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerVariants}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  )
}