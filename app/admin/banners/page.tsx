'use client'

import React, { useState } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react'
import { Banner } from '@/types'

// Mock data
const mockBanners: Banner[] = [
  {
    id: '1',
    title: 'Luxury Perfumes Collection',
    image_url: 'https://plus.unsplash.com/premium_photo-1676748933022-e1183e997436?w=1200&h=400&fit=crop',
    link: '/collection/luxury',
    active: true,
    order: 1,
    created_at: '2024-01-01'
  },
  {
    id: '2',
    title: 'New Arrivals - 50% Off',
    image_url: 'https://images.unsplash.com/photo-1747916148827-d5fb453bb978?w=1200&h=400&fit=crop',
    link: '/new-arrivals',
    active: true,
    order: 2,
    created_at: '2024-01-01'
  },
  {
    id: '3',
    title: 'Exclusive Designer Fragrances',
    image_url: 'https://images.unsplash.com/photo-1618261325436-dc799dca3874?w=1200&h=400&fit=crop',
    link: '/exclusive',
    active: false,
    order: 3,
    created_at: '2024-01-01'
  }
]

export default function AdminBanners() {
  const [banners, setBanners] = useState<Banner[]>(mockBanners)
  const [showAddModal, setShowAddModal] = useState(false)

  const handleDelete = (bannerId: string) => {
    if (confirm('Are you sure you want to delete this banner?')) {
      setBanners(banners.filter(b => b.id !== bannerId))
    }
  }

  const toggleActive = (bannerId: string) => {
    setBanners(banners.map(b => 
      b.id === bannerId ? { ...b, active: !b.active } : b
    ))
  }

  const moveUp = (bannerId: string) => {
    const banner = banners.find(b => b.id === bannerId)
    if (!banner || banner.order === 1) return

    setBanners(banners.map(b => {
      if (b.id === bannerId) return { ...b, order: b.order - 1 }
      if (b.order === banner.order - 1) return { ...b, order: b.order + 1 }
      return b
    }))
  }

  const moveDown = (bannerId: string) => {
    const banner = banners.find(b => b.id === bannerId)
    const maxOrder = Math.max(...banners.map(b => b.order))
    if (!banner || banner.order === maxOrder) return

    setBanners(banners.map(b => {
      if (b.id === bannerId) return { ...b, order: b.order + 1 }
      if (b.order === banner.order + 1) return { ...b, order: b.order - 1 }
      return b
    }))
  }

  const sortedBanners = [...banners].sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Banners</h1>
          <p className="mt-2 text-gray-600">Manage homepage carousel banners</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Banner
        </button>
      </div>

      {/* Banners Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedBanners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-lg shadow overflow-hidden">
            {/* Banner Image */}
            <div className="relative h-48">
              <img
                src={banner.image_url}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold text-center px-4">
                  {banner.title}
                </h3>
              </div>
              
              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  banner.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {banner.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Order Badge */}
              <div className="absolute top-3 right-3">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  Order: {banner.order}
                </span>
              </div>
            </div>

            {/* Banner Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{banner.title}</h4>
                  {banner.link && (
                    <p className="text-sm text-gray-600">Link: {banner.link}</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Move Up/Down */}
                  <button
                    onClick={() => moveUp(banner.id)}
                    disabled={banner.order === 1}
                    className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Move up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveDown(banner.id)}
                    disabled={banner.order === Math.max(...banners.map(b => b.order))}
                    className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Move down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Toggle Active */}
                  <button
                    onClick={() => toggleActive(banner.id)}
                    className={`p-2 rounded-lg ${
                      banner.active ? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'
                    }`}
                    title={banner.active ? 'Deactivate' : 'Activate'}
                  >
                    {banner.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  {/* Edit */}
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>

                  {/* Delete */}
                  <button 
                    onClick={() => handleDelete(banner.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {banners.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-white rounded-lg shadow p-8">
            <p className="text-gray-500 mb-4">No banners found.</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Your First Banner
            </button>
          </div>
        </div>
      )}

      {/* Add Banner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Add New Banner</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Banner Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter banner title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link URL (Optional)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="/collection/luxury"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="active"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
                    Active
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Banner
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 