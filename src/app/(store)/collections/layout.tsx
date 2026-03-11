import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Browse our curated sneaker collections. From limited drops to everyday essentials, find the perfect pair.",
  alternates: { canonical: "/collections" },
}

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
