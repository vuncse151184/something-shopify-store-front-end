import { NextRequest, NextResponse } from "next/server"
import { getCollectionByHandle } from "@/services/collection.service"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const { handle } = await params
    const collection = await getCollectionByHandle(handle)

    if (!collection) {
      return NextResponse.json({ message: "Collection not found" }, { status: 404 })
    }

    return NextResponse.json(collection)
  } catch (error) {
    console.error("Failed to load collection from Shopify", error)
    return NextResponse.json({ message: "Failed to load collection" }, { status: 500 })
  }
}
