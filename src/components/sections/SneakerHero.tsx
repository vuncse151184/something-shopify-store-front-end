"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

const colorVariants = [
  { id: "white-red", src: "/images/hero-shoe (1).png", label: "White / Red" },
  { id: "purple", src: "/images/shoe-purple (1).png", label: "Purple" },
  { id: "green", src: "/images/shoe-green (1).png", label: "Green" },
  { id: "red", src: "/images/shoe-red (1).png", label: "Red" },
  { id: "pink", src: "/images/shoe-pink (1).png", label: "Pink" },
]

export default function SneakerHero() {
  const [activeColor, setActiveColor] = useState("white-red")

  const activeShoe = colorVariants.find(v => v.id === activeColor) ?? colorVariants[0]

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden flex items-center">

      {/* ——— BACKGROUND LAYERS ——— */}

      {/* Subtle red radial gradients */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_30%_50%,rgba(220,38,38,0.3),transparent_60%)]" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_80%_30%,rgba(220,38,38,0.2),transparent_50%)]" />

      {/* Ghost watermark "JORDAN" */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-[var(--font-display)] text-[18vw] font-bold text-white/[0.03] tracking-[0.15em] uppercase">
          JORDAN
        </span>
      </div>

      {/* Decorative arc lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1400 900" fill="none" preserveAspectRatio="none">
        <motion.ellipse
          cx="700" cy="450" rx="500" ry="350"
          stroke="rgba(220,38,38,0.15)" strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.ellipse
          cx="700" cy="450" rx="600" ry="400"
          stroke="rgba(220,38,38,0.08)" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.8 }}
        />
      </svg>


      {/* ——— MAIN CONTENT ——— */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 pt-24 pb-16">

        {/* HERO CENTER: Big shoe + split typography */}
        <div className="relative flex items-center justify-center min-h-[500px]">

          {/* "Jump" text — left side */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute left-0 md:left-[5%] z-[5] pointer-events-none"
          >
            <span className="font-[var(--font-display)] text-[clamp(60px,10vw,140px)] font-bold italic text-red-600 leading-none tracking-tight drop-shadow-[0_0_40px_rgba(220,38,38,0.4)]">
              Jump
            </span>
          </motion.div>

          {/* "man" text — right side */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute right-0 md:right-[5%] z-[5] pointer-events-none"
          >
            <span className="font-[var(--font-display)] text-[clamp(60px,10vw,140px)] font-bold italic text-white leading-none tracking-tight">
              man
            </span>
          </motion.div>

          {/* "2021 PF" badge — upper right */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute top-1/3 right-[10%] md:right-[15%] z-5 pointer-events-none"
          >
            <span className="font-[var(--font-display)] italic text-[clamp(24px,2vw,48px)] font-bold text-red-600 tracking-widest">
              2021 PF
            </span>
          </motion.div>

          {/* Subtitle: "Basketball Shoe" */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute bottom-16 left-0 md:left-[5%] z-5 italic text-gray-400 text-lg tracking-[0.5em] font-light pointer-events-none"
          >
            Basketball Shoe
          </motion.p>

          {/* HERO SHOE IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: -5 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative z-10 w-[clamp(300px,50vw,650px)] h-[clamp(250px,40vw,500px)]"
          >
            <Image
              src={activeShoe.src}
              alt="Jordan Jumpman 2021 PF"
              fill
              priority
              className="object-contain drop-shadow-[0_20px_60px_rgba(220,38,38,0.5)] transition-all duration-500"
            />
          </motion.div>

        </div>

        {/* ——— BOTTOM ROW ——— */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-end">

          {/* BOTTOM LEFT: Color picker + CTAs */}
          <div className="space-y-6">
            {/* Color picker */}
            <div>
              <p className="text-xs tracking-[0.2em] text-gray-400 mb-3 font-semibold">CHOOSE COLOR :</p>
              <div className="flex gap-3">
                {colorVariants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setActiveColor(variant.id)}
                    className={`relative w-14 h-14 rounded-md overflow-hidden border-2 transition-all duration-300 hover:scale-110 ${activeColor === variant.id
                      ? "border-red-500 shadow-[0_0_12px_rgba(220,38,38,0.5)]"
                      : "border-white/20 hover:border-white/50"
                      }`}
                    aria-label={`Select ${variant.label} color`}
                  >
                    <Image
                      src={variant.src}
                      alt={variant.label}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <button className="px-6 py-3 border-2 border-white text-white text-xs font-bold tracking-[0.15em] rounded-sm hover:bg-white hover:text-black transition-all duration-300 uppercase">
                Add to Cart
              </button>
              <button className="px-6 py-3 border-2 border-white bg-white text-black text-xs font-bold tracking-[0.15em] rounded-sm hover:bg-transparent hover:text-white transition-all duration-300 uppercase">
                Buy Now
              </button>
            </div>
          </div>

          {/* BOTTOM CENTER: Price & product name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center md:text-left"
          >
            <div className="flex items-baseline gap-3 justify-center md:justify-start">
              <span className="text-red-500 text-4xl font-bold font-[var(--font-display)]">134$</span>
              <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wider uppercase">exclusive</span>
            </div>
            <p className="mt-1 text-sm font-bold tracking-[0.1em] text-white/90">
              JORDAN JUMPMAN 2021 PF
            </p>
          </motion.div>

          {/* BOTTOM RIGHT: Inspiration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-right"
          >
            <h3 className="text-sm font-bold tracking-[0.2em] text-white/80 mb-2 uppercase">Inspiration</h3>
            <p className="text-xs leading-relaxed text-gray-500 max-w-[280px] ml-auto">
              Inspired by the design of the latest Air Jordan game shoe,
              the Jordan Jumpman 2021 helps up-and-coming players
              level up their game.
            </p>
          </motion.div>

        </div>
      </div>

    </section>
  )
}