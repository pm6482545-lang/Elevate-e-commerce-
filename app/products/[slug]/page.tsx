import { supabase } from '@/lib/supabaseClient'
import { notFound } from 'next/navigation'

async function getProduct(slug: string) {
  const { data } = await supabase
    .from('products')
    .select('*, product_images(image_url), product_variants(*), categories(name)')
    .eq('slug', slug)
    .single()
  return data
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-xl shadow">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
            {product.product_images?.[0]?.image_url ? (
              <img
                src={product.product_images[0].image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">No Image Available</div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs text-indigo-600 font-semibold uppercase tracking-wider">
              {product.categories?.name || 'General'}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-1 mb-4">{product.name}</h1>
            <p className="text-2xl font-bold text-indigo-600 mb-6">${product.price}</p>
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description || 'No description provided.'}</p>
            
            {product.material_care && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
                <span className="font-semibold block mb-1">Material & Care:</span>
                {product.material_care}
              </div>
            )}
          </div>

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
