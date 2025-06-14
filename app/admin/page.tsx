'use client'

import React, { useState } from 'react'
import { 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingCart,
  DollarSign,
  Eye,
  Plus,
  ArrowRight,
  Calendar,
  Clock,
  Star
} from 'lucide-react'

const stats = [
  {
    name: 'Total Revenue',
    value: '৳2,45,000',
    change: '+12.5%',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    name: 'Total Orders',
    value: '1,234',
    change: '+8.2%',
    icon: ShoppingCart,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    name: 'Total Products',
    value: '456',
    change: '+3.1%',
    icon: Package,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    name: 'Total Users',
    value: '2,345',
    change: '+15.3%',
    icon: Users,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  }
]

const recentOrders = [
  {
    id: '#12345',
    customer: 'John Doe',
    product: 'Chanel No. 5',
    amount: '৳7,500',
    status: 'Pending',
    date: '2024-01-15',
    time: '10:30 AM'
  },
  {
    id: '#12346',
    customer: 'Jane Smith',
    product: 'Dior Sauvage',
    amount: '৳6,500',
    status: 'Shipped',
    date: '2024-01-15',
    time: '09:15 AM'
  },
  {
    id: '#12347',
    customer: 'Mike Johnson',
    product: 'Tom Ford Black Orchid',
    amount: '৳10,500',
    status: 'Delivered',
    date: '2024-01-14',
    time: '03:45 PM'
  },
  {
    id: '#12348',
    customer: 'Sarah Wilson',
    product: 'YSL Black Opium',
    amount: '৳8,500',
    status: 'Pending',
    date: '2024-01-14',
    time: '02:20 PM'
  }
]

const topProducts = [
  {
    name: 'Chanel No. 5',
    sales: 89,
    revenue: '৳6,67,500',
    rating: 4.8,
    image: '/api/placeholder/60/60'
  },
  {
    name: 'Dior Sauvage',
    sales: 67,
    revenue: '৳4,35,500',
    rating: 4.6,
    image: '/api/placeholder/60/60'
  },
  {
    name: 'Tom Ford Black Orchid',
    sales: 45,
    revenue: '৳4,72,500',
    rating: 4.9,
    image: '/api/placeholder/60/60'
  },
  {
    name: 'YSL Black Opium',
    sales: 38,
    revenue: '৳3,23,000',
    rating: 4.7,
    image: '/api/placeholder/60/60'
  }
]

const quickActions = [
  {
    title: 'Add New Product',
    description: 'Create a new perfume listing',
    icon: Plus,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    href: '/admin/products'
  },
  {
    title: 'Manage Banners',
    description: 'Update homepage banners',
    icon: Eye,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    href: '/admin/banners'
  },
  {
    title: 'Process Orders',
    description: 'Review pending orders',
    icon: ShoppingCart,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    href: '/admin/orders'
  },
  {
    title: 'Manage Users',
    description: 'View and manage user accounts',
    icon: Users,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    href: '/admin/users'
  }
]

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">Welcome to Zafra Admin Panel</p>
        </div>
        
        {/* Period Selector */}
        <div className="mt-4 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <div className="flex items-center">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                    <span className="text-xs sm:text-sm text-green-600 ml-1 font-medium">{stat.change}</span>
                    <span className="text-xs sm:text-sm text-gray-500 ml-1 hidden sm:inline">from last month</span>
                  </div>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders - Takes 2 columns on xl screens */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                <a href="/admin/orders" className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center">
                  View all
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.product}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{order.amount}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                        <span className="text-xs text-gray-500">{order.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Products - Takes 1 column on xl screens */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-purple-600">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} sales</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{product.revenue}</p>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <a
                key={action.title}
                href={action.href}
                className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <div className={`${action.bgColor} p-2 rounded-lg group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`w-5 h-5 ${action.color}`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
} 