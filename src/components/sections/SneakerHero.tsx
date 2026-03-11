"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const colorVariants = [
  { id: "white-red", src: "/images/hero-shoe (1).png", label: "Trắng / Đỏ", accent: "#dc2626" },
  { id: "purple", src: "/images/shoe-purple (1).png", label: "Tím", accent: "#a855f7" },
  { id: "green", src: "/images/shoe-green (1).png", label: "Xanh lá", accent: "#22c55e" },
  { id: "red", src: "/images/shoe-red (1).png", label: "Đỏ", accent: "#ef4444" },
  { id: "pink", src: "/images/shoe-pink (1).png", label: "Hồng", accent: "#ec4899" },
]

export default function SneakerHero() {
  const [activeColor, setActiveColor] = useState("white-red")

  const activeShoe = colorVariants.find(v => v.id === activeColor) ?? colorVariants[0]
  const accent = activeShoe.accent

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden flex items-center">

      {/* ——— BACKGROUND LAYERS ——— */}

      {/* Crossfade color layers — each is always mounted, only opacity changes */}
      {colorVariants.map((v) => (
        <div
          key={v.id}
          className="absolute inset-0 transition-opacity duration-700 ease-out will-change-[opacity]"
          style={{ opacity: activeColor === v.id ? 1 : 0 }}
        >
          <div
            className="absolute inset-0 opacity-25"
            style={{ background: `radial-gradient(ellipse at 30% 50%, ${v.accent}4D, transparent 60%)` }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{ background: `radial-gradient(ellipse at 80% 30%, ${v.accent}33, transparent 50%)` }}
          />
        </div>
      ))}

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
          stroke="rgba(255,255,255,0.06)" strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.ellipse
          cx="700" cy="450" rx="600" ry="400"
          stroke="rgba(255,255,255,0.04)" strokeWidth="1"
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
            <span
              className="font-[var(--font-display)] text-[clamp(60px,10vw,140px)] font-bold italic leading-none tracking-tight"
              style={{ color: accent, transition: "color 0.5s ease" }}
            >
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
            <span
              className="font-[var(--font-display)] italic text-[clamp(24px,2vw,48px)] font-bold tracking-widest"
              style={{ color: accent, transition: "color 0.5s ease" }}
            >
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
            Giày Bóng Rổ
          </motion.p>

          {/* HERO SHOE IMAGE — with separate glow div */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: -5 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative z-10 w-[clamp(300px,50vw,650px)] h-[clamp(250px,40vw,500px)]"
          >
            {/* Glow behind shoe — GPU composited blur, only color crossfades */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {colorVariants.map((v) => (
                <div
                  key={v.id}
                  className="absolute w-[70%] h-[50%] rounded-full blur-[80px] transition-opacity duration-500 ease-out will-change-[opacity]"
                  style={{
                    backgroundColor: v.accent,
                    opacity: activeColor === v.id ? 0.5 : 0,
                  }}
                />
              ))}
            </div>

            {/* Shoe images with crossfade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeShoe.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={activeShoe.src}
                  alt="Jordan Jumpman 2021 PF"
                  fill
                  priority
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>

        {/* ——— BOTTOM ROW ——— */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-end">

          {/* BOTTOM LEFT: Color picker + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-6"
          >
            {/* Color picker */}
            <div>
              <p className="text-xs tracking-[0.2em] text-gray-400 mb-3 font-semibold">CHỌN MÀU :</p>
              <div className="flex gap-3">
                {colorVariants.map((variant, i) => (
                  <motion.button
                    key={variant.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 1 + i * 0.08 }}
                    onClick={() => setActiveColor(variant.id)}
                    className={`relative w-14 h-14 rounded-md overflow-hidden border-2 hover:scale-110 ${activeColor === variant.id
                      ? "border-current"
                      : "border-white/20 hover:border-white/50"
                      }`}
                    style={{
                      borderColor: activeColor === variant.id ? variant.accent : undefined,
                      boxShadow: activeColor === variant.id ? `0 0 12px ${variant.accent}80` : "none",
                      transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                    }}
                    aria-label={`Chọn màu ${variant.label}`}
                  >
                    <Image
                      src={variant.src}
                      alt={variant.label}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <motion.button
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                className="px-6 py-3 border-2 border-white text-white text-xs font-bold tracking-[0.15em] rounded-sm hover:bg-white hover:text-black transition-colors duration-300 uppercase"
              >
                Thêm vào giỏ
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="px-6 py-3 border-2 border-white bg-white text-black text-xs font-bold tracking-[0.15em] rounded-sm hover:bg-transparent hover:text-white transition-colors duration-300 uppercase"
              >
                Mua ngay
              </motion.button>
            </div>
          </motion.div>

          {/* BOTTOM CENTER: Price & product name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center md:text-left"
          >
            <div className="flex items-baseline gap-3 justify-center md:justify-start">
              <span
                className="text-4xl font-bold font-[var(--font-display)]"
                style={{ color: accent, transition: "color 0.5s ease" }}
              >
                3.200.000₫
              </span>
              <span
                className="text-white text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wider uppercase"
                style={{ backgroundColor: accent, transition: "background-color 0.5s ease" }}
              >
                độc quyền
              </span>
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
            <h3 className="text-sm font-bold tracking-[0.2em] text-white/80 mb-2 uppercase">Cảm Hứng</h3>
            <p className="text-xs leading-relaxed text-gray-500 max-w-[280px] ml-auto">
              Lấy cảm hứng từ thiết kế giày thi đấu Air Jordan mới nhất,
              Jordan Jumpman 2021 giúp các cầu thủ trẻ
              nâng tầm cuộc chơi.
            </p>
          </motion.div>

        </div>
      </div>

    </section>
  )
}