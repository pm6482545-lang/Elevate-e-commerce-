import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

async function getFeaturedProducts() {
  const { data } = await supabase
    .from('products')
    .select('*, product_images(image_url)')
    .eq('is_featured', true)
    .limit(4)
  return data || []
}

export default async function Home() {
  const products = await getFeaturedProducts()

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Elevate Your Style
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Discover our curated collection of premium products, designed for modern elegance.
          </p>
          <Link
            href="/shop"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition"
          >
            Shop Collection
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
              <div className="h-48 bg-gray-200 relative">
                {product.product_images?.[0]?.image_url ? (
                  <img
                    src={product.product_images[0].image_url}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-indigo-600 font-bold mb-4">${product.price}</p>
                <Link
                  href={`/products/${product.slug}`}
                  className="mt-auto block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
