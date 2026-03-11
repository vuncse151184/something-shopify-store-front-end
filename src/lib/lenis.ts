"use client"

import Lenis from "lenis"

let lenis: Lenis | null = null
let rafId: number | null = null

export function initLenis() {
  if (typeof window === "undefined") return

  // Destroy any previous instance to prevent duplicate RAF loops
  if (lenis) return lenis

  lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
  })

  function raf(time: number) {
    lenis?.raf(time)
    rafId = requestAnimationFrame(raf)
  }

  rafId = requestAnimationFrame(raf)

  return lenis
}

export function destroyLenis() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }

  if (lenis) {
    lenis.destroy()
    lenis = null
  }
}