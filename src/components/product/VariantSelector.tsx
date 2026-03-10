"use client"

import { useState } from "react"

const sizes = [38, 39, 40, 41, 42, 43]

export default function VariantSelector() {

  const [size, setSize] = useState<number | null>(null)

  return (
    <div className="mt-8">

      <p className="font-medium mb-4">Select Size</p>

      <div className="flex gap-3">

        {sizes.map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={`w-12 h-12 rounded-lg border
              ${size === s ? "bg-black text-white" : ""}
            `}
          >
            {s}
          </button>
        ))}

      </div>

    </div>
  )
}