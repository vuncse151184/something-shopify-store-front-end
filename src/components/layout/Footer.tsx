import Link from "next/link"
import { Mail, MapPin, Phone, Instagram, Facebook, Twitter, Youtube } from "lucide-react"

const footerLinks = {
  shop: [
    { label: "New Arrivals", href: "/collections" },
    { label: "Best Sellers", href: "/collections" },
    { label: "Men", href: "/collections" },
    { label: "Women", href: "/collections" },
    { label: "Kids", href: "/collections" },
    { label: "Sale", href: "/collections" },
  ],
  help: [
    { label: "Shipping & Returns", href: "#" },
    { label: "Size Guide", href: "#" },
    { label: "Order Tracking", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
}

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
]

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.06]">
      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <svg className="w-8 h-8 fill-white transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M15.9 2.3c-.1-.1-.3-.2-.5-.1-.2 0-.3.2-.3.4l.4 2.6c0 .2-.1.3-.2.4l-3.2 1.7c-.1.1-.2.1-.3.1L8.5 6.8c-.2-.1-.4 0-.4.2l-.3 2.7c0 .2-.2.3-.3.3L4.8 11c-.2.1-.3.3-.2.5l1 2.5c.1.2 0 .3-.1.4l-2.2 1.7c-.2.1-.2.3-.1.5l1.5 2.3c.1.2.1.3 0 .4L3 21.6c-.1.2 0 .4.2.5l2.6.6c.2 0 .3.2.3.3l.2 2.7c0 .2.2.4.4.3l2.6-.8c.2-.1.3 0 .4.1l1.6 2.2c.1.2.3.2.5.1l2.3-1.5c.2-.1.3-.1.4 0l2.3 1.5c.2.1.4.1.5-.1l1.6-2.2c.1-.2.3-.2.4-.1l2.6.8c.2.1.4-.1.4-.3l.2-2.7c0-.2.2-.3.3-.3l2.6-.6c.2 0 .3-.3.2-.5l-1.5-2.3c-.1-.2-.1-.3 0-.4l1.5-2.3c.1-.2.1-.4-.2-.5l-2.7-.9c-.2-.1-.3-.2-.3-.3l-.3-2.7c0-.2-.2-.3-.4-.2l-3.3.6c-.1 0-.2 0-.3-.1L17 5.3c-.1-.1-.2-.3-.2-.4l.4-2.6z" transform="scale(0.75) translate(4, 0)" />
              </svg>
              <span className="font-[var(--font-display)] text-xl font-bold tracking-[0.15em] uppercase text-white">
                Something
              </span>
            </Link>

            <p className="mt-5 text-sm text-white/35 leading-relaxed max-w-xs">
              Your destination for exclusive sneakers and streetwear. Authentic products, curated collections.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-3">
              <a href="mailto:support@something.store" className="flex items-center gap-3 text-xs text-white/30 hover:text-red-400 transition-colors">
                <Mail size={14} className="text-red-500/50" />
                support@something.store
              </a>
              <a href="tel:+15551234567" className="flex items-center gap-3 text-xs text-white/30 hover:text-red-400 transition-colors">
                <Phone size={14} className="text-red-500/50" />
                +1 (555) 123-4567
              </a>
              <span className="flex items-center gap-3 text-xs text-white/30">
                <MapPin size={14} className="text-red-500/50" />
                New York, NY 10001
              </span>
            </div>

            {/* Social link icons */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/[0.06] transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase mb-5">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/30 hover:text-red-400 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase mb-5">
              Help
            </h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/30 hover:text-red-400 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/30 hover:text-red-400 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase mb-5">
              Newsletter
            </h3>
            <p className="text-xs text-white/30 leading-relaxed mb-4">
              Get exclusive deals and early access to new drops.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-white/[0.04] border border-white/[0.1] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-red-500/50 transition-all duration-300"
              />
              <button className="w-full py-3 bg-red-600 text-white text-xs font-bold tracking-[0.15em] uppercase rounded-lg hover:bg-red-500 transition-all duration-300 shadow-lg shadow-red-600/10">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} Something Store. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-[11px] text-white/20 hover:text-white/40 transition-colors uppercase tracking-wider">
              Privacy
            </Link>
            <Link href="#" className="text-[11px] text-white/20 hover:text-white/40 transition-colors uppercase tracking-wider">
              Terms
            </Link>
            <Link href="#" className="text-[11px] text-white/20 hover:text-white/40 transition-colors uppercase tracking-wider">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
