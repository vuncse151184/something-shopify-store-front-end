"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingCart, User } from "lucide-react"

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/70 border-b"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">

        <Link href="/" className="font-bold text-xl tracking-tight">
          SomethingStore
        </Link>

        <div className="flex gap-8 text-sm font-medium">
          <Link href="/products">Shop</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/about">About</Link>
        </div>

        <div className="flex items-center gap-6">
          <User size={20} />
          <ShoppingCart size={20} />
        </div>

      </div>
    </motion.nav>
  )
}