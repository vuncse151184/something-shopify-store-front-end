"use client"

import { use, useState, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, SlidersHorizontal, X } from "lucide-react"
import { useCollection } from "@/hooks/useCollections"
import ProductCard from "@/components/product/ProductCard"
import ShoeFilter, { applyFilters, type ShoeFilters } from "@/components/product/ShoeFilter"

const defaultFilters: ShoeFilters = {
  priceRange: [0, 500],
  sizes: [],
  availability: "all",
  sortBy: "default",
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden bg-white/[0.04] border border-white/[0.06] animate-pulse">
          <div className="aspect-square bg-white/[0.06]" />
          <div className="p-4 space-y-2.5">
            <div className="h-4 bg-white/[0.08] rounded-md w-3/4" />
            <div className="h-4 bg-white/[0.08] rounded-md w-1/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function CollectionDetailPage({
  params: paramsPromise,
}: {
  params: Promise<{ handle: string }>
}) {
  const params = use(paramsPromise)
  const { data: collection, isLoading, error } = useCollection(params.handle)
  const [filters, setFilters] = useState<ShoeFilters>(defaultFilters)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    if (!collection?.products) return []
    return applyFilters(collection.products, filters)
  }, [collection?.products, filters])

  if (error) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
        <p className="text-red-400 text-lg font-bold mb-2">Collection not found</p>
        <p className="text-white/30 text-sm mb-8">The collection you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/collections"
          className="text-red-500 text-xs font-bold tracking-wider uppercase hover:text-red-400 transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={14} />
          All Collections
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Background */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_30%_10%,rgba(220,38,38,0.12),transparent_60%)]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8 pt-28 pb-20">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-white/40 text-xs font-medium tracking-wider uppercase hover:text-white/70 transition-colors"
          >
            <ArrowLeft size={14} />
            All Collections
          </Link>
        </motion.div>

        {/* Header */}
        {isLoading ? (
          <div className="mb-10 space-y-3">
            <div className="h-10 bg-white/[0.06] rounded w-64 animate-pulse" />
            <div className="h-4 bg-white/[0.04] rounded w-96 animate-pulse" />
          </div>
        ) : collection ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-red-500" />
              <span className="text-red-500 text-xs font-bold tracking-[0.3em] uppercase">
                Collection
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-[var(--font-display)] tracking-tight text-white">
              {collection.title}
            </h1>
            {collection.description && (
              <p className="mt-4 text-sm md:text-base text-white/40 max-w-lg">
                {collection.description}
              </p>
            )}
          </motion.div>
        ) : null}

        {/* Mobile filter toggle */}
        {!isLoading && collection && (
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase border border-white/[0.1] bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/70 transition-all"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
          </div>
        )}

        {/* Sidebar + Grid layout */}
        <div className="flex gap-8">
          {/* Left sidebar — desktop */}
          {!isLoading && collection && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block flex-shrink-0 w-[240px]"
            >
              <div className="sticky top-28 bg-white/[0.02] border border-white/[0.08] rounded-2xl p-5">
                <ShoeFilter
                  filters={filters}
                  onChange={setFilters}
                  totalResults={filteredProducts.length}
                />
              </div>
            </motion.aside>
          )}

          {/* Mobile filter drawer */}
          {mobileFilterOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
                onClick={() => setMobileFilterOpen(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed left-0 top-0 h-full w-[300px] bg-neutral-950 border-r border-white/[0.08] z-[61] p-6 overflow-y-auto lg:hidden"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-bold text-white tracking-wider uppercase">Filters</span>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="text-white/40 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>
                <ShoeFilter
                  filters={filters}
                  onChange={setFilters}
                  totalResults={filteredProducts.length}
                />
              </motion.div>
            </>
          )}

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {isLoading && <GridSkeleton />}

            {!isLoading && filteredProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* No results */}
            {!isLoading && collection && filteredProducts.length === 0 && (
              <div className="text-center py-20 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <p className="text-white/40 text-sm">No products match your filters</p>
                <button
                  onClick={() => setFilters(defaultFilters)}
                  className="mt-3 text-red-500 text-xs font-bold tracking-wider uppercase hover:text-red-400 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
