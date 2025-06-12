'use client'

import React from 'react'
import { 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingCart,
  DollarSign,
  Eye
} from 'lucide-react'

const stats = [
  {
    name: 'Total Revenue',
    value: '৳2,45,000',
    change: '+12.5%',
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    name: 'Total Orders',
    value: '1,234',
    change: '+8.2%',
    icon: ShoppingCart,
    color: 'text-blue-600'
  },
  {
    name: 'Total Products',
    value: '456',
    change: '+3.1%',
    icon: Package,
    color: 'text-purple-600'
  },
  {
    name: 'Total Users',
    value: '2,345',
    change: '+15.3%',
    icon: Users,
    color: 'text-orange-600'
  }
]

const recentOrders = [
  {
    id: '#12345',
    customer: 'John Doe',
    product: 'Chanel No. 5',
    amount: '৳7,500',
    status: 'Pending',
    date: '2024-01-15'
  },
  {
    id: '#12346',
    customer: 'Jane Smith',
    product: 'Dior Sauvage',
    amount: '৳6,500',
    status: 'Shipped',
    date: '2024-01-15'
  },
  {
    id: '#12347',
    customer: 'Mike Johnson',
    product: 'Tom Ford Black Orchid',
    amount: '৳10,500',
    status: 'Delivered',
    date: '2024-01-14'
  }
]

const topProducts = [
  {
    name: 'Chanel No. 5',
    sales: 89,
    revenue: '৳6,67,500'
  },
  {
    name: 'Dior Sauvage',
    sales: 67,
    revenue: '৳4,35,500'
  },
  {
    name: 'Tom Ford Black Orchid',
    sales: 45,
    revenue: '৳4,72,500'
  }
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to Zafra Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">{stat.change}</span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{order.amount}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <a href="/admin/orders" className="text-sm text-blue-600 hover:text-blue-800">
              View all orders →
            </a>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {topProducts.map((product, index) => (
              <div key={product.name} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">#{index + 1}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{product.revenue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <a href="/admin/products" className="text-sm text-blue-600 hover:text-blue-800">
              View all products →
            </a>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/products"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Package className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Add New Product</p>
              <p className="text-sm text-gray-600">Create a new perfume listing</p>
            </div>
          </a>
          
          <a
            href="/admin/banners"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Eye className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Manage Banners</p>
              <p className="text-sm text-gray-600">Update homepage banners</p>
            </div>
          </a>
          
          <a
            href="/admin/orders"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <ShoppingCart className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Process Orders</p>
              <p className="text-sm text-gray-600">Review pending orders</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
} 