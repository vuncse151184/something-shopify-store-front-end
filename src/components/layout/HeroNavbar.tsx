"use client"

import { Search, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"

export default function HeroNavbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="absolute top-0 left-0 w-full z-50"
    >
      <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between text-white">

        {/* Left: Jumpman + Nike logos */}
        <div className="flex items-center gap-4">
          {/* Jumpman silhouette SVG */}
          <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24">
            <path d="M15.9 2.3c-.1-.1-.3-.2-.5-.1-.2 0-.3.2-.3.4l.4 2.6c0 .2-.1.3-.2.4l-3.2 1.7c-.1.1-.2.1-.3.1L8.5 6.8c-.2-.1-.4 0-.4.2l-.3 2.7c0 .2-.2.3-.3.3L4.8 11c-.2.1-.3.3-.2.5l1 2.5c.1.2 0 .3-.1.4l-2.2 1.7c-.2.1-.2.3-.1.5l1.5 2.3c.1.2.1.3 0 .4L3 21.6c-.1.2 0 .4.2.5l2.6.6c.2 0 .3.2.3.3l.2 2.7c0 .2.2.4.4.3l2.6-.8c.2-.1.3 0 .4.1l1.6 2.2c.1.2.3.2.5.1l2.3-1.5c.2-.1.3-.1.4 0l2.3 1.5c.2.1.4.1.5-.1l1.6-2.2c.1-.2.3-.2.4-.1l2.6.8c.2.1.4-.1.4-.3l.2-2.7c0-.2.2-.3.3-.3l2.6-.6c.2 0 .3-.3.2-.5l-1.5-2.3c-.1-.2-.1-.3 0-.4l1.5-2.3c.1-.2.1-.4-.2-.5l-2.7-.9c-.2-.1-.3-.2-.3-.3l-.3-2.7c0-.2-.2-.3-.4-.2l-3.3.6c-.1 0-.2 0-.3-.1L17 5.3c-.1-.1-.2-.3-.2-.4l.4-2.6z" transform="scale(0.75) translate(4, 0)" />
          </svg>
          {/* Nike Swoosh SVG */}
          <svg className="w-12 h-5 fill-white" viewBox="0 0 69 32">
            <path d="M68.56 4.06L20.59 29.83c-4.88 2.52-9.31 2.73-12.46.52-3.15-2.2-4.63-6.52-3.77-12.2L.11 19.72C-.63 26.5.76 31.18 4.87 33.47c4.1 2.3 9.85 1.58 15.87-1.55L68.56 4.06z" />
          </svg>
        </div>

        {/* Center: Nav links */}
        <div className="hidden md:flex gap-10 text-[13px] font-semibold tracking-[0.25em] uppercase">
          <a href="#" className="text-red-500 border-b-2 border-red-500 pb-1 transition-colors">HOME</a>
          <a href="#" className="hover:text-red-400 transition-colors cursor-pointer">MAN</a>
          <a href="#" className="hover:text-red-400 transition-colors cursor-pointer">WOMAN</a>
          <a href="#" className="hover:text-red-400 transition-colors cursor-pointer">KIDS</a>
          <a href="#" className="hover:text-red-400 transition-colors cursor-pointer">SALE</a>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-5">
          <button className="hover:text-red-400 transition-colors" aria-label="Search">
            <Search size={20} />
          </button>
          <button className="hover:text-red-400 transition-colors" aria-label="Cart">
            <ShoppingCart size={20} />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 border-2 border-white/30 cursor-pointer" />
        </div>

      </div>
    </motion.nav>
  )
}