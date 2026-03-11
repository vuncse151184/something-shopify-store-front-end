"use client"

import { useState } from "react"
import { useCartStore } from "@/store/cart.store"

export function useCheckout() {
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkout = async () => {
    if (!items.length) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/cart/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
          })),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Checkout failed")
      }

      const { checkoutUrl } = await response.json()

      clearCart()

      // Redirect to Shopify hosted checkout
      window.location.href = checkoutUrl
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setLoading(false)
    }
  }

  return { checkout, loading, error }
}
