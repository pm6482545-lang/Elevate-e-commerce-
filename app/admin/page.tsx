import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

async function getAdminMetrics() {
  // Fetch counts or summary data from Supabase tables
  const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true })
  const { count: orderCount } = await supabase.from('orders').select('*', { count: 'exact', head: true })
  const { count: customerCount } = await supabase.from('customers').select('*', { count: 'exact', head: true })

  return {
    productCount: productCount || 0,
    orderCount: orderCount || 0,
    customerCount: customerCount || 0,
  }
}

export default async function AdminDashboard() {
  const metrics = await getAdminMetrics()

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:block p-6">
        <h2 className="text-xl font-bold mb-8 text-indigo-400">Elevate Admin</h2>
        <nav className="space-y-4">
          <Link href="/admin" className="block py-2.5 px-4 rounded bg-indigo-600 text-white font-medium">
            Dashboard
          </Link>
          <Link href="/admin/products" className="block py-2.5 px-4 rounded hover:bg-slate-800 text-gray-300 transition">
            Products & Inventory
          </Link>
          <Link href="/admin/orders" className="block py-2.5 px-4 rounded hover:bg-slate-800 text-gray-300 transition">
            Orders
          </Link>
          <Link href="/admin/settings" className="block py-2.5 px-4 rounded hover:bg-slate-800 text-gray-300 transition">
            Store Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
            Store Active
          </span>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <p className="text-sm font-medium text-gray-500 mb-1">Total Products</p>
            <h3 className="text-3xl font-bold text-gray-900">{metrics.productCount}</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
            <h3 className="text-3xl font-bold text-gray-900">{metrics.orderCount}</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <p className="text-sm font-medium text-gray-500 mb-1">Total Customers</p>
            <h3 className="text-3xl font-bold text-gray-900">{metrics.customerCount}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <p className="text-gray-600 mb-6">Manage your catalog, fulfill pending orders, or update store settings using the navigation panel.</p>
          <div className="flex space-x-4">
            <Link
              href="/shop"
              target="_blank"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
            >
              View Live Storefront
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
