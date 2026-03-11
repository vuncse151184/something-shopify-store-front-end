"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { X, Minus, Plus, ShoppingBag, Loader2 } from "lucide-react"
import { useCartStore, selectTotalItems, selectSubtotal } from "@/store/cart.store"
import { useCheckout } from "@/hooks/useCheckout"

export default function CartDrawer({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) {
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const totalItems = useCartStore(selectTotalItems)
  const subtotal = useCartStore(selectSubtotal)
  const { checkout, loading: checkoutLoading, error: checkoutError } = useCheckout()

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-neutral-950 border-l border-white/[0.08] shadow-2xl z-[61] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-red-500" />
                <h2 className="text-lg font-bold font-[var(--font-display)] tracking-wider uppercase text-white">
                  Your Cart
                </h2>
                {totalItems > 0 && (
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-white/10 mb-4" />
                  <p className="text-white/40 text-sm">Your cart is empty</p>
                  <Link
                    href="/"
                    onClick={onClose}
                    className="mt-4 text-red-500 text-xs font-bold tracking-wider uppercase hover:text-red-400 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.variantId}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-neutral-900 flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/10">
                            <ShoppingBag size={20} />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-white/90 truncate">
                          {item.title}
                        </h3>
                        <p className="text-red-500 text-sm font-bold font-[var(--font-display)] mt-1">
                          ${item.price.toFixed(2)}
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="w-7 h-7 rounded-md bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white/60 hover:text-white hover:border-red-500/30 transition-all"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm text-white/80 w-6 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="w-7 h-7 rounded-md bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white/60 hover:text-white hover:border-red-500/30 transition-all"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-white/30 hover:text-red-500 transition-colors self-start mt-1"
                        aria-label="Remove item"
                      >
                        <X size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/[0.08] px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/50 uppercase tracking-wider">Subtotal</span>
                  <span className="text-lg font-bold text-white font-[var(--font-display)]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {checkoutError && (
                  <div className="p-2.5 rounded-lg bg-red-600/10 border border-red-600/20 text-red-400 text-xs">
                    {checkoutError}
                  </div>
                )}

                <button
                  onClick={() => checkout()}
                  disabled={checkoutLoading}
                  className="block w-full py-4 bg-red-600 text-white text-center text-sm font-bold tracking-[0.15em] uppercase rounded-lg hover:bg-red-500 transition-all duration-300 shadow-lg shadow-red-600/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {checkoutLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Checkout"
                  )}
                </button>

                <button
                  onClick={onClose}
                  className="block w-full py-3 text-center text-xs text-white/40 tracking-wider uppercase hover:text-white/60 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}