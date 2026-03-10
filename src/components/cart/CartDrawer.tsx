"use client"

import { motion, AnimatePresence } from "framer-motion"

export default function CartDrawer({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>

      {open && (

        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          className="fixed right-0 top-0 h-full w-[420px] bg-white shadow-2xl z-50 p-8"
        >

          <h2 className="text-2xl font-bold mb-6">
            Your Cart
          </h2>

        </motion.div>

      )}

    </AnimatePresence>
  )
}