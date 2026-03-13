"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingBag, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useCartStore, selectTotalItems } from "@/store/cart.store"
import CartDrawer from "@/components/cart/CartDrawer"
import Image from "next/image"

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/shop", label: "SHOP" },
  { href: "/collections", label: "COLLECTIONS" },
  { href: "/about", label: "ABOUT" },
]

export default function Navbar() {
  const pathname = usePathname()
  const totalItems = useCartStore(selectTotalItems)
  const { isOpen: cartOpen, toggleCart, closeCart } = useCartStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
          ? "bg-black/80 backdrop-blur-xl  shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 h-20 flex items-center justify-between text-white">

          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="https://res.cloudinary.com/dtov4zdy4/image/upload/v1773218437/ChatGPT_Image_Mar_11_2026_03_37_06_PM_1_iolztk.png"
              alt="Jumpman"
              width={100}
              height={100}
             />
          </Link>

          {/* Center: Nav links */}
          <div className="hidden lg:flex gap-10 text-[13px] font-semibold tracking-[0.25em] uppercase">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-300 ${isActive ? "text-red-500" : "text-white/70 hover:text-white"
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-red-500"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-5">
          <button
            className="text-white/70 hover:text-red-400 transition-colors duration-300"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          <button
            onClick={toggleCart}
            className="relative text-white/70 hover:text-red-400 transition-colors duration-300"
            aria-label="Cart"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-red-600/40"
              >
                {totalItems > 9 ? "9+" : totalItems}
              </motion.span>
            )}
          </button>

          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 border-2 border-white/20 cursor-pointer hover:border-white/40 transition-all duration-300 hidden sm:block" />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white/70 hover:text-white transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-3 text-sm font-semibold tracking-[0.2em] uppercase transition-colors ${isActive
                      ? "text-red-500 border-l-2 border-red-500 pl-4"
                      : "text-white/60 hover:text-white pl-4"
                      }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav >

      {/* Cart Drawer */ }
      < CartDrawer open = { cartOpen } onClose = { closeCart } />
    </>
  )
}
