import { NextResponse } from "next/server"
import { getProducts } from "@/services/product.service"

export async function GET() {
  try {
    const products = await getProducts()
    return NextResponse.json(products)
  } catch (error) {
    console.error("Failed to load products from Shopify", error)
    return NextResponse.json({ message: "Failed to load products" }, { status: 500 })
  }
}
