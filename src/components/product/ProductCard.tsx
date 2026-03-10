"use client"

import Image from "next/image"
import { motion } from "framer-motion"

type Props = {
  name: string
  price: number
  image: string
}

export default function ProductCard({ name, price, image }: Props) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="mt-3">
        <h3 className="font-medium">{name}</h3>
        <p className="text-gray-500">${price}</p>
      </div>
    </motion.div>
  )
}