"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CreditCard, Truck, CheckCircle, ShoppingBag, Lock, Loader2 } from "lucide-react"
import { useCartStore, selectSubtotal, selectTotalItems } from "@/store/cart.store"
import { useCheckout } from "@/hooks/useCheckout"

type Step = "shipping" | "payment" | "review"

const steps: { key: Step; label: string; icon: typeof Truck }[] = [
  { key: "shipping", label: "Shipping", icon: Truck },
  { key: "payment", label: "Payment", icon: CreditCard },
  { key: "review", label: "Review", icon: CheckCircle },
]

function StepIndicator({ current }: { current: Step }) {
  const currentIndex = steps.findIndex((s) => s.key === current)

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 mb-10">
      {steps.map((step, i) => {
        const Icon = step.icon
        const isActive = i === currentIndex
        const isDone = i < currentIndex

        return (
          <div key={step.key} className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isActive
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                    : isDone
                    ? "bg-red-600/20 text-red-500"
                    : "bg-white/[0.06] text-white/30"
                }`}
              >
                {isDone ? (
                  <CheckCircle size={16} />
                ) : (
                  <Icon size={16} />
                )}
              </div>
              <span
                className={`text-xs font-semibold tracking-wider uppercase hidden sm:block ${
                  isActive ? "text-white" : isDone ? "text-red-500/70" : "text-white/30"
                }`}
              >
                {step.label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div
                className={`w-8 md:w-16 h-px transition-colors duration-500 ${
                  isDone ? "bg-red-500/40" : "bg-white/[0.08]"
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function InputField({
  label,
  placeholder,
  type = "text",
  half = false,
}: {
  label: string
  placeholder: string
  type?: string
  half?: boolean
}) {
  return (
    <div className={half ? "flex-1" : "w-full"}>
      <label className="block text-xs text-white/40 font-semibold tracking-wider uppercase mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-white/[0.04] border border-white/[0.1] rounded-lg px-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.06] transition-all duration-300"
      />
    </div>
  )
}

function ShippingForm() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-5"
    >
      <h2 className="text-xl font-bold font-[var(--font-display)] tracking-wider text-white mb-6">
        Shipping Information
      </h2>

      <div className="flex gap-4">
        <InputField label="First Name" placeholder="John" half />
        <InputField label="Last Name" placeholder="Doe" half />
      </div>
      <InputField label="Email" placeholder="john@example.com" type="email" />
      <InputField label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
      <InputField label="Address" placeholder="123 Street Name" />
      <div className="flex gap-4">
        <InputField label="City" placeholder="New York" half />
        <InputField label="Zip Code" placeholder="10001" half />
      </div>
      <InputField label="Country" placeholder="United States" />
    </motion.div>
  )
}

function PaymentForm() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-5"
    >
      <h2 className="text-xl font-bold font-[var(--font-display)] tracking-wider text-white mb-6">
        Payment Details
      </h2>

      <InputField label="Cardholder Name" placeholder="John Doe" />
      <InputField label="Card Number" placeholder="4242 4242 4242 4242" />
      <div className="flex gap-4">
        <InputField label="Expiry Date" placeholder="MM/YY" half />
        <InputField label="CVC" placeholder="123" half />
      </div>

      <div className="flex items-center gap-2 mt-4 text-white/30">
        <Lock size={14} />
        <span className="text-xs tracking-wider">Your payment information is encrypted and secure</span>
      </div>
    </motion.div>
  )
}

function ReviewStep() {
  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore(selectSubtotal)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-5"
    >
      <h2 className="text-xl font-bold font-[var(--font-display)] tracking-wider text-white mb-6">
        Review Order
      </h2>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.variantId}
            className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
          >
            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-neutral-900 flex-shrink-0">
              {item.image ? (
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/10">
                  <ShoppingBag size={16} />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white/80 truncate">{item.title}</p>
              <p className="text-xs text-white/40">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-bold text-white font-[var(--font-display)]">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-white/[0.06] pt-4 mt-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/40">Subtotal</span>
          <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/40">Shipping</span>
          <span className="text-green-500 font-medium">Free</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/[0.06]">
          <span className="text-white">Total</span>
          <span className="text-red-500 font-[var(--font-display)]">${subtotal.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>("shipping")
  const items = useCartStore((s) => s.items)
  const totalItems = useCartStore(selectTotalItems)
  const subtotal = useCartStore(selectSubtotal)
  const { checkout, loading: checkoutLoading, error: checkoutError } = useCheckout()

  const stepIndex = steps.findIndex((s) => s.key === step)

  const goNext = () => {
    const nextIndex = stepIndex + 1
    if (nextIndex < steps.length) {
      setStep(steps[nextIndex].key)
    }
  }

  const goBack = () => {
    const prevIndex = stepIndex - 1
    if (prevIndex >= 0) {
      setStep(steps[prevIndex].key)
    }
  }

  const handlePlaceOrder = () => {
    checkout()
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
        <ShoppingBag size={48} className="text-white/10 mb-4" />
        <p className="text-white/50 text-lg font-bold mb-2">Your cart is empty</p>
        <p className="text-white/30 text-sm mb-8">Add some products before checking out.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-red-500 text-xs font-bold tracking-wider uppercase hover:text-red-400 transition-colors"
        >
          <ArrowLeft size={14} />
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_70%_10%,rgba(220,38,38,0.12),transparent_60%)]" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 pt-28 pb-20">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 text-xs font-medium tracking-wider uppercase hover:text-white/70 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Shop
          </Link>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold font-[var(--font-display)] tracking-tight text-white text-center mb-8"
        >
          Checkout
        </motion.h1>

        {/* Step indicator */}
        <StepIndicator current={step} />

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 md:p-8">
              {step === "shipping" && <ShippingForm />}
              {step === "payment" && <PaymentForm />}
              {step === "review" && <ReviewStep />}

              {/* Checkout error */}
              {checkoutError && (
                <div className="mt-4 p-3 rounded-lg bg-red-600/10 border border-red-600/20 text-red-400 text-sm">
                  {checkoutError}
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex gap-4 mt-8">
                {stepIndex > 0 && (
                  <button
                    onClick={goBack}
                    disabled={checkoutLoading}
                    className="flex-1 py-4 rounded-lg text-sm font-bold tracking-[0.15em] uppercase border border-white/[0.15] text-white hover:bg-white/[0.03] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={step === "review" ? handlePlaceOrder : goNext}
                  disabled={checkoutLoading}
                  className={`flex-1 py-4 rounded-lg text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                    step === "review"
                      ? "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/20"
                      : "bg-white text-black hover:bg-white/90"
                  }`}
                >
                  {checkoutLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Processing...
                    </>
                  ) : step === "review" ? (
                    "Place Order"
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Order summary sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 sticky top-28">
              <h3 className="text-sm font-bold tracking-[0.2em] text-white/60 uppercase mb-5">
                Order Summary
              </h3>

              <div className="space-y-3 max-h-[240px] overflow-y-auto mb-5">
                {items.map((item) => (
                  <div key={item.variantId} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-neutral-900 flex-shrink-0">
                      {item.image ? (
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/10">
                          <ShoppingBag size={14} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white/70 truncate">{item.title}</p>
                      <p className="text-[11px] text-white/30">×{item.quantity}</p>
                    </div>
                    <p className="text-xs font-bold text-white/80">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/[0.06] pt-4 space-y-2.5">
                <div className="flex justify-between text-xs">
                  <span className="text-white/40 tracking-wider uppercase">Items ({totalItems})</span>
                  <span className="text-white/70">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/40 tracking-wider uppercase">Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-white/40 tracking-wider uppercase">Tax</span>
                  <span className="text-white/70">$0.00</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-3 border-t border-white/[0.06]">
                  <span className="text-white uppercase tracking-wider text-sm">Total</span>
                  <span className="text-red-500 font-[var(--font-display)] text-lg">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
