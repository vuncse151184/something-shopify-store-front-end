"use client"

import { useEffect } from "react"
import { initLenis } from "@/lib/lenis"

export function useLenis() {
  useEffect(() => {
    initLenis()
  }, [])
}