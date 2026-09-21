import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

async function getProducts() {
  const { data } = await supabase
    .from('products')
    .select('*, product_images(image_url), categories(name)')
    .eq('is_active', true)
  return data || []
}

export default async function ShopPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Shop All Products</h1>
        <p className="text-gray-600 mb-8">Browse our full collection of premium items.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
              <div className="h-52 bg-gray-200 relative">
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
                <span className="text-xs text-indigo-600 font-semibold uppercase tracking-wider mb-1">
                  {product.categories?.name || 'General'}
                </span>
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-900 font-bold mb-4">${product.price}</p>
                <Link
                  href={`/products/${product.slug}`}
                  className="mt-auto block text-center bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 rounded transition"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
