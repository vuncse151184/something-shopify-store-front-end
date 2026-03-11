"use client"

import { motion } from "framer-motion"
import { ShoppingBag, Loader2 } from "lucide-react"
import { useState } from "react"
import { useCartStore } from "@/store/cart.store"

type Props = {
  variantId: string
  title: string
  price: number
  image?: string
  disabled?: boolean
}

export default function AddToCartButton({ variantId, title, price, image, disabled }: Props) {
  const addItem = useCartStore((s) => s.addItem)
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)

  const handleClick = async () => {
    if (!variantId || disabled) return

    setLoading(true)
    // Simulate a brief delay for tactile feedback
    await new Promise((r) => setTimeout(r, 300))
    addItem({ variantId, title, price, image })
    setLoading(false)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`flex items-center justify-center gap-3 w-full py-4 rounded-lg text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
        disabled
          ? "bg-white/[0.06] text-white/20 cursor-not-allowed"
          : added
          ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
          : "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/20"
      }`}
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : added ? (
        <>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
           Đã thêm vào giỏ
        </>
      ) : (
        <>
          <ShoppingBag size={18} />
           Thêm vào giỏ
        </>
      )}
    </motion.button>
  )
}
