import { create } from "zustand"

export interface CartItem {
  variantId: string
  title: string
  price: number
  image?: string
  quantity: number
}

interface CartState {
  cartId?: string
  items: CartItem[]
  isOpen: boolean

  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, qty: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,

  addItem: (item, qty = 1) =>
    set((state) => {
      const existing = state.items.find((i) => i.variantId === item.variantId)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.variantId === item.variantId
              ? { ...i, quantity: i.quantity + qty }
              : i
          ),
          isOpen: true,
        }
      }
      return {
        items: [...state.items, { ...item, quantity: qty }],
        isOpen: true,
      }
    }),

  removeItem: (variantId) =>
    set((state) => ({
      items: state.items.filter((i) => i.variantId !== variantId),
    })),

  updateQuantity: (variantId, qty) =>
    set((state) => ({
      items: qty <= 0
        ? state.items.filter((i) => i.variantId !== variantId)
        : state.items.map((i) =>
            i.variantId === variantId ? { ...i, quantity: qty } : i
          ),
    })),

  clearCart: () => set({ items: [] }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
}))

export const selectTotalItems = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.quantity, 0)

export const selectSubtotal = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)