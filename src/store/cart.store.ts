import { create } from "zustand"

interface CartItem {
  variantId: string
  quantity: number
}

interface CartState {
  cartId?: string
  items: CartItem[]
  addItem: (variantId: string, qty: number) => void
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: (variantId, qty) =>
    set((state) => ({
      items: [...state.items, { variantId, quantity: qty }]
    }))
}))