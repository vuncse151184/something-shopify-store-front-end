import { getProducts } from "@/services/product.service"

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="grid grid-cols-4 gap-6 p-10">
      {products.map((p: any) => {
        const product = p.node
        const image = product.images.edges[0]?.node.url

        return (
          <div key={product.id} className="border p-4 rounded">
            <img src={image} className="w-full h-64 object-cover"/>
            <h2 className="text-lg font-bold mt-2">
              {product.title}
            </h2>
          </div>
        )
      })}
    </div>
  )
}